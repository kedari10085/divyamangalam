#!/usr/bin/env python3
"""
Divya Mangalam — Early Morning Subh Muhurat Darshan & Vedic Blessings Reel Engine
Generates vertical (1080x1920, 24fps) morning meditation & darshan reels for:
- Brahma Muhurta (04:30 AM - 05:20 AM IST)
- Morning Peak Slot (07:30 AM IST)
Features:
- Deity sanctum darshan with breathing golden prana aura and temple flame glow
- Today's auspicious Subh Muhurat timings & sacred Sanskrit mantra
- Authentic open-source deity devotional chanting
- Prominent anti-theft watermark "DIVYAMANGALAM.COM"
"""

import os
import sys
import math
import argparse
import datetime
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DEITY_DATA = {
    "surya": {
        "name": "Bhagavan Surya Narayana",
        "title": "BHAGAVAN SURYA • PRATYAKSHA DEVATA",
        "art": os.path.join(BASE_DIR, "images", "surya_bhagavan.jpg"),
        "music": os.path.join(BASE_DIR, "audio", "aditya_hrudayam.mp3"),
        "mantra": "॥ ॐ घृणिः सूर्याय नमः ॥",
        "mantra_translit": "Om Ghrinih Suryaya Namah",
        "accent": "#F59E0B",
        "fire": "#EA580C",
        "blessing": "May Bhagavan Surya illuminate your mind with vitality, courage, and inner radiance."
    },
    "shiva": {
        "name": "Lord Shiva (Someshwara)",
        "title": "LORD SHIVA • ANANDA TANDAVA",
        "art": os.path.join(BASE_DIR, "images", "shiva_kailash.jpg"),
        "music": os.path.join(BASE_DIR, "audio", "shiva_tandava.mp3"),
        "mantra": "॥ ॐ नमः शिवाय ॥",
        "mantra_translit": "Om Namah Shivaya",
        "accent": "#38BDF8",
        "fire": "#0284C7",
        "blessing": "May Mahadev bestow peace of mind, dissolve restless thoughts, and bless you with eternal serenity."
    },
    "hanuman": {
        "name": "Lord Hanuman (Veer Bajrangbali)",
        "title": "LORD HANUMAN • SANKAT MOCHAN",
        "art": os.path.join(BASE_DIR, "images", "hanuman_ji.jpg"),
        "music": os.path.join(BASE_DIR, "audio", "hanuman_tandav_dance.mp3"),
        "mantra": "॥ ॐ हं हनुमते नमः ॥",
        "mantra_translit": "Om Ham Hanumate Namah",
        "accent": "#F97316",
        "fire": "#DC2626",
        "blessing": "May Sri Hanuman remove all fears, protect you from negativity, and grant unwavering strength."
    },
    "ganesha": {
        "name": "Lord Ganesha (Vighnaharta)",
        "title": "LORD GANESHA • PRATHAMA PUJYA",
        "art": os.path.join(BASE_DIR, "images", "ganesha_ji.jpg"),
        "music": os.path.join(BASE_DIR, "audio", "ganesha_atharvashirsha.mp3"),
        "mantra": "॥ ॐ गं गणपतये नमः ॥",
        "mantra_translit": "Om Gam Ganapataye Namah",
        "accent": "#10B981",
        "fire": "#F59E0B",
        "blessing": "May Lord Ganesha remove every obstacle from your endeavors and bless your day with auspicious success."
    },
    "venkateswara": {
        "name": "Lord Venkateswara (Balaji)",
        "title": "LORD VENKATESWARA • SUPRABHATA DARSHAN",
        "art": os.path.join(BASE_DIR, "images", "venkateswara_swamy.jpg"),
        "music": os.path.join(BASE_DIR, "audio", "venkateswara_suprabhatam_5min.mp3"),
        "mantra": "॥ ॐ नमो वेङ्कटेशाय ॥",
        "mantra_translit": "Om Namo Venkateshaya",
        "accent": "#FBBF24",
        "fire": "#D97706",
        "blessing": "May Lord Srinivasa shower your home with prosperity, divine health, and enduring joy."
    },
    "durga": {
        "name": "Maa Durga & Mahalakshmi",
        "title": "MAA DURGA • ADI PARASHAKTI",
        "art": os.path.join(BASE_DIR, "images", "durga_mata.jpg"),
        "music": os.path.join(BASE_DIR, "audio", "aigiri_nandini_dance.mp3"),
        "mantra": "॥ ॐ श्रीं महालक्ष्म्यै नमः ॥",
        "mantra_translit": "Om Shreem Mahalakshmyai Namah",
        "accent": "#EC4899",
        "fire": "#EF4444",
        "blessing": "May the Divine Mother protect you with Her boundless compassion and bless your family with abundance."
    },
    "ayyappa": {
        "name": "Lord Ayyappa (Manikandan)",
        "title": "LORD AYYAPPA • SWAMIYE SARANAM",
        "art": os.path.join(BASE_DIR, "images", "ayyappa_swamy.jpg"),
        "music": os.path.join(BASE_DIR, "audio", "swamiye_saranam_ayyappa_5min.mp3"),
        "mantra": "॥ ॐ स्वामिये शरणम् अय्यप्पा ॥",
        "mantra_translit": "Swamiye Saranam Ayyappa",
        "accent": "#F59E0B",
        "fire": "#DC2626",
        "blessing": "May Lord Manikandan guide your life with self-discipline, inner peace, and divine protection."
    }
}

