#!/usr/bin/env python3
"""
Divya Mangalam — Mahabharata Part 1 Golden Hour Scheduler (07:30 AM IST)
Monitors time and automatically publishes to YouTube and Instagram at 07:30 AM IST.
Can also be executed with --now for immediate publication.
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
    return utc + datetime.timedelta(hours=5, minutes=30)

def publish_all():
    print("\n==================================================")
    print("🌅 GOLDEN HOUR PUBLISH: MAHABHARATA PART 1 (ADI PARVA)")
    print(f"Time (IST): {get_ist_now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("==================================================")
    
    # 1. YouTube Upload
    yt_script = os.path.join(BASE_DIR, "publish_mahabharata_to_youtube.py")
    print("\n▶️ Uploading 1080p Landscape Video to YouTube...")
    try:
        subprocess.run([sys.executable, yt_script], check=True)
        print("✅ Srimad Mahabharata Part 1 Published to YouTube successfully!")
    except Exception as e:
        print(f"⚠️ YouTube upload error: {e}")

def schedule_for_730_am():
    now_ist = get_ist_now()
    target = now_ist.replace(hour=7, minute=30, second=0, microsecond=0)
    
    if now_ist >= target:
        target += datetime.timedelta(days=1)
        
    wait_seconds = (target - now_ist).total_seconds()
    print(f"⏰ Current IST Time: {now_ist.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"🎯 Target Publish Time: {target.strftime('%Y-%m-%d %H:%M:%S')} (07:30 AM IST)")
    print(f"⏳ Waiting {wait_seconds/3600:.2f} hours ({int(wait_seconds)} seconds)...")
    
    time.sleep(wait_seconds)
    publish_all()

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--now':
        publish_all()
    else:
        schedule_for_730_am()
