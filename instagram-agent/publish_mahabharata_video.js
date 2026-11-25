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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/mahabharata_adi_parva_ep1_instagram.mp4';

const caption = `🏹 శ్రీమన్మహాభారతమ్ (SRIMAD MAHABHARATA) • PART 1: ADI PARVA (ఆది పర్వము) 🕉️
✦ ──────────────────────── ✦
Witness the eternal epic of Maharshi Veda Vyasa in full luminous cinema — preserved in complete 16:9 widescreen framing inside a sacred gold theater frame with synchronized narration & orchestral flute score!

नारायणं नमस्कृत्य नरं चैव नरोत्तमम् ।
देवीं सरस्वतीं व्यासं ततो जयमुदीरयेत् ॥

📖 6 CANONICAL CHAPTERS OF ADI PARVA:
✦ 00:00 • Chapter 1: The Divine Origin & Maharshi Vyasa (आदि पर्व आरम्भ)
✦ 00:31 • Chapter 2: Bhishma Pitamaha's Immortal Vow on River Ganga (भीष्म प्रतिज्ञा)
✦ 01:03 • Chapter 3: Guru Dronacharya & Arjuna's Unrivaled Focus (गुरु द्रोण • अर्जुन)
✦ 01:34 • Chapter 4: Conspiracy of Lakshagriha & Bhima's Heroic Escape (लाक्षागृह दाह)
✦ 02:06 • Chapter 5: Draupadi Swayamvara & Matsya Yantra Piercing (द्रौपदी स्वयंवर)
✦ 02:37 • Chapter 6: Sri Krishna, Celestial Gandiva Bow & Indraprastha Glory (गाण्डीव • इन्द्रप्रस्थ)

🔥 Full HD Sacred Cinema (Devanagari Gold Cards + Optical Fire & Lotus Petals)
🔥 Interactive Epic Reader & 18 Canonical Parvas: divyamangalam.com/mahabharata.html

Chant with devotion:
॥ यतो धर्मस्ततो जयः ॥ | Where there is Dharma, there is Victory!

✦ ──────────────────────── ✦
🌐 Explore All 18 Canonical Parvas: https://divyamangalam.com/mahabharata.html
🔔 Follow @divyamangalam.info for daily Vedic wisdom & sacred epics!

#Mahabharata #AdiParva #SrimadMahabharata #Arjuna #Bhishma #LordKrishna #Draupadi #Indraprastha #VedaVyasa #SanatanaDharma #DivyaMangalam #Bhakti #EpicMahabharata`;

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
    const statusUrl = `https://graph.instagram.com/v20.0/${containerId}?fields=status_code,status,error_message&access_token=${token}`;
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