WEEKDAY_MAP = {
    0: "shiva",        # Monday
    1: "hanuman",      # Tuesday
    2: "ganesha",      # Wednesday
    3: "venkateswara", # Thursday
    4: "durga",        # Friday
    5: "ayyappa",      # Saturday
    6: "surya"         # Sunday
}

def pick_font(candidates, size):
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                pass
    try:
        return ImageFont.truetype("arial.ttf", size)
    except Exception:
        return ImageFont.load_default()

def render_subh_muhurat_reel(target_date=None, deity_key=None, duration=30.0, output_mp4=None):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    if target_date is None:
        utc = datetime.datetime.now(datetime.timezone.utc)
        ist = utc + datetime.timedelta(hours=5, minutes=30)
        target_date = ist.date()

    if deity_key is None or deity_key == "auto":
        day_idx = target_date.weekday()
        deity_key = WEEKDAY_MAP.get(day_idx, "shiva")

    dinfo = DEITY_DATA.get(deity_key, DEITY_DATA["shiva"])
    date_str = target_date.strftime("%Y-%m-%d")
    date_formatted = target_date.strftime("%A, %B %d, %Y")

    if output_mp4 is None:
        output_mp4 = os.path.join(BASE_DIR, "images", f"subh_muhurat_{deity_key}_{date_str}.mp4")

    W, H = 1080, 1920
    FPS = 24
    TOTAL_FRAMES = int(FPS * duration)

    temp_video = os.path.join(BASE_DIR, f"temp_sm_video_{deity_key}.mp4")
    temp_audio = os.path.join(BASE_DIR, f"temp_sm_audio_{deity_key}.wav")

    # Audio extraction
    music_src = dinfo["music"]
    if os.path.exists(music_src):
        print(f"[SUBH MUHURAT ENGINE] Trimming {duration}s audio from {os.path.basename(music_src)}...")
        subprocess.run([
            ffmpeg_exe, '-y',
            '-ss', '00:00:00', '-t', str(duration),
            '-i', music_src,
            '-af', f'afade=t=in:ss=0:d=1.5,afade=t=out:st={duration - 2.0}:d=2.0',
            '-ar', '44100', '-ac', '2',
            temp_audio
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    else:
        print("[SUBH MUHURAT ENGINE] Music source not found, synthesizing ambient 432Hz morning chime...")
        subprocess.run([
            ffmpeg_exe, '-y',
            '-f', 'lavfi', '-i', f'sine=frequency=432:duration={duration}',
            '-af', f'afade=t=in:ss=0:d=1.5,afade=t=out:st={duration - 2.0}:d=2.0,volume=0.3',
            temp_audio
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # Fonts
    bold_fonts = [
        r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\arialbd.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf"
    ]
    indic_fonts = [
        r"C:\Windows\Fonts\Nirmala.ttc",
        r"C:\Windows\Fonts\mangal.ttf",
        "/usr/share/fonts/truetype/noto/NotoSansDevanagari-Bold.ttf",
        "/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf"
    ]

    f_title = pick_font(bold_fonts, 38)
    f_sub = pick_font(bold_fonts, 26)
    f_mantra = pick_font(indic_fonts, 36)
    f_body = pick_font(bold_fonts, 24)
    f_badge = pick_font(bold_fonts, 22)

    # Load deity portrait
    art_path = dinfo["art"]
    if os.path.exists(art_path):
        raw_art = Image.open(art_path).convert("RGB")
    else:
        raw_art = Image.new("RGB", (700, 700), (30, 20, 50))

    # Center crop square
    w_a, h_a = raw_art.size
    min_dim = min(w_a, h_a)
    art_sq = raw_art.crop(((w_a - min_dim)//2, (h_a - min_dim)//2, (w_a + min_dim)//2, (h_a + min_dim)//2))
    ART_SZ = 620
    art_resized = art_sq.resize((ART_SZ, ART_SZ), Image.Resampling.LANCZOS)

    # Circle mask
    circle_mask = Image.new("L", (ART_SZ, ART_SZ), 0)
    cm_draw = ImageDraw.Draw(circle_mask)
    cm_draw.ellipse([0, 0, ART_SZ, ART_SZ], fill=255)

    print(f"[SUBH MUHURAT ENGINE] Rendering {TOTAL_FRAMES} frames ({duration}s, 1080x1920) for {dinfo['name']}...")

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
    CENTER_Y = 660

    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS

        # Deep cosmic morning dawn background
        frame = Image.new("RGBA", (W, H), (10, 14, 28, 255))
        draw = ImageDraw.Draw(frame)

        # 1. Radiating morning prana rays
        for ray_i in range(16):
            angle = ray_i * (2 * math.pi / 16) + t * 0.05
            rx = CX + int(700 * math.cos(angle))
            ry = CENTER_Y + int(700 * math.sin(angle))
            alpha = int(35 + 20 * math.sin(t * 2.0 + ray_i))
            draw.line([(CX, CENTER_Y), (rx, ry)], fill=(245, 158, 11, alpha), width=3)

        # 2. Breathing halo around deity
        pulse = 1.0 + 0.03 * math.sin(t * 3.0)
        HALO_SZ = int(ART_SZ * pulse) + 20
        hx = CX - HALO_SZ // 2
        hy = CENTER_Y - HALO_SZ // 2
        draw.ellipse([hx, hy, hx + HALO_SZ, hy + HALO_SZ], outline=dinfo["accent"], width=6)
        draw.ellipse([hx - 8, hy - 8, hx + HALO_SZ + 8, hy + HALO_SZ + 8], outline=dinfo["fire"], width=3)

        # 3. Paste deity
        ax = CX - ART_SZ // 2
        ay = CENTER_Y - ART_SZ // 2
        frame.paste(art_resized, (ax, ay), circle_mask)

        # 4. Header Banner: Subh Muhurat & Temple Call
        draw.rounded_rectangle([60, 50, W - 60, 160], radius=20, fill=(15, 23, 42, 230), outline=dinfo["accent"], width=2)
        draw.text((CX, 85), "DIVYA MANGALAM", fill=dinfo["accent"], font=f_title, anchor='mm')
        draw.text((CX, 125), f"🌅 SHUBH MUHURAT MORNING DARSHAN • {target_date.strftime('%A').upper()}", fill='#FDE68A', font=f_sub, anchor='mm')

        # 5. Anti-Theft Watermark Badge (Prominent Brand Protection)
        wm_box = [W - 410, 60, W - 75, 115]
        draw.rounded_rectangle(wm_box, radius=14, fill=(10, 15, 30, 235), outline='#F59E0B', width=2)
        draw.text(((wm_box[0] + wm_box[2]) // 2, (wm_box[1] + wm_box[3]) // 2), "🕉️ DIVYAMANGALAM.COM", fill='#FDE68A', font=f_badge, anchor='mm')

        # 6. Sacred Timings Card (Middle-Bottom)
        CARD_Y = CENTER_Y + ART_SZ // 2 + 50
        draw.rounded_rectangle([60, CARD_Y, W - 60, CARD_Y + 410], radius=22, fill=(15, 23, 42, 240), outline=dinfo["fire"], width=2)

        draw.text((CX, CARD_Y + 40), f"✦ {dinfo['title']} ✦", fill=dinfo["accent"], font=f_title, anchor='mm')
        draw.text((CX, CARD_Y + 95), dinfo["mantra"], fill='#FEF08A', font=f_mantra, anchor='mm')
        draw.text((CX, CARD_Y + 145), f"Chant: {dinfo['mantra_translit']}", fill='#CBD5E1', font=f_body, anchor='mm')

        # Auspicious Timings Section
        draw.rounded_rectangle([90, CARD_Y + 185, W - 90, CARD_Y + 310], radius=16, fill=(10, 15, 30, 200), outline='#10B981', width=2)
        draw.text((120, CARD_Y + 215), "✨ Brahma Muhurta:", fill='#34D399', font=f_body, anchor='lm')
        draw.text((W - 120, CARD_Y + 215), "04:30 AM – 05:20 AM", fill='#FFFFFF', font=f_body, anchor='rm')
        draw.text((120, CARD_Y + 250), "🌟 Abhijit Muhurta:", fill='#FBBF24', font=f_body, anchor='lm')
        draw.text((W - 120, CARD_Y + 250), "11:45 AM – 12:35 PM", fill='#FFFFFF', font=f_body, anchor='rm')
        draw.text((120, CARD_Y + 285), "🌸 Amrit Kaal:", fill='#60A5FA', font=f_body, anchor='lm')
        draw.text((W - 120, CARD_Y + 285), "08:15 AM – 09:45 AM", fill='#FFFFFF', font=f_body, anchor='rm')

        # Morning Blessing Text
        draw.text((CX, CARD_Y + 360), f"\"{dinfo['blessing']}\"", fill='#E2E8F0', font=f_body, anchor='mm')

        # 7. Permanent Professional Footer
        draw.text((CX, H - 90), f"✦ {date_formatted} • divyamangalam.com ✦", fill=dinfo["accent"], font=f_sub, anchor='mm')
        draw.text((CX, H - 45), "Follow @divyamangalam.info • YouTube: @DivyaMangalam", fill='#94A3B8', font=f_body, anchor='mm')

        # Send frame
        proc.stdin.write(frame.tobytes())

        if (frame_idx + 1) % 120 == 0:
            print(f"[SUBH MUHURAT ENGINE] Rendered {frame_idx + 1}/{TOTAL_FRAMES} frames...")

    proc.stdin.close()
    proc.wait()

    # Mux audio
    print(f"[SUBH MUHURAT ENGINE] Muxing video and audio into {output_mp4}...")
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4)), exist_ok=True)
    subprocess.run([
        ffmpeg_exe, '-y',
        '-i', temp_video,
        '-i', temp_audio,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        output_mp4
    ], check=True)

    # Cleanup temp
    for tmp in [temp_video, temp_audio]:
        if os.path.exists(tmp):
            try:
                os.remove(tmp)
            except Exception:
                pass

    print(f"✅ Successfully created Subh Muhurat Darshan Reel: {output_mp4} ({os.path.getsize(output_mp4)/(1024*1024):.2f} MB)")
    return output_mp4

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Subh Muhurat Darshan Reel Generator")
    parser.add_argument('--deity', type=str, default='auto')
    parser.add_argument('--duration', type=float, default=30.0)
    parser.add_argument('--out', type=str, default=None)
    parser.add_argument('--date', type=str, default=None)
    args = parser.parse_args()

    tdate = None
    if args.date:
        tdate = datetime.datetime.strptime(args.date, "%Y-%m-%d").date()

    render_subh_muhurat_reel(target_date=tdate, deity_key=args.deity, duration=args.duration, output_mp4=args.out)
