"""
Divya Mangalam — 24-Hour Visual Vedic Muhurat Clock Infographic Generator
Generates high-resolution 1080x1080 Instagram card with circular 24-hour clock dial,
Rahu Kaal, Yamagandam, Gulika, Abhijit, Brahma Muhurta & Action Guidance.
Pristine rendering with ZERO tofu/missing glyph boxes.
"""

import os, sys, math, datetime, argparse
from PIL import Image, ImageDraw, ImageFont

if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

WEEKDAYS_VARA = [
    ('Sunday', 'Ravivara', 'Sun'),
    ('Monday', 'Somavara', 'Moon'),
    ('Tuesday', 'Mangalavara', 'Mars'),
    ('Wednesday', 'Budhavara', 'Mercury'),
    ('Thursday', 'Guruvara', 'Jupiter'),
    ('Friday', 'Shukravara', 'Venus'),
    ('Saturday', 'Shanivara', 'Saturn')
]

DISHA_SHOOL = [
    ('Sunday', 'West'),
    ('Monday', 'East'),
    ('Tuesday', 'North'),
    ('Wednesday', 'North'),
    ('Thursday', 'South'),
    ('Friday', 'West'),
    ('Saturday', 'East')
]

def get_solar_times(dt, lat=14.4426, lon=79.9865, tz=5.5):
    doy = dt.timetuple().tm_yday
    B = (2 * math.pi / 365) * (doy - 1)
    declination = (0.006918 - 0.399912 * math.cos(B) + 0.070257 * math.sin(B)
                   - 0.006758 * math.cos(2 * B) + 0.000907 * math.sin(2 * B)
                   - 0.002697 * math.cos(3 * B) + 0.00148 * math.sin(3 * B))
    eot = (229.18 * (0.000075 + 0.001868 * math.cos(B) - 0.032077 * math.sin(B)
                     - 0.014615 * math.cos(2 * B) - 0.040849 * math.sin(2 * B)))

    lat_rad = math.radians(lat)
    zenith_rad = math.radians(90.833)
    cos_ha = (math.cos(zenith_rad) - math.sin(lat_rad) * math.sin(declination)) / (math.cos(lat_rad) * math.cos(declination))
    cos_ha = max(-1.0, min(1.0, cos_ha))
    ha_deg = math.degrees(math.acos(cos_ha))

    solar_noon_min = 720 - 4 * lon - eot + (tz * 60)
    sunrise_h = (solar_noon_min - ha_deg * 4) / 60.0
    sunset_h = (solar_noon_min + ha_deg * 4) / 60.0

    return sunrise_h, sunset_h

def format_h(dec_h):
    dec_h = dec_h % 24
    h = int(dec_h)
    m = int(round((dec_h - h) * 60))
    if m == 60:
        h = (h + 1) % 24
        m = 0
    ampm = 'PM' if h >= 12 else 'AM'
    dh = h % 12
    if dh == 0: dh = 12
    return f"{dh}:{m:02d} {ampm}"

