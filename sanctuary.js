/* Homepage interactions; uses the existing deity database and shared audio engine. */
(() => {
  if (!document.body.classList.contains('sanctuary-home')) return;

  const select = document.getElementById('sanctuaryDeitySelect');
  const image = document.getElementById('sanctuaryDeityImage');
  const omButton = document.getElementById('globalOmBtn');
  const readButton = document.getElementById('readMantra');
  const bellButton = document.getElementById('sanctuaryBell');
  const volume = document.getElementById('ambienceVolume');
  const status = document.getElementById('soundStatus');
  const recording = document.getElementById('suprabhatamAudio');
  const recordingStatus = document.getElementById('suprabhatamStatus');
  const synth = window.speechSynthesis;
  const canSpeak = Boolean(synth && window.SpeechSynthesisUtterance);
  const canPlayTones = Boolean(window.AudioContext || window.webkitAudioContext);
  const gods = typeof GODS === 'undefined' ? [] : GODS;
  let selectedIndex = Math.max(0, gods.findIndex(god => god.id === 'lakshmi'));
  let activeUtterance = null;
  let bellTimer = null;

  function say(message) {
    status.textContent = message;
  }

  function stopReading() {
    // Ignore callbacks from canceled utterances when a new reading starts.
    activeUtterance = null;
    if (canSpeak) synth.cancel();
    readButton.textContent = !canSpeak ? 'Voice not supported' : (gods.length ? 'Read mantra' : 'Select a deity first');
    readButton.setAttribute('aria-pressed', 'false');
  }

  function silence() {
    clearTimeout(bellTimer);
    bellTimer = null;
    stopOmChant();
    stopTempleBells();
    stopReading();
    recording?.pause();
    say('Silent and peaceful. Choose a sound below.');
  }

  function renderDeity() {
    const god = gods[selectedIndex];
    if (!god) return;
    stopReading();
    if (!omNodes && (!recording || recording.paused) && !bellTimer) {
      say('Silent and peaceful. Choose a sound below.');
    }
    select.value = god.id;
    image.alt = `${god.name} devotional artwork`;
    delete image.dataset.fallbackTried;
    image.src = god.image;
    document.getElementById('sanctuaryDeityName').textContent = god.name;
    document.getElementById('sanctuaryDeityTitle').textContent = god.title;
    document.getElementById('sanctuaryDeitySanskrit').textContent = god.moola;
    document.getElementById('sanctuaryDeityMantra').textContent = god.primaryMantra;
    document.getElementById('sanctuaryPoojaLink').href = `pooja.html?god=${encodeURIComponent(god.id)}`;
    document.getElementById('deityCounter').textContent = `${selectedIndex + 1} / ${gods.length}`;
    document.getElementById('mantraReaderLabel').textContent = `${god.name} · Browser voice · Pronunciation may vary`;
  }

  if (gods.length) {
    select.replaceChildren(...gods.map(god => {
      const option = document.createElement('option');
      option.value = god.id;
      option.textContent = god.name;
      return option;
    }));
    select.addEventListener('change', () => {
      const index = gods.findIndex(god => god.id === select.value);
      if (index < 0) return;
      selectedIndex = index;
      renderDeity();
    });
    document.getElementById('previousDeity').addEventListener('click', () => {
      selectedIndex = (selectedIndex - 1 + gods.length) % gods.length;
      renderDeity();
    });
    document.getElementById('nextDeity').addEventListener('click', () => {
      selectedIndex = (selectedIndex + 1) % gods.length;
      renderDeity();
    });
    renderDeity();
  } else {
    select.disabled = true;
    document.getElementById('previousDeity').disabled = true;
    document.getElementById('nextDeity').disabled = true;
    document.getElementById('deityCounter').textContent = 'Visit the deity collection to explore more.';
  }

  omButton.disabled = !canPlayTones;
  bellButton.disabled = !canPlayTones;
  volume.disabled = !canPlayTones;
  if (!canPlayTones) {
    omButton.textContent = 'Audio not supported';
    bellButton.textContent = 'Audio not supported';
  }
  readButton.disabled = !canSpeak || !gods.length;
  if (!canSpeak) readButton.textContent = 'Voice not supported';
  if (!gods.length) readButton.textContent = 'Select a deity first';

  setOmVolume(Number(volume.value) / 100);
  volume.addEventListener('input', () => {
    setOmVolume(Number(volume.value) / 100);
    document.getElementById('ambienceVolumeValue').textContent = `${volume.value}%`;
  });

  omButton.addEventListener('click', () => {
    const wasPlaying = Boolean(omNodes);
    silence();
    if (wasPlaying) return;
    try {
      if (toggleOmChant()) say('Playing Om-inspired ambience · Synthesized tone');
      else say('Audio is unavailable in this browser.');
    } catch {
      stopOmChant();
      say('Audio could not start. Please try again.');
    }
  });

  readButton.addEventListener('click', () => {
    const wasReading = Boolean(activeUtterance);
    silence();
    if (wasReading || !canSpeak || !gods[selectedIndex]) return;
    const god = gods[selectedIndex];
    // Read the visible transliteration, never impersonate a priest or deity.
    const utterance = new SpeechSynthesisUtterance(god.primaryMantra);
    utterance.lang = 'en-IN';
    const voices = synth.getVoices();
    const voice = voices.find(item => item.lang.toLowerCase() === 'en-in');
    if (voice) utterance.voice = voice;
    utterance.rate = 0.78;
    utterance.volume = 0.7;
    activeUtterance = utterance;
    readButton.textContent = 'Stop reading';
    readButton.setAttribute('aria-pressed', 'true');
    say(`Reading ${god.name}’s mantra · Browser voice`);
    utterance.onend = () => {
      if (activeUtterance !== utterance) return;
      activeUtterance = null;
      readButton.textContent = 'Read mantra';
      readButton.setAttribute('aria-pressed', 'false');
      say('Mantra reading complete. Take a moment of stillness.');
    };
    utterance.onerror = () => {
      if (activeUtterance !== utterance) return;
      stopReading();
      say('Voice playback is unavailable. You can read the mantra in the deity gallery.');
    };
    try {
      synth.speak(utterance);
    } catch {
      stopReading();
      say('Voice playback could not start. Please read the mantra in the deity gallery.');
    }
  });

  bellButton.addEventListener('click', () => {
    silence();
    try {
      playTempleBell(0.85);
      say('A temple bell chime · Synthesized sound');
      bellTimer = setTimeout(() => {
        bellTimer = null;
        say('The bell fades into stillness.');
      }, 3300);
    } catch {
      say('Bell audio is unavailable. Please try again.');
    }
  });

  document.getElementById('silenceSanctuary').addEventListener('click', silence);

  if (recording) {
    recording.addEventListener('play', () => {
      if (recording.paused) return;
      stopOmChant();
      stopTempleBells();
      stopReading();
      clearTimeout(bellTimer);
      bellTimer = null;
      recordingStatus.textContent = 'Playing the Suprabhatam recording';
      say('Playing Suprabhatam · Recorded audio');
    });
    recording.addEventListener('pause', () => {
      recordingStatus.textContent = 'Recording paused · Press play to resume';
      if (!omNodes && !activeUtterance && !bellTimer) say('Silent and peaceful. Choose a sound below.');
    });
    recording.addEventListener('ended', () => {
      recordingStatus.textContent = 'Recording complete';
      say('Recording complete. Take a moment of stillness.');
    });
    const recordingError = () => {
      recordingStatus.textContent = 'Recording unavailable. Please try again later.';
      if (!omNodes && !activeUtterance && !bellTimer) say('The external recording is unavailable. Try the mantra reader or Om ambience.');
    };
    recording.addEventListener('error', recordingError);
    recording.querySelector('source')?.addEventListener('error', recordingError);
  }

  // Stop rather than silently resume devotional audio after leaving the page.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) silence();
  });
  window.addEventListener('pagehide', silence);

  // Also handle images that failed before the shared error listener was installed.
  document.querySelectorAll('img').forEach(img => {
    if (img.complete && img.naturalWidth === 0 && !img.dataset.fallbackTried) {
      img.dataset.fallbackTried = 'true';
      img.src = getDeityFallbackSvg('🪷');
    }
  });
})();
