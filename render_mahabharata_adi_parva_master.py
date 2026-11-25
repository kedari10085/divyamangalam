#!/usr/bin/env python3
"""
Divya Mangalam — Srimad Mahabharata Part 1: Adi Parva (Full HD Cinema Master + 9:16 IG Reel)
Refactored cleanly over cinema_engine.py for broadcast-grade 16:9 widescreen & 9:16 luxury cinema.

Works identically on local Windows GPU (h264_nvenc + DirectWrite Devanagari) and Google Colab T4.
"""

import argparse
import asyncio
import os
import subprocess
import sys
import tempfile

import edge_tts
import imageio_ffmpeg

from cinema_engine import ActSpec, CinemaEngine, CinemaProjectConfig

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DEFAULT_DURATION_S = 189.0  # 6 Acts x 31.5s each so all narration segments breathe cleanly

CHAPTER_SCRIPTS = [
    (
        "Om Namo Bhagavate Vasudevaya. Welcome to Divya Mangalam's canonical chronicle of the greatest "
        "epic ever conceived: the Srimad Mahabharata. Composed in one hundred thousand verses by "
        "Maharshi Krishna-Dwaipayana Vyasa and inscribed by Lord Ganesha, we begin at the origin: "
        "Parva One, The Adi Parva: The Book of the Beginning."
    ),
    (
        "Upon the sacred banks of River Ganga, Prince Devavrata, son of King Shantanu and Ganga Devi, "
        "performs an act of supreme filial sacrifice. He raises his hand to heaven and proclaims his "
        "unbreakable vow of lifelong celibacy. The Devas shower flowers from heaven, crying: Bhishma! "
        "The Terrible, The Resolute! Thus arose the great pillar of the Kuru dynasty."
    ),
    (
        "In the ancient ashram of Guru Dronacharya, the young Pandavas and Kauravas were schooled in "
        "the supreme martial sciences. In the test of the wooden bird, while others saw the tree and "
        "the forest, Arjuna saw only the dark pupil of the bird's eye. His arrow flew true, "
        "establishing him as the foremost archer of the mortal world."
    ),
    (
        "Consumed by jealousy, prince Duryodhana conspired with Shakuni to burn the Pandavas alive in "
        "the palace of lac at Varanavata. Midnight came, and the palace erupted into roaring walls of "
        "flame. But Dharma cannot be destroyed. Guided by Vidura's warning, the mighty Bhimasena "
        "gathered his mother Kunti on his shoulders, led his brothers into a secret tunnel, and "
        "emerged safe into the forest."
    ),
    (
        "In the grand arena of King Drupada, kings from across the earth failed to string the colossal "
        "divine bow. Then stepped forward Arjuna in humble Brahmin disguise. Gazing downward into the "
        "reflective oil upon the marble floor, tracking the revolving golden fish spinning high in "
        "the dome, Arjuna unleashed five swift arrows, piercing the target! Princess Draupadi "
        "placed the wedding garland around his neck."
    ),
    (
        "With the eternal friendship of Lord Sri Krishna, the Pandavas transformed the wilderness of "
        "Khandavaprastha into Indraprastha: the most dazzling city on earth. And when Agni Deva "
        "sought the sacred fire, he bestowed upon Arjuna the celestial Gandiva bow and inexhaustible "
        "quivers. The foundational chapter closes. The wheels of Dharma have begun to turn. "
        "Yato Dharmas Tato Jayah."
    ),
]


async def ensure_english_segments(cache_dir: str) -> list[str]:
    """Reuse pre-generated en_seg_i.mp3 if cached, otherwise synthesize via edge_tts."""
    os.makedirs(cache_dir, exist_ok=True)
    paths: list[str] = []
    for idx, text in enumerate(CHAPTER_SCRIPTS):
        seg_path = os.path.join(cache_dir, f"en_seg_{idx}.mp3")
        if not os.path.exists(seg_path) or os.path.getsize(seg_path) < 10_000:
            print(f"   🎙️ Synthesizing Chapter {idx + 1} voiceover via neural TTS...")
            comm = edge_tts.Communicate(text, "en-IN-PrabhatNeural", rate="-3%", pitch="-1Hz")
            await comm.save(seg_path)
        paths.append(seg_path)
    return paths


