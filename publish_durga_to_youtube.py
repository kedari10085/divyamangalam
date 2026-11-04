#!/usr/bin/env python3
"""
Divya Mangalam — Aigiri Nandini 5-Minute Epic Movie YouTube Publisher
Uploads the 1920x1080 Full HD video to the official Divya Mangalam channel.
"""

import os
import sys
from upload_to_youtube import upload_video

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
video_file = os.path.join(BASE_DIR, "images", "durga_aigiri_nandini_5min_original.mp4")
meta_file = os.path.join(BASE_DIR, "images", "durga_aigiri_nandini_5min_youtube_metadata.json")

if __name__ == '__main__':
    print("==================================================")
    print("🔱 DIVYA MANGALAM — DURGA AIGIRI NANDINI YOUTUBE PUBLISHER")
    print("Video: 1920x1080 Full HD Landscape (5-Minute Epic)")
    print("==================================================")
    if not os.path.exists(video_file):
        print("❌ Error: Video not found at:", video_file)
        sys.exit(1)
        
    success = upload_video(video_file, meta_file)
    if success:
        print("🎉 Aigiri Nandini 5-Minute Epic Movie uploaded to YouTube successfully!")
    else:
        print("❌ YouTube upload failed.")
