import os, sys, math, random, argparse
import wave, struct, subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

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

def render_reel(image_path, deity_name, mantra_text, mantra_trans, subtitle_text, output_mp4, duration=10.0):
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    WIDTH = 1080
    HEIGHT = 1920
    FPS = 30
    TOTAL_FRAMES = int(FPS * duration)
    
    temp_video = "temp_raw_reel.mp4"
    temp_audio = "temp_reel_drone.wav"
    
    print(f"Synthesizing {duration}s sacred 432 Hz drone audio...")
    create_om_drone(temp_audio, duration=duration)
    
    base_img = Image.open(image_path).convert("RGBA")
    
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"
    
    font_title = ImageFont.truetype(font_bold, 50)
    font_mantra = ImageFont.truetype(font_bold, 56)
    font_trans = ImageFont.truetype(font_reg, 36)
    font_sub = ImageFont.truetype(font_reg, 38)
    font_url = ImageFont.truetype(font_bold, 34)
    
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
        
        canvas = Image.new("RGBA", (WIDTH, HEIGHT), (16, 12, 22, 255))
        draw = ImageDraw.Draw(canvas)
        
        # Cosmic gradient background
        for y in range(0, HEIGHT, 4):
            ratio = y / HEIGHT
            if ratio < 0.22:
                r = int(50 + 60 * (ratio / 0.22))
                g = int(20 + 35 * (ratio / 0.22))
                b = int(70 + 60 * (ratio / 0.22))
            elif ratio > 0.78:
                r = int(110 - 70 * ((ratio - 0.78) / 0.22))
                g = int(55 - 40 * ((ratio - 0.78) / 0.22))
                b = int(130 - 80 * ((ratio - 0.78) / 0.22))
            else:
                r = 100
                g = 48
                b = 115
            draw.rectangle([(0, y), (WIDTH, y + 4)], fill=(r, g, b, 255))
            
        # Slow, majestic Ken Burns zoom (1.0 to 1.10 smoothly)
        zoom = 1.0 + 0.10 * math.sin(progress * math.pi)
        scaled_w = int(1080 * zoom)
        scaled_h = int(1080 * zoom)
        scaled_img = base_img.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
        
        center_y = 980
        paste_x = (WIDTH - scaled_w) // 2
        paste_y = center_y - (scaled_h // 2)
        
        canvas.paste(scaled_img, (paste_x, paste_y), scaled_img)
        
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
        draw.text((WIDTH // 2 + 2, 122), "DIVYA MANGALAM", fill=(0, 0, 0, 220), font=font_title, anchor="mm")
        draw.text((WIDTH // 2, 120), "DIVYA MANGALAM", fill=(255, 215, 0, 255), font=font_title, anchor="mm")
        
        # Sanskrit Mantra
        draw.text((WIDTH // 2 + 2, 222), mantra_text, fill=(0, 0, 0, 220), font=font_mantra, anchor="mm")
        draw.text((WIDTH // 2, 220), mantra_text, fill=(255, 255, 240, 255), font=font_mantra, anchor="mm")
        
        # Transliteration
        if mantra_trans:
            draw.text((WIDTH // 2 + 1, 291), mantra_trans, fill=(0, 0, 0, 180), font=font_trans, anchor="mm")
            draw.text((WIDTH // 2, 290), mantra_trans, fill=(255, 230, 175, 240), font=font_trans, anchor="mm")
            
        # Subtitle
        draw.text((WIDTH // 2 + 2, 1682), subtitle_text, fill=(0, 0, 0, 200), font=font_sub, anchor="mm")
        draw.text((WIDTH // 2, 1680), subtitle_text, fill=(255, 235, 170, 255), font=font_sub, anchor="mm")
        
        # Website CTA
        draw.text((WIDTH // 2 + 1, 1771), "✨ divyamangalam.com", fill=(0, 0, 0, 200), font=font_url, anchor="mm")
        draw.text((WIDTH // 2, 1770), "✨ divyamangalam.com", fill=(255, 215, 0, 255), font=font_url, anchor="mm")
        
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
    
    if os.path.exists(temp_video): os.remove(temp_video)
    if os.path.exists(temp_audio): os.remove(temp_audio)
    
    print(f"SUCCESS! Created Reel: {output_mp4} ({os.path.getsize(output_mp4)} bytes)")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--image", required=True)
    parser.add_argument("--deity", required=True)
    parser.add_argument("--mantra", required=True)
    parser.add_argument("--mantra_trans", default="")
    parser.add_argument("--sub", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--duration", type=float, default=10.0)
    args = parser.parse_args()
    
    render_reel(
        image_path=args.image,
        deity_name=args.deity,
        mantra_text=args.mantra,
        mantra_trans=args.mantra_trans,
        subtitle_text=args.sub,
        output_mp4=args.out,
        duration=args.duration
    )
