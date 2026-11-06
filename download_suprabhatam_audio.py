import os
import sys
import subprocess
import yt_dlp
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
base_dir = os.path.dirname(os.path.abspath(__file__))
audio_dir = os.path.join(base_dir, "audio")
os.makedirs(audio_dir, exist_ok=True)

out_5min = os.path.join(audio_dir, "venkateswara_suprabhatam_5min.mp3")

# URL of authentic MS Subbulakshmi / Tirumala Suprabhatam
video_url = "https://www.youtube.com/watch?v=krGYd5tZe0A"

ydl_opts = {
    'format': 'bestaudio/best',
    'outtmpl': os.path.join(audio_dir, 'suprabhatam_source.%(ext)s'),
    'quiet': False,
    'ffmpeg_location': os.path.dirname(ffmpeg_exe)
}

print("Downloading sacred Sri Venkateswara Suprabhatam audio...")
with yt_dlp.YoutubeDL(ydl_opts) as ydl:
    info = ydl.extract_info(video_url, download=True)
    source_ext = info.get('ext', 'webm')
    source_file = os.path.join(audio_dir, f"suprabhatam_source.{source_ext}")

print(f"Downloaded source: {source_file}")

# Cut exactly 5:00.00 (300.00s) with gentle 2.5s fade out at the end and encode at 320kbps
print("Trimming exact 5-minute continuous sacred Suprabhatam audio (300.00s)...")
trim_cmd = [
    ffmpeg_exe, '-y',
    '-ss', '0.0',
    '-t', '300.0',
    '-i', source_file,
    '-filter_complex', '[0:a]afade=t=in:st=0:d=1.0,afade=t=out:st=297.5:d=2.5[aout]',
    '-map', '[aout]',
    '-c:a', 'libmp3lame',
    '-b:a', '320k',
    out_5min
]

subprocess.run(trim_cmd, check=True)
print(f"5-Minute Suprabhatam Audio Ready: {out_5min} ({os.path.getsize(out_5min)/(1024*1024):.2f} MB)")
