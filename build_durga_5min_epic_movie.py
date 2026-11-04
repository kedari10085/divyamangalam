#!/usr/bin/env python3
"""
Divya Mangalam — Aigiri Nandini (Mahishasura Mardini) 5-Minute Epic Film
Full HD 1080p Landscape Widescreen Movie with Continuous Sacred Musical Hymn
Zero Voiceover / Narration — 100% Pure Sacred Song & Cinematic Action
"""

import os
import sys
import subprocess
import json
import imageio_ffmpeg
from PIL import Image, ImageDraw, ImageFont

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMP_DIR = os.path.join(BASE_DIR, "temp_durga_assets")
IMAGES_DIR = os.path.join(BASE_DIR, "images")
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

# Final Output Path
final_output = os.path.join(IMAGES_DIR, "durga_aigiri_nandini_5min_epic.mp4")

# 8 Canonical Story Segments totaling exactly 300.0s (5:00)
SEGMENTS = [
    {
        "id": 1,
        "src": "aigiri_trance_story.f399.mp4",
        "start": 10.0,
        "duration": 40.0,
        "title": "महिषासुर आतंक",
        "subtitle": "Chapter 1: The Reign & Terror of Demon Mahishasura"
    },
    {
        "id": 2,
        "src": "aigiri_trance_story.f399.mp4",
        "start": 90.0,
        "duration": 35.0,
        "title": "देवानाम प्रार्थना • त्रिमूर्ति",
        "subtitle": "Chapter 2: Devas Pray to Lord Shiva, Vishnu & Brahma"
    },
    {
        "id": 3,
        "src": "durga_3d_origin.f137.mp4",
        "start": 12.0,
        "duration": 42.0,
        "title": "माँ दुर्गा प्राकट्य • अस्त्र प्रदान",
        "subtitle": "Chapter 3: Emergence of Devi Durga & Bestowal of Divine Weapons"
    },
    {
        "id": 4,
        "src": "aigiri_trance_story.f399.mp4",
        "start": 165.0,
        "duration": 38.0,
        "title": "सिंहवाहिनी प्रयाण",
        "subtitle": "Chapter 4: Devi Rides Her Golden Lion into the Cosmic Battlefield"
    },
    {
        "id": 5,
        "src": "durga_3d_origin.f137.mp4",
        "start": 115.0,
        "duration": 35.0,
        "title": "महासंग्राम • रौद्र तांडव",
        "subtitle": "Chapter 5: The Thunderous Clash against the Demon King"
    },
    {
        "id": 6,
        "src": "aigiri_trance_story.f399.mp4",
        "start": 335.0,
        "duration": 40.0,
        "title": "असुर सैन्य संहार",
        "subtitle": "Chapter 6: Cosmic Shockwave & Decimation of the Asura Hordes"
    },
    {
        "id": 7,
        "src": "durga_3d_origin.f137.mp4",
        "start": 170.0,
        "duration": 32.0,
        "title": "त्रिशूल प्रहार • महिषासुर मर्दिनी",
        "subtitle": "Chapter 7: The Fatal Trishula Strike & Fall of Mahishasura"
    },
    {
        "id": 8,
        "src": "aigiri_trance_story.f399.mp4",
        "start": 420.0,
        "duration": 38.0,
        "title": "धर्म विजय • जय माँ दुर्गे",
        "subtitle": "Chapter 8: Eternal Triumph of Dharma & Celestial Celebration"
    }
]

total_duration = sum(s["duration"] for s in SEGMENTS)
print(f"🎬 Total Video Duration: {total_duration:.2f}s (Exactly 5:00 minutes)")

# STEP 1: Render Title Banners for each segment using PIL
print("\n🎨 STEP 1: RENDERING CINEMATIC DEVOTIONAL BANNERS...")
OVERLAYS_DIR = os.path.join(TEMP_DIR, "title_overlays")
os.makedirs(OVERLAYS_DIR, exist_ok=True)

