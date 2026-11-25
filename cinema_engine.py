#!/usr/bin/env python3
"""
cinema_engine.py — Reusable Broadcast-Grade Devotional Cinema Rendering Engine
===============================================================================
Clean, configuration-driven video synthesis engine designed for both local GPU
workstations (NVIDIA NVENC) and cloud notebooks (Google Colab T4 / GitHub Actions).

Core Capabilities:
  - Cubic-eased non-linear camera choreography (zoom, pan, tilt, Harathi sway, breathing).
  - Living optical bloom & dual-frequency diya/oil-lamp flicker simulation.
  - Multi-layer soft bokeh particle system (golden embers, camphor sparks, lotus petals).
  - Flawless Devanagari OpenType shaping (Windows DirectWrite/WPF or Linux Libraqm).
  - Broadcast -14 LUFS audio normalization with smooth fade-in / fade-out.
  - Dual output: 1920x1080 (16:9 Landscape Master) + 1080x1920 (9:16 Luxury Cinema Instagram Reel).
"""

from __future__ import annotations

import json
import math
import os
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass, field

import cv2
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw, ImageFont, features

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


# ---------------------------------------------------------------------------
# Configuration Data Models
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class ActSpec:
    """Visual, motion, and typographic specification for a single cinema act."""
    id: int
    image_path: str
    sanskrit_title: str
    english_subtitle: str
    motion_style: str = "zoom_in"
    particle_theme: str = "embers"     # embers | harathi_sparks | petals | gold_motes
    bloom_strength: float = 0.22       # 0.0 - 0.45 additive warm optical glow
    flicker_amp: float = 0.06          # subtle diya light breathing amplitude
    warmth_boost: float = 1.0          # >1.0 warms shadows/highlights subtly


@dataclass
class CinemaProjectConfig:
    """Top-level configuration describing an entire multi-act devotional film."""
    project_name: str
    top_left_badge: str
    top_right_badge: str
    audio_path: str
    output_landscape_mp4: str
    acts: list[ActSpec]
    output_instagram_mp4: str | None = None
    metadata_json_path: str | None = None
    youtube_title: str = ""
    youtube_description: str = ""
    youtube_tags: list[str] = field(default_factory=list)
    instagram_header_text: str = "ॐ नमः शिवाय • KARTHIKA DEEPOTSAVAM"
    instagram_footer_text: str = "DIVYAMANGALAM.COM • FULL HD CINEMA"
    watermark_domain: str = "DIVYAMANGALAM.COM"
    watermark_signature: str = "divyamangalam.info"
    width: int = 1920
    height: int = 1080
    fps: int = 30
    total_duration_s: float = 120.0
    transition_s: float = 1.0
    audio_start_s: float = 0.25
    oversample_factor: float = 1.2


# ---------------------------------------------------------------------------
# Font & Hardware Utilities
# ---------------------------------------------------------------------------

def resolve_fonts(size_title: int, size_sub: int, size_badge: int, size_wm: int) -> dict:
    """Resolve cross-platform Devanagari + English TrueType fonts cleanly."""
    candidates = [
        r"C:\Windows\Fonts\NirmalaB.ttf",
        r"C:\Windows\Fonts\Nirmala.ttc",
        r"C:\Windows\Fonts\mangal.ttf",
        "/usr/share/fonts/truetype/noto/NotoSansDevanagari-Bold.ttf",
        "/usr/share/fonts/truetype/noto/NotoSansDevanagari-Regular.ttf",
        "/usr/share/fonts/truetype/lohit-devanagari/Lohit-Devanagari.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    latin_candidates = [
        r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\arialbd.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]

    def _pick(paths: list[str], sz: int):
        for p in paths:
            if os.path.exists(p):
                try:
                    return ImageFont.truetype(p, sz)
                except OSError:
                    continue
        return ImageFont.load_default()

    return {
        "title": _pick(candidates, size_title),
        "sub": _pick(candidates, size_sub),
        "badge": _pick(candidates, size_badge),
        "wm": _pick(latin_candidates + candidates, size_wm),
    }


def detect_best_video_encoder(ffmpeg_exe: str) -> list[str]:
    """Probe whether NVIDIA NVENC hardware encoding works on the current machine."""
    probe = [
        ffmpeg_exe, "-y", "-f", "lavfi", "-i", "color=c=black:s=64x64:d=0.1",
        "-c:v", "h264_nvenc", "-preset", "p4", "-f", "null", "-"
    ]
    try:
        res = subprocess.run(probe, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=8)
        if res.returncode == 0:
            return ["-c:v", "h264_nvenc", "-preset", "p4", "-cq", "19"]
    except Exception:
        pass
    return ["-c:v", "libx264", "-preset", "medium", "-crf", "18"]


def ease_in_out_cubic(t: float) -> float:
    """Smooth S-curve easing in [0, 1] for natural non-robotic camera motion."""
    t = max(0.0, min(1.0, t))
    if t < 0.5:
        return 4.0 * t * t * t
    return 1.0 - ((-2.0 * t + 2.0) ** 3) / 2.0


# ---------------------------------------------------------------------------
# Native Complex-Script Overlay Builder (WPF on Windows / Libraqm on Linux)
# ---------------------------------------------------------------------------

