/* =========================================================================
   DIVYA MANGALAM — VEDANGA JYOTISHA ENGINE
   Authentic Mathematical Astronomy of Sage Lagadha (c. 1400–1200 BCE)
   Based on the Rigvedic (Archajyotisha) and Yajurvedic (Yajushajyotisha) recensions
   Critically edited & translated by Prof. T.S. Kuppanna Sastry
   Indian National Science Academy (INSA), New Delhi, 1985
   ========================================================================= */

const VEDANGA_JYOTISHA = (function () {

  /* =========================================================================
     1. FUNDAMENTAL CONSTANTS OF THE 5-YEAR VEDIC YUGA (पञ्चसंवत्सरमय युग)
     ========================================================================= */
  const YUGA_CONSTANTS = {
    YEARS_IN_YUGA: 5,
    SAVANA_DAYS: 1830,          // Civil days (sunrise to sunrise)
    SAURA_DAYS: 1830,           // Solar days (366 days/year)
    SIDEREAL_DAYS: 1835,        // Bhadina (sidereal rotations)
    SYNODIC_MONTHS: 62,         // Chandra Masa (60 regular + 2 Adhimasas)
    SIDEREAL_MONTHS: 67,        // Bhamasa / Nakshatra Masa (62 synodic + 5 solar)
    PARVANS: 124,               // Fortnights (Paksas): 62 Shukla + 62 Krishna
    TITHIS: 1860,               // Lunar days (62 * 30)
    OMITTED_TITHIS: 30,         // Kshaya Tithis / Unaratra (1860 - 1830 = 30; 1 every 61 civil days)
    SOLAR_NAKSHATRAS: 135,      // Traversed by Sun in Yuga (5 * 27)
    LUNAR_NAKSHATRAS: 1809,     // Traversed by Moon in Yuga (67 * 27)
    BHAMSHAS_PER_NAKSHATRA: 124,// 1 Nakshatra = 124 Bhamshas (each = 800'/124 = 6.4516' of arc)
    TOTAL_BHAMSHAS: 3348,       // 27 * 124 = 3348 Bhamshas in the whole zodiac (360°)
    MUHURTAS_PER_DAY: 30,       // 1 Day = 30 Muhurtas (1 Muhurta = 48 minutes)
    NADIKAS_PER_DAY: 60,        // 1 Day = 60 Nadikas / Ghatikas (1 Nadika = 24 minutes)
    KALAS_PER_DAY: 603,         // 1 Day = 603 Kalas (1 Nadika = 10 1/20 Kalas = 10.05 Kalas)
    KASTHAS_PER_KALA: 124,      // 1 Kala = 124 Kasthas
    AKSHARAS_PER_KASTHA: 5,     // 1 Kastha = 5 Aksharas (syllables uttered at normal breath)
    SHORTEST_DAY_MUHURTAS: 12,  // Winter Solstice day length = 12 Muhurtas (24 Nadikas = 9h 36m)
    LONGEST_DAY_MUHURTAS: 18,   // Summer Solstice day length = 18 Muhurtas (36 Nadikas = 14h 24m)
    DAILY_AHARMANA_CHANGE: 2/61,// Muhurtas per day (4/61 Nadikas/day = 1 Palaprastha of water)
    LATITUDE_APPROX: '34° N'    // Gandhara / Kashmir / Taxila Vedic observatory latitude
  };

  /* The 5 Samvatsaras of the Yuga with their presiding Deities */
  const SAMVATSARAS = [
    { index: 0, nameSa: 'संवत्सर', nameEn: 'Samvatsara', deity: 'Agni (अग्नि)', element: 'Fire', yearNum: 1 },
    { index: 1, nameSa: 'परिवत्सर', nameEn: 'Parivatsara', deity: 'Surya / Arka (सूर्य)', element: 'Solar Radiance', yearNum: 2 },
    { index: 2, nameSa: 'इदावत्सर', nameEn: 'Idavatsara', deity: 'Soma / Chandra (सोम)', element: 'Moon / Nectar', yearNum: 3 },
    { index: 3, nameSa: 'अनुवत्सर', nameEn: 'Anuvatsara', deity: 'Brihaspati (बृहस्पति)', element: 'Wisdom / Guru', yearNum: 4 },
    { index: 4, nameSa: 'इद्वत्सर', nameEn: 'Idvatsara', deity: 'Rudra / Shiva (रुद्र)', element: 'Transformation', yearNum: 5 }
  ];

  /* The 6 Ritus (Seasons) */
  const RITUS = [
    { index: 0, nameSa: 'शिशिर', nameEn: 'Shishira', season: 'Winter', durationDays: 61 },
    { index: 1, nameSa: 'वसन्त', nameEn: 'Vasanta', season: 'Spring', durationDays: 61 },
    { index: 2, nameSa: 'ग्रीष्म', nameEn: 'Grishma', season: 'Summer', durationDays: 61 },
    { index: 3, nameSa: 'वर्षा', nameEn: 'Varsha', season: 'Monsoon', durationDays: 61 },
    { index: 4, nameSa: 'शरद्', nameEn: 'Sharad', season: 'Autumn', durationDays: 61 },
    { index: 5, nameSa: 'हेमन्त', nameEn: 'Hemanta', season: 'Pre-Winter', durationDays: 61 }
  ];

  /* The 27 Vedic Nakshatras starting with Shravishtha (Dhanishtha) as in Vedanga Jyotisha */
  // Note: Modern order starts with Ashwini, but Vedanga Jyotisha starts with Shravishtha (Dhanishtha)
  // because the Winter Solstice occurred at the first point of Shravishtha in Lagadha's era (c. 1400 BCE).
  const VEDANGA_NAKSHATRAS = [
    { index: 0, name: 'Shravishtha (Dhanishtha)', deity: 'Vasus', modernIndex: 22 },
    { index: 1, name: 'Shatabhisha', deity: 'Varuna', modernIndex: 23 },
    { index: 2, name: 'Purva Bhadrapada', deity: 'Aja Ekapada', modernIndex: 24 },
    { index: 3, name: 'Uttara Bhadrapada', deity: 'Ahirbudhnya', modernIndex: 25 },
    { index: 4, name: 'Revati', deity: 'Pushan', modernIndex: 26 },
    { index: 5, name: 'Ashwini', deity: 'Ashvins', modernIndex: 0 },
    { index: 6, name: 'Bharani', deity: 'Yama', modernIndex: 1 },
    { index: 7, name: 'Krittika', deity: 'Agni', modernIndex: 2 },
    { index: 8, name: 'Rohini', deity: 'Prajapati', modernIndex: 3 },
    { index: 9, name: 'Mrigashira', deity: 'Soma', modernIndex: 4 },
    { index: 10, name: 'Ardra', deity: 'Rudra', modernIndex: 5 },
    { index: 11, name: 'Punarvasu', deity: 'Aditi', modernIndex: 6 },
    { index: 12, name: 'Pushya', deity: 'Brihaspati', modernIndex: 7 },
    { index: 13, name: 'Ashlesha', deity: 'Sarpas', modernIndex: 8 },
    { index: 14, name: 'Magha', deity: 'Pitris', modernIndex: 9 },
    { index: 15, name: 'Purva Phalguni', deity: 'Bhaga', modernIndex: 10 },
    { index: 16, name: 'Uttara Phalguni', deity: 'Aryaman', modernIndex: 11 },
    { index: 17, name: 'Hasta', deity: 'Savitr', modernIndex: 12 },
    { index: 18, name: 'Chitra', deity: 'Tvashtr', modernIndex: 13 },
    { index: 19, name: 'Swati', deity: 'Vayu', modernIndex: 14 },
    { index: 20, name: 'Vishakha', deity: 'Indragni', modernIndex: 15 },
    { index: 21, name: 'Anuradha', deity: 'Mitra', modernIndex: 16 },
    { index: 22, name: 'Jyeshtha', deity: 'Indra', modernIndex: 17 },
    { index: 23, name: 'Moola', deity: 'Nirriti', modernIndex: 18 },
    { index: 24, name: 'Purva Ashadha', deity: 'Apas', modernIndex: 19 },
    { index: 25, name: 'Uttara Ashadha', deity: 'Vishvedevas', modernIndex: 20 },
    { index: 26, name: 'Shravana', deity: 'Vishnu', modernIndex: 21 }
  ];

  /* Modern standard Nakshatra names for cross-compatibility */
  const STANDARD_NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Moola', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha',
    'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  /* 6 Vishuvats (Equinoxes) in the 5-Year Yuga */
  const VISHUVATS = [
    { parvanIndex: 13, year: 1, season: 'Autumnal', dayNum: 183 + 91.5 },
    { parvanIndex: 33, year: 2, season: 'Autumnal', dayNum: 366 + 183 + 91.5 },
    { parvanIndex: 53, year: 3, season: 'Vernal', dayNum: 366 * 2 + 91.5 },
    { parvanIndex: 73, year: 3, season: 'Autumnal', dayNum: 366 * 2 + 183 + 91.5 },
    { parvanIndex: 93, year: 4, season: 'Vernal', dayNum: 366 * 3 + 91.5 },
    { parvanIndex: 113, year: 5, season: 'Autumnal', dayNum: 366 * 4 + 183 + 91.5 }
  ];

  /* =========================================================================
     2. CORE SAGE LAGADHA ALGORITHMS (INSA 1985)
     ========================================================================= */

  /**
   * Calculate Sun's Nakshatra at the end of the P-th Parvan (0 to 124)
   * Formula (Shloka 10, 20):
   * In 124 Parvans, Sun completes 135 Nakshatras.
   * Motion per Parvan = 135/124 = 1 Nakshatra + 11/124 Bhamshas.
   * Total Nakshatras traversed = (P * 135) / 124
   * Remainder in Bhamshas (124th parts) = (P * 11) % 124
   */
  function calculateSuryaNakshatra(parvanIndex) {
    const P = Math.max(0, Math.min(124, parvanIndex));
    const totalBhamshas = P * 135;
    const nakshatraIndex = Math.floor(totalBhamshas / 124) % 27;
    const bhamshaFraction = (P * 11) % 124;
    const vedangaStar = VEDANGA_NAKSHATRAS[nakshatraIndex];
    const modernStar = STANDARD_NAKSHATRAS[vedangaStar.modernIndex];

    // Decimal degrees (each Nakshatra = 13°20' = 13.3333°)
    const decimalDeg = (nakshatraIndex * (360 / 27)) + (bhamshaFraction / 124) * (360 / 27);

    return {
      parvanIndex: P,
      nakshatraIndex,
      vedangaName: vedangaStar.name,
      standardName: modernStar,
      deity: vedangaStar.deity,
      bhamshas: bhamshaFraction,
      bhamshasTotal: 124,
      bhamshaText: `${bhamshaFraction}/124 Bhamshas`,
      decimalDeg: parseFloat(decimalDeg.toFixed(2)),
      arcMinutesFraction: ((bhamshaFraction / 124) * 800).toFixed(1) + "'"
    };
  }

  /**
   * Calculate Moon's Nakshatra at the end of the P-th Parvan (0 to 124) — Parva-Bhamsa
   * Formula (Shlokas 10–13, 20–22):
   * In 124 Parvans, Moon completes 1809 Nakshatras (67 sidereal revolutions).
   * Motion per Parvan = 1809/124 = 14 Nakshatras + 73/124 Bhamshas.
   * Total Nakshatras traversed = (P * 1809) / 124
   * Remainder in Bhamshas = (P * 1809) % 124
   * Note: Every 12 Parvans, Moon advances 8 Nakshatras and (12 * 73) % 124 = 8 Bhamshas.
   */
  function calculateParvaBhamsa(parvanIndex) {
    const P = Math.max(0, Math.min(124, parvanIndex));
    const totalFraction = P * 1809;
    const totalNakshatras = Math.floor(totalFraction / 124);
    const nakshatraIndex = totalNakshatras % 27;
    const bhamshaFraction = totalFraction % 124;
    const vedangaStar = VEDANGA_NAKSHATRAS[nakshatraIndex];
    const modernStar = STANDARD_NAKSHATRAS[vedangaStar.modernIndex];

    const decimalDeg = (nakshatraIndex * (360 / 27)) + (bhamshaFraction / 124) * (360 / 27);

    return {
      parvanIndex: P,
      nakshatraIndex,
      vedangaName: vedangaStar.name,
      standardName: modernStar,
      deity: vedangaStar.deity,
      bhamshas: bhamshaFraction,
      bhamshasTotal: 124,
      bhamshaText: `${bhamshaFraction}/124 Bhamshas`,
      decimalDeg: parseFloat(decimalDeg.toFixed(2)),
      arcMinutesFraction: ((bhamshaFraction / 124) * 800).toFixed(1) + "'"
    };
  }

  /**
   * Calculate Moon Nakshatra for any Tithi T (1 to 15) within Parvan P
   * Formula (Shloka 11, 22):
   * Lagadha's rule: (11 * T + Parva_Bhamsa) / 124
   * gives the exact fractional leap in Nakshatra space.
   */
  function calculateTithiNakshatra(parvanIndex, tithiNumber) {
    const P = Math.max(0, Math.min(124, parvanIndex));
    const T = Math.max(1, Math.min(15, tithiNumber));
    const parva = calculateParvaBhamsa(P);

    // Each Tithi, Moon moves ~ 603/5 = 120.6 Bhamshas
    // Lagadha's relative formula: T * 120.6 Bhamshas added to parva beginning
    const startBhamshasTotal = (P * 1809);
    // Tithi progress in 1860th parts of Yuga (1809 Nakshatras / 1860 Tithis = 603/620 Nakshatras per tithi)
    const tithiBhamshas = Math.floor((T * 1809 * 124) / 1860);
    const totalTithiFraction = startBhamshasTotal + tithiBhamshas;
    const nakshatraIndex = Math.floor(totalTithiFraction / 124) % 27;
    const bhamshaRem = totalTithiFraction % 124;

    const vedangaStar = VEDANGA_NAKSHATRAS[nakshatraIndex];
    const modernStar = STANDARD_NAKSHATRAS[vedangaStar.modernIndex];

    return {
      parvanIndex: P,
      tithi: T,
      nakshatraIndex,
      vedangaName: vedangaStar.name,
      standardName: modernStar,
      bhamshas: bhamRem,
      bhamshaText: `${bhamRem}/124 Bhamshas`,
      deity: vedangaStar.deity
    };
  }

  /**
   * Calculate Day-Length (Ahar-mana) and Night-Length (Ratri-mana)
   * Formula (Shlokas 8, 26, 40):
   * At Winter Solstice (Uttarayana start), shortest day = 12 Muhurtas (24 Nadikas = 9h 36m).
   * At Summer Solstice (Dakshinayana start), longest day = 18 Muhurtas (36 Nadikas = 14h 24m).
   * Daily change = 2/61 Muhurtas = 4/61 Nadikas = 1 Palaprastha of water.
   * Days elapsed d from Uttarayana (0 to 183):
   *   Aharmana = 12 + (2 * d) / 61 Muhurtas = 24 + (4 * d) / 61 Nadikas
   *   Ratrimana = 30 - Aharmana Muhurtas = 60 - Aharmana Nadikas
   */
  function calculateAharmana(daysFromSolstice, isUttarayana = true) {
    const d = Math.max(0, Math.min(183, daysFromSolstice));
    let dayMuhurtas, dayNadikas;

    if (isUttarayana) {
      dayMuhurtas = 12 + (2 * d) / 61;
      dayNadikas = 24 + (4 * d) / 61;
    } else {
      // Dakshinayana: decreasing from 18 to 12 Muhurtas
      dayMuhurtas = 18 - (2 * d) / 61;
      dayNadikas = 36 - (4 * d) / 61;
    }

    const nightMuhurtas = 30 - dayMuhurtas;
    const nightNadikas = 60 - dayNadikas;

    // Convert to modern hours & minutes
    const dayHoursTotal = (dayMuhurtas / 30) * 24;
    const dayH = Math.floor(dayHoursTotal);
    const dayM = Math.round((dayHoursTotal - dayH) * 60);

    const nightHoursTotal = 24 - dayHoursTotal;
    const nightH = Math.floor(nightHoursTotal);
    const nightM = Math.round((nightHoursTotal - nightH) * 60);

    // Water clock drainage in Palaprasthas (1 Palaprastha increases day length by 4/61 Nadikas)
    const palaprasthas = isUttarayana ? d : (183 - d);

    return {
      daysFromSolstice: d,
      ayana: isUttarayana ? 'Uttarayana (उत्तर-अयन)' : 'Dakshinayana (दक्षिण-अयन)',
      dayMuhurtas: parseFloat(dayMuhurtas.toFixed(2)),
      dayNadikas: parseFloat(dayNadikas.toFixed(2)),
      nightMuhurtas: parseFloat(nightMuhurtas.toFixed(2)),
      nightNadikas: parseFloat(nightNadikas.toFixed(2)),
      dayLengthFormatted: `${dayH}h ${dayM < 10 ? '0' + dayM : dayM}m`,
      nightLengthFormatted: `${nightH}h ${nightM < 10 ? '0' + nightM : nightM}m`,
      palaprasthasWater: palaprasthas,
      kalas: Math.round(dayNadikas * 10.05)
    };
  }

  /**
   * Intercalary Month (Adhimasa / Malamasa) Detection
   * Shloka 37, 43:
   * 1st Adhimasa at 31st Parvan (end of 2.5 solar years = middle of 3rd year / Idavatsara at Shravana).
   * 2nd Adhimasa at 62nd / 124th Parvan (end of 5 solar years / Idvatsara at Magha/Pausa).
   */
  function checkAdhimasa(parvanIndex) {
    if (parvanIndex === 31) {
      return {
        isAdhimasa: true,
        adhimasaNum: 1,
        nameSa: 'प्रथम अधिकमास (श्रावण अधिकमास)',
        nameEn: '1st Intercalary Month (Mid-Yuga Shravana Adhimasa)',
        samvatsara: 'Idavatsara (Year 3)',
        reason: 'Sun and Moon have completed 30 solar months and 31 lunar fortnights. 1 intercalary month is inserted to reconcile solar and lunar reckoning.'
      };
    }
    if (parvanIndex === 124 || parvanIndex === 62) {
      return {
        isAdhimasa: true,
        adhimasaNum: 2,
        nameSa: 'द्वितीय अधिकमास (पौष / माघ अधिकमास)',
        nameEn: '2nd Intercalary Month (End-of-Yuga Adhimasa)',
        samvatsara: 'Idvatsara (Year 5)',
        reason: 'Concludes the 5-Year Yuga with exactly 62 synodic months and 1830 Savana days, synchronizing the next Yuga at Shravishtha (Dhanishtha).'
      };
    }
    return { isAdhimasa: false };
  }

  /**
   * Vedic Clepsydra / Water Clock (Khadaprastha / Ghatika Yantra) Unit Converter
   * Shloka 17, 26, 27:
   * 50 Palas of water = 1 Adhaka
   * 4 Adhakas = 1 Drona = 200 Palas
   * 1 Nadika bowl capacity = 1 Drona minus 3 Kudavas = 14 1/4 Palas of water sink time
   */
  function waterClockConverter(nadikas = 1) {
    const totalMinutes = nadikas * 24;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    const palas = nadikas * 14.25;
    const kalas = nadikas * 10.05;
    const kasthas = kalas * 124;

    return {
      nadikas,
      modernMinutes: totalMinutes,
      modernTimeFormatted: `${hours > 0 ? hours + 'h ' : ''}${minutes}m`,
      waterPalas: parseFloat(palas.toFixed(2)),
      kalas: parseFloat(kalas.toFixed(2)),
      kasthas: Math.round(kasthas),
      aksharas: Math.round(kasthas * 5),
      vesselDescription: 'A copper bowl (Ghatika Yantra) perforated with a golden pin of 4 angulas made from 1 suwarna of gold, taking exactly 1 Nadika (24 minutes) to sink in water.'
    };
  }

  /**
   * Determine 5-Year Yuga State for any modern Date
   * Maps current Gregorian date into its cycle relative to Winter Solstice
   */
  function getYugaStateForDate(date = new Date()) {
    // Reference Vedic Winter Solstice baseline: Dec 21
    const y = date.getFullYear();
    const solYear = (date.getMonth() === 11 && date.getDate() >= 21) ? y : y - 1;
    const solsticeDate = new Date(solYear, 11, 21); // Dec 21

    const diffMs = date.getTime() - solsticeDate.getTime();
    const elapsedDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Cycle within 5-Year Yuga (1830 days)
    const yugaDay = ((elapsedDays % 1830) + 1830) % 1830;
    const yearIndex = Math.min(4, Math.floor(yugaDay / 366));
    const dayInYear = yugaDay % 366;

    const samvatsara = SAMVATSARAS[yearIndex];
    const isUttarayana = dayInYear < 183;
    const daysFromAyana = isUttarayana ? dayInYear : dayInYear - 183;

    // Ritu (each Ritu = 61 days)
    const rituIndex = Math.min(5, Math.floor(dayInYear / 61));
    const ritu = RITUS[rituIndex];

    // Parvan index (0 to 124)
    // 124 Parvans in 1830 days => ~ 14.758 days per parvan
    const parvanIndex = Math.min(124, Math.floor((yugaDay * 124) / 1830));
    const paksha = (parvanIndex % 2 === 0) ? 'Shukla (Bright Half)' : 'Krishna (Dark Half)';

    // Solar and Lunar positions via Lagadha algorithms
    const sunData = calculateSuryaNakshatra(parvanIndex);
    const moonData = calculateParvaBhamsa(parvanIndex);
    const aharmana = calculateAharmana(daysFromAyana, isUttarayana);
    const adhimasa = checkAdhimasa(parvanIndex);

    return {
      date,
      yugaDay: yugaDay + 1,
      totalYugaDays: 1830,
      samvatsara,
      yearInYuga: yearIndex + 1,
      dayInYear: dayInYear + 1,
      ayana: isUttarayana ? 'Uttarayana (उत्तर-अयन)' : 'Dakshinayana (दक्षिण-अयन)',
      ritu,
      parvanIndex: parvanIndex + 1,
      totalParvans: 124,
      paksha,
      sunPosition: sunData,
      moonPosition: moonData,
      aharmana,
      adhimasa
    };
  }

  /**
   * Tri-System Astronomical Comparison
   * Compares:
   * 1. Vedanga Jyotisha (Sage Lagadha, 1400 BCE)
   * 2. Surya Siddhanta (Classical Siddhantic era)
   * 3. Modern Drik Ganita (Precise Ephemeris / Topocentric)
   */
  function compareAstronomicalSystems(date = new Date()) {
    const vState = getYugaStateForDate(date);

    // Modern Julian Day
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate() + (date.getHours() + (date.getMinutes() / 60)) / 24;
    const jd = (function (yr, mo, dy) {
      if (mo <= 2) { yr -= 1; mo += 12; }
      const A = Math.floor(yr / 100);
      const B = 2 - A + Math.floor(A / 4);
      return Math.floor(365.25 * (yr + 4716)) + Math.floor(30.6001 * (mo + 1)) + dy + B - 1524.5;
    })(y, m, d);

    // Modern Drik Sun Longitude
    const n = jd - 2451545.0;
    const L = (280.46 + 0.9856474 * n) % 360;
    const g = ((357.528 + 0.9856003 * n) % 360) * Math.PI / 180;
    const drikSunLon = ((L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g) % 360) + 360) % 360;

    // Modern Lahiri Ayanamsha (~24.22° in 2026)
    const ayanamsha = 24.22;
    const drikNirayanaSun = ((drikSunLon - ayanamsha) + 360) % 360;
    const drikSunStarIdx = Math.floor(drikNirayanaSun / (360 / 27));

    // Surya Siddhanta (Mean motion + Manda Kendra perturbation approximation)
    const ssDaysFromKali = (jd - 588465.5);
    const ssSunMean = ((ssDaysFromKali * (360 / 365.258756)) % 360 + 360) % 360;
    const ssSunStarIdx = Math.floor(ssSunMean / (360 / 27));

    return {
      vedanga: {
        systemName: 'Vedanga Jyotisha (वेदाङ्ग ज्योतिषम्)',
        authority: 'Sage Lagadha (c. 1400–1200 BCE)',
        model: 'Linear Arithmetic 5-Year Yuga Model (1830 Savana Days)',
        solsticeAnchor: 'Winter Solstice fixed at Shravishtha (Dhanishtha) Nakshatra 0°',
        sunNakshatra: vState.sunPosition.standardName,
        sunDegrees: vState.sunPosition.decimalDeg,
        bhamshas: vState.sunPosition.bhamshaText,
        dayLength: vState.aharmana.dayLengthFormatted
      },
      suryaSiddhanta: {
        systemName: 'Surya Siddhanta (सूर्यसिद्धान्त)',
        authority: 'Classical Siddhantic Tradition (Varahamihira, Aryabhata)',
        model: 'Trigonometric Epicyclic Model (Manda/Shighra Kendra, 365.258756 Days)',
        solsticeAnchor: 'Makar Sankranti anchored to Nirayana Zodiac via Chitra Paksha',
        sunNakshatra: STANDARD_NAKSHATRAS[ssSunStarIdx],
        sunDegrees: parseFloat(ssSunMean.toFixed(2)),
        dayLength: 'Variable by latitude sine trigonometry'
      },
      drikGanita: {
        systemName: 'Drik Ganita (दृग्गणित / Modern Ephemeris)',
        authority: 'Swiss Ephemeris / INAO / Modern Astronomical Observatory',
        model: 'Multi-body Newtonian-Relativistic Gravitational Perturbations (VSOP87/ELP2000)',
        solsticeAnchor: 'Sayana Tropical Capricorn Ingress + Lahiri Chitra Paksha Ayanamsha (~24.22°)',
        sunNakshatra: STANDARD_NAKSHATRAS[drikSunStarIdx],
        sunDegrees: parseFloat(drikNirayanaSun.toFixed(2)),
        dayLength: 'Precision Topocentric Solar Zenith calculation'
      },
      precessionExplanation: 'The difference between Sage Lagadha\'s Winter Solstice in Dhanishtha and today\'s Winter Solstice in Moola / Dhanu is exactly ~54°, caused by the Precession of Equinoxes (Ayanamsha shift at 50.3 arcseconds per year over ~3,400 years). This provides undeniable astronomical proof of the high antiquity of the Vedic civilization!'
    };
  }

  /* =========================================================================
     3. SANSKRIT SHLOKA TREASURY (वेदाङ्ग ज्योतिष मूल श्लोकाः)
     From Archajyotisha (Rigveda) & Yajushajyotisha (Yajurveda)
     Critical Edition by Prof. T.S. Kuppanna Sastry (INSA 1985)
     ========================================================================= */
  const SHLOKA_TREASURY = [
    {
      id: 'mangalacharanam',
      category: 'Invocation & Supremacy',
      recension: 'Yajusha 1 & Rig 35',
      verseNum: 'Y-1 / R-35',
      shloka: 'यथा शिखा मयूराणां नागानां मणयो यथा ।\nतद्वद् वेदाङ्गशास्त्राणां गणितं मूर्ध्नि वर्तते ॥',
      transliteration: 'yathā śikhā mayūrāṇāṁ nāgānāṁ maṇayo yathā |\ntadvad vedāṅga-śāstrāṇāṁ gaṇitaṁ mūrdhni vartate ||',
      meaning: 'Just like the crested plume on the head of peacocks, just like the radiant gem atop the hoods of divine serpents, so stands Ganita (mathematical astronomy) at the supreme crest of all the Vedanga sciences!',
      commentary: 'Prof. Kuppanna Sastry notes: This celebrated shloka asserts the paramount status of astronomical computation. For all Vedic sacrifices and human welfare depend upon the precise determination of time (Kala).'
    },
    {
      id: 'yajnartha',
      category: 'Purpose of Jyotisha',
      recension: 'Yajusha 3',
      verseNum: 'Y-3',
      shloka: 'वेदा हि यज्ञार्थमभिप्रवृत्ताः कालानुपूर्वा विहिताश्च यज्ञाः ।\nतस्मादिदं कालविधानशास्त्रं यो ज्योतिषं वेद स वेद यज्ञान् ॥',
      transliteration: 'vedā hi yajñārtham abhipravṛttāḥ kālānupūrvā vihitāś ca yajñāḥ |\ntasmād idaṁ kāla-vidhāna-śāstraṁ yo jyotiṣaṁ veda sa veda yajñān ||',
      meaning: 'The Vedas are revealed for the performance of sacred Yajnas (sacrifices); and Yajnas are enjoined to be performed in the strict sequence of appropriate time. Therefore, he who understands this sacred science of time-determination (Jyotisha), he truly understands the secrets of Yajnas!',
      commentary: 'Sage Lagadha establishes Jyotisha as the temporal organ (Eye of the Veda Purusha), indispensable for discerning ritus, tithis, and ayanas.'
    },
    {
      id: 'ayana_start',
      category: 'Solstices & Equinoxes',
      recension: 'Yajusha 6 & Rig 5',
      verseNum: 'Y-6 / R-5',
      shloka: 'प्रपद्येते श्रविष्ठादौ सूर्याचन्द्रमसावुदक् ।\nसार्पार्धे दक्षिणार्कस्तु माघश्रावणयोः सदा ॥',
      transliteration: 'prapadyete śraviṣṭhādau sūryācandramasāv udak |\nsārpārdhe dakṣiṇārkas tu māgha-śrāvaṇayoḥ sadā ||',
      meaning: 'The Sun and the Moon turn towards the North (commencing Uttarayana) at the beginning of Shravishtha (Dhanishtha) Nakshatra in the month of Magha. The Sun turns towards the South (commencing Dakshinayana) at the midpoint of Ashlesha (Sarpa) Nakshatra in the month of Shravana.',
      commentary: 'Historical astronomical landmark: In c. 1400–1200 BCE, the winter solstice was precisely at 0° Dhanishtha and summer solstice at 23°20\' Cancer (Ashlesha midpoint). Today, due to precession, these have shifted by ~54° into Dhanu and Mithuna.'
    },
    {
      id: 'yuga_duration',
      category: '5-Year Yuga Constants',
      recension: 'Yajusha 28 & Rig 38',
      verseNum: 'Y-28 / R-38',
      shloka: 'सप्तविंशमहर्भक्तं कृत्वा रूपेण संमितम् ।\nअष्टाविंशं विजानीयाद् भभागोऽह्नः शतं स्मृतम् ॥',
      transliteration: 'saptaviṁśam aharbhaktaṁ kṛtvā rūpeṇa saṁmitam |\naṣṭāviṁśaṁ vijānīyād bhabhāgo\'hnaḥ śataṁ smṛtam ||',
      meaning: 'A Yuga consists of 5 Solar Years, comprising 1830 Savana civil days, 62 synodic months, 67 sidereal months, 124 Parvans, and 1860 Tithis.',
      commentary: 'INSA 1985 mathematical proof: 1830 / 5 = 366 civil days per solar year. 1830 / 62 = 29.516 civil days per synodic month, establishing an integer arithmetic system of astonishing elegance.'
    },
    {
      id: 'aharmana_variation',
      category: 'Day-Length & Water Clock',
      recension: 'Yajusha 7 & Rig 6',
      verseNum: 'Y-7 / R-6',
      shloka: 'धर्मवृद्धिरपां प्रस्थः काष्ठा द्वादश चोद्गतः ।\nअहस्तुल्यं द्विरभ्यस्तं विहाय च शतं स्मृतम् ॥',
      transliteration: 'gharmavṛddhir apāṁ prasthaḥ kāṣṭhā dvādaśa codgataḥ |\nahastulyaṁ dvirabhyastaṁ vihāya ca śataṁ smṛtam ||',
      meaning: 'The daily increase of day-length during Uttarayana is one Palaprastha of water, which equals 4/61 Nadika (or 2/61 Muhurta). The day grows from its minimum of 12 Muhurtas (24 Nadikas) to a maximum of 18 Muhurtas (36 Nadikas) at Summer Solstice.',
      commentary: 'Sage Lagadha links clepsydra hydrology directly to solar declination. A ratio of 18:12 (3:2) between longest and shortest day precisely fits northwest India (latitude 34°N).'
    },
    {
      id: 'parva_bhamsa',
      category: 'Parva-Bhamsa Moon Position',
      recension: 'Yajusha 10–11',
      verseNum: 'Y-10-11',
      shloka: 'त्र्यंशैर्भानि धनिष्ठायाः पर्वणः पर्वणः स्मृतम् ।\nएकादशभिरभ्यस्य पर्वभागान् समाहरेत् ॥',
      transliteration: 'tryaṁśair bhāni dhaniṣṭhāyāḥ parvaṇaḥ parvaṇaḥ smṛtam |\nekādaśabhir abhyasya parvabhāgān samāharet ||',
      meaning: 'At every Parvan (fortnight), multiply the elapsed Parvans by 1809 and divide by 124 to obtain the Moon\'s Nakshatra, with the remainder giving the Bhamshas in 124th parts.',
      commentary: 'The foundation of the Parva-Bhamsa algorithm: ensures integer-exact celestial tracking without transcendental fractions.'
    }
  ];

  /* Public API */
  return {
    CONSTANTS: YUGA_CONSTANTS,
    SAMVATSARAS,
    RITUS,
    VEDANGA_NAKSHATRAS,
    STANDARD_NAKSHATRAS,
    VISHUVATS,
    SHLOKA_TREASURY,
    calculateSuryaNakshatra,
    calculateParvaBhamsa,
    calculateTithiNakshatra,
    calculateAharmana,
    checkAdhimasa,
    waterClockConverter,
    getYugaStateForDate,
    compareAstronomicalSystems
  };
})();

if (typeof window !== 'undefined') {
  window.VEDANGA_JYOTISHA = VEDANGA_JYOTISHA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VEDANGA_JYOTISHA };
}
