#!/usr/bin/env python3
"""
Divya Mangalam — Daily Automated Reels Engine & Scheduler
Enforces:
1. 100% Video Reels (ZERO static images/photos)
2. Accurate dynamic Panchang, Rahu Kaal, Yamagandam & Shubh Muhurat for THAT PARTICULAR DAY
3. Pure soothing voiceover (ZERO background music clash)
4. Automatic push to GitHub & live publishing to Instagram Reels
"""

import os
import sys
import time
import datetime
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def get_ist_date():
    utc_now = datetime.datetime.now(datetime.timezone.utc)
    ist_tz = datetime.timezone(datetime.timedelta(hours=5, minutes=30))
    return utc_now.astimezone(ist_tz).date()

def run_step(cmd, desc):
    print(f"\n==================================================")
    print(f"▶️  {desc}")
    print(f"Command: {cmd}")
    print(f"==================================================")
    result = subprocess.run(cmd, shell=True, cwd=BASE_DIR)
    if result.returncode != 0:
        print(f"❌ Error in step: {desc} (Exit code: {result.returncode})")
        return False
    print(f"✅ Success: {desc}")
    return True

def execute_daily_panchang_reel(target_date_str=None):
    if not target_date_str:
        ist_date = get_ist_date()
        target_date_str = ist_date.strftime("%Y-%m-%d")

    print(f"\n🕉️ STARTING AUTOMATED DAILY PANCHANG REEL FOR: {target_date_str}")
    
    # Step 1: Generate dynamic daily calendar video
    gen_cmd = f'python generate_dynamic_daily_calendar_reel.py --date {target_date_str}'
    if not run_step(gen_cmd, f"Generating Dynamic Panchang Reel for {target_date_str}"):
        return False

    # Step 2: Push to GitHub to obtain public raw HTTPS video URL
    git_add_cmd = 'git add images/daily_calendar_reel_today.mp4 images/panchang_reel_*.mp4'
    git_commit_cmd = f'git commit -m "feat(reel): auto-generate panchang reel for {target_date_str} [skip ci]"'
    git_push_cmd = 'git push origin main'

    run_step(git_add_cmd, "Staging video assets")
    subprocess.run(git_commit_cmd, shell=True, cwd=BASE_DIR)
    run_step(git_push_cmd, "Pushing video to GitHub origin/main")

    print("\n⏳ Waiting 6 seconds for GitHub raw CDN cache...")
    time.sleep(6)

    # Step 3: Publish to Instagram Reels via Graph API
    pub_cmd = f'node instagram-agent/publish_dynamic_calendar_reel.js {target_date_str}'
    if not run_step(pub_cmd, f"Publishing Daily Reel ({target_date_str}) to Instagram"):
        return False

    print(f"\n🎉 Daily Panchang Reel ({target_date_str}) Published Successfully!")
    return True

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else None
    execute_daily_panchang_reel(target)
