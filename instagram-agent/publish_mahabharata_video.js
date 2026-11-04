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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/mahabharata_part1_adi_parva_action_multilang_1080p.mp4';

const caption = `🏹 శ్రీమన్మహాభారతమ్ (SRIMAD MAHABHARATA) • PART 1: ADI PARVA (ఆది పర్వము) 🕉️
✦ ──────────────────────── ✦
Witness the eternal epic of Veda Vyasa come alive with real humanoid action and multi-language sacred narration!

नारायणं नमस्कृत्य नरं चैव नरोत्तमम् ।
देवीं सरस्वतीं व्यासं ततो जयमुदीरयेत् ॥

📖 6 CANONICAL CHAPTERS OF ADI PARVA:
✦ 00:00 • Chapter 1: The Divine Beginning & Maharshi Vyasa (అనుక్రమణికా పర్వము)
✦ 00:30 • Chapter 2: Bhishma Pitamaha's Terrible Vow of Celibacy (భీష్మ ప్రతిజ్ఞ)
✦ 01:00 • Chapter 3: Guru Dronacharya & Arjuna's Single-Pointed Focus (ద్రోణ శిక్షణ)
✦ 01:28 • Chapter 4: The Burning House of Lac & Bhima's Heroic Escape (లక్కఇంటి దహనం)
✦ 01:58 • Chapter 5: Draupadi Swayamvara & Matsya Yantra Piercing (మత్స్యయంత్ర ఛేదన)
✦ 02:28 • Chapter 6: Indraprastha Sovereign Glory & The Divine Gandiva Bow (ఖాండవ వనం)

🔥 Full 1080p Cinematic Film
🔥 Multi-Language Audio: Telugu (తెలుగు) • Hindi (हिन्दी) • English (Original)
🔥 Interactive Cinema Theater Live at divyamangalam.com/mahabharata.html

Chant with devotion:
॥ यतो धर्मस्ततो जयः ॥ | Where there is Dharma, there is Victory! 🏹

✦ ──────────────────────── ✦
🌐 Explore All 18 Canonical Parvas: https://divyamangalam.com/mahabharata.html
🔔 Follow @divyamangalam.info for daily Vedic wisdom & divine epics!

#Mahabharata #AdiParva #MahabharatInTelugu #MahabharatInHindi #Arjuna #Bhishma #LordKrishna #Draupadi #Indraprastha #VedaVyasa #SanatanaDharma #DivyaMangalam #Bhakti #EpicMahabharata`;

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

async function publishMahabharataVideo() {
  console.log("==================================================");
  console.log("🏹 Publishing Srimad Mahabharata Part 1 to Instagram...");
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
      console.log('SUCCESS! Published Mahabharata Video Post ID:', pubRes.id);

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
  publishMahabharataVideo().catch(console.error);
}

module.exports = { publishMahabharataVideo };
