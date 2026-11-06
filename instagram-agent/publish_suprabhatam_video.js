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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/venkateswara_suprabhatam_5min_instagram.mp4';

const caption = `🕉️ श्री वेङ्कटेश्वर सुप्रभातम • 5-MINUTE SUPRABHATA SEVA 🚩
✦ ──────────────────────── ✦
Experience the holy morning Suprabhata Seva at Tirumala in this 5-minute continuous Full HD darshan of Lord Sri Venkateswara!

Featuring authentic darshan of Lord Balaji with diamond Kiritam, white-and-red Urdhva Pundra Namam, Goddess Vyuha Lakshmi on the sacred chest, and archakas performing Ksheera Seva, Tulasi Archana & the divine 27-flame Nakshatra Maha Harathi.

॥ श्री वेङ्कटेश्वर सुप्रभातम ॥
कौसल्या सुप्रजा राम पूर्वा सन्ध्या प्रवर्तते ।
उत्तिष्ठ नरशार्दूल कर्तव्यं दैवनिह्निकम् ॥ १ ॥

उत्तिष्ठोत्तिष्ठ गोविन्द उत्तिष्ठ गरुडध्वज ।
उत्तिष्ठ कमलाकान्त त्रैलोक्यं मङ्गलं कुरु ॥ २ ॥

श्रियः कान्ताय कल्याणनिधये निधयेऽर्थिनाम् ।
श्रीवेङ्कटनिवासाय श्रीनिवासाय मङ्गलम् ॥

📖 8 SACRED ACTS OF SUPRABHATA SEVA:
✦ 00:00 • 1. कौसल्या सुप्रजा राम (Brahma Muhurta Dawn over Seshachala Hills)
✦ 00:37 • 2. उत्तिष्ठोत्तिष्ठ गोविन्द (Procession into Sanctum Sanctorum)
✦ 01:15 • 3. मातस्समस्तजगतां (Lord Venkateswara Supreme Darshan)
✦ 01:52 • 4. तव सुप्रभातमरविन्दलोचने (Ksheera & Navanita Butter Seva)
✦ 02:30 • 5. पद्मापते स्तनतटी (Sacred Tulasi Archana & Sahasranama)
✦ 03:07 • 6. कौतुकेन कमला (Glorious 27-Flame Nakshatra Maha Harathi)
✦ 03:45 • 7. लक्ष्मीनिवास निलये (Goddess Vyuha Lakshmi & Abhaya Mudra)
✦ 04:22 • 8. श्रियः कान्ताय (Universal Mangalashasanam & Flower Shower)

🔔 100% Pure Sacred Hymn & Devotional Bells
🔔 Zero Narration • 100% Divine Immersion
🔔 1080p Full HD Landscape Darshan

Govinda Govinda! Venkataramana Govinda! 🚩
✦ ──────────────────────── ✦
🌐 Daily Vedic Panchang & Sacred Wisdom: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine darshan & sacred reels!

#VenkateswaraSuprabhatam #TirumalaDarshan #LordVenkateswara #LordBalaji #SuprabhataSeva #Tirupati #Govinda #Srinivasa #SanatanaDharma #MahaHarathi #TulasiArchana #DivyaMangalam`;

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

async function publishSuprabhatamVideo() {
  console.log("==================================================");
  console.log("🕉️ Publishing Venkateswara Suprabhatam 5-Min Movie to Instagram...");
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
      console.log('SUCCESS! Published Venkateswara Suprabhatam Video Post ID:', pubRes.id);

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
  publishSuprabhatamVideo().catch(console.error);
}

module.exports = { publishSuprabhatamVideo };
