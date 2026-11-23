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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/shiva_kartika_pournami_5min_instagram.mp4';

const caption = `🔱 BHAGAVAN SHIVA • KARTHIKA POURNAMI MAHA TANDAVA (5-MIN SPECIAL) 🔱
✦ ──────────────────────── ✦
Experience 5 minutes of continuous, non-repeating realistic humanoid motion of Lord Shiva performing the eternal Ananda Tandava on Mount Kailash for Karthika Pournami Deepotsavam.

With every beat of His sacred Damru, fear, ignorance, and darkness dissolve into supreme cosmic peace.

॥ श्री शिव ताण्डव स्तोत्रम् ॥
जटाटवीगलज्जलप्रवाहपावितस्थले
गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।
डमड्डमड्डमड्डमन्निनादवड्डमर्वयं
चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥

🔥 100% Pure Sacred Chanting & High-Vibrational Damru Beat
🔥 Zero Voiceover • Complete Spiritual Immersion
🔥 100% Non-Repeating Realistic Humanoid Motion

Chant with devotion:
ॐ नमः शिवाय (Om Namah Shivaya) | Har Har Mahadev 🔱

✦ ──────────────────────── ✦
🌐 Daily Vedic Panchang & Sanatana Wisdom: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine darshan & spiritual releases.

#LordShiva #ShivaTandava #KarthikaPournami #Mahadev #OmNamahShivaya #HarHarMahadev #Kailash #DivyaMangalam #SanatanaDharma #ShivaMeditation #DevotionalReels`;

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

async function publishShiva5Min() {
  if (!token) {
    console.error('❌ Error: META_ACCESS_TOKEN not found in environment or .env');
    return null;
  }

  console.log("==================================================");
  console.log("🔱 PUBLISHING 5-MINUTE SHIVA KARTIKA POURNAMI VIDEO TO INSTAGRAM");
  console.log("Video URL:", videoUrl);
  console.log("==================================================");

  // Step 1: Create Reel / Video Container
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
    return null;
  }

  const containerId = initRes.id;
  console.log(`2. Polling Reel encoding status (Container ID: ${containerId})...`);

  // Step 2: Poll status
  let attempts = 0;
  while (attempts < 60) {
    await new Promise(r => setTimeout(r, 6000));
    attempts++;
    const statusUrl = `https://graph.instagram.com/v20.0/${containerId}?fields=status_code&access_token=${token}`;
    const statusRes = await req(statusUrl);
    console.log(`[Poll ${attempts}/60] Status: ${statusRes.status_code || JSON.stringify(statusRes)}`);

    if (statusRes.status_code === 'FINISHED') {
      console.log('3. Publishing Reel container to feed...');
      const publishUrl = `https://graph.instagram.com/v20.0/me/media_publish`;
      const pubData = new URLSearchParams({
        creation_id: containerId,
        access_token: token
      }).toString();
      const pubRes = await req(publishUrl, 'POST', pubData);
      console.log('SUCCESS! Published 5-Minute Shiva Video Post ID:', pubRes.id);

      const permalinkUrl = `https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`;
      const finalRes = await req(permalinkUrl);
      console.log('LIVE URL:', finalRes.permalink);
      return finalRes;
    }

    if (statusRes.status_code === 'ERROR') {
      console.error('Reel processing failed:', statusRes);
      return null;
    }
  }
}

if (require.main === module) {
  publishShiva5Min().catch(console.error);
}

module.exports = { publishShiva5Min };
