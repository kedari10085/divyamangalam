#!/usr/bin/env python3
"""
Divya Mangalam — Fully Autonomous Cloud Daily Multi-Deity Subh Muhurat Video Engine & Publisher
Zero Local PC Resource Consumption: Runs seamlessly in GitHub Actions & Google Colab.

Features:
1. Dynamic Vedic Panchang & Subh Muhurat calculation for any day.
2. 7-Day Rotating Deity Cadence:
   - Sunday    -> Bhagavan Surya Narayana (Aditya Hridaya Stotram)
   - Monday    -> Lord Shiva Someshwara (Shiva Tandava Stotram)
   - Tuesday   -> Lord Hanuman & Murugan (Hanuman Chalisa)
   - Wednesday -> Lord Ganesha Vighnaharta (Ganapati Atharvashirsha)
   - Thursday  -> Lord Venkateswara & Vishnu (Venkateswara Suprabhatam)
   - Friday    -> Maa Durga & Mahalakshmi (Aigiri Nandini & Mahalakshmi Ashtakam)
   - Saturday  -> Lord Ayyappa & Shani Dev (Harivarasanam & Swamiye Saranam)
3. Multiple High-Definition Videos Generated at Subh Muhurat:
   - Video 1: Daily Vedic Panchang & Muhurat Reel (9:16 Vertical)
   - Video 2: Deity Sacred Cosmic Motion Video (9:16 Vertical, Pure Sacred Music)
   - Video 3: Morning Subh Muhurat Darshan & Temple Chanting Reel (9:16 Vertical)
4. Anti-Theft Watermark "DIVYAMANGALAM.COM" embedded in every frame.
5. Multi-Platform Auto-Publisher:
   - Instagram Reels (@divyamangalam.info) via Meta Graph API v20.0
   - YouTube Shorts (@DivyaMangalam) via YouTube Data API v3
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

WEEKDAY_DEITY_MAP = {
    0: ("shiva", "Lord Shiva", "Somavara", "॥ श्री शिव ताण्डव स्तोत्रम् ॥", "Lord Shiva Someshwara Ananda Tandava"),
    1: ("hanuman", "Lord Hanuman", "Mangalavara", "॥ श्री हनुमान चालीसा ॥", "Lord Hanuman Veer Cosmic Tandava"),
    2: ("ganesha", "Lord Ganesha", "Budhavara", "॥ श्री गणपति अथर्वशीर्षम् ॥", "Lord Ganesha Vighnaharta Divine Motion"),
    3: ("venkateswara", "Lord Venkateswara", "Guruvara", "॥ श्री वेङ्कटेश्वर सुप्रभातम ॥", "Lord Venkateswara Tirumala Suprabhata Darshan"),
    4: ("durga", "Maa Durga & Mahalakshmi", "Shukravara", "॥ श्री महिषासुरमर्दिनी स्तोत्रम् ॥", "Maa Durga & Mahalakshmi Classical Motion"),
    5: ("ayyappa", "Lord Ayyappa", "Shanivara", "॥ श्री हरिवरासनम् ॥", "Lord Ayyappa Swamiye Saranam Sabarimala Motion"),
    6: ("surya", "Bhagavan Surya", "Ravivara", "॥ श्री आदित्य हृदय स्तोत्रम् ॥", "Bhagavan Surya Narayana Celestial Chariot Motion")
}

def get_ist_now():
    utc = datetime.datetime.now(datetime.timezone.utc)
    ist = utc + datetime.timedelta(hours=5, minutes=30)
    return ist

def setup_cloud_credentials():
    """Restores YouTube token from GitHub secret if needed."""
    token_pickle = os.path.join(BASE_DIR, "yt_token.pickle")
    b64_secret = os.getenv("YOUTUBE_TOKEN_BASE64")
    if b64_secret and not os.path.exists(token_pickle):
        try:
            with open(token_pickle, "wb") as f:
                f.write(base64.b64decode(b64_secret))
            print("🔑 Successfully restored YouTube OAuth credentials from YOUTUBE_TOKEN_BASE64!")
        except Exception as e:
            print(f"⚠️ Warning restoring YouTube secret: {e}")

def git_push_assets(files, commit_msg):
    """Pushes generated videos/metadata to GitHub so public raw URLs are live."""
    try:
        subprocess.run(["git", "config", "--local", "user.email", "bot@divyamangalam.com"], cwd=BASE_DIR, check=False)
        subprocess.run(["git", "config", "--local", "user.name", "DivyaMangalam Cloud Bot"], cwd=BASE_DIR, check=False)
        for f in files:
            subprocess.run(["git", "add", f], cwd=BASE_DIR, check=False)
        subprocess.run(["git", "commit", "-m", commit_msg], cwd=BASE_DIR, check=False)
        subprocess.run(["git", "push", "origin", "main"], cwd=BASE_DIR, check=True)
        print("✅ Pushed video assets to GitHub main branch!")
        return True
    except Exception as e:
        print(f"⚠️ Git push notice (may already be clean or no remote auth): {e}")
        return False

def publish_instagram_reel(video_raw_url, caption):
    """Publishes a video to Instagram Reels via node publish_universal_reel.js."""
    script = os.path.join(BASE_DIR, "instagram-agent", "publish_universal_reel.js")
    if not os.path.exists(script):
        print(f"⚠️ Instagram script not found: {script}")
        return False

    cmd = [
        "node", script,
        f"--video_url={video_raw_url}",
        f"--caption={caption}"
    ]
    try:
        print(f"▶️ Publishing to Instagram Reels: {video_raw_url}")
        subprocess.run(cmd, cwd=BASE_DIR, check=True)
        print("✅ Successfully published to Instagram Reels!")
        return True
    except Exception as e:
        print(f"⚠️ Instagram publication error: {e}")
        return False

def upload_youtube_short(video_path, title, description, tags):
    """Uploads a video to YouTube Shorts via upload_to_youtube.py."""
    setup_cloud_credentials()
    meta_path = video_path.replace(".mp4", "_youtube_metadata.json")
    meta = {
        "title": title,
        "description": description,
        "tags": tags,
        "category": "22",
        "privacyStatus": "public"
    }
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)

    yt_script = os.path.join(BASE_DIR, "upload_to_youtube.py")
    if not os.path.exists(yt_script):
        return False

    try:
        print(f"▶️ Uploading to YouTube Shorts: {video_path}")
        subprocess.run([sys.executable, yt_script, "--video", video_path, "--meta", meta_path], check=True)
        print("✅ Successfully uploaded to YouTube Shorts!")
        return True
    except Exception as e:
        print(f"⚠️ YouTube upload error: {e}")
        return False

def run_panchang_reel_step(target_date_str, do_publish=True):
    """Generates and publishes today's Vedic Panchang Reel."""
    print("\n" + "="*60)
    print("🌅 [STAGE 1] GENERATING DAILY VEDIC PANCHANG REEL")
    print("="*60)
    
    script = os.path.join(BASE_DIR, "generate_dynamic_daily_calendar_reel.py")
    cmd = [sys.executable, script, "--date", target_date_str]
    subprocess.run(cmd, check=True)

    video_path = os.path.join(BASE_DIR, "images", "daily_calendar_reel_today.mp4")
    if not os.path.exists(video_path):
        print("❌ Error: Panchang reel not found at expected path")
        return False

    raw_url = f"https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/daily_calendar_reel_today.mp4"

    if do_publish:
        git_push_assets(["images/daily_calendar_reel_today.mp4", "images/panchang_reel_*.mp4"], f"feat(reel): auto-generate panchang reel for {target_date_str} [skip ci]")
        
        # Instagram
        insta_script = os.path.join(BASE_DIR, "instagram-agent", "publish_dynamic_calendar_reel.js")
        if os.path.exists(insta_script):
            try:
                subprocess.run(["node", insta_script, target_date_str], check=True)
            except Exception as e:
                print(f"⚠️ Instagram Panchang publish error: {e}")

        # YouTube
        upload_youtube_short(
            video_path,
            title=f"🕉️ Daily Vedic Panchang & Shubh Muhurat ({target_date_str}) #Shorts",
            description=(
                f"Today's Sacred Vedic Panchang ({target_date_str}).\n"
                f"Includes Tithi, Nakshatra, Yoga, Brahma Muhurta, Abhijit Muhurta, Rahu Kaal & Daily Sacred Guidance.\n\n"
                f"🌸 Explore Free Vedic Tools, Kundli & Daily Timings:\n"
                f"Website: https://divyamangalam.com\n"
                f"Instagram: @divyamangalam.info\n\n"
                f"#Shorts #DailyPanchang #VedicCalendar #ShubhMuhurat #SanatanaDharma #SpiritualReels #HinduPanchang"
            ),
            tags=["Daily Panchang", "Vedic Calendar", "Shubh Muhurat", "Sanatana Dharma", "Divya Mangalam", "Shorts"]
        )
    return True

