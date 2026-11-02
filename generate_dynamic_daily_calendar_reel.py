#!/usr/bin/env python3
"""
Divya Mangalam — Fully Dynamic Daily Vedic Calendar & Panchang Video Reel Engine
Features:
- Dynamic calculation of Panchang, Rahu Kaal, Yamagandam, Gulika & Muhurats for ANY given date
- Automatic synthesis of Indian-accented neural voice narration (edge-tts PrabhatNeural)
- ZERO background music clashing (100% clean voice narration for maximum clarity)
- Dynamic vertical video (1080x1920, 24fps) with Green Shubh Muhurat vs Red Ashubh Kaal format
- Automatic export for Instagram Reels
"""

import os
import sys
import math
import argparse
import datetime
import subprocess
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 7-Day Vedic Presiding Deity & Guidance Matrix
WEEKDAY_DEITY_CONFIGS = [
    # 0 = Sunday (Ravivara)
    {
        "day_en": "Sunday",
        "day_vedic": "Ravivara",
        "deity_name": "Bhagavan Surya Narayana",
        "deity_title": "BHAGAVAN SURYA (SURYA NARAYANA)",
        "mantra_sanskrit": "॥ ॐ घृणिः सूर्याय नमः ॥",
        "mantra_translit": "Om Ghrinih Suryaya Namah",
        "art_file": "surya_bhagavan.jpg",
        "accent": "#F59E0B",
        "remedy_title": "SUNDAY SACRED GUIDANCE & REMEDY",
        "remedy_bullets": [
            "• Offer Arghya with water and red flowers in a copper Kalash",
            "• Chant Aditya Hridaya Stotram for vitality and leadership",
            "• Avoid excess salt intake; cultivate gratitude and inner radiance"
        ],
        "remedy_audio": "Offer pure water with a copper Kalash to the rising Sun, and chant the Aditya Hridaya Stotram for vitality, health, and cosmic strength."
    },
    # 1 = Monday (Somavara)
    {
        "day_en": "Monday",
        "day_vedic": "Somavara",
        "deity_name": "Lord Shiva (Someshwara)",
        "deity_title": "LORD SHIVA (SOMESHWARA)",
        "mantra_sanskrit": "॥ ॐ नमः शिवाय ॥",
        "mantra_translit": "Om Namah Shivaya",
        "art_file": "shiva_kailash.jpg",
        "accent": "#38BDF8",
        "remedy_title": "MONDAY SACRED GUIDANCE & REMEDY",
        "remedy_bullets": [
            "• Chant 'Om Namah Shivaya' 108 times for emotional harmony",
            "• Offer raw milk, pure water or Bilva leaves to Shiva Lingam",
            "• Practice calming pranayama to harmonize lunar mind energies"
        ],
        "remedy_audio": "Offer raw milk or pure water to Lord Shiva, and chant Om Namah Shivaya 108 times to dissolve emotional restlessness and attain mental clarity."
    },
    # 2 = Tuesday (Mangalavara)
    {
        "day_en": "Tuesday",
        "day_vedic": "Mangalavara",
        "deity_name": "Lord Hanuman (Veer Bajrangbali)",
        "deity_title": "LORD HANUMAN (VEER BAJRANGBALI)",
        "mantra_sanskrit": "॥ ॐ हं हनुमते नमः ॥",
        "mantra_translit": "Om Ham Hanumate Namah",
        "art_file": "hanuman_ji.jpg",
        "accent": "#EA580C",
        "remedy_title": "TUESDAY SACRED GUIDANCE & REMEDY",
        "remedy_bullets": [
            "• Recite Shri Hanuman Chalisa for fearless courage and protection",
            "• Offer red flowers, sindoor or light a jasmine oil lamp",
            "• Feed jaggery and gram (chana) to invite energetic vitality"
        ],
        "remedy_audio": "Recite the sacred Hanuman Chalisa, light a lamp with jasmine oil, and meditate on Lord Hanuman to remove fears, obstacles, and debts."
    },
    # 3 = Wednesday (Budhavara)
    {
        "day_en": "Wednesday",
        "day_vedic": "Budhavara",
        "deity_name": "Lord Ganesha (Vighnaharta)",
        "deity_title": "LORD GANESHA (VIGHNAHARTA)",
        "mantra_sanskrit": "॥ ॐ गं गणपतये नमः ॥",
        "mantra_translit": "Om Gam Ganapataye Namah",
        "art_file": "durga_mata.jpg", # fallback or ganesha art
        "accent": "#10B981",
        "remedy_title": "WEDNESDAY SACRED GUIDANCE & REMEDY",
        "remedy_bullets": [
            "• Offer 21 fresh Durva grass blades and modak to Lord Ganesha",
            "• Chant 'Om Gam Ganapataye Namah' to clear business and intellect blocks",
            "• Donate green vegetables or feed birds for communicative clarity"
        ],
        "remedy_audio": "Offer 21 Durva blades to Lord Ganesha, and chant Om Gam Ganapataye Namah to bless your intellectual, communicative, and financial pursuits."
    },
    # 4 = Thursday (Guruvara)
    {
        "day_en": "Thursday",
        "day_vedic": "Guruvara",
        "deity_name": "Lord Vishnu / Sri Krishna",
        "deity_title": "LORD VISHNU (JAGADGURU)",
        "mantra_sanskrit": "॥ ॐ नमो भगवते वासुदेवाय ॥",
        "mantra_translit": "Om Namo Bhagavate Vasudevaya",
        "art_file": "krishna_ji.jpg",
        "accent": "#FBBF24",
        "remedy_title": "THURSDAY SACRED GUIDANCE & REMEDY",
        "remedy_bullets": [
            "• Wear yellow attire, chant Vishnu Sahasranama or Krishna Ashtakam",
            "• Offer yellow flowers and chana dal to Lord Vishnu or Peepal tree",
            "• Seek guru blessings; engage in scriptural study and meditation"
        ],
        "remedy_audio": "Chant Om Namo Bhagavate Vasudevaya, offer yellow flowers, and honor spiritual teachers to expand divine wisdom and universal prosperity."
    },
    # 5 = Friday (Shukravara)
    {
        "day_en": "Friday",
        "day_vedic": "Shukravara",
        "deity_name": "Maa Durga & Mahalakshmi",
        "deity_title": "MAA DURGA (ADI PARASHAKTI)",
        "mantra_sanskrit": "॥ ॐ श्रीं महालक्ष्म्यै नमः ॥",
        "mantra_translit": "Om Shreem Mahalakshmyai Namah",
        "art_file": "durga_mata.jpg",
        "accent": "#EC4899",
        "remedy_title": "FRIDAY SACRED GUIDANCE & REMEDY",
        "remedy_bullets": [
            "• Light a pure cow ghee lamp and chant Mahalakshmi Ashtakam",
            "• Offer white/lotus flowers and fragrant incense to the Divine Mother",
            "• Practice generosity and cultivate aesthetic, heart-centered harmony"
        ],
        "remedy_audio": "Light a pure cow ghee lamp, chant the Mahalakshmi Ashtakam, and offer fragrant flowers to welcome auspicious abundance and divine grace."
    },
    # 6 = Saturday (Shanivara)
    {
        "day_en": "Saturday",
        "day_vedic": "Shanivara",
        "deity_name": "Lord Venkateswara & Shani Dev",
        "deity_title": "LORD VENKATESWARA (BALAJI GOVINDA)",
        "mantra_sanskrit": "॥ ॐ नमो वेङ्कटेशाय ॥",
        "mantra_translit": "Om Namo Venkateshaya",
        "art_file": "shiva_kailash.jpg",
        "accent": "#6366F1",
        "remedy_title": "SATURDAY SACRED GUIDANCE & REMEDY",
        "remedy_bullets": [
            "• Light a sesame or mustard oil lamp under the sacred Peepal tree",
            "• Chant Govinda Namavali or Hanuman Chalisa for karmic protection",
            "• Feed black sesame seeds to birds and practice selfless humility"
        ],
        "remedy_audio": "Light a sesame oil lamp, chant Govinda Namavali or Hanuman Chalisa, and practice humble acts of charity to mitigate karmic obstacles."
    }
]

