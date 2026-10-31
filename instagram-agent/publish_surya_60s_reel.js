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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/surya_60s_reel.mp4';

const caption = `☀️ Divya Mangalam — Sacred Surya Narayana Darshan & 24h Cosmic Timings (Ravivara)
✦ ──────────────────────── ✦
🚩 Om Suryaya Namah • Om Ghrinih Suryaya Namah

Golden dawn unfolds as Bhagavan Surya Narayana rides His celestial chariot drawn by seven radiant horses. He is the cosmic source of vitality, health, and enlightenment.

✨ TODAY'S SACRED TIMINGS (Sunday, 1 Nov):
• Abhijit Muhurta: 11:45 AM – 12:35 PM (Most auspicious for starting new ventures)
• Rahu Kaal: 04:30 PM – 06:00 PM (Inauspicious window, observe tranquility & chant Gayatri)

🔊 Sacred Sound: 60-Second 432 Hz Solar Harmonic Resonance + Divine Voice Chanting
🤖 Script crafted with local open-source AI intelligence (Ollama LLaMA-3.2) & Divya Mangalam Engine

✦ ──────────────────────── ✦
🌿 Explore interactive 24-hour Vedic Clock & AI Kundli / Palmistry:
🔗 https://divyamangalam.com
Instagram: @divyamangalam.info

#LordSurya #SuryaNarayana #AdityaHridayaStotra #SundayBlessings #DivyaMangalam #VedicAstrology #Panchang #AbhijitMuhurta #RahuKaal #432Hz #SanatanaDharma #DailyReels #SpiritualReels`;

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
  console.log('1. Initiating 60-second Reel container on Instagram Graph API...');
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

  // Fetch permalink
  const postInfo = await req(`https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`);
  console.log('LIVE REEL DETAILS:', JSON.stringify(postInfo));
  console.log(`LIVE URL: ${postInfo.permalink}`);
}

run().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
