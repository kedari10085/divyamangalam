#!/usr/bin/env python3
"""
Divya Mangalam — Srimad Mahabharata Adi Parva Multi-Language Audio Generator
Generates synchronous audio tracks in 3 languages:
1. English (en-IN-PrabhatNeural)
2. Telugu  (te-IN-MohanNeural)
3. Hindi   (hi-IN-MadhurNeural)
"""

import os
import sys
import asyncio
import edge_tts
import subprocess
import imageio_ffmpeg

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
TEMP_DIR = os.path.join(BASE_DIR, "temp_mahabharata_multilang")
os.makedirs(TEMP_DIR, exist_ok=True)

SCRIPTS = {
    "en": [
        "Om Namo Bhagavate Vasudevaya. Welcome to Divya Mangalam's canonical chronicle of the greatest epic ever conceived: the Srimad Mahabharata. Composed in one hundred thousand verses by Maharshi Krishna-Dwaipayana Vyasa and inscribed by Lord Ganesha, we begin at the origin: Parva One, The Adi Parva: The Book of the Beginning.",
        "Upon the sacred banks of River Ganga, Prince Devavrata, son of King Shantanu and Ganga Devi, performs an act of supreme filial sacrifice. He raises his hand to heaven and proclaims his unbreakable vow of lifelong celibacy. The Devas shower flowers from heaven, crying: Bhishma! The Terrible, The Resolute! Thus arose the great pillar of the Kuru dynasty.",
        "In the ancient ashram of Guru Dronacharya, the young Pandavas and Kauravas were schooled in the supreme martial sciences. In the test of the wooden bird, while others saw the tree and the forest, Arjuna saw only the dark pupil of the bird's eye. His arrow flew true, establishing him as the foremost archer of the mortal world.",
        "Consumed by jealousy, prince Duryodhana conspired with Shakuni to burn the Pandavas alive in the palace of lac at Varanavata. Midnight came, and the palace erupted into roaring walls of flame. But Dharma cannot be destroyed. Guided by Vidura's warning, the mighty Bhimasena gathered his mother Kunti on his shoulders, led his brothers into a secret tunnel, and emerged safe into the forest.",
        "In the grand arena of King Drupada, kings from across the earth failed to string the colossal divine bow. Then stepped forward Arjuna in humble Brahmin disguise. Gazing downward into the reflective oil upon the marble floor, tracking the revolving golden fish spinning high in the dome, Arjuna unleashed five swift arrows, piercing the target! Princess Draupadi placed the wedding garland around his neck.",
        "With the eternal friendship of Lord Sri Krishna, the Pandavas transformed the wilderness of Khandavaprastha into Indraprastha: the most dazzling city on earth. And when Agni Deva sought the sacred fire, he bestowed upon Arjuna the celestial Gandiva bow and inexhaustible quivers. The foundational chapter closes. The wheels of Dharma have begun to turn. Yato Dharmas Tato Jayah."
    ],
    "te": [
        "ఓం నమో భగవతే వాసుదేవాయ. దివ్య మంగళం సమర్పించు శ్రీమన్మహాభారత పవిత్ర దృశ్య కావ్యం. వేదవ్యాస మహర్షి రచించి, శ్రీ విఘ్నేశ్వరుడు లిఖించిన లక్ష శ్లోకాల పరమ పవిత్ర గ్రంథం. నైమిశారణ్యములో సౌతి మహర్షి వినిపించిన ప్రథమ భాగము: ఆది పర్వము: సృష్టి, వంశావళి మరియు ప్రథమ ఘట్టము.",
        "పవిత్ర గంగా తీరములో శంతన మహారాజు కొరకు దేవవ్రతుడు చేసిన మహా త్యాగం. ఆకాశం వైపు చేతులెత్తి, 'తండ్రి సుఖము కొరకు ఆజన్మ బ్రహ్మచర్యాన్ని పాటిస్తాను' అని భీకర ప్రతిజ్ఞ చేసెను. దేవతలు ఆకాశము నుండి పూలవాన కురిపిస్తూ 'భీష్మ! భీష్మ!' అని కొనియాడారు. అలా కురువంశానికి అజేయమైన మూలస్తంభం ఆవిర్భవించెను.",
        "ద్రోణాచార్యుల పవిత్ర గురుకులములో రాజకుమారుల ధనుర్విద్యా శిక్షణ. చెట్టుపైనున్న కొయ్య పిట్టను గురిచూసే పరీక్షలో అందరూ చెట్టును చూస్తే, అర్జునుడు మాత్రం 'గురుదేవా, నాకు పిట్ట కన్ను తప్ప మరేదీ కనిపించడం లేదు' అని సమాధానమిచ్చాడు. అర్జునుని ఏకాగ్రత సమస్త ధనుర్ధారులలో అతనిని అగ్రగణ్యునిగా నిలిపింది.",
        "పాండవుల ప్రాభవాన్ని చూసి ఓర్వలేని దుర్యోధన-శకుని ద్వయం వారణావతములో లక్కఇంటి దహన కుట్ర పన్నిరి. అర్ధరాత్రి వేళ లక్కఇల్లు భగ్గున మండిపోయెను. కానీ విదురుని హెచ్చరికతో మహాబలుడైన భీమసేనుడు తల్లి కుంతీదేవిని, సోదరులను భుజాలపై మోస్తూ భూగర్భ సొరంగ మార్గం ద్వారా ప్రాణాలతో కాపాడి వెలుపలికి తెచ్చెను.",
        "పాంచాల రాజధాని కాంపిల్య నగరములో ద్రౌపదీ స్వయంవర మహోత్సవం. నూనెలో నీడను చూస్తూ గగనతలంలో తిరుగుతున్న మత్స్యయంత్రం కంటిని ఛేదించవలసిన కఠిన పరీక్ష. బ్రాహ్మణ వేషంలోనున్న అర్జునుడు మహా ధనుస్సును అవలీలగా ఎక్కుపెట్టి, బాణాలతో మత్స్య నేత్రాన్ని ఛేదించెను. ద్రౌపది అర్జునుని మెడలో విజయ మాలను అలంకరించెను.",
        "శ్రీకృష్ణుని దివ్య సాన్నిధ్యంలో ఖాండవప్రస్థమును ఇంద్రుని అమరావతిని తలపించేలా 'ఇంద్రప్రస్థ' మహానగరముగా నిర్మించిరి. అగ్నిదేవుని సంతృప్తిపరచగా, అగ్నిదేవుడు అర్జునునికి అజేయమైన గాండీవ ధనువును, అక్షయ తూణీరాలను, మరియు కపిధ్వజ రథమును బహూకరించెను. ఇంతటితో ఆది పర్వం సంపూర్ణమైనది. యతో ధర్మస్తతో జయః."
    ],
    "hi": [
        "ॐ नमो भगवते वासुदेवाय। दिव्य मंगलम की ओर से प्रस्तुत है विश्व के सबसे महान धर्मग्रंथ श्रीमन्महाभारत की गाथा। महर्षि वेदव्यास द्वारा रचित और भगवान श्री गणेश द्वारा लिखित एक लाख श्लोकों का यह महाकाव्य। हम आरंभ करते हैं प्रथम भाग: आदि पर्व: सृष्टि, कुरुवंश और धर्म की नींव।",
        "पवित्र गंगा के तट पर महाराज शांतनु के पुत्र राजकुमार देवव्रत ने अपने पिता के सुख के लिए भीषण प्रतिज्ञा ली। उन्होंने हाथ उठाकर आजीवन ब्रह्मचर्य का संकल्प लिया। आकाश से देवताओं ने पुष्पवर्षा करते हुए उद्घोष किया: 'भीष्म! भीष्म!' इस प्रकार कुरुवंश के अजेय पितामह का प्राकट्य हुआ।",
        "गुरु द्रोणाचार्य के आश्रम में राजकुमारों का धनुर्विद्या परीक्षण हुआ। जब अन्य सभी को पेड़ और डालियाँ दिख रही थीं, तब अर्जुन ने कहा: 'गुरुदेव, मुझे केवल पक्षी की आँख दिखाई दे रही है।' अर्जुन का बाण सीधे लक्ष्य पर लगा और वे संसार के सर्वश्रेष्ठ धनुर्धर सिद्ध हुए।",
        "ईर्ष्या में डूबे दुर्योधन और शकुनि ने वारणावत में लाक्षागृह का षड्यंत्र रचा। अर्धरात्रि में लाक्षागृह धू-धू कर जल उठा। किंतु महात्मा विदुर की चेतावनी से महाबली भीम ने माता कुंती और भाइयों को कंधे पर उठाया और गुप्त सुरंग से सकुशल बाहर निकाल लिया।",
        "द्रौपदी के स्वयंवर में विशाल दिव्य धनुष को कोई राजा हिला भी न सका। तब ब्राह्मण वेषधारी अर्जुन आगे आए। उन्होंने नीचे तेल के जल में परछाईं देखते हुए घूमते मत्स्य-यंत्र की आँख को एक ही प्रहार में भेद दिया। राजकुमारी द्रौपदी ने आगे बढ़कर अर्जुन के गले में वरमाला डाल दी।",
        "भगवान श्रीकृष्ण के सानिध्य में पांडवों ने खांडवप्रस्थ को देवताओं की नगरी 'इंद्रप्रस्थ' में परिवर्तित कर दिया। और अग्नि देव ने अर्जुन को दिव्य गांडीव धनुष, अक्षय तरकश और कपिध्वज रथ प्रदान किया। इसी के साथ आदि पर्व पूर्ण हुआ। यतो धर्मस्ततो जयः — जहाँ धर्म है, वहीं विजय है।"
    ]
}