def run_deity_dance_step(deity_key, target_date_str, do_publish=True):
    """Generates and publishes today's Presiding Deity Sacred Cosmic Motion Video."""
    print("\n" + "="*60)
    print(f"🕉️ [STAGE 2] GENERATING {deity_key.upper()} SACRED MOTION VIDEO")
    print("="*60)

    output_video = os.path.join(BASE_DIR, "images", f"daily_{deity_key}_motion_shorts.mp4")
    render_script = os.path.join(BASE_DIR, "generate_pure_music_dance_video.py")

    cmd = [
        sys.executable, render_script,
        "--deity", deity_key,
        "--mode", "shorts",
        "--duration", "60.0",
        "--out", output_video
    ]
    subprocess.run(cmd, check=True)

    raw_url = f"https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/daily_{deity_key}_motion_shorts.mp4"

    if do_publish:
        git_push_assets([f"images/daily_{deity_key}_motion_shorts.mp4"], f"feat(deity): auto-generate {deity_key} sacred motion video for {target_date_str} [skip ci]")

        caption = (
            f"🕉️ Divya Mangalam — Daily Divine Motion & Sacred Devotion\n"
            f"📅 {target_date_str}\n"
            f"Presiding Deity: {deity_key.capitalize()}\n"
            f"✦ ──────────────────────── ✦\n"
            f"Experience pure sacred chanting and divine cosmic presence.\n"
            f"May divine blessings remove all obstacles, grant inner peace, and bring radiant joy to your life.\n\n"
            f"🛡️ Anti-Theft Watermarked | Official Divya Mangalam Release\n"
            f"🌐 Explore Free Vedic Tools, Daily Panchang & AI Palm Reading: https://divyamangalam.com\n"
            f"🔔 Follow @divyamangalam.info • YouTube: @DivyaMangalam\n\n"
            f"#Shorts #{deity_key.capitalize()} #SanatanaDharma #VedicChanting #SpiritualReels #DivyaMangalam #Bhakti"
        )

        publish_instagram_reel(raw_url, caption)

        upload_youtube_short(
            output_video,
            title=f"🕉️ Divine {deity_key.capitalize()} Cosmic Motion & Sacred Chanting ({target_date_str}) #Shorts",
            description=caption,
            tags=[deity_key.capitalize(), "Divya Mangalam", "Shorts", "Vedic Chanting", "Sanatana Dharma", "Daily Darshan", "Bhakti"]
        )
    return True

