#!/usr/bin/env python3
"""
Divya Mangalam — Aigiri Nandini 5-Minute Cosmic Epic Movie
100% Brand-New Original AI-Generated Sacred Artworks
Full HD 1080p Landscape Widescreen (16:9) • Zero Spoken Narration
Pure Devotional Musical Immersion • Dynamic Dancing & Battle Camera Motion
"""

import os
import sys
import time
import subprocess
import json
import math
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCENES_DIR = os.path.join(BASE_DIR, "images", "durga_original_scenes")
TEMP_DIR = os.path.join(BASE_DIR, "temp_durga_assets")
IMAGES_DIR = os.path.join(BASE_DIR, "images")
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
audio_track = os.path.join(TEMP_DIR, "aigiri_song_5min.mp3")
master_output = os.path.join(IMAGES_DIR, "durga_aigiri_nandini_5min_original.mp4")
instagram_output = os.path.join(IMAGES_DIR, "durga_aigiri_nandini_5min_original_instagram.mp4")

FPS = 30
WIDTH = 1920
HEIGHT = 1080
TOTAL_DURATION = 300.0  # Exactly 5:00 minutes
TOTAL_FRAMES = int(TOTAL_DURATION * FPS)  # 9000 frames

# 8 Canonical Story Acts (37.5 seconds each)
ACT_DURATION = 37.5
FRAMES_PER_ACT = int(ACT_DURATION * FPS)  # 1125 frames
TRANSITION_FRAMES = 30  # 1.0 second smooth cross-dissolve

ACTS = [
    {
        "id": 1,
        "file": "scene_1_mahishasura.jpg",
        "title": "महिषासुर आतंक",
        "subtitle": "Act I • The Reign & Terror of Mahishasura",
        "type": "push_in"
    },
    {
        "id": 2,
        "file": "scene_2_trimurti_prayer.jpg",
        "title": "देवानाम प्रार्थना • त्रिमूर्ति",
        "subtitle": "Act II • Devas Pray to Shiva, Vishnu & Brahma on Mount Kailash",
        "type": "pan_right"
    },
    {
        "id": 3,
        "file": "scene_3_durga_emergence.jpg",
        "title": "माँ दुर्गा प्राकट्य • तेजोमय अवतार",
        "subtitle": "Act III • Emergence of Devi Durga from Cosmic Tejas",
        "type": "tilt_up"
    },
    {
        "id": 4,
        "file": "scene_4_astras_bestowal.jpg",
        "title": "दिव्यास्त्र प्रदान • सिंहवाहन",
        "subtitle": "Act IV • Bestowal of Divine Weapons & Golden Lion Mount",
        "type": "pan_diag"
    },
    {
        "id": 5,
        "file": "scene_5_simhavahini_charge.jpg",
        "title": "सिंहवाहिनी प्रयाण • समरांगण",
        "subtitle": "Act V • Devi Charging atop Her Golden Lion into War",
        "type": "charge_zoom"
    },
    {
        "id": 6,
        "file": "scene_6_rudra_tandava.jpg",
        "title": "महासंग्राम • रौद्र तांडव",
        "subtitle": "Act VI • The Cosmic War Dance & Annihilation of Demon Armies",
        "type": "tandava_dance"
    },
    {
        "id": 7,
        "file": "scene_7_trishula_slaying.jpg",
        "title": "त्रिशूल प्रहार • महिषासुर वध",
        "subtitle": "Act VII • The Fatal Trishula Strike • Mahishasura Mardini",
        "type": "strike_punch"
    },
    {
        "id": 8,
        "file": "scene_8_dharma_victory.jpg",
        "title": "धर्म विजय • जय माँ दुर्गे",
        "subtitle": "Act VIII • Eternal Triumph of Dharma & Celestial Flower Shower",
        "type": "zoom_out_peace"
    }
]

print("==================================================================")
print("🔱 DIVYA MANGALAM: RENDERING AIGIRI NANDINI 5-MIN ORIGINAL MOVIE")
print(f"🎬 Total Duration: {TOTAL_DURATION}s | Frames: {TOTAL_FRAMES} | Resolution: {WIDTH}x{HEIGHT} @ {FPS}fps")
print("==================================================================")

