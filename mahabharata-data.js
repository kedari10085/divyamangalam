/* ============================================================
   DIVYA MANGALAM — SRIMAD MAHABHARATA (శ్రీమన్మహాభారతమ్)
   Comprehensive Canonical Database of the Great Indian Epic
   Composed by Maharshi Krishna-Dwaipayana Vyasa (Ganesha as Scribe)
   Translated into English Prose by Pratap Chandra Roy, C.I.E.
   Includes All 18 Parvas, Harivamsa, & Full Adi Parva 19 Upa-Parvas
   Bilingual: English & Telugu (తెలుగు) with Sanskrit (సంస్కృతం)
   ============================================================ */

const MAHABHARATA_METADATA = {
  titleEn: "The Mahabharata of Krishna-Dwaipayana Vyasa",
  titleSa: "श्रीमन्महाभारतम्",
  titleTe: "శ్రీమన్మహాభారతము",
  composer: "Maharshi Krishna-Dwaipayana Vyasa (శ్రీ వేదవ్యాస మహర్షి)",
  scribe: "Lord Sri Vighneshwara Ganesha (శ్రీ విఘ్నేశ్వరుడు)",
  narrators: [
    "Maharshi Vyasa to Sage Vaisampayana",
    "Sage Vaisampayana to King Janamejaya at the Sarpa Satra",
    "Suta Ugrasravas (Sauti) to Sage Saunaka & Rishis in Naimisharanya"
  ],
  translator: "Pratap Chandra Roy, C.I.E. (Oriental Publishing Co., Calcutta)",
  totalParvas: 18,
  totalUpaParvas: 100,
  totalShlokas: 100000,
  epicName: "Shatasahasri Samhita (శతసాహస్రీ సంహిత / 100,000 Verses)",
  originalLayers: [
    { name: "Jaya (జయ)", verses: 8800, theme: "The Core Victory of Righteousness over Evil" },
    { name: "Bharata (భారత)", verses: 24000, theme: "The Extended Tale of the Bharata Dynasty (by Vaisampayana)" },
    { name: "Mahabharata (మహాభారత)", verses: 100000, theme: "The Universal Cosmic & Ethical Encyclopedia (by Sauti)" }
  ],
  famousDeclaration: {
    sanskrit: "यदिहास्ति तदन्यत्र यन्नेहास्ति न तत्क्वचित्॥",
    transliteration: "Yadihasti tadanyatra yannehasti na tatkvachit ||",
    meaningEn: "Whatever is found here regarding Dharma, Artha, Kama, and Moksha is found elsewhere; but what is not found here is found nowhere else!",
    meaningTe: "ధర్మ, అర్థ, కామ, మోక్షముల విషయములో ఇక్కడ ఉన్నదే మరెక్కడైనా ఉండును; ఇక్కడ లేనిది లోకములో ఎక్కడా కానరాదు!"
  },
  openingHymn: {
    sanskrit: "नारायणं नमस्कृत्य नरं चैव नरोत्तमम्। देवी सरस्वतीं व्यासं ततो जयमुदीरयेत्॥",
    transliteration: "Narayanam namaskritya naram chaiva narottamam | Devim Sarasvatim Vyasam tato jayam udirayet ||",
    meaningEn: "Bowing down to Narayana (the Supreme Lord), to Nara (the best of human beings), to Devi Saraswati (the Goddess of Learning), and to Sage Vyasa, let the word 'Jaya' (victory) be uttered!",
    meaningTe: "నారాయణునికి, నరోత్తముడైన నరునికి, విద్యాప్రదాతయైన సరస్వతీ దేవికి, మరియు వ్యాస భగవానునికి ప్రణమిల్లి 'జయ'మను ఈ ఇతిహాసమును ఉచ్చరించవలెను!"
  }
};

/* ===== THE 18 PARVAS (అష్టాదశ పర్వాలు) OVERVIEW ===== */
const MAHABHARATA_PARVAS = [
  {
    number: 1,
    id: "adi-parva",
    nameEn: "Adi Parva",
    nameSa: "आदिपर्वन्",
    nameTe: "ఆది పర్వము",
    subtitleEn: "The Book of the Beginning",
    subtitleTe: "సృష్టి, వంశావళి మరియు ప్రథమ ఘట్టము",
    upaParvasCount: 19,
    adhyayasCount: 236,
    shlokasCount: 8884,
    keyThemes: ["Cosmic Origins", "Churning of the Ocean", "Birth of Pandavas & Kauravas", "Lac House", "Draupadi Swayamvara", "Burning of Khandava"],
    summaryEn: "The foundational book of the epic. Narrated by Sauti to Saunaka in Naimisharanya, it recounts the snake sacrifice of King Janamejaya, the descent of celestials, the birth and youth of the Pandavas and Kauravas, their training under Drona, the escape from the House of Lac, Bhima's slaying of demons Hidimba and Bakasura, Arjuna winning Draupadi at her Swayamvara, the founding of Indraprastha, Arjuna's twelve-year pilgrimage, and the burning of Khandava forest where Arjuna obtains the divine Gandiva bow.",
    summaryTe: "మహాభారత ప్రారంభ పర్వము. నైమిశారణ్యములో శౌనకాది మహర్షులకు సూతుడు వినిపించిన కథ. జనమేజయుని సర్పయాగము, కద్రూ-వినతల పందెము, అమృత మథనము, గరుడ జననము, కురువంశ మూలాలు, భీష్మ ప్రతిజ్ఞ, పాండవ-కౌరవుల జననము, ద్రోణుని విలువిద్యా శిక్షణ, ఏకలవ్యుని గురుభక్తి, లక్కఇంటి దహనము నుండి తప్పించుకొనుట, బక-హిడింబాసుర వధలు, ద్రౌపదీ స్వయంవరము, ఇంద్రప్రస్థ నగర నిర్మాణము, అర్జునుని తీర్థయాత్రలు, మరియు ఖాండవ వన దహనము ద్వారా గాండీవ ధనువు లభించుట ఇందులో ముఖ్యమైనవి.",
    quote: "Truth is heavy and weighty; a hundred horse-sacrifices weighed against truth kick the beam. Truth is the supreme penance, truth is the highest sacrifice."
  },
  {
    number: 2,
    id: "sabha-parva",
    nameEn: "Sabha Parva",
    nameSa: "सभापर्वन्",
    nameTe: "సభా పర్వము",
    subtitleEn: "The Book of the Assembly Hall",
    subtitleTe: "మయసభ, రాజసూయ యాగము మరియు ద్యూత క్రీడ",
    upaParvasCount: 9,
    adhyayasCount: 72,
    shlokasCount: 2511,
    keyThemes: ["Mayasabha Architecture", "Rajasuya Yagna", "Shishupala Vadha", "The Loaded Dice Game", "Disrobing of Draupadi", "Exile Decree"],
    summaryEn: "Maya Danava builds the breathtaking celestial palace (Mayasabha) for King Yudhishthira. Yudhishthira performs the imperial Rajasuya sacrifice, establishing sovereignty over Aryavarta, where Sri Krishna slays Shishupala. Consumed by jealousy at the palace's splendor, Duryodhana and Sakuni lure Yudhishthira into an unethical game of dice. Yudhishthira loses his kingdom, brothers, himself, and Queen Draupadi. Duhsasana drags Draupadi into the assembly, but Lord Krishna miraculously supplies endless garments. The Pandavas are condemned to 12 years of forest exile and 1 year incognito.",
    summaryTe: "మయదానవుడు నిర్మించిన అద్భుతమైన మయసభలో ధర్మరాజు రాజసూయ యాగమును దిగ్విజయంగా నిర్వహించుట, శ్రీకృష్ణుడు శిశుపాలుని వధించుట. అసూయాగ్రస్తుడైన దుర్యోధనుడు శకునితో కలిసి పాచికల మాయాద్యూతము నాడించి ధర్మరాజును సర్వస్వం కోల్పోయేలా చేయుట, నిండు సభలో ద్రౌపదీ వస్త్రాపహరణ యత్నం మరియు శ్రీకృష్ణుని అక్షయవస్త్ర కరుణ, చివరకు పాండవులు 12 ఏళ్ళ అరణ్యవాసము, 1 ఏడు అజ్ఞాతవాసమునకు వెళ్ళుట.",
    quote: "Dharma, when destroyed, destroys; dharma, when protected, protects. Therefore, dharma must never be violated."
  },
  {
    number: 3,
    id: "vana-parva",
    nameEn: "Vana Parva (Aranyaka)",
    nameSa: "वनपर्वन् (आरण्यकपर्वन्)",
    nameTe: "వన పర్వము (ఆరణ్యక పర్వము)",
    subtitleEn: "The Book of the Forest",
    subtitleTe: "ద్వాదశ వార్షిక అరణ్యవాసము మరియు ఆధ్యాత్మిక ఉపదేశాలు",
    upaParvasCount: 21,
    adhyayasCount: 269,
    shlokasCount: 11664,
    keyThemes: ["Akshaya Patra", "Kirata-Arjuniya (Pashupatastra)", "Nala-Damayanti", "Savitri-Satyavan", "Yaksha Prashna"],
    summaryEn: "Chronicling the Pandavas' 12-year forest exile. Surya bestows the inexhaustible Akshaya Patra upon Yudhishthira. Arjuna undergoes rigorous tapasya on Mount Indrakeela, fights Lord Shiva disguised as a Kirata (hunter), and receives the divine Pashupatastra, then visits Amaravati to acquire celestial weapons from Indra. Contains sublime philosophical gems and sub-epics: the romance of Nala and Damayanti, Sage Rishyasringa, King Sibi, the steadfast love of Savitri triumphing over Yama, and the profound climax of Yaksha Prashna where Yudhishthira answers the questions of Dharma.",
    summaryTe: "పాండవుల 12 ఏళ్ళ కష్టతరమైన అరణ్యవాస గాథ. సూర్యుని నుండి అక్షయపాత్ర లభించుట, ఇంద్రకీలాద్రిపై అర్జునుని ఘోర తపస్సు, కిరాతార్జునీయ యుద్ధంలో పరమేశ్వరుని ప్రసన్నం చేసుకుని పాశుపతాస్త్రం పొందుట. నల-దమయంతుల కథ, సత్యవాన్-సావిత్రి యమునితో సంవాదము, మరియు యక్షప్రశ్నలలో ధర్మరాజు పలికిన అద్భుతమైన ధర్మసూక్ష్మాలు ఇందులో రత్నాలు.",
    quote: "What is the greatest wonder in the world? Day after day, countless beings depart to the abode of Yama, yet those who remain believe they will live forever."
  },
  {
    number: 4,
    id: "virata-parva",
    nameEn: "Virata Parva",
    nameSa: "विराटपर्वन्",
    nameTe: "విరాట పర్వము",
    subtitleEn: "The Book of Virata (Incognito Year)",
    subtitleTe: "మత్స్య దేశములో అజ్ఞాతవాసము",
    upaParvasCount: 5,
    adhyayasCount: 67,
    shlokasCount: 2050,
    keyThemes: ["Incognito Disguises", "Kankabhatta, Ballava, Brihannala", "Sairandhri & Keechaka Vadha", "Gograhana War", "Marriage of Abhimanyu & Uttara"],
    summaryEn: "The thirteenth year of exile spent in strict disguise at the court of King Virata of Matsya. Yudhishthira is Kanka the courtier; Bhima is Ballava the master chef and wrestler; Arjuna is Brihannala the dance master; Nakula is Granthika the master of horses; Sahadeva is Tantripala the cowherd; Draupadi is Sairandhri the royal hairdresser. Bhima slays the villainous commander Keechaka who tries to assault Draupadi. When the Kaurava army attacks Matsya to steal their cattle, Arjuna single-handedly routs the entire Kaurava host using the Sammohana astra. The identity is revealed at the year's end, and Abhimanyu weds Princess Uttara.",
    summaryTe: "పాండవులు మత్స్య దేశాధిపతి విరాటరాజు కొలువులో కంకభట్టు, వలలుడు, బృహన్నల, దామగ్రంధి, తంత్రీపాలుడు, మరియు సైరంధ్రి వేషములలో గడిపిన రహస్య అజ్ఞాతవాస గాథ. ద్రౌపదిని వేధించిన కీచకుని భీముడు వధించుట, కౌరవులు విరాటుని గోవులను అపహరించినప్పుడు ఉత్తర గొగ్రహణ యుద్ధములో బృహన్నల వేషములో ఉన్న అర్జునుడు సమ్మోహనాస్త్రముతో కౌరవ సైన్యాన్ని ఓడించుట, అభిమన్యు-ఉత్తరల వివాహము.",
    quote: "A warrior armed with righteousness, truth, and mastery of weapons cannot be subdued by mere numerical strength."
  },
  {
    number: 5,
    id: "udyoga-parva",
    nameEn: "Udyoga Parva",
    nameSa: "उद्योगपर्वन्",
    nameTe: "ఉద్యోగ పర్వము",
    subtitleEn: "The Book of Effort & Preparations",
    subtitleTe: "యుద్ధ సన్నాహాలు, విదురనీతి మరియు శ్రీకృష్ణ రాయబారము",
    upaParvasCount: 12,
    adhyayasCount: 186,
    shlokasCount: 6698,
    keyThemes: ["Vidura Niti", "Sanatsujatiya", "Sri Krishna's Peace Embassy (రాయబారం)", "Cosmic Vishwaroopa in Court", "Karna-Kunti Samvada", "Seven vs Eleven Akshauhinis"],
    summaryEn: "Intense diplomatic and military preparations for the impending war. Both Duryodhana and Arjuna seek Sri Krishna's alliance; Arjuna chooses the unarmed Krishna as charioteer while Duryodhana takes the massive Narayani Sena. Contains the peerless political and ethical wisdom of Vidura Niti and the Vedanta philosophy of Sage Sanatsujata. Lord Krishna travels to Hastinapura on a historic peace mission (రాయబారము), requesting only five villages for the Pandavas. When Duryodhana arrogantly declares he will not surrender even enough land to accommodate the point of a needle and tries to arrest Krishna, the Lord reveals His awe-inspiring Cosmic Form (Vishwaroopa) in the royal assembly.",
    summaryTe: "కురుక్షేత్ర మహాసంగ్రామానికి ఇరుపక్షాల సన్నాహాలు. శ్రీకృష్ణుని సాయం కోరి అర్జునుడు ఆయనను సారథిగా కోరగా, దుర్యోధనుడు నారాయణీ సేనను ఎంచుకొనుట. విదురుడు ధృతరాష్ట్రునికి చేసిన ప్రసిద్ధ 'విదురనీతి' బోధ, సనత్సుజాతీయ వేదాంత రహస్యం. యుద్ధం నివారించడానికి శ్రీకృష్ణుడు హస్తినకు శాంతి రాయబారిగా వెళ్ళి కేవలం ఐదు ఊళ్ళు అడుగుట, దుర్యోధనుడు సూది మొనమోపినంత స్థలం కూడా ఇవ్వనని భగవానుని బంధించబోగా సభలో శ్రీకృష్ణుడు విశ్వరూపం ప్రదర్శించుట.",
    quote: "He who has overcome desire and wrath, who has charity, forgiveness, humility, and adherence to truth, rules the world without exertion."
  },
  {
    number: 6,
    id: "bhishma-parva",
    nameEn: "Bhishma Parva",
    nameSa: "भीष्मपर्वन्",
    nameTe: "భీష్మ పర్వము",
    subtitleEn: "The Book of Bhishma & Srimad Bhagavad Gita",
    subtitleTe: "భీష్ముని సేనాధిపత్యము మరియు శ్రీమద్భగవద్గీతా ప్రబోధము",
    upaParvasCount: 5,
    adhyayasCount: 117,
    shlokasCount: 5884,
    keyThemes: ["Srimad Bhagavad Gita (Chapters 25-42)", "First 10 Days of Kurukshetra War", "Sanjaya's Divya-Drishti", "Fall of Bhishma on Bed of Arrows"],
    summaryEn: "The Great Kurukshetra War commences. Sage Vyasa grants Sanjaya divine celestial vision (Divya-Drishti) to narrate the war to the blind king Dhritarashtra. On the brink of battle, Arjuna is overcome with despondency at the sight of his revered elders and kin; Lord Krishna delivers the immortal Srimad Bhagavad Gita (18 chapters, 700 verses), expounding Karma Yoga, Jnana Yoga, and Bhakti Yoga, and reveals His universal form (Kala / Time). Bhishma commands the Kaurava forces for the first 10 fierce days. On the 10th day, Arjuna places Shikhandi before him, and the invincible Bhishma is brought down, resting upon a hero's bed of arrows (శరతల్పము).",
    summaryTe: "కురుక్షేత్ర రణరంగంలో యుద్ధ ప్రారంభం. వ్యాస భగవానుని అనుగ్రహంతో సంజయుడు దివ్యదృష్టి పొంది ధృతరాష్ట్రునికి యుద్ధ క్రమమును వివరింపసాగెను. యుద్ధోన్ముఖుడైన అర్జునుడు బంధుప్రీతితో విషాదమున మునగగా, శ్రీకృష్ణ పరమాత్మ 700 శ్లోకాలతో జగత్ప్రసిద్ధమైన 'శ్రీమద్భగవద్గీత'ను ఉపదేశించి విశ్వరూప దర్శనం గావించుట. భీష్ముని 10 రోజుల వీరోచిత నాయకత్వం, చివరకు శిఖండిని ముందుంచి అర్జునుడు బాణాలు వేయగా భీష్ముడు అంపశయ్యపై శయనించుట.",
    quote: "Karmanye vadhikaraste ma phaleshu kadachana — Your right is to perform your duty alone, never to its fruits."
  },
  {
    number: 7,
    id: "drona-parva",
    nameEn: "Drona Parva",
    nameSa: "द्रोणपर्वन्",
    nameTe: "ద్రోణ పర్వము",
    subtitleEn: "The Book of Drona",
    subtitleTe: "ద్రోణాచార్యుని ఆధిపత్యము, అభిమన్యు వీరమరణం మరియు జయద్రథ వధ",
    upaParvasCount: 8,
    adhyayasCount: 170,
    shlokasCount: 8909,
    keyThemes: ["Days 11-15 of War", "Chakravyuha Battle", "Martyrdom of Abhimanyu", "Arjuna's Vow & Jayadratha Vadha", "Night Battle & Ghatotkacha's Sacrifice"],
    summaryEn: "Dronacharya assumes supreme command for days 11 to 15. Drona creates the impregnable Chakravyuha formation; the 16-year-old Abhimanyu penetrates it fearlessly, fights single-handedly against six maharathas, and attains glorious martyrdom. Grief-stricken Arjuna vows to slay Jayadratha before sunset or immolate himself; aided by Krishna's solar illusion, Arjuna severs Jayadratha's head. A desperate night battle ensues, during which Karna is forced to expend Indra's unfailing Vasava dart (Vasavi Shakti) to slay the rampaging Ghatotkacha, sparing Arjuna's life. Drona is finally laid to rest after laying down weapons upon hearing Yudhishthira's utterance 'Ashwatthama hatah kuniarah'.",
    summaryTe: "11 నుండి 15వ రోజు వరకు ద్రోణుని సేనాధిపత్యం. ద్రోణుడు పన్నిన పద్మవ్యూహము (చక్రవ్యూహం)లోకి చొరబడి ఒంటరిగా పోరాడి వీరమరణం పొందిన 16 ఏళ్ళ బాలవీరుడు అభిమన్యుని అద్భుత శౌర్యం. అభిమన్యుని మరణానికి ప్రతీకారంగా సూర్యాస్తమయం లోపు జయద్రథుని వధిస్తానని అర్జునుని భీషణ ప్రతిజ్ఞ మరియు కృష్ణుని లీల ద్వారా జయద్రథ వధ. రాత్రి యుద్ధంలో ఘటోత్కచుని వీరవిహారము, కర్ణుని వాసవి శక్తి ఘటోత్కచునిపై ప్రయోగింపబడి అర్జునుడు రక్షింపబడుట. చివరకు 'అశ్వత్థామ హతః కుంజరః' అను సత్య-అసత్య వాక్యంతో ద్రోణుడు శస్త్రసన్యాసం చేసి ద్రష్టద్యుమ్నుని చేతిలో మరణించుట.",
    quote: "Courage in the face of insurmountable odds transforms a mortal warrior into an immortal legend."
  },
  {
    number: 8,
    id: "karna-parva",
    nameEn: "Karna Parva",
    nameSa: "कर्णपर्वन्",
    nameTe: "కర్ణ పర్వము",
    subtitleEn: "The Book of Karna",
    subtitleTe: "కర్ణుని నాయకత్వము మరియు కర్ణ-అర్జున మహాసంగ్రామము",
    upaParvasCount: 1,
    adhyayasCount: 69,
    shlokasCount: 4964,
    keyThemes: ["Days 16-17 of War", "Shalya as Karna's Charioteer", "Bhima Drinking Duhsasana's Blood", "Clash of Titans: Karna vs Arjuna", "Fall of Karna"],
    summaryEn: "Karna becomes the commander-in-chief for days 16 and 17, with King Shalya as his charioteer. Bhima fulfills his ferocious oath made in the dice hall: he tears open Duhsasana's chest, drinks his warm blood, and brings the blood to Draupadi to tie up her loose tresses. Day 17 witnesses the climactic, epochal duel between Karna and Arjuna. Parashurama's curse causes Karna to forget the Brahmashira invocation in his moment of need, the earth swallows his chariot wheel, and Arjuna, on Krishna's prompting of Dharma's retribution, strikes down the fallen warrior with the Anjalika arrow.",
    summaryTe: "16 మరియు 17వ రోజులలో కర్ణుని నాయకత్వం. మద్రరాజైన శల్యుడు కర్ణునికి సారథిగా ఉండుట. ద్యూత సభలో చేసిన భీషణ శపథాన్ని నెరవేరుస్తూ భీమసేనుడు దుశ్శాసనుని వక్షస్థలాన్ని చీల్చి రక్తపానం చేసి ద్రౌపది వేణిని ముడివేయుట. 17వ రోజు కర్ణ-అర్జునుల మహోగ్ర ద్వంద్వయుద్ధం. పరశురాముని శాపం వల్ల మంత్రం గుర్తురాకపోవుట, బ్రాహ్మణ శాపంతో రథచక్రం భూమిలో కూరుకుపోగా, శ్రీకృష్ణుని ఆజ్ఞపై అర్జునుడు అంజలికాస్త్రంతో కర్ణుని వధించుట.",
    quote: "When virtue and dharma are cast aside in life, destiny strikes relentlessly in the final hour."
  },
  {
    number: 9,
    id: "shalya-parva",
    nameEn: "Shalya Parva",
    nameSa: "शल्यपर्वन्",
    nameTe: "శల్య పర్వము",
    subtitleEn: "The Book of Shalya & The Mace Duel",
    subtitleTe: "శల్యుని మరణం, దుర్యోధనుని జలస్తంభనం మరియు గదాయుద్ధం",
    upaParvasCount: 4,
    adhyayasCount: 59,
    shlokasCount: 3220,
    keyThemes: ["Final Day (Day 18) of War", "Yudhishthira Slays Shalya", "Duryodhana Hiding in Dvaipayana Lake", "Bhima vs Duryodhana Mace Duel", "Breaking of Duryodhana's Thighs"],
    summaryEn: "The final 18th day of the great battle. King Shalya takes command of the remnant Kaurava forces and is slain by Yudhishthira. Sahadeva fulfills his vow by killing Sakuni. His entire army destroyed, Duryodhana conceals himself in Dvaipayana Lake through water-solidifying magic (Jalastambhana). Challenged by the Pandavas, he emerges for a single-combat mace duel against Bhima. Balarama watches as the two titans clash. Remembering Maitreya's curse and Duryodhana's lewd gesture to Draupadi, Bhima strikes Duryodhana on the thighs with his mace, shattering them and clinching Pandava victory.",
    summaryTe: "కురుక్షేత్ర రణరంగంలో 18వ చివరి రోజు. శల్యుని నాయకత్వం, ధర్మరాజు చేతిలో శల్యుని మరణం, సహదేవుని చేతిలో శకుని వధ. సర్వసైన్యం నశించగా దుర్యోధనుడు ద్వైపాయన మడుగులో జలస్తంభన విద్యతో దాగుకొనుట. పాండవుల సవాలుతో బయటకు వచ్చి భీమునితో గదాయుద్ధము చేయుట. ద్రౌపది అవమానానికి ప్రతీకారంగా భీముడు దుర్యోధనుని తొడలు విరగ్గొట్టి నేలకూల్చుట.",
    quote: "Pride and obstinate tyranny end not on a throne, but in the desolate dust of defeat."
  },
  {
    number: 10,
    id: "sauptika-parva",
    nameEn: "Sauptika Parva",
    nameSa: "सौप्तिकपर्वन्",
    nameTe: "సౌప్తిక పర్వము",
    subtitleEn: "The Book of the Sleeping Warriors",
    subtitleTe: "అశ్వత్థామ రాత్రి దాడి, ఉపపాండవుల వధ మరియు బ్రహ్మశిరోనామకాస్త్రం",
    upaParvasCount: 3,
    adhyayasCount: 18,
    shlokasCount: 870,
    keyThemes: ["Nocturnal Massacre", "Slaughter of Upapandavas & Dhrishtadyumna", "Ashwatthama's Brahmashira Astra", "Parikshit Saved in the Womb", "Mani of Ashwatthama"],
    summaryEn: "Consumed by fury at the mortal fall of Duryodhana, Ashwatthama, Kritavarma, and Kripacharya launch a ghastly midnight raid on the sleeping Pandava encampment. Ashwatthama slaughters Dhrishtadyumna, Shikhandi, and the five young sons of Draupadi (Upapandavas). Pursued by Arjuna, Ashwatthama unleashes the apocalyptic Brahmashira weapon aimed at the wombs of Pandava women to exterminate their line entirely. Arjuna counters with his own Brahmashira and retracts it, but Ashwatthama directs it to Uttara's womb. Sri Krishna enters the womb and resurrects the child (Parikshit). Ashwatthama is stripped of his divine jewel and cursed to wander the earth diseased for 3,000 years.",
    summaryTe: "దుర్యోధనుని పతనానికి ప్రతీకారంగా అశ్వత్థామ రాత్రివేళ పాండవ శిబిరంపై దాడి చేసి నిద్రిస్తున్న ఉపపాండవులను, దృష్టద్యుమ్నుని, శిఖండిని అత్యంత కిరాతకంగా వధించుట. అర్జునునిపై బ్రహ్మశిరోనామకాస్త్రం ప్రయోగించి, చివరకు ఉత్తర గర్భంలోని శిశువుపైకి మళ్ళించుట. శ్రీకృష్ణుడు తన దివ్యశక్తితో గర్భస్థ శిశువైన పరీక్షిత్తుని కాపాడుట, అశ్వత్థామ తలపైనున్న మణిని తీసివేసి 3000 సంవత్సరాలు కుష్టురోగంతో భూమిపై అలమటించమని శాపమిచ్చుట.",
    quote: "Cowardly slaughter in the dark of night never yields honor, only eternal damnation and sorrow."
  },
  {
    number: 11,
    id: "stree-parva",
    nameEn: "Stree Parva",
    nameSa: "स्त्रीपर्वन्",
    nameTe: "స్త్రీ పర్వము",
    subtitleEn: "The Book of the Women & Lamentations",
    subtitleTe: "గాంధారి విలాపము, శ్రాద్ధ కర్మలు మరియు శ్రీకృష్ణునికి శాపము",
    upaParvasCount: 5,
    adhyayasCount: 27,
    shlokasCount: 775,
    keyThemes: ["Gandhari's Heart-rending Lament", "Dhritarashtra Embracing Iron Bhima", "Funeral Pyres of the Slain Millions", "Gandhari's Curse to Krishna", "Kunti Revealing Karna's Secret"],
    summaryEn: "Dhritarashtra, Gandhari, Kunti, and the royal women visit the devastated battlefield littered with millions of fallen heroes. Dhritarashtra attempts to crush Bhima in a lethal embrace of grief, but Krishna swiftly substitutes an iron statue which the blind king shatters with his bare hands. Queen Gandhari delivers one of world literature's most moving laments over the disfigured bodies of her hundred sons and fallen kinsmen. In her unbearable grief, she curses Lord Krishna that His Yadava clan will perish in civil strife 36 years later, a curse Krishna calmly accepts. Kunti reveals the heartbreaking secret that Karna was her eldest son, shattering Yudhishthira.",
    summaryTe: "యుద్ధానంతరం రణభూమిలో మరణించిన కోట్లాది వీరుల శవాలను చూసి గాంధారి, కుంతి, ద్రౌపది తదితర స్త్రీల హృదయవిదారక విలాపం. ధృతరాష్ట్రుడు ఆగ్రహంతో భీముని కౌగిలించుకుని చంపబోగా శ్రీకృష్ణుడు ఇనుప విగ్రహాన్ని ఉంచుట. గాంధారి శోకసంద్రంలో మునిగి శ్రీకృష్ణుని యాదవ వంశం 36 ఏళ్ళలో అంతమొందుతుందని శాపమిచ్చుట (శ్రీకృష్ణుడు దానిని ప్రసన్నంగా స్వీకరించుట). కర్ణుడు తన ప్రథమ పుత్రుడని కుంతి వెల్లడించగా ధర్మరాజు హృదయం బద్దలగుట.",
    quote: "War leaves no genuine victors; the crowns of conquest are washed in the tears of widows and mothers."
  },
  {
    number: 12,
    id: "shanti-parva",
    nameEn: "Shanti Parva",
    nameSa: "शान्तिपर्वन्",
    nameTe: "శాంతి పర్వము",
    subtitleEn: "The Book of Peace & Supreme Wisdom",
    subtitleTe: "రాజధర్మ, ఆపద్ధర్మ మరియు మోక్షధర్మ పర్వములు",
    upaParvasCount: 3,
    adhyayasCount: 353,
    shlokasCount: 14732,
    keyThemes: ["Longest Parva of Epic", "Yudhishthira's Grief & Reluctance", "Bhishma's Discourse from Arrow-Bed", "Rajadharma (Duties of King)", "Mokshadharma (Path to Liberation)"],
    summaryEn: "The longest and philosophically richest book of the Mahabharata. Deeply despondent over the carnage of kinsmen, Yudhishthira desires to renounce the world and retire as an ascetic. Sri Krishna leads the Pandavas to Bhishma, who lies serene on his bed of arrows awaiting the auspicious Uttarayana solstice. Bhishma instructs King Yudhishthira on three immense subjects: Rajadharma (the science of statecraft, governance, and justice), Apaddharma (conduct during times of crisis and calamity), and Mokshadharma (the path of detachment, Yoga, Samkhya philosophy, and ultimate spiritual liberation).",
    summaryTe: "మహాభారతంలో అత్యంత పెద్దది మరియు జ్ఞానభాండాగారమైన పర్వము. బంధునాశనానికి చింతించిన ధర్మరాజు రాజ్యభోగాలను త్యజించి సన్యాసం స్వీకరించదలచగా, శ్రీకృష్ణుడు ఆయనను అంపశయ్యపై ఉన్న భీష్ముని వద్దకు తీసుకెళ్ళుట. ఉత్తరాయణ పుణ్యకాలం కొరకు వేచియున్న భీష్మ పితామహుడు ధర్మరాజుకు రాజధర్మము (రాజ్యపాలన, న్యాయవ్యవస్థ), ఆపద్ధర్మము (కష్టకాలంలో ఆచరించవలసిన ధర్మాలు), మరియు మోక్షధర్మము (సాంఖ్య, యోగ, పరబ్రహ్మ తత్త్వాలు) బోధించుట.",
    quote: "A king's highest duty is the protection of his subjects; when the king acts righteously, the age becomes Satya Yuga."
  },
  {
    number: 13,
    id: "anushasana-parva",
    nameEn: "Anushasana Parva",
    nameSa: "अनुशासनपर्वन्",
    nameTe: "అనుశాసన పర్వము",
    subtitleEn: "The Book of Instructions & Vishnu Sahasranama",
    subtitleTe: "దానధర్మము, విష్ణు సహస్రనామ స్తోత్రము మరియు భీష్మ నిర్యాణము",
    upaParvasCount: 2,
    adhyayasCount: 154,
    shlokasCount: 8000,
    keyThemes: ["Sri Vishnu Sahasranama Stotram", "Shiva Sahasranama", "Merits of Dana (Charity)", "Sacredness of Cows & Water", "Passing of Grandfather Bhishma"],
    summaryEn: "Continuation of Bhishma's final instructions on Dharma, charity (Dana), penance, and morality. Contains the peerless Sri Vishnu Sahasranama Stotram (The Thousand Names of Lord Vishnu), revealed by Bhishma to Yudhishthira as the supreme remedy for all worldly suffering and the easiest path to God in Kali Yuga, as well as the Shiva Sahasranama. When the sun enters the auspicious northern course (Makara Sankranti / Uttarayana), Bhishma gives his final blessing to the Pandavas, focuses his mind on Sri Krishna, casts off his mortal coil by his boon of voluntary death (Iccha Mrityu), and ascends to the celestial realm.",
    summaryTe: "భీష్ముని ఉపదేశాల కొనసాగింపు. దానధర్మాలు, గోవుల ప్రాశస్త్యము, సత్యనిష్ఠ గురించి వివరిస్తూ, ధర్మరాజు అడిగిన ప్రశ్నకు సమాధానంగా జగద్విఖ్యాతమైన 'శ్రీ విష్ణు సహస్రనామ స్తోత్రము'ను భీష్ముడు ఉపదేశించుట. సూర్యుడు మకర రాశిలోకి ప్రవేశించిన ఉత్తరాయణ పుణ్యకాలమున భీష్ముడు శ్రీకృష్ణుని స్తుతిస్తూ తన ఇచ్చామృత్యువుతో ప్రాణాలను త్యజించి పరమపదాన్ని అధిరోహించుట.",
    quote: "Yato dharmastato jayah — Where there is righteousness, there is victory; and where Krishna is, there is Dharma."
  },
  {
    number: 14,
    id: "ashvamedhika-parva",
    nameEn: "Ashvamedhika Parva",
    nameSa: "आश्वमेधिकपर्वन्",
    nameTe: "ఆశ్వమేధిక పర్వము",
    subtitleEn: "The Book of the Horse Sacrifice & Anugita",
    subtitleTe: "అనుగీత మరియు అశ్వమేధ యాగ దిగ్విజయ యాత్ర",
    upaParvasCount: 2,
    adhyayasCount: 96,
    shlokasCount: 3320,
    keyThemes: ["Anugita (Krishna's second discourse to Arjuna)", "Treasures of King Marutta", "The Sacrificial Horse Campaign", "Arjuna's Duel with Son Babhruvahana", "The Golden Mongoose Legend"],
    summaryEn: "Following Sage Vyasa's counsel to cleanse the sins of war and reassert sovereign righteousness, Yudhishthira resolves to perform the grand Ashvamedha Yagna (Horse Sacrifice). Before departing for Dvaraka, Sri Krishna reiterates spiritual truths to Arjuna in the profound discourse known as the 'Anugita'. Arjuna leads the imperial sacrificial stallion across Bharatavarsha, subduing kingdoms peacefully. In Manipura, he fights a duel with his own unrecognized valiant son Babhruvahana and is temporarily killed, then restored by the magical Sanjeevani gem brought by Ulupi. The horse sacrifice culminates with the tale of the half-golden mongoose expounding true selfless charity.",
    summaryTe: "యుద్ధ పాప ప్రాయశ్చిత్తార్థం ధర్మరాజు అశ్వమేధ యాగమును సంకల్పించుట. ద్వారకకు వెళ్లేముందు అర్జునుడు కోరగా శ్రీకృష్ణుడు రెండవసారి గీతాబోధ చేసిన 'అనుగీత'. యాగ అశ్వం వెంట అర్జునుడు దిగ్విజయ యాత్ర చేయుట, మణిపురంలో తన కుమారుడైన బభ్రువాహనునితో యుద్ధం, ఉలూపి తెచ్చిన మణితో అర్జునుని పునరుజ్జీవనం. యాగ ముగింపులో సగభాగం బంగారు శరీరమున్న ముంగిస వచ్చి నిజమైన త్యాగగుణాన్ని వివరించుట.",
    quote: "True charity consists not in the abundance of wealth given, but in the purity and selflessness of the offering heart."
  },
  {
    number: 15,
    id: "ashramavasika-parva",
    nameEn: "Ashramavasika Parva",
    nameSa: "आश्रमवासिकपर्वन्",
    nameTe: "ఆశ్రమవాసిక పర్వము",
    subtitleEn: "The Book of the Hermitage",
    subtitleTe: "ధృతరాష్ట్ర, గాంధారీ, కుంతీ దేవుల వానప్రస్థము",
    upaParvasCount: 3,
    adhyayasCount: 42,
    shlokasCount: 1506,
    keyThemes: ["Vanaprastha Ashram", "Dhritarashtra, Gandhari & Kunti in Forest", "Vidura Merging into Yudhishthira", "Vyasa's Miraculous Vision of the Dead Heroes", "Forest Fire"],
    summaryEn: "Fifteen years after the war, having lived under Yudhishthira's filial care, old King Dhritarashtra, Queen Gandhari, Kunti, and Sanjaya retire to the forest to observe the holy hermitage stage (Vanaprastha). The Pandavas visit them in the forest. The great sage Vidura, an incarnation of Dharma, leaves his mortal body and his divine soul spiritually enters and merges directly into Yudhishthira. Sage Vyasa grants the grieving relatives a miraculous nocturnal vision on the banks of the Ganga where all the departed heroes of Kurukshetra rise gloriously from the waters free from enmity. Two years later, Dhritarashtra, Gandhari, and Kunti perish serenely in a holy forest fire.",
    summaryTe: "ధర్మరాజు పాలనలో 15 ఏళ్ళు గడిపిన తరువాత వృద్ధులైన ధృతరాష్ట్రుడు, గాంధారి, కుంతి మరియు సంజయుడు వానప్రస్థాశ్రమానికి అడవులకు వెళ్ళుట. అరణ్యంలో విదురుని దివ్య ప్రాణము ధర్మరాజులో ఐక్యమగుట. వ్యాస భగవానుని మహిమతో గంగాతీరంలో మరణించిన కురుక్షేత్ర వీరులందరూ దివ్యదేహాలతో ప్రత్యక్షమై తమ ఆత్మీయులకు దర్శనమిచ్చుట. చివరకు అడవిలో దావానలంలో ధృతరాష్ట్ర, గాంధారీ, కుంతీదేవి శరీరావసానం.",
    quote: "When earthly duties are fulfilled, the wise detach their minds and step into the silence of the forest to meet the Infinite."
  },
  {
    number: 16,
    id: "mausala-parva",
    nameEn: "Mausala Parva",
    nameSa: "मौसलपर्वन्",
    nameTe: "మౌసల పర్వము",
    subtitleEn: "The Book of the Iron Clubs & Yadava Dissolution",
    subtitleTe: "యాదవ వంశ నాశనము మరియు శ్రీకృష్ణుని నిర్యాణము",
    upaParvasCount: 1,
    adhyayasCount: 9,
    shlokasCount: 300,
    keyThemes: ["Samba's Curse of the Iron Club", "Yadava Fratricidal Strife at Prabhasa", "Passing of Balarama (Shesha)", "Departure of Sri Krishna (Jara Hunter)", "Submergence of Dvaraka"],
    summaryEn: "Thirty-six years after the Kurukshetra war, Gandhari's curse and the sages' curse upon Samba (who pretended to be a pregnant woman) manifest as an iron pestle (Mausala). Ground into dust and cast into the sea, the powder sprouts into sharp Eraka grass along the coast. At the sacred pilgrimage of Prabhasa, drunkenness and old grudges flare up; the Yadavas strike each other with the razor-sharp grass and annihilate one another. Balarama gives up his body as the thousand-headed serpent Shesha. Lord Krishna, resting beneath a tree with His left foot outstretched, is mistakenly pierced by the hunter Jara's arrow. Krishna blesses Jara and ascends to His supreme abode (Vaikuntha). The ocean rises and submerges the golden city of Dvaraka.",
    summaryTe: "కురుక్షేత్రం ముగిసిన 36 ఏళ్ళకు గాంధారి శాపము, మునుల శాపము ఫలించి యాదవ వంశంలో సాంబుని ఉదరమున ఇనుప రోకలి పుట్టుట. దానిని పొడిచేసి సముద్రంలో కలపగా అది ఏరకా గడ్డిగా మొలచుట. ప్రభాస తీర్థంలో విందులో విభేదాలు వచ్చి యాదవులందరూ ఆ గడ్డితో కొట్టుకుని సమూలంగా నశించుట. బలరాముడు ఆదిశేషునిగా అవతార సమాప్తి చేయుట. అరణ్యంలో విశ్రమిస్తున్న శ్రీకృష్ణ పరమాత్మ పాదాన్ని లేడి కన్నుగా భ్రమించి జరుడనే వేటగాడు బాణం వేయగా, భగవానుడు అతడిని అనుగ్రహించి పరమపదాన్ని అధిరోహించుట. ద్వారకా నగరం సముద్రంలో మునిగిపోవుట.",
    quote: "Even the mightiest empires and celestial dynasties dissolve when their earthly mission is accomplished."
  },
  {
    number: 17,
    id: "mahaprasthanika-parva",
    nameEn: "Mahaprasthanika Parva",
    nameSa: "महाप्रस्थानिकपर्वन्",
    nameTe: "మహాప్రస్థానిక పర్వము",
    subtitleEn: "The Book of the Great Final Journey",
    subtitleTe: "పాండవుల మహాప్రస్థానము మరియు హిమవత్పర్వతారోహణము",
    upaParvasCount: 1,
    adhyayasCount: 3,
    shlokasCount: 123,
    keyThemes: ["Coronation of Parikshit", "Renunciation of the Throne", "Ascent of Mount Meru", "Fall of Draupadi and the Four Brothers", "The Faithful Dog Test"],
    summaryEn: "Hearing of Sri Krishna's departure and the submergence of Dvaraka, the Pandavas realize the age of Kali has commenced and their worldly purpose is finished. Yudhishthira crowns Arjuna's grandson Parikshit as Emperor of Hastinapura. Dressed in ascetic bark, the five Pandava brothers and Queen Draupadi, followed by a devoted dog, embark upon their final pilgrimage towards the Himalayas and Mount Meru. One by one, Draupadi, Sahadeva, Nakula, Arjuna, and Bhima fall due to subtle human attachments and pride. Only King Yudhishthira, unwavering in righteousness, reaches the summit accompanied by the steadfast dog.",
    summaryTe: "శ్రీకృష్ణ నిర్యాణ వార్త విని కలియుగం ప్రారంభమైందని గ్రహించి పాండవులు అర్జునుని పౌత్రుడైన పరీక్షిత్తుని హస్తినాపుర సామ్రాజ్యానికి చక్రవర్తిగా పట్టాభిషేకం చేయుట. రాజభోగాలను త్యజించి నారచీరలు ధరించి ద్రౌపదితో కలిసి హిమాలయాల వైపు మహాప్రస్థాన యాత్రను ప్రారంభించుట. మార్గమధ్యంలో ఒక విశ్వాసపాత్రమైన శునకము (కుక్క) వారిని అనుసరించుట. మార్గంలో ద్రౌపది, సహదేవుడు, నకులుడు, అర్జునుడు, భీముడు ఒక్కొక్కరుగా పడిపోగా, నిశ్చల ధర్మనిష్ఠతో ధర్మరాజు ఆ శునకంతో మాత్రమే మేరు శిఖరాన్ని చేరుకొనుట.",
    quote: "He who abandons a faithful companion seeking refuge, commits a sin equal to the slaying of a Brahmana."
  },
  {
    number: 18,
    id: "svargarohana-parva",
    nameEn: "Svargarohana Parva",
    nameSa: "स्वर्गारोहणपर्वन्",
    nameTe: "స్వర్గారోహణ పర్వము",
    subtitleEn: "The Book of the Ascent to Heaven",
    subtitleTe: "స్వర్గ ప్రవేశము, నరక దర్శన పరీక్ష మరియు శాశ్వత దివ్యలోకము",
    upaParvasCount: 1,
    adhyayasCount: 5,
    shlokasCount: 209,
    keyThemes: ["Indra's Chariot Arrival", "Refusal to Abandon the Dog (Yama Dharma Raja)", "The Maya of Hell (Naraka)", "Reunion with Brothers, Karna, Krishna & Bhishma"],
    summaryEn: "King Indra arrives in his celestial chariot to convey Yudhishthira to Heaven in his physical mortal body. Yudhishthira refuses to board unless the faithful dog is permitted to enter; the dog reveals itself as Lord Dharma, praising Yudhishthira's peerless compassion. In Heaven, Yudhishthira is astonished to see Duryodhana seated in radiant splendor, while his virtuous brothers are nowhere to be seen. Led to a terrifying, foul-smelling cavern of hell, he hears the groans of his beloved brothers and Draupadi. Yudhishthira adamantly declares he will stay in hell to comfort his kin. The illusion shatters: it was a momentary trial to expiate his solitary untruth. Yudhishthira bathes in the celestial Mandakini river and ascends to eternal bliss reunited with Sri Krishna, Bhishma, Karna, and his brothers.",
    summaryTe: "దేవేంద్రుడు దివ్యరథంతో వచ్చి ధర్మరాజును శరీరంతో స్వర్గానికి రమ్మనగా, తన వెంట వచ్చిన శునకాన్ని రానివ్వకపోతే తాను రానని తిరస్కరించుట. శునకం ధర్మదేవతగా మారి ధర్మరాజు కారుణ్యాన్ని కొనియాడుట. స్వర్గంలో దుర్యోధనుడు వైభవంగా ఉండగా, పాండవులు నరకంలో ఉన్నట్లు భ్రమ కల్పించబడగా, తన సోదరులున్న చోటే తాను ఉంటానని ధర్మరాజు పలకడంతో ఆ మాయా నరక దర్శన పరీక్ష ముగియుట. మందాకినీ దివ్య గంగలో స్నానమాచరించి ధర్మరాజు శ్రీకృష్ణుడు, కర్ణుడు, భీష్ముడు మరియు తన సోదరులతో కలిసి శాశ్వత శాంతిధామమైన వైకుంఠంలో ఐక్యమగుట.",
    quote: "Victory is assured where there is Dharma; the righteous may endure fiery trials, but their eternal home is with the Divine."
  },
  {
    number: 19,
    id: "harivamsa",
    nameEn: "Harivamsa Parva (Khila Parva)",
    nameSa: "हरिवंशपर्वन् (खिलपर्वन्)",
    nameTe: "హరివంశ పర్వము (ఖిల పర్వము)",
    subtitleEn: "The Divine Epilogue / Appendix of the Epic",
    subtitleTe: "శ్రీకృష్ణ లీలలు, వంశ చరిత్ర మరియు భగవదవతార మహిమ",
    upaParvasCount: 3,
    adhyayasCount: 118,
    shlokasCount: 6073,
    keyThemes: ["Genealogy of Hari / Vishnu", "Krishna's Childhood in Gokula (Balalila)", "Bhavishya Parva & Kali Yuga Prophecy", "Slaying of Kamsa, Banasura & Naraka"],
    summaryEn: "Regarded as the official 19th book or supplementary epilogue (Khila Parva) of the Mahabharata. It chronicles the complete genealogical history of the Solar and Lunar lines, the divine incarnation of Lord Vishnu as Sri Krishna, His enchanting childhood pastimes in Gokula, the subduing of Kaliya, lifting of Govardhana, slaying of Kamsa, the battle with Banasura to rescue Aniruddha, and concludes with the cosmic prophecies of Kali Yuga in the Bhavishya section.",
    summaryTe: "మహాభారతానికి అధికారిక అనుబంధ గ్రంథం (ఖిల పర్వము). భగవాన్ శ్రీకృష్ణుని సమగ్ర దివ్య చరిత్ర, గోకులంలో బాల్య లీలలు, కాళీయ మర్దనం, గోవర్ధనోద్ధరణం, కంస వధ, బాణాసుర యుద్ధం, మరియు భవిష్యత్ కలియుగ లక్షణాల వర్ణన ఇందులో విస్తృతంగా ఉంటాయి.",
    quote: "Remembering Sri Krishna purifies the soul of all blemishes and confers supreme devotion."
  }
];

