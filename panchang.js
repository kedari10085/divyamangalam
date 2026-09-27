/* =============================================
   DIVYA MANGALAM — PANCHANG ENGINE
   Accurate Vedic calendar calculations
   Tithi, Nakshatra, Yoga, Karana, Rahukaal
   Muhurta data 2024–2028
   ============================================= */

const PANCHANG = (() => {

  /* ---- Constants ---- */
  const TITHIS = [
    'Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami',
    'Shashthi','Saptami','Ashtami','Navami','Dashami',
    'Ekadashi','Dwadashi','Trayodashi','Chaturdashi','Purnima/Amavasya'
  ];
  const PAKSHA = ['Shukla (Bright Half)','Krishna (Dark Half)'];
  const NAKSHATRAS = [
    'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra',
    'Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni',
    'Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
    'Moola','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha',
    'Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'
  ];
  const YOGAS = [
    'Vishkamba','Priti','Ayushman','Saubhagya','Shobhana','Atiganda',
    'Sukarma','Dhriti','Shula','Ganda','Vriddhi','Dhruva','Vyaghata',
    'Harshana','Vajra','Siddhi','Vyatipata','Variyan','Parigha','Shiva',
    'Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti'
  ];
  const KARANAS = [
    'Bava','Balava','Kaulava','Taitila','Gara','Vanija','Vishti',
    'Shakuni','Chatushpada','Nagava','Kimstughna'
  ];
  const RASIS = [
    'Mesha (Aries)','Vrishabha (Taurus)','Mithuna (Gemini)','Karka (Cancer)',
    'Simha (Leo)','Kanya (Virgo)','Tula (Libra)','Vrischika (Scorpio)',
    'Dhanu (Sagittarius)','Makara (Capricorn)','Kumbha (Aquarius)','Meena (Pisces)'
  ];
  const WEEKDAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const WEEKDAY_DEITIES = [
    'Surya (Sun)','Shiva (Moon)','Hanuman/Durga (Mars)','Ganesha/Vishnu (Mercury)',
    'Vishnu/Guru (Jupiter)','Lakshmi/Devi (Venus)','Shani/Saturn (Saturn)'
  ];

  /* ---- Rahukaal timings by weekday (approximate, 6 AM – 6 PM) ---- */
  const RAHUKAAL = {
    Sunday:    { start: '4:30 PM', end: '6:00 PM' },
    Monday:    { start: '7:30 AM', end: '9:00 AM' },
    Tuesday:   { start: '3:00 PM', end: '4:30 PM' },
    Wednesday: { start: '12:00 PM', end: '1:30 PM' },
    Thursday:  { start: '1:30 PM', end: '3:00 PM' },
    Friday:    { start: '10:30 AM', end: '12:00 PM' },
    Saturday:  { start: '9:00 AM', end: '10:30 AM' },
  };

  /* ---- Abhijit Muhurta (best time of day, ~11:48 AM to 12:36 PM IST) ---- */
  const ABHIJIT = { start: '11:48 AM', end: '12:36 PM', note: 'Most auspicious time of day — best for any new beginning' };

  /* ---- Cities Database (Nellore default, major AP, Indian & World cities) ---- */
  const CITIES = {
    nellore:       { id: 'nellore', name: 'Nellore (నెల్లూరు)', state: 'Andhra Pradesh', lat: 14.4426, lon: 79.9865, tz: 5.5, tzName: 'IST' },
    hyderabad:     { id: 'hyderabad', name: 'Hyderabad (హైదరాబాద్)', state: 'Telangana', lat: 17.3850, lon: 78.4867, tz: 5.5, tzName: 'IST' },
    tirupati:      { id: 'tirupati', name: 'Tirupati (తిరుపతి)', state: 'Andhra Pradesh', lat: 13.6288, lon: 79.4192, tz: 5.5, tzName: 'IST' },
    vijayawada:    { id: 'vijayawada', name: 'Vijayawada (విజయవాడ)', state: 'Andhra Pradesh', lat: 16.5062, lon: 80.6480, tz: 5.5, tzName: 'IST' },
    visakhapatnam: { id: 'visakhapatnam', name: 'Visakhapatnam (విశాఖపట్నం)', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185, tz: 5.5, tzName: 'IST' },
    delhi:         { id: 'delhi', name: 'New Delhi / Delhi (ఢిల్లీ)', state: 'National Capital', lat: 28.6139, lon: 77.2090, tz: 5.5, tzName: 'IST' },
    bengaluru:     { id: 'bengaluru', name: 'Bengaluru (బెంగళూరు)', state: 'Karnataka', lat: 12.9716, lon: 77.5946, tz: 5.5, tzName: 'IST' },
    chennai:       { id: 'chennai', name: 'Chennai (చెన్నై)', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707, tz: 5.5, tzName: 'IST' },
    mumbai:        { id: 'mumbai', name: 'Mumbai (ముంబై)', state: 'Maharashtra', lat: 19.0760, lon: 72.8777, tz: 5.5, tzName: 'IST' },
    kolkata:       { id: 'kolkata', name: 'Kolkata (కోల్‌కతా)', state: 'West Bengal', lat: 22.5726, lon: 88.3639, tz: 5.5, tzName: 'IST' },
    varanasi:      { id: 'varanasi', name: 'Varanasi / Kashi (వారణాసి)', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739, tz: 5.5, tzName: 'IST' },
    ayodhya:       { id: 'ayodhya', name: 'Ayodhya (అయోధ్య)', state: 'Uttar Pradesh', lat: 26.7922, lon: 82.1998, tz: 5.5, tzName: 'IST' },
    madurai:       { id: 'madurai', name: 'Madurai (మదురై)', state: 'Tamil Nadu', lat: 9.9252, lon: 78.1198, tz: 5.5, tzName: 'IST' },
    kochi:         { id: 'kochi', name: 'Kochi (కొచ్చి)', state: 'Kerala', lat: 9.9312, lon: 76.2673, tz: 5.5, tzName: 'IST' },
    ahmedabad:     { id: 'ahmedabad', name: 'Ahmedabad (అహ్మదాబాద్)', state: 'Gujarat', lat: 23.0225, lon: 72.5714, tz: 5.5, tzName: 'IST' },
    pune:          { id: 'pune', name: 'Pune (పూణే)', state: 'Maharashtra', lat: 18.5204, lon: 73.8567, tz: 5.5, tzName: 'IST' },
    jaipur:        { id: 'jaipur', name: 'Jaipur (జైపూర్)', state: 'Rajasthan', lat: 26.9124, lon: 75.7873, tz: 5.5, tzName: 'IST' },
    london:        { id: 'london', name: 'London (లండన్)', state: 'United Kingdom', lat: 51.5074, lon: -0.1278, tz: 0.0, tzName: 'GMT/BST' },
    newyork:       { id: 'newyork', name: 'New York (న్యూయార్క్)', state: 'USA (Eastern)', lat: 40.7128, lon: -74.0060, tz: -5.0, tzName: 'EST' },
    sanfrancisco:  { id: 'sanfrancisco', name: 'San Francisco (శాన్ ఫ్రాన్సిస్కో)', state: 'USA (Pacific)', lat: 37.7749, lon: -122.4194, tz: -8.0, tzName: 'PST' },
    dubai:         { id: 'dubai', name: 'Dubai (దుబాయ్)', state: 'United Arab Emirates', lat: 25.2048, lon: 55.2708, tz: 4.0, tzName: 'GST' },
    singapore:     { id: 'singapore', name: 'Singapore (సింగపూర్)', state: 'Singapore', lat: 1.3521, lon: 103.8198, tz: 8.0, tzName: 'SGT' },
    sydney:        { id: 'sydney', name: 'Sydney (సిడ్నీ)', state: 'Australia', lat: -33.8688, lon: 151.2093, tz: 10.0, tzName: 'AEST' }
  };

  function getCity(cityKey) {
    if (typeof cityKey === 'object' && cityKey !== null && typeof cityKey.lat === 'number') {
      return cityKey;
    }
    const key = (typeof cityKey === 'string' ? cityKey.toLowerCase().trim() : '') || 'nellore';
    return CITIES[key] || CITIES.nellore;
  }

  /* ---- Lahiri (Chitrapaksha) Ayanamsa Calculation ---- */
  function getLahiriAyanamsa(dateUTC) {
    const y = dateUTC.getUTCFullYear();
    const frac = y + (dateUTC.getUTCMonth() * 30.5 + dateUTC.getUTCDate()) / 365.25 + (dateUTC.getUTCHours() + dateUTC.getUTCMinutes() / 60) / (24 * 365.25);
    // Lahiri value at J2000.0 is 23° 51' 25.53" = 23.85709167°
    // Precession rate: 50.29 arcseconds per year
    return 23.8570917 + (50.29 / 3600) * (frac - 2000);
  }

  /* ---- Astronomy Engine instance detection ---- */
  function getAstronomyInstance() {
    if (typeof window !== 'undefined' && window.Astronomy) {
      return window.Astronomy;
    }
    if (typeof Astronomy !== 'undefined') {
      return Astronomy;
    }
    if (typeof require !== 'undefined') {
      try {
        return require('./astronomy.browser.min.js');
      } catch (e) {
        try {
          return require('astronomy-engine');
        } catch (e2) {}
      }
    }
    return null;
  }

  /* ---- Julian Day Number (UTC based) ---- */
  function julianDayUTC(dateUTC) {
    let y = dateUTC.getUTCFullYear();
    let m = dateUTC.getUTCMonth() + 1;
    const d = dateUTC.getUTCDate() + (dateUTC.getUTCHours() + (dateUTC.getUTCMinutes() / 60)) / 24;
    if (m <= 2) { y -= 1; m += 12; }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  }

  /* ---- High-Precision Sidereal (Nirayana) Solar & Lunar Coordinates ---- */
  function getSiderealCoordinates(dateUTC) {
    const Astro = getAstronomyInstance();
    const ayanamsa = getLahiriAyanamsa(dateUTC);
    let tropMoon, tropSun;

    if (Astro && Astro.GeoVector && Astro.Ecliptic && Astro.SunPosition) {
      const moonVec = Astro.GeoVector(Astro.Body.Moon, dateUTC, false);
      const moonEcl = Astro.Ecliptic(moonVec);
      const sunPos = Astro.SunPosition(dateUTC);
      tropMoon = moonEcl.elon;
      tropSun = sunPos.elon;
    } else {
      // Analytical high-precision Meeus lunar & solar model
      const jd = julianDayUTC(dateUTC);
      const T = (jd - 2451545.0) / 36525;
      const L0 = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
      const D  = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;
      const M  = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
      const Mm = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
      const F  = 93.2720950  + 483202.0175233 * T - 0.0036539 * T * T;

      const rad = Math.PI / 180;
      let mE = L0 
        + 6.288774 * Math.sin(Mm * rad)
        + 1.274027 * Math.sin((2 * D - Mm) * rad)
        + 0.658314 * Math.sin(2 * D * rad)
        + 0.213618 * Math.sin(2 * Mm * rad)
        - 0.185116 * Math.sin(M * rad)
        - 0.114332 * Math.sin(2 * F * rad)
        + 0.058793 * Math.sin((2 * D - 2 * Mm) * rad)
        + 0.057066 * Math.sin((2 * D - M - Mm) * rad)
        + 0.053322 * Math.sin((2 * D + Mm) * rad)
        + 0.045758 * Math.sin((2 * D - M) * rad)
        - 0.040923 * Math.sin((M - Mm) * rad)
        - 0.034720 * Math.sin(D * rad)
        - 0.030383 * Math.sin((M + Mm) * rad);
      tropMoon = ((mE % 360) + 360) % 360;

      const Lsun = (280.46646 + 36000.76983 * T) % 360;
      const Msun = (357.52911 + 35999.05029 * T) * rad;
      const Csun = (1.914602 - 0.004817 * T) * Math.sin(Msun) + (0.019993 - 0.000101 * T) * Math.sin(2 * Msun);
      tropSun = ((Lsun + Csun) % 360 + 360) % 360;
    }

    const siderealMoon = ((tropMoon - ayanamsa) % 360 + 360) % 360;
    const siderealSun = ((tropSun - ayanamsa) % 360 + 360) % 360;

    return {
      siderealMoon,
      siderealSun,
      ayanamsa,
      tropicalMoon: tropMoon,
      tropicalSun: tropSun
    };
  }

  /* ---- Tithi (lunar day) ---- */
  function getTithi(sunLon, moonLon) {
    let diff = ((moonLon - sunLon) % 360 + 360) % 360;
    const tithiNum = Math.floor(diff / 12);
    const paksha = tithiNum < 15 ? 0 : 1;
    const tithiIndex = tithiNum % 15;
    const name = tithiIndex === 14
      ? (paksha === 0 ? 'Purnima' : 'Amavasya')
      : TITHIS[tithiIndex];
    return {
      number: tithiNum + 1,
      name,
      paksha: PAKSHA[paksha],
      isPurnima: tithiIndex === 14 && paksha === 0,
      isAmavasya: tithiIndex === 14 && paksha === 1,
      pakshaShort: paksha === 0 ? 'Shukla' : 'Krishna',
    };
  }

  /* ---- Nakshatra & Pada ---- */
  function getNakshatra(siderealMoonLon) {
    const idx = Math.floor(siderealMoonLon / (360 / 27));
    const pada = Math.floor((siderealMoonLon % (360 / 27)) / (360 / 108)) + 1;
    return { name: NAKSHATRAS[idx], pada, index: idx };
  }

  /* ---- Yoga ---- */
  function getYoga(sunLon, moonLon) {
    const combined = ((sunLon + moonLon) % 360 + 360) % 360;
    const idx = Math.floor(combined / (360 / 27));
    return YOGAS[idx];
  }

  /* ---- Karana ---- */
  function getKarana(sunLon, moonLon) {
    let diff = ((moonLon - sunLon) % 360 + 360) % 360;
    const karanaNum = Math.floor(diff / 6) % 11;
    return KARANAS[karanaNum];
  }

  /* ---- Chandra Rasi (Moon sign) ---- */
  function getRasi(siderealMoonLon) {
    return RASIS[Math.floor(siderealMoonLon / 30)];
  }

  /* ---- Exact 4 Nakshatra Padas Timings Calculation ---- */
  function getNakshatraPadaTimings(dateUTC, cityKey = 'nellore') {
    const city = getCity(cityKey);
    const tzOffsetHours = city.tz;
    const coords = getSiderealCoordinates(dateUTC);
    const starIdx = Math.floor(coords.siderealMoon / (360 / 27));
    const currentPada = Math.floor((coords.siderealMoon % (360 / 27)) / (360 / 108)) + 1;
    const starBaseDeg = starIdx * (360 / 27);

    const boundaries = [0, 1, 2, 3, 4].map(p => (starBaseDeg + p * (360 / 108)) % 360);

    function findCrossing(targetDeg, refTimeMs) {
      let low = refTimeMs - 30 * 3600 * 1000;
      let high = refTimeMs + 30 * 3600 * 1000;
      for (let iter = 0; iter < 32; iter++) {
        let mid = (low + high) / 2;
        let c = getSiderealCoordinates(new Date(mid));
        let diff = c.siderealMoon - targetDeg;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;
        if (diff < 0) {
          low = mid;
        } else {
          high = mid;
        }
      }
      return new Date((low + high) / 2);
    }

    const refTime = dateUTC.getTime();
    const times = boundaries.map(deg => findCrossing(deg, refTime));

    function formatLocal(dt) {
      const loc = new Date(dt.getTime() + tzOffsetHours * 3600 * 1000);
      const day = loc.getUTCDate();
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const month = months[loc.getUTCMonth()];
      const year = loc.getUTCFullYear();
      let h = loc.getUTCHours();
      const m = loc.getUTCMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${day} ${month} ${year} ${h}:${m} ${ampm}`;
    }

    return {
      starName: NAKSHATRAS[starIdx],
      starIndex: starIdx,
      currentPada,
      city: city.name,
      cityName: city.name.split('(')[0].trim(),
      tzName: city.tzName,
      pada1: { pada: 1, start: formatLocal(times[0]), end: formatLocal(times[1]), rawStart: times[0], rawEnd: times[1] },
      pada2: { pada: 2, start: formatLocal(times[1]), end: formatLocal(times[2]), rawStart: times[1], rawEnd: times[2] },
      pada3: { pada: 3, start: formatLocal(times[2]), end: formatLocal(times[3]), rawStart: times[2], rawEnd: times[3] },
      pada4: { pada: 4, start: formatLocal(times[3]), end: formatLocal(times[4]), rawStart: times[3], rawEnd: times[4] }
    };
  }

  /* ---- City Sunrise and Sunset ---- */
  function getCitySunriseSunset(date, cityKey = 'nellore') {
    const city = getCity(cityKey);
    const Astro = getAstronomyInstance();
    const formatTime = (d) => {
      let h = d.getUTCHours();
      const m = d.getUTCMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      return `${h}:${m} ${ampm}`;
    };

    if (Astro && Astro.Observer && Astro.SearchRiseSet) {
      const observer = new Astro.Observer(city.lat, city.lon, 20);
      const localMidnightMs = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      const midnightUTC = new Date(localMidnightMs - city.tz * 3600 * 1000);
      try {
        const rise = Astro.SearchRiseSet(Astro.Body.Sun, observer, +1, midnightUTC, 1.2);
        const set = Astro.SearchRiseSet(Astro.Body.Sun, observer, -1, midnightUTC, 1.2);
        if (rise && set) {
          const riseLocal = new Date(rise.date.getTime() + city.tz * 3600 * 1000);
          const setLocal = new Date(set.date.getTime() + city.tz * 3600 * 1000);
          return {
            sunrise: riseLocal,
            sunset: setLocal,
            sunriseStr: formatTime(riseLocal),
            sunsetStr: formatTime(setLocal)
          };
        }
      } catch (e) {}
    }

    const d = new Date(date);
    d.setHours(6, 0, 0, 0);
    const setD = new Date(date);
    setD.setHours(18, 0, 0, 0);
    return {
      sunrise: d,
      sunset: setD,
      sunriseStr: '6:00 AM',
      sunsetStr: '6:00 PM'
    };
  }

  /* ---- Full Panchang for a date ---- */
  function getPanchang(date = new Date(), cityKey = 'nellore') {
    const city = getCity(cityKey);
    let dateUTC;

    if (date instanceof Date && !isNaN(date.getTime())) {
      dateUTC = date;
    } else {
      dateUTC = new Date();
    }

    const coords = getSiderealCoordinates(dateUTC);
    const tithi = getTithi(coords.siderealSun, coords.siderealMoon);
    const nakshatra = getNakshatra(coords.siderealMoon);
    const yoga = getYoga(coords.siderealSun, coords.siderealMoon);
    const karana = getKarana(coords.siderealSun, coords.siderealMoon);
    const rasi = getRasi(coords.siderealMoon);

    // Compute local date for display
    const localDate = new Date(dateUTC.getTime() + city.tz * 3600 * 1000);
    const dayName = WEEKDAYS[localDate.getUTCDay()];
    const dayDeity = WEEKDAY_DEITIES[localDate.getUTCDay()];
    const rahukaal = RAHUKAAL[dayName];
    const sunTimes = getCitySunriseSunset(localDate, cityKey);

    // Auspicious/inauspicious flags
    const isBadYoga = ['Vishkamba','Atiganda','Shula','Ganda','Vyaghata','Vajra','Vyatipata','Parigha','Vaidhriti'].includes(yoga);
    const isGoodYoga = ['Siddhi','Shubha','Shukla','Saubhagya','Vriddhi','Brahma','Priti','Amruta'].includes(yoga);
    const isBadTithi = ['Chaturdashi','Ashtami'].includes(tithi.name) && tithi.pakshaShort === 'Krishna';
    const isGoodTithi = ['Purnima','Ekadashi','Panchami','Saptami','Pratipada'].includes(tithi.name);
    const isGoodVara = ['Monday','Wednesday','Thursday','Friday'].includes(dayName);

    let overallScore = 50;
    if (isGoodYoga) overallScore += 20;
    if (isBadYoga) overallScore -= 20;
    if (isGoodTithi) overallScore += 15;
    if (isBadTithi) overallScore -= 15;
    if (isGoodVara) overallScore += 10;

    return {
      date: localDate,
      dateUTC,
      city,
      dateStr: localDate.toLocaleDateString('en-IN', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      dayName,
      dayDeity,
      tithi,
      nakshatra,
      yoga,
      karana,
      rasi,
      rahukaal,
      abhijit: ABHIJIT,
      sunrise: sunTimes.sunrise,
      sunset: sunTimes.sunset,
      sunriseStr: sunTimes.sunriseStr,
      sunsetStr: sunTimes.sunsetStr,
      isBadYoga,
      isGoodYoga,
      isGoodTithi,
      isBadTithi,
      isGoodVara,
      overallScore: Math.min(100, Math.max(0, overallScore)),
      ayanamsa: coords.ayanamsa,
      ayanamsaDeg: coords.ayanamsa.toFixed(4) + '°',
      sunLon: coords.siderealSun.toFixed(2),
      moonLon: coords.siderealMoon.toFixed(2),
      tropicalMoonLon: coords.tropicalMoon.toFixed(2),
      tropicalSunLon: coords.tropicalSun.toFixed(2)
    };
  }

  /* ---- Auspicious rating for a specific deity ---- */
  function getRatingForGod(panchang, god) {
    let score = panchang.overallScore;
    let reasons = [];
    let avoid = [];

    // Check good days for deity
    if (god.goodDays.some(d => d.toLowerCase().includes(panchang.dayName.toLowerCase()))) {
      score += 20;
      reasons.push(`✅ ${panchang.dayName} is sacred for ${god.name}`);
    }
    // Check good tithis for deity
    if (god.goodDays.some(d => d.includes(panchang.tithi.name))) {
      score += 15;
      reasons.push(`✅ ${panchang.tithi.name} Tithi is auspicious for ${god.name}`);
    }
    // Check good nakshatras
    if (god.goodNakshatras.includes(panchang.nakshatra.name)) {
      score += 15;
      reasons.push(`✅ ${panchang.nakshatra.name} Nakshatra is blessed for ${god.name}`);
    }
    // Check avoid tithis
    if (god.avoidTithi && god.avoidTithi.includes(panchang.tithi.name)) {
      score -= 25;
      avoid.push(`⚠️ ${panchang.tithi.name} Tithi is less ideal for ${god.name}`);
    }
    // Check avoid days
    if (god.avoidDays && god.avoidDays.some(d => d.toLowerCase().includes(panchang.dayName.toLowerCase()))) {
      score -= 25;
      avoid.push(`⚠️ ${panchang.dayName} is less ideal for ${god.name}`);
    }
    // Purnima & Ekadashi are always good
    if (panchang.tithi.isPurnima) {
      score += 10; reasons.push('✅ Purnima — auspicious for all deities');
    }
    if (panchang.tithi.name === 'Ekadashi') {
      score += 10; reasons.push('✅ Ekadashi — most auspicious Tithi');
    }
    // Bad yoga is universal
    if (panchang.isBadYoga) {
      avoid.push(`⚠️ ${panchang.yoga} Yoga — best to avoid major new rituals`);
    }

    score = Math.min(100, Math.max(0, score));
    const rating = score >= 80 ? 'Excellent' : score >= 65 ? 'Very Good' : score >= 50 ? 'Good' : score >= 35 ? 'Moderate' : 'Avoid';
    const stars = score >= 80 ? '⭐⭐⭐⭐⭐' : score >= 65 ? '⭐⭐⭐⭐' : score >= 50 ? '⭐⭐⭐' : score >= 35 ? '⭐⭐' : '⭐';

    return { score, rating, stars, reasons, avoid };
  }

  /* ---- Get next N days panchang for a deity ---- */
  function getUpcomingDays(god, days = 7) {
    const results = [];
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      d.setHours(6, 0, 0, 0); // Panchang at sunrise (6 AM)
      const p = getPanchang(d);
      const rating = getRatingForGod(p, god);
      results.push({ panchang: p, rating });
    }
    return results.sort((a, b) => b.rating.score - a.rating.score);
  }

  /* ---- Special festival/fasting days 2026–2028 ---- */
  const SPECIAL_DAYS = {
    '2026': [
      { date: '2026-01-14', name: 'Makar Sankranti', deity: 'Surya', type: 'festival' },
      { date: '2026-02-16', name: 'Maha Shivaratri', deity: 'Shiva', type: 'major-festival' },
      { date: '2026-03-24', name: 'Holi', deity: 'Krishna', type: 'festival' },
      { date: '2026-04-06', name: 'Vasanta Navratri Begins', deity: 'Durga', type: 'navratri' },
      { date: '2026-04-14', name: 'Rama Navami', deity: 'Vishnu', type: 'major-festival' },
      { date: '2026-05-06', name: 'Akshaya Tritiya', deity: 'Lakshmi', type: 'major-muhurta' },
      { date: '2026-08-19', name: 'Janmashtami', deity: 'Krishna', type: 'major-festival' },
      { date: '2026-08-22', name: 'Ganesh Chaturthi', deity: 'Ganesha', type: 'major-festival' },
      { date: '2026-09-20', name: 'Sharada Navratri Begins', deity: 'Durga', type: 'navratri' },
      { date: '2026-10-19', name: 'Karva Chauth', deity: 'Shiva', type: 'festival' },
      { date: '2026-10-20', name: 'Diwali', deity: 'Lakshmi', type: 'major-festival' },
      { date: '2026-11-08', name: 'Kartik Purnima', deity: 'Vishnu', type: 'major-muhurta' },
      { date: '2026-12-03', name: 'Karthigai Deepam', deity: 'Murugan', type: 'festival' },
    ],
    '2027': [
      { date: '2027-01-14', name: 'Makar Sankranti', deity: 'Surya', type: 'festival' },
      { date: '2027-02-26', name: 'Maha Shivaratri', deity: 'Shiva', type: 'major-festival' },
      { date: '2027-04-25', name: 'Akshaya Tritiya', deity: 'Lakshmi', type: 'major-muhurta' },
      { date: '2027-09-08', name: 'Janmashtami', deity: 'Krishna', type: 'major-festival' },
      { date: '2027-09-11', name: 'Ganesh Chaturthi', deity: 'Ganesha', type: 'major-festival' },
      { date: '2027-10-09', name: 'Sharada Navratri Begins', deity: 'Durga', type: 'navratri' },
      { date: '2027-10-19', name: 'Diwali', deity: 'Lakshmi', type: 'major-festival' },
      { date: '2027-11-27', name: 'Kartik Purnima', deity: 'Vishnu', type: 'major-muhurta' },
    ],
    '2028': [
      { date: '2028-01-14', name: 'Makar Sankranti', deity: 'Surya', type: 'festival' },
      { date: '2028-03-07', name: 'Maha Shivaratri', deity: 'Shiva', type: 'major-festival' },
      { date: '2028-04-13', name: 'Akshaya Tritiya', deity: 'Lakshmi', type: 'major-muhurta' },
      { date: '2028-08-26', name: 'Janmashtami', deity: 'Krishna', type: 'major-festival' },
      { date: '2028-08-29', name: 'Ganesh Chaturthi', deity: 'Ganesha', type: 'major-festival' },
      { date: '2028-09-27', name: 'Sharada Navratri Begins', deity: 'Durga', type: 'navratri' },
      { date: '2028-11-05', name: 'Diwali', deity: 'Lakshmi', type: 'major-festival' },
    ],
  };

  function getUpcomingFestivals(godId, limit = 5) {
    const today = new Date();
    const allFestivals = Object.values(SPECIAL_DAYS).flat();
    return allFestivals
      .filter(f => new Date(f.date) >= today && (f.deity.toLowerCase() === godId.toLowerCase() || f.deity === 'All'))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }

  /* ---- Choghadiya ---- */
  function getChoghadiya(sunrise, sunset) {
    const dayLabels = ['Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog', 'Udveg'];
    const nightLabels = ['Rog', 'Kaal', 'Labh', 'Udveg', 'Shubh', 'Amrit', 'Char', 'Rog'];
    const dayDuration = (sunset.getTime() - sunrise.getTime()) / 8;
    const nextSunrise = new Date(sunrise.getTime() + 24 * 60 * 60 * 1000);
    const nightDuration = (nextSunrise.getTime() - sunset.getTime()) / 8;

    const day = dayLabels.map((label, i) => {
      const start = new Date(sunrise.getTime() + i * dayDuration);
      const end = new Date(sunrise.getTime() + (i + 1) * dayDuration);
      return { label, start, end };
    });

    const night = nightLabels.map((label, i) => {
      const start = new Date(sunset.getTime() + i * nightDuration);
      const end = new Date(sunset.getTime() + (i + 1) * nightDuration);
      return { label, start, end };
    });

    return { day, night };
  }

  /* ---- Yamagandam & Gulika Kalam ---- */
  const YAMAGANDAM = {
    Sunday: { start: '12:00 PM', end: '1:30 PM' },
    Monday: { start: '10:30 AM', end: '12:00 PM' },
    Tuesday: { start: '9:00 AM', end: '10:30 AM' },
    Wednesday: { start: '7:30 AM', end: '9:00 AM' },
    Thursday: { start: '1:30 PM', end: '3:00 PM' },
    Friday: { start: '3:00 PM', end: '4:30 PM' },
    Saturday: { start: '4:30 PM', end: '6:00 PM' }
  };
  function getYamagandam(weekday) {
    return YAMAGANDAM[weekday];
  }

  const GULIKA_KALAM = {
    Sunday: { start: '3:00 PM', end: '4:30 PM' },
    Monday: { start: '1:30 PM', end: '3:00 PM' },
    Tuesday: { start: '12:00 PM', end: '1:30 PM' },
    Wednesday: { start: '10:30 AM', end: '12:00 PM' },
    Thursday: { start: '9:00 AM', end: '10:30 AM' },
    Friday: { start: '7:30 AM', end: '9:00 AM' },
    Saturday: { start: '6:00 AM', end: '7:30 AM' }
  };
  function getGulikaKalam(weekday) {
    return GULIKA_KALAM[weekday];
  }

  /* ---- Tarabalam ---- */
  function getTarabalam(birthNakshatra, currentNakshatra) {
    const bIndex = NAKSHATRAS.indexOf(birthNakshatra);
    const cIndex = NAKSHATRAS.indexOf(currentNakshatra);
    if (bIndex === -1 || cIndex === -1) return null;
    
    let diff = (cIndex - bIndex) >= 0 ? (cIndex - bIndex) + 1 : (cIndex - bIndex + 27) + 1;
    const taraNum = diff % 9 === 0 ? 9 : diff % 9;
    
    const descriptions = [
      { name: 'Janma', isGood: false, desc: 'Danger/Not ideal for new beginnings' },
      { name: 'Sampat', isGood: true, desc: 'Wealth and prosperity' },
      { name: 'Vipat', isGood: false, desc: 'Loss or accidents' },
      { name: 'Kshema', isGood: true, desc: 'Prosperity and well-being' },
      { name: 'Pratyari', isGood: false, desc: 'Obstacles and enmity' },
      { name: 'Sadhaka', isGood: true, desc: 'Success and achievement' },
      { name: 'Vadha', isGood: false, desc: 'Danger/Severe obstacles' },
      { name: 'Mitra', isGood: true, desc: 'Friendship and support' },
      { name: 'Parama Mitra', isGood: true, desc: 'Intimate friendship/Great support' }
    ];
    
    const data = descriptions[taraNum - 1];
    return { tara: taraNum, name: data.name, isGood: data.isGood, description: data.desc };
  }

  /* ---- Chandrabalam ---- */
  function getChandrabalam(birthRashi, moonRashi) {
    const bIndex = RASIS.indexOf(birthRashi);
    const cIndex = RASIS.indexOf(moonRashi);
    if (bIndex === -1 || cIndex === -1) return null;
    
    let position = (cIndex - bIndex) >= 0 ? (cIndex - bIndex) + 1 : (cIndex - bIndex + 12) + 1;
    const badPositions = [1, 2, 3, 5, 7];
    const isGood = !badPositions.includes(position);
    
    return { position, isGood, description: isGood ? 'Auspicious Moon transit' : 'Inauspicious Moon transit' };
  }

  /* ---- getPanchangForDate Wrapper ---- */
  function getPanchangForDate(date) {
    const p = getPanchang(date);
    const yStr = date.getFullYear().toString();
    const mStr = String(date.getMonth() + 1).padStart(2, '0');
    const dStr = String(date.getDate()).padStart(2, '0');
    const fullDateStr = `${yStr}-${mStr}-${dStr}`;
    
    const festivalsList = SPECIAL_DAYS[yStr] || [];
    const todaysFestivals = festivalsList.filter(f => f.date === fullDateStr).map(f => f.name);

    // Mock sunrise 6am and sunset 6pm local
    const sunrise = new Date(date);
    sunrise.setHours(6, 0, 0, 0);
    const sunset = new Date(date);
    sunset.setHours(18, 0, 0, 0);

    return {
      tithi: p.tithi,
      nakshatra: p.nakshatra,
      yoga: p.yoga,
      karana: p.karana,
      vara: p.dayName,
      rahukaal: p.rahukaal,
      abhijit: p.abhijit,
      sunrise,
      sunset,
      moonRashi: p.rasi,
      festivals: todaysFestivals
    };
  }

  /* ---- Vedanga Jyotisha 5-Year Yuga Integration ---- */
  function getVedangaYugaPanchang(date) {
    if (typeof VEDANGA_JYOTISHA !== 'undefined') {
      return VEDANGA_JYOTISHA.getYugaStateForDate(date);
    }
    try {
      const v = require('./vedanga-jyotisha.js').VEDANGA_JYOTISHA;
      if (v) return v.getYugaStateForDate(date);
    } catch (e) { /* ignore */ }
    return null;
  }

  /* Public API */
  return { 
    getPanchang, getRatingForGod, getUpcomingDays, getUpcomingFestivals, 
    getChoghadiya, getYamagandam, getGulikaKalam, getTarabalam, getChandrabalam, getPanchangForDate,
    getVedangaYugaPanchang,
    getLahiriAyanamsa, getSiderealCoordinates, getNakshatraPadaTimings, getCitySunriseSunset, getCity,
    CITIES,
    TITHIS, NAKSHATRAS, WEEKDAYS, RAHUKAAL, ABHIJIT, RASIS, festivals: SPECIAL_DAYS 
  };
})();

if (typeof window !== 'undefined') {
  window.PANCHANG = PANCHANG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PANCHANG };
}

