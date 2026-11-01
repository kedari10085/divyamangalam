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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/divyamangalam_surya_blessing_viral.mp4';

const caption = `॥ ॐ सूर्याय नमः ॥
✦ ──────────────────────── ✦
आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम् ।
जयावहं जपेन्नित्यम् अक्षय्यं परमं शिवम् ॥

"The sacred Aditya Hridaya destroys all inner and outer impediments, brings eternal victory, and bestows supreme auspiciousness when remembered with devotion."

☀️ Significance:
Ravivara is consecrated to Lord Surya Narayana—the Pratyaksha Devata, the visible divine presence who sustains all prana (life force). Connecting with the Sun today removes lethargy, restores inner vitality, sharpens intellect, and invites radiance into our daily path. Reciting the Aditya Hridaya Stotram infuses the mind with unshakeable courage and spiritual triumph.

✨ Vedic Timing Guide for Today:
• Auspicious Surya Arghya: Morning sunrise window
• Abhijit Muhurta (Most Auspicious): 11:45 AM – 12:35 PM (Ideal for sacred prayers, japa, and beginning new tasks)
• Rahu Kaal (Caution Period): 04:30 PM – 06:00 PM (Refrain from major material beginnings; best suited for internal reflection and mantra remembrance)

✦ ──────────────────────── ✦
Invoke divine grace and explore sacred Vedic remedies, 24h clock & daily panchang at:
🔗 https://divyamangalam.com
Instagram: @divyamangalam.info • YouTube: @DivyaMangalam

#SuryaNarayana #AdityaHridayaStotram #Ravivara #OmSuryayaNamah #SuryaDev #VedicWisdom #SanatanaDharma #HinduDevotion #DailyPuja #AbhijitMuhurta #SpiritualAwakening #DivyaMangalam #DailyReels #SpiritualReels`;

function req(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const options = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method,
      headers: { 'User-Agent': 'DivyaMangalam/2.0' }
    };
    if (data) {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }
    const r = https.request(options, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => {
        try { resolve(JSON.parse(b)); } catch (e) { resolve(b); }
      });
    });
    r.on('error', reject);
    if (data) r.write(data);
    r.end();
  });
}

async function run() {
  console.log('1. Initiating Viral Reel container on Instagram Graph API...');
  const createData = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption,
    share_to_feed: 'true',
    access_token: token
  }).toString();

  const cRes = await req('https://graph.instagram.com/v20.0/me/media', 'POST', createData);
  console.log('Container creation response:', JSON.stringify(cRes));
  if (!cRes.id) {
    console.error('Failed to create container:', cRes);
    process.exit(1);
  }

  const containerId = cRes.id;
  console.log('2. Polling Reel encoding status for Container ID:', containerId);
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 6000));
    const sRes = await req(`https://graph.instagram.com/v20.0/${containerId}?fields=status_code,status&access_token=${token}`);
    console.log(`[Poll ${i + 1}] Status: ${sRes.status_code || sRes.status}`);
    if (sRes.status_code === 'FINISHED' || sRes.status === 'FINISHED') {
      ready = true;
      break;
    }
    if (sRes.status_code === 'ERROR' || sRes.status === 'ERROR') {
      console.error('Processing error from Meta:', sRes);
      process.exit(1);
    }
  }

  if (!ready) {
    console.error('Timeout waiting for container to be FINISHED');
    process.exit(1);
  }

  console.log('3. Publishing Reel container to feed...');
  const pubData = new URLSearchParams({
    creation_id: containerId,
    access_token: token
  }).toString();

  const pubRes = await req('https://graph.instagram.com/v20.0/me/media_publish', 'POST', pubData);
  console.log('SUCCESS! Published Reel Post ID:', pubRes.id);

  const postInfo = await req(`https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`);
  console.log('LIVE REEL DETAILS:', JSON.stringify(postInfo));
  console.log(`LIVE URL: ${postInfo.permalink}`);
}

run().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
