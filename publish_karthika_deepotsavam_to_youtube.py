#!/usr/bin/env python3
"""
Divya Mangalam — Karthika Deepotsavam Lord Shiva 2-Minute Landscape YouTube Publisher
Uploads the 1920x1080 Full HD 16:9 widescreen cinema master to YouTube.
"""

import os
import sys

from upload_to_youtube import upload_video

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VIDEO_FILE = os.path.join(BASE_DIR, "images", "shiva_karthika_deepotsavam_2min_landscape.mp4")
META_FILE = os.path.join(BASE_DIR, "images", "shiva_karthika_deepotsavam_2min_youtube_metadata.json")


def main() -> int:
    print("==================================================")
    print("🪔 DIVYA MANGALAM — KARTHIKA DEEPOTSAVAM YOUTUBE PUBLISHER")
    print("Video: 1920x1080 Full HD Landscape (2-Minute Cinema Master)")
    print("==================================================")

    if not os.path.exists(VIDEO_FILE):
        print(f"❌ Error: Video not found at {VIDEO_FILE}")
        return 1

    yt_id = upload_video(VIDEO_FILE, META_FILE)
    if yt_id:
        print(f"🎉 Uploaded successfully to YouTube: https://youtu.be/{yt_id}")
        return 0
    print("⚠️ YouTube upload requires active OAuth authorization (run `python start_auth_and_upload.py` if invalid_grant).")
    return 1


if __name__ == "__main__":
    sys.exit(main())
