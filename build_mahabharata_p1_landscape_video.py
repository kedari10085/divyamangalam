#!/usr/bin/env python3
"""
Divya Mangalam — Srimad Mahabharata Epic Series
Part 1: Adi Parva (The Book of the Beginning)
1920x1080 Full HD Landscape Widescreen (16:9) Cinematic Video

Features:
- 6 Grand 4K Landscape Scenes from Divya Mangalam canonical database
- Dramatic Character Dialogue & Neural Narration (Bhishma, Drona, Arjuna, Vyasa)
- Sacred Sanskrit Invocations & English Explanations
- Rich Cinematic Epic Score (Tanpura, Flute & Sacred Stotrams with voice ducking)
- Generates YouTube SEO Metadata with Timestamps for Chapter Navigation
"""

import os
import sys
import asyncio
import subprocess
import json
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg
import edge_tts

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

TEMP_DIR = os.path.join(BASE_DIR, "temp_mahabharata_p1")
os.makedirs(TEMP_DIR, exist_ok=True)

# 6 Canonical Scenes Definition
SCENES = [
    {
        "id": "scene1",
        "image": os.path.join(BASE_DIR, "images", "mahabharata_p1_scene1_vyasa.jpg"),
        "title": "CHAPTER 1: THE DIVINE ORIGIN & MAHARSHI VYASA",
        "subtitle": "Maharshi Vyasa dictating to Lord Ganesha in the Himalayas",
        "script": [
            ("narrator", "Om Namo Bhagavate Vasudevaya. Welcome to Divya Mangalam's canonical chronicle of the greatest epic ever conceived by human consciousness: the Srimad Mahabharata."),
            ("narrator", "Composed in one hundred thousand verses by Maharshi Krishna-Dwaipayana Vyasa, and inscribed in golden ink by Lord Ganesha upon the sacred Himalayas, this is the story of Dharma, cosmic destiny, and the soul of Bharatavarsha."),
            ("narrator", "We begin at the origin: Parva One, The Adi Parva: The Book of the Beginning.")
        ]
    },
    {
        "id": "scene2",
        "image": os.path.join(BASE_DIR, "images", "mahabharata_p1_scene2_bhishma.jpg"),
        "title": "CHAPTER 2: BHISHMA PITAMAHA & THE TERRIBLE VOW",
        "subtitle": "Prince Devavrata's earth-shaking oath of celibacy on the River Ganga",
        "script": [
            ("narrator", "Upon the sacred, misty banks of River Ganga, Prince Devavrata, son of King Shantanu and Ganga Devi, performs an act of supreme filial sacrifice that shakes the three worlds."),
            ("bhishma", "Hear me, O celestials and kings of earth! Neither kingdom, nor heavenly sovereignty, nor the love of any maiden shall turn me from truth. For my father's joy, I take the vow of lifelong celibacy! From this moment, I am Bhishma!"),
            ("narrator", "The Devas wept in wonder, showering parijata flowers from heaven, crying: Bhishma! The Terrible, The Resolute! Thus arose the unyielding grandfather of the Kuru dynasty.")
        ]
    },
    {
        "id": "scene3",
        "image": os.path.join(BASE_DIR, "images", "mahabharata_p1_scene3_drona_arjuna.jpg"),
        "title": "CHAPTER 3: GURU DRONA & ARJUNA'S UNRIVALED FOCUS",
        "subtitle": "The Gurukula archery test: Seeing only the eye of the bird",
        "script": [
            ("narrator", "In the ancient hermitage forest of Guru Dronacharya, the young Pandavas and Kauravas were schooled in the supreme martial sciences. But one student possessed a focus as sharp as a diamond."),
            ("drona", "Arjuna! Step forward, draw your bow, and tell me: Do you see the tree? Do you see the foliage? Do you see my face?"),
            ("arjuna", "Gurudev, I see neither the tree, nor the leaves, nor your countenance. I see only the dark eye of the bird!"),
            ("narrator", "His arrow flew true, severing the target instantly. In that single moment of supreme concentration, Arjuna established himself as the foremost archer of the mortal world.")
        ]
    },
    {
        "id": "scene4",
        "image": os.path.join(BASE_DIR, "images", "mahabharata_p1_scene4_lakshagriha.jpg"),
        "title": "CHAPTER 4: THE CONSPIRACY OF LAKSHAGRIHA & THE ESCAPE",
        "subtitle": "The burning House of Lac in Varanavata and Bhima's heroic rescue",
        "script": [
            ("narrator", "Consumed by festering jealousy, the evil prince Duryodhana conspired with Shakuni to incinerate the Pandavas alive in a palace made of combustible lac and resin in Varanavata."),
            ("narrator", "Midnight came, and the treacherous palace erupted into roaring walls of crimson flame. But Dharma cannot be consumed by fire."),
            ("narrator", "Forewarned by the wise Vidura, the mighty Bhimasena gathered his mother Kunti on his broad shoulders, guided his brothers into a secret subterranean cavern, and emerged into the deep forest, leaving their foes to believe they had perished.")
        ]
    },
    {
        "id": "scene5",
        "image": os.path.join(BASE_DIR, "images", "mahabharata_p1_scene5_draupadi_swayamvara.jpg"),
        "title": "CHAPTER 5: DRAUPADI SWAYAMVARA & THE MATSYA YANTRA",
        "subtitle": "Arjuna in Brahmin disguise piercing the spinning fish eye in oil reflection",
        "script": [
            ("narrator", "In the grand palatial arena of King Drupada, kings and emperors from across Bharatavarsha failed to even string the colossal divine steel bow."),
            ("narrator", "Then stepped forward a humble young Brahmin with the poise of an ascetic and the shoulders of a lion. It was Arjuna in disguise."),
            ("narrator", "Gazing downward only into a wide vessel of reflective oil upon the marble floor, tracking the revolving golden fish spinning high in the dome above, Arjuna drew the string to his ear and unleashed five swift arrows, piercing the eye without hesitation!"),
            ("narrator", "As the royal court gasped in disbelief, Princess Draupadi, born of the sacred sacrificial fire, stepped forward and placed the fragrant wedding garland around Arjuna's neck.")
        ]
    },
    {
        "id": "scene6",
        "image": os.path.join(BASE_DIR, "images", "mahabharata_p1_scene6_indraprastha_gandiva.jpg"),
        "title": "CHAPTER 6: INDRAPRASTHA & THE DIVINE GANDIVA BOW",
        "subtitle": "Sri Krishna, Arjuna, and Agni Deva: The dawn of Pandava sovereignty",
        "script": [
            ("narrator", "With the eternal guidance and friendship of Lord Sri Krishna, the Pandavas transformed the barren desert of Khandavaprastha into Indraprastha: the most majestic, celestial city on earth, designed by Maya Danava."),
            ("narrator", "And when Agni Deva, the Lord of Fire, sought the burning of the Khandava forest, he bestowed upon Arjuna the celestial Gandiva bow, the invincible chariot bearing the fiery monkey flag of Lord Hanuman, and two inexhaustible arrow quivers."),
            ("narrator", "The foundational chapter of the epic comes to a close. The Pandavas have risen from ashes to supreme sovereignty. But the great game of destiny has only begun."),
            ("narrator", "Join us in Part Two as we enter the fateful halls of the Sabha Parva. Subscribe to Divya Mangalam for the complete canonical journey through all eighteen Parvas. Yato Dharmas Tato Jayah: Where there is Dharma, there is Victory.")
        ]
    }
]