_WPF_RENDER_PS1 = r'''
param([string]$ManifestJson)
Add-Type -AssemblyName PresentationCore, PresentationFramework, WindowsBase

$spec = Get-Content -Path $ManifestJson -Raw -Encoding UTF8 | ConvertFrom-Json
$ffDev = New-Object System.Windows.Media.FontFamily("Nirmala UI")
$ffLat = New-Object System.Windows.Media.FontFamily("Segoe UI")
$tfDevBold = New-Object System.Windows.Media.Typeface($ffDev, [System.Windows.FontStyles]::Normal, [System.Windows.FontWeights]::Bold, [System.Windows.FontStretches]::Normal)
$tfLatSemi = New-Object System.Windows.Media.Typeface($ffLat, [System.Windows.FontStyles]::Normal, [System.Windows.FontWeights]::SemiBold, [System.Windows.FontStretches]::Normal)

$goldBright = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(255, 255, 236, 155))
$goldBadge  = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(255, 255, 224, 128))
$whiteText  = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(245, 236, 238, 248))
$wmText     = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(205, 255, 228, 130))
$sigText    = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(125, 255, 255, 255))

$darkFill   = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(205, 10, 8, 18))
$badgeFill  = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(185, 10, 8, 16))
$wmFill     = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(135, 12, 10, 18))
$innerGold  = New-Object System.Windows.Media.Pen ((New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(85, 255, 230, 140))), 1.0)
$goldPen2   = New-Object System.Windows.Media.Pen ((New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(230, 240, 188, 60))), 2.2)
$wmPen      = New-Object System.Windows.Media.Pen ((New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(155, 245, 195, 65))), 1.2)
$dotActive  = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(255, 255, 215, 70))
$dotIdle    = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(145, 145, 135, 120))
$goldBar    = New-Object System.Windows.Media.SolidColorBrush ([System.Windows.Media.Color]::FromArgb(235, 245, 195, 65))

function New-Text($txt, $tf, $sz, $brush) {
    return New-Object System.Windows.Media.FormattedText(
        [string]$txt,
        [System.Globalization.CultureInfo]::InvariantCulture,
        [System.Windows.FlowDirection]::LeftToRight,
        $tf, [double]$sz, $brush, 1.0
    )
}

function Save-Visual($dv, $w, $h, $outPath) {
    $rtb = New-Object System.Windows.Media.Imaging.RenderTargetBitmap([int]$w, [int]$h, 96, 96, [System.Windows.Media.PixelFormats]::Pbgra32)
    $rtb.Render($dv)
    $enc = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
    $enc.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($rtb))
    $fs = [System.IO.File]::Open($outPath, [System.IO.FileMode]::Create)
    $enc.Save($fs)
    $fs.Close()
}

$W = [double]$spec.width
$H = [double]$spec.height
$nActs = [int]$spec.acts.Count

# 1. Render per-act overlays
foreach ($act in $spec.acts) {
    $dv = New-Object System.Windows.Media.DrawingVisual
    $dc = $dv.RenderOpen()

    # Top badges
    $dc.DrawRoundedRectangle($badgeFill, $goldPen2, (New-Object System.Windows.Rect(36, 28, 384, 50)), 10, 10)
    $tL = New-Text $spec.top_left_badge $tfDevBold 21 $goldBadge
    $dc.DrawText($tL, (New-Object System.Windows.Point((36 + (384 - $tL.Width) / 2.0), (28 + (50 - $tL.Height) / 2.0))))

    $bxR = $W - 450
    $dc.DrawRoundedRectangle($badgeFill, $goldPen2, (New-Object System.Windows.Rect($bxR, 28, 414, 50)), 10, 10)
    $tR = New-Text $spec.top_right_badge $tfDevBold 21 $goldBadge
    $dc.DrawText($tR, (New-Object System.Windows.Point(($bxR + (414 - $tR.Width) / 2.0), (28 + (50 - $tR.Height) / 2.0))))

    # Lower-third glassmorphic card
    $cw = 1480.0; $ch = 138.0
    $cx0 = ($W - $cw) / 2.0
    $cy0 = $H - 172.0
    $dc.DrawRoundedRectangle($darkFill, $goldPen2, (New-Object System.Windows.Rect($cx0, $cy0, $cw, $ch)), 18, 18)
    $dc.DrawRoundedRectangle($null, $innerGold, (New-Object System.Windows.Rect(($cx0 + 6), ($cy0 + 6), ($cw - 12), ($ch - 12))), 13, 13)

    # Progress dots
    $dotsW = ($nActs - 1) * 26.0
    $dotX0 = ($W - $dotsW) / 2.0
    for ($i = 0; $i -lt $nActs; $i++) {
        $dx = $dotX0 + $i * 26.0
        $dy = $cy0 + 21.0
        $r = if (($i + 1) -eq [int]$act.id) { 5.5 } else { 3.5 }
        $col = if (($i + 1) -eq [int]$act.id) { $dotActive } else { $dotIdle }
        $dc.DrawEllipse($col, $null, (New-Object System.Windows.Point($dx, $dy)), $r, $r)
    }

    $tTitle = New-Text $act.sanskrit_title $tfDevBold 36 $goldBright
    $tSub   = New-Text $act.english_subtitle $tfLatSemi 21 $whiteText
    $dc.DrawText($tTitle, (New-Object System.Windows.Point((($W - $tTitle.Width) / 2.0), ($cy0 + 34))))
    $dc.DrawText($tSub,   (New-Object System.Windows.Point((($W - $tSub.Width) / 2.0),   ($cy0 + 90))))

    $dc.Close()
    Save-Visual $dv $W $H $act.out_png
}

# 2. Persistent protective watermark layer
$dvW = New-Object System.Windows.Media.DrawingVisual
$dcW = $dvW.RenderOpen()
$wx = $W - 285
$dcW.DrawRoundedRectangle($wmFill, $wmPen, (New-Object System.Windows.Rect($wx, 90, 249, 34)), 6, 6)
$tWm = New-Text $spec.watermark_domain $tfLatSemi 17 $wmText
$dcW.DrawText($tWm, (New-Object System.Windows.Point(($wx + (249 - $tWm.Width) / 2.0), (90 + (34 - $tWm.Height) / 2.0))))
$tSig = New-Text $spec.watermark_signature $tfLatSemi 17 $sigText
$dcW.DrawText($tSig, (New-Object System.Windows.Point(($W - $tSig.Width - 34), ($H - $tSig.Height - 10))))
$dcW.Close()
Save-Visual $dvW $W $H $spec.watermark_png

# 3. Instagram 9:16 Luxury Frame Overlay
if ($spec.ig_frame_png) {
    $dvI = New-Object System.Windows.Media.DrawingVisual
    $dcI = $dvI.RenderOpen()
    $dcI.DrawRoundedRectangle($darkFill, $goldPen2, (New-Object System.Windows.Rect(60, 410, 960, 150)), 18, 18)
    $tH1 = New-Text $spec.instagram_header_text $tfDevBold 40 $goldBright
    $tH2 = New-Text "DIVYA MANGALAM • FULL MOTION SACRED CINEMA" $tfLatSemi 24 $whiteText
    $dcI.DrawText($tH1, (New-Object System.Windows.Point(((1080 - $tH1.Width) / 2.0), 432)))
    $dcI.DrawText($tH2, (New-Object System.Windows.Point(((1080 - $tH2.Width) / 2.0), 498)))

    $dcI.DrawRectangle($goldBar, $null, (New-Object System.Windows.Rect(0, 652, 1080, 4)))
    $dcI.DrawRectangle($goldBar, $null, (New-Object System.Windows.Rect(0, 1264, 1080, 4)))

    $dcI.DrawRoundedRectangle($darkFill, $goldPen2, (New-Object System.Windows.Rect(60, 1345, 960, 170)), 18, 18)
    $tF1 = New-Text "॥ हर हर महादेव • ॐ नमः शिवाय ॥" $tfDevBold 40 $goldBright
    $tF2 = New-Text $spec.instagram_footer_text $tfLatSemi 24 $whiteText
    $dcI.DrawText($tF1, (New-Object System.Windows.Point(((1080 - $tF1.Width) / 2.0), 1372)))
    $dcI.DrawText($tF2, (New-Object System.Windows.Point(((1080 - $tF2.Width) / 2.0), 1445)))
    $dcI.Close()
    Save-Visual $dvI 1080 1920 $spec.ig_frame_png
}
'''