/* ===== FULL ADI PARVA: 19 UPA-PARVAS (ఉపపర్వాలు) DETAIL =====
   Based directly on Pratap Chandra Roy's English Translation */
const ADI_PARVA_UPAPARVAS = [
  {
    number: 1,
    id: "anukramanika",
    nameEn: "Anukramanika Parva",
    nameSa: "अनुक्रमणिकापर्व",
    nameTe: "అనుక్రమణికా పర్వము",
    sections: "Sections I - II",
    versesApprox: 275,
    keyCharacters: ["Sauti (Ugrasravas)", "Sage Saunaka", "Maharshi Vyasa", "King Dhritarashtra", "Sanjaya"],
    summaryEn: "The grand overture to the epic. Sauti (Ugrasravas), the son of Lomaharshana, arrives at the holy forest of Naimisharanya during the twelve-year sacrifice conducted by Sage Saunaka. Asked to recite sacred history, Sauti proclaims the composition of the Mahabharata by Vyasa. It recounts how the universe originated from the primal Golden Egg (Hiranyagarbha) of truth. It features the immortal, heartbreaking lament of blind King Dhritarashtra to Sanjaya, where in a series of poignant verses beginning with 'Tada na shamse vijayaya Sanjaya...' ('Then, O Sanjaya, I had no hope of victory'), he recounts all the milestones from the breaking of the bow at Draupadi's swayamvara to the fall of Duryodhana, realizing the inevitable supremacy of Dharma.",
    summaryTe: "మహాభారతానికి భవ్యమైన ప్రవేశిక. శౌనక మహర్షి నైమిశారణ్యములో జరుపుతున్న ద్వాదశ వార్షిక సత్రయాగమునకు సూత పుత్రుడైన ఉగ్రశ్రవసుడు (సౌతి) విచ్చేసి, వ్యాస భగవానుడు రచించిన భారతామృతాన్ని వినిపింపదొడగెను. బ్రహ్మాండ సృష్టి, హిరణ్యగర్భోత్పత్తి, మరియు ధర్మవృక్షమైన యుధిష్ఠిరుడు - కామక్రోధాల వృక్షమైన దుర్యోధనుల పోలిక ఇందులో చెప్పబడింది. ధృతరాష్ట్రుడు సంజయునికి తన శోకాన్ని వివరిస్తూ 'తదా న శంసే విజయాయ సంజయ...' (అప్పుడు నాకు విజయంపై ఆశ నశించింది) అంటూ పాండవుల విజయ చిహ్నాలను ఒక్కొక్కటిగా గుర్తుచేసుకున్న చారిత్రక విలాపం ఇందులో అత్యంత భావోద్వేగభరితమైనది.",
    keyQuoteRoy: "Vyasa executed this compilation of the Bharata. The whole world is contained in this book. As the sun dispelleth darkness, so doth this Bharata dispel all ignorance from the mind of men.",
    dharmaInsight: "Dharma is like a vast banyan tree rooted in truth, self-restraint, and righteousness; while unrighteousness is a poisonous creeper rooted in malice and greed."
  },
  {
    number: 2,
    id: "parva-sangraha",
    nameEn: "Parva-Sangraha Parva",
    nameSa: "पर्वसंग्रहपर्व",
    nameTe: "పర్వసంగ్రహ పర్వము",
    sections: "Section II",
    versesApprox: 395,
    keyCharacters: ["Sauti", "Rishis of Naimisharanya", "Vyasa"],
    summaryEn: "The canonical table of contents and structural index of the Mahabharata. Sauti meticulously details the division of the epic into 18 Great Books (Maha Parvas) and 100 Sub-Books (Upa-Parvas), specifying the exact chapter counts and verse numbers for each book. He reveals that Vyasa first taught the epic to his son Suka, then to disciples Vaisampayana, Paila, Jaimini, and Asuma. He recounts how Vyasa visualized the monumental epic and prayed to Lord Brahma, who ordained that Lord Ganesha serve as the divine scribe under the condition that Vyasa dictate without pausing, while Ganesha write only after fully understanding every complex verse.",
    summaryTe: "మహాభారత గ్రంథ సూచిక మరియు సంగ్రహ ప్రణాళిక. 18 మహా పర్వాలు, 100 ఉప పర్వాలు, మరియు లక్ష శ్లోకాల సంపూర్ణ విభజన ఇందులో నమోదు చేయబడింది. వ్యాస మహర్షి ఈ గ్రంథాన్ని ముందుగా తన కుమారుడైన శుకునికి, ఆపై వైశంపాయనాది శిష్యులకు ఉపదేశించిన విధానం చెప్పబడింది. బ్రహ్మదేవుని ఆదేశానుసారం విఘ్నేశ్వరుడు లేఖకుడిగా ఉండి, వ్యాసుడు చెప్పే ప్రతి నిగూఢ శ్లోకార్థాన్ని గ్రహించి లిఖించిన దివ్య గాథ ఇందులో వర్ణితమైంది.",
    keyQuoteRoy: "O best of Munis, this Bharata is the equal of the Vedas; it is sacred, supreme, and the cleanser of all sins. He who heareth it with devotion attaineth the celestial regions.",
    dharmaInsight: "Scripture must be understood with intellect and reflection; as Ganesha paused to grasp Vyasa's knotty verses (Vyasa Koota), true wisdom demands deep contemplation."
  },
  {
    number: 3,
    id: "paushya",
    nameEn: "Paushya Parva",
    nameSa: "पौष्यपर्व",
    nameTe: "పౌష్య పర్వము",
    sections: "Section III",
    versesApprox: 180,
    keyCharacters: ["King Janamejaya", "Sarama (celestial bitch)", "Sage Ayoda-Dhaumya", "Aruni", "Upamanyu", "Utanka", "King Paushya", "Takshaka"],
    summaryEn: "Begins with King Janamejaya's preliminary sacrifice at Kurukshetra, where his brothers strike the celestial dog Sarama's pup without cause, incurring Sarama's curse that unforeseen calamity will strike the king. Janamejaya appoints Somasravas as his priest. The narrative then shifts to Sage Ayoda-Dhaumya testing his three disciples: Aruni of Panchala (who lies across a breached dike with his own body to prevent water leaking), Upamanyu (who tends cattle, endures hunger, eats poison Arka leaves, loses eyesight, falls into a pit, praises the Ashvin twin gods, and regains sight), and Veda. It concludes with Veda's disciple Utanka undergoing peril to fetch the jeweled ear-rings of King Paushya's queen as Guru-dakshina, being thwarted by the serpent king Takshaka, and descending into the serpent world (Nagaloka) with the help of Agni.",
    summaryTe: "జనమేజయుని సోదరులు దేవశునకమైన సారమేయాన్ని అకారణంగా కొట్టగా సారమ శపించుట. ఆపై ఆయోద-ధౌమ్య మహర్షి తన ముగ్గురు శిష్యులను పరీక్షించుట: గురువాజ్ఞతో పొలంగట్టు తెగకుండా తన శరీరమునే గట్టుగా అడ్డం పెట్టిన ఆరుణి; ఆకలిని భరిస్తూ జిల్లేడు పాలు తాగి కంటిచూపు కోల్పోయి అశ్వినీదేవతల స్తోత్రంతో చూపు పొందిన ఉపమన్యుడు. వేదుని శిష్యుడైన ఉతంకుడు గురుదక్షిణగా పౌష్యరాజు రాణి కుండలాలను తేవడానికి వెళ్లి, తక్షకుడు వాటిని దొంగిలించగా నాగలోకానికి వెళ్లి అగ్నిదేవుని సాయంతో కుండలాలను సాధించిన అద్భుత గురుభక్తి గాథ.",
    keyQuoteRoy: "Because thou hast stopped the breach with thy own body, therefore shalt thou be called Uddalaka. And because thou hast obeyed my words, thou shalt obtain all prosperity.",
    dharmaInsight: "Absolute obedience and dedication to the Guru purifies the student and unlocks miraculous spiritual and divine powers."
  },
  {
    number: 4,
    id: "pauloma",
    nameEn: "Pauloma Parva",
    nameSa: "पौलोमपर्व",
    nameTe: "పౌలోమ పర్వము",
    sections: "Sections IV - XII",
    versesApprox: 290,
    keyCharacters: ["Sage Saunaka", "Sauti", "Sage Bhrigu", "Puloma (demon)", "Chyavana", "Ruru", "Pramadvara", "Dundubha"],
    summaryEn: "Chronicles the celebrated ancestry of the Bhrigu lineage. The demon Puloma attempts to abduct Sage Bhrigu's pregnant wife; the fetus slips out in brilliance (Chyavana) and incinerates the demon with his blazing energy. Later, Sage Pramati's son Ruru falls passionately in love with the virtuous maiden Pramadvara. Just before their wedding, she is bitten by a venomous serpent and dies. Maddened by grief, Ruru bargains with the gods, joyfully surrendering half of his own life-span to revive her. Ruru subsequently takes a fierce vow to slay every serpent he encounters, until he meets the harmless lizard Dundubha (Sage Sahasrapat cursed), who instructs Ruru that non-violence (Ahimsa) is the supreme virtue for a Brahmana.",
    summaryTe: "భృగువంశ పవిత్ర చరిత్ర. భృగు పత్నిని రాక్షసుడు అపహరింపబోగా గర్భం నుండి తేజస్సుతో జారిన చ్యవన మహర్షి జననం. ప్రమద్వర అనే కన్యను ప్రేమించిన రురుడు, ఆమె పాముకాటుతో మరణించగా, తన ఆయుష్షులో సగభాగాన్ని ధారపోసి ఆమెను పునర్జీవితురాలిని చేయుట. సర్పాలపై పగబట్టి కనిపించిన పామునల్లా చంపుతున్న రురునికి దుడుభుడను సర్పరూప ముని ఎదురై 'అహింసా పరమో ధర్మః' అని అహింసా తత్త్వాన్ని బోధించి శాంతింపజేయుట.",
    keyQuoteRoy: "Ahimsa paramo dharmah — Non-injury is the highest virtue of all. The Brahmana should never take the life of any creature, for his weapon is forbearance.",
    dharmaInsight: "Hatred and vengeance only breed destruction; Ahimsa (non-harming) and forgiveness constitute the highest pinnacle of spiritual wisdom."
  },
  {
    number: 5,
    id: "astika",
    nameEn: "Astika Parva",
    nameSa: "आस्तीकपर्व",
    nameTe: "ఆస్తిక పర్వము",
    sections: "Sections XIII - LVIII",
    versesApprox: 1850,
    keyCharacters: ["Kadru", "Vinata", "Uchchaisravas", "Vasuki", "Garuda", "Amrita", "King Parikshit", "Sage Shamika", "Sringi", "King Janamejaya", "Sage Astika", "Takshaka"],
    summaryEn: "The central mythical core of Adi Parva. Kadru (mother of snakes) and Vinata (mother of birds) wage a bet on the color of the celestial horse Uchchaisravas' tail. Kadru orders her black snakes to hang onto the white tail, deceiving Vinata into slavery. To liberate his mother, Vinata's mighty son Garuda battles the celestials and wins the Amrita (nectar of immortality). Narrates the churning of the Ocean of Milk (Samudra Manthana). Later, King Parikshit places a dead snake on meditating Sage Shamika and is cursed by the sage's son Sringi to perish by Takshaka's venom within 7 days. Parikshit dies as foretold. His son, King Janamejaya, organizes the colossal Sarpa Satra (Snake Sacrifice), chanting mantras that pull serpents by millions into the raging sacrificial fire. The young sage Astika (son of Jaratkaru) pleases the king with philosophical hymns, gains a boon, and halts the sacrifice, saving Takshaka and the remaining snakes.",
    summaryTe: "మహాభారతంలో అత్యంత విస్తృతమైన ఉపాఖ్యానము. కద్రూ-వినతల పందెము, మోసంతో వినత దాసియగుట. తల్లి దాస్యవిముక్తికై గరుత్మంతుడు దేవతలతో పోరాడి అమృతాన్ని తెచ్చుట. క్షీరసాగర మథనము, లక్ష్మీదేవి ఆవిర్భావము, అమృత పంపిణీ. పరీక్షిత్ మహారాజు శమీక ముని మెడలో చచ్చిన పామును వేయుట, శృంగి శాపం వల్ల తక్షక కాటుతో మరణించుట. తండ్రి మరణానికి పగబట్టి జనమేజయుడు చేపట్టిన భయంకర సర్పయాగం. ఆకాశం నుండి పాములు మంత్రాల ప్రభావంతో అగ్నిగుండంలో పడి భస్మమగుచుండగా, జరత్కారు మహర్షి కుమారుడైన ఆస్తిక ముని వచ్చి జనమేజయుని స్తుతించి, యజ్ఞాన్ని ఆపించి సర్పజాతిని రక్షించుట.",
    keyQuoteRoy: "O Janamejaya, let the snake sacrifice cease! May the remaining snakes live in peace! Let thy mind turn away from wrath, for virtue lies in clemency.",
    dharmaInsight: "Vengeance consumes both the wronged and the wrongdoer; wise intervention (like Astika's) restores cosmic equilibrium and mercy."
  },
  {
    number: 6,
    id: "amsavatarana",
    nameEn: "Amsavatarana Parva",
    nameSa: "अंशावतरणपर्व",
    nameTe: "అంశావతరణ పర్వము",
    sections: "Sections LIX - LXVII",
    versesApprox: 820,
    keyCharacters: ["Mother Earth (Bhoomi)", "Lord Brahma", "King Santanu", "Ganga", "Devavrata (Bhishma)", "Satyavati", "Sage Parasara", "Vyasa"],
    summaryEn: "Describes the divine descent of gods, Gandharvas, and Asuras into human forms to lighten the oppressive burden of Mother Earth. Chronicles the history of King Santanu of Hastinapura and Goddess Ganga. Ganga drowns her first seven newborn sons (releasing the cursed Ashta Vasus from earthly existence), but Santanu stops her from drowning the eighth son, Devavrata. Devavrata is educated in the Vedas by Vashistha and warfare by Parashurama. Later, Santanu falls in love with Satyavati, daughter of the fisherman chief. To secure his father's happiness, Devavrata takes the awe-inspiring dual vow of relinquishing the throne and embracing lifelong celibacy—becoming eternally celebrated as 'Bhishma' ('The Terrible').",
    summaryTe: "భూభారమును తగ్గించడానికి దేవతలు, అసురులు మానవ రూపాలలో భూమిపై అవతరించిన క్రమము. శంతన మహారాజు మరియు గంగాదేవిల వివాహం. ఏడుగురు వసువులకు మోక్షమిచ్చి, ఎనిమిదవ కుమారుడైన దేవవ్రతుని శంతనునికి అప్పగించుట. వశిష్ఠ-పరశురాముల వద్ద దేవవ్రతుని విద్యాభ్యాసం. శంతనుడు సత్యవతిని వివాహమాడగోరగా, తండ్రి సుఖం కోసం దేవవ్రతుడు రాజ్యార్హతను వదులుకుని, ఆజన్మ బ్రహ్మచర్య భీషణ ప్రతిజ్ఞ చేసి 'భీష్ముడు'గా ప్రసిద్ధికెక్కిన మహోన్నత ఘట్టము.",
    keyQuoteRoy: "I shall renounce the kingdom and remain a Brahmacharin for life. Even if the sun lose his brightness, or the moon her cool light, I shall never break my pledge!",
    dharmaInsight: "Filial devotion reaching the heights of self-sacrifice creates immortal spiritual stature, yet rigid vows can later bind virtuous souls in tragic dilemmas."
  },
  {
    number: 7,
    id: "sambhava",
    nameEn: "Sambhava Parva",
    nameSa: "सम्भवपर्व",
    nameTe: "సంభవ పర్వము",
    sections: "Sections LXVIII - CXL",
    versesApprox: 2420,
    keyCharacters: ["Vyasa", "Ambika", "Ambalika", "Dhritarashtra", "Pandu", "Vidura", "Kunti", "Madri", "Karna", "Yudhishthira", "Bhima", "Arjuna", "Duryodhana", "Drona", "Ekalavya"],
    summaryEn: "The grand chronicles of Kuru generation. After Santanu's sons Chitrangada and Vichitravirya die heirless, Queen Satyavati calls Sage Vyasa to perform Niyoga: Ambika gives birth to blind Dhritarashtra; Ambalika to pale Pandu; and a maidservant to righteous Vidura. Pandu becomes king, marries Kunti and Madri, but is cursed by hermit Kindama. Kunti invokes Durvasa's mantra, begetting Yudhishthira from Dharma, Bhima from Vayu, Arjuna from Indra, and Madri begets Nakula and Sahadeva from the Ashvins. Gandhari gives birth to 100 Kauravas led by Duryodhana. Following Pandu's death, Kunti returns the five boys to Hastinapura. Drona trains the princes in weaponry; Arjuna excels all; Ekalavya offers his right thumb in supreme Guru-bhakti; and Karna arrives at the tournament, challenging Arjuna and being crowned King of Anga by Duryodhana.",
    summaryTe: "కురువంశ విస్తరణ. చిత్రాంగద-విచిత్రవీర్యుల మరణానంతరం వ్యాసుని నియోగం ద్వారా ధృతరాష్ట్ర, పాండు, విదురుల జననం. పాండురాజుకు కిందమ ముని శాపం. కుంతీదేవి దుర్వాస మహర్షి మంత్ర ప్రభావంతో ధర్మరాజు, భీముడు, అర్జునులను, మాద్రి నకుల-సహదేవులను కనుట. గాంధారికి నూరుగురు కౌరవులు పుట్టుట. పాండురాజు మరణం. హస్తినలో ద్రోణాచార్యుని ధనుర్విద్యా శిక్షణ, పక్షి కంటిని మాత్రమే చూసిన అర్జునుని ఏకాగ్రత, ఏకలవ్యుని బొటనవ్రేలి గురుదక్షిణ, రంగస్థలంలో కర్ణుని ఆగమనం మరియు అంగరాజ్య పట్టాభిషేకం.",
    keyQuoteRoy: "Drona said: 'O Arjuna, tell me what thou seest.' Arjuna replied: 'I see only the eye of the vulture, and nothing else.' Drona said: 'Shoot!'",
    dharmaInsight: "True mastery in any discipline requires unswerving focus (Ekagrata) where the seeker perceives nothing except the ultimate goal."
  },
  {
    number: 8,
    id: "jatugriha-daha",
    nameEn: "Jatugriha-daha Parva",
    nameSa: "जतुगृहदाहपर्व",
    nameTe: "జాతుగృహదాహ పర్వము",
    sections: "Sections CXLI - CLI",
    versesApprox: 460,
    keyCharacters: ["Duryodhana", "Sakuni", "Purochana", "Yudhishthira", "Bhima", "Kunti", "Vidura"],
    summaryEn: "Envious of Yudhishthira's coronation as crown prince and the Pandavas' immense popularity, Duryodhana schemes with Sakuni and his father to send the Pandavas to the holy town of Varanavata under the pretext of a Shiva festival. Minister Purochana builds a lavish palace constructed entirely of lac, hemp, ghee, and resin (the House of Lac), designed to be set on fire at midnight. Vidura gives Yudhishthira a cryptic warning in the Mleccha dialect before their departure and secretly dispatches an expert miner. The miner excavates a concealed subterranean escape tunnel. When Purochana prepares to ignite the house, Bhima preemptively sets it ablaze, and the Pandavas escape through the tunnel into the deep forest, leaving the Kauravas convinced they have burned to ashes.",
    summaryTe: "ధర్మరాజు యువరాజ పట్టాభిషేకానికి అసూయపడిన దుర్యోధనుడు శకునితో కలిసి వారణావతంలో శివ మహోత్సవం నెపంతో పాండవులను పంపుట. పురోచనుడను శిల్పి ద్వారా లక్క, నెయ్యి, నారలతో సులభంగా మండిపోయే 'లక్షాగృహం' నిర్మింపజేయుట. విదురుడు మ్లేచ్ఛ భాషలో ధర్మరాజును హెచ్చరించి, రహస్యంగా ఒక గని తవ్వేవారిని పంపి భూగర్భ మార్గాన్ని సిద్ధం చేయించుట. కౌరవుల కుట్రను గ్రహించి భీముడే లక్కఇంటికి నిప్పంటించి, సొరంగ మార్గం ద్వారా తల్లితో సహా అరణ్యంలోకి తప్పించుకుని పోవుట.",
    keyQuoteRoy: "He who comprehendeth the words of warning unspoken, escapeth fire and peril. A subterranean passage leadeth the wise to safety while the foolish perish in their own flames.",
    dharmaInsight: "Divine wisdom (represented by Vidura's cryptic counsel) protects the righteous even when enveloped by hidden conspiracies."
  },
  {
    number: 9,
    id: "hidimva-vadha",
    nameEn: "Hidimva-vadha Parva",
    nameSa: "हिडिम्बवधपर्व",
    nameTe: "హిడింబావధ పర్వము",
    sections: "Sections CLII - CLVI",
    versesApprox: 240,
    keyCharacters: ["Bhima", "Kunti", "Hidimba (demon)", "Hidimbi (demoness)", "Ghatotkacha"],
    summaryEn: "The exhausted Pandavas and Kunti rest beneath a giant banyan tree in a fearsome forest. While his mother and brothers sleep, mighty Bhima keeps watch. The man-eating Rakshasa king Hidimba smells human scent and sends his sister Hidimbi to kill them. However, on seeing Bhima's magnificent physique and calm demeanor, Hidimbi falls deeply in love with him, assuming the form of a celestial beauty. An enraged Hidimba arrives and attacks Bhima. A thunderous wrestling match ensues; Bhima crushes Hidimba to death. At Kunti's urging, Bhima agrees to wed Hidimbi on the condition that they remain together until a son is born. Hidimbi bears Ghatotkacha, who grows instantaneously into an invincible illusionist warrior and pledges his loyalty to the Pandavas whenever summoned.",
    summaryTe: "అరణ్యములో అలసిపోయిన తల్లిని, సోదరులను నిద్రపుచ్చి భీముడు కాపలా కాయుట. నరవాసన పసిగట్టిన హిడింబాసురుడు తన చెల్లెలు హిడింబిని పంపుట. భీముని సుందర రూపాన్ని చూసి హిడింబి మోహించుట. ఆగ్రహంతో వచ్చిన హిడింబాసురుని భీముడు భయంకర బాహుయుద్ధంలో చీల్చి చంపుట. కుంతీదేవి అంగీకారంతో భీమ-హిడింబీల వివాహం. క్షణాలలో పెరిగి పర్వతాకారంలో నిలిచిన ఘటోత్కచుని జననం, అవసరమైనప్పుడు వస్తానని పాండవులకు మాట ఇచ్చి వెళ్ళుట.",
    keyQuoteRoy: "Vrikodara Bhima seized the terrible Rakshasa by the waist and broke him across his knee, roaring like a lion in the mountain forest.",
    dharmaInsight: "True strength lies not only in martial ferocity against evil, but in magnanimity toward those who seek refuge and surrender with devotion."
  },
  {
    number: 10,
    id: "vaka-vadha",
    nameEn: "Vaka-vadha Parva",
    nameSa: "बकवधपर्व",
    nameTe: "బకవధ పర్వము",
    sections: "Sections CLVII - CLXIV",
    versesApprox: 310,
    keyCharacters: ["Sage Vyasa", "Kunti", "Yudhishthira", "Bhima", "Brahmin Host Family", "Bakasura (cannibal demon)"],
    summaryEn: "Disguised as ascetic Brahmacharis, the Pandavas take up residence in the serene town of Ekachakra in the home of a pious Brahmin. One evening, Kunti hears loud weeping from the host's chambers. She learns that the city is terrorized by the voracious demon Bakasura, who demands a cartload of rice, two buffaloes, and the human driver who delivers it every week. It is their host's turn to send a member of their family. Moved to tears of empathy, Kunti insists that her mighty son Bhima go in their place, declaring it the duty of Kshatriyas to repay shelter with protection. Bhima merrily rides the food cart, eats all the food before the raging demon, engages in an earth-shattering duel, breaks Bakasura's spine over his knee, and carts the demon's corpse to the city gates, liberating Ekachakra forever.",
    summaryTe: "ఏకచక్రపురంలో బ్రాహ్మణ వేషాలలో పాండవుల నివాసం. ఆశ్రయమిచ్చిన బ్రాహ్మణ కుటుంబం రోదిస్తుండగా కుంతి కారణం అడుగుట. ఆ పురాన్ని పీడిస్తున్న బకాసురునికి వంతులవారీగా బండితో ఆహారం మరియు ఒక మనిషి బలిగా వెళ్ళవలసిన వంతు ఆ కుటుంబానికే వచ్చెనని తెలుసుకొనుట. ఆశ్రయమిచ్చిన వారికి కృతజ్ఞతగా భీముని పంపుతానని కుంతి అభయమిచ్చుట. భీముడు బండి ఆహారాన్ని తానే తింటూ బకాసురుని రెచ్చగొట్టి, భయంకర మల్లయుద్ధంలో వాడి వెన్నెముక విరిచి సంహరించి ఏకచక్రపురానికి రాక్షసపీడ వదిలించుట.",
    keyQuoteRoy: "Kunti said: 'He who eateth another's bread and returneth not good for evil, or protecteth not his host in peril, is degraded among men.'",
    dharmaInsight: "Kshatriya dharma dictates that strength must be wielded unconditionally to shield the helpless and honor the sanctity of hospitality (Atithi Satkara)."
  },
  {
    number: 11,
    id: "chaitraratha",
    nameEn: "Chaitraratha Parva",
    nameSa: "चैत्ररथपर्व",
    nameTe: "చైత్రరథ పర్వము",
    sections: "Sections CLXV - CLXXXIII",
    versesApprox: 890,
    keyCharacters: ["Arjuna", "Angaraparna (Chitraratha)", "Gandharva Queen Kumbhinasi", "Sage Dhaumya", "Sage Vasistha", "Sage Vishvamitra"],
    summaryEn: "As the Pandavas journey towards the kingdom of Panchala, they arrive at the banks of the sacred river Ganga at dead of night. The Gandharva king Angaraparna (Chitraratha) is enjoying water sports with his celestial wives and arrogantly commands them to halt. Arjuna challenges him, declaring the holy Ganga belongs to no individual. In the ensuing clash, Arjuna destroys the Gandharva's fiery weapons with the Agneyastra and drags him by the hair. Chitraratha's wife Kumbhinasi begs for mercy; Arjuna spares him. Grateful, the Gandharva imparts the mystical Chakshushi Vidya (the sight to see everything in the universe) and presents 100 divine Gandharva steeds. He narrates the sacred lore of Vasistha and Vishvamitra, King Kalmashapada, and instructs the Pandavas to appoint Sage Dhaumya as their royal family priest.",
    summaryTe: "పాంచాల దేశానికి వెళ్లే దారిలో అర్ధరాత్రి గంగా నదిలో విహరిస్తున్న అంగారపర్ణుడు (చిత్రరథుడు) అనే గంధర్వునితో అర్జునుని పోరు. గంగానది అందరిదంటూ అర్జునుడు ఆగ్నేయాస్త్రంతో గంధర్వుని రథాన్ని కాల్చి వాడిని జుట్టుపట్టి ఈడ్చుకురాగా, అతని భార్య కుంభీనసి వేడుకొనడంతో అర్జునుడు ప్రాణభిక్ష పెట్టుట. సంతోషించిన గంధర్వుడు అర్జునునికి సమస్తాన్ని చూడగల 'చాక్షుషీ విద్య'ను, దివ్యాశ్వాలను బహూకరించుట. వశిష్ఠ-విశ్వామిత్రుల కథలను వినిపించి, దౌమ్య మహర్షిని తమ కులగురువుగా నియమించుకోవాలని మార్గదర్శనం చేయుట.",
    keyQuoteRoy: "The Gandharva said: 'O Arjuna, thou hast defeated me by fair fight and spared my life. Accept from me the mystic science of Chakshushi and divine horses born of celestial breed.'",
    dharmaInsight: "A righteous warrior fights without malice; when victory is achieved, enemies are transformed into noble allies through chivalry and grace."
  },
  {
    number: 12,
    id: "swayamvara",
    nameEn: "Swayamvara Parva",
    nameSa: "स्वयंवरपर्व",
    nameTe: "ద్రౌపదీ స్వయంవర పర్వము",
    sections: "Sections CLXXXIV - CXC",
    versesApprox: 540,
    keyCharacters: ["King Drupada", "Dhrishtadyumna", "Princess Draupadi", "Arjuna", "Karna", "Duryodhana", "Sri Krishna", "Balarama", "Bhima"],
    summaryEn: "The majestic city of Kampilya is adorned for the Swayamvara of Princess Draupadi (born of the sacrificial fire). King Drupada crafts an extraordinary challenge: a gigantic, rigid bow that must be strung, and five arrows shot through a revolving wheel to hit the eye of a golden target hanging high in the sky. All the monarchs, princes, and warriors—including Duryodhana, Shalya, and Sisupala—fail even to bend the monstrous bow. Amidst breathless silence, young Arjuna, dressed in simple hermit robes, steps forward from the Brahmin enclave. Bowing to Lord Ishana, he lifts the bow effortlessly, strings it in an instant, and shoots the five arrows into the target! Draupadi places the fragrant bridal garland upon Arjuna. Enraged Kshatriya kings attack; Bhima uproots a massive sal tree while Arjuna rains arrows, repelling Karna and the kings until Sri Krishna pacifies the assembly.",
    summaryTe: "పాంచాల రాజధాని కాంపిల్య నగరంలో అగ్నిసంభవయైన ద్రౌపదీ స్వయంవర ఘట్టము. తిరుగుతున్న మత్స్యయంత్రం కంటిని నీటిలో ప్రతిబింబం చూస్తూ ఛేదించవలసిన కఠిన పరీక్ష. దుర్యోధన, శల్య, శిశుపాలాది సమస్త క్షత్రియ రాజులు విల్లును ఎక్కుపెట్టలేక భంగపడుట. బ్రాహ్మణ వేషములో ఉన్న అర్జునుడు పరమేశ్వరుని ధ్యానించి, విల్లును అవలీలగా ఎక్కుపెట్టి ఐదు బాణాలతో మత్స్యయంత్రాన్ని నేలకూల్చి విజయకేతనం ఎగురవేయుట. ద్రౌపది అర్జునుని మెడలో పూలమాల వేయగా, క్షత్రియులందరూ యుద్ధానికి దిగుట, భీమార్జునులు కర్ణాదులను తిప్పికొట్టగా శ్రీకృష్ణుడు జోక్యం చేసుకుని శాంతింపజేయుట.",
    keyQuoteRoy: "Arjuna, having revolved in his mind the target and having pierced it with the arrows, brought it down to the ground. Thereupon, celestial flowers were showered upon him from heaven.",
    dharmaInsight: "Divine destiny selects those whose devotion, composure, and concentration match the grandeur of the cosmic design, regardless of their external guise."
  },
  {
    number: 13,
    id: "vaivahika",
    nameEn: "Vaivahika Parva",
    nameSa: "वैवाहिकपर्व",
    nameTe: "వైవాహిక పర్వము",
    sections: "Sections CXCI - CC",
    versesApprox: 380,
    keyCharacters: ["Kunti", "Yudhishthira", "Arjuna", "Draupadi", "King Drupada", "Sage Vyasa", "Dhrishtadyumna"],
    summaryEn: "The victorious brothers bring Draupadi to the potter's house where Kunti is waiting. Calling out playfully, 'Mother, look at the alms we have brought today!', Kunti, without looking, instructs, 'Share and enjoy it equally among yourselves!' Realizing what she has spoken, Kunti is grief-stricken. Yudhishthira ponders deeply: a mother's word must never be rendered untrue. When King Drupada hears of the proposal that Draupadi marry all five Pandavas, he objects on grounds of tradition. At that critical moment, Maharshi Vyasa arrives and takes Drupada into a private chamber, revealing the cosmic truth: in past births, Draupadi was an ascetic woman who prayed to Lord Shiva five times for a virtuous husband, and the Pandavas are manifestations of the five Indras of old. Fully enlightened, Drupada celebrates the grand wedding with sacred Vedic rituals.",
    summaryTe: "పాండవులు ద్రౌపదితో కుమ్మరి ఇంటికి రాగా 'అమ్మా, ఈ రోజు తెచ్చిన భిక్షను చూడు' అని అర్జునుడు పలకగా, చూడకుండానే 'ఐదుగురు సమానంగా పంచుకోండి' అని కుంతి పలకడం. తల్లి వాక్కు అసత్యం కారాదనే ధర్మసంకటంలో పడిన ధర్మరాజు. ద్రౌపదిని ఐదుగురు వివాహమాడటం లోకవిరుద్ధమని దృపదుడు సంశయించగా, వ్యాస మహర్షి స్వయంగా విచ్చేసి రహస్యంగా పూర్వజన్మ వృత్తాంతాన్ని వివరించుట: పూర్వజన్మలో శివుని వరం వల్ల ఐదుగురు ఇంద్రుల అంశలైన పాండవులకు ద్రౌపది దేవిగా నియమింపబడిన దైవసంకల్పం. శాస్త్రోక్తంగా వేదమంత్రాల మధ్య వివాహం జరుగుట.",
    keyQuoteRoy: "Vyasa said: 'O King, this one maiden of celestial beauty hath been ordained by the gods to be the wife of them all. Hearken unto the ancient ordinance of Mahadeva!'",
    dharmaInsight: "Beneath apparent social anomalies in divine epics lie profound cosmic designs and karmic continuities hidden from ordinary mortal eyes."
  },
  {
    number: 14,
    id: "viduragamana",
    nameEn: "Viduragamana Parva",
    nameSa: "विदुरागमनपर्व",
    nameTe: "విదురాగమన పర్వము",
    sections: "Sections CCI - CCVI",
    versesApprox: 290,
    keyCharacters: ["Duryodhana", "Karna", "Bhishma", "Drona", "King Dhritarashtra", "Vidura", "King Drupada"],
    summaryEn: "Hastinapura is shaken when spies report that the Pandavas are alive, thriving, and formidably allied with King Drupada of Panchala. Duryodhana and Karna rush to King Dhritarashtra, proposing devious methods to sow discord among the five brothers or launch a surprise assault. Grandfather Bhishma and preceptor Drona sternly admonish them, declaring that the Pandavas are sons of Pandu with equal rights to the ancestral realm and that righteousness must prevail. Vidura supports their counsel, warning Dhritarashtra that injustice will ruin the entire Kuru dynasty. Dhritarashtra yields and sends Vidura to Panchala loaded with gold and gemstones to invite the Pandavas and Draupadi back to Hastinapura with sovereign honors.",
    summaryTe: "పాండవులు సజీవులుగా ఉండి ద్రౌపదిని వివాహమాడి పాంచాల బలంతో ఉన్నారన్న వార్త హస్తినకు తెలియగా దుర్యోధన-కర్ణులు రగిలిపోయి కుట్రలకు యత్నించుట. భీష్మ-ద్రోణులు ధృతరాష్ట్రుని మందలించి, పాండవులకు న్యాయంగా రావలసిన రాజ్యాన్ని ఇవ్వాలని గట్టిగా హితవు పలుకుట. విదురుడు కూడా ధర్మం వైపు నిలవగా, ధృతరాష్ట్రుడు విదురుడిని కానుకలతో పాంచాల నగరానికి పంపి పాండవులను హస్తినకు ఆహ్వానించుట.",
    keyQuoteRoy: "Bhishma said: 'O Duryodhana, peace with the Pandavas is what I approve. Half the kingdom is theirs by birthright; give it to them without grievance!'",
    dharmaInsight: "Counsel given by elders and preceptors rooted in Dharma is the only safeguard of an empire; rejecting it marks the beginning of inevitable destruction."
  },
  {
    number: 15,
    id: "rajya-labha",
    nameEn: "Rajya-labha Parva",
    nameSa: "राज्यलाभपर्व",
    nameTe: "రాజ్యలాభ పర్వము",
    sections: "Sections CCVII - CCXII",
    versesApprox: 410,
    keyCharacters: ["Dhritarashtra", "Yudhishthira", "Sri Krishna", "Viswakarma", "Devarshi Narada", "Sunda", "Upasunda"],
    summaryEn: "The Pandavas return to Hastinapura in triumph. Dhritarashtra, seeking to avoid open conflict, partitions the Kuru empire, granting the Pandavas the arid, forested region of Khandavaprastha. Accompanied by Sri Krishna, the Pandavas transform the wilderness into the glorious celestial city of **Indraprastha**, built by the divine architect Viswakarma with crystal moats, golden gateways, and peerless palaces. Devarshi Narada visits Indraprastha and narrates the cautionary tale of the demon brothers Sunda and Upasunda, who destroyed each other over woman Tilottama. To safeguard brotherhood, Narada institutes a strict covenant: each brother shall live with Draupadi for one year in rotation; if another brother enters during that time, he must observe a twelve-year forest exile in celibacy.",
    summaryTe: "హస్తినకు వచ్చిన పాండవులకు ఖాండవప్రస్థమనే అరణ్య ప్రాంతాన్ని రాజ్యభాగంగా ఇచ్చుట. శ్రీకృష్ణుని సమక్షంలో విశ్వకర్మ సహాయంతో దేవతల రాజధాని అమరావతిని తలపించేలా 'ఇంద్రప్రస్థ' మహానగర నిర్మాణము. నారద మహర్షి వచ్చి సుందోపసుందుల కథను చెప్పి, ద్రౌపది విషయములో సోదరుల మధ్య విద్వేషాలు రాకుండా నియమమును ఏర్పరచుట: ఒక్కొక్క సోదరుడు ఒక ఏడాది చొప్పున ద్రౌపదితో గడపవలెను, ఆ సమయములో వేరొకరు ప్రవేశిస్తే 12 ఏళ్ళు బ్రహ్మచర్యంతో తీర్థయాత్రలు చేయవలెనని నియమము చేయుట.",
    keyQuoteRoy: "Indraprastha shone like the city of Indra himself, surrounded by sea-like moats and adorned with palaces white as the peaks of Kailasa.",
    dharmaInsight: "Even the strongest bonds of love and brotherhood require sacred boundaries, mutual respect, and disciplined ethical codes to remain unbreakable."
  },
  {
    number: 16,
    id: "arjuna-vanavasa",
    nameEn: "Arjuna-vanavasa Parva",
    nameSa: "अर्जुनवनवासपर्व",
    nameTe: "అర్జున వనవాస పర్వము",
    sections: "Sections CCXIII - CCXVII",
    versesApprox: 380,
    keyCharacters: ["Arjuna", "Yudhishthira", "Ulupi (Naga princess)", "Chitrangada", "Babhruvahana", "Five Cursed Apsaras (Crocodiles)"],
    summaryEn: "Robbers steal the cows of a weeping Brahmin in Indraprastha. The only weapons available are stored in the inner chamber where Yudhishthira and Draupadi are seated. Arjuna faces a moral crossroads: either let the Brahmin suffer injustice or violate the vow of privacy and accept 12 years of exile. Arjuna boldly chooses righteousness: he retrieves the bow, routs the thieves, restores the cattle, and voluntarily embarks upon twelve years of exile despite Yudhishthira's loving protests. During his travels across Bharatavarsha, Arjuna is pulled into the underworld by Naga princess Ulupi, marrying her and fathering Iravan. In Manipura, he marries Princess Chitrangada, fathering Babhruvahana. In the southern seas, he liberates five cursed Apsaras trapped in crocodile bodies by pulling them ashore.",
    summaryTe: "ఇంద్రప్రస్థంలో ఒక బ్రాహ్మణుని గోవులను దొంగలు అపహరించగా, ఆయుధాలు ధర్మరాజు-ద్రౌపదులున్న గదిలో ఉండుట. ధర్మసంకటంలో పడిన అర్జునుడు బ్రాహ్మణుని కాపాడటానికి గదిలోకి వెళ్లి విల్లును తెచ్చి దొంగలను సంహరించి గోవులను తెచ్చుట. ధర్మరాజు క్షమించినా, నియమపాలన కొరకు తానే స్వచ్ఛందంగా 12 ఏళ్ళ తీర్థయాత్రలకు బయలుదేరుట. గంగా నదిలో ఉలూపి అనే నాగకన్యను, మణిపురంలో చిత్రాంగదను వివాహమాడుట (బభ్రువాహనుని జననం), మరియు మొసళ్ళుగా మారిన ఐదుగురు అప్సరసలకు శాపవిమోచనం కలిగించుట.",
    keyQuoteRoy: "Arjuna said: 'I will not swerve from the truth! I took a vow, and by that vow will I abide; for truth is my weapon and truth is my refuge.'",
    dharmaInsight: "True integrity means honoring one's ethical vows even when an exemption is readily available, viewing duty toward the distressed as the supreme virtue."
  },
  {
    number: 17,
    id: "subhadra-harana",
    nameEn: "Subhadra-harana Parva",
    nameSa: "सुभद्राहरणपर्व",
    nameTe: "సుభద్రాహరణ పర్వము",
    sections: "Sections CCXVIII - CCXX",
    versesApprox: 190,
    keyCharacters: ["Arjuna", "Sri Krishna", "Subhadra", "Balarama", "Yadavas"],
    summaryEn: "Toward the end of his exile, Arjuna reaches holy Prabhasa on the western coast. Sri Krishna meets him and takes him to Dvaraka. During the grand spring festival on Mount Raivataka, Arjuna beholds Subhadra, the enchanting sister of Krishna and Balarama, and falls deeply in love with her. Krishna observes: 'For a Kshatriya, abduction of a maiden for marriage is sanctioned when her heart is won, for a swayamvara's outcome is uncertain.' Disguised as a sage (Yati), Arjuna awaits his moment. With Subhadra driving her own chariot in assent, Arjuna carries her away towards Indraprastha. The Yadava warriors mobilize in fury, but Sri Krishna pacifies Balarama and the elders, praising Arjuna's unmatched pedigree, honor, and martial courage.",
    summaryTe: "తీర్థయాత్రల ముగింపులో అర్జునుడు ప్రభాస తీర్థానికి రాగా శ్రీకృష్ణుడు ద్వారకకు తోడ్కొని వెళ్ళుట. రైవతక పర్వత ఉత్సవంలో బలరామ-కృష్ణుల సోదరియైన సుభద్రను చూసి అర్జునుడు ప్రేమించుట. స్వయంవర ఫలితం అనిశ్చితం కనుక శౌర్యవంతుడైన క్షత్రియునికి కన్యను తోడ్కొనిపోవుట ధర్మసమ్మతమేనని కృష్ణుడు ఉపదేశించుట. సుభద్ర అనుమతితో రథంపై ఆమెను హస్తిన వైపు తీసుకెళ్ళగా, యాదవులు ఆగ్రహించగా కృష్ణుడు బలరామునికి నచ్చజెప్పి శాంతింపజేయుట.",
    keyQuoteRoy: "Krishna said: 'Who is there that would not desire Arjuna for an ally? He is born in the illustrious line of Bharata, pure in deed, and peerless in prowess.'",
    dharmaInsight: "True marital alliance in the Kshatriya code celebrates reciprocal valor, consent, and mutual nobility of soul."
  },
  {
    number: 18,
    id: "harana-harika",
    nameEn: "Harana-harika Parva",
    nameSa: "हरणहारिकपर्व",
    nameTe: "హరణహారిక పర్వము",
    sections: "Sections CCXXI - CCXXII",
    versesApprox: 160,
    keyCharacters: ["Balarama", "Sri Krishna", "Subhadra", "Draupadi", "Abhimanyu", "Upapandavas"],
    summaryEn: "Arjuna returns to Indraprastha with Subhadra. Subhadra respectfully wears simple cowherd clothes and wins Queen Draupadi's affectionate heart with humility. Lord Balarama, Sri Krishna, and the Yadava royalty arrive at Indraprastha bearing mountainous bridal dowries: thousands of royal chariots, war elephants, pedigreed steeds, and heaps of gold and jewels. In due course, Subhadra gives birth to the glorious, peerless prince **Abhimanyu**, who learns the art of penetrating military formations from Arjuna. Queen Draupadi gives birth to five sons (the Upapandavas)—Prativindhya, Sutasoma, Srutakarma, Satanika, and Srutasena—bringing great joy to Indraprastha.",
    summaryTe: "సుభద్రను తీసుకుని ఇంద్రప్రస్థం చేరిన అర్జునుడు. సుభద్ర గోపికా వేషంలో వెళ్లి వినయంతో ద్రౌపది ఆశీస్సులు పొందుట. బలరామ-కృష్ణులు అపారమైన రథ, గజ, తురంగ, ధనరాశులను కానుకలుగా తెచ్చి వైభవంగా వివాహ విందులు జరుపుట. తదనంతరం సుభద్ర గర్భమున లోకైక వీరుడైన అభిమన్యుని జననం. ద్రౌపది ఐదుగురు పాండవులకు ప్రతివింధ్య, శ్రుతసోమ, శ్రుతకర్మ, శతానీక, శ్రుతసేనులను కనుట.",
    keyQuoteRoy: "Subhadra brought forth a son of wide eyes like lotus petals, whose name became Abhimanyu, radiant like the morning sun.",
    dharmaInsight: "Humility and gentle respect dissolve domestic envy, converting potential rivalry into lasting affection and harmony."
  },
  {
    number: 19,
    id: "khandava-daha",
    nameEn: "Khandava-daha Parva",
    nameSa: "खाण्डवदाहपर्व",
    nameTe: "ఖాండవదాహ పర్వము",
    sections: "Sections CCXXIII - CCXXXVI",
    versesApprox: 840,
    keyCharacters: ["Agni Deva (Fire God)", "Sri Krishna", "Arjuna", "Varuna Deva", "King Indra", "Maya Danava", "Takshaka", "Mandapala's 4 Sharngaka birds"],
    summaryEn: "The climactic final section of Adi Parva. Agni Deva, afflicted with stomach disease after consuming King Swetaki's 100-year uninterrupted clarified butter offerings, approaches Krishna and Arjuna in Brahmin guise on the banks of Yamuna, begging them to satisfy his hunger by burning the overgrown Khandava forest. Agni invokes Varuna, who presents Arjuna with the celestial **Gandiva Bow** (crafted by Brahma), inexhaustible quivers (Akshaya Tunira), and a divine chariot bearing the Kapidhwaja (monkey banner). To Krishna, Varuna gives the **Sudarshana Chakra** and Kaumodaki mace. As Agni consumes the forest, Indra sends torrential thunder-clouds to protect his friend Takshaka. Arjuna covers the sky with a dense, seamless canopy of arrows, preventing even a single raindrop from reaching the earth. Astounded by his son's prowess, Indra desists and blesses Arjuna. Arjuna rescues Maya Danava from the fire, who in gratitude pledges to build the marvelous Mayasabha, setting the stage for the glorious Sabha Parva.",
    summaryTe: "ఆది పర్వపు ముగింపు మహోద్భుత ఘట్టము. శ్వేతకి యాగ నేతిని అతిగా తాగి అజీర్తితో బాధపడుతున్న అగ్నిదేవుడు బ్రాహ్మణ రూపంలో వచ్చి ఖాండవ వనాన్ని దహించి తన ఆకలి తీర్చమని కృష్ణార్జునులను ప్రార్థించుట. వరుణుని ద్వారా అర్జునునికి బ్రహ్మ నిర్మితమైన 'గాండీవ ధనువు', అక్షయ తూణీరాలు, కపిధ్వజ రథము లభించుట; శ్రీకృష్ణునికి సుదర్శన చక్రం లభించుట. ఖాండవ వనాన్ని అగ్ని దహిస్తుండగా ఇంద్రుడు మేఘాలతో వర్షం కురిపించగా, అర్జునుడు బాణాలతో ఆకాశమంతా బాణపంజరముగా అల్లి ఒక్క చినుకు కూడా నేలను తాకకుండా చేయుట. అర్జునుని శౌర్యానికి మెచ్చిన ఇంద్రుడు వరమిచ్చుట. అగ్ని నుండి రక్షించబడిన మయదానవుడు కృతజ్ఞతతో అద్భుతమైన మయసభను నిర్మిస్తానని మాట ఇచ్చుట.",
    keyQuoteRoy: "Varuna gave unto Arjuna that great weapon Gandiva, which was incapable of being broken by any weapon, and two quivers that should never be exhausted of arrows.",
    dharmaInsight: "Righteous action aligns the hero with cosmic forces, equipping the soul with divine instruments (Gandiva and Sudarshana) to overcome titanic trials."
  }
];

