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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/shiva_tandava_dance_shorts.mp4';

const caption = `🔱 LORD SHIVA • ANANDA TANDAVA (DIVINE COSMIC DANCE) 🔱
✦ ──────────────────────── ✦
On this auspicious Somavara (Monday), immerse your soul in the supreme cosmic vibration of Mahadeva's Ananda Tandava.

The eternal cosmic rhythm of Bhagavan Shiva dispels negativity, ignorance, and fear, awakening inner strength, stillness, and supreme consciousness.

॥ श्री शिव ताण्डव स्तोत्रम् ॥
जटाटवीगलज्जलप्रवाहपावितस्थले
गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।
डमड्डमड्डमड्डमन्निनादवड्डमर्वयं
चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥

✨ 100% Pure Sacred Chanting & Damru Rhythm (No Voiceover)
✨ High-Vibrational Meditation & Cosmic Energy

Chant with devotion:
ॐ नमः शिवाय (Om Namah Shivaya) | Har Har Mahadev 🔱

✦ ──────────────────────── ✦
🌐 Daily Vedic Wisdom & Panchang: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine blessings.

#LordShiva #ShivaTandava #Mahadev #OmNamahShivaya #Somavara #CosmicDance #ShivaStotram #SanatanaDharma #HarHarMahadev #Bholenath #DivineVibrations #SpiritualReels`;

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

async function publishShivaDanceReel() {
  console.log("==================================================");
  console.log("🕉️ Publishing Lord Shiva Dance Reel to Instagram...");
  console.log("Video URL:", videoUrl);
  console.log("==================================================");

  // Step 1: Create Reel Container via Instagram Graph API
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
      console.log('SUCCESS! Published Shiva Dance Reel Post ID:', pubRes.id);

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

publishShivaDanceReel().catch(console.error);
