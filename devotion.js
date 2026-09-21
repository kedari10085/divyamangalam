/* Shared devotional UI. Scripture transliteration is not a translation. */
(() => {
  const messages = {
    music: ['Devotional Music', 'भक्ति संगीत', 'భక్తి సంగీతం'],
    home: ['Home', 'मुख्य पृष्ठ', 'ముఖ్య పేజీ'],
    gods: ['Choose Deity', 'आराध्य चुनें', 'దేవతను ఎంచుకోండి'],
    archana: ['Digital Archana', 'डिजिटल अर्चना', 'డిజిటల్ అర్చన'],
    chalisa: ['Hanuman Chalisa', 'हनुमान चालीसा', 'హనుమాన్ చాలీసా'],
    shlokas: ['Shlokas', 'श्लोक', 'శ్లోకాలు'],
    about: ['About', 'परिचय', 'మా గురించి'],
    contact: ['Contact', 'संपर्क', 'సంప్రదించండి'],
    language: ['Language', 'भाषा', 'భాష'],
    stop: ['Stop listening', 'श्रवण रोकें', 'వినడం ఆపండి'],
    listen: ['Listen to words', 'शब्द सुनें', 'పదాలను వినండి'],
    voiceNote: ['Browser voice, not a priest recording. Pronunciation varies by device.', 'ब्राउज़र की आवाज़, पुजारी की रिकॉर्डिंग नहीं। उच्चारण उपकरण पर निर्भर है।', 'బ్రౌజర్ స్వరం మాత్రమే, పూజారి రికార్డింగ్ కాదు. ఉచ్చారణ పరికరాన్ని బట్టి మారుతుంది.'],
    scope: ['Navigation and new devotional controls support three languages. Some older descriptions remain in English. Telugu prayer text is script transliteration, not translation.', 'नेविगेशन और नए भक्ति विकल्प तीन भाषाओं में हैं। कुछ पुराने विवरण अंग्रेज़ी में हैं। तेलुगु प्रार्थना-पाठ लिप्यंतरण है, अनुवाद नहीं।', 'నావిగేషన్, కొత్త భక్తి నియంత్రణలు మూడు భాషల్లో ఉన్నాయి. కొన్ని పాత వివరణలు ఆంగ్లంలోనే ఉన్నాయి. తెలుగు ప్రార్థన పాఠం లిప్యంతరీకరణ మాత్రమే, అనువాదం కాదు.'],
    ready: ['Choose a prayer to listen.', 'सुनने के लिए प्रार्थना चुनें।', 'వినడానికి ప్రార్థనను ఎంచుకోండి.'],
    reading: ['Reading prayer · browser voice', 'प्रार्थना पाठ · ब्राउज़र की आवाज़', 'ప్రార్థన పఠనం · బ్రౌజర్ స్వరం'],
    finished: ['Reading complete. Om Shanti.', 'पाठ पूर्ण। ॐ शांति।', 'పఠనం పూర్తయింది. ఓం శాంతి.'],
    unavailable: ['This voice is unavailable. Please read the visible words or choose a recording.', 'यह आवाज़ उपलब्ध नहीं है। पाठ पढ़ें या रिकॉर्डिंग चुनें।', 'ఈ స్వరం అందుబాటులో లేదు. కనిపించే పదాలను చదవండి లేదా రికార్డింగ్ ఎంచుకోండి.'],
    libraryTitle: ['A prayer for every heart.', 'हर हृदय के लिए एक प्रार्थना।', 'ప్రతి హృదయానికి ఒక ప్రార్థన.'],
    libraryIntro: ['Choose your deity. Read the words, listen with devotion, and offer your namaskaram.', 'अपने आराध्य को चुनें। शब्द पढ़ें, भक्ति से सुनें और नमस्कार अर्पित करें।', 'మీ ఆరాధ్య దేవతను ఎంచుకోండి. పదాలను చదవండి, భక్తితో వినండి, నమస్కరించండి.'],
    mantra: ['Moola mantra', 'मूल मंत्र', 'మూల మంత్రం'],
    names: ['Selected sacred names', 'चयनित पवित्र नाम', 'ఎంచుకున్న పవిత్ర నామాలు'],
    offerings: ['Offering mantras', 'समर्पण मंत्र', 'సమర్పణ మంత్రాలు'],
    recording: ['Existing recording links', 'मौजूदा रिकॉर्डिंग लिंक', 'ప్రస్తుత రికార్డింగ్ లింకులు'],
    sourceNote: ['External recordings may be unavailable. Links already existed in this site; availability, attribution and reuse rights need owner verification.', 'बाहरी रिकॉर्डिंग अनुपलब्ध हो सकती हैं। ये लिंक पहले से साइट में थे; उपलब्धता, श्रेय और उपयोग अधिकार की पुष्टि आवश्यक है।', 'బాహ్య రికార్డింగులు అందుబాటులో లేకపోవచ్చు. ఇవి ఇప్పటికే సైట్‌లో ఉన్న లింకులు; లభ్యత, మూలం, వినియోగ హక్కులను యజమాని నిర్ధారించాలి.'],
    find: ['Find recordings on YouTube', 'YouTube पर रिकॉर्डिंग खोजें', 'YouTubeలో రికార్డింగులు వెతకండి'],
    videoTitle: ['Listen to your chosen YouTube performance', 'अपनी चुनी हुई YouTube प्रस्तुति सुनें', 'మీరు ఎంచుకున్న YouTube ప్రదర్శన వినండి'],
    videoNote: ['Paste a video link from a channel you trust. Loading connects to YouTube; embedding may be disabled by the publisher. No video is labeled live or official by this site.', 'विश्वसनीय चैनल का वीडियो लिंक डालें। लोड करने पर YouTube से संपर्क होता है; प्रकाशक एम्बेड रोक सकता है। साइट किसी वीडियो को लाइव या आधिकारिक नहीं बताती।', 'మీరు నమ్మే ఛానల్ వీడియో లింక్ ఇవ్వండి. లోడ్ చేస్తే YouTubeకి కనెక్ట్ అవుతుంది; ప్రచురణకర్త ఎంబెడ్‌ను నిలిపివేయవచ్చు. సైట్ వీడియోను ప్రత్యక్షం లేదా అధికారికం అని పేర్కొనదు.'],
    load: ['Load chosen video', 'चुना वीडियो खोलें', 'ఎంచుకున్న వీడియో తెరవండి'],
    removeVideo: ['Close video', 'वीडियो बंद करें', 'వీడియో మూసివేయండి'],
    invalidVideo: ['Enter a valid YouTube video URL.', 'मान्य YouTube वीडियो URL डालें।', 'సరైన YouTube వీడియో URL ఇవ్వండి.'],
    optional: ['Optional instrumental ambience', 'वैकल्पिक वाद्य वातावरण', 'ఐచ్ఛిక వాద్య సంగీతం'],
    compose: ['Play original gentle melody', 'मृदु मौलिक धुन सुनें', 'మృదువైన స్వరరచన వినండి'],
    compositionNote: ['An original synthesized instrumental pattern, not a traditional chant or a healing treatment. 432 Hz tones remain optional.', 'मौलिक कृत्रिम वाद्य धुन; पारंपरिक मंत्र या उपचार नहीं। 432 Hz स्वर वैकल्पिक हैं।', 'స్వయంగా రూపొందించిన కృత్రిమ వాద్య స్వరాలు; సాంప్రదాయ మంత్రం లేదా చికిత్స కాదు. 432 Hz స్వరాలు ఐచ్ఛికం.'],
    om: ['Om prayer · browser voice', 'ॐ प्रार्थना · ब्राउज़र आवाज़', 'ఓం ప్రార్థన · బ్రౌజర్ స్వరం'],
    pooja: ['Begin visual pooja', 'दृश्य पूजा शुरू करें', 'దృశ్య పూజ ప్రారంభించండి'],
    ritualVoice: ['Read mantras with each step', 'हर चरण का मंत्र पढ़ें', 'ప్రతి దశలో మంత్రం చదవండి'],
    repeat: ['Read this step again', 'इस चरण को फिर पढ़ें', 'ఈ దశను మళ్ళీ చదవండి'],
    excerpt: ['Digital practice uses selected verses, not a complete temple ritual or full 108-name recitation.', 'डिजिटल अभ्यास में चयनित मंत्र हैं; यह पूर्ण मंदिर अनुष्ठान या पूरे 108 नामों का पाठ नहीं है।', 'డిజిటల్ సాధనలో ఎంచుకున్న మంత్రాలు ఉన్నాయి; ఇది పూర్తి ఆలయ పూజ లేదా మొత్తం 108 నామాల పఠనం కాదు.'],
    blessing: ['At the sacred feet, a moment of surrender.', 'पवित्र चरणों में, समर्पण का एक क्षण।', 'పవిత్ర పాదాల చెంత, సమర్పణలో ఒక క్షణం.'],
    symbolic: ['Symbolic sacred footprints · original devotional artwork', 'प्रतीकात्मक पवित्र चरण · मौलिक भक्ति चित्र', 'ప్రతీకాత్మక పవిత్ర పాదాలు · స్వయంగా రూపొందించిన భక్తి చిత్రం']
  };
  let language = 'en';
  try { const stored = localStorage.getItem('dm-language'); if (['en', 'hi', 'te'].includes(stored)) language = stored; } catch { /* Storage is optional. */ }
  const translate = key => messages[key]?.[['en', 'hi', 'te'].indexOf(language)] || key;
  const map = {};
  const devanagari = 'अआइईउऊऋऌएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहळािीुूृॄॅेैॉोौ्ंःँ०१२३४५६७८९';
  const telugu = [...'అఆఇఈఉఊఋఌఏఐఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరలవశషసహళాిీుూృౄెేైొోౌ్ంఃఁ౦౧౨౩౪౫౬౭౮౯'];
  [...devanagari].forEach((char, index) => { map[char] = telugu[index]; });
  function toTelugu(text) {
    return [...text.normalize('NFD')].map(char => char === 'ॐ' ? 'ఓం' : char === '़' ? '' : (map[char] || char)).join('');
  }
  function prayerText(original, roman) { return language === 'te' ? toTelugu(original) : language === 'hi' ? original : roman; }
  let current = null;
  let generation = 0;
  let finishPending = null;
  const tones = new Set();
  function status(key) { const node = document.getElementById('devotionStatus'); if (node) node.textContent = translate(key); }
  function stop() {
    generation++;
    current = null;
    window.speechSynthesis?.cancel();
    if (finishPending) { finishPending('canceled'); finishPending = null; }
    tones.forEach(node => { node.osc.stop(); node.gain.disconnect(); });
    tones.clear();
    status('ready');
  }
  function stopAll() {
    stop();
    if (typeof stopOmChant === 'function') stopOmChant();
    if (typeof stopTempleBells === 'function') stopTempleBells();
    document.querySelectorAll('audio, video').forEach(media => media.pause());
    document.dispatchEvent(new Event('devotion:silence'));
  }
  function read(text, lang = 'hi-IN') {
    stopAll();
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) { status('unavailable'); return Promise.resolve('unavailable'); }
    const session = generation;
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const voice = voices.find(v => v.lang.toLowerCase() === lang.toLowerCase()) || voices.find(v => v.lang.toLowerCase().startsWith(lang.slice(0, 2)));
    if (voices.length && !voice) { status('unavailable'); return Promise.resolve('unavailable'); }
    // Short utterances avoid long-text speech-engine limits. Never enqueue all verses at once.
    const chunks = String(text).split(/\n+/).flatMap(line => line.match(/.{1,170}(?:\s|$)|\S{1,170}/gu) || []).filter(part => part.trim());
    return new Promise(resolve => {
      finishPending = resolve;
      let index = 0;
      function finish(result) { if (session !== generation) return; current = null; finishPending = null; status(result === 'finished' ? 'finished' : 'unavailable'); resolve(result); }
      function next() {
        if (session !== generation) return;
        if (index === chunks.length) { finish('finished'); return; }
        const utterance = new SpeechSynthesisUtterance(chunks[index++]);
        utterance.lang = lang; utterance.rate = 0.8; utterance.volume = 0.7;
        if (voice) utterance.voice = voice;
        utterance.onend = next;
        utterance.onerror = () => finish('unavailable');
        current = utterance;
        status('reading');
        try { synth.speak(utterance); } catch { finish('unavailable'); }
      }
      next();
    });
  }
  function melody() {
    stopAll();
    if (typeof getSharedAudioContext !== 'function') return;
    const ctx = getSharedAudioContext();
    if (!ctx) { status('unavailable'); return; }
    const notes = [216, 243, 288, 324, 288, 243, 216, 162];
    notes.forEach((frequency, index) => {
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine'; osc.frequency.value = frequency;
      const at = ctx.currentTime + index * 2.5;
      gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(0.08, at + .2); gain.gain.exponentialRampToValueAtTime(.0001, at + 3);
      osc.connect(gain); gain.connect(ctx.destination);
      const node = { osc, gain }; tones.add(node);
      osc.onended = () => { osc.disconnect(); gain.disconnect(); tones.delete(node); };
      osc.start(at); osc.stop(at + 3.1);
    });
  }
  function apply(root = document) {
    root.querySelectorAll('[data-devotion]').forEach(node => { node.textContent = translate(node.dataset.devotion); });
    document.documentElement.lang = language;
  }
  function setLanguage(value) {
    if (!['en', 'hi', 'te'].includes(value)) return;
    stopAll(); language = value;
    try { localStorage.setItem('dm-language', value); } catch { /* Keep the choice for this page. */ }
    apply(); status('ready');
    document.dispatchEvent(new CustomEvent('devotion:language', { detail: value }));
  }
  window.Devotion = { t: translate, apply, read, stop, stopAll, melody, toTelugu, prayerText, get language() { return language; } };
  function boot() {
    const navKeys = { 'index.html': 'home', 'gods.html': 'gods', 'live-archana.html': 'archana', 'chalisa.html': 'chalisa', 'shlokas.html': 'shlokas', 'music.html': 'music', 'about.html': 'about', 'contact.html': 'contact' };
    document.querySelectorAll('.nav-links a, footer a').forEach(link => {
      let href = link.getAttribute('href');
      if (href === 'healing.html') { link.href = 'music.html'; href = 'music.html'; }
      if (navKeys[href]) link.dataset.devotion = navKeys[href];
    });
    const bar = document.createElement('aside'); bar.className = 'devotion-toolbar';
    bar.innerHTML = '<label for="devotionLanguage" data-devotion="language"></label><select id="devotionLanguage"><option value="en">English</option><option value="hi">हिन्दी</option><option value="te">తెలుగు</option></select><a href="music.html" data-devotion="music"></a><button type="button" id="devotionStop" data-devotion="stop"></button><span id="devotionStatus" role="status"></span><details><summary data-devotion="language"></summary><p data-devotion="scope"></p></details>';
    const nav = document.querySelector('.navbar');
    if (nav) nav.after(bar); else document.body.prepend(bar);
    bar.querySelector('select').value = language;
    bar.querySelector('select').addEventListener('change', event => setLanguage(event.target.value));
    bar.querySelector('button').addEventListener('click', stopAll);
    document.addEventListener('play', event => { if (event.target.matches('audio, video')) stop(); }, true);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopAll(); });
    window.addEventListener('pagehide', stopAll);
    apply(); status('ready');
    document.dispatchEvent(new Event('devotion:ready'));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();
})();