/* ===== MAHABHARATA CHARACTERS ROSTER ===== */
const MAHABHARATA_CHARACTERS = [
  {
    nameEn: "Sri Krishna (శ్రీకృష్ణుడు)",
    role: "Incarnation of Narayana, Guiding Soul of the Pandavas, Divine Charioteer",
    icon: "🦚",
    quote: "Do not grieve for that which is transient; establish your consciousness in the Eternal and perform your sacred duty."
  },
  {
    nameEn: "Arjuna (అర్జునుడు)",
    role: "The Peerless Archer (Nara), Bearer of Gandiva, Disciple of Krishna",
    icon: "🏹",
    quote: "My focus is unbroken, my bow is unyielding, and with Krishna as my charioteer, righteousness will prevail."
  },
  {
    nameEn: "Yudhishthira (ధర్మరాజు)",
    role: "Dharmaraja, Eldest Pandava, Personification of Truth & Justice",
    icon: "⚖️",
    quote: "Dharma protects those who protect it; truth is higher than life itself."
  },
  {
    nameEn: "Bhima (భీమసేనుడు)",
    role: "The Mighty Vrikodara, Crusher of Demons, Defender of the Oppressed",
    icon: "🔨",
    quote: "Let tyranny beware; the mace of Bhima breaks the arrogance of those who dishonor virtue."
  },
  {
    nameEn: "Draupadi (ద్రౌపది)",
    role: "Yajnaseni, Queen of the Pandavas, Embodiment of Sacred Courage & Dignity",
    icon: "🔥",
    quote: "A woman's honor is the supreme pillar of an empire; when kings fail to protect it, their dynasty burns."
  },
  {
    nameEn: "Bhishma (భీష్మ పితామహుడు)",
    role: "Grand Patriarch of the Kurus, Embodiment of Inviolable Vow (Iccha Mrityu)",
    icon: "🛡️",
    quote: "Where there is Krishna, there is Dharma; and where there is Dharma, there is victory."
  },
  {
    nameEn: "Karna (కర్ణుడు)",
    role: "Danaveera Karna, Son of Surya, The Tragic Loyal Sovereign of Anga",
    icon: "☀️",
    quote: "Lineage is given by fate, but valor and sacrifice belong to my own soul."
  },
  {
    nameEn: "Vidura (విదురుడు)",
    role: "Incarnation of Dharma, Chief Minister, Voice of Conscience (Vidura Niti)",
    icon: "📜",
    quote: "Neither gold nor sovereignty endures; only the reputation for righteousness survives the grave."
  }
];

/* ===== SABHA PARVA: COMPLETE 10 UPA-PARVAS (ఉపపర్వాలు) DETAIL =====
   Based directly on Pratap Chandra Roy's English Translation (Volume II) */
const SABHA_PARVA_UPAPARVAS = [
  {
    number: 1,
    id: "sabhakriya",
    nameEn: "Sabhakriya Parva",
    nameSa: "सभाक्रियापर्व",
    nameTe: "సభాక్రియా పర్వము",
    sections: "Sections I - IV",
    versesApprox: 480,
    keyCharacters: ["Maya Danava", "Arjuna", "Sri Krishna", "Yudhishthira", "Bhima", "8000 Kinkaras"],
    summaryEn: "Following the burning of Khandava, the celestial architect Maya Danava, saved by Arjuna, expresses his gratitude. Arjuna refuses any personal reward but requests Maya to do something for Krishna. Sri Krishna instructs Maya to build a palatial assembly hall (Mayasabha) for Yudhishthira combining godly, Asuric, and human architecture. Maya journeys to Mount Mainaka near Lake Vindu and retrieves a celestial club equal to 100,000 maces for Bhima, the Devadatta conch-shell for Arjuna, and glittering crystalline stones. Maya erects a peerless palace covering 5,000 cubits square, guarded by 8,000 aerial Kinkara Rakshasas. The palace features optical-illusion tanks with transparent waters, crystal stairs, and lotus flowers of gold where many monarchs mistake water for land and fall into it. King Yudhishthira feeds 10,000 Brahmanas and inaugurates the hall in glory.",
    summaryTe: "ఖాండవ దహనంలో అర్జునుని వల్ల ప్రాణరక్షణ పొందిన మయదానవుడు కృతజ్ఞతతో అర్జునుని సేవ చేయగోరుట. కృష్ణుని సూచన మేరకు ధర్మరాజు కోసం దివ్యమైన మయసభను నిర్మించడానికి పూనుకొనుట. బిందు సరోవరము నుండి భీమునికి లక్ష గదల సమానమైన మహా గదను, అర్జునునికి దేవదత్త శంఖాన్ని, దివ్య రత్నాలను తెచ్చుట. 5000 మూరల విస్తీర్ణంలో, 8000 కింకరులు కాపలా కాసేలా, నేల నీరుగా, నీరు నేలగా భ్రమ కలిగించే స్ఫటిక సరోవరాలతో మయసభను 14 నెలలలో నిర్మించుట. ధర్మరాజు పదివేల మంది బ్రాహ్మణులకు అన్నదానము చేసి మయసభలో ప్రవేశించుట.",
    keyQuoteRoy: "Krishna commanded Maya: 'Let a palatial sabha as thou choosest be built, that persons belonging to the world of men may not be able to imitate it even after examining it with care.'",
    dharmaInsight: "Gratitude transformed into selfless creative excellence immortalizes the bond between artist and righteous benefactor."
  },
  {
    number: 2,
    id: "lokapala-sabha",
    nameEn: "Lokapala Sabhakhayana Parva",
    nameSa: "लोकपालसभाख्यानपर्व",
    nameTe: "లోకపాల సభాఖ్యాన పర్వము",
    sections: "Sections V - XIII",
    versesApprox: 1120,
    keyCharacters: ["Devarshi Narada", "King Yudhishthira", "King Pandu", "King Harishchandra"],
    summaryEn: "The divine sage Narada arrives at Mayasabha and delivers an immortal masterpiece on Rajadharma (the science of righteous statecraft, economic prosperity, public administration, judicial fairness, and vigilance against corruption). Narada then describes the five celestial assembly halls of the cosmos: Indra's Pushkara-malini, Yama's Samani, Varuna's aquatic palace, Kubera's gem-encrusted Vibhishi, and Lord Brahma's self-effulgent Sabha. Narada reveals that King Harishchandra resides in Indra's assembly having performed the Rajasuya sacrifice. He conveys a poignant message from King Pandu in Pitriloka urging Yudhishthira to perform the Rajasuya sacrifice so that Pandu may ascend to Indra's celestial abode.",
    summaryTe: "నారద మహర్షి మయసభకు విచ్చేసి ధర్మరాజుకు రాజనీతి, వ్యవసాయం, ఆర్థిక వ్యవస్థ, న్యాయపాలన మరియు మంత్రుల గుణగణాలపై విశిష్టమైన 'రాజధర్మ' బోధ చేయుట. ఆపై ఇంద్ర, యమ, వరుణ, కుబేర, బ్రహ్మ లోకాలలోని ఐదు దివ్య సభల వైభవాన్ని వర్ణించుట. రాజసూయ యాగం చేసినందువల్ల హరిశ్చంద్రుడు ఇంద్రసభలో ఉన్నాడని, పితృలోకంలో ఉన్న పాండురాజు ధర్మరాజును రాజసూయం చేయమని కోరినట్లు నారదుడు సందేశమిచ్చుట.",
    keyQuoteRoy: "Narada said: 'Continuest thou in noble conduct? Never injurest thou religion for the sake of wealth, or both religion and wealth for the sake of pleasure that easily seduces?'",
    dharmaInsight: "A king's righteousness is tested not in military triumph alone, but in protecting the poor, ensuring honest justice, and keeping the treasury clean."
  },
  {
    number: 3,
    id: "rajasuyarambha",
    nameEn: "Rajasuyarambha Parva",
    nameSa: "राजसूयारम्भपर्व",
    nameTe: "రాజసూయారంభ పర్వము",
    sections: "Sections XIV - XIX",
    versesApprox: 540,
    keyCharacters: ["Yudhishthira", "Sri Krishna", "King Jarasandha", "King Brihadratha", "Jara (Rakshasi)", "Sage Chandakausika"],
    summaryEn: "Yudhishthira consults his ministers and summons Sri Krishna from Dvaraka to deliberate on the Rajasuya. Sri Krishna explains that the imperial title can only be claimed if the tyrant King Jarasandha of Magadha is overcome. Jarasandha has conquered Aryavarta and imprisoned 86 monarchs in Girivraja hill-fort, intending to sacrifice 100 kings to Lord Shiva. Krishna narrates Jarasandha's miraculous birth: born as two severed halves to the twin queens of King Brihadratha, joined together by the cannibal Rakshasi Jara, and blessed by Sage Chandakausika. Krishna declares that Jarasandha must be destroyed to liberate the royal prisoners and establish universal righteousness.",
    summaryTe: "రాజసూయ యాగ సంకల్పంతో ధర్మరాజు శ్రీకృష్ణుని ఆహ్వానించుట. మగధరాజు జరాసంధుడు 86 మంది రాజులను బంధించి రుద్రదేవునికి నరబలి ఇవ్వాలని చూస్తున్నాడని, అతడిని సంహరించకుండా రాజసూయం సాధ్యపడదని కృష్ణుడు వివరించుట. బృహద్రథుని రాణులకు ముక్కలుగా పుట్టిన శిశువును జర అనే రాక్షసి అతికించగా జరాసంధుడైన వృత్తాంతం, చండకౌశికుని వరాల కథను కృష్ణుడు వివరించుట.",
    keyQuoteRoy: "Krishna said: 'In me is policy, in Bhima is strength, in Arjuna is triumph. So like the three sacrificial fires that accomplish a sacrifice, we shall accomplish the death of the king of Magadha.'",
    dharmaInsight: "Tyranny that treats sovereign human lives as sacrificial fodder must be uprooted before righteous sovereignty can be consecrated."
  },
  {
    number: 4,
    id: "jarasandha-badha",
    nameEn: "Jarasandha-badha Parva",
    nameSa: "जरासन्धवधपर्व",
    nameTe: "జరాసంధవధ పర్వము",
    sections: "Sections XX - XXIV",
    versesApprox: 490,
    keyCharacters: ["Sri Krishna", "Bhima", "Arjuna", "King Jarasandha", "Sahadeva (son of Jarasandha)"],
    summaryEn: "Krishna, Arjuna, and Bhima travel to Girivraja disguised as Snataka Brahmanas. They break through the sacred Chaityaka peak and enter the city by an unconventional path. Jarasandha receives them at midnight according to his sacred vow of hospitality. Krishna reveals their true Kshatriya identities and challenges Jarasandha to single combat. Jarasandha proudly chooses to duel mighty Bhimasena. The wrestling match rages without food or intermission for 14 continuous days and nights. On the 14th night, as Jarasandha tires, Krishna signals Bhima by splitting a straw in twain. Bhima whirls Jarasandha 100 times in the air, breaks his backbone across his knee, and tears his body into two pieces, casting them in opposite directions so they cannot reunite. Krishna liberates the 86 kings, installs Jarasandha's son Sahadeva on the throne of Magadha, and acquires the divine celestial chariot.",
    summaryTe: "బ్రాహ్మణ వేషాలలో కృష్ణార్జున-భీములు గిరివ్రజ పురము చేరి చైత్యక శిఖరాన్ని ఛేదించుట. అర్ధరాత్రి దర్శనంలో నిజస్వరూపాలు బయటపెట్టి ద్వంద్వయుద్ధానికి ఆహ్వానించుట. జరాసంధుడు భీమునితో మల్లయుద్ధాన్ని ఎంచుకొనుట. 14 రాత్రింబవళ్ళు అవిశ్రాంతంగా జరిగిన మహోగ్ర కుస్తీ యుద్ధం. అలసిపోయిన జరాసంధుని చూసి కృష్ణుడు గడ్డిపోచను చీల్చి సంజ్ఞ చేయగా, భీముడు జరాసంధుని గాల్లో నూరుసార్లు తిప్పి, వెన్నెముక విరిచి నిలువునా రెండుగా చీల్చి సంహరించుట. బందీలుగా ఉన్న 86 మంది రాజులకు విముక్తి కలిగించి, జరాసంధుని కుమారుడైన సహదేవునికి పట్టాభిషేకం చేయుట.",
    keyQuoteRoy: "Bhima whirled him in the air full hundred times, pressed his knee against Jarasandha's backbone and broke his body in twain.",
    dharmaInsight: "Evil forces relying on unnatural boons fall when confronted by divine strategy (Krishna) allied with righteous physical valor (Bhima)."
  },
  {
    number: 5,
    id: "digvijaya",
    nameEn: "Digvijaya Parva",
    nameSa: "दिग्विजयपर्व",
    nameTe: "దిగ్విజయ పర్వము",
    sections: "Sections XXV - XXXII",
    versesApprox: 980,
    keyCharacters: ["Arjuna (North)", "Bhima (East)", "Sahadeva (South)", "Nakula (West)", "Bhagadatta", "Sisupala", "Mainda & Dwivida"],
    summaryEn: "With Jarasandha dead, the four Pandava brothers set out at the head of mighty hosts to conquer the four quarters of the earth (Digvijaya) and collect imperial tribute. Arjuna leads the Northern campaign, defeating the Kulindas, King Bhagadatta of Pragjyotisha (after an 8-day battle), Kashmir, Kambojas, Rishikas, and reaching Mount Meru and the borders of Uttara Kuru. Bhima conquers the Eastern realms: Panchala, Videha, Sisupala of Chedi (peacefully), Ayodhya, Kasi, Anga, Karna, Pundra, Vanga, and coastal Mlecchas. Sahadeva marches South: subduing Matsya, Avanti, Bhojakata, Kishkindha (where monkey chiefs Mainda and Dwivida honor him), Mahishmati (King Nila), and receiving tribute from Vibhishana of Lanka. Nakula subjugates the Western direction: Rohitaka, Madra (uncle Shalya), and the Arabian sea coast.",
    summaryTe: "రాజసూయ యాగార్థం నలుగురు పాండవుల చతుర్దిగ్విజయ యాత్ర. ఉత్తర దిక్కున అర్జునుడు ప్రాగ్జ్యోతిషపుర రాజు భగదత్తుని, కాశ్మీర, కాంభోజ, ఉత్తరకురు రాజ్యాలను జయించుట. తూర్పు దిక్కున భీముడు చేదిరాజు శిశుపాలునితో మైత్రి చేసుకుని, అంగ, వంగ, కర్ణ, పుండ్ర, సముద్రతీర మ్లేచ్ఛులను జయించుట. దక్షిణాన సహదేవుడు అవంతి, కిష్కింధలో మైంద-ద్వివిదులను, మాహిష్మతి నీలుని, లంకలోని విభీషణుని వద్దనుండి కప్పములు పొందుట. పశ్చిమాన నకులుడు శల్యుని, మరుభూమిని జయించి అపార ధనరాశులతో ఇంద్రప్రస్థానికి చేరుకొనుట.",
    keyQuoteRoy: "The brothers brought under their sway the four points of the horizon, returning with immense wealth, gemstones, and herds to King Yudhishthira.",
    dharmaInsight: "A truly righteous empire is established through chivalry and alliances, honoring ancient friendships while establishing universal order."
  },
  {
    number: 6,
    id: "rajasuyika",
    nameEn: "Rajasuyika Parva",
    nameSa: "राजसूयिकपर्व",
    nameTe: "రాజసూయిక పర్వము",
    sections: "Sections XXXIII - XXXV",
    versesApprox: 320,
    keyCharacters: ["King Yudhishthira", "Sage Vyasa", "Sage Paila", "Sage Yajnavalkya", "Sage Dhaumya", "Bhishma", "Duryodhana"],
    summaryEn: "With mountains of gold, silver, horses, and jewels brought by the four brothers, Yudhishthira formally initiates the Rajasuya sacrifice. Sages Vyasa, Paila, Yajnavalkya, and Dhaumya officiate the complex Vedic altars. Invitations are dispatched throughout Bharatavarsha; all kings, including Dhritarashtra, Bhishma, Drona, Duryodhana, and Karna, assemble at Indraprastha. Duryodhana is appointed overseer of royal tributes and gifts. The sacrifice proceeds with unrivaled majesty, endless feasts, and sacred chanting.",
    summaryTe: "దిగ్విజయ యాత్రల ద్వారా సమకూరిన అపార ధనరాశులతో వేదవ్యాస, యాజ్ఞవల్క్య, ధౌమ్యాది మహర్షుల ఆధ్వర్యంలో ధర్మరాజు రాజసూయ యాగమును శాస్త్రోక్తంగా ప్రారంభించుట. ధృతరాష్ట్ర, భీష్మ, ద్రోణ, దుర్యోధనాదులందరూ విచ్చేయుట. దుర్యోధనునికి బహుమతులు, కప్పములు స్వీకరించే బాధ్యతను అప్పగించుట. దేవతలు, మునులు, సమస్త రాజులతో ఇంద్రప్రస్థం ఇంద్రలోకంలా వెలుగొందుట.",
    keyQuoteRoy: "The voice of the gratified Brahmanas uttering 'What an auspicious day is this!' became so loud that it seemed to reach heaven itself.",
    dharmaInsight: "Generosity and selfless distribution of prosperity to the spiritual, intellectual, and working populace form the crowning glory of righteous leadership."
  },
  {
    number: 7,
    id: "arghyaharana",
    nameEn: "Arghyaharana Parva",
    nameSa: "अर्घ्याहरणपर्व",
    nameTe: "అర్ఘ్యాహరణ పర్వము",
    sections: "Sections XXXVI - XXXIX",
    versesApprox: 380,
    keyCharacters: ["King Yudhishthira", "Grandfather Bhishma", "Sri Krishna", "Sahadeva", "King Sisupala"],
    summaryEn: "On the supreme day of the sacrifice, the question of conferring the foremost offering of worship (Agrapuja / First Arghya) arises. Yudhishthira asks Grandfather Bhishma who among the thousands of kings and sages is most deserving. Bhishma proclaims unequivocally that Lord Sri Krishna, the eternal origin of all worlds, the protector of Dharma, and the Supreme Soul, alone merits the first honor. Sahadeva reverently offers the Arghya to Krishna amidst joyous showers of celestial flowers. However, King Sisupala of Chedi seethes with jealousy and insults Bhishma and Krishna.",
    summaryTe: "యాగ ముగింపులో సభలో ప్రథమ పూజ (అగ్రపూజ / మొదటి అర్ఘ్యము) ఎవరికి ఇవ్వాలనే ప్రశ్న ఉత్పన్నమగుట. భీష్మ పితామహుడు సమస్త లోకాలకు కారణభూతుడు, సృష్టిస్థితిలయకారకుడైన శ్రీకృష్ణ పరమాత్ముడే అగ్రపూజార్హుడని చాటుట. సహదేవుడు భక్తితో శ్రీకృష్ణునికి అగ్రపూజ సమర్పించుట. సమస్త సభ హర్షధ్వానాలు చేయగా చేదిరాజైన శిశుపాలుడు ఓర్వలేక అసూయతో రగిలిపోవుట.",
    keyQuoteRoy: "Bhishma said: 'Krishna is the origin of the universe and that in which the universe is to dissolve. For Krishna is the unvanquished creator of all things, mobile and immobile.'",
    dharmaInsight: "Recognizing divinity and honoring virtue above mortal titles is the hallmark of true spiritual discernment."
  },
  {
    number: 8,
    id: "sisupala-badha",
    nameEn: "Sisupala-badha Parva",
    nameSa: "शिशुपालवधपर्व",
    nameTe: "శిశుపాలవధ పర్వము",
    sections: "Sections XL - XLV",
    versesApprox: 440,
    keyCharacters: ["King Sisupala", "Sri Krishna", "Grandfather Bhishma", "Sudarshana Chakra", "King Yudhishthira"],
    summaryEn: "Sisupala unleashes a torrential stream of abusive insults against Sri Krishna and Grandfather Bhishma. Bhishma narrates how Sisupala was born with three eyes and four arms, and how Krishna promised Sisupala's mother to pardon one hundred verbal offenses. As Sisupala continues his reckless insults, surpassing the 100th offense, Lord Krishna proclaims his transgressions before the assembly. Krishna summons the radiant Sudarshana Chakra, which severs Sisupala's head in an instant. A dazzling spiritual effulgence rises from Sisupala's body, bows to Krishna, and enters Krishna's divine feet. The sacrifice concludes with the sacred Avabhritha bath, confirming Yudhishthira as Emperor (Samrat).",
    summaryTe: "శిశుపాలుడు శ్రీకృష్ణుని, భీష్ముని తీవ్రంగా దూషింపసాగెను. నూరు తప్పుల వరకు క్షమిస్తానని శిశుపాలుని తల్లికి ఇచ్చిన మాటను కృష్ణుడు గుర్తుచేయుట. శిశుపాలుడు నూరవ తప్పు దాటి దూషించగా, శ్రీకృష్ణుడు సుదర్శన చక్రాన్ని ప్రయోగించి శిశుపాలుని శిరస్సును ఖండించుట. శిశుపాలుని దేహం నుండి ఒక దివ్య తేజస్సు వచ్చి శ్రీకృష్ణుని పాదాలలో ఐక్యమగుట. దిగ్విజయంగా రాజసూయ యాగం ముగిసి ధర్మరాజు చక్రవర్తియగుట.",
    keyQuoteRoy: "The discus of Krishna severed the head of Sisupala. A dazzling light issued from the body of the king of Chedi and entered the body of Vasudeva.",
    dharmaInsight: "Patience and forbearance (Kshama) have righteous boundaries; when arrogance crosses all measure, divine justice strikes with absolute certainty."
  },
  {
    number: 9,
    id: "dyuta",
    nameEn: "Dyuta Parva",
    nameSa: "द्यूतपर्व",
    nameTe: "ద్యూత పర్వము",
    sections: "Sections XLVI - LXXIII",
    versesApprox: 1820,
    keyCharacters: ["Duryodhana", "Sakuni", "Dhritarashtra", "Yudhishthira", "Duhsasana", "Queen Draupadi", "Sri Krishna", "Bhima", "Karna", "Vidura", "Vikarna"],
    summaryEn: "Walking through Mayasabha, Duryodhana is humiliated by optical illusions: mistaking crystal for water he draws up his garments, and mistaking water for land he falls into a lotus pool, hearing laughter from the Pandavas and Draupadi. Burning with vengeful envy, Duryodhana conspires with his uncle Sakuni, who devises the loaded dice game. Dhritarashtra ignores Vidura's warnings and builds a dice hall in Hastinapura, sending Vidura to summon Yudhishthira. Bound by Kshatriya code, Yudhishthira accepts. Sakuni plays with enchanted loaded dice. Yudhishthira progressively loses his wealth, horses, elephants, kingdoms, his brothers Nakula, Sahadeva, Arjuna, and Bhima, himself, and finally Queen Draupadi. Duhsasana drags Draupadi by her hair into the assembly. Vikarna and Vidura protest the wager's illegality, but Karna incites Duhsasana to strip the Pandavas and Draupadi. Draupadi raises her hands in absolute surrender to Sri Krishna (*'Govinda! Dwarakavasin!'*). Lord Krishna miraculously manifests an endless cascade of celestial robes, exhausting Duhsasana amidst mountains of cloth. Bhima takes terrifying oaths: to drink Duhsasana's chest blood and shatter Duryodhana's thighs. Horrific omens shake the city; Dhritarashtra panics and grants Draupadi three boons; she asks only for the freedom of her husbands.",
    summaryTe: "మయసభలో నేల అనుకుని నీటిలో పడి అవమానభారంతో కుమిలిపోయిన దుర్యోధనుడు శకునితో కలిసి జూదపు కుట్ర పన్నుట. ధృతరాష్ట్రుని ఆజ్ఞతో విదురుడు పిలువగా, క్షత్రియ ధర్మం ప్రకారం జూదానికి వచ్చిన ధర్మరాజు. శకుని మాయాపాచికలతో ధర్మరాజు తన ధనము, రాజ్యము, సోదరులను, తనను, చివరకు ద్రౌపదిని కూడా ఒడ్డి ఓడిపోవుట. దుశ్శాసనుడు ద్రౌపదిని జుట్టుపట్టి సభలోకి ఈడ్చుకురాగా, వికర్ణ-విదురులు ధర్మాధర్మాలను ప్రశ్నించినా కర్ణ-దుర్యోధనులు అడ్డుపడుట. దుశ్శాసనుడు ద్రౌపది చీరను లాగుతుండగా, ఆమె శ్రీకృష్ణునికి సంపూర్ణ శరణాగతి చేయగా, భగవానుడు అక్షయవస్త్రాలను ప్రసాదించి ఆమె మానాన్ని కాపాడుట. దుశ్శాసనుని రక్తం తాగుతానని, దుర్యోధనుని తొడలు విరగ్గొడతానని భీముని భయంకర శపథాలు. అశుభ శకునాలకు భయపడి ధృతరాష్ట్రుడు ద్రౌపదికి వరాలిచ్చి పాండవులను విడిపించుట.",
    keyQuoteRoy: "Draupadi cried: 'O Govinda! O Lord of Dwaraka! O Krishna, protect me who am sinking in the Kaurava ocean!' And garments of various colours appeared in endless abundance.",
    dharmaInsight: "Unconditional surrender (Saranagati) to the Divine invokes miraculous cosmic protection even when earthly protectors are rendered powerless by compromised codes."
  },
  {
    number: 10,
    id: "anudyuta",
    nameEn: "Anudyuta Parva",
    nameSa: "अनुद्यूतपर्व",
    nameTe: "అనుద్యూత పర్వము",
    sections: "Sections LXXIV - LXXXI",
    versesApprox: 420,
    keyCharacters: ["Duryodhana", "Karna", "Sakuni", "Dhritarashtra", "Yudhishthira", "Gandhari", "Queen Draupadi", "Bhima"],
    summaryEn: "Terrified by the Pandavas' release and Bhima's vows, Duryodhana, Karna, and Sakuni corner King Dhritarashtra, arguing that the Pandavas will return with armies to exterminate them. They persuade Dhritarashtra to summon Yudhishthira for one final, decisive round of dice (Anudyuta). The stake: the vanquished party must dress in deer-skins and endure twelve years in the deep forest, followed by a thirteenth year in complete disguise (Agyatavasa); if discovered in the thirteenth year, another twelve years of exile must be repeated. Yudhishthira, adhering strictly to his vow never to decline a challenge, plays again. Sakuni wins by deception. Dressed in ascetic garments, the five Pandavas and Queen Draupadi cast off their royal ornaments, cover their faces, and march out of Hastinapura into the wilderness, accompanied by weeping citizens.",
    summaryTe: "పాండవుల ప్రతికారాగ్నికి భయపడిన దుర్యోధనాదులు ధృతరాష్ట్రుని ఒప్పించి మళ్ళీ పాండవులను 'అనుద్యూతము'నకు పిలుచుట. ఓడినవారు 12 ఏళ్ళు అరణ్యవాసము, 1 ఏడు అజ్ఞాతవాసము చేయవలెనని, అజ్ఞాతవాసంలో కనిపిస్తే మళ్ళీ 12 ఏళ్ళు అడవులకు వెళ్ళాలనే నిబంధన. ధర్మరాజు మళ్ళీ శకుని చేతిలో ఓడిపోవుట. నారచీరలు ధరించి ద్రౌపది, కుంతీ ఆశీస్సులతో పాండవులు అరణ్యవాసానికి బయలుదేరగా హస్తినాపుర ప్రజలు కన్నీరుమున్నీరగుట.",
    keyQuoteRoy: "The sons of Pritha, accompanied by Draupadi, having cast off their royal robes and dressed in deer-skins, set out sorrowfully for the forest.",
    dharmaInsight: "Blind attachment of a parent to an evil child corrupts reason and inevitably drags an entire civilization into cataclysmic ruin."
  }
];

