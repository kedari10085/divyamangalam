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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/ramayana_5min_full_epic.mp4';

const caption = `🏹 सम्पूर्ण रामायण (SAMPOORNA RAMAYAN) IN 5 CELESTIAL MINUTES 🚩
✦ ──────────────────────── ✦
Witness the sacred eternal journey of Maryada Purushottam Bhagavan Sri Rama—from His divine descent in Ayodhya to the glorious victory over Ravana and the coronation of Ram Rajya.

॥ मङ्गल भवन अमङ्गल हारी ॥
मङ्गल भवन अमङ्गल हारी ।
द्रवहु सुदसरथ अजिर बिहारी ॥
दीन दयाल विरदु संभारी ।
हरहु नाथ मम संकट भारी ॥

📖 THE 7 SACRED KANDAS:
✦ बालकाण्ड (Bala Kanda): Avatar descent, Vishvamitra Yagna, breaking of Shiva Pinaka bow & Sita Kalyanam.
✦ अयोध्याकाण्ड (Ayodhya Kanda): Dasharatha's word, Kaikeyi's boons, Lord Rama accepting 14-year Vanavasa with tranquil grace.
✦ अरण्यकाण्ड (Aranya Kanda): Panchavati hermitage, golden deer Maricha, Sita Harana & noble sacrifice of Bird King Jatayu.
✦ किष्किन्धाकाण्ड (Kishkindha Kanda): Divine union with Lord Hanuman & sacred alliance with Sugriva.
✦ सुन्दरकाण्ड (Sundara Kanda): Mahabali Hanuman's ocean leap, Ashoka Vatika darshan & Lanka Dahan.
✦ युद्धकाण्ड (Yuddha Kanda): Miracle of floating Rama Setu, fierce battle of Lanka, fall of Kumbhakarna & slaying of 10-headed Ravana.
✦ उत्तरकाण्ड (Uttara Kanda): Return in Pushpaka Vimana & glorious Sri Rama Pattabhishekam!

🔥 100% Pure Sacred Ramayana Hymn • Full HD Portrait Video
🔥 Zero Voiceover • Pure Devotional Bliss

Chant with heart and soul:
॥ जय सिया राम ॥ | ॥ ॐ रां रामाय नमः ॥ | Jai Shri Ram 🏹

✦ ──────────────────────── ✦
🌐 Daily Vedic Panchang & Sanatana Wisdom: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine darshan & spiritual reels.

#Ramayana #ShriRam #Ayodhya #MangalBhavan #SampoornaRamayan #RamRajya #LordRama #SitaRam #Hanuman #SanatanaDharma #VedicAstrology #DivyaMangalam #Bhakti #JaiShriRam #AyodhyaRamMandir`;

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

async function publishRamayana5MinVideo() {
  console.log("==================================================");
  console.log("🏹 Publishing 5-Minute Full Ramayanam Video to Instagram...");
  console.log("Video URL:", videoUrl);
  console.log("==================================================");

  // Step 1: Create Reel/Video Container via Instagram Graph API
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

  // Step 2: Poll status (longer timeout for 5-min video)
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
      console.log('SUCCESS! Published 5-Minute Ramayana Video Post ID:', pubRes.id);

      // Get permalink
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
  publishRamayana5MinVideo().catch(console.error);
}

module.exports = { publishRamayana5MinVideo };
