#!/usr/bin/env python3
"""
Divya Mangalam — Daily Vedic Calendar & Panchang Video Reel Generator
Features:
- Visual, high-retention 1080x1920 vertical Reel format
- Clean, structured Timings Format (Shubh Muhurat in Green vs Ashubh Kaal in Red)
- 100% Clean, Soothing Neural Voice Narration (ZERO clashing music overlay)
- Dynamic Panchang elements: Date, Vara, Tithi, Nakshatra, Yoga, Moon Sign
"""

import os
import sys
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def pick_font(candidates, size):
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    for generic in ["segoeuib.ttf", "arial.ttf", "DejaVuSans.ttf", "Nirmala.ttc"]:
        try:
            return ImageFont.truetype(generic, size)
        except Exception:
            pass
    return ImageFont.load_default()

def render_calendar_reel(output_mp4=None):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    if output_mp4 is None:
        output_mp4 = os.path.join(BASE_DIR, "images", "daily_calendar_reel_today.mp4")

    voice_path = os.path.join(BASE_DIR, "audio", "panchang_voice_today.mp3")
    if not os.path.exists(voice_path):
        raise FileNotFoundError(f"Voice file not found at {voice_path}")

    # Probe duration of voice
    probe_cmd = [ffmpeg_exe, '-i', voice_path]
    res = subprocess.run(probe_cmd, stderr=subprocess.PIPE, text=True)
    duration = 74.5
    for line in res.stderr.split('\n'):
        if 'Duration' in line:
            parts = line.split('Duration:')[1].split(',')[0].strip().split(':')
            duration = float(parts[0])*3600 + float(parts[1])*60 + float(parts[2])
            break

    print(f"[CALENDAR REEL] Voice track duration: {duration:.2f}s")

    W, H = 1080, 1920
    FPS = 24
    TOTAL_FRAMES = int(FPS * duration)

    temp_video = os.path.join(BASE_DIR, "temp_calendar_video.mp4")

    # Fonts
    bold_candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\arialbd.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    ]
    reg_candidates = [
        r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    ]
    indic_candidates = [
        r"C:\Windows\Fonts\Nirmala.ttc",
        r"C:\Windows\Fonts\mangal.ttf",
        "/usr/share/fonts/truetype/noto/NotoSansDevanagari-Bold.ttf"
    ]

    f_hero = pick_font(bold_candidates, 44)
    f_title = pick_font(bold_candidates, 36)
    f_sub = pick_font(bold_candidates, 28)
    f_text = pick_font(reg_candidates, 24)
    f_small = pick_font(reg_candidates, 20)
    f_sanskrit = pick_font(indic_candidates, 36)
    f_brand = pick_font(bold_candidates, 26)

    # Base artwork: Lord Shiva Kailash
    art_path = os.path.join(BASE_DIR, "images", "shiva_kailash.jpg")
    if os.path.exists(art_path):
        base_art = Image.open(art_path).convert("RGBA")
    else:
        base_art = Image.new("RGBA", (800, 800), (30, 41, 59, 255))

    print(f"[CALENDAR REEL] Rendering {TOTAL_FRAMES} frames ({duration:.1f}s at {FPS}fps, {W}x{H})...")

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

    # Render loop
    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS
        progress = t / duration

        frame = Image.new("RGBA", (W, H), (11, 15, 25, 255)) # Dark celestial navy
        draw = ImageDraw.Draw(frame)

        # 1. Subtle Background Grid & Celestial Stars
        for star_i in range(30):
            sx = int((120 + star_i * 67 + star_i**2 * 11) % W)
            sy = int((80 + star_i * 91 + star_i**3 * 7) % H)
            s_bright = int(120 + 80 * math.sin(star_i + t * 2.5))
            draw.ellipse([sx - 2, sy - 2, sx + 2, sy + 2], fill=(255, 255, 255, s_bright))

        # 2. Top Progress Bar
        bar_w = int(W * progress)
        draw.rectangle([0, 0, bar_w, 8], fill='#38BDF8')

        # 3. Main Brand Header
        draw.rounded_rectangle([60, 40, W - 60, 130], radius=16, fill=(15, 23, 42, 240), outline='#38BDF8', width=2)
        draw.text((CX, 72), "DIVYA MANGALAM", fill='#38BDF8', font=f_brand, anchor='mm')
        draw.text((CX, 105), "✦ DAILY VEDIC CALENDAR & PANCHANG ✦", fill='#FDE68A', font=f_sub, anchor='mm')

        # 4. Date Badge
        draw.rounded_rectangle([120, 150, W - 120, 220], radius=14, fill=(30, 41, 59, 230), outline='#F59E0B', width=2)
        draw.text((CX, 185), "📅 2026-11-02 • SOMAVARA (MONDAY)", fill='#FFFFFF', font=f_title, anchor='mm')

        # 5. Deity Avatar & Mantra Banner (Lord Shiva Someshwara)
        DEITY_SZ = 220
        d_x = CX - DEITY_SZ // 2
        d_y = 240
        # Halo glow
        halo_pulse = int(12 * math.sin(t * 3.0))
        draw.ellipse([d_x - 12 - halo_pulse, d_y - 12 - halo_pulse, d_x + DEITY_SZ + 12 + halo_pulse, d_y + DEITY_SZ + 12 + halo_pulse],
                     outline='#38BDF8', width=4)

        # Circular masked avatar
        cur_art = base_art.resize((DEITY_SZ, DEITY_SZ), Image.Resampling.LANCZOS)
        mask = Image.new("L", (DEITY_SZ, DEITY_SZ), 0)
        ImageDraw.Draw(mask).ellipse([0, 0, DEITY_SZ, DEITY_SZ], fill=255)
        frame.paste(cur_art, (d_x, d_y), mask)

        # Deity & Mantra Title
        draw.text((CX, 485), "DEITY OF THE DAY: LORD SHIVA (SOMESHWARA)", fill='#38BDF8', font=f_sub, anchor='mm')
        draw.text((CX, 525), "॥ ॐ नमः शिवाय ॥", fill='#FEF08A', font=f_sanskrit, anchor='mm')

        # 6. Core Panchang 4-Grid Cards
        grid_y = 565
        grid_h = 175
        draw.rounded_rectangle([60, grid_y, W - 60, grid_y + grid_h], radius=18, fill=(15, 23, 42, 240), outline='#64748B', width=2)

        # 4 Items
        draw.text((CX - 240, grid_y + 45), "🌙 TITHI", fill='#94A3B8', font=f_small, anchor='mm')
        draw.text((CX - 240, grid_y + 85), "Saptami (Krishna)", fill='#FFFFFF', font=f_sub, anchor='mm')

        draw.text((CX + 240, grid_y + 45), "⭐ NAKSHATRA", fill='#94A3B8', font=f_small, anchor='mm')
        draw.text((CX + 240, grid_y + 85), "Magha (Pitru)", fill='#FFFFFF', font=f_sub, anchor='mm')

        draw.text((CX - 240, grid_y + 130), "🔮 YOGA: Indra", fill='#FDE68A', font=f_text, anchor='mm')
        draw.text((CX + 240, grid_y + 130), "🦁 RASHI: Simha (Moon)", fill='#FDE68A', font=f_text, anchor='mm')

        # 7. Dynamic Timings Format (Shubh Muhurat vs Ashubh Kaal)
        # Active stage indicator based on narration timing:
        # t < 18s: Overview
        # 18s <= t < 45s: Shubh Muhurat Active Focus
        # 45s <= t < 62s: Ashubh Kaal Active Focus
        # t >= 62s: Monday Remedies & Blessings
        is_shubh_focus = (18.0 <= t < 45.0)
        is_ashubh_focus = (45.0 <= t < 62.0)
        is_remedy_focus = (t >= 62.0)

        # SHUBH TIMINGS CARD (Green)
        shubh_y = 765
        shubh_h = 320
        shubh_bg = (6, 78, 59, 230) if is_shubh_focus else (15, 23, 42, 230)
        shubh_border = '#10B981' if is_shubh_focus else '#059669'
        shubh_bw = 4 if is_shubh_focus else 2
        draw.rounded_rectangle([60, shubh_y, W - 60, shubh_y + shubh_h], radius=20, fill=shubh_bg, outline=shubh_border, width=shubh_bw)

        draw.text((CX, shubh_y + 40), "✦ SHUBH MUHURAT (AUSPICIOUS TIMINGS) ✦", fill='#34D399', font=f_title, anchor='mm')
        draw.text((CX, shubh_y + 75), "Golden windows to start new tasks, investments & sacred prayers", fill='#D1FAE5', font=f_small, anchor='mm')

        # Abhijit Muhurta (Primary highlight)
        ab_bg = (16, 185, 129, 60) if is_shubh_focus else (30, 41, 59, 140)
        draw.rounded_rectangle([90, shubh_y + 105, W - 90, shubh_y + 195], radius=14, fill=ab_bg, outline='#F59E0B', width=2)
        draw.text((CX, shubh_y + 135), "🌟 ABHIJIT MUHURTA: 11:45 AM – 12:35 PM", fill='#FDE68A', font=f_hero, anchor='mm')
        draw.text((CX, shubh_y + 172), "Supreme midday window for major starts, meetings & success", fill='#FFFFFF', font=f_text, anchor='mm')

        # Brahma Muhurta
        draw.text((CX, shubh_y + 235), "🪔 Brahma Muhurta: 04:30 AM – 05:18 AM (Meditation & Sadhana)", fill='#FFFFFF', font=f_text, anchor='mm')
        draw.text((CX, shubh_y + 275), "🌸 Amrit Kaal: Evening Pradosha (Shiva Puja & Peace)", fill='#A7F3D0', font=f_text, anchor='mm')

        # ASHUBH TIMINGS CARD (Red)
        ashubh_y = 1115
        ashubh_h = 280
        ashubh_bg = (127, 29, 29, 230) if is_ashubh_focus else (15, 23, 42, 230)
        ashubh_border = '#EF4444' if is_ashubh_focus else '#B91C1C'
        ashubh_bw = 4 if is_ashubh_focus else 2
        draw.rounded_rectangle([60, ashubh_y, W - 60, ashubh_y + ashubh_h], radius=20, fill=ashubh_bg, outline=ashubh_border, width=ashubh_bw)

        draw.text((CX, ashubh_y + 40), "⚠️ ASHUBH KAAL (CAUTION TIMINGS) ⚠️", fill='#F87171', font=f_title, anchor='mm')
        draw.text((CX, ashubh_y + 75), "Avoid starting new financial contracts, journeys or inaugurations", fill='#FEE2E2', font=f_small, anchor='mm')

        # Rahu Kaal primary card
        rahu_bg = (239, 68, 68, 60) if is_ashubh_focus else (30, 41, 59, 140)
        draw.rounded_rectangle([90, ashubh_y + 105, W - 90, ashubh_y + 185], radius=14, fill=rahu_bg, outline='#EF4444', width=2)
        draw.text((CX, ashubh_y + 133), "⛔ RAHU KAAL: 07:30 AM – 09:00 AM", fill='#FCA5A5', font=f_hero, anchor='mm')
        draw.text((CX, ashubh_y + 165), "Caution: Avoid major material/contractual beginnings", fill='#FFFFFF', font=f_small, anchor='mm')

        # Yamagandam & Gulika
        draw.text((CX, ashubh_y + 215), "⏳ Yamagandam: 10:30 AM – 12:00 PM", fill='#FECACA', font=f_text, anchor='mm')
        draw.text((CX, ashubh_y + 248), "🛑 Gulika Kalam: 01:30 PM – 03:00 PM", fill='#E2E8F0', font=f_text, anchor='mm')

        # 8. Sacred Remedy & Blessings Box
        rem_y = 1425
        rem_h = 240
        rem_bg = (30, 58, 138, 230) if is_remedy_focus else (15, 23, 42, 230)
        rem_border = '#60A5FA' if is_remedy_focus else '#3B82F6'
        draw.rounded_rectangle([60, rem_y, W - 60, rem_y + rem_h], radius=20, fill=rem_bg, outline=rem_border, width=3 if is_remedy_focus else 2)

        draw.text((CX, rem_y + 35), "🌿 MONDAY SACRED GUIDANCE & REMEDY", fill='#93C5FD', font=f_title, anchor='mm')
        draw.text((CX, rem_y + 80), "• Chant 'Om Namah Shivaya' 108 times for emotional clarity", fill='#FFFFFF', font=f_text, anchor='mm')
        draw.text((CX, rem_y + 120), "• Offer raw milk, pure water or Bilva leaves to Shiva Lingam", fill='#FFFFFF', font=f_text, anchor='mm')
        draw.text((CX, rem_y + 160), "• Practice calming pranayama to harmonize lunar mind energy", fill='#FFFFFF', font=f_text, anchor='mm')
        draw.text((CX, rem_y + 205), "✨ शुभं भवतु • May Lord Shiva Bless Your Path ✨", fill='#FDE68A', font=f_sub, anchor='mm')

        # 9. Permanent Professional Footer CTA
        draw.text((CX, H - 120), "✦ Complete Vedic Tools • AI Palm Reading • divyamangalam.com ✦", fill='#38BDF8', font=f_sub, anchor='mm')
        draw.text((CX, H - 75), "Follow @divyamangalam.info for Daily Panchang & Shubh Muhurat Reels", fill='#CBD5E1', font=f_small, anchor='mm')

        proc.stdin.write(frame.tobytes())

        if (frame_idx + 1) % 180 == 0:
            print(f"[CALENDAR REEL] Rendered {frame_idx + 1}/{TOTAL_FRAMES} frames ({(frame_idx + 1)/FPS:.1f}s / {duration:.0f}s)...")

    proc.stdin.close()
    proc.wait()

    # Mux clean voice audio (NO MUSIC) with video
    print("[CALENDAR REEL] Muxing video frames with 100% clean voice narration (ZERO MUSIC)...")
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4)), exist_ok=True)
    mux_cmd = [
        ffmpeg_exe, '-y',
        '-i', temp_video,
        '-i', voice_path,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        output_mp4
    ]
    subprocess.run(mux_cmd, check=True)

    # Cleanup temp
    if os.path.exists(temp_video):
        try: os.remove(temp_video)
        except Exception: pass

    print(f"\n[SUCCESS] Daily Calendar Reel created at: {output_mp4} ({os.path.getsize(output_mp4)/(1024*1024):.2f} MB)")
    return output_mp4

if __name__ == '__main__':
    render_calendar_reel()
