#!/usr/bin/env python3
"""
Divya Mangalam — Lord Shiva Kartika Pournami 5-Minute Master YouTube Publisher
Uploads the 1920x1080 Full HD landscape video to the official Divya Mangalam channel.
"""

import os
import sys
from upload_to_youtube import upload_video

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
video_file = os.path.join(BASE_DIR, "images", "shiva_kartika_pournami_5min_youtube.mp4")
meta_file = os.path.join(BASE_DIR, "images", "shiva_kartika_pournami_5min_youtube_metadata.json")

if __name__ == '__main__':
    print("==================================================")
    print("🔱 DIVYA MANGALAM — SHIVA KARTIKA POURNAMI YOUTUBE PUBLISHER")
    print("Video: 1920x1080 Full HD Landscape (5-Minute Epic)")
    print("==================================================")
    if not os.path.exists(video_file):
        alt_file = os.path.join(BASE_DIR, "images", "shiva_kartika_pournami_5min_instagram.mp4")
        if os.path.exists(alt_file):
            video_file = alt_file
        else:
            print("❌ Error: Video not found at:", video_file)
            sys.exit(1)

    success = upload_video(video_file, meta_file)
    if success:
        print("🎉 Lord Shiva 5-Minute Movie uploaded to YouTube successfully!")
    else:
        print("❌ YouTube upload failed.")
