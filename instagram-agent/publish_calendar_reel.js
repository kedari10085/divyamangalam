const https = require('https');
const path = require('path');
const fs = require('fs');

// Load .env
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const k = trimmed.substring(0, eqIdx).trim();
        const v = trimmed.substring(eqIdx + 1).trim();
        if (!process.env[k]) process.env[k] = v;
      }
    }
  }
}

const token = process.env.META_ACCESS_TOKEN;
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/daily_calendar_reel_today.mp4';

const caption = `🕉️ Divya Mangalam — Daily Vedic Calendar & Panchang
📅 2026-11-02 • Somavara (Monday)
✦ ──────────────────────── ✦

🙏 DEITY OF THE DAY:
Lord Shiva (Someshwara)
Theme: Mental clarity, inner peace & spiritual liberation
Mantra: ॐ नमः शिवाय (Om Namah Shivaya)

📜 TODAY'S PANCHANG:
• 🌙 Tithi: Saptami (Krishna Paksha)
• ⭐ Nakshatra: Magha (Pitru Devata)
• 🔮 Yoga: Indra (Auspicious for leadership & learning)
• 🦁 Moon Sign: Simha (Leo)

✦ ──────────────────────── ✦
⏰ TIMING GUIDE (SHUBH VS ASHUBH):

🌟 SHUBH MUHURAT (AUSPICIOUS WINDOWS):
• 🌟 Abhijit Muhurta: 11:45 AM – 12:35 PM (Today's most powerful golden window to start new endeavors, investments & meetings)
• 🪔 Brahma Muhurta: 04:30 AM – 05:18 AM (Ideal for meditation & sadhana)
• 🌸 Amrit Kaal: Evening Pradosha (Shiva Puja & Peace)

⚠️ ASHUBH KAAL (CAUTION PERIODS - AVOID NEW BEGINNINGS):
• ⛔ Rahu Kaal: 07:30 AM – 09:00 AM (Refrain from major material/contractual starts)
• ⏳ Yamagandam: 10:30 AM – 12:00 PM
• 🛑 Gulika Kalam: 01:30 PM – 03:00 PM

🌿 MONDAY REMEDY & GUIDANCE:
Chant 'Om Namah Shivaya' 108 times and offer pure water or milk to Lord Shiva to calm lunar emotions and invite mental harmony.

✦ ──────────────────────── ✦
✨ Explore complete free Vedic tools, 24h Vedic Clock & AI Palm Reading:
🔗 https://divyamangalam.com
Instagram: @divyamangalam.info

#DivyaMangalam #DailyPanchang #VedicCalendar #ShubhMuhurat #AbhijitMuhurta #RahuKaal #LordShiva #Somavara #OmNamahShivaya #HinduCalendar #SpiritualReels #VedicAstrology #Jyotish #Bhakti #ReelsIndia #Panchangam`;

function req(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: method,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    const r = https.request(options, (res) => {
      let b = '';
      res.on('data', chunk => b += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(b)); }
        catch (e) { resolve(b); }
      });
    });
    r.on('error', reject);
    if (data) r.write(data);
    r.end();
  });
}

async function publishCalendarReel() {
  console.log('==================================================');
  console.log('🕉️ Publishing Daily Calendar Reel to Instagram...');
  console.log('Video URL:', videoUrl);
  console.log('==================================================');

  // Step 1: Create Reel Container
  const createUrl = `https://graph.instagram.com/v20.0/me/media`;
  const postData = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption,
    share_to_feed: 'true',
    access_token: token
  }).toString();

  const initRes = await req(createUrl, 'POST', postData);
  console.log('1. Container creation response:', JSON.stringify(initRes));

  if (!initRes || !initRes.id) {
    console.error('Failed to create container:', initRes);
    return;
  }

  const containerId = initRes.id;
  console.log(`2. Polling Reel encoding status for Container ID: ${containerId}`);

  // Step 2: Poll status
  let attempts = 0;
  while (attempts < 30) {
    await new Promise(r => setTimeout(r, 6000));
    attempts++;
    const statusUrl = `https://graph.instagram.com/v20.0/${containerId}?fields=status_code&access_token=${token}`;
    const statusRes = await req(statusUrl);
    console.log(`[Poll ${attempts}] Status: ${statusRes.status_code || JSON.stringify(statusRes)}`);

    if (statusRes.status_code === 'FINISHED') {
      console.log('3. Publishing Reel container to feed...');
      const publishUrl = `https://graph.instagram.com/v20.0/me/media_publish`;
      const pubData = new URLSearchParams({
        creation_id: containerId,
        access_token: token
      }).toString();
      const pubRes = await req(publishUrl, 'POST', pubData);
      console.log('SUCCESS! Published Calendar Reel Post ID:', pubRes.id);

      // Get permalink
      const permalinkUrl = `https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`;
      const finalRes = await req(permalinkUrl);
      console.log('LIVE REEL DETAILS:', JSON.stringify(finalRes));
      console.log('LIVE URL:', finalRes.permalink);
      return;
    }

    if (statusRes.status_code === 'ERROR') {
      console.error('Reel processing failed:', statusRes);
      return;
    }
  }
}

publishCalendarReel().catch(console.error);
