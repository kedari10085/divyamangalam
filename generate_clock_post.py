"""
Divya Mangalam — 24-Hour Visual Vedic Muhurat Clock Infographic Generator (v2.0)
High-Aesthetic, Super-Sampled (2160x2160 -> 1080x1080 Lanczos) Celestial Timepiece
Renders pristine astronomical 24-hour dial, color-coded Shubh & Ashubh windows,
Day/Night celestial hemispheres, and Action Guidance Matrix.
Zero tofu/missing glyph boxes.
"""

import os, sys, math, datetime, argparse
from PIL import Image, ImageDraw, ImageFont, ImageFilter

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
    ('Sunday', 'West', 'Consume ghee / paan before travel'),
    ('Monday', 'East', 'Look in mirror or take milk before travel'),
    ('Tuesday', 'North', 'Consume jaggery before travel'),
    ('Wednesday', 'North', 'Consume coriander or sesame seeds'),
    ('Thursday', 'South', 'Consume yellow mustard or curd'),
    ('Friday', 'West', 'Consume barley or curd'),
    ('Saturday', 'East', 'Consume ginger or black sesame')
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

    disha_day, disha_dir, disha_rem = DISHA_SHOOL[sun_idx]

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
        'disha_shool': disha_dir,
        'disha_remedy': disha_rem
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
    h = size * 0.866
    p1 = (cx, cy - h/2)
    p2 = (cx - size/2, cy + h/2)
    p3 = (cx + size/2, cy + h/2)
    draw.polygon([p1, p2, p3], fill=color)

def draw_sun_icon(draw, cx, cy, radius, color):
    draw.ellipse([(cx - radius*0.5, cy - radius*0.5), (cx + radius*0.5, cy + radius*0.5)], fill=color)
    for i in range(8):
        ang = i * (math.pi / 4)
        x1 = cx + (radius * 0.65) * math.cos(ang)
        y1 = cy + (radius * 0.65) * math.sin(ang)
        x2 = cx + (radius * 0.95) * math.cos(ang)
        y2 = cy + (radius * 0.95) * math.sin(ang)
        draw.line([(x1, y1), (x2, y2)], fill=color, width=3)

def draw_moon_icon(draw, cx, cy, radius, color):
    # Crescent moon
    draw.ellipse([(cx - radius, cy - radius), (cx + radius, cy + radius)], fill=color)
    cut_offset = radius * 0.45
    draw.ellipse([(cx - radius + cut_offset, cy - radius - cut_offset*0.2), (cx + radius + cut_offset, cy + radius - cut_offset*0.2)], fill='#10091E')

