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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/hanuman_human_dance_reel.mp4';

const caption = `🔥 LORD HANUMAN • VEER BAJRANGBALI (THE DIVINE PROTECTOR) 🔥
✦ ──────────────────────── ✦
Witness the supreme cosmic form of Pavanasuta Hanuman—embodiment of unyielding devotion, infinite strength, and boundless courage.

Rising amidst the sacred peaks with His golden Gada, Bajrangbali dispels every fear, destroys malevolent forces, and dissolves all planetary afflictions (Mangal & Shani Dosha).

॥ श्री हनुमान चालीसा ॥
अतुलितबलधामं हेमशैलाभदेहं
दनुजवनकृशानुं ज्ञानिनामग्रगण्यम् ।
सकलगुणनिधानं वानराणामधीशं
रघुपतिप्रियभक्तं वातजातं नमामि ॥

🔥 100% Pure Sacred Hanuman Tandav Trance
🔥 Zero Voiceover • Pure Spiritual Immersion
🔥 Real 3D Humanoid Motion & Divine Radiance

Chant with devotion:
॥ ॐ हं हनुमते नमः ॥ | Jai Bajrangbali 🚩 | Jai Shri Ram 🏹

✦ ──────────────────────── ✦
🌐 Daily Vedic Panchang & Sanatana Wisdom: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine darshan & reels.

#LordHanuman #HanumanTandav #Bajrangbali #Mangalavara #TuesdayDevotion #SanatanaDharma #DevotionalReels #VedicWisdom #JaiShriRam #OmHanumateNamah #SankatMochan #Maruti #Bhakti`;

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

async function publishHanumanDanceReel() {
  console.log("==================================================");
  console.log("🔥 Publishing Lord Hanuman Humanoid Dance Reel to Instagram...");
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
      console.log('SUCCESS! Published Lord Hanuman Dance Reel Post ID:', pubRes.id);

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

publishHanumanDanceReel().catch(console.error);