def _load_png_bgr_alpha(png_path: str) -> tuple[np.ndarray, np.ndarray]:
    """Read a 32-bit BGRA PNG cleanly with un-premultiplied RGB + normalized float alpha."""
    pil_img = Image.open(png_path).convert("RGBA")
    arr = np.array(pil_img)
    bgr = cv2.cvtColor(arr[:, :, :3], cv2.COLOR_RGB2BGR)
    alpha = arr[:, :, 3].astype(np.float32) / 255.0
    return bgr, alpha


def render_overlays_wpf(cfg: CinemaProjectConfig, tmp_dir: str) -> tuple[list[tuple[np.ndarray, np.ndarray]], tuple[np.ndarray, np.ndarray], str | None]:
    """Use Windows DirectWrite (WPF) for crystal-clear complex Devanagari shaping."""
    manifest_path = os.path.join(tmp_dir, "overlay_manifest.json")
    ps1_path = os.path.join(tmp_dir, "render_overlays.ps1")
    wm_png = os.path.join(tmp_dir, "watermark.png")
    ig_png = os.path.join(tmp_dir, "ig_frame.png") if cfg.output_instagram_mp4 else ""

    manifest = {
        "width": cfg.width,
        "height": cfg.height,
        "top_left_badge": cfg.top_left_badge,
        "top_right_badge": cfg.top_right_badge,
        "watermark_domain": cfg.watermark_domain,
        "watermark_signature": cfg.watermark_signature,
        "instagram_header_text": cfg.instagram_header_text,
        "instagram_footer_text": cfg.instagram_footer_text,
        "watermark_png": wm_png,
        "ig_frame_png": ig_png,
        "acts": [
            {
                "id": act.id,
                "sanskrit_title": act.sanskrit_title,
                "english_subtitle": act.english_subtitle,
                "out_png": os.path.join(tmp_dir, f"act_{act.id}.png"),
            }
            for act in cfg.acts
        ],
    }
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    with open(ps1_path, "w", encoding="utf-8-sig") as f:
        f.write(_WPF_RENDER_PS1)

    subprocess.run(
        ["powershell", "-ExecutionPolicy", "Bypass", "-File", ps1_path, "-ManifestJson", manifest_path],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE
    )

    act_overlays = [_load_png_bgr_alpha(a["out_png"]) for a in manifest["acts"]]
    wm_bgr, wm_a = _load_png_bgr_alpha(wm_png)
    return act_overlays, (wm_bgr, wm_a[:, :, np.newaxis]), (ig_png if ig_png else None)


