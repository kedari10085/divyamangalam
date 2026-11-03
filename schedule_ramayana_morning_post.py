#!/usr/bin/env python3
"""
Divya Mangalam — Scheduled Morning Publisher for 5-Minute Ramayanam Video
Target Time: 07:30 AM IST (Devotional Golden Peak Window for Maximum Reach)
Publishes simultaneously to:
1. YouTube (@Divya mangalam Info / divyamangalam.info@gmail.com)
2. Instagram (@divyamangalam.info)
"""

import os
import sys
import time
import datetime
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_ist_now():
    utc = datetime.datetime.now(datetime.timezone.utc)
    ist = utc + datetime.timedelta(hours=5, minutes=30)
    return ist

def run_publication_now():
    print("\n" + "="*70)
    print("🌅 EXECUTING MORNING PUBLISHING: 5-MINUTE FULL RAMAYANAM VIDEO")
    print("="*70)

    # 1. YouTube Upload
    print("\n[STEP 1] Uploading 5-Minute Ramayana Epic to YouTube...")
    yt_script = os.path.join(BASE_DIR, "publish_ramayana_to_youtube.py")
    try:
        subprocess.run([sys.executable, yt_script], check=True)
        print("✅ YouTube upload successful!")
    except Exception as e:
        print(f"⚠️ YouTube upload error: {e}")

    # 2. Instagram Publish
    print("\n[STEP 2] Publishing 5-Minute Ramayana Epic to Instagram...")
    insta_script = os.path.join(BASE_DIR, "instagram-agent", "publish_ramayana_5min_video.js")
    try:
        subprocess.run(["node", insta_script], check=True)
        print("✅ Instagram publish successful!")
    except Exception as e:
        print(f"⚠️ Instagram publish error: {e}")

    print("\n🎉 Morning Publication Completed!")

def wait_until_morning_and_publish(target_hour=7, target_minute=30):
    ist_now = get_ist_now()
    target_time = ist_now.replace(hour=target_hour, minute=target_minute, second=0, microsecond=0)
    if ist_now >= target_time:
        target_time += datetime.timedelta(days=1)

    wait_seconds = (target_time - ist_now).total_seconds()
    print("==================================================")
    print(f"⏰ SCHEDULED MORNING PUBLISHER CONFIGURED")
    print("==================================================")
    print(f"Current Time (IST): {ist_now.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Target Time (IST):  {target_time.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Countdown:          {wait_seconds / 3600:.2f} hours ({int(wait_seconds)} seconds)")
    print("--------------------------------------------------")
    print("Holding standby until golden hour...")
    sys.stdout.flush()

    time.sleep(wait_seconds)
    run_publication_now()

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--now':
        run_publication_now()
    else:
        wait_until_morning_and_publish(7, 30)
