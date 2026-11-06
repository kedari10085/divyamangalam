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

# 1. Download Harivarasanam by KJ Yesudas (zYXuxap3jzE)
video_url = "https://www.youtube.com/watch?v=zYXuxap3jzE"
harivarasanam_source = os.path.join(audio_dir, "harivarasanam_source.webm")

if not os.path.exists(harivarasanam_source):
    print("Downloading authentic Harivarasanam (K.J. Yesudas Sabarimala Master)...")
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': os.path.join(audio_dir, 'harivarasanam_source.%(ext)s'),
        'quiet': False
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(video_url, download=True)
        ext = info.get('ext', 'webm')
        harivarasanam_source = os.path.join(audio_dir, f"harivarasanam_source.{ext}")

print(f"Harivarasanam source ready: {harivarasanam_source}")

# Convert Veeramani "Swamiye Saranam Ayyappa" webm to mp3
veeramani_source = os.path.join(audio_dir, "swamiye_saranam_ayyappa_veeramani.webm")
veeramani_mp3 = os.path.join(audio_dir, "swamiye_saranam_ayyappa_veeramani.mp3")

if os.path.exists(veeramani_source) and not os.path.exists(veeramani_mp3):
    print("Encoding Veeramani MP3...")
    subprocess.run([
        ffmpeg_exe, '-y',
        '-i', veeramani_source,
        '-c:a', 'libmp3lame',
        '-b:a', '320k',
        veeramani_mp3
    ], check=True)

# Also create 5-minute Master for Harivarasanam
harivarasanam_5min = os.path.join(audio_dir, "harivarasanam_ayyappa_5min.mp3")
print("Trimming 5-minute Harivarasanam audio...")
subprocess.run([
    ffmpeg_exe, '-y',
    '-ss', '0.0',
    '-t', '300.0',
    '-i', harivarasanam_source,
    '-filter_complex', '[0:a]afade=t=in:st=0:d=1.0,afade=t=out:st=297.5:d=2.5[aout]',
    '-map', '[aout]',
    '-c:a', 'libmp3lame',
    '-b:a', '320k',
    harivarasanam_5min
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# Also create 5-minute Master for Swamiye Saranam Ayyappa (Pallikattu)
veeramani_5min = os.path.join(audio_dir, "swamiye_saranam_ayyappa_5min.mp3")
if os.path.exists(veeramani_source):
    print("Trimming 5-minute Swamiye Saranam Ayyappa audio...")
    subprocess.run([
        ffmpeg_exe, '-y',
        '-ss', '0.0',
        '-t', '300.0',
        '-i', veeramani_source,
        '-filter_complex', '[0:a]afade=t=in:st=0:d=1.0,afade=t=out:st=297.5:d=2.5[aout]',
        '-map', '[aout]',
        '-c:a', 'libmp3lame',
        '-b:a', '320k',
        veeramani_5min
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

print("Audio processing complete!")
