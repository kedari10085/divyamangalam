"""
Divya Mangalam — "A Day in the Life with Vedic Clock" Vertical Reel Engine
Multi-Scene Dynamic Routine Reel (1080x1920 at 30fps)
Guides a person through their entire day: What to do & what to avoid at each hour.
Mixed with 432Hz sacred harmonic drone & Edge-TTS divine guidance.
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

def create_432hz_drone(wav_path, duration=15.0, sample_rate=44100):
    n_samples = int(sample_rate * duration)
    with wave.open(wav_path, 'w') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        for i in range(n_samples):
            t = i / sample_rate
            env = 1.0
            if t < 1.0: env = t / 1.0
            elif t > duration - 1.0: env = (duration - t) / 1.0
            
            val = (
                0.40 * math.sin(2 * math.pi * 432 * t) +
                0.35 * math.sin(2 * math.pi * 108 * t) +
                0.25 * math.sin(2 * math.pi * 216 * t)
            ) * env
            sample = int(val * 16000)
            wav.writeframes(struct.pack('<h', sample))

async def synthesize_routine_voiceover(text, output_mp3):
    if not HAS_EDGE_TTS:
        return False
    try:
        comm = edge_tts.Communicate(text, 'hi-IN-MadhurNeural', rate='-2%', pitch='-2Hz')
        await comm.save(output_mp3)
        return True
    except Exception as e:
        print(f"Warning: Edge-TTS synthesis failed ({e}), using 432Hz drone only.")
        return False

def render_routine_reel(target_date=None, output_mp4="images/routine_reel.mp4", duration=14.0):
    if target_date is None:
        target_date = datetime.date.today()

    data = calculate_clock_data(target_date)
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

    W, H = 1080, 1920
    FPS = 30
    TOTAL_FRAMES = int(FPS * duration)

    temp_drone = "temp_routine_drone.wav"
    temp_vocal = "temp_routine_vocal.mp3"
    temp_audio = "temp_routine_audio_final.wav"
    temp_video = "temp_routine_video.mp4"

    # 1. Synthesize 432 Hz Drone
    print(f"[ROUTINE REEL] Synthesizing {duration}s 432 Hz cosmic harmonic drone...")
    create_432hz_drone(temp_drone, duration=duration)

    # 2. Voiceover script
    vo_script = (
        f"Here is your ideal Vedic daily routine for today, {data['weekday']}. "
        f"Awaken during Brahma Muhurta at {data['brahma'][2]} for spiritual clarity. "
        f"Caution: Avoid initiating critical tasks during Rahu Kaal from {data['rahu'][2]}. "
        f"Seize the golden Abhijit Muhurta from {data['abhijit'][2]} for business deals and investments. "
        f"Check your complete 24-hour routine on Divya Mangalam dot com."
    )
    print(f"[ROUTINE REEL] Synthesizing voiceover: \"{vo_script[:60]}...\"")
    has_vocal = asyncio.run(synthesize_routine_voiceover(vo_script, temp_vocal))

    # 3. Mix Audio with Temple Reverb
    if has_vocal and os.path.exists(temp_vocal):
        print("[ROUTINE REEL] Mixing 432 Hz drone + vocal guidance with sacred reverb...")
        mix_cmd = [
            ffmpeg_exe, '-y',
            '-i', temp_drone,
            '-i', temp_vocal,
            '-filter_complex', '[0:a]volume=0.28[d];[1:a]volume=1.40,aecho=0.8:0.8:35:0.3[v];[d][v]amix=inputs=2:duration=first[aout]',
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
    f_card_title = get_font(font_bold, 32)
    f_item_time = get_font(font_bold, 36)
    f_item_desc = get_font(font_reg, 24)
    f_badge = get_font(font_bold, 24)
    f_url = get_font(font_bold, 30)

    # 5. Routine Schedule Stages
    stages = [
        {
            'name': 'STAGE 1: DAWN AWAKENING',
            'title': 'Brahma Muhurta (ब्रह्म मुहूर्त)',
            'time': data['brahma'][2],
            'action': 'AWAKEN, MEDITATE & YOGA',
            'detail': 'Sattva is at cosmic peak. Supreme for Gayatri Japa, prayer, pranayama, and planning your day with stillness.',
            'color': '#8B5CF6',
            'border': '#C4B5FD',
            'bg': '#190F2E',
            'icon': 'star'
        },
        {
            'name': 'STAGE 2: MORNING CAUTION',
            'title': 'Rahu Kaal Alert (राहुकाल)',
            'time': data['rahu'][2],
            'action': 'STICK TO ROUTINE WORK ONLY',
            'detail': 'Shadow planet Rahu agitates momentum. Strictly avoid signing contracts, money transfers, buying vehicles, or starting travel.',
            'color': '#EF4444',
            'border': '#FCA5A5',
            'bg': '#2B0E14',
            'icon': 'triangle'
        },
        {
            'name': 'STAGE 3: MIDDAY VICTORY',
            'title': 'Abhijit Muhurta (अभिजित् मुहूर्त)',
            'time': data['abhijit'][2],
            'action': 'THE GOLDEN WINDOW OF SUCCESS',
            'detail': 'Cosmic high-energy midday window. Best for launching ventures, key meetings, purchasing gold, real estate, and agreements.',
            'color': '#10B981',
            'border': '#6EE7B7',
            'bg': '#0B241A',
            'icon': 'star'
        },
        {
            'name': 'STAGE 4: DUSK PEACE',
            'title': 'Godhuli Sandhya (गोधूलि वेला)',
            'time': f"{data['sunset_str']} (Twilight Hour)",
            'action': 'LIGHT GHEE LAMP & EVENING PRAYER',
            'detail': 'Sunset twilight transition. Light a ghee lamp at your altar, chant Om, and invite Goddess Lakshmi into your home.',
            'color': '#F59E0B',
            'border': '#FDE68A',
            'bg': '#241708',
            'icon': 'sun'
        }
    ]

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

    print(f"[ROUTINE REEL] Rendering {TOTAL_FRAMES} frames ({duration}s at {FPS}fps)...")

    # Each of 4 stages lasts ~3.0s, with a 2.0s final summary
    stage_dur = 2.8

    for frame_idx in range(TOTAL_FRAMES):
        t_sec = frame_idx / float(FPS)
        
        # Determine active stage
        active_idx = min(int(t_sec / stage_dur), 3)
        curr_stage = stages[active_idx]

        frame = Image.new('RGBA', (W, H), (10, 6, 18, 255))
        draw = ImageDraw.Draw(frame)

        # Border
        draw.rectangle([(25, 25), (W - 25, H - 25)], outline='#D4A017', width=3)
        draw.rectangle([(32, 32), (W - 32, H - 32)], outline='#5A4210', width=1)

        for cx_s, cy_s in [(50, 50), (W - 50, 50), (50, H - 50), (W - 50, H - 50)]:
            draw_vector_star(draw, cx_s, cy_s, 14, '#D4A017')

        # Top Header
        draw_vector_star(draw, 220, 105, 12, '#FFD700')
        draw.text((250, 85), "DIVYA MANGALAM", fill='#FFD700', font=f_brand)
        draw_vector_star(draw, 860, 105, 12, '#FFD700')

        draw.text((W//2, 160), "YOUR IDEAL VEDIC DAY ROUTINE", fill='#FFFFFF', font=f_title, anchor='mm')
        draw.text((W//2, 215), f"{data['date_str']} • What to do at what hour", fill='#FFB74D', font=f_subtitle, anchor='mm')

        # 4 Timeline Progress Trackers at Top
        tracker_y = 270
        bar_w = (W - 120 - 30) // 4
        for i in range(4):
            bx = 60 + i * (bar_w + 10)
            is_active = (i == active_idx)
            is_past = (i < active_idx)
            fill_col = stages[i]['color'] if (is_active or is_past) else '#2D223E'
            border_col = stages[i]['border'] if is_active else '#4A3766'
            draw.rounded_rectangle([(bx, tracker_y), (bx + bar_w, tracker_y + 12)], radius=6, fill=fill_col, outline=border_col, width=2 if is_active else 1)

        # Hero Spotlight Card of Current Stage
        CARD_Y = 320
        CARD_H = 680
        draw.rounded_rectangle([(60, CARD_Y), (W - 60, CARD_Y + CARD_H)], radius=24, fill=curr_stage['bg'], outline=curr_stage['color'], width=4)

        # Stage Badge
        draw.rounded_rectangle([(90, CARD_Y + 35), (90 + 380, CARD_Y + 80)], radius=12, fill=curr_stage['color'])
        draw.text((105, CARD_Y + 45), curr_stage['name'], fill='#FFFFFF', font=f_badge)

        # Stage Title & Time
        draw.text((90, CARD_Y + 115), curr_stage['title'], fill='#FFFFFF', font=f_card_title)
        draw.text((90, CARD_Y + 175), curr_stage['time'], fill=curr_stage['border'], font=f_item_time)

        # Action Verdict Banner
        draw.rounded_rectangle([(90, CARD_Y + 245), (W - 90, CARD_Y + 345)], radius=14, fill='#11091E', outline='#D4A017', width=2)
        draw.text((115, CARD_Y + 265), "PRESCRIBED ACTION:", fill='#FFD700', font=f_badge)
        draw.text((115, CARD_Y + 298), curr_stage['action'], fill='#FFFFFF', font=f_badge)

        # Detailed Description
        words = curr_stage['detail'].split(' ')
        lines = []
        cur_line = []
        for w in words:
            cur_line.append(w)
            if len(' '.join(cur_line)) > 42:
                lines.append(' '.join(cur_line))
                cur_line = []
        if cur_line: lines.append(' '.join(cur_line))

        for l_idx, line in enumerate(lines[:4]):
            draw.text((90, CARD_Y + 380 + l_idx * 40), line, fill='#E2E8F0', font=f_item_desc)

        # Lower Mini Summary of All 4 Windows (Comparison Grid)
        GRID_Y = 1040
        row_h = 135
        for i, s in enumerate(stages):
            ry = GRID_Y + i * (row_h + 15)
            is_cur = (i == active_idx)
            draw.rounded_rectangle([(60, ry), (W - 60, ry + row_h)], radius=16,
                                   fill='#191128' if not is_cur else s['bg'],
                                   outline=s['color'] if is_cur else '#3A2952',
                                   width=3 if is_cur else 1)
            
            # Left Indicator Dot
            draw.ellipse([(90, ry + 45), (120, ry + 75)], fill=s['color'])
            
            # Titles
            draw.text((140, ry + 25), s['title'], fill='#FFFFFF' if is_cur else '#CBD5E1', font=f_card_title)
            draw.text((140, ry + 75), f"{s['time']} • {s['action']}", fill=s['border'] if is_cur else '#9CA3AF', font=f_item_desc)

        # Bottom Branding & CTA
        draw.vector_star = draw_vector_star
        draw_vector_star(draw, 120, H - 110, 8, '#FFD700')
        draw.text((W//2, H - 110), "Full Interactive 24-Hour Routine on DivyaMangalam.com", fill='#FFD700', font=f_url, anchor='mm')
        draw_vector_star(draw, W - 120, H - 110, 8, '#FFD700')
        draw.text((W//2, H - 65), "Follow @divyamangalam.info for Daily Auspicious Alerts", fill='#CBD5E1', font=f_subtitle, anchor='mm')

        proc.stdin.write(frame.tobytes())

        if (frame_idx + 1) % 60 == 0:
            print(f"[ROUTINE REEL] Rendered {frame_idx + 1}/{TOTAL_FRAMES} frames...")

    proc.stdin.close()
    proc.wait()
    print("[ROUTINE REEL] Video frames completed. Merging audio...")

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

    for tmp in [temp_video, temp_drone, temp_vocal, temp_audio]:
        if os.path.exists(tmp):
            try: os.remove(tmp)
            except Exception: pass

    print(f"[SUCCESS] Routine Reel created successfully at: {output_mp4}")
    return output_mp4

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generate Vedic Routine Reel")
    parser.add_argument('--date', type=str, default=None, help="Target date YYYY-MM-DD")
    parser.add_argument('--out', type=str, default="images/routine_reel.mp4", help="Output file path")
    args = parser.parse_args()

    target_d = None
    if args.date:
        parts = [int(p) for p in args.date.split('-')]
        target_d = datetime.date(parts[0], parts[1], parts[2])

    render_routine_reel(target_d, args.out)
