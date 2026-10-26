const https = require('https');
const path = require('path');
const fs = require('fs');

// Load .env manually
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
const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/shiva_darshan.mp4';

const caption = `🕉️ Divya Mangalam — Monday Somavara Devotional Darshan
✦ ─────────────── ✦
🔱 Mahadeva • Lord Shiva Meditation on Mount Kailash

✨ SACRED MANTRA:
ॐ नमः शिवाय
(Om Namah Shivaya)
“Salutations to the auspicious one, the supreme stillness within.”

✦ ─────────────── ✦
🧘 Experience 432 Hz healing vibrations, daily panchang & AI palm reading:
🔗 https://divyamangalam.com
Instagram: @divyamangalam.info

#LordShiva #OmNamahShivaya #Somavara #Mahadeva #Kailash #DivyaMangalam #VedicMantras #432Hz #SanatanaDharma #DailyReels #SpiritualReels`;

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
  console.log('1. Creating Reel container on Instagram Graph API...');
  const createData = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption,
    share_to_feed: 'true',
    access_token: token
  }).toString();

  const cRes = await req('https://graph.instagram.com/v20.0/me/media', 'POST', createData);
  console.log('Container creation response:', cRes);
  if (!cRes.id) {
    console.error('Failed to create container');
    return;
  }

  const containerId = cRes.id;
  console.log('2. Polling Reel status for ID:', containerId);
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const sRes = await req(`https://graph.instagram.com/v20.0/${containerId}?fields=status_code&access_token=${token}`);
    console.log(`[Poll ${i + 1}] Status:`, sRes.status_code);
    if (sRes.status_code === 'FINISHED') break;
    if (sRes.status_code === 'ERROR') {
      console.error('Processing error:', sRes);
      return;
    }
  }

  console.log('3. Publishing Reel container...');
  const pubData = new URLSearchParams({
    creation_id: containerId,
    access_token: token
  }).toString();

  const pubRes = await req('https://graph.instagram.com/v20.0/me/media_publish', 'POST', pubData);
  console.log('SUCCESS! Published Reel Post ID:', pubRes.id);
  console.log('Direct Reel URL will be available at: https://www.instagram.com/divyamangalam.info/');
}

run().catch(console.error);
