#!/usr/bin/env python3
"""
Divya Mangalam — High-Reach Viral YouTube Shorts & Reels Engine
Renders a 60-second vertical 1080x1920 video with:
- Sacred Aditya Hrudayam traditional hymn + resonant brass temple bell chime
- Calming, soulful Indian devotional narration
- 5 dynamic storyboard scenes with solar corona rays, glowing halos, and 24-hour Vedic Clock
- High-CTR viral title, tags, and SEO metadata
"""

import os
import sys
import math
import struct
import argparse
import datetime
import subprocess
import json
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def draw_star(draw, x, y, r, fill):
    points = []
    for i in range(16):
        radius = r if i % 2 == 0 else r * 0.45
        angle = i * math.pi / 8 - math.pi / 2
        points.append((x + radius * math.cos(angle), y + radius * math.sin(angle)))
    draw.polygon(points, fill=fill)

def render_viral_video(output_mp4="images/divyamangalam_surya_blessing_viral.mp4"):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    W, H = 1080, 1920
    FPS = 24
    DURATION = 60.0
    TOTAL_FRAMES = int(FPS * DURATION)

    temp_video = os.path.join(BASE_DIR, "temp_viral_video.mp4")
    master_audio = os.path.join(BASE_DIR, "audio", "viral_master_audio.wav")

    # Load Base Image of Lord Surya
    surya_img_path = os.path.join(BASE_DIR, "images", "surya_bhagavan.jpg")
    if os.path.exists(surya_img_path):
        base_surya = Image.open(surya_img_path).convert("RGBA")
    else:
        base_surya = Image.new("RGBA", (1024, 1024), (245, 158, 11, 255))

    # Fonts
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"
    font_indic = r"C:\Windows\Fonts\Nirmala.ttc"

    try:
        f_top_badge = ImageFont.truetype(font_bold, 36)
        f_hook_title = ImageFont.truetype(font_bold, 44)
        f_card_title = ImageFont.truetype(font_bold, 38)
        f_highlight = ImageFont.truetype(font_bold, 32)
        f_body = ImageFont.truetype(font_reg, 28)
        f_shloka = ImageFont.truetype(font_indic, 34)
        f_shubham = ImageFont.truetype(font_indic, 54)
        f_url = ImageFont.truetype(font_bold, 30)
    except Exception:
        f_top_badge = f_hook_title = f_card_title = f_highlight = f_body = f_shloka = f_shubham = f_url = ImageFont.load_default()

    print(f"[VIRAL ENGINE] Launching FFmpeg video renderer for {TOTAL_FRAMES} frames ({W}x{H} @ {FPS}fps)...")
    video_cmd = [
        ffmpeg_exe, '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{W}x{H}',
        '-pix_fmt', 'rgba',
        '-r', str(FPS),
        '-i', '-',
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-crf', '19',
        '-pix_fmt', 'yuv420p',
        temp_video
    ]
    proc = subprocess.Popen(video_cmd, stdin=subprocess.PIPE)

    CX = W // 2
    SUN_Y = 560
    IMG_SIZE = 570

    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS

        # Create cosmic dark temple background (Deep Indigo / Night sky meeting golden dawn)
        frame = Image.new("RGBA", (W, H), (12, 16, 32, 255))
        draw = ImageDraw.Draw(frame)

        # 1. Pulsating Solar Corona (Background Glow)
        pulse = 0.5 + 0.5 * math.sin(2 * math.pi * t * 0.35)
        rad_max = int(580 + 130 * pulse)
        for r_step in range(rad_max, 50, -45):
            alpha = int(40 * (1.0 - r_step / rad_max))
            draw.ellipse([CX - r_step, SUN_Y - r_step, CX + r_step, SUN_Y + r_step],
                         fill=(255, 150, 0, alpha))

        # 2. Rotating 24 Solar Rays
        n_rays = 24
        ray_rot = t * 7.5
        for i in range(n_rays):
            angle = math.radians(i * (360 / n_rays) + ray_rot)
            ray_len = rad_max + 70 + 35 * math.sin(i * 1.8 + t * 2.5)
            x_end = CX + int(ray_len * math.cos(angle))
            y_end = SUN_Y + int(ray_len * math.sin(angle))
            draw.line([CX, SUN_Y, x_end, y_end], fill=(255, 215, 0, 38), width=4)

        # 3. Dynamic Zoom Hero Art of Lord Surya
        zoom = 1.0 + 0.045 * math.sin(2 * math.pi * t * 0.12)
        cur_sz = int(IMG_SIZE * zoom)
        scaled_art = base_surya.resize((cur_sz, cur_sz), Image.Resampling.LANCZOS)
        left = (cur_sz - IMG_SIZE) // 2
        cropped_art = scaled_art.crop((left, left, left + IMG_SIZE, left + IMG_SIZE))

        # Circular Mask
        mask = Image.new("L", (IMG_SIZE, IMG_SIZE), 0)
        m_draw = ImageDraw.Draw(mask)
        m_draw.ellipse([0, 0, IMG_SIZE, IMG_SIZE], fill=255)

        art_x = CX - IMG_SIZE // 2
        art_y = SUN_Y - IMG_SIZE // 2
        frame.paste(cropped_art, (art_x, art_y), mask)

        # Triple Golden Halo Borders
        draw.ellipse([art_x - 6, art_y - 6, art_x + IMG_SIZE + 6, art_y + IMG_SIZE + 6],
                     outline='#FFD700', width=6)
        draw.ellipse([art_x - 14, art_y - 14, art_x + IMG_SIZE + 14, art_y + IMG_SIZE + 14],
                     outline='#F59E0B', width=3)
        draw.ellipse([art_x - 22, art_y - 22, art_x + IMG_SIZE + 22, art_y + IMG_SIZE + 22],
                     outline='#FBBF24', width=1)

        # 4. Header Top Banner (High-CTR Hook)
        draw.rounded_rectangle([60, 60, W - 60, 160], radius=18, fill=(24, 30, 52, 230), outline='#FFD700', width=2)
        draw.text((CX, 95), "DIVYA MANGALAM", fill='#FFD700', font=f_top_badge, anchor='mm')
        draw.text((CX, 135), "✦ RAVIVARA • LORD SURYA NARAYANA ✦", fill='#FEF08A', font=f_highlight, anchor='mm')

        # 5. Dynamic Sanskrit Shloka Ribbon
        shloka_y = SUN_Y + IMG_SIZE // 2 + 35
        draw.rounded_rectangle([60, shloka_y, W - 60, shloka_y + 75], radius=15, fill=(30, 41, 59, 230), outline='#FFD700', width=2)
        draw.text((CX, shloka_y + 38), "॥ ॐ सूर्याय नमः • ॐ घृणिः सूर्याय नमः ॥", fill='#FFFFFF', font=f_shloka, anchor='mm')

        # 6. Multi-Scene Narrative Card (Below Image)
        CARD_Y = shloka_y + 95
        CARD_H = 430
        draw.rounded_rectangle([60, CARD_Y, W - 60, CARD_Y + CARD_H], radius=22, fill=(15, 23, 42, 240), outline='#F59E0B', width=2)

        # Determine Narrative Scene
        if t < 12.0:
            # SCENE 1: Divine Dawn & Awakening (0s - 12s)
            draw.text((95, CARD_Y + 40), "THE ETERNAL WITNESS RISES", fill='#FFD700', font=f_card_title)
            draw.text((95, CARD_Y + 95), "Awakening Health, Courage & Vitality", fill='#FFFFFF', font=f_highlight)
            draw.text((95, CARD_Y + 160), "Bhagavan Surya Narayana rides His celestial chariot", fill='#E2E8F0', font=f_body)
            draw.text((95, CARD_Y + 205), "drawn by seven radiant horses across the cosmic skies.", fill='#E2E8F0', font=f_body)
            draw.text((95, CARD_Y + 265), "His divine light dispels all inner doubts and darkness.", fill='#CBD5E1', font=f_body)
            draw.text((95, CARD_Y + 340), "✦ Receive the sacred solar blessings today ✦", fill='#FDE68A', font=f_highlight)

        elif t < 25.0:
            # SCENE 2: Sacred Arghya & Stotram (12s - 25s)
            draw.text((95, CARD_Y + 40), "SACRED SURYA ARGHYA & STOTRAM", fill='#FFD700', font=f_card_title)
            draw.text((95, CARD_Y + 95), "Aditya Hridaya — The Hymn of Eternal Victory", fill='#FFFFFF', font=f_highlight)
            draw.rounded_rectangle([95, CARD_Y + 155, W - 95, CARD_Y + 270], radius=12, fill=(39, 39, 42, 190), outline='#FFD700', width=1)
            draw.text((CX, CARD_Y + 190), "आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम् ।", fill='#FDE68A', font=f_shloka, anchor='mm')
            draw.text((CX, CARD_Y + 235), "जयावहं जपेन्नित्यम् अक्षय्यं परमं शिवम् ॥", fill='#FDE68A', font=f_shloka, anchor='mm')
            draw.text((95, CARD_Y + 310), "Offer pure water facing east for physical & mental strength.", fill='#E2E8F0', font=f_body)
            draw.text((95, CARD_Y + 355), "Chanting brings triumph over inner and outer challenges.", fill='#CBD5E1', font=f_body)

        elif t < 40.0:
            # SCENE 3: Auspicious Panchang Timings (25s - 40s)
            draw.text((95, CARD_Y + 35), "TODAY'S 24-HOUR VEDIC TIMINGS", fill='#FFD700', font=f_card_title)
            # Abhijit Muhurta Card (Green)
            draw.rounded_rectangle([95, CARD_Y + 85, W - 95, CARD_Y + 185], radius=14, fill=(6, 78, 59, 230), outline='#10B981', width=2)
            draw.text((125, CARD_Y + 118), "★ ABHIJIT MUHURTA: 11:45 AM – 12:35 PM", fill='#A7F3D0', font=f_highlight, anchor='lm')
            draw.text((125, CARD_Y + 155), "Most auspicious window for new beginnings & prayer", fill='#D1FAE5', font=f_body, anchor='lm')
            # Rahu Kaal Card (Red)
            draw.rounded_rectangle([95, CARD_Y + 205, W - 95, CARD_Y + 305], radius=14, fill=(127, 29, 29, 230), outline='#EF4444', width=2)
            draw.text((125, CARD_Y + 238), "⚠ RAHU KAAL: 04:30 PM – 06:00 PM", fill='#FECACA', font=f_highlight, anchor='lm')
            draw.text((125, CARD_Y + 275), "Inauspicious window — avoid new ventures, chant Gayatri", fill='#FEE2E2', font=f_body, anchor='lm')
            draw.text((CX, CARD_Y + 360), "✦ Align your daily actions with cosmic timing ✦", fill='#FEF08A', font=f_highlight, anchor='mm')

        elif t < 52.0:
            # SCENE 4: Divine Aarti & Protection (40s - 52s)
            draw.text((95, CARD_Y + 40), "DIVINE PROTECTION & PROSPERITY", fill='#FFD700', font=f_card_title)
            draw.text((95, CARD_Y + 95), "Surrender Fears to the Supreme Light", fill='#FFFFFF', font=f_highlight)
            draw.text((95, CARD_Y + 160), "May Surya Deva remove all illness, anxiety, and fear.", fill='#E2E8F0', font=f_body)
            draw.text((95, CARD_Y + 210), "Fill your home and heart with peace, harmony, and joy.", fill='#E2E8F0', font=f_body)
            draw.text((95, CARD_Y + 275), "Arogyam Bhaskarad Ichhet — Health flows from the Sun.", fill='#FFD700', font=f_highlight)
            draw.text((95, CARD_Y + 340), "✦ Radiate positive energy and auspiciousness ✦", fill='#FDE68A', font=f_body)

        else:
            # SCENE 5: Shubham Bhavatu & CTA (52s - 60s)
            draw.text((CX, CARD_Y + 65), "॥ शुभं भवतु ॥", fill='#FFD700', font=f_shubham, anchor='mm')
            draw.text((CX, CARD_Y + 130), "MAY ALL AUSPICIOUS BLESSINGS BE YOURS", fill='#FFFFFF', font=f_highlight, anchor='mm')
            draw.text((CX, CARD_Y + 190), "Daily 24h Vedic Clock & Free AI Palmistry:", fill='#E2E8F0', font=f_body, anchor='mm')
            draw.text((CX, CARD_Y + 240), "👉 https://divyamangalam.com 👈", fill='#FFD700', font=f_card_title, anchor='mm')
            draw.text((CX, CARD_Y + 310), "🔔 Like & Subscribe for Daily Sacred Darshan", fill='#67E8F9', font=f_highlight, anchor='mm')
            draw.text((CX, CARD_Y + 360), "Instagram: @divyamangalam.info • YouTube: @DivyaMangalam", fill='#FEF08A', font=f_body, anchor='mm')

        # 7. Permanent Professional Footer CTA
        draw_star(draw, 90, H - 90, 8, '#FFD700')
        draw.text((CX, H - 90), "✦ Divya Mangalam • YouTube Shorts & Daily Darshan ✦", fill='#FFD700', font=f_url, anchor='mm')
        draw_star(draw, W - 90, H - 90, 8, '#FFD700')
        draw.text((CX, H - 45), "divyamangalam.com • Follow @divyamangalam.info", fill='#CBD5E1', font=f_body, anchor='mm')

        # Push raw RGBA frame to FFmpeg pipe
        proc.stdin.write(frame.tobytes())

        if (frame_idx + 1) % 120 == 0:
            print(f"[VIRAL ENGINE] Rendered {frame_idx + 1}/{TOTAL_FRAMES} frames ({(frame_idx + 1)/FPS:.1f}s / {DURATION:.0f}s)...")

    proc.stdin.close()
    proc.wait()

    # Mux with master audio
    print("[VIRAL ENGINE] Muxing video frames with master audio soundtrack...")
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4)), exist_ok=True)
    mux_cmd = [
        ffmpeg_exe, '-y',
        '-i', temp_video,
        '-i', master_audio,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        output_mp4
    ]
    subprocess.run(mux_cmd, check=True)

    if os.path.exists(temp_video):
        try: os.remove(temp_video)
        except Exception: pass

    print(f"\n[SUCCESS] Viral YouTube Video created at: {output_mp4} ({os.path.getsize(output_mp4) / (1024*1024):.2f} MB)")

    # Save complete viral YouTube Metadata
    meta_path = output_mp4.replace('.mp4', '_youtube_metadata.json')
    meta = {
        "title": "☀️ Om Suryaya Namah — Sunday Surya Puja & Auspicious Timings | Divya Mangalam #Shorts",
        "description": f"""☀️ Divine Blessings of Bhagavan Surya Narayana (Ravivara / Sunday)
Om Suryaya Namah! Let the golden rays of Lord Surya Narayana illuminate your soul with boundless health, courage, and vitality.

✨ SACRED STORY & PANCHANG TIMINGS:
• 00:00 - Opening Invocation & Divine Darshan
• 00:12 - Sacred Arghya & Aditya Hridaya Stotram
• 00:25 - Abhijit Muhurta (11:45 AM – 12:35 PM) & Rahu Kaal Guidance
• 00:40 - Surrendering Fear & Receiving Solar Immunity
• 00:52 - Shubham Bhavatu & Divine Blessings

🌿 Explore 10-Year Interactive Vedic Clock & Free AI Palmistry:
👉 Website: https://divyamangalam.com
👉 Instagram: https://instagram.com/divyamangalam.info

🔔 Subscribe to @DivyaMangalam for daily sacred darshan, panchang timings, and Vedic wisdom!

#Shorts #YouTubeShorts #OmSuryayaNamah #SuryaNarayana #AdityaHridayaStotram #SundayBlessings #SuryaDev #Panchang #AbhijitMuhurta #SanatanaDharma #DivyaMangalam #VedicAstrology #DailyDarshan #SpiritualShorts""",
        "tags": [
            "Om Suryaya Namah", "Surya Narayana", "Lord Surya", "Aditya Hridaya Stotram",
            "Sunday Blessings", "Surya Puja", "Abhijit Muhurta", "Rahu Kaal", "Panchang",
            "Divya Mangalam", "Vedic Astrology", "Hindu Devotional", "Daily Darshan",
            "YouTube Shorts", "Shorts", "Bhakti", "Sanatana Dharma"
        ],
        "category": "22",
        "privacyStatus": "public"
    }

    with open(meta_path, 'w', encoding='utf-8') as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)
    print(f"[METADATA] Viral YouTube SEO metadata saved at: {meta_path}")
    return output_mp4

if __name__ == '__main__':
    render_viral_video()
