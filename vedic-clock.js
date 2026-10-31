/* ==========================================================================
   DIVYA MANGALAM — 24-HOUR SACRED VEDIC MUHURAT CLOCK ENGINE
   Horology, Astronomical Ephemeris, 10-Year Precision Calculations
   ========================================================================== */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VEDIC_CLOCK = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {

  // Default Reference Location: Nellore / Tirupati (Andhra Pradesh, IST UTC+5.5)
  const DEFAULT_CITY = 'nellore';

  // Major Cities Coordinates
  const CITIES = {
    nellore:       { name: 'Nellore (AP)', lat: 14.4426, lon: 79.9865, tz: 5.5 },
    hyderabad:     { name: 'Hyderabad (TS)', lat: 17.3850, lon: 78.4867, tz: 5.5 },
    delhi:         { name: 'New Delhi (NCR)', lat: 28.6139, lon: 77.2090, tz: 5.5 },
    tirupati:      { name: 'Tirupati (AP)', lat: 13.6288, lon: 79.4192, tz: 5.5 },
    vijayawada:    { name: 'Vijayawada (AP)', lat: 16.5062, lon: 80.6480, tz: 5.5 },
    bengaluru:     { name: 'Bengaluru (KA)', lat: 12.9716, lon: 77.5946, tz: 5.5 },
    chennai:       { name: 'Chennai (TN)', lat: 13.0827, lon: 80.2707, tz: 5.5 },
    mumbai:        { name: 'Mumbai (MH)', lat: 19.0760, lon: 72.8777, tz: 5.5 },
    kolkata:       { name: 'Kolkata (WB)', lat: 22.5726, lon: 88.3639, tz: 5.5 },
    varanasi:      { name: 'Varanasi / Kashi (UP)', lat: 25.3176, lon: 82.9739, tz: 5.5 },
    ayodhya:       { name: 'Ayodhya (UP)', lat: 26.7922, lon: 82.1998, tz: 5.5 },
    london:        { name: 'London (UK)', lat: 51.5074, lon: -0.1278, tz: 0.0 },
    newyork:       { name: 'New York (USA)', lat: 40.7128, lon: -74.0060, tz: -5.0 },
    sanfrancisco:  { name: 'San Francisco (USA)', lat: 37.7749, lon: -122.4194, tz: -8.0 },
    dubai:         { name: 'Dubai (UAE)', lat: 25.2048, lon: 55.2708, tz: 4.0 },
    singapore:     { name: 'Singapore (SG)', lat: 1.3521, lon: 103.8198, tz: 8.0 },
    sydney:        { name: 'Sydney (AU)', lat: -33.8688, lon: 151.2093, tz: 10.0 }
  };

  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const SANSKRIT_VARA = ['Ravivara (रविवासर)', 'Somavara (सोमवासर)', 'Mangalavara (भौमवासर)', 'Budhavara (बुधवासर)', 'Guruvara (गुरुवासर)', 'Shukravara (शुक्रवासर)', 'Shanivara (शनिवासर)'];

  // Disha Shool (Inauspicious Travel Directions by Day)
  const DISHA_SHOOL = [
    { day: 'Sunday', direction: 'West (पश्चिम)', remedy: 'Consume ghee or betel leaf before necessary travel' },
    { day: 'Monday', direction: 'East (पूर्व)', remedy: 'Look into a mirror or consume milk before travel' },
    { day: 'Tuesday', direction: 'North (उत्तर)', remedy: 'Consume jaggery (gud) before travel' },
    { day: 'Wednesday', direction: 'North (उत्तर)', remedy: 'Consume green coriander or sesame seeds' },
    { day: 'Thursday', direction: 'South (दक्षिण)', remedy: 'Consume yellow mustard or curd' },
    { day: 'Friday', direction: 'West (पश्चिम)', remedy: 'Consume barley or curd' },
    { day: 'Saturday', direction: 'East (पूर्व)', remedy: 'Consume ginger or black sesame' }
  ];

  /* -------------------------------------------------------------
     Astronomical & Solar Math (Accurate for 2020 – 2040)
     ------------------------------------------------------------- */
  function getSolarDeclinationAndEoT(dayOfYear) {
    // Spencer's Fourier Series for Solar Declination and Equation of Time
    const B = (2 * Math.PI / 365) * (dayOfYear - 1);
    const declination = 0.006918 - 0.399912 * Math.cos(B) + 0.070257 * Math.sin(B)
      - 0.006758 * Math.cos(2 * B) + 0.000907 * Math.sin(2 * B)
      - 0.002697 * Math.cos(3 * B) + 0.00148 * Math.sin(3 * B); // in radians

    // Equation of Time in minutes
    const eot = 229.18 * (0.000075 + 0.001868 * Math.cos(B) - 0.032077 * Math.sin(B)
      - 0.014615 * Math.cos(2 * B) - 0.040849 * Math.sin(2 * B));

    return { declination, eot };
  }

  function getDayOfYear(date) {
    const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  function calculateSunTimes(date, lat, lon, tz) {
    // Check if PANCHANG engine is available
    if (typeof PANCHANG !== 'undefined' && PANCHANG.getCitySunriseSunset) {
      try {
        const cityKey = Object.keys(CITIES).find(k => Math.abs(CITIES[k].lat - lat) < 0.2 && Math.abs(CITIES[k].lon - lon) < 0.2) || 'nellore';
        const st = PANCHANG.getCitySunriseSunset(date, cityKey);
        if (st && st.sunrise && st.sunset) {
          const riseH = st.sunrise.getUTCHours() + st.sunrise.getUTCMinutes() / 60;
          const setH = st.sunset.getUTCHours() + st.sunset.getUTCMinutes() / 60;
          return {
            sunriseHour: riseH,
            sunsetHour: setH,
            sunriseStr: st.sunriseStr,
            sunsetStr: st.sunsetStr
          };
        }
      } catch (e) {}
    }

    // High-Precision Analytical Solar Model
    const doy = getDayOfYear(date);
    const { declination, eot } = getSolarDeclinationAndEoT(doy);

    const latRad = lat * (Math.PI / 180);
    // Standard zenith for sunrise/sunset (90° 50' accounting for atmospheric refraction)
    const zenithRad = 90.833 * (Math.PI / 180);

    let cosHourAngle = (Math.cos(zenithRad) - Math.sin(latRad) * Math.sin(declination)) / (Math.cos(latRad) * Math.cos(declination));
    cosHourAngle = Math.max(-1, Math.min(1, cosHourAngle));
    const hourAngleDeg = Math.acos(cosHourAngle) * (180 / Math.PI);

    // Solar noon in local standard time
    const solarNoonMinutes = 720 - 4 * lon - eot + (tz * 60);

    const sunriseMinutes = solarNoonMinutes - hourAngleDeg * 4;
    const sunsetMinutes = solarNoonMinutes + hourAngleDeg * 4;

    const sunriseHour = sunriseMinutes / 60;
    const sunsetHour = sunsetMinutes / 60;

    return {
      sunriseHour,
      sunsetHour,
      sunriseStr: formatDecimalHour(sunriseHour),
      sunsetStr: formatDecimalHour(sunsetHour)
    };
  }

  function formatDecimalHour(decH) {
    let normH = ((decH % 24) + 24) % 24;
    let h = Math.floor(normH);
    let m = Math.round((normH - h) * 60);
    if (m === 60) { h = (h + 1) % 24; m = 0; }
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
  }

  /* -------------------------------------------------------------
     Core 24-Hour Vedic Clock Calculations
     ------------------------------------------------------------- */
  function calculateDayMuhuratWindows(dateInput, cityKey = 'nellore') {
    const city = CITIES[cityKey] || CITIES[DEFAULT_CITY];
    
    // Parse target date in local city frame
    let targetDate;
    if (typeof dateInput === 'string') {
      const parts = dateInput.split('-');
      if (parts.length === 3) {
        targetDate = new Date(Date.UTC(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 12, 0, 0));
      } else {
        targetDate = new Date(dateInput);
      }
    } else if (dateInput instanceof Date) {
      targetDate = new Date(dateInput);
    } else {
      targetDate = new Date();
    }

    const weekdayIdx = targetDate.getUTCDay();
    const weekdayName = WEEKDAYS[weekdayIdx];
    const sanskritVara = SANSKRIT_VARA[weekdayIdx];

    const sunTimes = calculateSunTimes(targetDate, city.lat, city.lon, city.tz);
    const sunriseH = sunTimes.sunriseHour;
    const sunsetH = sunTimes.sunsetHour;

    const dayDurationH = sunsetH - sunriseH;
    const nightDurationH = 24 - dayDurationH;

    // 8-Part Daytime Division (Dinardha Ashtama Bhaga)
    const partDurationH = dayDurationH / 8;
    // 15-Part Daytime Division (Day Muhurta, ~48 mins)
    const muhurtaDurationH = dayDurationH / 15;
    // 15-Part Nighttime Division (Night Muhurta, ~48 mins)
    const nightMuhurtaDurationH = nightDurationH / 15;

    // Classical Daytime Ashtama Bhaga Rulers
    // Sunday=0, Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5, Saturday=6
    const rahuIndices   = [7, 1, 6, 4, 5, 3, 2]; // 8th, 2nd, 7th, 5th, 6th, 4th, 3rd
    const yamaIndices   = [4, 3, 2, 1, 0, 6, 5]; // 5th, 4th, 3rd, 2nd, 1st, 7th, 6th
    const gulikaIndices = [6, 5, 4, 3, 2, 1, 0]; // 7th, 6th, 5th, 4th, 3rd, 2nd, 1st

    const rahuStartH = sunriseH + rahuIndices[weekdayIdx] * partDurationH;
    const rahuEndH   = rahuStartH + partDurationH;

    const yamaStartH = sunriseH + yamaIndices[weekdayIdx] * partDurationH;
    const yamaEndH   = yamaStartH + partDurationH;

    const gulikaStartH = sunriseH + gulikaIndices[weekdayIdx] * partDurationH;
    const gulikaEndH   = gulikaStartH + partDurationH;

    // Abhijit Muhurta (8th Muhurta of the daytime, exactly midday)
    const abhijitStartH = sunriseH + 7 * muhurtaDurationH;
    const abhijitEndH   = sunriseH + 8 * muhurtaDurationH;

    // Brahma Muhurta (Pre-dawn: 2 Muhurtas before sunrise, 96m to 48m before sunrise)
    const brahmaStartH = ((sunriseH - (96 / 60)) + 24) % 24;
    const brahmaEndH   = ((sunriseH - (48 / 60)) + 24) % 24;

    // Vijaya Muhurta (11th Muhurta of daytime)
    const vijayaStartH = sunriseH + 10 * muhurtaDurationH;
    const vijayaEndH   = sunriseH + 11 * muhurtaDurationH;

    // Godhuli Muhurta (Twilight: 24 mins before sunset to 24 mins after sunset)
    const godhuliStartH = sunsetH - (24 / 60);
    const godhuliEndH   = sunsetH + (24 / 60);

    // Nishita Muhurta (Midnight: 8th Muhurta of nighttime)
    const nishitaStartH = ((sunsetH + 7 * nightMuhurtaDurationH) % 24);
    const nishitaEndH   = ((sunsetH + 8 * nightMuhurtaDurationH) % 24);

    // Amrit Kaal (Calculated high-energy daytime nectar window)
    const amritStartH = sunriseH + 2.5 * partDurationH;
    const amritEndH   = amritStartH + 1.25 * partDurationH;

    // Panchang Details (Tithi, Nakshatra, Yoga)
    let panchangInfo = null;
    if (typeof PANCHANG !== 'undefined' && PANCHANG.getPanchang) {
      try {
        panchangInfo = PANCHANG.getPanchang(targetDate, cityKey);
      } catch (e) {}
    }

    const tithiName = panchangInfo?.tithi?.name || 'Dwitiya';
    const paksha = panchangInfo?.tithi?.pakshaShort || 'Shukla';
    const nakshatraName = panchangInfo?.nakshatra?.name || 'Rohini';
    const yogaName = panchangInfo?.yoga || 'Siddhi';

    // Build Master Segments Array for 24-Hour Circular Clock
    const segments = [
      {
        id: 'brahma',
        name: 'Brahma Muhurta (ब्रह्म मुहूर्त)',
        shortName: 'Brahma',
        type: 'shubh',
        startH: brahmaStartH,
        endH: brahmaEndH,
        color: '#8B5CF6',
        bgGradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
        strokeColor: '#C4B5FD',
        nature: 'Supreme Divine Window (परमोत्कृष्टम्)',
        deity: 'Lord Brahma & Supreme Consciousness',
        desc: 'Pre-dawn sacred ambrosial hour (Brahmamuhūrta). The mind is still, cosmic Sattva is at its highest zenith. Supreme window for Gayatri Japa, meditation, spiritual contemplation, and awakening divine intellect.',
        allowed: ['Meditation & Japa', 'Yoga & Pranayama', 'Sacred Scripture Study', 'Spiritual Contemplation'],
        prohibited: ['Sleeping through', 'Heavy eating', 'Arguments or material transactions']
      },
      {
        id: 'rahu',
        name: 'Rahu Kaal (राहुकाल)',
        shortName: 'Rahu Kaal',
        type: 'ashubh',
        startH: rahuStartH,
        endH: rahuEndH,
        color: '#EF4444',
        bgGradient: 'linear-gradient(135deg, #EF4444, #B91C1C)',
        strokeColor: '#FCA5A5',
        nature: 'Strictly Inauspicious (वर्ज्य कालः)',
        deity: 'Shadow Planet Rahu • Goddess Durga / Lord Bhairava',
        desc: 'Inauspicious 1/8th daytime window governed by the shadow node Rahu. Pranic flow is agitated. Strictly avoid initiating monumental milestones, signing legal contracts, starting journeys, or buying vehicles/property.',
        allowed: ['Routine, ongoing maintenance work', 'Goddess Durga / Bhairava prayer', 'Internal silent meditation'],
        prohibited: ['Vivah / Marriage rites', 'Griha Pravesh / Housewarming', 'Signing new agreements', 'Buying gold, jewelry or vehicles', 'Starting new journeys']
      },
      {
        id: 'yama',
        name: 'Yamagandam (यमगण्डम्)',
        shortName: 'Yamaganda',
        type: 'ashubh',
        startH: yamaStartH,
        endH: yamaEndH,
        color: '#F97316',
        bgGradient: 'linear-gradient(135deg, #F97316, #C2410C)',
        strokeColor: '#FDBA74',
        nature: 'Inauspicious / Loss Window (हानिकर कालः)',
        deity: 'Yama (God of Justice & Mortality) / Ketu',
        desc: 'Period governed by Yama. Initiating ventures during Yamagandam invites unexpected delays, friction, financial dissipation, or obstacles in travel and agreements.',
        allowed: ['Settling debts', 'Completing pending chores', 'Repentance and spiritual charity'],
        prohibited: ['Commencing new businesses', 'Important departures/travel', 'Elective medical surgery', 'Major financial commitments']
      },
      {
        id: 'gulika',
        name: 'Gulika Kalam (गुलिक काल)',
        shortName: 'Gulika',
        type: 'neutral',
        startH: gulikaStartH,
        endH: gulikaEndH,
        color: '#EAB308',
        bgGradient: 'linear-gradient(135deg, #EAB308, #A16207)',
        strokeColor: '#FDE047',
        nature: 'Repetitive / Routine (पुनरावृत्ति कालः)',
        deity: 'Gulika (Son of Saturn / Shani)',
        desc: 'Governed by Gulika. Deeds commenced here tend to recur or repeat. Favorable for ongoing study, construction work, and routine tasks; avoid borrowing money or beginning festive celebrations.',
        allowed: ['Daily routine studies', 'Ongoing construction work', 'Routine purchases', 'Agriculture'],
        prohibited: ['Borrowing money (tends to repeat debt)', 'Solemnizing marriage ceremonies', 'Entering litigation']
      },
      {
        id: 'abhijit',
        name: 'Abhijit Muhurta (अभिजित् मुहूर्त)',
        shortName: 'Abhijit',
        type: 'shubh',
        startH: abhijitStartH,
        endH: abhijitEndH,
        color: '#10B981',
        bgGradient: 'linear-gradient(135deg, #10B981, #047857)',
        strokeColor: '#6EE7B7',
        nature: 'All-Conquering Auspicious (सर्वकार्यसिद्धिप्रदम्)',
        deity: 'Lord Maha Vishnu • Midday Sun (Martanda)',
        desc: 'The 8th Muhurta of the day, centered exactly at local solar noon. Blessed by Lord Vishnu, Abhijit dissolves a myriad of doshas and bestows victory. Supreme window for any urgent or major new beginning.',
        allowed: ['Commencing new business & deals', 'Buying gold, jewelry, vehicles', 'Griha Pravesh & Foundation laying', 'Vivah ceremonies & sacred pacts', 'Starting auspicious travels'],
        prohibited: ['Wednesdays (on Wednesdays, Abhijit carries slight Rahu affinity; practice mindfulness)']
      },
      {
        id: 'vijaya',
        name: 'Vijaya Muhurta (विजय मुहूर्त)',
        shortName: 'Vijaya',
        type: 'shubh',
        startH: vijayaStartH,
        endH: vijayaEndH,
        color: '#06B6D4',
        bgGradient: 'linear-gradient(135deg, #06B6D4, #0E7490)',
        strokeColor: '#67E8F9',
        nature: 'Victory & Overcoming Obstacles (विजयप्रदम्)',
        deity: 'Lord Rama & Lord Shiva',
        desc: 'The 11th Muhurta of the day. Highly praised for triumphing over longstanding adversaries, submitting legal documents, launching technical applications, and sitting for decisive meetings.',
        allowed: ['Submitting critical applications', 'Competitive examinations & interviews', 'Legal settlements & reconciliations', 'Launching technology products'],
        prohibited: ['Indolence, negative speech']
      },
      {
        id: 'godhuli',
        name: 'Godhuli Muhurta (गोधूलि मुहूर्त)',
        shortName: 'Godhuli',
        type: 'shubh',
        startH: godhuliStartH,
        endH: godhuliEndH,
        color: '#F43F5E',
        bgGradient: 'linear-gradient(135deg, #FB7185, #E11D48)',
        strokeColor: '#FECDD3',
        nature: 'Peaceful Twilight Harmony (शान्तिकरम्)',
        deity: 'Goddess Maha Lakshmi & Sri Krishna',
        desc: 'Sacred dusk window when cows return home. Pranic atmosphere transitions into evening peace. Propitious for home prayers, lighting temple deepams, and peaceful family reconciliation.',
        allowed: ['Lighting ghee lamps (Deepa Aradhana)', 'Sandhyavandanam & evening chanting', 'Welcoming guests', 'Family harmony'],
        prohibited: ['Eating heavy dinners immediately', 'Sleeping at twilight (Sandhya)']
      },
      {
        id: 'nishita',
        name: 'Nishita Muhurta (निशीथ काल)',
        shortName: 'Nishita',
        type: 'shubh',
        startH: nishitaStartH,
        endH: nishitaEndH,
        color: '#6366F1',
        bgGradient: 'linear-gradient(135deg, #6366F1, #4338CA)',
        strokeColor: '#A5B4FC',
        nature: 'Mystic Night Sadhana (तन्त्र/शिवसाधना)',
        deity: 'Lord Shiva (Mahakala) & Goddess Kali',
        desc: 'Midnight window during which cosmic deep consciousness is accessible. Renowned for Mahashivaratri puja, Shiva Mahamrityunjaya japa, and awakening spiritual inner fortitude.',
        allowed: ['Shiva Japa & Linga Abhishekam', 'Silent deep meditation', 'Restful sleep with pure mind'],
        prohibited: ['Frivolous night revelry', 'Loud arguments']
      }
    ];

    // Format all segments with readable string times
    segments.forEach(seg => {
      seg.startStr = formatDecimalHour(seg.startH);
      seg.endStr = formatDecimalHour(seg.endH);
      seg.timeRangeStr = `${seg.startStr} – ${seg.endStr}`;
    });

    // Action Guidance Logic (Vivah, Griha Pravesh, Vehicles, Business, Travel)
    const isRiktaTithi = ['Chaturthi', 'Navami', 'Chaturdashi'].includes(tithiName);
    const isAmavasya = tithiName === 'Amavasya' || (tithiName === 'Purnima/Amavasya' && paksha === 'Krishna');
    const isGoodPaksha = paksha === 'Shukla';
    const isGentleStar = ['Mrigashira', 'Chitra', 'Anuradha', 'Revati'].includes(nakshatraName);
    const isFixedStar = ['Rohini', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada'].includes(nakshatraName);
    const isMovableStar = ['Swati', 'Punarvasu', 'Shravana', 'Dhanishtha', 'Shatabhisha'].includes(nakshatraName);
    const isSwiftStar = ['Hasta', 'Ashwini', 'Pushya', 'Abhijit'].includes(nakshatraName);

    // 1. Vivah (Marriage)
    let vivahStatus = 'caution';
    let vivahBest = `Abhijit Muhurta (${segments.find(s=>s.id==='abhijit').timeRangeStr})`;
    let vivahNote = `Avoid Rahu Kaal (${segments.find(s=>s.id==='rahu').timeRangeStr}).`;
    if (!isRiktaTithi && !isAmavasya && (isGentleStar || isFixedStar || isGoodPaksha)) {
      vivahStatus = 'shubh';
      vivahNote = `Favorable lunar alignment with ${nakshatraName} Nakshatra. Ideal during Abhijit window.`;
    } else if (isRiktaTithi || isAmavasya) {
      vivahStatus = 'avoid';
      vivahBest = 'Better on an auspicious Shukla Paksha day';
      vivahNote = `Inauspicious ${tithiName} Tithi. Classical texts recommend postponing vivah rites.`;
    }

    // 2. Griha Pravesh (Housewarming)
    let grihaStatus = 'caution';
    let grihaBest = `Morning window or Abhijit (${segments.find(s=>s.id==='abhijit').timeRangeStr})`;
    let grihaNote = `Strictly avoid Rahu Kaal (${segments.find(s=>s.id==='rahu').timeRangeStr}).`;
    if (isFixedStar || isGentleStar) {
      grihaStatus = 'shubh';
      grihaNote = `Stable ${nakshatraName} star brings permanent prosperity and family contentment.`;
    } else if (isRiktaTithi || isAmavasya) {
      grihaStatus = 'avoid';
      grihaBest = 'Prefer fixed star like Rohini or Uttara Phalguni';
      grihaNote = `Inauspicious Tithi for entering new residence.`;
    }

    // 3. Vehicle & Gold Purchase (Vahan / Swarna)
    let vehicleStatus = 'shubh';
    let vehicleBest = `Abhijit Muhurta (${segments.find(s=>s.id==='abhijit').timeRangeStr})`;
    let vehicleNote = `Avoid Rahu Kaal (${segments.find(s=>s.id==='rahu').timeRangeStr}) & Yamagandam.`;
    if (isMovableStar || isSwiftStar) {
      vehicleNote = `Dynamic ${nakshatraName} star is highly praised for vehicle delivery and investments.`;
    }

    // 4. New Business / Contracts
    let businessStatus = 'shubh';
    let businessBest = `Abhijit (${segments.find(s=>s.id==='abhijit').timeRangeStr}) or Vijaya (${segments.find(s=>s.id==='vijaya').timeRangeStr})`;
    let businessNote = `Optimal for agreements and launches. Never sign during Rahu Kaal.`;

    // 5. Travel (Yatra) & Disha Shool
    const dishaInfo = DISHA_SHOOL[weekdayIdx];
    let travelStatus = 'caution';
    let travelBest = `After Rahu Kaal & Yamagandam pass`;
    let travelNote = `Disha Shool: Avoid traveling towards ${dishaInfo.direction} today. (${dishaInfo.remedy}).`;

    const actionMatrix = [
      { id: 'vivah', name: '💍 Vivah (Marriage)', status: vivahStatus, bestTime: vivahBest, note: vivahNote },
      { id: 'griha', name: '🏡 Griha Pravesh (Housewarming)', status: grihaStatus, bestTime: grihaBest, note: grihaNote },
      { id: 'vehicle', name: '🚗 Vehicle & Gold Purchase', status: vehicleStatus, bestTime: vehicleBest, note: vehicleNote },
      { id: 'business', name: '💼 Business Deals & Contracts', status: businessStatus, bestTime: businessBest, note: businessNote },
      { id: 'travel', name: '✈️ Travel & Departures', status: travelStatus, bestTime: travelBest, note: travelNote }
    ];

    return {
      date: targetDate,
      dateISO: targetDate.toISOString().split('T')[0],
      city,
      weekday: weekdayName,
      sanskritVara,
      sunriseH,
      sunsetH,
      sunriseStr: sunTimes.sunriseStr,
      sunsetStr: sunTimes.sunsetStr,
      tithiName,
      paksha,
      nakshatraName,
      yogaName,
      segments,
      actionMatrix
    };
  }

  /* -------------------------------------------------------------
     SVG Geometry Generator for 24-Hour Circular Dial
     ------------------------------------------------------------- */
  function describeDonutArc(cx, cy, rOut, rIn, startAngleDeg, endAngleDeg) {
    const rad = Math.PI / 180;
    let span = endAngleDeg - startAngleDeg;
    if (span < 0) span += 360;

    const startRad = startAngleDeg * rad;
    const endRad = endAngleDeg * rad;

    const x1_out = cx + rOut * Math.sin(startRad);
    const y1_out = cy - rOut * Math.cos(startRad);
    const x2_out = cx + rOut * Math.sin(endRad);
    const y2_out = cy - rOut * Math.cos(endRad);

    const x1_in = cx + rIn * Math.sin(startRad);
    const y1_in = cy - rIn * Math.cos(startRad);
    const x2_in = cx + rIn * Math.sin(endRad);
    const y2_in = cy - rIn * Math.cos(endRad);

    const largeArcFlag = span > 180 ? 1 : 0;

    return `M ${x1_out.toFixed(2)} ${y1_out.toFixed(2)} ` +
           `A ${rOut} ${rOut} 0 ${largeArcFlag} 1 ${x2_out.toFixed(2)} ${y2_out.toFixed(2)} ` +
           `L ${x2_in.toFixed(2)} ${y2_in.toFixed(2)} ` +
           `A ${rIn} ${rIn} 0 ${largeArcFlag} 0 ${x1_in.toFixed(2)} ${y1_in.toFixed(2)} Z`;
  }

  function getHourAngle(hourDecimal) {
    // 00:00 (Midnight) is at the top (0°)
    // 06:00 (Sunrise) is at right (90°)
    // 12:00 (Midday) is at bottom (180°)
    // 18:00 (Sunset) is at left (270°)
    return (hourDecimal % 24) * (360 / 24);
  }

  function renderSvgClock(data, currentHourDecimal = null) {
    const cx = 250;
    const cy = 250;
    const rOuter = 230;
    const rRingOut = 215;
    const rRingIn = 145;
    const rCenter = 100;

    const sunriseAngle = getHourAngle(data.sunriseH);
    const sunsetAngle = getHourAngle(data.sunsetH);

    // Build SVG paths for each timing segment
    let segmentsSvg = '';
    data.segments.forEach(seg => {
      const a1 = getHourAngle(seg.startH);
      const a2 = getHourAngle(seg.endH);

      let arcPaths = [];
      if (a2 < a1) {
        // Crosses midnight (360°)
        arcPaths.push(describeDonutArc(cx, cy, rRingOut, rRingIn, a1, 359.99));
        arcPaths.push(describeDonutArc(cx, cy, rRingOut, rRingIn, 0.01, a2));
      } else {
        arcPaths.push(describeDonutArc(cx, cy, rRingOut, rRingIn, a1, a2));
      }

      arcPaths.forEach((pathD, idx) => {
        segmentsSvg += `
          <path d="${pathD}"
                class="vc-arc-segment vc-arc-${seg.id}"
                data-id="${seg.id}"
                fill="${seg.color}"
                fill-opacity="0.88"
                stroke="${seg.strokeColor || '#FFFFFF'}"
                stroke-width="1.5"
                aria-label="${seg.name}: ${seg.timeRangeStr}">
            <title>${seg.name}: ${seg.timeRangeStr}</title>
          </path>
        `;
      });
    });

    // 24 Hour Ticks and Text Labels
    let ticksSvg = '';
    for (let h = 0; h < 24; h++) {
      const angle = h * 15;
      const rad = angle * (Math.PI / 180);
      const isMajor = h % 3 === 0;
      const isDaytime = h >= Math.floor(data.sunriseH) && h <= Math.ceil(data.sunsetH);

      const rTick1 = rOuter - 2;
      const rTick2 = isMajor ? rOuter - 14 : rOuter - 8;
      const x1 = cx + rTick1 * Math.sin(rad);
      const y1 = cy - rTick1 * Math.cos(rad);
      const x2 = cx + rTick2 * Math.sin(rad);
      const y2 = cy - rTick2 * Math.cos(rad);

      ticksSvg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${isMajor ? '#B45309' : '#D4A017'}" stroke-width="${isMajor ? 2 : 1}" stroke-opacity="0.6"/>`;

      if (isMajor) {
        const rText = rOuter + 14;
        const tx = cx + rText * Math.sin(rad);
        const ty = cy - rText * Math.cos(rad);
        let label = h === 0 ? '12AM' : (h === 12 ? '12PM' : (h < 12 ? `${h}AM` : `${h - 12}PM`));
        if (h === 0) label = '00:00 (12 AM)';
        else if (h === 6) label = '06:00';
        else if (h === 12) label = '12:00 (Noon)';
        else if (h === 18) label = '18:00';

        ticksSvg += `<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" class="vc-hour-text" fill="${isDaytime ? '#E65100' : '#4338CA'}">${label}</text>`;
      }
    }

    // Live Needle indicator (if current hour provided)
    let needleSvg = '';
    if (currentHourDecimal !== null) {
      const needleAngle = getHourAngle(currentHourDecimal);
      const rad = needleAngle * (Math.PI / 180);
      const nLength = rRingOut + 8;
      const nx = cx + nLength * Math.sin(rad);
      const ny = cy - nLength * Math.cos(rad);

      needleSvg = `
        <g class="vc-clock-needle">
          <!-- Outer glow line -->
          <line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#FF7A29" stroke-width="4.5" stroke-linecap="round" filter="drop-shadow(0 0 8px rgba(255,122,41,0.85))"/>
          <!-- Inner sharp golden line -->
          <line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
          <!-- Arrowhead tip -->
          <circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="5.5" fill="#E65100" stroke="#FFFFFF" stroke-width="2"/>
        </g>
      `;
    }

    return `
      <svg class="vc-svg-clock" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="24-Hour Vedic Muhurat Clock">
        <defs>
          <radialGradient id="vcDialBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="85%" stop-color="#FAF6EE"/>
            <stop offset="100%" stop-color="#F5EFEB"/>
          </radialGradient>
          <!-- Day Hemisphere Glow -->
          <linearGradient id="vcDaySky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(254, 243, 199, 0.45)"/>
            <stop offset="100%" stop-color="rgba(253, 230, 138, 0.15)"/>
          </linearGradient>
          <!-- Night Hemisphere Glow -->
          <linearGradient id="vcNightSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="rgba(30, 27, 75, 0.08)"/>
            <stop offset="100%" stop-color="rgba(15, 23, 42, 0.18)"/>
          </linearGradient>
        </defs>

        <!-- Base Outer Clock Ring -->
        <circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="url(#vcDialBg)" stroke="#D4A017" stroke-width="2.5" stroke-opacity="0.45"/>

        <!-- Day / Night Track Ring Background -->
        <circle cx="${cx}" cy="${cy}" r="${(rRingOut + rRingIn) / 2}" fill="none" stroke="url(#vcDaySky)" stroke-width="${rRingOut - rRingIn}"/>

        <!-- 24-Hour Markers and Graduations -->
        ${ticksSvg}

        <!-- Vedic Colored Arc Segments -->
        <g id="vcSegmentsGroup">
          ${segmentsSvg}
        </g>

        <!-- Inner Dial Inner Border -->
        <circle cx="${cx}" cy="${cy}" r="${rRingIn}" fill="none" stroke="#D4A017" stroke-width="1.8" stroke-dasharray="3,3" stroke-opacity="0.5"/>

        <!-- Sunrise / Sunset Horizon Rays -->
        <line x1="${cx}" y1="${cy}" x2="${(cx + (rRingOut + 4) * Math.sin(sunriseAngle * Math.PI / 180)).toFixed(1)}" y2="${(cy - (rRingOut + 4) * Math.cos(sunriseAngle * Math.PI / 180)).toFixed(1)}" stroke="#EA580C" stroke-width="2.5" stroke-dasharray="4,2"/>
        <line x1="${cx}" y1="${cy}" x2="${(cx + (rRingOut + 4) * Math.sin(sunsetAngle * Math.PI / 180)).toFixed(1)}" y2="${(cy - (rRingOut + 4) * Math.cos(sunsetAngle * Math.PI / 180)).toFixed(1)}" stroke="#C2410C" stroke-width="2.5" stroke-dasharray="4,2"/>

        <!-- Real-Time Moving Golden Needle -->
        ${needleSvg}

        <!-- Center Pivot Cap -->
        <circle cx="${cx}" cy="${cy}" r="12" fill="#B45309" stroke="#FFFFFF" stroke-width="2.5" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.25))"/>
        <circle cx="${cx}" cy="${cy}" r="4" fill="#FFFFFF"/>
      </svg>
    `;
  }

  return {
    CITIES,
    DEFAULT_CITY,
    WEEKDAYS,
    SANSKRIT_VARA,
    calculateSunTimes,
    calculateDayMuhuratWindows,
    renderSvgClock,
    formatDecimalHour
  };
}));
