#!/usr/bin/env python3
"""
Divya Mangalam — Fully Autonomous Daily Deity Motion Video & Multi-Platform Publisher
Features:
1. Dynamically detects today's Vedic Deity based on the Day of Week (IST):
   - Sunday    -> Bhagavan Surya (Aditya Hridaya Stotram)
   - Monday    -> Lord Shiva (Shiva Tandava Stotram)
   - Tuesday   -> Lord Hanuman (Veer Tandava / Hanuman Chalisa)
   - Wednesday -> Lord Krishna (Madhurashtakam / Flute Raas)
   - Thursday  -> Lord Vishnu / Krishna
   - Friday    -> Maa Durga (Aigiri Nandini / Mahishasura Mardini)
   - Saturday  -> Lord Hanuman / Shani
2. Renders 60-second high-definition (1080x1920) Cosmic Motion Video with 100% Pure Sacred Music & Sanskrit Subtitles.
3. Automatically publishes to Instagram Reels (@divyamangalam.info).
4. Automatically uploads to YouTube Shorts (@DivyaMangalam) if YouTube credentials exist.
"""

import os
import sys
import json
import datetime
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DAY_DEITY_MAP = {
    0: ("somavara", "shiva", "Lord Shiva", "॥ श्री शिव ताण्डव स्तोत्रम् ॥", "Lord Shiva Someshwara Ananda Tandava Dance"),
    1: ("mangalavara", "hanuman", "Lord Hanuman", "॥ श्री हनुमान चालीसा ॥", "Lord Hanuman Veer Cosmic Tandava"),
    2: ("budhavara", "krishna", "Lord Krishna", "॥ श्री मधुराष्टकम् ॥", "Lord Krishna Murlidhar Divine Raas Leela"),
    3: ("guruvara", "krishna", "Lord Krishna", "॥ श्री मधुराष्टकम् ॥", "Lord Krishna Divine Flute Dance"),
    4: ("shukravara", "durga", "Maa Durga", "॥ श्री महिषासुरमर्दिनी स्तोत्रम् ॥", "Maa Durga Mahishasura Mardini Classical Dance"),
    5: ("shanivara", "hanuman", "Lord Hanuman", "॥ श्री हनुमान चालीसा ॥", "Lord Hanuman Sankat Mochan Cosmic Motion"),
    6: ("ravivara", "surya", "Bhagavan Surya", "॥ श्री आदित्य हृदय स्तोत्रम् ॥", "Bhagavan Surya Narayana Celestial Chariot Motion")
}

def get_ist_now():
    utc = datetime.datetime.now(datetime.timezone.utc)
    ist = utc + datetime.timedelta(hours=5, minutes=30)
    return ist

def run_daily_pipeline(duration=60.0, deity_override=None):
    ist_now = get_ist_now()
    weekday_idx = ist_now.weekday() # Monday=0, Sunday=6
    day_slug, deity_key, deity_name, stotram, title_desc = DAY_DEITY_MAP[weekday_idx]
    if deity_override:
        deity_key = deity_override
        deity_name = deity_override.capitalize()

    date_str = ist_now.strftime("%Y-%m-%d")

    print("==================================================")
    print("🕉️ DIVYA MANGALAM — AUTONOMOUS DEITY MOTION VIDEO ENGINE")
    print("==================================================")
    print(f"Current Date (IST): {date_str} ({ist_now.strftime('%A')})")
    print(f"Deity of the Day:   {deity_name} ({deity_key.upper()})")
    print(f"Sacred Hymn:        {stotram}")
    print("--------------------------------------------------")

    output_video = os.path.join(BASE_DIR, "images", f"daily_{deity_key}_motion_shorts.mp4")
    output_meta = os.path.join(BASE_DIR, "images", f"daily_{deity_key}_motion_shorts_youtube_metadata.json")

    # Step 1: Render Video if not already rendered today
    print(f"[STAGE 1] Rendering {duration}s {deity_name} Pure Sacred Motion Video...")
    render_script = os.path.join(BASE_DIR, "generate_pure_music_dance_video.py")
    subprocess.run([
        sys.executable, render_script,
        "--deity", deity_key,
        "--mode", "shorts",
        "--duration", str(duration),
        "--out", output_video
    ], check=True)

    # Step 2: Generate Viral YouTube & Instagram SEO Metadata
    meta = {
        "title": f"🕉️ {title_desc} | Daily Vedic Blessings {date_str} #Shorts",
        "description": (
            f"Daily Divine Cosmic Motion & Pure Devotional Chanting of {deity_name}.\n"
            f"Sacred Hymn: {stotram}\n"
            f"Experience peace, strength, and divine blessings on this auspicious {ist_now.strftime('%A')} ({day_slug.capitalize()}).\n\n"
            f"🌸 Explore Free Vedic Tools, Daily Panchang & AI Palm Reading:\n"
            f"Website: https://divyamangalam.com\n"
            f"Instagram: @divyamangalam.info\n\n"
            f"#Shorts #DivyaMangalam #{deity_name.replace(' ', '')} #VedicAstrology #SanatanaDharma #DailyPanchang #Spiritual #Bhakti"
        ),
        "tags": [
            deity_name, "Divya Mangalam", "Shorts", "Daily Panchang", "Sanatana Dharma",
            "Hinduism", "Vedic Chanting", "Bhakti", "Temple", "Spiritual"
        ],
        "category": "22",
        "privacyStatus": "public"
    }

    with open(output_meta, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)
    print(f"[STAGE 2] SEO Metadata written to {output_meta}")

    # Step 3: Publish to Instagram Reels via node publish script
    print("[STAGE 3] Publishing Cosmic Dance Reel to Instagram (@divyamangalam.info)...")
    insta_script = os.path.join(BASE_DIR, "instagram-agent", "publish_viral_reel.js")
    if os.path.exists(insta_script):
        try:
            subprocess.run(["node", insta_script], check=True)
            print("✅ Successfully published to Instagram Reels!")
        except Exception as e:
            print(f"⚠️ Instagram publication error: {e}")

    # Step 4: Upload to YouTube Shorts if credentials exist
    print("[STAGE 4] Checking YouTube Auto-Upload Credentials...")
    yt_script = os.path.join(BASE_DIR, "upload_to_youtube.py")
    client_secrets = os.path.join(BASE_DIR, "client_secrets.json")
    token_pickle = os.path.join(BASE_DIR, "yt_token.pickle")
    has_yt_creds = os.path.exists(token_pickle) or os.path.exists(client_secrets) or os.getenv("YOUTUBE_TOKEN_BASE64")
    if has_yt_creds:
        try:
            print("Found active YouTube credentials! Starting YouTube auto-upload...")
            subprocess.run([sys.executable, yt_script, "--video", output_video, "--meta", output_meta], check=True)
            print("✅ Successfully uploaded to YouTube Shorts!")
        except Exception as e:
            print(f"⚠️ YouTube upload error: {e}")
    else:
        print("ℹ️ YouTube Note: Neither 'yt_token.pickle' nor 'client_secrets.json' present.")
        print(f"   The high-definition video is saved and ready at: {output_video}")
        print("   SEO Title & Description are ready in the metadata JSON.")

    print("\n[SUCCESS] Daily Deity Motion Pipeline Execution Finished!")

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description="Autonomous Daily Deity Motion Video Pipeline")
    parser.add_argument('--duration', type=float, default=60.0)
    parser.add_argument('--deity', type=str, default=None)
    args = parser.parse_args()
    run_daily_pipeline(duration=args.duration, deity_override=args.deity)
