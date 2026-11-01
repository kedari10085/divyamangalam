#!/usr/bin/env python3
"""
Divya Mangalam — Gemini Managed Vision Agent
Uses Google Gemini Managed Agents (Interactions API) to create daily devotional scripts,
Instagram captions, and YouTube metadata.
Auto-falls back to local Ollama (llama3.2:3b) when offline.
"""

import os
import sys
import json
import uuid
import datetime
import urllib.request
from google import genai

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 1. Load .env
env_file = os.path.join(BASE_DIR, ".env")
if os.path.exists(env_file):
    with open(env_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                os.environ[k.strip()] = v.strip()

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

# Vedic Deity per Day
DEITY_MAP = {
    6: {'name': 'Lord Surya Narayana', 'day': 'Ravivara (Sunday)', 'mantra': 'Om Suryaya Namah', 'stotram': 'Aditya Hridaya Stotram'},
    0: {'name': 'Lord Shiva (Mahadeva)', 'day': 'Somavara (Monday)', 'mantra': 'Om Namah Shivaya', 'stotram': 'Shiva Tandava Stotram / Maha Mrityunjaya'},
    1: {'name': 'Lord Hanuman (Bajrangbali)', 'day': 'Mangalavara (Tuesday)', 'mantra': 'Om Hanumate Namah', 'stotram': 'Hanuman Chalisa / Sankat Mochan'},
    2: {'name': 'Lord Ganesha (Ganapati)', 'day': 'Budhavara (Wednesday)', 'mantra': 'Om Gam Ganapataye Namah', 'stotram': 'Ganesha Atharvashirsha'},
    3: {'name': 'Lord Vishnu (Brihaspati)', 'day': 'Guruvara (Thursday)', 'mantra': 'Om Namo Narayanaya', 'stotram': 'Vishnu Sahasranama'},
    4: {'name': 'Maa Lakshmi & Durga', 'day': 'Sukravara (Friday)', 'mantra': 'Om Shreem Mahalakshmyai Namah', 'stotram': 'Mahalakshmi Ashtakam / Durga Suktam'},
    5: {'name': 'Lord Shani & Hanuman', 'day': 'Shanivara (Saturday)', 'mantra': 'Om Sham Shanicharaya Namah', 'stotram': 'Shani Chalisa / Dasaratha Shani Stotram'},
}

def generate_with_gemini(prompt):
    if not GEMINI_API_KEY:
        return None
    try:
        client = genai.Client(api_key=GEMINI_API_KEY)
        interaction = client.interactions.create(
            agent='antigravity-preview-05-2026',
            input=prompt,
            environment='remote'
        )
        return interaction.output_text
    except Exception as e:
        print(f"[Gemini Agent Notice]: {e}")
        return None

def generate_with_ollama(prompt):
    try:
        payload = json.dumps({
            "model": "llama3.2:3b",
            "prompt": prompt,
            "stream": False,
            "options": {"temperature": 0.7, "num_predict": 400}
        }).encode('utf-8')
        req = urllib.request.Request("http://127.0.0.1:11434/api/generate", data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            return data.get("response", "").strip()
    except Exception as e:
        print(f"[Ollama Fallback Notice]: {e}")
        return None

def run_vision_agent():
    today = datetime.date.today()
    deity = DEITY_MAP.get(today.weekday(), DEITY_MAP[6])

    print("==================================================")
    print("🕉️ DIVYA MANGALAM GEMINI MANAGED AGENT")
    print("==================================================")
    print(f"📅 Today: {today.strftime('%A, %d %B %Y')} ({deity['day']})")
    print(f"🚩 Presiding Deity: {deity['name']}")
    print(f"✨ Sacred Stotram: {deity['stotram']}")
    print("--------------------------------------------------")

    prompt = f"""
You are the sacred Vedic content strategist for Divya Mangalam (divyamangalam.com) and Instagram @divyamangalam.info.
Today is {deity['day']} dedicated to {deity['name']}.
Deity Mantra: {deity['mantra']}
Hymn: {deity['stotram']}

Generate:
1. SCRIPT: A 60-second devotional script (100-120 words) for a vertical video reel. Keep it peaceful, soulful, and sacred. Mention today's Abhijit Muhurta and caution for Rahu Kaal.
2. CAPTION: A complete Instagram Reel caption including Sanskrit shloka, significance, timing guide, website link https://divyamangalam.com, and 12 relevant devotional hashtags.
3. YOUTUBE_TITLE: Under 70 characters for YouTube Shorts.

Respond in pure text without any robotic or AI jargon.
"""

    print("🤖 Invoking Google Gemini Managed Agent (antigravity-preview-05-2026)...")
    result = generate_with_gemini(prompt)

    if not result:
        print("⚠️ Falling back to local Ollama (llama3.2:3b)...")
        result = generate_with_ollama(prompt)

    if result:
        print("\n✅ GENERATION COMPLETE!")
        print("--------------------------------------------------")
        print(result)
        print("--------------------------------------------------")

        # Save to output file
        out_file = os.path.join(BASE_DIR, "latest_gemini_content.txt")
        with open(out_file, 'w', encoding='utf-8') as f:
            f.write(result)
        print(f"💾 Saved to: {out_file}")
        return result
    else:
        print("❌ Generation failed on both Gemini and Ollama.")
        return None

if __name__ == '__main__':
    run_vision_agent()