def calculate_clock_data(target_date):
    day_idx = target_date.weekday()
    # Python weekday(): Monday is 0, Sunday is 6
    # Convert to Sunday=0 ... Saturday=6
    sun_idx = (day_idx + 1) % 7
    weekday_en, vara_sa, planet_ruler = WEEKDAYS_VARA[sun_idx]

    sunrise_h, sunset_h = get_solar_times(target_date)
    day_dur = sunset_h - sunrise_h
    part_dur = day_dur / 8.0
    muh_dur = day_dur / 15.0

    rahu_indices = [7, 1, 6, 4, 5, 3, 2]
    yama_indices = [4, 3, 2, 1, 0, 6, 5]
    gulika_indices = [6, 5, 4, 3, 2, 1, 0]

    rahu_start = sunrise_h + rahu_indices[sun_idx] * part_dur
    rahu_end = rahu_start + part_dur

    yama_start = sunrise_h + yama_indices[sun_idx] * part_dur
    yama_end = yama_start + part_dur

    gulika_start = sunrise_h + gulika_indices[sun_idx] * part_dur
    gulika_end = gulika_start + part_dur

    abhijit_start = sunrise_h + 7 * muh_dur
    abhijit_end = sunrise_h + 8 * muh_dur

    brahma_start = ((sunrise_h - 96/60.0) + 24) % 24
    brahma_end = ((sunrise_h - 48/60.0) + 24) % 24

    vijaya_start = sunrise_h + 10 * muh_dur
    vijaya_end = sunrise_h + 11 * muh_dur

    disha_day, disha_dir = DISHA_SHOOL[sun_idx]

    return {
        'date_str': target_date.strftime('%A, %d %B %Y'),
        'date_iso': target_date.strftime('%Y-%m-%d'),
        'weekday': weekday_en,
        'vara': vara_sa,
        'planet': planet_ruler,
        'sunrise_h': sunrise_h,
        'sunset_h': sunset_h,
        'sunrise_str': format_h(sunrise_h),
        'sunset_str': format_h(sunset_h),
        'rahu': (rahu_start, rahu_end, f"{format_h(rahu_start)} – {format_h(rahu_end)}"),
        'yama': (yama_start, yama_end, f"{format_h(yama_start)} – {format_h(yama_end)}"),
        'gulika': (gulika_start, gulika_end, f"{format_h(gulika_start)} – {format_h(gulika_end)}"),
        'abhijit': (abhijit_start, abhijit_end, f"{format_h(abhijit_start)} – {format_h(abhijit_end)}"),
        'brahma': (brahma_start, brahma_end, f"{format_h(brahma_start)} – {format_h(brahma_end)}"),
        'vijaya': (vijaya_start, vijaya_end, f"{format_h(vijaya_start)} – {format_h(vijaya_end)}"),
        'disha_shool': disha_dir
    }

def draw_vector_star(draw, cx, cy, radius, color):
    points = []
    for i in range(8):
        angle = i * (math.pi / 4)
        r = radius if i % 2 == 0 else radius * 0.38
        x = cx + r * math.sin(angle)
        y = cy - r * math.cos(angle)
        points.append((x, y))
    draw.polygon(points, fill=color)

def draw_vector_triangle(draw, cx, cy, size, color):
    # Warning triangle
    h = size * 0.866
    p1 = (cx, cy - h/2)
    p2 = (cx - size/2, cy + h/2)
    p3 = (cx + size/2, cy + h/2)
    draw.polygon([p1, p2, p3], fill=color)

