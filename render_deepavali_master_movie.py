#!/usr/bin/env python3
"""
Divya Mangalam — Shubh Deepavali (Diwali) Special Master Movie
Festival of Lights • Classical Vedic Oil Painting Aesthetics
Features:
- Goddess Maha Lakshmi Lotus Darshan & Dhanalakshmi Grace
- Sri Ganesha & Maha Lakshmi Deepavali Maha Puja
- Ayodhya Deepotsav with Bhagwan Sri Rama, Mata Sita, Lakshmana, Hanuman
- Grand Deepotsav Diya Mandalas & Festive Illuminations
- Authentic Devotional Chanting + Inspiring Vedic Hindi Narration
- Dual Output: 1920x1080 16:9 Master (YouTube) + 1080x1920 9:16 (Instagram Reels & Shorts)
- GPU-Accelerated Hardware NVENC (NVIDIA GeForce GTX 1650)
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
IMAGES_DIR = os.path.join(BASE_DIR, "images")
AUDIO_FILE = os.path.join(BASE_DIR, "audio", "deepavali_master_soundtrack.mp3")
MASTER_OUTPUT = os.path.join(IMAGES_DIR, "deepavali_wishes_master_1080p.mp4")
INSTAGRAM_OUTPUT = os.path.join(IMAGES_DIR, "deepavali_wishes_instagram_reel.mp4")
METADATA_OUTPUT = os.path.join(IMAGES_DIR, "deepavali_wishes_youtube_metadata.json")

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

FPS = 30
WIDTH = 1920
HEIGHT = 1080
TOTAL_DURATION = 64.0  # Exactly 64.00 seconds
TOTAL_FRAMES = int(TOTAL_DURATION * FPS)  # 1920 frames

ACT_DURATION = 16.0
FRAMES_PER_ACT = int(ACT_DURATION * FPS)  # 480 frames
TRANSITION_FRAMES = 24  # 0.8s cross-dissolve

ACTS = [
    {
        "id": 1,
        "file": "deepavali_maha_lakshmi.jpg",
        "title": "ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः • धनलक्ष्मी अनुग्रह",
        "subtitle": "Divine Grace of Goddess Maha Lakshmi • Shower of Prosperity & Light",
        "type": "zoom_in"
    },
    {
        "id": 2,
        "file": "deepavali_lakshmi_ganesha.jpg",
        "title": "दीपज्योतिः परब्रह्म • श्री गणेश-लक्ष्मी महापूजा",
        "subtitle": "Auspicious Deepavali Puja • Wisdom of Lord Ganesha & Fortune of Lakshmi",
        "type": "zoom_pan"
    },
    {
        "id": 3,
        "file": "deepavali_ayodhya_rama_sita.jpg",
        "title": "श्री रामचन्द्र कृपालु भजु मन • पावन अयोध्या दीपोत्सव",
        "subtitle": "Bhagwan Sri Rama's Divine Return to Ayodhya • Illumination of Sacred Sarayu",
        "type": "river_pan"
    },
    {
        "id": 4,
        "file": "deepavali_deepotsav_diyas.jpg",
        "title": "तमसो मा ज्योतिर्गमय • प्रकाश महापर्व शुभ दीपावली",
        "subtitle": "Festival of Lights • Victory of Divine Light Over Darkness • Happy Deepavali",
        "type": "diya_glow"
    }
]

# Load Fonts
FONT_NIRMALA_BOLD = r"C:\Windows\Fonts\NirmalaB.ttf"
if not os.path.exists(FONT_NIRMALA_BOLD):
    FONT_NIRMALA_BOLD = r"C:\Windows\Fonts\Nirmala.ttc"

FONT_SEGOE_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_SEGOE_REG = r"C:\Windows\Fonts\segoeui.ttf"

try:
    font_badge = ImageFont.truetype(FONT_SEGOE_BOLD, 26)
    font_title = ImageFont.truetype(FONT_NIRMALA_BOLD, 42)
    font_subtitle = ImageFont.truetype(FONT_SEGOE_REG, 26)
    font_watermark = ImageFont.truetype(FONT_SEGOE_BOLD, 24)
except Exception as e:
    print("Font loading error:", e)
    font_badge = font_title = font_subtitle = font_watermark = ImageFont.load_default()

def prebake_overlay(act):
    """Pre-renders the static overlay into BGR and Alpha arrays for sub-millisecond composition"""
    pil_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(pil_img, "RGBA")
    
    # 1. Top Badges & Watermark
    draw.rectangle([(0, 0), (WIDTH, 75)], fill=(12, 10, 18, 185))
    draw.line([(0, 75), (WIDTH, 75)], fill=(255, 215, 0, 215), width=2)
    
    # Top Left Festive Badge
    badge_text = "✨ DIVYA MANGALAM • शुभ दीपावली विशेष • FESTIVAL OF LIGHTS ✨"
    draw.text((40, 22), badge_text, font=font_badge, fill=(255, 223, 128, 255))
    
    # Top Right Watermark Shield
    wm_text = "DIVYAMANGALAM.COM"
    bbox = draw.textbbox((0, 0), wm_text, font=font_watermark)
    wm_w = bbox[2] - bbox[0]
    wm_x = WIDTH - wm_w - 45
    draw.rounded_rectangle([(wm_x - 14, 15), (wm_x + wm_w + 14, 58)], radius=8, fill=(20, 15, 25, 230), outline=(255, 200, 50, 230), width=2)
    draw.text((wm_x, 23), wm_text, font=font_watermark, fill=(255, 235, 140, 255))
    
    # 2. Lower Third Sacred Prayer Card
    card_h = 160
    card_y = HEIGHT - card_h - 40
    
    # Backdrop gradient
    draw.rounded_rectangle([(70, card_y), (WIDTH - 70, card_y + card_h)], radius=18, fill=(10, 8, 14, 215), outline=(230, 185, 50, 225), width=2)
    
    # Inner gold border
    draw.rounded_rectangle([(76, card_y + 6), (WIDTH - 76, card_y + card_h - 6)], radius=14, outline=(255, 225, 100, 95), width=1)
    
    # Act Indicator dot
    act_id = act["id"]
    for i in range(1, 5):
        cx = 120 + (i - 1) * 35
        cy = card_y + 35
        color = (255, 215, 0, 255) if i == act_id else (100, 90, 80, 160)
        draw.ellipse([(cx - 7, cy - 7), (cx + 7, cy + 7)], fill=color)
    
    # Act Title (Hindi / Sanskrit)
    draw.text((270, card_y + 20), act["title"], font=font_title, fill=(255, 245, 200, 255))
    
    # Subtitle (English)
    draw.text((270, card_y + 88), act["subtitle"], font=font_subtitle, fill=(220, 215, 225, 240))
    
    # Split into BGR and float alpha
    rgba = np.array(pil_img)
    bgr = cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2BGR)
    alpha = (rgba[:, :, 3].astype(np.float32) / 255.0)[:, :, np.newaxis]
    return bgr, alpha

def create_act_frame(img_bgr, act, local_f, total_act_f):
    h, w = img_bgr.shape[:2]
    progress = local_f / total_act_f
    
    act_type = act.get("type", "zoom_in")
    if act_type == "zoom_in":
        zoom = 1.0 + 0.10 * progress
        crop_w = int(w / zoom)
        crop_h = int(h / zoom)
        x1 = int((w - crop_w) / 2)
        y1 = int((h - crop_h) / 2)
    elif act_type == "zoom_pan":
        zoom = 1.08
        crop_w = int(w / zoom)
        crop_h = int(h / zoom)
        x1 = int((w - crop_w) * (0.3 + 0.4 * progress))
        y1 = int((h - crop_h) * 0.4)
    elif act_type == "river_pan":
        zoom = 1.08
        crop_w = int(w / zoom)
        crop_h = int(h / zoom)
        x1 = int((w - crop_w) * (0.2 + 0.6 * (1.0 - progress)))
        y1 = int((h - crop_h) * 0.35)
    else:  # diya_glow
        zoom = 1.0 + 0.08 * progress
        crop_w = int(w / zoom)
        crop_h = int(h / zoom)
        x1 = int((w - crop_w) / 2)
        y1 = int((h - crop_h) * 0.5)
    
    x1 = max(0, min(w - crop_w, x1))
    y1 = max(0, min(h - crop_h, y1))
    cropped = img_bgr[y1:y1+crop_h, x1:x1+crop_w]
    return cv2.resize(cropped, (WIDTH, HEIGHT), interpolation=cv2.INTER_LINEAR)

def render_movie():
    print("==================================================")
    print("🎬 DIVYA MANGALAM — SHUBH DEEPAVALI MASTER MOVIE (NVENC ACCELERATED)")
    print(f"Target: {MASTER_OUTPUT}")
    print(f"Resolution: {WIDTH}x{HEIGHT} @ {FPS} fps | Duration: {TOTAL_DURATION}s")
    print("==================================================")
    
    act_images = []
    act_overlays = []
    for act in ACTS:
        path = os.path.join(IMAGES_DIR, act["file"])
        if not os.path.exists(path):
            raise FileNotFoundError(f"Missing act image: {path}")
        img = cv2.imread(path)
        act_images.append(img)
        overlay_bgr, overlay_alpha = prebake_overlay(act)
        act_overlays.append((overlay_bgr, overlay_alpha))
        print(f"Loaded Act {act['id']}: {act['file']} ({img.shape[1]}x{img.shape[0]})")
    
    temp_video = os.path.join(IMAGES_DIR, "temp_deepavali_video_raw.mp4")
    
    # Try NVENC first, fallback to CPU
    encoder_args = ['-c:v', 'h264_nvenc', '-preset', 'p4', '-cq', '20']
    
    ffmpeg_cmd = [
        ffmpeg, '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f"{WIDTH}x{HEIGHT}",
        '-pix_fmt', 'bgr24',
        '-r', str(FPS),
        '-i', '-',
        *encoder_args,
        '-pix_fmt', 'yuv420p',
        temp_video
    ]
    
    try:
        proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
    except Exception as e:
        print("NVENC error, falling back to libx264 veryfast:", e)
        ffmpeg_cmd = [
            ffmpeg, '-y',
            '-f', 'rawvideo',
            '-vcodec', 'rawvideo',
            '-s', f"{WIDTH}x{HEIGHT}",
            '-pix_fmt', 'bgr24',
            '-r', str(FPS),
            '-i', '-',
            '-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '20',
            '-pix_fmt', 'yuv420p',
            temp_video
        ]
        proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
    
    t0 = time.time()
    
    # Top overlay region: rows 0 to 76
    # Bottom overlay region: rows 875 to 1055
    y_top_end = 76
    y_bot_start = 875
    y_bot_end = 1055
    
    for act_idx, act in enumerate(ACTS):
        cur_img = act_images[act_idx]
        cur_bgr, cur_alpha = act_overlays[act_idx]
        next_idx = (act_idx + 1) % len(ACTS)
        next_img = act_images[next_idx]
        next_bgr, next_alpha = act_overlays[next_idx]
        
        print(f"\nRendering Act {act['id']}/4: {act['title'][:40]}...")
        
        for local_f in range(FRAMES_PER_ACT):
            global_f = act_idx * FRAMES_PER_ACT + local_f
            
            # Base frame for current act
            frame = create_act_frame(cur_img, act, local_f, FRAMES_PER_ACT)
            
            # Cross dissolve into next act during the last TRANSITION_FRAMES
            if local_f >= (FRAMES_PER_ACT - TRANSITION_FRAMES) and act_idx < (len(ACTS) - 1):
                blend_f = local_f - (FRAMES_PER_ACT - TRANSITION_FRAMES)
                blend_ratio = blend_f / float(TRANSITION_FRAMES)
                next_frame = create_act_frame(next_img, ACTS[next_idx], blend_f, FRAMES_PER_ACT)
                frame = cv2.addWeighted(frame, 1.0 - blend_ratio, next_frame, blend_ratio, 0)
                
                active_bgr = cv2.addWeighted(cur_bgr, 1.0 - blend_ratio, next_bgr, blend_ratio, 0)
                active_alpha = (1.0 - blend_ratio) * cur_alpha + blend_ratio * next_alpha
            else:
                active_bgr = cur_bgr
                active_alpha = cur_alpha
            
            # Regional Alpha Blend on top and bottom regions only (leaving center untouched for speed)
            top_f = frame[:y_top_end, :]
            top_bgr = active_bgr[:y_top_end, :]
            top_a = active_alpha[:y_top_end, :]
            frame[:y_top_end, :] = (top_f * (1.0 - top_a) + top_bgr * top_a).astype(np.uint8)
            
            bot_f = frame[y_bot_start:y_bot_end, :]
            bot_bgr = active_bgr[y_bot_start:y_bot_end, :]
            bot_a = active_alpha[y_bot_start:y_bot_end, :]
            frame[y_bot_start:y_bot_end, :] = (bot_f * (1.0 - bot_a) + bot_bgr * bot_a).astype(np.uint8)
            
            proc.stdin.write(frame.tobytes())
            
            if local_f % 60 == 0 or local_f == (FRAMES_PER_ACT - 1):
                elapsed = time.time() - t0
                fps_render = (global_f + 1) / max(0.001, elapsed)
                sys.stdout.write(f"\r  Frame {global_f+1}/{TOTAL_FRAMES} ({((global_f+1)/TOTAL_FRAMES)*100:.1f}%) | Speed: {fps_render:.1f} fps | Elapsed: {elapsed:.1f}s")
                sys.stdout.flush()
                
    proc.stdin.close()
    proc.wait()
    print(f"\nRaw video render complete in {time.time()-t0:.1f}s")
    
    # Multiplex with audio
    print("\nMuxing with Master Deepavali Audio...")
    mux_cmd = [
        ffmpeg, '-y',
        '-i', temp_video,
        '-i', AUDIO_FILE,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '320k',
        '-shortest',
        MASTER_OUTPUT
    ]
    subprocess.run(mux_cmd, check=True)
    if os.path.exists(temp_video):
        os.remove(temp_video)
        
    master_mb = os.path.getsize(MASTER_OUTPUT) / (1024*1024)
    print(f"🎉 MASTER 1080p LANDSCAPE VIDEO CREATED: {MASTER_OUTPUT} ({master_mb:.2f} MB)")
    
    # Generate Instagram Reel 9:16 (1080x1920) with NVENC
    print("\nRendering 9:16 Vertical Instagram Reel...")
    reel_filter = (
        "[0:v]split=2[bg][fg];"
        "[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=20:5[bg_blur];"
        "[fg]scale=1080:608[fg_scaled];"
        "[bg_blur][fg_scaled]overlay=0:(1920-608)/2"
    )
    reel_cmd = [
        ffmpeg, '-y',
        '-i', MASTER_OUTPUT,
        '-vf', reel_filter,
        '-c:v', 'h264_nvenc',
        '-preset', 'p4',
        '-cq', '20',
        '-c:a', 'copy',
        INSTAGRAM_OUTPUT
    ]
    try:
        subprocess.run(reel_cmd, check=True)
    except Exception:
        reel_cmd[reel_cmd.index('h264_nvenc')] = 'libx264'
        subprocess.run(reel_cmd, check=True)
        
    reel_mb = os.path.getsize(INSTAGRAM_OUTPUT) / (1024*1024)
    print(f"🎉 INSTAGRAM REEL (9:16) CREATED: {INSTAGRAM_OUTPUT} ({reel_mb:.2f} MB)")
    
    # Write YouTube Metadata
    metadata = {
        "title": "🕉️ Shubh Deepavali 2026 • Festival of Lights Special Devotional Movie | Divya Mangalam",
        "description": "Experience the supreme divine blessings of Goddess Maha Lakshmi & Lord Ganesha on Shubh Deepavali!\n\nCelebrate the grand Ayodhya Deepotsav commemorating Bhagwan Sri Rama's triumphant return after 14 years, illuminated by millions of sacred clay diyas along River Sarayu.\n\n📖 SACRED CHAPTERS:\n00:00 • 1. ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः (Goddess Maha Lakshmi Darshan & Dhanalakshmi Grace)\n00:16 • 2. दीपज्योतिः परब्रह्म (Auspicious Deepavali Puja with Lord Ganesha & Maha Lakshmi)\n00:32 • 3. अयोध्या दीपोत्सव (Bhagwan Sri Rama's Return to Ayodhya & Illumination of Sarayu)\n00:48 • 4. तमसो मा ज्योतिर्गमय (Festival of Lights • Victory of Light over Darkness)\n\n🌸 Sacred Chant: Maha Lakshmi Gayatri & Deepa Shloka\n🛡️ Official Divya Mangalam Anti-Theft Watermark Embedded\n🔔 Full HD 1080p Landscape Cinema\n\nExplore free Vedic Panchang, AI Palmistry & Scriptures:\nWebsite: https://divyamangalam.com\nInstagram: @divyamangalam.info\n\n#Deepavali #Diwali #HappyDiwali #MahaLakshmi #GoddessLakshmi #LordRama #Ayodhya #AyodhyaDeepotsav #SanatanaDharma #DivyaMangalam #DiwaliSpecial #FestivalOfLights",
        "tags": [
            "Deepavali",
            "Diwali",
            "Happy Diwali",
            "Maha Lakshmi",
            "Goddess Lakshmi",
            "Ayodhya Deepotsav",
            "Lord Rama",
            "Diwali Puja",
            "Divya Mangalam",
            "Sanatana Dharma",
            "Vedic",
            "Festival of Lights",
            "Shorts",
            "Devotional"
        ],
        "category": "22",
        "privacyStatus": "public"
    }
    with open(METADATA_OUTPUT, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    print(f"Saved YouTube metadata to {METADATA_OUTPUT}")

if __name__ == '__main__':
    render_movie()