VOICE_CONFIG = {
    "narrator": {"voice": "en-IN-PrabhatNeural", "rate": "-3%", "pitch": "-1Hz"},
    "bhishma": {"voice": "en-IN-PrabhatNeural", "rate": "-6%", "pitch": "-4Hz"},
    "drona": {"voice": "en-IN-PrabhatNeural", "rate": "-4%", "pitch": "-3Hz"},
    "arjuna": {"voice": "en-IN-PrabhatNeural", "rate": "+0%", "pitch": "-1Hz"}
}

async def generate_speech_tracks():
    """Generates audio voice tracks for each dialogue segment using Edge Neural TTS."""
    print("🎙️ STEP 1: GENERATING HIGH-DEFINITION CHARACTER VOICEOVERS...")
    audio_paths = []
    
    for s_idx, scene in enumerate(SCENES, 1):
        scene_audio = os.path.join(TEMP_DIR, f"{scene['id']}_voice.mp3")
        segment_files = []
        
        for l_idx, (speaker, text) in enumerate(scene['script']):
            cfg = VOICE_CONFIG.get(speaker, VOICE_CONFIG["narrator"])
            part_path = os.path.join(TEMP_DIR, f"{scene['id']}_line_{l_idx}.mp3")
            comm = edge_tts.Communicate(text, cfg["voice"], rate=cfg["rate"], pitch=cfg["pitch"])
            await comm.save(part_path)
            segment_files.append(part_path)
        
        # Concat lines for this scene
        concat_txt = os.path.join(TEMP_DIR, f"{scene['id']}_concat.txt")
        with open(concat_txt, "w", encoding="utf-8") as f:
            for p in segment_files:
                f.write(f"file '{os.path.abspath(p).replace(chr(92), '/')}'\n")
                
        subprocess.run([
            ffmpeg, '-y', '-f', 'concat', '-safe', '0',
            '-i', concat_txt, '-c', 'copy', scene_audio
        ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # Measure duration
        dur_cmd = [ffmpeg, '-i', scene_audio]
        p = subprocess.run(dur_cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        dur = 30.0
        for line in p.stderr.split('\n'):
            if 'Duration:' in line:
                t_str = line.split('Duration:')[1].split(',')[0].strip()
                h, m, s = t_str.split(':')
                dur = float(h)*3600 + float(m)*60 + float(s)
                break
                
        scene["duration"] = round(dur + 2.5, 2)
        scene["audio"] = scene_audio
        audio_paths.append(scene_audio)
        print(f"  ✅ Scene {s_idx} ({scene['id']}) Voice Ready: {scene['duration']}s")
        
    return audio_paths

def composite_scene_card(scene):
    """Composites 1920x1080 landscape image with cinematic lower-third banner using Pillow."""
    img_path = scene["image"]
    out_path = os.path.join(TEMP_DIR, f"{scene['id']}_card.jpg")
    
    im = Image.open(img_path).convert('RGB')
    im = im.resize((1920, 1080), Image.Resampling.LANCZOS)
    
    overlay = Image.new('RGBA', (1920, 1080), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    banner_y = 920
    draw.rectangle([(0, banner_y), (1920, 1080)], fill=(0, 0, 0, 185))
    draw.line([(0, banner_y), (1920, banner_y)], fill=(245, 158, 11, 255), width=3) # Gold accent line
    
    try:
        font_title = ImageFont.truetype('arialbd.ttf', 30)
        font_sub = ImageFont.truetype('arial.ttf', 20)
    except:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        
    title_text = scene["title"]
    sub_text = f"{scene['subtitle']} • DIVYA MANGALAM"
    
    # Draw drop shadow + text
    draw.text((961, banner_y + 36), title_text, fill=(0, 0, 0, 255), font=font_title, anchor='mm')
    draw.text((960, banner_y + 35), title_text, fill=(245, 158, 11, 255), font=font_title, anchor='mm')
    draw.text((960, banner_y + 85), sub_text, fill=(224, 231, 255, 230), font=font_sub, anchor='mm')
    
    final_img = Image.alpha_composite(im.convert('RGBA'), overlay).convert('RGB')
    final_img.save(out_path, quality=95)
    return out_path

def render_scene_video(scene, index, total):
    """Renders a single 1920x1080 landscape scene with voiceover and sacred background music."""
    card_img = composite_scene_card(scene)
    out_video = os.path.join(TEMP_DIR, f"{scene['id']}_rendered.mp4")
    dur = scene["duration"]
    voice = scene["audio"]
    bg_music = os.path.join(BASE_DIR, "audio", "ramayan_5min_musical.mp3")
    
    print(f"🎬 STEP 2 [{index}/{total}]: Rendering 1080p Landscape: {scene['title']} ({dur}s)...")
    
    cmd = [
        ffmpeg, '-y',
        '-loop', '1', '-t', str(dur), '-i', card_img,
        '-i', voice,
        '-stream_loop', '-1', '-i', bg_music,
        '-filter_complex',
        f"[0:v]scale=1920:1080,setsar=1:1[v];"
        f"[2:a]volume=0.14,afade=t=in:st=0:d=1.5,afade=t=out:st={dur-2.0}:d=2.0[bg];"
        f"[1:a]volume=1.0[vox];"
        f"[vox][bg]amix=inputs=2:duration=first:dropout_transition=2[a]",
        '-map', '[v]',
        '-map', '[a]',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-b:v', '3000k',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        out_video
    ]
    
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return out_video

def main():
    print("==================================================")
    print("🏹 DIVYA MANGALAM — MAHABHARATA PART 1 (ADI PARVA)")
    print("Format: 1920x1080 Full HD Landscape (16:9 Widescreen)")
    print("==================================================")
    
    # 1. Synthesize Audio
    asyncio.run(generate_speech_tracks())
    
    # 2. Render Each Landscape Scene
    rendered_segs = []
    for idx, sc in enumerate(SCENES, 1):
        seg_file = render_scene_video(sc, idx, len(SCENES))
        rendered_segs.append(seg_file)
        
    # 3. Concatenate all scenes into master landscape video
    print("\n🎞️ STEP 3: CONCATENATING FULL LANDSCAPE MASTERPIECE...")
    concat_list = os.path.join(TEMP_DIR, "master_concat.txt")
    with open(concat_list, "w", encoding="utf-8") as f:
        for seg in rendered_segs:
            f.write(f"file '{os.path.abspath(seg).replace(chr(92), '/')}'\n")
            
    final_output = os.path.join(BASE_DIR, "images", "mahabharata_part1_adi_parva_1080p.mp4")
    concat_cmd = [
        ffmpeg, '-y',
        '-f', 'concat', '-safe', '0',
        '-i', concat_list,
        '-c', 'copy',
        final_output
    ]
    subprocess.run(concat_cmd, check=True)
    
    file_size_mb = os.path.getsize(final_output) / (1024 * 1024)
    print(f"\n🎉 MASTER VIDEO CREATED: {final_output}")
    print(f"📊 Final File Size: {file_size_mb:.2f} MB")
    
    # 4. Generate YouTube Metadata with Timestamps
    timestamps = []
    current_time = 0.0
    for sc in SCENES:
        m = int(current_time // 60)
        s = int(current_time % 60)
        timestamps.append(f"{m:02d}:{s:02d} - {sc['title']}")
        current_time += sc["duration"]
        
    meta = {
        "title": "Srimad Mahabharata Part 1: Adi Parva (The Book of the Beginning) | Full Cinematic Movie | Divya Mangalam",
        "description": (
            "Experience the majestic story of Srimad Mahabharata as chronicled by Maharshi Veda Vyasa and Lord Ganesha.\n\n"
            "Part 1: The Adi Parva (The Book of the Beginning) captures the cosmic origins, Prince Devavrata's earth-shaking oath (Bhishma Pratigya), "
            "Guru Dronacharya's archery test and Arjuna's unrivaled focus, the treacherous burning of the House of Lac (Lakshagriha), "
            "Arjuna winning Draupadi at her Swayamvara by piercing the Matsya Yantra, and the founding of Indraprastha with the celestial Gandiva bow.\n\n"
            "⏳ CHAPTER TIMESTAMPS:\n" + "\n".join(timestamps) + "\n\n"
            "🌸 Explore Complete Canonical 18 Parvas & Vedic Tools at:\n"
            "Website: https://divyamangalam.com/mahabharata.html\n"
            "Instagram: @divyamangalam.info\n\n"
            "#Mahabharata #AdiParva #Arjuna #Bhishma #Krishna #Draupadi #SanatanaDharma #EpicMahabharata #VedicWisdom #DivyaMangalam"
        ),
        "tags": [
            "Mahabharata", "Adi Parva", "Mahabharat Full Movie", "Arjuna", "Bhishma Pratigya", 
            "Draupadi Swayamvara", "Indraprastha", "Lord Krishna", "Veda Vyasa", "Sanatana Dharma", 
            "Hinduism", "Vedic Wisdom", "Divya Mangalam"
        ],
        "category": "22",
        "privacyStatus": "public"
    }
    
    meta_path = os.path.join(BASE_DIR, "images", "mahabharata_part1_adi_parva_1080p_youtube_metadata.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta, f, indent=2, ensure_ascii=False)
        
    print(f"📝 SEO Metadata with Chapter Timestamps written to: {meta_path}")

if __name__ == '__main__':
    main()
