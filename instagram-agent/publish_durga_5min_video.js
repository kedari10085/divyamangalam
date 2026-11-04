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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/durga_aigiri_nandini_5min_instagram.mp4';

const caption = `🔱 अयि गिरिनन्दिनि (AIGIRI NANDINI) • 5-MINUTE SACRED EPIC 🚩
✦ ──────────────────────── ✦
Witness the cosmic dance and glorious triumph of Bhagavati Maa Durga in this 5-minute continuous cinematic journey, set to the thunderous rhythm of the Mahishasura Mardini Stotram!

॥ महिषासुरमर्दिनि स्तोत्रम् ॥
अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दसुते
गिरिवरविन्ध्यशिरोऽधिनिवासिनि विष्णुविलासिनि जिष्णुनुते ।
भगवति हे शितिकण्ठकुटुम्बिनि भूरिकुटुम्बिनि भूरिकृते
जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥ १ ॥

📖 8 CANONICAL STORY ACTS:
✦ 00:00 • 1. महिषासुर आतंक (Terror of Mahishasura)
✦ 00:40 • 2. देवानाम प्रार्थना (Devas Pray to Shiva, Vishnu & Brahma)
✦ 01:15 • 3. माँ दुर्गा प्राकट्य (Cosmic Emergence & Bestowal of Astras)
✦ 01:57 • 4. सिंहवाहिनी प्रयाण (Devi Charging on the Golden Lion)
✦ 02:35 • 5. महासंग्राम • रौद्र तांडव (The Fierce War Dance)
✦ 03:10 • 6. असुर सैन्य संहार (Cosmic Shockwave & Demon Horde Fall)
✦ 03:50 • 7. त्रिशूल प्रहार (Fatal Trishula Strike on Mahishasura)
✦ 04:22 • 8. धर्म विजय (Eternal Triumph of Dharma & Flower Shower)

🔥 100% Pure Sacred Hymn & High-Energy Song
🔥 Zero Voiceover • Pure Devotional Immersion
🔥 1080p Full HD Cinematic Experience

Chant with devotion:
॥ ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥ | Jai Mata Di 🔱

✦ ──────────────────────── ✦
🌐 Daily Vedic Panchang & Sanatana Wisdom: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine darshan & sacred reels!

#AigiriNandini #MaaDurga #MahishasuraMardini #DurgaPuja #Navratri #SanatanaDharma #DeviDurga #Bhakti #JaiMataDi #DivyaMangalam #Mahakali`;

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

async function publishDurgaVideo() {
  console.log("==================================================");
  console.log("🔱 Publishing Aigiri Nandini 5-Minute Epic Movie to Instagram...");
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
      console.log('SUCCESS! Published Aigiri Nandini Video Post ID:', pubRes.id);

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
  publishDurgaVideo().catch(console.error);
}

module.exports = { publishDurgaVideo };