/* ===== VANA PARVA (PART I): 7 UPA-PARVAS DETAIL =====
   Based directly on Pratap Chandra Roy's English Translation (Volume II) */
const VANA_PARVA_PART1_UPAPARVAS = [
  {
    number: 1,
    id: "aranyaka",
    nameEn: "Aranyaka Parva",
    nameSa: "आरण्यकपर्व",
    nameTe: "ఆరణ్యక పర్వము",
    sections: "Sections I - X",
    versesApprox: 680,
    keyCharacters: ["Yudhishthira", "Sage Shaunaka", "Surya Deva (Sun God)", "Draupadi", "Vidura", "Dhritarashtra"],
    summaryEn: "The Pandavas enter the Kamyaka forest followed by thousands of grieving citizens of Hastinapura. Yudhishthira consoles and gently sends them back. Sage Shaunaka instructs Yudhishthira on overcoming grief and the spiritual futility of material desire. Distressed at his inability to feed the accompanying Brahmanas and ascetics, Yudhishthira worships Surya Deva with 108 sacred names. Pleased with his devotion, Surya bestows the divine **Akshaya Patra** (inexhaustible copper vessel) which yields inexhaustible nourishment daily until Draupadi finishes her meal. Back in Hastinapura, Vidura advises Dhritarashtra to recall the Pandavas; Dhritarashtra insults Vidura, who leaves and joins the Pandavas in the forest.",
    summaryTe: "పాండవులు కామ్యక వనమునకు వెళ్ళుట. ప్రజలను అనునయించి వెనక్కి పంపుట. శౌనక మహర్షి ధర్మరాజుకు శోకనివారణ, వైరాగ్య తత్త్వాలను బోధించుట. తన వెంట వచ్చిన బ్రాహ్మణులకు అన్నదానము చేయలేకపోతున్నానని చింతించిన ధర్మరాజు సూర్యుని 108 నామాలతో స్తుతించగా, సూర్య భగవానుడు ద్రౌపది భోజనం ముగించేవరకు అపరిమితమైన ఆహారాన్ని ఇచ్చే 'అక్షయపాత్ర'ను ప్రసాదించుట. హస్తినలో ధృతరాష్ట్రుని తిరస్కారానికి గురైన విదురుడు పాండవుల వద్దకు చేరుకొనుట.",
    keyQuoteRoy: "Surya said: 'Accept this copper vessel given by me. Whatever food of fruits, roots, and vegetables is cooked in it shall be inexhaustible until Panchali eateth!'",
    dharmaInsight: "Unwavering faith and dedication to feeding the hungry in times of acute personal adversity invoke cosmic abundance."
  },
  {
    number: 2,
    id: "kirmirabadha",
    nameEn: "Kirmirabadha Parva",
    nameSa: "किर्मीरवधपर्व",
    nameTe: "కిర్మీరవధ పర్వము",
    sections: "Section XI",
    versesApprox: 120,
    keyCharacters: ["Bhima", "Kirmira (demon)", "Yudhishthira", "Dhaumya"],
    summaryEn: "Entering the deep recesses of the Kamyaka forest at midnight, the Pandavas are blocked by the monstrous cannibal Rakshasa Kirmira (brother of Bakasura and close comrade of Hidimba). Blazing with red eyes and uprooting trees, Kirmira seeks vengeance for his brother's slaughter. Bhima uproots an enormous tree; the two engage in an earth-shaking duel of rocks, trees, and wrestling. Bhima twists Kirmira's neck, breaks his spine across his knee, and purges the Kamyaka forest of danger, assuring peace for all hermits and ascetics.",
    summaryTe: "కామ్యక వన మార్గంలో బకాసురుని తమ్ముడైన కిర్మీరుడనే భయంకర రాక్షసుడు పాండవులకు ఎదురై ప్రతీకారం తీర్చుకోబోవుట. భీమసేనుడు చెట్లతో, రాళ్లతో వాడితో భీకరంగా పోరాడి, వాడి మెడను విరిచి సంహరించి కామ్యక వనాన్ని రాక్షస భయం నుండి విముక్తం చేయుట.",
    keyQuoteRoy: "Bhima seized Kirmira by the waist and hurled him to the ground, breaking his neck as a lion breaks the neck of an elephant.",
    dharmaInsight: "Physical valor consecrated to protecting the defenseless purifies dark forests and opens safe pathways for spiritual seekers."
  },
  {
    number: 3,
    id: "arjunabhigamana",
    nameEn: "Arjunabhigamana Parva",
    nameSa: "अर्जुनाभिगमनपर्व",
    nameTe: "అర్జునాభిగమన పర్వము",
    sections: "Sections XII - XXXVII",
    versesApprox: 1450,
    keyCharacters: ["Sri Krishna", "Queen Draupadi", "Yudhishthira", "Bhima", "Sage Vyasa", "Arjuna"],
    summaryEn: "Hearing of the Pandavas' exile, Lord Sri Krishna arrives with the Vrishnis and Bhojas. Krishna laments that had he not been engaged in defending Dvaraka from King Salwa's flying celestial city Saubha, he would have prevented the dice match at any cost. Draupadi weeps bitterly before Krishna, demanding justice for her public humiliation; Krishna consoles her with the solemn vow that the Kaurava queens will weep even as she wept. Draupadi and Bhima urge Yudhishthira to wage immediate war, arguing that Kshama (forgiveness) without wrath is weakness. Yudhishthira delivers his sublime discourse on the absolute superiority of forgiveness. Sage Vyasa arrives and imparts the esoteric yogic mantra **Pratismriti** to Yudhishthira, advising that Arjuna must undertake ascetic penance to acquire divine celestial weapons from Lord Shiva and Indra.",
    summaryTe: "శ్రీకృష్ణుడు పాండవులను దర్శించుట. సౌభ విమానంలో దాడి చేసిన సాల్వరాజుతో ద్వారకలో యుద్ధంలో ఉన్నందున జూదాన్ని ఆపలేకపోయానని కృష్ణుడు వివరించుట. ద్రౌపది కన్నీటితో తన అవమానాన్ని వివరించగా, కృష్ణుడు 'కౌరవ స్త్రీలు కూడా నీలాగే కన్నీరు కార్చుతారు, అధర్మం నశిస్తుంది' అని అభయమిచ్చుట. ద్రౌపది, భీములు యుద్ధం చేద్దామని ఒత్తిడి చేయగా, ధర్మరాజు 'క్షమ' యొక్క మహోన్నత శక్తిని వివరించుట. వ్యాస మహర్షి వచ్చి 'ప్రతిస్మృతి' అను దివ్య విద్యను ధర్మరాజుకు ఉపదేశించి, అర్జునుని దివ్యాస్త్రాల సాధనకై హిమాలయాలకు పంపమని ఆదేశించుట.",
    keyQuoteRoy: "Krishna said unto Draupadi: 'Weep not, O Krishna! The earth shall drink the blood of Duryodhana and Karna. The skies may fall, the snowy mountains split, but my word shall never be in vain!'",
    dharmaInsight: "Righteous forgiveness preserves spiritual integrity, yet divine destiny ensures that unrepented cruelty meets inexorable retribution."
  },
  {
    number: 4,
    id: "kairata",
    nameEn: "Kairata Parva",
    nameSa: "कैरातपर्व",
    nameTe: "కైరాత పర్వము (కిరాతార్జునీయము)",
    sections: "Sections XXXVIII - XLI",
    versesApprox: 410,
    keyCharacters: ["Arjuna", "Lord Shiva (as Kirata / Hunter)", "Goddess Parvati", "Mukasura (demon boar)", "Pashupatastra"],
    summaryEn: "Equipped with the Pratismriti mantra, Arjuna journeys north past the Himalayas to Mount Indrakeela. He enters severe ascetic tapasya, standing on one foot with upraised arms amidst raging fires. The demon Muka attacks in the form of a wild boar. Both Arjuna and a tribal hunter (Kirata) shoot arrows simultaneously, piercing the boar. A fierce dispute erupts over the prize. Arjuna unleashes his celestial shafts, swords, and trees, but the Kirata effortlessly absorbs them all. They wrestle violently; Arjuna is crushed unconscious. Awakening, Arjuna constructs an earthen Shiva Linga, worships it with forest blossoms, and is stunned to see the garland appear around the Kirata's neck! Lord Shiva and Goddess Parvati reveal their supreme cosmic form. Delighted by Arjuna's incomparable martial courage and devotion, Lord Shiva grants him the supreme **Pashupatastra**—the ultimate celestial weapon capable of dissolving creation.",
    summaryTe: "ఇంద్రకీలాద్రిపై అర్జునుని ఘోర తపస్సు. పంది రూపంలో వచ్చిన మూకాసురునిపై అర్జునుడు, కిరాతుని రూపంలో ఉన్న పరమశివుడు ఒకేసారి బాణాలు వేయుట. ఆ వేట పక్షిపై వివాదం రేగి ఇద్దరి మధ్య మహోగ్ర ద్వంద్వయుద్ధం జరుగుట. అర్జునుని బాణాలు, ఖడ్గం, చెట్లు ఏవీ కిరాతునికి హాని చేయలేకపోవుట. చివరకు అర్జునుడు మట్టితో శివలింగాన్ని చేసి పూజించగా, ఆ పూలమాల కిరాతుని మెడలో కనిపించుట! పరమేశ్వరుడు పార్వతీ సమేతంగా నిజరూప దర్శనమిచ్చి, అర్జునుని శౌర్యానికి మెచ్చి లోకసంహారకమైన 'పాశుపతాస్త్రము'ను ప్రసాదించుట.",
    keyQuoteRoy: "Mahadeva said: 'O Phalguna, I am pleased with thee! There is no Kshatriya equal to thee in courage. Behold me, O wielder of Gandiva, and receive from me the irresistible weapon Pashupata!'",
    dharmaInsight: "Humility and supreme surrender to God transform bitter earthly defeat into the attainment of invulnerable divine grace."
  },
  {
    number: 5,
    id: "indralokagamana",
    nameEn: "Indralokagamana Parva",
    nameSa: "इन्द्रलोकागमनपर्व",
    nameTe: "ఇంద్రలోకాగమన పర్వము",
    sections: "Sections XLII - LI",
    versesApprox: 580,
    keyCharacters: ["Arjuna", "King Indra", "Matali", "Gandharva Chitrasena", "Urvasi (Apsara)"],
    summaryEn: "Following the boon of Lord Shiva, the Lokapalas (Varuna, Yama, Kubera) bestow their divine weapons upon Arjuna. Matali arrives with Indra's celestial chariot and conveys Arjuna to heaven (Amaravati). Arjuna is joyfully received by his father Indra, shares half of Indra's throne, and masters the weapons of heaven. Indra arranges for the Gandharva Chitrasena to teach Arjuna music, song, and dance. The celestial courtesan Urvasi falls madly in love with Arjuna and visits him at night. Arjuna bows before her, declaring that as the ancestral mother of the Puru dynasty, she deserves only his filial worship. Infuriated by his chastity, Urvasi curses him to lose his manhood and live as a eunuch dancer for a year. Indra consoles Arjuna, turning the curse into a blessing for his 13th incognito year (as Brihannala in Virata's court).",
    summaryTe: "వరుణ, యమ, కుబేరులు అర్జునునికి తమ అస్త్రాలను ఇచ్చుట. మాతలి ఇంద్రుని రథంతో వచ్చి అర్జునుని అమరావతికి తోడ్కొని వెళ్ళుట. ఇంద్రుని సింహాసనాన్ని పంచుకుని, దివ్యాస్త్రాలను, చిత్రసేనుని వద్ద సంగీత-నృత్య విద్యలను నేర్చుకొనుట. ఊర్వశి మోహించి రాగా, ఆమెను తన వంశమాతగా పూజించిన అర్జునుని నైతిక నిష్ఠ. తిరస్కారానికి ఆగ్రహించిన ఊర్వశి ఒక సంవత్సరం నపుంసకుడవు కమ్మని శపించగా, ఇంద్రుడు ఆ శాపాన్ని అజ్ఞాతవాసంలో బృహన్నలగా మారడానికి వరంగా మార్చుట.",
    keyQuoteRoy: "Arjuna said: 'O blessed beauty, as Kunti and Madri are to me, so art thou! Thou art the mother of our race, and I bow my head to thy feet.'",
    dharmaInsight: "Chaste moral restraint in the face of seduction is the supreme ornament of a hero; what seems a curse becomes a divine instrument of preservation."
  },
  {
    number: 6,
    id: "nalopakhyana",
    nameEn: "Nalopakhyana Parva",
    nameSa: "नलोपाख्यानपर्व",
    nameTe: "నలోపాఖ్యాన పర్వము (నల-దమయంతి కథ)",
    sections: "Sections LII - LXXIX",
    versesApprox: 1840,
    keyCharacters: ["Sage Brihadaswa", "King Nala", "Princess Damayanti", "Kali Purusha", "Pushkara", "Karkotaka (Naga)", "King Rituparna"],
    summaryEn: "Observing Yudhishthira's overwhelming sorrow over the loss of his kingdom, Sage Brihadaswa narrates the sublime story of King Nala of Nishadha and Princess Damayanti of Vidarbha. The golden swan messenger; Damayanti choosing Nala at her Swayamvara despite the presence of gods Indra, Agni, Varuna, and Yama; Kali entering Nala out of spite; Nala losing his kingdom to brother Pushkara in a loaded game of dice; exile into the wilderness; the tragic parting in the forest; Damayanti's heroic chastity; Nala bitten by serpent Karkotaka and transformed into the dwarf charioteer Bahuka; learning the secret mathematics of dice (Akshahridaya) from King Rituparna; the second mock-swayamvara; reunion of Nala and Damayanti; Nala challenging Pushkara to a rematch, winning back his empire, and restoring righteousness.",
    summaryTe: "ధర్మరాజు శోకాన్ని పోగొట్టడానికి బృహదశ్వుడు వినిపించిన అమరమైన 'నల-దమయంతుల కథ'. హంస రాయబారము, దేవతల సమక్షంలో దమయంతి నలుని వరించుట, కలిపురుషుని ప్రవేశము, పాచికల జూదంలో పుష్కరుని చేతిలో నలుడు రాజ్యం కోల్పోవుట, అరణ్యవాసంలో దమయంతిని విడిచి వెళ్ళుట, కర్కోటకుడను పాము కాటుతో బాహుకుడను సారథిగా మారి ఋతుపర్ణుని వద్ద అక్షహృదయ విద్యను నేర్చుకొనుట, చివరకు దమయంతితో పునఃసమాగమము మరియు జూదంలో రాజ్యాన్ని తిరిగి గెలుచుకొనుట.",
    keyQuoteRoy: "Brihadaswa said: 'O Yudhishthira, grief hath overtaken even gods and heroes. King Nala lost his realm by dice, suffered calamity, and yet regained his throne by virtue. Grieve not, O king!'",
    dharmaInsight: "Virtue tested by catastrophic misfortune shines with greater glory; fidelity, perseverance, and knowledge ultimately conquer all trials."
  },
  {
    number: 7,
    id: "tirtha-yatra",
    nameEn: "Tirtha-Yatra Parva",
    nameSa: "तीर्थयात्रापर्व",
    nameTe: "తీర్థయాత్రా పర్వము",
    sections: "Sections LXXX - CXIII",
    versesApprox: 2450,
    keyCharacters: ["Sage Lomasha", "King Yudhishthira", "Bhima", "Sage Agastya", "Sage Rishyasringa", "King Sibi", "Draupadi"],
    summaryEn: "Sage Lomasha arrives bearing greetings from Arjuna in heaven and guides the remaining Pandavas on an extensive holy pilgrimage across Bharatavarsha. Visiting sacred rivers, hermits, and tirthas (Naimisharanya, Prayaga, Ganga, Yamuna, Gokarna, Prabhasa), Lomasha narrates legendary Puranic episodes: Sage Agastya drinking the entire ocean to reveal the subterranean Kalakeya demons and subduing the rising Vindhya mountain; the penance of Bhagiratha bringing Ganga to earth; the birth of Sage Rishyasringa; and the unmatched compassion of King Sibi, who offered equal weight of his own flesh to save a dove from an eagle (Indra and Agni tested).",
    summaryTe: "ఇంద్రలోకం నుండి లోమశ మహర్షి వచ్చి అర్జునుని క్షేమసమాచారం తెలిపి పాండవులను సమస్త భారత తీర్థయాత్రలకు తోడ్కొని వెళ్ళుట. నైమిశారణ్యం, ప్రయాగ, గంగాతీరం మొదలైన తీర్థాల దర్శనం. అగస్త్యుడు సముద్రాన్ని ఆపోశనం పట్టి కాలకేయులను బహిర్గతం చేసిన కథ, వింధ్య పర్వతాన్ని అణచివేసిన వృత్తాంతం, భగీరథుడు గంగను తెచ్చిన గాథ, మరియు పావురాన్ని కాపాడటానికి తన శరీర మాంసాన్ని కోసి తులారాశిలో వేసిన శిబి చక్రవర్తి త్యాగనిరతిని వివరించుట.",
    keyQuoteRoy: "Lomasha said: 'He who visits holy tirthas with senses controlled and mind cleansed of malice, reapeth the merit of a thousand horse-sacrifices.'",
    dharmaInsight: "Sacred pilgrimage purifies the soul of bitterness, harmonizing the mortal mind with cosmic dharma through communion with holy places."
  }
];

/* ===== VANA PARVA (PART II - LAST PART): COMPLETE 12 UPA-PARVAS DETAIL =====
   Based directly on Pratap Chandra Roy's English Translation (Volume III) */
