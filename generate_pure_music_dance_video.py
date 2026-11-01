#!/usr/bin/env python3
"""
Divya Mangalam — Pure Music & Divine Motion Dance Video Generator
Features:
- 100% PURE SACRED MUSIC (Zero voiceover, zero description audio)
- Dynamic Cosmic Dance / Motion (Rhythmic bass pulsation, lateral dance sway, rotating Agni ring of fire, radiating energy sparks)
- High-definition typography for Sanskrit Stotrams
- Supports 60s (Shorts) and up to 5 minutes (Full YouTube Video)
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

SHIVA_SHLOKAS = [
    ("जटाटवीगलज्जलप्रवाहपावितस्थले", "गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।", "डमड्डमड्डमड्डमन्निनादवड्डमर्वयं", "चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥"),
    ("जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी-", "विलोलवीचिवल्लरीविराजमानमूर्धनि ।", "धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके", "किशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥"),
    ("धराधरेन्द्रनन्दिनीविलासबन्धुबन्धुर-", "स्फुरद्दिगन्तसन्ततिप्रमोदमानमानसे ।", "कृपाकटाक्षधोरणीनिरुद्धदुर्धरापदि", "क्वचिद्दिगम्बरे मनो विनोदमेतु वस्तुनि ॥"),
    ("सहस्रलोचनप्रभृत्यशेषलेखशेखर-", "प्रसूनधूलिधोरणीविधूसराङ्घ्रिपीठभूः ।", "भुजङ्गराजमालया निबद्धजाटजूटकः", "श्रियै चिराय जायतां चकोरबन्धुशेखरः ॥"),
    ("ललाटचत्वरज्वलद्धनञ्जयस्फुलिङ्गभा-", "निपीतपञ्चसायकं नमन्निलिम्पनायकम् ।", "सुधामयूखलेखया विराजमानशेखरं", "महाकपालिसम्पदेशिरोजटालमस्तु नः ॥")
]

def render_dance_video(deity="shiva", mode="shorts", duration=60.0, output_mp4=None):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    if mode == "shorts":
        W, H = 1080, 1920
        if output_mp4 is None:
            output_mp4 = os.path.join(BASE_DIR, "images", f"{deity}_tandava_dance_shorts.mp4")
    else:
        W, H = 1920, 1080
        if output_mp4 is None:
            output_mp4 = os.path.join(BASE_DIR, "images", f"{deity}_tandava_dance_5min.mp4")

    FPS = 24
    TOTAL_FRAMES = int(FPS * duration)

    temp_video = os.path.join(BASE_DIR, "temp_dance_video.mp4")
    temp_music = os.path.join(BASE_DIR, "temp_dance_music.wav")

    # Select Music
    if deity == "shiva":
        music_source = os.path.join(BASE_DIR, "audio", "shiva_tandava.mp3")
        art_path = os.path.join(BASE_DIR, "images", "shiva_kailash.jpg")
        theme_title = "LORD SHIVA • ANANDA TANDAVA"
        theme_accent = "#38BDF8"
        theme_fire = "#F97316"
    else:
        music_source = os.path.join(BASE_DIR, "audio", "aditya_hrudayam.mp3")
        art_path = os.path.join(BASE_DIR, "images", "surya_bhagavan.jpg")
        theme_title = "BHAGAVAN SURYA • CELESTIAL MOTION"
        theme_accent = "#FFD700"
        theme_fire = "#EA580C"

    # Extract exact duration of pure music (NO VOICEOVER)
    print(f"[DANCE ENGINE] Sourcing {duration}s of pure sacred music from {os.path.basename(music_source)}...")
    subprocess.run([
        ffmpeg_exe, '-y',
        '-ss', '00:00:00', '-t', str(duration),
        '-i', music_source,
        '-af', 'afade=t=out:st=' + str(duration - 2.5) + ':d=2.5',
        '-c:a', 'pcm_s16le',
        temp_music
    ], check=True)

    # Load Base Art
    if os.path.exists(art_path):
        base_art = Image.open(art_path).convert("RGBA")
    else:
        base_art = Image.new("RGBA", (1024, 1024), (30, 41, 59, 255))

    # Fonts
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"
    font_indic = r"C:\Windows\Fonts\Nirmala.ttc"

    try:
        f_title = ImageFont.truetype(font_bold, 40 if mode=="shorts" else 32)
        f_sub = ImageFont.truetype(font_bold, 28 if mode=="shorts" else 22)
        f_shloka = ImageFont.truetype(font_indic, 34 if mode=="shorts" else 26)
        f_url = ImageFont.truetype(font_bold, 30 if mode=="shorts" else 22)
    except Exception:
        f_title = f_sub = f_shloka = f_url = ImageFont.load_default()

    print(f"[DANCE ENGINE] Rendering {TOTAL_FRAMES} frames ({duration}s at {FPS}fps, {W}x{H})...")
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
    CENTER_Y = 640 if mode == "shorts" else 540
    BASE_SZ = 620 if mode == "shorts" else 500

    # Fast BPM pulse for dance rhythm (120 BPM = 2 beats per second)
    BEAT_FREQ = 2.0

    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS

        # Deep cosmic space background with drifting stars
        frame = Image.new("RGBA", (W, H), (8, 12, 28, 255))
        draw = ImageDraw.Draw(frame)

        # 1. Background Nebula / Cosmic Dance Aura
        for star_i in range(35):
            sx = int((CX + 700 * math.cos(star_i * 0.35 + t * 0.08)) % W)
            sy = int((CENTER_Y + 700 * math.sin(star_i * 0.45 + t * 0.1)) % H)
            s_bright = int(140 + 110 * math.sin(star_i + t * 3.0))
            draw.ellipse([sx - 2, sy - 2, sx + 2, sy + 2], fill=(255, 255, 255, s_bright))

        # 2. DANCE RHYTHMIC MOTION CALCULATION
        # The deity breathes and moves to the rhythm of the Tandava damru beat:
        # Scale pulsation (kick pulse on every beat)
        beat_phase = (t * BEAT_FREQ) % 1.0
        # Exponential bounce decay on each drum strike:
        beat_impact = math.exp(-beat_phase * 4.0)
        zoom = 1.0 + 0.055 * beat_impact + 0.02 * math.sin(2 * math.pi * t * 0.4)

        # Lateral Sway (Cosmic dance movement left and right)
        sway_x = int(22 * math.sin(2 * math.pi * t * (BEAT_FREQ / 2)))
        # Vertical Bobbing (Step movement)
        bob_y = int(14 * abs(math.sin(2 * math.pi * t * BEAT_FREQ)))

        CUR_CX = CX + sway_x
        CUR_CY = CENTER_Y - bob_y

        # 3. Rotating Flame Ring of Nataraja (Prabhamandala / Agni Vritta)
        ring_r = int((BASE_SZ // 2 + 50) * zoom)
        flame_count = 32
        flame_rot = t * 15.0 # Degrees per second
        for fi in range(flame_count):
            f_angle = math.radians(fi * (360 / flame_count) + flame_rot)
            f_len = ring_r + int(25 * math.sin(fi * 2.0 + t * 8.0))
            fx = CUR_CX + int(f_len * math.cos(f_angle))
            fy = CUR_CY + int(f_len * math.sin(f_angle))
            # Draw flame teardrop / spark
            draw.ellipse([fx - 8, fy - 8, fx + 8, fy + 8], fill=(249, 115, 22, 190))
            draw.ellipse([fx - 4, fy - 4, fx + 4, fy + 4], fill=(254, 240, 138, 240))

        # Glowing Outer Aura
        for r_step in range(ring_r + 40, ring_r - 20, -15):
            alpha = int(60 * (1.0 - (r_step - ring_r + 20) / 60))
            draw.ellipse([CUR_CX - r_step, CUR_CY - r_step, CUR_CX + r_step, CUR_CY + r_step],
                         outline=(56, 189, 248, alpha), width=3)

        # 4. Render Deity Image with Dynamic Scaling and Circular Mask
        cur_sz = int(BASE_SZ * zoom)
        scaled_art = base_art.resize((cur_sz, cur_sz), Image.Resampling.LANCZOS)
        left = (cur_sz - BASE_SZ) // 2
        cropped_art = scaled_art.crop((left, left, left + BASE_SZ, left + BASE_SZ))

        mask = Image.new("L", (BASE_SZ, BASE_SZ), 0)
        m_draw = ImageDraw.Draw(mask)
        m_draw.ellipse([0, 0, BASE_SZ, BASE_SZ], fill=255)

        art_x = CUR_CX - BASE_SZ // 2
        art_y = CUR_CY - BASE_SZ // 2
        frame.paste(cropped_art, (art_x, art_y), mask)

        # Golden Glowing Border
        draw.ellipse([art_x - 6, art_y - 6, art_x + BASE_SZ + 6, art_y + BASE_SZ + 6],
                     outline='#38BDF8', width=6)
        draw.ellipse([art_x - 14, art_y - 14, art_x + BASE_SZ + 14, art_y + BASE_SZ + 14],
                     outline='#F97316', width=3)

        # 5. Header Banner
        draw.rounded_rectangle([60, 50, W - 60, 150], radius=18, fill=(15, 23, 42, 230), outline='#38BDF8', width=2)
        draw.text((CX, 82), "DIVYA MANGALAM", fill='#38BDF8', font=f_title, anchor='mm')
        draw.text((CX, 122), f"✦ {theme_title} ✦", fill='#FDE68A', font=f_sub, anchor='mm')

        # 6. Sacred Sanskrit Shloka Synchronized Subtitles (Below Deity)
        shloka_idx = int(t / 12.0) % len(SHIVA_SHLOKAS)
        shloka_lines = SHIVA_SHLOKAS[shloka_idx]

        CARD_Y = CENTER_Y + BASE_SZ // 2 + 55
        CARD_H = 360 if mode == "shorts" else 240
        draw.rounded_rectangle([60, CARD_Y, W - 60, CARD_Y + CARD_H], radius=22, fill=(15, 23, 42, 240), outline='#F97316', width=2)

        draw.text((CX, CARD_Y + 40), f"॥ श्री शिव ताण्डव स्तोत्रम् • श्लोक {shloka_idx + 1} ॥", fill='#38BDF8', font=f_title, anchor='mm')
        draw.text((CX, CARD_Y + 115), shloka_lines[0], fill='#FEF08A', font=f_shloka, anchor='mm')
        draw.text((CX, CARD_Y + 175), shloka_lines[1], fill='#FFFFFF', font=f_shloka, anchor='mm')
        draw.text((CX, CARD_Y + 235), shloka_lines[2], fill='#FEF08A', font=f_shloka, anchor='mm')
        draw.text((CX, CARD_Y + 295), shloka_lines[3], fill='#FFFFFF', font=f_shloka, anchor='mm')

        # 7. Permanent Professional Footer CTA
        draw.text((CX, H - 90), "✦ Sanatana Dharma • Pure Devotional Chanting • divyamangalam.com ✦", fill='#38BDF8', font=f_url, anchor='mm')
        draw.text((CX, H - 45), "Follow @divyamangalam.info • YouTube: @DivyaMangalam", fill='#E2E8F0', font=f_sub, anchor='mm')

        # Push to ffmpeg pipe
        proc.stdin.write(frame.tobytes())

        if (frame_idx + 1) % 120 == 0:
            print(f"[DANCE ENGINE] Rendered {frame_idx + 1}/{TOTAL_FRAMES} frames ({(frame_idx + 1)/FPS:.1f}s / {duration:.0f}s)...")

    proc.stdin.close()
    proc.wait()

    # Mux pure music with video
    print("[DANCE ENGINE] Muxing video frames with 100% pure sacred music track (zero voiceover)...")
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4)), exist_ok=True)
    mux_cmd = [
        ffmpeg_exe, '-y',
        '-i', temp_video,
        '-i', temp_music,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '256k',
        '-shortest',
        output_mp4
    ]
    subprocess.run(mux_cmd, check=True)

    # Cleanup temp
    for tmp in [temp_video, temp_music]:
        if os.path.exists(tmp):
            try: os.remove(tmp)
            except Exception: pass

    print(f"\n[SUCCESS] Pure Music Dance Video created at: {output_mp4} ({os.path.getsize(output_mp4) / (1024*1024):.2f} MB)")
    return output_mp4

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generate Pure Music Dance Video")
    parser.add_argument('--deity', type=str, default="shiva", choices=["shiva", "surya"])
    parser.add_argument('--mode', type=str, default="shorts", choices=["shorts", "full"])
    parser.add_argument('--duration', type=float, default=60.0, help="Duration in seconds (e.g. 60.0 for Shorts, 300.0 for 5 mins)")
    parser.add_argument('--out', type=str, default=None)
    args = parser.parse_args()

    render_dance_video(deity=args.deity, mode=args.mode, duration=args.duration, output_mp4=args.out)