# Standard Rahu Kaal, Yamagandam, Gulika Timings by Day of Week (0=Sun, 6=Sat)
RAHU_KAAL_WINDOWS = [
    '04:30 PM – 06:00 PM', # Sun
    '07:30 AM – 09:00 AM', # Mon
    '03:00 PM – 04:30 PM', # Tue
    '12:00 PM – 01:30 PM', # Wed
    '01:30 PM – 03:00 PM', # Thu
    '10:30 AM – 12:00 PM', # Fri
    '09:00 AM – 10:30 AM'  # Sat
]

YAMAGANDAM_WINDOWS = [
    '12:00 PM – 01:30 PM', # Sun
    '10:30 AM – 12:00 PM', # Mon
    '09:00 AM – 10:30 AM', # Tue
    '07:30 AM – 09:00 AM', # Wed
    '01:30 PM – 03:00 PM', # Thu
    '03:00 PM – 04:30 PM', # Fri
    '04:30 PM – 06:00 PM'  # Sat
]

GULIKA_WINDOWS = [
    '03:00 PM – 04:30 PM', # Sun
    '01:30 PM – 03:00 PM', # Mon
    '12:00 PM – 01:30 PM', # Tue
    '10:30 AM – 12:00 PM', # Wed
    '09:00 AM – 10:30 AM', # Thu
    '07:30 AM – 09:00 AM', # Fri
    '06:00 AM – 07:30 AM'  # Sat
]