const VANA_PARVA_PART2_UPAPARVAS = [
  {
    number: 1,
    id: "tirtha-yatra-2",
    nameEn: "Tirtha-Yatra Parva (Continued)",
    nameSa: "तीर्थयात्रापर्व (उत्तरभाग)",
    nameTe: "తీర్థయాత్రా పర్వము (సౌగంధిక పుష్పహరణం & హనుమద్భీమ సమాగమం)",
    sections: "Sections CXIV - CLV",
    versesApprox: 3120,
    keyCharacters: ["Sage Lomasha", "Yudhishthira", "Bhima", "Queen Draupadi", "Ghatotkacha", "Lord Hanuman"],
    summaryEn: "Continuing their sacred pilgrimage guided by Sage Lomasha, the Pandavas visit holy tirthas across Kalinga, the sacred Vaitarani river, and Mount Mahendra where they encounter the immortal warrior-sage Parasurama. Akritavrana narrates the legends of Jamadagni, the thousand-armed Kartavirya Arjuna, and Parasurama's 21-fold Kshatriya cleansing. They proceed to Godavari, Prabhasa (where Balarama, Sri Krishna, and Satyaki reunite with them and debate avenging their exile), the Payosini river (King Gaya's golden sacrificial stakes), Narmada, and the lake of Sage Chyavana who paralyzed Indra and created the colossal demon Mada. Lomasha narrates the birth of King Mandhata from Yuvanaswa's flank, King Somaka sacrificing Jantu to gain 100 sons, King Usinara offering his own flesh on the balance scale to save a dove from an eagle (Indra and Agni tested), and the triumph of the eight-crooked child-sage Ashtavakra defeating Vandin in Janaka's court and rescuing his father Kahoda from Varuna's sacrifice. Reaching the high Himalayas at Mount Gandhamadana, Draupadi collapses from exhaustion; Bhima summons his sky-ranging son Ghatotkacha who carries the party to the sacred Badari hermitage of Nara and Narayana. The fragrance of a celestial thousand-petaled lotus (Saugandhika) enchants Draupadi, who requests more. Bhima bounds up the mountainside like an enraged elephant, shattering forests, and encounters his divine elder brother Lord Hanuman lying disguised as an aged, ailing monkey across the narrow ridge. Hanuman tests Bhima by asking him to lift his tail; Bhima strains with all his immense strength but cannot budge it even a hair's breadth. Recognizing Hanuman, Bhima bows reverently. Hanuman reveals his radiant, colossal cosmic Vishwaroopa form that once leaped the ocean, embraces Bhima, expounds on Dharma across the Yugas, and vows to sit upon Arjuna's battle flag (Kapidhwaja) during the Kurukshetra war to shatter enemy hearts with his roar. Bhima then reaches Kubera's lake, subdues the Krodhavasha Rakshasa guardians, and gathers the divine Saugandhika lotuses.",
    summaryTe: "లోమశ మహర్షి మార్గదర్శకత్వంలో పాండవులు కళింగ దేశం, వైతరణీ నది, మహేంద్ర పర్వతం చేరి పరశురాముని దర్శించుట. అకృతవ్రణుడు జమదగ్ని-కార్తవీర్యార్జున వైరం, పరశురాముని 21 క్షత్రియ సంహార గాథలను వినిపించుట. గోదావరి, ప్రభాస తీర్థాలలో బలరామ, శ్రీకృష్ణ, సాత్యకుల సమాగమం. నర్మదా తీరాన చ్యవన మహర్షి-సుకున్య, మద రాక్షసుని కథలు, మాంధాత జననం, జంతువును బలిచ్చిన సోమక మహారాజు, పావురం ప్రాణం కోసం తన శరీర మాంసాన్ని తులారాశిలో కోసిచ్చిన శిబి/ఉశీనరుని త్యాగం, జనకుని సభలో వందిని ఓడించి తండ్రిని విడిపించిన అష్టావక్రుని పాండిత్యం మున్నగు దివ్య కథలను వినుట. గంధమాదన పర్వతంపై ద్రౌపది అలసిపోగా, భీముడు ఘటోత్కచుని రప్పించి ఆకాశమార్గాన బదరికాశ్రమానికి చేర్చుట. గాలితో కొట్టుకొచ్చిన దివ్య 'సౌగంధిక పద్మం' సువాసనకు ముగ్ధురాలైన ద్రౌపది కోరిక మేరకు భీముడు పద్మాలకై బయలుదేరుట. మార్గంలో వృద్ధ వానర రూపంలో ఉన్న హనుమంతుని తోకను ఎత్తలేక భీముని గర్వభంగమగుట. హనుమంతుడు తన విశ్వరూపాన్ని చూపి, భీముని ఆలింగనం చేసుకుని, కురుక్షేత్ర యుద్ధంలో అర్జునుని కపిధ్వజంపై ఉండి సింహనాదాలు చేస్తానని వరమిచ్చుట. భీముడు కుబేరుని సరోవరం చేరి రాక్షసులను జయించి సౌగంధిక పుష్పాలను సేకరించుట.",
    keyQuoteRoy: "Hanuman said: 'I am that Hanuman who bounded over the ocean. In the field of battle, mounted upon the flag-staff of Dhananjaya's car, I shall emit terrific shouts that will rob thy foes of their life-breath!'",
    dharmaInsight: "True strength is crowned by humility; physical might must bow before spiritual wisdom, and brotherhood grounded in righteousness transcends all ages."
  },
  {
    number: 2,
    id: "jatasura-badha",
    nameEn: "Jatasura-Badha Parva",
    nameSa: "जटासुरवधपर्व",
    nameTe: "జటాసురవధ పర్వము",
    sections: "Section CLVI",
    versesApprox: 180,
    keyCharacters: ["Jatasura (Rakshasa)", "Bhima", "King Yudhishthira", "Queen Draupadi", "Sahadeva", "Nakula"],
    summaryEn: "While Bhimasena is out hunting upon the Gandhamadana slopes, a ferocious shape-shifting Rakshasa named Jatasura arrives disguised as a gentle, learned Brahmana ascetic. Gaining the trust of the hermitage, Jatasura suddenly assumes his monstrous form, seizes the Pandavas' celestial weapons, and abducts King Yudhishthira, Queen Draupadi, and the twins Nakula and Sahadeva, carrying them aloft through the skies. Sahadeva breaks free from the demon's grasp, unsheathes his sword, and calls out for Bhima. Yudhishthira retards the monster's flight through moral admonition, warning him that the crime of betraying hospitality (Atithi-droha) leads straight to the lowest hells. Bhima hears the distress cries, rushes forward in ferocious fury like the God of Death, and intercepts Jatasura. In an earth-shattering single combat of uprooted boulders and mountain trunks, Bhima pummels the demon with iron fists, shatters his neck and limbs against the crags, and strikes off his head, liberating his family and recovering all weapons.",
    summaryTe: "భీమసేనుడు వేటకు వెళ్ళిన సమయంలో జటాసురుడనే రాక్షసుడు సాధు బ్రాహ్మణ వేషంలో వచ్చి పాండవుల ఆయుధాలను, ద్రౌపది, ధర్మరాజు, నకుల-సహదేవులను అపహరించి ఆకాశంలోకి ఎగిరిపోవుట. సహదేవుడు తప్పించుకుని ఖడ్గంతో ఎదిరించి భీముని పిలుచుట. ధర్మరాజు అతిథి ద్రోహం చేసిన రాక్షసుని ధర్మవచనాలతో నిలువరించుట. పిడుగులా దూసుకొచ్చిన భీమసేనుడు జటాసురునితో ఘోర ద్వంద్వయుద్ధం చేసి, రాళ్లతో, పిడిగుద్దులతో వాడి అవయవాలను విరిచి, తల నరికి సంహరించి అందరినీ రక్షించుట.",
    keyQuoteRoy: "Bhima said: 'Thou vile wretch! Even as a crow stealeth the sacrificial offering, thou hast laid hands on these righteous beings. Today shall I send thee to the realm of Yama!'",
    dharmaInsight: "Deceit donning the garb of piety is the most insidious evil; righteous vigilance and swift force must unmask and eradicate hypocrisy."
  },
  {
    number: 3,
    id: "yaksha-yuddha",
    nameEn: "Yaksha-Yuddha Parva",
    nameSa: "यक्षयुद्धपर्व",
    nameTe: "యక్షయుద్ధ పర్వము (మణిమద్వధ & కుబేర సమాగమం)",
    sections: "Sections CLVII - CLXIV",
    versesApprox: 620,
    keyCharacters: ["Bhima", "Maniman (Yaksha general)", "Lord Kubera (Vaishravana)", "King Yudhishthira", "Queen Draupadi", "Sage Dhaumya"],
    summaryEn: "Yearning for more rare celestial blooms and golden lotuses to beautify the hermitage, Draupadi makes a gentle appeal to Bhima. Bhima ascends further up the forbidden peaks of Mount Gandhamadana and breaches the enchanted pleasure gardens of Lord Kubera, the sovereign king of Yakshas. The celestial sentinels, armed with javelins, battle-axes, and darts, assault Bhima. Undeterred, Bhima slays hundreds of Yaksha warriors with his golden mace. Kubera's foremost commander, the ferocious Yaksha Maniman, hurls a massive iron mace that wounds Bhima's right shoulder. In righteous indignation, Bhima whirls his mace and strikes Maniman dead, crashing his body upon the rocky crest. Alarmed by the mountain-splitting uproar, Yudhishthira, Draupadi, and Sage Dhaumya arrive and admonish Bhima for engaging in unnecessary violence against divine custodians. Lord Kubera (Vaishravana) arrives in state upon the Pushpaka Vimana, surrounded by Gandharvas. Rather than taking offense, Kubera embraces Yudhishthira and smilingly pacifies the Pandavas, revealing that Maniman had previously been cursed by Sage Agastya to die at the hands of a mortal for his insolence. Kubera grants the Pandavas permission to live in peace upon the mountain until Arjuna's return.",
    summaryTe: "ద్రౌపది కోరిక మేరకు మరింత అరుదైన దివ్య పుష్పాల కోసం భీముడు కుబేరుని దివ్యోద్యానవనంలోకి ప్రవేశించుట. కుబేరుని యక్ష-రాక్షస సైన్యం భీమునిపై దాడి చేయగా, భీముడు వారిని ఊచకోత కోయుట. కుబేరుని సేనాని మణిమంతుడు భీముని భుజంపై గదతో కొట్టగా, కుపితుడైన భీముడు మణిమంతుని గదాఘాతంతో సంహరించుట. ధర్మరాజు వచ్చి భీముని తొందరపాటును మందలించుట. అంతలోనే పుష్పక విమానంలో విచ్చేసిన ధనాధిపతి కుబేరుడు ధర్మరాజును ఆదరించి, అగస్త్యుని శాపం వల్లనే మణిమంతుడు భీముని చేతిలో మరణించాడని తెలిపి, పాండవులకు గంధమాదన పర్వతంపై విశ్రాంతిని ప్రసాదించుట.",
    keyQuoteRoy: "Kuvera said: 'Grieve not, O Yudhishthira! Maniman had been cursed by Agastya to meet his end at the hands of a mortal. Bhima hath only fulfilled that decree. Dwell here in joy as my guests!'",
    dharmaInsight: "Apparent acts of mortal aggression are often the hidden instruments of cosmic decrees fulfilling karmic accountability."
  },
  {
    number: 4,
    id: "nivata-kavacha",
    nameEn: "Nivata-Kavacha-Yuddha Parva",
    nameSa: "निवातकवचयुद्धपर्व",
    nameTe: "నివాతకవచ యుద్ధ పర్వము (అర్జునుని పునరాగమనం & హిరణ్యపుర దహనం)",
    sections: "Sections CLXV - CLXXV",
    versesApprox: 980,
    keyCharacters: ["Arjuna", "Matali", "King Indra", "King Yudhishthira", "Queen Draupadi", "Sage Narada", "Nivata-Kavachas"],
    summaryEn: "Following the completion of his five-year penance and martial training in Amaravati, Arjuna returns triumphantly to Mount Gandhamadana upon the blazing sun-like celestial car of Indra, steered by the master charioteer Matali. In a scene of immense tenderness and joy, Arjuna touches the feet of King Yudhishthira, embraces Bhima, raises the weeping twins, and presents Draupadi with heavenly silk garments and celestial gems. Arjuna then narrates the astonishing celestial campaigns he executed as Guru-dakshina for his father Indra: the annihilation of thirty million demon warriors known as the Nivata-Kavachas ('those whose armor is impenetrable') who dwelled in oceanic subterranean fortresses immune to gods, defeated by Arjuna using the Gandiva bow, Mohana astra, and the Raudrastra. Arjuna further recounts his assault on Hiranyapura, the wondrous golden flying city of the Daityas (Paulomas and Kalakeyas), which he destroyed using the cosmic Vajra and Pasupata weapons. As Arjuna displays his terrifying celestial arsenal on the mountain, creating cosmic quakes, Sage Narada appears from the heavens, commanding him to withdraw the weapons and admonishing that ultimate weapons must never be exhibited in peace, but unleashed only in the final righteous battle.",
    summaryTe: "ఇంద్రలోకంలో ఐదేళ్ళ దివ్యాస్త్ర సాధన ముగించుకుని, మాతలి నడుపుతున్న ఇంద్రుని దివ్య రథంపై అర్జునుడు గంధమాదన పర్వతానికి తిరిగి వచ్చుట. పాండవులు, ద్రౌపది ఆనందోత్సాహాలతో పునఃసమాగమం చెందుట. ఇంద్రునికి గురుదక్షిణగా సముద్రగర్భంలో అజేయమైన కోటలలో ఉన్న 3 కోట్ల మంది 'నివాతకవచులను' రౌద్రాస్త్రంతో సంహరించిన వృత్తాంతాన్ని, ఆకాశంలో తిరిగే హిరణ్యపురమనే రాక్షస నగర దహనాన్ని అర్జునుడు వివరించుట. అర్జునుడు తన దివ్యాస్త్రాలను ప్రదర్శించగా భూమి కంపించడంతో నారదుడు వచ్చి లోకరక్షణకై దివ్యాస్త్రాలను అనవసరంగా ప్రయోగించవద్దని హెచ్చరించుట.",
    keyQuoteRoy: "Arjuna said: 'O King, thirty millions of Nivata-Kavachas dwelling in the womb of the ocean, invulnerable to the gods, were slain by me with the celestial weapons of Mahendra and Rudra.'",
    dharmaInsight: "Ultimate power demands ultimate restraint; celestial weapons are entrusted to mortals not for vanity or spectacle, but exclusively for the defense of cosmic righteousness."
  },
  {
    number: 5,
    id: "ajagara",
    nameEn: "Ajagara Parva",
    nameSa: "अजगरपर्व",
    nameTe: "అజగర పర్వము (నహుష సంవాదము & బ్రాహ్మణ ధర్మము)",
    sections: "Sections CLXXVI - CLXXX",
    versesApprox: 510,
    keyCharacters: ["Bhima", "King Nahusha (in python form)", "King Yudhishthira", "Sage Agastya"],
    summaryEn: "Leaving Gandhamadana, the Pandavas return towards the plains. While hunting in a dense forest, mighty Bhima is suddenly attacked and enveloped in the coils of a gigantic python (Ajagara) possessing supernatural constricting force that neutralizes all of Bhima's strength of 16,000 elephants. Deeply troubled by evil omens, Yudhishthira tracks Bhima's path and finds him immobilized. The serpent speaks with human wisdom, revealing himself to be their royal ancestor King Nahusha, who had once attained the status of Indra through austerities, but fell from grace due to arrogant hubris when he compelled the seven Sapta-Rishis to carry his palanquin and kicked Sage Agastya, earning a curse to inhabit a python's body until a mortal could answer his queries on Dharma. The sublime dialogue between Nahusha and Yudhishthira follows: Yudhishthira declares that neither Vedic recitation nor high birth defines a Brahmana, but rather truthfulness, compassion, forgiveness, and moral conduct—if a Sudra possesses these virtues, he is a Brahmana, and if a born-Brahmana lacks them, he is no Brahmana. He defines the Knowable as the Supreme Soul free from sorrow. Enlightened and purified by Yudhishthira's answers, Nahusha is freed from the serpent body, ascends in a blazing celestial chariot to heaven, and Bhima is restored to his brothers.",
    summaryTe: "అడవిలో వేటాడుతున్న భీమసేనుని ఒక మహా అజగరము (కొండచిలువ) బంధించుట. ఎంత బలమున్నా భీముడు ఆ పాము పట్టు నుండి విడిపించుకోలేకపోవుట. సోదరుని వెతుక్కుంటూ వచ్చిన ధర్మరాజు ఆ పామును చూసి సంభాషించుట. ఆ పాము పూర్వం ఇంద్రపదవి పొంది, గర్వంతో అగస్త్యాది మహర్షులతో పల్లకీ మోయించి, అగస్త్యుని తన్ని శాపవశాత్తు పాముగా మారిన తమ పూర్వీకుడైన నహుష చక్రవర్తి అని వెల్లడగుట. బ్రాహ్మణుడెవరు? జ్ఞానమంటే ఏమిటి? అని నహుషుడు ప్రశ్నించగా, జన్మచేత కాక సత్యం, దయ, క్షమ, సదాచారం గలవాడే నిజమైన బ్రాహ్మణుడని, పరబ్రహ్మ తత్త్వమే జ్ఞేయమని ధర్మరాజు అద్భుతంగా సమాధానమిచ్చుట. నహుషునికి శాపవిమోచనమై దివ్య విమానంలో స్వర్గానికి వెళ్ళుట, భీముడు విముక్తుడగుట.",
    keyQuoteRoy: "Yudhishthira said: 'Truth, charity, forgiveness, good conduct, benevolence, austerity, and mercy are seen in a person: he is a Brahmana. If these signs are observed in a Sudra, and not in a Brahmana, then the Sudra is no Sudra, and the Brahmana is no Brahmana!'",
    dharmaInsight: "Character, virtues, and spiritual deeds alone determine a person's spiritual worth; lineage devoid of righteous conduct is utterly meaningless."
  },
  {
    number: 6,
    id: "markandeya-samasya",
    nameEn: "Markandeya Samasya Parva",
    nameSa: "मार्कण्डेयसमस्यापर्व",
    nameTe: "మార్కండేయ సమస్య పర్వము (వటపత్రశాయి, ధర్మవ్యాధుని బోధ & కుమార జననం)",
    sections: "Sections CLXXXI - CCXXX",
    versesApprox: 3840,
    keyCharacters: ["Sage Markandeya", "King Yudhishthira", "Sri Krishna", "Queen Satyabhama", "Dharmavyadha of Mithila", "Sage Kausika", "Lord Kartikeya (Skanda)"],
    summaryEn: "The Pandavas return to Kamyaka forest, where Sri Krishna and Satyabhama arrive to visit them. The ancient, immortal sage Markandeya appears and delivers an epic discourse on cosmic history, metaphysics, and moral duties. Markandeya recounts the Matsya Avatar, where Lord Vishnu as a golden horned fish saved King Vaivasvata Manu and the seeds of life from the Mahapralaya deluge. He shares his own sublime cosmic vision: floating upon the boundless waters of dissolution, entering the body of child Krishna resting on a banyan leaf (Vatapatrasayi), and witnessing all creation, galaxies, and gods pulsating within the Lord's belly. He prophesies the decline of righteousness in Kali Yuga and the advent of the Kalki Avatar in Sambhala. He narrates the story of Sage Kausika, who learned the highest secrets of Dharma from Dharmavyadha, a humble butcher in Mithila who practiced filial devotion, honest labor, and Ahimsa despite his trade. The parva concludes with the glorious birth, divine coronations, and cosmic exploits of Lord Kartikeya (Skanda / Guha) slaying demon Mahisha and protecting the universe.",
    summaryTe: "కామ్యక వనంలో శ్రీకృష్ణుడు, సత్యభామ సమక్షంలో మార్కండేయ మహర్షి ధర్మరాజుకు ఉపదేశించిన విజ్ఞాన సాగరము. మత్స్యావతార గాథ, ప్రళయకాలంలో మర్రి ఆకుపై పవళించిన వటపత్రశాయి శ్రీకృష్ణుని ఉదరంలో సమస్త బ్రహ్మాండాలను దర్శించిన మార్కండేయుని దివ్యానుభూతి, కలియుగ లక్షణాలు మరియు శంభల గ్రామంలో కల్కి అవతార ఆవిర్భావం. కోపంతో కొంగను భస్మం చేసిన కౌశిక మహర్షికి మిథిలా నగరంలో మాంసం విక్రయించే 'ధర్మవ్యాధుడు' చేసిన అద్భుత మాతృ-పితృ భక్తి మరియు సదాచార బోధ. అగ్నితేజస్సుతో జన్మించిన కుమారస్వామి (స్కందుడు) దేవసేనాధిపతియై మహిషాసురుని సంహరించిన వీరగాథ.",
    keyQuoteRoy: "Markandeya said: 'I beheld within the belly of that divine child the whole world with its kingdoms, mountains, rivers, and celestials. That child is Krishna, the primeval eternal creator of all!'",
    dharmaInsight: "True spirituality is lived in everyday integrity, selfless filial service, and devotion to duty; the entire cosmos abides within the divine grace of Narayana."
  },
  {
    number: 7,
    id: "draupadi-satyabhama",
    nameEn: "Draupadi-Satyabhama Samvada Parva",
    nameSa: "द्रौपदीसत्यभामासंवादपर्व",
    nameTe: "ద్రౌపదీ-సత్యభామా సంవాద పర్వము (స్త్రీధర్మ సూక్ష్మము)",
    sections: "Sections CCXXXI - CCXXXIII",
    versesApprox: 310,
    keyCharacters: ["Queen Draupadi", "Queen Satyabhama", "Sri Krishna"],
    summaryEn: "During their stay in the forest, Queen Satyabhama takes Queen Draupadi into a secluded grove and curiously asks the secret of her unparalleled marital harmony: how she commands the unreserved love, devotion, and obedience of the five invincible Pandavas. Satyabhama asks whether Draupadi relies on incantations, herbal roots, love potions, or mystical charms. Draupadi responds with noble dignity, admonishing that love charms are poisonous, unrighteous artifices that destroy peace and degrade character. Draupadi explains the true principles of Stridharma: absolute fidelity, selfless devotion, rising before her husbands and retiring only after they sleep, managing the vast household, the treasury, servants, and livestock, feeding guests, ascetics, and the needy with unflagging devotion, restraining anger, speaking with gentle truth, and enduring adversity without complaint. Satyabhama is deeply moved, asks forgiveness, and praises Draupadi as an immortal beacon of womanly virtue.",
    summaryTe: "సత్యభామ రహస్యంగా ద్రౌపదిని సమీపించి, ఐదుగురు మహావీరులైన పాండవులు నీ మాటను ఎలా జవదాటకుండా నిన్నే ప్రేమిస్తున్నారు? నీవు ఏవైనా మంత్రాలు, మూలికలు, వశీకరణ విద్యలు ప్రయోగించావా? అని ప్రశ్నించుట. ద్రౌపది ఆశ్చర్యపడి, మాయలు-మంత్రాలు సంసార సౌఖ్యాన్ని నాశనం చేస్తాయని మందలించుట. భర్తల పట్ల సంపూర్ణ విశ్వాసం, సదాచారం, వారికంటే ముందుగా మేల్కొనుట, ఆలస్యంగా నిద్రించుట, అపరిమితమైన గృహ నిర్వహణ, అతిథి అభ్యాగతులకు అన్నదానము, అహంకారం లేని మృదుభాషణమే తన బలం అని 'స్త్రీధర్మ' రహస్యాలను వివరించుట. సత్యభామ లజ్జితురాలై ద్రౌపది ఉత్తమ శీలమును కొనియాడుట.",
    keyQuoteRoy: "Draupadi said: 'Neither by mantras, nor by medicines, nor by roots do I influence my husbands. The wife who seeketh to bind her husband by charms only causeth him harm. Selfless service and pure virtue alone conquer hearts.'",
    dharmaInsight: "True love and enduring respect are earned through selfless integrity, mutual trust, and devoted duty—never through manipulation or superficial charms."
  },
  {
    number: 8,
    id: "ghosha-yatra",
    nameEn: "Ghosha-Yatra Parva",
    nameSa: "घोषयात्रापर्व",
    nameTe: "ఘోషయాత్రా పర్వము (చిత్రసేనుని బంధనం & వయం పంచాధికం శతమ్)",
    sections: "Sections CCXXXIV - CCLX",
    versesApprox: 1260,
    keyCharacters: ["Duryodhana", "Karna", "Sakuni", "Gandharva Chitrasena", "King Yudhishthira", "Bhima", "Arjuna"],
    summaryEn: "Hearing that the Pandavas are living in ascetic poverty near Lake Dvaitavana, Duryodhana, Sakuni, and Karna concoct an imperial cattle-inspection expedition (Ghosha-yatra) to flaunt their royal splendor before the exiled brothers and mock their destitution. Pitching camps near the lake, Duryodhana's guards clash with Gandharva King Chitrasena. A ferocious battle erupts; the Kaurava army is routed, Karna's chariot is broken forcing him to retreat, and Chitrasena captures Duryodhana, his brothers, and the royal ladies in chains. When fleeing Kaurava soldiers beg Yudhishthira for help, Bhima rejoices, calling it poetic justice. But Yudhishthira firmly rebukes Bhima, declaring the immortal maxim: 'In family disputes we are five against a hundred; but against an outsider, we are one hundred and five!' Yudhishthira commands Bhima and Arjuna to rescue Duryodhana. Arjuna shatters Chitrasena's celestial illusions; Chitrasena reveals he was sent by Indra to teach Duryodhana humility. Brought bound before Yudhishthira, Duryodhana is graciously released and blessed. Paralyzed by shame, Duryodhana attempts suicide by fasting unto death (Prayopavesha), but is comforted by subterranean Danavas who promise him demonic aid in war. Karna takes a solemn vow never to wash his feet or refuse any charity until Arjuna is slain.",
    summaryTe: "ద్వైతవనంలో ఉన్న పాండవుల దీనస్థితిని చూసి హేళన చేయడానికి దుర్యోధన, కర్ణ, శకునులు 'గోషయాత్ర' పేరిట సైన్యంతో బయలుదేరుట. సరస్సు వద్ద ఉన్న గంధర్వరాజు చిత్రసేనునితో యుద్ధం జరిగి, కర్ణుని రథం విరిగిపోగా, చిత్రసేనుడు దుర్యోధనుని, అతడి భార్యలను బంధించుట. కౌరవ సైనికులు వేడుకోగా, భీముడు సంతోషించగా ధర్మరాజు 'మనలో మనం కలహించుకున్నప్పుడు 5 వర్సెస్ 100 కావచ్చు, కాని బయటివారి విషయానికి వస్తే మనం 105 మందిమి (వయం పంచాధికం శతమ్)' అని చాటి భీమార్జునులను పంపి దుర్యోధనుని విడిపించుట. తీవ్ర అవమానంతో ప్రాయోపవేశానికి సిద్ధపడిన దుర్యోధనునికి పాతాళ దానవులు అండగా ఉంటామని చెప్పగా, కర్ణుడు అర్జునుని సంహరించే వరకు కాళ్ళు కడగనని, యాచకులకు కాదననని భీకర ప్రతిజ్ఞ చేయుట.",
    keyQuoteRoy: "Yudhishthira said: 'If a stranger attacketh the family, the family uniteth. In our domestic quarrels we are five and they are a hundred; but in resisting an outside foe, we are one hundred and five!'",
    dharmaInsight: "Noble nobility forgives personal grievances in the face of familial honor; magnanimity shown to a spiteful adversary reveals the supreme majesty of Dharma."
  },
  {
    number: 9,
    id: "draupadi-harana",
    nameEn: "Draupadi-harana Parva",
    nameSa: "द्रौपदीहरणपर्व",
    nameTe: "ద్రౌపదీహరణ పర్వము (దూర్వాస భోజనం & జయద్రథ పరాభవము)",
    sections: "Sections CCLXI - CCLXL",
    versesApprox: 1420,
    keyCharacters: ["Sage Durvasa", "Sri Krishna", "Queen Draupadi", "King Jayadratha (Sindhu)", "Bhima", "Arjuna", "King Yudhishthira"],
    summaryEn: "Prompted by Duryodhana, the irascible Sage Durvasa arrives at the Pandava hermitage with 10,000 hungry disciples at late afternoon, precisely after Draupadi had concluded her meal and washed the Akshaya Patra. Facing an inevitable curse, Draupadi prays desperately to Sri Krishna. The Lord appears instantly, inspects the vessel, finds a single remnant leaf of spinach, eats it, and thereby miraculously satisfies the cosmic hunger of all living beings throughout creation. When Durvasa and his sages bathe in the river, they feel overwhelmingly full and flee in embarrassment. Later, while the Pandavas are out hunting, King Jayadratha of Sindhu (husband of Duryodhana's sister Duhsala) passes the Kamyaka forest. Enchanted by Draupadi's solitary splendor, Jayadratha forcibly drags her onto his chariot despite her fierce resistance. Sage Dhaumya pursues crying out. Returning to the hermitage, the Pandava brothers pursue the abductor in fury. Bhima and Arjuna decimate the Sindhu army; Bhima catches Jayadratha, thrashes him mercilessly, and shaves his head leaving five grotesque tufts of hair (Pancha-shikha), forcing him to proclaim himself the slave of the Pandavas. Bhima brings Jayadratha before Yudhishthira, who spares his life out of mercy for their sister Duhsala.",
    summaryTe: "దుర్యోధనుని కుట్రతో దూర్వాస మహర్షి 10,000 మంది శిష్యులతో ద్రౌపది భోజనం ముగిసిన తర్వాత ఆకలితో ఆశ్రమానికి వచ్చుట. ద్రౌపది శ్రీకృష్ణుని ప్రార్థించగా, కృష్ణుడు వచ్చి అక్షయపాత్ర అంచున ఉన్న ఒక చిన్న ఆకుకూర రేకను భుజించి సమస్త లోకాల ఆకలిని తీర్చి పాండవులను కాపాడుట. అనంతరం పాండవులు వేటకు వెళ్ళినప్పుడు సింధురాజు జయద్రథుడు ఒంటరిగా ఉన్న ద్రౌపదిని కామించి బలవంతంగా రథంపై అపహరించుకుపోవుట. పాండవులు వెంటాడి సైన్యాన్ని హతమార్చి, భీముడు జయద్రథుని చితకబాది ఐదు పిలకలు మిగిల్చి గుండు గీయించి బానిసగా ఈడ్చుకువచ్చుట. సోదరి దుశ్శల మాంగల్యాన్ని కాపాడటానికి ధర్మరాజు జయద్రథుని ప్రాణాలతో విడిచిపెట్టుట.",
    keyQuoteRoy: "Krishna took that single particle of vegetable and ate it, saying: 'May the God of gods, who pervadeth all sacrifices, be satisfied with this!' And straightway the thousands of munis felt satisfied to their very throats.",
    dharmaInsight: "Even a single leaf offered with immaculate devotion to God satisfies cosmic existence; while lustful violation of womanhood brings immediate disgrace and ruin."
  },
  {
    number: 10,
    id: "pativrata-mahatmya",
    nameEn: "Pativrata-Mahatmya Parva",
    nameSa: "पतिव्रतामाहात्म्यपर्व",
    nameTe: "పతివ్రతా మాహాత్మ్య పర్వము (సావిత్రీ-సత్యవాన్ & రామోపాఖ్యానము)",
    sections: "Sections CCLXLI - CCLXLVII",
    versesApprox: 980,
    keyCharacters: ["Princess Savitri", "Prince Satyavan", "Lord Yama (Dharmaraja)", "King Asvapati", "King Dyumatsena", "Sage Markandeya"],
    summaryEn: "Deeply grieved by Draupadi's recurring hardships, Yudhishthira asks Sage Markandeya if there ever lived a woman whose chastity and spiritual devotion matched Queen Draupadi's. Markandeya narrates the immortal story of Savitri and Satyavan: Princess Savitri of Madra chooses Prince Satyavan of Salwa, living in forest exile, knowing from Sage Narada that he is fated to die in one year. Observing the three-night Triratra penance, Savitri accompanies Satyavan to the forest where he collapses in her lap. Lord Yama arrives in person to draw out Satyavan's soul. Savitri fearlessly follows Yama into the nether realms, charming the God of Death with five profound philosophical discourses on Dharma, truthful speech, and mercy. Yama grants her five boons: restoring sight and realm to her father-in-law Dyumatsena, 100 sons to her father Asvapati, 100 sons to herself, and finally the restoration of Satyavan's life. Markandeya also narrates the Ramopakhyana (the complete life of Sri Rama, Sita's abduction, and Ravana's defeat) to assure Yudhishthira that righteous exile invariably leads to triumphant restoration.",
    summaryTe: "ద్రౌపది పడిన కష్టాలకు కలత చెందిన ధర్మరాజుకు మార్కండేయ మహర్షి వినిపించిన అమరమైన 'సావిత్రి-సత్యవంతుల గాథ'. అల్పాయుష్కుడని తెలిసి కూడా సత్యవంతుని వరించిన సావిత్రి, ఏడాది తిరిగేసరికి మరణించిన భర్త ప్రాణాలను తోడ్కొని పోతున్న యమధర్మరాజును తన అకుంఠిత పాతివ్రత్యం, ధర్మ సంభాషణలతో అనుసరించి, మామగారికి దృష్టి-రాజ్యం, తండ్రికి నూరుగురు పుత్రులు, తనకు నూరుగురు కుమారులు కలుగునట్లు వరాలు పొంది, చివరకు చాకచక్యంగా సత్యవంతుని ప్రాణాలను తిరిగి దక్కించుకొనుట. అలాగే శ్రీరాముని కష్టాలు, రావణ సంహార వృత్తాంతాన్ని (రామోపాఖ్యానము) వినిపించి ధర్మరాజులో మనోస్థైర్యాన్ని నింపుట.",
    keyQuoteRoy: "Yama said: 'O flawless lady, pleased am I with thy words freighted with the highest virtue! Choose another boon, and go back!' Savitri said: 'Grant that Satyavan may live, for without my husband I am as dead!'",
    dharmaInsight: "Pure intellect guided by unshakeable moral devotion can negotiate with destiny itself and triumph even over the inexorable law of death."
  },
  {
    number: 11,
    id: "kundala-harana",
    nameEn: "Kundala-harana Parva",
    nameSa: "कुण्डलहरणपर्व",
    nameTe: "కుండలహరణ పర్వము (కర్ణుని కవచ-కుండల దానము & వాసవి శక్తి)",
    sections: "Sections CCLXLVIII - CCCVIII",
    versesApprox: 640,
    keyCharacters: ["Danaveera Karna", "Surya Deva", "King Indra (as Brahmana)", "Kunti"],
    summaryEn: "With the great war looming, Indra conspires to strip Karna of his divine invulnerability to protect Arjuna. Karna was born with natural golden divine armor (Kavacha) and earrings (Kundala) making him immortal in combat. Surya Deva appears to Karna in a dream, warning him of Indra's disguise and urging him to refuse the Brahmana's request. Karna reverently declines his father's advice, declaring that his sacred lifelong vow never to turn away a begging Brahmana is greater than life itself. At noon on the banks of the Ganga, Indra approaches as an elderly Brahmana begging for Karna's body armor. Without a moment's hesitation, Karna smiles, takes a sharpened blade, cuts off the living armor and earrings directly from his flesh with blood pouring forth, and presents them to Indra. Awestruck by Karna's incomparable sacrifice, Indra reveals his divine form and grants him the infallible celestial dart Vasavi Shakti, with the condition that it can be hurled only once against a single enemy before returning to heaven.",
    summaryTe: "యుద్ధం సమీపిస్తుండగా అర్జునుని రక్షణకై ఇంద్రుడు కర్ణుని సహజ కవచ-కుండలాలను యాచించాలని పథకం వేయుట. సూర్య భగవానుడు కర్ణునికి కలలో కనిపించి ఇంద్రుని కుట్రను హెచ్చరించినా, యాచకులకు కాదనని తన దానవ్రతమే ప్రాణాలకంటే గొప్పదని కర్ణుడు చాటుట. మధ్యాహ్నం గంగానదిలో సూర్యోపాసన చేస్తున్న కర్ణుని వద్దకు ఇంద్రుడు వృద్ధ బ్రాహ్మణ వేషంలో వచ్చి కవచకుండలాలను యాచించుట. కర్ణుడు ఏమాత్రం సంకోచించకుండా పదునైన ఆయుధంతో తన శరీరం నుండి కవచాన్ని, చెవుల నుండి కుండలాలను కోసి రక్తమోడుతుండగా దానమిచ్చుట. కర్ణుని త్యాగానికి ఆశ్చర్యపడిన ఇంద్రుడు ఏ ఒక్క శత్రువునైనా సంహరించగల అమోఘమైన 'వాసవి శక్తి' అను దివ్యాస్త్రాన్ని వరంగా ప్రసాదించుట.",
    keyQuoteRoy: "Karna said: 'I covet not life if purchased by the violation of my vow! Even if the wielder of the thunderbolt himself cometh, I shall part with my armor and earrings.'",
    dharmaInsight: "Unflinching dedication to selfless sacrifice confers immortal glory upon a hero, making virtue more radiant than physical invulnerability."
  },
  {
    number: 12,
    id: "aranya-yaksha",
    nameEn: "Aranya Parva (Yaksha Prashna)",
    nameSa: "आरण्यपर्व (यक्षप्रश्न)",
    nameTe: "ఆరణ్య పర్వము (అమరమైన యక్ష ప్రశ్నలు & ధర్మ పరీక్ష)",
    sections: "Sections CCCIX - CCCXIII",
    versesApprox: 720,
    keyCharacters: ["King Yudhishthira", "Lord Dharma (as Yaksha / Crane)", "Bhima", "Arjuna", "Nakula", "Sahadeva"],
    summaryEn: "In Dvaitavana forest, a deer carries off a Brahmana's churning fire-sticks (Arani). The Pandavas pursue it through the scorched wilderness and lose it. Parched with extreme thirst, Nakula spots a clear lake guarded by a crane. Bending to drink, a voice warns him to answer questions first; Nakula drinks and drops dead. Sahadeva, Arjuna, and Bhima arrive in turn, ignore the warning, drink, and collapse lifeless. King Yudhishthira finds his four invincible brothers dead like fallen trees. Weeping in agony, he approaches the water; the crane transforms into a colossal Yaksha (Lord Dharma himself). Yudhishthira humbly submits to the Yaksha's test. In the immortal Yaksha Prashna, Yudhishthira answers over 100 profound enigmas on the nature of reality, ethics, mind, and mortality. When asked what the greatest wonder is, Yudhishthira replies: 'Day after day, countless beings depart to the abode of Yama, yet those who remain believe they will live forever!' Overjoyed, the Yaksha offers to revive one brother. Yudhishthira chooses Nakula, explaining that justice demands one son of Kunti and one son of Madri survive. Awestruck by his absolute fairness, Lord Dharma reveals his identity, revives all four brothers, and grants the boon that none shall recognize the Pandavas during their 13th year of incognito exile in Virata.",
    summaryTe: "ద్వైతవనంలో బ్రాహ్మణుని అరణిని ఎత్తుకెళ్ళిన జింకను వెతుకుతూ దాహంతో అలమటించిన పాండవుల కథ. ఒక స్వచ్ఛమైన సరస్సు వద్ద కొంగ హెచ్చరికను లెక్కచేయక నీరు తాగి నకుల, సహదేవ, అర్జున, భీములు వరుసగా నేలకొరుగుట. సోదరుల మృతదేహాలను చూసి విలపించిన ధర్మరాజు, ఆకాశవాణి రూపంలోని యక్షుని ప్రశ్నోత్తరాలకు అంగీకరించుట. అమరమైన 'యక్ష ప్రశ్నలు'—మనస్సు, ధర్మం, సత్యం, అహింస, మరణం మరియు మానవ స్వభావంపై అడిగిన వందకు పైగా ప్రశ్నలకు ధర్మరాజు అద్భుతమైన సమాధానాలు చెప్పుట. 'ప్రతిరోజూ ప్రాణులు మరణిస్తున్నా, తాము శాశ్వతమని భావించడమే లోకంలో అత్యంత ఆశ్చర్యకరమైన విషయం' అని ధర్మరాజు చాటుట. ఒకే సోదరుని బతికించుకోమన్నప్పుడు కుంతీ-మాద్రిల పట్ల నిష్పాక్షిక న్యాయం కోసం నకులుని ఎంచుకొనుట. ధర్మరాజు ధర్మనిష్ఠకు పరవశించిన యమధర్మరాజు నలుగురు సోదరులను బతికించి, అజ్ఞాతవాసంలో ఎవరూ గుర్తుపట్టకుండా ఉండేలా వరమిచ్చుట.",
    keyQuoteRoy: "The Yaksha asked: 'What is the greatest wonder in the world?' Yudhishthira replied: 'Day after day countless beings enter the abode of Yama; yet the survivors wish to live forever. What wonder can be greater than this?'",
    dharmaInsight: "Universal justice, impartiality towards all mothers, and self-restraint in the presence of overwhelming temptation form the ultimate triumph of Dharma."
  }
];

/* ===== VOLUME IV: VIRATA PARVA — 5 UPA-PARVAS DETAIL =====
   Based directly on Pratap Chandra Roy's English Translation (Sections I - LXXII) */
const VIRATA_PARVA_UPAPARVAS = [
  {
    number: 1,
    id: "pandava-pravesha",
    nameEn: "Pandava-Pravesha Parva",
    nameSa: "पाण्डवप्रवेशपर्व",
    nameTe: "పాండవ ప్రవేశ పర్వము (అజ్ఞాతవాస ప్రవేశం & వేషధారణ)",
    sections: "Sections I - XII",
    versesApprox: 345,
    keyCharacters: ["King Yudhishthira (Kanka)", "Bhima (Vallabha)", "Arjuna (Brihannala)", "Nakula (Granthika)", "Sahadeva (Tantripala)", "Queen Draupadi (Sairindhri)", "King Virata", "Queen Sudeshna", "Sage Dhaumya"],
    summaryEn: "As the 12-year forest exile concludes, the Pandavas prepare for their treacherous 13th year incognito (Ajnata-vasa) where discovery would sentence them to another 12 years of exile. Sage Dhaumya instructs them on the subtle etiquette and dangers of living as royal servants in a monarch's court. Approaching King Virata's capital in Matsya, they wrap their celestial bows and weapons in animal skins to resemble a decomposed corpse and conceal them high in the branches of a thorny Sami tree inside a cremation ground to keep people away. Yudhishthira offers a magnificent hymn of devotion to Goddess Durga, who blesses them with impenetrable secrecy. The Pandavas enter Virata's service one by one under humble disguises: Yudhishthira presents himself as Kanka, an expert Brahmana dice-player and courtier; Bhima enters as Vallabha, a master chef and wrestler; Arjuna assumes the cursed form of Brihannala, a eunuch instructor of dance and singing to Princess Uttara; Sahadeva becomes Tantripala, a skilled herdsman of cows; Nakula becomes Granthika, a master tamer and healer of horses; and Queen Draupadi, weeping with dignity, enters as Sairindhri (Malini), a noble hairdresser and maidservant to Queen Sudeshna.",
    summaryTe: "పాండవులు తమ 12 ఏళ్ళ అరణ్యవాసాన్ని ముగించి, ఎవరూ గుర్తుపట్టకూడని క్లిష్టమైన 13వ ఏట అజ్ఞాతవాసమును ప్రారంభించుట. ధౌమ్య మహర్షి రాజుల కొలువులలో సేవకులుగా మెలగవలసిన సూక్ష్మ నడవడికలను ఉపదేశించుట. మత్స్యదేశ రాజధానిని సమీపించి, శ్మశానవాటికలోని ముళ్ళ జమ్మి చెట్టు (శమీ వృక్షము) పై తమ గాండీవాది దివ్యాస్త్రాలను శవమువలె బట్టలలో చుట్టి దాచిపెట్టుట. యుధిష్ఠిరుడు దుర్గాదేవిని స్తుతించగా అమ్మవారు వారి రహస్య రక్షణకు వరమిచ్చుట. అనంతరం విరాటరాజు కొలువులో ఒక్కొక్కరుగా ప్రవేశించుట: కంకభట్టుగా ధర్మరాజు (పాచికల నిపుణుడు), వలలుడిగా భీముడు (మహావంటగాడు & మల్లయోధుడు), బృహన్నలగా అర్జునుడు (ఉత్తరా రాజకుమారికి నాట్య సంగీత గురువు), తంత్రపాలుడిగా సహదేవుడు (గోరక్షకుడు), దామగ్రంథిగా నకులుడు (అశ్వశిక్షకుడు), మరియు సుధేష్ణా దేవి అంతఃపురంలో సైరంధ్రి మాలినిగా ద్రౌపది ప్రవేశించుట.",
    keyQuoteRoy: "Vyasa said: 'Even in extreme adversity, the wise preserve their patience. Clad in humble weeds like fires hidden under ashes, the heroic sons of Pandu entered the city of Virata without being detected by any.'",
    dharmaInsight: "True spiritual nobility shines in the crucible of humility; when circumstances demand subservience, enduring hardship with unshakeable inner dignity is the hallmark of true character."
  },
  {
    number: 2,
    id: "samaya-palana",
    nameEn: "Samaya-palana Parva",
    nameSa: "समयपालनपर्व",
    nameTe: "సమయపాలన పర్వము (నియమ పాలన & జీమూత వధ)",
    sections: "Section XIII",
    versesApprox: 120,
    keyCharacters: ["King Virata", "Bhima (Vallabha)", "Jimuta (champion wrestler)", "King Yudhishthira"],
    summaryEn: "For ten harmonious months, the Pandavas live unsuspected in Virata's palace, meticulously observing their solemn covenant (Samaya-palana). During the grand autumn festival of Lord Brahma, renowned wrestlers and martial champions from across continents arrive to demonstrate feats of prowess. A ferocious, gigantic champion wrestler named Jimuta challenges the entire assembly, striking terror into Virata's champions. Anxious for his realm's honor, King Virata commands his master cook Vallabha (Bhima) to enter the ring. Bhima steps forward, roars like a lion, and clashes with Jimuta. In an earth-shaking display of ancient wrestling, Bhima locks Jimuta, lifts him spinning above his head a hundred times, and violently smashes him against the arena floor, shattering his ribs and bones. King Virata showers Vallabha with immense riches and royal favors, while Yudhishthira and his brothers rejoice in quiet satisfaction.",
    summaryTe: "మత్స్య రాజధానిలో పది నెలలపాటు పాండవులు ఎటువంటి అనుమానము రాకుండా తమ సమయ నియమాలను అత్యంత నిష్ఠతో పాటించుట. బ్రహ్మోత్సవాలలో దేశదేశాల మల్లయోధులు రాగా, అజేయుడైన జీమూతుడు సమస్త వీరులను సవాలు చేస్తూ గర్జించుట. మత్స్యదేశ గౌరవార్థం విరాటరాజు తన వంటవాడైన వలలుని (భీమసేనుని) రంగంలోకి దింపుట. భీముడు సింహంలా గర్జించి జీమూతునితో భీకరంగా పోరాడి, ఆకాశంలోకి నూరుమార్లు గిరగిరా తిప్పి నేలకేసి కొట్టి సంహరించుట. విరాటరాజు ఆనందంతో వలలునికి అపార ధనధాన్యాలను, బహుమతులను ప్రసాదించుట.",
    keyQuoteRoy: "Virata said: 'Well done, O cook! Thou hast upheld the honor of Matsya! Like unto Valadeva himself in strength, ask of me whatever thou desirest!' And Bhima smiled, receiving the king's bounty with folded hands.",
    dharmaInsight: "Duty requires that strength be summoned only in rightful defense of honor; maintaining self-discipline and preserving vows (Samaya) brings divine blessings."
  },
  {
    number: 3,
    id: "kichaka-badha",
    nameEn: "Kichaka-badha Parva",
    nameSa: "कीचकवधपर्व",
    nameTe: "కీచకవధ పర్వము (ద్రౌపదీ పరాభవము & నాట్యశాలలో కీచక సంహారం)",
    sections: "Sections XIV - XXV",
    versesApprox: 760,
    keyCharacters: ["Kichaka (Commander)", "Queen Draupadi (Sairindhri)", "Queen Sudeshna", "Bhima (Vallabha)", "King Yudhishthira (Kanka)", "Upakichakas"],
    summaryEn: "King Virata's brother-in-law and supreme army commander, the mighty Kichaka, sees Sairindhri (Draupadi) and is consumed by lustful infatuation. Draupadi warns him that five ferocious Gandharvas protect her and that touching her will bring instantaneous death. Overcome by arrogance, Kichaka coerces his sister Queen Sudeshna into sending Sairindhri to his apartments under the pretext of fetching vintage wine. When Kichaka tries to embrace her, Draupadi breaks free and runs weeping into the royal court. In full view of King Virata and Kanka (Yudhishthira), Kichaka pursues her, kicks her to the ground, and hurls filthy abuse. Bhima's eyes blaze with fire and his teeth gnash, but Yudhishthira restrains him with subtle glances to protect their incognito covenant. That midnight, Draupadi enters the palace kitchen where Bhima is asleep, bathes him in her tears, and laments the daily humiliations suffered by the daughter of Drupada. Bhima consoles her and plans retribution: Draupadi is instructed to lure Kichaka to a midnight rendezvous in the secluded dance hall (Natyashala). When Kichaka arrives in perfumed robes whispering sweet words to the darkness, Bhima leaps from the couch like a pouncing tiger. An earth-shaking duel ensues without weapons. Bhima crushes Kichaka's throat, snaps his spine, and rolls his hands, feet, head, and limbs into his torso, reducing the commander into a horrific, shapeless ball of flesh. When 105 brothers of Kichaka (Upakichakas) tie Draupadi to Kichaka's funeral pyre to burn her alive, Bhima uproots an eighty-cubit tree and single-handedly slaughters all 105 of them, terrifying the entire city of Matsya.",
    summaryTe: "విరాటరాజు బావమరిది, అజేయ సేనాని అయిన కీచకుడు సైరంధ్రిని చూసి కామవశుడగుట. తనకు ఐదుగురు గంధర్వ పతులున్నారని, తాకితే మరణం తప్పదని ద్రౌపది హెచ్చరించినా లెక్కచేయక సుధేష్ణ సహాయంతో మద్యము తెమ్మనే నెపంతో రప్పించుట. కీచకుడు చేయి వేయగా ద్రౌపది విదిలించుకుని నిండు సభకు పరుగెత్తుకురాగా, కీచకుడు ఆమెను తన్ని అవమానించుట. భీముడు ఆగ్రహోదగ్రుడైనా కంకభట్టు (ధర్మరాజు) సైగలతో శాంతింపజేయుట. ఆ రాత్రి వంటశాలలో నిద్రిస్తున్న భీముని వద్దకు ద్రౌపది వచ్చి కన్నీటితో తన గోడు వెళ్లబోసుకొనుట. భీముడు కీచకుని సంహరించడానికి పన్నాగం పన్నుట. చీకటి నాట్యశాలలో ఏకాంత భేటీకి సైరంధ్రి రమ్మన్నట్లు కీచకుని భ్రమించి పిలిపించుట. శృంగారభావంతో వచ్చిన కీచకునిపై భీముడు సింహంలా విరుచుకుపడి, ఎటువంటి ఆయుధాలు లేకుండా చేతులతోనే నొక్కి, ఎముకలు విరిచి మాంసపు ముద్దగా మార్చి సంహరించుట. ద్రౌపదిని చితిపై సతీసహగమనం చేయించబోయిన 105 మంది ఉపకీచకులను కూడా భీముడు ఒక మహావృక్షంతో కొట్టి యమపురికి పంపుట.",
    keyQuoteRoy: "Bhima squeezed Kichaka's body between his arms and rolled him like a ball of clay, so that not a single limb was visible! Bhima cried: 'Thus shall perish all villains who covet the wives of other men under the shelter of royal power!'",
    dharmaInsight: "Arrogance born of political power and predatory lust invites terrifying, gruesome retribution; righteous retribution strikes down tyrants even when cloaked in the shadows."
  },
  {
    number: 4,
    id: "goharana",
    nameEn: "Goharana Parva",
    nameSa: "गोहरणपर्व",
    nameTe: "గోహరణ పర్వము (దక్షిణ & ఉత్తర గొగ్రహణం, బృహన్నల శౌర్యం & సమ్మోహనాస్త్రం)",
    sections: "Sections XXVI - LXIX",
    versesApprox: 1850,
    keyCharacters: ["Arjuna (Brihannala)", "Prince Uttara", "King Virata", "Susarman (Trigarta)", "Bhima", "Yudhishthira", "Duryodhana", "Bhishma", "Drona", "Karna", "Kripa", "Ashwatthaman"],
    summaryEn: "Following Kichaka's death, Duryodhana's spies report that Matsya has been weakened. King Susarman of Trigarta, eager for revenge against Matsya, proposes seizing Virata's vast herds of cattle from the south (Dakshina Goharana). King Virata marches out with his armies to confront the Trigartas. Susarman overpowers and captures Virata; but Yudhishthira, Bhima, Nakula, and Sahadeva rush forward. Bhima uproots a colossal Sal tree, smashes the Trigarta host, rescues King Virata, and captures Susarman, whom Yudhishthira graciously releases after humiliating him. Simultaneously, the grand Kaurava army—led by Bhishma, Drona, Karna, Kripa, Ashwatthaman, and Duryodhana—invades Matsya from the north (Uttara Goharana), carrying away sixty thousand cows. In the deserted palace, young Prince Uttara boasts that had he a skilled charioteer, he would single-handedly scatter the Kauravas. Sairindhri reveals that Brihannala was once the charioteer of Arjuna. Brihannala takes the reins; but upon reaching the front and beholding the oceanic Kaurava army bristling with celestial banners, Prince Uttara leaps from his chariot and flees in terror. Brihannala chases him, drags him back by his hair, reassures him, and drives the chariot to the cremation ground Sami tree. There Arjuna retrieves the divine Gandiva bow, reveals his true identity to Uttara, and strings the weapon with a thunderous twang. In an unmatched solo triumph, Arjuna blows the Devadatta conch, single-handedly outmaneuvers Drona, Kripa, and Ashwatthaman, cuts Karna's armor and forces him to retreat, defeats Duryodhana, and unleashes the sleep-inducing Sammohana weapon, putting the entire Kaurava army to sleep. Uttara strips their celestial garments to make dresses for Princess Uttara's dolls. Arjuna returns the cattle, conceals his identity before returning, and enters the capital with modest secrecy.",
    summaryTe: "కీచకుని మరణాన్ని తెలుసుకున్న కౌరవులు, త్రిగర్తరాజు సుశర్మతో కలిసి విరాటుని గోవులను అపహరించాలని పథకం వేయుట. దక్షిణ గొగ్రహణంలో సుశర్మ విరాటరాజును బంధించగా, ధర్మరాజాదులు వెళ్ళి భీముని సహాయంతో సుశర్మను ఓడించి విరాటుని ప్రాణాలు కాపాడుట. అదే సమయంలో ఉత్తర గొగ్రహణంలో భీష్మ, ద్రోణ, కర్ణ, కృప, అశ్వత్థామ, దుర్యోధనులతో కూడిన మహాసేన ఉత్తర దిశనుండి అరవై వేల ఆవులను అపహరించుట. అంతఃపురంలో యువరాజు ఉత్తరకుమారుడు మంచి సారథి ఉంటే కౌరవులను తరిమికొడతానని ప్రగల్భాలు పలుకగా, సైరంధ్రి బృహన్నల సారథ్య నైపుణ్యాన్ని చెప్పుట. బృహన్నల రథం నడపగా, కౌరవ సైన్య సాగరాన్ని చూసి భయపడి రథం దిగి పారిపోతున్న ఉత్తరుని జుట్టు పట్టుకుని వెనక్కి తెచ్చుట. శమీ వృక్షం నుండి గాండీవ ధనుస్సును దించి తన నిజస్వరూపాన్ని వెల్లడించుట. ఒంటరిగా కౌరవ సైన్యంపై విరుచుకుపడి కర్ణ, ద్రోణ, కృప, అశ్వత్థామ, దుర్యోధనులను ఎదుర్కొని, సమ్మోహనాస్త్రముతో సమస్త సేనను నిద్రపుచ్చి, ఉత్తర బొమ్మల కోసం వారి పట్టువస్త్రాలను సేకరించి, గోవులను విజయవంతంగా విడిపించిన బృహన్నల మహోన్నత శౌర్యగాథ.",
    keyQuoteRoy: "Arjuna said to Uttara: 'Fear not, O prince! Stand firm on thy chariot! Even if Yama, Indra, Varuna, and Kubera come against us, with Gandiva in my hands and these inexhaustible quivers, not a blade of grass can be touched in Matsya!'",
    dharmaInsight: "True mastery needs no boastful proclamations; when tested against overwhelming odds, a single warrior anchored in truth, skill, and righteousness can overcome millions."
  },
  {
    number: 5,
    id: "vaivahika",
    nameEn: "Vaivahika Parva",
    nameSa: "वैवाहिकपर्व",
    nameTe: "వైవాహిక పర్వము (పాండవ నిజరూప ప్రకటన & అభిమన్యు-ఉత్తరల కళ్యాణము)",
    sections: "Sections LXX - LXXII",
    versesApprox: 175,
    keyCharacters: ["King Virata", "King Yudhishthira", "Arjuna", "Prince Abhimanyu", "Princess Uttara", "Sri Krishna", "King Drupada", "Balarama"],
    summaryEn: "On the fourth day after the battle, the 13-year period of exile and incognito concludes. The Pandavas perform their morning ablutions, don pure white garments, adorn themselves with imperial jewels, and seat themselves upon the regal thrones in King Virata's council hall. King Virata enters and is outraged to see his humble dice-player Kanka sitting on the throne; Sahadeva smiles and reveals that Kanka is none other than Emperor Yudhishthira, Vallabha is Bhima, Brihannala is Arjuna, and Sairindhri is Queen Draupadi! Awestruck and mortified, King Virata touches their feet, begs forgiveness for past subservience, offers his entire kingdom and treasury, and offers Princess Uttara in marriage to Arjuna. Arjuna noble mind declines for himself, explaining that as Brihannala he instructed Uttara in song and dance, loving her as a daughter; marrying her would tarnish the sacred purity of the teacher-student bond. Instead, Arjuna accepts Uttara as daughter-in-law for his heroic son Abhimanyu. The glorious wedding is solemnized at Upaplavya with supreme pomp. Lord Sri Krishna, Balarama, King Drupada, and emperors from all Bharatavarsha gather, forming the grand alliance that will champion Dharma on Kurukshetra.",
    summaryTe: "అజ్ఞాతవాస నియమిత కాలం పరిపూర్ణం కాగా, పాండవులు తెల్లటి దివ్యవస్త్రాలు ధరించి విరాటుని రాజసింహాసనాలపై అధిష్టించుట. కంకభట్టు సింహాసనంపై ఉండడం చూసి కోపించిన విరాటునికి సహదేవుడు అసలు రహస్యం వెల్లడించుట. వీరే మహాపరాక్రమవంతులైన పాండవులని, సైరంధ్రి సాక్షాత్తు ద్రౌపది అని తెలుసుకున్న విరాటరాజు ఆశ్చర్యంతో వారి పాదాలపై పడి క్షమించమని వేడుకొనుట. తన సర్వస్వమును సమర్పించి ఉత్తరను అర్జునునికిచ్చి వివాహం చేయబోగా, ఆమెకు తాను నాట్యగురువుగా తండ్రి స్థానంలో ఉన్నానని, కావున తన పుత్రుడైన అభిమన్యునికి కోడలిగా స్వీకరిస్తానని అర్జునుడు నిష్కళంక ధర్మాన్ని పాటించుట. ఉపప్లావ్య నగరంలో శ్రీకృష్ణ, బలరామ, ద్రుపద మహారాజుల సమక్షంలో అభిమన్యు-ఉత్తరల అద్భుత వైవాహిక మహోత్సవము.",
    keyQuoteRoy: "Arjuna said: 'O king, living in thy inner apartments I had the charge of thy daughter. She ever reposed trust in me as in a father. Therefore, let my son Abhimanyu, nephew of Krishna, accept her hand in sacred marriage!'",
    dharmaInsight: "Uncompromising moral rectitude in relations of trust (Guru-Shishya) preserves absolute honor; an alliance founded on virtue becomes an invincible bastion of Dharma."
  }
];

