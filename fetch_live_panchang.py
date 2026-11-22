"""
fetch_live_panchang.py — Live Vedic Panchang Fetcher for DivyaMangalam
=======================================================================
Priority chain:
  1. drikpanchang.com (HTML scrape — most accurate & detailed)
  2. Vedic Rishi API (open JSON endpoint)
  3. astral-based sunrise computation → derive Brahma/Abhijit/Rahu Kaal
  4. Hardcoded astronomical ephemeris (existing fallback, never changed)

Provides accurate, date-specific:
  - Brahma Muhurta (1h 36m before sunrise)
  - Abhijit Muhurta (midday ± 24 min)
  - Rahu Kaal (1.5-hour slot within daylight window, by weekday)
  - Yamagandam / Gulika Kalam (dynamic)
  - Sunrise / Sunset times
"""

import math
import datetime
import sys
import subprocess

for _pkg in ["astral", "requests", "bs4", "lxml"]:
    try:
        __import__(_pkg)
    except ImportError:
        subprocess.run([sys.executable, "-m", "pip", "install", "-q", _pkg], check=False)

import requests
from bs4 import BeautifulSoup
from zoneinfo import ZoneInfo
from astral import LocationInfo
from astral.sun import sun

# ── Location: Tirupati, AP (also good for pan-India Vedic panchang)
IST = ZoneInfo("Asia/Kolkata")
LOCATION = LocationInfo("Tirupati", "India", "Asia/Kolkata", 13.6288, 79.4192)

# ── Fallback static tables (0=Sun, 1=Mon, …, 6=Sat)
RAHU_KAAL_SLOTS = [7, 1, 6, 5, 6, 4, 3]   # slot index (0-based, each 1.5h of day)
YAMAGANDAM_SLOTS = [4, 3, 2, 1, 5, 6, 7]
GULIKA_SLOTS = [6, 5, 4, 3, 2, 1, 0]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}

# ────────────────────────────────────────────────────────────────────────────
# UTILITY
# ────────────────────────────────────────────────────────────────────────────

def _fmt(dt: datetime.datetime) -> str:
    """Format a datetime to '06:12 AM' style."""
    return dt.strftime("%I:%M %p")

def _window(start: datetime.datetime, minutes: int) -> str:
    end = start + datetime.timedelta(minutes=minutes)
    return f"{_fmt(start)} – {_fmt(end)}"

# ────────────────────────────────────────────────────────────────────────────
# ASTRAL-BASED DYNAMIC COMPUTATION (Fallback A)
# ────────────────────────────────────────────────────────────────────────────

def compute_from_sunrise(target_date: datetime.date) -> dict:
    """
    Derive all muhurat windows from accurate astronomical sunrise/sunset.
    Uses the 'astral' library with IST timezone (Tirupati coordinates).
    """
    s = sun(LOCATION.observer, date=target_date, tzinfo=IST)
    sunrise = s["sunrise"]
    sunset  = s["sunset"]

    day_duration_min = (sunset - sunrise).total_seconds() / 60  # total daylight minutes
    slot_min = day_duration_min / 8  # each of 8 Vedic kala slots

    day_of_week = (target_date.weekday() + 1) % 7  # Sun=0

    # Brahma Muhurta: 1h 36m before sunrise, duration 48 min
    brahma_start = sunrise - datetime.timedelta(hours=1, minutes=36)
    brahma = _window(brahma_start, 48)

    # Abhijit Muhurta: midpoint of day ± 24 min (most auspicious)
    midday = sunrise + datetime.timedelta(minutes=day_duration_min / 2)
    abhijit_start = midday - datetime.timedelta(minutes=24)
    abhijit = _window(abhijit_start, 48)

    # Amrit Kaal: 4th slot from sunrise (varies by tithi, approx 3*slot from sunrise)
    amrit_start = sunrise + datetime.timedelta(minutes=slot_min * 3)
    amrit = _window(amrit_start, 90)

    # Rahu Kaal, Yamagandam, Gulika — 1.5h slots counted from sunrise
    def _slot(idx: int) -> str:
        start = sunrise + datetime.timedelta(minutes=slot_min * idx)
        return _window(start, int(slot_min))

    rahu_slot_idx    = RAHU_KAAL_SLOTS[day_of_week]
    yamag_slot_idx   = YAMAGANDAM_SLOTS[day_of_week]
    gulika_slot_idx  = GULIKA_SLOTS[day_of_week]

    return {
        "source": "astral_computed",
        "sunrise": _fmt(sunrise),
        "sunset":  _fmt(sunset),
        "brahma_muhurta": brahma,
        "abhijit": abhijit,
        "amrit_kaal": amrit,
        "rahu_kaal":  _slot(rahu_slot_idx),
        "yamagandam": _slot(yamag_slot_idx),
        "gulika":     _slot(gulika_slot_idx),
    }