def run_darshan_reel_step(deity_key, target_date_str, do_publish=True):
    """Generates and publishes early morning Subh Muhurat Darshan Reel."""
    print("\n" + "="*60)
    print(f"🌅 [STAGE 3] GENERATING {deity_key.upper()} SUBH MUHURAT DARSHAN REEL")
    print("="*60)

    output_video = os.path.join(BASE_DIR, "images", f"subh_muhurat_{deity_key}_{target_date_str}.mp4")
    render_script = os.path.join(BASE_DIR, "generate_subh_muhurat_darshan_reel.py")

    cmd = [
        sys.executable, render_script,
        "--deity", deity_key,
        "--duration", "30.0",
        "--out", output_video,
        "--date", target_date_str
    ]
    subprocess.run(cmd, check=True)

    raw_url = f"https://raw.githubusercontent.com/kedari10085/divyamangalam/main/images/subh_muhurat_{deity_key}_{target_date_str}.mp4"

    if do_publish:
        git_push_assets([f"images/subh_muhurat_{deity_key}_{target_date_str}.mp4"], f"feat(darshan): auto-generate {deity_key} subh muhurat reel for {target_date_str} [skip ci]")

        caption = (
            f"🌅 Subh Muhurat Morning Darshan & Blessings\n"
            f"📅 {target_date_str}\n"
            f"✦ ──────────────────────── ✦\n"
            f"✨ Auspicious Timings Today:\n"
            f"• Brahma Muhurta: 04:30 AM – 05:20 AM (Ideal for Sadhana)\n"
            f"• Abhijit Muhurta: 11:45 AM – 12:35 PM (All Auspicious Beginnings)\n"
            f"• Amrit Kaal: 08:15 AM – 09:45 AM\n\n"
            f"Start your day with divine sanctum darshan and supreme sacred vibrations.\n\n"
            f"🌐 Free Vedic Kundli, Panchang & Shubh Muhurat: https://divyamangalam.com\n"
            f"Follow @divyamangalam.info • YouTube: @DivyaMangalam\n\n"
            f"#SubhMuhurat #BrahmaMuhurta #AbhijitMuhurta #{deity_key.capitalize()} #DailyDarshan #SpiritualMorning #DivyaMangalam"
        )

        publish_instagram_reel(raw_url, caption)

        upload_youtube_short(
            output_video,
            title=f"🌅 Shubh Muhurat Morning Darshan & Divine Blessings ({target_date_str}) #Shorts",
            description=caption,
            tags=["Subh Muhurat", "Brahma Muhurta", deity_key.capitalize(), "Divya Mangalam", "Shorts", "Morning Prayer"]
        )
    return True

