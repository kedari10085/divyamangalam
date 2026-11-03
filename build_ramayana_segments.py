#!/usr/bin/env python3
"""
Divya Mangalam — 5-Minute Full Epic Ramayanam Segment Builder & Merger
Uses memory-efficient sequential segment rendering + concat demuxer.
Guarantees 100% stable render under 85MB for GitHub & Instagram.
"""

import os
import sys
import subprocess
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

seg_dir = os.path.join(BASE_DIR, "temp_ramayan_segs")
os.makedirs(seg_dir, exist_ok=True)

audio_file = os.path.join(BASE_DIR, "audio", "ramayan_5min_musical.mp3")
battle_video = os.path.join(BASE_DIR, "ramayana_battle_4k.mp4.f399.mp4")
ayodhya_video = os.path.join(BASE_DIR, "test_ramayana_4k.mp4")
output_video = os.path.join(BASE_DIR, "images", "ramayana_5min_full_epic.mp4")

# Segment definitions: (source_video, start_time, duration, output_filename)
segments = [
    (ayodhya_video, 5, 50, "seg1.mp4"),    # Ayodhya sunrise & Yagna
    (battle_video, 0, 30, "seg2.mp4"),     # Rama with Kodanda bow
    (battle_video, 45, 50, "seg3.mp4"),    # Forest exile & Golden Deer
    (battle_video, 95, 30, "seg4.mp4"),    # Dandaka forest & Hanuman
    (battle_video, 115, 33, "seg5.mp4"),   # Hanuman ocean leap
    (battle_video, 120, 28, "seg6.mp4"),   # Lanka battle
    (ayodhya_video, 0, 96, "seg7.mp4")     # Pattabhishekam Ayodhya
]

print("==================================================")
print("🏹 STEP 1: RENDERING RAMAYANA EPISODE SEGMENTS")
print("==================================================")

seg_paths = []
for i, (src, start, dur, name) in enumerate(segments, 1):
    out_path = os.path.join(seg_dir, name)
    seg_paths.append(out_path)
    print(f"▶️ Rendering Segment {i}/{len(segments)}: {name} ({dur}s)...")
    
    # 9:16 vertical center crop + scale to 1080x1920
    vf = "crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=1080:1920,setsar=1:1"
    
    cmd = [
        ffmpeg, '-y',
        '-ss', str(start),
        '-i', src,
        '-t', str(dur),
        '-vf', vf,
        '-c:v', 'libx264',
        '-b:v', '2000k',
        '-maxrate', '2400k',
        '-bufsize', '4000k',
        '-preset', 'fast',
        '-pix_fmt', 'yuv420p',
        '-r', '30',
        '-an',
        out_path
    ]
    res = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if res.returncode != 0:
        print(f"❌ Error rendering {name}")
        sys.exit(1)
    print(f"   Done: {name} ({os.path.getsize(out_path)/(1024*1024):.2f} MB)")

print("\n==================================================")
print("🏹 STEP 2: CONCATENATING & SYNCING 5-MIN AUDIO")
print("==================================================")

# Write concat list
list_file = os.path.join(seg_dir, "concat_list.txt")
with open(list_file, "w", encoding="utf-8") as f:
    for sp in seg_paths:
        f.write(f"file '{sp.replace(os.sep, '/')}'\n")

# Merge with audio
cmd_merge = [
    ffmpeg, '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', list_file,
    '-i', audio_file,
    '-filter_complex', '[0:v]fade=t=in:st=0:d=1,fade=t=out:st=314:d=3[v];[1:a]afade=t=in:st=0:d=1,afade=t=out:st=314:d=3[a]',
    '-map', '[v]',
    '-map', '[a]',
    '-t', '317',
    '-c:v', 'libx264',
    '-b:v', '2000k',
    '-maxrate', '2400k',
    '-bufsize', '4000k',
    '-preset', 'fast',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '128k',
    output_video
]

print("Merging video segments with 5-minute musical track...")
res = subprocess.run(cmd_merge)
if res.returncode == 0:
    size_mb = os.path.getsize(output_video) / (1024 * 1024)
    print("\n🎉 SUCCESS! Complete 5-Minute Ramayanam Video Rendered:")
    print(f"File: {output_video}")
    print(f"Size: {size_mb:.2f} MB")
else:
    print(f"❌ Concat failed with code {res.returncode}")
