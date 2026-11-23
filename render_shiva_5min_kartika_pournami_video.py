#!/usr/bin/env python3
"""
Divya Mangalam — 5-Minute Lord Shiva Kartika Pournami Epic Masterpiece
Features:
1. 100% Non-Repeating Realistic Humanoid 3D Motion Video (5:00 / 300 seconds).
   - Part 1 (0:00 - 2:00): Ultra-Smooth 60fps Humanoid Ananda Tandava (raw_shiva_cinematic_tandava.mp4)
   - Part 2 (2:00 - 5:00): Epic Mount Kailash Sacred Tandava Animation (raw_shiva_tandava_blender.mp4)
2. Sacred Kartika Pournami Soundtrack:
   - Authentic High-Vibrational Shiva Tandava Stotram & Damru Rhythm (audio/shiva_tandava.mp3)
   - Smooth 3-second audio fade-out at end.
3. Anti-Theft Watermark "DIVYAMANGALAM.COM" embedded in every frame.
4. Dynamic Devanagari Sanskrit Verses overlay.
5. Dual Output:
   - Horizontal 1920x1080 for YouTube Master Release
   - Vertical 1080x1920 for Instagram Video / Reels
"""

import os
import sys
import argparse
import subprocess
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

def render_shiva_5min(video_format="both"):
    v1 = os.path.join(BASE_DIR, "raw_shiva_cinematic_tandava.mp4")
    v2 = os.path.join(BASE_DIR, "raw_shiva_tandava_blender.mp4")
    audio = os.path.join(BASE_DIR, "audio", "shiva_tandava.mp3")

    if not os.path.exists(v1) or not os.path.exists(v2):
        print(f"❌ Error: Source raw video files not found ({v1}, {v2})")
        return False
    if not os.path.exists(audio):
        print(f"❌ Error: Audio file not found ({audio})")
        return False

    out_h = os.path.join(BASE_DIR, "images", "shiva_kartika_pournami_5min_youtube.mp4")
    out_v = os.path.join(BASE_DIR, "images", "shiva_kartika_pournami_5min_instagram.mp4")

    # Font handling
    font_path = "C\\\\:/Windows/Fonts/nirmala.ttf" if os.name == 'nt' else "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

    print("==================================================================")
    print("🔱 DIVYA MANGALAM — 5-MINUTE LORD SHIVA KARTIKA POURNAMI MASTER")
    print("==================================================================")
    print(f"Input 1: {v1} (First 120s)")
    print(f"Input 2: {v2} (Next 180s)")
    print(f"Audio:   {audio} (300s with fade-out)")
    print(f"Format:  {video_format.upper()}")
    print("==================================================================")

    # 1. HORIZONTAL 1920x1080 (YouTube Master)
    if video_format in ["both", "horizontal", "youtube"]:
        print("\n🎬 Rendering Horizontal (1920x1080 Widescreen) for YouTube...")
        # Concatenate 120s of v1 + 180s of v2 = 300s
        filter_h = (
            "[0:v]trim=start=0:end=120,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1:1[v1];"
            "[1:v]trim=start=0:end=180,setpts=PTS-STARTPTS,scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1:1[v2];"
            "[v1][v2]concat=n=2:v=1:a=0[vconcat];"
            f"[vconcat]drawtext=text='🕉️ DIVYAMANGALAM.COM':x=w-tw-40:y=40:fontsize=28:fontcolor=white@0.85:shadowcolor=black@0.8:shadowx=2:shadowy=2,"
            f"drawtext=text='🔱 KARTHIKA POURNAMI MAHA SHIVA TANDAVA 🔱':x=(w-tw)/2:y=h-th-50:fontsize=36:fontcolor=#FDE68A:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,0,15)',"
            f"drawtext=text='॥ ॐ नमः शिवाय • ॐ नमः शिवाय • हर हर महादेव ॥':x=(w-tw)/2:y=h-th-50:fontsize=34:fontcolor=#FFFFFF:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,15,60)',"
            f"drawtext=text='॥ जटाटवीगलज्जलप्रवाहपावितस्थले गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ॥':x=(w-tw)/2:y=h-th-50:fontsize=32:fontcolor=#FDE68A:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,60,150)',"
            f"drawtext=text='॥ डमड्डमड्डमड्डमन्निनादवड्डमर्वयं चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥':x=(w-tw)/2:y=h-th-50:fontsize=32:fontcolor=#FFFFFF:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,150,240)',"
            f"drawtext=text='॥ कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् ॥':x=(w-tw)/2:y=h-th-50:fontsize=32:fontcolor=#FDE68A:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,240,300)'[vout];"
            "[2:a]atrim=start=0:end=300,asetpts=PTS-STARTPTS,afade=t=out:st=297:d=3[aout]"
        )
        cmd_h = [
            ffmpeg_exe, "-y",
            "-i", v1,
            "-i", v2,
            "-i", audio,
            "-filter_complex", filter_h,
            "-map", "[vout]",
            "-map", "[aout]",
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "20",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "192k",
            out_h
        ]
        res_h = subprocess.run(cmd_h)
        if res_h.returncode == 0:
            sz_mb = os.path.getsize(out_h) / (1024 * 1024)
            print(f"✅ Horizontal YouTube Master rendered: {out_h} ({sz_mb:.2f} MB)")
        else:
            print(f"⚠️ Error rendering horizontal video: exit code {res_h.returncode}")

    # 2. VERTICAL 1080x1920 (Instagram / Mobile Master)
    if video_format in ["both", "vertical", "instagram"]:
        print("\n🎬 Rendering Vertical (1080x1920 9:16) for Instagram / Shorts...")
        filter_v = (
            "[0:v]trim=start=0:end=120,setpts=PTS-STARTPTS,crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=1080:1920,setsar=1:1[v1];"
            "[1:v]trim=start=0:end=180,setpts=PTS-STARTPTS,crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=1080:1920,setsar=1:1[v2];"
            "[v1][v2]concat=n=2:v=1:a=0[vconcat];"
            f"[vconcat]drawtext=text='🕉️ DIVYAMANGALAM.COM':x=(w-tw)/2:y=120:fontsize=36:fontcolor=white@0.85:shadowcolor=black@0.8:shadowx=2:shadowy=2,"
            f"drawtext=text='🔱 KARTHIKA POURNAMI 🔱':x=(w-tw)/2:y=180:fontsize=38:fontcolor=#FDE68A:shadowcolor=black@0.9:shadowx=2:shadowy=2,"
            f"drawtext=text='॥ श्री शिव ताण्डव स्तोत्रम् ॥':x=(w-tw)/2:y=h-350:fontsize=40:fontcolor=#FDE68A:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,0,30)',"
            f"drawtext=text='॥ जटाटवीगलज्जलप्रवाहपावितस्थले ॥':x=(w-tw)/2:y=h-350:fontsize=36:fontcolor=#FFFFFF:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,30,90)',"
            f"drawtext=text='॥ गलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ॥':x=(w-tw)/2:y=h-300:fontsize=34:fontcolor=#FDE68A:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,30,90)',"
            f"drawtext=text='॥ डमड्डमड्डमड्डमन्निनादवड्डमर्वयं ॥':x=(w-tw)/2:y=h-350:fontsize=36:fontcolor=#FFFFFF:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,90,180)',"
            f"drawtext=text='॥ चकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥':x=(w-tw)/2:y=h-300:fontsize=34:fontcolor=#FDE68A:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,90,180)',"
            f"drawtext=text='॥ कर्पूरगौरं करुणावतारं संसारसारम् ॥':x=(w-tw)/2:y=h-350:fontsize=36:fontcolor=#FFFFFF:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,180,270)',"
            f"drawtext=text='॥ ॐ नमः शिवाय • हर हर महादेव ॥':x=(w-tw)/2:y=h-350:fontsize=42:fontcolor=#FDE68A:shadowcolor=black@0.9:shadowx=2:shadowy=2:enable='between(t,270,300)'[vout];"
            "[2:a]atrim=start=0:end=300,asetpts=PTS-STARTPTS,afade=t=out:st=297:d=3[aout]"
        )
        cmd_v = [
            ffmpeg_exe, "-y",
            "-i", v1,
            "-i", v2,
            "-i", audio,
            "-filter_complex", filter_v,
            "-map", "[vout]",
            "-map", "[aout]",
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "20",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "192k",
            out_v
        ]
        res_v = subprocess.run(cmd_v)
        if res_v.returncode == 0:
            sz_mb = os.path.getsize(out_v) / (1024 * 1024)
            print(f"✅ Vertical Instagram Master rendered: {out_v} ({sz_mb:.2f} MB)")
        else:
            print(f"⚠️ Error rendering vertical video: exit code {res_v.returncode}")

    print("\n🎉 [COMPLETE] 5-Minute Lord Shiva Kartika Pournami Video Production Finished!")
    return True

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Render 5-Minute Lord Shiva Kartika Pournami Epic Masterpiece")
    parser.add_argument("--format", type=str, default="both", choices=["both", "horizontal", "vertical", "youtube", "instagram"])
    args = parser.parse_args()
    render_shiva_5min(args.format)
