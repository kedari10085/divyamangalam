#!/usr/bin/env python3
import os
import sys
import pickle
import subprocess
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse
from google_auth_oauthlib.flow import InstalledAppFlow
from upload_to_youtube import upload_video

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
client_secrets = os.path.join(BASE_DIR, "client_secrets.json")
token_path = os.path.join(BASE_DIR, "yt_token.pickle")
SCOPES = ['https://www.googleapis.com/auth/youtube.upload']

print("Initializing OAuth Flow...")
sys.stdout.flush()

flow = InstalledAppFlow.from_client_secrets_file(client_secrets, SCOPES)
flow.redirect_uri = 'http://localhost:8080/'

auth_url, _ = flow.authorization_url(prompt='consent', access_type='offline')
print("\n" + "="*70)
print("CLICKABLE_URL_START")
print(auth_url)
print("CLICKABLE_URL_END")
print("="*70 + "\n")
sys.stdout.flush()

# Attempt to launch the default browser via Windows PowerShell
try:
    subprocess.Popen(["powershell", "-WindowStyle", "Hidden", "-Command", f"Start-Process '{auth_url}'"])
    print("[INFO] Attempted to launch default browser via Windows.")
except Exception as e:
    print(f"[WARNING] Could not auto-open browser: {e}")
sys.stdout.flush()

class OAuthCallbackHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass # Silence standard HTTP logs

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
                b"<h1 style='color:#38bdf8;font-size:32px;'>&#10004; Authorization Successful!</h1>"
                b"<p style='font-size:18px;'>Your YouTube account has been connected to Divya Mangalam.</p>"
                b"<p style='color:#94a3b8;'>You can close this browser tab now. The video upload is starting automatically...</p>"
                b"</body></html>"
            )
        else:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Authorization failed.")

server = HTTPServer(('127.0.0.1', 8080), OAuthCallbackHandler)
server.auth_code = None
print("Waiting for authorization callback on http://127.0.0.1:8080/ ...")
sys.stdout.flush()

# Wait for 1 callback request
while server.auth_code is None:
    server.handle_request()

print("Authorization code received! Exchanging for tokens...")
sys.stdout.flush()
flow.fetch_token(code=server.auth_code)
creds = flow.credentials

with open(token_path, 'wb') as token_file:
    pickle.dump(creds, token_file)

print(f"SUCCESS! YouTube token saved permanently to {token_path}")
sys.stdout.flush()

# Upload video (supports optional --video argument, defaults to latest Karthika Deepotsavam 2-Min Landscape Cinema)
import argparse as _ap
_p = _ap.ArgumentParser(add_help=False)
_p.add_argument("--video", default=os.path.join(BASE_DIR, "images", "shiva_karthika_deepotsavam_2min_landscape.mp4"))
_p.add_argument("--meta", default=os.path.join(BASE_DIR, "images", "shiva_karthika_deepotsavam_2min_youtube_metadata.json"))
_a, _ = _p.parse_known_args()
upload_video(_a.video, _a.meta if os.path.exists(_a.meta) else None)
