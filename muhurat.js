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
      stellarFacing: getStellarFacing(nakshatraName),
      specialYogas,
      timeWindow: timing.windowText,
      rahuKaal: timing.rahuKaal,
      reasonEn,
      reasonTe
    };
  }

  /* ============================================================
     KALAPRAKASIKA (कालप्रकाशिका) BY SAGE NARASIMHA
     1. Stellar Motion Facing (ऊर्ध्व, अधो, तिर्यङ्मुख नक्षत्राणि)
     2. Dasa Kootas — Ten Considerations for Marriage (दश कूट निर्णयः)
     3. Mantra Siddha-Chakra (सिद्धचक्रम्)
     4. Dosha Neutralization Principles (दोषशान्तिः)
     ============================================================ */

  const STELLAR_FACING = {
    'oordhwa': {
      id: 'oordhwa',
      titleSa: 'ऊर्ध्वमुख नक्षत्र (Oordhwa-Mukha)',
      titleEn: 'Upward-Facing Stars',
      nature: 'Auspicious for ascending, erecting, growing, and elevating works',
      nakshatras: ['Rohini', 'Uttara Phalguni', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Pushya', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Ardra'],
      recommended: ['Coronation & Royal honors', 'Griha Pravesh & house foundation', 'Temple construction & hoisting flags', 'Planting tall trees and orchards', 'Laying foundation stones']
    },
    'atho': {
      id: 'atho',
      titleSa: 'अधोमुख नक्षत्र (Atho-Mukha)',
      titleEn: 'Downward-Facing Stars',
      nature: 'Auspicious for subterranean, deep, and excavating works',
      nakshatras: ['Bharani', 'Krittika', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Vishakha', 'Moola', 'Purva Ashadha', 'Purva Bhadrapada'],
      recommended: ['Digging wells, tanks & ponds', 'Underground vaults & treasure cellars', 'Mining and geological excavation', 'Setting boundary demarcations']
    },
    'thiryag': {
      id: 'thiryag',
      titleSa: 'तिर्यङ्मुख नक्षत्र (Thiryag-Mukha)',
      titleEn: 'Transverse / Horizontal-Facing Stars',
      nature: 'Auspicious for horizontal motion, voyages, vehicles, and pathways',
      nakshatras: ['Ashwini', 'Mrigashira', 'Punarvasu', 'Hasta', 'Chitra', 'Swati', 'Anuradha', 'Jyeshtha', 'Revati'],
      recommended: ['Travel, voyages & pilgrimages (Yatra)', 'Purchasing and driving vehicles (Vahana)', 'Riding horses and elephants', 'Building roads, pathways and bridges']
    }
  };

  function getStellarFacing(nakshatraName) {
    for (const [key, val] of Object.entries(STELLAR_FACING)) {
      if (val.nakshatras.includes(nakshatraName)) return val;
    }
    return STELLAR_FACING['thiryag'];
  }

  /* ------------------------------------------------------------
     THE 10 CONSIDERATIONS (दश कूटानि / DASA KOOTAS)
     Kalaprakasika Chapter XIII (Decision of Marriage)
     ------------------------------------------------------------ */
  const NAKSHATRA_ORDER = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Moola', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha',
    'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  const RASI_ORDER = [
    'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
    'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
  ];

  // 1. Dhinam: Count from Bride to Groom
  function checkDhinam(bIdx, gIdx) {
    const diff = ((gIdx - bIdx + 27) % 27) + 1; // 1-indexed
    const remainder = diff % 9;
    const isVadhaVainasika = (diff === 22 || diff === 27);
    
    // 2=Sampat, 4=Kshema, 6=Sadhaka, 8=Mitra, 0/9=Parama-Mitra
    const isAuspicious = [2, 4, 6, 8, 0].includes(remainder) && !isVadhaVainasika;
    
    let desc = '';
    if (isVadhaVainasika) {
      desc = `Count is ${diff} (Vadha-Vainasika / 22nd or 27th star) — strictly inauspicious.`;
    } else if (isAuspicious) {
      const names = { 2: 'Sampath (Fortune)', 4: 'Kshema (Well-being)', 6: 'Sadhaka (Success)', 8: 'Mitra (Friendship)', 0: 'Parama-Mitra (Intimate Love)' };
      desc = `Count is ${diff} — ${names[remainder]} brings health, longevity and mutual harmony.`;
    } else {
      const badNames = { 1: 'Jenma (Obstacle)', 3: 'Vipath (Disaster)', 5: 'Prathyara (Enmity)', 7: 'Vadham (Discord)' };
      desc = `Count is ${diff} — ${badNames[remainder]} indicates friction; requires remedial benefic aspects.`;
    }
    return { name: 'Dhinam (दिनम्)', isMatch: isAuspicious, score: isAuspicious ? 3 : 0, maxScore: 3, desc };
  }

  // 2. Ganam: Deva, Manushya, Rakshasa
  const GANA_MAP = {
    'Deva': ['Ashwini', 'Mrigashira', 'Punarvasu', 'Pushya', 'Hasta', 'Swati', 'Anuradha', 'Shravana', 'Revati'],
    'Manushya': ['Bharani', 'Rohini', 'Ardra', 'Purva Phalguni', 'Uttara Phalguni', 'Purva Ashadha', 'Uttara Ashadha', 'Purva Bhadrapada', 'Uttara Bhadrapada'],
    'Rakshasa': ['Krittika', 'Ashlesha', 'Magha', 'Chitra', 'Vishakha', 'Jyeshtha', 'Moola', 'Dhanishtha', 'Shatabhisha']
  };

  function getGana(star) {
    for (const [g, list] of Object.entries(GANA_MAP)) {
      if (list.includes(star)) return g;
    }
    return 'Manushya';
  }

  function checkGanam(bStar, gStar, bIdx, gIdx) {
    const bG = getGana(bStar);
    const gG = getGana(gStar);
    let score = 0;
    let desc = '';
    const diff = ((gIdx - bIdx + 27) % 27) + 1;

    if (bG === gG) {
      score = 6;
      desc = `Both belong to ${bG} Gana — exceptional mutual compatibility and temperamental harmony.`;
    } else if ((bG === 'Deva' && gG === 'Manushya') || (bG === 'Manushya' && gG === 'Deva')) {
      score = 4;
      desc = `Deva and Manushya union — peaceful and supportive marriage.`;
    } else if (bG === 'Rakshasa' && gG === 'Deva') {
      score = 2;
      desc = `Rakshasa bride and Deva groom — acceptable with maturity and mutual respect.`;
    } else if (diff > 14) {
      score = 3;
      desc = `Gana difference neutralized as the Bride's star is beyond the 14th star from the Groom's star (Kalaprakasika exemption).`;
    } else {
      score = 0;
      desc = `Manushya bride and Rakshasa groom within 14 stars — sharp temperamental clash; requires astrological remedies.`;
    }
    return { name: 'Ganam (गणम्)', isMatch: score >= 3, score, maxScore: 6, desc: `Bride: ${bG}, Groom: ${gG}. ${desc}` };
  }

  // 3. Mahendhram
  function checkMahendhram(bIdx, gIdx) {
    const diff = ((gIdx - bIdx + 27) % 27) + 1;
    const isM = [4, 7, 10, 13, 16, 19, 22, 25].includes(diff);
    return {
      name: 'Mahendhram (माहेन्द्रम्)',
      isMatch: isM,
      score: isM ? 1 : 0,
      maxScore: 1,
      desc: isM
        ? `Count is ${diff} — Mahendhra Yoga present! Promotes deep attachment, prosperity, and longevity of progeny.`
        : `Count is ${diff} — Mahendhra not formed (neutral).`
    };
  }

  // 4. Sthree-Dheergham
  function checkSthreeDheergham(bIdx, gIdx) {
    const diff = ((gIdx - bIdx + 27) % 27) + 1;
    const isSD = diff > 7; // beyond 7th or 13th star
    const isFull = diff > 13;
    return {
      name: 'Sthree-Dheergham (स्त्रीदीर्घम्)',
      isMatch: isSD,
      score: isFull ? 1 : (isSD ? 0.5 : 0),
      maxScore: 1,
      desc: isSD
        ? `Groom's star is ${diff} stars ahead of Bride's — bestows sustained happiness, auspicious welfare, and long life to the bride.`
        : `Groom's star is within the first 7 stars of the bride — limited Sthree-Dheergham.`
    };
  }

  // 5. Yoni (14 Animal species)
  const YONI_MAP = {
    'Ashwini': 'Horse', 'Shatabhisha': 'Horse',
    'Bharani': 'Elephant', 'Revati': 'Elephant',
    'Pushya': 'Sheep', 'Krittika': 'Sheep',
    'Rohini': 'Serpent', 'Mrigashira': 'Serpent',
    'Punarvasu': 'Cat', 'Ashlesha': 'Cat',
    'Magha': 'Rat', 'Purva Phalguni': 'Rat',
    'Uttara Phalguni': 'Cow', 'Uttara Ashadha': 'Cow', 'Uttara Bhadrapada': 'Cow',
    'Hasta': 'Buffalo', 'Swati': 'Buffalo',
    'Chitra': 'Tiger', 'Vishakha': 'Tiger',
    'Anuradha': 'Deer', 'Jyeshtha': 'Deer',
    'Moola': 'Dog', 'Ardra': 'Dog',
    'Purva Ashadha': 'Monkey', 'Shravana': 'Monkey',
    'Dhanishtha': 'Lion', 'Purva Bhadrapada': 'Lion'
  };

  const HOSTILE_YONIS = [
    ['Cow', 'Tiger'], ['Elephant', 'Lion'], ['Horse', 'Buffalo'],
    ['Dog', 'Deer'], ['Rat', 'Cat'], ['Serpent', 'Rat'], ['Monkey', 'Sheep']
  ];

  function checkYoni(bStar, gStar) {
    const bY = YONI_MAP[bStar] || 'Deer';
    const gY = YONI_MAP[gStar] || 'Deer';
    let isHostile = false;

    for (const pair of HOSTILE_YONIS) {
      if ((pair[0] === bY && pair[1] === gY) || (pair[1] === bY && pair[0] === gY)) {
        isHostile = true; break;
      }
    }

    let score = 2;
    let desc = '';
    if (bY === gY) {
      score = 4;
      desc = `Both share ${bY} Yoni — supreme biological and psychological concord!`;
    } else if (isHostile) {
      score = 0;
      desc = `Hostile Yoni clash (${bY} vs ${gY}) — mutual friction; requires mature adjustments.`;
    } else {
      score = 2;
      desc = `Neutral Yoni relationship (${bY} & ${gY}) — harmonious domestic life.`;
    }
    return { name: 'Yoni (योनिः)', isMatch: !isHostile, score, maxScore: 4, desc };
  }

  // 6. Rasi Koota
  function checkRasi(bRasiIdx, gRasiIdx) {
    const diff = ((gRasiIdx - bRasiIdx + 12) % 12) + 1;
    // Kalaprakasika exemptions for 6/8: Aries/Virgo, Taurus/Sagittarius, Gemini/Scorpio, Cancer/Aquarius, Leo/Capricorn, Libra/Pisces
    const isExempt68 = (diff === 6 || diff === 8) && (
      (bRasiIdx === 0 && gRasiIdx === 5) || (bRasiIdx === 5 && gRasiIdx === 0) ||
      (bRasiIdx === 1 && gRasiIdx === 8) || (bRasiIdx === 8 && gRasiIdx === 1) ||
      (bRasiIdx === 2 && gRasiIdx === 7) || (bRasiIdx === 7 && gRasiIdx === 2) ||
      (bRasiIdx === 3 && gRasiIdx === 10) || (bRasiIdx === 10 && gRasiIdx === 3) ||
      (bRasiIdx === 4 && gRasiIdx === 9) || (bRasiIdx === 9 && gRasiIdx === 4) ||
      (bRasiIdx === 6 && gRasiIdx === 11) || (bRasiIdx === 11 && gRasiIdx === 6)
    );

    let score = 0;
    let desc = '';
    if (diff === 7) {
      score = 7;
      desc = `Sama-Saptaka (7th sign opposite) — supreme planetary harmony and lifelong happiness.`;
    } else if ([3, 4, 10, 11].includes(diff)) {
      score = 7;
      desc = `Groom Rasi is ${diff}th from Bride — fosters family expansion, wealth, and mutual support.`;
    } else if (diff === 2 && (gRasiIdx % 2 === 1)) {
      // Even sign exemption
      score = 5;
      desc = `2nd house position in an even sign (Kalaprakasika exemption) — auspicious longevity.`;
    } else if (isExempt68) {
      score = 5;
      desc = `Shadashtaka (6/8) cancelled by Sage Narasimha's classical friendship exemption.`;
    } else if (diff === 1) {
      score = 5;
      desc = `Same Moon Sign (Eka Rasi) — harmonious shared mental wavelengths.`;
    } else {
      score = 0;
      desc = `Rasi distance ${diff} indicates Dwi-Dwadasha (2/12) or uncancelled Shadashtaka (6/8); requires benefic planetary aspects.`;
    }
    return { name: 'Rasi (राशिः)', isMatch: score >= 5, score, maxScore: 7, desc };
  }

  // 7. Rasyadhipathi (Friendship of sign lords)
  const PLANET_FRIENDS = {
    'Surya': ['Chandra', 'Mangala', 'Guru'],
    'Chandra': ['Surya', 'Budha'],
    'Mangala': ['Surya', 'Chandra', 'Guru'],
    'Budha': ['Surya', 'Shukra'],
    'Guru': ['Surya', 'Chandra', 'Mangala'],
    'Shukra': ['Budha', 'Shani'],
    'Shani': ['Budha', 'Shukra']
  };

  const RASI_LORDS = ['Mangala', 'Shukra', 'Budha', 'Chandra', 'Surya', 'Budha', 'Shukra', 'Mangala', 'Guru', 'Shani', 'Shani', 'Guru'];

  function checkRasyadhipathi(bRasiIdx, gRasiIdx) {
    const bLord = RASI_LORDS[bRasiIdx];
    const gLord = RASI_LORDS[gRasiIdx];
    let score = 0;
    let desc = '';

    if (bLord === gLord) {
      score = 5;
      desc = `Same sign lord (${bLord}) — supreme mental fellowship and shared family values.`;
    } else {
      const bFr = (PLANET_FRIENDS[bLord] || []).includes(gLord);
      const gFr = (PLANET_FRIENDS[gLord] || []).includes(bLord);
      if (bFr && gFr) {
        score = 5;
        desc = `Mutual friendship between ${bLord} and ${gLord} — enduring peace and goodwill.`;
      } else if (bFr || gFr) {
        score = 3;
        desc = `Friendly relationship between ${bLord} and ${gLord} — cordial and supportive union.`;
      } else {
        score = 1;
        desc = `Neutral or restrained relationship between ${bLord} and ${gLord}.`;
      }
    }
    return { name: 'Rasyadhipathi (राश्याधिपतिः)', isMatch: score >= 3, score, maxScore: 5, desc };
  }

  // 8. Vasyam
  const VASYAM_PAIRS = {
    0: [4, 7], 1: [3, 4], 2: [5], 3: [7, 8], 4: [6], 5: [2, 11],
    6: [9], 7: [5, 3], 8: [11], 9: [10, 0], 10: [0], 11: [9]
  };

  function checkVasyam(bRasiIdx, gRasiIdx) {
    const bV = (VASYAM_PAIRS[bRasiIdx] || []).includes(gRasiIdx);
    const gV = (VASYAM_PAIRS[gRasiIdx] || []).includes(bRasiIdx);
    const isV = bV || gV;
    return {
      name: 'Vasyam (वश्यम्)',
      isMatch: isV,
      score: isV ? 2 : 0,
      maxScore: 2,
      desc: isV
        ? 'Mutual Vasyam present! Fosters natural emotional attraction, mutual surrender, and harmony.'
        : 'Vasyam is neutral.'
    };
  }

  // 9. Rajju (5 Divisions) — Fundamental & Mandatory!
  const RAJJU_GROUPS = {
    'Padha': ['Ashwini', 'Ashlesha', 'Magha', 'Jyeshtha', 'Moola', 'Revati'],
    'Ooroo': ['Bharani', 'Pushya', 'Purva Phalguni', 'Anuradha', 'Purva Ashadha', 'Uttara Bhadrapada'],
    'Nabhi': ['Krittika', 'Punarvasu', 'Uttara Phalguni', 'Vishakha', 'Uttara Ashadha', 'Purva Bhadrapada'],
    'Kanta': ['Rohini', 'Ardra', 'Hasta', 'Swati', 'Shravana', 'Shatabhisha'],
    'Siro': ['Mrigashira', 'Chitra', 'Dhanishtha']
  };

  function getRajju(star) {
    for (const [r, list] of Object.entries(RAJJU_GROUPS)) {
      if (list.includes(star)) return r;
    }
    return 'Kanta';
  }

  function checkRajju(bStar, gStar, bRasiIdx, gRasiIdx) {
    const bR = getRajju(bStar);
    const gR = getRajju(gStar);
    const isSame = (bR === gR);

    // Kalaprakasika Exemption: Same Rasi lord or friendly lords or Sama-Saptaka cancels Rajju dosha!
    const bLord = RASI_LORDS[bRasiIdx];
    const gLord = RASI_LORDS[gRasiIdx];
    const isExempt = (bLord === gLord) || (Math.abs(bRasiIdx - gRasiIdx) === 6);

    let isMatch = !isSame || isExempt;
    let desc = '';
    if (!isSame) {
      desc = `Different Rajjus (Bride: ${bR} Rajju, Groom: ${gR} Rajju) — Auspicious! Blesses the union with prolonged wedded bliss (Deergha Sumangali Yoga).`;
    } else if (isExempt) {
      desc = `Both belong to ${bR} Rajju, but cancelled by Sage Narasimha's classical exemption (shared lord or Sama-Saptaka signs).`;
    } else {
      const threats = { 'Siro': 'threatens longevity of the groom', 'Kanta': 'threatens health of the bride', 'Nabhi': 'affects welfare of progeny', 'Ooroo': 'causes financial drain', 'Padha': 'causes frequent distant separations' };
      desc = `Rajju Dosha: Both belong to ${bR} Rajju (${threats[bR] || 'discord'}). Requires special Vedic remedies.`;
    }
    return { name: 'Rajju (रज्जुः)', isMatch, score: isMatch ? 5 : 0, maxScore: 5, hasDosha: isSame && !isExempt, desc };
  }

  // 10. Vedhai (13 Repellent pairs)
  const VEDHAI_PAIRS = [
    ['Ashwini', 'Jyeshtha'], ['Bharani', 'Anuradha'], ['Krittika', 'Vishakha'],
    ['Rohini', 'Swati'], ['Ardra', 'Shravana'], ['Punarvasu', 'Uttara Ashadha'],
    ['Pushya', 'Purva Ashadha'], ['Ashlesha', 'Moola'], ['Magha', 'Revati'],
    ['Purva Phalguni', 'Uttara Bhadrapada'], ['Uttara Phalguni', 'Purva Bhadrapada'],
    ['Hasta', 'Shatabhisha'], ['Mrigashira', 'Chitra'], ['Chitra', 'Dhanishtha'], ['Mrigashira', 'Dhanishtha']
  ];

  function checkVedhai(bStar, gStar, bRasiIdx, gRasiIdx) {
    let isRepellent = false;
    for (const pair of VEDHAI_PAIRS) {
      if ((pair[0] === bStar && pair[1] === gStar) || (pair[1] === bStar && pair[0] === gStar)) {
        isRepellent = true; break;
      }
    }

    const bLord = RASI_LORDS[bRasiIdx];
    const gLord = RASI_LORDS[gRasiIdx];
    const isExempt = (bLord === gLord) || (Math.abs(bRasiIdx - gRasiIdx) === 6);

    let isMatch = !isRepellent || isExempt;
    let desc = '';
    if (!isRepellent) {
      desc = 'Vedhai clear — stars are free from mutual stellar repulsion; promotes flourishing progeny and harmony.';
    } else if (isExempt) {
      desc = `Vedhai pair observed (${bStar} and ${gStar}), but neutralized by Sage Narasimha's Rasyadhipathi exemption.`;
    } else {
      desc = `Vedhai Dosha: ${bStar} and ${gStar} are mutually repellent asterisms. Strictly avoided without special propitiation.`;
    }
    return { name: 'Vedhai (वेधः)', isMatch, score: isMatch ? 2 : 0, maxScore: 2, hasDosha: isRepellent && !isExempt, desc };
  }

  // Complete Dasa Kootas Evaluation Wrapper
  function calculateDasaKootas(brideStar, groomStar, brideRasi, groomRasi) {
    const bIdx = NAKSHATRA_ORDER.indexOf(brideStar) >= 0 ? NAKSHATRA_ORDER.indexOf(brideStar) : 0;
    const gIdx = NAKSHATRA_ORDER.indexOf(groomStar) >= 0 ? NAKSHATRA_ORDER.indexOf(groomStar) : 0;
    const bRasiIdx = RASI_ORDER.indexOf(brideRasi) >= 0 ? RASI_ORDER.indexOf(brideRasi) : 0;
    const gRasiIdx = RASI_ORDER.indexOf(groomRasi) >= 0 ? RASI_ORDER.indexOf(groomRasi) : 0;

    const kootas = [
      checkDhinam(bIdx, gIdx),
      checkGanam(brideStar, groomStar, bIdx, gIdx),
      checkMahendhram(bIdx, gIdx),
      checkSthreeDheergham(bIdx, gIdx),
      checkYoni(brideStar, groomStar),
      checkRasi(bRasiIdx, gRasiIdx),
      checkRasyadhipathi(bRasiIdx, gRasiIdx),
      checkVasyam(bRasiIdx, gRasiIdx),
      checkRajju(brideStar, groomStar, bRasiIdx, gRasiIdx),
      checkVedhai(brideStar, groomStar, bRasiIdx, gRasiIdx)
    ];

    let totalScore = 0;
    let maxScore = 0;
    let matchedCount = 0;
    let rajjuDosha = false;
    let vedhaiDosha = false;

    kootas.forEach(k => {
      totalScore += k.score;
      maxScore += k.maxScore;
      if (k.isMatch) matchedCount++;
      if (k.hasDosha && k.name.includes('Rajju')) rajjuDosha = true;
      if (k.hasDosha && k.name.includes('Vedhai')) vedhaiDosha = true;
    });

    const percentage = Math.round((totalScore / maxScore) * 100);

    let verdict = 'Uttamam (Highly Auspicious)';
    let verdictClass = 'badge-excellent';
    if (rajjuDosha || vedhaiDosha || matchedCount < 5 || percentage < 50) {
      verdict = 'Varjyam (Dosha Observed / Consult Pandit)';
      verdictClass = 'badge-avoid';
    } else if (percentage >= 70 && matchedCount >= 7) {
      verdict = 'Uttamam (Supreme Compatibility)';
      verdictClass = 'badge-excellent';
    } else {
      verdict = 'Madhyamam (Good / Favorable)';
      verdictClass = 'badge-good';
    }

    return {
      brideStar, groomStar, brideRasi, groomRasi,
      kootas,
      matchedCount,
      totalKootas: 10,
      totalScore,
      maxScore,
      percentage,
      rajjuDosha,
      vedhaiDosha,
      verdict,
      verdictClass,
      ruleText: 'As per Kalaprakasika Chapter XIII: At least 5 out of 10 Considerations must agree. Dhinam and Rajju are paramount for long wedded life.'
    };
  }

  /* ------------------------------------------------------------
     MANTRA SIDDHA-CHAKRA (4x4 MATRIX)
     Kalaprakasika Chapter X (Initiation in a Manthra)
     ------------------------------------------------------------ */
  const SANSKRIT_ALPHABET = [
    'a', 'aa', 'i', 'ii', 'u', 'uu', 'ri', 'rii', 'lri', 'e', 'ai', 'o', 'au', 'am', 'ah',
    'ka', 'kha', 'ga', 'gha', 'nga',
    'cha', 'chha', 'ja', 'jha', 'nya',
    'ta', 'tha', 'da', 'dha', 'na',
    'ta2', 'tha2', 'da2', 'dha2', 'na2',
    'pa', 'pha', 'ba', 'bha', 'ma',
    'ya', 'ra', 'la', 'va', 'sha', 'sha2', 'sa', 'ha', 'ksha'
  ];

  function getMantraChakra(seekerName, mantraName) {
    const sChar = (seekerName || 'a').trim().toLowerCase()[0];
    const mChar = (mantraName || 'o').trim().toLowerCase()[0];

    const sCode = sChar.charCodeAt(0) % 4;
    const mCode = mChar.charCodeAt(0) % 4;

    const squares = ['Siddha', 'Saddhya', 'Swasiddha', 'Ari'];
    const cages = [
      ['Siddha-Siddham', 'Siddha-Saddhyam', 'Siddha-Swasiddham', 'Siddha-Ari'],
      ['Saddhya-Siddham', 'Saddhya-Saddhyam', 'Saddhya-Swasiddham', 'Saddhya-Ari'],
      ['Swasiddha-Siddham', 'Swasiddha-Saddhyam', 'Swasiddha-Swasiddham', 'Swasiddha-Ari'],
      ['Ari-Siddham', 'Ari-Saddhyam', 'Ari-Swasiddham', 'Ari-Ari']
    ];

    const cageResult = cages[sCode][mCode];
    let fruition = '';
    let recommendation = '';

    if (cageResult.includes('Swasiddham') || cageResult === 'Siddha-Siddham') {
      fruition = 'Immediate Siddhi & Divine Grace';
      recommendation = 'Reciting the mantra half the required count brings instantaneous blessings and spiritual awakening.';
    } else if (cageResult.includes('Saddhyam')) {
      fruition = 'Progressive Fulfillment with Devotion';
      recommendation = 'Recite the full count as prescribed by the Gurus to unlock the mantra devata power.';
    } else if (cageResult.includes('Ari')) {
      fruition = 'Cautionary Alignment';
      recommendation = 'Sage Narasimha prescribes initiation under a realized Guru with Kavacha protection or chanting Mahamrityunjaya.';
    } else {
      fruition = 'Steady Spiritual Attainment';
      recommendation = 'Pure dedication and regular japa brings lasting peace and focus.';
    }

    return {
      seekerName, mantraName,
      userSquare: squares[sCode],
      sRow: sCode,
      mCol: mCode,
      squares,
      cages,
      cageResult,
      fruition,
      recommendation,
      shlokaRef: 'Kalaprakasika Chapter X (Initiation in a Manthra): Siddha Chakra 16-Square Diagram'
    };
  }

  /* ============================================================
     DIRECTORY OF 12 RASIS & 27 NAKSHATRAS
     Birth Date (DOB) Rasi & Nakshatra Calculation Engine
     ============================================================ */

  const RASI_DETAILS = [
    {
      id: 'Mesha',
      nameSa: 'मेष (Mesha)',
      nameTe: 'మేషం (Aries)',
      symbol: '♈ Ram',
      lord: 'Kuja / Mangala (Mars)',
      element: 'Agni (Fire)',
      quality: 'Chara (Movable)',
      gemstone: 'Red Coral (పగడం)',
      color: 'Red / Saffron',
      padas: 'Ashwini (1, 2, 3, 4), Bharani (1, 2, 3, 4), Krittika (1)',
      description: 'Dynamic, courageous, pioneering, and natural leaders full of energy and vigor.'
    },
    {
      id: 'Vrishabha',
      nameSa: 'वृषभ (Vrishabha)',
      nameTe: 'వృషభం (Taurus)',
      symbol: '♉ Bull',
      lord: 'Shukra (Venus)',
      element: 'Prithvi (Earth)',
      quality: 'Sthira (Fixed)',
      gemstone: 'Diamond (వజ్రం)',
      color: 'White / Cream / Silver',
      padas: 'Krittika (2, 3, 4), Rohini (1, 2, 3, 4), Mrigashira (1, 2)',
      description: 'Steadfast, patient, artistic, lovers of luxury, music, fine food, and stability.'
    },
    {
      id: 'Mithuna',
      nameSa: 'मिथुन (Mithuna)',
      nameTe: 'మిథునం (Gemini)',
      symbol: '♊ Twins',
      lord: 'Budha (Mercury)',
      element: 'Vayu (Air)',
      quality: 'Dwiswabhava (Dual)',
      gemstone: 'Emerald (మరకతం)',
      color: 'Green',
      padas: 'Mrigashira (3, 4), Ardra (1, 2, 3, 4), Punarvasu (1, 2, 3)',
      description: 'Intellectual, communicative, witty, versatile, and endowed with sharp analytical prowess.'
    },
    {
      id: 'Karka',
      nameSa: 'कर्क (Karka)',
      nameTe: 'కర్కాటకం (Cancer)',
      symbol: '♋ Crab',
      lord: 'Chandra (Moon)',
      element: 'Jala (Water)',
      quality: 'Chara (Movable)',
      gemstone: 'Pearl (ముత్యం)',
      color: 'Pearl White / Silver',
      padas: 'Punarvasu (4), Pushya (1, 2, 3, 4), Ashlesha (1, 2, 3, 4)',
      description: 'Empathetic, nurturing, deeply intuitive, family-oriented, and emotionally protective.'
    },
    {
      id: 'Simha',
      nameSa: 'सिंह (Simha)',
      nameTe: 'సింహం (Leo)',
      symbol: '♌ Lion',
      lord: 'Surya (Sun)',
      element: 'Agni (Fire)',
      quality: 'Sthira (Fixed)',
      gemstone: 'Ruby (మాణిక్యం)',
      color: 'Gold / Orange',
      padas: 'Magha (1, 2, 3, 4), Purva Phalguni (1, 2, 3, 4), Uttara Phalguni (1)',
      description: 'Regal, magnanimous, authoritative, generous, dignified, and natural commanders.'
    },
    {
      id: 'Kanya',
      nameSa: 'कन्या (Kanya)',
      nameTe: 'కన్య (Virgo)',
      symbol: '♍ Maiden',
      lord: 'Budha (Mercury)',
      element: 'Prithvi (Earth)',
      quality: 'Dwiswabhava (Dual)',
      gemstone: 'Emerald (మరకతం)',
      color: 'Emerald Green',
      padas: 'Uttara Phalguni (2, 3, 4), Hasta (1, 2, 3, 4), Chitra (1, 2)',
      description: 'Methodical, detail-oriented, analytical, service-minded, and intellectually sharp.'
    },
    {
      id: 'Tula',
      nameSa: 'तुला (Tula)',
      nameTe: 'తుల (Libra)',
      symbol: '♎ Balance Scales',
      lord: 'Shukra (Venus)',
      element: 'Vayu (Air)',
      quality: 'Chara (Movable)',
      gemstone: 'Diamond (వజ్రం)',
      color: 'White / Sky Blue',
      padas: 'Chitra (3, 4), Swati (1, 2, 3, 4), Vishakha (1, 2, 3)',
      description: 'Harmonious, just, diplomatic, aesthetic lovers of balance, peace, and partnership.'
    },
    {
      id: 'Vrischika',
      nameSa: 'वृश्चिक (Vrischika)',
      nameTe: 'వృశ్చికం (Scorpio)',
      symbol: '♏ Scorpion',
      lord: 'Kuja / Mangala (Mars)',
      element: 'Jala (Water)',
      quality: 'Sthira (Fixed)',
      gemstone: 'Red Coral (పగడం)',
      color: 'Deep Red / Maroon',
      padas: 'Vishakha (4), Anuradha (1, 2, 3, 4), Jyeshtha (1, 2, 3, 4)',
      description: 'Profoundly intuitive, passionate, determined, secretive, and spiritually transformative.'
    },
    {
      id: 'Dhanu',
      nameSa: 'धनु (Dhanu)',
      nameTe: 'ధనుస్సు (Sagittarius)',
      symbol: '♐ Archer / Bow',
      lord: 'Guru (Jupiter)',
      element: 'Agni (Fire)',
      quality: 'Dwiswabhava (Dual)',
      gemstone: 'Yellow Sapphire (పుష్యరాగం)',
      color: 'Yellow / Gold',
      padas: 'Moola (1, 2, 3, 4), Purva Ashadha (1, 2, 3, 4), Uttara Ashadha (1)',
      description: 'Philosophical, optimistic, truth-seeking, righteous, adventurous, and scholarly.'
    },
    {
      id: 'Makara',
      nameSa: 'मकर (Makara)',
      nameTe: 'మకరం (Capricorn)',
      symbol: '♑ Sea-Monster / Crocodile',
      lord: 'Shani (Saturn)',
      element: 'Prithvi (Earth)',
      quality: 'Chara (Movable)',
      gemstone: 'Blue Sapphire (నీలం)',
      color: 'Dark Blue / Black',
      padas: 'Uttara Ashadha (2, 3, 4), Shravana (1, 2, 3, 4), Dhanishtha (1, 2)',
      description: 'Disciplined, industrious, perseverant, strategic, prudent, and persevering.'
    },
    {
      id: 'Kumbha',
      nameSa: 'कुम्भ (Kumbha)',
      nameTe: 'కుంభం (Aquarius)',
      symbol: '♒ Water Bearer',
      lord: 'Shani (Saturn)',
      element: 'Vayu (Air)',
      quality: 'Sthira (Fixed)',
      gemstone: 'Blue Sapphire (నీలం)',
      color: 'Electric Blue / Cyan',
      padas: 'Dhanishtha (3, 4), Shatabhisha (1, 2, 3, 4), Purva Bhadrapada (1, 2, 3)',
      description: 'Visionary, humanitarian, philosophical, unconventional, and universal thinkers.'
    },
    {
      id: 'Meena',
      nameSa: 'मीन (Meena)',
      nameTe: 'మీనం (Pisces)',
      symbol: '♓ Two Fishes',
      lord: 'Guru (Jupiter)',
      element: 'Jala (Water)',
      quality: 'Dwiswabhava (Dual)',
      gemstone: 'Yellow Sapphire (పుష్యరాగం)',
      color: 'Yellow / Saffron',
      padas: 'Purva Bhadrapada (4), Uttara Bhadrapada (1, 2, 3, 4), Revati (1, 2, 3, 4)',
      description: 'Compassionate, devotional, mystic, spiritually inclined, intuitive, and benevolent.'
    }
  ];

  const NAKSHATRA_DETAILS = [
    {
      index: 1, name: 'Ashwini', nameSa: 'अश्विनी', nameTe: 'అశ్విని',
      lord: 'Ketu', deity: 'Ashvini Kumaras (Divine Physicians)',
      gana: 'Deva', yoni: 'Horse (గుర్రం)', rajju: 'Padha (పాదం)',
      facing: 'Thiryag-Mukha (Horizontal)', prakarana: 'Kshipra / Laghu',
      rasiSpan: 'Mesha (Padas 1, 2, 3, 4)',
      goodDeeds: 'Medical treatments, healing, starting journeys, acquiring vehicles, study of scriptures.'
    },
    {
      index: 2, name: 'Bharani', nameSa: 'भरणी', nameTe: 'భరణి',
      lord: 'Shukra (Venus)', deity: 'Yama Dharmaraja (Lord of Dharma & Time)',
      gana: 'Manushya', yoni: 'Elephant (ఏనుగు)', rajju: 'Ooroo (తొడ)',
      facing: 'Atho-Mukha (Downward)', prakarana: 'Ugra / Krura',
      rasiSpan: 'Mesha (Padas 1, 2, 3, 4)',
      goodDeeds: 'Demolition, underground research, severe austerities, overcoming adversaries.'
    },
    {
      index: 3, name: 'Krittika', nameSa: 'कृत्तिका', nameTe: 'కృత్తిక',
      lord: 'Surya (Sun)', deity: 'Agni Deva (Sacred Fire)',
      gana: 'Rakshasa', yoni: 'Sheep / Goat (గొర్రె)', rajju: 'Nabhi (నాభి)',
      facing: 'Atho-Mukha (Downward)', prakarana: 'Mishra / Sadharana',
      rasiSpan: 'Mesha (Pada 1) & Vrishabha (Padas 2, 3, 4)',
      goodDeeds: 'Agnihotra havans, metallurgy, clearing debts, fire ceremonies, purification rituals.'
    },
    {
      index: 4, name: 'Rohini', nameSa: 'रोहिणी', nameTe: 'రోహిణి',
      lord: 'Chandra (Moon)', deity: 'Brahma / Prajapati (Creator of the Cosmos)',
      gana: 'Manushya', yoni: 'Serpent (పాము)', rajju: 'Kanta (కంఠం)',
      facing: 'Oordhwa-Mukha (Upward)', prakarana: 'Dhruva / Sthira',
      rasiSpan: 'Vrishabha (Padas 1, 2, 3, 4)',
      goodDeeds: 'Griha Pravesh, weddings, buying land/property, planting trees, wearing new garments.'
    },
    {
      index: 5, name: 'Mrigashira', nameSa: 'मृगशिरा', nameTe: 'మృగశిర',
      lord: 'Mangala (Mars)', deity: 'Soma (Moon God / Nectar of Immortality)',
      gana: 'Deva', yoni: 'Serpent (పాము)', rajju: 'Siro (శిరస్సు)',
      facing: 'Thiryag-Mukha (Horizontal)', prakarana: 'Mridu / Maitra',
      rasiSpan: 'Vrishabha (Padas 1, 2) & Mithuna (Padas 3, 4)',
      goodDeeds: 'Music, arts, weddings, friendship, wearing gems, beginning research, journeys.'
    },
    {
      index: 6, name: 'Ardra', nameSa: 'आर्द्रा', nameTe: 'ఆర్ద్ర',
      lord: 'Rahu', deity: 'Rudra (Fierce Aspect of Shiva)',
      gana: 'Manushya', yoni: 'Dog (కుక్క)', rajju: 'Kanta (కంఠం)',
      facing: 'Oordhwa-Mukha (Upward)', prakarana: 'Tikshna / Daruna',
      rasiSpan: 'Mithuna (Padas 1, 2, 3, 4)',
      goodDeeds: 'Destruction of negative habits, intense research, surgery, breaking bindings.'
    },
    {
      index: 7, name: 'Punarvasu', nameSa: 'पुनर्वसु', nameTe: 'పునర్వసు',
      lord: 'Guru (Jupiter)', deity: 'Aditi (Mother of the Cosmic Adityas)',
      gana: 'Deva', yoni: 'Cat (పిల్లి)', rajju: 'Nabhi (నాభి)',
      facing: 'Thiryag-Mukha (Horizontal)', prakarana: 'Chala / Chara',
      rasiSpan: 'Mithuna (Padas 1, 2, 3) & Karka (Pada 4)',
      goodDeeds: 'Renewal of enterprises, returning home, pilgrimages, taking medicine, starting business.'
    },
    {
      index: 8, name: 'Pushya', nameSa: 'पुष्य', nameTe: 'పుష్యమి',
      lord: 'Shani (Saturn)', deity: 'Brihaspati (Spiritual Guru of the Gods)',
      gana: 'Deva', yoni: 'Sheep / Goat (గొర్రె)', rajju: 'Ooroo (తొడ)',
      facing: 'Oordhwa-Mukha (Upward)', prakarana: 'Kshipra / Laghu',
      rasiSpan: 'Karka (Padas 1, 2, 3, 4)',
      goodDeeds: 'Foremost star for buying Gold (Ravi/Guru Pushya), initiation into Mantras, ceremonies.'
    },
    {
      index: 9, name: 'Ashlesha', nameSa: 'आश्लेषा', nameTe: 'ఆశ్లేష',
      lord: 'Budha (Mercury)', deity: 'Sarpas (Naga Divine Serpents)',
      gana: 'Rakshasa', yoni: 'Cat (పిల్లి)', rajju: 'Padha (పాదం)',
      facing: 'Atho-Mukha (Downward)', prakarana: 'Tikshna / Daruna',
      rasiSpan: 'Karka (Padas 1, 2, 3, 4)',
      goodDeeds: 'Kundalini yoga, occult sciences, defense strategy, herbal medicine collection.'
    },
    {
      index: 10, name: 'Magha', nameSa: 'मघा', nameTe: 'మఖ',
      lord: 'Ketu', deity: 'Pitris (Venerated Ancestral Forefathers)',
      gana: 'Rakshasa', yoni: 'Rat (ఎలుక)', rajju: 'Padha (పాదం)',
      facing: 'Atho-Mukha (Downward)', prakarana: 'Ugra / Krura',
      rasiSpan: 'Simha (Padas 1, 2, 3, 4)',
      goodDeeds: 'Ancestral ceremonies (Tarpana/Shraddha), assuming leadership, historical research.'
    },
    {
      index: 11, name: 'Purva Phalguni', nameSa: 'पूर्वफाल्गुनी', nameTe: 'పూర్వఫల్గుని',
      lord: 'Shukra (Venus)', deity: 'Bhaga (God of Fortune & Prosperity)',
      gana: 'Manushya', yoni: 'Rat (ఎలుక)', rajju: 'Ooroo (తొడ)',
      facing: 'Atho-Mukha (Downward)', prakarana: 'Ugra / Krura',
      rasiSpan: 'Simha (Padas 1, 2, 3, 4)',
      goodDeeds: 'Fine arts, music, romance, theater, leisure, creative ventures.'
    },
    {
      index: 12, name: 'Uttara Phalguni', nameSa: 'उत्तरफाल्गुनी', nameTe: 'ఉత్తరఫల్గుని',
      lord: 'Surya (Sun)', deity: 'Aryaman (God of Friendship & Contracts)',
      gana: 'Manushya', yoni: 'Cow (ఆవు)', rajju: 'Nabhi (నాభి)',
      facing: 'Oordhwa-Mukha (Upward)', prakarana: 'Dhruva / Sthira',
      rasiSpan: 'Simha (Pada 1) & Kanya (Padas 2, 3, 4)',
      goodDeeds: 'Marriage ceremonies, signing covenants, real estate acquisition, philanthropy.'
    },
    {
      index: 13, name: 'Hasta', nameSa: 'हस्त', nameTe: 'హస్త',
      lord: 'Chandra (Moon)', deity: 'Savitur (Sun God of Vital Energy & Light)',
      gana: 'Deva', yoni: 'Buffalo (గేదె)', rajju: 'Kanta (కంఠం)',
      facing: 'Thiryag-Mukha (Horizontal)', prakarana: 'Kshipra / Laghu',
      rasiSpan: 'Kanya (Padas 1, 2, 3, 4)',
      goodDeeds: 'Handicrafts, commercial trading, buying gold, medicine preparation, art.'
    },
    {
      index: 14, name: 'Chitra', nameSa: 'चित्रा', nameTe: 'చిత్త',
      lord: 'Mangala (Mars)', deity: 'Tvashtar / Vishvakarma (Architect of the Universe)',
      gana: 'Rakshasa', yoni: 'Tiger (పులి)', rajju: 'Siro (శిరస్సు)',
      facing: 'Thiryag-Mukha (Horizontal)', prakarana: 'Mridu / Maitra',
      rasiSpan: 'Kanya (Padas 1, 2) & Tula (Padas 3, 4)',
      goodDeeds: 'Architecture, design, gem cutting, interior decor, photography, weddings.'
    },
    {
      index: 15, name: 'Swati', nameSa: 'स्वाती', nameTe: 'స్వాతి',
      lord: 'Rahu', deity: 'Vayu (Lord of Wind & Prana)',
      gana: 'Deva', yoni: 'Buffalo (గేదె)', rajju: 'Kanta (కంఠం)',
      facing: 'Thiryag-Mukha (Horizontal)', prakarana: 'Chala / Chara',
      rasiSpan: 'Tula (Padas 1, 2, 3, 4)',
      goodDeeds: 'Business expansion, aviation, learning technology, travel, purchasing cars.'
    },
    {
      index: 16, name: 'Vishakha', nameSa: 'विशाखा', nameTe: 'విశాఖ',
      lord: 'Guru (Jupiter)', deity: 'Indragni (Indra & Agni united)',
      gana: 'Rakshasa', yoni: 'Tiger (పులి)', rajju: 'Nabhi (నాభి)',
      facing: 'Atho-Mukha (Downward)', prakarana: 'Mishra / Sadharana',
      rasiSpan: 'Tula (Padas 1, 2, 3) & Vrischika (Pada 4)',
      goodDeeds: 'Triumph over competition, achieving complex goals, vows, ceremonies of devotion.'
    },
    {
      index: 17, name: 'Anuradha', nameSa: 'अनुराधा', nameTe: 'అనూరాధ',
      lord: 'Shani (Saturn)', deity: 'Mitra (Divine Deity of Friendship & Compassion)',
      gana: 'Deva', yoni: 'Deer / Hare (జింక)', rajju: 'Ooroo (తొడ)',
      facing: 'Thiryag-Mukha (Horizontal)', prakarana: 'Mridu / Maitra',
      rasiSpan: 'Vrischika (Padas 1, 2, 3, 4)',
      goodDeeds: 'Weddings, deep friendships, meditation, music, spiritual pilgrimages.'
    },
    {
      index: 18, name: 'Jyeshtha', nameSa: 'ज्येष्ठा', nameTe: 'జ్యేష్ఠ',
      lord: 'Budha (Mercury)', deity: 'Indra (Sovereign Lord of the Heavens)',
      gana: 'Rakshasa', yoni: 'Deer / Hare (జింక)', rajju: 'Padha (పాదం)',
      facing: 'Thiryag-Mukha (Horizontal)', prakarana: 'Tikshna / Daruna',
      rasiSpan: 'Vrischika (Padas 1, 2, 3, 4)',
      goodDeeds: 'Administrative management, legal defence, heroic endeavors, courage in adversity.'
    },
    {
      index: 19, name: 'Moola', nameSa: 'मूल', nameTe: 'మూల',
      lord: 'Ketu', deity: 'Nirriti (Goddess of Deep Roots & Transformation)',
      gana: 'Rakshasa', yoni: 'Dog (కుక్క)', rajju: 'Padha (పాదం)',
      facing: 'Atho-Mukha (Downward)', prakarana: 'Tikshna / Daruna',
      rasiSpan: 'Dhanu (Padas 1, 2, 3, 4)',
      goodDeeds: 'Herbal medicine, research into root causes, intense introspection, philosophy.'
    },
    {
      index: 20, name: 'Purva Ashadha', nameSa: 'पूर्वाषाढा', nameTe: 'పూర్వాషాఢ',
      lord: 'Shukra (Venus)', deity: 'Apas (Cosmic Deified Waters)',
      gana: 'Manushya', yoni: 'Monkey (కోతి)', rajju: 'Ooroo (తొడ)',
      facing: 'Atho-Mukha (Downward)', prakarana: 'Ugra / Krura',
      rasiSpan: 'Dhanu (Padas 1, 2, 3, 4)',
      goodDeeds: 'Sea voyages, construction of water reservoirs, settling disputes, art.'
    },
    {
      index: 21, name: 'Uttara Ashadha', nameSa: 'उत्तराषाढा', nameTe: 'ఉత్తరాషాఢ',
      lord: 'Surya (Sun)', deity: 'Vishvedevas (All the Universal Gods of Virtue)',
      gana: 'Manushya', yoni: 'Mongoose (ముంగిస)', rajju: 'Nabhi (నాభి)',
      facing: 'Oordhwa-Mukha (Upward)', prakarana: 'Dhruva / Sthira',
      rasiSpan: 'Dhanu (Pada 1) & Makara (Padas 2, 3, 4)',
      goodDeeds: 'Laying property foundations, permanent contracts, building houses, government work.'
    },
    {
      index: 22, name: 'Shravana', nameSa: 'श्रवण', nameTe: 'శ్రవణం',
      lord: 'Chandra (Moon)', deity: 'Lord Maha Vishnu (Preserver of the Cosmos)',
      gana: 'Deva', yoni: 'Monkey (కోతి)', rajju: 'Kanta (కంఠం)',
      facing: 'Oordhwa-Mukha (Upward)', prakarana: 'Chala / Chara',
      rasiSpan: 'Makara (Padas 1, 2, 3, 4)',
      goodDeeds: 'Vedic learning, chanting shlokas, deity installation, sacred travels, education.'
    },
    {
      index: 23, name: 'Dhanishtha', nameSa: 'धनिष्ठा', nameTe: 'ధనిష్ఠ',
      lord: 'Mangala (Mars)', deity: 'Ashta Vasus (Eight Gods of Universal Opulence)',
      gana: 'Rakshasa', yoni: 'Lion (సింహం)', rajju: 'Siro (శిరస్సు)',
      facing: 'Oordhwa-Mukha (Upward)', prakarana: 'Chala / Chara',
      rasiSpan: 'Makara (Padas 1, 2) & Kumbha (Padas 3, 4)',
      goodDeeds: 'Music, dancing, treasury investment, building palaces/temples, leadership.'
    },
    {
      index: 24, name: 'Shatabhisha', nameSa: 'शतभिषा', nameTe: 'శతభిషం',
      lord: 'Rahu', deity: 'Varuna Deva (Lord of the Waters and Divine Healer)',
      gana: 'Rakshasa', yoni: 'Horse (గుర్రం)', rajju: 'Kanta (కంఠం)',
      facing: 'Oordhwa-Mukha (Upward)', prakarana: 'Chala / Chara',
      rasiSpan: 'Kumbha (Padas 1, 2, 3, 4)',
      goodDeeds: 'Medical treatments, pharmacology, astronomy, meditative solitude.'
    },
    {
      index: 25, name: 'Purva Bhadrapada', nameSa: 'पूर्वभाद्रपदा', nameTe: 'పూర్వాభాద్ర',
      lord: 'Guru (Jupiter)', deity: 'Aja Ekapada (Cosmic Pillar of Light / Ascetic Shiva)',
      gana: 'Manushya', yoni: 'Lion (సింహం)', rajju: 'Nabhi (నాభి)',
      facing: 'Atho-Mukha (Downward)', prakarana: 'Ugra / Krura',
      rasiSpan: 'Kumbha (Padas 1, 2, 3) & Meena (Pada 4)',
      goodDeeds: 'Spiritual discipline, fasting, penance, occult investigations, charity.'
    },
    {
      index: 26, name: 'Uttara Bhadrapada', nameSa: 'उत्तरभाद्रपदा', nameTe: 'ఉత్తరాభాద్ర',
      lord: 'Shani (Saturn)', deity: 'Ahirbudhnya (Serpent of the Primordial Depths)',
      gana: 'Manushya', yoni: 'Cow (ఆవు)', rajju: 'Ooroo (తొడ)',
      facing: 'Oordhwa-Mukha (Upward)', prakarana: 'Dhruva / Sthira',
      rasiSpan: 'Meena (Padas 1, 2, 3, 4)',
      goodDeeds: 'Weddings, Griha Pravesh, permanent foundations, long-term covenants, meditation.'
    },
    {
      index: 27, name: 'Revati', nameSa: 'रेवती', nameTe: 'రేవతి',
      lord: 'Budha (Mercury)', deity: 'Pushan (God of Nourishment & Guide of Travelers)',
      gana: 'Deva', yoni: 'Elephant (ఏనుగు)', rajju: 'Padha (పాదం)',
      facing: 'Thiryag-Mukha (Horizontal)', prakarana: 'Mridu / Maitra',
      rasiSpan: 'Meena (Padas 1, 2, 3, 4)',
      goodDeeds: 'Safe journeys, commercial voyages, wearing ornaments, marriage, learning arts.'
    }
  ];

  function findRasiNakshatraByDOB(dobInput, hour = 12, minute = 0, cityKey = 'nellore') {
    let pMod;
    if (typeof PANCHANG !== 'undefined') {
      pMod = PANCHANG;
    } else {
      try {
        pMod = require('./panchang.js').PANCHANG;
      } catch (e) {}
    }

    const city = (pMod && pMod.getCity) ? pMod.getCity(cityKey) : { id: 'nellore', name: 'Nellore (నెల్లూరు)', state: 'Andhra Pradesh', lat: 14.4426, lon: 79.9865, tz: 5.5, tzName: 'IST' };

    let y = 1992, m = 0, d = 11;
    let validDateFound = false;

    if (dobInput instanceof Date && !isNaN(dobInput.getTime())) {
      y = dobInput.getFullYear();
      m = dobInput.getMonth();
      d = dobInput.getDate();
      validDateFound = true;
    } else if (typeof dobInput === 'string') {
      const str = dobInput.trim();
      const delims = ['-', '/', '.', ' '];
      for (const delim of delims) {
        if (str.includes(delim)) {
          const parts = str.split(delim).map(p => parseInt(p, 10));
          if (parts.length === 3 && !parts.some(isNaN)) {
            if (parts[0] > 1000) {
              // YYYY-MM-DD
              y = parts[0]; m = parts[1] - 1; d = parts[2];
            } else if (parts[2] > 1000) {
              // DD-MM-YYYY
              d = parts[0]; m = parts[1] - 1; y = parts[2];
            } else {
              d = parts[0]; m = parts[1] - 1; y = parts[2] < 50 ? 2000 + parts[2] : 1900 + parts[2];
            }
            validDateFound = true;
            break;
          }
        }
      }
      if (!validDateFound) {
        const parsed = new Date(str);
        if (!isNaN(parsed.getTime())) {
          y = parsed.getFullYear();
          m = parsed.getMonth();
          d = parsed.getDate();
          validDateFound = true;
        }
      }
    }

    if (!validDateFound) {
      const now = new Date();
      y = now.getFullYear();
      m = now.getMonth();
      d = now.getDate();
    }

    // Convert local birth time in the specified city to Universal Time (UTC)
    const localMs = Date.UTC(y, m, d, hour, minute);
    const utcMs = localMs - (city.tz * 3600 * 1000);
    const dateUTC = new Date(utcMs);
    const localDate = new Date(y, m, d, hour, minute);

    let p;
    let padaTimings = null;
    if (pMod && pMod.getPanchang) {
      p = pMod.getPanchang(dateUTC, city.id);
      if (pMod.getNakshatraPadaTimings) {
        padaTimings = pMod.getNakshatraPadaTimings(dateUTC, city.id);
      }
    } else {
      p = { 
        nakshatra: { name: 'Uttara Bhadrapada', pada: 1, index: 25 }, 
        rasi: 'Meena (Pisces)', 
        tithi: { name: 'Shashthi', pakshaShort: 'Shukla' }, 
        yoga: 'Parigha', 
        karana: 'Bava',
        ayanamsaDeg: '23.75°'
      };
    }

    const starName = p.nakshatra.name;
    const pada = p.nakshatra.pada;
    const rasiRaw = p.rasi;
    const rasiKey = rasiRaw.split(' ')[0];

    const rasiInfo = RASI_DETAILS.find(r => r.id === rasiKey) || RASI_DETAILS[0];
    const nakInfo = NAKSHATRA_DETAILS.find(n => n.name === starName) || NAKSHATRA_DETAILS[0];
    const gana = getNakshatraGana(starName);
    const facing = getStellarFacing(starName);

    return {
      date: localDate,
      dateUTC,
      city,
      formattedDate: localDate.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      formattedTime: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      star: starName,
      pada,
      padaTimings,
      rasi: rasiKey,
      rasiFullName: rasiRaw,
      rasiInfo,
      nakInfo,
      tithiName: p.tithi.name,
      paksha: p.tithi.pakshaShort,
      yoga: p.yoga,
      karana: p.karana,
      ganaTitleSa: gana.titleSa,
      ganaTitleEn: gana.titleEn,
      stellarFacing: facing,
      nakshatraLord: nakInfo.lord,
      rasiLord: rasiInfo.lord,
      yoni: nakInfo.yoni,
      rajju: nakInfo.rajju,
      ayanamsaDeg: p.ayanamsaDeg || '23.75°',
      sunLon: p.sunLon,
      moonLon: p.moonLon,
      sunriseStr: p.sunriseStr,
      sunsetStr: p.sunsetStr
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
    STELLAR_FACING,
    NAKSHATRA_ORDER,
    RASI_ORDER,
    RASI_DETAILS,
    NAKSHATRA_DETAILS,
    findRasiNakshatraByDOB,
    getStellarFacing,
    getNakshatraGana,
    checkSpecialYogas,
    calculateDasaKootas,
    getMantraChakra,
    evaluateDay,
    getMonthMuhurats,
    getTodayMuhurat
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MUHURAT };
}