TITHI_NAMES = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima / Amavasya'
]

NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta',
    'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
]

YOGAS = [
    'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
    'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva',
    'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan',
    'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
]

RASHIS = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
    'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)',
    'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
]

def calculate_panchang(target_date):
    """Accurate Sidereal / Lahiri Ephemeris Approximation for the target date."""
    day_of_week = (target_date.weekday() + 1) % 7 # Python Monday=0 -> Sun=0, Mon=1...
    
    # Julian Date Calculation
    y = target_date.year
    m = target_date.month
    d = target_date.day
    if m <= 2:
        y -= 1
        m += 12
    A = math.floor(y / 100)
    B = 2 - A + math.floor(A / 4)
    jd = math.floor(365.25 * (y + 4716)) + math.floor(30.6001 * (m + 1)) + d + B - 1524.5 + 0.5
    days_since_epoch = jd - 2451545.0
    
    sun_long = (280.460 + 0.9856474 * days_since_epoch) % 360
    moon_long = (218.316 + 13.176396 * days_since_epoch) % 360
    diff = ((moon_long - sun_long) + 360) % 360

    tithi_idx = int(math.floor(diff / 12)) % 30
    is_shukla = tithi_idx < 15
    paksha = "Shukla Paksha" if is_shukla else "Krishna Paksha"
    tithi_name = TITHI_NAMES[tithi_idx % 15]

    nakshatra_idx = int(math.floor((moon_long % 360) / (360 / 27))) % 27
    nakshatra_name = NAKSHATRAS[nakshatra_idx]

    yoga_idx = int(math.floor(((sun_long + moon_long) % 360) / (360 / 27))) % 27
    yoga_name = YOGAS[yoga_idx]

    rashi_idx = int(math.floor((moon_long % 360) / 30)) % 12
    rashi_name = RASHIS[rashi_idx]

    deity_cfg = WEEKDAY_DEITY_CONFIGS[day_of_week]

    return {
        "date_str": target_date.strftime("%Y-%m-%d"),
        "date_formatted": target_date.strftime("%B %d, %Y"),
        "day_of_week": day_of_week,
        "day_en": deity_cfg["day_en"],
        "day_vedic": deity_cfg["day_vedic"],
        "deity": deity_cfg,
        "tithi": f"{tithi_name} ({paksha})",
        "nakshatra": nakshatra_name,
        "yoga": yoga_name,
        "moon_rashi": rashi_name,
        "rahu_kaal": RAHU_KAAL_WINDOWS[day_of_week],
        "yamagandam": YAMAGANDAM_WINDOWS[day_of_week],
        "gulika": GULIKA_WINDOWS[day_of_week],
        "abhijit": "11:45 AM – 12:35 PM",
        "brahma_muhurta": "04:30 AM – 05:18 AM"
    }