def build_synchronized_soundtrack(total_duration_s: float, out_audio_wav: str) -> str:
    """
    Place each chapter's voiceover cleanly inside its equal-duration Act slot
    with dynamic sidechain music ducking beneath narration.
    """
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cache_dir = os.path.join(BASE_DIR, "temp_mahabharata_multilang")
    seg_paths = asyncio.run(ensure_english_segments(cache_dir))

    bg_music = os.path.join(BASE_DIR, "audio", "ramayan_5min_musical.mp3")
    if not os.path.exists(bg_music):
        bg_music = os.path.join(BASE_DIR, "audio", "krishna_divine_flute.mp3")
    if not os.path.exists(bg_music):
        raise FileNotFoundError(f"Sacred score missing: {bg_music}")

    n_acts = len(seg_paths)
    act_dur = total_duration_s / float(n_acts)

    cmd = [ffmpeg, "-y"]
    filter_parts: list[str] = []
    vox_labels: list[str] = []

    for i, sp in enumerate(seg_paths):
        cmd.extend(["-i", sp])
        delay_ms = max(0, int(round((i * act_dur + 0.55) * 1000)))
        lbl = f"v{i}"
        filter_parts.append(
            f"[{i}:a]aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,"
            f"adelay={delay_ms}|{delay_ms}[{lbl}]"
        )
        vox_labels.append(f"[{lbl}]")

    bgm_idx = n_acts
    cmd.extend(["-stream_loop", "-1", "-t", f"{total_duration_s:.2f}", "-i", bg_music])

    filter_parts.append(
        "".join(vox_labels) + f"amix=inputs={n_acts}:normalize=0:duration=longest,asplit=2[vox_sc][vox_mix]"
    )
    filter_parts.append(
        f"[{bgm_idx}:a]aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=stereo,"
        f"volume=0.42[bgm]"
    )
    filter_parts.append(
        "[bgm][vox_sc]sidechaincompress=threshold=0.025:ratio=4.5:attack=120:release=550:makeup=1.0[bgm_ducked]"
    )
    filter_parts.append(
        "[vox_mix]volume=1.35[vox_boost];"
        "[vox_boost][bgm_ducked]amix=inputs=2:normalize=0:duration=longest,"
        f"apad=whole_dur={total_duration_s:.2f},"
        f"atrim=0:{total_duration_s:.2f},asetpts=PTS-STARTPTS[master]"
    )

    cmd.extend([
        "-filter_complex", ";".join(filter_parts),
        "-map", "[master]",
        "-ar", "44100", "-ac", "2", "-c:a", "pcm_s16le",
        out_audio_wav,
    ])
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    return out_audio_wav