# Pre-render Title Overlays with PIL
print("\n🎨 Pre-rendering Title Overlays with Sanskrit & Gold Typography...")
def create_overlay(title, subtitle):
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    font_title = None
    font_sub = None
    for f_path in ["C:/Windows/Fonts/nirmala.ttf", "C:/Windows/Fonts/mangal.ttf", "C:/Windows/Fonts/arial.ttf"]:
        if os.path.exists(f_path):
            try:
                font_title = ImageFont.truetype(f_path, 46)
                font_sub = ImageFont.truetype(f_path, 26)
                break
            except:
                pass
    if not font_title:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Translucent Banner Box at bottom
    box_top = 935
    box_bottom = 1045
    draw.rectangle([(260, box_top), (1660, box_bottom)], fill=(12, 6, 3, 190))
    # Elegant Gold Trim Borders
    draw.rectangle([(260, box_top), (1660, box_top + 3)], fill=(225, 175, 35, 240))
    draw.rectangle([(260, box_bottom - 2), (1660, box_bottom)], fill=(225, 175, 35, 240))

    # Text rendering
    draw.text((960, box_top + 10), title, font=font_title, fill=(255, 230, 130, 255), anchor="mt")
    draw.text((960, box_top + 64), subtitle, font=font_sub, fill=(255, 245, 235, 230), anchor="mt")

    # Top-Left Divine Brand Badge
    draw.rectangle([(40, 35), (350, 85)], fill=(12, 6, 3, 180))
    draw.rectangle([(40, 35), (350, 38)], fill=(225, 175, 35, 230))
    draw.text((195, 48), "🕉️ DIVYA MANGALAM", font=font_sub, fill=(255, 215, 0, 255), anchor="mt")

    arr = np.array(img)
    # Convert RGBA to BGR + Alpha
    bgr = cv2.cvtColor(arr, cv2.COLOR_RGBA2BGR)
    alpha = arr[:, :, 3].astype(np.float32) / 255.0
    return bgr, alpha

OVERLAYS = []
for act in ACTS:
    bgr, alpha = create_overlay(act["title"], act["subtitle"])
    OVERLAYS.append((bgr, alpha))
    print(f"  ✅ Banner generated for Act {act['id']}: {act['title']}")

# Load and scale base images to 2304x1296 (1.2x oversample for smooth zooms)
print("\n🖼️ Loading and High-Resolution Upscaling Original Scenes...")
BASE_IMAGES = []
for act in ACTS:
    p = os.path.join(SCENES_DIR, act["file"])
    img = cv2.imread(p)
    # Upscale smoothly to 2304x1296 (1.2x of 1920x1080)
    scaled = cv2.resize(img, (2304, 1296), interpolation=cv2.INTER_LANCZOS4)
    BASE_IMAGES.append(scaled)
    print(f"  ✅ Loaded {act['file']} -> {scaled.shape}")

# Particle System for Cosmic Golden Embers & Floating Petals
np.random.seed(42)
NUM_PARTICLES = 70
particles_x = np.random.uniform(0, WIDTH, NUM_PARTICLES)
particles_y = np.random.uniform(0, HEIGHT, NUM_PARTICLES)
particles_speed_y = np.random.uniform(0.6, 2.2, NUM_PARTICLES)
particles_speed_x = np.random.uniform(-0.5, 0.5, NUM_PARTICLES)
particles_size = np.random.uniform(2.0, 5.0, NUM_PARTICLES)
particles_alpha = np.random.uniform(0.3, 0.8, NUM_PARTICLES)

