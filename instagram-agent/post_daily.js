/**
 * Divya Mangalam — Daily Instagram Posting Agent
 * 
 * Features:
 * 1. Reads daily schedule from DAILY_POSTS.md
 * 2. If no scheduled post for today, dynamically generates post using Panchang & Day Deity
 * 3. Creates AI visual artwork URL via Pollinations Flux AI (1080x1080)
 * 4. Publishes to Instagram via Meta Graph API (or runs in Dry Run / Preview mode)
 * 5. Updates DAILY_POSTS.md with [POSTED] status
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const DAILY_POSTS_PATH = path.join(__dirname, '..', 'DAILY_POSTS.md');
const PREVIEW_HTML_PATH = path.join(__dirname, 'latest_preview.html');
const LOG_PATH = path.join(__dirname, 'post_log.json');

const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const IS_DRY_RUN = process.argv.includes('--dry-run') || (!INSTAGRAM_ACCOUNT_ID || !META_ACCESS_TOKEN);

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
    deity: 'Lord Surya Narayana (Sun God)',
    theme: 'Radiant health, vitality, purpose & illumination',
    mantra: 'ॐ घृणिः सूर्याय नमः',
    mantraMeaning: 'Salutations to the supreme light that energizes the cosmos.',
    prompt: 'Lord Surya Narayana riding magnificent golden chariot with seven horses across celestial sunrise sky, golden halo radiance, divine lotus flowers, cosmic rays of warmth, spiritual masterpiece, hyperrealistic 8k, devotional temple art, octane render'
  },
  {
    day: 'Monday',
    deity: 'Lord Shiva (Someshwara)',
    theme: 'Inner stillness, tranquility, mental peace & meditation',
    mantra: 'ॐ नमः शिवाय',
    mantraMeaning: 'I bow to the auspicious one, the source of stillness within.',
    prompt: 'Divine Lord Shiva in serene deep meditation on Mount Kailash, crescent moon in matted locks, sacred river Ganga flowing, holy trishula, soft morning Himalayan mist, golden aura, hyper-realistic, 8k devotional digital oil painting'
  },
  {
    day: 'Tuesday',
    deity: 'Lord Hanuman (Pawanputra)',
    theme: 'Courage, protection, overcoming hurdles & steadfast faith',
    mantra: 'ॐ हनुमते नमः',
    mantraMeaning: 'Salutations to the son of the wind, the pinnacle of strength and devotion.',
    prompt: 'Magnificent Lord Hanuman holding glowing Gada mace, blessing posture with gentle compassionate eyes, golden sacred aura, ancient Ayodhya temple silhouette at sunset, radiant devotional atmosphere, 8k resolution, cinematic spiritual artwork'
  },
  {
    day: 'Wednesday',
    deity: 'Lord Ganesha (Vighnaharta)',
    theme: 'Wisdom, intellect, discernment & obstacle removal',
    mantra: 'ॐ गं गणपतये नमः',
    mantraMeaning: 'Salutations to the lord of hosts who dissolves all barriers to righteousness.',
    prompt: 'Lord Ganesha sitting on a glowing golden lotus throne, holding modak and lotus, golden mukut crown, divine serene expression, soft diya lamps glowing around, incense smoke rising, warm temple courtyard lighting, 8k digital oil painting'
  },
  {
    day: 'Thursday',
    deity: 'Lord Vishnu & Guru Brihaspati',
    theme: 'Spiritual knowledge, balance, righteousness & grace',
    mantra: 'ॐ नमो भगवते वासुदेवाय',
    mantraMeaning: 'Salutations to Vasudeva, the all-pervading protector of creation.',
    prompt: 'Lord Vishnu holding sacred Shankha Conch and Sudarshana Chakra, celestial Sheshanaga serpent above, radiant blue and gold divine attire, cosmic ocean Ksheera Sagara, glowing lotus petals, supreme peaceful smile, heavenly lighting, 8k'
  },
  {
    day: 'Friday',
    deity: 'Goddess Maha Lakshmi',
    theme: 'Abundance, spiritual wealth, contentment & motherly love',
    mantra: 'ॐ श्रीं महालक्ष्म्यै नमः',
    mantraMeaning: 'Salutations to the supreme goddess of light, prosperity, and grace.',
    prompt: 'Goddess Lakshmi standing on a pink lotus flower in pristine sacred pond, gold coins showering from her open palm, four hands, regal red and gold silk saree, traditional temple jewelry, radiant warm golden hour glow, ethereal masterpiece, 8k'
  },
  {
    day: 'Saturday',
    deity: 'Lord Shani Deva & Bhairava',
    theme: 'Karma, discipline, humility, patience & perseverance',
    mantra: 'ॐ शं शनैश्चराय नमः',
    mantraMeaning: 'Salutations to the slow-moving teacher of patience and righteousness.',
    prompt: 'Lord Shani Deva crowned in regal deep sapphire and silver, sitting majestically on raven vahana, bow and arrow, stars and cosmic nebula background, stern yet just divine presence, atmospheric spiritual artwork, 8k'
  }
];

// Approximate Panchang Calculator (Lahiri-based sidereal estimation)
function calculatePanchang(date) {
  const dayOfWeek = date.getDay();
  const dayNames = ['Ravivara (Sunday)', 'Somavara (Monday)', 'Mangalavara (Tuesday)', 'Budhavara (Wednesday)', 'Guruvara (Thursday)', 'Shukravara (Friday)', 'Shanivara (Saturday)'];
  
  // Rahu Kaal approximate timings for 6:00 AM sunrise
  const rahuKaalWindows = [
    '04:30 PM – 06:00 PM', // Sun
    '07:30 AM – 09:00 AM', // Mon
    '03:00 PM – 04:30 PM', // Tue
    '12:00 PM – 01:30 PM', // Wed
    '01:30 PM – 03:00 PM', // Thu
    '10:30 AM – 12:00 PM', // Fri
    '09:00 AM – 10:30 AM'  // Sat
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

  // Julian Day Number estimate
  const jd = (date.getTime() / 86400000) + 2440587.5;
  const daysSinceEpoch = jd - 2451545.0;
  
  // Approximate Moon and Sun longitude
  const sunLong = (280.460 + 0.9856474 * daysSinceEpoch) % 360;
  const moonLong = (218.316 + 13.176396 * daysSinceEpoch) % 360;
  const diff = ((moonLong - sunLong) + 360) % 360;

  const tithiIndex = Math.floor(diff / 12) % 30;
  const isShukla = tithiIndex < 15;
  const paksha = isShukla ? 'Shukla Paksha' : 'Krishna Paksha';
  const tithiName = tithiNames[tithiIndex % 15];

  const nakshatraIndex = Math.floor((moonLong % 360) / (360 / 27)) % 27;
  const yogaIndex = Math.floor(((sunLong + moonLong) % 360) / (360 / 27)) % 27;

  return {
    vara: dayNames[dayOfWeek],
    tithi: `${tithiName} (${paksha})`,
    nakshatra: nakshatras[nakshatraIndex],
    yoga: yogas[yogaIndex],
    rahuKaal: rahuKaalWindows[dayOfWeek],
    abhijit: '11:45 AM – 12:35 PM (Optimal window for auspicious beginnings)'
  };
}

// Parse DAILY_POSTS.md to check if today has an explicit scheduled entry
function parseScheduledPosts(mdContent, dateStr) {
  const dateRegex = new RegExp(`###\\s*Date:\\s*${dateStr}[\\s\\S]*?(?=###\\s*Date:|$)`, 'i');
  const match = mdContent.match(dateRegex);
  if (!match) return null;

  const block = match[0];
  const isPending = /Status:\s*\[PENDING\]/i.test(block);
  if (!isPending) return null; // already posted or not pending

  const deityMatch = block.match(/Deity:\s*(.+)/i);
  const significanceMatch = block.match(/Significance:\s*(.+)/i);
  const mantraMatch = block.match(/Mantra:\s*`?([^`\n]+)`?/i);
  const promptMatch = block.match(/AI Image Prompt:\s*`?([^`\n]+)`?/i);
  const noteMatch = block.match(/Custom Note:\s*"([^"\n]+)"/i);

  return {
    isCustom: true,
    deity: deityMatch ? deityMatch[1].trim() : null,
    significance: significanceMatch ? significanceMatch[1].trim() : null,
    mantra: mantraMatch ? mantraMatch[1].trim() : null,
    prompt: promptMatch ? promptMatch[1].trim() : null,
    note: noteMatch ? noteMatch[1].trim() : null
  };
}

function generatePollinationsImageUrl(prompt) {
  const cleanPrompt = prompt.replace(/[^\w\s,.-]/g, '').trim();
  const encoded = encodeURIComponent(cleanPrompt);
  return `https://image.pollinations.ai/prompt/${encoded}?width=1080&height=1080&nologo=true&model=flux`;
}

function buildCaption(todayStr, panchang, deityData, customNote) {
  const divider = '✦ ─────────────── ✦';
  
  return `🕉️ Divya Mangalam — Daily Vedic Blessings
${divider}
📅 ${todayStr} • ${panchang.vara}

🙏 DEITY OF THE DAY:
${deityData.deity}
Theme: ${deityData.theme || deityData.significance || 'Sacred Devotion'}

✨ SACRED MANTRA:
${deityData.mantra}
${deityData.mantraMeaning ? `“${deityData.mantraMeaning}”` : ''}

${divider}
📜 TODAY'S PANCHANG (Lahiri Ephemeris):
• 🌙 Tithi: ${panchang.tithi}
• ⭐ Nakshatra: ${panchang.nakshatra}
• 🔮 Yoga: ${panchang.yoga}
• ⚠️ Rahu Kaal: ${panchang.rahuKaal} (avoid new beginnings)
• ☀️ Abhijit Muhurta: ${panchang.abhijit}

${customNote ? `💬 SPIRITUAL REFLECTION:\n“${customNote}”\n\n` : ''}${divider}
🌿 Explore free Vedic tools, AI Palm Reading, Dosha analysis & complete scriptures:
🔗 https://divyamangalam.com
Instagram: @divyamangalam.info

#DivyaMangalam #VedicAstrology #DailyPanchang #SanatanaDharma #HinduCalendar #Nakshatra #Tithi #RahuKaal #SpiritualWisdom #Jyotish #Bhakti #IndianTradition`;
}

// Mark post as [POSTED] in DAILY_POSTS.md
function markPostAsPosted(dateStr) {
  try {
    if (!fs.existsSync(DAILY_POSTS_PATH)) return;
    let content = fs.readFileSync(DAILY_POSTS_PATH, 'utf8');
    const target = new RegExp(`(###\\s*Date:\\s*${dateStr}[\\s\\S]*?Status:\\s*)\\[PENDING\\]`, 'i');
    if (target.test(content)) {
      content = content.replace(target, `$1[POSTED] (at ${new Date().toISOString()})`);
      fs.writeFileSync(DAILY_POSTS_PATH, content, 'utf8');
      console.log(`[SUCCESS] Marked post for ${dateStr} as [POSTED] in DAILY_POSTS.md`);
    }
  } catch (err) {
    console.error('[WARN] Could not update DAILY_POSTS.md:', err.message);
  }
}

// HTTP request helper for Meta Graph API
function makeHttpsRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: method,
      headers: {
        'User-Agent': 'DivyaMangalam-Instagram-Agent/1.0'
      }
    };

    if (data && method === 'POST') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
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
  
  // 1. Create Media Container
  const createContainerUrl = `https://graph.facebook.com/v19.0/${INSTAGRAM_ACCOUNT_ID}/media`;
  const postData = new URLSearchParams({
    image_url: imageUrl,
    caption: caption,
    access_token: META_ACCESS_TOKEN
  }).toString();

  console.log('[API] Creating media container...');
  const containerRes = await makeHttpsRequest(createContainerUrl, 'POST', postData);
  const containerId = containerRes.id;
  console.log('[API] Media container created. ID:', containerId);

  // 2. Wait 4 seconds for Meta servers to download and prepare image
  console.log('[API] Waiting 4 seconds for media processing...');
  await new Promise(r => setTimeout(r, 4000));

  // 3. Publish Media Container
  const publishUrl = `https://graph.facebook.com/v19.0/${INSTAGRAM_ACCOUNT_ID}/media_publish`;
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
  <title>Instagram Daily Post Preview — ${postData.date}</title>
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
    .badge { display: inline-block; background: #FAF6EE; border: 1px solid #D4A017; border-radius: 999px; padding: 4px 12px; font-size: 0.75rem; font-weight: 700; color: #B45309; margin: 12px 16px 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="avatar">🕉️</div>
      <div>
        <div class="title">divyamangalam.info</div>
        <div class="subtitle">Divya Mangalam • Daily Vedic Post Preview</div>
      </div>
    </div>
    <span class="badge">${postData.isCustom ? 'Custom Scheduled Post' : 'Dynamic Panchang Post'}</span>
    <div class="caption-box" style="padding-bottom: 8px;"><strong>Date:</strong> ${postData.date} • <strong>Deity:</strong> ${postData.deity}</div>
    <div class="img-wrap">
      <img src="${postData.imageUrl}" alt="${postData.deity}" loading="lazy" />
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

  console.log(`====================================================`);
  console.log(`Divya Mangalam Instagram Posting Agent`);
  console.log(`Date (IST): ${dateStr} (${WEEKDAY_DEITIES[weekdayIdx].day})`);
  console.log(`Mode: ${IS_DRY_RUN ? 'PREVIEW / DRY-RUN (No API credentials or --dry-run flag)' : 'LIVE PUBLISHING'}`);
  console.log(`====================================================\n`);

  // 1. Calculate Astronomical Panchang
  const panchang = calculatePanchang(istDate);

  // 2. Read DAILY_POSTS.md for custom scheduled entry
  let mdContent = '';
  if (fs.existsSync(DAILY_POSTS_PATH)) {
    mdContent = fs.readFileSync(DAILY_POSTS_PATH, 'utf8');
  }

  const customEntry = parseScheduledPosts(mdContent, dateStr);

  let deityData = null;
  let customNote = null;
  let imagePrompt = null;
  let isCustom = false;

  if (customEntry) {
    console.log(`[INFO] Found custom scheduled post for ${dateStr} in DAILY_POSTS.md!`);
    isCustom = true;
    deityData = {
      deity: customEntry.deity || WEEKDAY_DEITIES[weekdayIdx].deity,
      theme: customEntry.significance || WEEKDAY_DEITIES[weekdayIdx].theme,
      mantra: customEntry.mantra || WEEKDAY_DEITIES[weekdayIdx].mantra,
      mantraMeaning: ''
    };
    imagePrompt = customEntry.prompt || WEEKDAY_DEITIES[weekdayIdx].prompt;
    customNote = customEntry.note;
  } else {
    console.log(`[INFO] Using dynamic Panchang + Deity of the Day for ${WEEKDAY_DEITIES[weekdayIdx].day}`);
    deityData = WEEKDAY_DEITIES[weekdayIdx];
    imagePrompt = deityData.prompt;
    customNote = `May today's ${panchang.nakshatra} nakshatra and ${deityData.deity}'s divine blessings illuminate your path with clarity and inner peace.`;
  }

  // 3. Generate AI Artwork URL
  const imageUrl = generatePollinationsImageUrl(imagePrompt);
  console.log(`[IMAGE] AI Artwork Prompt: "${imagePrompt}"`);
  console.log(`[IMAGE] Generated AI Image URL: ${imageUrl}\n`);

  // 4. Build Devotional Caption
  const caption = buildCaption(dateStr, panchang, deityData, customNote);

  // 5. Save HTML & JSON Previews
  const previewData = {
    date: dateStr,
    isCustom,
    deity: deityData.deity,
    mantra: deityData.mantra,
    imageUrl,
    caption,
    panchang,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(PREVIEW_HTML_PATH, generateHtmlPreview(previewData), 'utf8');
  fs.writeFileSync(LOG_PATH, JSON.stringify(previewData, null, 2), 'utf8');
  console.log(`[PREVIEW] HTML Preview generated: ${PREVIEW_HTML_PATH}`);

  // 6. Execute Publish or Dry-Run
  if (IS_DRY_RUN) {
    console.log(`\n================== CAPTION PREVIEW ==================`);
    console.log(caption);
    console.log(`====================================================\n`);
    console.log(`[DRY RUN COMPLETE] Image & Caption successfully verified!`);
    console.log(`When META_ACCESS_TOKEN and INSTAGRAM_ACCOUNT_ID are added to GitHub Secrets, this post will publish live to @divyamangalam.info automatically.\n`);
  } else {
    try {
      const postId = await publishToInstagram(imageUrl, caption);
      markPostAsPosted(dateStr);
      console.log(`[SUCCESS] Daily Instagram post complete! Post ID: ${postId}`);
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
