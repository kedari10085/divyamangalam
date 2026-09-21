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

  /* ---- Julian Day Number ---- */
  function julianDay(date) {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate() + (date.getHours() + (date.getMinutes() / 60)) / 24;
    if (m <= 2) { y -= 1; m += 12; }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  }

  /* ---- Sun Longitude (approximate, degrees) ---- */
  function sunLongitude(jd) {
    const n = jd - 2451545.0;
    const L = (280.46 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
    const lambda = L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g);
    return ((lambda % 360) + 360) % 360;
  }

  /* ---- Moon Longitude (approximate, degrees) ---- */
  function moonLongitude(jd) {
    const n = jd - 2451545.0;
    const L = (218.316 + 13.176396 * n) % 360;
    const M = ((134.963 + 13.064993 * n) % 360) * Math.PI / 180;
    const F = ((93.272 + 13.229350 * n) % 360) * Math.PI / 180;
    const lon = L + 6.289 * Math.sin(M) - 1.274 * Math.sin(2 * F - M) + 0.658 * Math.sin(2 * F);
    return ((lon % 360) + 360) % 360;
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

  /* ---- Nakshatra ---- */
  function getNakshatra(moonLon) {
    const idx = Math.floor(moonLon / (360 / 27));
    const pada = Math.floor((moonLon % (360 / 27)) / (360 / 108)) + 1;
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

  /* ---- Rasi (Moon sign) ---- */
  function getRasi(moonLon) {
    return RASIS[Math.floor(moonLon / 30)];
  }

  /* ---- Full Panchang for a date ---- */
  function getPanchang(date) {
    const jd = julianDay(date);
    const sunLon = sunLongitude(jd);
    const moonLon = moonLongitude(jd);
    const tithi = getTithi(sunLon, moonLon);
    const nakshatra = getNakshatra(moonLon);
    const yoga = getYoga(sunLon, moonLon);
    const karana = getKarana(sunLon, moonLon);
    const rasi = getRasi(moonLon);
    const dayName = WEEKDAYS[date.getDay()];
    const dayDeity = WEEKDAY_DEITIES[date.getDay()];
    const rahukaal = RAHUKAAL[dayName];

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
      date,
      dateStr: date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      dayName,
      dayDeity,
      tithi,
      nakshatra,
      yoga,
      karana,
      rasi,
      rahukaal,
      abhijit: ABHIJIT,
      isBadYoga,
      isGoodYoga,
      isGoodTithi,
      isBadTithi,
      isGoodVara,
      overallScore: Math.min(100, Math.max(0, overallScore)),
      sunLon: sunLon.toFixed(2),
      moonLon: moonLon.toFixed(2),
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

  /* Public API */
  return { getPanchang, getRatingForGod, getUpcomingDays, getUpcomingFestivals, TITHIS, NAKSHATRAS, WEEKDAYS, RAHUKAAL, ABHIJIT };
})();