def render_act_frame(act_idx, local_frame):
    """
    Renders a single frame for an act with dynamic cinematic motion,
    beat synchronization, and particle overlays.
    """
    act = ACTS[act_idx]
    motion_type = act["type"]
    base_img = BASE_IMAGES[act_idx]
    t = local_frame / FRAMES_PER_ACT  # 0.0 to 1.0
    
    # 130 BPM rhythm pulsation for war dance energy
    bpm = 130.0
    sec = local_frame / FPS
    pulse = 0.008 * math.sin(2 * math.pi * (bpm / 60.0) * sec)
    
    # Compute camera transform based on motion type
    if motion_type == "push_in":
        # Slow dramatic push into Mahishasura's eyes
        zoom = 1.0 + 0.14 * t + pulse
        center_x = 1152 + 50 * t
        center_y = 648 - 40 * t
        rot = 0.0
    elif motion_type == "pan_right":
        # Horizontal sweep across praying Devas to Trimurti
        zoom = 1.05 + 0.08 * t + pulse
        center_x = 1000 + 180 * t
        center_y = 648
        rot = 0.0
    elif motion_type == "tilt_up":
        # Upward vertical pan from Tejas fire to Devi's crown
        zoom = 1.04 + 0.09 * t + pulse
        center_x = 1152
        center_y = 750 - 180 * t
        rot = 0.0
    elif motion_type == "pan_diag":
        # Diagonal pan across divine weapons
        zoom = 1.05 + 0.10 * t + pulse
        center_x = 1050 + 120 * t
        center_y = 700 - 100 * t
        rot = 0.0
    elif motion_type == "charge_zoom":
        # Fast charging forward zoom with Simhavahini
        zoom = 1.0 + 0.18 * (t ** 1.3) + pulse * 1.5
        center_x = 1152 - 40 * t
        center_y = 648 + 30 * t
        rot = 0.4 * math.sin(2 * math.pi * 0.8 * sec)
    elif motion_type == "tandava_dance":
        # Sacred War Dance: Rhythmic sway and pulsating dance energy
        sway = 1.4 * math.sin(2 * math.pi * (bpm / 60.0) * sec)
        zoom = 1.08 + 0.08 * math.sin(math.pi * t) + pulse * 2.0
        center_x = 1152 + 35 * math.sin(2 * math.pi * 0.5 * sec)
        center_y = 648 + 20 * math.cos(2 * math.pi * 0.5 * sec)
        rot = sway
    elif motion_type == "strike_punch":
        # Climactic punch zoom on Trishula piercing heart
        zoom = 1.04 + 0.18 * (t ** 1.1) + pulse * 1.8
        center_x = 1152
        center_y = 648 - 25 * t
        rot = 0.5 * math.sin(2 * math.pi * 2.0 * sec) * (1.0 - t)
    else:  # zoom_out_peace
        # Serene slow zoom-out revealing flowers raining down
        zoom = 1.18 - 0.14 * t + pulse * 0.5
        center_x = 1152
        center_y = 648
        rot = 0.0

    # Affine transformation matrix
    M = cv2.getRotationMatrix2D((center_x, center_y), rot, zoom)
    # Translate center to viewport center (960, 540)
    M[0, 2] += (960 - center_x)
    M[1, 2] += (540 - center_y)

    frame = cv2.warpAffine(base_img, M, (WIDTH, HEIGHT), borderMode=cv2.BORDER_REFLECT)
    return frame

# Golden Embers Particle Overlay Layer
def apply_particles(frame, act_idx, local_frame):
    global particles_x, particles_y
    
    # Drift particles
    if act_idx == 7:  # Flower shower: drift downwards gently
        particles_y += particles_speed_y * 1.2
        particles_x += np.sin(local_frame * 0.05 + particles_speed_x) * 0.8
        color = (130, 215, 255)  # Warm gold petals
    elif act_idx in [0, 4, 5, 6]:  # Battle/Tandava/Demon: embers rise upwards
        particles_y -= particles_speed_y * 1.8
        particles_x += np.cos(local_frame * 0.08 + particles_speed_x) * 1.5
        color = (70, 160, 255)  # Fiery golden-orange embers
    else:  # Divine prayer/emergence: mystical golden sparkles
        particles_y -= particles_speed_y * 1.0
        particles_x += np.sin(local_frame * 0.04 + particles_speed_x) * 0.6
        color = (100, 230, 255)  # Pure celestial gold

    # Wrap particles around screen edges
    particles_y %= HEIGHT
    particles_x %= WIDTH

    # Subtle particle glow blending
    # Draw simple glowing circles on a small mask
    for i in range(0, NUM_PARTICLES, 2):
        px = int(particles_x[i])
        py = int(particles_y[i])
        rad = int(particles_size[i])
        cv2.circle(frame, (px, py), rad, color, -1, lineType=cv2.LINE_AA)

    return frame

