import os, sys, math, random, argparse
import wave, struct, subprocess, asyncio

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import imageio_ffmpeg

try:
    import edge_tts
    HAS_EDGE_TTS = True
except ImportError:
    HAS_EDGE_TTS = False

def create_om_drone(wav_path, duration=10.0, sample_rate=44100):
    n_samples = int(sample_rate * duration)
    with wave.open(wav_path, 'w') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(sample_rate)
        for i in range(n_samples):
            t = i / sample_rate
            env = 1.0
            if t < 1.5: env = t / 1.5
            elif t > duration - 1.5: env = (duration - t) / 1.5
            
            val = (
                0.50 * math.sin(2 * math.pi * 432 * t) +
                0.30 * math.sin(2 * math.pi * 108 * t) +
                0.20 * math.sin(2 * math.pi * 216 * t)
            ) * env
            sample = int(val * 16000)
            wav.writeframes(struct.pack('<h', sample))

async def synthesize_vocal_chant(chant_text, output_mp3):
    if not HAS_EDGE_TTS:
        return False
    try:
        comm = edge_tts.Communicate(chant_text, 'hi-IN-MadhurNeural', rate='-12%', pitch='-4Hz')
        await comm.save(output_mp3)
        return True
    except Exception as e:
        print(f"Warning: Edge-TTS vocal chant synthesis failed ({e}), falling back to 432 Hz drone.")
        return False