/* ===== VOLUME IV: UDYOGA PARVA — 11 UPA-PARVAS DETAIL =====
   Based directly on Pratap Chandra Roy's English Translation (Sections I - CXCIX) */
const UDYOGA_PARVA_UPAPARVAS = [
  {
    number: 1,
    id: "sainyodyoga",
    nameEn: "Sainyodyoga Parva",
    nameSa: "सैन्योद्योगपर्व",
    nameTe: "సైన్యోద్యోగ పర్వము (శ్రీకృష్ణుని వద్దకు అర్జున-దుర్యోధనులు & నారాయణీ సేన)",
    sections: "Sections I - XXI",
    versesApprox: 680,
    keyCharacters: ["Sri Krishna", "Arjuna", "Duryodhana", "King Drupada", "Balarama", "King Salya"],
    summaryEn: "Following the wedding at Upaplavya, Sri Krishna advises sending an emissary to Dhritarashtra to seek peaceful restoration while preparing for war. Both Duryodhana and Arjuna travel to Dvaraka to secure Krishna's allegiance. Duryodhana arrives first and arrogantly sits upon an ornate throne at the head of the sleeping Lord; Arjuna arrives second and humbly stands with folded hands at Krishna's feet. Upon waking, Krishna's eyes fall first upon Arjuna. Because Duryodhana arrived first but Arjuna was seen first, Krishna grants Arjuna the first choice between two options: His million-strong Narayani Sena consisting of undefeated celestial cowherd-warriors, or Himself alone, unarmed and promising not to strike a single blow. Arjuna without a moment's hesitation chooses the unarmed Lord Sri Krishna to be his charioteer. Duryodhana joyously claims the massive Narayani army, gloating over Arjuna's apparent folly. Balarama decides to remain neutral, refusing to fight either disciple. Meanwhile, King Salya of Madra marches with an enormous army to join the Pandavas; Duryodhana sets up magnificent royal pavilions along Salya's march, deceiving Salya into believing Yudhishthira is hosting him. When Salya pledges a boon in gratitude, Duryodhana reveals himself and demands Salya's army. Salya consents, but secretly visits Yudhishthira and promises that when chosen as Karna's charioteer, he will demoralize and deflate Karna's spirit on the battlefield.",
    summaryTe: "ఉపప్లావ్యంలో వివాహానంతరం కురుక్షేత్ర రణసన్నాహాలు ప్రారంభమగుట. శ్రీకృష్ణుని సైనిక సహాయం కోరి అర్జునుడు, దుర్యోధనుడు ఏకకాలంలో ద్వారకకు చేరుకొనుట. నిద్రిస్తున్న కృష్ణుని శిరోభాగంలో గర్వంతో కూర్చున్న దుర్యోధనుడు, పాదాల చెంత వినయంతో నిలిచిన అర్జునుడు. మేల్కొన్న శ్రీకృష్ణుడు మొదట అర్జునుని చూసి, ఒకవైపు ఆయుధం పట్టని తాను, మరోవైపు 10 లక్షల అజేయ 'నారాయణీ సేన' ఉండగా ఎంచుకోమనుట. అర్జునుడు ఏమాత్రం సందేహించకుండా భగవానుడైన శ్రీకృష్ణునే సారథిగా కోరుకోగా, దుర్యోధనుడు నారాయణీ సేనను దక్కించుకుని ఆనందించుట. బలరాముడు తటస్థంగా ఉండుటకు నిశ్చయించుకొనుట. శల్యునికి కపట ఆతిథ్యమిచ్చి దుర్యోధనుడు తన పక్షాన చేర్చుకోగా, శల్యుడు యుద్ధంలో కర్ణుని తేజస్సును తగ్గించడానికి ధర్మరాజుకు రహస్య వాగ్దానమిచ్చుట.",
    keyQuoteRoy: "Arjuna said to Krishna: 'Thou alone art sufficient for me, O Slayer of Madhu! Even without weapons, be Thou my guide and charioteer in this righteous war!'",
    dharmaInsight: "Material strength and numbers are meaningless without divine guidance; he who chooses God chooses ultimate victory, while he who chooses worldly force embraces destruction."
  },
  {
    number: 2,
    id: "sanjaya-yana",
    nameEn: "Sanjaya Yana Parva",
    nameSa: "सञ्जययानपर्व",
    nameTe: "సంజయయాన పర్వము (ధృతరాష్ట్రుని రాయబారం & ధర్మరాజు ఐదు ఊళ్ళ ప్రతిపాదన)",
    sections: "Sections XXII - XXXII",
    versesApprox: 540,
    keyCharacters: ["Sanjaya", "King Dhritarashtra", "King Yudhishthira", "Sri Krishna", "Arjuna"],
    summaryEn: "King Dhritarashtra dispatches his trusted charioteer and minister Sanjaya on an embassy to Upaplavya. Sanjaya delivers the blind king's deceptive appeal: praising Yudhishthira's virtue, Sanjaya subtly urges that even mendicancy and death in the forest are preferable for a righteous man to the terrible sin of slaughtering one's kinsmen. Yudhishthira gives a profound, measured reply: righteousness includes royal duty (*Kshatradharma*) to protect the realm and resist evil. To avoid the cataclysmic slaughter of millions, Yudhishthira makes the legendary magnanimous offer: 'Give us but five villages—Kusasthala, Vrikasthala, Asandi, Varnavata, and any fifth—one for each brother, and we shall renounce all claim to the imperial throne and dwell in peace. But if Duryodhana refuses even this, the twang of Gandiva and the roar of Bhima's mace will settle the debt on Kurukshetra.'",
    summaryTe: "ధృతరాష్ట్రుడు సంజయుని ఉపప్లావ్యానికి రాయబారిగా పంపుట. బంధువులను చంపుకోవడం కంటే అడవులలో భిక్షమెత్తుకుని జీవించడమైనా ఉత్తమమని ధర్మరాజుకు కపట శాంతి బోధ చేయుట. ధర్మరాజు క్షాత్రధర్మ విధులను, న్యాయాన్ని వివరిస్తూ, రక్తపాతం నివారించడానికి ఐదుగురు సోదరులకు కేవలం ఐదు గ్రామాలు (కుశస్థల, వృకస్థల, అసంది, వారణావత మొదలైనవి) ఇస్తే చాలని, లేనిచో కురుక్షేత్రంలో గాండీవం మాట్లాడక తప్పదని నిష్కర్షగా హెచ్చరిక పంపుట.",
    keyQuoteRoy: "Yudhishthira said: 'O Sanjaya, tell the blind king and his foolish son: Give us but five villages, and we shall sheath our swords. But if pride shutteth your ears, then the soil of Kurukshetra shall drink the blood of the Kurus!'",
    dharmaInsight: "Magnanimity must never be mistaken for cowardice; offering extreme compromise to avoid bloodshed is the highest virtue, but surrendering to tyranny is an unpardonable sin."
  },
  {
    number: 3,
    id: "prajagara",
    nameEn: "Prajagara Parva (Vidura Niti)",
    nameSa: "प्रजागरपर्व (विदुरनीति)",
    nameTe: "ప్రజాగర పర్వము (విదురనీతి - ధర్మ, న్యాయ, సదాచార బోధ)",
    sections: "Sections XXXIII - XL",
    versesApprox: 590,
    keyCharacters: ["Mahatma Vidura", "King Dhritarashtra"],
    summaryEn: "Upon Sanjaya's return from Upaplavya, King Dhritarashtra is consumed by unbearable insomnia, panic, and dread. In the dead of night, he summons Mahatma Vidura, the embodiment of Dharma born of Sage Vyasa. Dhritarashtra laments that his heart is on fire and begs for counsel to soothe his torment. Vidura delivers the world-renowned ethical and political masterpiece known as **Vidura Niti** (8 adhyayas). Vidura systematically classifies the qualities of a true Pandit (wise man) versus a Murkha (fool); expounds the eight virtues that elevate human character (wisdom, nobility, self-control, sacred learning, valor, measured speech, charity, and gratitude); analyzes the roots of statecraft; warns that unrighteous wealth gathered through injustice dissolves like unbaked clay pots in water; and fiercely reprimands Dhritarashtra for his blind infatuation with Duryodhana, predicting the total annihilation of the Kuru race unless justice is restored to the Pandavas.",
    summaryTe: "సంజయుని మాటలు విని భయంతో, ఆందోళనతో రాత్రివేళ నిద్రపట్టక ధృతరాష్ట్రుడు విదురుని పిలిపించుట. విదురుడు చేసిన జగత్ప్రసిద్ధ ధర్మబోధయే 'విదురనీతి'. పండితుడు మరియు మూర్ఖుని లక్షణాలు, మానవ శీలమును తీర్చిదిద్దే ఎనిమిది సద్గుణాలు, రాజనీతి రహస్యాలు, మరియు క్షమాగుణం యొక్క గొప్పతనాన్ని విపులంగా వివరించుట. అన్యాయార్జిత సంపద పచ్చికుండలో నీటివలె కరిగిపోతుందని, దుర్యోధనుని అధర్మాన్ని చూస్తూ ఊరుకుంటే కురువంశం సమూలంగా నశిస్తుందని నిష్కళంక సత్యవాక్కులతో హెచ్చరించుట.",
    keyQuoteRoy: "Vidura said: 'These two never suffer from distress: he who is contented with what he hath, and he who is master of his passions. But lust, anger, and greed are the three gates to hell that destroy the soul.'",
    dharmaInsight: "Uncompromising truth spoken to power is the highest loyalty; clinging to unjust familial attachments in defiance of Dharma is the surest road to self-destruction."
  },
  {
    number: 4,
    id: "sanat-sujata",
    nameEn: "Sanat-Sujata Parva (Sanatsujatiya)",
    nameSa: "सनत्सुजातपर्व (सनत्सुजातीयम्)",
    nameTe: "సనత్సుజాత పర్వము (సనత్సుజాతీయ వేదాంత బోధ)",
    sections: "Sections XLI - XLVI",
    versesApprox: 380,
    keyCharacters: ["Sage Sanatsujata", "King Dhritarashtra", "Mahatma Vidura"],
    summaryEn: "Still sleepless and seeking ultimate metaphysical knowledge of the immortal soul beyond earthly demise, Dhritarashtra begs Vidura to instruct him on Brahman. Vidura, conscious that as the son of a Sudra woman he should not formalize esoteric Vedic initiation, invokes through intense meditation the eternal youth Sage Sanatsujata (the mind-born son of Brahma). Sanatsujata manifests in blazing yogic splendor. In the celebrated treatise **Sanatsujatiya** (one of the foundational Prasthanatrayi commentaries of Adi Shankaracharya), Sanatsujata declares that death (*Mrityu*) is nothing other than *Pramada* (spiritual heedlessness, delusion, and forgetfulness of the Self). He explains the nature of Brahman, the illusion of duality, the 12 vices that destroy wisdom, the 12 great vows that secure liberation, the practice of Brahmacharya, and how the immortal Self dwelling within the lotus of the heart is unaffected by the storms of earthly birth and death.",
    summaryTe: "మరణానంతర ఆత్మ తత్త్వాన్ని తెలుసుకోవాలన్న ధృతరాష్ట్రుని కోరిక మేరకు విదురుడు బ్రహ్మ మానసపుత్రుడైన సనత్సుజాత మహర్షిని ధ్యానంలో రప్పించుట. ఆది శంకరాచార్యుల భాష్యముతో అమరత్వము పొందిన 'సనత్సుజాతీయ' వేదాంత దర్శనం. 'ప్రమాదం వై మృత్యురహం బ్రవీమి'—ఆధ్యాత్మిక అజాగ్రత్తయే మరణమని, ఆత్మజ్ఞానమును పొందిన వివేకి మరణాన్ని జయిస్తాడని, హృదయకమలంలో వెలిగే పరమాత్మను తెలుసుకోవడమే శాశ్వత మోక్షమని సనత్సుజాతుడు బోధించుట.",
    keyQuoteRoy: "Sanatsujata said: 'There is no death other than delusion (Pramada)! Men, overcome by desire, fall into the pit of worldly attachment; but those who conquer ignorance attain the immutable Brahman and are free from all fear.'",
    dharmaInsight: "Spiritual ignorance is the only true death; when the mind transcends worldly desires and perceives the eternal Self, mortal terror dissolves into boundless peace."
  },
  {
    number: 5,
    id: "yana-sandhi",
    nameEn: "Yana Sandhi Parva",
    nameSa: "यानसन्धिपर्व",
    nameTe: "యాన సంధి పర్వము (హస్తినాపుర సభలో సంజయుని రాయబార ఫలితం)",
    sections: "Sections XLVII - LXXI",
    versesApprox: 840,
    keyCharacters: ["Sanjaya", "King Dhritarashtra", "Duryodhana", "Bhishma", "Drona", "Maharshi Vyasa"],
    summaryEn: "The imperial court convenes in Hastinapura to hear Sanjaya's official report. Sanjaya openly tells the assembly that the Pandava warriors are invincible and that Lord Krishna drives Arjuna's chariot. Bhishma and Drona passionately plead with Dhritarashtra to yield Yudhishthira's rightful half-share or grant the five villages, warning that neither celestials nor Asuras can withstand the arrows of Arjuna when guided by Janardana. Duryodhana becomes violently agitated, mocks his elders as partisan cowards, and boasts that his 11 Akshauhinis and Karna's archery will crush the Pandavas like insects. Maharshi Vyasa appears and warns Dhritarashtra that when destruction approaches, the intellect of fools becomes totally inverted (*Vinashakale Viparitabuddhi*). Despite all warnings, Duryodhana refuses peace.",
    summaryTe: "హస్తినాపుర సభలో సంజయుడు పాండవుల సైనిక బలాన్ని, శ్రీకృష్ణార్జునుల నర-నారాయణ తత్త్వాన్ని వివరించుట. భీష్మ, ద్రోణులు దుర్యోధనుని తీవ్రంగా మందలిస్తూ పాండవులకు న్యాయమైన వాటా ఇచ్చి శాంతిని నెలకొల్పమని కోరుట. దుర్యోధనుడు పెద్దలను అవమానిస్తూ కర్ణుని శౌర్యంతో పాండవులను మట్టికరిపిస్తానని ప్రగల్భాలు పలుకుట. 'వినాశకాలే విపరీతబుద్ధిః' అన్నట్లు నాశనకాలం సమీపించినప్పుడు బుద్ధి వక్రమార్గం పడుతుందని వ్యాసుడు ధృతరాష్ట్రునికి హెచ్చరిక చేయుట.",
    keyQuoteRoy: "Drona said: 'Hearken, O king! Where Nara and Narayana are, there victory is certain! Do not plunge thy race into destruction through the madness of thy son!'",
    dharmaInsight: "When pride blinds a tyrant, wisdom and counsel from the most venerable elders sound like hostility; destiny marches through the willful obstinacy of fools."
  },
  {
    number: 6,
    id: "bhagavat-yana",
    nameEn: "Bhagavat Yana Parva",
    nameSa: "भगवद्यानपर्व",
    nameTe: "భగవద్యాన పర్వము (శ్రీకృష్ణ రాయబారము & సభలో విశ్వరూప ప్రదర్శన)",
    sections: "Sections LXXII - CXXXIX",
    versesApprox: 2450,
    keyCharacters: ["Lord Sri Krishna", "King Dhritarashtra", "Duryodhana", "Mahatma Vidura", "Queen Kunti", "Bhishma", "Drona", "Sage Kanva", "Sage Galava", "Sage Jamadagnya"],
    summaryEn: "To make one final divine effort to avert the catastrophic slaughter of humanity, Lord Sri Krishna personally departs for Hastinapura as ambassador of peace (*Krishna Rayabaram*). Bypassing Duryodhana's lavish golden palaces and sumptuous banquets, Krishna proceeds directly to the humble dwelling of Mahatma Vidura, where He joyfully eats simple food offered with pure love. Krishna visits his paternal aunt Queen Kunti, who sends a stirring call to Kshatriya valor to her sons through the heroic parable of Vidula. The following day, accompanied by Vidura, Krishna enters the imperial assembly of the Kurus. Krishna delivers a sublime speech on Dharma, harmony, and mercy, requesting only five villages for the Pandavas. Sages Kanva, Narada, and Jamadagnya advise Duryodhana with parables of Matali, Galava, and Yayati. Duryodhana obstinately proclaims his famous boast: 'I will not part with even as much land as can be pierced by the sharp point of a needle (సూదిమొన మోపినంత నేల కూడా ఇవ్వను)!' Duryodhana, Sakuni, and Duhsasana then hatch a sinister plot to seize and bind Krishna in iron chains. Sensing their conspiracy, the Lord bursts into cosmic laughter. In the midst of the royal court, Krishna manifests His terrifying, boundless **Vishwaroopa** (Cosmic Form): blazing fires issue from His mouth, Brahma sits upon His chest, Rudras and Adityas upon His brow, gods on His arms, and the Pandavas and celestials within His luminous aura. Dhritarashtra is granted divine sight for a fleeting moment to behold the cosmic splendour before begging Krishna to withdraw it. Having exhausted every avenue of peace, Krishna exits the assembly, declaring war inevitable.",
    summaryTe: "లోకకల్యాణార్థం యుద్ధాన్ని నివారించడానికి భగవాన్ శ్రీకృష్ణుడు స్వయంగా హస్తినకు శాంతి రాయబారిగా వెళ్ళుట. దుర్యోధనుని రాజభోగాలను తిరస్కరించి, విదురుని ఇంట భక్తితో సమర్పించిన ఆతిథ్యాన్ని స్వీకరించుట. కుంతీదేవిని పరామర్శించగా, ఆమె విదులోపాఖ్యానం ద్వారా పుత్రులలో క్షాత్రతేజాన్ని రగిలించమని సందేశమిచ్చుట. రాజసభలో కృష్ణుని అమృతతుల్య శాంతి ప్రసంగం. దుర్యోధనుడు 'సూది మొన మోపినంత నేల కూడా పాండవులకు ఇవ్వను' అని అహంకరించి, శ్రీకృష్ణుని సంకెళ్ళతో బంధించడానికి కుట్ర చేయుట. పరమాత్మ దివ్యహాసం చేస్తూ నిండు కొలువులో తన అద్భుత 'విశ్వరూపం'ను ప్రదర్శించుట. దేవతలు, అగ్ని, సూర్య-రుద్రులు, సమస్త బ్రహ్మాండాలు ఆయన దేహంలో దర్శనమిచ్చుట. ధృతరాష్ట్రునికి క్షణకాలం దివ్యచక్షువులు ప్రసాదించి విశ్వరూపం చూపించి, శాంతి ప్రయత్నం ముగిసిందని చాటి హస్తినను వీడుట.",
    keyQuoteRoy: "Krishna laughed, and as He laughed, His body flashed like a million suns! Brahma appeared on His breast, Rudra on His brow, Agni issued from His mouth, and all the kings shut their eyes in terror! The Lord said: 'Duryodhana, didst thou think to bind Me? Behold, all creation abideth within Me!'",
    dharmaInsight: "God exhausts every avenue of mercy and peace before executing divine retribution; attempting to enslave or destroy the Truth only reveals mortal insignificance before the Infinite."
  },
  {
    number: 7,
    id: "karna-vivada",
    nameEn: "Karna-Vivada Parva",
    nameSa: "कर्णविवादपर्व",
    nameTe: "కర్ణ వివాద పర్వము (కృష్ణ-కర్ణ సంవాదం & కుంతీ దేవికి కర్ణుని అభయదానము)",
    sections: "Sections CXL - CXLVI",
    versesApprox: 420,
    keyCharacters: ["Lord Sri Krishna", "Danaveera Karna", "Queen Kunti"],
    summaryEn: "Before departing Hastinapura, Sri Krishna takes Karna onto His chariot and drives outside the city. Krishna reveals the long-guarded cosmic secret: Karna is the eldest born son of Kunti (Kaunteya) and Surya Deva. Krishna entreats Karna to join his rightful brothers: Yudhishthira will wash his feet, Bhima and Arjuna will attend him, Draupadi will be his queen, and he will be crowned Emperor of all Bharatavarsha. Weeping with emotion, Karna replies with noble integrity: Duryodhana stood by him when he was scorned as a charioteer's son; Duryodhana invested his kingdom and life in Karna's friendship; to desert Duryodhana now on the brink of battle for the sake of an empire would be the foulest treason and ungratefulness. Karna asks Krishna to keep his birth secret, knowing that Yudhishthira would renounce the throne if he knew Karna was his elder brother. Following Krishna, Queen Kunti approaches Karna at noon while he prays on the banks of the Ganga. Surya Deva commands Karna from the heavens to obey his mother. Karna gently reproaches Kunti for abandoning him as a newborn to the river waves, depriving him of Kshatriya honor. Nevertheless, Karna cannot turn away his mother empty-handed: he grants Kunti a historic boon that he will not strike down Yudhishthira, Bhima, Nakula, or Sahadeva; only between himself and Arjuna will there be a battle to the death, ensuring that Kunti will still have five sons alive after the war.",
    summaryTe: "హస్తినను వీడే ముందు శ్రీకృష్ణుడు కర్ణుని తన రథంపైకి రప్పించి, అతడు కుంతీ ప్రథమ పుత్రుడని, సూర్యదేవుని అంశతో జన్మించిన కౌంతేయుడని వెల్లడించుట. పాండవుల వద్దకు వస్తే సార్వభౌమునిగా పట్టాభిషేకం చేస్తారని ప్రలోభపెట్టినా, సమాజం అవమానించినప్పుడు ఆదరించిన దుర్యోధనునికి ద్రోహం చేయలేనని కర్ణుడు నిష్కల్మషమైన కృతజ్ఞతతో నిరాకరించుట. అనంతరం గంగాతీరాన కుంతీదేవి కర్ణుని వద్దకు రాగా, పసిబిడ్డగా తనను విసర్జించిన తల్లికి నమస్కరిస్తూ, అర్జునుని మినహా మిగిలిన నలుగురు పాండవులను చంపనని, యుద్ధం తర్వాత కూడా నీకు ఐదుగురు కొడుకులు మిగిలే ఉంటారని అభయదానమిచ్చుట.",
    keyQuoteRoy: "Karna said: 'I know that where Krishna is, there is righteousness, and where righteousness is, there is victory. Yet for all the wealth of heaven and earth, I shall never abandon Duryodhana who trusted me in my darkest hour!'",
    dharmaInsight: "Unwavering loyalty and gratitude to a benefactor can elevate a tragic hero to sublime moral majesty, even when destiny compels him to fight on an unrighteous side."
  },
  {
    number: 8,
    id: "saina-niryana",
    nameEn: "Saina-Niryana Parva",
    nameSa: "सैन्यनिर्याणपर्व",
    nameTe: "సైన్యనిర్యాణ పర్వము (కురుక్షేత్ర రణరంగ ప్రయాణము & సేనాధిపత్యం)",
    sections: "Sections CXLVII - CLIX",
    versesApprox: 520,
    keyCharacters: ["King Yudhishthira", "Sri Krishna", "Dhrishtadyumna", "Bhishma", "Duryodhana", "Balarama", "Rukmi"],
    summaryEn: "Both camps finalize their mobilization and march to the sacred battlefield of Kurukshetra. King Yudhishthira organizes the 7 Pandava Akshauhinis and appoints Prince Dhrishtadyumna (born from Drupada's sacrificial altar specifically to slay Drona) as supreme commander-in-chief, with seven divisional generals including Drupada, Virata, Satyaki, Shikhandin, and Bhima. Duryodhana gathers his 11 Akshauhinis and formally installs Grandfather Bhishma as supreme commander-in-chief with Vedic coronation rituals and thunderous conches. Balarama visits the Pandavas and declares his grief over the impending fratricidal slaughter; unwilling to fight for either side, he departs on an extended pilgrimage along the Saraswati river. King Rukmi of Vidarbha arrives boastfully offering to single-handedly win the war for either side; both Arjuna and Krishna reject his arrogance, leaving Rukmi excluded from the great war.",
    summaryTe: "కురుక్షేత్ర పుణ్యభూమికి ఇరుపక్షాల సేనలు తరలివెళ్ళుట. పాండవుల 7 అక్షౌహిణుల సైన్యానికి ద్రుపద పుత్రుడైన దృష్టద్యుమ్నుడు సర్వసేనాధిపతిగా నియామకమగుట. కౌరవుల 11 అక్షౌహిణుల సైన్యానికి పితామహుడు భీష్ముడు సర్వసేనాధిపతిగా అభిషిక్తుడగుట. బంధువుల రక్తపాతాన్ని చూడలేక బలరాముడు సరస్వతీ తీర్థయాత్రలకు వెళ్ళుట. గర్వంతో వచ్చిన రుక్మిని కృష్ణార్జునులు ఇద్దరూ తిరస్కరించి యుద్ధం నుండి దూరం చేయుట.",
    keyQuoteRoy: "Bhishma said to Duryodhana: 'I shall fight for thee with all my skill and slay ten thousand warriors daily; but the sons of Pandu I will not slay, for they are dear to me as my own life.'",
    dharmaInsight: "Arrogance and empty boasting have no place in a conflict of cosmic destiny; true commanders accept duty with solemn restraint and ethical boundaries."
  },
  {
    number: 9,
    id: "uluka-dutagamana",
    nameEn: "Uluka Dutagamana Parva",
    nameSa: "उलूकदूतगमनपर्व",
    nameTe: "ఉలూక దూతగమన పర్వము (శకుని కుమారుని దూషణ రాయబారం & పాండవుల ప్రతిస్పందన)",
    sections: "Sections CLX - CLXIV",
    versesApprox: 290,
    keyCharacters: ["Uluka (son of Sakuni)", "Duryodhana", "King Yudhishthira", "Bhima", "Arjuna", "Sri Krishna"],
    summaryEn: "On the eve of battle, Duryodhana sends Uluka (the insolent son of Sakuni) to the Pandava camp on Kurukshetra. Uluka delivers a stinging, taunting message: he mocks Yudhishthira as a hypocrite masquerading as pious; mocks Bhima as a helpless cook boasting of broken oaths; and taunts Arjuna that his Gandiva bow and Brihannala disguises will be pulverized. The Pandava warriors listen with icy composure. Bhima roars with thunderous rage, reiterating his vows to tear open Duhsasana's chest and drink his warm blood, and smash Duryodhana's thighs on the battlefield. Arjuna serenely instructs Uluka to convey to Duryodhana: 'Words break no bones; tomorrow at dawn, let the arrows of Gandiva answer thy insolence.'",
    summaryTe: "యుద్ధానికి ముందు శకుని కుమారుడైన ఉలూకుని దుర్యోధనుడు పాండవుల వద్దకు దూతగా పంపి, కించపరిచే మాటలతో అవమానింపజేయుట. ధర్మరాజును పిరికివాడని, భీముని వంటవాడని, అర్జునుని గాండీవం వ్యర్థమని ఎగతాళి చేయుట. భీముడు క్రోధోన్మత్తుడై దుశ్శాసనుని రక్తం తాగుతానని, దుర్యోధనుని తొడలు విరగ్గొడతానని ప్రళయగర్జన చేయుట. రేపటి సూర్యోదయాన గాండీవమే సమాధానం చెబుతుందని అర్జునుడు ప్రశాంత గంభీరంగా సందేశం పంపుట.",
    keyQuoteRoy: "Arjuna said: 'O Uluka, tell Duryodhana that boasting is the weapon of cowards. The sun will rise tomorrow, and Gandiva shall make him eat his words!'",
    dharmaInsight: "Vulgar provocations betray inner desperation and panic; the righteous remain composed and let decisive action on the battlefield deliver justice."
  },
  {
    number: 10,
    id: "rathatiratha-sankhyana",
    nameEn: "Rathatiratha Sankhyana Parva",
    nameSa: "रथातिरथसंख्यानपर्व",
    nameTe: "రథాతిరథ సంఖ్యాన పర్వము (యోధుల వర్గీకరణ & కర్ణుని పట్ల భీష్ముని తీర్పు)",
    sections: "Sections CLXV - CLXXIII",
    versesApprox: 460,
    keyCharacters: ["Bhishma", "Duryodhana", "Danaveera Karna", "Drona"],
    summaryEn: "Duryodhana asks Commander-in-Chief Bhishma to classify and evaluate the heroes of both armies into Rathas (car-warriors capable of fighting thousands), Atirathas (superior warriors fighting multiple Rathas), and Maharathas (supreme commanders capable of vanquishing an entire army). Bhishma rates Drona, Kripa, Ashwatthaman, Dhrishtadyumna, Satyaki, and Arjuna with flawless objectivity. However, when evaluating Karna, Bhishma bluntly degrades him as an **Ardharatha** (half-car warrior), citing Karna's arrogance, Surya's missing armor, and his humiliating retreats before Gandharva Chitrasena and Brihannala. Deeply mortified and enraged, Karna storms out of the war council, swearing a solemn vow never to pick up his bow or step onto Kurukshetra as long as Grandfather Bhishma lives and leads the army.",
    summaryTe: "యుద్ధానికి ముందు భీష్ముడు ఇరుపక్షాల యోధులను రథికులు, అతిరథులు, మరియు మహారథులుగా వర్గీకరించుట. అర్జునుడు, సాత్యకి, ద్రోణుడు, అశ్వత్థామల శౌర్యాన్ని నిష్పాక్షికంగా ప్రశంసించిన భీష్ముడు, కర్ణుని అహంకారాన్ని, కవచకుండలాలు లేకపోవడాన్ని ఎత్తిచూపుతూ అతడిని 'అర్ధరథుడు'గా తేల్చుట. తీవ్ర అవమానంతో రగిలిపోయిన కర్ణుడు, భీష్ముడు సేనాధిపతిగా ఉన్నంతవరకు తాను యుద్ధంలో అడుగుపెట్టనని ప్రతిజ్ఞ చేసి నిష్క్రమించుట.",
    keyQuoteRoy: "Bhishma said: 'Karna is boastful and without judgment; he hath lost his natural armor and earrings; in my sight he is only an Ardharatha!' Karna roared: 'O wicked grandfather, thou sowest dissension! I shall not fight while thou livest!'",
    dharmaInsight: "Ego and internal discord paralyze even the mightiest armies from within; insulting a comrade-in-arms deprives a cause of vital strength at the fateful hour."
  },
  {
    number: 11,
    id: "amba-upakhyana",
    nameEn: "Amba-upakhyana Parva",
    nameSa: "अम्बोपाख्यानपर्व",
    nameTe: "అంబోపాఖ్యాన పర్వము (అంబ తపస్సు, పరశురామ-భీష్మ సంగ్రామం & శిఖండి అవతరణ)",
    sections: "Sections CLXXIV - CXCIX",
    versesApprox: 1120,
    keyCharacters: ["Princess Amba", "Bhishma", "Bhagavan Parashurama", "King Salwa", "Lord Shiva", "Shikhandin", "King Drupada"],
    summaryEn: "Duryodhana asks Bhishma why he has vowed never to shoot an arrow at Prince Shikhandin, the son of King Drupada. Bhishma narrates the epic tragedy of Princess Amba: As the eldest princess of Kasi, Amba was abducted along with her sisters Ambika and Ambalika by Bhishma for his brother Vichitravirya. When Amba revealed she had already pledged her heart to King Salwa, Bhishma honorably sent her to Salwa; but Salwa refused to accept a woman abducted by another warrior. Returning to Bhishma, Amba demanded he marry her; bound by his vow of lifelong celibacy, Bhishma refused. Rejected and ruined, Amba sought refuge with Bhagavan Parashurama, Bhishma's martial preceptor. Parashurama commanded Bhishma to marry her; upon Bhishma's refusal, an earth-shattering 23-day duel erupted between master and disciple at Kurukshetra. When Bhishma was about to unleash the apocalyptic Praswapa astra, the celestials and Rishis intervened to end the duel in a draw. Amba then retired to the forest of Vatsa, performing unimaginable tapasya for twelve years, surviving on fallen leaves and standing on one toe in freezing waters. Lord Shiva appeared and granted her the boon that in her next birth she would become a male warrior and cause the downfall of Bhishma. Amba immolated herself on a blazing funeral pyre and was reborn as King Drupada's daughter, subsequently transforming into the male warrior **Shikhandin** through the grace of Yaksha Sthunakarna. Bhishma concludes: 'Shikhandin is female by birth; I have taken a sacred vow never to raise weapons against a woman or one born female!'",
    summaryTe: "ద్రుపదుని కుమారుడైన శిఖండిపై తాను బాణం ఎందుకు ప్రయోగించనని భీష్ముడు వివరించిన విషాద గాథ. కాశీరాజ పుత్రికలైన అంబ, అంబిక, అంబాలికలను భీష్ముడు స్వయంవరంలో గెలుచుకురాగా, అంబ సాల్వుని ప్రేమించానని చెప్పడంతో భీష్ముడు ఆమెను పంపుట. సాల్వుడు తిరస్కరించగా, భీష్ముడు బ్రహ్మచర్య వ్రతం వల్ల ఆమెను వివాహం చేసుకోలేనని చెప్పుట. అంబ పరశురాముని ఆశ్రయించగా, గురుశిష్యులైన పరశురామ-భీష్ముల మధ్య 23 రోజుల భీకర సంగ్రామం జరిగి చివరకు దేవతల జోక్యంతో ఆగుట. అంబ ఘోర తపస్సు చేయగా శివుడు ప్రత్యక్షమై వచ్చే జన్మలో భీష్ముని పతనానికి కారణమౌతావని వరమిచ్చుట. అగ్నిప్రవేశం చేసి ద్రుపదుని ఇంట శిఖండిగా జన్మించి, స్థూణాకర్ణుడనే యక్షుని వల్ల పురుషుడిగా మారి 'శిఖండి'గా అవతరించిన వృత్తాంతం. స్త్రీగా జన్మించిన శిఖండిపై తాను శస్త్రం ఎత్తబోనని భీష్ముడు చాటుట.",
    keyQuoteRoy: "Bhishma said: 'Shikhandin was born female as Amba, and through penance became male. I have vowed never to strike a woman, or one who was once a woman. Destiny hath chosen Shikhandin to bring about my fall!'",
    dharmaInsight: "A wrong committed against an innocent soul invokes an inexorable cosmic debt; even the most invincible vow of righteous heroes must yield to the ultimate justice of karma."
  }
];

/* ===== VOLUME V: BHISHMA PARVA - 5 UPA-PARVAS DETAIL =====
   Based directly on Pratap Chandra Roy's English Translation (Sections I - CXXIV) */