# Banner Overlay Blending
def apply_banner(frame, act_idx, local_frame):
    # Banner visible during seconds 0.4 to 6.2 of the act
    start_f = int(0.4 * FPS)
    fade_in_f = int(1.2 * FPS)
    fade_out_f = int(5.4 * FPS)
    end_f = int(6.4 * FPS)

    if local_frame < start_f or local_frame > end_f:
        return frame

    if local_frame < fade_in_f:
        alpha_mult = (local_frame - start_f) / float(fade_in_f - start_f)
    elif local_frame > fade_out_f:
        alpha_mult = 1.0 - (local_frame - fade_out_f) / float(end_f - fade_out_f)
    else:
        alpha_mult = 1.0

    bgr, alpha = OVERLAYS[act_idx]
    effective_alpha = alpha * alpha_mult
    # Blend overlay
    frame = (frame * (1.0 - effective_alpha[:, :, None]) + bgr * effective_alpha[:, :, None]).astype(np.uint8)
    return frame

print("\n🚀 STEP 3: PIPING RAW 1080P FRAMES DIRECTLY TO FFMPEG...")
# Set up FFmpeg video encoder pipe
pipe_cmd = [
    ffmpeg, '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', f"{WIDTH}x{HEIGHT}",
    '-pix_fmt', 'bgr24',
    '-r', str(FPS),
    '-i', '-',
    '-i', audio_track,
    '-filter_complex', '[1:a]afade=t=out:st=297.0:d=3.0[aout]',
    '-map', '0:v',
    '-map', '[aout]',
    '-c:v', 'libx264',
    '-preset', 'faster',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '320k',
    '-t', str(TOTAL_DURATION),
    master_output
]

proc = subprocess.Popen(pipe_cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)

start_time = time.time()
print("  Rendering 9,000 frames with camera motion, beat pulse & transitions...")

for act_idx in range(len(ACTS)):
    act_name = ACTS[act_idx]["title"]
    print(f"  🎥 Rendering Act {act_idx + 1}/8: {act_name} (Frames {act_idx * FRAMES_PER_ACT} to {(act_idx + 1) * FRAMES_PER_ACT})...")
    
    for lf in range(FRAMES_PER_ACT):
        # Current act frame
        curr_frame = render_act_frame(act_idx, lf)
        curr_frame = apply_particles(curr_frame, act_idx, lf)
        curr_frame = apply_banner(curr_frame, act_idx, lf)
        
        # Cross-fade with next act during the last TRANSITION_FRAMES
        if lf >= FRAMES_PER_ACT - TRANSITION_FRAMES and act_idx < len(ACTS) - 1:
            fade_progress = (lf - (FRAMES_PER_ACT - TRANSITION_FRAMES)) / float(TRANSITION_FRAMES)
            next_frame = render_act_frame(act_idx + 1, lf - (FRAMES_PER_ACT - TRANSITION_FRAMES))
            next_frame = apply_particles(next_frame, act_idx + 1, 0)
            blended = cv2.addWeighted(curr_frame, 1.0 - fade_progress, next_frame, fade_progress, 0)
            proc.stdin.write(blended.tobytes())
        else:
            proc.stdin.write(curr_frame.tobytes())

proc.stdin.close()
_, stderr = proc.communicate()

if proc.returncode != 0:
    print(f"❌ FFmpeg Error: {stderr.decode('utf-8', errors='ignore')}")
    sys.exit(1)

elapsed = time.time() - start_time
master_size = os.path.getsize(master_output) / (1024 * 1024)
print(f"\n🎉 MASTER 1080P FILM COMPLETED IN {elapsed:.1f}s ({TOTAL_FRAMES / elapsed:.1f} fps)!")
print(f"📁 Master File: {master_output}")
print(f"📊 Size: {master_size:.2f} MB | Duration: {TOTAL_DURATION}s")