def render_reel(image_path, deity_name, mantra_text, mantra_trans, subtitle_text, output_mp4, chant_text="", duration=10.0):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    WIDTH = 1080
    HEIGHT = 1920
    FPS = 30
    TOTAL_FRAMES = int(FPS * duration)
    
    temp_video = "temp_raw_reel.mp4"
    temp_drone = "temp_reel_drone.wav"
    temp_vocal = "temp_reel_vocal.mp3"
    temp_audio = "temp_reel_audio_final.wav"
    
    # 1. Synthesize 432 Hz Drone
    print(f"Synthesizing {duration}s sacred 432 Hz harmonic drone...")
    create_om_drone(temp_drone, duration=duration)
    
    # 2. Synthesize Sacred Vocal Chant (e.g. Jai Shree Ram / Om Namah Shivaya)
    has_vocal = False
    if chant_text:
        print(f"Synthesizing sacred vocal chant: \"{chant_text}\"...")
        has_vocal = asyncio.run(synthesize_vocal_chant(chant_text, temp_vocal))
        
    # 3. Mix Drone + Vocal Chant with Temple Reverb
    if has_vocal and os.path.exists(temp_vocal):
        print("Mixing 432 Hz drone + vocal chant with sacred temple reverb...")
        mix_cmd = [
            ffmpeg_exe, '-y',
            '-i', temp_drone,
            '-i', temp_vocal,
            '-filter_complex', '[0:a]volume=0.35[d];[1:a]volume=1.25,aecho=0.8:0.8:50:0.35[v];[d][v]amix=inputs=2:duration=first[aout]',
            '-map', '[aout]',
            '-c:a', 'pcm_s16le',
            temp_audio
        ]
        subprocess.run(mix_cmd, check=True)
    else:
        temp_audio = temp_drone
    
    base_img = Image.open(image_path).convert("RGBA")
    
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"
    font_indic = r"C:\Windows\Fonts\Nirmala.ttc"
    
    font_title = ImageFont.truetype(font_bold, 52)
    # Use Nirmala Bold (index=1) for pristine Devanagari / Sanskrit mantras
    try:
        font_mantra = ImageFont.truetype(font_indic, 66, index=1)
    except Exception:
        font_mantra = ImageFont.truetype(font_bold, 56)
        
    font_trans = ImageFont.truetype(font_reg, 36)
    font_sub = ImageFont.truetype(font_bold, 38)
    font_url = ImageFont.truetype(font_bold, 34)
    
    # Pre-render full-bleed atmospheric background (blurred deity artwork)
    from PIL import ImageFilter
    scale_h = HEIGHT / base_img.height
    bg_w = int(base_img.width * scale_h * 1.1)
    bg_h = int(HEIGHT * 1.1)
    bg_full = base_img.resize((bg_w, bg_h), Image.Resampling.LANCZOS)
    bg_crop = bg_full.crop(((bg_w - WIDTH) // 2, (bg_h - HEIGHT) // 2, (bg_w - WIDTH) // 2 + WIDTH, (bg_h - HEIGHT) // 2 + HEIGHT))
    bg_blurred = bg_crop.filter(ImageFilter.GaussianBlur(radius=28))
    
    # Pre-compute top and bottom dark vignettes for crisp text legibility
    vignette = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    vig_draw = ImageDraw.Draw(vignette)
    for y in range(HEIGHT):
        if y < 440:
            alpha = int(210 * (1.0 - (y / 440) ** 1.3))
            vig_draw.line([(0, y), (WIDTH, y)], fill=(10, 8, 16, alpha))
        elif y > 1460:
            alpha = int(220 * (((y - 1460) / 460) ** 1.3))
            vig_draw.line([(0, y), (WIDTH, y)], fill=(10, 8, 16, alpha))
            
    base_canvas = Image.alpha_composite(bg_blurred, vignette)
    
    # 80 ambient particles
    particles = []
    for _ in range(80):
        particles.append({
            'x': random.uniform(40, WIDTH - 40),
            'y': random.uniform(80, HEIGHT - 80),
            'speed': random.uniform(35, 95),
            'radius': random.uniform(3.0, 7.5),
            'alpha': random.uniform(0.3, 0.85),
            'phase': random.uniform(0, math.pi * 2)
        })
        
    ffmpeg_cmd = [
        ffmpeg_exe,
        '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{WIDTH}x{HEIGHT}',
        '-pix_fmt', 'rgba',
        '-r', str(FPS),
        '-i', '-',
        '-an',
        '-vcodec', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        '-crf', '19',
        temp_video
    ]
    
    process = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
    print(f"Rendering {TOTAL_FRAMES} frames ({duration}s @ {FPS}fps) in 1080x1920...")
    
    for frame_idx in range(TOTAL_FRAMES):
        t = frame_idx / FPS
        progress = frame_idx / TOTAL_FRAMES
        
        # Start from pre-computed atmospheric background
        canvas = base_canvas.copy()
        draw = ImageDraw.Draw(canvas)
            
        # Smooth gentle Ken Burns zoom on central artwork (980px to 1030px)
        # Keeps margins so Trishula, arms, and halo are NEVER cut off
        zoom = 1.0 + 0.05 * math.sin(progress * math.pi)
        deity_size = int(980 * zoom)
        scaled_img = base_img.resize((deity_size, deity_size), Image.Resampling.LANCZOS)
        
        center_y = 960
        paste_x = (WIDTH - deity_size) // 2
        paste_y = center_y - (deity_size // 2)
        
        # Draw soft golden border halo around deity card
        halo_pad = 6
        draw.rectangle(
            [paste_x - halo_pad, paste_y - halo_pad, paste_x + deity_size + halo_pad, paste_y + deity_size + halo_pad],
            outline=(212, 160, 23, 140),
            width=2
        )
        canvas.paste(scaled_img, (paste_x, paste_y))
        
        # Divine floating particles
        for p in particles:
            py = (p['y'] - p['speed'] * t) % HEIGHT
            px = p['x'] + 22 * math.sin(t * 1.5 + p['phase'])
            radius = p['radius'] * (0.8 + 0.2 * math.sin(t * 3.0 + p['phase']))
            alpha = int(255 * p['alpha'] * (0.6 + 0.4 * math.sin(t * 2.5 + p['phase'])))
            draw.ellipse(
                [px - radius, py - radius, px + radius, py + radius],
                fill=(255, 230, 140, alpha)
            )
            
        # Header Branding: DIVYA MANGALAM
        draw.text((WIDTH // 2 + 2, 112), "DIVYA MANGALAM", fill=(0, 0, 0, 220), font=font_title, anchor="mm")
        draw.text((WIDTH // 2, 110), "DIVYA MANGALAM", fill=(255, 215, 0, 255), font=font_title, anchor="mm")
        
        # Sanskrit Mantra (Devanagari rendered with Nirmala font!)
        draw.text((WIDTH // 2 + 2, 212), mantra_text, fill=(0, 0, 0, 230), font=font_mantra, anchor="mm")
        draw.text((WIDTH // 2, 210), mantra_text, fill=(255, 255, 240, 255), font=font_mantra, anchor="mm")
        
        # Transliteration
        if mantra_trans:
            draw.text((WIDTH // 2 + 1, 281), mantra_trans, fill=(0, 0, 0, 200), font=font_trans, anchor="mm")
            draw.text((WIDTH // 2, 280), mantra_trans, fill=(255, 230, 175, 240), font=font_trans, anchor="mm")
            
        # Subtitle
        draw.text((WIDTH // 2 + 2, 1712), subtitle_text, fill=(0, 0, 0, 220), font=font_sub, anchor="mm")
        draw.text((WIDTH // 2, 1710), subtitle_text, fill=(255, 235, 170, 255), font=font_sub, anchor="mm")
        
        # Website CTA: Pure ASCII text with vector-drawn golden star (Zero font dependency = 100% impossible to produce a square box)
        url_text = "divyamangalam.com"
        url_bbox = font_url.getbbox(url_text)
        url_w = url_bbox[2] - url_bbox[0]
        star_w = 16
        gap = 12
        total_w = star_w + gap + url_w
        start_x = (WIDTH - total_w) // 2
        cy = 1790
        
        # Draw 4-pointed golden star vector directly on canvas
        cx = start_x + star_w // 2
        r1, r2 = 9, 3.5
        pts = []
        for i in range(8):
            angle = i * math.pi / 4 - math.pi / 2
            r = r1 if i % 2 == 0 else r2
            pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
            
        draw.polygon([(x + 1, y + 1) for x, y in pts], fill=(0, 0, 0, 220))
        draw.polygon(pts, fill=(255, 215, 0, 255))
        
        # Clean ASCII URL
        text_x = start_x + star_w + gap
        draw.text((text_x + 1, cy + 1), url_text, fill=(0, 0, 0, 220), font=font_url, anchor="lm")
        draw.text((text_x, cy), url_text, fill=(255, 215, 0, 255), font=font_url, anchor="lm")
        
        process.stdin.write(canvas.tobytes())
        
    process.stdin.close()
    process.wait()
    print("Video encoding completed.")
    
    # Mux with AAC audio
    print("Muxing video with 432 Hz audio...")
    mux_cmd = [
        ffmpeg_exe,
        '-y',
        '-i', temp_video,
        '-i', temp_audio,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '128k',
        '-shortest',
        '-movflags', '+faststart',
        output_mp4
    ]
    subprocess.run(mux_cmd, check=True)
    
    for f in [temp_video, temp_drone, temp_vocal, temp_audio]:
        if os.path.exists(f):
            try: os.remove(f)
            except Exception: pass
    
    print(f"SUCCESS! Created Reel: {output_mp4} ({os.path.getsize(output_mp4)} bytes)")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--image", required=True)
    parser.add_argument("--deity", required=True)
    parser.add_argument("--mantra", required=True)
    parser.add_argument("--mantra_trans", default="")
    parser.add_argument("--sub", required=True)
    parser.add_argument("--chant", default="")
    parser.add_argument("--out", required=True)
    parser.add_argument("--duration", type=float, default=10.0)
    args = parser.parse_args()
    
    render_reel(
        image_path=args.image,
        deity_name=args.deity,
        mantra_text=args.mantra,
        mantra_trans=args.mantra_trans,
        subtitle_text=args.sub,
        chant_text=args.chant,
        output_mp4=args.out,
        duration=args.duration
    )