const BHISHMA_PARVA_UPAPARVAS = [
  {
    number: 1,
    id: "jamvu-khanda-nirmana",
    nameEn: "Jamvu-Khanda Nirmana Parva",
    nameSa: "जम्बूखण्डविनिर्माणपर्व",
    nameTe: "జంబూఖండ నిర్మాణ పర్వము (కురుక్షేత్ర సేనాసమీకరణం, యుద్ధ నియమాలు, సంజయుని దివ్యదృష్టి & భూగోళ దర్శనం)",
    sections: "Sections I - X",
    versesApprox: 480,
    keyCharacters: ["Maharshi Vyasa", "King Dhritarashtra", "Sanjaya", "King Yudhishthira", "King Duryodhana", "Grandfather Bhishma"],
    summaryEn: "The massive armies of the Kurus (11 Akshauhinis) and the Pandavas (7 Akshauhinis) assemble upon the holy field of Kurukshetra (Tapas-kshetra / Samanta-panchaka). Before the clash, the high-souled commanders establish mutual covenants for righteous warfare (Dharmayuddha): combat shall only take place between equals; no striking those who retreat, disarmed, fallen, chariotless, or begging for quarter; hostilities shall cease immediately at sunset; and non-combatants, attendants, drum-beaters, and chariot-drivers shall never be harmed. Bhagavan Krishna-Dwaipayana Vyasa visits the blind King Dhritarashtra in Hastinapura. Foreseeing the mutual destruction of the Bharata race, Vyasa offers physical sight to Dhritarashtra so he may witness the war. Dhritarashtra recoils with anguish, unwilling to witness the slaughter of his children, saying: 'O Holy Sage, let me not witness the slaughter of my race; but let me hear a full description of the battle!' Vyasa then bestows divine celestial vision (Divya-Drishti) upon the royal bard Sanjaya, blessing him that he shall perceive everything occurring across the battlefield—open or secret, day or night, spoken words and unspoken thoughts—while remaining immortal and impervious to weapons throughout the war. Vyasa details terrifying planetary portents: Rahu afflicts Krittika and Rohini; both solar and lunar eclipses occur within an ominous thirteen-day fortnight (Trayodasi); blazing comets tear through the skies; carnivores howl toward the south; idols in temples weep, sweat, and bleed; and showers of blood fall from clear skies. When Dhritarashtra asks about the Earth for which kings wage such ruinous war, Sanjaya discourses on the cosmic geography of Sudarsana-dwipa (circular like a wheel, reflected in the moon like a peepul tree and a hare), the sacred Mount Meru, Uttarakuru, and the divine continents.",
    summaryTe: "కురుక్షేత్ర పుణ్యభూమిలో కౌరవుల 11 అక్షౌహిణులు, పాండవుల 7 అక్షౌహిణుల మహాసైన్యాలు మొహరించుట. యుద్ధానికి ముందు ఇరుపక్షాలు ధర్మయుద్ధ నియమాలను ఏర్పరచుకొనుట: సమానుల మధ్యనే పోరు, శరణన్నవారిని, నిరాయుధులను, రథం విరిగినవారిని కొట్టరాదు, సూర్యాస్తమయంతో యుద్ధ విరమణ, యుద్ధంలో పాల్గొనని సేవకులను హింసించరాదు. ఈ తరుణంలో వ్యాస భగవానుడు ధృతరాష్ట్రుని వద్దకు వచ్చి, కురువంశ వినాశనాన్ని కనులారా చూసేందుకు కంటిచూపును ఇస్తాననగా, ధృతరాష్ట్రుడు తన కుమారుల మరణాన్ని చూడలేనని, యుద్ధ విశేషాలను వినగోరుతున్నానని విన్నవించుకొనుట. వ్యాసుడు సంజయునికి 'దివ్యదృష్టి'ని ప్రసాదించుట — సంజయుడు ఎక్కడ ఉన్నా యుద్ధరంగంలోని ప్రతి రహస్యాన్ని, మనసులోని ఆలోచనలను కూడా గ్రహించగల శక్తిని, ఏ అస్త్రమూ తాకని రక్షణను పొందుట. 13 రోజుల వ్యవధిలోనే సూర్య-చంద్ర గ్రహణాలు సంభవించుట, విగ్రహాలు చెమటలు పట్టడం, రక్తవర్షం మొదలైన అరిష్ట శకునాలను వ్యాసుడు వర్ణించుట. అనంతరం ధృతరాష్ట్రుని ప్రశ్నకు సమాధానంగా సంజయుడు సుదర్శన ద్వీపము, మేరు పర్వతము, మరియు భూగోళ స్వరూపమును విపులంగా వివరించుట.",
    keyQuoteRoy: "Vyasa said: 'Sanjaya shall see all that occurreth in the battle. He shall have celestial vision. Day or night, open or secret, even the thoughts in the minds of the combatants shall not be concealed from him. No weapons shall touch him, nor shall fatigue overtake him. He shall survive this terrible war!'",
    dharmaInsight: "True vision is not merely physical sight but the inner divine illumination that perceives the inexorable workings of Cosmic Law (Rta) amidst the rise and fall of mortal empires."
  },
  {
    number: 2,
    id: "bhumi",
    nameEn: "Bhumi Parva",
    nameSa: "भूमिपर्व",
    nameTe: "భూమి పర్వము (భరతవర్ష భౌగోళిక, నదీ, పర్వత & క్షేత్ర మాహాత్మ్యము)",
    sections: "Sections XI - XII",
    versesApprox: 210,
    keyCharacters: ["Sanjaya", "King Dhritarashtra"],
    summaryEn: "Sanjaya provides a comprehensive geographical, spiritual, and physical enumeration of Bharatavarsha and the surrounding continents. He explains the seven great mountain chains of the realm: the Mahendra, Malaya, Sahya, Suktiman, Rikshavat, Vindhya, and Pariyatra ranges. He systematically recites the holy, purifying rivers that sustain life across the sub-continent: the supreme Ganga, Yamuna, Saraswati, Godavari, Narmada, Krishna-Veni, Kaveri, Tungabhadra, Sindhu (Indus), Chandrabhaga, Vitasta, Vipasa, Gomati, Gandaki, and hundreds of regional tributaries that bestow virtue upon those who drink or bathe in them. Sanjaya enumerates all the ancient provinces, kingdoms, and sovereign peoples assembled on the battlefield: the Kurus, Panchalas, Matsyas, Surasenas, Kosalas, Magadhas, Angas, Bangas, Kalingas, Chedis, Avantis, Saurashtras, Gandharas, Trigartas, Dravidas, Cholas, Keralas, and Pandyas. Sanjaya delivers the profound philosophical proclamation regarding Bharatavarsha: of all realms in the cosmos, Bharatavarsha is the supreme field of karma (Karma-bhumi); in all other heavenly or earthly realms beings merely exhaust the fruits of past deeds, whereas only in Bharatavarsha do mortals perform actions that generate merit, spiritual ascent, and ultimate liberation (Moksha).",
    summaryTe: "సంజయుడు ధృతరాష్ట్రునికి భరతవర్షము యొక్క పవిత్ర భౌగోళిక, నదీ, పర్వత వైభవమును వివరించుట. ఏడు కులపర్వతాలు (మహేంద్ర, మలయ, సహ్య, శుక్తిమంత, ఋక్షవత్, వింధ్య, పారియాత్ర) మరియు భరతభూమిని పునీతం చేసే గంగ, యమున, సరస్వతి, గోదావరి, నర్మద, కృష్ణవేణి, కావేరి, తుంగభద్ర, సింధు, వితస్త, చంద్రభాగ తదితర జీవనదుల ప్రశంస. కురు, పాంచాల, మత్స్య, శూరసేన, కోసల, మగధ, అంగ, వంగ, కళింగ, చేది, అవంతి, సౌరాష్ట్ర, ద్రవిడ, చోళ, కేరళ, పాండ్య దేశాల ప్రజల వర్ణన. సమస్త లోకాలలోనూ భరతవర్షమే 'కర్మభూమి' అని, ఇతర లోకాల్లో కేవలం భోగాలను అనుభవించడం మాత్రమే సాధ్యమని, పుణ్యములను ఆర్జించి మోక్షమును పొందడానికి భరతవర్షమే ఏకైక పరమ పావన క్షేత్రమని సంజయుడు ఘనంగా చాటుట.",
    keyQuoteRoy: "Sanjaya said: 'This land of Bharata is the beloved realm of Indra, of the gods, and of the Pitris. It is the field of action (Karma-bhumi). In other realms men enjoy or suffer the fruits of action; but here alone are new actions performed that lead to liberation!'",
    dharmaInsight: "Human birth in a land consecrated by Dharma is the rarest spiritual blessing; life is not meant for idle indulgence but as a sacred laboratory of righteous action (Karma) dedicated to the Supreme."
  },
  {
    number: 3,
    id: "bhagavat-gita",
    nameEn: "Bhagavat-Gita Parva",
    nameSa: "भगवद्गीता पर्व",
    nameTe: "భగవద్గీతా పర్వము (శ్రీమద్భగవద్గీత - 18 అధ్యాయాలు, అర్జున విషాద యోగము నుండి మోక్ష సన్యాస యోగము వరకు)",
    sections: "Sections XIII - XLII",
    versesApprox: 950,
    keyCharacters: ["Bhagavan Sri Krishna", "Arjuna", "Sanjaya", "King Dhritarashtra", "Grandfather Bhishma", "Dronacharya", "Duryodhana"],
    summaryEn: "This foundational spiritual epic begins dramatically in Section XIII as Sanjaya returns from the front lines to Hastinapura and announces the cataclysmic truth: Grandfather Bhishma, the invincible son of Ganga and supreme commander, has been brought down on the tenth day! Overwhelmed with grief, King Dhritarashtra begs to hear the full story from the very first hour. Sanjaya describes the dawn of the war: Duryodhana surveys the Pandava forces, bragging of his vast numbers while secretly unnerved by the divine protection of the Pandavas; heroic conches are sounded—Krishna blows the Panchajanya, Arjuna blows the Devadatta, Bhima blows the Paundra, and Yudhishthira blows the Anantavijaya, tearing the hearts of the Kauravas. Arjuna asks Krishna to position the celestial chariot between the two armies (Senayor ubhayor madhye). Beholding revered grandfathers, teachers, kinsmen, and friends poised to slaughter one another, Arjuna is struck with profound despondency and existential crisis (Arjuna-Visada Yoga). His limbs tremble, his mouth dries, Gandiva slips from his hand, and weeping, he refuses to fight, declaring that even sovereignty over the three worlds cannot justify the slaughter of kin and the ruin of family traditions. Lord Sri Krishna then delivers the immortal 700 verses across 18 chapters of Srimad Bhagavad Gita: Ch. 2 (Sankhya Yoga) reveals the eternal, indestructible nature of the Atman (Na jayate mriyate va kadachit), expounds Nishkama Karma (Karmanye vadhikaraste ma phaleshu kadachana), and defines the steady-minded sage (Sthitaprajna); Ch. 3 (Karma Yoga) emphasizes performing duty without attachment as a cosmic sacrifice (Yajna) for the welfare of the world (Lokasangraha); Ch. 4 (Jnana-Karma-Sanyasa Yoga) proclaims the divine purpose of Krishna's Avatars across the ages (Yada yada hi dharmasya glanir bhavati Bharata... Paritranaya sadhunam vinasaya cha duskritam); Ch. 5 (Karma-Sanyasa Yoga) reveals the inner synthesis of action and renunciation, seeing the Divine equally in all beings (Panditah sama-darsinah); Ch. 6 (Dhyana Yoga) teaches the science of meditation and mind control through practice (Abhyasa) and dispassion (Vairagya); Ch. 7 & 8 (Jnana-Vijnana & Aksara-Brahma Yoga) explain the lower and higher nature of God, the supreme path of remembrance at the moment of death, and the power of OM; Ch. 9 & 10 (Raja-Vidya & Vibhuti Yoga) declare the sovereign secret, the path of loving devotion where even a leaf, flower, fruit, or water offered with love is accepted (Patram pushpam phalam toyam), and the infinite cosmic splendors of the Divine; Ch. 11 (Vishwaroopa-Darsana Yoga) grants Arjuna divine sight to behold the universe-shattering Cosmic Form of the Lord shining like a thousand simultaneous suns, with all warriors rushing into His fiery mouths, revealing Himself as all-devouring Time (Kalo'smi loka-kshaya-krit pravriddho); Ch. 12 (Bhakti Yoga) extols surrender and the qualities of a true devotee; Ch. 13–17 elucidate the Field and Knower (Kshetra-Kshetrajna), the three Gunas (Sattva, Rajas, Tamas), the inverted Cosmic Ashvattha tree and the Supreme Person (Purushottama), Divine vs Demonic natures, and the threefold divisions of faith; Ch. 18 (Moksha-Sanyasa Yoga) culminates in the ultimate gospel of total self-surrender (Sarva-dharman parityajya mam ekam saranam vraja), shattering Arjuna's delusion (Nashto mohah smritir labdha) and concluding with Sanjaya's ecstatic prophecy: Wherever is Krishna, the Master of Yoga, and wherever is Partha, the archer, there surely are fortune, victory, glory, and unfailing righteousness!",
    summaryTe: "సంజయుడు కురుక్షేత్రం నుండి వచ్చి భీష్ముడు కూలిపోయాడన్న వార్తను చెప్పడంతో ధృతరాష్ట్రుడు శోకసముద్రంలో మునుగుట. సంజయుడు యుద్ధారంభ ఘట్టాన్ని వివరించుట: శంఖారావాలు, కృష్ణుని పాంచజన్యం, అర్జునుని దేవదత్తం మోగుట. రథాన్ని ఇరుసైన్యాల మధ్య ఉంచమని అర్జునుడు కృష్ణుని కోరుట. అక్కడ గురువులు, తాతలు, సోదరులను చూసి అర్జునుడు తీవ్ర విషాదానికి గురై (అర్జున విషాద యోగము), గాండీవాన్ని జారవిడిచి 'నేను యుద్ధం చేయను' (న యోత్స్య ఇతి గోవిందం) అని రథంలో కూలబడుట. అప్పుడు జగద్గురువు శ్రీకృష్ణ పరమాత్మ 18 అధ్యాయాలు, 700 శ్లోకాలతో 'శ్రీమద్భగవద్గీత'ను ఉపదేశించుట: సాంఖ్య యోగములో ఆత్మ అమరత్వము (న జాయతే మ్రియతే వా కదాచిత్), నిష్కామ కర్మ సిద్ధాంతం (కర్మణ్యేవాధికారస్తే మా ఫలేషు కదాచన), స్థితప్రజ్ఞుని లక్షణాలు; కర్మ యోగములో లోకసంగ్రహం కోసం కర్తవ్య నిర్వహణ; జ్ఞాన యోగములో అవతార తత్వము (యదా యదా హి ధర్మస్య గ్లానిర్భవతి భారత... పరిత్రాణాయ సాధూనాం); కర్మసన్యాస యోగములో సమదర్శనము; ధ్యాన యోగములో మనోనిగ్రహం; రాజవిద్యా రాజగుహ్య యోగములో భక్తి మహిమ (పత్రం పుష్పం ఫలం తోయం); విభూతి యోగము; విశ్వరూప సందర్శన యోగములో కోటిసూర్య ప్రభాసితమైన దివ్యరూపం, కాలుడై సర్వశత్రువులను కబళించే దర్శనము; భక్తి యోగము; క్షేత్ర-క్షేత్రజ్ఞ విభాగము; గుణత్రయ విభాగము; పురుషోత్తమ ప్రాప్తి యోగము; దైవాసుర సంపద్విభాగము; శ్రద్ధాత్రయ విభాగము; మరియు మోక్షసన్యాస యోగములో సర్వధర్మ పరిత్యాగం చేసి పరమాత్మను శరణువేడుట (సర్వధర్మాన్ పరిత్యజ్య మామేకం శరణం వ్రజ). అర్జునుడు మోహము వీడి గాండీవమునెత్తి యుద్ధానికి సిద్ధమగుట. 'యత్ర యోగేశ్వరః కృష్ణో యత్ర పార్థో ధనుర్ధరః...' అని సంజయుని అమరమైన ముగింపు వాక్యము.",
    keyQuoteRoy: "The Blessed Lord said: 'Thy right is to work only, but never to its fruits; let not the fruits of action be thy motive, nor let thy attachment be to inaction. Fixed in Yoga, do thy work, O Dhananjaya, abandoning attachment and having an equal mind in failure and success. Equanimity is called Yoga!'",
    dharmaInsight: "When the soul is paralyzed by moral confusion and emotional attachment, absolute surrender to the Divine and executing one's Swadharma with detached devotion (Nishkama Karma) burns away all sin and dissolves the illusion of doership."
  },
  {
    number: 4,
    id: "yudhishthira-pradakshina",
    nameEn: "Yudhishthira-Pradakshina / Blessings Parva",
    nameSa: "युधिष्ठिराशीर्वादपर्व",
    nameTe: "యుధిష్ఠిరాశీర్వాద పర్వము (ధర్మరాజు పెద్దల పాదపూజ, భీష్మ-ద్రోణ-కృప-శల్యుల ఆశీస్సులు & యుయుత్సుని పక్షమార్పిడి)",
    sections: "Section XLIII",
    versesApprox: 120,
    keyCharacters: ["King Yudhishthira", "Grandfather Bhishma", "Dronacharya", "Kripacharya", "King Salya", "Yuyutsu", "Sri Krishna", "Arjuna"],
    summaryEn: "Just as the two colossal armies stand poised with drawn bows and leveled spears for the final signal of battle, King Yudhishthira performs an act of supreme humility and ethical majesty that stuns both hosts. Yudhishthira suddenly casts off his royal armor, lays down his divine weapons, dismounts from his chariot, and walks barefoot with folded hands straight toward the enemy lines! Arjuna, Bhima, Nakula, Sahadeva, and Sri Krishna quickly follow on foot, wondering what he intends; the Kaurava troops mock him, whispering that the eldest Pandava is terrified and coming to beg for mercy. Yudhishthira approaches Grandfather Bhishma, bends down, touches his feet with devotion, and asks: 'O Grandfather, invincible in battle, we venture to fight with thee. Grant us thy permission and bestow thy blessings upon us!' Bhishma's eyes fill with tears of joy; he embraces Yudhishthira, saying: 'O King, hadst thou not approached me thus for permission, I would have cursed thee to defeat! Though bound by material ties to fight on Duryodhana's side, my blessings are with thee: Victory shall be thine, for where Dharma is, there is Krishna, and where Krishna is, there is victory!' Yudhishthira then asks how Bhishma can be slain; Bhishma replies: 'The time of my death is not yet come; approach me again when the hour arrives.' Yudhishthira then approaches his preceptor Dronacharya, his teacher Kripacharya, and his maternal uncle King Salya of Madra, performing the same respectful obeisance. Each elder warmly blesses him with victory, confessing that their bodies belong to Duryodhana's pay, but their souls and prayers remain with the righteous Pandavas. Returning to the center of the battlefield, Yudhishthira raises his arms and makes a public moral invitation: 'Whosoever among you chooseth righteousness and desireth to fight on our side, him we welcome with open arms!' Hearing this noble call, Yuyutsu (Dhritarashtra's high-minded son by a Vaisya wife), disgusted by Duryodhana's injustice, immediately steps forward, breaks ranks with the Kauravas, and defects to the Pandava army, being warmly embraced by Yudhishthira as an adopted brother and the future savior of the Kuru lineage.",
    summaryTe: "యుద్ధం ప్రారంభమయ్యే చివరి క్షణంలో ధర్మరాజు చేసిన అపూర్వమైన ధర్మకార్యం. ధర్మరాజు తన కవచాన్ని, ఆయుధాలను విడిచి, రథం దిగి ఒంటరిగా పాదచారియై శత్రుసేన వైపు నడచుట. కౌరవులు భయపడి లొంగిపోవడానికి వస్తున్నాడని గేలి చేయుట. ధర్మరాజు నేరుగా పితామహుడు భీష్ముని వద్దకు వెళ్ళి పాదాలకు నమస్కరించి, యుద్ధానికి అనుమతించి ఆశీర్వదించమని వేడుకొనుట. భీష్ముడు ఆనందబాష్పాలతో 'నువ్వు నా వద్దకు రాకపోయి ఉంటే నేను నిన్ను శపించేవాడిని; ధర్మం నీ వైపే ఉంది, నీకే విజయమగును' అని దీవించుట. అనంతరం ద్రోణాచార్యులు, కృపాచార్యులు, మేనమామ శల్యుల వద్దకు వెళ్ళి పాదాభివందనం చేయగా, వారందరూ ధర్మరాజు వినయానికి ముగ్ధులై విజయీభవ అని ఆశీర్వదించుట. అనంతరం ధర్మరాజు రణరంగ మధ్యంలో నిలబడి 'ధర్మం వైపు నిలబడదలచినవారు ఎవరైనా మా పక్షాన చేరవచ్చు' అని పిలుపునివ్వగా, ధృతరాష్ట్రుని వైశ్య భార్యాపుత్రుడైన 'యుయుత్సుడు' కౌరవసేనను వీడి పాండవ పక్షాన చేరుట. ధర్మరాజు అతనిని ప్రేమతో ఆలింగనం చేసుకొనుట.",
    keyQuoteRoy: "Bhishma said: 'O child, if thou hadst not thus come to me before the fight, I should have cursed thee to defeat! I am pleased with thee, O son of Pandu! Fight and obtain victory! What else can I do for thee? Man is the slave of wealth, but wealth is no man's slave. I am bound to the Kauravas by their sustenance, yet I say unto thee: Victory will be thine, for where Dharma is, there is victory!'",
    dharmaInsight: "Humility before preceptors and elders disarms even invincible adversaries; respecting moral lineage (Guru-Vandana) transforms potential curses into blessings of righteous triumph."
  },
  {
    number: 5,
    id: "bhishma-vadha",
    nameEn: "Bhishma-Vadha Parva / The Ten Days' War",
    nameSa: "भीष्मवधपर्व",
    nameTe: "భీష్మవధ పర్వము (10 రోజుల మహాయుద్ధము, చక్రపాణిగా శ్రీకృష్ణుని ఆవేశం, అంపశయ్యపై పితామహుడు, బాణగంగ & కర్ణ-భీష్మ సమాగమం)",
    sections: "Sections XLIV - CXXIV",
    versesApprox: 4120,
    keyCharacters: ["Grandfather Bhishma", "Arjuna", "Bhagavan Sri Krishna", "Bhima", "King Yudhishthira", "Duryodhana", "Shikhandin", "Karna", "Dronacharya", "Iravan", "Ghatotkacha"],
    summaryEn: "The epic narration of the first ten titanic days of the Kurukshetra War: Days 1–3 (Sections XLIV–LIX): The Pandavas form the Vajra (Thunderbolt) and Krauncha Vyuhas; on the first day, young Prince Uttara (Virata's son) attacks Salya and is killed, and his valiant brother Sweta is slain by Bhishma after decimating Kaurava ranks. On the 2nd day, Arjuna duels Bhishma in an earth-shaking clash of celestial arrows, while Satyaki wounds Drona's charioteer. On the 3rd day, Bhishma deploys the Garuda array; Pandavas counter with Ardha-chandra (Crescent Moon); Bhishma unleashes apocalyptic slaughter, moving like a blazing fire in dry forest. Seeing Arjuna fighting half-heartedly out of tenderness for his grandfather, Lord Sri Krishna's divine fury surges: leaping down from the chariot, casting aside His whip, Krishna sprints across the battlefield wielding His Sudarshana Chakra (and a heavy chariot wheel), roaring with universe-shaking thunder to slay Bhishma Himself! Bhishma drops his bow, lowers his neck in joyous surrender, praying to be liberated by Krishna's hands; but Arjuna rushes forward, catches Krishna by the waist, drags his feet in the dust, and pleads: 'Restrain Thy wrath, O Kesava! Break not Thy sacred vow! I swear by my sons and brothers that I shall not falter in slaying the Kurus!' Days 4–8 (Sections LX–XCVII): Bhima's wrath explodes: on the 4th day Bhima crushes eight sons of Dhritarashtra (Senapati, Sushena, Jalasandha, Sulochana, etc.) with his thunderous mace; on the 6th and 8th days he slays fourteen more Kaurava princes. Arjuna's heroic son Iravan (by Naga princess Ulupi) slaughters Shakuni's brothers before being killed by demonic Rakshasa Alambusha; Ghatotkacha unleashes illusionary warfare causing massive panic. Terrified, Duryodhana accuses Bhishma of favoring the Pandavas; Bhishma narrates the sacred Glories of Vasudeva (Sections LXV–LXVIII), affirming that Krishna is the Supreme Lord Narayana. Day 9 (Sections XCVIII–CVIII): Bhishma deploys the Sarvatobhadra Vyuha and slaughters twenty thousand Pandava warriors; Krishna again charges Bhishma with His whip/wheel, restrained again by Arjuna. That night, King Yudhishthira and Krishna visit Bhishma's tent in despair, asking how the grandfather can be conquered. Bhishma compassionately reveals his own vulnerability: he will never strike a woman or one born female; let Shikhandin (reborn Amba) be placed directly before Arjuna! Day 10 & The Bed of Arrows (Sections CIX–CXXIV): On the 10th day, Arjuna places Shikhandin at the head of the vanguard facing Bhishma. Shikhandin showers arrows on Bhishma's chest; Bhishma smiles serenely and refuses to shoot back. Behind Shikhandin, Arjuna unleashes hundreds of razor-sharp, steel-tipped arrows, piercing every unarmored inch of Bhishma's body until there is not space for even two fingers' breadth untouched. Shortly before sunset, Grandfather Bhishma falls from his chariot! His body does not touch the earth, remaining suspended in mid-air, entirely supported upon a dense Bed of Arrows (Saratolpamu). Celestials shower divine flowers and divine drums sound. Blessed with father Santanu's boon of Iccha-Mrityu (death at will), Bhishma resolves to retain his life-breath until the holy northern solstice (Uttarayana). When his head dangles painfully, Bhishma rejects Duryodhana's silk cushions; Arjuna shoots three downward arrows into the ground, creating a perfect hero's pillow (Vira-upadhana). When parched with burning thirst, Bhishma rejects jugs of scented water; Arjuna chants a sacred mantra and shoots the Parjanyastra arrow into the earth near Bhishma's head, releasing a cool, crystal fountain of divine water (Bhogi-Surya Ganga) that gushes directly into the son of Ganga's mouth! At night, Karna arrives alone, weeps at Bhishma's feet, and asks forgiveness; Bhishma embraces him with a loving hand, reveals that he knows Karna is Kunti's firstborn son and Surya's child, forgives him, praises his peerless bravery and charity, and releases him to fight with honor.",
    summaryTe: "కురుక్షేత్ర సంగ్రామంలోని మొదటి 10 రోజుల సమగ్ర గాథ: 1 నుండి 3వ రోజు (విరాటుని కుమారులైన ఉత్తరుడు, శ్వేతుడు మరణించుట; భీష్ముని ధాటికి పాండవ సేన కకావికలగుట; అర్జునుడు తాతపై దయతో నెమ్మదిగా పోరుతుండగా చూసి, శ్రీకృష్ణుడు రథంపై నుండి దూకి, చేతిలో కొరడా విసిరి, సుదర్శన చక్రమును / రథచక్రాన్ని పైకెత్తి భీష్ముని సంహరించడానికి ఆవేశంగా పరుగెత్తుట; భీష్ముడు ఆనందంతో 'రమ్ము కృష్ణా, నీ చేతిలో మరణం నాకు మోక్షం' అని ఎదురుచూచుట; అర్జునుడు పరుగెత్తుకొచ్చి కృష్ణుని నడుము పట్టుకుని నిలువరించి, తన శపథాన్ని గుర్తుచేయుట). 4 నుండి 8వ రోజు (భీముడు గదాఘాతాలతో ధృతరాష్ట్రుని 8 మంది, ఆపై 14 మంది కుమారులను వధించుట; నాగకన్య ఉలూపి-అర్జునుల కుమారుడైన ఇరావంతుని వీరమరణం; ఘటోత్కచుని మాయాయుద్ధం; దుర్యోధనుని నిందలకు బదులుగా భీష్ముడు శ్రీకృష్ణుని దివ్య మహిమలను - వాసుదేవ మాహాత్మ్యమును వివరించుట). 9వ రోజు (భీష్ముని సర్వతోభద్ర వ్యూహం; వేలాదిమంది వీరుల సంహారం; రాత్రివేళ పాండవులు భీష్ముని గుడారానికి వెళ్ళి తమను కాపాడే మార్గాన్ని స్వయంగా భీష్ముడినే అడగగా, స్త్రీగా పుట్టిన శిఖండిని ఎదురుగా ఉంచితే తాను శస్త్రం ఎత్తబోనని భీష్ముడే స్వయంగా తన మరణ రహస్యాన్ని ఉపదేశించుట). 10వ రోజు & అంపశయ్య (శిఖండిని ముందుంచి అర్జునుడు బాణవర్షం కురిపించుట; శరీరంలో రెండంగుళాల ఖాళీ కూడా లేకుండా బాణాలు దిగబడగా సాయంత్రం వేళ భీష్ముడు రథం నుండి నేలకొరుగుట; భూమిని తాకకుండా బాణాల ముళ్ళపైనే 'అంపశయ్య' (శరతల్పము) పై నిలచుట; ఇచ్చామృత్యు వరప్రభావంతో ఉత్తరాయణ పుణ్యకాలం వరకు ప్రాణాలు నిలుపుకొనుట; తల వాలిపోగా అర్జునుడు మూడు బాణాలతో వీరతల్పం (దిండు) సమకూర్చుట; దప్పిక కాగా అర్జునుడు భూమిపై బాణం నాటి గంగను (బాణగంగ) భీష్ముని నోట్లోకి ఉద్భవింపజేయుట; రాత్రివేళ కర్ణుడు ఏకాంతంగా వచ్చి కన్నీటితో భీష్ముని క్షమాపణ కోరగా, భీష్ముడు కర్ణుని కౌగిలించుకుని కుంతీ ప్రథమ పుత్రునిగా ఆశీర్వదించి యుద్ధానికి అనుమతించుట).",
    keyQuoteRoy: "Sanjaya said: 'Covered all over with arrows, there was not two fingers' breadth of space on Bhishma's body that was free from wounds. As he fell from his car, celestial drums sounded, and showers of flowers fell from the sky. Falling, he touched not the earth, but remained supported upon the points of the arrows. Such a bed of arrows was never before seen in all the worlds!'",
    dharmaInsight: "Even the greatest, most venerable warrior cannot escape the consequences of standing on the side of Adharma; yet when one surrenders pride to Truth and greets death on a bed of arrows with tranquil wisdom, one becomes immortal."
  }
];

/* ===== VOLUME VI: DRONA PARVA - 8 UPA-PARVAS DETAIL =====
   Based directly on Pratap Chandra Roy's English Translation (Sections I - CCIV) */
