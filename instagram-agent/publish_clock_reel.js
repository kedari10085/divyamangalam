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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/clock_reel.mp4';

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

function buildClockCaption(dateStr) {
  return `⏰ 24-HOUR SACRED VEDIC MUHURAT CLOCK • ${dateStr} 🚩
✦ ──────────────────────── ✦
Align your daily actions with cosmic rhythms! Here is your complete astronomical 24-hour Muhurat breakdown for today:

🌅 SOLAR DIAL:
• Sunrise: 06:07 AM
• Sunset: 05:41 PM
• Day Ruler: Brihaspati (Jupiter) • Guruvara

🌟 SHUBH MUHURAT (AUSPICIOUS GOLDEN WINDOWS):
• 🌟 Abhijit Muhurta: 11:31 AM – 12:17 PM (The most potent window of the day to start business, signing deals, travel & investments)
• 🪔 Brahma Muhurta: 04:31 AM – 05:19 AM (Sacred time for meditation & spiritual sadhana)
• ⚔️ Vijaya Muhurta: 01:50 PM – 02:36 PM (Auspicious for conquering obstacles & competitions)

⚠️ ASHUBH KAAL (CAUTION PERIODS - AVOID NEW BEGINNINGS):
• ⛔ Rahu Kaal: 01:21 PM – 02:47 PM (Pause on contracts & material starts)
• ⏳ Yamagandam: 06:07 AM – 07:33 AM
• 🛑 Gulika Kalam: 09:00 AM – 10:27 AM

🧭 DISHA SHOOL (TRAVEL ADVISORY):
• Caution Direction: South
• Sacred Remedy: Consume yellow mustard or curd before commencing journey

✦ ──────────────────────── ✦
✨ Interactive 24-Hour Live Vedic Clock, Kundli & Daily Panchang:
🌐 https://divyamangalam.com
🔔 Follow @divyamangalam.info for your daily 9:00 AM sacred Muhurat updates!

#VedicClock #Muhurat #Panchang #RahuKaal #AbhijitMuhurta #SanatanaDharma #DailyAstrology #DivyaMangalam #HinduCalendar #AuspiciousTime #DailyReels #SpiritualReels`;
}

async function publishClockReel() {
  console.log("==================================================");
  console.log("⏰ Publishing 24-Hour Vedic Clock Reel to Instagram...");
  console.log("Video URL:", videoUrl);
  console.log("==================================================");

  if (!token) {
    console.error("❌ META_ACCESS_TOKEN not found in .env");
    process.exit(1);
  }

  // Get Account ID
  const me = await req(`https://graph.instagram.com/v20.0/me?fields=id,username&access_token=${token}`);
  const accountId = me.id;
  console.log("Instagram Account:", me.username, "(ID:", accountId, ")");

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' });
  const caption = buildClockCaption(dateStr);

  // Step 1: Create Reel Container
  console.log("\n1. Creating Reel container...");
  const params = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption,
    share_to_feed: 'true',
    access_token: token
  });

  const createRes = await req(`https://graph.instagram.com/v20.0/${accountId}/media`, 'POST', params.toString());
  console.log("Container Response:", JSON.stringify(createRes));

  if (!createRes.id) {
    console.error("❌ Container creation failed:", createRes);
    process.exit(1);
  }

  const containerId = createRes.id;
  console.log(`\n2. Polling video encoding status for Container ID: ${containerId}`);

  let isReady = false;
  for (let i = 1; i <= 30; i++) {
    await new Promise(r => setTimeout(r, 6000));
    const statusRes = await req(`https://graph.instagram.com/v20.0/${containerId}?fields=status_code&access_token=${token}`);
    console.log(`[Poll ${i}] Status: ${statusRes.status_code}`);

    if (statusRes.status_code === 'FINISHED') {
      isReady = true;
      break;
    } else if (statusRes.status_code === 'ERROR') {
      console.error("❌ Video processing failed on Instagram:", statusRes);
      process.exit(1);
    }
  }

  if (!isReady) {
    console.error("❌ Video encoding timed out.");
    process.exit(1);
  }

  // Step 3: Publish Media
  console.log("\n3. Publishing video container to feed...");
  const pubParams = new URLSearchParams({
    creation_id: containerId,
    access_token: token
  });

  const pubRes = await req(`https://graph.instagram.com/v20.0/${accountId}/media_publish`, 'POST', pubParams.toString());
  console.log("SUCCESS! Published Vedic Clock Reel Post ID:", pubRes.id);

  if (pubRes.id) {
    const postDetails = await req(`https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`);
    console.log("LIVE DETAILS:", JSON.stringify(postDetails));
    console.log("LIVE URL:", postDetails.permalink);
  }
}

publishClockReel().catch(err => {
  console.error("Fatal Error:", err);
  process.exit(1);
});
