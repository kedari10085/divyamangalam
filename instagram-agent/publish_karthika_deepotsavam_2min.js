const https = require('https');
const path = require('path');
const fs = require('fs');

// Load .env cleanly
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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/shiva_karthika_deepotsavam_2min_instagram.mp4';

const caption = `🪔 KARTHIKA DEEPOTSAVAM • LORD SHIVA 2-MINUTE SACRED CINEMA 🔱
✦ ──────────────────────── ✦
Experience 2 minutes of luminous sacred Karthika Deepotsavam darshan dedicated to Bhagavan Shiva — from glowing Karthika ghee diyas ascending ancient temple steps, Kedarnath & Brihadisvara at dusk, and Bilva Archana at the Shiva Lingam, to Mahadeva on Mount Kailash and Maha Deeparadhana Harathi!

॥ ब्रह्ममुरारिसुरार्चितलिङ्गं निर्मलभासितशोभितलिङ्गम् ॥
॥ जन्मजदुःखविनाशकलिङ्गं तत्प्रणमामि सदाशिवलिङ्गम् ॥

🔊 Audio: Pure Sacred Sri Lingashtakam Chanting (Zero Narration Clash)
🎬 Format: Full Widescreen Cinema Masterpiece Framed for Reels

Chant with devotion:
ॐ नमः शिवाय (Om Namah Shivaya) • हर हर महादेव (Har Har Mahadev) 🔱
✦ ──────────────────────── ✦
🌐 Daily Vedic Panchang, Kundli & Muhurats: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine darshan!

#KarthikaDeepotsavam #KarthikaDeepam #LordShiva #Lingashtakam #KarthikaPournami #OmNamahShivaya #HarHarMahadev #Mahadev #Kedarnath #Brihadisvara #SanatanaDharma #DevotionalReels #DivyaMangalam`;

function req(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method,
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

async function publishKarthikaDeepotsavam() {
  if (!token) {
    console.error('❌ Error: META_ACCESS_TOKEN not found in environment or .env');
    process.exit(1);
  }

  console.log("==================================================");
  console.log("🪔 PUBLISHING KARTHIKA DEEPOTSAVAM 2-MIN REEL TO INSTAGRAM");
  console.log("Video URL:", videoUrl);
  console.log("==================================================");

  const createUrl = `https://graph.instagram.com/v20.0/me/media`;
  const postData = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    caption,
    share_to_feed: 'true',
    access_token: token
  }).toString();

  const initRes = await req(createUrl, 'POST', postData);
  console.log('1. Container creation response:', JSON.stringify(initRes));
  if (!initRes || !initRes.id) {
    console.error('❌ Container creation failed:', initRes);
    process.exit(1);
  }

  const containerId = initRes.id;
  for (let attempts = 1; attempts <= 45; attempts++) {
    await new Promise(r => setTimeout(r, 6000));
    const statusUrl = `https://graph.instagram.com/v20.0/${containerId}?fields=status_code,status,error_message&access_token=${token}`;
    const statusRes = await req(statusUrl);
    console.log(`[Poll ${attempts}/45] Status: ${statusRes.status_code || JSON.stringify(statusRes)}`);

    if (statusRes.status_code === 'FINISHED') {
      const pubUrl = `https://graph.instagram.com/v20.0/me/media_publish`;
      const pubData = new URLSearchParams({ creation_id: containerId, access_token: token }).toString();
      const pubRes = await req(pubUrl, 'POST', pubData);
      console.log('✅ Published Post ID:', pubRes.id);

      const permUrl = `https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`;
      const finalRes = await req(permUrl);
      console.log('LIVE URL:', finalRes.permalink);
      return finalRes;
    }

    if (statusRes.status_code === 'ERROR') {
      console.error('❌ Processing failed:', JSON.stringify(statusRes));
      process.exit(1);
    }
  }
  console.error('❌ Timed out polling container status');
  process.exit(1);
}

if (require.main === module) {
  publishKarthikaDeepotsavam().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { publishKarthikaDeepotsavam };