const DRONA_PARVA_UPAPARVAS = [
  {
    number: 1,
    id: "dronabhisheka",
    nameEn: "Dronabhisheka Parva",
    nameSa: "द्रोणाभिषेकपर्व",
    nameTe: "ద్రోణాభిషేక పర్వము (ద్రోణుని సేనాధిపత్య పట్టాభిషేకం & ధర్మరాజును సజీవంగా బంధించే వరం)",
    sections: "Sections I - XVI",
    versesApprox: 645,
    keyCharacters: ["Dronacharya", "Duryodhana", "Karna", "King Dhritarashtra", "Sanjaya", "Arjuna", "King Yudhishthira", "Bhima", "Salya", "Abhimanyu"],
    summaryEn: "Following the fall of Grandfather Bhishma, the Kaurava army is thrown into despair, resembling a rudderless boat in a tempest. Karna enters the fray, consoles the troops, and declines supreme command, recommending the venerable preceptor Bharadwaja's son Drona as the most learned, martial, and respected hero. Duryodhana formally consecrates Drona as supreme commander (Senapati) with Vedic mantras, sanctified waters, and royal ceremonies, evoking the investiture of Skanda by the gods. Drona offers Duryodhana a boon; Duryodhana, cunningly calculating that slaying Yudhishthira would only unleash Arjuna's uncontrollable vengeance, asks Drona to capture King Yudhishthira alive so he can force him to play dice once more and send the Pandavas into permanent exile. Drona grants the boon with a solemn limitation: he will capture Yudhishthira only if Arjuna is drawn away from the king's side, for in Arjuna's presence even Indra cannot defeat the Pandavas. On the 11th day of war, Drona arrays the Kauravas in the Sakata (cart) formation, while Yudhishthira arrays the Pandavas in the Krauncha (crane) formation. Intense combats erupt: Abhimanyu routs Paurava, felling his chariot and defeating Jayadratha in single combat; Bhima and Salya fight a ferocious duel with massive iron maces until both heroes strike each other down simultaneously in a dead faint; Drona slays Kumara and Yugandhara while piercing Yudhishthira's defenses. Drona charges straight at Yudhishthira to seize him, causing panic in the Pandava ranks; but Arjuna arrives like a monsoon squall, casting a dense canopy of thousands of arrows, forcing Drona to retreat as the sun sets.",
    summaryTe: "భీష్ముని పతనం తరువాత కౌరవసేన దిక్కుతోచక అలమటించగా కర్ణుడు రణరంగంలోకి ప్రవేశించుట. దుర్యోధనుడు కర్ణుని సలహాతో ద్రోణాచార్యుని సర్వసైన్యాధ్యక్షుడిగా వేదమంత్రోచ్ఛారణల మధ్య పట్టాభిషేకం చేయుట (స్కందుని దేవసేనాధిపతిగా చేసినట్లు). ద్రోణుడు వరం కోరుకొమ్మనగా, ధర్మరాజును చంపితే అర్జునుడు అందరినీ అంతం చేస్తాడని, కనుక ధర్మరాజును 'సజీవంగా బంధించి' తెచ్చిస్తే మళ్ళీ జూదమాడించి అడవులకు పంపవచ్చని దుర్యోధనుడు కుటిల ఆలోచనతో కోరుకొనుట. అర్జునుడు ధర్మరాజు చెంత లేనప్పుడే ఇది సాధ్యమని ద్రోణుడు షరతు విధించుట. 11వ రోజు యుద్ధంలో ద్రోణుడు శకట వ్యూహం, ధర్మరాజు క్రౌంచ వ్యూహం పన్నుట. అభిమన్యుడు పౌరవుని ఓడించి జయద్రథుని ఖడ్గయుద్ధంలో నిలువరించుట; భీమ-శల్యుల భయంకర గదాయుద్ధంలో ఇద్దరూ ఒకేసారి మూర్ఛిల్లుట; ద్రోణుడు కుమార, యుగంధరులను వధించి ధర్మరాజును బంధించడానికి దూసుకురాగా, సూర్యాస్తమయ సమయానికి గాండీవధారియైన అర్జునుడు బాణవర్షంతో ద్రోణుని అడ్డుకుని ధర్మరాజును రక్షించుట.",
    keyQuoteRoy: "Drona said: 'If the heroic Arjuna do not protect Yudhishthira in battle, thou mayst think the eldest Pandava as already brought under thy control. But in Phalguni's presence, O king, Yudhishthira is incapable of being taken in battle even by the gods and the Asuras headed by Indra!'",
    dharmaInsight: "Even the most accomplished preceptor compromises his moral stature when he places his divine martial knowledge at the service of an unrighteous monarch's deceitful ambitions."
  },
  {
    number: 2,
    id: "samsaptaka-badha",
    nameEn: "Samsaptakabadha Parva",
    nameSa: "संशप्तकबधपर्व",
    nameTe: "సంశప్తక వధ పర్వము (త్రిగర్తుల మరణ శపథం, వైష్ణవాస్త్ర సంహారం & భగదత్తుని Supratika ఏనుగు వధ)",
    sections: "Sections XVII - XXXII",
    versesApprox: 680,
    keyCharacters: ["Arjuna", "Bhagavan Sri Krishna", "King Susarman", "King Bhagadatta", "Bhima", "Dronacharya", "Satyajit", "King Yudhishthira"],
    summaryEn: "To enable Drona's capture of Yudhishthira on the 12th day, King Susarman of Trigarta and his five heroic brothers, joined by tens of thousands of warriors and the Narayani Sena, perform funerary rites, ignite sacred fires, and take the dreadful death-oath as Samsaptakas (warriors sworn to victory or death). They challenge Arjuna to the southern field, knowing Arjuna never declines a challenge. Arjuna entrusts Yudhishthira's defense to Panchala hero Satyajit and departs with Sri Krishna. Arjuna faces a swirling ocean of Samsaptaka chariots; blowing the Devadatta conch, he unleashes the Tvashtra weapon, creating thousands of phantom images of himself and Krishna that cause the enemies to slaughter one another in madness, followed by the Vayavya weapon that lifts thousands of enemy cars, elephants, and soldiers into the sky like dry leaves. Meanwhile, Drona arrays the Kauravas in the Garuda formation and strikes the Pandava center; Satyajit cuts Drona's bows repeatedly but Drona beheads him with a crescent-shaped shaft; Yudhishthira flees to safety. King Bhagadatta of Pragjyotisha, mounted on his colossal, terrifying war-elephant Supratika, assaults the Pandavas, scattering Bhima and their ranks; Bhima ducks beneath Supratika's belly (Anjalikabedha) and strikes with bare fists. Arjuna rushes to the rescue; Bhagadatta hurls his iron dart empowered with the irresistible Vaishnava Astra at Arjuna's chest. Lord Sri Krishna steps forward and receives the cosmic missile on His chest, where it turns into a fragrant triumphal garland of lotuses (Vaijayanti mala). Krishna explains that the weapon belonged to His own manifestation as Vishnu and could only be reabsorbed by Himself. Arjuna then pierces Supratika's vitals, bringing the mountain-like elephant crashing down, and shoots a crescent shaft that cuts the silk band binding Bhagadatta's wrinkled brow, blinding and slaying the aged warrior.",
    summaryTe: "12వ రోజు యుద్ధంలో ధర్మరాజు నుండి అర్జునుని దూరం చేయడానికి త్రిగర్త రాజైన సుశర్మ, అతని సోదరులు యజ్ఞకుండం ఎదుట అగ్నిసాక్షిగా మరణ శపథం చేసి 'సంశప్తకులు'గా మారి అర్జునుని దక్షిణ రణరంగానికి ఆహ్వానించుట. అర్జునుడు సత్యజిత్తుకు ధర్మరాజు రక్షణ బాధ్యత అప్పగించి వెళ్ళుట. సంశప్తకులపై అర్జునుడు త్వాష్ట్ర అస్త్రాన్ని ప్రయోగించి వారిలో భ్రమ కలిగించి పరస్పరం చంపుకొనేలా చేయుట, వాయవ్యాస్త్రంతో సైన్యాలను ఎండుటాకులవలె గాల్లోకి ఎగురవేయుట. మరోవైపు ద్రోణుడు గరుడ వ్యూహం పన్ని సత్యజిత్తును సంహరించి ధర్మరాజుపై దాడి చేయుట. ప్రాగ్జ్యోతిషపు రాజైన భగదత్తుడు సుప్రతీకమనే భయంకర ఐరావత సమాన ఏనుగుపై వచ్చి భీముని, పాండవ సేనలను తొక్కివేయుట. భగదత్తుడు అర్జునునిపై తిరుగులేని 'వైష్ణవాస్త్రము'ను ప్రయోగించగా, శ్రీకృష్ణుడు తన రొమ్మును అడ్డుపెట్టి ఆ దివ్యాస్త్రాన్ని దివ్యమైన 'వైజయంతీ మాల'గా మార్చుట (ఆ అస్త్రం తనదేనని కృష్ణుడు వివరించుట). అనంతరం అర్జునుడు సుప్రతీక ఏనుగును, భగదత్తుని వధించుట.",
    keyQuoteRoy: "Kesava said: 'This celestial Vaishnava weapon, O Partha, was granted by Me of old to Narakasura. None in the three worlds could withstand it. Hence I received it upon My own breast, where it hath become a beautiful garland. Slay now that fierce foe Bhagadatta!'",
    dharmaInsight: "When mortal prowess is faced with unavoidable, cosmic annihilation, the Divine Grace (Narayana) personally interposes to shield the devoted soul and transform deadly malice into a garland of virtue."
  },
  {
    number: 3,
    id: "abhimanyu-badha",
    nameEn: "Abhimanyu-badha Parva",
    nameSa: "अभिमन्युबधपर्व",
    nameTe: "అభిమన్యు వధ పర్వము (చక్రవ్యూహ భేదనం, 16 ఏళ్ళ బాలవీరుని అద్భుత శౌర్యం, జయద్రథుని అడ్డంకి & ఆరుగురు మహారథుల అధర్మ వధ)",
    sections: "Sections XXXIII - LXXI",
    versesApprox: 1890,
    keyCharacters: ["Abhimanyu", "King Yudhishthira", "Bhima", "Jayadratha", "Dronacharya", "Karna", "Duhsasana's son", "Lakshmana", "Ashwatthaman", "Kripacharya"],
    summaryEn: "On the 13th day of war, Dronacharya constructs the terrifying, labyrinthine Chakravyuha (Padma / Wheel Array), while the Samsaptakas draw Arjuna away to the distant horizon. None among the Pandavas know how to penetrate the wheel except Arjuna, Krishna, and Pradyumna. King Yudhishthira turns in desperation to the 16-year-old Abhimanyu. Abhimanyu answers: 'My illustrious father taught me how to break into this wheel formation, but if danger overtakes me inside, I know not how to come out!' Yudhishthira, Bhima, Satyaki, and Dhrishtadyumna swear upon their lives to enter immediately behind his chariot tracks and protect him. Abhimanyu commands his charioteer Sumitra to plunge directly into the mouth of Drona's array. He breaches the wall of chariots like a lion cub leaping into a herd of cattle. But King Jayadratha of Sindhu, bearing Lord Shiva's boon granting him power to check all the Pandavas except Arjuna for a single day, rushes to the breach and repulses Yudhishthira, Bhima, and the entire host, sealing Abhimanyu inside alone! Isolated in the heart of the Kaurava army, the boy hero unleashes superhuman martial slaughter: he routs Duryodhana, slays Salya's brother, kills King Brihadbala of Kosala, decapitates Duryodhana's beloved young son Lakshmana in front of his father, and defeats Drona, Kripa, and Ashwatthaman. Panicking and enraged, six foremost Maharathas (Drona, Kripa, Karna, Ashwatthaman, Brihadbala/Kritavarman, and Duhsasana's son) surround the lone, unarmored youth in brazen violation of all Kshatriya codes: Karna shoots from behind and shatters Abhimanyu's bow; Drona cuts his bow-string; Kripa slays his horses; Kritavarman kills his charioteer. Deprived of his chariot and weapons, Abhimanyu fights on with sword and shield; when they are shattered, he hoists a heavy iron-bound chariot wheel, whirling it like Lord Vishnu with His discus, striking down dozens. When the wheel is smashed, he fights Duhsasana's son in a desperate mace duel; both fall unconscious, and as the exhausted Abhimanyu struggles to rise, Duhsasana's son strikes his head with a mace from behind. The celestials shower flowers and weep from heaven as the immortal 16-year-old attains heroic martyrdom.",
    summaryTe: "13వ రోజు యుద్ధంలో ద్రోణుడు దుర్భేద్యమైన 'చక్రవ్యూహం' (పద్మవ్యూహం) పన్నుట. అర్జునుడు సంశప్తకులచే దూరంగా తీసుకెళ్ళబడగా, వ్యూహం ఛేదించడం తెలిసినవారు లేక ధర్మరాజు చింతించుట. 16 ఏళ్ళ బాలవీరుడు అభిమన్యుడు ముందుకొచ్చి, వ్యూహం లోపలికి చొరబడడం మాత్రమే తన తండ్రి ద్వారా గర్భంలో ఉండగా విన్నానని, బయటకు రావడం తెలియదని చెప్పుట. తామంతా వెంటే రక్షణగా వస్తామని ధర్మరాజు, భీమాదులు మాటయిచ్చుట. అభిమన్యుడు సింహకిశోరంలా చక్రవ్యూహంలోకి చొరబడి కౌరవసేనలను కకావికలు చేయుట. కానీ శివుని వరప్రభావంతో జయద్రథుడు ద్వారం వద్ద పాండవులందరినీ నిలువరించి, వ్యూహ ద్వారాన్ని మూసివేయుట. ఒంటరిగా చిక్కుకున్న అభిమన్యుడు దుర్యోధనుని కుమారుడైన లక్ష్మణుని, కోసలరాజు బృహద్బలుని వధించి, ద్రోణ-కర్ణ-కృపాదులను గడగడలాడించుట. అధర్మంగా ఆరుగురు మహారథులు (ద్రోణ, కర్ణ, కృప, అశ్వత్థామ, కృతవర్మ, దుశ్శాసన కుమారుడు) చుట్టుముట్టి, వెనుక నుండి కర్ణుడు విల్లు విరగ్గొట్టగా, గుర్రాలు, రథం ధ్వంసం చేయుట. అభిమన్యుడు రథచక్రాన్ని విష్ణుచక్రంలా తిప్పుతూ పోరాడి, చివరకు గదతో పోరుతూ దుశ్శాసనుని కుమారుని చేతిలో వీరస్వర్గం అలంకరించుట.",
    keyQuoteRoy: "Sanjaya said: 'Slaying ten thousand warriors, Abhimanyu stood in the midst of the foe like a blazing fire. Then six great car-warriors, disregarding all rules of fair fight, encompassed that boy and broke his weapons. Even thus was slain that hero whose prowess was superhuman, and whose fame will endure as long as the world lasteth!'",
    dharmaInsight: "When unrighteousness unites to crush innocence by breaking all ethical codes, the sacrifice of the innocent marks the moral doom of the oppressors and guarantees their ultimate extinction."
  },
  {
    number: 4,
    id: "pratigya",
    nameEn: "Pratigya Parva",
    nameSa: "प्रतिज्ञापर्व",
    nameTe: "ప్రతిజ్ఞా పర్వము (అర్జునుని భీషణ శపథం — సూర్యాస్తమయం లోపు జయద్రథుని వధిస్తా లేదా అగ్నిప్రవేశం చేస్తా)",
    sections: "Sections LXXII - LXXIV",
    versesApprox: 210,
    keyCharacters: ["Arjuna", "Bhagavan Sri Krishna", "King Yudhishthira", "Jayadratha", "Duryodhana", "Dronacharya"],
    summaryEn: "Arjuna returns at dusk after slaughtering the Samsaptakas, noticing ominous omens and finding the Pandava camp plunged in weeping and deathly silence. When King Yudhishthira recounts the agonizing slaughter of 16-year-old Abhimanyu—how he fought alone, how Jayadratha blocked all relief, and how six Maharathas butchered the disarmed boy—Arjuna collapses to the earth in overwhelming anguish. Burning with tears of molten fury, his eyes shooting sparks, Arjuna touches water and roars the most terrifying oath in human memory: 'Truly do I swear before all creatures: Tomorrow before sunset, I shall slay the sinful wretch Jayadratha! If tomorrow's sun sets before Jayadratha's head is severed by my arrows, I shall enter a blazing fire and immolate myself on the funeral pyre!' The roar of Arjuna's vow, coupled with the blare of Gandiva and Devadatta, shakes the earth to its foundations. In the Kaurava camp, Jayadratha trembles in terror, drops to Duryodhana's feet, and begs to flee to his kingdom in Sindhu. Drona and Duryodhana reassure him, promising to construct a three-tiered composite array (Sakata, Padma, and Suchimukha arrays) stretching over twelve miles, with Jayadratha stationed in the deepest rear surrounded by 100,000 horsemen, 10,000 elephants, and guarded by six Maharathas (Drona, Karna, Kripa, Ashwatthaman, Salya, and Bhurisravas). That night, Lord Sri Krishna visits Arjuna's tent, leads him into deep yogic meditation, and transports his soul to Mount Kailasa. There, bowing to Lord Mahadeva, Arjuna and Krishna recite the divine hymn of praise, receiving the infallible Pashupata Astra and divine arrows for the impending trial.",
    summaryTe: "యుద్ధం ముగించుకుని తిరిగి వచ్చిన అర్జునుడు పాండవ శిబిరంలో రోదనలు చూసి దిగ్భ్రాంతి చెందుట. ధర్మరాజు ద్వారా అభిమన్యుని వీరమరణం, జయద్రథుడు ద్వారం వద్ద అడ్డుకున్న వృత్తాంతం, ఆరుగురు మహారథులు నిరాయుధుడైన బాలుని అధర్మంగా చంపిన ఘోరం విని అర్జునుడు నేలపై కూలిపోయి తీవ్ర శోకముతో రగిలిపోవుట. అనంతరం పవిత్ర జలాలను స్పృశించి సమస్త లోకాలు దద్దరిల్లేలా భీషణ ప్రతిజ్ఞ చేయుట: 'రేపు సూర్యాస్తమయం లోపు జయద్రథుని సంహరిస్తాను! ఒకవేళ సూర్యుడు అస్తమించేలోపు వాడిని చంపలేకపోతే నేనే స్వయంగా చితి పేర్చుకుని అగ్నిప్రవేశం చేస్తాను!' అని శపథం చేయుట. ఈ వార్త విని జయద్రథుడు వణికిపోయి సింధు దేశానికి పారిపోతాననగా, ద్రోణుడు 12 మైళ్ళ విస్తీర్ణంలో శకట, పద్మ, సూచీముఖ వ్యూహాలను పన్ని జయద్రథుని మధ్యలో దాచి రక్షిస్తానని అభయమిచ్చుట. ఆ రాత్రి శ్రీకృష్ణుడు అర్జునుని యోగదృష్టితో కైలాసమునకు తీసుకెళ్ళి శివుని అనుగ్రహంతో పాశుపతాస్త్రాన్ని మంత్రసహితంగా పొందింపజేయుట.",
    keyQuoteRoy: "Arjuna said: 'Hear, ye kings, this vow of mine! Tomorrow, before the sun sets, I will slay Jayadratha, the slayer of my son! If I fail to slay him before the sun goes down, I will myself enter a blazing fire! Let all the gods, Asuras, and men witness this vow!'",
    dharmaInsight: "A solemn vow taken in the defense of Dharma and justice invokes cosmic forces; but when tied to life-and-death deadlines, it demands absolute alignment between human valor and divine guidance."
  },
  {
    number: 5,
    id: "jayadratha-badha",
    nameEn: "Jayadratha-badha Parva",
    nameSa: "जयद्रथबधपर्व",
    nameTe: "జయద్రథ వధ పర్వము (14వ రోజు మహాసంగ్రామం, కృష్ణుని సూర్యగ్రహణ లీల & జయద్రథుని శిరచ్ఛేదం)",
    sections: "Sections LXXV - CLII",
    versesApprox: 3780,
    keyCharacters: ["Arjuna", "Bhagavan Sri Krishna", "Jayadratha", "Dronacharya", "Karna", "Bhima", "Satyaki", "Bhurisravas", "Vriddhakshatra", "Duryodhana"],
    summaryEn: "The epic 14th day of war unfolds with breathtaking intensity. With Arjuna's life pledged against the setting sun, Krishna drives the white-steeded chariot into the Kaurava defense. Drona blocks Arjuna's path; Arjuna circumambulates his Guru with folded hands, saying: 'Thou art my revered preceptor, not my foe!' and shoots past. Arjuna smashes the armies of the Kambojas, Yavanas, and Trigartas; he slays Srutayudha (whose divine mace rebounds upon himself when hurled at unarmed Krishna), Sudakshina, and Srutayush. When the horses are bleeding and exhausted, Krishna unyokes them on the battlefield, while Arjuna shoots arrows into the earth to create a pure lake and an arrowy stable where the steeds drink and rest before resuming the charge. Deep inside the enemy ranks, Satyaki and Bhima fight their way through Drona's forces to aid Arjuna; Bhima crushes Duryodhana's armor and slays eight more of Dhritarashtra's sons; Satyaki is engaged in a life-or-death grapple with Somadatta's son Bhurisravas, who pins Satyaki to the ground with upraised sword; Arjuna shoots an arrow that severs Bhurisravas's arm to save Satyaki's life; Bhurisravas sits in yogic Samadhi and is beheaded by Satyaki. As the shadows lengthen, Jayadratha remains shielded miles away behind Karna, Kripa, Ashwatthaman, and Salya. Seeing the sun touching the western horizon, Lord Sri Krishna deploys His divine Yogic Maya: dark celestial clouds cover the solar disc, creating an illusion of premature sunset! The jubilant Kauravas drop their guard, shout victory, and look up; Jayadratha stretches out his neck to gloat at Arjuna. Instantly Krishna commands: 'Arjuna! Behold the sun hath not set; it was but My Maya! Lo, there stands Jayadratha! Cut off his head with the celestial Gandiva shaft, but do not let it touch the ground! His father Vriddhakshatra laid a curse that whoever causes Jayadratha's head to fall to the earth shall have his own head burst into a hundred pieces!' Arjuna shoots an infallible crescent arrow that severs Jayadratha's head, carrying it through the air like a falcon over mountains, dropping it directly into the lap of his father Vriddhakshatra meditating at Samanta-panchaka. Startled, Vriddhakshatra stands up, the head rolls to the ground, and the father's head bursts into a hundred fragments. Krishna withdraws the darkness, revealing the blazing sun setting in glory!",
    summaryTe: "కురుక్షేత్రంలో అత్యంత సుదీర్ఘమైన, ఉత్కంఠభరితమైన 14వ రోజు సంగ్రామం. సూర్యాస్తమయం లోపు జయద్రథుని చేరడానికి అర్జునుడు కృష్ణుని సారథ్యంలో శత్రుసముద్రాన్ని చీల్చుకుంటూ వెళ్ళుట. మార్గంలో ద్రోణునికి ప్రదక్షిణ చేసి అనుమతి కోరి ముందుకు సాగుట; శ్రుతాయుధ, సుదక్షిణాది రాజులను వధించుట; అలసిన గుర్రాలకు నీరివ్వడానికి అర్జునుడు నేలపై బాణాలు నాటి సరస్సును, రక్షణ కొట్టాన్ని నిర్మించుట. వెనుక నుండి సాత్యకి, భీములు ద్రోణుని దాటి అర్జునుని రక్షణకు వచ్చుట; భూరిశ్రవుడు సాత్యకిని సంహరించబోగా అర్జునుడు భూరిశ్రవుని ఖడ్గహస్తాన్ని ఖండించుట. సూర్యుడు పడమటి కొండలకు చేరువవుతున్నా జయద్రథుడు కర్ణ, ద్రోణ, కృపుల వెనుక సురక్షితంగా ఉండుట. సమయం మించిపోతున్న తరుణంలో శ్రీకృష్ణుడు తన యోగమాయతో సూర్యుని మబ్బులతో కప్పి 'కృత్రిమ సూర్యాస్తమయం' సృష్టించుట. కౌరవులు సంబరాలు చేసుకుంటూ అస్త్రాలు దించగా, జయద్రథుడు తల పైకెత్తి చూచుట. అప్పుడు కృష్ణుడు 'అర్జునా! సూర్యుడు ఇంకా అస్తమించలేదు, ఇది నా మాయ! జయద్రథుని తల నేలపై పడితే నూరు ముక్కలయ్యేలా వాడి తండ్రి వృద్ధక్షత్రుని శాపం ఉంది, కనుక తల నేలపై పడకుండా ఆకాశంలోకి కొట్టు' అని హెచ్చరించుట. అర్జునుడు దివ్యాస్త్రంతో జయద్రథుని తల నరికి, బాణాల వరుసతో ఆకాశం మీదుగా సమంతపంచకంలో తపస్సు చేస్తున్న తండ్రి ఒడిలో పడేయగా, అతడు లేవడంతో తల నేలబడి తండ్రి శిరస్సు నూరు ముక్కలగుట. కృష్ణుడు మాయను ఉపసంహరించగా సూర్యుడు అస్తమించుట.",
    keyQuoteRoy: "Vasudeva said: 'Behold, Dhananjaya, the ruler of the Sindhus looketh at the setting sun, freed from fear! Today make good thy vow! Cut off his head, and let it fall into the lap of his father Vriddhakshatra, so that the curse may smite his sire and not thee!' Then with a celestial shaft, Partha severed the head of Jayadratha!",
    dharmaInsight: "When confronting malevolent oaths and dark curses, supreme wisdom and divine strategy (Yoga-Maya) preserve the righteous hero without violating cosmic justice."
  },
  {
    number: 6,
    id: "ghatotkacha-badha",
    nameEn: "Ghatotkacha-badha Parva",
    nameSa: "घटोत्कचबधपर्व",
    nameTe: "ఘటోత్కచ వధ పర్వము (భీకర రాత్రి యుద్ధము, ఘటోత్కచుని అద్భుత మాయావిహారము & కర్ణుని వాసవి శక్తి బలిదానం)",
    sections: "Sections CLIII - CLXXXIV",
    versesApprox: 1940,
    keyCharacters: ["Ghatotkacha", "Karna", "Bhagavan Sri Krishna", "Arjuna", "Duryodhana", "Alambusha", "Alayudha", "Dronacharya", "Bhima"],
    summaryEn: "Instead of halting at sunset, the infuriated armies plunge into an unprecedented Night Battle (Ratri-Yuddha), fighting by the light of millions of resin torches, bonfires, and jewel-encrusted lamps. Warriors fight in delirium, overcome by sleep and exhaustion, slaughtering comrades in the darkness. At midnight, as the nocturnal darkness peaks, Bhima's Rakshasa son Ghatotkacha waxes in supernatural might, commanding legions of spirits, swooping through the clouds, and raining burning mountains, iron wheels, and venomous serpents upon the Kauravas. Ghatotkacha kills the demonic kings Alambusha and Alayudha, obliterating whole Kaurava divisions. Duryodhana, trembling and bleeding, cries out to Karna that unless Ghatotkacha is destroyed instantly, not a single Kaurava will survive till dawn. Karna had preserved Indra's infallible celestial dart—the Vasavi Shakti (Ekaghni)—for years, keeping it worshipped with flowers solely to slay his mortal arch-rival Arjuna. Driven to utter desperation by Ghatotkacha's apocalyptic illusions, Karna seizes the blazing lightning dart and hurls it into the night sky. The divine missile pierces Ghatotkacha's heart and returns to heaven. Knowing his death has arrived, Ghatotkacha performs his crowning act of heroic loyalty: expanding his body to colossal, mountain-like dimensions, he deliberately hurls his massive falling corpse down upon an entire Akshauhini of Kaurava soldiers, crushing one-fourth of their army beneath his weight! While the Pandavas weep bitterly for Ghatotkacha, Lord Sri Krishna leaps in divine ecstasy upon the chariot, embraces Arjuna, and dances with joy. When Arjuna asks why He rejoices at the martyrdom of their nephew, Krishna reveals: 'Arjuna, know that today thou hast been saved from certain death! As long as Karna held Indra's Shakti, neither thy Gandiva, nor divine armor, nor the three worlds could have saved thee. Today Karna hath lost his supreme fang; he is now mortal, and thy triumph is assured!'",
    summaryTe: "14వ రోజు రాత్రి యుద్ధం విరమించకుండా కోట్లాది దివిటీలు (మషాల్స్) వెలుగులో చరిత్రలోనే అపూర్వమైన 'రాత్రి యుద్ధం' కొనసాగుట. నిద్రమత్తు, భ్రాంతితో సైనికులు స్వపక్షీయులనే చంపుకొనుట. అర్ధరాత్రి వేళ రాక్షసులకు బలం పెరుగుతుందన్న నియమంతో భీమపుత్రుడైన ఘటోత్కచుడు ఆకాశంలోకి లేచి పర్వతాలు, నిప్పులు, చక్రాలు కురిపిస్తూ మాయాయుద్ధం చేయుట. అలంబసుడు, అలాయుధుడనే రాక్షస వీరులను వధించి కౌరవసేనలను ఊచకోత కోయుట. కౌరవసేన అంతరించిపోతుందని భయపడి దుర్యోధనుడు కర్ణుని బ్రతిమాలుట. అర్జునుని సంహరించడానికి ఇంద్రుని నుండి పొంది పూజిస్తూ దాచుకున్న 'వాసవి శక్తి' (ఏకఘ్ని / అమోఘమైన దివ్యబాణం)ని విధిలేక కర్ణుడు ఘటోత్కచునిపై ప్రయోగించుట. ఆ దివ్యాస్త్రం రొమ్మును చీల్చగా, ఘటోత్కచుడు చనిపోతూ కూడా తన శరీరాన్ని పర్వతాకారంగా పెంచి, కిందనున్న కౌరవ అక్షౌహిణి సైన్యంపై కూలి వేలాదిమంది శత్రువులను తొక్కి చంపుట. పాండవులంతా రోదిస్తుండగా, శ్రీకృష్ణుడు పరమానందంతో నాట్యమాడుతూ అర్జునుని కౌగిలించుకొనుట. ఘటోత్కచుని బలిదానం వల్ల కర్ణుని వద్ద ఉన్న అజేయమైన వాసవి శక్తి నాశనమై అర్జునుని ప్రాణాలు కాపాడబడ్డాయని కృష్ణుడు అంతరంగాన్ని విప్పుట.",
    keyQuoteRoy: "Vasudeva said: 'Rejoice, O Dhananjaya! Suta's son hath today hurled that dart which he had kept for thee! As long as that weapon of Indra remained with Karna, thou wert not safe in battle. Ghatotkacha hath by his death preserved thee, and delivered victory into thy hands!'",
    dharmaInsight: "A selfless martyr's sacrifice can absorb the most lethal weapon destined for the righteous cause, neutralizing the ultimate threat and ensuring the triumph of Dharma."
  },
  {
    number: 7,
    id: "drona-badha",
    nameEn: "Drona-badha Parva",
    nameSa: "द्रोणबधपर्व",
    nameTe: "ద్రోణవధ పర్వము (అశ్వత్థామ హతః కుంజరః — ధర్మరాజు అసత్య ప్రవచనం & ద్రోణాచార్యుని శస్త్రసన్యాస నిర్యాణము)",
    sections: "Sections CLXXXV - CXCIII",
    versesApprox: 690,
    keyCharacters: ["Dronacharya", "King Yudhishthira", "Bhagavan Sri Krishna", "Bhima", "Dhrishtadyumna", "Ashwatthaman", "Arjuna"],
    summaryEn: "On the 15th morning of the war, Drona fights with universe-destroying fury, invoking the Brahmashira weapon and slaughtering tens of thousands of ordinary troops. Seven celestial Rishis (Agastya, Bhrigu, Angiras, and Kasyapa) appear in the sky, rebuking Drona: 'Thou art a Brahmana versed in the Vedas, fighting unrighteously; thy time on earth is ended; lay down thy arms!' Lord Krishna warns that Drona cannot be defeated by weapons while he holds his bow, and will lay down his arms only if he hears that his beloved son Ashwatthaman is slain. Bhima slays a gigantic royal war-elephant belonging to King Indravarman of Malava named Ashwatthaman, and roars: 'Ashwatthaman is slain!' Drona refuses to believe Bhima, knowing his son's divine power. Drona turns to King Yudhishthira, whose lips had never spoken an untruth. Krishna urges Yudhishthira: 'O King, if Drona fights for half a day more, thy army will be wiped out; speak a righteous untruth to preserve Dharma!' Yudhishthira utters the famous words: 'Ashwatthama hatah... (loudly) iti kunjaraḥ (whispered inaudibly as Krishna blows His conch)'. At that instant, Yudhishthira's chariot, which had floated four fingers' breadth above the earth his entire life due to his pristine truthfulness, drops down and touches the mortal ground! Believing his son is dead, Drona drops his bow and weapons, sits in the lotus posture upon the terrace of his chariot, and enters deep yogic Samadhi, projecting his soul into the realm of Brahman. Dhrishtadyumna leaps onto the chariot, draws his sword, and severs Drona's head from his body, fulfilling his destiny as born from the sacred fire for Drona's destruction.",
    summaryTe: "15వ రోజు ఉదయం ద్రోణుడు బ్రహ్మశిరోనామకాస్త్రాన్ని ప్రయోగించి లక్షలాది సైనికులను భస్మం చేయుట. అగస్త్య, భృగు, కశ్యపాది మహర్షులు ఆకాశంలో ప్రత్యక్షమై 'బ్రాహ్మణుడవై వేదాధ్యయనం వీడి ఘోర హింస చేస్తున్నావు, నీ ఆయువు తీరింది, శస్త్రాలు విడిచిపెట్టు' అని హెచ్చరించుట. ధనుస్సు చేతబట్టిన ద్రోణుని ఎవరూ జయించలేరని, కుమారుడైన అశ్వత్థామ మరణవార్త వింటేనే శస్త్రాలు విడిచిపెడతాడని కృష్ణుడు ఉపాయం చెప్పుట. మాళవరాజు ఇంద్రవర్మకు చెందిన 'అశ్వత్థామ' అనే ఏనుగును భీముడు చంపి 'అశ్వత్థామ హతమయ్యాడు' అని అరచుట. ద్రోణుడు నమ్మక, ఎన్నడూ అసత్యం పలకని ధర్మరాజును అడుగగా, కృష్ణుని ఆదేశంతో ధర్మరాజు 'అశ్వత్థామ హతః... (బిగ్గరగా) కుంజరః (ఏనుగు అని నెమ్మదిగా శంఖధ్వనిలో)' పలికెను. ఆ క్షణంలోనే ధర్మరాజు రథం ఎల్లప్పుడూ నేలకు నాలుగు అంగుళాల ఎత్తున తేలుతుండే మహత్యం కోల్పోయి భూమిని తాకెను! పుత్రశోకంతో ద్రోణుడు విల్లంబులు జారవిడిచి, రథంపై పద్మాసనంలో కూర్చుని యోగసమాధిలోకి వెళ్ళి బ్రహ్మపదం చేరుకొనుట. ద్రుపదపుత్రుడైన దృష్టద్యుమ్నుడు రథంపైకి దూకి ఖడ్గంతో ద్రోణుని శిరస్సును ఖండించి తన జన్మలక్ష్యాన్ని నెరవేర్చుకొనుట.",
    keyQuoteRoy: "Vaisampayana said: 'Hearing those words of Yudhishthira, Drona became exceedingly cheerless. Casting aside his weapons, and sitting in Yoga on his car, he gave up his life, and his effulgence ascended to heaven. Then Prishata's son severed the head of that preceptor of the Kurus!'",
    dharmaInsight: "Even the most righteous king must bear the cosmic weight of deceit; when human duty clashes with absolute Truth, compromise stains the soul, proving that Truth alone is the supreme sovereign."
  },
  {
    number: 8,
    id: "narayana-astra-prayoga",
    nameEn: "Narayana-astra Prayoga Parva",
    nameSa: "नारायणास्त्रप्रयोगपर्व",
    nameTe: "నారాయణాస్త్ర ప్రయోగ పర్వము (అశ్వత్థామ ప్రతీకారం, సంపూర్ణ శరణాగతి తత్వము & నర-నారాయణ తత్వ దర్శనం)",
    sections: "Sections CXCIV - CCIV",
    versesApprox: 590,
    keyCharacters: ["Ashwatthaman", "Bhagavan Sri Krishna", "Arjuna", "Bhima", "King Yudhishthira", "Maharshi Vyasa"],
    summaryEn: "Learning of his father's death and the dishonorable severing of his head, Ashwatthaman is consumed by volcanic fury. He invokes the supreme, universe-destroying Narayana Astra, gifted to Drona by Lord Narayana Himself. The weapon manifests millions of blazing iron discs, fiery arrows, and roaring celestial missiles that consume all who resist or bear arms. As the Pandava army faces imminent incineration, Lord Sri Krishna proclaims the only salvation against the Narayana weapon: 'Lay down your weapons instantly! Dismount from all cars and steeds! Cast off all hostile thoughts and bow your heads to the earth in complete surrender! Against the Narayana weapon, any weapon raised only multiplies its fury a thousandfold; only absolute, defenseless surrender can quench it!' The entire Pandava host disarms and prostrates, causing the celestial flames to pass harmlessly over them. Only Bhima stubbornly refuses, roaring defiance and whirling his mace. The fiery discs converge solely upon Bhima, threatening to burn him to ashes. Krishna and Arjuna leap forward, drag Bhima down from his chariot, strip the mace from his hands, and force him to kneel before the weapon, causing the celestial fire to dissipate peacefully. Foiled, Ashwatthaman unleashes the Agneya weapon, but Arjuna counters it with the Brahma weapon. Weeping in defeat and confusion, Ashwatthaman encounters Maharshi Vyasa, who explains that the Pandavas are invincible because they are protected by Lord Narayana Himself, and that Krishna and Arjuna are none other than the eternal twin sages Nara and Narayana, concluding the momentous Drona Parva.",
    summaryTe: "తండ్రి మరణం, శిరచ్ఛేదం విని అశ్వత్థామ రౌద్రంతో రగిలిపోయి, ద్రోణునికి నారాయణుడిచ్చిన పరమ విధ్వంసకర 'నారాయణాస్త్రము'ను ప్రయోగించుట. ఆకాశమంతా అగ్నిగోళాలు, చక్రాలు, బాణాలు వ్యాపించి పాండవ సేనను దహించసాగెను. అప్పుడు శ్రీకృష్ణుడు ఏకైక రక్షణ మార్గాన్ని ఉపదేశించుట: 'వెంటనే ఆయుధాలు విడిచిపెట్టండి! రథాలు, గుర్రాలు దిగి నేలపై పడుకుని శరణాగతి చేయండి! మనసులో కూడా యుద్ధ ఆలోచన చేయవద్దు! నారాయణాస్త్రం ఎదురుతిరిగే కొద్దీ వెయ్యిరెట్లవుతుంది, సంపూర్ణ శరణాగతి మాత్రమే దానిని శాంతింపజేస్తుంది!' అని ఆజ్ఞాపించుట. అందరూ ఆయుధాలు విడిచి సాష్టాంగపడగా, భీముడు ఒక్కడే మొండిగా గద తిప్పుతూ ఎదిరించగా అస్త్రమంతా భీమునిపైకి కేంద్రీకృతమగుట. కృష్ణార్జునులు పరుగెత్తుకొచ్చి భీముని బలవంతంగా రథం దింపి, గదను లాగేసి నేలపై పడుకోబెట్టడంతో నారాయణాస్త్రం శాంతించుట. అశ్వత్థామ ఆగ్రహంతో ఆగ్నేయాస్త్రాన్ని వేసినా అర్జునుడు బ్రహ్మాస్త్రంతో అడ్డుకొనుట. వ్యాస భగవానుడు అశ్వత్థామకు ప్రత్యక్షమై శ్రీకృష్ణార్జునులే సనాతన నర-నారాయణులని, ధర్మం వారి వైపే ఉందని బోధించుటతో ద్రోణ పర్వం పరిసమాప్తమగుట.",
    keyQuoteRoy: "Vasudeva said: 'Speedily lay down your weapons! Alight from your cars and steeds! This is the means of baffling this weapon, as ordained by the high-souled Narayana Himself! If any one fighteth against it, it will destroy him; but if ye surrender without arms, it will not slay you!'",
    dharmaInsight: "Against the supreme Divine Will (Narayana), pride and physical resistance bring inevitable ruin; only absolute self-surrender (Saranagati) and ego-less humility dissolve wrath and grant salvation."
  }
];

/* ===== MAHABHARATA 12-VOLUME MASTER MAPPING =====
   Systematic alignment of Pratap Chandra Roy's 12-Volume Canonical Translation */
const MAHABHARATA_VOLUMES = [
  {
    volNumber: 1,
    titleEn: "Volume I: Adi Parva (Book of the Beginning)",
    titleTe: "సంపుటము 1: ఆది పర్వము",
    parvaId: "adi",
    upaParvasCount: 19,
    status: "COMPLETE",
    sections: "Sections I - CCXXXVI",
    description: "Cosmic origins, snake sacrifice, Kuru ancestry, training, Lac House, Bakasura, Draupadi Swayamvara, Khandava forest."
  },
  {
    volNumber: 2,
    titleEn: "Volume II: Sabha Parva & Vana Parva (Part I)",
    titleTe: "సంపుటము 2: సభా పర్వము & వన పర్వము (భాగం 1)",
    parvaId: "sabha_vana1",
    upaParvasCount: 17,
    status: "COMPLETE",
    sections: "Sabha Sections I - LXXXI; Vana Sections I - CXIII",
    description: "Mayasabha, Jarasandha slaying, Digvijaya, Rajasuya, Sisupala, Dice Game, Disrobing of Draupadi, Akshaya Patra, Pashupatastra, Nala-Damayanti."
  },
  {
    volNumber: 3,
    titleEn: "Volume III: Vana Parva (Last Part)",
    titleTe: "సంపుటము 3: వన పర్వము (ఉత్తర భాగం)",
    parvaId: "vana2",
    upaParvasCount: 12,
    status: "COMPLETE",
    sections: "Sections CXIV - CCCXIII",
    description: "Bhima meets Hanuman, Saugandhika lotus, Yaksha battle, Nivata-Kavacha destruction, Nahusha serpent, Markandeya discourses, Savitri & Satyavan, Karna's armor & earrings, Yaksha Prashna."
  },
  {
    volNumber: 4,
    titleEn: "Volume IV: Virata Parva & Udyoga Parva",
    titleTe: "సంపుటము 4: విరాట పర్వము & ఉద్యోగ పర్వము",
    parvaId: "virata_udyoga",
    upaParvasCount: 16,
    status: "COMPLETE",
    sections: "Virata Sections I - LXXII; Udyoga Sections I - CXCIX",
    description: "Ajnata-vasa in Matsya, Kichaka-badha, Goharana war & Sammohana weapon, Abhimanyu-Uttara wedding, Sainyodyoga, Vidura Niti, Sanatsujatiya, Krishna's Peace Embassy (రాయబారం), Cosmic Vishwaroopa in court, Karna-Kunti dialogue, Bhishma's Rathatiratha rating, Amba-Shikhandin history."
  },
  {
    volNumber: 5,
    titleEn: "Volume V: Bhishma Parva",
    titleTe: "సంపుటము 5: భీష్మ పర్వము",
    parvaId: "bhishma",
    upaParvasCount: 5,
    status: "COMPLETE",
    sections: "Sections I - CXXIV",
    description: "Portents of Kurukshetra, Sanjaya's Divya-Drishti, geography of Earth & Meru, Srimad Bhagavad Gita (18 Chapters complete), Yudhishthira touching elders' feet, Yuyutsu's defection, 10 days of fierce war, Krishna charging with chariot wheel, fall of Grandfather Bhishma on Bed of Arrows (శరతల్పము), Ganga water spring, and secret night reconciliation with Karna."
  },
  {
    volNumber: 6,
    titleEn: "Volume VI: Drona Parva",
    titleTe: "సంపుటము 6: ద్రోణ పర్వము",
    parvaId: "drona",
    upaParvasCount: 8,
    status: "COMPLETE",
    sections: "Sections I - CCIV",
    description: "Dronabhisheka, Samsaptakas, Vaishnavastra garland, Chakravyuha, martyrdom of Abhimanyu, Arjuna's Pratigya, Jayadratha Vadha, epic Night Battle, Ghatotkacha's colossal sacrifice, fall of Drona (Ashwatthama Hatah Kunjara), and Narayana Astra."
  },
  {
    volNumber: 7,
    titleEn: "Volume VII: Karna Parva & Shalya Parva",
    titleTe: "సంపుటము 7: కర్ణ పర్వము & శల్య పర్వము",
    parvaId: "karna_shalya",
    upaParvasCount: 5,
    status: "PLANNED",
    sections: "Karna Sections I - LXIX; Shalya Sections I - LIX",
    description: "Duhsasana's blood drunk, Karna vs Arjuna duel, Shalya slain, Dvaipayana lake, Bhima vs Duryodhana mace duel."
  },
  {
    volNumber: 8,
    titleEn: "Volume VIII: Sauptika Parva & Stree Parva",
    titleTe: "సంపుటము 8: సౌప్తిక పర్వము & స్త్రీ పర్వము",
    parvaId: "sauptika_stree",
    upaParvasCount: 8,
    status: "PLANNED",
    sections: "Sauptika Sections I - XVIII; Stree Sections I - XXVII",
    description: "Nocturnal raid, Upapandavas slain, Brahmashira, Gandhari's lament, Gandhari's curse to Krishna, Karna's secret."
  },
  {
    volNumber: 9,
    titleEn: "Volume IX: Shanti Parva (Part I - Rajadharma)",
    titleTe: "సంపుటము 9: శాంతి పర్వము (రాజధర్మము)",
    parvaId: "shanti1",
    upaParvasCount: 1,
    status: "PLANNED",
    sections: "Sections I - CXXVIII",
    description: "Yudhishthira's grief, Bhishma's supreme discourse on governance, justice, leadership, and statecraft from arrow bed."
  },
  {
    volNumber: 10,
    titleEn: "Volume X: Shanti Parva (Part II - Mokshadharma)",
    titleTe: "సంపుటము 10: శాంతి పర్వము (మోక్షధర్మము)",
    parvaId: "shanti2",
    upaParvasCount: 2,
    status: "PLANNED",
    sections: "Sections CXXIX - CCCLIII",
    description: "Apaddharma, Mokshadharma, Samkhya, Yoga, Sulabha-Janaka dialogue, cosmic liberation."
  },
  {
    volNumber: 11,
    titleEn: "Volume XI: Anushasana Parva",
    titleTe: "సంపుటము 11: అనుశాసన పర్వము",
    parvaId: "anushasana",
    upaParvasCount: 2,
    status: "PLANNED",
    sections: "Sections I - CLIV",
    description: "Sri Vishnu Sahasranama Stotram, Shiva Sahasranama, Dana Dharma, passing of Grandfather Bhishma (ఉత్తరాయణ పుణ్యకాలం)."
  },
  {
    volNumber: 12,
    titleEn: "Volume XII: Ashvamedhika to Svargarohana Parva",
    titleTe: "సంపుటము 12: ఆశ్వమేధిక నుండి స్వర్గారోహణ పర్వము",
    parvaId: "ashvamedha_svarga",
    upaParvasCount: 8,
    status: "PLANNED",
    sections: "Ashvamedhika, Ashramavasika, Mausala, Mahaprasthanika, Svargarohana & Harivamsa",
    description: "Anugita, sacrificial horse, departure of Krishna, submergence of Dvaraka, ascent of Mount Meru, dog test, Vaikuntha reunion."
  }
];

// Export to window
if (typeof window !== 'undefined') {
  window.MAHABHARATA_METADATA = MAHABHARATA_METADATA;
  window.MAHABHARATA_PARVAS = MAHABHARATA_PARVAS;
  window.ADI_PARVA_UPAPARVAS = ADI_PARVA_UPAPARVAS;
  window.SABHA_PARVA_UPAPARVAS = SABHA_PARVA_UPAPARVAS;
  window.VANA_PARVA_PART1_UPAPARVAS = VANA_PARVA_PART1_UPAPARVAS;
  window.VANA_PARVA_PART2_UPAPARVAS = VANA_PARVA_PART2_UPAPARVAS;
  window.VIRATA_PARVA_UPAPARVAS = VIRATA_PARVA_UPAPARVAS;
  window.UDYOGA_PARVA_UPAPARVAS = UDYOGA_PARVA_UPAPARVAS;
  window.BHISHMA_PARVA_UPAPARVAS = BHISHMA_PARVA_UPAPARVAS;
  window.DRONA_PARVA_UPAPARVAS = DRONA_PARVA_UPAPARVAS;
  window.MAHABHARATA_VOLUMES = MAHABHARATA_VOLUMES;
  window.MAHABHARATA_CHARACTERS = MAHABHARATA_CHARACTERS;
}

