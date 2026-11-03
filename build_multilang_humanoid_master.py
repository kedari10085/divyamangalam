#!/usr/bin/env python3
"""
Divya Mangalam — Srimad Mahabharata Part 1: Adi Parva
Master 1080p Landscape Humanoid Motion Video with Multi-Language Audio Tracks (EN, TE, HI)
"""

import os
import sys
import subprocess
import json
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

TEMP_DIR = os.path.join(BASE_DIR, "temp_mahabharata_multilang")
os.makedirs(TEMP_DIR, exist_ok=True)

final_output = os.path.join(BASE_DIR, "images", "mahabharata_part1_adi_parva_action_multilang_1080p.mp4")

# 1. Concat video segments
print("🎞️ STEP 1: CONCATENATING 6 HUMANOID ACTION SEGMENTS...")
video_concat_txt = os.path.join(TEMP_DIR, "video_concat.txt")
segs = [
    'seg1_vyasa_origins.mp4',
    'seg2_bhishma_oath.mp4',
    'seg3_drona_gurukula.mp4',
    'seg4_lakshagriha_fire.mp4',
    'seg5_swayamvara_action.mp4',
    'seg6_indraprastha_gandiva.mp4'
]

with open(video_concat_txt, "w", encoding="utf-8") as f:
    for s in segs:
        p = os.path.join(TEMP_DIR, s).replace("\\", "/")
        f.write(f"file '{p}'\n")