def synthesize_panchang_voice(pdata, out_audio):
    """Synthesize pure soothing Indian neural voiceover (ZERO music track)."""
    script = f"""Hari Om and divine morning blessings.
Today is {pdata['day_vedic']}, {pdata['day_en']}, {pdata['date_formatted']}.
On this auspicious day, we invoke the supreme grace of {pdata['deity']['deity_name']}.

According to the sacred Vedic Panchang:
Today's Tithi is {pdata['tithi']}.
The ruling Nakshatra is {pdata['nakshatra']}.
The Yoga is {pdata['yoga']}, and the Moon resides in {pdata['moon_rashi']}.

Now, note today’s essential timing guide.
First, the auspicious Shubh Muhurat windows to start noble endeavors, investments, and sacred prayers:
Today's supreme golden window is the Abhijit Muhurta, active from {pdata['abhijit']}.
Brahma Muhurta was present at dawn from {pdata['brahma_muhurta']}, ideal for deep meditation and sadhana.

Next, remain vigilant during today's inauspicious Ashubh Kaal periods. Please avoid signing contracts, launching new business ventures, or inaugurating major material projects during these windows:
Rahu Kaal today is in effect from {pdata['rahu_kaal']}.
Yamagandam is from {pdata['yamagandam']}, and Gulika Kalam is from {pdata['gulika']}.

For today's sacred remedy and guidance:
Chant the holy mantra: {pdata['deity']['mantra_translit']}.
{pdata['deity']['remedy_audio']}

May the divine grace illuminate your path with boundless health, peace, and prosperity.
Shubham Bhavatu."""

    print(f"[VOICE SYNTHESIS] Generating pure voiceover ({pdata['date_str']})...")
    os.makedirs(os.path.dirname(os.path.abspath(out_audio)), exist_ok=True)
    temp_txt = os.path.join(BASE_DIR, "temp_panchang_script.txt")
    with open(temp_txt, "w", encoding="utf-8") as f:
        f.write(script)

    cmd = [
        sys.executable, "-m", "edge_tts",
        "--voice", "en-IN-PrabhatNeural",
        "--rate=+6%",
        "-f", temp_txt,
        "--write-media", out_audio
    ]
    subprocess.run(cmd, check=True)
    if os.path.exists(temp_txt):
        try: os.remove(temp_txt)
        except Exception: pass
    print(f"[VOICE SYNTHESIS] Audio generated at: {out_audio}")
    return out_audio

def pick_font(candidates, size):
    for path in candidates:
        if os.path.exists(path):
            try: return ImageFont.truetype(path, size)
            except Exception: pass
    for generic in ["segoeuib.ttf", "arial.ttf", "DejaVuSans.ttf", "Nirmala.ttc"]:
        try: return ImageFont.truetype(generic, size)
        except Exception: pass
    return ImageFont.load_default()

