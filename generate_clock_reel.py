"""
Divya Mangalam — 24-Hour Sacred Vedic Muhurat Clock Reel Engine
Generates pristine 1080x1920 10-second vertical reel with animated celestial dial,
glowing Shubh/Ashubh timing highlights, 432Hz harmonic drone & sacred voiceover.
"""

import os, sys, math, datetime, argparse, wave, struct, subprocess, asyncio
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

try:
    import edge_tts
    HAS_EDGE_TTS = True
except ImportError:
    HAS_EDGE_TTS = False

from generate_clock_post import calculate_clock_data, draw_vector_star, draw_vector_triangle, draw_sun_icon, draw_moon_icon

def create_432hz_drone(wav_path, duration=10.0, sample_rate=44100):
    n_samples = int(sample_rate * duration)
    with wave.open(wav_path, 'w') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        for i in range(n_samples):
            t = i / sample_rate
            env = 1.0
            if t < 1.2: env = t / 1.2
            elif t > duration - 1.2: env = (duration - t) / 1.2
            
            # 432 Hz + 108 Hz + 216 Hz sacred harmonics
            val = (
                0.45 * math.sin(2 * math.pi * 432 * t) +
                0.35 * math.sin(2 * math.pi * 108 * t) +
                0.20 * math.sin(2 * math.pi * 216 * t)
            ) * env
            sample = int(val * 16000)
            wav.writeframes(struct.pack('<h', sample))

async def synthesize_clock_voiceover(text, output_mp3):
    if not HAS_EDGE_TTS:
        return False
    try:
        # MadhurNeural provides warm, authoritative, respectful Hindi-English devotional tone
        comm = edge_tts.Communicate(text, 'hi-IN-MadhurNeural', rate='-5%', pitch='-2Hz')
        await comm.save(output_mp3)
        return True
    except Exception as e:
        print(f"Warning: Edge-TTS synthesis failed ({e}), falling back to 432 Hz drone only.")
        return False

