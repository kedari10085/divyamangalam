#!/usr/bin/env python3
"""
Divya Mangalam — Shubh Deepavali 2026 Special Movie YouTube Publisher
Uploads the 1920x1080 Full HD landscape video to the official Divya Mangalam channel.
"""

import os
import sys
from upload_to_youtube import upload_video

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
video_file = os.path.join(BASE_DIR, "images", "deepavali_wishes_master_1080p.mp4")
meta_file = os.path.join(BASE_DIR, "images", "deepavali_wishes_youtube_metadata.json")

if __name__ == '__main__':
    print("==================================================")
    print("🕉️ DIVYA MANGALAM — DEEPAVALI SPECIAL YOUTUBE PUBLISHER")
    print("Video: 1920x1080 Full HD Landscape (Master Movie)")
    print("==================================================")
    if not os.path.exists(video_file):
        print("❌ Error: Video not found at:", video_file)
        sys.exit(1)
        
    success = upload_video(video_file, meta_file)
    if success:
        print("🎉 Shubh Deepavali Special Video uploaded to YouTube successfully!")
    else:
        print("❌ YouTube upload failed.")
