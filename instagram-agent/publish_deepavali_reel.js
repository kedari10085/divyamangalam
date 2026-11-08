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
const videoUrl = 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/deepavali_wishes_instagram_reel.mp4';

const caption = `🪔 शुभ दीपावली • FESTIVAL OF LIGHTS SPECIAL REEL ✨
✦ ──────────────────────── ✦
दिव्य मंगलम परिवार की ओर से आप सभी को प्रकाश के महापर्व दीपावली की हार्दिक शुभकामनाएँ!

May the divine glow of millions of holy diyas illuminate your home and soul with eternal peace, profound prosperity, radiant health, and boundless spiritual bliss!

🌸 SACRED MANTRAS FOR DEEPAVALI:
॥ ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः ॥
॥ ॐ महालक्ष्म्यै च विद्महे विष्णुपत्नी च धीमहि तन्नो लक्ष्मीः प्रचोदयात् ॥

दीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः ।
दीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तु ते ॥

असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥
ॐ शान्तिः शान्तिः शान्तिः ॥

📖 4 SACRED CHAPTERS:
✦ 00:00 • 1. ॐ महालक्ष्म्यै नमः (Goddess Maha Lakshmi Lotus Darshan & Dhanalakshmi Grace)
✦ 00:16 • 2. दीपज्योतिः परब्रह्म (Auspicious Deepavali Maha Puja • Lord Ganesha & Lakshmi)
✦ 00:32 • 3. अयोध्या दीपोत्सव (Bhagwan Sri Rama's Return to Ayodhya & Illumination of Sarayu)
✦ 00:48 • 4. तमसो मा ज्योतिर्गमय (Victory of Divine Light Over Spiritual Darkness)

🛡️ Official Divya Mangalam Anti-Theft Watermark Embedded
🔔 Pure Devotional Carnatic Chanting & Vedic Blessings
✨ Happy Deepavali to you and your beloved family! 🪔
✦ ──────────────────────── ✦
🌐 Daily Vedic Panchang, AI Palmistry & Scriptures: divyamangalam.com
🔔 Follow @divyamangalam.info for daily divine blessings & sacred reels!

#Deepavali #Diwali #HappyDiwali #MahaLakshmi #GoddessLakshmi #LordGanesha #LordRama #Ayodhya #AyodhyaDeepotsav #Deepotsav #SanatanaDharma #DivyaMangalam #VedicAstrology #FestivalOfLights #DiwaliSpecial`;

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

async function publishDeepavaliReel() {
  console.log("==================================================");
  console.log("🪔 Publishing Shubh Deepavali Reel to Instagram...");
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
    console.error('❌ Failed to create media container:', initRes);
    process.exit(1);
  }

  const creationId = initRes.id;
  console.log(`Media Container Created: ${creationId}`);

  // Poll container status
  let ready = false;
  let attempts = 0;
  while (!ready && attempts < 40) {
    attempts++;
    console.log(`Checking upload status (attempt ${attempts}/40)...`);
    await new Promise(r => setTimeout(r, 6000));
    const statusUrl = `https://graph.instagram.com/v20.0/${creationId}?fields=status_code,status&access_token=${token}`;
    const statusRes = await req(statusUrl);
    console.log('Status:', JSON.stringify(statusRes));

    if (statusRes.status_code === 'FINISHED') {
      ready = true;
    } else if (statusRes.status_code === 'ERROR') {
      console.error('❌ Instagram video processing failed:', statusRes);
      process.exit(1);
    }
  }

  if (!ready) {
    console.error('❌ Timed out waiting for Instagram processing.');
    process.exit(1);
  }

  console.log('2. Publishing Reel container...');
  const publishUrl = `https://graph.instagram.com/v20.0/me/media_publish`;
  const publishData = new URLSearchParams({
    creation_id: creationId,
    access_token: token
  }).toString();

  const pubRes = await req(publishUrl, 'POST', publishData);
  console.log('Publish result:', JSON.stringify(pubRes));

  if (pubRes && pubRes.id) {
    console.log(`🎉 SUCCESS! Shubh Deepavali Reel published to Instagram with ID: ${pubRes.id}`);
    
    // Save to post_log.json
    const logPath = path.join(__dirname, 'post_log.json');
    const logEntry = {
      date: new Date().toISOString().split('T')[0],
      type: 'deepavali_special_reel',
      isCustom: true,
      imageUrl: 'https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/deepavali_maha_lakshmi.jpg',
      videoUrl: videoUrl,
      caption: caption,
      instagramPostId: pubRes.id,
      timestamp: new Date().toISOString()
    };
    fs.writeFileSync(logPath, JSON.stringify(logEntry, null, 2), 'utf8');
    console.log('Updated post_log.json successfully.');
  } else {
    console.error('❌ Failed to publish reel:', pubRes);
    process.exit(1);
  }
}

publishDeepavaliReel().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
