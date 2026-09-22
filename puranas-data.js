/* ============================================================
   DIVYA MANGALAM — ASHTADASHA MAHA PURANAS (అష్టాదశ మహాపురాణాలు)
   Comprehensive Database of the 18 Canonical Hindu Scriptures
   Includes English, Sanskrit (Devanagari), Telugu (తెలుగు), and 10 Chapters per Purana
   ============================================================ */

const PURANAS = [
  {
    "id": "vishnu",
    "number": 1,
    "nameEn": "Vishnu Purana",
    "nameSa": "विष्णुपुराणम्",
    "nameTe": "విష్ణు పురాణము",
    "category": "Vaishnava",
    "guna": "Sattvika",
    "emoji": "🪷",
    "verseCount": 23000,
    "author": "Maharshi Veda Vyasa (Revealed by Sage Parashara to Maitreya)",
    "structure": "6 Amsas (అంశములు), 126 Adhyayas",
    "primaryDeities": [
      "Bhagavan Maha Vishnu",
      "Sri Krishna",
      "Sri Rama",
      "Narasimha"
    ],
    "famousStotras": [
      "Vishnu Stuti by Indra",
      "Prahlada Kritha Vishnu Stotra",
      "Maitriya Samvada Stotras",
      "Yama Gita"
    ],
    "famousStories": [
      "Prahlada Charitra – The supreme paradigm of unwavering devotion",
      "Dhruva Charitra – The five-year-old child attaining the celestial pole",
      "Samudra Manthana – Churning of the ocean of milk and Lakshmi Avatara",
      "Jada Bharata Charitra – The profound discourse on non-dual soul consciousness",
      "Sri Krishna Lila – The complete early life of Krishna in Gokula and Mathura"
    ],
    "summaryEn": "Celebrated as the 'Puranaratna' (Gem among Puranas) by Acharya Ramanuja, the Vishnu Purana strictly adheres to the classical Pancha Lakshana format. Narrated by Sage Parashara (father of Vyasa) to his disciple Maitreya, it expounds the creation of the cosmos from the Supreme Brahman Narayana, detailed geography of the seven cosmic islands (Sapta Dvipas), dynastic genealogies of the Solar and Lunar lines, the complete life of Lord Krishna, and the spiritual remedy of Vishnu Nama-Smarana during Kali Yuga.",
    "summaryTe": "పరాశర మహర్షి తన ప్రియ శిష్యుడైన మైత్రేయునికి ఉపదేశించిన ఈ పవిత్ర గ్రంథాన్ని శ్రీ రామానుజాచార్యుల వారు \"పురాణ రత్నం\"గా కొనియాడారు. ఇందులో సృష్టి క్రమం, క్షీరసాగర మథనం, లక్ష్మీదేవి ఆవిర్భావం, ధ్రువ-ప్రహ్లాదుల అచంచల భక్తి గాథలు, జడభరతుని పరమహంస ఆత్మజ్ఞానోపదేశం, మరియు శ్రీకృష్ణుని సమగ్ర దివ్య చరిత్ర అద్భుతంగా వర్ణించబడ్డాయి. కలియుగంలో విష్ణు నామస్మరణమే పరమ తారక మంత్రమని ఈ పురాణం ఘోషిస్తుంది.",
    "keyShloka": {
      "sanskrit": "शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्। लक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं वन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥",
      "transliteration": "Shantakaram bhujagashayanam padmanabham suresham, Vishvadharam gaganasadrisham meghavarnam shubhangam | Lakshmikantam kamalanayanam yogibhirdhyanagamyam, Vande vishnum bhavabhayaharam sarvalokaikanatham ||",
      "meaningEn": "I bow to Lord Vishnu, the embodiment of peace, resting on the serpent Adi Shesha, from whose navel sprouts the lotus of creation, the Lord of all celestials, the foundation of the cosmos, boundless as space, dark as a monsoon cloud, of auspicious limbs, the beloved of Goddess Lakshmi, lotus-eyed, realized by yogis in meditation, the remover of worldly fear and the sole Lord of all universes."
    },
    "slug": "vishnu-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Cosmic Creation & Primal Nature",
        "titleTe": "విశ్వ సృష్టి క్రమము మరియు మూల ప్రకృతి",
        "summaryEn": "Narrates the emergence of Mahat-tattva, the three Gunas, and the Golden Egg from Narayana.",
        "summaryTe": "పరబ్రహ్మమైన నారాయణుని నుండి మహత్-తత్వం, త్రిగుణాలు మరియు హిరణ్యగర్భం ఆవిర్భవించిన విధానం."
      },
      {
        "number": 2,
        "titleEn": "Dhruva’s Unwavering Penance",
        "titleTe": "ధ్రువుని నిశ్చల తపస్సు మరియు ధ్రువపద ప్రాప్తి",
        "summaryEn": "The five-year-old prince Dhruva meditating on Vasudeva to attain the permanent northern star.",
        "summaryTe": "ఐదేళ్ల బాల ధ్రువుడు నారదుని ఉపదేశంతో వాసుదేవుని ధ్యానించి శాశ్వతమైన ధ్రువ మండలాన్ని అధిరోహించుట."
      },
      {
        "number": 3,
        "titleEn": "Prahlada and the Non-Dual Truth",
        "titleTe": "భక్త ప్రహ్లాదుని అద్వైత విష్ణు భక్తి",
        "summaryEn": "Prahlada expounding the all-pervasive presence of Vishnu in every pillar and atom.",
        "summaryTe": "స్తంభమునందు అంతటా పరమాత్ముడు నిండియున్నాడని ప్రహ్లాదుడు చాటిన అచంచల భక్తి తత్వము."
      },
      {
        "number": 4,
        "titleEn": "Churning of the Ocean & Lakshmi’s Descent",
        "titleTe": "సముద్ర మథనం మరియు శ్రీ మహాలక్ష్మి ఆవిర్భావం",
        "summaryEn": "The gods and demons churning the milky ocean; manifestation of Dhanvantari and Goddess Lakshmi.",
        "summaryTe": "దేవాసురులు క్షీరసాగరాన్ని మథించగా అమృతం, ధన్వంతరి మరియు జగన్మాత శ్రీ మహాలక్ష్మి వెలువడుట."
      },
      {
        "number": 5,
        "titleEn": "Sacred Geography of the Seven Islands",
        "titleTe": "సప్త ద్వీపములు మరియు భారతవర్ష వైభవం",
        "summaryEn": "Detailed topography of Jambudvipa, Mount Meru, holy rivers, and Bharata as Karma-bhumi.",
        "summaryTe": "జంబూద్వీపం, మేరు పర్వతం, పుణ్య నదులు మరియు మోక్ష సాధనకు ఆలవాలమైన భారతవర్ష వైశిష్ట్యం."
      },
      {
        "number": 6,
        "titleEn": "Jada Bharata’s Vedantic Discourse",
        "titleTe": "జడభరతుని ఆత్మజ్ఞాన బోధ",
        "summaryEn": "Sage Jada Bharata instructing King Rahugana on the illusory nature of the physical body.",
        "summaryTe": "శరీరము అశాశ్వతమని, ఆత్మయే సత్యమని జడభరతుడు రహూగణ మహారాజుకు చేసిన బ్రహ్మజ్ఞానోపదేశం."
      },
      {
        "number": 7,
        "titleEn": "The Divisions of Veda Vyasa",
        "titleTe": "వేదవ్యాస మహర్షి వేద విభజన",
        "summaryEn": "How Vyasa categorized the singular Veda into Rig, Yajur, Sama, and Atharva for Kali Yuga.",
        "summaryTe": "కలియుగ మానవుల శ్రేయస్సు కోసం వేదవ్యాసుడు ఏక వేదాన్ని నాలుగు వేదాలుగా విభజించిన చరిత్ర."
      },
      {
        "number": 8,
        "titleEn": "Genealogies of Solar & Lunar Kings",
        "titleTe": "సూర్య మరియు చంద్ర వంశాల వంశానుచరితం",
        "summaryEn": "Chronicles of King Ikshvaku, Harishchandra, Sri Rama, Pururavas, Yayati, and the Pandavas.",
        "summaryTe": "ఇక్ష్వాకు, శ్రీరాముడు, హరిశ్చంద్రుడు, పురూరవుడు మరియు యయాతి మహారాజుల వంశ చరిత్రలు."
      },
      {
        "number": 9,
        "titleEn": "Sri Krishna’s Transcendental Pastimes",
        "titleTe": "శ్రీకృష్ణ లీలా విలాసము",
        "summaryEn": "The birth of Krishna, destruction of Kamsa, life in Mathura and Dvaraka, and the Syamantaka jewel.",
        "summaryTe": "శ్రీకృష్ణావతారము, బాల్య లీలలు, కంస వధ, ద్వారకా నగర నిర్మాణం మరియు శమంతకమణి వృత్తాంతం."
      },
      {
        "number": 10,
        "titleEn": "Kaliyuga Symptoms & Supreme Liberation",
        "titleTe": "కలియుగ లక్షణాలు మరియు నామస్మరణతో ముక్తి",
        "summaryEn": "Prophecies of Kaliyuga degeneration and how chanting Vishnu’s holy name bestows liberation.",
        "summaryTe": "కలియుగ దోషాలు మరియు కేవలం హరి నామ సంకీర్తన ద్వారానే సమస్త పాపములు తొలగి మోక్షం లభించుట."
      }
    ]
  },
  {
    "id": "bhagavata",
    "number": 2,
    "nameEn": "Srimad Bhagavata Purana",
    "nameSa": "श्रीमद्भागवतपुराणम्",
    "nameTe": "శ్రీమద్భాగవత పురాణము",
    "category": "Vaishnava",
    "guna": "Sattvika",
    "emoji": "🦚",
    "verseCount": 18000,
    "author": "Maharshi Veda Vyasa (Narrated by Shuka Maharshi to Emperor Parikshit)",
    "structure": "12 Skandhas (స్కంధాలు), 335 Adhyayas",
    "primaryDeities": [
      "Bhagavan Sri Krishna",
      "Maha Vishnu",
      "Dashavatara"
    ],
    "famousStotras": [
      "Chatushloki Bhagavata (4 root verses)",
      "Gajendra Moksha Stotra",
      "Kunti Stuti",
      "Bhishma Stuti",
      "Gopi Gita",
      "Bhramara Gita"
    ],
    "famousStories": [
      "Gajendra Moksham – The elephant king calling upon the Formless Absolute",
      "Kapila Devahuti Samvada – Kapila Gita on Samkhya philosophy and devotion",
      "Prahlada-Narasimha Avatara – The pillar opening to protect child devotee",
      "Vamana Trivikrama Avatara – King Bali offering his head to the Lord",
      "Rasa Panchadhyayi & Krishna Balaleelalu – Pure transcendental love in Vrindavana",
      "Uddhava Gita – Krishna’s final parting wisdom on self-realization"
    ],
    "summaryEn": "Known as the 'Amala Purana' (Spotless Scripture), Srimad Bhagavatam is revered as the ripened fruit of the Vedic wish-fulfilling tree. Narrated by Sage Shuka to King Parikshit during his final seven days on Earth, it unfolds across 12 cantos. The Tenth Canto, consisting of 90 chapters, presents the quintessential divine life of Sri Krishna, while the Eleventh Canto contains the profound Uddhava Gita. It defines Prema (pure selfless love) as the supreme Purushartha.",
    "summaryTe": "వేద కల్పవృక్షం యొక్క పరిపక్వమైన దివ్య ఫలమే శ్రీమద్భాగవతం. వ్యాస మహర్షి వేదనను పోగొట్టిన పరమ భాగవత గ్రంథం. తక్షకుని కాటుతో ఏడు రోజుల్లో మరణించనున్న పరీక్షిత్తు మహారాజుకు శుక బ్రహ్మ అమృతతుల్యంగా వినిపించిన ముక్తిదాయక కావ్యం. 12 స్కంధాలలో గజేంద్ర మోక్షం, కపిల గీత, ప్రహ్లాద-నారసింహ చరితం, వామనావతారం, దశమ స్కంధంలోని శ్రీకృష్ణ దివ్య బాల లీలలు, రాసలీలలు, రుక్మిణీ కళ్యాణం, మరియు ఉద్ధవ గీత సకల మానవాళికి మోక్ష మార్గాన్ని ప్రసాదిస్తాయి.",
    "keyShloka": {
      "sanskrit": "निगमकल्पतरोर्गलितं फलं शुकमुखादमृतद्रवसंयुतम्। पिबत भागवतं रसमालयं मुहुरहो रसिका भुवि भावुकाः॥",
      "transliteration": "Nigamakalpatarorgalitam phalam shukamukhadamritadravasamyutam | Pibata bhagavatam rasamalayam muhuraho rasika bhuvi bhavukah ||",
      "meaningEn": "O connoisseurs of aesthetic nectar and thoughtful souls of this earth, drink constantly of this Srimad Bhagavatam, the ripened fruit fallen from the wish-fulfilling tree of the Vedas, flowing with sweet nectar having touched the holy lips of Sage Shuka!"
    },
    "slug": "bhagavata-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "narada",
    "number": 3,
    "nameEn": "Narada Purana",
    "nameSa": "नारदीयपुराणम्",
    "nameTe": "నారద పురాణము",
    "category": "Vaishnava",
    "guna": "Sattvika",
    "emoji": "🪕",
    "verseCount": 25000,
    "author": "Maharshi Veda Vyasa (Revealed by Devarshi Narada to Sanat Kumaras)",
    "structure": "2 Bhagas (Purva & Uttara), 4 Padas, 125+ Chapters",
    "primaryDeities": [
      "Bhagavan Narayana",
      "Maha Lakshmi",
      "Radha-Krishna"
    ],
    "famousStotras": [
      "Narayana Kavacha",
      "Ekadashi Mahatmya Stotras",
      "Ganga Mahatmya Stutis",
      "Vishnu Ashtottara Shatanamavali"
    ],
    "famousStories": [
      "Rukmangada Charitra – The unyielding devotee who preferred to sacrifice his son rather than break his Ekadashi fast",
      "Sanatkumara-Narada Samvada – Spiritual initiation into cosmic truths",
      "Ganga Avataranam – The descending power and holy places along Mother Ganga",
      "Kashi and Prayaga Mahatmya – The sacred science of pilgrimage tirthas"
    ],
    "summaryEn": "An encyclopedic masterwork revealed by Devarshi Narada to the four Sanat Kumaras. In addition to inspiring stories of devotees like King Rukmangada, it provides an authentic directory and summary of all 18 Maha Puranas with their chapter counts and themes. It contains specialized treatises on the six Vedangas: Shiksha (phonetics), Kalpa (rituals), Vyakarana (grammar), Nirukta (etymology), Chhandas (metrics), and Jyotisha (astronomy).",
    "summaryTe": "దేవర్షి నారదుడు సనత్కుమారులకు ఉపదేశించిన జ్ఞాన సర్వస్వమిది. ఇందులో పవిత్ర ఏకాదశీ వ్రత ప్రాశస్త్యాన్ని తెలియజేసే రుక్మాంగదుని దివ్య చరిత్ర, గంగా-ప్రయాగ-కాశీ క్షేత్రాల వైభవం వర్ణించబడ్డాయి. విశేషంగా వేదాల ఆరు అంగాలు (శిక్ష, వ్యాకరణ, ఛందస్సు, నిరుక్త, జ్యోతిష, కల్పం) మరియు సమస్త 18 మహాపురాణాల శ్లోక సంఖ్యలు, విషయ సూచికలు ఇందులో అత్యంత ప్రామాణికంగా నిక్షిప్తమై ఉన్నాయి.",
    "keyShloka": {
      "sanskrit": "नारायणं नमस्कृत्य नरं चैव नरोत्तमम्। देवीं सरस्वतीं व्यासं ततो जयमुदीरयेत्॥",
      "transliteration": "Narayanam namaskritya naram chaiva narottamam | Devim sarasvatim vyasam tato jayamudirayet ||",
      "meaningEn": "Before reciting this sacred literature which is the very means of conquest, one should offer respectful obeisances unto the Personality of Godhead Narayana, unto Nara-Narayana, the supreme human being, unto Mother Saraswati the goddess of learning, and unto Srila Vyasadeva the author."
    },
    "slug": "narada-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "garuda",
    "number": 4,
    "nameEn": "Garuda Purana",
    "nameSa": "गरुडपुराणम्",
    "nameTe": "గరుడ పురాణము",
    "category": "Vaishnava",
    "guna": "Sattvika",
    "emoji": "🦅",
    "verseCount": 19000,
    "author": "Maharshi Veda Vyasa (Dialogue between Lord Vishnu and His mount Garuda)",
    "structure": "2 Khandas: Purva Khanda (Achara) & Uttara Khanda (Preta Kalpa)",
    "primaryDeities": [
      "Bhagavan Vishnu",
      "Garuda Bhagavan",
      "Yamaraja",
      "Dhanvantari"
    ],
    "famousStotras": [
      "Garuda Kavacha",
      "Vishnu Panjara Stotra",
      "Mrityu Samhara Stuti",
      "Dhanvantari Mantra"
    ],
    "famousStories": [
      "Garuda’s Inquiries – Garuda questioning Vishnu on cosmic soul mysteries",
      "The Journey of the Jiva – The subtle pathway of the soul after departure",
      "Yama Sabha – The court of divine cosmic justice and karma",
      "Ratna Pariksha – Classical science of testing genuine gemstones"
    ],
    "summaryEn": "Framed as an intimate philosophical dialogue between Lord Vishnu and His eagle carrier Garuda. While widely known for its Uttara Khanda (Preta Kalpa), which meticulously details the post-mortem journey of the soul, karma, and the significance of Shraddha funeral rites, its first part (Purva Khanda) is a massive encyclopedia covering gemology (Ratna-pariksha), medicine (Ayurveda), astrology, temple iconography, and statecraft.",
    "summaryTe": "శ్రీమహావిష్ణువు తన వాహనమైన గరుత్మంతునికి బోధించిన పరమ రహస్య పురాణం. జీవుడు శరీరాన్ని విడిచిన తర్వాత చేసే ప్రయాణం, కర్మ సిద్ధాంతం, నరక-స్వర్గ లోకాలు, పితృకార్యాలు, మరియు శ్రాద్ధ కర్మల విశిష్టతను తెలిపే 'ప్రేత కల్పం' ఇందులో సుప్రసిద్ధం. అంతేకాకుండా రత్న పరీక్షా విధానం, ఆయుర్వేద మూలికా చికిత్సలు, జ్యోతిష్యం, విష్ణు భక్తితో జన్మరాహిత్యం పొందే మార్గాలు ఇందులో విపులంగా ఉన్నాయి.",
    "keyShloka": {
      "sanskrit": "ॐ नमो भगवते वासुदेवाय सर्वपापप्रणाशनाय। धर्मार्थकाममोक्षदाय महाविष्णवे नमः॥",
      "transliteration": "Om namo bhagavate vasudevaya sarvapapapranashanaya | Dharmarthakamamokshadaya mahavishnave namah ||",
      "meaningEn": "Om, obeisances unto the Supreme Lord Vasudeva, the destroyer of all sins, the bestower of Dharma, Artha, Kama, and Moksha, obeisances unto Maha Vishnu."
    },
    "slug": "garuda-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "padma",
    "number": 5,
    "nameEn": "Padma Purana",
    "nameSa": "पद्मपुराणम्",
    "nameTe": "పద్మ పురాణము",
    "category": "Vaishnava",
    "guna": "Sattvika",
    "emoji": "🌸",
    "verseCount": 55000,
    "author": "Maharshi Veda Vyasa",
    "structure": "6 Massive Khandas: Srishti, Bhumi, Svarga, Brahma, Patala, Uttara",
    "primaryDeities": [
      "Bhagavan Vishnu",
      "Sri Rama",
      "Sri Krishna",
      "Devi Tulasi",
      "Lord Shiva"
    ],
    "famousStotras": [
      "Gita Mahatmya (Chapter-by-chapter glory)",
      "Bhagavata Mahatmya",
      "Rama Raksha Stotra references",
      "Tulasi Stotra & Shalagrama Stotram"
    ],
    "famousStories": [
      "Bhrigu Maharshi’s Test of the Trinity – Finding equanimity in Vishnu",
      "Tulasi-Shalagrama Vivaha – The sacred manifestation of holy basil",
      "Sri Rama’s Ashvamedha Yajna and the victory of Lava and Kusha",
      "The 24 Sacred Ekadashi Kathas – Detailed origins of all lunar fasts",
      "Radha-Krishna Nitya Lila in Vrindavana"
    ],
    "summaryEn": "Named after the cosmic lotus in which Lord Brahma appeared from Vishnu’s navel, this is the second-largest Purana with 55,000 verses. It contains the celebrated Bhagavad Gita Mahatmya (allegorical stories for each chapter of the Gita), the Bhagavata Mahatmya, Sage Bhrigu's examination of the Tridevas, and the definitive scriptural guidelines for observing all 24 Ekadashi fasts throughout the year.",
    "summaryTe": "విష్ణువు నాభి కమలం (పద్మం) నుండి బ్రహ్మ ఆవిర్భవించిన నేపథ్యాన్ని సూచిస్తూ దీనికి పద్మ పురాణం అని పేరు వచ్చింది. 55,000 శ్లోకాలతో కూడిన రెండో అతిపెద్ద పురాణమిది. భగవద్గీతలోని ప్రతి అధ్యాయం యొక్క మహిమను వివరించే 'గీతా మాహాత్మ్యం', భృగు మహర్షి త్రిమూర్తులను పరీక్షించిన కథ, తులసీ-శాలగ్రామ కళ్యాణం, శ్రీరాముని అశ్వమేధ యాగం, మరియు సంవత్సరంలోని 24 ఏకాదశుల వ్రత కథలు ఇందులో ప్రముఖమైనవి.",
    "keyShloka": {
      "sanskrit": "गीता सुगीता कर्तव्या किमन्यैः शास्त्रविस्तरैः। या स्वयं पद्मनाभस्य मुखपद्माद्विनिःसृता॥",
      "transliteration": "Gita sugita kartavya kimanyaih shastravistaraih | Ya svayam padmanabhasya mukhapadmadvinihsrita ||",
      "meaningEn": "The Bhagavad Gita should be sung and meditated upon thoroughly; what is the need for other elaborate scriptures? For it has emanated directly from the lotus-mouth of the Supreme Lord Padmanabha Himself."
    },
    "slug": "padma-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Srishti Khanda - Pushkara Tirtha",
        "titleTe": "సృష్టి ఖండం - పుష్కర క్షేత్ర మహిమ",
        "summaryEn": "Creation through Brahma and the sanctification of Pushkara lake in Rajasthan.",
        "summaryTe": "బ్రహ్మదేవుని కమల పతనంతో పవిత్రమైన పుష్కర సరస్సు ఆవిర్భావం మరియు యజ్ఞ విశేషాలు."
      },
      {
        "number": 2,
        "titleEn": "Bhumi Khanda - King Prithu & Ecology",
        "titleTe": "భూమి ఖండం - పృథు చక్రవర్తి గోదోహనం",
        "summaryEn": "King Prithu milking the Earth as a cow to feed all living beings with grains and herbs.",
        "summaryTe": "భూమిని ఆవుగా మార్చి సమస్త మానవాళికి ఆహార సంపదను సమకూర్చిన పృథు మహారాజు ఘనత."
      },
      {
        "number": 3,
        "titleEn": "Svarga Khanda - Celestial Worlds & Narmada",
        "titleTe": "స్వర్గ ఖండం - నర్మదా నదీ తీర్థ దర్శనం",
        "summaryEn": "Description of heavenly realms and the purifying pilgrimage of river Narmada.",
        "summaryTe": "స్వర్గలోక భోగాలు మరియు దర్శన మాత్రముననే పాపాలు హరించే నర్మదా నదీ పుణ్య ఘాట్లు."
      },
      {
        "number": 4,
        "titleEn": "Brahma Khanda - Temple Worship & Rituals",
        "titleTe": "బ్రహ్మ ఖండం - దేవాలయ అర్చనా విధి",
        "summaryEn": "Rules for consecrating murtis, temple rituals, and observance of sacred festivals.",
        "summaryTe": "విగ్రహ ప్రతిష్ఠ, దేవాలయ పూజా కైంకర్యాలు మరియు పవిత్ర తిథుల పండుగల ప్రాశస్త్యం."
      },
      {
        "number": 5,
        "titleEn": "Patala Khanda - Sri Rama’s Ashvamedha",
        "titleTe": "పాతాళ ఖండం - శ్రీరామ అశ్వమేధ యాగం",
        "summaryEn": "The sacrificial horse guarded by Shatrughna and the courageous fight by Lava and Kusha.",
        "summaryTe": "రాముని యాగ అశ్వాన్ని బంధించిన లవకుశుల వీరత్వము మరియు సీతాదేవి పాతివ్రత్య మహిమ."
      },
      {
        "number": 6,
        "titleEn": "Vrindavana Mahatmya & Radha-Krishna Lila",
        "titleTe": "బృందావన మాహాత్మ్యం - నిత్య రాసలీలలు",
        "summaryEn": "The transcendental sweet pastimes of Radha and Krishna in eternal Vrindavana.",
        "summaryTe": "దివ్య బృందావనంలో రాధాకృష్ణుల నిరంతర ఆనంద తాండవం మరియు గోపికల ప్రేమ తత్వము."
      },
      {
        "number": 7,
        "titleEn": "Bhagavad Gita Mahatmya",
        "titleTe": "భగవద్గీతా మాహాత్మ్య కథలు",
        "summaryEn": "Detailed inspiring allegories for each of the 18 chapters of the Gita.",
        "summaryTe": "గీతలోని ప్రతి అధ్యాయాన్ని పారాయణ చేయడం వల్ల జన్మల పాపాలు తొలగి మోక్షం లభించే దృష్టాంతాలు."
      },
      {
        "number": 8,
        "titleEn": "Srimad Bhagavata Mahatmya",
        "titleTe": "భాగవత మాహాత్మ్యం - భక్తి జ్ఞాన వైరాగ్య పునరుజ్జీవనం",
        "summaryEn": "Narada and the Sanat Kumaras restoring the youth of Bhakti, Jnana, and Vairagya in Vrindavana.",
        "summaryTe": "కలియుగంలో వృద్ధులైన భక్తి, జ్ఞాన, వైరాగ్యాలకు భాగవత సప్తాహం ద్వారా నవయవ్వనం కల్పించుట."
      },
      {
        "number": 9,
        "titleEn": "Bhrigu’s Examination of the Tridevas",
        "titleTe": "భృగు మహర్షి త్రిమూర్తుల పరీక్ష",
        "summaryEn": "Bhrigu testing Brahma, Shiva, and Vishnu to proclaim Vishnu’s supreme compassion and equanimity.",
        "summaryTe": "సహనమే పరమ దైవత్వమని నిరూపిస్తూ విష్ణువును సర్వోన్నతునిగా భృగువు ప్రకటించుట."
      },
      {
        "number": 10,
        "titleEn": "The 24 Lunar Ekadashi Vrata Kathas",
        "titleTe": "24 ఏకాదశుల వ్రత మహాత్యాలు",
        "summaryEn": "Complete scriptural narratives and fasting rules for all 24 lunar Ekadashis of the year.",
        "summaryTe": "సంవత్సరంలోని ప్రతి ఏకాదశికి గల పుణ్య కథ, ఉపవాస నియమాలు మరియు ముక్తి ఫలాలు."
      }
    ]
  },
  {
    "id": "varaha",
    "number": 6,
    "nameEn": "Varaha Purana",
    "nameSa": "वराहपुराणम्",
    "nameTe": "వరాహ పురాణము",
    "category": "Vaishnava",
    "guna": "Sattvika",
    "emoji": "🐗",
    "verseCount": 24000,
    "author": "Maharshi Veda Vyasa (Spoken by Lord Varaha to Bhudevi)",
    "structure": "218 Adhyayas (Purva, Madhyama, Uttara sections)",
    "primaryDeities": [
      "Bhagavan Varaha",
      "Bhudevi (Mother Earth)",
      "Sapta Matrikas"
    ],
    "famousStotras": [
      "Varaha Kavacha",
      "Bhudevi Stuti",
      "Dharani Varaha Samvada Shlokas"
    ],
    "famousStories": [
      "Rescue of Mother Earth – Lord Varaha lifting Bhudevi from the cosmic ocean",
      "The Puranic Nachiketa Legend – Nachiketa visiting Yamaloka to understand death",
      "Mathura Mahatmya – The sacred woods and holy shrines of the Yamuna valley",
      "Sapta Matrika Manifestation – The descent of the seven mother energies"
    ],
    "summaryEn": "Framed as a deeply reverent dialogue between the divine rescuer Bhagavan Varaha (the Boar incarnation) and Mother Earth (Bhudevi) after Her rescue from demon Hiranyaksha. It emphasizes environmental and spiritual preservation, detailed pilgrim guide to Mathura, and expands on the famous Upanishadic dialogue of Nachiketa and Yama concerning virtue and the afterlife.",
    "summaryTe": "శ్రీ మహావిష్ణువు వరాహావతారమెత్తి హిరణ్యాక్షుని వధించి భూదేవిని సముద్ర గర్భం నుండి రక్షించిన తర్వాత ఆమెకు చేసిన దివ్యోపదేశమే వరాహ పురాణం. ఇందులో కఠోపనిషత్తులోని నచికేతుని వృత్తాంతం, మథురా క్షేత్ర మహిమ, ప్రకృతి సంరక్షణ, భూమాత పట్ల మానవులకు ఉండాల్సిన భక్తి భావం మరియు అనేక పుణ్య తీర్థాల చరిత్రలు విపులంగా పొందుపరచబడ్డాయి.",
    "keyShloka": {
      "sanskrit": "नमस्ते पद्मनेत्राय नमस्ते जलशायिने। नमस्ते वराहरूपाय भुवोद्धरणकारिणे॥",
      "transliteration": "Namaste padmanetraya namaste jalashayine | Namaste varaharupaya bhuvoddharanakarine ||",
      "meaningEn": "Salutations to the lotus-eyed Lord, salutations to Him who rests upon the cosmic waters! Salutations to Him who assumed the form of the divine Boar to uplift and protect Mother Earth."
    },
    "slug": "varaha-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "shiva",
    "number": 7,
    "nameEn": "Shiva Purana",
    "nameSa": "शिवपुराणम्",
    "nameTe": "శివ పురాణము",
    "category": "Shaiva",
    "guna": "Tamasika",
    "emoji": "🔱",
    "verseCount": 24000,
    "author": "Maharshi Veda Vyasa (Revealed through Sage Romaharshana)",
    "structure": "7 Samhitas: Vidyeshvara, Rudra, Satarudra, Kotirudra, Uma, Kailasa, Vayaviya",
    "primaryDeities": [
      "Paramashiva",
      "Devi Parvati / Sati",
      "Kartikeya",
      "Ganesha"
    ],
    "famousStotras": [
      "Shiva Tandava Stotram",
      "Shiva Mahimna Stotra",
      "Dvadasha Jyotirlinga Stotra",
      "Shiva Kavacha",
      "Panchakshari Stotra"
    ],
    "famousStories": [
      "Lingodbhava – Manifestation of the boundless pillar of cosmic light",
      "Daksha Yajna Vidhvamsanam – Sati’s sacrifice and Veerabhadra’s anger",
      "Shiva-Parvati Kalyanam – Parvati’s penance and the celestial wedding",
      "Birth of Kumara & Ganesha – Creation of Kartikeya and Ganesha",
      "12 Jyotirlinga Origins – Historical and spiritual genesis of the 12 shrines"
    ],
    "summaryEn": "The premier scripture of Shaiva theology, containing 24,000 verses across 7 monumental Samhitas. It explains the mystery of Lingodbhava (emergence of the infinite cosmic pillar of fire), the supreme efficacy of Bhasma (sacred ash), Bilva leaves, and Rudraksha, the destruction of Daksha's sacrifice, the divine marriage of Shiva and Parvati, and the genesis of all 12 Jyotirlingas across India.",
    "summaryTe": "పరమేశ్వరుని తత్వానికి, లీలలకు అద్దంపట్టే మహాగ్రంథం శివపురాణం. ఇందులో 7 సంహితలు ఉన్నాయి. బ్రహ్మ-విష్ణువుల అహంకారాన్ని నివారించడానికి ఆవిర్భవించిన లింగోద్భవ వైభవం, దక్ష యజ్ఞ ధ్వంసం, పార్వతీ పరమేశ్వరుల దివ్య కళ్యాణం, వినాయకుడు-సుబ్రహ్మణ్య స్వామిల జననం, ద్వాదశ జ్యోతిర్లింగాల పుణ్య చరిత్రలు, మరియు విభూతి-రుద్రాక్ష-బిల్వార్చన మహిమలు ఇందులో అత్యంత భక్తితో వివరింపబడ్డాయి.",
    "keyShloka": {
      "sanskrit": "त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥",
      "transliteration": "Tryambakam yajamahe sugandhim pushtivardhanam | Urvarukamiva bandhananmrityormukshiya mamritat ||",
      "meaningEn": "We worship the three-eyed Lord Shiva, who is fragrant and who nourishes all beings. As the cucumber is released from its bondage to the vine, may He liberate us from death and samsara into immortality."
    },
    "slug": "shiva-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Vidyeshvara Samhita - Worship of the Linga",
        "titleTe": "విద్యేశ్వర సంహిత - శివలింగ ఆరాధనా విధి",
        "summaryEn": "Exposition of Bhasma, Rudraksha, Bilva patra, and chanting Om Namah Shivaya.",
        "summaryTe": "విభూతి ధారణ, రుద్రాక్ష ప్రాశస్త్యం, బిల్వదళార్చన మరియు పంచాక్షరీ మంత్ర జప విధానం."
      },
      {
        "number": 2,
        "titleEn": "Lingodbhava - The Cosmic Pillar of Fire",
        "titleTe": "లింగోద్భవ వైభవం - అగ్ని స్తంభ దర్శనం",
        "summaryEn": "Shiva manifesting as the infinite column of light to transcend Brahma and Vishnu’s ego.",
        "summaryTe": "ఆది మధ్యాంతాలు లేని జ్యోతిర్లింగంగా పరమశివుడు ఆవిర్భవించిన దివ్య వృత్తాంతం."
      },
      {
        "number": 3,
        "titleEn": "Sati Khanda - Daksha Yajna & Veerabhadra",
        "titleTe": "సతీ ఖండం - దక్ష యజ్ఞ ధ్వంసం",
        "summaryEn": "Sati immolating in Yogic fire, Shiva’s cosmic grief, and the destruction of Daksha.",
        "summaryTe": "సతీదేవి యోగాగ్నిలో దహనమగుట, వీరభద్రుని సృష్టి మరియు దక్షుని యజ్ఞ సంహారం."
      },
      {
        "number": 4,
        "titleEn": "Parvati Khanda - Penance & Divine Wedding",
        "titleTe": "పార్వతీ ఖండం - తపోమహిమ మరియు శివ కళ్యాణం",
        "summaryEn": "Goddess Parvati performing intense austerities, burning of Kama, and the divine marriage.",
        "summaryTe": "పార్వతీదేవి పంచాగ్నుల మధ్య తపస్సు, మన్మథ దహనం మరియు జగత్కల్యాణ వివాహం."
      },
      {
        "number": 5,
        "titleEn": "Kumara Khanda - Birth of Kartikeya & Ganesha",
        "titleTe": "కుమార ఖండం - సుబ్రహ్మణ్య, గణపతి జననం",
        "summaryEn": "Manifestation of Shanmukha to destroy Tarakasura and Ganesha appointed as Ganadhyaksha.",
        "summaryTe": "తారకాసుర సంహారార్థం కుమారస్వామి ఆవిర్భావం మరియు వినాయకుని గణపతి పదవి."
      },
      {
        "number": 6,
        "titleEn": "Yuddha Khanda - Vanquishing of Tripurasura",
        "titleTe": "యుద్ధ ఖండం - త్రిపురాసుర సంహారం",
        "summaryEn": "Shiva mounting the cosmic chariot of Earth to incinerate the three flying demonic cities.",
        "summaryTe": "భూమినే రథముగా, బ్రహ్మనే సారథిగా చేసుకొని పరమశివుడు త్రిపురాలను భస్మం చేయుట."
      },
      {
        "number": 7,
        "titleEn": "Kotirudra Samhita - 12 Jyotirlingas",
        "titleTe": "కోటిరుద్ర సంహిత - ద్వాదశ జ్యోతిర్లింగ మహిమ",
        "summaryEn": "Origins of Somnath, Mallikarjuna, Mahakaleshwar, Kashi Vishwanath, and the 12 shrines.",
        "summaryTe": "సోమనాథ్ నుండి రామేశ్వరం వరకు గల పవిత్ర 12 జ్యోతిర్లింగాల క్షేత్ర ప్రాశస్త్యం."
      },
      {
        "number": 8,
        "titleEn": "Uma Samhita - Nature of Devi & Charity",
        "titleTe": "ఉమా సంహిత - దేవీ తత్వము మరియు దాన ధర్మాలు",
        "summaryEn": "The compassionate nature of Mother Uma and expiation of sins through selfless charity.",
        "summaryTe": "జగన్మాత ఉమాదేవి కరుణా కటాక్షాలు మరియు పాప విముక్తికై దాన విశిష్టత."
      },
      {
        "number": 9,
        "titleEn": "Kailasa Samhita - Omkara & Vedanta",
        "titleTe": "కైలాస సంహిత - ప్రణవ నాదం మరియు ఆత్మజ్ఞానం",
        "summaryEn": "Esoteric meaning of Omkara, the stages of sannyasa, and realization of the non-dual Self.",
        "summaryTe": "ఓంకార తత్వ రహస్యాలు, సన్యాస ధర్మము మరియు పరబ్రహ్మ స్వరూప జ్ఞాన విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Vayaviya Samhita - Pashupata Yoga",
        "titleTe": "వాయవీయ సంహిత - పాశుపత యోగ విధి",
        "summaryEn": "Discourse on Pashu (soul), Pasha (bondage), and Pati (Lord Shiva), ending in Moksha.",
        "summaryTe": "జీవుని బంధాలను ఛేదించి పశుపతియైన పరమశివునిలో లీనమయ్యే పాశుపత యోగ మార్గం."
      }
    ]
  },
  {
    "id": "linga",
    "number": 8,
    "nameEn": "Linga Purana",
    "nameSa": "लिङ्गपुराणम्",
    "nameTe": "లింగ పురాణము",
    "category": "Shaiva",
    "guna": "Tamasika",
    "emoji": "🪨",
    "verseCount": 11000,
    "author": "Maharshi Veda Vyasa (Revealed by Lord Brahma to the Sages)",
    "structure": "2 Bhagas (Purva & Uttara), 163 Adhyayas",
    "primaryDeities": [
      "Lord Shiva (Linga & Alinga)",
      "Devi Parvati",
      "Rudra"
    ],
    "famousStotras": [
      "Shiva Sahasranama (chanted by Lord Vishnu)",
      "Tryambaka Vidhi Stotras",
      "Linga Ashtakam references"
    ],
    "famousStories": [
      "The Cosmic Linga – How formless Brahman manifests as the Shiva Linga",
      "Vishnu’s 1,000 Blue Lotuses – Offering His own eye to obtain Sudarshana Chakra",
      "28 Incarnations of Shiva – Culminating in the great master Lakulisha",
      "Dadhichi’s Supreme Sacrifice – Offering his body to forge the Vajra weapon"
    ],
    "summaryEn": "Explores the profound metaphysics of the Shiva Linga as the symbol (Linga) of the unmanifest Absolute (Alinga). Details how Lord Vishnu worshipped Shiva with 1,000 blue lotuses, plucking His own eye when one flower fell short, receiving the Sudarshana Chakra as a boon. It explains the 28 historical incarnations of Shiva, the installation of Shiva Lingas, and the rigorous practice of Pashupata Yoga.",
    "summaryTe": "నిరాకార పరబ్రహ్మ తత్వానికి ప్రతీక అయిన శివలింగ ఆరాధనా విధికి ఇది మూల స్తంభం. విష్ణువు పరమశివుని వేయి కమలాలతో పూజిస్తూ, ఒక కమలం తక్కువ కాగా తన కంటినే పెకలించి సమర్పించి సుదర్శన చక్రాన్ని పొందిన కథ ఇందులో ప్రముఖమైనది. 28 శివావతారాలు, దధీచి మహర్షి త్యాగ గుణం, పాశుపత యోగ సాధన ద్వారా పరమ శాంతిని పొందే విధానం ఇందులో వివరించబడింది.",
    "keyShloka": {
      "sanskrit": "प्रधानं प्रकृतिं चेति यदाहुर्लिङ्गमुत्तमम्। गन्धवर्णरसैर्हीनं शब्दस्पर्शादिवर्जितम्॥",
      "transliteration": "Pradhanam prakritim cheti yadadhurlingamuttamam | Gandhavarnarasaihinam shabdaparshadirvarjitam ||",
      "meaningEn": "The supreme Linga is declared to be the primal cosmic cause (Pradhana / Prakriti) – devoid of smell, color, taste, sound, and touch, the infinite origin from which all creation emerges."
    },
    "slug": "linga-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "skanda",
    "number": 9,
    "nameEn": "Skanda Purana",
    "nameSa": "स्कन्दपुराणम्",
    "nameTe": "స్కంద పురాణము",
    "category": "Shaiva",
    "guna": "Tamasika",
    "emoji": "🦚",
    "verseCount": 81100,
    "author": "Maharshi Veda Vyasa (The Largest Purana)",
    "structure": "7 Massive Khandas: Mahesvara, Vaishnava, Brahma, Kashi, Avanti, Nagara, Prabhasa",
    "primaryDeities": [
      "Lord Skanda (Kartikeya)",
      "Lord Shiva",
      "Sri Venkateswara",
      "Sri Jagannath"
    ],
    "famousStotras": [
      "Sri Guru Gita",
      "Sri Satyanarayana Vrata Katha",
      "Sri Venkateswara Suprabhatam & Stotrams",
      "Kashi Vishwanath Ashtakam"
    ],
    "famousStories": [
      "Kashi Khanda – The cosmic sanctity of Varanasi and liberation upon death",
      "Venkatachala Mahatmya – Lord Srinivasa’s arrival at Tirumala Tirupati",
      "Arunachala Mahatmya – Shiva manifesting as the column of fire at Tiruvannamalai",
      "Kartikeya Avatara – Birth of Subrahmanya to destroy demon Tarakasura",
      "Sri Satyanarayana Swami Vrata – The beloved household vrata of prosperity"
    ],
    "summaryEn": "At 81,100 verses, the Skanda Purana is the largest Puranic text in existence. It is an extraordinary geographical and spiritual monument covering sacred shrines across the subcontinent. It is the direct source of the beloved Sri Satyanarayana Vrata Katha (in Reva Khanda), the profound Sri Guru Gita (in Uttarakhanda), the Kashi Khanda (celebrating Varanasi), and the Venkatachala Mahatmya (the origin of Tirumala Tirupati Balaji).",
    "summaryTe": "81,100 శ్లోకాలతో సమస్త పురాణాలలో అతి పెద్దదైన మహాపురాణం. ప్రతి ఇంటా భక్తితో ఆచరించే \"శ్రీ సత్యనారాయణ స్వామి వ్రత కథ\", గురు-శిష్య సంబంధాన్ని బ్రహ్మజ్ఞానంగా మలిచే \"శ్రీ గురుగీత\", శ్రీనాథుని కావ్యంగా ప్రసిద్ధి చెందిన \"కాశీ ఖండం\", మరియు కలియుగ ప్రత్యక్ష దైవం తిరుమల శ్రీ వేంకటేశ్వర స్వామి చరిత్రను తెలిపే \"వేంకటాచల మాహాత్మ్యం\" ఈ పురాణంలోని దివ్య భాగాలు.",
    "keyShloka": {
      "sanskrit": "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥",
      "transliteration": "Gururbrahma gururvishnuh gururdevo maheshvarah | Guruh sakshat param brahma tasmai shrigurave namah ||",
      "meaningEn": "The Guru is Brahma (the Creator), the Guru is Vishnu (the Preserver), the Guru is Maheshvara (the Transformer). The Guru is verily the Supreme Absolute Brahman; salutations to that holy Guru!"
    },
    "slug": "skanda-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "agni",
    "number": 10,
    "nameEn": "Agni Purana",
    "nameSa": "अग्निपुराणम्",
    "nameTe": "అగ్ని పురాణము",
    "category": "Shaiva",
    "guna": "Tamasika",
    "emoji": "🔥",
    "verseCount": 15400,
    "author": "Maharshi Veda Vyasa (Revealed by Agni Deva to Sage Vashishta)",
    "structure": "383 Adhyayas covering sacred and practical Vedic sciences",
    "primaryDeities": [
      "Agni Deva",
      "Maha Vishnu",
      "Lord Shiva",
      "Devi Durga",
      "Surya"
    ],
    "famousStotras": [
      "Agni Gita",
      "Vishnu Trailokya Mohana Kavacha",
      "Mrityunjaya Mantras",
      "Saraswati Stotram"
    ],
    "famousStories": [
      "Descent of Fire – Agni revealing cosmic and earthly wisdom to Sage Vashishta",
      "Dhanurveda – Ancient military science and archery formulations",
      "Vastu and Temple Architecture – Precise geometric formulas for temple design",
      "Ayurveda and Toxicology – Herbal remedies for human and animal welfare"
    ],
    "summaryEn": "Revered as the ancient Indian Encyclopedia, revealed by the Fire God Agni to Sage Vashishta. Across 383 chapters, it documents Dhanurveda (martial arts and weapons), Ayurveda (medicine, pediatrics, veterinary cures), Vastu Shastra (temple and home architecture), Jyotisha (astrology), Sanskrit poetics, figures of speech (Alamkara), grammar, and statecraft alongside rituals and mantras.",
    "summaryTe": "అగ్నిదేవుడు వశిష్ఠ మహర్షికి ఉపదేశించిన సకల ప్రాచీన విజ్ఞాన సర్వస్వం (Encyclopedia). ఇందులో కేవలం ఆధ్యాత్మిక విషయాలే కాక, ధనుర్వేదం (యుద్ధ విద్య), ఆయుర్వేదం, శిల్ప-వాస్తు శాస్త్రం, జ్యోతిష్యం, సాముద్రికం, సంస్కృత అలంకార శాస్త్రం, రాజధర్మం, మరియు మంత్ర శాస్త్రాలు ఆచరణాత్మకంగా అద్భుతంగా పొందుపరచబడ్డాయి.",
    "keyShloka": {
      "sanskrit": "अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम्। होतारं रत्नधातमम्॥",
      "transliteration": "Agnimile purohitam yajnasya devamritvijam | Hotaram ratnadhatamam ||",
      "meaningEn": "I praise Agni, the household priest, the divine minister of the sacred sacrifice, the invoker of celestials, the bestower of the greatest spiritual treasures."
    },
    "slug": "agni-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "kurma",
    "number": 11,
    "nameEn": "Kurma Purana",
    "nameSa": "कूर्मपुराणम्",
    "nameTe": "కూర్మ పురాణము",
    "category": "Shaiva",
    "guna": "Tamasika",
    "emoji": "🐢",
    "verseCount": 17000,
    "author": "Maharshi Veda Vyasa (Spoken by Kurma Avatar to Indradyumna)",
    "structure": "2 Bhagas: Purva Vibhaga (53 ch.) & Uttara Vibhaga (46 ch.)",
    "primaryDeities": [
      "Lord Kurma (Vishnu)",
      "Paramashiva",
      "Devi Durga"
    ],
    "famousStotras": [
      "Ishvara Gita (11 Chapters of high Vedantic philosophy)",
      "Vyasa Gita",
      "Shiva Stuti by Kurma"
    ],
    "famousStories": [
      "Kurma Epiphany – The Lord appearing as the giant tortoise supporting Mount Mandara",
      "Ishvara Gita – Lord Shiva instructing the rishis on Atman, Maya, and Brahman",
      "Synthesis of Hari and Hara – Demonstrating that Vishnu and Shiva are non-different",
      "Sage Markandeya’s Prayer for immortality"
    ],
    "summaryEn": "Narrated by Lord Vishnu in His Kurma (tortoise) incarnation to King Indradyumna during the churning of the ocean. Its greatest treasure is the 'Ishvara Gita' (contained in the Uttara Vibhaga), which parallels the Bhagavad Gita: Lord Shiva reveals His cosmic form and instructs the sages in deep Advaitic philosophy, demonstrating the ultimate oneness of Shiva and Vishnu.",
    "summaryTe": "సముద్ర మథన సమయంలో మందర పర్వతాన్ని మోసిన కూర్మావతారంలో శ్రీమహావిష్ణువు ఇంద్రద్యుమ్న మహారాజుకు చేసిన దివ్యోపదేశం. ఈ పురాణంలోని \"ఈశ్వర గీత\" భగవద్గీతతో సమానమైన తాత్విక నిధి. ఇందులో పరమశివుడు తన విశ్వరూపాన్ని చూపిస్తూ భక్తి-జ్ఞాన యోగాలను బోధిస్తాడు. హరి-హరులు ఒక్కటేనని నిరూపించే సమన్వయ పురాణమిది.",
    "keyShloka": {
      "sanskrit": "नमोऽस्तु रामाय सक्ष्मणाय देव्यै च तस्यै जनकात्मजायै। नमोऽस्तु रुद्रेन्द्रयमानिलेभ्यो नमोऽस्तु चन्द्रार्कमरुद्गणेभ्यः॥",
      "transliteration": "Namostu ramaya salakshmanaya devyai cha tasyai janakatmajayai | Namostu rudrendrayamanilebhyo namostu chandrarkamarudganebhyah ||",
      "meaningEn": "Salutations to Sri Rama along with Lakshmana and the divine daughter of Janaka, Sita Devi! Salutations to Rudra, Indra, Yama, and the wind gods; salutations to the Moon, the Sun, and the Marut celestial hosts."
    },
    "slug": "kurma-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "matsya",
    "number": 12,
    "nameEn": "Matsya Purana",
    "nameSa": "मत्स्यपुराणम्",
    "nameTe": "మత్స్య పురాణము",
    "category": "Shaiva",
    "guna": "Tamasika",
    "emoji": "🐟",
    "verseCount": 14000,
    "author": "Maharshi Veda Vyasa (Revealed by Matsya Avatar to King Manu)",
    "structure": "291 Adhyayas",
    "primaryDeities": [
      "Lord Matsya (Vishnu)",
      "Lord Shiva",
      "Devi Parvati",
      "Manu"
    ],
    "famousStotras": [
      "Matsya Stotram",
      "Shiva-Parvati Sambhashana",
      "Pitru Stuti"
    ],
    "famousStories": [
      "The Great Deluge (Pralaya) – Matsya guiding Manu’s boat tied to His horn",
      "Origin of Vastu Purusha – The cosmic entity governing buildings and temples",
      "Iconography and Murti Shilpa – Classical proportions for carving sacred murtis",
      "The Legend of King Yayati and his sons"
    ],
    "summaryEn": "Delivered by Lord Vishnu in His primeval fish incarnation (Matsya) to King Satyavrata (Manu) as their boat rested safely amidst the cosmic deluge. It is a fundamental source for temple engineering, containing exhaustive manuals on Vastu Shastra (origin of the Vastu Purusha), Shilpa Shastra (precise iconography and proportions of deities), genealogy of kings, and sacred festivals.",
    "summaryTe": "మహా ప్రళయ కాలంలో శ్రీ మహావిష్ణువు చేప రూపాన్ని ధరించి, సత్యవ్రతుడైన మనువు యొక్క నావను కాపాడిన సందర్భంలో చేసిన ఉపదేశమిది. వాస్తు శాస్త్రానికి (వాస్తు పురుషుని ఆవిర్భావం) మరియు శిల్ప శాస్త్రానికి (విగ్రహ నిర్మాణ కొలతలు, లక్షణాలు) అత్యంత ప్రాచీన ప్రామాణిక గ్రంథం. పవిత్ర నర్మదా నదీ మహిమలు, పితృదేవతల శ్రాద్ధ విధులు ఇందులో విపులంగా ఉన్నాయి.",
    "keyShloka": {
      "sanskrit": "प्रलयपयोधिजले धृतवानसि वेदम्। विहितवहित्रचरित्रमखेदम्। केशव धृतमीनशरीर जय जगदीश हरे॥",
      "transliteration": "Pralayapayodhijale dhritavanasi vedam | Vihitavahitracharitramakhedam | Keshava dhritaminasharira jaya jagadisha hare ||",
      "meaningEn": "O Lord Keshava! In the waters of the great cosmic deluge, You took the form of a fish and upheld the sacred Vedas like an unshakeable boat. All glories to You, Lord of the Universe, Hari!"
    },
    "slug": "matsya-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "brahma",
    "number": 13,
    "nameEn": "Brahma Purana",
    "nameSa": "ब्रह्मपुराणम्",
    "nameTe": "బ్రహ్మ పురాణము",
    "category": "Brahma",
    "guna": "Rajasika",
    "emoji": "☀️",
    "verseCount": 10000,
    "author": "Maharshi Veda Vyasa (Known as the Adi Purana)",
    "structure": "245 Adhyayas across Purva and Uttara Bhagas",
    "primaryDeities": [
      "Lord Brahma",
      "Surya Bhagavan",
      "Lord Purushottama (Jagannath)"
    ],
    "famousStotras": [
      "Surya Ashtakam",
      "Gautami Ganga Stotram",
      "Purushottama Stuti"
    ],
    "famousStories": [
      "Gautami Mahatmya – Descent of Godavari by Sage Gautama across 106 chapters",
      "King Indradyumna and the wooden Daru manifestation of Lord Jagannath",
      "Solar rituals at Konark (Arka Kshetra) and creation of the solar universe"
    ],
    "summaryEn": "Traditionally placed first among all 18 Puranas and hence known as the 'Adi Purana'. It details the cosmic creation emerging from Brahma, extensive pilgrimages along the sacred Godavari river (*Gautami Mahatmya* across 106 chapters), the manifestation of Lord Jagannath at Puri, and guidelines for worshipping the Sun God Surya at Konark.",
    "summaryTe": "పురాణాల జాబితాలో ప్రథమ స్థానంలో ఉండటం వల్ల దీనిని \"ఆది పురాణం\" అంటారు. గోదావరి నది యొక్క పవిత్రతను, గౌతమ మహర్షి ఘనతను చాటిచెప్పే 106 అధ్యాయాల 'గౌతమీ మాహాత్మ్యం' ఈ పురాణానికి హృదయం వంటిది. పూరీ జగన్నాథ క్షేత్ర వైభవం, కోణార్క్ సూర్య దేవాలయ విశేషాలు, సృష్టి ప్రారంభ వృత్తాంతాలు ఇందులో అద్భుతంగా వర్ణించబడ్డాయి.",
    "keyShloka": {
      "sanskrit": "नमो विवस्वते ब्रह्मन् भास्वते विष्णुतेजसे। जगत्सavitre शुचये सवित्रे कर्मदायिने॥",
      "transliteration": "Namo vivasvate brahman bhasvate vishnutejase | Jagatsavitre shuchaye savitre karmadayine ||",
      "meaningEn": "Salutations to the brilliant Sun God Vivasvan, the radiant manifestation of Vishnu’s effulgence, the creator of the world, pure, inspiring and bestowing righteousness upon all beings."
    },
    "slug": "brahma-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Creation of the Universe",
        "titleTe": "విశ్వ సృష్టి క్రమము",
        "summaryEn": "The earliest cosmogony from Hiranyagarbha and the emergence of Prajapatis and cosmic elements.",
        "summaryTe": "హిరణ్యగర్భం నుండి సకల లోకాలు, ప్రజాపతులు మరియు పంచభూతాలు ఆవిర్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Gods and Sages",
        "titleTe": "దేవతలు మరియు మహర్షుల వంశావళి",
        "summaryEn": "Lineage of Kashyapa, Aditi, Diti, and the progenitors of the three worlds.",
        "summaryTe": "కశ్యప ప్రజాపతి, అదితి, దితి సంతతి మరియు సమస్త ప్రాణికోటి పూర్వీకుల చరిత్ర."
      },
      {
        "number": 3,
        "titleEn": "Description of the Earth & Oceans",
        "titleTe": "భూగోళం మరియు సాగర ద్వీప వర్ణన",
        "summaryEn": "Geographical layout of continents, oceans, sacred mountains, and holy Bharatavarsha.",
        "summaryTe": "భూమండల విస్తీర్ణం, సముద్రాలు, పర్వతాలు మరియు పవిత్ర భారత భూమి వైశిష్ట్యం."
      },
      {
        "number": 4,
        "titleEn": "The Glory of Puri Jagannath",
        "titleTe": "పూరీ జగన్నాథ క్షేత్ర మాహాత్మ్యం",
        "summaryEn": "King Indradyumna’s vision and the divine crafting of the holy wooden deities.",
        "summaryTe": "ఇంద్రద్యుమ్న మహారాజు భక్తికి మెచ్చి దారువు రూపంలో జగన్నాథుడు వెలసిన గాథ."
      },
      {
        "number": 5,
        "titleEn": "Surya Worship & Solar Liturgy",
        "titleTe": "సూర్యోపాసన మరియు సౌర మాహాత్మ్యం",
        "summaryEn": "Guidelines for worshipping the visible Sun God to achieve vitality, health, and vision at Konark.",
        "summaryTe": "ప్రత్యక్ష దైవమైన సూర్య భగవానుని ఆరాధనా విధి, ఆరోగ్యం మరియు దీర్ఘాయుష్షు ప్రసాదించే మార్గం."
      },
      {
        "number": 6,
        "titleEn": "Gautami Mahatmya - The Sacred Godavari",
        "titleTe": "గౌతమీ మాహాత్మ్యం - గోదావరి నదీ ప్రవాహం",
        "summaryEn": "Sage Gautama bringing down Ganga as Godavari across 106 inspiring chapters with 100+ tirthas.",
        "summaryTe": "గౌతమ మహర్షి తపస్సుతో గంగను గోదావరిగా భూమికి తెచ్చి పునీతం చేసిన 106 అధ్యాయాల అమృత కథ."
      },
      {
        "number": 7,
        "titleEn": "Dharma, Ethics & Social Conduct",
        "titleTe": "ధర్మం మరియు సదాచార నియమాలు",
        "summaryEn": "The four Varnas, Ashramas, filial piety, and righteousness in personal and public life.",
        "summaryTe": "వర్ణాశ్రమ ధర్మాలు, పెద్దలను గౌరవించుట మరియు మానవ జీవనంలో పాటించాల్సిన సత్య నిష్ఠ."
      },
      {
        "number": 8,
        "titleEn": "Yoga & Meditation Techniques",
        "titleTe": "యోగాభ్యాసము మరియు ప్రాణాయామం",
        "summaryEn": "Pranayama, Dharana, and Dhyana purifying the mind to perceive the inner Supreme Light.",
        "summaryTe": "మనో నిగ్రహము, ప్రాణాయామము మరియు అంతర్ముఖులై పరమాత్ముని ధ్యానించే యోగ పద్ధతులు."
      },
      {
        "number": 9,
        "titleEn": "Sacred Pilgrimage Sites (Tirthas)",
        "titleTe": "పుణ్య తీర్థాలు మరియు స్నాన ఫలము",
        "summaryEn": "The spiritual merit of bathing at holy river confluences and sacred temples.",
        "summaryTe": "నదీ సంగమాలు, పుష్కరాలు మరియు పవిత్ర తీర్థ దర్శనం వల్ల కలిగే జన్మజన్మాంతర పుణ్య ఫలం."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Supreme Liberation",
        "titleTe": "మోక్ష స్వరూపము మరియు పరమపదం",
        "summaryEn": "The departure from the cycle of birth and death into the eternal realm of Brahman.",
        "summaryTe": "జనన మరణ చక్రం నుండి విముక్తి పొంది నిత్యానంద బ్రహ్మ స్థితిని చేరుకొనే పరమ గమ్యం."
      }
    ]
  },
  {
    "id": "brahmanda",
    "number": 14,
    "nameEn": "Brahmanda Purana",
    "nameSa": "ब्रह्माण्डपुराणम्",
    "nameTe": "బ్రహ్మాండ పురాణము",
    "category": "Brahma",
    "guna": "Rajasika",
    "emoji": "🌌",
    "verseCount": 18000,
    "author": "Maharshi Veda Vyasa",
    "structure": "4 Padas: Prakriya, Anushanga, Upodghata, Upasamhara (Includes Lalita Mahatmya)",
    "primaryDeities": [
      "Lalita Tripurasundari",
      "Sri Rama",
      "Lord Shiva",
      "Lord Brahma"
    ],
    "famousStotras": [
      "Sri Lalita Sahasranama Stotram",
      "Sri Lalita Trishati",
      "Adhyatma Ramayana",
      "Aditya Hridaya Stotra references"
    ],
    "famousStories": [
      "Descent of Sri Lalita Tripurasundari to destroy demon Bhandasura",
      "Hayagriva instructing Sage Agastya on the thousand names of the Divine Mother",
      "Adhyatma Ramayana – The philosophical, non-dual essence of the Ramayana",
      "Parashurama slaying Kartavirya Arjuna"
    ],
    "summaryEn": "Named after the Golden Cosmic Egg (Brahmanda) from which the universe hatched. It is the sacred origin of two of the most revered spiritual texts in Hinduism: the **Sri Lalita Sahasranama** (the thousand names of Divine Mother Lalita Tripurasundari revealed by Lord Hayagriva to Sage Agastya) and the **Adhyatma Ramayana**, which interprets Sri Rama's life through pure Advaita Vedanta.",
    "summaryTe": "బ్రహ్మాండం (విశ్వం) ఆవిర్భవించిన క్రమాన్ని తెలియజేసే మహోన్నత గ్రంథం. శాక్త సంప్రదాయానికి తలమానికమైన, కోట్లాది మంది భక్తులు నిత్యం పఠించే \"శ్రీ లలితా సహస్రనామ స్తోత్రం\" మరియు \"లలితా త్రిశతి\" ఈ పురాణంలోని భాగాలే (హయగ్రీవుడు అగస్త్య మహర్షికి ఉపదేశించారు). అంతేకాకుండా శ్రీరాముని తత్వజ్ఞానాన్ని అందించే \"అధ్యాత్మ రామాయణం\" కూడా ఈ పురాణంలోనే వెలిసింది.",
    "keyShloka": {
      "sanskrit": "श्रीमाता श्रीमहाराज्ञी श्रीमत्सिंहासनेश्वरी। चिदग्निकुण्डसम्भूता देवकार्यसमुद्यता॥",
      "transliteration": "Shrimata shrimaharajni shrimatsimhasaneshvari | Chidagnikundasambhoota devakaryasamudyata ||",
      "meaningEn": "Salutations to Sri Mata (the Divine Mother of all worlds), the Great Empress of the cosmos, the Queen seated on the supreme lion-throne, who manifested from the sacrificial altar of pure Consciousness to fulfill the cosmic mission of the celestials!"
    },
    "slug": "brahmanda-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "brahmavaivarta",
    "number": 15,
    "nameEn": "Brahma Vaivarta Purana",
    "nameSa": "ब्रह्मवैवर्तपुराणम्",
    "nameTe": "బ్రహ్మవైవర్త పురాణము",
    "category": "Brahma",
    "guna": "Rajasika",
    "emoji": "💖",
    "verseCount": 18000,
    "author": "Maharshi Veda Vyasa (Dialogue between Narayana and Narada)",
    "structure": "4 Khandas: Brahma, Prakriti, Ganesha, Krishna Janma Khandas",
    "primaryDeities": [
      "Sri Radha & Sri Krishna (Goloka)",
      "Lord Ganesha",
      "Pancha Prakritis"
    ],
    "famousStotras": [
      "Radha Kripa Kataksha Stotram",
      "Radha Sahasranama",
      "Ganesha Kavacha",
      "Surabhi Stuti"
    ],
    "famousStories": [
      "Goloka Dhama – The eternal supreme abode higher than Vaikuntha",
      "Divine Marriage of Radha and Krishna performed by Lord Brahma in Vrindavana",
      "Ekadanta Episode – How Ganesha lost a tusk to Parashurama’s axe",
      "Pancha Prakriti Manifestation – The five cosmic mothers: Durga, Lakshmi, Saraswati, Savitri, Radha"
    ],
    "summaryEn": "A scripture of elevated devotion centered on the Goloka abode where Sri Krishna and Sri Radha reign eternally. It presents the universe as a transformation (Vivarta) of Brahman. The Ganesha Khanda narrates the birth of Ganesha and how He became 'Ekadanta' (single-tusked) after absorbing Parashurama’s blow, while the Prakriti Khanda glorifies the five primal mother energies of creation.",
    "summaryTe": "రాధాకృష్ణుల నిత్య దివ్య లీలా విలాసాల నిలయమైన గోలోకాన్ని సాక్షాత్కరింపజేసే పురాణం. బ్రహ్మ, ప్రకృతి, గణేశ, శ్రీకృష్ణ జన్మ ఖండాలనే 4 భాగాలు ఉన్నాయి. బ్రహ్మదేవుడే పురోహితుడై జరిపించిన రాధాకృష్ణుల దివ్య వివాహం, పరశురాముని గొడ్డలి దెబ్బను తన దంతంపై మోసి వినాయకుడు 'ఏకదంతుడు' అయిన వృత్తాంతం, మరియు పంచ ప్రకృతుల (దుర్గ, లక్ష్మి, సరస్వతి, సావిత్రి, రాధ) దివ్య వైభవం ఇందులో ప్రధానమైనవి.",
    "keyShloka": {
      "sanskrit": "रासेश्वरी रसिकमोहिनी राधिकास्या रासे स्थिता रसिकरासमयी विभाव्या। राधा रसप्रदपरा परमामृताभा तां राधिकां प्रणमतो मम मुक्तिरेव॥",
      "transliteration": "Raseshvari rasikamohini radhikasya rase sthita rasikarasamayi vibhavya | Radha rasapradapara paramamritabha tam radhikam pranamato mama muktireva ||",
      "meaningEn": "To Sri Radhika, the Queen of the divine Rasa dance, who charms the supreme enjoyer Krishna, who is the very embodiment of transcendental rasa and pure bliss – by bowing unto Her, supreme liberation is attained."
    },
    "slug": "brahmavaivarta-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "markandeya",
    "number": 16,
    "nameEn": "Markandeya Purana",
    "nameSa": "मार्कण्डेयपुराणम्",
    "nameTe": "మార్కండేయ పురాణము",
    "category": "Brahma",
    "guna": "Rajasika",
    "emoji": "⚔️",
    "verseCount": 9000,
    "author": "Maharshi Veda Vyasa (Revealed through Sage Markandeya & the Birds of Dharma)",
    "structure": "137 Adhyayas (Chapters 81 to 93 form the Devi Mahatmyam / Durga Saptashati)",
    "primaryDeities": [
      "Devi Durga / Chandi",
      "Surya Bhagavan",
      "Lord Brahma",
      "Indra"
    ],
    "famousStotras": [
      "Devi Mahatmyam (Sri Durga Saptashati / Chandi Path)",
      "Argala Stotram & Kilaka Stotram",
      "Devi Kavacham",
      "Narayani Stuti"
    ],
    "famousStories": [
      "Mahishasura Mardanam – The descent of Goddess Durga to vanquish the buffalo demon",
      "Destruction of Chanda, Munda, Raktabija, and Shumbha-Nishumbha",
      "Harishchandra Upakhyanam – The extraordinary trial and triumph of King Harishchandra",
      "Queen Madalasa’s Lullaby – Singing Advaitic truth to infants to bestow instant liberation",
      "Dattatreya and King Alarka – The profound teaching of yoga and detachment"
    ],
    "summaryEn": "One of the oldest and most beloved Puranas, free from sectarian rivalry. Its central glory is the **Devi Mahatmyam (Sri Durga Saptashati / Chandi Path)** spanning chapters 81 to 93, the bedrock of Shakta worship worldwide describing the Mother’s cosmic victories over Mahishasura and Raktabija. It also contains the legendary story of King Harishchandra and Queen Madalasa’s enlightened lullabies.",
    "summaryTe": "శాక్త సంప్రదాయానికి మూలస్తంభమైన పురాణమిది. ఇందులోని 81 నుండి 93 వరకు గల అధ్యాయాలే సమస్త లోకాలను రక్షించే 700 శ్లోకాల \"శ్రీ దుర్గా సప్తశతి\" (దేవీ మాహాత్మ్యం). మహిషాసుర మర్దనం, రక్తబీజ సంహారం, నారాయణీ స్తుతి ఇందులో ఉన్నాయి. సత్యమే సర్వోన్నతమని చాటిన సత్యహరిశ్చంద్రుని కథ, మరియు రాణి మదాలస తన పిల్లలకు జోలపాటల రూపంలో నేర్పిన అద్వైత ఆత్మజ్ఞానం ఈ పురాణానికి వన్నె తెచ్చాయి.",
    "keyShloka": {
      "sanskrit": "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
      "transliteration": "Sarvamangalamangalye shive sarvarthasadhike | Sharanye tryambake gauri narayani namostu te ||",
      "meaningEn": "O Auspiciousness of all that is auspicious! O beneficent Mother who fulfills every aspiration of the righteous! O refuge of all worlds, three-eyed Gauri, Narayani, salutations unto You!"
    },
    "slug": "markandeya-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "bhavishya",
    "number": 17,
    "nameEn": "Bhavishya Purana",
    "nameSa": "भविष्यपुराणम्",
    "nameTe": "భవిష్య పురాణము",
    "category": "Brahma",
    "guna": "Rajasika",
    "emoji": "🔮",
    "verseCount": 14500,
    "author": "Maharshi Veda Vyasa",
    "structure": "4 Parvas: Brahma, Madhyama, Pratisarga, Uttara",
    "primaryDeities": [
      "Surya Bhagavan",
      "Lord Brahma",
      "Lord Shiva",
      "Lord Vishnu"
    ],
    "famousStotras": [
      "Aditya Kavacham",
      "Surya Sahasranama",
      "Dvadashaditya Stotra",
      "Shodasha Mahadana Prayers"
    ],
    "famousStories": [
      "Samba & the Sun Temple – Samba cured of leprosy through pure solar worship",
      "Shodasha Mahadana – The 16 supreme charitable offerings for human welfare",
      "Pratisarga Parva Prophecies – Dynasties, social transformations, and world events in Kali Yuga",
      "Surya Upasana – Solar rituals, healthcare, and seasonal calendars"
    ],
    "summaryEn": "Famed for its prophetic vision of future historical dynasties and religious epochs in the Pratisarga Parva. It is an extraordinary source on solar worship (Surya Upasana), detailing how Sri Krishna's son Samba cured his incurable affliction by establishing the great Sun temple. It also serves as the supreme classical manual on social charity, outlining the 16 Great Donations (Shodasha Mahadanas).",
    "summaryTe": "కాలచక్రంలో భవిష్యత్తులో జరగబోయే పరిణామాలను దర్శించిన అపురూప గ్రంథం. సూర్యారాధనకు అత్యంత ప్రాధాన్యతనిస్తూ, శ్రీకృష్ణుని కుమారుడైన సాంబుడు కుష్ఠు వ్యాధి నుండి విముక్తి పొంది సూర్య దేవాలయాన్ని నిర్మించిన కథ ఇందులో ఉంది. సమాజ శ్రేయస్సు కోసం ఆచరించాల్సిన 'షోడశ మహాదానాలు' (16 రకాల దానాలు), వృక్షారోపణ, తటాక నిర్మాణం వంటి ధర్మకార్యాలు ఇందులో వివరింపబడ్డాయి.",
    "keyShloka": {
      "sanskrit": "आदित्यस्य नमस्कारं ये कुर्वन्ति दिने दिने। जन्मान्तरसहस्रेषु दारिद्र्यं नोपजायते॥",
      "transliteration": "Adityasya namaskaram ye kurvanti dine dine | Janmantarasahasreshu daridryam nopajayate ||",
      "meaningEn": "Those who offer salutations to the Sun God Aditya day after day shall never know poverty across thousands of future lifetimes; they are blessed with radiant vitality, health, and spiritual wealth."
    },
    "slug": "bhavishya-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  },
  {
    "id": "vamana",
    "number": 18,
    "nameEn": "Vamana Purana",
    "nameSa": "वामनपुराणम्",
    "nameTe": "వామన పురాణము",
    "category": "Brahma",
    "guna": "Rajasika",
    "emoji": "☂️",
    "verseCount": 10000,
    "author": "Maharshi Veda Vyasa (Revealed by Sage Pulastya to Narada)",
    "structure": "95 Chapters (Sthanu Tirtha & Kurukshetra Mahatmya focus)",
    "primaryDeities": [
      "Bhagavan Vamana / Trivikrama",
      "Lord Shiva",
      "Devi Parvati"
    ],
    "famousStotras": [
      "Trivikrama Stuti by King Bali",
      "Shiva Sahasranama in Vamana Purana",
      "Sarva Deva Stuti"
    ],
    "famousStories": [
      "Vamana Avatara – The divine dwarf brahmachari asking three paces of land from King Bali",
      "Trivikrama Svarupa – Expanding to measure the heavens, earth, and underworld",
      "King Bali’s Ultimate Surrender – Offering his own head as the third footstep",
      "Kapalamochana Tirtha – Shiva’s release from Brahma’s severed fifth head at Varanasi"
    ],
    "summaryEn": "Dedicated to the sublime dwarf incarnation of Lord Vishnu who expanded as Trivikrama to cover all worlds in three paces, teaching the lesson of supreme surrender to King Bali. It seamlessly unites Vaishnava devotion with sacred Shaiva shrines, detailing holy places around Kurukshetra, the cosmic marriage of Shiva and Parvati, and the holy cleansing at Kapalamochana.",
    "summaryTe": "శ్రీ మహావిష్ణువు ఐదవ అవతారమైన వామనుని దివ్య చరిత్రను చాటే పురాణం. బలి చక్రవర్తి యజ్ఞశాలలో మూడడుగుల నేల యాచించి, త్రివిక్రమ రూపుడై ఆకాశాన్ని, భూమిని కొలిచి, మూడో అడుగుకు బలి శిరస్సునే స్వీకరించి అతనికి పాతాళ లోక ఆధిపత్యాన్ని ప్రసాదించిన లీల ఇందులో ముఖ్యమైనది. హరి-హరుల అభేదాన్ని, కురుక్షేత్ర బ్రహ్మ సరోవర పుణ్య తీర్థాల వైభవాన్ని ఈ పురాణం చాటుతుంది.",
    "keyShloka": {
      "sanskrit": "पदे पदे यत्पूज्यन्ते देवाः सेन्द्राः सहर्षिभिः। वामनाय नमो नित्यं दैत्यदर्पहराय च॥",
      "transliteration": "Pade pade yatpujyante devah sendrah saharshibhih | Vamanaya namo nityam daityadarpaharaya cha ||",
      "meaningEn": "At every footstep of Whose cosmic form all celestials including Indra and the great rishis offer worship, salutations forever unto Lord Vamana, the vanquisher of demonic ego and pride!"
    },
    "slug": "vamana-purana",
    "chapters": [
      {
        "number": 1,
        "titleEn": "Invocation & Cosmic Genesis",
        "titleTe": "ప్రారంభ ప్రార్థన మరియు విశ్వోద్భవ క్రమము",
        "summaryEn": "Cosmic evolution from primordial energy and the prayers of the sages.",
        "summaryTe": "మూల పరబ్రహ్మ నుండి పంచభూతాలు మరియు లోకాలు ఉద్భవించిన క్రమము."
      },
      {
        "number": 2,
        "titleEn": "Genealogy of Divine Dynasties",
        "titleTe": "దైవిక మరియు రాజవంశాల చరిత్ర",
        "summaryEn": "Lineages of great rulers, sages, and the preservation of Sanatana Dharma.",
        "summaryTe": "ధర్మాన్ని రక్షించిన పవిత్ర చక్రవర్తులు మరియు మహర్షుల వంశావళి."
      },
      {
        "number": 3,
        "titleEn": "Sacred Legends & Divine Avatars",
        "titleTe": "దివ్య అవతార లీలలు మరియు చారిత్రక కథలు",
        "summaryEn": "Incarnations of the Divine descending to eradicate negative forces.",
        "summaryTe": "అధర్మాన్ని నశింపజేసి భక్తులను కాపాడటానికి అవతరించిన భగవంతుని లీలలు."
      },
      {
        "number": 4,
        "titleEn": "Sacred Geography & Holy Tirthas",
        "titleTe": "పుణ్య క్షేత్రాలు మరియు తీర్థ దర్శన ఫలము",
        "summaryEn": "The purifying spiritual vibrations of holy rivers, temples, and mountains.",
        "summaryTe": "నదీ స్నానాలు, పుణ్యక్షేత్రాల దర్శనం వల్ల కలిగే ఆధ్యాత్మిక ప్రశాంతత."
      },
      {
        "number": 5,
        "titleEn": "Vedic Rites, Vratas & Festivals",
        "titleTe": "వైదిక వ్రతాలు, పూజా విధానాలు మరియు పండుగలు",
        "summaryEn": "Systematic observance of sacred fasts to clear accumulated karmas.",
        "summaryTe": "కర్మ బంధాలను తొలగించే పవిత్ర వ్రత కథలు మరియు ఆధ్యాత్మిక నియమాలు."
      },
      {
        "number": 6,
        "titleEn": "Codes of Dharma & Righteous Living",
        "titleTe": "సత్యధర్మం మరియు నిత్య జీవన సూత్రాలు",
        "summaryEn": "Universal human values: truth, non-violence, compassion, and charity.",
        "summaryTe": "సత్యం, దయ, దాన గుణం మరియు సమాజ శ్రేయస్సుకు దోహదపడే ఉత్తమ జీవన మార్గం."
      },
      {
        "number": 7,
        "titleEn": "Yoga, Meditation & Inner Awakening",
        "titleTe": "యోగాభ్యాసము మరియు ఆత్మ సాక్షాత్కారం",
        "summaryEn": "Mind control, pranayama, and concentration leading to divine consciousness.",
        "summaryTe": "చిత్తశుద్ధిని కలిగించే యోగ సాధన మరియు ఆత్మజ్ఞాన దర్శనం."
      },
      {
        "number": 8,
        "titleEn": "Stotras, Mantras & Chanting",
        "titleTe": "రక్షా స్తోత్రాలు, మంత్రాలు మరియు నామ సంకీర్తన",
        "summaryEn": "Divine hymns and sound vibrations that protect devotees from negativity.",
        "summaryTe": "సకల భయాలను, గ్రహ దోషాలను నివారించే శక్తిమంతమైన దివ్య స్తోత్రములు."
      },
      {
        "number": 9,
        "titleEn": "Karmic Cycles, Death & Rebirth",
        "titleTe": "కర్మ సిద్ధాంతము మరియు జీవుని గతి",
        "summaryEn": "The eternal journey of the soul across diverse realms based on actions.",
        "summaryTe": "మానవుని పుణ్యపాప కర్మలు మరియు మరణానంతర జీవ యాత్ర విశ్లేషణ."
      },
      {
        "number": 10,
        "titleEn": "Moksha - Attainment of the Supreme Goal",
        "titleTe": "మోక్ష ప్రాప్తి మరియు పరమ ముక్తి మార్గం",
        "summaryEn": "Unconditional surrender, unitive wisdom, and liberation from rebirth.",
        "summaryTe": "పరమాత్మలో ఐక్యమై జనన మరణ చక్రం నుండి శాశ్వత విముక్తి పొందే మోక్ష స్థితి."
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PURANAS };
}
