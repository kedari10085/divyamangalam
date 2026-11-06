#!/usr/bin/env python3
"""
Divya Mangalam — Sri Venkateswara Suprabhatam 5-Minute Master Epic Movie
Authentic Suprabhata Seva at Tirumala • Garbhagriha & Ananda Nilayam
Humanoid Form of Lord Balaji, Archakas, Ksheera Seva, Tulasi Archana, Nakshatra Harathi
Full HD 1080p Landscape Widescreen (16:9) • Zero Spoken Narration
Pure Devotional Musical Immersion • 100% Authentic Hymn
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
SCENES_DIR = os.path.join(BASE_DIR, "images", "venkateswara_suprabhatam_scenes")
IMAGES_DIR = os.path.join(BASE_DIR, "images")
AUDIO_FILE = os.path.join(BASE_DIR, "audio", "venkateswara_suprabhatam_5min.mp3")
MASTER_OUTPUT = os.path.join(IMAGES_DIR, "venkateswara_suprabhatam_5min_master.mp4")
INSTAGRAM_OUTPUT = os.path.join(IMAGES_DIR, "venkateswara_suprabhatam_5min_instagram.mp4")
METADATA_OUTPUT = os.path.join(IMAGES_DIR, "venkateswara_suprabhatam_5min_youtube_metadata.json")

os.makedirs(IMAGES_DIR, exist_ok=True)

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

FPS = 30
WIDTH = 1920
HEIGHT = 1080
TOTAL_DURATION = 300.0  # Exactly 5:00.00 minutes
TOTAL_FRAMES = int(TOTAL_DURATION * FPS)  # 9000 frames

ACT_DURATION = 37.5
FRAMES_PER_ACT = int(ACT_DURATION * FPS)  # 1125 frames
TRANSITION_FRAMES = 30  # 1.0 second smooth cross-dissolve

ACTS = [
    {
        "id": 1,
        "file": "act_1_seshachala_dawn.jpg",
        "title": "कौसल्या सुप्रजा राम • प्रातः सन्ध्या प्रवर्तते",
        "subtitle": "Act I • Brahma Muhurta Dawn over Sacred Seshachala Seven Hills",
        "type": "seshachala_pan"
    },
    {
        "id": 2,
        "file": "act_2_archakas_procession.jpg",
        "title": "उत्तिष्ठोत्तिष्ठ गोविन्द • उत्तिष्ठ गरुडध्वज",
        "subtitle": "Act II • Suprabhata Seva Procession • Archakas Enter Garbhagriha",
        "type": "archakas_advance"
    },
    {
        "id": 3,
        "file": "act_3_moola_virat_darshan.jpg",
        "title": "मातस्समस्तजगतां मधुकैटभारेः",
        "subtitle": "Act III • Supreme Darshan of Lord Venkateswara • Ananda Nilayam",
        "type": "moola_virat_reveal"
    },
    {
        "id": 4,
        "file": "act_4_ksheera_abhishekam.jpg",
        "title": "तव सुप्रभातमरविन्दलोचने",
        "subtitle": "Act IV • Holy Offerings • Cow's Milk (Ksheera) & Fresh Navanita Butter",
        "type": "offering_push"
    },
    {
        "id": 5,
        "file": "act_5_tulasi_archana.jpg",
        "title": "पद्मापते स्तनतटी रमणीय हार",
        "subtitle": "Act V • Sacred Tulasi Archana & Sahasranama Aradhana at Lotus Feet",
        "type": "tulasi_focus"
    },
    {
        "id": 6,
        "file": "act_6_maha_harathi.jpg",
        "title": "कौतुकेन कमला करपल्लवेन",
        "subtitle": "Act VI • Glorious Maha Harathi • 27-Flame Nakshatra & Camphor Harathi",
        "type": "harathi_sway"
    },
    {
        "id": 7,
        "file": "act_7_vyuha_lakshmi_abhaya.jpg",
        "title": "लक्ष्मीनिवास निलये जननी प्रपद्ये",
        "subtitle": "Act VII • Vyuha Lakshmi Darshan & Abhaya Mudra Divine Protection",
        "type": "abhaya_zoom"
    },
    {
        "id": 8,
        "file": "act_8_mangalashasanam.jpg",
        "title": "श्रियः कान्ताय कल्याणनिधये निधयेऽर्थिनाम्",
        "subtitle": "Act VIII • Mangalashasanam • Universal Peace & Celestial Grace",
        "type": "mangalashasanam_out"
    }
]

print("==================================================================")
print("🕉️ DIVYA MANGALAM: SRI VENKATESWARA SUPRABHATAM 5-MIN MOVIE")
print(f"🎬 Total Duration: {TOTAL_DURATION}s | Frames: {TOTAL_FRAMES} | Resolution: {WIDTH}x{HEIGHT} @ {FPS}fps")
print("==================================================================")

# Pre-render Title Overlays with PIL
print("\n🎨 Pre-rendering Title Overlays with Sanskrit Devanagari & Gold Typography...")
def create_overlay(title, subtitle):
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    font_title = None
    font_sub = None
    for f_path in ["C:/Windows/Fonts/nirmala.ttf", "C:/Windows/Fonts/mangal.ttf", "C:/Windows/Fonts/arial.ttf"]:
        if os.path.exists(f_path):
            try:
                font_title = ImageFont.truetype(f_path, 44)
                font_sub = ImageFont.truetype(f_path, 25)
                break
            except:
                pass
    if not font_title:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Translucent Banner Box at bottom
    box_top = 935
    box_bottom = 1045
    draw.rectangle([(240, box_top), (1680, box_bottom)], fill=(8, 12, 22, 195))
    # Elegant Gold Trim Borders
    draw.rectangle([(240, box_top), (1680, box_top + 3)], fill=(235, 185, 45, 240))
    draw.rectangle([(240, box_bottom - 2), (1680, box_bottom)], fill=(235, 185, 45, 240))

    # Text rendering
    draw.text((960, box_top + 10), title, font=font_title, fill=(255, 235, 140, 255), anchor="mt")
    draw.text((960, box_top + 64), subtitle, font=font_sub, fill=(245, 245, 245, 230), anchor="mt")

    # Top-Left Divine Brand Badge
    draw.rectangle([(40, 35), (360, 85)], fill=(8, 12, 22, 185))
    draw.rectangle([(40, 35), (360, 38)], fill=(235, 185, 45, 240))
    draw.text((200, 48), "🕉️ DIVYA MANGALAM", font=font_sub, fill=(255, 215, 0, 255), anchor="mt")

    # Top-Right Tirumala Suprabhatam Badge
    draw.rectangle([(1530, 35), (1880, 85)], fill=(8, 12, 22, 185))
    draw.rectangle([(1530, 35), (1880, 38)], fill=(235, 185, 45, 240))
    draw.text((1705, 48), "🚩 SUPRABHATA SEVA", font=font_sub, fill=(255, 215, 0, 255), anchor="mt")

    arr = np.array(img)
    bgr = cv2.cvtColor(arr, cv2.COLOR_RGBA2BGR)
    alpha = arr[:, :, 3].astype(np.float32) / 255.0
    return bgr, alpha

OVERLAYS = []
for act in ACTS:
    bgr, alpha = create_overlay(act["title"], act["subtitle"])
    OVERLAYS.append((bgr, alpha))
    print(f"  ✅ Banner generated for Act {act['id']}: {act['title']}")

# Load and scale base images to 2304x1296 (1.2x oversample for smooth zooms)
print("\n🖼️ Loading and High-Resolution Upscaling Holy Scenes...")
BASE_IMAGES = []
for act in ACTS:
    p = os.path.join(SCENES_DIR, act["file"])
    img = cv2.imread(p)
    scaled = cv2.resize(img, (2304, 1296), interpolation=cv2.INTER_LANCZOS4)
    BASE_IMAGES.append(scaled)
    print(f"  ✅ Loaded {act['file']} -> {scaled.shape}")

# Particle System for Golden Camphor Embers, Tulasi Leaves & Lotus Petals
np.random.seed(108)
NUM_PARTICLES = 80
particles_x = np.random.uniform(0, WIDTH, NUM_PARTICLES)
particles_y = np.random.uniform(0, HEIGHT, NUM_PARTICLES)
particles_speed_y = np.random.uniform(0.6, 2.0, NUM_PARTICLES)
particles_speed_x = np.random.uniform(-0.5, 0.5, NUM_PARTICLES)
particles_size = np.random.uniform(2.0, 5.5, NUM_PARTICLES)
particles_type = np.random.choice([0, 1, 2], NUM_PARTICLES)  # 0: gold mote, 1: tulasi leaf, 2: lotus petal

def render_act_frame(act_idx, local_frame):
    act = ACTS[act_idx]
    motion_type = act["type"]
    base_img = BASE_IMAGES[act_idx]
    t = local_frame / FRAMES_PER_ACT  # 0.0 to 1.0
    sec = local_frame / FPS

    # Serene devotional breath oscillation (approx 0.15 Hz breathing pace)
    breath = 0.004 * math.sin(2 * math.pi * 0.15 * sec)

    if motion_type == "seshachala_pan":
        # Slow sunrise pan across Seshachala Hills
        zoom = 1.02 + 0.08 * t + breath
        center_x = 1050 + 160 * t
        center_y = 660 - 30 * t
        rot = 0.0
    elif motion_type == "archakas_advance":
        # Slow dignified advance with priests carrying holy milk & lamps
        zoom = 1.0 + 0.12 * t + breath
        center_x = 1152 - 30 * t
        center_y = 660 - 30 * t
        rot = 0.0
    elif motion_type == "moola_virat_reveal":
        # Upward tilt and slow zoom into Lord Balaji's radiant smiling face
        zoom = 1.04 + 0.12 * (t ** 0.8) + breath
        center_x = 1152
        center_y = 740 - 160 * t
        rot = 0.0
    elif motion_type == "offering_push":
        # Diagonal pan from golden milk vessels towards the lotus feet
        zoom = 1.03 + 0.09 * t + breath
        center_x = 1060 + 120 * t
        center_y = 680 - 60 * t
        rot = 0.0
    elif motion_type == "tulasi_focus":
        # Gentle downward focus on Tulasi garlands and lotus petals at feet
        zoom = 1.06 + 0.10 * t + breath
        center_x = 1152
        center_y = 620 + 80 * t
        rot = 0.0
    elif motion_type == "harathi_sway":
        # Sacred Harathi waving: harmonious circular arc oscillation
        harathi_cycle = 2 * math.pi * 0.4 * sec
        sway_x = 28 * math.sin(harathi_cycle)
        sway_y = 14 * math.cos(2 * harathi_cycle)
        sway_rot = 0.8 * math.sin(harathi_cycle)
        zoom = 1.05 + 0.07 * math.sin(math.pi * t) + breath
        center_x = 1152 + sway_x
        center_y = 648 + sway_y
        rot = sway_rot
    elif motion_type == "abhaya_zoom":
        # Focus on Goddess Vyuha Lakshmi on chest and the divine Abhaya blessing hand
        zoom = 1.05 + 0.11 * t + breath
        center_x = 1152 + 40 * t
        center_y = 648 - 40 * t
        rot = 0.0
    else:  # mangalashasanam_out
        # Majestic pull-out revealing the golden Ananda Nilayam vimana bathed in dawn light
        zoom = 1.16 - 0.12 * t + breath
        center_x = 1152
        center_y = 648
        rot = 0.0

    M = cv2.getRotationMatrix2D((center_x, center_y), rot, zoom)
    M[0, 2] += (960 - center_x)
    M[1, 2] += (540 - center_y)

    frame = cv2.warpAffine(base_img, M, (WIDTH, HEIGHT), borderMode=cv2.BORDER_REFLECT)
    return frame

def apply_particles(frame, act_idx, local_frame):
    global particles_x, particles_y
    
    # Particle movement based on scene:
    if act_idx == 4:  # Act 5: Tulasi Archana -> falling green tulasi & pink lotus petals
        particles_y += particles_speed_y * 1.5
        particles_x += np.sin(local_frame * 0.06 + particles_speed_x) * 1.2
    elif act_idx == 5:  # Act 6: Maha Harathi -> rising camphor flames & embers
        particles_y -= particles_speed_y * 2.2
        particles_x += np.cos(local_frame * 0.08 + particles_speed_x) * 1.0
    elif act_idx == 7:  # Act 8: Mangalashasanam -> celestial flower shower
        particles_y += particles_speed_y * 1.6
        particles_x += np.sin(local_frame * 0.05 + particles_speed_x) * 1.4
    else:  # Serene floating golden temple motes
        particles_y -= particles_speed_y * 0.8
        particles_x += np.sin(local_frame * 0.03 + particles_speed_x) * 0.6

    particles_y %= HEIGHT
    particles_x %= WIDTH

    for i in range(0, NUM_PARTICLES, 2):
        px = int(particles_x[i])
        py = int(particles_y[i])
        rad = int(particles_size[i])

        if act_idx == 4:  # Tulasi Archana: alternate between green Tulasi and pink lotus
            if particles_type[i] % 2 == 0:
                color = (40, 180, 80)   # Tulasi Green (BGR)
            else:
                color = (180, 100, 255) # Lotus Pink (BGR)
        elif act_idx == 5:  # Maha Harathi: warm fiery gold
            color = (60, 170, 255)      # Harathi fire gold (BGR)
        elif act_idx == 7:  # Mangalashasanam: celestial yellow & pink flowers
            if particles_type[i] % 2 == 0:
                color = (120, 220, 255) # Yellow jasmine/champa
            else:
                color = (200, 130, 255) # Pink lotus petal
        else:
            color = (110, 215, 255)     # Warm temple gold mote

        cv2.circle(frame, (px, py), rad, color, -1, lineType=cv2.LINE_AA)

    return frame

def apply_banner(frame, act_idx, local_frame):
    start_f = int(0.5 * FPS)
    fade_in_f = int(1.4 * FPS)
    fade_out_f = int(6.0 * FPS)
    end_f = int(7.0 * FPS)

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
    frame = (frame * (1.0 - effective_alpha[:, :, None]) + bgr * effective_alpha[:, :, None]).astype(np.uint8)
    return frame

print("\n🚀 STEP 3: PIPING RAW 1080P FRAMES DIRECTLY TO FFMPEG...")
pipe_cmd = [
    ffmpeg, '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', f"{WIDTH}x{HEIGHT}",
    '-pix_fmt', 'bgr24',
    '-r', str(FPS),
    '-i', '-',
    '-i', AUDIO_FILE,
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
    MASTER_OUTPUT
]

proc = subprocess.Popen(pipe_cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)

start_time = time.time()
print("  Rendering 9,000 frames with camera motion, Harathi circular sway & sacred transitions...")

for act_idx in range(len(ACTS)):
    act_name = ACTS[act_idx]["title"]
    print(f"  🎥 Rendering Act {act_idx + 1}/8: {act_name} (Frames {act_idx * FRAMES_PER_ACT} to {(act_idx + 1) * FRAMES_PER_ACT})...")
    
    for lf in range(FRAMES_PER_ACT):
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
master_size = os.path.getsize(MASTER_OUTPUT) / (1024 * 1024)
print(f"\n🎉 MASTER 1080P FILM COMPLETED IN {elapsed:.1f}s ({TOTAL_FRAMES / elapsed:.1f} fps)!")
print(f"📁 Master File: {MASTER_OUTPUT}")
print(f"📊 Size: {master_size:.2f} MB | Duration: {TOTAL_DURATION}s")

# STEP 4: Render Web / Instagram Optimized Version (<100MB for GitHub & Instagram Graph API)
print("\n📱 STEP 4: ENCODING INSTAGRAM / WEB OPTIMIZED VERSION (<100MB)...")
ig_cmd = [
    ffmpeg, '-y',
    '-i', MASTER_OUTPUT,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-b:v', '2200k',
    '-maxrate', '2500k',
    '-bufsize', '5000k',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    INSTAGRAM_OUTPUT
]
subprocess.run(ig_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
ig_size = os.path.getsize(INSTAGRAM_OUTPUT) / (1024 * 1024)
print(f"✅ Instagram Optimized Video Created: {INSTAGRAM_OUTPUT}")
print(f"📊 Size: {ig_size:.2f} MB (Well under 100MB GitHub limit)")

# STEP 5: Save Updated YouTube Metadata
meta = {
    "title": "🕉️ Venkateswara Suprabhatam 5 Minutes | Suprabhata Seva Tirumala Darshan | Full HD 1080p",
    "description": (
        "॥ ॐ नमो वेङ्कटेशाय ॥ • ॥ श्रीनिवास परब्रह्मणे नमः ॥\n\n"
        "Experience the sacred morning Suprabhata Seva of Lord Sri Venkateswara at Tirumala in this 5-minute Full HD cinematic devotional journey. "
        "Featuring the authentic divine shila murti of Lord Balaji adorned with diamond Kiritam, white-and-red Urdhva Pundra Namam, Goddess Vyuha Lakshmi on the chest, "
        "and archakas performing holy Ksheera Seva, sacred Tulasi Archana, and the 27-flame Nakshatra Maha Harathi.\n\n"
        "✨ 100% BRAND-NEW SACRED ARTWORKS & CINEMATIC CAMERA CHOREOGRAPHY\n"
        "🔥 ZERO SPOKEN NARRATION • 100% PURE SACRED SUPRABHATAM HYMN\n"
        "🔔 Full HD 1080p Landscape Widescreen (16:9) Darshan\n\n"
        "📖 8 CANONICAL ACTS OF SUPRABHATA SEVA:\n"
        "00:00 • Act I: कौसल्या सुप्रजा राम (Brahma Muhurta Dawn over Seshachala Seven Hills)\n"
        "00:37 • Act II: उत्तिष्ठोत्तिष्ठ गोविन्द (Suprabhata Seva Procession • Archakas Enter Sanctum)\n"
        "01:15 • Act III: मातस्समस्तजगतां (Supreme Darshan of Lord Venkateswara • Ananda Nilayam)\n"
        "01:52 • Act IV: तव सुप्रभातमरविन्दलोचने (Holy Offerings • Fresh Cow's Milk & Navanita Butter)\n"
        "02:30 • Act V: पद्मापते स्तनतटी (Sacred Tulasi Archana & Sahasranama Aradhana at Lotus Feet)\n"
        "03:07 • Act VI: कौतुकेन कमला (Glorious Maha Harathi • 27-Flame Nakshatra & Camphor Deepams)\n"
        "03:45 • Act VII: लक्ष्मीनिवास निलये (Vyuha Lakshmi Darshan & Abhaya Mudra Divine Protection)\n"
        "04:22 • Act VIII: श्रियः कान्ताय कल्याणनिधये (Mangalashasanam • Universal Peace & Celestial Grace)\n\n"
        "॥ श्री वेङ्कटेश्वर सुप्रभातम ॥\n"
        "कौसल्या सुप्रजा राम पूर्वा सन्ध्या प्रवर्तते ।\n"
        "उत्तिष्ठ नरशार्दूल कर्तव्यं दैवनिह्निकम् ॥ १ ॥\n\n"
        "उत्तिष्ठोत्तिष्ठ गोविन्द उत्तिष्ठ गरुडध्वज ।\n"
        "उत्तिष्ठ कमलाकान्त त्रैलोक्यं मङ्गलं कुरु ॥ २ ॥\n\n"
        "श्रियः कान्ताय कल्याणनिधये निधयेऽर्थिनाम् ।\n"
        "श्रीवेङ्कटनिवासाय श्रीनिवासाय मङ्गलम् ॥\n\n"
        "Govinda Govinda! Venkataramana Govinda! 🚩\n\n"
        "✦ ──────────────────────── ✦\n"
        "🌐 Daily Vedic Panchang, Mahabharata, 18 Puranas & Shlokas: https://divyamangalam.com\n"
        "📸 Follow @divyamangalam.info on Instagram for daily divine darshan & sacred reels\n\n"
        "#VenkateswaraSuprabhatam #TirumalaDarshan #LordVenkateswara #LordBalaji #SuprabhataSeva #Tirupati #Govinda #Srinivasa #SanatanaDharma #MahaHarathi #TulasiArchana #DivyaMangalam"
    ),
    "tags": [
        "Venkateswara Suprabhatam",
        "Suprabhatam 5 minutes",
        "Tirumala Suprabhata Seva",
        "Lord Venkateswara",
        "Lord Balaji",
        "Tirupati Balaji",
        "Suprabhatam MS Subbulakshmi",
        "Govinda Govinda",
        "Tirumala Darshan",
        "Maha Harathi",
        "Tulasi Archana",
        "Sanatana Dharma",
        "Divya Mangalam"
    ],
    "category": "22",
    "privacyStatus": "public"
}

with open(METADATA_OUTPUT, "w", encoding="utf-8") as f:
    json.dump(meta, f, indent=2, ensure_ascii=False)

print(f"📝 YouTube & Instagram SEO Metadata Saved: {METADATA_OUTPUT}")
print("🕉️ ALL MASTER ENCODING PROCESSES SUCCESSFULLY COMPLETED!")
