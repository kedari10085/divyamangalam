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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/ayyappa_swamiye_saranam_5min_instagram.mp4';

const caption = `🕉️ स्वामिये शरणम् अय्यप्पा • 5-MINUTE SACRED EPIC 🚩
✦ ──────────────────────── ✦
Experience the holy pilgrimage and divine grace of Lord Sri Ayyappa Swami (Dharma Sastha) in this 5-minute continuous Full HD master movie!

Set to the authentic, revered devotional song 'Swamiye Saranam Ayyappa / Pallikattu Sabarimalaikku' by K. Veeramani, with classical oil painting human-form aesthetics:
Featuring Lord Ayyappa with his divine brother Lord Murugan (Kartikeya), Prince Manikandan riding the Royal Tigress (Pulivahanam), the slaying of demoness Mahishi, pilgrims carrying sacred Irumudi through misty forests, the ascent of the 18 Golden Steps (Pathinettampadi), the supreme Chin-Mudra darshan, and the celestial Makara Jyothi!

॥ स्वामिये शरणम् अय्यप्पा ॥
पल्लिकट्टु शबरिमलैक्कु कल्लुम् मुल्लुम् कालिर्कु मेत्तै
स्वामिये अय्यप्पो ! अय्यप्पो स्वामिये !
हरिवरासनम् विश्वमोहनम् हरिदधीश्वरम् आराध्यपादुकम्
अरीविमर्दनम् नित्यनर्तनम् हरिवरासनम् शरणमस्तु ते ॥

📖 8 SACRED ACTS OF AYYAPPA SWAMI:
✦ 00:00 • 1. ॐ श्री हरिहरपुत्राय नमः (Celestial Union of Lord Ayyappa & Lord Murugan)
✦ 00:37 • 2. पुलिवाहन महाप्रभो (Prince Manikandan Riding the Royal Tigress)
✦ 01:15 • 3. महिषीमर्दन वरद (Slaying of Demoness Mahishi on River Azhutha)
✦ 01:52 • 4. स्वामिये शरणम् अय्यप्पा (Pilgrims Carrying Sacred Irumudi through Forest)
✦ 02:30 • 5. पम्पातीर विहारिणे (Infant Manikandan Discovered at River Pampa)
✦ 03:07 • 6. अष्टादश सुवर्ण सोपानम् (Ascent of the 18 Sacred Golden Steps)
✦ 03:45 • 7. ॐ स्वामी शरणम् (Supreme Darshan of Lord Ayyappa in Sacred Chin-Mudra)
✦ 04:22 • 8. मकरविलक्कु • हरिवरासनम् (Sacred Makara Jyothi & Harivarasanam)

🛡️ Official Divya Mangalam Watermark Embedded
🔔 100% Pure Authentic Devotional Music
🔔 Full HD 1080p Landscape Darshan

Swami Saranam! Ayyappa Saranam! 🚩
✦ ──────────────────────── ✦
🌐 Daily Vedic Panchang & Sanatana Wisdom: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine darshan & sacred reels!

#SwamiyeSaranamAyyappa #AyyappaSwamy #Sabarimala #LordAyyappa #LordMurugan #Murugan #Harivarasanam #Pallikattu #Pathinettampadi #MakaraJyothi #SanatanaDharma #DivyaMangalam`;

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

async function publishAyyappaVideo() {
  console.log("==================================================");
  console.log("🕉️ Publishing Swamiye Saranam Ayyappa 5-Min Movie to Instagram...");
  console.log("Video URL:", videoUrl);
  console.log("==================================================");

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
  console.log(`2. Polling video encoding status for Container ID: ${containerId}`);

  let attempts = 0;
  while (attempts < 60) {
    await new Promise(r => setTimeout(r, 8000));
    attempts++;
    const statusUrl = `https://graph.instagram.com/v20.0/${containerId}?fields=status_code&access_token=${token}`;
    const statusRes = await req(statusUrl);
    console.log(`[Poll ${attempts}] Status: ${statusRes.status_code || JSON.stringify(statusRes)}`);

    if (statusRes.status_code === 'FINISHED') {
      console.log('3. Publishing video container to feed...');
      const publishUrl = `https://graph.instagram.com/v20.0/me/media_publish`;
      const pubData = new URLSearchParams({
        creation_id: containerId,
        access_token: token
      }).toString();
      const pubRes = await req(publishUrl, 'POST', pubData);
      console.log('SUCCESS! Published Swamiye Saranam Ayyappa Video Post ID:', pubRes.id);

      const permalinkUrl = `https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`;
      const finalRes = await req(permalinkUrl);
      console.log('LIVE DETAILS:', JSON.stringify(finalRes));
      console.log('LIVE URL:', finalRes.permalink);
      return finalRes;
    }

    if (statusRes.status_code === 'ERROR') {
      console.error('Video processing failed:', statusRes);
      return;
    }
  }
}

if (require.main === module) {
  publishAyyappaVideo().catch(console.error);
}

module.exports = { publishAyyappaVideo };
