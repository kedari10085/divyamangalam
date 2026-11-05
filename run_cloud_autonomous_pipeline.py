#!/usr/bin/env python3
"""
Divya Mangalam — Fully Autonomous Cloud Video Engine & Multi-Platform Publisher
Designed to run in GitHub Actions / Cloud Runner with ZERO manual intervention.

Features:
- Handles YouTube Shorts & Instagram Reels automatically.
- Restores YouTube OAuth credentials seamlessly from GitHub Secrets.
- Dynamically selects today's Vedic Deity and sacred Stotrams.
- Renders high-definition motion videos with 100% sacred music & Devanagari Sanskrit verses.
- Supports 5-Minute Epic Ramayana publishing on demand or morning peak slot.
"""

import os
import sys
import json
import base64
import argparse
import datetime
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_ist_now():
    utc = datetime.datetime.now(datetime.timezone.utc)
    ist = utc + datetime.timedelta(hours=5, minutes=30)
    return ist

def setup_cloud_credentials():
    """Restores YouTube token from GitHub Actions environment secret if not on disk."""
    token_pickle = os.path.join(BASE_DIR, "yt_token.pickle")
    b64_secret = os.getenv("YOUTUBE_TOKEN_BASE64")
    if b64_secret and not os.path.exists(token_pickle):
        try:
            with open(token_pickle, "wb") as f:
                f.write(base64.b64decode(b64_secret))
            print("🔑 Successfully restored YouTube OAuth token from GitHub Secrets!")
        except Exception as e:
            print(f"⚠️ Warning restoring YouTube secret: {e}")

def run_deity_dance(deity=None):
    """Executes the daily 3D humanoid deity cosmic motion dance video pipeline."""
    setup_cloud_credentials()
    script = os.path.join(BASE_DIR, "auto_daily_deity_video.py")
    cmd = [sys.executable, script]
    if deity and deity != "auto":
        cmd.extend(["--deity", deity])
    
    print(f"▶️ Running Deity Dance Video Pipeline: {' '.join(cmd)}")
    subprocess.run(cmd, check=True)

def run_clock_reel():
    """Generates and publishes the 24-Hour Sacred Vedic Muhurat Clock Reel & Infographic."""
    setup_cloud_credentials()
    print("▶️ Executing 24-Hour Sacred Vedic Muhurat Clock Pipeline...")

    # 1. Generate high-res 1080x1080 clock infographic
    subprocess.run([sys.executable, os.path.join(BASE_DIR, "generate_clock_post.py")], check=True)

    # 2. Render 1080x1920 vertical clock reel with voiceover & 432 Hz drone
    subprocess.run([sys.executable, os.path.join(BASE_DIR, "generate_clock_reel.py")], check=True)

    # 3. Publish to YouTube Shorts
    yt_script = os.path.join(BASE_DIR, "publish_clock_to_youtube.py")
    if os.path.exists(yt_script):
        try:
            subprocess.run([sys.executable, yt_script], check=True)
            print("✅ 24-Hour Vedic Clock Reel successfully published to YouTube Shorts!")
        except Exception as e:
            print(f"⚠️ YouTube upload error: {e}")

    # 4. Commit and push video assets to GitHub for raw URL
    try:
        subprocess.run(["git", "add", "images/clock_reel.mp4", "images/clock_darshan.jpg"], cwd=BASE_DIR, check=True)
        subprocess.run(["git", "commit", "-m", "feat(clock): daily 24h vedic clock reel [skip ci]"], cwd=BASE_DIR)
        subprocess.run(["git", "push", "origin", "main"], cwd=BASE_DIR, check=True)
    except Exception as e:
        print(f"⚠️ Git push error: {e}")

    # 5. Publish to Instagram Reels
    insta_script = os.path.join(BASE_DIR, "instagram-agent", "publish_clock_reel.js")
    if os.path.exists(insta_script):
        try:
            subprocess.run(["node", insta_script], check=True)
            print("✅ 24-Hour Vedic Clock Reel successfully published to Instagram!")
        except Exception as e:
            print(f"⚠️ Instagram publication error: {e}")

