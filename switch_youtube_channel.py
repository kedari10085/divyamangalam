#!/usr/bin/env python3
"""
Divya Mangalam — YouTube Account Switcher
Switches the YouTube Data API token to divyamangalam.info@gmail.com (or any chosen brand channel).
"""

import os
import sys
import shutil
import pickle
import subprocess
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse
from google_auth_oauthlib.flow import InstalledAppFlow

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
client_secrets = os.path.join(BASE_DIR, "client_secrets.json")
token_path = os.path.join(BASE_DIR, "yt_token.pickle")
backup_path = os.path.join(BASE_DIR, "yt_token_backup.pickle")

SCOPES = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube.readonly'
]

if not os.path.exists(client_secrets):
    print("❌ Error: client_secrets.json not found in", BASE_DIR)
    sys.exit(1)

# Backup old token if it exists
if os.path.exists(token_path):
    shutil.copy2(token_path, backup_path)
    os.remove(token_path)
    print("ℹ️ Existing token backed up to:", os.path.basename(backup_path))

print("\n" + "="*70)
print("🔗 DIVYA MANGALAM — YOUTUBE CHANNEL SWITCHER")
print("Target Account: divyamangalam.info@gmail.com")
print("="*70)

flow = InstalledAppFlow.from_client_secrets_file(client_secrets, SCOPES)
flow.redirect_uri = 'http://localhost:8080/'

auth_url, _ = flow.authorization_url(prompt='select_account', access_type='offline')

print("\n👉 STEP 1: Click the URL below (or it will auto-open in your browser):")
print("-" * 70)
print(auth_url)
print("-" * 70)
print("\n👉 STEP 2: Sign in with: divyamangalam.info@gmail.com")
print("👉 STEP 3: Select your Divya Mangalam YouTube Channel & click 'Allow'.\n")
sys.stdout.flush()

try:
    subprocess.Popen(["powershell", "-WindowStyle", "Hidden", "-Command", f"Start-Process '{auth_url}'"])
    print("🌐 Browser launched automatically!")
except Exception as e:
    print("⚠️ Could not auto-launch browser. Please copy and paste the link above into your browser.")

class OAuthCallbackHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def do_GET(self):
        query = urllib.parse.urlparse(self.path).query
        params = urllib.parse.parse_qs(query)
        if 'code' in params:
            self.server.auth_code = params['code'][0]
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(
                b"<html><body style='font-family:system-ui,sans-serif;text-align:center;padding:60px;background:#0f172a;color:#f8fafc;'>"
                b"<h1 style='color:#38bdf8;font-size:32px;'>&#10004; Channel Connected Successfully!</h1>"
                b"<p style='font-size:18px;'>Your Divya Mangalam YouTube channel is now connected.</p>"
                b"<p style='color:#94a3b8;'>All automated and scheduled videos will now upload directly to this channel.</p>"
                b"<p style='color:#64748b;font-size:14px;'>You can close this window now.</p>"
                b"</body></html>"
            )
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Authorization failed.")

server = HTTPServer(('127.0.0.1', 8080), OAuthCallbackHandler)
server.auth_code = None
print("⏳ Waiting for authorization callback on http://127.0.0.1:8080/ ...")
sys.stdout.flush()

while server.auth_code is None:
    server.handle_request()

print("\n🔑 Authorization code received! Exchanging for tokens...")
sys.stdout.flush()
flow.fetch_token(code=server.auth_code)
creds = flow.credentials

with open(token_path, 'wb') as token_file:
    pickle.dump(creds, token_file)

print(f"\n🎉 SUCCESS! YouTube token successfully saved to {token_path}")
print("All future uploads are now linked to divyamangalam.info@gmail.com!")