VOICES = {
    "en": {"voice": "en-IN-PrabhatNeural", "rate": "-3%", "pitch": "-1Hz"},
    "te": {"voice": "te-IN-MohanNeural", "rate": "-3%", "pitch": "-1Hz"},
    "hi": {"voice": "hi-IN-MadhurNeural", "rate": "-3%", "pitch": "-1Hz"}
}

async def generate_language_track(lang):
    print(f"🎙️ Synthesizing {lang.upper()} Audio Track...")
    lines = SCRIPTS[lang]
    cfg = VOICES[lang]
    seg_files = []
    
    for idx, text in enumerate(lines):
        out_p = os.path.join(TEMP_DIR, f"{lang}_seg_{idx}.mp3")
        comm = edge_tts.Communicate(text, cfg["voice"], rate=cfg["rate"], pitch=cfg["pitch"])
        await comm.save(out_p)
        seg_files.append(out_p)
        
    concat_txt = os.path.join(TEMP_DIR, f"{lang}_concat.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for p in seg_files:
            f.write(f"file '{os.path.abspath(p).replace(chr(92), '/')}'\n")
            
    full_audio = os.path.join(TEMP_DIR, f"mahabharata_adi_parva_{lang}.mp3")
    subprocess.run([
        ffmpeg, '-y', '-f', 'concat', '-safe', '0',
        '-i', concat_txt, '-c', 'copy', full_audio
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # Mix with sacred background music
    bg_music = os.path.join(BASE_DIR, "audio", "ramayan_5min_musical.mp3")
    mixed_audio = os.path.join(TEMP_DIR, f"mahabharata_adi_parva_mixed_{lang}.aac")
    
    cmd = [
        ffmpeg, '-y',
        '-i', full_audio,
        '-stream_loop', '-1', '-i', bg_music,
        '-filter_complex',
        "[1:a]volume=0.15[bg];[0:a]volume=1.0[vox];[vox][bg]amix=inputs=2:duration=first:dropout_transition=2[out]",
        '-map', '[out]',
        '-c:a', 'aac', '-b:a', '192k',
        mixed_audio
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"✅ {lang.upper()} Mixed Audio Track Created: {mixed_audio} ({os.path.getsize(mixed_audio)/1024:.1f} KB)")
    return mixed_audio

async def main():
    print("==================================================")
    print("🏹 GENERATING MULTI-LANGUAGE AUDIO TRACKS")
    print("Languages: English (EN), Telugu (TE), Hindi (HI)")
    print("==================================================")
    for lang in ["en", "te", "hi"]:
        await generate_language_track(lang)
    print("\n🎉 All 3 Multi-Language Tracks Generated Successfully!")

if __name__ == '__main__':
    asyncio.run(main())