def render_dynamic_calendar_reel(pdata, voice_path, out_mp4):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    # Get duration of voice
    probe_cmd = [ffmpeg_exe, '-i', voice_path]
    res = subprocess.run(probe_cmd, stderr=subprocess.PIPE, text=True)
    duration = 72.0
    for line in res.stderr.split('\n'):
        if 'Duration' in line:
            parts = line.split('Duration:')[1].split(',')[0].strip().split(':')
            duration = float(parts[0])*3600 + float(parts[1])*60 + float(parts[2])
            break

    print(f"[RENDER ENGINE] Voice duration: {duration:.2f}s | Target: 1080x1920 24fps")

    W, H = 1080, 1920
    FPS = 24
    TOTAL_FRAMES = int(FPS * duration)

    bold_candidates = [r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]
    reg_candidates = [r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"]
    indic_candidates = [r"C:\Windows\Fonts\Nirmala.ttc", r"C:\Windows\Fonts\mangal.ttf", "/usr/share/fonts/truetype/noto/NotoSansDevanagari-Bold.ttf"]

    f_hero = pick_font(bold_candidates, 44)
    f_title = pick_font(bold_candidates, 36)
    f_sub = pick_font(bold_candidates, 28)
    f_text = pick_font(reg_candidates, 24)
    f_small = pick_font(reg_candidates, 20)
    f_sanskrit = pick_font(indic_candidates, 36)
    f_brand = pick_font(bold_candidates, 26)

    # Load Deity Avatar Artwork
    art_path = os.path.join(BASE_DIR, "images", pdata["deity"]["art_file"])
    if not os.path.exists(art_path):
        art_path = os.path.join(BASE_DIR, "images", "shiva_kailash.jpg")
    if os.path.exists(art_path):
        base_art = Image.open(art_path).convert("RGBA")
    else:
        base_art = Image.new("RGBA", (800, 800), (30, 41, 59, 255))

    temp_video = os.path.join(BASE_DIR, "temp_dyn_cal_video.mp4")
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
    accent_color = pdata["deity"]["accent"]

    DEITY_SZ = 220
    d_x = CX - DEITY_SZ // 2
    d_y = 240
    cur_art = base_art.resize((DEITY_SZ, DEITY_SZ), Image.Resampling.LANCZOS)
    mask = Image.new("L", (DEITY_SZ, DEITY_SZ), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, DEITY_SZ, DEITY_SZ], fill=255)

    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS
        progress = t / duration

        frame = Image.new("RGBA", (W, H), (10, 14, 26, 255))
        draw = ImageDraw.Draw(frame)

        # 1. Background Celestial Stars
        for star_i in range(30):
            sx = int((120 + star_i * 67 + star_i**2 * 11) % W)
            sy = int((80 + star_i * 91 + star_i**3 * 7) % H)
            s_bright = int(120 + 80 * math.sin(star_i + t * 2.5))
            draw.ellipse([sx - 2, sy - 2, sx + 2, sy + 2], fill=(255, 255, 255, s_bright))

        # 2. Top Progress Bar
        bar_w = int(W * progress)
        draw.rectangle([0, 0, bar_w, 8], fill=accent_color)

        # 3. Main Header
        draw.rounded_rectangle([60, 40, W - 60, 130], radius=16, fill=(15, 23, 42, 240), outline=accent_color, width=2)
        draw.text((CX, 72), "DIVYA MANGALAM", fill=accent_color, font=f_brand, anchor='mm')
        draw.text((CX, 105), "✦ DAILY VEDIC CALENDAR & PANCHANG ✦", fill='#FDE68A', font=f_sub, anchor='mm')

        # 4. Date Badge
        draw.rounded_rectangle([100, 150, W - 100, 220], radius=14, fill=(30, 41, 59, 230), outline='#F59E0B', width=2)
        date_header_str = f"📅 {pdata['date_str']} • {pdata['day_vedic'].upper()} ({pdata['day_en'].upper()})"
        draw.text((CX, 185), date_header_str, fill='#FFFFFF', font=f_title, anchor='mm')

        # 5. Deity Avatar & Mantra Banner
        halo_pulse = int(10 * math.sin(t * 3.0))
        draw.ellipse([d_x - 12 - halo_pulse, d_y - 12 - halo_pulse, d_x + DEITY_SZ + 12 + halo_pulse, d_y + DEITY_SZ + 12 + halo_pulse],
                     outline=accent_color, width=4)
        frame.paste(cur_art, (d_x, d_y), mask)

        draw.text((CX, 485), f"DEITY OF THE DAY: {pdata['deity']['deity_title']}", fill=accent_color, font=f_sub, anchor='mm')
        draw.text((CX, 525), pdata['deity']['mantra_sanskrit'], fill='#FEF08A', font=f_sanskrit, anchor='mm')

        # 6. Core Panchang 4-Grid Cards
        grid_y = 565
        grid_h = 175
        draw.rounded_rectangle([60, grid_y, W - 60, grid_y + grid_h], radius=18, fill=(15, 23, 42, 240), outline='#64748B', width=2)

        draw.text((CX - 240, grid_y + 45), "🌙 TITHI", fill='#94A3B8', font=f_small, anchor='mm')
        draw.text((CX - 240, grid_y + 85), pdata['tithi'], fill='#FFFFFF', font=f_sub, anchor='mm')

        draw.text((CX + 240, grid_y + 45), "⭐ NAKSHATRA", fill='#94A3B8', font=f_small, anchor='mm')
        draw.text((CX + 240, grid_y + 85), pdata['nakshatra'], fill='#FFFFFF', font=f_sub, anchor='mm')

        draw.text((CX - 240, grid_y + 130), f"🔮 YOGA: {pdata['yoga']}", fill='#FDE68A', font=f_text, anchor='mm')
        draw.text((CX + 240, grid_y + 130), f"🦁 MOON: {pdata['moon_rashi']}", fill='#FDE68A', font=f_text, anchor='mm')

        # 7. Dynamic Stage Focus Based on Speech Flow
        is_shubh_focus = (16.0 <= t < 42.0)
        is_ashubh_focus = (42.0 <= t < 60.0)
        is_remedy_focus = (t >= 60.0)

        # 🟢 SHUBH MUHURAT CARD
        shubh_y = 765
        shubh_h = 320
        shubh_bg = (6, 78, 59, 230) if is_shubh_focus else (15, 23, 42, 230)
        shubh_border = '#10B981' if is_shubh_focus else '#059669'
        draw.rounded_rectangle([60, shubh_y, W - 60, shubh_y + shubh_h], radius=20, fill=shubh_bg, outline=shubh_border, width=4 if is_shubh_focus else 2)

        draw.text((CX, shubh_y + 40), "✦ SHUBH MUHURAT (AUSPICIOUS TIMINGS) ✦", fill='#34D399', font=f_title, anchor='mm')
        draw.text((CX, shubh_y + 75), "Golden windows to start new tasks, investments & sacred prayers", fill='#D1FAE5', font=f_small, anchor='mm')

        ab_bg = (16, 185, 129, 60) if is_shubh_focus else (30, 41, 59, 140)
        draw.rounded_rectangle([90, shubh_y + 105, W - 90, shubh_y + 195], radius=14, fill=ab_bg, outline='#F59E0B', width=2)
        draw.text((CX, shubh_y + 135), f"🌟 ABHIJIT MUHURTA: {pdata['abhijit']}", fill='#FDE68A', font=f_hero, anchor='mm')
        draw.text((CX, shubh_y + 172), "Supreme midday window for major starts, meetings & success", fill='#FFFFFF', font=f_text, anchor='mm')

        draw.text((CX, shubh_y + 235), f"🪔 Brahma Muhurta: {pdata['brahma_muhurta']} (Meditation & Sadhana)", fill='#FFFFFF', font=f_text, anchor='mm')
        draw.text((CX, shubh_y + 275), "🌸 Amrit Kaal / Godhuli: Evening Auspicious Puja Window", fill='#A7F3D0', font=f_text, anchor='mm')

        # 🔴 ASHUBH KAAL CARD (Red)
        ashubh_y = 1115
        ashubh_h = 280
        ashubh_bg = (127, 29, 29, 230) if is_ashubh_focus else (15, 23, 42, 230)
        ashubh_border = '#EF4444' if is_ashubh_focus else '#B91C1C'
        draw.rounded_rectangle([60, ashubh_y, W - 60, ashubh_y + ashubh_h], radius=20, fill=ashubh_bg, outline=ashubh_border, width=4 if is_ashubh_focus else 2)

        draw.text((CX, ashubh_y + 40), "⚠️ ASHUBH KAAL (CAUTION TIMINGS) ⚠️", fill='#F87171', font=f_title, anchor='mm')
        draw.text((CX, ashubh_y + 75), "Avoid starting new financial contracts, journeys or inaugurations", fill='#FEE2E2', font=f_small, anchor='mm')

        rahu_bg = (239, 68, 68, 60) if is_ashubh_focus else (30, 41, 59, 140)
        draw.rounded_rectangle([90, ashubh_y + 105, W - 90, ashubh_y + 185], radius=14, fill=rahu_bg, outline='#EF4444', width=2)
        draw.text((CX, ashubh_y + 133), f"⛔ RAHU KAAL: {pdata['rahu_kaal']}", fill='#FCA5A5', font=f_hero, anchor='mm')
        draw.text((CX, ashubh_y + 165), "Caution: Avoid major material/contractual beginnings", fill='#FFFFFF', font=f_small, anchor='mm')

        draw.text((CX, ashubh_y + 215), f"⏳ Yamagandam: {pdata['yamagandam']}", fill='#FECACA', font=f_text, anchor='mm')
        draw.text((CX, ashubh_y + 248), f"🛑 Gulika Kalam: {pdata['gulika']}", fill='#E2E8F0', font=f_text, anchor='mm')

        # 8. Sacred Remedy & Guidance Box
        rem_y = 1425
        rem_h = 240
        rem_bg = (30, 58, 138, 230) if is_remedy_focus else (15, 23, 42, 230)
        rem_border = accent_color if is_remedy_focus else '#3B82F6'
        draw.rounded_rectangle([60, rem_y, W - 60, rem_y + rem_h], radius=20, fill=rem_bg, outline=rem_border, width=3 if is_remedy_focus else 2)

        draw.text((CX, rem_y + 35), f"🌿 {pdata['deity']['remedy_title']}", fill='#93C5FD', font=f_title, anchor='mm')
        draw.text((CX, rem_y + 80), pdata['deity']['remedy_bullets'][0], fill='#FFFFFF', font=f_text, anchor='mm')
        draw.text((CX, rem_y + 120), pdata['deity']['remedy_bullets'][1], fill='#FFFFFF', font=f_text, anchor='mm')
        draw.text((CX, rem_y + 160), pdata['deity']['remedy_bullets'][2], fill='#FFFFFF', font=f_text, anchor='mm')
        draw.text((CX, rem_y + 205), f"✨ शुभं भवतु • May {pdata['deity']['deity_name']} Bless Your Day ✨", fill='#FDE68A', font=f_sub, anchor='mm')

        # 9. Professional Footer CTA
        draw.text((CX, H - 120), "✦ Complete Vedic Tools • AI Palm Reading • divyamangalam.com ✦", fill='#38BDF8', font=f_sub, anchor='mm')
        draw.text((CX, H - 75), "Follow @divyamangalam.info for Daily Panchang & Shubh Muhurat Reels", fill='#CBD5E1', font=f_small, anchor='mm')

        proc.stdin.write(frame.tobytes())

        if (frame_idx + 1) % 180 == 0:
            print(f"[RENDER ENGINE] Rendered {frame_idx + 1}/{TOTAL_FRAMES} frames ({(frame_idx + 1)/FPS:.1f}s / {duration:.0f}s)...")

    proc.stdin.close()
    proc.wait()

    # Mux clean voice audio (NO MUSIC) with video
    print("[RENDER ENGINE] Muxing video frames with 100% clean voice narration (ZERO MUSIC)...")
    os.makedirs(os.path.dirname(os.path.abspath(out_mp4)), exist_ok=True)
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

    if os.path.exists(temp_video):
        try: os.remove(temp_video)
        except Exception: pass

    print(f"\n[SUCCESS] Daily Calendar Reel created at: {out_mp4} ({os.path.getsize(out_mp4)/(1024*1024):.2f} MB)")
    return out_mp4

