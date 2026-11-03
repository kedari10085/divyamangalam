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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/krishna_human_dance_reel.mp4';

const caption = `🪈 BHAGAVAN SRI KRISHNA • VRINDAVAN DIVINE DANCE & SACRED FLUTE 🦚
✦ ──────────────────────── ✦
Step into the celestial groves of Vrindavan as Bhagavan Sri Krishna raises His golden bansuri, filling the universe with divine harmony and cosmic love.

Witness Shri Radha Rani dancing gracefully on the sacred banks of the Yamuna River, surrounded by peacocks, cows, lotuses, and celestial rain of flowers.

॥ श्री मधुराष्टकम् ॥
अधरं मधुरं वदनं मधुरं नयनं मधुरं हसितं मधुरम् ।
हृदयं मधुरं गमनं मधुरं मधुराधिपतेरखिलं मधुरम् ॥ १ ॥
वचनं मधुरं चरितं मधुरं वसनं मधुरं वलितं मधुरम् ।
चलितं मधुरं भ्रमितं मधुरं मधुराधिपतेरखिलं मधुरम् ॥ २ ॥

✨ 100% Pure Sacred Bansuri Flute Melody
✨ Real 3D Humanoid Motion & Graceful Dance
✨ Zero Voiceover • Pure Devotional Immersion

Chant with love:
॥ ॐ नमो भगवते वासुदेवाय ॥ | Radhe Radhe 🦚 | Jai Shri Krishna 🪈

✦ ──────────────────────── ✦
🌐 Daily Vedic Panchang & Sanatana Wisdom: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine darshan & reels.

#LordKrishna #RadhaKrishna #Vrindavan #RaasLeela #Bansuri #Madhurashtakam #SanatanaDharma #DevotionalReels #VedicWisdom #JaiShriKrishna #RadheRadhe #Bhakti #DivineDance`;

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

async function publishKrishnaDanceReel() {
  console.log("==================================================");
  console.log("🪈 Publishing Lord Krishna Divine Dance Reel to Instagram...");
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
      console.log('SUCCESS! Published Lord Krishna Dance Reel Post ID:', pubRes.id);

      // Get permalink
      const permalinkUrl = `https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`;
      const finalRes = await req(permalinkUrl);
      console.log('LIVE REEL DETAILS:', JSON.stringify(finalRes));
      console.log('LIVE URL:', finalRes.permalink);
      return finalRes;
    }

    if (statusRes.status_code === 'ERROR') {
      console.error('Reel processing failed:', statusRes);
      return;
    }
  }
}

publishKrishnaDanceReel().catch(console.error);
