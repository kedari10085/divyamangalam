/**
 * Divya Mangalam — Real Waitlist API Handler
 * Endpoint: POST /api/waitlist
 */

const fs = require('fs');
const path = require('path');

// In-memory fallback
const inMemoryWaitlist = [];

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  const name = (body?.name || '').trim();
  const email = (body?.email || '').trim().toLowerCase();
  const interest = (body?.interest || 'General').trim();

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const record = {
    name: name || 'Seeker',
    email,
    interest,
    createdAt: new Date().toISOString()
  };

  inMemoryWaitlist.push(record);

  // Attempt to persist to data/waitlist.json if filesystem permits
  try {
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, 'waitlist.json');
    let existing = [];
    if (fs.existsSync(filePath)) {
      try { existing = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch(e) {}
    }
    existing.push(record);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
  } catch (fsErr) {
    // Read-only serverless environment fallback
    console.log('Saved waitlist to memory:', record.email);
  }

  return res.status(200).json({
    success: true,
    message: "Thanks, you're on the waitlist."
  });
};