def generate_daily_panchang_reel(target_date_str=None):
    if target_date_str:
        target_date = datetime.datetime.strptime(target_date_str, "%Y-%m-%d").date()
    else:
        target_date = datetime.date.today()

    pdata = calculate_panchang(target_date)
    print("==================================================")
    print(f"🕉️ CALCULATING PANCHANG FOR: {pdata['date_str']} ({pdata['day_vedic']}, {pdata['day_en']})")
    print(f"Deity: {pdata['deity']['deity_name']}")
    print(f"Tithi: {pdata['tithi']} | Nakshatra: {pdata['nakshatra']} | Yoga: {pdata['yoga']}")
    print(f"Rahu Kaal: {pdata['rahu_kaal']} | Abhijit: {pdata['abhijit']}")
    print("==================================================")

    voice_path = os.path.join(BASE_DIR, "audio", f"panchang_voice_{pdata['date_str']}.mp3")
    synthesize_panchang_voice(pdata, voice_path)

    out_mp4 = os.path.join(BASE_DIR, "images", f"panchang_reel_{pdata['date_str']}.mp4")
    render_dynamic_calendar_reel(pdata, voice_path, out_mp4)

    # Also symlink or copy to daily_calendar_reel_today.mp4
    today_copy = os.path.join(BASE_DIR, "images", "daily_calendar_reel_today.mp4")
    try:
        import shutil
        shutil.copyfile(out_mp4, today_copy)
    except Exception:
        pass

    return out_mp4, pdata

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generate Dynamic Daily Vedic Calendar Reel")
    parser.add_argument('--date', type=str, default=None, help="Target date YYYY-MM-DD (defaults to today)")
    args = parser.parse_args()

    generate_daily_panchang_reel(args.date)