raw_video = os.path.join(TEMP_DIR, "raw_video_track.mp4")
subprocess.run([
    ffmpeg, '-y', '-f', 'concat', '-safe', '0',
    '-i', video_concat_txt, '-c', 'copy', raw_video
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# Get video duration
dur_res = subprocess.run([ffmpeg, '-i', raw_video], capture_output=True, text=True)
video_dur = 176.0
for line in dur_res.stderr.split('\n'):
    if 'Duration:' in line:
        t_str = line.split('Duration:')[1].split(',')[0].strip()
        h, m, s = t_str.split(':')
        video_dur = float(h)*3600 + float(m)*60 + float(s)
        break
print(f"🎬 Video Duration: {video_dur:.2f}s (~{video_dur/60:.2f} minutes)")

# 2. Align each of the 3 audio tracks (EN, TE, HI) to exact video duration
print("\n🎵 STEP 2: PADDING & ALIGNING 3 MULTI-LANGUAGE AUDIO TRACKS...")
audio_tracks = {}
bg_music = os.path.join(BASE_DIR, "audio", "ramayan_5min_musical.mp3")

for lang in ["en", "te", "hi"]:
    in_audio = os.path.join(TEMP_DIR, f"mahabharata_adi_parva_{lang}.mp3")
    out_aligned = os.path.join(TEMP_DIR, f"aligned_track_{lang}.aac")
    
    # Mix voiceover with continuous background music exactly for video_dur seconds
    cmd = [
        ffmpeg, '-y',
        '-t', str(video_dur), '-i', in_audio,
        '-stream_loop', '-1', '-t', str(video_dur), '-i', bg_music,
        '-filter_complex',
        f"[1:a]volume=0.14,afade=t=out:st={video_dur-2.5}:d=2.5[bg];"
        f"[0:a]volume=1.0[vox];"
        f"[vox][bg]amix=inputs=2:duration=first:dropout_transition=2,apad[out]",
        '-map', '[out]',
        '-t', str(video_dur),
        '-c:a', 'aac', '-b:a', '192k',
        out_aligned
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    audio_tracks[lang] = out_aligned
    print(f"  ✅ {lang.upper()} Aligned Audio Track Ready: {out_aligned} ({os.path.getsize(out_aligned)/1024:.1f} KB)")

# 3. Multiplex video with all 3 selectable language audio tracks
print("\n🚀 STEP 3: MULTIPLEXING 1080P VIDEO WITH 3 MULTI-LANGUAGE AUDIO TRACKS...")
mux_cmd = [
    ffmpeg, '-y',
    '-i', raw_video,
    '-i', audio_tracks["en"],
    '-i', audio_tracks["te"],
    '-i', audio_tracks["hi"],
    '-map', '0:v',
    '-map', '1:a',
    '-map', '2:a',
    '-map', '3:a',
    '-c:v', 'copy',
    '-c:a', 'copy',
    '-metadata:s:a:0', 'language=eng',
    '-metadata:s:a:0', 'title=English (Original)',
    '-metadata:s:a:1', 'language=tel',
    '-metadata:s:a:1', 'title=Telugu (తెలుగు)',
    '-metadata:s:a:2', 'language=hin',
    '-metadata:s:a:2', 'title=Hindi (हिन्दी)',
    '-shortest',
    final_output
]

subprocess.run(mux_cmd, check=True)
size_mb = os.path.getsize(final_output) / (1024 * 1024)
print(f"\n🎉 MULTI-LANGUAGE MASTER CREATED: {final_output}")
print(f"📊 Final File Size: {size_mb:.2f} MB")

# 4. Generate Subtitles in 3 Languages (.srt)
print("\n📝 STEP 4: GENERATING SUBTITLES IN ENGLISH, TELUGU & HINDI...")
timestamps = [
    (0.0, 30.0),
    (30.0, 60.0),
    (60.0, 88.0),
    (88.0, 118.0),
    (118.0, 148.0),
    (148.0, video_dur)
]

def format_srt_time(seconds):
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"

from generate_multilang_audio_tracks import SCRIPTS

for lang in ["en", "te", "hi"]:
    srt_path = os.path.join(BASE_DIR, "images", f"mahabharata_part1_subtitles_{lang}.srt")
    lines = SCRIPTS[lang]
    with open(srt_path, "w", encoding="utf-8") as srt_file:
        for idx, (start_t, end_t) in enumerate(timestamps, 1):
            text = lines[idx-1]
            srt_file.write(f"{idx}\n")
            srt_file.write(f"{format_srt_time(start_t)} --> {format_srt_time(end_t)}\n")
            srt_file.write(f"{text}\n\n")
    print(f"  ✅ Subtitles ({lang.upper()}) Created: {srt_path}")

# 5. Generate Multi-Language YouTube SEO Metadata
meta = {
    "title": "Srimad Mahabharata Part 1: Adi Parva (Telugu • Hindi • English Multi-Audio) | Full 1080p Movie | Divya Mangalam",
    "description": (
        "🕉️ Srimad Mahabharata Part 1: Adi Parva (The Book of the Beginning)\n"
        "Experience the epic in FULL 1080p with Humanoid Motion and Multi-Language Audio!\n\n"
        "🎧 SELECT YOUR AUDIO LANGUAGE IN YOUTUBE SETTINGS (⚙️ Audio Track):\n"
        "1. English (Original)\n"
        "2. Telugu (తెలుగు వ్యాఖ్యానం)\n"
        "3. Hindi (हिन्दी कथा)\n\n"
        "⏳ CHAPTER TIMESTAMPS:\n"
        "00:00 - Chapter 1: The Divine Beginning & Maharshi Vyasa (అనుక్రమణికా పర్వము)\n"
        "00:30 - Chapter 2: Bhishma Pitamaha's Terrible Vow (భీష్మ ప్రతిజ్ఞ / अंशवतरण)\n"
        "01:00 - Chapter 3: Guru Dronacharya & Arjuna's Focus (ద్రోణ శిక్షణ / सम्भव पर्व)\n"
        "01:28 - Chapter 4: The House of Lac & Bhima's Heroic Escape (లక్కఇంటి దహనం / जतुगृहदाह)\n"
        "01:58 - Chapter 5: Draupadi Swayamvara & Matsya Yantra (మత్స్యయంత్ర ఛేదన / द्रौपदी स्वयंवर)\n"
        "02:28 - Chapter 6: Indraprastha & The Divine Gandiva Bow (ఖాండవ వన దహనం / खाण्डवदाह)\n\n"
        "🌸 Explore Complete Canonical 18 Parvas & Vedic Tools at:\n"
        "Website: https://divyamangalam.com/mahabharata.html\n"
        "Instagram: @divyamangalam.info\n\n"
        "#Mahabharata #AdiParva #MahabharatInTelugu #MahabharatInHindi #Arjuna #Bhishma #Krishna #Draupadi #SanatanaDharma #DivyaMangalam"
    ),
    "tags": [
        "Mahabharata", "Adi Parva", "Mahabharat Full Movie", "Mahabharatam Telugu", 
        "Mahabharat Hindi", "Arjuna", "Bhishma Pratigya", "Draupadi Swayamvara", 
        "Indraprastha", "Lord Krishna", "Veda Vyasa", "Sanatana Dharma", "Divya Mangalam"
    ],
    "category": "22",
    "privacyStatus": "public"
}

meta_path = os.path.join(BASE_DIR, "images", "mahabharata_part1_action_youtube_metadata.json")
with open(meta_path, "w", encoding="utf-8") as f:
    json.dump(meta, f, indent=2, ensure_ascii=False)
print(f"\n📝 YouTube SEO Metadata Created: {meta_path}")

print("\n🎉 ALL DELIVERABLES FINISHED SUCCESSFULLY!")
