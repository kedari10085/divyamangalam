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
    upaParvasCount: 17,
    status: "PLANNED",
    sections: "Virata Sections I - LXXII; Udyoga Sections I - CXCVI",
    description: "Agyatavasa, Keechaka Vadha, Gograhana, Vidura Niti, Sanatsujatiya, Krishna's Peace Embassy (రాయబారం), Vishwaroopa."
  },
  {
    volNumber: 5,
    titleEn: "Volume V: Bhishma Parva",
    titleTe: "సంపుటము 5: భీష్మ పర్వము",
    parvaId: "bhishma",
    upaParvasCount: 5,
    status: "PLANNED",
    sections: "Sections I - CXVII",
    description: "Srimad Bhagavad Gita, 10 days of ferocious war, fall of Bhishma on the bed of arrows (శరతల్పము)."
  },
  {
    volNumber: 6,
    titleEn: "Volume VI: Drona Parva",
    titleTe: "సంపుటము 6: ద్రోణ పర్వము",
    parvaId: "drona",
    upaParvasCount: 8,
    status: "PLANNED",
    sections: "Sections I - CLXX",
    description: "Chakravyuha, martyrdom of Abhimanyu, Jayadratha Vadha, night battle, Ghatotkacha sacrifice, fall of Dronacharya."
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
  window.MAHABHARATA_VOLUMES = MAHABHARATA_VOLUMES;
  window.MAHABHARATA_CHARACTERS = MAHABHARATA_CHARACTERS;
}

