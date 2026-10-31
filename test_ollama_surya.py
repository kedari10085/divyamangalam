import urllib.request, json

prompt = """You are an expert Vedic scholar and devotional narrator for Divya Mangalam.
Today is Sunday (Ravivara), 1st November 2026. The ruling deity of Sunday is Lord Surya Narayana (The Divine Sun God).
Write an inspiring, sacred 60-second spoken narration script in pure, devotional English mixed with Sanskrit mantras.
Structure into 4 distinct phases:
1. Divine Dawn: Salutations to Lord Surya riding the golden seven-horse chariot (Om Suryaya Namah, Om Ghrinih Suryaya Namah).
2. Cosmic Power: The sun as the supreme source of health, vitality, truth, and cosmic illumination.
3. Today's Vedic Timings: Sunday Abhijit Muhurta at midday for success, and caution during Sunday evening Rahu Kaal (4:30 PM to 6:00 PM).
4. Divine Blessing: Wishing all devotees radiant vitality, clarity, and peace from Divya Mangalam.
Keep it strictly under 130 words so it takes exactly 55-60 seconds to speak at a steady, calm, devotional pace. No stage directions or asterisks. Return only the spoken words."""

req = urllib.request.Request(
    'http://127.0.0.1:11434/api/generate',
    data=json.dumps({
        'model': 'llama3.2:3b',
        'prompt': prompt,
        'stream': False,
        'options': {'temperature': 0.7}
    }).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)

with urllib.request.urlopen(req) as response:
    result = json.loads(response.read().decode('utf-8'))
    print("=== OLLAMA 3B GENERATED NARRATION SCRIPT ===")
    print(result.get('response'))
    with open('surya_script.txt', 'w', encoding='utf-8') as f:
        f.write(result.get('response'))