def build_config(total_duration_s: float, synced_wav: str) -> CinemaProjectConfig:
    img = lambda name: os.path.join(BASE_DIR, "images", name)

    acts = [
        ActSpec(
            id=1,
            image_path=img("mahabharata_p1_scene1_vyasa.jpg"),
            sanskrit_title="॥ श्रीमन्महाभारतम् • आदि पर्व आरम्भ ॥",
            english_subtitle="CHAPTER 1 • MAHARSHI VEDA VYASA & LORD GANESHA IN THE HIMALAYAS",
            motion_style="zoom_in",
            particle_theme="gold_motes",
            bloom_strength=0.22,
            flicker_amp=0.04,
            warmth_boost=1.07,
        ),
        ActSpec(
            id=2,
            image_path=img("mahabharata_p1_scene2_bhishma.jpg"),
            sanskrit_title="॥ देवव्रत की भीषण प्रतिज्ञा • गङ्गातट ॥",
            english_subtitle="CHAPTER 2 • BHISHMA PITAMAHA'S IMMORTAL VOW UPON RIVER GANGA",
            motion_style="tilt_up",
            particle_theme="petals",
            bloom_strength=0.25,
            flicker_amp=0.04,
            warmth_boost=1.06,
        ),
        ActSpec(
            id=3,
            image_path=img("mahabharata_p1_scene3_drona_arjuna.jpg"),
            sanskrit_title="॥ गुरु द्रोणाचार्य • अर्जुन लक्ष्यवेध ॥",
            english_subtitle="CHAPTER 3 • GURU DRONA'S GURUKULA TEST • ARJUNA'S UNRIVALED FOCUS",
            motion_style="darshan_focus",
            particle_theme="gold_motes",
            bloom_strength=0.20,
            flicker_amp=0.03,
            warmth_boost=1.04,
        ),
        ActSpec(
            id=4,
            image_path=img("mahabharata_p1_scene4_lakshagriha.jpg"),
            sanskrit_title="॥ वारणावत लाक्षागृह दाह • भीम पराक्रम ॥",
            english_subtitle="CHAPTER 4 • CONSPIRACY OF THE HOUSE OF LAC & BHIMA'S HEROIC ESCAPE",
            motion_style="diagonal_glow",
            particle_theme="harathi_sparks",
            bloom_strength=0.33,
            flicker_amp=0.08,
            warmth_boost=1.10,
        ),
        ActSpec(
            id=5,
            image_path=img("mahabharata_p1_scene5_draupadi_swayamvara.jpg"),
            sanskrit_title="॥ द्रौपदी स्वयंवर • मत्स्ययन्त्र वेधन ॥",
            english_subtitle="CHAPTER 5 • ARJUNA PIERCES THE REVOLVING MATSYA YANTRA",
            motion_style="pan_right",
            particle_theme="petals",
            bloom_strength=0.24,
            flicker_amp=0.05,
            warmth_boost=1.06,
        ),
        ActSpec(
            id=6,
            image_path=img("mahabharata_p1_scene6_indraprastha_gandiva.jpg"),
            sanskrit_title="॥ खाण्डव दाह • गाण्डीव एवं इन्द्रप्रस्थ ॥",
            english_subtitle="CHAPTER 6 • SRI KRISHNA, CELESTIAL GANDIVA BOW & INDRAPRASTHA GLORY",
            motion_style="zoom_out",
            particle_theme="embers",
            bloom_strength=0.28,
            flicker_amp=0.06,
            warmth_boost=1.08,
        ),
    ]

    act_dur = total_duration_s / float(len(acts))
    timestamps = []
    for idx, a in enumerate(acts):
        st = idx * act_dur
        timestamps.append(f"{int(st // 60):02d}:{int(st % 60):02d} • {a.english_subtitle}")

    return CinemaProjectConfig(
        project_name="Srimad Mahabharata Part 1: Adi Parva — Full HD Cinema Master",
        top_left_badge="ॐ DIVYA MANGALAM",
        top_right_badge="✦ ADI PARVA • EPISODE 1 ✦",
        audio_path=synced_wav,
        output_landscape_mp4=os.path.join(BASE_DIR, "images", "mahabharata_adi_parva_ep1_landscape.mp4"),
        output_instagram_mp4=os.path.join(BASE_DIR, "images", "mahabharata_adi_parva_ep1_instagram.mp4"),
        metadata_json_path=os.path.join(BASE_DIR, "images", "mahabharata_adi_parva_ep1_youtube_metadata.json"),
        acts=acts,
        instagram_header_text="श्रीमन्महाभारतम् • आदि पर्व",
        instagram_header_subtitle="EPISODE 1: ADI PARVA • VEDA VYASA'S SACRED EPIC",
        instagram_footer_title="॥ यतो धर्मस्ततो जयः ॥",
        instagram_footer_text="DIVYAMANGALAM.COM • WHERE DHARMA IS VICTORY",
        instagram_video_bitrate="2200k",
        watermark_domain="DIVYAMANGALAM.COM",
        watermark_signature="divyamangalam.info",
        width=1920,
        height=1080,
        fps=30,
        total_duration_s=total_duration_s,
        transition_s=1.0,
        audio_start_s=0.0,
        oversample_factor=1.20,
        youtube_title="Srimad Mahabharata Part 1: Adi Parva (4K Epic Cinema) | Vyasa, Bhishma, Arjuna & Draupadi | Divya Mangalam",
        youtube_description=(
            "Experience the majestic beginning of Srimad Mahabharata in broadcast-grade 16:9 widescreen cinema.\n\n"
            "नारायणं नमस्कृत्य नरं चैव नरोत्तमम् ।\n"
            "देवीं सरस्वतीं व्यासं ततो जयमुदीरयेत् ॥\n\n"
            "CHAPTERS IN EPISODE 1 (ADI PARVA):\n"
            + "\n".join(timestamps)
            + "\n\n"
            "Website: https://divyamangalam.com/mahabharata.html\n"
            "Instagram: @divyamangalam.info\n\n"
            "#Mahabharata #AdiParva #Arjuna #BhishmaPitamaha #Draupadi #LordKrishna "
            "#VedaVyasa #Indraprastha #SanatanaDharma #DivyaMangalam"
        ),
        youtube_tags=[
            "Mahabharata", "Adi Parva", "Mahabharata Episode 1", "Bhishma Pratigya",
            "Guru Dronacharya Arjuna", "Lakshagriha", "Draupadi Swayamvara", "Gandiva",
            "Indraprastha", "Lord Krishna", "Sanatana Dharma", "Divya Mangalam",
        ],
    )


def main():
    parser = argparse.ArgumentParser(description="Render Mahabharata Adi Parva Episode 1 Cinema Master & IG Reel")
    parser.add_argument("--duration", type=float, default=DEFAULT_DURATION_S, help="Total duration in seconds (default 189)")
    parser.add_argument("--skip-instagram", action="store_true", help="Skip 9:16 Instagram Reel export")
    args = parser.parse_args()

    with tempfile.TemporaryDirectory() as audio_tmp:
        synced_wav = os.path.join(audio_tmp, "adi_parva_synced_master.wav")
        print("🎵 Building chapter-synchronized voiceover + sidechain sacred soundtrack...")
        build_synchronized_soundtrack(args.duration, synced_wav)
        cfg = build_config(args.duration, synced_wav)
        CinemaEngine(cfg).render(render_instagram=not args.skip_instagram)


if __name__ == "__main__":
    main()
