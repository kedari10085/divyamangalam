#!/usr/bin/env python3
"""
Divya Mangalam — YouTube Video & Shorts Generation Engine
Generates pristine 1080x1920 (Shorts) and 1920x1080 (Landscape) spiritual videos
with authentic Deity Stotrams, soothing natural voiceover, and 24h Vedic Clock.
"""

import os
import sys
import math
import struct
import argparse
import datetime
import subprocess
import asyncio
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

try:
    import edge_tts
    HAS_EDGE_TTS = True
except ImportError:
    HAS_EDGE_TTS = False

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Deity Music and Stotram Mapping
DEITY_CONFIG = {
    6: { # Sunday
        "name": "Lord Surya Narayana",
        "day_name": "Ravivara (Sunday)",
        "color_primary": "#FF9900",
        "color_accent": "#FFD700",
        "stotram_title": "Aditya Hridaya Stotram & Gayatri",
        "shloka_sanskrit": "ॐ सूर्याय नमः • आदित्याय च विद्महे भास्कराय धीमहि",
        "music_file": os.path.join(BASE_DIR, "audio", "aditya_hrudayam.mp3"),
        "image_file": os.path.join(BASE_DIR, "images", "surya_bhagavan.jpg")
    },
    0: { # Monday
        "name": "Lord Shiva (Mahadeva)",
        "day_name": "Somavara (Monday)",
        "color_primary": "#0284C7",
        "color_accent": "#38BDF8",
        "stotram_title": "Maha Mrityunjaya & Shiva Tandava",
        "shloka_sanskrit": "ॐ नमः शिवाय • त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्",
        "music_file": os.path.join(BASE_DIR, "audio", "shiva_tandava.mp3"),
        "image_file": os.path.join(BASE_DIR, "images", "shiva_kailash.jpg")
    },
    1: { # Tuesday
        "name": "Lord Hanuman (Bajrangbali)",
        "day_name": "Mangalavara (Tuesday)",
        "color_primary": "#EA580C",
        "color_accent": "#FDBA74",
        "stotram_title": "Hanuman Chalisa & Sankat Mochan",
        "shloka_sanskrit": "ॐ हनुमते नमः • मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्",
        "music_file": os.path.join(BASE_DIR, "audio", "hanuman_chalisa.mp3"),
        "image_file": os.path.join(BASE_DIR, "images", "hanuman_ji.jpg")
    }
}

async def synthesize_soothing_voice(text, output_mp3):
    if not HAS_EDGE_TTS:
        return False
    try:
        # Soothing, soulful expressive voice
        comm = edge_tts.Communicate(text, 'en-IN-NeerjaExpressiveNeural', rate='-6%', pitch='+0Hz')
        await comm.save(output_mp3)
        return True
    except Exception as e:
        try:
            comm = edge_tts.Communicate(text, 'en-IN-NeerjaNeural', rate='-6%')
            await comm.save(output_mp3)
            return True
        except Exception as e2:
            print(f"Voice synthesis error: {e2}")
            return False

def draw_star(draw, x, y, r, fill):
    points = []
    for i in range(16):
        radius = r if i % 2 == 0 else r * 0.45
        angle = i * math.pi / 8 - math.pi / 2
        points.append((x + radius * math.cos(angle), y + radius * math.sin(angle)))
    draw.polygon(points, fill=fill)