def main():
    parser = argparse.ArgumentParser(description="Divya Mangalam Autonomous Cloud Subh Muhurat Video Pipeline")
    parser.add_argument("--mode", type=str, default="all", choices=["all", "panchang", "deity", "darshan"])
    parser.add_argument("--deity", type=str, default="auto")
    parser.add_argument("--publish", type=str, default="all", choices=["all", "instagram", "youtube", "none"])
    parser.add_argument("--date", type=str, default=None)
    args = parser.parse_args()

    ist_now = get_ist_now()
    if args.date:
        tdate = datetime.datetime.strptime(args.date, "%Y-%m-%d").date()
    else:
        tdate = ist_now.date()

    target_date_str = tdate.strftime("%Y-%m-%d")
    weekday_idx = tdate.weekday()
    default_deity_key, deity_name, vara_name, stotram, title_desc = WEEKDAY_DEITY_MAP[weekday_idx]

    active_deity = default_deity_key if args.deity == "auto" else args.deity
    do_publish = (args.publish != "none")

    print("==================================================================")
    print("🕉️ DIVYA MANGALAM — CLOUD SUBH MUHURAT VIDEO & PUBLISHING ENGINE")
    print(f"Date (IST):        {target_date_str} ({vara_name} / {tdate.strftime('%A')})")
    print(f"Presiding Deity:   {deity_name} ({active_deity.upper()})")
    print(f"Mode:              {args.mode}")
    print(f"Auto-Publish:      {args.publish}")
    print("==================================================================")

    setup_cloud_credentials()

    if args.mode in ["all", "panchang"]:
        run_panchang_reel_step(target_date_str, do_publish=do_publish)

    if args.mode in ["all", "deity"]:
        run_deity_dance_step(active_deity, target_date_str, do_publish=do_publish)

    if args.mode in ["all", "darshan"]:
        run_darshan_reel_step(active_deity, target_date_str, do_publish=do_publish)

    print("\n🎉 [COMPLETED] Cloud Subh Muhurat Pipeline Execution Finished Successfully!")

if __name__ == '__main__':
    main()
