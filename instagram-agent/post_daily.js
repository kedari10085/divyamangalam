/**
 * Divya Mangalam — Daily Instagram Posting Agent (Multi-Mode)
 * 
 * Post Types:
 * 1. deity   — Morning Vedic Deity of the Day, Tithi, Nakshatra, Mantra & 8K AI Temple Artwork
 * 2. rashi   — Daily Rashi & Nakshatra Forecast, Benefitted Signs (Chandrabalam), Lucky Color/Number
 * 3. muhurat — Super Good vs Bad Timings (Abhijit, Brahma Muhurta vs Rahu Kaal, Yamagandam)
 * 4. palm    — Hasta Samudrika Shastra (AI Palm Reading, 4 Lines & 7 Mounts Spotlight)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const DAILY_POSTS_PATH = path.join(__dirname, '..', 'DAILY_POSTS.md');
const PREVIEW_HTML_PATH = path.join(__dirname, 'latest_preview.html');
const LOG_PATH = path.join(__dirname, 'post_log.json');

// Auto-load .env if available
function loadEnv() {
  const envPaths = [
    path.join(__dirname, '..', '.env'),
    path.join(__dirname, '.env')
  ];
  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf8').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim();
          if (!process.env[key]) process.env[key] = val;
        }
      }
    }
  }
}
loadEnv();

const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const IS_DRY_RUN = process.argv.includes('--dry-run') || (!INSTAGRAM_ACCOUNT_ID || !META_ACCESS_TOKEN);

// Parse post type: --type=auto | deity | rashi | muhurat | palm | puran | marriage_muhurat | spotlight
function getPostType() {
  let requestedType = (process.env.POST_TYPE || 'auto').toLowerCase();
  const typeArg = process.argv.find(a => a.startsWith('--type='));
  if (typeArg) requestedType = typeArg.split('=')[1].toLowerCase();
  if (process.argv.includes('--rashi')) return 'rashi';
  if (process.argv.includes('--muhurat')) return 'muhurat';
  if (process.argv.includes('--palm')) return 'palm';
  if (process.argv.includes('--puran')) return 'puran';
  if (process.argv.includes('--marriage')) return 'marriage_muhurat';
  if (process.argv.includes('--spotlight')) return 'spotlight';
  if (process.argv.includes('--deity')) return 'deity';

  if (requestedType === 'auto') {
    const istHour = getISTDate().getHours();
    if (istHour >= 5 && istHour < 11) return 'deity';     // 07:00 AM Morning Darshan slot
    if (istHour >= 11 && istHour < 15) return 'rashi';    // 12:00 PM Midday Rashi slot
    if (istHour >= 15 && istHour < 18) return 'muhurat';  // 03:30 PM Afternoon Muhurat slot
    if (istHour >= 18 && istHour < 21) return 'deity';    // 07:30 PM Evening Darshan slot
    return 'spotlight';                                   // 09:30 PM Bedtime Spotlight slot
  }
  return requestedType;
}

// Get current date in Indian Standard Time (IST, UTC+5:30)
function getISTDate() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istOffset = 5.5 * 3600000;
  return new Date(utc + istOffset);
}

function formatDateISO(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const WEEKDAY_DEITIES = [
  {
    day: 'Sunday',
    vara: 'Ravivara',
    planet: 'Lord Surya (Sun)',
    luckyColors: 'Saffron, Gold, Radiant Orange',
    luckyNumbers: '1, 10, 19, 28',
    direction: 'East (Purva)',
    deity: 'Lord Surya Narayana (Sun God)',
    theme: 'Radiant health, vitality, purpose & illumination',
    mantra: 'ॐ घृणिः सूर्याय नमः',
    mantraMeaning: 'Salutations to the supreme light that energizes the cosmos.',
    cdnImage: 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/surya_bhagavan.jpg',
    prompt: 'Lord Surya Narayana riding magnificent golden chariot with seven horses across celestial sunrise sky, golden halo radiance, divine lotus flowers, cosmic rays of warmth, spiritual masterpiece, hyperrealistic 8k, devotional temple art, octane render'
  },
  {
    day: 'Monday',
    vara: 'Somavara',
    planet: 'Lord Chandra (Moon) / Shiva',
    luckyColors: 'Pearl White, Silver, Cream',
    luckyNumbers: '2, 11, 20, 29',
    direction: 'North-West (Vayavya)',
    deity: 'Lord Shiva (Someshwara)',
    theme: 'Mental peace, emotional mastery & spiritual liberation',
    mantra: 'ॐ नमः शिवाय',
    mantraMeaning: 'Salutations to the auspicious one, the source of supreme consciousness.',
    cdnImage: 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/shiva_kailash.jpg',
    prompt: 'Lord Shiva in deep serene meditation on sacred Mount Kailash, crescent moon in matted locks, sacred Ganges flowing, gentle snowfall, third eye, divine blue throat, ethereal moonlight, masterpiece 8k spiritual art'
  },
  {
    day: 'Tuesday',
    vara: 'Mangalavara',
    planet: 'Lord Mangala (Mars) / Hanuman',
    luckyColors: 'Bright Vermilion Red, Crimson, Coral',
    luckyNumbers: '9, 18, 27',
    direction: 'South (Dakshina)',
    deity: 'Lord Hanuman & Kartikeya',
    theme: 'Courage, protection, vitality & overcoming obstacles',
    mantra: 'ॐ हं हनुमते नमः',
    mantraMeaning: 'Salutations to the mighty Hanuman, remover of fear and distress.',
    prompt: 'Lord Hanuman standing in devotion with golden mace gada, glowing chest revealing Rama and Sita in his heart, divine saffron glow, Himalayan peak background, majestic cinematic 8k devotional art'
  },
  {
    day: 'Wednesday',
    vara: 'Budhavara',
    planet: 'Lord Budha (Mercury) / Ganesha',
    luckyColors: 'Emerald Green, Mint, Jade',
    luckyNumbers: '5, 14, 23',
    direction: 'North (Uttara)',
    deity: 'Lord Ganesha & Sage Vyasa',
    theme: 'Wisdom, sharp intellect, communication & fresh starts',
    mantra: 'ॐ गं गणपतये नमः',
    mantraMeaning: 'Salutations to the lord of beginnings and remover of all hurdles.',
    prompt: 'Lord Ganesha seated on grand ornate golden throne, blessing mudra, modak in hand, mushak vehicle at feet, fresh lotus garlands, warm temple oil lamp diya glow, photorealistic 8k devotional artwork'
  },
  {
    day: 'Thursday',
    vara: 'Guruvara',
    planet: 'Lord Brihaspati (Jupiter) / Vishnu',
    luckyColors: 'Golden Yellow, Mustard, Amber',
    luckyNumbers: '3, 12, 21, 30',
    direction: 'North-East (Ishanya)',
    deity: 'Lord Maha Vishnu & Guru Brihaspati',
    theme: 'Higher knowledge, dharma, righteousness & family prosperity',
    mantra: 'ॐ नमो भगवते वासुदेवाय',
    mantraMeaning: 'Salutations to the omnipresent supreme lord of the universe.',
    prompt: 'Lord Maha Vishnu resting on celestial Sheshanaga serpent on Kshira Sagara milky ocean, four arms holding Shankha, Chakra, Gada, Padma, glowing celestial blue skin, divine cosmos background, 8k masterpiece'
  },
  {
    day: 'Friday',
    vara: 'Shukravara',
    planet: 'Goddess Lakshmi / Shukra (Venus)',
    luckyColors: 'Rose Pink, Pure White, Pastel Gold',
    luckyNumbers: '6, 15, 24',
    direction: 'South-East (Agneya)',
    deity: 'Goddess Maha Lakshmi',
    theme: 'Abundance, spiritual wealth, contentment & motherly love',
    mantra: 'ॐ श्रीं महालक्ष्म्यै नमः',
    mantraMeaning: 'Salutations to the supreme goddess of light, prosperity, and grace.',
    prompt: 'Goddess Lakshmi standing on a pink lotus flower in pristine sacred pond, gold coins showering from her open palm, four hands, regal red and gold silk saree, traditional temple jewelry, radiant warm golden hour glow, ethereal masterpiece, 8k'
  },
  {
    day: 'Saturday',
    vara: 'Shanivara',
    planet: 'Lord Shani (Saturn) & Bhairava',
    luckyColors: 'Navy Blue, Deep Indigo, Black',
    luckyNumbers: '8, 17, 26',
    direction: 'West (Pashchima)',
    deity: 'Lord Shani Deva & Bhairava',
    theme: 'Karma, discipline, humility, patience & perseverance',
    mantra: 'ॐ शं शनैश्चराय नमः',
    mantraMeaning: 'Salutations to the slow-moving teacher of patience and righteousness.',
    prompt: 'Lord Shani Deva crowned in regal deep sapphire and silver, sitting majestically on raven vahana, bow and arrow, stars and cosmic nebula background, stern yet just divine presence, atmospheric spiritual artwork, 8k'
  }
];

const RASHIS = [
  { id: 'mesha', name: 'Mesha (Aries)', symbol: '♈' },
  { id: 'vrishabha', name: 'Vrishabha (Taurus)', symbol: '♉' },
  { id: 'mithuna', name: 'Mithuna (Gemini)', symbol: '♊' },
  { id: 'karka', name: 'Karka (Cancer)', symbol: '♋' },
  { id: 'simha', name: 'Simha (Leo)', symbol: '♌' },
  { id: 'kanya', name: 'Kanya (Virgo)', symbol: '♍' },
  { id: 'tula', name: 'Tula (Libra)', symbol: '♎' },
  { id: 'vrischika', name: 'Vrischika (Scorpio)', symbol: '♏' },
  { id: 'dhanu', name: 'Dhanu (Sagittarius)', symbol: '♐' },
  { id: 'makara', name: 'Makara (Capricorn)', symbol: '♑' },
  { id: 'kumbha', name: 'Kumbha (Aquarius)', symbol: '♒' },
  { id: 'meena', name: 'Meena (Pisces)', symbol: '♓' }
];

// Approximate Panchang Calculator (Lahiri-based sidereal estimation)
function calculatePanchang(date) {
  const dayOfWeek = date.getDay();
  const dayNames = ['Ravivara (Sunday)', 'Somavara (Monday)', 'Mangalavara (Tuesday)', 'Budhavara (Wednesday)', 'Guruvara (Thursday)', 'Shukravara (Friday)', 'Shanivara (Saturday)'];
  
  const rahuKaalWindows = [
    '04:30 PM – 06:00 PM', // Sun
    '07:30 AM – 09:00 AM', // Mon
    '03:00 PM – 04:30 PM', // Tue
    '12:00 PM – 01:30 PM', // Wed
    '01:30 PM – 03:00 PM', // Thu
    '10:30 AM – 12:00 PM', // Fri
    '09:00 AM – 10:30 AM'  // Sat
  ];

  const yamagandamWindows = [
    '12:00 PM – 01:30 PM', // Sun
    '10:30 AM – 12:00 PM', // Mon
    '09:00 AM – 10:30 AM', // Tue
    '07:30 AM – 09:00 AM', // Wed
    '01:30 PM – 03:00 PM', // Thu
    '03:00 PM – 04:30 PM', // Fri
    '04:30 PM – 06:00 PM'  // Sat
  ];

  const gulikaWindows = [
    '03:00 PM – 04:30 PM', // Sun
    '01:30 PM – 03:00 PM', // Mon
    '12:00 PM – 01:30 PM', // Tue
    '10:30 AM – 12:00 PM', // Wed
    '09:00 AM – 10:30 AM', // Thu
    '07:30 AM – 09:00 AM', // Fri
    '06:00 AM – 07:30 AM'  // Sat
  ];

  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima / Amavasya'
  ];

  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
    'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  const yogas = [
    'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
    'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva',
    'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan',
    'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
  ];

  const jd = (date.getTime() / 86400000) + 2440587.5;
  const daysSinceEpoch = jd - 2451545.0;
  
  const sunLong = (280.460 + 0.9856474 * daysSinceEpoch) % 360;
  const moonLong = (218.316 + 13.176396 * daysSinceEpoch) % 360;
  const diff = ((moonLong - sunLong) + 360) % 360;

  const tithiIndex = Math.floor(diff / 12) % 30;
  const isShukla = tithiIndex < 15;
  const paksha = isShukla ? 'Shukla Paksha' : 'Krishna Paksha';
  const tithiName = tithiNames[tithiIndex % 15];

  const nakshatraIndex = Math.floor((moonLong % 360) / (360 / 27)) % 27;
  const nakshatraName = nakshatras[nakshatraIndex];

  const yogaIndex = Math.floor(((sunLong + moonLong) % 360) / (360 / 27)) % 27;
  const yogaName = yogas[yogaIndex];

  const moonRashiIdx = Math.floor((moonLong % 360) / 30) % 12;
  const moonRashiName = RASHIS[moonRashiIdx].name;

  return {
    date: formatDateISO(date),
    dayName: dayNames[dayOfWeek],
    tithi: `${tithiName} (${paksha})`,
    nakshatra: nakshatraName,
    yoga: yogaName,
    moonRashi: moonRashiName,
    moonRashiIdx,
    rahuKaal: rahuKaalWindows[dayOfWeek],
    yamagandam: yamagandamWindows[dayOfWeek],
    gulikaKalam: gulikaWindows[dayOfWeek],
    abhijit: '11:45 AM – 12:35 PM',
    brahmaMuhurta: '04:30 AM – 05:18 AM'
  };
}

// Compute Chandrabalam Beneficiaries for all 12 signs
function computeRashiBeneficiaries(moonRashiIdx) {
  const goodSigns = [];
  const cautionSigns = [];

  RASHIS.forEach((rashi, idx) => {
    // Distance from natal rashi to current Moon sign
    const houseFromNatal = ((moonRashiIdx - idx + 12) % 12) + 1;
    // Classical bad positions: 1, 2, 3, 5, 7
    const isGood = ![1, 2, 3, 5, 7].includes(houseFromNatal);

    if (isGood) {
      let benefit = 'General grace & peace';
      if (houseFromNatal === 11) benefit = 'High gains, networking & success';
      else if (houseFromNatal === 10) benefit = 'Career leadership & milestone progress';
      else if (houseFromNatal === 9) benefit = 'Good fortune, spiritual joy & luck';
      else if (houseFromNatal === 6) benefit = 'Victory over obstacles & renewed vitality';
      else if (houseFromNatal === 4) benefit = 'Family peace, comfort & vehicle happiness';
      else if (houseFromNatal === 8) benefit = 'Research, mental depth & unexpected solutions';
      else if (houseFromNatal === 12) benefit = 'Meditation, restful sleep & spiritual growth';
      goodSigns.push({ ...rashi, benefit });
    } else {
      cautionSigns.push(rashi);
    }
  });

  return { goodSigns, cautionSigns };
}

// Parse scheduled posts from DAILY_POSTS.md
function parseScheduledPosts(mdContent, targetDateStr) {
  const lines = mdContent.split('\n');
  let currentEntry = null;
  let inEntry = false;

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('### Date:')) {
      const dateMatch = line.match(/### Date:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/);
      if (dateMatch && dateMatch[1] === targetDateStr) {
        currentEntry = { date: targetDateStr };
        inEntry = true;
      } else {
        inEntry = false;
      }
    } else if (inEntry) {
      if (line.startsWith('- **Deity:**')) {
        currentEntry.deity = line.replace('- **Deity:**', '').trim();
      } else if (line.startsWith('- **Significance:**')) {
        currentEntry.significance = line.replace('- **Significance:**', '').trim();
      } else if (line.startsWith('- **Mantra:**')) {
        currentEntry.mantra = line.replace('- **Mantra:**', '').replace(/[`*]/g, '').trim();
      } else if (line.startsWith('- **AI Image Prompt:**')) {
        currentEntry.prompt = line.replace('- **AI Image Prompt:**', '').replace(/[`*"]/g, '').trim();
      } else if (line.startsWith('- **Custom Note:**')) {
        currentEntry.note = line.replace('- **Custom Note:**', '').replace(/[`*"]/g, '').trim();
      } else if (line.startsWith('- **Status:**')) {
        currentEntry.status = line.replace('- **Status:**', '').trim();
      }
    }
  }

  return currentEntry;
}

// Mark post as posted in DAILY_POSTS.md
function markPostAsPosted(targetDateStr) {
  if (!fs.existsSync(DAILY_POSTS_PATH)) return;
  let content = fs.readFileSync(DAILY_POSTS_PATH, 'utf8');
  const targetHeader = `### Date: ${targetDateStr}`;
  if (content.includes(targetHeader)) {
    content = content.replace(
      new RegExp(`(${targetHeader}[\\s\\S]*?- \\*\\*Status:\\*\\*\\s*)\\[PENDING\\]`),
      `$1[POSTED on ${new Date().toISOString()}]`
    );
    fs.writeFileSync(DAILY_POSTS_PATH, content, 'utf8');
  }
}

// Generate image via Pollinations Flux AI
function generatePollinationsImageUrl(prompt) {
  const encodedPrompt = encodeURIComponent(prompt.trim());
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1080&height=1080&nologo=true&model=flux`;
}

// BUILD CAPTION: 1. DEITY & PANCHANG
function buildDeityCaption(dateStr, panchang, deityData, customNote) {
  return `🕉️ Divya Mangalam — Daily Vedic Blessings
✦ ─────────────── ✦
📅 ${dateStr} • ${panchang.dayName}

🙏 DEITY OF THE DAY:
${deityData.deity}
Theme: ${deityData.theme}

✨ SACRED MANTRA:
${deityData.mantra}
${deityData.mantraMeaning ? `“${deityData.mantraMeaning}”` : ''}

✦ ─────────────── ✦
📜 TODAY'S PANCHANG (Lahiri Ephemeris):
• 🌙 Tithi: ${panchang.tithi}
• ⭐ Nakshatra: ${panchang.nakshatra}
• 🔮 Yoga: ${panchang.yoga}
• ⚠️ Rahu Kaal: ${panchang.rahuKaal} (avoid new beginnings)
• ☀️ Abhijit Muhurta: ${panchang.abhijit} (Optimal window for auspicious beginnings)

💬 SPIRITUAL REFLECTION:
“${customNote || `May today's divine grace fill your home with radiant peace, health, and spiritual clarity.`}”

✦ ─────────────── ✦
🌿 Explore free Vedic tools, AI Palm Reading, Dosha analysis & complete scriptures:
🔗 https://divyamangalam.com
Instagram: @divyamangalam.info

#DivyaMangalam #VedicAstrology #DailyPanchang #SanatanaDharma #HinduCalendar #Nakshatra #Tithi #RahuKaal #SpiritualWisdom #Jyotish #Bhakti #IndianTradition`;
}

// BUILD CAPTION: 2. RASHI & NAKSHATRA FORECAST
function buildRashiCaption(dateStr, panchang, istDate) {
  const weekdayInfo = WEEKDAY_DEITIES[istDate.getDay()];
  const { goodSigns, cautionSigns } = computeRashiBeneficiaries(panchang.moonRashiIdx);

  const goodSignList = goodSigns.map(s => `• ${s.symbol} ${s.name} — ${s.benefit}`).join('\n');
  const cautionSignList = cautionSigns.map(s => `${s.symbol} ${s.name}`).join(', ');

  return `🌟 Divya Mangalam — Daily Rashi & Nakshatra Forecast
✦ ─────────────── ✦
📅 ${dateStr} • ${weekdayInfo.vara} (${weekdayInfo.day})
🌙 Transit Moon: ${panchang.moonRashi} • ⭐ Nakshatra: ${panchang.nakshatra}

⭐ HIGHLY BENEFITTED RASHIS TODAY (Chandrabalam Shubha):
These signs enjoy favorable lunar alignment today for career progress, financial decisions, and peaceful relationships:
${goodSignList}

⚠️ RASHIS TO PRACTICE MINDFULNESS & PATIENCE:
Signs advised to pause on hasty financial speculation and avoid arguments today:
• ${cautionSignList}
💡 Sacred Remedy: Chant “ॐ नमः शिवाय” or light a ghee lamp at sunset for mental tranquility.

✦ ─────────────── ✦
🎨 TODAY'S COSMIC VIBRATIONS (${weekdayInfo.planet}):
• 🎨 Lucky Colors: ${weekdayInfo.luckyColors}
• 🔢 Lucky Numbers: ${weekdayInfo.luckyNumbers}
• 🧭 Auspicious Direction: ${weekdayInfo.direction}

✦ ─────────────── ✦
🔮 Check your complete birth chart, Mangal Dosha & Sade Sati free:
🔗 https://divyamangalam.com/dosha-check.html
Instagram: @divyamangalam.info

#RashiBhavishya #DailyHoroscope #VedicAstrology #Jyotish #ZodiacForecast #Chandrabalam #Nakshatra #DivyaMangalam #AstrologyToday #Horoscope2026 #SpiritualGuidance`;
}

// BUILD CAPTION: 3. SHUBH MUHURAT & TIMINGS GUIDE
function buildMuhuratCaption(dateStr, panchang, istDate) {
  const weekdayInfo = WEEKDAY_DEITIES[istDate.getDay()];

  return `⏳ Divya Mangalam — Shubh Muhurat & Timings Guide
✦ ─────────────── ✦
📅 ${dateStr} • ${weekdayInfo.vara} (${weekdayInfo.day})
🌙 Tithi: ${panchang.tithi} • ⭐ Nakshatra: ${panchang.nakshatra}

🌟 SUPER AUSPICIOUS TIMINGS (Highest Cosmic Support):
Align critical meetings, worship, purchases, or new initiatives with these windows:
• ☀️ Abhijit Muhurta: ${panchang.abhijit} (The invincible midday window for victory and success)
• 🌅 Brahma Muhurta: ${panchang.brahmaMuhurta} (Supreme time for meditation, prayer & spiritual clarity)
• 🍯 Amrit Kaal: Auspicious for family celebrations, agreements & major decisions

⚠️ INAUSPICIOUS PERIODS (Strictly Avoid Major New Beginnings):
During these windows, avoid signing contracts, large investments, or starting new journeys:
• 🚫 Rahu Kaal: ${panchang.rahuKaal} (Heavy planetary interference — focus on routine work)
• ⏳ Yamagandam: ${panchang.yamagandam} (Avoid critical new departures or commitments)
• 🌘 Gulika Kalam: ${panchang.gulikaKalam} (Suitable for ongoing, routine tasks)

💡 VEDIC WISDOM:
“When your actions harmonize with auspicious cosmic hours, effort decreases and divine grace multiplies.”

✦ ─────────────── ✦
📅 Calculate complete personalized Shubh Muhurats for marriage, housewarming & business:
🔗 https://divyamangalam.com/muhurat.html
Instagram: @divyamangalam.info

#ShubhMuhurat #AuspiciousTimings #RahuKaal #AbhijitMuhurta #VedicWisdom #Panchang #MuhurtaChintamani #DivyaMangalam #SanatanaDharma #DailyMuhurat`;
}

// BUILD CAPTION: 4. PALM READING FEATURE SPOTLIGHT
function buildPalmCaption(dateStr) {
  return `🖐️ Divya Mangalam — Vedic Palm Reading (Hasta Samudrika Shastra)
✦ ─────────────── ✦
✨ “What do your palm lines reveal about your destiny, vitality, and true karma?”

In ancient Vedic Hasta Samudrika Shastra, your hand is a living cosmic map. As your thoughts, habits, and consciousness evolve, the energetic lines on your palm reflect your soul's journey.

🔍 THE 4 PRIMARY LINES ON YOUR PALM:
• 💚 Life Line (Ayushya Rekha): Traces vitality, health phases, energy resilience & foundational stamina.
• 🧠 Head Line (Matru Rekha): Reveals intellectual depth, decision-making style & artistic vs analytical intellect.
• 💖 Heart Line (Hridaya Rekha): Maps emotional depth, relationship karma, compassion & romantic harmony.
• ⭐ Fate Line (Bhagya Rekha): Charts career trajectory, self-earned wealth & major milestone years.

🪐 THE 7 PLANETARY MOUNTS (Energy Hubs):
• 👑 Jupiter Mount: Ambition, wisdom & leadership
• ⚖️ Saturn Mount: Discipline, perseverance & patience
• ☀️ Sun Mount: Fame, vitality & creative brilliance
• 💬 Mercury Mount: Business acumen, speech & wit
• 🌺 Venus Mount: Love, artistic passion & vitality
• 🌙 Moon Mount: Intuition, imagination & travel
• ⚔️ Mars Mount: Courage, fortitude & protection

✦ ─────────────── ✦
📲 Free AI Palm Reading Online:
Scan or upload your palm from your phone in 30 seconds for an authentic Vedic reading & personalized gemstone remedies!
🔗 https://divyamangalam.com/palm-reading.html
Instagram: @divyamangalam.info

#PalmReading #HastaSamudrika #VedicPalmistry #Palmistry #Destiny #LifeLine #FateLine #HeartLine #DivyaMangalam #VedicWisdom #KarmaAndDestiny #AstrologyOnline`;
}

// BUILD CAPTION: 5. 18 MAHA PURANAS & SACRED UPASANAS SPOTLIGHT
function buildPuranCaption(dateStr) {
  return `📜 Divya Mangalam — 18 Maha Puranas & Sacred Upasanas
✦ ─────────────── ✦
✨ “Immerse yourself in the timeless ocean of Vedic wisdom, divine stories, and sacred Upasanas.”

Compiled by Bhagavan Veda Vyasa, the 18 Maha Puranas contain over 400,000 verses revealing cosmic creation, eternal dharma, deep spiritual truths, and practical guidance for life:

🔱 THE THREE CLASSIFICATIONS (TRIMURTI UPASANAS):
• 🌺 Satvik Puranas (Lord Vishnu Upasana):
  Vishnu Purana, Bhagavata Purana, Naradiya, Garuda, Padma & Varaha Purana.
  Focus: Preservation, selfless devotion (Bhakti), righteousness, and eternal peace.

• 🕉️ Tamas/Nivritti Puranas (Lord Shiva Upasana):
  Shiva Purana, Linga Purana, Skanda, Agni, Matsya & Kurma Purana.
  Focus: Dissolution of ego, ascetic meditation, temple consecration, and spiritual liberation (Moksha).

• 🔱 Rajas/Srishti Puranas (Lord Brahma / Shakti Upasana):
  Brahma Purana, Brahmanda, Brahma Vaivarta, Markandeya, Bhavishya & Vamana Purana.
  Focus: Cosmic architecture, genealogy of sages, Durga Saptashati & sacred rituals.

✦ ─────────────── ✦
📖 Explore the Sacred Portal:
Read authentic summaries, chapters, and sacred mantras across the 18 Puranas & complete Mahabharata online:
🔗 https://divyamangalam.com/puran.html
🔗 https://divyamangalam.com/mahabharata.html
Instagram: @divyamangalam.info

#MahaPuranas #VedicWisdom #SanatanaDharma #ShivaPurana #BhagavataPurana #VishnuPurana #SkandaPurana #Upasana #VedaVyasa #DivyaMangalam #SacredTexts #HinduScriptures`;
}

// BUILD CAPTION: 6. VIVAH & GRIHA PRAVESH SHUBH MUHURAT SPOTLIGHT
function buildMarriageMuhuratCaption(dateStr) {
  return `🏰 Divya Mangalam — Vivah & Griha Pravesh Shubh Muhurat Guide
✦ ─────────────── ✦
✨ “When your sacred milestones align with divine celestial timings, harmony and prosperity flourish for generations.”

In Vedic Muhurta Shastra, embarking on life's monumental milestones during auspicious windows protects against cosmic friction and activates divine blessings:

💍 VIVAH MUHURAT (Auspicious Marriage Timings):
• Favorable Nakshatras: Rohini, Mrigashira, Magha, Uttara Phalguni, Hasta, Swati, Anuradha, Mula, Uttara Ashadha, Uttara Bhadrapada, Revati.
• Favorable Days: Thursday (Guruvara), Friday (Shukravara), Wednesday (Budhavara), Monday (Somavara).
• Essential Checks: 10-fold Dasa Koota compatibility & cancellation of Mangal Dosha.
• Periods to Avoid: Chaturmas, Guru/Shukra Tara Asta (combustion), and Bhadra / Vishti karana.

🏡 GRIHA PRAVESH MUHURAT (Sacred Housewarming):
• Ideal Months: Vaishakha, Jyeshtha, Magha, Phalguna (Uttarayan period preferred).
• Auspicious Tithis: Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Trayodashi (Shukla Paksha).
• Sacred Vastu Shanti & Navagraha Puja timings to bring positive pranic energy into your new home.

✦ ─────────────── ✦
⏳ Free Online Vedic Muhurat & Dosha Calculator:
Check auspicious marriage dates, housewarming windows, and complete Mangal Dosha analysis instantly:
🔗 https://divyamangalam.com/muhurat.html
🔗 https://divyamangalam.com/dosha-check.html
Instagram: @divyamangalam.info

#VivahMuhurat #GrihaPravesh #ShubhMuhurat #MarriageAstrology #VedicAstrology #Housewarming #VastuShastra #KundliMatching #MangalDosha #DivyaMangalam #AuspiciousTimings`;
}

// HTTP Helper
function makeHttpsRequest(url, method = 'GET', data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'User-Agent': 'DivyaMangalam-Instagram-Agent/2.0',
        ...headers
      }
    };

    if (data && method === 'POST') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(json);
          } else {
            reject(new Error(`API Error ${res.statusCode}: ${JSON.stringify(json)}`));
          }
        } catch(e) {
          resolve(body);
        }
      });
    });

    req.on('error', err => reject(err));
    if (data) req.write(data);
    req.end();
  });
}

// Publish to Instagram Graph API
async function publishToInstagram(imageUrl, caption) {
  console.log('[API] Starting Meta Instagram Graph API publication...');
  
  const isInstagramToken = META_ACCESS_TOKEN.startsWith('IG');
  const baseUrl = isInstagramToken ? 'https://graph.instagram.com/v20.0' : 'https://graph.facebook.com/v20.0';
  const targetId = isInstagramToken ? (INSTAGRAM_ACCOUNT_ID || 'me') : INSTAGRAM_ACCOUNT_ID;

  // 1. Create Media Container
  const createContainerUrl = `${baseUrl}/${targetId}/media`;
  const postData = new URLSearchParams({
    image_url: imageUrl,
    caption: caption,
    access_token: META_ACCESS_TOKEN
  }).toString();

  console.log(`[API] Creating media container on ${baseUrl}...`);
  const containerRes = await makeHttpsRequest(createContainerUrl, 'POST', postData);
  const containerId = containerRes.id;
  console.log('[API] Media container created. ID:', containerId);

  // 2. Wait 4 seconds for Meta servers to download and prepare image
  console.log('[API] Waiting 4 seconds for media processing...');
  await new Promise(r => setTimeout(r, 4000));

  // 3. Publish Media Container
  const publishUrl = `${baseUrl}/${targetId}/media_publish`;
  const publishData = new URLSearchParams({
    creation_id: containerId,
    access_token: META_ACCESS_TOKEN
  }).toString();

  console.log('[API] Publishing container to Instagram...');
  const publishRes = await makeHttpsRequest(publishUrl, 'POST', publishData);
  console.log('[SUCCESS] Post successfully published! Instagram Post ID:', publishRes.id);
  return publishRes.id;
}

// Generate beautiful HTML preview of the Instagram card
function generateHtmlPreview(postData) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Instagram Daily Post Preview — ${postData.type.toUpperCase()}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #FAF8F5; color: #18181B; margin: 0; padding: 24px; display: flex; justify-content: center; }
    .card { background: #FFFFFF; max-width: 460px; width: 100%; border-radius: 16px; border: 1px solid rgba(212,160,23,0.3); box-shadow: 0 12px 36px rgba(44,26,14,0.08); overflow: hidden; }
    .header { padding: 14px 16px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #F4EFE6; }
    .avatar { width: 40px; height: 40px; border-radius: 50%; background: #FF6F00; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
    .title { font-weight: 700; font-size: 0.95rem; }
    .subtitle { font-size: 0.78rem; color: #736E82; }
    .img-wrap { width: 100%; aspect-ratio: 1/1; background: #F5EFEB; position: relative; overflow: hidden; }
    .img-wrap img { width: 100%; height: 100%; object-fit: cover; }
    .caption-box { padding: 16px; font-size: 0.88rem; line-height: 1.6; white-space: pre-wrap; word-break: break-word; color: #2D2738; }
    .badge { display: inline-block; background: #FAF6EE; border: 1px solid #D4A017; border-radius: 999px; padding: 4px 12px; font-size: 0.75rem; font-weight: 700; color: #B45309; margin: 12px 16px 0; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="avatar">🕉️</div>
      <div>
        <div class="title">divyamangalam.info</div>
        <div class="subtitle">Divya Mangalam • ${postData.type.toUpperCase()} Post Preview</div>
      </div>
    </div>
    <span class="badge">${postData.type} post</span>
    <div class="caption-box" style="padding-bottom: 8px;"><strong>Date:</strong> ${postData.date}</div>
    <div class="img-wrap">
      <img src="${postData.imageUrl}" alt="${postData.type}" loading="lazy" />
    </div>
    <div class="caption-box">${escapeHtml(postData.caption)}</div>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// MAIN RUNNER
async function main() {
  const istDate = getISTDate();
  const dateStr = formatDateISO(istDate);
  const weekdayIdx = istDate.getDay();
  const postType = getPostType();

  console.log(`====================================================`);
  console.log(`Divya Mangalam Instagram Posting Agent`);
  console.log(`Date (IST): ${dateStr} (${WEEKDAY_DEITIES[weekdayIdx].day})`);
  console.log(`Post Type: ${postType.toUpperCase()}`);
  console.log(`Mode: ${IS_DRY_RUN ? 'PREVIEW / DRY-RUN (Pass valid tokens to publish)' : 'LIVE PUBLISHING'}`);
  console.log(`====================================================\n`);

  const panchang = calculatePanchang(istDate);

  let caption = '';
  let imagePrompt = '';
  let isCustom = false;
  let deityData = null;
  let customEntry = null;

  let effectiveType = postType;
  if (postType === 'spotlight') {
    // Deterministic 3-day rotation to avoid overwhelming followers
    // Day 0: Palm Reading, Day 1: 18 Maha Puranas & Upasanas, Day 2: Vivah & Griha Pravesh Muhurats
    const dayEpoch = Math.floor(istDate.getTime() / 86400000);
    const spotlightTypes = ['palm', 'puran', 'marriage_muhurat'];
    effectiveType = spotlightTypes[dayEpoch % spotlightTypes.length];
    console.log(`[SPOTLIGHT] Rotating spotlight (${(dayEpoch % 3) + 1}/3): Selecting ${effectiveType.toUpperCase()}...`);
  }

  if (effectiveType === 'rashi') {
    // 2. RASHI & NAKSHATRA FORECAST POST
    console.log(`[INFO] Building Daily Rashi & Nakshatra Beneficiary Forecast...`);
    caption = buildRashiCaption(dateStr, panchang, istDate);
    imagePrompt = `Vedic astrological golden celestial wheel, 12 illuminated golden rashi zodiac constellations glowing in cosmic indigo sky, ancient Sanskrit glyphs, sacred mandala, radiant starlight, 8k devotional masterpiece`;
  } else if (effectiveType === 'muhurat') {
    // 3. SHUBH MUHURAT & TIMINGS POST
    console.log(`[INFO] Building Shubh Muhurat & Timings Guide...`);
    caption = buildMuhuratCaption(dateStr, panchang, istDate);
    imagePrompt = `Ancient Vedic Surya Yantra astronomical sundial crafted in polished gold and brass, morning golden sunlight casting divine rays across sacred Hindu temple courtyard, celestial clock, 8k cinematic spiritual artwork`;
  } else if (effectiveType === 'palm') {
    // 4. PALM READING FEATURE SPOTLIGHT POST
    console.log(`[INFO] Building Vedic Palm Reading Spotlight...`);
    caption = buildPalmCaption(dateStr);
    imagePrompt = `Close up of an open spiritual hand palm with illuminated golden and turquoise energy lines glowing softly on skin, sacred Vedic symbols of Sun Moon and Jupiter etched faintly, cosmic stardust atmosphere, 8k photorealistic temple photography`;
  } else if (effectiveType === 'puran') {
    // 5. 18 MAHA PURANAS & SACRED UPASANAS SPOTLIGHT
    console.log(`[INFO] Building 18 Maha Puranas & Sacred Upasanas Spotlight...`);
    caption = buildPuranCaption(dateStr);
    imagePrompt = `Sage Veda Vyasa in peaceful meditation writing sacred Sanskrit verses on ancient palm leaf manuscripts under sacred banyan tree, warm glowing temple oil lamps, divine golden aura, classical 8k devotional oil painting`;
  } else if (effectiveType === 'marriage_muhurat' || effectiveType === 'marriage') {
    // 6. VIVAH & GRIHA PRAVESH SHUBH MUHURAT SPOTLIGHT
    console.log(`[INFO] Building Vivah & Griha Pravesh Shubh Muhurat Spotlight...`);
    caption = buildMarriageMuhuratCaption(dateStr);
    imagePrompt = `Sacred Vedic Hindu wedding mandap adorned with fresh golden marigold flowers and silk, holy fire havan kunda with divine flame, traditional brass oil lamps, auspicious atmosphere, 8k spiritual fine art`;
  } else {
    // 1. DEITY & PANCHANG POST (DEFAULT)
    let mdContent = '';
    if (fs.existsSync(DAILY_POSTS_PATH)) {
      mdContent = fs.readFileSync(DAILY_POSTS_PATH, 'utf8');
    }
    customEntry = parseScheduledPosts(mdContent, dateStr);

    let customNote = null;

    if (customEntry) {
      console.log(`[INFO] Found custom scheduled post for ${dateStr} in DAILY_POSTS.md!`);
      isCustom = true;
      deityData = {
        deity: customEntry.deity || WEEKDAY_DEITIES[weekdayIdx].deity,
        theme: customEntry.significance || WEEKDAY_DEITIES[weekdayIdx].theme,
        mantra: customEntry.mantra || WEEKDAY_DEITIES[weekdayIdx].mantra,
        mantraMeaning: '',
        cdnImage: customEntry.imageUrl || WEEKDAY_DEITIES[weekdayIdx].cdnImage
      };
      imagePrompt = customEntry.prompt || WEEKDAY_DEITIES[weekdayIdx].prompt;
      customNote = customEntry.note;
    } else {
      console.log(`[INFO] Using dynamic Panchang + Deity of the Day for ${WEEKDAY_DEITIES[weekdayIdx].day}`);
      deityData = WEEKDAY_DEITIES[weekdayIdx];
      imagePrompt = deityData.prompt;
      customNote = `May today's ${panchang.nakshatra} nakshatra and ${deityData.deity}'s divine blessings illuminate your path with clarity and inner peace.`;
    }

    caption = buildDeityCaption(dateStr, panchang, deityData, customNote);
  }

  // Generate Image URL (Prioritize Classical Verified Artwork CDN if available)
  let imageUrl = '';
  if (effectiveType === 'deity' && deityData && (customEntry?.imageUrl || deityData.cdnImage)) {
    imageUrl = customEntry?.imageUrl || deityData.cdnImage;
    console.log(`[IMAGE] Using Classical Verified Artwork CDN: ${imageUrl}\n`);
  } else {
    imageUrl = generatePollinationsImageUrl(imagePrompt);
    console.log(`[IMAGE] AI Artwork Prompt: "${imagePrompt}"`);
    console.log(`[IMAGE] Generated AI Image URL: ${imageUrl}\n`);
  }

  // Save Previews
  const previewData = {
    date: dateStr,
    type: effectiveType,
    isCustom,
    imageUrl,
    caption,
    panchang,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(PREVIEW_HTML_PATH, generateHtmlPreview(previewData), 'utf8');
  fs.writeFileSync(LOG_PATH, JSON.stringify(previewData, null, 2), 'utf8');
  console.log(`[PREVIEW] HTML Preview generated: ${PREVIEW_HTML_PATH}`);

  // Publish or Dry-run
  if (IS_DRY_RUN) {
    console.log(`\n================== CAPTION PREVIEW (${effectiveType.toUpperCase()}) ==================`);
    console.log(caption);
    console.log(`====================================================\n`);
    console.log(`[DRY RUN COMPLETE] Image & Caption verified successfully.`);
  } else {
    try {
      const postId = await publishToInstagram(imageUrl, caption);
      if (effectiveType === 'deity') markPostAsPosted(dateStr);
      console.log(`[SUCCESS] Instagram post published! Post ID: ${postId}`);
    } catch (err) {
      console.error(`[ERROR] Failed to publish to Instagram:`, err.message);
      process.exit(1);
    }
  }
}

main().catch(err => {
  console.error('[FATAL ERROR]:', err);
  process.exit(1);
});
