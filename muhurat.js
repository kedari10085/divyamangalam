/* ============================================================
   DIVYA MANGALAM — VEDIC SHUBH MUHURAT ENGINE
   Based on Classical Muhūrta Cintāmaṇi (मुहूर्तचिन्तामणि)
   by Daivajña Rāma (दैवज्ञ राम, c. 1600 CE / Shaka 1522)
   incorporating the authentic Nakshatra Prakaraṇam (नक्षत्रप्रकरणम्)
   ============================================================ */

const MUHURAT = (function () {

  /* ============================================================
     DAIVAJNA RAMA'S NAKSHATRA PRAKARANAM (नक्षत्रप्रकरणम्)
     The 7 Classical Nakshatra Ganas (सप्त नक्षत्र वर्गाः)
     ============================================================ */
  const NAKSHATRA_PRAKARANA = {
    'sthira': {
      id: 'sthira',
      titleSa: 'स्थिर / ध्रुव नक्षत्र (Dhruva / Sthira)',
      titleEn: 'Fixed & Permanent Stars',
      nature: 'Enduring, Stable, Auspicious for long-term foundations',
      nakshatras: ['Rohini', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada'],
      shloka: 'रोहिण्युत्तरात्रयं स्थिरं कुर्यात्तत्र स्थिरं कर्म ।\nनृपाभिषेकशान्त्युद्यानगृहप्रवेशादिकम् ॥',
      translation: 'Rohini and the three Uttaras (Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada) are Dhruva (Fixed). Perform all deeds intended to last permanently: house warming, laying foundations, planting trees, acquiring land, coronation, and sacred rituals.',
      recommended: [
        'Griha Pravesh (Housewarming)',
        'Bhoomi / Land purchase & registry',
        'Foundation stone laying (Shilanyas)',
        'Temple consecration (Pratistha)',
        'Planting trees and gardens',
        'Coronation and long-term contracts',
        'Marriage and permanent friendship'
      ],
      avoid: ['Travel (Yatra)', 'Starting short-term fluid journeys', 'Taking loans']
    },
    'laghu': {
      id: 'laghu',
      titleSa: 'क्षिप्र / लघु नक्षत्र (Kshipra / Laghu)',
      titleEn: 'Swift & Light Stars',
      nature: 'Quick, Radiant, Highly auspicious for trade and wealth',
      nakshatras: ['Hasta', 'Ashwini', 'Pushya', 'Abhijit'],
      shloka: 'हस्तोऽश्विनीपुष्योऽभिजिच्च लघुः संज्ञकस्तथा ।\nरतिभूषाकलाविद्याचिकित्सापण्यकर्मसु ॥',
      translation: 'Hasta, Ashwini, Pushya, and Abhijit are Laghu (Swift). Highly praised for sensory pleasures, buying gold ornaments, fine arts, commencing education, medical treatment/healing, and commercial trade.',
      recommended: [
        'Buying Gold and Jewelry (Swarna / Ratna)',
        'Trade, shop opening & financial deals',
        'Medical therapies, healing & surgery recovery',
        'Commencing education & Vidyarambha',
        'Craftsmanship, fine arts and crafts',
        'Short-distance travel and journeys'
      ],
      avoid: ['Demolition', 'Harsh/punitive actions']
    },
    'chara': {
      id: 'chara',
      titleSa: 'चर / चल नक्षत्र (Chara / Chala)',
      titleEn: 'Movable & Dynamic Stars',
      nature: 'Mobile, Fluid, Auspicious for movement and vehicles',
      nakshatras: ['Punarvasu', 'Swati', 'Shravana', 'Dhanishtha', 'Shatabhisha'],
      shloka: 'स्वात्यादित्यश्रुतिधनिष्ठाशतताराश्चलं स्मृतम् ।\nयात्रावाहनगजारोहादिकं चरे शुभम् ॥',
      translation: 'Swati, Punarvasu (Aditya), Shravana (Shruti), Dhanishtha, and Shatabhisha are Chala (Movable). Auspicious for journeys, purchasing and riding vehicles, taking delivery of conveyances, and undertaking progressive movement.',
      recommended: [
        'Vehicle Purchase & Delivery (Vahan Kharid)',
        'Pilgrimages and long journeys (Yatra)',
        'Riding horses, elephants, and buying automobiles',
        'Gardening and progressive changes',
        'Shifting temporary residences'
      ],
      avoid: ['Permanent building foundation', 'Burial / eternal binding deeds']
    },
    'mridu': {
      id: 'mridu',
      titleSa: 'मृदु / मैत्र नक्षत्र (Mridu / Maitra)',
      titleEn: 'Soft, Tender & Friendly Stars',
      nature: 'Gentle, Sweet, Harmonious, Blissful for relationships',
      nakshatras: ['Mrigashira', 'Chitra', 'Anuradha', 'Revati'],
      shloka: 'मृगचित्रानुराधाश्च पौष्णं च मृदु संज्ञकम् ।\nवस्त्राभरणसङ्गीतविवाहादौ शुभं स्मृतम् ॥',
      translation: 'Mrigashira, Chitra, Anuradha, and Revati (Paushna) are Mridu (Gentle/Friendly). Most propitious for wearing new silk garments, jewelry, music, vocal performances, wedding ceremonies (Vivaha), and cementing lifelong affection.',
      recommended: [
        'Vivaha (Marriage & Engagement)',
        'Wearing new clothes and sacred ornaments',
        'Music, singing, dance, and creative arts',
        'Romance, marital harmony, and friendship',
        'Gentle sanskaras (Namkaran, Annaprashan)'
      ],
      avoid: ['Combative deeds', 'Litigation', 'Surgical amputations']
    },
    'tikshna': {
      id: 'tikshna',
      titleSa: 'तीक्ष्ण / दारुण नक्षत्र (Tikshna / Daruna)',
      titleEn: 'Sharp & Dreadful Stars',
      nature: 'Penetrating, Intense, Destructive to adversities',
      nakshatras: ['Moola', 'Jyeshtha', 'Ardra', 'Ashlesha'],
      shloka: 'मूलाहीन्द्रार्द्रा दारुणं स्यात् तत्र दारुणकर्म तु ।\nअभिचारारिघातादिपशुबन्धादि सिद्धये ॥',
      translation: 'Moola, Ashlesha (Ahi), Jyeshtha (Indra), and Ardra are Daruna (Sharp/Dreadful). Suited for severe deeds: surgical procedures, subduing adversaries, exorcism of negative forces, breaking bindings, and medical interventions.',
      recommended: [
        'Surgical operations and medical injections',
        'Subduing malicious opposition & legal defense',
        'Demolishing hazardous obstructions',
        'Tantric protection and protective yantras'
      ],
      avoid: [
        'Marriage (Vivaha)',
        'Housewarming (Griha Pravesh)',
        'Buying Gold or Vehicles',
        'Auspicious celebrations'
      ]
    },
    'ugra': {
      id: 'ugra',
      titleSa: 'उग्र / क्रूर नक्षत्र (Ugra / Krura)',
      titleEn: 'Fierce & Aggressive Stars',
      nature: 'Harsh, Incisive, Demolishing, Purging',
      nakshatras: ['Purva Phalguni', 'Purva Ashadha', 'Purva Bhadrapada', 'Bharani', 'Magha'],
      shloka: 'पूर्वात्रयं च पित्र्यं च यम्यं चोग्रमुदाहृतम् ।\nघातविषाग्निशाठ्यादिकं क्रूरे शुभं नान्यत् ॥',
      translation: 'The three Purvas (Purva Phalguni, Purva Ashadha, Purva Bhadrapada), Magha (Pitrya), and Bharani (Yamya) are Ugra (Fierce). Suited solely for handling fire, dismantling obsolete structures, research with chemicals/poisons, and decisive boundary security.',
      recommended: [
        'Demolition of dilapidated old structures',
        'Setting boundary fences and security barriers',
        'Purging toxic wastes and hazardous materials',
        'Fire-containment drills and metallurgical melting'
      ],
      avoid: [
        'All benign sanskaras (Marriage, Housewarming)',
        'Commencing business, trade or investments',
        'Vehicle delivery or signing beneficial deeds'
      ]
    },
    'mishra': {
      id: 'mishra',
      titleSa: 'मिश्र / साधारण नक्षत्र (Mishra / Sadharana)',
      titleEn: 'Mixed & Intermediate Stars',
      nature: 'Dual-tempered, Fiery yet Productive',
      nakshatras: ['Krittika', 'Vishakha'],
      shloka: 'विश्ववैश्वानरं मिश्रं तत्र मिश्रं समाचरेत् ।\nअग्निसन्धानयज्ञादिकर्म तत्र प्रशस्यते ॥',
      translation: 'Krittika (Vaishvanara) and Vishakha (Dvivishva) are Mishra (Mixed). Praised for performing Agnihotra, fire sacrifices (Yajna), metallurgical craftsmanship, resolving long-standing debts, and mixed activities.',
      recommended: [
        'Homa, Havans and Agnihotra rituals',
        'Paying off old debts and loans',
        'Furnace work, metallurgy, and cooking ceremonies',
        'Resolving stalled matters with determination'
      ],
      avoid: ['Peaceful long journeys', 'Gentle marital agreements without guidance']
    }
  };

  /* ============================================================
     SPECIAL AUSPICIOUS YOGAS (मुहूर्तचिन्तामणि सिद्धियोगाः)
     ============================================================ */

  // 1. Amrita Siddha Yoga (अमृतसिद्धियोग)
  // Sunday + Hasta, Monday + Mrigashira, Tuesday + Ashwini, Wednesday + Anuradha,
  // Thursday + Pushya, Friday + Revati, Saturday + Rohini
  // Exceptions noted by Daivajna Rama:
  // Thu+Pushya: Forbidden for Vivaha (Marriage).
  // Sat+Rohini: Forbidden for Yatra (Travel).
  // Tue+Ashwini: Forbidden for Griha Pravesh.
  const AMRITA_SIDDHA_PAIRS = [
    { day: 0, nakshatra: 'Hasta', veto: null },
    { day: 1, nakshatra: 'Mrigashira', veto: null },
    { day: 2, nakshatra: 'Ashwini', veto: 'griha-pravesh', vetoMsg: 'Forbidden for Griha Pravesh as per Daivajna Rama' },
    { day: 3, nakshatra: 'Anuradha', veto: null },
    { day: 4, nakshatra: 'Pushya', veto: 'vivah', vetoMsg: 'Guru-Pushya Amrita Siddha is forbidden for Vivaha as per Daivajna Rama' },
    { day: 5, nakshatra: 'Revati', veto: null },
    { day: 6, nakshatra: 'Rohini', veto: 'yatra', vetoMsg: 'Forbidden for Travel (Yatra) as per Daivajna Rama' }
  ];

  // 2. Sarvartha Siddha Yoga (सर्वार्थसिद्धियोग)
  const SARVARTHA_SIDDHA_MAP = {
    0: ['Hasta', 'Moola', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Pushya', 'Ashwini'],
    1: ['Shravana', 'Rohini', 'Mrigashira', 'Pushya', 'Anuradha'],
    2: ['Ashwini', 'Krittika', 'Ashlesha', 'Uttara Bhadrapada'],
    3: ['Rohini', 'Anuradha', 'Hasta', 'Krittika', 'Mrigashira'],
    4: ['Pushya', 'Revati', 'Anuradha', 'Punarvasu', 'Ashwini'],
    5: ['Revati', 'Ashwini', 'Anuradha', 'Punarvasu', 'Shravana'],
    6: ['Rohini', 'Shravana', 'Swati']
  };

  // 3. Tripushkar & Dwipushkar Yogas
  // Bhadra Tithis (2, 7, 12: Dwitiya, Saptami, Trayodashi/Dwadashi) + Sun/Tue/Sat + specific stars
  const TRIPUSHKAR_NAKSHATRAS = ['Punarvasu', 'Krittika', 'Uttara Phalguni', 'Vishakha', 'Uttara Ashadha', 'Purva Bhadrapada'];
  const DWIPUSHKAR_NAKSHATRAS = ['Mrigashira', 'Chitra', 'Dhanishtha'];

  function checkSpecialYogas(weekday, tithiName, nakshatraName) {
    const yogas = [];

    // Amrita Siddha Check
    const amritaMatch = AMRITA_SIDDHA_PAIRS.find(p => p.day === weekday && p.nakshatra === nakshatraName);
    if (amritaMatch) {
      yogas.push({
        id: 'amrita-siddha',
        nameSa: 'अमृतसिद्धियोगः',
        nameEn: 'Amrita Siddha Yoga',
        badge: '🌟 Amrita Siddha',
        desc: 'Supreme nectar-like planetary alignment ensuring extraordinary success and fulfillment of noble deeds.',
        shloka: 'रवावर्कः शशाङ्के सौम्यः कुजेऽश्विनी बुधे मैत्रम् । गुरौ पुष्यो भृगौ पौष्णं मन्दे ब्राह्मं त्वमृताह्वयम् ॥',
        vetoCeremony: amritaMatch.veto,
        vetoNote: amritaMatch.vetoMsg
      });
    }

    // Sarvartha Siddha Check
    const sList = SARVARTHA_SIDDHA_MAP[weekday] || [];
    if (sList.includes(nakshatraName)) {
      yogas.push({
        id: 'sarvartha-siddha',
        nameSa: 'सर्वार्थसिद्धियोगः',
        nameEn: 'Sarvartha Siddha Yoga',
        badge: '✨ Sarvartha Siddha',
        desc: 'Universal accomplishment alignment where all righteous tasks, undertakings, and celebrations meet success.',
        shloka: 'सर्वार्थसाधको योगः सर्वकर्मसु शस्यते ।'
      });
    }

    // Ravi Pushya Yoga
    if (weekday === 0 && nakshatraName === 'Pushya') {
      yogas.push({
        id: 'ravi-pushya',
        nameSa: 'रविपुष्ययोगः',
        nameEn: 'Ravi Pushya Yoga',
        badge: '👑 Ravi Pushya Yoga',
        desc: 'Sunday paired with Pushya Nakshatra — supreme Maha-Muhurta for purchasing Gold, Land, and starting massive wealth ventures.',
        shloka: 'सूर्ये पुष्यसमायोगे सर्वसिद्धिर्भवेद् ध्रुवम् । सुवर्णक्रयणे श्रेष्ठं सर्वसम्पत्प्रदायकम् ॥'
      });
    }

    // Guru Pushya Yoga
    if (weekday === 4 && nakshatraName === 'Pushya') {
      yogas.push({
        id: 'guru-pushya',
        nameSa: 'गुरुपुष्ययोगः',
        nameEn: 'Guru Pushya Yoga',
        badge: '🔱 Guru Pushya Yoga',
        desc: 'Thursday paired with Pushya Nakshatra — foremost sacred Muhurta for Mahalakshmi invocation, Gold acquisition, Vidya initiation, and spiritual investment.',
        shloka: 'गुरौ पुष्ये समायोगे महालक्ष्मीः प्रसीदति । सुवर्णं च हिरण्यं च स्थिरं भवति सर्वदा ॥'
      });
    }

    // Tripushkar Yoga
    const isBhadraTithi = ['Dwitiya', 'Saptami', 'Dwadashi', 'Trayodashi'].includes(tithiName);
    const isTripushkarDay = [0, 2, 6].includes(weekday); // Sun, Tue, Sat
    if (isBhadraTithi && isTripushkarDay && TRIPUSHKAR_NAKSHATRAS.includes(nakshatraName)) {
      yogas.push({
        id: 'tripushkar',
        nameSa: 'त्रिपुष्करयोगः',
        nameEn: 'Tripushkar Yoga',
        badge: '💎 Tripushkar Yoga (3x)',
        desc: 'Rare astrological alignment multiplying the outcome of any event three-fold! Ideal for wealth acquisition, investments, and gold; strictly avoid borrowing or loss.',
        shloka: 'भद्रायां भानुभौमार्किसहिते त्रिपुष्करः स्मृतः । त्रिवारं फलमाप्नोति शुभं वा यदि वाऽशुभम् ॥'
      });
    }

    // Dwipushkar Yoga
    if (isBhadraTithi && isTripushkarDay && DWIPUSHKAR_NAKSHATRAS.includes(nakshatraName)) {
      yogas.push({
        id: 'dwipushkar',
        nameSa: 'द्विपुष्करयोगः',
        nameEn: 'Dwipushkar Yoga',
        badge: '🪙 Dwipushkar Yoga (2x)',
        desc: 'Planetary alignment causing deeds performed to replicate twice. Highly favorable for purchasing appreciating assets.',
        shloka: 'द्विपुष्करे कृतं कर्म द्विवारं परिवर्तते ।'
      });
    }

    return yogas;
  }

  function getNakshatraGana(nakshatraName) {
    for (const [key, gana] of Object.entries(NAKSHATRA_PRAKARANA)) {
      if (gana.nakshatras.includes(nakshatraName)) {
        return gana;
      }
    }
    return NAKSHATRA_PRAKARANA['mridu']; // default fallback
  }

  /* ============================================================
     10 MAJOR CEREMONIES (दश महासंस्काराः)
     ============================================================ */
  const CATEGORIES = {
    'vivah': {
      id: 'vivah',
      nameEn: 'Marriage (Vivah)',
      nameTe: 'వివాహ ముహూర్తం',
      nameSa: 'विवाह संस्कार',
      emoji: '💍',
      description: 'Sacred wedding ceremony uniting two souls under auspicious planetary alignment as prescribed in Vivaha Prakarana.',
      favNakshatras: ['Rohini', 'Mrigashira', 'Magha', 'Uttara Phalguni', 'Hasta', 'Swati', 'Anuradha', 'Moola', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
      favGanas: ['sthira', 'mridu'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Ekadashi', 'Trayodashi'],
      favDays: [1, 3, 4, 5], // Mon, Wed, Thu, Fri (Sun neutral)
      badDays: [2, 6], // Tue, Sat
      vetoChaturmas: true,
      vetoCombustion: true
    },
    'griha-pravesh': {
      id: 'griha-pravesh',
      nameEn: 'Housewarming (Griha Pravesh)',
      nameTe: 'గృహ ప్రవేశం',
      nameSa: 'गृह प्रवेश मुहूर्त',
      emoji: '🏡',
      description: 'Entering and consecrating a new residence for eternal peace, prosperity, and Vastu devata blessings.',
      favNakshatras: ['Rohini', 'Mrigashira', 'Pushya', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Anuradha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Uttara Bhadrapada', 'Revati'],
      favGanas: ['sthira', 'mridu'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
      favDays: [1, 3, 4, 5],
      badDays: [2], // Tue
      vetoChaturmas: true,
      vetoCombustion: true
    },
    'vahan': {
      id: 'vahan',
      nameEn: 'Vehicle Purchase (Vahan Kharid)',
      nameTe: 'వాహన కొనుగోలు',
      nameSa: 'वाहन क्रय मुहूर्त',
      emoji: '🚗',
      description: 'Procuring and taking delivery of cars, two-wheelers, or commercial vehicles in Chara / Chala Nakshatras for longevity and travel safety.',
      favNakshatras: ['Ashwini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Revati'],
      favGanas: ['chara', 'laghu'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [3, 5, 0, 1, 4], // Wed, Fri, Sun, Mon, Thu
      badDays: [2, 6], // Tue, Sat
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'sampatti': {
      id: 'sampatti',
      nameEn: 'Property / Land Purchase',
      nameTe: 'ఆస్తి / భూమి కొనుగోలు',
      nameSa: 'भूमि / संपत्ति क्रय',
      emoji: '🏢',
      description: 'Signing deed agreements, land registries, and property investments in Dhruva / Sthira stars for permanent value appreciation.',
      favNakshatras: ['Rohini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Ashlesha', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Vishakha', 'Anuradha', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
      favGanas: ['sthira', 'laghu'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [4, 5, 3, 1], // Thu, Fri, Wed, Mon
      badDays: [0, 2], // Sun, Tue for registry
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'vyapar': {
      id: 'vyapar',
      nameEn: 'Business / Shop Opening',
      nameTe: 'వ్యాపార ప్రారంభం',
      nameSa: 'व्यापार आरम्भ मुहूर्त',
      emoji: '💼',
      description: 'Launching a commercial enterprise, shop inauguration, or signing trade pacts in Laghu / Kshipra stars for swift financial turnover.',
      favNakshatras: ['Pushya', 'Ashwini', 'Rohini', 'Mrigashira', 'Punarvasu', 'Hasta', 'Chitra', 'Anuradha', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
      favGanas: ['laghu', 'sthira'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [3, 4, 5, 1], // Wed, Thu, Fri, Mon
      badDays: [2, 6],
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'swarna': {
      id: 'swarna',
      nameEn: 'Gold & Jewelry Purchase (Swarna Kharid)',
      nameTe: 'బంగారు ఆభరణాల కొనుగోలు',
      nameSa: 'स्वर्ण / आभूषण क्रय',
      emoji: '🪙',
      description: 'Auspicious celestial windows for acquiring gold, diamond ornaments, and bullion to anchor enduring Lakshmi prosperity as per Daivajna Rama.',
      favNakshatras: ['Pushya', 'Rohini', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Shravana', 'Dhanishtha', 'Revati', 'Ashwini'],
      favGanas: ['laghu', 'mridu', 'sthira'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [4, 5, 3, 0, 1], // Thu (Guru Pushya!), Fri, Wed, Sun (Ravi Pushya!), Mon
      badDays: [6], // Sat strictly avoided for gold buying
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'namkaran': {
      id: 'namkaran',
      nameEn: 'Child Naming (Namkaran)',
      nameTe: 'నామకరణ మహోత్సవం',
      nameSa: 'नामकरण संस्कार',
      emoji: '👶',
      description: 'Ceremonial bestowing of an auspicious Vedic name to a newborn based on planetary nakshatra sound syllables.',
      favNakshatras: ['Ashwini', 'Rohini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
      favGanas: ['mridu', 'laghu', 'sthira'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
      favDays: [0, 1, 3, 4, 5],
      badDays: [2, 6],
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'mundan': {
      id: 'mundan',
      nameEn: 'Tonsure / First Haircut (Mundan)',
      nameTe: 'చౌలము / పుట్టువెంట్రుకలు',
      nameSa: 'चूडाकरण (मुण्डन) संस्कार',
      emoji: '✂️',
      description: 'Purificatory tonsure ceremony shaving the birth hair for mental acuity, longevity, and radiance.',
      favNakshatras: ['Ashwini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Chitra', 'Swati', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Revati'],
      favGanas: ['laghu', 'chara', 'mridu'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
      favDays: [1, 3, 4, 5],
      badDays: [0, 2, 6],
      vetoChaturmas: true,
      vetoCombustion: true
    },
    'annaprashan': {
      id: 'annaprashan',
      nameEn: 'First Rice Feeding (Annaprashan)',
      nameTe: 'అన్నప్రాశన ముహూర్తం',
      nameSa: 'अन्नप्राशन संस्कार',
      emoji: '🍚',
      description: 'Introducing sacred first solid food, honey, and ghee to the child for robust vitality and intellect.',
      favNakshatras: ['Ashwini', 'Rohini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Uttara Bhadrapada', 'Revati'],
      favGanas: ['mridu', 'laghu', 'sthira'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi', 'Purnima'],
      favDays: [1, 3, 4, 5, 0],
      badDays: [2, 6],
      vetoChaturmas: false,
      vetoCombustion: false
    },
    'vidyarambha': {
      id: 'vidyarambha',
      nameEn: 'Education Start (Aksharabhyasa)',
      nameTe: 'అక్షరాభ్యాస ముహూర్తం',
      nameSa: 'विद्यारम्भ / अक्षराभ्यास',
      emoji: '📚',
      description: 'Sacred initiation into literacy, alphabets, and Vedic learning under Saraswati and Ganesha blessings in Laghu and Mridu stars.',
      favNakshatras: ['Ashwini', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Revati'],
      favGanas: ['laghu', 'mridu'],
      favTithis: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
      favDays: [3, 4, 5, 1], // Wed (Budha), Thu (Guru), Fri (Saraswati), Mon
      badDays: [2, 6, 0],
      vetoChaturmas: false,
      vetoCombustion: false
    }
  };

  // Helper to format decimal hour to 'hh:mm AM/PM'
  function formatDecimalTime(h) {
    let hour = Math.floor(h);
    let min = Math.round((h - hour) * 60);
    if (min === 60) { hour += 1; min = 0; }
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMin = min < 10 ? '0' + min : min;
    return `${displayHour}:${displayMin} ${ampm}`;
  }

  // Calculate clean auspicious window for a day
  function getCleanTimeWindow(weekday, sunriseHour = 6.0, sunsetHour = 18.0) {
    const dayLength = sunsetHour - sunriseHour;
    const part = dayLength / 8;

    // Rahu Kaal part (1-indexed)
    const rahuParts = [8, 2, 7, 5, 6, 4, 3]; // Sun=8, Mon=2, Tue=7, Wed=5, Thu=6, Fri=4, Sat=3
    const rahuPart = rahuParts[weekday];
    const rahuStart = sunriseHour + (rahuPart - 1) * part;
    const rahuEnd = sunriseHour + rahuPart * part;

    // Abhijit Muhurta (approx 11:36 AM - 12:24 PM, avoided on Wednesday)
    const midday = (sunriseHour + sunsetHour) / 2;
    const abhijitStart = midday - 0.4;
    const abhijitEnd = midday + 0.4;

    // Select candidate window
    let windowText = '';
    if (weekday === 3) {
      windowText = '08:30 AM – 10:45 AM (Labh Choghadiya)';
    } else if (rahuStart <= midday && rahuEnd >= midday) {
      windowText = '09:15 AM – 11:00 AM (Shubh Choghadiya)';
    } else {
      windowText = `${formatDecimalTime(abhijitStart)} – ${formatDecimalTime(abhijitEnd)} (Abhijit Muhurta)`;
    }

    return {
      windowText,
      rahuKaal: `${formatDecimalTime(rahuStart)} – ${formatDecimalTime(rahuEnd)}`
    };
  }

  function getPanchangEngine() {
    if (typeof PANCHANG !== 'undefined') return PANCHANG;
    if (typeof window !== 'undefined' && window.PANCHANG) return window.PANCHANG;
    if (typeof globalThis !== 'undefined' && globalThis.PANCHANG) return globalThis.PANCHANG;
    try { return require('./panchang.js').PANCHANG; } catch (e) { return null; }
  }

  // Evaluate a specific date for a ceremony using Daivajna Rama's rules
  function evaluateDay(date, categoryKey) {
    const cat = CATEGORIES[categoryKey] || CATEGORIES['vivah'];
    const pEngine = getPanchangEngine();
    if (!pEngine) {
      return { score: 50, rating: 'Average', reason: 'Panchang engine not loaded' };
    }

    const p = pEngine.getPanchangForDate(date);
    const weekday = date.getDay();
    const tithiName = p.tithi ? p.tithi.name : '';
    const nakshatraName = p.nakshatra ? p.nakshatra.name : '';
    const month = date.getMonth(); // 0-11

    // Fetch Nakshatra Gana and Special Yogas
    const gana = getNakshatraGana(nakshatraName);
    const specialYogas = checkSpecialYogas(weekday, tithiName, nakshatraName);

    let score = 50;
    let isVetoed = false;
    let vetoReason = '';

    // 1. Classical Hard Veto Checks
    // Chaturmas (roughly July to November: months 6 to 10)
    const isChaturmas = (month >= 6 && month <= 10);
    if (cat.vetoChaturmas && isChaturmas) {
      isVetoed = true;
      vetoReason = 'Chaturmas period (Devshayani to Devuthani) — sacred initiations paused.';
    }

    // Rikta Tithi (Chaturthi 4, Navami 9, Chaturdashi 14)
    const isRikta = ['Chaturthi', 'Navami', 'Chaturdashi'].includes(tithiName);
    if (isRikta && !['vyapar'].includes(cat.id)) {
      score -= 25;
      if (cat.id === 'vivah' || cat.id === 'griha-pravesh') {
        isVetoed = true;
        vetoReason = `Rikta Tithi (${tithiName}) is strictly avoided as per Muhurta Chintamani.`;
      }
    }

    // Amavasya (New Moon)
    if (tithiName === 'Amavasya') {
      score -= 30;
      isVetoed = true;
      vetoReason = 'Amavasya (New Moon) — strictly inauspicious for auspicious commencement.';
    }

    // Bad Weekday
    if (cat.badDays.includes(weekday)) {
      score -= 20;
    }

    // Specific Yoga Exceptions from Daivajna Rama
    for (const y of specialYogas) {
      if (y.vetoCeremony === cat.id) {
        isVetoed = true;
        vetoReason = y.vetoNote || `${y.nameEn} carries a classical prohibition for ${cat.nameEn}.`;
      }
    }

    // 2. Nakshatra Gana Compatibility (Muhurta Chintamani)
    if (cat.favGanas && cat.favGanas.includes(gana.id)) {
      score += 25;
    } else if (gana.id === 'ugra' || gana.id === 'tikshna') {
      // Fierce or sharp stars penalize peaceful ceremonies
      score -= 25;
      if (['vivah', 'griha-pravesh', 'swarna'].includes(cat.id)) {
        isVetoed = true;
        vetoReason = `${nakshatraName} is a ${gana.titleSa} — classical prohibition for ${cat.nameEn}.`;
      }
    }

    // Favorite Nakshatras list
    if (cat.favNakshatras.includes(nakshatraName)) {
      score += 15;
    }

    // Favorite Tithis & Days
    if (cat.favTithis.includes(tithiName)) {
      score += 15;
    }
    if (cat.favDays.includes(weekday)) {
      score += 15;
    }

    // Special Yogas Bonus
    if (specialYogas.some(y => y.id === 'amrita-siddha')) score += 20;
    if (specialYogas.some(y => y.id === 'sarvartha-siddha')) score += 15;
    if (specialYogas.some(y => y.id === 'guru-pushya' || y.id === 'ravi-pushya')) {
      score += 25;
      if (cat.id === 'swarna' || cat.id === 'sampatti' || cat.id === 'vyapar') score += 15;
    }
    if (specialYogas.some(y => y.id === 'tripushkar')) {
      if (cat.id === 'swarna' || cat.id === 'sampatti') score += 20;
    }

    // Pushya Nakshatra bonus
    if (nakshatraName === 'Pushya' && cat.id !== 'vivah') {
      score += 15;
    }

    // Clamp score
    if (isVetoed) {
      score = Math.min(score, 35);
    }
    score = Math.max(10, Math.min(98, score));

    // Determine Rating
    let rating = 'Average';
    let ratingTe = 'మధ్యమం';
    let stars = '⭐⭐⭐';
    if (score >= 82 && !isVetoed) {
      rating = 'Highly Auspicious';
      ratingTe = 'అత్యంత శుభకరం (ఉత్తమం)';
      stars = '⭐⭐⭐⭐⭐';
    } else if (score >= 65 && !isVetoed) {
      rating = 'Auspicious';
      ratingTe = 'శుభ ముహూర్తం';
      stars = '⭐⭐⭐⭐';
    } else if (score < 45 || isVetoed) {
      rating = 'Avoid';
      ratingTe = 'వర్జ్యం (అనుకూలం కాదు)';
      stars = '⭐';
    }

    // Time window & explanation
    const timing = getCleanTimeWindow(weekday);
    let reasonEn = '';
    let reasonTe = '';

    const yogaBadges = specialYogas.map(y => y.badge).join(' • ');

    if (score >= 65 && !isVetoed) {
      reasonEn = `Favorable alignment of ${nakshatraName} (${gana.titleSa}) and ${tithiName} Tithi. ${yogaBadges ? `Active Yogas: ${yogaBadges}. ` : ''}Optimal to commence within recommended window.`;
      reasonTe = `${nakshatraName} (${gana.titleSa}) మరియు ${tithiName} తిథిల దివ్య కలయిక. ${yogaBadges ? `యోగాలు: ${yogaBadges}. ` : ''}సూచించిన శుభ ఘడియలలో ప్రారంభించుట శ్రేయస్కరం.`;
    } else if (isVetoed) {
      reasonEn = vetoReason || `Classical prohibition observed in Muhurta Chintamani. Postpone to an unblemished day.`;
      reasonTe = vetoReason ? `అశుభ సమయం: ${vetoReason}` : `ముహూర్త చింతామణి నియమాల ప్రకారం ఈ రోజును నివారించి మరొక శుభ దినాన్ని ఎంచుకోవలెను.`;
    } else {
      reasonEn = `Moderately supportive day (${gana.titleSa}). Proceed strictly during the recommended Choghadiya window, avoiding Rahu Kaal (${timing.rahuKaal}).`;
      reasonTe = `సాధారణ దినం (${gana.titleSa}). రాహుకాలం (${timing.rahuKaal}) విడిచిపెట్టి, సూచించిన అమృత/శుభ ఘడియలలో మాత్రమే ప్రారంభించండి.`;
    }

    return {
      date,
      dateFormatted: date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
      category: cat,
      score,
      rating,
      ratingTe,
      stars,
      isVetoed,
      tithi: tithiName,
      nakshatra: nakshatraName,
      nakshatraGana: gana,
      specialYogas,
      timeWindow: timing.windowText,
      rahuKaal: timing.rahuKaal,
      reasonEn,
      reasonTe
    };
  }

  // Get ranked auspicious days for a month
  function getMonthMuhurats(year, month, categoryKey) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const results = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const evalResult = evaluateDay(date, categoryKey);
      results.push(evalResult);
    }

    return results;
  }

  // Get Today's quick status
  function getTodayMuhurat(categoryKey) {
    const today = new Date();
    return evaluateDay(today, categoryKey);
  }

  return {
    CATEGORIES,
    NAKSHATRA_PRAKARANA,
    getNakshatraGana,
    checkSpecialYogas,
    evaluateDay,
    getMonthMuhurats,
    getTodayMuhurat
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MUHURAT };
}
