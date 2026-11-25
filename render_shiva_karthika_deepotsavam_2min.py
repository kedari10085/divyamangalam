#!/usr/bin/env python3
"""
render_shiva_karthika_deepotsavam_2min.py
=========================================
Divya Mangalam — 2-Minute Karthika Deepotsavam Lord Shiva Cinema Master
- Primary Output: 1920x1080 (16:9 Full HD Landscape Master for YouTube)
- Secondary Output: 1080x1920 (9:16 Luxury Cinema Framed Reel for Instagram)
- Audio: Authentic 320 kbps Vedic Sri Lingashtakam Chanting (Broadcast -14 LUFS)
- Built cleanly atop cinema_engine.py (works seamlessly on GTX 1650 NVENC & Google Colab T4).
"""

from __future__ import annotations

import argparse
import os
import sys

from cinema_engine import ActSpec, CinemaEngine, CinemaProjectConfig

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCENES_DIR = os.path.join(BASE_DIR, "images", "karthika_deepotsavam_scenes")
IMAGES_DIR = os.path.join(BASE_DIR, "images")


def build_karthika_deepotsavam_config(duration_s: float = 120.0) -> CinemaProjectConfig:
    """Construct the 8-Act Karthika Deepotsavam Lord Shiva cinematic project configuration."""
    acts = [
        ActSpec(
            id=1,
            image_path=os.path.join(SCENES_DIR, "act_1_karthika_deepam_awakening.jpg"),
            sanskrit_title="॥ दीपज्योतिः परब्रह्म • कार्त्तिक दीपोत्सवम् ॥",
            english_subtitle="Act I • Awakening the Sacred Karthika Ghee Flame in Twilight",
            motion_style="zoom_in",
            particle_theme="embers",
            bloom_strength=0.26,
            flicker_amp=0.10,
            warmth_boost=1.04,
        ),
        ActSpec(
            id=2,
            image_path=os.path.join(SCENES_DIR, "act_2_kedarnath_brahma_muhurta.jpg"),
            sanskrit_title="॥ ॐ नमः शिवाय • केदारनाथ ज्योतिर्लिङ्गम् ॥",
            english_subtitle="Act II • Sacred Himalayan Kedarnath Sanctum at Brahma Muhurta",
            motion_style="tilt_up",
            particle_theme="gold_motes",
            bloom_strength=0.20,
            flicker_amp=0.05,
            warmth_boost=1.0,
        ),
        ActSpec(
            id=3,
            image_path=os.path.join(SCENES_DIR, "act_3_shiva_lingam_bilva_archana.jpg"),
            sanskrit_title="॥ त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रियायुधम् ॥",
            english_subtitle="Act III • Ancient Shiva Lingam Adorned with Bilva Leaves & Rudraksha",
            motion_style="diagonal_glow",
            particle_theme="petals",
            bloom_strength=0.22,
            flicker_amp=0.07,
            warmth_boost=1.10,
        ),
        ActSpec(
            id=4,
            image_path=os.path.join(SCENES_DIR, "act_4_sahasra_deepam_ghat.jpg"),
            sanskrit_title="॥ तमसो मा ज्योतिर्गमय • सहस्र दीपालङ्कारः ॥",
            english_subtitle="Act IV • Sacred Rows of Earthen Diyas Ascending the Ancient Ghat",
            motion_style="pan_right",
            particle_theme="embers",
            bloom_strength=0.28,
            flicker_amp=0.11,
            warmth_boost=1.06,
        ),
        ActSpec(
            id=5,
            image_path=os.path.join(SCENES_DIR, "act_5_brihadisvara_maha_temple.jpg"),
            sanskrit_title="॥ हर हर महादेव • बृहदीश्वर महादेवालयः ॥",
            english_subtitle="Act V • Golden Brihadisvara Vimana & Nandi Mandapam at Dusk",
            motion_style="pan_left",
            particle_theme="gold_motes",
            bloom_strength=0.20,
            flicker_amp=0.05,
            warmth_boost=1.03,
        ),
        ActSpec(
            id=6,
            image_path=os.path.join(SCENES_DIR, "act_6_shiva_kailash_darshan.jpg"),
            sanskrit_title="॥ कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम् ॥",
            english_subtitle="Act VI • Supreme Meditative Darshan of Mahadeva on Mount Kailash",
            motion_style="darshan_focus",
            particle_theme="gold_motes",
            bloom_strength=0.20,
            flicker_amp=0.04,
            warmth_boost=1.0,
        ),
        ActSpec(
            id=7,
            image_path=os.path.join(SCENES_DIR, "act_7_cosmic_nataraja_flame.jpg"),
            sanskrit_title="॥ ब्रह्ममुरारिसुरार्चितलिङ्गं निर्मलभासितशोभितलिङ्गम् ॥",
            english_subtitle="Act VII • Cosmic Chola Nataraja — Radiance of Eternal Sacred Fire",
            motion_style="zoom_out",
            particle_theme="harathi_sparks",
            bloom_strength=0.24,
            flicker_amp=0.08,
            warmth_boost=1.08,
        ),
        ActSpec(
            id=8,
            image_path=os.path.join(SCENES_DIR, "act_8_maha_deeparadhana_finale.jpg"),
            sanskrit_title="॥ ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि ॥",
            english_subtitle="Act VIII • Maha Deeparadhana Harathi & Pushpa Vrishti Finale",
            motion_style="harathi_sway",
            particle_theme="petals",
            bloom_strength=0.26,
            flicker_amp=0.09,
            warmth_boost=1.05,
        ),
    ]

    description = (
        "🪔 Experience the Sacred Grace of Lord Shiva this Karthika Deepotsavam (2-Minute Full HD Landscape Cinema) 🔱\n\n"
        "Celebrate the auspicious lighting of sacred ghee diyas across ancient Shiva temples, Himalayan Jyotirlingas, "
        "and holy river ghats accompanied by pure 320kbps Vedic chanting of Sri Lingashtakam.\n\n"
        "📖 SACRED 8-CHAPTER JOURNEY (120 SECONDS):\n"
        "00:00 • Act I   — दीपज्योतिः परब्रह्म (Awakening the Sacred Karthika Ghee Flame)\n"
        "00:15 • Act II  — ॐ नमः शिवाय (Kedarnath Jyotirlinga at Brahma Muhurta)\n"
        "00:30 • Act III — त्रिदलं त्रिगुणाकारम् (Ancient Shiva Lingam & Bilva Archana)\n"
        "00:45 • Act IV  — तमसो मा ज्योतिर्गमय (Sahasra Deepalankara on Temple Steps)\n"
        "01:00 • Act V   — हर हर महादेव (Brihadisvara Shiva Temple Twilight Illumination)\n"
        "01:15 • Act VI  — कर्पूरगौरं करुणावतारम् (Supreme Kailash Meditative Darshan)\n"
        "01:30 • Act VII — ब्रह्ममुरारिसुरार्चितलिङ्गम् (Cosmic Nataraja Radiance)\n"
        "01:45 • Act VIII— ॐ तत्पुरुषाय विद्महे (Maha Deeparadhana Harathi Finale)\n\n"
        "Chant with Devotion:\n"
        "॥ ॐ नमः शिवाय • हर हर महादेव ॥\n\n"
        "🌐 Free Daily Vedic Panchang, Kundli & Muhurat Timings: https://divyamangalam.com\n"
        "Instagram: @divyamangalam.info\n\n"
        "#KarthikaDeepotsavam #KarthikaDeepam #LordShiva #Lingashtakam #KarthikaPournami #OmNamahShivaya "
        "#HarHarMahadev #Mahadev #ShivaTemple #Kedarnath #Brihadisvara #DevDeepawali #SanatanaDharma #DivyaMangalam"
    )

    return CinemaProjectConfig(
        project_name="DIVYA MANGALAM — KARTHIKA DEEPOTSAVAM LORD SHIVA 2-MIN LANDSCAPE CINEMA",
        top_left_badge="ॐ DIVYA MANGALAM",
        top_right_badge="✦ KARTHIKA DEEPOTSAVAM ✦",
        audio_path=os.path.join(BASE_DIR, "audio", "karthika_lingashtakam_hq.mp3"),
        output_landscape_mp4=os.path.join(IMAGES_DIR, "shiva_karthika_deepotsavam_2min_landscape.mp4"),
        output_instagram_mp4=os.path.join(IMAGES_DIR, "shiva_karthika_deepotsavam_2min_instagram.mp4"),
        metadata_json_path=os.path.join(IMAGES_DIR, "shiva_karthika_deepotsavam_2min_youtube_metadata.json"),
        youtube_title="🪔 Karthika Deepotsavam Lord Shiva Special • Sri Lingashtakam 2-Min Full HD Landscape Cinema | Divya Mangalam",
        youtube_description=description,
        youtube_tags=[
            "Karthika Deepotsavam",
            "Karthika Deepam",
            "Lord Shiva",
            "Lingashtakam",
            "Karthika Pournami",
            "Om Namah Shivaya",
            "Har Har Mahadev",
            "Shiva Temple",
            "Kedarnath",
            "Dev Deepawali",
            "Divya Mangalam",
            "Sanatana Dharma",
        ],
        instagram_header_text="ॐ कार्त्तिक दीपोत्सवम् • LORD SHIVA ॐ",
        instagram_footer_text="SRI LINGASHTAKAM • DIVYAMANGALAM.COM",
        width=1920,
        height=1080,
        fps=30,
        total_duration_s=duration_s,
        transition_s=1.0,
        audio_start_s=0.25,
        acts=acts,
    )


def main() -> int:
    parser = argparse.ArgumentParser(description="Render 2-Minute Karthika Deepotsavam Shiva Cinema")
    parser.add_argument("--duration", type=float, default=120.0, help="Total duration in seconds (default: 120.0)")
    parser.add_argument("--skip-ig", action="store_true", help="Skip generating 9:16 Instagram Cinema Reel")
    args = parser.parse_args()

    cfg = build_karthika_deepotsavam_config(duration_s=args.duration)
    engine = CinemaEngine(cfg)
    engine.render(render_instagram=not args.skip_ig)
    return 0


if __name__ == "__main__":
    sys.exit(main())
