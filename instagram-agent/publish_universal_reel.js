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

async function publishReel({ videoUrl, caption, coverUrl = null }) {
  const stopFlag = path.join(__dirname, '../STOP_AUTOMATION');
  if (fs.existsSync(stopFlag)) {
    console.log('🛑 STOP_AUTOMATION flag active — Instagram Reel publishing is paused per user request.');
    return null;
  }

  if (!token) {
    console.error('❌ Error: META_ACCESS_TOKEN not found in environment or .env');
    return null;
  }

  console.log("==================================================");
  console.log("🕉️ DIVYA MANGALAM — UNIVERSAL REEL PUBLISHER");
  console.log("Video URL:      ", videoUrl);
  console.log("Caption Preview:", caption ? caption.substring(0, 100).replace(/\n/g, ' ') + '...' : '(none)');
  console.log("==================================================");

  // Step 1: Create Container
  const createUrl = `https://graph.instagram.com/v20.0/me/media`;
  const postParams = {
    media_type: 'REELS',
    video_url: videoUrl,
    caption: caption || 'Divya Mangalam — Daily Sacred Darshan & Panchang | divyamangalam.com',
    share_to_feed: 'true',
    access_token: token
  };
  if (coverUrl) {
    postParams.cover_url = coverUrl;
  }

  const postData = new URLSearchParams(postParams).toString();
  const initRes = await req(createUrl, 'POST', postData);
  console.log('1. Container creation response:', JSON.stringify(initRes));

  if (!initRes || !initRes.id) {
    console.error('❌ Failed to create Reel container:', initRes);
    return null;
  }

  const containerId = initRes.id;
  console.log(`2. Polling Reel encoding status (Container ID: ${containerId})...`);

  // Step 2: Poll status
  let attempts = 0;
  while (attempts < 35) {
    await new Promise(r => setTimeout(r, 6000));
    attempts++;
    const statusUrl = `https://graph.instagram.com/v20.0/${containerId}?fields=status_code&access_token=${token}`;
    const statusRes = await req(statusUrl);
    console.log(`[Poll ${attempts}/35] Status: ${statusRes.status_code || JSON.stringify(statusRes)}`);

    if (statusRes.status_code === 'FINISHED') {
      console.log('3. Publishing container to feed...');
      const publishUrl = `https://graph.instagram.com/v20.0/me/media_publish`;
      const pubData = new URLSearchParams({
        creation_id: containerId,
        access_token: token
      }).toString();
      const pubRes = await req(publishUrl, 'POST', pubData);
      console.log('✅ Reel published! Post ID:', pubRes.id);

      // Get permalink
      const permalinkUrl = `https://graph.instagram.com/v20.0/${pubRes.id}?fields=id,permalink,media_type,timestamp&access_token=${token}`;
      const finalRes = await req(permalinkUrl);
      console.log('🌟 Live URL:', finalRes.permalink || `https://www.instagram.com/reel/${pubRes.id}/`);

      // Update post_log.json
      const logPath = path.join(__dirname, 'post_log.json');
      let logs = [];
      try {
        if (fs.existsSync(logPath)) {
          logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
        }
      } catch (e) {}
      logs.push({
        id: pubRes.id,
        type: 'universal_reel',
        timestamp: new Date().toISOString(),
        permalink: finalRes.permalink || `https://www.instagram.com/reel/${pubRes.id}/`,
        video_url: videoUrl
      });
      try {
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2), 'utf8');
      } catch (e) {}

      return finalRes;
    }

    if (statusRes.status_code === 'ERROR') {
      console.error('❌ Reel processing failed:', statusRes);
      return null;
    }
  }

  console.error('❌ Timeout waiting for Reel processing');
  return null;
}

// CLI Execution
if (require.main === module) {
  const args = process.argv.slice(2);
  let videoUrl = null;
  let caption = null;
  let captionFile = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--video=')) videoUrl = args[i].substring(8);
    else if (args[i].startsWith('--video_url=')) videoUrl = args[i].substring(12);
    else if (args[i].startsWith('--caption=')) caption = args[i].substring(10);
    else if (args[i].startsWith('--caption_file=')) captionFile = args[i].substring(15);
    else if (!videoUrl && !args[i].startsWith('--')) videoUrl = args[i];
  }

  if (captionFile && fs.existsSync(captionFile)) {
    caption = fs.readFileSync(captionFile, 'utf8');
  }

  if (!videoUrl) {
    console.error('Usage: node publish_universal_reel.js --video=<raw_github_url> [--caption="..."] [--caption_file="path.txt"]');
    process.exit(1);
  }

  publishReel({ videoUrl, caption })
    .then(res => {
      if (!res) process.exit(1);
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { publishReel };
