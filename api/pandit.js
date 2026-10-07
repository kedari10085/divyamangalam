/**
 * Divya Mangalam — Secure Claude AI Pandit Backend
 * Endpoints: POST /api/pandit
 *
 * Implements:
 *  - Anthropic Messages API integration (Call 1 Drafter + Call 2 Verifier)
 *  - Strict server-side rate limiting per IP
 *  - Max input length verification
 *  - In-memory retrieval from canonical Shastric corpus
 *  - Exact substring validation for cited shlokas and verses
 */

const { retrievePassages } = require('./corpus');

// Environment Configuration (never exposed to client)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const MODEL_NAME = process.env.MODEL || 'claude-sonnet-5-5';

// Rate Limiter: Max 10 queries per minute per IP
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;
const MAX_INPUT_LENGTH = 500;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || [];
  const validTimestamps = record.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }
  
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// Clean old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) rateLimitMap.delete(ip);
    else rateLimitMap.set(ip, valid);
  }
}, 5 * 60 * 1000).unref?.();

/**
 * Call Anthropic Messages API
 */
async function callClaude({ system, messages, maxTokens = 1200 }) {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not set');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      max_tokens: maxTokens,
      system,
      messages
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || '';
  return text;
}

/**
 * Serverless Handler
 */
module.exports = async function handler(req, res) {
  // CORS & Methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Extract client IP
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : (req.socket?.remoteAddress || '127.0.0.1');

  // 1. Rate Limiting Check
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a moment before submitting another inquiry.'
    });
  }

  // Parse Body
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const question = (body?.question || '').trim();

  // 2. Input Length Check
  if (!question || question.length === 0) {
    return res.status(400).json({ error: 'Question is required.' });
  }
  if (question.length > MAX_INPUT_LENGTH) {
    return res.status(400).json({
      error: `Question exceeds maximum length of ${MAX_INPUT_LENGTH} characters.`
    });
  }

  // 3. Retrieval Step
  const retrievedPassages = retrievePassages(question, 4);

  // If Anthropic API key is not yet set in environment, return graceful explanatory response
  if (!ANTHROPIC_API_KEY) {
    // Ground answer using purely retrieved passages without unverified synthesis
    if (retrievedPassages.length > 0) {
      const topPassage = retrievedPassages[0];
      return res.status(200).json({
        answer: `[Note: Server environment ANTHROPIC_API_KEY is not configured yet. Showing top matching canonical passage from local shastra corpus]:\n\n${topPassage.text}`,
        citations: [{
          passage_id: topPassage.id,
          source: topPassage.source,
          chapter: topPassage.chapter,
          quote: topPassage.text.split('\n')[0]
        }],
        verified: true,
        model: MODEL_NAME,
        configured: false
      });
    } else {
      return res.status(200).json({
        answer: "I could not find a source for this in the classical texts.",
        citations: [],
        verified: false,
        model: MODEL_NAME,
        configured: false
      });
    }
  }

  try {
    // 4. CALL 1: Claude Drafter
    const drafterSystemPrompt = `You are the Divya Mangalam AI Pandit, a compassionate Vedic scholar.
CRITICAL INSTRUCTIONS:
1. Answer ONLY using the facts and verses directly provided in the RETRIEVED PASSAGES below.
2. Cite each verse or statement strictly by source and chapter.
3. NEVER make fear-based or fatalistic predictions.
4. NEVER provide medical, legal, or financial advice.
5. If no passage supports an answer to the seeker's question, you must respond with: "I could not find a source for this."
6. You must return your response STRICTLY as valid JSON matching this schema:
{
  "answer": "string",
  "citations": [
    {
      "passage_id": "string",
      "quote": "exact substring quoted from the passage text"
    }
  ]
}`;

    const passagesContext = retrievedPassages.map((p, idx) => `
[PASSAGE ID: ${p.id}]
Source: ${p.source}
Chapter: ${p.chapter}
Text:
${p.text}
`).join('\n---\n');

    const drafterUserPrompt = `RETRIEVED PASSAGES FROM OUR CORPUS:
${passagesContext}

SEEKER'S QUESTION:
${question}

Draft your answer strictly in the requested JSON format.`;

    const draftRaw = await callClaude({
      system: drafterSystemPrompt,
      messages: [{ role: 'user', content: drafterUserPrompt }]
    });

    let draftJson;
    try {
      // Find JSON block if wrapped in markdown
      const jsonMatch = draftRaw.match(/\{[\s\S]*\}/);
      draftJson = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(draftRaw);
    } catch (parseErr) {
      draftJson = { answer: draftRaw, citations: [] };
    }

    if (!draftJson.answer || draftJson.answer.includes("I could not find a source for this")) {
      return res.status(200).json({
        answer: "I could not find a source for this in our canonical corpus.",
        citations: [],
        verified: false,
        model: MODEL_NAME
      });
    }

    // 5. CALL 2: Claude Verifier
    const verifierSystemPrompt = `You are a strict citation auditor. Your job is to verify whether the draft answer and citations are fully supported by the provided source passages.
Verify:
1. Every citation must accurately reflect the meaning of its passage.
2. Any claim not backed by the passages must be listed under "unsupported".
Return strictly JSON matching this schema:
{
  "verified": [
    {
      "passage_id": "string",
      "quote": "string"
    }
  ],
  "unsupported": ["string"]
}`;

    const verifierUserPrompt = `ORIGINAL PASSAGES:
${passagesContext}

DRAFT ANSWER:
${draftJson.answer}

CLAIMED CITATIONS:
${JSON.stringify(draftJson.citations || [])}

Verify the draft and return the JSON report.`;

    const verifyRaw = await callClaude({
      system: verifierSystemPrompt,
      messages: [{ role: 'user', content: verifierUserPrompt }],
      maxTokens: 800
    });

    let verifyJson;
    try {
      const vMatch = verifyRaw.match(/\{[\s\S]*\}/);
      verifyJson = vMatch ? JSON.parse(vMatch[0]) : JSON.parse(verifyRaw);
    } catch (vErr) {
      verifyJson = { verified: [], unsupported: ["Parse error"] };
    }

    // 6. SERVER-SIDE STRICT SUBSTRING CHECK (Task 4)
    // Every quoted shloka/text must appear as an exact substring of a retrieved passage.
    const passagesById = new Map(retrievedPassages.map(p => [p.id, p]));
    const finalVerifiedCitations = [];

    const candidates = Array.isArray(verifyJson.verified) ? verifyJson.verified : (draftJson.citations || []);

    for (const cand of candidates) {
      const passage = passagesById.get(cand.passage_id);
      if (!passage) continue;

      if (cand.quote && typeof cand.quote === 'string') {
        const cleanQuote = cand.quote.trim().toLowerCase().replace(/\s+/g, ' ');
        const cleanPassage = passage.text.toLowerCase().replace(/\s+/g, ' ');

        // Check if quote is an exact substring of retrieved passage
        if (cleanPassage.includes(cleanQuote) && cleanQuote.length > 5) {
          finalVerifiedCitations.push({
            passage_id: passage.id,
            source: passage.source,
            chapter: passage.chapter,
            quote: cand.quote.trim()
          });
        }
      }
    }

    // If nothing passed the exact substring verification check:
    if (finalVerifiedCitations.length === 0) {
      return res.status(200).json({
        answer: "I could not find a source for this in the canonical texts.",
        citations: [],
        verified: false,
        model: MODEL_NAME
      });
    }

    // Successful verified response
    return res.status(200).json({
      answer: draftJson.answer,
      citations: finalVerifiedCitations,
      verified: true,
      model: MODEL_NAME
    });

  } catch (apiErr) {
    console.error('Claude API Pandit error:', apiErr);
    return res.status(500).json({
      error: 'An error occurred during verification. Please try again shortly.',
      details: apiErr.message
    });
  }
};
