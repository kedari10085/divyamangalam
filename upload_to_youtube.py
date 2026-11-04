#!/usr/bin/env python3
"""
Divya Mangalam — YouTube Automated Uploader (YouTube Data API v3)
Uploads videos directly to YouTube Shorts / Channels with SEO metadata.
"""

import os
import sys
import json
import argparse

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def upload_video(video_path, metadata_path=None):
    if not os.path.exists(video_path):
        print(f"Error: Video file not found at {video_path}")
        return False

    if metadata_path is None:
        metadata_path = video_path.replace('.mp4', '_youtube_metadata.json')

    if os.path.exists(metadata_path):
        with open(metadata_path, 'r', encoding='utf-8') as f:
            meta = json.load(f)
    else:
        meta = {
            "title": "Divya Mangalam — Daily Sacred Darshan & Panchang",
            "description": "Daily Vedic Blessings from Divya Mangalam.\nhttps://divyamangalam.com\n#Shorts #DivyaMangalam",
            "tags": ["Divya Mangalam", "Vedic Astrology", "Shorts"],
            "category": "22", # People & Blogs
            "privacyStatus": "public"
        }

    print("==================================================")
    print("[YOUTUBE PUBLISHER] Divya Mangalam Video Engine")
    print("==================================================")
    print(f"File: {video_path} ({os.path.getsize(video_path) / (1024*1024):.2f} MB)")
    print(f"Title: {meta.get('title')}")
    print(f"Tags: {', '.join(meta.get('tags', []))}")
    print(f"Privacy: {meta.get('privacyStatus', 'public')}")
    print("--------------------------------------------------")

    token_path = os.path.join(os.path.dirname(__file__), "yt_token.pickle")
    
    # Restore token from environment variable if in cloud (GitHub Actions / Colab)
    yt_token_b64 = os.getenv("YOUTUBE_TOKEN_BASE64")
    if yt_token_b64 and not os.path.exists(token_path):
        import base64
        try:
            with open(token_path, "wb") as f:
                f.write(base64.b64decode(yt_token_b64))
            print("🔑 Successfully restored YouTube OAuth credentials from YOUTUBE_TOKEN_BASE64 environment secret!")
        except Exception as e:
            print(f"⚠️ Warning: Could not decode YOUTUBE_TOKEN_BASE64: {e}")

    client_secrets = os.path.join(os.path.dirname(__file__), "client_secrets.json")
    if not os.path.exists(token_path) and not os.path.exists(client_secrets):
        print("\n[ONE-TIME YOUTUBE API SETUP INSTRUCTIONS]")
        print("1. Go to Google Cloud Console: https://console.cloud.google.com/")
        print("2. Create a project and enable 'YouTube Data API v3'.")
        print("3. Go to 'Credentials' -> Create OAuth 2.0 Client ID (Desktop app).")
        print("4. Download JSON and save it as 'client_secrets.json' in this folder.")
        print("5. Run this script again to authenticate and auto-upload!")
        print("\n[INSTANT MANUAL UPLOAD]:")
        print(f"You can upload '{os.path.basename(video_path)}' directly at https://studio.youtube.com")
        print(f"Title & description are pre-formatted in '{os.path.basename(metadata_path)}'.")
        return False

    try:
        from googleapiclient.discovery import build
        from googleapiclient.http import MediaFileUpload
        from google_auth_oauthlib.flow import InstalledAppFlow
        from google.auth.transport.requests import Request
        import pickle

        SCOPES = ['https://www.googleapis.com/auth/youtube.upload']
        creds = None
        if os.path.exists(token_path):
            with open(token_path, 'rb') as token_file:
                creds = pickle.load(token_file)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            elif os.path.exists(client_secrets):
                flow = InstalledAppFlow.from_client_secrets_file(client_secrets, SCOPES)
                creds = flow.run_local_server(port=0)
            else:
                print("❌ No valid YouTube credentials found to refresh.")
                return False
            with open(token_path, 'wb') as token_file:
                pickle.dump(creds, token_file)

        youtube = build('youtube', 'v3', credentials=creds)
        body = {
            'snippet': {
                'title': meta.get('title'),
                'description': meta.get('description'),
                'tags': meta.get('tags'),
                'categoryId': '22'
            },
            'status': {
                'privacyStatus': meta.get('privacyStatus', 'public'),
                'selfDeclaredMadeForKids': False
            }
        }

        media = MediaFileUpload(video_path, chunksize=1024*1024*4, resumable=True, mimetype='video/mp4')
        request = youtube.videos().insert(part=','.join(body.keys()), body=body, media_body=media)
        print("Uploading to YouTube...")
        response = None
        while response is None:
            status, response = request.next_chunk()
            if status:
                print(f"  Uploading: {int(status.progress() * 100)}% complete...")
        yt_id = response.get('id')
        print(f"SUCCESS! Uploaded to YouTube: https://youtu.be/{yt_id}")
        return yt_id
    except Exception as e:
        print(f"YouTube upload failed: {e}")
        return False

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Upload Video to YouTube")
    parser.add_argument('--video', type=str, default="images/divyamangalam_youtube_shorts.mp4")
    parser.add_argument('--meta', type=str, default=None)
    args = parser.parse_args()
    upload_video(args.video, args.meta)