# STEP 4: Render Web / Instagram Optimized Version (<100MB for GitHub & Instagram Graph API)
print("\n📱 STEP 4: ENCODING INSTAGRAM / WEB OPTIMIZED VERSION (<100MB)...")
ig_cmd = [
    ffmpeg, '-y',
    '-i', master_output,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-b:v', '2200k',
    '-maxrate', '2500k',
    '-bufsize', '5000k',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    instagram_output
]
subprocess.run(ig_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
ig_size = os.path.getsize(instagram_output) / (1024 * 1024)
print(f"✅ Instagram Optimized Video Created: {instagram_output}")
print(f"📊 Size: {ig_size:.2f} MB (Well under 100MB GitHub limit)")

# STEP 5: Save Updated YouTube Metadata
meta = {
    "title": "🔱 अयि गिरिनन्दिनि (Aigiri Nandini) 5 Minutes | Mahishasura Mardini Full Dance Story | 1080p Full HD",
    "description": (
        "॥ ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥\n\n"
        "Experience the sacred cosmic dance and epic story of Bhagavati Maa Durga slaying Mahishasura in this 5-minute Full HD cinematic movie, set to the thunderous, electrifying rhythm of the 'Aigiri Nandini' (Mahishasura Mardini Stotram).\n\n"
        "✨ 100% BRAND NEW ORIGINAL SACRED ARTWORKS & CINEMATIC MOTION!\n"
        "🔥 ZERO SPOKEN VOICEOVER • 100% PURE SACRED HYMN & CELESTIAL MUSIC!\n\n"
        "📖 8 CANONICAL ACTS OF THE SACRED STORY:\n"
        "00:00 • Act I: महिषासुर आतंक (The Reign & Terror of Demon Mahishasura)\n"
        "00:37 • Act II: देवानाम प्रार्थना • त्रिमूर्ति (Devas Pray to Shiva, Vishnu & Brahma on Mount Kailash)\n"
        "01:15 • Act III: माँ दुर्गा प्राकट्य • तेजोमय अवतार (Emergence of Devi Durga from Cosmic Tejas)\n"
        "01:52 • Act IV: दिव्यास्त्र प्रदान • सिंहवाहन (Bestowal of Divine Weapons & Golden Lion Mount)\n"
        "02:30 • Act V: सिंहवाहिनी प्रयाण • समरांगण (Devi Charging atop Her Golden Lion into War)\n"
        "03:07 • Act VI: महासंग्राम • रौद्र तांडव (The Cosmic War Dance & Annihilation of Demon Armies)\n"
        "03:45 • Act VII: त्रिशूल प्रहार • महिषासुर वध (The Fatal Trishula Strike • Mahishasura Mardini)\n"
        "04:22 • Act VIII: धर्म विजय • जय माँ दुर्गे (Eternal Triumph of Dharma & Celestial Flower Shower)\n\n"
        "॥ महिषासुरमर्दिनि स्तोत्रम् ॥\n"
        "अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दसुते\n"
        "गिरिवरविन्ध्यशिरोऽधिनिवासिनि विष्णुविलासिनि जिष्णुनुते ।\n"
        "भगवति हे शितिकण्ठकुटुम्बिनि भूरिकुटुम्बिनि भूरिकृते\n"
        "जय जय हे महिषासुरमर्दिनि रम्यकपर्दिनि शैलसुते ॥ १ ॥\n\n"
        "Chant with heart and soul:\n"
        "॥ जय माँ दुर्गे ॥ | ॥ या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता ॥ | Jai Mata Di 🔱\n\n"
        "✦ ──────────────────────── ✦\n"
        "🌐 Daily Vedic Panchang, Shlokas & Epics: https://divyamangalam.com\n"
        "📸 Follow @divyamangalam.info on Instagram for daily divine darshan & sacred reels\n\n"
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
print("🔱 ALL MASTER ENCODING PROCESSES SUCCESSFULLY COMPLETED!")
