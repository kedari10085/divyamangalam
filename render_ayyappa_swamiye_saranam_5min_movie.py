#!/usr/bin/env python3
"""
Divya Mangalam — Swamiye Saranam Ayyappa 5-Minute Master Epic Movie
Authentic Devotional Hymn • Classical Oil Painting Humanoid Aesthetics
Featuring Lord Ayyappa & Lord Murugan, Pulivahanam, Mahishi Battle, Irumudi, Pathinettampadi
Full HD 1080p Landscape Widescreen (16:9) • Embedded Theft-Proof Watermark
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
SCENES_DIR = os.path.join(BASE_DIR, "images", "ayyappa_swamiye_saranam_scenes")
IMAGES_DIR = os.path.join(BASE_DIR, "images")
AUDIO_FILE = os.path.join(BASE_DIR, "audio", "swamiye_saranam_ayyappa_5min.mp3")
MASTER_OUTPUT = os.path.join(IMAGES_DIR, "ayyappa_swamiye_saranam_5min_master.mp4")
INSTAGRAM_OUTPUT = os.path.join(IMAGES_DIR, "ayyappa_swamiye_saranam_5min_instagram.mp4")
METADATA_OUTPUT = os.path.join(IMAGES_DIR, "ayyappa_swamiye_saranam_5min_youtube_metadata.json")

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
        "file": "act_1_ayyappa_murugan_darshan.jpg",
        "title": "ॐ श्री हरिहरपुत्राय नमः • कार्तिकेय सहोदर",
        "subtitle": "Act I • Celestial Union of Lord Ayyappa & Lord Murugan (Karthikeya)",
        "type": "murugan_pan"
    },
    {
        "id": 2,
        "file": "act_2_manikandan_pulivahanam.jpg",
        "title": "पुलिवाहन महाप्रभो • वीर मणिकण्ठ",
        "subtitle": "Act II • Prince Manikandan Riding the Royal Tigress (Pulivahanam)",
        "type": "tigress_charge"
    },
    {
        "id": 3,
        "file": "act_3_slaying_mahishi.jpg",
        "title": "महिषीमर्दन वरद • धर्म संस्थापन",
        "subtitle": "Act III • Slaying of Demoness Mahishi on the Banks of River Azhutha",
        "type": "mahishi_strike"
    },
    {
        "id": 4,
        "file": "act_4_irumudi_forest_pilgrimage.jpg",
        "title": "स्वामिये शरणम् अय्यप्पा • इरुमुडिकट्टु",
        "subtitle": "Act IV • Pilgrims Trekking through Sacred Forests Carrying Holy Irumudi",
        "type": "forest_trek"
    },
    {
        "id": 5,
        "file": "act_5_pampa_manikandan_found.jpg",
        "title": "पम्पातीर विहारिणे • राजशेखर पालक",
        "subtitle": "Act V • Infant Manikandan Discovered at River Pampa by King Rajashekhara",
        "type": "pampa_snanam"
    },
    {
        "id": 6,
        "file": "act_6_pathinettampadi_18_steps.jpg",
        "title": "अष्टादश सुवर्ण सोपानम् • १८ पादियां",
        "subtitle": "Act VI • Reverent Ascent of the 18 Sacred Golden Steps (Pathinettampadi)",
        "type": "steps_climb"
    },
    {
        "id": 7,
        "file": "act_7_lord_ayyappa_sannidhanam_darshan.jpg",
        "title": "ॐ स्वामी शरणम् • चिन्मुद्रालंकृत",
        "subtitle": "Act VII • Supreme Darshan of Lord Ayyappa in Sacred Chin-Mudra Pose",
        "type": "darshan_sway"
    },
    {
        "id": 8,
        "file": "act_8_makara_jyothi_harivarasanam.jpg",
        "title": "मकरविलक्कु • हरिवरासनम् विश्वमोहनम्",
        "subtitle": "Act VIII • Sacred Makara Jyothi atop Ponnambalamedu & Harivarasanam",
        "type": "makara_reveal"
    }
]

print("==================================================================")
print("🕉️ DIVYA MANGALAM: SWAMIYE SARANAM AYYAPPA 5-MIN ORIGINAL MOVIE")
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
    draw.rectangle([(220, box_top), (1700, box_bottom)], fill=(12, 10, 6, 195))
    # Elegant Gold Trim Borders
    draw.rectangle([(220, box_top), (1700, box_top + 3)], fill=(240, 180, 40, 240))
    draw.rectangle([(220, box_bottom - 2), (1700, box_bottom)], fill=(240, 180, 40, 240))

    # Text rendering
    draw.text((960, box_top + 10), title, font=font_title, fill=(255, 235, 140, 255), anchor="mt")
    draw.text((960, box_top + 64), subtitle, font=font_sub, fill=(245, 245, 245, 230), anchor="mt")

    # Top-Left Divine Brand Badge
    draw.rectangle([(40, 35), (370, 85)], fill=(12, 10, 6, 185))
    draw.rectangle([(40, 35), (370, 38)], fill=(240, 180, 40, 240))
    draw.text((205, 48), "🕉️ DIVYA MANGALAM", font=font_sub, fill=(255, 215, 0, 255), anchor="mt")

    # Top-Right Sabarimala Badge
    draw.rectangle([(1510, 35), (1880, 85)], fill=(12, 10, 6, 185))
    draw.rectangle([(1510, 35), (1880, 38)], fill=(240, 180, 40, 240))
    draw.text((1695, 48), "🚩 SWAMIYE SARANAM", font=font_sub, fill=(255, 215, 0, 255), anchor="mt")

    arr = np.array(img)
    bgr = cv2.cvtColor(arr, cv2.COLOR_RGBA2BGR)
    alpha = arr[:, :, 3].astype(np.float32) / 255.0
    return bgr, alpha

OVERLAYS = []
for act in ACTS:
    bgr, alpha = create_overlay(act["title"], act["subtitle"])
    OVERLAYS.append((bgr, alpha))
    print(f"  ✅ Banner generated for Act {act['id']}: {act['title']}")

# Pre-render Persistent Protective Watermark Layer (Theft-Proof Anti-Piracy Watermark)
print("\n🛡️ Pre-rendering Protective Anti-Theft Watermark Layer...")
def create_protective_watermark():
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    font_wm = None
    font_small = None
    for f_path in ["C:/Windows/Fonts/nirmala.ttf", "C:/Windows/Fonts/arial.ttf"]:
        if os.path.exists(f_path):
            try:
                font_wm = ImageFont.truetype(f_path, 22)
                font_small = ImageFont.truetype(f_path, 17)
                break
            except:
                pass
    if not font_wm:
        font_wm = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # 1. Floating Semi-Transparent Corner Seal (Upper Right below top badge)
    wm_x, wm_y = 1660, 105
    draw.rectangle([(wm_x - 170, wm_y), (wm_x + 180, wm_y + 36)], fill=(15, 10, 5, 120))
    draw.rectangle([(wm_x - 170, wm_y), (wm_x + 180, wm_y + 2)], fill=(240, 190, 40, 160))
    draw.text((wm_x + 5, wm_y + 7), "DIVYAMANGALAM.COM", font=font_small, fill=(255, 225, 120, 180), anchor="mt")

    # 2. Subtle Lower-Right Domain Signature
    draw.text((1880, 1052), "divyamangalam.info", font=font_small, fill=(255, 255, 255, 120), anchor="rb")

    # 3. Faint Center Watermark (Subtle security mark, very low opacity so it never distracts)
    draw.text((960, 530), "DIVYA MANGALAM", font=font_wm, fill=(255, 220, 100, 35), anchor="mm")

    arr = np.array(img)
    bgr = cv2.cvtColor(arr, cv2.COLOR_RGBA2BGR)
    alpha = arr[:, :, 3].astype(np.float32) / 255.0
    return bgr, alpha

WM_BGR, WM_ALPHA = create_protective_watermark()

# Load and scale base images to 2304x1296 (1.2x oversample for smooth zooms)
print("\n🖼️ Loading and High-Resolution Upscaling Holy Oil Paintings...")
BASE_IMAGES = []
for act in ACTS:
    p = os.path.join(SCENES_DIR, act["file"])
    img = cv2.imread(p)
    scaled = cv2.resize(img, (2304, 1296), interpolation=cv2.INTER_LANCZOS4)
    BASE_IMAGES.append(scaled)
    print(f"  ✅ Loaded {act['file']} -> {scaled.shape}")

# Particle System for Golden Camphor Embers, Forest Mist, Sandalwood & Lotus Petals
np.random.seed(18)
NUM_PARTICLES = 85
particles_x = np.random.uniform(0, WIDTH, NUM_PARTICLES)
particles_y = np.random.uniform(0, HEIGHT, NUM_PARTICLES)
particles_speed_y = np.random.uniform(0.7, 2.2, NUM_PARTICLES)
particles_speed_x = np.random.uniform(-0.6, 0.6, NUM_PARTICLES)
particles_size = np.random.uniform(2.0, 5.0, NUM_PARTICLES)
particles_type = np.random.choice([0, 1, 2], NUM_PARTICLES)

def render_act_frame(act_idx, local_frame):
    act = ACTS[act_idx]
    motion_type = act["type"]
    base_img = BASE_IMAGES[act_idx]
    t = local_frame / FRAMES_PER_ACT
    sec = local_frame / FPS

    # Devotional breath rhythm
    breath = 0.005 * math.sin(2 * math.pi * 0.16 * sec)

    if motion_type == "murugan_pan":
        # Sweeping cinematic pan from Lord Murugan's Vel across to Lord Ayyappa & the tiger
        zoom = 1.03 + 0.08 * t + breath
        center_x = 1000 + 200 * t
        center_y = 660 - 30 * t
        rot = 0.0
    elif motion_type == "tigress_charge":
        # Dynamic charge motion with Prince Manikandan riding through the jungle
        zoom = 1.02 + 0.14 * (t ** 1.2) + breath * 1.5
        center_x = 1152 - 40 * t
        center_y = 660 + 20 * t
        rot = 0.4 * math.sin(2 * math.pi * 0.7 * sec)
    elif motion_type == "mahishi_strike":
        # Climactic leap strike towards Mahishi with lightning pulse
        zoom = 1.04 + 0.16 * (t ** 1.1) + breath * 2.0
        center_x = 1152 + 30 * t
        center_y = 648 - 40 * t
        rot = 0.5 * math.sin(2 * math.pi * 1.5 * sec) * (1.0 - t)
    elif motion_type == "forest_trek":
        # Serene walking pan along the pilgrims trekking with Irumudi
        zoom = 1.04 + 0.08 * t + breath
        center_x = 1080 + 140 * t
        center_y = 670 - 40 * t
        rot = 0.0
    elif motion_type == "pampa_snanam":
        # Gentle floating diagonal pan over River Pampa and the infant Manikandan
        zoom = 1.03 + 0.09 * t + breath
        center_x = 1050 + 130 * t
        center_y = 690 - 50 * t
        rot = 0.0
    elif motion_type == "steps_climb":
        # Upward climbing vertical pan up the 18 sacred golden steps
        zoom = 1.06 + 0.12 * t + breath
        center_x = 1152
        center_y = 740 - 180 * t
        rot = 0.0
    elif motion_type == "darshan_sway":
        # Harmonic circular Harathi sway focusing on Chin-Mudra & Lord Ayyappa's smiling eyes
        harathi_cycle = 2 * math.pi * 0.4 * sec
        sway_x = 26 * math.sin(harathi_cycle)
        sway_y = 12 * math.cos(2 * harathi_cycle)
        zoom = 1.05 + 0.08 * math.sin(math.pi * t) + breath
        center_x = 1152 + sway_x
        center_y = 648 + sway_y
        rot = 0.7 * math.sin(harathi_cycle)
    else:  # makara_reveal
        # Majestic pull-out revealing the golden temple and celestial Makara Jyothi in twilight
        zoom = 1.18 - 0.14 * t + breath
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
    
    if act_idx == 1:  # Pulivahanam / jungle -> rising amber sparks & golden light motes
        particles_y -= particles_speed_y * 1.8
        particles_x += np.cos(local_frame * 0.07 + particles_speed_x) * 1.2
    elif act_idx == 2:  # Mahishi battle -> fierce swirling embers
        particles_y -= particles_speed_y * 2.5
        particles_x += np.cos(local_frame * 0.10 + particles_speed_x) * 1.6
    elif act_idx in [3, 4]:  # Forest / Pampa -> misty morning droplets & golden sparkles
        particles_y += particles_speed_y * 1.2
        particles_x += np.sin(local_frame * 0.05 + particles_speed_x) * 1.0
    elif act_idx in [5, 6]:  # 18 steps / Sannidhanam -> glowing camphor flames & incense
        particles_y -= particles_speed_y * 2.0
        particles_x += np.sin(local_frame * 0.06 + particles_speed_x) * 0.8
    else:  # Act 8: Makara Jyothi -> heavenly flower shower
        particles_y += particles_speed_y * 1.5
        particles_x += np.sin(local_frame * 0.04 + particles_speed_x) * 1.3

    particles_y %= HEIGHT
    particles_x %= WIDTH

    for i in range(0, NUM_PARTICLES, 2):
        px = int(particles_x[i])
        py = int(particles_y[i])
        rad = int(particles_size[i])

        if act_idx == 2:  # Battle: fiery orange-red
            color = (50, 130, 255)
        elif act_idx in [5, 6]:  # Harathi / steps: bright camphor fire gold
            color = (70, 185, 255)
        elif act_idx == 7:  # Flower shower: yellow & pink petals
            if particles_type[i] % 2 == 0:
                color = (100, 215, 255) # Yellow champa
            else:
                color = (190, 110, 255) # Pink lotus petal
        else:  # Divine gold
            color = (120, 220, 255)

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

def apply_watermark(frame):
    # Persistent anti-theft watermark across entire video
    frame = (frame * (1.0 - WM_ALPHA[:, :, None]) + WM_BGR * WM_ALPHA[:, :, None]).astype(np.uint8)
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
print("  Rendering 9,000 frames with camera motion, Harathi sway, watermark & sacred transitions...")

for act_idx in range(len(ACTS)):
    act_name = ACTS[act_idx]["title"]
    print(f"  🎥 Rendering Act {act_idx + 1}/8: {act_name} (Frames {act_idx * FRAMES_PER_ACT} to {(act_idx + 1) * FRAMES_PER_ACT})...")
    
    for lf in range(FRAMES_PER_ACT):
        curr_frame = render_act_frame(act_idx, lf)
        curr_frame = apply_particles(curr_frame, act_idx, lf)
        curr_frame = apply_banner(curr_frame, act_idx, lf)
        curr_frame = apply_watermark(curr_frame)
        
        # Cross-fade with next act during the last TRANSITION_FRAMES
        if lf >= FRAMES_PER_ACT - TRANSITION_FRAMES and act_idx < len(ACTS) - 1:
            fade_progress = (lf - (FRAMES_PER_ACT - TRANSITION_FRAMES)) / float(TRANSITION_FRAMES)
            next_frame = render_act_frame(act_idx + 1, lf - (FRAMES_PER_ACT - TRANSITION_FRAMES))
            next_frame = apply_particles(next_frame, act_idx + 1, 0)
            next_frame = apply_watermark(next_frame)
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
    "title": "🕉️ Swamiye Saranam Ayyappa 5 Minutes | Original Devotional Song & Sabarimala Darshan | Full HD 1080p",
    "description": (
        "॥ ॐ स्वामी शरणम् अय्यप्पा ॥ • ॥ ॐ श्री हरिहरपुत्राय नमः ॥\n\n"
        "Experience the cosmic divine grace and epic pilgrimage of Lord Sri Ayyappa Swami (Dharma Sastha) in this 5-minute continuous Full HD master movie. "
        "Set to the legendary, authentic devotional song 'Swamiye Saranam Ayyappa / Pallikattu Sabarimalaikku' by K. Veeramani, featuring classical oil painting human-form aesthetics: "
        "the celestial union of Lord Ayyappa and Lord Murugan (Kartikeya), Prince Manikandan fearlessly riding the Royal Tigress (Pulivahanam), the slaying of demoness Mahishi, "
        "devotees carrying the sacred Irumudi through misty ancient forests, the holy ascent of the 18 Golden Steps (Pathinettampadi), the supreme Chin-Mudra darshan, and the celestial Makara Jyothi!\n\n"
        "✨ CLASSICAL OIL PAINTING MASTERWORK & CINEMATIC CAMERA CHOREOGRAPHY\n"
        "🔥 100% PURE AUTHENTIC SACRED DEVOTIONAL MUSIC • ZERO CINEMATIC REMIX\n"
        "🛡️ EMBEDDED DIVYA MANGALAM PROTECTIVE WATERMARK\n"
        "🔔 Full HD 1080p Landscape Widescreen (16:9) Darshan\n\n"
        "📖 8 CANONICAL ACTS OF AYYAPPA SWAMI:\n"
        "00:00 • Act I: ॐ श्री हरिहरपुत्राय नमः (Celestial Union of Lord Ayyappa & Lord Murugan)\n"
        "00:37 • Act II: पुलिवाहन महाप्रभो (Prince Manikandan Riding the Royal Tigress)\n"
        "01:15 • Act III: महिषीमर्दन वरद (Slaying of Demoness Mahishi on River Azhutha)\n"
        "01:52 • Act IV: स्वामिये शरणम् अय्यप्पा (Pilgrims Carrying Sacred Irumudi through Forest)\n"
        "02:30 • Act V: पम्पातीर विहारिणे (Infant Manikandan Discovered at River Pampa)\n"
        "03:07 • Act VI: अष्टादश सुवर्ण सोपानम् (Reverent Ascent of the 18 Sacred Golden Steps)\n"
        "03:45 • Act VII: ॐ स्वामी शरणम् (Supreme Darshan of Lord Ayyappa in Sacred Chin-Mudra)\n"
        "04:22 • Act VIII: मकरविलक्कु • हरिवरासनम् (Sacred Makara Jyothi & Harivarasanam)\n\n"
        "॥ स्वामिये शरणम् अय्यप्पा ॥\n"
        "पल्लिकट्टु शबरिमलैक्कु कल्लुम् मुल्लुम् कालिर्कु मेत्तै\n"
        "स्वामिये अय्यप्पो ! अय्यप्पो स्वामिये !\n"
        "हरिवरासनम् विश्वमोहनम् हरिदधीश्वरम् आराध्यपादुकम्\n"
        "अरीविमर्दनम् नित्यनर्तनम् हरिवरासनम् शरणमस्तु ते ॥\n\n"
        "Swami Saranam! Ayyappa Saranam! 🚩\n\n"
        "✦ ──────────────────────── ✦\n"
        "🌐 Daily Vedic Panchang, Shlokas & Sanatana Epics: https://divyamangalam.com\n"
        "📸 Follow @divyamangalam.info on Instagram for daily divine darshan & sacred reels\n\n"
        "#SwamiyeSaranamAyyappa #AyyappaSwamy #Sabarimala #LordAyyappa #Murugan #LordMurugan #Harivarasanam #Pallikattu #Pathinettampadi #MakaraJyothi #SanatanaDharma #DivyaMangalam"
    ),
    "tags": [
        "Swamiye Saranam Ayyappa",
        "Ayyappa Swamy Songs",
        "Ayyappa 5 minutes",
        "Sabarimala Darshan",
        "Lord Ayyappa",
        "Lord Murugan",
        "Harivarasanam",
        "Pallikattu Sabarimalaikku",
        "Pathinettampadi",
        "Makara Jyothi",
        "K Veeramani",
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