def generate_clock_post_image(output_path, target_date=None):
    if target_date is None:
        target_date = datetime.date.today()

    data = calculate_clock_data(target_date)

    W, H = 1080, 1080
    img = Image.new('RGB', (W, H), '#0A0612') # Deep cosmic temple dark background
    draw = ImageDraw.Draw(img)

    # Fonts
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"

    try:
        f_brand = ImageFont.truetype(font_bold, 28)
        f_title = ImageFont.truetype(font_bold, 38)
        f_subtitle = ImageFont.truetype(font_bold, 22)
        f_card_title = ImageFont.truetype(font_bold, 21)
        f_item_name = ImageFont.truetype(font_bold, 20)
        f_item_time = ImageFont.truetype(font_bold, 21)
        f_item_sub = ImageFont.truetype(font_reg, 15)
        f_hour = ImageFont.truetype(font_bold, 14)
        f_hub_title = ImageFont.truetype(font_bold, 18)
        f_hub_sub = ImageFont.truetype(font_bold, 14)
    except Exception:
        f_brand = ImageFont.load_default()
        f_title = f_brand
        f_subtitle = f_brand
        f_card_title = f_brand
        f_item_name = f_brand
        f_item_time = f_brand
        f_item_sub = f_brand
        f_hour = f_brand
        f_hub_title = f_brand
        f_hub_sub = f_brand

    # 1. Subtle Outer Border
    draw.rectangle([(20, 20), (W - 20, H - 20)], outline='#D4A017', width=3)
    draw.rectangle([(26, 26), (W - 26, H - 26)], outline='#665014', width=1)

    # Corner Decorative Vector Stars
    for cx_s, cy_s in [(40, 40), (W - 40, 40), (40, H - 40), (W - 40, H - 40)]:
        draw_vector_star(draw, cx_s, cy_s, 10, '#D4A017')

    # 2. Header
    draw_vector_star(draw, 340, 68, 9, '#FFD700')
    draw.text((360, 52), "DIVYA MANGALAM", fill='#FFD700', font=f_brand)
    draw_vector_star(draw, 680, 68, 9, '#FFD700')

    title_text = "TODAY'S 24-HOUR VEDIC CLOCK"
    draw.text((W//2, 102), title_text, fill='#FFFFFF', font=f_title, anchor='mm')

    sub_text = f"{data['date_str']} • {data['vara']} ({data['planet']} Day)"
    draw.text((W//2, 138), sub_text, fill='#FFB74D', font=f_subtitle, anchor='mm')

    # 3. Draw Circular 24-Hour Vedic Clock Dial
    CCX, CCY = 290, 435
    R_OUT = 190
    R_RING_OUT = 175
    R_RING_IN = 105
    R_HUB = 80

    # Draw Dial Base Circle
    draw.ellipse([(CCX - R_OUT, CCY - R_OUT), (CCX + R_OUT, CCY + R_OUT)], fill='#140D24', outline='#D4A017', width=2)

    # Function to draw annular wedge in PIL
    def draw_wedge(start_dec_h, end_dec_h, fill_color, border_color):
        a1 = (start_dec_h % 24) * 15.0
        a2 = (end_dec_h % 24) * 15.0
        
        pil_a1 = a1 - 90
        pil_a2 = a2 - 90
        if pil_a2 < pil_a1:
            pil_a2 += 360

        draw.pieslice([(CCX - R_RING_OUT, CCY - R_RING_OUT), (CCX + R_RING_OUT, CCY + R_RING_OUT)],
                      start=pil_a1, end=pil_a2, fill=fill_color, outline=border_color, width=1)

    # Draw colored timing slices
    # 🔴 Rahu Kaal
    draw_wedge(data['rahu'][0], data['rahu'][1], '#DC2626', '#FFA4A4')
    # 🟠 Yamagandam
    draw_wedge(data['yama'][0], data['yama'][1], '#EA580C', '#FFD0A4')
    # 🟡 Gulika Kalam
    draw_wedge(data['gulika'][0], data['gulika'][1], '#CA8A04', '#FFF0A4')
    # 🟢 Abhijit Muhurta
    draw_wedge(data['abhijit'][0], data['abhijit'][1], '#059669', '#A7F3D0')
    # 🟣 Brahma Muhurta
    draw_wedge(data['brahma'][0], data['brahma'][1], '#7C3AED', '#DDD6FE')
    # 🔵 Vijaya Muhurta
    draw_wedge(data['vijaya'][0], data['vijaya'][1], '#0284C7', '#BAE6FD')

    # Cut out center hole to make it a crisp donut ring
    draw.ellipse([(CCX - R_RING_IN, CCY - R_RING_IN), (CCX + R_RING_IN, CCY + R_RING_IN)], fill='#140D24', outline='#D4A017', width=1)

    # Draw 24-Hour Tick Marks and Hour Labels
    for h in range(24):
        angle_rad = math.radians(h * 15)
        is_major = (h % 3 == 0)
        r1 = R_OUT - 2
        r2 = R_OUT - (12 if is_major else 6)
        x1 = CCX + r1 * math.sin(angle_rad)
        y1 = CCY - r1 * math.cos(angle_rad)
        x2 = CCX + r2 * math.sin(angle_rad)
        y2 = CCY - r2 * math.cos(angle_rad)
        draw.line([(x1, y1), (x2, y2)], fill='#FFD700' if is_major else '#857245', width=2 if is_major else 1)

        if is_major:
            tx = CCX + (R_OUT + 14) * math.sin(angle_rad)
            ty = CCY - (R_OUT + 14) * math.cos(angle_rad)
            h_lbl = '00h' if h == 0 else ('12h' if h == 12 else (f'{h:02d}h'))
            draw.text((tx, ty), h_lbl, fill='#E2E8F0', font=f_hour, anchor='mm')

    # Draw Sunrise / Sunset Lines
    for h_val, color in [(data['sunrise_h'], '#FF7A29'), (data['sunset_h'], '#F43F5E')]:
        rad = math.radians((h_val % 24) * 15)
        x_edge = CCX + (R_RING_OUT + 6) * math.sin(rad)
        y_edge = CCY - (R_RING_OUT + 6) * math.cos(rad)
        draw.line([(CCX, CCY), (x_edge, y_edge)], fill=color, width=2)

    # Center Hub Badge
    draw.ellipse([(CCX - R_HUB, CCY - R_HUB), (CCX + R_HUB, CCY + R_HUB)], fill='#1A102E', outline='#FFD700', width=2)
    draw.text((CCX, CCY - 26), "24-HOUR", fill='#FFD700', font=f_hub_title, anchor='mm')
    draw.text((CCX, CCY - 4), "VEDIC CLOCK", fill='#FFFFFF', font=f_hub_title, anchor='mm')
    
    # Vector sunrise dot + text
    draw.ellipse([(CCX - 68, CCY + 16), (CCX - 56, CCY + 28)], fill='#FFB74D')
    draw.text((CCX - 48, CCY + 13), f"Rise: {data['sunrise_str']}", fill='#FFB74D', font=f_hub_sub)
    
    # Vector sunset dot + text
    draw.ellipse([(CCX - 68, CCY + 34), (CCX - 56, CCY + 46)], fill='#FF8A65')
    draw.text((CCX - 48, CCY + 31), f"Set:  {data['sunset_str']}", fill='#FF8A65', font=f_hub_sub)

    # 4. Right Side Panels: Good vs Bad Windows Breakdown
    RX = 540
    RW = 490

    # Panel 1: SUPER AUSPICIOUS TIMINGS (SHUBHA)
    draw.rounded_rectangle([(RX, 180), (RX + RW, 380)], radius=14, fill='#0B1F17', outline='#059669', width=2)
    draw_vector_star(draw, RX + 26, 208, 7, '#34D399')
    draw.text((RX + 42, 196), "SUPER AUSPICIOUS (SHUBHA)", fill='#34D399', font=f_card_title)

    # Item 1: Abhijit Muhurta
    draw.ellipse([(RX + 20, 238), (RX + 34, 252)], fill='#10B981')
    draw.text((RX + 44, 234), "Abhijit Muhurta", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18, 234), data['abhijit'][2], fill='#34D399', font=f_item_time, anchor='ra')
    draw.text((RX + 44, 258), "Best time of day • Supreme for new business, purchases & pacts", fill='#9CA3AF', font=f_item_sub)

    # Item 2: Brahma Muhurta
    draw.ellipse([(RX + 20, 286), (RX + 34, 300)], fill='#8B5CF6')
    draw.text((RX + 44, 282), "Brahma Muhurta", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18, 282), data['brahma'][2], fill='#C4B5FD', font=f_item_time, anchor='ra')
    draw.text((RX + 44, 306), "Pre-dawn spiritual peak • Meditation, yoga & mental clarity", fill='#9CA3AF', font=f_item_sub)

    # Item 3: Vijaya Muhurta
    draw.ellipse([(RX + 20, 334), (RX + 34, 348)], fill='#06B6D4')
    draw.text((RX + 44, 330), "Vijaya Muhurta", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18, 330), data['vijaya'][2], fill='#67E8F9', font=f_item_time, anchor='ra')
    draw.text((RX + 44, 354), "Triumph in negotiations, competitive deals & critical filings", fill='#9CA3AF', font=f_item_sub)

    # Panel 2: INAUSPICIOUS PERIODS (AVOID)
    draw.rounded_rectangle([(RX, 396), (RX + RW, 575)], radius=14, fill='#220C12', outline='#DC2626', width=2)
    draw_vector_triangle(draw, RX + 26, 208 + 216, 14, '#EF4444')
    draw.text((RX + 42, 412), "INAUSPICIOUS PERIODS (AVOID)", fill='#F87171', font=f_card_title)

    # Item 1: Rahu Kaal
    draw.ellipse([(RX + 20, 454), (RX + 34, 468)], fill='#EF4444')
    draw.text((RX + 44, 450), "Rahu Kaal", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18, 450), data['rahu'][2], fill='#F87171', font=f_item_time, anchor='ra')
    draw.text((RX + 44, 474), "Heavy planetary friction • Strictly avoid major new beginnings", fill='#9CA3AF', font=f_item_sub)

    # Item 2: Yamagandam
    draw.ellipse([(RX + 20, 504), (RX + 34, 518)], fill='#F97316')
    draw.text((RX + 44, 500), "Yamagandam", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18, 500), data['yama'][2], fill='#FB923C', font=f_item_time, anchor='ra')
    draw.text((RX + 44, 524), "Avoid travel departures, starting contracts & medical surgery", fill='#9CA3AF', font=f_item_sub)

    # Item 3: Disha Shool
    draw.ellipse([(RX + 22, 552), (RX + 32, 562)], fill='#FCD34D')
    draw.text((RX + 44, 548), f"Disha Shool: Avoid traveling towards {data['disha_shool']} today.", fill='#FCD34D', font=f_item_sub)

    # Panel 3: Bottom "TODAY'S ACTION SUITABILITY GUIDE" Strip
    BY = 675
    BH = 315
    draw.rounded_rectangle([(40, BY), (W - 40, BY + BH)], radius=18, fill='#140C22', outline='#D4A017', width=2)

    draw_vector_star(draw, 64, BY + 32, 8, '#FFD700')
    draw.text((82, BY + 20), "TODAY'S ACTION SUITABILITY GUIDE", fill='#FFD700', font=f_card_title)
    draw.text((W - 60, BY + 24), "Classical Muhūrta Cintāmaṇi Guidance", fill='#9CA3AF', font=f_item_sub, anchor='ra')

    # 4 Action Columns
    actions = [
        ("Vivah (Marriage)", "Auspicious in Abhijit window", f"Best: {data['abhijit'][2]}", "Avoid Rahu Kaal & Yamagandam", '#34D399', '#10B981'),
        ("Griha Pravesh", "Auspicious after Rahu Kaal", f"Best: {data['abhijit'][2]}", "Light ghee lamp during dusk", '#34D399', '#10B981'),
        ("Vehicle & Gold", "Favorable window active", f"Best: {data['abhijit'][2]}", "Good for taking deliveries", '#67E8F9', '#06B6D4'),
        ("Business Deals", "Ideal in Abhijit & Vijaya", f"Best: {data['vijaya'][2]}", "Never sign during Rahu Kaal", '#FCD34D', '#EAB308')
    ]

    col_w = (W - 80 - 30) // 4
    for i, (act_title, verdict, best_w, advice, v_col, dot_col) in enumerate(actions):
        bx = 55 + i * (col_w + 10)
        draw.rounded_rectangle([(bx, BY + 60), (bx + col_w, BY + BH - 25)], radius=10, fill='#1B122E', outline='#4A3766', width=1)
        
        # Action dot
        draw.ellipse([(bx + 12, BY + 78), (bx + 22, BY + 88)], fill=dot_col)
        draw.text((bx + 28, BY + 74), act_title, fill='#FFFFFF', font=f_item_name)
        
        draw.text((bx + 12, BY + 108), "Verdict:", fill='#9CA3AF', font=f_item_sub)
        draw.text((bx + 12, BY + 128), verdict, fill=v_col, font=f_item_sub)
        draw.text((bx + 12, BY + 168), best_w, fill='#FFD700', font=f_item_sub)
        draw.text((bx + 12, BY + 208), advice, fill='#9CA3AF', font=f_item_sub)

    # 5. Branding Footer
    draw_vector_star(draw, 140, H - 45, 6, '#B8860B')
    draw.text((W//2, H - 45), "Explore the 10-Year Interactive Clock on https://divyamangalam.com • @divyamangalam.info",
              fill='#B8860B', font=f_item_sub, anchor='mm')
    draw_vector_star(draw, W - 140, H - 45, 6, '#B8860B')

    # Save final high-res card
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    img.save(output_path, quality=95)
    print(f"[SUCCESS] 24-Hour Vedic Clock Post Image saved to: {output_path}")
    return output_path

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generate 24-Hour Vedic Clock Instagram Card")
    parser.add_argument('--date', type=str, default=None, help="Target date YYYY-MM-DD")
    parser.add_argument('--out', type=str, default="images/clock_darshan.jpg", help="Output file path")
    args = parser.parse_args()

    target_d = None
    if args.date:
        parts = [int(p) for p in args.date.split('-')]
        target_d = datetime.date(parts[0], parts[1], parts[2])

    generate_clock_post_image(args.out, target_d)
