document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('doshaForm');
    const loader = document.getElementById('loader');
    const resultsSection = document.getElementById('resultsSection');
    const resultsGrid = document.getElementById('resultsGrid');
  
    // Default coords (Nellore) as per prompt
    const defaultLat = 14.4426;
    const defaultLon = 79.9865;
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const dob = document.getElementById('dob').value;
      const tob = document.getElementById('tob').value;
      
      if (!dob || !tob) return;
  
      // Hide results, show loader
      resultsSection.style.display = 'none';
      loader.style.display = 'block';
  
      // Simulate calculation delay
      setTimeout(() => {
        const results = calculateDoshas(dob, tob);
        renderResults(results);
        loader.style.display = 'none';
        resultsSection.style.display = 'block';
      }, 1500);
    });
  
    function calculateDoshas(dateStr, timeStr) {
      const [year, month, day] = dateStr.split('-').map(Number);
      const [hours, minutes] = timeStr.split(':').map(Number);
      
      // Assume local time is IST (UTC+5:30) for simplicity as it's a Vedic site
      const offsetMs = (5 * 60 + 30) * 60 * 1000;
      const localDate = new Date(year, month - 1, day, hours, minutes);
      const dateUTC = new Date(localDate.getTime() - offsetMs);
  
      const { 
        planets, 
        lagna, 
        rahu, 
        ketu 
      } = calculatePlanetaryPositions(dateUTC, defaultLat, defaultLon);
  
      // Find houses from lagna
      const getHouse = (deg) => {
        const lagnaSign = Math.floor(lagna / 30);
        const planetSign = Math.floor(deg / 30);
        let house = (planetSign - lagnaSign) + 1;
        if (house <= 0) house += 12;
        return house;
      };
  
      const getSign = (deg) => Math.floor(deg / 30);
  
      const planetaryHouses = {};
      const planetarySigns = {};
      for (const [name, pos] of Object.entries(planets)) {
        planetaryHouses[name] = getHouse(pos);
        planetarySigns[name] = getSign(pos);
      }
      
      const rahuHouse = getHouse(rahu);
      const ketuHouse = getHouse(ketu);
      const rahuSign = getSign(rahu);
      const ketuSign = getSign(ketu);
  
      // Calculate individual doshas
      const mangalDosha = checkMangalDosha(planetaryHouses.Mars, planetarySigns.Mars, getSign(lagna), planetaryHouses.Jupiter, planetarySigns.Jupiter);
      const kaalSarpDosha = checkKaalSarpDosha(planets, rahu, ketu, rahuHouse);
      const sadeSati = checkSadeSati(planetarySigns.Moon, planetarySigns.Saturn);
      const pitraDosha = checkPitraDosha(planetaryHouses.Sun, planetarySigns.Sun, rahuHouse, ketuHouse, planetaryHouses.Saturn, lagna);
  
      return { mangalDosha, kaalSarpDosha, sadeSati, pitraDosha };
    }
  
    function calculatePlanetaryPositions(dateUTC, lat, lon) {
      const Astro = window.Astronomy;
      const ayanamsa = window.PANCHANG.getLahiriAyanamsa(dateUTC);
      
      const planets = {};
      const bodies = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
      
      bodies.forEach(body => {
        const vec = Astro.GeoVector(Astro.Body[body], dateUTC, false);
        const ecl = Astro.Ecliptic(vec);
        let tropical = ecl.elon;
        let sidereal = ((tropical - ayanamsa) % 360 + 360) % 360;
        planets[body] = sidereal;
      });
  
      // Rahu (Mean Node)
      const jd = julianDayUTC(dateUTC);
      const T = (jd - 2451545.0) / 36525.0;
      let rahuTropical = (125.044522 - 1934.136261 * T) % 360;
      if (rahuTropical < 0) rahuTropical += 360;
      const rahuSidereal = ((rahuTropical - ayanamsa) % 360 + 360) % 360;
      const ketuSidereal = (rahuSidereal + 180) % 360;
  
      // Lagna Calculation
      const gmst = (280.46061837 + 360.98564736629 * (jd - 2451545.0)) % 360;
      let lst = (gmst + lon) % 360;
      if (lst < 0) lst += 360;
  
      const e = 23.4392911 * (Math.PI / 180);
      const rad = Math.PI / 180;
      const latRad = lat * rad;
      const lstRad = lst * rad;
  
      let y = Math.cos(lstRad);
      let x = - (Math.sin(lstRad) * Math.cos(e) + Math.tan(latRad) * Math.sin(e));
      
      let tropicalAsc = Math.atan2(y, x) / rad;
      if (tropicalAsc < 0) tropicalAsc += 360;
      
      const lagnaSidereal = ((tropicalAsc - ayanamsa) % 360 + 360) % 360;
  
      return { planets, lagna: lagnaSidereal, rahu: rahuSidereal, ketu: ketuSidereal };
    }
  
    function julianDayUTC(dateUTC) {
      let y = dateUTC.getUTCFullYear();
      let m = dateUTC.getUTCMonth() + 1;
      const d = dateUTC.getUTCDate() + (dateUTC.getUTCHours() + (dateUTC.getUTCMinutes() / 60)) / 24;
      if (m <= 2) { y -= 1; m += 12; }
      const A = Math.floor(y / 100);
      const B = 2 - A + Math.floor(A / 4);
      return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
    }
  
    function checkMangalDosha(marsHouse, marsSign, lagnaSign, jupiterHouse, jupiterSign) {
      const doshaHouses = [1, 2, 4, 7, 8, 12];
      const isDoshaHouse = doshaHouses.includes(marsHouse);
      
      let status = 'good';
      let title = 'No Mangal Dosha';
      let message = 'Mars is placed in a neutral house. Mangal Dosha is not present in your chart.';
      let remedies = [];
      let severity = 0;
  
      if (isDoshaHouse) {
        // Check Cancellations
        const isOwnSign = (marsSign === 0 || marsSign === 7); // Aries or Scorpio
        const isExalted = (marsSign === 9); // Capricorn
        const isLagnaCancel = (lagnaSign === 4 || lagnaSign === 10); // Leo or Aquarius lagna (using index 4=Leo, 10=Aquarius)
        const isJupiterConjunction = (marsSign === jupiterSign);
        
        const isCanceled = isOwnSign || isExalted || isLagnaCancel || isJupiterConjunction;
  
        if (isCanceled) {
          status = 'warning';
          title = 'Mild Mangal Dosha (Canceled)';
          message = `Mars is in House ${marsHouse}, forming Mangal Dosha, but it is heavily mitigated due to beneficial planetary alignments (Parihara).`;
          remedies = ['Recite Hanuman Chalisa daily', 'Donate red items like masoor dal on Tuesdays'];
          severity = 2;
        } else {
          status = 'danger';
          title = 'Mangal Dosha Present';
          message = `Mars is placed in House ${marsHouse}, indicating strong Kuja Dosha which may cause delays or friction in partnerships.`;
          remedies = ['Recite Hanuman Chalisa daily', 'Observe fasting on Tuesdays', 'Perform Kumbh Vivah (if applicable)', 'Wear Red Coral (after consultation)'];
          severity = 5;
        }
      }
      return { status, title, message, remedies, severity, house: marsHouse };
    }
  
    function checkKaalSarpDosha(planets, rahu, ketu, rahuHouse) {
      // Check if all 7 planets are on one side of Rahu-Ketu axis
      const bodyNames = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
      let side1Count = 0;
      let side2Count = 0;
  
      const normalize = deg => ((deg % 360) + 360) % 360;
      
      bodyNames.forEach(b => {
        let p = planets[b];
        let diff = normalize(p - rahu);
        if (diff < 180) {
          side1Count++;
        } else {
          side2Count++;
        }
      });
  
      const types = [
        'Anant', 'Kulik', 'Vasuki', 'Shankhpal', 'Padma', 'Mahapadma', 
        'Takshak', 'Karkotak', 'Shankhachood', 'Ghatak', 'Vishdhar', 'Sheshnag'
      ];
      
      let ksdType = types[rahuHouse - 1] + ' Kaal Sarp Dosha';
      
      if (side1Count === 7 || side2Count === 7) {
        return {
          status: 'danger',
          title: 'Full Kaal Sarp Dosha',
          message: `All planets are trapped between Rahu and Ketu, forming ${ksdType}.`,
          remedies: ['Perform Kaal Sarp Shanti Puja at Trimbakeshwar or Kalahasti', 'Chant Maha Mrityunjaya Mantra', 'Worship Lord Shiva daily'],
          severity: 5
        };
      } else if (side1Count === 6 || side2Count === 6) {
        return {
          status: 'warning',
          title: 'Partial (Anshik) Kaal Sarp',
          message: `One planet has broken the Rahu-Ketu axis, forming a partial ${ksdType}. Its effects are mild.`,
          remedies: ['Offer milk and water to Shivling on Mondays', 'Chant Om Namah Shivaya'],
          severity: 2
        };
      } else {
        return {
          status: 'good',
          title: 'No Kaal Sarp Dosha',
          message: 'Planets are distributed across the zodiac. No Kaal Sarp Dosha is present.',
          remedies: [],
          severity: 0
        };
      }
    }
  
    function checkSadeSati(moonSign, saturnSign) {
      const getDistance = (s1, s2) => {
        let dist = (s2 - s1) + 1;
        if (dist <= 0) dist += 12;
        return dist;
      };
      
      const saturnMoonDist = getDistance(moonSign, saturnSign);
      
      if (saturnMoonDist === 12) {
        return {
          status: 'warning',
          title: 'Sade Sati Active (Rising Phase)',
          message: 'Saturn is transiting the 12th house from your natal Moon. This marks the beginning of Sade Sati (first 2.5 years).',
          remedies: ['Worship Lord Hanuman', 'Light a mustard oil lamp on Saturdays'],
          severity: 3
        };
      } else if (saturnMoonDist === 1) {
        return {
          status: 'danger',
          title: 'Sade Sati Active (Peak Phase)',
          message: 'Saturn is transiting exactly over your natal Moon. This is the peak phase of Sade Sati.',
          remedies: ['Recite Hanuman Chalisa 3 times daily', 'Visit Shani temple on Saturdays', 'Donate black sesame seeds'],
          severity: 5
        };
      } else if (saturnMoonDist === 2) {
        return {
          status: 'warning',
          title: 'Sade Sati Active (Setting Phase)',
          message: 'Saturn is transiting the 2nd house from your natal Moon. This is the final phase of Sade Sati.',
          remedies: ['Chant Shani Mantra: Om Sham Shanaicharaya Namah', 'Feed crows on Saturdays'],
          severity: 3
        };
      } else if (saturnMoonDist === 4 || saturnMoonDist === 8) {
        return {
          status: 'warning',
          title: 'Shani Dhaiya (Panoti)',
          message: `Saturn is transiting the ${saturnMoonDist}th house from your Moon, causing Shani Dhaiya (Small Panoti).`,
          remedies: ['Worship Lord Hanuman', 'Avoid starting risky ventures on Saturdays'],
          severity: 2
        };
      } else {
        return {
          status: 'good',
          title: 'Sade Sati Not Active',
          message: 'Saturn is in a favorable or neutral transit from your natal Moon. Sade Sati is not active.',
          remedies: [],
          severity: 0
        };
      }
    }
  
    function checkPitraDosha(sunHouse, sunSign, rahuHouse, ketuHouse, saturnHouse, lagnaSign) {
      const isSunAfflicted = (sunHouse === rahuHouse || sunHouse === ketuHouse || sunHouse === saturnHouse);
      const isNinthAfflicted = (rahuHouse === 9 || ketuHouse === 9 || saturnHouse === 9);
      
      if (isSunAfflicted || isNinthAfflicted) {
        return {
          status: 'danger',
          title: 'Pitra Dosha Indicated',
          message: 'Afflictions to the Sun or the 9th house indicate ancestral karmic imbalances (Pitra Dosha).',
          remedies: ['Perform Shraddha and Tarpan regularly', 'Feed cows and crows on Amavasya', 'Perform Narayan Nagbali Puja if heavily afflicted'],
          severity: 4
        };
      } else {
        return {
          status: 'good',
          title: 'No Pitra Dosha',
          message: 'The Sun and 9th house are free from major malefic nodes. No Pitra Dosha indicated.',
          remedies: [],
          severity: 0
        };
      }
    }
  
    function renderResults(results) {
      resultsGrid.innerHTML = '';
      const ds = [
        { id: 'mangal', icon: '♂️', data: results.mangalDosha },
        { id: 'kaal', icon: '🐍', data: results.kaalSarpDosha },
        { id: 'sade', icon: '🪐', data: results.sadeSati },
        { id: 'pitra', icon: '🕉️', data: results.pitraDosha }
      ];
  
      ds.forEach((item, index) => {
        const { status, title, message, remedies, severity } = item.data;
        
        let statusBadge = '✅ Good';
        if (status === 'warning') statusBadge = '⚠️ Mild / Active';
        if (status === 'danger') statusBadge = '❌ Present';
  
        const remediesHtml = remedies.length > 0 
          ? `<div class="remedies-box">
               <h4>Recommended Remedies:</h4>
               <ul class="remedies-list">
                 ${remedies.map(r => `<li>${r}</li>`).join('')}
               </ul>
             </div>`
          : '';
          
        let severityHtml = '';
        if (severity > 0) {
          let dots = '';
          for (let i = 1; i <= 5; i++) {
            let activeClass = i <= severity ? `active ${status === 'warning' ? 'yellow' : 'red'}` : '';
            dots += `<div class="dot ${activeClass}"></div>`;
          }
          severityHtml = `<div class="severity-meter" title="Severity: ${severity}/5">${dots}</div>`;
        }
  
        const card = document.createElement('div');
        card.className = `result-card status-${status}`;
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.innerHTML = `
          <div class="scanning-line" style="animation: scan 2s ease-in-out"></div>
          <div class="card-header">
            <h3 class="card-title">${item.icon} ${title}</h3>
            <span class="status-badge">${statusBadge}</span>
          </div>
          <div class="card-body">
            <p>${message}</p>
            ${severityHtml}
            ${remediesHtml}
          </div>
        `;
        
        // Trigger reflow for animation
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50 + index * 150);
        
        resultsGrid.appendChild(card);
      });
    }
  });
