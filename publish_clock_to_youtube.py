#!/usr/bin/env python3
"""
Divya Mangalam — Daily 24-Hour Vedic Muhurat Clock YouTube Shorts Publisher
Uploads vertical 1080x1920 video with dynamic daily timings & rich SEO metadata.
"""

import os
import sys
import json
import datetime
from generate_clock_post import calculate_clock_data
from upload_to_youtube import upload_video

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
video_file = os.path.join(BASE_DIR, "images", "clock_reel.mp4")
meta_file = os.path.join(BASE_DIR, "images", "clock_reel_youtube_metadata.json")

def generate_youtube_clock_metadata(target_date=None):
    if target_date is None:
        target_date = datetime.date.today()
    data = calculate_clock_data(target_date)

    title = f"⏰ 24-Hour Vedic Muhurat Clock • {data['date_str']} | Shubh vs Ashubh Kaal #Shorts"
    if len(title) > 100:
        title = title[:97] + "..."

    description = f"""🕉️ Divya Mangalam — Daily 24-Hour Visual Vedic Muhurat Clock
📅 {data['date_str']} • {data['vara']} ({data['weekday']})
👑 Planetary Ruler: Lord {data['planet']} (Brihaspati / Guru)
✦ ──────────────────────── ✦

🌅 CELESTIAL SOLAR TIMINGS:
• Sunrise: {data['sunrise_str']}
• Sunset: {data['sunset_str']}

🌟 SHUBH MUHURAT (AUSPICIOUS TIMING WINDOWS):
• 🌟 Abhijit Muhurta: {data['abhijit'][2]} (Peak Golden Window for business, travel & purchases)
• 🪔 Brahma Muhurta: {data['brahma'][2]} (Meditation, Yoga & Mantra Sadhana)
• ⚔️ Vijaya Muhurta: {data['vijaya'][2]} (Victory over obstacles, litigation & debate)

⚠️ ASHUBH KAAL (CAUTION PERIODS - AVOID MAJOR NEW INITIATIVES):
• ⛔ Rahu Kaal: {data['rahu'][2]}
• ⏳ Yamagandam: {data['yama'][2]}
• 🛑 Gulika Kalam: {data['gulika'][2]}

🧭 TRAVEL ADVISORY (DISHA SHOOL):
• Inauspicious Direction: {data['disha_shool']}
• Sacred Remedy: {data['disha_remedy']}

✦ ──────────────────────── ✦
✨ Interactive 24-Hour Live Vedic Clock, Kundli & Daily Panchang:
🌐 https://divyamangalam.com

#Shorts #VedicClock #Muhurat #Panchang #RahuKaal #AbhijitMuhurta #SanatanaDharma #DailyAstrology #DivyaMangalam #HinduCalendar #AuspiciousTime
"""

    meta = {
        "title": title,
        "description": description,
        "tags": [
            "Vedic Clock",
            "Panchang",
            "Muhurat",
            "Rahu Kaal",
            "Abhijit Muhurta",
            "Shorts",
            "YouTube Shorts",
            "Sanatana Dharma",
            "Hindu Astrology",
            "Divya Mangalam",
            f"{data['weekday']} Astrology",
            "Daily Horoscope"
        ],
        "category": "22",
        "privacyStatus": "public"
    }

    with open(meta_file, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)
    print(f"📝 YouTube Shorts Metadata Saved to: {meta_file}")
    return meta_file

def publish_clock_reel(target_date=None):
    print("==================================================")
    print("⏰ PUBLISHING 24-HOUR VEDIC CLOCK REEL TO YOUTUBE")
    print("==================================================")
    if not os.path.exists(video_file):
        print(f"❌ Error: Video file not found at: {video_file}")
        return False
        
    generate_youtube_clock_metadata(target_date)
    success = upload_video(video_file, meta_file)
    if success:
        print("🎉 24-Hour Vedic Clock Reel published to YouTube Shorts successfully!")
    else:
        print("❌ YouTube Shorts upload failed.")
    return success

if __name__ == '__main__':
    publish_clock_reel()