def run_panchang_reel():
    """Executes the daily dynamic Panchang reel pipeline for today's date."""
    setup_cloud_credentials()
    ist = get_ist_now()
    date_str = ist.strftime("%Y-%m-%d")
    script = os.path.join(BASE_DIR, "auto_daily_reel_scheduler.py")
    cmd = [sys.executable, script, date_str]
    print(f"▶️ Running Daily Panchang Reel Pipeline: {' '.join(cmd)}")
    subprocess.run(cmd, check=True)

def run_ramayana_publish():
    """Publishes the 5-Minute Full Epic Ramayanam video to YouTube and Instagram."""
    setup_cloud_credentials()
    print("▶️ Publishing 5-Minute Full Epic Ramayana Video...")
    
    # 1. YouTube Upload
    yt_script = os.path.join(BASE_DIR, "publish_ramayana_to_youtube.py")
    if os.path.exists(yt_script):
        try:
            subprocess.run([sys.executable, yt_script], check=True)
            print("✅ 5-Minute Ramayana Video successfully published to YouTube!")
        except Exception as e:
            print(f"⚠️ YouTube upload error: {e}")
            
    # 2. Instagram Publication
    insta_script = os.path.join(BASE_DIR, "instagram-agent", "publish_ramayana_5min_video.js")
    if os.path.exists(insta_script):
        try:
            subprocess.run(["node", insta_script], check=True)
            print("✅ 5-Minute Ramayana Video successfully published to Instagram!")
        except Exception as e:
            print(f"⚠️ Instagram publication error: {e}")

def run_mahabharata_publish():
    """Publishes the 1080p Multi-Language Humanoid Mahabharata Part 1 to YouTube."""
    setup_cloud_credentials()
    print("▶️ Publishing Srimad Mahabharata Part 1 1080p Multi-Language Movie...")
    yt_script = os.path.join(BASE_DIR, "publish_mahabharata_to_youtube.py")
    if os.path.exists(yt_script):
        try:
            subprocess.run([sys.executable, yt_script], check=True)
            print("✅ Srimad Mahabharata Part 1 successfully published to YouTube!")
        except Exception as e:
            print(f"⚠️ YouTube upload error: {e}")

def main():
    parser = argparse.ArgumentParser(description="Autonomous Cloud Pipeline")
    parser.add_argument("--mode", type=str, default="auto", choices=["auto", "clock", "panchang", "deity_dance", "ramayana_5min", "mahabharata_p1"])
    parser.add_argument("--deity", type=str, default="auto")
    args = parser.parse_args()

    ist_now = get_ist_now()
    print("==================================================")
    print("🕉️ DIVYA MANGALAM — AUTONOMOUS CLOUD RUNNER")
    print(f"Time (IST): {ist_now.strftime('%Y-%m-%d %H:%M:%S (%A)')}")
    print(f"Mode:       {args.mode}")
    print("==================================================")

    if args.mode == "mahabharata_p1":
        run_mahabharata_publish()
    elif args.mode == "ramayana_5min":
        run_ramayana_publish()
    elif args.mode == "clock":
        run_clock_reel()
    elif args.mode == "panchang":
        run_panchang_reel()
    elif args.mode == "deity_dance":
        run_deity_dance(args.deity)
    else: # auto mode based on IST hour
        hour = ist_now.hour
        if 5 <= hour < 12:
            print(f"🌅 Morning Slot ({hour}:00 IST): Executing 24-Hour Vedic Clock & Daily Panchang Reels...")
            run_clock_reel()
            run_panchang_reel()
        else:
            print(f"🌌 Evening Slot ({hour}:00 IST): Executing Cosmic Deity Dance Video...")
            run_deity_dance(args.deity)

if __name__ == '__main__':
    main()
