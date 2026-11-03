#!/usr/bin/env python3
"""
Divya Mangalam — 5-Minute Full Ramayanam YouTube Publisher
Uploads the 1080x1920 Full HD video to the official Divya Mangalam channel.
"""

import os
import sys
from upload_to_youtube import upload_video

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
video_file = os.path.join(BASE_DIR, "images", "ramayana_5min_full_epic.mp4")
meta_file = os.path.join(BASE_DIR, "images", "ramayana_5min_full_epic_youtube_metadata.json")

if __name__ == '__main__':
    print("==================================================")
    print("🏹 DIVYA MANGALAM — YOUTUBE PUBLISHER")
    print("Video: 5-Minute Full Epic Ramayanam")
    print("==================================================")
    if not os.path.exists(video_file):
        print("❌ Error: Video not found at:", video_file)
        sys.exit(1)
    
    success = upload_video(video_file, meta_file)
    if success:
        print("🎉 YouTube upload finished successfully!")
    else:
        print("❌ YouTube upload failed.")
