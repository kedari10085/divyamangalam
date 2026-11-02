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

const WEEKDAY_DEITIES = [
  { day: 'Sunday', vara: 'Ravivara', deity: 'Lord Surya Narayana', rahu: '04:30 PM – 06:00 PM', yama: '12:00 PM – 01:30 PM', mantra: 'ॐ घृणिः सूर्याय नमः' },
  { day: 'Monday', vara: 'Somavara', deity: 'Lord Shiva (Someshwara)', rahu: '07:30 AM – 09:00 AM', yama: '10:30 AM – 12:00 PM', mantra: 'ॐ नमः शिवाय' },
  { day: 'Tuesday', vara: 'Mangalavara', deity: 'Lord Hanuman (Veer Bajrangbali)', rahu: '03:00 PM – 04:30 PM', yama: '09:00 AM – 10:30 AM', mantra: 'ॐ हं हनुमते नमः' },
  { day: 'Wednesday', vara: 'Budhavara', deity: 'Lord Ganesha (Vighnaharta)', rahu: '12:00 PM – 01:30 PM', yama: '07:30 AM – 09:00 AM', mantra: 'ॐ गं गणपतये नमः' },
  { day: 'Thursday', vara: 'Guruvara', deity: 'Lord Vishnu / Jagadguru', rahu: '01:30 PM – 03:00 PM', yama: '01:30 PM – 03:00 PM', mantra: 'ॐ नमो भगवते वासुदेवाय' },
  { day: 'Friday', vara: 'Shukravara', deity: 'Maa Durga & Mahalakshmi', rahu: '10:30 AM – 12:00 PM', yama: '03:00 PM – 04:30 PM', mantra: 'ॐ श्रीं महालक्ष्म्यै नमः' },
  { day: 'Saturday', vara: 'Shanivara', deity: 'Lord Venkateswara & Shani Dev', rahu: '09:00 AM – 10:30 AM', yama: '04:30 PM – 06:00 PM', mantra: 'ॐ शं शनैश्चराय नमः' }
];

function buildDynamicCaption(targetDateStr) {
  const d = new Date(targetDateStr + 'T06:00:00+05:30');
  const dayOfWeek = d.getDay();
  const cfg = WEEKDAY_DEITIES[dayOfWeek];

  return `🕉️ Divya Mangalam — Daily Vedic Calendar & Panchang
📅 ${targetDateStr} (${cfg.vara} / ${cfg.day})
Presiding Deity: ${cfg.deity}
Mantra: ${cfg.mantra}
✦ ──────────────────────── ✦
✨ SHUBH MUHURAT (AUSPICIOUS):
• Abhijit Muhurta: 11:45 AM – 12:35 PM (Ideal for new beginnings & worship)
• Brahma Muhurta: 04:36 AM – 05:24 AM (Sadhana & Meditation)
• Amrit Kaal: 08:15 AM – 09:45 AM

⚠️ ASHUBH KAAL (INAUSPICIOUS - AVOID NEW TASKS):
• Rahu Kaal: ${cfg.rahu} (Inauspicious window — avoid launching ventures)
• Yamagandam: ${cfg.yama} (Avoid new travel)
• Gulika Kalam: 12:00 PM – 01:30 PM

🔊 Audio: Pure Soothing Neural Voiceover (Zero Clashing Music for maximum clarity)

🌐 Free Vedic Tools, Kundli & Muhurats: divyamangalam.com
🔔 Follow @divyamangalam.info for your daily auspicious timings reel!

#DailyPanchang #VedicCalendar #ShubhMuhurat #RahuKaal #AbhijitMuhurta #SanatanaDharma #SpiritualReels #HinduPanchang #${cfg.day}Vibes`;
}

async function publishDynamicCalendarReel(dateStr, videoRawUrl, captionText = null) {
  if (!captionText) {
    captionText = buildDynamicCaption(dateStr);
  }

  console.log("==================================================");
  console.log(`🕉️ Publishing Daily Calendar Reel (${dateStr}) to Instagram...`);
  console.log("Video URL:", videoRawUrl);
  console.log("Caption Length:", captionText.length, "characters");
  console.log("==================================================");

  // Step 1: Create Reel Container via Instagram Graph API
  const createUrl = `https://graph.instagram.com/v20.0/me/media`;
  const postData = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoRawUrl,
    caption: captionText,
    share_to_feed: 'true',
    access_token: token
  }).toString();

  const initRes = await req(createUrl, 'POST', postData);
  console.log('1. Container creation response:', JSON.stringify(initRes));

  if (!initRes || !initRes.id) {
    console.error('Failed to create container:', initRes);
    return null;
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
      console.log('SUCCESS! Published Daily Calendar Reel Post ID:', pubRes.id);

      // Get permalink
      const permalinkUrl = `https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`;
      const finalRes = await req(permalinkUrl);
      console.log('LIVE REEL DETAILS:', JSON.stringify(finalRes));
      console.log('LIVE URL:', finalRes.permalink);
      return finalRes;
    }

    if (statusRes.status_code === 'ERROR') {
      console.error('Reel processing failed:', statusRes);
      return null;
    }
  }
}

module.exports = { publishDynamicCalendarReel, buildDynamicCaption };

if (require.main === module) {
  const targetDate = process.argv[2] || new Date().toISOString().split('T')[0];
  const videoUrl = `https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/daily_calendar_reel_today.mp4`;

  publishDynamicCalendarReel(targetDate, videoUrl).catch(console.error);
}