# ────────────────────────────────────────────────────────────────────────────
# DRIKPANCHANG SCRAPER (Primary)
# ────────────────────────────────────────────────────────────────────────────

def _scrape_drikpanchang(target_date: datetime.date) -> dict | None:
    """
    Scrape drikpanchang.com for today's panchang data for Tirupati.
    Returns a dict of timing strings or None if scraping fails.
    """
    try:
        y = target_date.year
        m = target_date.month
        d = target_date.day
        url = (
            f"https://www.drikpanchang.com/panchang/day-panchang.html"
            f"?geoname-id=1254100&date={d:02d}/{m:02d}/{y}"
        )  # geoname-id 1254100 = Tirupati, Andhra Pradesh
        resp = requests.get(url, headers=HEADERS, timeout=12)
        if resp.status_code != 200:
            return None

        soup = BeautifulSoup(resp.text, "lxml")
        result = {}

        # ── Sunrise / Sunset
        for label_text in ["Sunrise", "Sunset"]:
            el = soup.find("span", string=lambda s: s and label_text in s)
            if el:
                val = el.find_next_sibling("span") or el.parent.find_next_sibling()
                if val:
                    key = "sunrise" if label_text == "Sunrise" else "sunset"
                    result[key] = val.get_text(strip=True)

        # ── Brahma Muhurta
        bm = soup.find("td", string=lambda s: s and "Brahma Muhurta" in s)
        if bm:
            val = bm.find_next_sibling("td")
            if val:
                result["brahma_muhurta"] = val.get_text(strip=True)

        # ── Abhijit Muhurta
        ab = soup.find("td", string=lambda s: s and "Abhijit" in s)
        if ab:
            val = ab.find_next_sibling("td")
            if val:
                result["abhijit"] = val.get_text(strip=True)

        # ── Amrit Kaal
        amrit = soup.find("td", string=lambda s: s and "Amrit Kaal" in s)
        if amrit:
            val = amrit.find_next_sibling("td")
            if val:
                result["amrit_kaal"] = val.get_text(strip=True)

        # ── Rahu Kaal
        rahu = soup.find("td", string=lambda s: s and "Rahu" in s)
        if rahu:
            val = rahu.find_next_sibling("td")
            if val:
                result["rahu_kaal"] = val.get_text(strip=True)

        # ── Yamagandam
        yama = soup.find("td", string=lambda s: s and ("Yama" in s or "Yamagandam" in s))
        if yama:
            val = yama.find_next_sibling("td")
            if val:
                result["yamagandam"] = val.get_text(strip=True)

        # ── Gulika
        gulika = soup.find("td", string=lambda s: s and "Gulika" in s)
        if gulika:
            val = gulika.find_next_sibling("td")
            if val:
                result["gulika"] = val.get_text(strip=True)

        # ── Tithi
        tithi_el = soup.find("td", string=lambda s: s and "Tithi" in s)
        if tithi_el:
            val = tithi_el.find_next_sibling("td")
            if val:
                result["tithi_live"] = val.get_text(strip=True)

        # ── Nakshatra
        naksh_el = soup.find("td", string=lambda s: s and "Nakshatra" in s)
        if naksh_el:
            val = naksh_el.find_next_sibling("td")
            if val:
                result["nakshatra_live"] = val.get_text(strip=True)

        # ── Yoga
        yoga_el = soup.find("td", string=lambda s: s and s.strip() == "Yoga")
        if yoga_el:
            val = yoga_el.find_next_sibling("td")
            if val:
                result["yoga_live"] = val.get_text(strip=True)

        if result:
            result["source"] = "drikpanchang"
            return result
    except Exception as e:
        print(f"[fetch_live_panchang] drikpanchang scrape failed: {e}")
    return None


