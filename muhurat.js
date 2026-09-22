/* ============================================================
   DIVYA MANGALAM — VEDIC SHUBH MUHURAT ENGINE
   Based on Classical Muhurta Chintamani, Brihat Samhita, and Kalaprakasika
   Calculates electional astrology timings for 10 major ceremonies
   ============================================================ */

const MUHURAT = (function () {
  // 10 Major Ceremonies
  const CATEGORIES = {
    'vivah': {
      id: 'vivah',
      nameEn: 'Marriage (Vivah)',
      nameTe: 'వివాహ ముహూర్తం',
      nameSa: 'विवाह मुहूर्त',
      emoji: '💍',
      description: 'Sacred wedding ceremony uniting two souls under auspicious planetary alignment.',
      favNakshatras: ['Rohini', 'Mrigashira', 'Magha', 'Uttara Phalguni', 'Hasta', 'Swati', 'Anuradha', 'Moola', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Ekadashi', 'Trayodashi'],
      favDays: [1, 3, 4, 5], // Mon, Wed, Thu, Fri (Sun neutral)
      badDays: [2, 6], // Tue, Sat
      vetoChaturmas: true,
      vetoCombustion: true
    },
    'griha-pravesh': {
      id: 'griha-pravesh',
      nameEn: 'Housewarming (Griha Pravesh)',
      nameTe: 'గృహ ప్రవేశం',
      nameSa: 'गृह प्रवेश मुहूर्त',
      emoji: '🏡',
      description: 'Entering and consecrating a new or renovated residence for prosperity and peace.',
      favNakshatras: ['Rohini', 'Mrigashira', 'Pushya', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Anuradha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Uttara Bhadrapada', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
      favDays: [1, 3, 4, 5],
      badDays: [2], // Tue
      vetoChaturmas: true,
      vetoCombustion: true
    },
    'vahan': {
      id: 'vahan',
      nameEn: 'Vehicle Purchase (Vahan Kharid)',
      nameTe: 'వాహన కొనుగోలు',
      nameSa: 'वाहन क्रय मुहूर्त',
      emoji: '🚗',
      description: 'Procuring and taking delivery of cars, two-wheelers, or commercial vehicles for safety and longevity.',
      favNakshatras: ['Ashwini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [3, 5, 0, 1, 4], // Wed, Fri, Sun, Mon, Thu
      badDays: [2, 6], // Tue, Sat
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'sampatti': {
      id: 'sampatti',
      nameEn: 'Property / Land Purchase',
      nameTe: 'ఆస్తి / భూమి కొనుగోలు',
      nameSa: 'भूमि / संपत्ति क्रय',
      emoji: '🏢',
      description: 'Signing deed agreements, land registries, and property investments.',
      favNakshatras: ['Rohini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Ashlesha', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Vishakha', 'Anuradha', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [4, 5, 3, 1], // Thu, Fri, Wed, Mon
      badDays: [0, 2], // Sun, Tue for registry
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'vyapar': {
      id: 'vyapar',
      nameEn: 'Business / Shop Opening',
      nameTe: 'వ్యాపార ప్రారంభం',
      nameSa: 'व्यापार आरम्भ मुहूर्त',
      emoji: '💼',
      description: 'Launching a commercial venture, opening a shop, or making first trade transactions.',
      favNakshatras: ['Pushya', 'Ashwini', 'Rohini', 'Mrigashira', 'Punarvasu', 'Hasta', 'Chitra', 'Anuradha', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [3, 4, 5, 1], // Wed, Thu, Fri, Mon
      badDays: [2, 6],
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'namkaran': {
      id: 'namkaran',
      nameEn: 'Child Naming (Namkaran)',
      nameTe: 'నామకరణ మహోత్సవం',
      nameSa: 'नामकरण संस्कार',
      emoji: '👶',
      description: 'Ceremonial bestowing of an auspicious name to a newborn based on planetary nakshatra sound.',
      favNakshatras: ['Ashwini', 'Rohini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
      favDays: [0, 1, 3, 4, 5],
      badDays: [2, 6],
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'mundan': {
      id: 'mundan',
      nameEn: 'Tonsure / First Haircut (Mundan)',
      nameTe: 'చౌలము / పుట్టువెంట్రుకలు',
      nameSa: 'चूडाकरण (मुण्डन) संस्कार',
      emoji: '✂️',
      description: 'Purificatory tonsure ceremony shaving the birth hair for mental clarity and health.',
      favNakshatras: ['Ashwini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Chitra', 'Swati', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
      favDays: [1, 3, 4, 5],
      badDays: [0, 2, 6],
      vetoChaturmas: true,
      vetoCombustion: true
    },
    'annaprashan': {
      id: 'annaprashan',
      nameEn: 'First Rice Feeding (Annaprashan)',
      nameTe: 'అన్నప్రాశన ముహూర్తం',
      nameSa: 'अन्नप्राशन संस्कार',
      emoji: '🍚',
      description: 'Introducing sacred first solid food and honey/ghee to the child for health and intellect.',
      favNakshatras: ['Ashwini', 'Rohini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Uttara Bhadrapada', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [1, 3, 4, 5, 0],
      badDays: [2, 6],
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'vidyarambha': {
      id: 'vidyarambha',
      nameEn: 'Education Start (Aksharabhyasa)',
      nameTe: 'అక్షరాభ్యాస ముహూర్తం',
      nameSa: 'विद्यारम्भ / अक्षराभ्यास',
      emoji: '📚',
      description: 'Initiation into literacy, alphabets, and sacred learning dedicated to Goddess Saraswati.',
      favNakshatras: ['Ashwini', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
      favDays: [3, 4, 5, 1], // Wed (Budha), Thu (Guru), Fri (Saraswati), Mon
      badDays: [2, 6, 0],
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'swarna': {
      id: 'swarna',
      nameEn: 'Gold & Jewelry Purchase',
      nameTe: 'బంగారు ఆభరణాల కొనుగోలు',
      nameSa: 'स्वर्ण / आभूषण क्रय',
      emoji: '🪙',
      description: 'Auspicious times to buy gold, silver, and precious jewelry to invite perennial Mahalakshmi prosperity.',
      favNakshatras: ['Pushya', 'Rohini', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Shravana', 'Dhanishtha', 'Revati'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [4, 5, 3, 0, 1], // Thu (Guru Pushya!), Fri, Wed, Sun (Ravi Pushya!), Mon
      badDays: [6], // Sat strictly avoided for gold
      vetoChaturmas: false,
      vetoCombustion: false
    }
  };

  // Helper to format 24h decimal hour to 'hh:mm AM/PM'
  function formatDecimalTime(h) {
    let hour = Math.floor(h);
    let min = Math.round((h - hour) * 60);
    if (min === 60) { hour += 1; min = 0; }
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMin = min < 10 ? '0' + min : min;
    return `${displayHour}:${displayMin} ${ampm}`;
  }

  // Calculate clean auspicious window for a day
  function getCleanTimeWindow(weekday, sunriseHour = 6.0, sunsetHour = 18.0) {
    const dayLength = sunsetHour - sunriseHour;
    const part = dayLength / 8;

    // Rahu Kaal part (1-indexed)
    const rahuParts = [8, 2, 7, 5, 6, 4, 3]; // Sun=8, Mon=2, Tue=7, Wed=5, Thu=6, Fri=4, Sat=3
    const rahuPart = rahuParts[weekday];
    const rahuStart = sunriseHour + (rahuPart - 1) * part;
    const rahuEnd = sunriseHour + rahuPart * part;

    // Abhijit Muhurta (approx 11:36 AM - 12:24 PM, avoided on Wednesday)
    const midday = (sunriseHour + sunsetHour) / 2;
    const abhijitStart = midday - 0.4;
    const abhijitEnd = midday + 0.4;

    // Select candidate window
    let windowText = '';
    if (weekday === 3) {
      // Wed: Abhijit avoided. Recommend early morning or late afternoon
      windowText = '08:30 AM – 10:45 AM (Labh Choghadiya)';
    } else if (rahuStart <= midday && rahuEnd >= midday) {
      // Rahu covers midday: recommend morning
      windowText = '09:15 AM – 11:00 AM (Shubh Choghadiya)';
    } else {
      // Recommend Abhijit or strong Choghadiya
      windowText = `${formatDecimalTime(abhijitStart)} – ${formatDecimalTime(abhijitEnd)} (Abhijit Muhurta)`;
    }

    return {
      windowText,
      rahuKaal: `${formatDecimalTime(rahuStart)} – ${formatDecimalTime(rahuEnd)}`
    };
  }

  function getPanchangEngine() {
    if (typeof PANCHANG !== 'undefined') return PANCHANG;
    if (typeof window !== 'undefined' && window.PANCHANG) return window.PANCHANG;
    if (typeof globalThis !== 'undefined' && globalThis.PANCHANG) return globalThis.PANCHANG;
    try { return require('./panchang.js').PANCHANG; } catch (e) { return null; }
  }

  // Evaluate a specific date for a ceremony
  function evaluateDay(date, categoryKey) {
    const cat = CATEGORIES[categoryKey] || CATEGORIES['vivah'];
    const pEngine = getPanchangEngine();
    if (!pEngine) {
      return { score: 50, rating: 'Average', reason: 'Panchang engine not loaded' };
    }

    const p = pEngine.getPanchangForDate(date);
    const weekday = date.getDay();
    const tithiName = p.tithi ? p.tithi.name : '';
    const nakshatraName = p.nakshatra ? p.nakshatra.name : '';
    const month = date.getMonth(); // 0-11

    let score = 50;
    let isVetoed = false;
    let vetoReason = '';

    // 1. Hard Veto Checks
    // Chaturmas (roughly July to November: months 6 to 10)
    const isChaturmas = (month >= 6 && month <= 10);
    if (cat.vetoChaturmas && isChaturmas) {
      isVetoed = true;
      vetoReason = 'Chaturmas period (Devshayani to Devuthani) — auspicious initiations paused.';
    }

    // Rikta Tithi (Chaturthi, Navami, Chaturdashi)
    const isRikta = ['Chaturthi', 'Navami', 'Chaturdashi'].includes(tithiName);
    if (isRikta && !['vyapar'].includes(cat.id)) {
      score -= 25;
      if (cat.id === 'vivah' || cat.id === 'griha-pravesh') {
        isVetoed = true;
        vetoReason = `Rikta Tithi (${tithiName}) is strictly avoided for sacred ceremonies.`;
      }
    }

    // Amavasya
    if (tithiName === 'Amavasya') {
      score -= 30;
      isVetoed = true;
      vetoReason = 'Amavasya (New Moon) — strictly inauspicious for auspicious ceremonies.';
    }

    // Bad Weekday
    if (cat.badDays.includes(weekday)) {
      score -= 20;
    }

    // 2. Positive Scoring
    if (cat.favNakshatras.includes(nakshatraName)) {
      score += 25;
    } else {
      score -= 5;
    }

    if (cat.favTithis.includes(tithiName)) {
      score += 20;
    }

    if (cat.favDays.includes(weekday)) {
      score += 15;
    }

    // Pushya Nakshatra bonus
    if (nakshatraName === 'Pushya') {
      score += 15;
    }

    // Clamp score
    if (isVetoed) {
      score = Math.min(score, 35);
    }
    score = Math.max(10, Math.min(98, score));

    // Determine Rating
    let rating = 'Average';
    let ratingTe = 'మధ్యమం';
    let stars = '⭐⭐⭐';
    if (score >= 80 && !isVetoed) {
      rating = 'Highly Auspicious';
      ratingTe = 'అత్యంత శుభకరం (ఉత్తమం)';
      stars = '⭐⭐⭐⭐⭐';
    } else if (score >= 62 && !isVetoed) {
      rating = 'Auspicious';
      ratingTe = 'శుభ ముహూర్తం';
      stars = '⭐⭐⭐⭐';
    } else if (score < 45 || isVetoed) {
      rating = 'Avoid';
      ratingTe = 'వర్జ్యం (అనుకూలం కాదు)';
      stars = '⭐';
    }

    // Time window & explanation
    const timing = getCleanTimeWindow(weekday);
    let reasonEn = '';
    let reasonTe = '';

    if (score >= 62 && !isVetoed) {
      reasonEn = `Favorable alignment of ${nakshatraName} Nakshatra and ${tithiName} Tithi. Best to commence within recommended window.`;
      reasonTe = `${nakshatraName} నక్షత్రం మరియు ${tithiName} తిథిల దివ్య కలయిక. సూచించిన శుభ ఘడియలలో ప్రారంభించుట శ్రేయస్కరం.`;
    } else if (isVetoed) {
      reasonEn = vetoReason || `Inauspicious combinations observed. Postpone to an unblemished day.`;
      reasonTe = vetoReason ? `అశుభ సమయం: ${vetoReason}` : `దోషాలు ఉన్నందున ఈ రోజును నివారించి మరొక శుభ దినాన్ని ఎంచుకోవలెను.`;
    } else {
      reasonEn = `Moderately supportive day. Proceed strictly during the recommended Choghadiya window, avoiding Rahu Kaal (${timing.rahuKaal}).`;
      reasonTe = `సాధారణ దినం. రాహుకాలం (${timing.rahuKaal}) విడిచిపెట్టి, సూచించిన అమృత/శుభ ఘడియలలో మాత్రమే ప్రారంభించండి.`;
    }

    return {
      date,
      dateFormatted: date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      category: cat,
      score,
      rating,
      ratingTe,
      stars,
      isVetoed,
      tithi: tithiName,
      nakshatra: nakshatraName,
      timeWindow: timing.windowText,
      rahuKaal: timing.rahuKaal,
      reasonEn,
      reasonTe
    };
  }

  // Get ranked auspicious days for a month
  function getMonthMuhurats(year, month, categoryKey) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const results = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const evalResult = evaluateDay(date, categoryKey);
      results.push(evalResult);
    }

    // Filter and return sorted by score (high to low)
    return results;
  }

  // Get Today's quick status
  function getTodayMuhurat(categoryKey) {
    const today = new Date();
    return evaluateDay(today, categoryKey);
  }

  return {
    CATEGORIES,
    evaluateDay,
    getMonthMuhurats,
    getTodayMuhurat
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MUHURAT };
}
