#!/usr/bin/env python3
"""
Divya Mangalam — Srimad Mahabharata Part 1 YouTube Publisher
Uploads the 1920x1080 Full HD Landscape video to the official Divya Mangalam channel.
"""

import os
import sys
from upload_to_youtube import upload_video

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
video_file = os.path.join(BASE_DIR, "images", "mahabharata_part1_adi_parva_action_multilang_1080p.mp4")
meta_file = os.path.join(BASE_DIR, "images", "mahabharata_part1_action_youtube_metadata.json")

if __name__ == '__main__':
    print("==================================================")
    print("🏹 DIVYA MANGALAM — MAHABHARATA PART 1 YOUTUBE PUBLISHER")
    print("Video: 1920x1080 Full HD Landscape (Adi Parva)")
    print("==================================================")
    if not os.path.exists(video_file):
        print("❌ Error: Video not found at:", video_file)
        sys.exit(1)
        
    success = upload_video(video_file, meta_file)
    if success:
        print("🎉 Srimad Mahabharata Part 1 uploaded to YouTube successfully!")
    else:
        print("❌ YouTube upload failed.")