def generate_clock_post_image(output_path, target_date=None):
    if target_date is None:
        target_date = datetime.date.today()

    data = calculate_clock_data(target_date)

    # Render at 2x resolution (2160x2160) for anti-aliasing
    SCALE = 2
    W = 1080 * SCALE
    H = 1080 * SCALE

    img = Image.new('RGB', (W, H), '#080511')
    draw = ImageDraw.Draw(img)

    # Fonts (Scaled by 2)
    font_bold = r"C:\Windows\Fonts\segoeuib.ttf"
    font_reg = r"C:\Windows\Fonts\segoeui.ttf"

    def get_font(path, size):
        try:
            return ImageFont.truetype(path, size * SCALE)
        except Exception:
            return ImageFont.load_default()

    f_brand = get_font(font_bold, 26)
    f_title = get_font(font_bold, 36)
    f_subtitle = get_font(font_bold, 21)
    f_card_title = get_font(font_bold, 21)
    f_item_name = get_font(font_bold, 19)
    f_item_time = get_font(font_bold, 20)
    f_item_sub = get_font(font_reg, 14)
    f_hour = get_font(font_bold, 13)
    f_hub_title = get_font(font_bold, 17)
    f_hub_sub = get_font(font_bold, 13)

    # 1. Subtle Radial Cosmic Glow in Background
    # Draw soft radial circle in center-left for dial
    CCX, CCY = 290 * SCALE, 435 * SCALE
    R_OUT = 195 * SCALE
    R_RING_OUT = 180 * SCALE
    R_RING_IN = 108 * SCALE
    R_HUB = 82 * SCALE

    # Background subtle radial background
    for r_bg in range(R_OUT + 80 * SCALE, R_OUT, -10):
        alpha_tint = '#0F0922'
        draw.ellipse([(CCX - r_bg, CCY - r_bg), (CCX + r_bg, CCY + r_bg)], fill=alpha_tint)

    # Outer Decorative Gold Border
    draw.rectangle([(20*SCALE, 20*SCALE), (W - 20*SCALE, H - 20*SCALE)], outline='#D4A017', width=3*SCALE)
    draw.rectangle([(26*SCALE, 26*SCALE), (W - 26*SCALE, H - 26*SCALE)], outline='#5A4210', width=1*SCALE)

    # Corner Decorative Vector Stars
    for cx_s, cy_s in [(42*SCALE, 42*SCALE), (W - 42*SCALE, 42*SCALE), (42*SCALE, H - 42*SCALE), (W - 42*SCALE, H - 42*SCALE)]:
        draw_vector_star(draw, cx_s, cy_s, 11*SCALE, '#D4A017')

    # 2. Header
    draw_vector_star(draw, 335*SCALE, 68*SCALE, 9*SCALE, '#FFD700')
    draw.text((358*SCALE, 53*SCALE), "DIVYA MANGALAM", fill='#FFD700', font=f_brand)
    draw_vector_star(draw, 685*SCALE, 68*SCALE, 9*SCALE, '#FFD700')

    title_text = "TODAY'S 24-HOUR VEDIC CLOCK"
    draw.text((W//2, 102*SCALE), title_text, fill='#FFFFFF', font=f_title, anchor='mm')

    sub_text = f"{data['date_str']} • {data['vara']} ({data['planet']} Day)"
    draw.text((W//2, 138*SCALE), sub_text, fill='#FFB74D', font=f_subtitle, anchor='mm')

    # 3. Draw Circular 24-Hour Vedic Clock Dial
    # Outer Bezel
    draw.ellipse([(CCX - R_OUT, CCY - R_OUT), (CCX + R_OUT, CCY + R_OUT)], fill='#10091E', outline='#D4A017', width=3*SCALE)
    draw.ellipse([(CCX - R_RING_OUT - 2*SCALE, CCY - R_RING_OUT - 2*SCALE),
                  (CCX + R_RING_OUT + 2*SCALE, CCY + R_RING_OUT + 2*SCALE)], outline='#6A5220', width=1*SCALE)

    # Day / Night Hemispheres Track Background
    # Sunrise to Sunset is Day: warm amber track
    # Sunset to Sunrise is Night: deep navy track
    sunrise_deg = (data['sunrise_h'] % 24) * 15.0 - 90
    sunset_deg = (data['sunset_h'] % 24) * 15.0 - 90
    if sunset_deg < sunrise_deg:
        sunset_deg += 360

    # Night base fill
    draw.pieslice([(CCX - R_RING_OUT, CCY - R_RING_OUT), (CCX + R_RING_OUT, CCY + R_RING_OUT)],
                  start=0, end=360, fill='#16102C')
    # Day slice fill
    draw.pieslice([(CCX - R_RING_OUT, CCY - R_RING_OUT), (CCX + R_RING_OUT, CCY + R_RING_OUT)],
                  start=sunrise_deg, end=sunset_deg, fill='#2B1A0E')

    # Function to draw annular wedge
    def draw_wedge(start_dec_h, end_dec_h, fill_color, border_color):
        a1 = (start_dec_h % 24) * 15.0 - 90
        a2 = (end_dec_h % 24) * 15.0 - 90
        if a2 < a1:
            a2 += 360
        draw.pieslice([(CCX - R_RING_OUT, CCY - R_RING_OUT), (CCX + R_RING_OUT, CCY + R_RING_OUT)],
                      start=a1, end=a2, fill=fill_color, outline=border_color, width=2*SCALE)

    # Draw color-coded timing wedges
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

    # Cut out center hole
    draw.ellipse([(CCX - R_RING_IN, CCY - R_RING_IN), (CCX + R_RING_IN, CCY + R_RING_IN)],
                 fill='#10091E', outline='#D4A017', width=2*SCALE)

    # Draw 24-Hour Tick Marks and Hour Labels
    for h in range(24):
        angle_rad = math.radians(h * 15)
        is_major = (h % 3 == 0)
        r1 = R_OUT - 2*SCALE
        r2 = R_OUT - (14*SCALE if is_major else 7*SCALE)
        x1 = CCX + r1 * math.sin(angle_rad)
        y1 = CCY - r1 * math.cos(angle_rad)
        x2 = CCX + r2 * math.sin(angle_rad)
        y2 = CCY - r2 * math.cos(angle_rad)
        draw.line([(x1, y1), (x2, y2)], fill='#FFD700' if is_major else '#7A6538', width=3*SCALE if is_major else 1*SCALE)

        if is_major:
            tx = CCX + (R_OUT + 15*SCALE) * math.sin(angle_rad)
            ty = CCY - (R_OUT + 15*SCALE) * math.cos(angle_rad)
            h_lbl = '00h' if h == 0 else ('12h' if h == 12 else f'{h:02d}h')
            draw.text((tx, ty), h_lbl, fill='#F1F5F9', font=f_hour, anchor='mm')

    # Sunrise and Sunset Ray Markers + Icons
    # Sunrise line
    rad_rise = math.radians((data['sunrise_h'] % 24) * 15)
    x_rise = CCX + (R_RING_OUT + 8*SCALE) * math.sin(rad_rise)
    y_rise = CCY - (R_RING_OUT + 8*SCALE) * math.cos(rad_rise)
    draw.line([(CCX, CCY), (x_rise, y_rise)], fill='#FF7A29', width=3*SCALE)
    draw_sun_icon(draw, x_rise, y_rise, 9*SCALE, '#FFB74D')

    # Sunset line
    rad_set = math.radians((data['sunset_h'] % 24) * 15)
    x_set = CCX + (R_RING_OUT + 8*SCALE) * math.sin(rad_set)
    y_set = CCY - (R_RING_OUT + 8*SCALE) * math.cos(rad_set)
    draw.line([(CCX, CCY), (x_set, y_set)], fill='#F43F5E', width=3*SCALE)
    draw_moon_icon(draw, x_set, y_set, 8*SCALE, '#CBD5E1')

    # Center Hub Badge (Vedic Astrolabe Medallion)
    draw.ellipse([(CCX - R_HUB, CCY - R_HUB), (CCX + R_HUB, CCY + R_HUB)], fill='#18102A', outline='#FFD700', width=3*SCALE)
    draw.ellipse([(CCX - R_HUB + 4*SCALE, CCY - R_HUB + 4*SCALE), (CCX + R_HUB - 4*SCALE, CCY + R_HUB - 4*SCALE)], outline='#6A4F18', width=1*SCALE)

    draw_vector_star(draw, CCX, CCY - 44*SCALE, 6*SCALE, '#FFD700')
    draw.text((CCX, CCY - 24*SCALE), "24-HOUR", fill='#FFD700', font=f_hub_title, anchor='mm')
    draw.text((CCX, CCY - 3*SCALE), "VEDIC CLOCK", fill='#FFFFFF', font=f_hub_title, anchor='mm')

    draw.ellipse([(CCX - 66*SCALE, CCY + 18*SCALE), (CCX - 54*SCALE, CCY + 30*SCALE)], fill='#FFB74D')
    draw.text((CCX - 46*SCALE, CCY + 15*SCALE), f"Rise: {data['sunrise_str']}", fill='#FFB74D', font=f_hub_sub)

    draw.ellipse([(CCX - 66*SCALE, CCY + 36*SCALE), (CCX - 54*SCALE, CCY + 48*SCALE)], fill='#FF8A65')
    draw.text((CCX - 46*SCALE, CCY + 33*SCALE), f"Set:  {data['sunset_str']}", fill='#FF8A65', font=f_hub_sub)

    # 4. Right Side Panels: Good vs Bad Windows Breakdown
    RX = 535 * SCALE
    RW = 495 * SCALE

    # Panel 1: SUPER AUSPICIOUS TIMINGS (SHUBHA)
    draw.rounded_rectangle([(RX, 180*SCALE), (RX + RW, 380*SCALE)], radius=14*SCALE, fill='#0B1F17', outline='#059669', width=2*SCALE)
    draw_vector_star(draw, RX + 26*SCALE, 208*SCALE, 7*SCALE, '#34D399')
    draw.text((RX + 44*SCALE, 196*SCALE), "SUPER AUSPICIOUS (SHUBHA)", fill='#34D399', font=f_card_title)

    # Item 1: Abhijit Muhurta
    draw.ellipse([(RX + 20*SCALE, 238*SCALE), (RX + 34*SCALE, 252*SCALE)], fill='#10B981')
    draw.text((RX + 44*SCALE, 234*SCALE), "Abhijit Muhurta", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18*SCALE, 234*SCALE), data['abhijit'][2], fill='#34D399', font=f_item_time, anchor='ra')
    draw.text((RX + 44*SCALE, 258*SCALE), "Best time of day • Supreme for new business, purchases & pacts", fill='#9CA3AF', font=f_item_sub)

    # Item 2: Brahma Muhurta
    draw.ellipse([(RX + 20*SCALE, 286*SCALE), (RX + 34*SCALE, 300*SCALE)], fill='#8B5CF6')
    draw.text((RX + 44*SCALE, 282*SCALE), "Brahma Muhurta", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18*SCALE, 282*SCALE), data['brahma'][2], fill='#C4B5FD', font=f_item_time, anchor='ra')
    draw.text((RX + 44*SCALE, 306*SCALE), "Pre-dawn spiritual peak • Meditation, yoga & mental clarity", fill='#9CA3AF', font=f_item_sub)

    # Item 3: Vijaya Muhurta
    draw.ellipse([(RX + 20*SCALE, 334*SCALE), (RX + 34*SCALE, 348*SCALE)], fill='#06B6D4')
    draw.text((RX + 44*SCALE, 330*SCALE), "Vijaya Muhurta", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18*SCALE, 330*SCALE), data['vijaya'][2], fill='#67E8F9', font=f_item_time, anchor='ra')
    draw.text((RX + 44*SCALE, 354*SCALE), "Triumph in negotiations, competitive deals & critical filings", fill='#9CA3AF', font=f_item_sub)

    # Panel 2: INAUSPICIOUS PERIODS (AVOID)
    draw.rounded_rectangle([(RX, 396*SCALE), (RX + RW, 575*SCALE)], radius=14*SCALE, fill='#220C12', outline='#DC2626', width=2*SCALE)
    draw_vector_triangle(draw, RX + 26*SCALE, 424*SCALE, 14*SCALE, '#EF4444')
    draw.text((RX + 44*SCALE, 412*SCALE), "INAUSPICIOUS PERIODS (AVOID)", fill='#F87171', font=f_card_title)

    # Item 1: Rahu Kaal
    draw.ellipse([(RX + 20*SCALE, 454*SCALE), (RX + 34*SCALE, 468*SCALE)], fill='#EF4444')
    draw.text((RX + 44*SCALE, 450*SCALE), "Rahu Kaal", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18*SCALE, 450*SCALE), data['rahu'][2], fill='#F87171', font=f_item_time, anchor='ra')
    draw.text((RX + 44*SCALE, 474*SCALE), "Heavy planetary friction • Strictly avoid major new beginnings", fill='#9CA3AF', font=f_item_sub)

    # Item 2: Yamagandam
    draw.ellipse([(RX + 20*SCALE, 504*SCALE), (RX + 34*SCALE, 518*SCALE)], fill='#F97316')
    draw.text((RX + 44*SCALE, 500*SCALE), "Yamagandam", fill='#FFFFFF', font=f_item_name)
    draw.text((RX + RW - 18*SCALE, 500*SCALE), data['yama'][2], fill='#FB923C', font=f_item_time, anchor='ra')
    draw.text((RX + 44*SCALE, 524*SCALE), "Avoid travel departures, starting contracts & medical surgery", fill='#9CA3AF', font=f_item_sub)

    # Item 3: Disha Shool
    draw.ellipse([(RX + 22*SCALE, 552*SCALE), (RX + 32*SCALE, 562*SCALE)], fill='#FCD34D')
    draw.text((RX + 44*SCALE, 548*SCALE), f"Disha Shool: Avoid {data['disha_shool']}. ({data['disha_remedy']})", fill='#FCD34D', font=f_item_sub)

    # Panel 3: Bottom "TODAY'S ACTION SUITABILITY GUIDE" Strip
    BY = 675 * SCALE
    BH = 315 * SCALE
    draw.rounded_rectangle([(40*SCALE, BY), (W - 40*SCALE, BY + BH)], radius=18*SCALE, fill='#120B20', outline='#D4A017', width=2*SCALE)

    draw_vector_star(draw, 64*SCALE, BY + 32*SCALE, 8*SCALE, '#FFD700')
    draw.text((82*SCALE, BY + 20*SCALE), "TODAY'S ACTION SUITABILITY GUIDE", fill='#FFD700', font=f_card_title)
    draw.text((W - 60*SCALE, BY + 24*SCALE), "Classical Muhūrta Cintāmaṇi Guidance", fill='#9CA3AF', font=f_item_sub, anchor='ra')

    # 4 Action Columns
    actions = [
        ("Vivah (Marriage)", "Auspicious in Abhijit", f"Best: {data['abhijit'][2]}", "Avoid Rahu Kaal window", '#34D399', '#10B981'),
        ("Griha Pravesh", "Auspicious daytime", f"Best: {data['abhijit'][2]}", "Avoid Rahu Kaal entirely", '#34D399', '#10B981'),
        ("Vehicle & Gold", "Favorable window", f"Best: {data['abhijit'][2]}", "Good for taking deliveries", '#67E8F9', '#06B6D4'),
        ("Business Deals", "Ideal in Abhijit & Vijaya", f"Best: {data['vijaya'][2]}", "Never sign during Rahu Kaal", '#FCD34D', '#EAB308')
    ]

    col_w = (W - 80*SCALE - 30*SCALE) // 4
    for i, (act_title, verdict, best_w, advice, v_col, dot_col) in enumerate(actions):
        bx = 55*SCALE + i * (col_w + 10*SCALE)
        draw.rounded_rectangle([(bx, BY + 60*SCALE), (bx + col_w, BY + BH - 25*SCALE)], radius=10*SCALE, fill='#1B122E', outline='#4A3766', width=1*SCALE)

        draw.ellipse([(bx + 12*SCALE, BY + 78*SCALE), (bx + 22*SCALE, BY + 88*SCALE)], fill=dot_col)
        draw.text((bx + 28*SCALE, BY + 74*SCALE), act_title, fill='#FFFFFF', font=f_item_name)

        draw.text((bx + 12*SCALE, BY + 108*SCALE), "Verdict:", fill='#9CA3AF', font=f_item_sub)
        draw.text((bx + 12*SCALE, BY + 128*SCALE), verdict, fill=v_col, font=f_item_sub)
        draw.text((bx + 12*SCALE, BY + 168*SCALE), best_w, fill='#FFD700', font=f_item_sub)
        draw.text((bx + 12*SCALE, BY + 208*SCALE), advice, fill='#9CA3AF', font=f_item_sub)

    # 5. Branding Footer
    draw_vector_star(draw, 140*SCALE, H - 45*SCALE, 6*SCALE, '#B8860B')
    draw.text((W//2, H - 45*SCALE), "Explore the 10-Year Interactive Clock on https://divyamangalam.com • @divyamangalam.info",
              fill='#B8860B', font=f_item_sub, anchor='mm')
    draw_vector_star(draw, W - 140*SCALE, H - 45*SCALE, 6*SCALE, '#B8860B')

    # Downsample with Lanczos for pristine anti-aliasing
    final_img = img.resize((1080, 1080), Image.Resampling.LANCZOS)

    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    final_img.save(output_path, quality=95)
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
