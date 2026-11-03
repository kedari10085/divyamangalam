#!/usr/bin/env python3
"""
Divya Mangalam — Slot 3: Midday Devotional Katha & Scripture Wisdom Reel
Tuesday Edition: Lord Hanuman, Mangala Graha (Mars) & The Secret of Fearlessness
Format: 1080x1920 HD Vertical Video, Clean Soothing Voiceover, Zero Clashing Music.
"""

import os
import sys
import math
import subprocess

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def pick_font(candidates, size):
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                pass
    return ImageFont.load_default()

def generate_hanuman_katha_reel():
    print("==================================================")
    print("🕉️ GENERATING 1:00 PM MIDDAY DEVOTIONAL KATHA REEL")
    print("Deity: Lord Hanuman (Veer Bajrangbali) • Tuesday / Mangalavara")
    print("==================================================")

    voice_path = os.path.join(BASE_DIR, "audio", "hanuman_katha_1pm.mp3")
    out_mp4 = os.path.join(BASE_DIR, "images", "hanuman_katha_reel_today.mp4")
    temp_video = os.path.join(BASE_DIR, "temp_katha_video.mp4")
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    # Get duration
    probe_cmd = [ffmpeg_exe, '-i', voice_path]
    res = subprocess.run(probe_cmd, stderr=subprocess.PIPE, text=True)
    duration = 52.56
    for line in res.stderr.split('\n'):
        if 'Duration' in line:
            parts = line.split('Duration:')[1].split(',')[0].strip().split(':')
            duration = float(parts[0])*3600 + float(parts[1])*60 + float(parts[2])
            break

    print(f"[KATHA ENGINE] Voice duration: {duration:.2f}s | Target: 1080x1920 @ 24fps")

    W, H = 1080, 1920
    FPS = 24
    TOTAL_FRAMES = int(FPS * duration)

    bold_fonts = [r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"]
    reg_fonts = [r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"]
    indic_fonts = [r"C:\Windows\Fonts\Nirmala.ttc", r"C:\Windows\Fonts\mangal.ttf"]

    f_hero = pick_font(bold_fonts, 42)
    f_title = pick_font(bold_fonts, 36)
    f_sub = pick_font(bold_fonts, 28)
    f_text = pick_font(reg_fonts, 25)
    f_small = pick_font(reg_fonts, 20)
    f_sanskrit = pick_font(indic_fonts, 38)
    f_brand = pick_font(bold_fonts, 24)

    # Base artwork
    art_path = os.path.join(BASE_DIR, "images", "hanuman_ji.jpg")
    if os.path.exists(art_path):
        base_art = Image.open(art_path).convert("RGBA").resize((760, 760), Image.Resampling.LANCZOS)
    else:
        base_art = Image.new("RGBA", (760, 760), (30, 41, 59, 255))

    # Mask for round avatar
    mask = Image.new("L", (760, 760), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, 760, 760), fill=255)

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

    # Subtitle timeline based on speech
    # 0 - 7s: Why is Lord Hanuman worshipped on Tuesday?
    # 7 - 17s: Mars (Mangala Graha) & Fiery Planetary Energy
    # 17 - 28s: Transforming Raw Force into Divine Protection
    # 28 - 38s: Chanting Hanuman Chalisa to dissolve fear & debts
    # 38 - 46s: Chant Om Ham Hanumate Namah
    # 46 - 53s: Blessings of Veer Bajrangbali & Jai Shri Ram

    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS
        frame = Image.new("RGBA", (W, H), (11, 15, 25, 255))
        draw = ImageDraw.Draw(frame)

        CX = W // 2

        # 1. Subtle Background Pulsing Mandala
        bg_pulse = int(15 * math.sin(t * 1.5))
        draw.ellipse([CX - 480 - bg_pulse, 520 - 480 - bg_pulse, CX + 480 + bg_pulse, 520 + 480 + bg_pulse],
                     fill=(234, 88, 12, 18), outline=(245, 158, 11, 40), width=3)
        draw.ellipse([CX - 400 + bg_pulse, 520 - 400 + bg_pulse, CX + 400 - bg_pulse, 520 + 400 - bg_pulse],
                     fill=(180, 83, 9, 24), outline=(245, 158, 11, 60), width=2)

        # 2. Main Header
        draw.rounded_rectangle([60, 45, W - 60, 135], radius=16, fill=(15, 23, 42, 240), outline='#F59E0B', width=2)
        draw.text((CX, 75), "DIVYA MANGALAM", fill='#F59E0B', font=f_brand, anchor='mm')
        draw.text((CX, 108), "VEDIC WISDOM & SACRED KATHA", fill='#FDE68A', font=f_sub, anchor='mm')

        # 3. Topic Badge
        draw.rounded_rectangle([90, 155, W - 90, 225], radius=14, fill=(30, 41, 59, 230), outline='#EA580C', width=2)
        draw.text((CX, 190), "WHY WORSHIP HANUMAN ON TUESDAY?", fill='#FFFFFF', font=f_title, anchor='mm')

        # 4. Central Sacred Deity Portrait (with breathing golden halo)
        halo_pulse = int(12 * math.sin(t * 2.5))
        d_x, d_y = (W - 760) // 2, 260
        draw.ellipse([d_x - 14 - halo_pulse, d_y - 14 - halo_pulse, d_x + 760 + 14 + halo_pulse, d_y + 760 + 14 + halo_pulse],
                     outline='#F59E0B', width=4)
        draw.ellipse([d_x - 6, d_y - 6, d_x + 760 + 6, d_y + 760 + 6], outline='#EA580C', width=2)
        frame.paste(base_art, (d_x, d_y), mask)

        # 5. Sanskrit Shloka Badge
        draw.rounded_rectangle([100, 1045, W - 100, 1125], radius=16, fill=(15, 23, 42, 245), outline='#F59E0B', width=2)
        draw.text((CX, 1085), "॥ ॐ हं हनुमते नमः ॥", fill='#FEF08A', font=f_sanskrit, anchor='mm')

        # 6. Dynamic Wisdom Subtitle Cards
        card_y = 1150
        card_h = 440
        draw.rounded_rectangle([60, card_y, W - 60, card_y + card_h], radius=20, fill=(15, 23, 42, 240), outline='#EA580C', width=2)

        if t < 7.5:
            # Phase 1: The Tuesday Question
            draw.text((CX, card_y + 45), "THE SACRED TUESDAY CONNECTION", fill='#FDBA74', font=f_title, anchor='mm')
            draw.text((CX, card_y + 110), "Tuesday (Mangalavara) is governed by planet Mars (Mangala).", fill='#FFFFFF', font=f_text, anchor='mm')
            draw.text((CX, card_y + 160), "Mars represents warrior energy, fire, courage, and vitality.", fill='#FFFFFF', font=f_text, anchor='mm')
            draw.text((CX, card_y + 225), "Why do Vedic scriptures connect Mars with Lord Hanuman?", fill='#FDE68A', font=f_sub, anchor='mm')
            draw.text((CX, card_y + 285), "Only supreme devotion can master fiery planetary force.", fill='#FED7AA', font=f_text, anchor='mm')
            draw.text((CX, card_y + 350), "Veer Bajrangbali pacifies turbulent Mars energy.", fill='#93C5FD', font=f_text, anchor='mm')

        elif t < 18.0:
            # Phase 2: Mars Energy & Pacification
            draw.text((CX, card_y + 45), "PACIFYING THE FIERY ENERGY OF MARS", fill='#FDBA74', font=f_title, anchor='mm')
            draw.text((CX, card_y + 110), "When Mars is afflicted, it creates anger, fear, and debt.", fill='#FFFFFF', font=f_text, anchor='mm')
            draw.text((CX, card_y + 160), "Uncontrolled fire leads to restlessness and impulsive decisions.", fill='#FFFFFF', font=f_text, anchor='mm')
            draw.text((CX, card_y + 225), "Lord Hanuman transforms raw force into divine protection.", fill='#FDE68A', font=f_sub, anchor='mm')
            draw.text((CX, card_y + 285), "His boundless humility channels fire into selfless strength.", fill='#FED7AA', font=f_text, anchor='mm')
            draw.text((CX, card_y + 350), "Align your mind with devotion this Tuesday.", fill='#93C5FD', font=f_text, anchor='mm')

        elif t < 32.0:
            # Phase 3: The Remedy of Hanuman Chalisa
            draw.text((CX, card_y + 45), "SACRED REMEDY: HANUMAN CHALISA", fill='#34D399', font=f_title, anchor='mm')
            draw.text((CX, card_y + 110), "Reciting Shri Hanuman Chalisa dismantles all internal fears.", fill='#FFFFFF', font=f_text, anchor='mm')
            draw.text((CX, card_y + 160), "The 40 verses act as an energetic shield against negativity.", fill='#FFFFFF', font=f_text, anchor='mm')
            draw.text((CX, card_y + 225), "Bhoot Pisach Nikat Nahi Aavai, Mahavir Jab Naam Sunavai", fill='#FDE68A', font=f_sub, anchor='mm')
            draw.text((CX, card_y + 285), "Negative forces flee before the holy name of Mahavira.", fill='#FED7AA', font=f_text, anchor='mm')
            draw.text((CX, card_y + 350), "Tuesday afternoon is the supreme time to reflect and chant.", fill='#93C5FD', font=f_text, anchor='mm')

        elif t < 44.0:
            # Phase 4: Meditation & Mantra
            draw.text((CX, card_y + 45), "CHANT WITH DEVOTION TODAY", fill='#FDBA74', font=f_title, anchor='mm')
            draw.text((CX, card_y + 115), "Take 3 deep breaths and chant from your heart:", fill='#FFFFFF', font=f_text, anchor='mm')
            draw.rounded_rectangle([100, card_y + 160, W - 100, card_y + 245], radius=14, fill=(234, 88, 12, 60), outline='#F59E0B', width=2)
            draw.text((CX, card_y + 202), "OM HAM HANUMATE NAMAH", fill='#FEF08A', font=f_hero, anchor='mm')
            draw.text((CX, card_y + 285), "May all fears, debts, and obstacles dissolve into dust.", fill='#FED7AA', font=f_text, anchor='mm')
            draw.text((CX, card_y + 350), "Surrender your worries at Lord Hanuman's lotus feet.", fill='#93C5FD', font=f_text, anchor='mm')

        else:
            # Phase 5: Closing Blessings
            draw.text((CX, card_y + 45), "DIVINE BLESSINGS OF BAJRANGBALI", fill='#FDBA74', font=f_title, anchor='mm')
            draw.text((CX, card_y + 120), "May Lord Hanuman bless your home with fearless courage.", fill='#FFFFFF', font=f_text, anchor='mm')
            draw.text((CX, card_y + 180), "May vitality, peace, and spiritual victory be yours.", fill='#FFFFFF', font=f_text, anchor='mm')
            draw.text((CX, card_y + 250), "JAI SHRI RAM • JAI BAJRANGBALI", fill='#FDE68A', font=f_hero, anchor='mm')
            draw.text((CX, card_y + 330), "Save & Share this Tuesday blessing with family & friends.", fill='#93C5FD', font=f_text, anchor='mm')

        # 7. Footer Call to Action
        draw.text((CX, H - 120), "Complete Vedic Scriptures • AI Palm Reading • divyamangalam.com", fill='#38BDF8', font=f_sub, anchor='mm')
        draw.text((CX, H - 75), "Follow @divyamangalam.info for Daily Devotional Katha & Timing Reels", fill='#CBD5E1', font=f_small, anchor='mm')

        proc.stdin.write(frame.tobytes())

        if (frame_idx + 1) % 240 == 0:
            print(f"[KATHA ENGINE] Rendered {frame_idx + 1}/{TOTAL_FRAMES} frames ({(frame_idx + 1)/FPS:.1f}s / {duration:.0f}s)...")

    proc.stdin.close()
    proc.wait()

    # Mux clean voice audio
    print("[KATHA ENGINE] Muxing video frames with clean narration audio...")
    mux_cmd = [
        ffmpeg_exe, '-y',
        '-i', temp_video,
        '-i', voice_path,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        out_mp4
    ]
    subprocess.run(mux_cmd, check=True)
    print(f"\n[SUCCESS] 1:00 PM Midday Katha Reel created at: {out_mp4} ({os.path.getsize(out_mp4)/(1024*1024):.2f} MB)")
    return out_mp4

if __name__ == '__main__':
    generate_hanuman_katha_reel()