def render_youtube_video(mode="shorts", duration=60.0, output_file=None):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    today = datetime.date(2026, 11, 1) # Sunday
    cfg = DEITY_CONFIG.get(today.weekday(), DEITY_CONFIG[6])

    if mode == "shorts":
        W, H = 1080, 1920
        if output_file is None:
            output_file = os.path.join(BASE_DIR, "images", "divyamangalam_youtube_shorts.mp4")
    else:
        # Full landscape video (16:9)
        W, H = 1920, 1080
        if output_file is None:
            output_file = os.path.join(BASE_DIR, "images", "divyamangalam_youtube_full.mp4")

    FPS = 24
    TOTAL_FRAMES = int(FPS * duration)

    temp_vocal = os.path.join(BASE_DIR, "temp_yt_vocal.mp3")
    temp_music = os.path.join(BASE_DIR, "temp_yt_music.wav")
    temp_mixed = os.path.join(BASE_DIR, "temp_yt_audio.wav")
    temp_video = os.path.join(BASE_DIR, "temp_yt_video.mp4")

    # 1. Prepare Music (Aditya Hrudayam)
    source_music = cfg["music_file"]
    if not os.path.exists(source_music):
        # Fallback to local audio directory file
        source_music = os.path.join(BASE_DIR, "audio", "aditya_hrudayam.mp3")

    if os.path.exists(source_music):
        print(f"[YOUTUBE ENGINE] Extracting {duration}s from authentic sacred music: {os.path.basename(source_music)}")
        subprocess.run([
            ffmpeg_exe, '-y',
            '-ss', '00:00:00', '-t', str(duration),
            '-i', source_music,
            '-c:a', 'pcm_s16le',
            temp_music
        ], check=True)
    else:
        # Synthesize 432 Hz drone if no file
        temp_music = None

    # 2. Prepare Soothing Devotional Narration
    narration_script = (
        "Welcome to Divya Mangalam. Om Suryaya Namah. "
        "On this sacred Sunday, Ravivara, we seek the divine grace of Bhagavan Surya Narayana, "
        "the eternal source of health, vitality, and spiritual enlightenment. "
        "According to today's Vedic Panchang, the highly auspicious Abhijit Muhurta begins at 11:45 AM and concludes at 12:35 PM, "
        "making it the golden time for success, worship, and new beginnings. "
        "During Rahu Kaal, from 4:30 PM to 6:00 PM, pause and chant the sacred Aditya Hridaya or Gayatri Mantra. "
        "May Lord Surya bless your life with boundless light, courage, and radiant peace. "
        "Subscribe to Divya Mangalam for daily Vedic darshan and sacred timings."
    )
    print(f"[YOUTUBE ENGINE] Synthesizing soothing expressive narration ({len(narration_script.split())} words)...")
    has_vocal = asyncio.run(synthesize_soothing_voice(narration_script, temp_vocal))

    # 3. Audio Mixing
    if os.path.exists(temp_music) and has_vocal and os.path.exists(temp_vocal):
        print("[YOUTUBE ENGINE] Master mixing sacred stotram music with soothing voiceover & temple reverb...")
        filter_str = (
            f'[0:a]volume=0.45[bgm];'
            f'[1:a]adelay=3000|3000,volume=1.45,aecho=0.8:0.7:30:0.2[voc];'
            f'[bgm][voc]amix=inputs=2:duration=first:dropout_transition=2[aout]'
        )
        subprocess.run([
            ffmpeg_exe, '-y',
            '-i', temp_music,
            '-i', temp_vocal,
            '-filter_complex', filter_str,
            '-map', '[aout]',
            '-c:a', 'pcm_s16le',
            '-t', str(duration),
            temp_mixed
        ], check=True)
    elif os.path.exists(temp_music):
        temp_mixed = temp_music
    else:
        temp_mixed = temp_vocal

    # 4. Load Base Deity Art
    art_path = cfg["image_file"]
    if os.path.exists(art_path):
        base_art = Image.open(art_path).convert("RGBA")
    else:
        base_art = Image.new("RGBA", (1080, 1080), (255, 153, 0, 255))

    # Fonts
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"
    font_indic = r"C:\Windows\Fonts\Nirmala.ttc"

    try:
        f_header = ImageFont.truetype(font_bold, 44 if mode=="shorts" else 36)
        f_sub = ImageFont.truetype(font_reg, 30 if mode=="shorts" else 24)
        f_card_title = ImageFont.truetype(font_bold, 36 if mode=="shorts" else 28)
        f_highlight = ImageFont.truetype(font_bold, 32 if mode=="shorts" else 26)
        f_body = ImageFont.truetype(font_reg, 28 if mode=="shorts" else 22)
        f_sanskrit = ImageFont.truetype(font_indic, 34 if mode=="shorts" else 28)
        f_url = ImageFont.truetype(font_bold, 32 if mode=="shorts" else 24)
    except Exception:
        f_header = f_sub = f_card_title = f_highlight = f_body = f_sanskrit = f_url = ImageFont.load_default()

    # 5. Start FFmpeg Pipe
    print(f"[YOUTUBE ENGINE] Rendering {TOTAL_FRAMES} frames ({duration}s at {FPS}fps, {W}x{H})...")
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
        '-crf', '20',
        '-pix_fmt', 'yuv420p',
        temp_video
    ]
    proc = subprocess.Popen(video_cmd, stdin=subprocess.PIPE)

    CX = W // 2
    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS
        cycle_t = t / duration

        frame = Image.new("RGBA", (W, H), (10, 15, 30, 255))
        draw = ImageDraw.Draw(frame)

        # Cosmic Solar Radiance Background
        pulse = 0.5 + 0.5 * math.sin(2 * math.pi * t * 0.4)
        rad_r = int((500 if mode=="shorts" else 420) + 120 * pulse)
        SUN_Y = 540 if mode=="shorts" else 420

        # Radial glowing disc
        for r_step in range(rad_r, 40, -45):
            alpha = int(45 * (1.0 - r_step / rad_r))
            draw.ellipse([CX - r_step, SUN_Y - r_step, CX + r_step, SUN_Y + r_step],
                         fill=(255, 165, 0, alpha))

        # Solar flare rays
        n_rays = 20
        ray_rot = t * 6.0
        for i in range(n_rays):
            angle = math.radians(i * (360 / n_rays) + ray_rot)
            ray_len = rad_r + 60 + 30 * math.sin(i * 1.5 + t * 2.0)
            x_end = CX + int(ray_len * math.cos(angle))
            y_end = SUN_Y + int(ray_len * math.sin(angle))
            draw.line([CX, SUN_Y, x_end, y_end], fill=(255, 215, 0, 40), width=4)

        # Hero Image (Circle / Rounded mask)
        img_size = 560 if mode=="shorts" else 480
        zoom = 1.0 + 0.05 * math.sin(2 * math.pi * t * 0.15)
        cur_sz = int(img_size * zoom)
        scaled_art = base_art.resize((cur_sz, cur_sz), Image.Resampling.LANCZOS)
        left = (cur_sz - img_size) // 2
        cropped_art = scaled_art.crop((left, left, left + img_size, left + img_size))

        mask = Image.new("L", (img_size, img_size), 0)
        m_draw = ImageDraw.Draw(mask)
        m_draw.ellipse([0, 0, img_size, img_size], fill=255)

        art_x = CX - img_size // 2
        art_y = SUN_Y - img_size // 2
        frame.paste(cropped_art, (art_x, art_y), mask)

        # Golden halo border
        draw.ellipse([art_x - 6, art_y - 6, art_x + img_size + 6, art_y + img_size + 6],
                     outline='#FFD700', width=6)
        draw.ellipse([art_x - 14, art_y - 14, art_x + img_size + 14, art_y + img_size + 14],
                     outline='#F59E0B', width=2)

        # Header Title
        draw.text((CX, 80), "DIVYA MANGALAM", fill='#FFD700', font=f_header, anchor='mm')
        draw.text((CX, 130), f"✦ {cfg['day_name'].upper()} • {cfg['name'].upper()} ✦", fill='#FDE68A', font=f_sub, anchor='mm')

        # Sanskrit Chanting Ribbon
        draw.rounded_rectangle([70, SUN_Y + img_size // 2 + 35, W - 70, SUN_Y + img_size // 2 + 105], radius=15, fill=(30, 41, 59, 210), outline='#FFD700', width=2)
        draw.text((CX, SUN_Y + img_size // 2 + 70), cfg['shloka_sanskrit'], fill='#FFFFFF', font=f_sanskrit, anchor='mm')

        # Multi-Phase Information Cards (Below Image)
        CARD_Y = SUN_Y + img_size // 2 + 130
        CARD_H = 340 if mode=="shorts" else 260
        draw.rounded_rectangle([70, CARD_Y, W - 70, CARD_Y + CARD_H], radius=20, fill=(15, 23, 42, 235), outline='#F59E0B', width=2)

        phase = int((t % 60) // 15)
        if phase == 0:
            draw.text((100, CARD_Y + 35), "ADITYA HRIDAYA STOTRAM", fill='#FFD700', font=f_card_title)
            draw.text((100, CARD_Y + 80), "The Divine Hymn for Victory & Radiant Health", fill='#FFFFFF', font=f_highlight)
            draw.text((100, CARD_Y + 140), "Recited by Sage Agastya to Sri Rama before battle.", fill='#E2E8F0', font=f_body)
            draw.text((100, CARD_Y + 180), "Bhagavan Surya awakens health, vitality, and removes darkness.", fill='#CBD5E1', font=f_body)
            draw.text((100, CARD_Y + 240), "✦ Auspicious Deity Mantra: Om Suryaya Namah ✦", fill='#FDE68A', font=f_body)
        elif phase == 1:
            draw.text((100, CARD_Y + 35), "TODAY'S SACRED TIMINGS (SUNDAY)", fill='#FFD700', font=f_card_title)
            draw.rounded_rectangle([100, CARD_Y + 80, W - 100, CARD_Y + 155], radius=12, fill=(6, 78, 59, 210), outline='#10B981', width=2)
            draw.text((120, CARD_Y + 115), "★ ABHIJIT MUHURTA: 11:45 AM – 12:35 PM (Most Auspicious)", fill='#6EE7B7', font=f_highlight, anchor='lm')
            draw.rounded_rectangle([100, CARD_Y + 175, W - 100, CARD_Y + 250], radius=12, fill=(127, 29, 29, 210), outline='#EF4444', width=2)
            draw.text((120, CARD_Y + 210), "⚠ RAHU KAAL: 04:30 PM – 06:00 PM (Inauspicious Window)", fill='#FCA5A5', font=f_highlight, anchor='lm')
        elif phase == 2:
            draw.text((100, CARD_Y + 35), "VEDIC DAILY RITUAL (DINACHARYA)", fill='#FFD700', font=f_card_title)
            draw.text((100, CARD_Y + 80), "Surya Namaskar & Gayatri Meditation", fill='#FFFFFF', font=f_highlight)
            draw.text((100, CARD_Y + 140), "Offer Arghya (water in a copper vessel) facing east.", fill='#E2E8F0', font=f_body)
            draw.text((100, CARD_Y + 180), "Chant Gayatri Mantra 108 times for mental clarity and peace.", fill='#E2E8F0', font=f_body)
            draw.text((100, CARD_Y + 240), "✦ Arogyam Bhaskarad Ichhet — Health flows from the Sun ✦", fill='#FFD700', font=f_body)
        else:
            draw.text((100, CARD_Y + 35), "DIVYA MANGALAM BLESSING", fill='#FFD700', font=f_card_title)
            draw.text((100, CARD_Y + 80), "Explore 10-Year Vedic Clock & Daily Panchang", fill='#FFFFFF', font=f_highlight)
            draw.text((100, CARD_Y + 140), "Interactive 24-hour visual clock of Rahu, Ketu & Muhurtas.", fill='#E2E8F0', font=f_body)
            draw.text((100, CARD_Y + 180), "Free Vedic Astrology & Palm Reading at: divyamangalam.com", fill='#FFD700', font=f_body)
            draw.text((100, CARD_Y + 240), "✦ Subscribe & Follow @divyamangalam.info ✦", fill='#FDE68A', font=f_body)

        # Footer CTA
        draw_star(draw, 100, H - 90, 8, '#FFD700')
        draw.text((CX, H - 90), "✦ Divya Mangalam • YouTube Shorts & Daily Darshan ✦", fill='#FFD700', font=f_url, anchor='mm')
        draw_star(draw, W - 100, H - 90, 8, '#FFD700')
        draw.text((CX, H - 45), "Visit: https://divyamangalam.com • YouTube: @DivyaMangalam", fill='#E2E8F0', font=f_sub, anchor='mm')

        # Push frame
        proc.stdin.write(frame.tobytes())
        if (frame_idx + 1) % 120 == 0:
            print(f"[YOUTUBE ENGINE] Rendered {frame_idx + 1}/{TOTAL_FRAMES} frames ({(frame_idx + 1)/FPS:.1f}s / {duration:.0f}s)...")

    proc.stdin.close()
    proc.wait()

    # Mux Video + Audio
    print("[YOUTUBE ENGINE] Muxing video with master audio track...")
    os.makedirs(os.path.dirname(os.path.abspath(output_file)), exist_ok=True)
    mux_cmd = [
        ffmpeg_exe, '-y',
        '-i', temp_video,
        '-i', temp_mixed,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        output_file
    ]
    subprocess.run(mux_cmd, check=True)

    # Cleanup temp
    for tmp in [temp_video, temp_music, temp_vocal, temp_mixed]:
        if tmp and os.path.exists(tmp):
            try: os.remove(tmp)
            except Exception: pass

    print(f"[SUCCESS] YouTube video produced at: {output_file}")

    # Generate YouTube Upload Metadata file
    meta_file = output_file.replace('.mp4', '_youtube_metadata.json')
    meta_data = {
        "title": "Lord Surya Narayana Sacred Darshan & Aditya Hridaya Stotram ☀️ Sunday Blessings | Divya Mangalam",
        "description": f"""☀️ Divine Blessings of Bhagavan Surya Narayana (Ravivara / Sunday)
Experience sacred peace with the divine Aditya Hridaya Stotram, Surya Gayatri, and complete Vedic 24-Hour Panchang timings.

✨ TODAY'S AUSPICIOUS TIMINGS:
• 00:00 - Sacred Aditya Hridaya Stotram
• 00:15 - Sunday Abhijit Muhurta (11:45 AM – 12:35 PM)
• 00:30 - Rahu Kaal Guidance (04:30 PM – 06:00 PM)
• 00:45 - Surya Gayatri Meditation & Divine Blessings

🌿 Explore 10-Year Interactive Vedic Clock & Free AI Palmistry:
👉 Website: https://divyamangalam.com
👉 Instagram: https://instagram.com/divyamangalam.info

🔔 Subscribe to Divya Mangalam for daily sacred darshan, panchang timings, and Vedic wisdom!

#Shorts #YouTubeShorts #LordSurya #SuryaNarayana #AdityaHridaya #DivyaMangalam #SundayBlessings #VedicAstrology #Panchang #GayatriMantra #SanatanaDharma""",
        "tags": [
            "Surya Narayana", "Lord Surya", "Aditya Hridaya Stotram", "Sunday Blessings",
            "Divya Mangalam", "Vedic Astrology", "Panchang", "Abhijit Muhurta", "Rahu Kaal",
            "Gayatri Mantra", "Hindu Devotional", "Daily Darshan", "YouTube Shorts"
        ],
        "category": "Education / Nonprofits & Activism",
        "privacyStatus": "public"
    }

    import json
    with open(meta_file, 'w', encoding='utf-8') as f:
        json.dump(meta_data, f, indent=2, ensure_ascii=False)
    print(f"[METADATA] YouTube upload metadata saved at: {meta_file}")
    return output_file

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Divya Mangalam YouTube Video Generator")
    parser.add_argument('--mode', type=str, default="shorts", choices=["shorts", "full"], help="shorts (9:16) or full (16:9)")
    parser.add_argument('--duration', type=float, default=60.0, help="Duration in seconds (e.g. 60s for Shorts, up to 240s for Full)")
    parser.add_argument('--out', type=str, default=None, help="Output MP4 path")
    args = parser.parse_args()

    render_youtube_video(mode=args.mode, duration=args.duration, output_file=args.out)