# ---------------------------------------------------------------------------
# Visual Preparation & Optical Processing
# ---------------------------------------------------------------------------

def prepare_oversampled_canvas(
    img_path: str,
    canvas_w: int,
    canvas_h: int,
    warmth_boost: float = 1.0,
) -> np.ndarray:
    """
    Load and fit an image cleanly onto an oversampled 16:9 canvas (e.g., 2304x1296).
    Preserves aspect ratio cleanly without stretching; applies warm temple color grading if requested.
    """
    if not os.path.exists(img_path):
        raise FileNotFoundError(f"Scene image missing: {img_path}")
    img = cv2.imread(img_path, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError(f"Could not decode image: {img_path}")

    ih, iw = img.shape[:2]
    scale = max(canvas_w / float(iw), canvas_h / float(ih))
    new_w = int(math.ceil(iw * scale))
    new_h = int(math.ceil(ih * scale))
    interp = cv2.INTER_LANCZOS4 if scale > 1.0 else cv2.INTER_AREA
    resized = cv2.resize(img, (new_w, new_h), interpolation=interp)

    x0 = max(0, (new_w - canvas_w) // 2)
    y0 = max(0, (new_h - canvas_h) // 2)
    canvas = resized[y0:y0 + canvas_h, x0:x0 + canvas_w].copy()

    if abs(warmth_boost - 1.0) > 0.01:
        f = canvas.astype(np.float32)
        f[:, :, 2] = np.clip(f[:, :, 2] * warmth_boost, 0, 255)
        f[:, :, 1] = np.clip(f[:, :, 1] * (1.0 + (warmth_boost - 1.0) * 0.65), 0, 255)
        f[:, :, 0] = np.clip(f[:, :, 0] * (1.0 - (warmth_boost - 1.0) * 0.25), 0, 255)
        canvas = f.astype(np.uint8)

    return canvas


def build_vignette_u16(width: int, height: int, strength: float = 0.28) -> np.ndarray:
    """Create fixed-point uint16 vignette multiplier (scaled by 256) for fast per-frame multiply."""
    y, x = np.ogrid[:height, :width]
    cx, cy = width / 2.0, height / 2.0
    rx, ry = width * 0.62, height * 0.62
    dist_sq = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2
    mask = 1.0 - strength * np.clip(dist_sq - 0.35, 0.0, 1.0)
    return (mask * 256.0).astype(np.uint16)[:, :, np.newaxis]


def compute_camera_transform(
    style: str,
    progress: float,
    sec: float,
    canvas_w: int,
    canvas_h: int,
    out_w: int,
    out_h: int,
) -> np.ndarray:
    """Compute smooth non-linear 2D affine matrix for expressive camera choreography."""
    e = ease_in_out_cubic(progress)
    breath = 0.004 * math.sin(2.0 * math.pi * 0.16 * sec)
    cx_base = canvas_w / 2.0
    cy_base = canvas_h / 2.0

    choreography: dict[str, tuple[float, float, float, float]] = {
        "zoom_in":       (1.01 + 0.13 * e + breath, cx_base, cy_base, 0.0),
        "zoom_out":      (1.15 - 0.12 * e + breath, cx_base, cy_base, 0.0),
        "pan_right":     (1.06 + 0.04 * e + breath, cx_base - 95 + 190 * e, cy_base, 0.0),
        "pan_left":      (1.06 + 0.04 * e + breath, cx_base + 95 - 190 * e, cy_base, 0.0),
        "tilt_up":       (1.05 + 0.08 * e + breath, cx_base, cy_base + 65 - 130 * e, 0.0),
        "diagonal_glow": (1.03 + 0.11 * e + breath, cx_base - 70 + 140 * e, cy_base + 45 - 90 * e, 0.0),
        "darshan_focus": (1.03 + 0.11 * e + breath, cx_base, cy_base + 20 - 55 * e, 0.20 * math.sin(math.pi * progress)),
        "harathi_sway":  (
            1.05 + 0.07 * math.sin(math.pi * progress) + breath,
            cx_base + 22.0 * math.sin(2.0 * math.pi * 0.38 * sec),
            cy_base + 11.0 * math.cos(4.0 * math.pi * 0.38 * sec),
            0.65 * math.sin(2.0 * math.pi * 0.38 * sec),
        ),
    }
    zoom, cx, cy, rot = choreography.get(style, choreography["zoom_in"])
    M = cv2.getRotationMatrix2D((cx, cy), rot, zoom)
    M[0, 2] += (out_w / 2.0 - cx)
    M[1, 2] += (out_h / 2.0 - cy)
    return M


# ---------------------------------------------------------------------------
# PIL Fallback Overlays (Linux / Libraqm) & Bokeh Particles
# ---------------------------------------------------------------------------

def prebake_act_banner_pil(act: ActSpec, cfg: CinemaProjectConfig, fonts: dict) -> tuple[np.ndarray, np.ndarray]:
    """Linux/Libraqm fallback renderer for lower-third card and top badges."""
    img = Image.new("RGBA", (cfg.width, cfg.height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, "RGBA")

    draw.rounded_rectangle([(36, 28), (420, 78)], radius=10, fill=(10, 8, 16, 185), outline=(245, 195, 65, 220), width=2)
    draw.text((228, 53), cfg.top_left_badge, font=fonts["badge"], fill=(255, 225, 130, 255), anchor="mm")

    draw.rounded_rectangle([(cfg.width - 450, 28), (cfg.width - 36, 78)], radius=10, fill=(10, 8, 16, 185), outline=(245, 195, 65, 220), width=2)
    draw.text((cfg.width - 243, 53), cfg.top_right_badge, font=fonts["badge"], fill=(255, 225, 130, 255), anchor="mm")

    card_w = 1480
    card_x0 = (cfg.width - card_w) // 2
    card_y0 = cfg.height - 172
    card_y1 = cfg.height - 34
    draw.rounded_rectangle([(card_x0, card_y0), (card_x0 + card_w, card_y1)], radius=18, fill=(10, 8, 18, 200), outline=(240, 188, 60, 230), width=2)
    draw.rounded_rectangle([(card_x0 + 6, card_y0 + 6), (card_x0 + card_w - 6, card_y1 - 6)], radius=13, outline=(255, 230, 140, 85), width=1)

    num_acts = len(cfg.acts)
    dots_w = (num_acts - 1) * 26
    dot_start_x = (cfg.width - dots_w) // 2
    for idx in range(num_acts):
        dx = dot_start_x + idx * 26
        dy = card_y0 + 19
        r = 6 if (idx + 1) == act.id else 4
        col = (255, 215, 70, 255) if (idx + 1) == act.id else (140, 130, 115, 145)
        draw.ellipse([(dx - r, dy - r), (dx + r, dy + r)], fill=col)

    draw.text((cfg.width // 2, card_y0 + 58), act.sanskrit_title, font=fonts["title"], fill=(255, 240, 175, 255), anchor="mm")
    draw.text((cfg.width // 2, card_y0 + 106), act.english_subtitle, font=fonts["sub"], fill=(235, 235, 245, 240), anchor="mm")

    rgba = np.array(img)
    return cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2BGR), rgba[:, :, 3].astype(np.float32) / 255.0


def prebake_watermark_pil(cfg: CinemaProjectConfig, fonts: dict) -> tuple[np.ndarray, np.ndarray]:
    img = Image.new("RGBA", (cfg.width, cfg.height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, "RGBA")
    draw.rounded_rectangle([(cfg.width - 285, 90), (cfg.width - 36, 124)], radius=6, fill=(12, 10, 18, 135), outline=(245, 195, 65, 155), width=1)
    draw.text((cfg.width - 160, 107), cfg.watermark_domain, font=fonts["wm"], fill=(255, 228, 130, 200), anchor="mm")
    draw.text((cfg.width - 36, cfg.height - 16), cfg.watermark_signature, font=fonts["wm"], fill=(255, 255, 255, 115), anchor="rb")
    rgba = np.array(img)
    return cv2.cvtColor(rgba[:, :, :3], cv2.COLOR_RGB2BGR), (rgba[:, :, 3].astype(np.float32) / 255.0)[:, :, np.newaxis]


def blend_bands(
    frame: np.ndarray,
    ov_bgr: np.ndarray,
    ov_alpha: np.ndarray,
    mult: float,
    y_top: int = 140,
    y_bot: int = 885,
) -> None:
    """In-place regional alpha blend restricted to top & bottom banner bands for high throughput."""
    if mult <= 0.004:
        return
    a_top = (ov_alpha[:y_top, :] * mult)[:, :, np.newaxis]
    frame[:y_top, :] = (frame[:y_top, :].astype(np.float32) * (1.0 - a_top) + ov_bgr[:y_top, :].astype(np.float32) * a_top).astype(np.uint8)
    a_bot = (ov_alpha[y_bot:, :] * mult)[:, :, np.newaxis]
    frame[y_bot:, :] = (frame[y_bot:, :].astype(np.float32) * (1.0 - a_bot) + ov_bgr[y_bot:, :].astype(np.float32) * a_bot).astype(np.uint8)


class BokehParticleSystem:
    """Fast half-resolution glowing bokeh embers, camphor sparks, and petal particle overlay."""

    def __init__(self, width: int, height: int, count: int = 72, seed: int = 108):
        self.w = width
        self.h = height
        self.hw = width // 2
        self.hh = height // 2
        rng = np.random.default_rng(seed)
        self.count = count
        self.x = rng.uniform(0, width, count).astype(np.float32)
        self.y = rng.uniform(0, height, count).astype(np.float32)
        self.vy = rng.uniform(0.65, 2.1, count).astype(np.float32)
        self.vx = rng.uniform(-0.45, 0.45, count).astype(np.float32)
        self.radius = rng.uniform(2.0, 4.0, count).astype(np.float32)
        self.phase = rng.uniform(0, 2 * math.pi, count).astype(np.float32)
        self._buf = np.zeros((self.hh, self.hw, 3), dtype=np.uint8)

    def step_and_draw(self, frame: np.ndarray, theme: str, frame_idx: int) -> np.ndarray:
        t = frame_idx * 0.04
        if theme == "petals":
            self.y = (self.y + self.vy * 1.45) % self.h
            self.x = (self.x + np.sin(t + self.phase) * 1.35 + self.vx) % self.w
        elif theme == "harathi_sparks":
            self.y = (self.y - self.vy * 2.2) % self.h
            self.x = (self.x + np.cos(t * 1.3 + self.phase) * 1.2) % self.w
        else:
            self.y = (self.y - self.vy * 1.2) % self.h
            self.x = (self.x + np.sin(t + self.phase) * 0.85) % self.w

        self._buf.fill(0)
        for i in range(self.count):
            px, py = int(self.x[i] * 0.5), int(self.y[i] * 0.5)
            r = max(1, int(self.radius[i]))
            if theme == "petals" and i % 2 == 0:
                halo, core = (140, 75, 220), (205, 145, 255)
            elif theme == "harathi_sparks":
                halo, core = (25, 125, 255), (140, 230, 255)
            else:
                halo, core = (30, 145, 240), (155, 230, 255)
            cv2.circle(self._buf, (px, py), r + 2, halo, -1, lineType=cv2.LINE_AA)
            cv2.circle(self._buf, (px, py), r, core, -1, lineType=cv2.LINE_AA)

        soft_half = cv2.GaussianBlur(self._buf, (7, 7), 0)
        soft_full = cv2.resize(soft_half, (self.w, self.h), interpolation=cv2.INTER_LINEAR)
        return cv2.addWeighted(frame, 1.0, soft_full, 0.58, 0)


# ---------------------------------------------------------------------------
# Main Rendering Pipeline Class
# ---------------------------------------------------------------------------

class CinemaEngine:
    """Orchestrates multi-act rendering, optical lighting, audio normalization, and IG framing."""

    def __init__(self, config: CinemaProjectConfig):
        self.cfg = config
        self.ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
        os.makedirs(os.path.dirname(os.path.abspath(config.output_landscape_mp4)), exist_ok=True)

    @staticmethod
    def _apply_optical_glow_and_vignette(
        frame: np.ndarray,
        vignette_u16: np.ndarray,
        bloom_strength: float,
        flicker_amp: float,
        sec: float,
    ) -> np.ndarray:
        """Apply realistic diya lamp flicker, fast optical bloom halo, and fixed-point vignette."""
        h, w = frame.shape[:2]
        flicker = 1.0 + flicker_amp * (0.6 * math.sin(2.0 * math.pi * 2.3 * sec) + 0.4 * math.cos(2.0 * math.pi * 4.7 * sec))
        effective_bloom = max(0.0, bloom_strength * flicker)

        if effective_bloom > 0.01:
            small = cv2.resize(frame, (w // 4, h // 4), interpolation=cv2.INTER_AREA)
            bright = np.clip(small.astype(np.int16) - 165, 0, 90)
            bright = (bright * 255 // 90).astype(np.uint8)
            halo_small = cv2.GaussianBlur(bright, (21, 21), 0)
            halo_full = cv2.resize(halo_small, (w, h), interpolation=cv2.INTER_LINEAR)
            frame = cv2.addWeighted(frame, 1.0, halo_full, effective_bloom, 0)

        return ((frame.astype(np.uint16) * vignette_u16) >> 8).astype(np.uint8)

    def _prepare_broadcast_audio(self, temp_wav: str) -> str:
        """Normalize devotional soundtrack to broadcast -14 LUFS with gentle fade-in/out."""
        dur = self.cfg.total_duration_s
        fade_out_start = max(0.0, dur - 3.0)
        af = (
            f"atrim=start={self.cfg.audio_start_s}:duration={dur},"
            f"asetpts=PTS-STARTPTS,"
            f"highpass=f=45,"
            f"loudnorm=I=-14:TP=-1.0:LRA=11,"
            f"afade=t=in:st=0:d=1.2,"
            f"afade=t=out:st={fade_out_start:.2f}:d=3.0"
        )
        cmd = [
            self.ffmpeg, "-y", "-i", self.cfg.audio_path,
            "-vn", "-af", af, "-ar", "44100", "-ac", "2", "-c:a", "pcm_s16le", temp_wav
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        return temp_wav

    def _build_ig_overlay_pil(self, overlay_png: str) -> None:
        fonts = resolve_fonts(size_title=42, size_sub=26, size_badge=28, size_wm=26)
        frame_img = Image.new("RGBA", (1080, 1920), (0, 0, 0, 0))
        draw = ImageDraw.Draw(frame_img, "RGBA")
        draw.rounded_rectangle([(60, 410), (1020, 560)], radius=18, fill=(10, 8, 18, 190), outline=(245, 195, 65, 225), width=2)
        draw.text((540, 462), self.cfg.instagram_header_text, font=fonts["title"], fill=(255, 232, 150, 255), anchor="mm")
        draw.text((540, 518), "DIVYA MANGALAM • FULL MOTION SACRED CINEMA", font=fonts["sub"], fill=(235, 235, 245, 235), anchor="mm")
        draw.rectangle([(0, 652), (1080, 656)], fill=(245, 195, 65, 235))
        draw.rectangle([(0, 1264), (1080, 1268)], fill=(245, 195, 65, 235))
        draw.rounded_rectangle([(60, 1345), (1020, 1515)], radius=18, fill=(10, 8, 18, 190), outline=(245, 195, 65, 225), width=2)
        draw.text((540, 1400), "॥ हर हर महादेव • ॐ नमः शिवाय ॥", font=fonts["title"], fill=(255, 232, 150, 255), anchor="mm")
        draw.text((540, 1465), self.cfg.instagram_footer_text, font=fonts["sub"], fill=(225, 225, 235, 235), anchor="mm")
        frame_img.save(overlay_png)

    def _export_instagram_reel(self, master_mp4: str, reel_mp4: str, encoder_args: list[str], ig_overlay_png: str | None) -> None:
        """Convert 1920x1080 cinema master into a 1080x1920 luxury 9:16 Instagram Reel."""
        cleanup_png = False
        if not ig_overlay_png or not os.path.exists(ig_overlay_png):
            ig_overlay_png = master_mp4.replace(".mp4", "_ig_frame.png")
            self._build_ig_overlay_pil(ig_overlay_png)
            cleanup_png = True

        fc = (
            "[0:v]split=2[bg][fg];"
            "[bg]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
            "boxblur=25:5,eq=brightness=-0.12:saturation=1.15[bg_blur];"
            "[fg]scale=1080:608:flags=lanczos[fg_scaled];"
            "[bg_blur][fg_scaled]overlay=0:656[vid];"
            "[vid][1:v]overlay=0:0"
        )
        preset_args = encoder_args[:4]
        cmd = [
            self.ffmpeg, "-y", "-i", master_mp4, "-i", ig_overlay_png,
            "-filter_complex", fc,
            *preset_args,
            "-b:v", "3200k", "-maxrate", "4000k", "-bufsize", "6000k",
            "-pix_fmt", "yuv420p", "-c:a", "copy", "-movflags", "+faststart",
            reel_mp4,
        ]
        try:
            subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        finally:
            if cleanup_png and os.path.exists(ig_overlay_png):
                os.remove(ig_overlay_png)

    def _write_metadata(self) -> None:
        if not self.cfg.metadata_json_path:
            return
        meta = {
            "title": self.cfg.youtube_title,
            "description": self.cfg.youtube_description,
            "tags": self.cfg.youtube_tags,
            "category": "22",
            "privacyStatus": "public",
        }
        with open(self.cfg.metadata_json_path, "w", encoding="utf-8") as f:
            json.dump(meta, f, indent=2, ensure_ascii=False)

    def render(self, render_instagram: bool = True) -> tuple[str, str | None]:
        """Execute full cinema render pipeline and return (landscape_mp4, instagram_mp4)."""
        cfg = self.cfg
        n_acts = len(cfg.acts)
        total_frames = int(round(cfg.total_duration_s * cfg.fps))
        frames_per_act = total_frames // n_acts
        trans_frames = int(round(cfg.transition_s * cfg.fps))
        canvas_w = int(round(cfg.width * cfg.oversample_factor))
        canvas_h = int(round(cfg.height * cfg.oversample_factor))

        print("=" * 72)
        print(f"🎬 {cfg.project_name}")
        print(f"   Output (16:9): {cfg.output_landscape_mp4}")
        print(f"   Specs:         {cfg.width}x{cfg.height} @ {cfg.fps}fps | {cfg.total_duration_s:.1f}s ({total_frames} frames) | {n_acts} Acts")
        print("=" * 72)

        encoder_args = detect_best_video_encoder(self.ffmpeg)
        print(f"⚡ Selected H.264 encoder: {' '.join(encoder_args)}")

        vignette_u16 = build_vignette_u16(cfg.width, cfg.height, strength=0.30)

        with tempfile.TemporaryDirectory() as tmp_dir:
            if os.name == "nt" and not features.check("raqm"):
                print("\n🎨 Rendering Devanagari typography via Windows DirectWrite (WPF OpenType)...")
                overlays, (wm_bgr, wm_alpha), ig_overlay_png = render_overlays_wpf(cfg, tmp_dir)
            else:
                print("\n🎨 Rendering Devanagari typography via Pillow/Libraqm...")
                fonts = resolve_fonts(size_title=36, size_sub=21, size_badge=21, size_wm=17)
                overlays = [prebake_act_banner_pil(a, cfg, fonts) for a in cfg.acts]
                wm_bgr, wm_alpha = prebake_watermark_pil(cfg, fonts)
                ig_overlay_png = None

            print("🖼️  Preparing oversampled visual canvases...")
            canvases: list[np.ndarray] = []
            for act in cfg.acts:
                canvases.append(prepare_oversampled_canvas(act.image_path, canvas_w, canvas_h, act.warmth_boost))
                print(f"   ✅ Act {act.id}/{n_acts}: {os.path.basename(act.image_path)} ({act.motion_style})")

            temp_wav = os.path.join(tmp_dir, "broadcast_audio.wav")
            print("\n🎵 Mastering & normalizing devotional audio (-14 LUFS)...")
            self._prepare_broadcast_audio(temp_wav)

            pipe_cmd = [
                self.ffmpeg, "-y",
                "-f", "rawvideo", "-vcodec", "rawvideo",
                "-s", f"{cfg.width}x{cfg.height}", "-pix_fmt", "bgr24", "-r", str(cfg.fps),
                "-i", "-", "-i", temp_wav,
                "-map", "0:v", "-map", "1:a",
                *encoder_args,
                "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "320k",
                "-movflags", "+faststart",
                cfg.output_landscape_mp4,
            ]
            proc = subprocess.Popen(pipe_cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)

            particles = BokehParticleSystem(cfg.width, cfg.height, count=72, seed=108)
            t0 = time.time()

            banner_start_f = int(0.4 * cfg.fps)
            banner_in_f = int(1.3 * cfg.fps)
            banner_out_f = max(banner_in_f + 1, int((frames_per_act / cfg.fps - 2.2) * cfg.fps))
            banner_end_f = max(banner_out_f + 1, frames_per_act - int(0.6 * cfg.fps))

            def _render_single_act_frame(idx: int, timeline_f: int, timeline_total: int, g_frame: int) -> np.ndarray:
                act = cfg.acts[idx]
                prog = timeline_f / float(max(1, timeline_total))
                sec = g_frame / float(cfg.fps)
                M = compute_camera_transform(act.motion_style, prog, sec, canvas_w, canvas_h, cfg.width, cfg.height)
                frm = cv2.warpAffine(canvases[idx], M, (cfg.width, cfg.height), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
                return self._apply_optical_glow_and_vignette(frm, vignette_u16, act.bloom_strength, act.flicker_amp, sec)

            def _banner_alpha_mult(lf: int) -> float:
                if lf < banner_start_f or lf > banner_end_f:
                    return 0.0
                if lf < banner_in_f:
                    return (lf - banner_start_f) / float(banner_in_f - banner_start_f)
                if lf > banner_out_f:
                    return 1.0 - (lf - banner_out_f) / float(banner_end_f - banner_out_f)
                return 1.0

            print("\n🎥 Rendering frames with optical diya bloom, choreography & bokeh particles...")
            global_f = 0
            for act_idx in range(n_acts):
                act = cfg.acts[act_idx]
                act_frames = frames_per_act if act_idx < n_acts - 1 else (total_frames - global_f)
                preroll = trans_frames if act_idx > 0 else 0
                timeline_len = act_frames + preroll
                ov_bgr, ov_alpha = overlays[act_idx]

                for lf in range(act_frames):
                    frame = _render_single_act_frame(act_idx, lf + preroll, timeline_len, global_f)

                    if lf >= (act_frames - trans_frames) and act_idx < n_acts - 1:
                        blend_lf = lf - (act_frames - trans_frames)
                        next_len = (frames_per_act if (act_idx + 1) < n_acts - 1 else (total_frames - (global_f + (act_frames - lf)))) + trans_frames
                        next_frame = _render_single_act_frame(act_idx + 1, blend_lf, next_len, global_f)
                        alpha_mix = ease_in_out_cubic(blend_lf / float(trans_frames))
                        frame = cv2.addWeighted(frame, 1.0 - alpha_mix, next_frame, alpha_mix, 0)

                    frame = particles.step_and_draw(frame, act.particle_theme, global_f)
                    blend_bands(frame, ov_bgr, ov_alpha, _banner_alpha_mult(lf), y_top=140, y_bot=885)
                    blend_bands(frame, wm_bgr, wm_alpha[:, :, 0], 1.0, y_top=140, y_bot=1025)

                    proc.stdin.write(frame.tobytes())
                    global_f += 1

                    if global_f % 90 == 0 or global_f == total_frames:
                        el = max(0.001, time.time() - t0)
                        sys.stdout.write(f"\r   Frame {global_f}/{total_frames} ({100.0 * global_f / total_frames:.1f}%) | {global_f / el:.1f} fps | {el:.1f}s")
                        sys.stdout.flush()

            proc.stdin.close()
            _, stderr = proc.communicate()
            if proc.returncode != 0:
                raise RuntimeError(f"FFmpeg encode error: {stderr.decode('utf-8', errors='ignore')}")

            master_mb = os.path.getsize(cfg.output_landscape_mp4) / (1024 * 1024)
            print(f"\n✅ LANDSCAPE MASTER CREATED: {cfg.output_landscape_mp4} ({master_mb:.2f} MB in {time.time() - t0:.1f}s)")

            self._write_metadata()

            ig_out = None
            if render_instagram and cfg.output_instagram_mp4:
                print("\n📱 Rendering 9:16 Luxury Cinema Instagram Reel (preserving full 16:9 widescreen)...")
                self._export_instagram_reel(cfg.output_landscape_mp4, cfg.output_instagram_mp4, encoder_args, ig_overlay_png)
                ig_mb = os.path.getsize(cfg.output_instagram_mp4) / (1024 * 1024)
                print(f"✅ INSTAGRAM REEL CREATED: {cfg.output_instagram_mp4} ({ig_mb:.2f} MB)")
                ig_out = cfg.output_instagram_mp4

        return cfg.output_landscape_mp4, ig_out
