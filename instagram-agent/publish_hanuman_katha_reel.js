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

async function publishKathaReel() {
  const videoRawUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/hanuman_katha_reel_today.mp4';
  
  const caption = `🕉️ Divya Mangalam — Midday Devotional Katha & Vedic Wisdom
✦ ──────────────────────── ✦
🔥 Why is Lord Hanuman Worshipped on Tuesday (Mangalavara)?
🔱 Lord Hanuman • Mangala Graha (Mars) • The Secret of Fearlessness

In ancient Vedic astrology and sacred shastras, Tuesday is governed by Mangala (Mars) — the fiery planet of courage, warrior force, and vitality.
When fiery planetary forces cause inner restlessness, anger, debts, or obstacles, only Lord Hanuman’s boundless humility and devotion can transform raw force into divine protection.

📜 SACRED TUESDAY REMEDY:
• Chant the holy Hanuman Chalisa to dissolve all fears and negative energies.
• Meditate on Veer Bajrangbali and chant:
॥ ॐ हं हनुमते नमः ॥ (Om Ham Hanumate Namah)
• Surrender worries at the lotus feet of Maruti Nandan.

May Lord Hanuman bless your home with fearless strength, radiant vitality, and peace.

🌐 Free Vedic Kundli, Dosha Check & Muhurats: divyamangalam.com
🔔 Follow @divyamangalam.info for daily Vedic wisdom & timing reels!

#HanumanJi #Bajrangbali #HanumanChalisa #TuesdayVibes #Mangalavara #VedicWisdom #SanatanaDharma #SpiritualReels #HinduMythology #DivyaMangalam #HanumanKatha #Bhakti`;

  console.log("==================================================");
  console.log("🕉️ Publishing 1:00 PM Midday Hanuman Katha Reel to Instagram...");
  console.log("Video URL:", videoRawUrl);
  console.log("==================================================");

  // Step 1: Create Reel Container
  const createUrl = `https://graph.instagram.com/v20.0/me/media`;
  const postData = new URLSearchParams({
    media_type: 'REELS',
    video_url: videoRawUrl,
    caption: caption,
    share_to_feed: 'true',
    access_token: token
  }).toString();

  const initRes = await req(createUrl, 'POST', postData);
  console.log('1. Container creation response:', JSON.stringify(initRes));

  if (!initRes || !initRes.id) {
    console.error('Failed to create container:', initRes);
    return null;
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
      console.log('SUCCESS! Published 1:00 PM Katha Reel Post ID:', pubRes.id);

      // Get permalink
      const permalinkUrl = `https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`;
      const finalRes = await req(permalinkUrl);
      console.log('LIVE REEL DETAILS:', JSON.stringify(finalRes));
      console.log('LIVE URL:', finalRes.permalink);
      return finalRes;
    }

    if (statusRes.status_code === 'ERROR') {
      console.error('Reel processing failed:', statusRes);
      return null;
    }
  }
}

if (require.main === module) {
  publishKathaReel().catch(console.error);
}

module.exports = { publishKathaReel };