def create_title_overlay(title, subtitle, out_png):
    img = Image.new("RGBA", (1920, 1080), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Try finding high quality fonts
    font_title = None
    font_sub = None
    for f_path in ["C:/Windows/Fonts/nirmala.ttf", "C:/Windows/Fonts/mangal.ttf", "C:/Windows/Fonts/arial.ttf"]:
        if os.path.exists(f_path):
            try:
                font_title = ImageFont.truetype(f_path, 44)
                font_sub = ImageFont.truetype(f_path, 26)
                break
            except:
                pass
    if not font_title:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    # Bottom banner translucent background with gold trim
    box_top = 940
    box_bottom = 1045
    draw.rectangle([(280, box_top), (1640, box_bottom)], fill=(15, 8, 4, 185))
    draw.rectangle([(280, box_top), (1640, box_top + 3)], fill=(212, 160, 23, 230))
    draw.rectangle([(280, box_bottom - 2), (1640, box_bottom)], fill=(212, 160, 23, 230))
    
    # Sacred Om / Trident icon prefix
    draw.text((960, box_top + 10), title, font=font_title, fill=(255, 230, 130, 255), anchor="mt")
    draw.text((960, box_top + 62), subtitle, font=font_sub, fill=(255, 245, 235, 230), anchor="mt")
    
    # Top-Left Sacred Brand Badge
    draw.rectangle([(40, 35), (340, 85)], fill=(15, 8, 4, 175))
    draw.rectangle([(40, 35), (340, 37)], fill=(212, 160, 23, 220))
    draw.text((190, 48), "🕉️ DIVYA MANGALAM", font=font_sub, fill=(255, 215, 0, 255), anchor="mt")
    
    img.save(out_png)

overlay_files = []
for seg in SEGMENTS:
    out_overlay = os.path.join(OVERLAYS_DIR, f"overlay_{seg['id']}.png")
    create_title_overlay(seg["title"], seg["subtitle"], out_overlay)
    overlay_files.append(out_overlay)
    print(f"  ✅ Banner {seg['id']} created: {seg['title']}")

# STEP 2: Cut, Scale & Overlay Each Segment
print("\n✂️ STEP 2: CUTTING & FILTERING 8 CINEMATIC SEGMENTS...")
rendered_segments = []

for idx, seg in enumerate(SEGMENTS):
    src_path = os.path.join(TEMP_DIR, seg["src"])
    out_seg = os.path.join(TEMP_DIR, f"processed_seg_{seg['id']}.mp4")
    overlay_png = overlay_files[idx].replace("\\", "/")
    
    # Banner fades in for first 5 seconds of the segment, then fades out smoothly
    banner_duration = min(6.0, seg["duration"])
    
    filter_complex = (
        f"[0:v]scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1,fps=30[base];"
        f"[1:v]format=rgba,fade=t=in:st=0:d=1.0:alpha=1,fade=t=out:st={banner_duration-1.0}:d=1.0:alpha=1[banner];"
        f"[base][banner]overlay=0:0[vfinal]"
    )
    
    cmd = [
        ffmpeg, '-y',
        '-ss', str(seg["start"]),
        '-t', str(seg["duration"]),
        '-i', src_path,
        '-i', overlay_png,
        '-filter_complex', filter_complex,
        '-map', '[vfinal]',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '19',
        '-an',
        out_seg
    ]
    
    print(f"  Rendering Segment {seg['id']}/{len(SEGMENTS)}: {seg['title']} ({seg['duration']}s)...")
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    rendered_segments.append(out_seg)
    print(f"  ✅ Segment {seg['id']} ready ({os.path.getsize(out_seg)/(1024*1024):.1f} MB)")

# STEP 3: Concatenate All 8 Segments
print("\n🔗 STEP 3: CONCATENATING ALL 8 SEGMENTS INTO 5-MINUTE MASTER VIDEO...")
concat_txt = os.path.join(TEMP_DIR, "durga_concat_list.txt")
with open(concat_txt, "w", encoding="utf-8") as f:
    for seg_p in rendered_segments:
        safe_p = seg_p.replace("\\", "/")
        f.write(f"file '{safe_p}'\n")

raw_video = os.path.join(TEMP_DIR, "durga_5min_raw_video.mp4")
subprocess.run([
    ffmpeg, '-y',
    '-f', 'concat', '-safe', '0',
    '-i', concat_txt,
    '-c', 'copy',
    raw_video
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# STEP 4: Mux with 5-Minute Aigiri Nandini Sacred Audio Track
print("\n🎵 STEP 4: MULTIPLEXING 5-MINUTE AIGIRI NANDINI SOUNDTRACK...")
audio_5min = os.path.join(TEMP_DIR, "aigiri_song_5min.mp3")

# Ensure audio fades out gently at the end
mux_cmd = [
    ffmpeg, '-y',
    '-i', raw_video,
    '-i', audio_5min,
    '-filter_complex', '[1:a]afade=t=out:st=297.0:d=3.0[aout]',
    '-map', '0:v',
    '-map', '[aout]',
    '-c:v', 'copy',
    '-c:a', 'aac',
    '-b:a', '320k',
    '-t', '300.0',
    final_output
]

subprocess.run(mux_cmd, check=True)
size_mb = os.path.getsize(final_output) / (1024 * 1024)
print(f"\n🎉 5-MINUTE EPIC AIGIRI NANDINI MOVIE COMPLETED!")
print(f"📁 Output: {final_output}")
print(f"📊 Size: {size_mb:.2f} MB")
print(f"⏱️ Duration: 300.00 seconds (5:00 minutes)")

# STEP 5: Generate Rich YouTube & Instagram Metadata
meta = {
    "title": "🔱 अयि गिरिनन्दिनि (Aigiri Nandini) 5 Minutes | Mahishasura Mardini Full Dance Story | 1080p Full HD",
    "description": (
        "॥ ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥\n\n"
        "Experience the sacred cosmic dance and epic story of Bhagavati Maa Durga slaying Mahishasura in this 5-minute Full HD cinematic movie, set to the thunderous, electrifying rhythm of the 'Aigiri Nandini' (Mahishasura Mardini Stotram).\n\n"
        "🔥 ZERO SPOKEN VOICEOVER • 100% PURE SACRED HYMN & CELESTIAL MUSIC!\n\n"
        "📖 8 CANONICAL CHAPTERS OF THE STORY:\n"
        "00:00 • 1. महिषासुर आतंक (Chapter 1: The Reign & Terror of Mahishasura)\n"
        "00:40 • 2. देवानाम प्रार्थना • त्रिमूर्ति (Chapter 2: Devas Pray to Shiva, Vishnu & Brahma on Kailash)\n"
        "01:15 • 3. माँ दुर्गा प्राकट्य • अस्त्र प्रदान (Chapter 3: Emergence of Devi Durga & Bestowal of Divine Weapons)\n"
        "01:57 • 4. सिंहवाहिनी प्रयाण (Chapter 4: Devi Rides Her Golden Lion into the Battlefield)\n"
        "02:35 • 5. महासंग्राम • रौद्र तांडव (Chapter 5: Thunderous Battle & Cosmic War Dance)\n"
        "03:10 • 6. असुर सैन्य संहार (Chapter 6: Shockwave & Decimation of the Demon Armies)\n"
        "03:50 • 7. त्रिशूल प्रहार • महिषासुर वध (Chapter 7: The Fatal Trishula Strike & Fall of Mahishasura)\n"
        "04:22 • 8. धर्म विजय • जय माँ दुर्गे (Chapter 8: Eternal Triumph of Dharma & Celestial Flower Shower)\n\n"
        "॥ महिषासुरमर्दिनि स्तोत्रम् ॥\n"
        "अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दसुते\n"
        "गिरिवरविन्ध्यशिरोऽधिनिवासिनि विष्णुविलासिनि जिष्णुनुते ।\n"
        "भगवति हे शितिकण्ठकुटुम्बिनि भूरिकुटुम्बिनि भूरिकृते\n"
        "जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥ १ ॥\n\n"
        "Chant with heart and soul:\n"
        "॥ जय माँ दुर्गे ॥ | ॥ या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता ॥ | Jai Mata Di 🔱\n\n"
        "✦ ──────────────────────── ✦\n"
        "🌐 Daily Vedic Panchang, Shlokas & Epics: https://divyamangalam.com\n"
        "📸 Follow @divyamangalam.info on Instagram for daily divine darshan\n\n"
        "#AigiriNandini #MaaDurga #MahishasuraMardini #DurgaStotram #Navratri #DurgaPuja #SanatanaDharma #DeviDurga #Mahakali #Bhakti #JaiMataDi #DivyaMangalam"
    ),
    "tags": [
        "Aigiri Nandini",
        "Aigiri Nandini 5 minutes",
        "Mahishasura Mardini",
        "Maa Durga",
        "Durga Stotram",
        "Aigiri Nandini Song",
        "Mahishasura Mardini Stotram",
        "Durga Dance",
        "Durga vs Mahishasura",
        "Navratri Special",
        "Sanatana Dharma",
        "Divya Mangalam"
    ],
    "category": "22",
    "privacyStatus": "public"
}

meta_path = os.path.join(IMAGES_DIR, "durga_aigiri_nandini_5min_youtube_metadata.json")
with open(meta_path, "w", encoding="utf-8") as f:
    json.dump(meta, f, indent=2, ensure_ascii=False)

print(f"📝 YouTube & Instagram SEO Metadata Saved: {meta_path}")