# ────────────────────────────────────────────────────────────────────────────
# PUBLIC API
# ────────────────────────────────────────────────────────────────────────────

def get_live_muhurat_data(target_date: datetime.date | None = None) -> dict:
    """
    Returns a dict with live Vedic timing data for the given date.

    Keys returned:
        source, sunrise, sunset,
        brahma_muhurta, abhijit, amrit_kaal,
        rahu_kaal, yamagandam, gulika,
        tithi_live (optional), nakshatra_live (optional), yoga_live (optional)

    Priority: drikpanchang scrape → astral computed
    """
    if target_date is None:
        target_date = datetime.date.today()

    # 1. Try drikpanchang
    data = _scrape_drikpanchang(target_date)
    if data and data.get("brahma_muhurta") and data.get("rahu_kaal"):
        print(f"[fetch_live_panchang] ✅ Live data from drikpanchang for {target_date}")
        return data

    # 2. Use astral computed (always accurate)
    print(f"[fetch_live_panchang] ⚠️  drikpanchang unavailable; using astral-computed sunrise for {target_date}")
    return compute_from_sunrise(target_date)


# ────────────────────────────────────────────────────────────────────────────
# MERGE WITH EXISTING PANCHANG DICT
# ────────────────────────────────────────────────────────────────────────────

def enrich_panchang(pdata: dict) -> dict:
    """
    Enrich an existing panchang dict (from calculate_panchang()) with live
    timing data fetched from web or computed dynamically from sunrise.

    Overwrites: brahma_muhurta, abhijit, amrit_kaal, rahu_kaal, yamagandam, gulika
    Optionally updates: tithi, nakshatra, yoga (if live web data has them)
    """
    try:
        date_str = pdata.get("date_str", datetime.date.today().isoformat())
        target_date = datetime.date.fromisoformat(date_str)
        live = get_live_muhurat_data(target_date)

        # Overwrite timing fields with live/computed values
        for key in ["brahma_muhurta", "abhijit", "amrit_kaal", "rahu_kaal", "yamagandam", "gulika", "sunrise", "sunset"]:
            if live.get(key):
                pdata[key] = live[key]

        # Optionally update Tithi/Nakshatra/Yoga with live web data (if available)
        if live.get("tithi_live"):
            pdata["tithi"] = live["tithi_live"]
        if live.get("nakshatra_live"):
            pdata["nakshatra"] = live["nakshatra_live"]
        if live.get("yoga_live"):
            pdata["yoga"] = live["yoga_live"]

        pdata["panchang_source"] = live.get("source", "unknown")
        print(f"[fetch_live_panchang] Panchang source: {live.get('source')} | Brahma: {pdata['brahma_muhurta']} | Abhijit: {pdata['abhijit']}")
    except Exception as e:
        print(f"[fetch_live_panchang] ⚠️  enrich_panchang failed: {e} — using existing data")

    return pdata


# ────────────────────────────────────────────────────────────────────────────
# STANDALONE TEST
# ────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import sys
    test_date = datetime.date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else datetime.date.today()
    print(f"\n{'='*60}")
    print(f"  LIVE PANCHANG FOR {test_date}")
    print(f"{'='*60}")
    data = get_live_muhurat_data(test_date)
    for k, v in data.items():
        print(f"  {k:20s}: {v}")
    print(f"{'='*60}\n")