def render_clock_reel(target_date=None, output_mp4="images/clock_reel.mp4", duration=10.0):
    if target_date is None:
        target_date = datetime.date.today()

    data = calculate_clock_data(target_date)
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    W, H = 1080, 1920
    FPS = 30
    TOTAL_FRAMES = int(FPS * duration)

    temp_drone = "temp_clock_drone.wav"
    temp_vocal = "temp_clock_vocal.mp3"
    temp_audio = "temp_clock_audio_final.wav"
    temp_video = "temp_clock_video.mp4"

    # 1. Synthesize 432 Hz Drone
    print(f"[REEL] Synthesizing {duration}s 432 Hz cosmic harmonic drone...")
    create_432hz_drone(temp_drone, duration=duration)

    # 2. Synthesize Sacred Voiceover Guidance
    # English-Hindi devotional alert
    vo_script = (
        f"Namaste. Today is {data['weekday']}, {data['vara']}. "
        f"Today's Abhijit Muhurta is from {data['abhijit'][2]}. Commence your auspicious ventures in this window. "
        f"Beware of Rahu Kaal from {data['rahu'][2]}. Avoid starting major new tasks during this time. "
        f"Check your complete 24-hour Vedic Clock on Divya Mangalam dot com. Hari Om Tat Sat."
    )
    print(f"[REEL] Synthesizing voiceover: \"{vo_script[:60]}...\"")
    has_vocal = asyncio.run(synthesize_clock_voiceover(vo_script, temp_vocal))

    # 3. Mix Audio with Temple Reverb
    if has_vocal and os.path.exists(temp_vocal):
        print("[REEL] Mixing 432 Hz drone + vocal guidance with sacred reverb...")
        mix_cmd = [
            ffmpeg_exe, '-y',
            '-i', temp_drone,
            '-i', temp_vocal,
            '-filter_complex', '[0:a]volume=0.30[d];[1:a]volume=1.35,aecho=0.8:0.8:40:0.3[v];[d][v]amix=inputs=2:duration=first[aout]',
            '-map', '[aout]',
            '-c:a', 'pcm_s16le',
            temp_audio
        ]
        subprocess.run(mix_cmd, check=True)
    else:
        temp_audio = temp_drone

    # 4. Fonts
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"

    def get_font(path, size):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            return ImageFont.load_default()

    f_brand = get_font(font_bold, 32)
    f_title = get_font(font_bold, 48)
    f_subtitle = get_font(font_bold, 28)
    f_card_title = get_font(font_bold, 30)
    f_item_name = get_font(font_bold, 28)
    f_item_time = get_font(font_bold, 32)
    f_item_sub = get_font(font_reg, 22)
    f_hour = get_font(font_bold, 20)
    f_hub_title = get_font(font_bold, 26)
    f_hub_sub = get_font(font_bold, 20)
    f_url = get_font(font_bold, 28)

    # 5. Pre-Render Dial & Static Elements
    # Center for 24-Hour Dial on Vertical 1080x1920:
    CCX, CCY = 540, 680
    R_OUT = 330
    R_RING_OUT = 300
    R_RING_IN = 180
    R_HUB = 140

    # Start ffmpeg pipe for video frames
    cmd_video = [
        ffmpeg_exe, '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f"{W}x{H}",
        '-pix_fmt', 'rgba',
        '-r', str(FPS),
        '-i', '-',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        '-crf', '19',
        temp_video
    ]
    proc = subprocess.Popen(cmd_video, stdin=subprocess.PIPE)

    print(f"[REEL] Rendering {TOTAL_FRAMES} frames for 10-second vertical Reel...")

    for frame_idx in range(TOTAL_FRAMES):
        t_sec = frame_idx / float(FPS)
        
        # Base frame: deep cosmic temple dark
        frame = Image.new('RGBA', (W, H), (10, 6, 18, 255))
        draw = ImageDraw.Draw(frame)

        # Subtle gold outer border
        draw.rectangle([(25, 25), (W - 25, H - 25)], outline='#D4A017', width=3)
        draw.rectangle([(32, 32), (W - 32, H - 32)], outline='#5A4210', width=1)

        # Corner Stars
        for cx_s, cy_s in [(50, 50), (W - 50, 50), (50, H - 50), (W - 50, H - 50)]:
            draw_vector_star(draw, cx_s, cy_s, 14, '#D4A017')

        # Top Header
        draw_vector_star(draw, 220, 105, 12, '#FFD700')
        draw.text((250, 85), "DIVYA MANGALAM", fill='#FFD700', font=f_brand)
        draw_vector_star(draw, 860, 105, 12, '#FFD700')

        draw.text((W//2, 160), "TODAY'S 24-HOUR VEDIC CLOCK", fill='#FFFFFF', font=f_title, anchor='mm')
        draw.text((W//2, 215), f"{data['date_str']} • {data['vara']} ({data['planet']} Day)", fill='#FFB74D', font=f_subtitle, anchor='mm')

        # Draw Base Clock Dial Circle
        draw.ellipse([(CCX - R_OUT, CCY - R_OUT), (CCX + R_OUT, CCY + R_OUT)], fill='#10091E', outline='#D4A017', width=4)
        draw.ellipse([(CCX - R_RING_OUT, CCY - R_RING_OUT), (CCX + R_RING_OUT, CCY + R_RING_OUT)], outline='#5A4210', width=2)

        # Day / Night Track Background
        sunrise_deg = (data['sunrise_h'] % 24) * 15.0 - 90
        sunset_deg = (data['sunset_h'] % 24) * 15.0 - 90
        if sunset_deg < sunrise_deg:
            sunset_deg += 360

        draw.pieslice([(CCX - R_RING_OUT, CCY - R_RING_OUT), (CCX + R_RING_OUT, CCY + R_RING_OUT)],
                      start=0, end=360, fill='#16102C')
        draw.pieslice([(CCX - R_RING_OUT, CCY - R_RING_OUT), (CCX + R_RING_OUT, CCY + R_RING_OUT)],
                      start=sunrise_deg, end=sunset_deg, fill='#2B1A0E')

        # Draw Annular Timing Wedges
        def draw_wedge(start_dec_h, end_dec_h, fill_color, border_color):
            a1 = (start_dec_h % 24) * 15.0 - 90
            a2 = (end_dec_h % 24) * 15.0 - 90
            if a2 < a1: a2 += 360
            draw.pieslice([(CCX - R_RING_OUT, CCY - R_RING_OUT), (CCX + R_RING_OUT, CCY + R_RING_OUT)],
                          start=a1, end=a2, fill=fill_color, outline=border_color, width=3)

        # Pulsating glow factor based on time
        pulse = 0.5 + 0.5 * math.sin(2 * math.pi * t_sec * 1.5)
        
        # 🔴 Rahu Kaal
        draw_wedge(data['rahu'][0], data['rahu'][1], '#DC2626', '#FFA4A4')
        # 🟠 Yamagandam
        draw_wedge(data['yama'][0], data['yama'][1], '#EA580C', '#FFD0A4')
        # 🟡 Gulika Kalam
        draw_wedge(data['gulika'][0], data['gulika'][1], '#CA8A04', '#FFF0A4')
        # 🟢 Abhijit Muhurta (with dynamic pulsing aura)
        draw_wedge(data['abhijit'][0], data['abhijit'][1], '#059669', '#34D399' if pulse > 0.5 else '#A7F3D0')
        # 🟣 Brahma Muhurta
        draw_wedge(data['brahma'][0], data['brahma'][1], '#7C3AED', '#DDD6FE')
        # 🔵 Vijaya Muhurta
        draw_wedge(data['vijaya'][0], data['vijaya'][1], '#0284C7', '#BAE6FD')

        # Center cutout
        draw.ellipse([(CCX - R_RING_IN, CCY - R_RING_IN), (CCX + R_RING_IN, CCY + R_RING_IN)],
                     fill='#10091E', outline='#D4A017', width=3)

        # 24-Hour Markers
        for h in range(24):
            angle_rad = math.radians(h * 15)
            is_major = (h % 3 == 0)
            r1 = R_OUT - 3
            r2 = R_OUT - (22 if is_major else 11)
            x1 = CCX + r1 * math.sin(angle_rad)
            y1 = CCY - r1 * math.cos(angle_rad)
            x2 = CCX + r2 * math.sin(angle_rad)
            y2 = CCY - r2 * math.cos(angle_rad)
            draw.line([(x1, y1), (x2, y2)], fill='#FFD700' if is_major else '#7A6538', width=3 if is_major else 1)

            if is_major:
                tx = CCX + (R_OUT + 24) * math.sin(angle_rad)
                ty = CCY - (R_OUT + 24) * math.cos(angle_rad)
                h_lbl = '00h' if h == 0 else ('12h' if h == 12 else f'{h:02d}h')
                draw.text((tx, ty), h_lbl, fill='#F1F5F9', font=f_hour, anchor='mm')

        # Sunrise & Sunset Horizon Rays
        rad_rise = math.radians((data['sunrise_h'] % 24) * 15)
        x_rise = CCX + (R_RING_OUT + 12) * math.sin(rad_rise)
        y_rise = CCY - (R_RING_OUT + 12) * math.cos(rad_rise)
        draw.line([(CCX, CCY), (x_rise, y_rise)], fill='#FF7A29', width=4)
        draw_sun_icon(draw, x_rise, y_rise, 12, '#FFB74D')

        rad_set = math.radians((data['sunset_h'] % 24) * 15)
        x_set = CCX + (R_RING_OUT + 12) * math.sin(rad_set)
        y_set = CCY - (R_RING_OUT + 12) * math.cos(rad_set)
        draw.line([(CCX, CCY), (x_set, y_set)], fill='#F43F5E', width=4)
        draw_moon_icon(draw, x_set, y_set, 11, '#CBD5E1')

        # Dynamic Animated Golden Needle sweeping 360 degrees across the 10-second reel
        needle_hour = (t_sec / duration) * 24.0
        rad_needle = math.radians(needle_hour * 15)
        nx = CCX + (R_RING_OUT + 8) * math.sin(rad_needle)
        ny = CCY - (R_RING_OUT + 8) * math.cos(rad_needle)
        draw.line([(CCX, CCY), (nx, ny)], fill='#FFD700', width=5)
        draw.line([(CCX, CCY), (nx, ny)], fill='#FFFFFF', width=2)
        draw.ellipse([(nx - 8, ny - 8), (nx + 8, ny + 8)], fill='#E65100', outline='#FFFFFF', width=2)

        # Center Hub Medallion
        draw.ellipse([(CCX - R_HUB, CCY - R_HUB), (CCX + R_HUB, CCY + R_HUB)], fill='#18102A', outline='#FFD700', width=4)
        draw_vector_star(draw, CCX, CCY - 60, 8, '#FFD700')
        draw.text((CCX, CCY - 30), "24-HOUR", fill='#FFD700', font=f_hub_title, anchor='mm')
        draw.text((CCX, CCY), "VEDIC CLOCK", fill='#FFFFFF', font=f_hub_title, anchor='mm')
        draw.text((CCX, CCY + 36), f"Rise {data['sunrise_str']}", fill='#FFB74D', font=f_hub_sub, anchor='mm')
        draw.text((CCX, CCY + 64), f"Set  {data['sunset_str']}", fill='#FF8A65', font=f_hub_sub, anchor='mm')

        # 6. Lower Cards: Auspicious & Inauspicious Highlights (Vertical Layout)
        # Card 1: Abhijit Muhurta (Green High-Priority Card)
        C1_Y = 1100
        draw.rounded_rectangle([(60, C1_Y), (W - 60, C1_Y + 180)], radius=20, fill='#0B2219', outline='#10B981', width=3)
        draw_vector_star(draw, 105, C1_Y + 45, 12, '#34D399')
        draw.text((130, C1_Y + 28), "SUPREME AUSPICIOUS • ABHIJIT MUHURTA", fill='#34D399', font=f_card_title)
        draw.text((100, C1_Y + 80), data['abhijit'][2], fill='#FFFFFF', font=f_item_time)
        draw.text((100, C1_Y + 130), "Best window for new starts, deals, agreements, gold & vehicle delivery.", fill='#A7F3D0', font=f_item_sub)

        # Card 2: Rahu Kaal Alert (Red Caution Card)
        C2_Y = 1315
        draw.rounded_rectangle([(60, C2_Y), (W - 60, C2_Y + 180)], radius=20, fill='#2A0C14', outline='#EF4444', width=3)
        draw_vector_triangle(draw, 105, C2_Y + 45, 22, '#EF4444')
        draw.text((130, C2_Y + 28), "STRICTLY INAUSPICIOUS • RAHU KAAL ALERT", fill='#F87171', font=f_card_title)
        draw.text((100, C2_Y + 80), data['rahu'][2], fill='#FFFFFF', font=f_item_time)
        draw.text((100, C2_Y + 130), "Avoid initiating critical milestones, contracts, travels or purchases.", fill='#FCA5A5', font=f_item_sub)

        # Card 3: Brahma Muhurta & Yamagandam Summary (Purple/Orange Twin Pill)
        C3_Y = 1530
        draw.rounded_rectangle([(60, C3_Y), (W//2 - 15, C3_Y + 140)], radius=16, fill='#1A1032', outline='#8B5CF6', width=2)
        draw.text((85, C3_Y + 25), "Brahma Muhurta (Spiritual)", fill='#C4B5FD', font=f_card_title)
        draw.text((85, C3_Y + 75), data['brahma'][2], fill='#FFFFFF', font=f_item_name)

        draw.rounded_rectangle([(W//2 + 15, C3_Y), (W - 60, C3_Y + 140)], radius=16, fill='#261208', outline='#F97316', width=2)
        draw.text((W//2 + 40, C3_Y + 25), "Yamagandam (Avoid)", fill='#FDBA74', font=f_card_title)
        draw.text((W//2 + 40, C3_Y + 75), data['yama'][2], fill='#FFFFFF', font=f_item_name)

        # Footer CTA
        draw_vector_star(draw, 120, H - 110, 8, '#FFD700')
        draw.text((W//2, H - 110), "Interactive 10-Year Clock: https://divyamangalam.com", fill='#FFD700', font=f_url, anchor='mm')
        draw_vector_star(draw, W - 120, H - 110, 8, '#FFD700')
        draw.text((W//2, H - 65), "Follow @divyamangalam.info for Daily Auspicious Alerts", fill='#CBD5E1', font=f_item_sub, anchor='mm')

        # Push frame to ffmpeg
        proc.stdin.write(frame.tobytes())

        if (frame_idx + 1) % 60 == 0:
            print(f"[REEL PROGRESS] Rendered frame {frame_idx + 1}/{TOTAL_FRAMES} ({(frame_idx + 1)/FPS:.1f}s)...")

    proc.stdin.close()
    proc.wait()
    print("[REEL] Video frames rendered successfully. Merging audio...")

    # Merge audio + video
    os.makedirs(os.path.dirname(os.path.abspath(output_mp4)), exist_ok=True)
    mux_cmd = [
        ffmpeg_exe, '-y',
        '-i', temp_video,
        '-i', temp_audio,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        output_mp4
    ]
    subprocess.run(mux_cmd, check=True)

    # Cleanup temporary files
    for tmp in [temp_video, temp_drone, temp_vocal, temp_audio]:
        if os.path.exists(tmp):
            try: os.remove(tmp)
            except Exception: pass

    print(f"[SUCCESS] 24-Hour Vedic Clock Reel successfully created at: {output_mp4}")
    return output_mp4

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generate 24-Hour Vedic Clock Instagram Reel")
    parser.add_argument('--date', type=str, default=None, help="Target date YYYY-MM-DD")
    parser.add_argument('--out', type=str, default="images/clock_reel.mp4", help="Output file path")
    args = parser.parse_args()

    target_d = None
    if args.date:
        parts = [int(p) for p in args.date.split('-')]
        target_d = datetime.date(parts[0], parts[1], parts[2])

    render_clock_reel(target_d, args.out)
