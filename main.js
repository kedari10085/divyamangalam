/* =============================================
   DIVYA MANGALAM – main.js
   Handles: Loader, Nav, Darshan Modal,
            Archana Form, Contact Form, FAQs
   ============================================= */

/* ============  PAGE LOADER  ============ */
function dismissLoader() {
  const loader = document.getElementById('page-loader');
  if (loader && !loader.classList.contains('hidden')) {
    loader.classList.add('hidden');
    setTimeout(() => { loader.style.display = 'none'; }, 600);
  }
}
document.addEventListener('DOMContentLoaded', () => { setTimeout(dismissLoader, 400); });
window.addEventListener('load', () => { setTimeout(dismissLoader, 200); });
setTimeout(dismissLoader, 1500); // Safety fallback so page never gets stuck behind loader

/* ============  NAVBAR TOGGLE  ============ */
function toggleNav() {
  const links = document.getElementById('navLinks');
  const button = document.getElementById('hamburger');
  if (!links) return;
  const open = links.classList.toggle('open');
  button?.setAttribute('aria-expanded', String(open));
  button?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

document.getElementById('navLinks')?.addEventListener('click', (event) => {
  if (event.target.closest('a') && document.getElementById('navLinks').classList.contains('open')) toggleNav();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.getElementById('navLinks')?.classList.contains('open')) {
    toggleNav();
    document.getElementById('hamburger')?.focus();
  }
});

/* ============  SACRED VEDIC AUDIO ENGINE  ============ */
let globalAudioCtx = null;
function getSharedAudioContext() {
  if (!globalAudioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) globalAudioCtx = new AudioCtx();
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {
      showToast('Audio could not start. Please try the sound button again.', 'error');
    });
  }
  return globalAudioCtx;
}

/**
 * Authentic Temple Brass Ghanta (Bell) Sound
 * Synthesizes physical bronze/brass harmonics:
 * Fundamental (e.g. ~880 Hz / 1174 Hz) + rich inharmonic overtones
 * with long exponential decay and shimmering metallic ring.
 */
const activeBellNodes = new Set();
function stopTempleBells() {
  activeBellNodes.forEach(({ osc, gain }) => {
    osc.stop();
    osc.disconnect();
    gain.disconnect();
  });
  activeBellNodes.clear();
}

function playTempleBell(pitchMultiplier = 1.0) {
  const ctx = getSharedAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Authentic brass bell overtone ratios and damping factors
  const harmonics = [
    { freq: 880 * pitchMultiplier, gain: 0.35, decay: 3.2 },
    { freq: 1175 * pitchMultiplier, gain: 0.28, decay: 2.8 },
    { freq: 1760 * pitchMultiplier, gain: 0.18, decay: 2.1 },
    { freq: 2350 * pitchMultiplier, gain: 0.12, decay: 1.6 },
    { freq: 3520 * pitchMultiplier, gain: 0.08, decay: 1.1 },
    { freq: 4186 * pitchMultiplier, gain: 0.05, decay: 0.8 },
  ];

  harmonics.forEach(h => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(h.freq, now);

    // Initial metallic strike (fast attack)
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(h.gain * 0.45, now + 0.006);
    // Exponential bell resonance ring
    gain.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

    osc.connect(gain);
    gain.connect(ctx.destination);

    const nodes = { osc, gain };
    activeBellNodes.add(nodes);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
      activeBellNodes.delete(nodes);
    };
    osc.start(now);
    osc.stop(now + h.decay);
  });
}

/**
 * Continuous Deep Om Sound (Earth Prana frequency: 136.1 Hz + harmonics)
 * Rich Vedic hum layered with warm soothing chorus.
 */
let omNodes = null;
let omVolume = 0.14;
function setOmVolume(value) {
  const level = Number(value);
  if (!Number.isFinite(level)) return;
  omVolume = Math.max(0, Math.min(1, level)) * 0.4;
  if (omNodes && globalAudioCtx) {
    const now = globalAudioCtx.currentTime;
    omNodes.masterGain.gain.cancelScheduledValues(now);
    omNodes.masterGain.gain.setTargetAtTime(omVolume, now, 0.08);
  }
}

function stopOmChant() {
  if (!omNodes) return;
  // Clear the active reference immediately so rapid toggles cannot stop a new session.
  const previous = omNodes;
  omNodes = null;
  previous.masterGain.disconnect();
  previous.oscillators.forEach(osc => { osc.stop(); osc.disconnect(); });
  updateOmUI(false);
}

function toggleOmChant() {
  const ctx = getSharedAudioContext();
  if (!ctx) return false;

  if (omNodes) {
    stopOmChant();
    return false;
  } else {
    // Start Om smoothly
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(omVolume, now + 2.0);
    masterGain.connect(ctx.destination);

    // Sacred Om Frequencies: 136.1 Hz (Cosmic Om / Earth Year), 272.2 Hz, 68.05 Hz sub-bass
    const freqs = [68.05, 136.1, 136.3, 272.2, 408.3];
    const oscillators = [];

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);
      
      const layerVol = idx === 1 ? 0.4 : (idx === 0 ? 0.35 : 0.15);
      gain.gain.setValueAtTime(layerVol, now);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      oscillators.push(osc);
    });

    omNodes = { masterGain, oscillators };
    updateOmUI(true);
    return true;
  }
}

function updateOmUI(isPlaying) {
  const btn = document.getElementById('globalOmBtn');
  if (btn) {
    btn.classList.toggle('playing', isPlaying);
    btn.setAttribute('aria-pressed', String(isPlaying));
    btn.textContent = isPlaying ? 'Stop Om ambience' : 'Play Om ambience';
  }
}

// Navigation stays quiet. Bell sounds are triggered only by explicit ritual/audio controls.

/* ============  USER-INITIATED SUPRABHATAM RECORDING  ============ */
function playSuprabhatamNow() {
  const audio = document.getElementById('suprabhatamAudio');
  if (!audio) return;
  if (audio.paused) {
    audio.play().catch((error) => {
      if (error.name === 'AbortError') return;
      const status = document.getElementById('suprabhatamStatus');
      if (status) status.textContent = 'Recording unavailable. Please try again later.';
    });
  } else {
    audio.pause();
  }
}

/* ============  VIRTUAL DARSHAN MODAL  ============ */
const mantras = [
  '"Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed"',
  '"Om Mahalakshmyai Namaha"',
  '"Sarve bhavantu sukhinaḥ, Sarve santu nirāmayāḥ"',
  '"Om Shrim Hrim Klim Maha Lakshmi Namaha"',
  '"Om Namah Shivaya – Shiva Shambho"',
  '"Jai Mata Di – Jai Maa Lakshmi"',
];

let mantraIdx = 0;
let darshanTrigger = null;

function openDarshanModal() {
  const modal = document.getElementById('darshanModal');
  if (modal && !modal.classList.contains('open')) {
    darshanTrigger = document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
    startMantraRotation();
  }
}

function closeDarshanModal() {
  const modal = document.getElementById('darshanModal');
  if (modal?.classList.contains('open')) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    stopMantraRotation();
    darshanTrigger?.focus();
  }
}

document.addEventListener('keydown', (event) => {
  const modal = document.getElementById('darshanModal');
  if (event.key !== 'Tab' || !modal?.classList.contains('open')) return;
  const controls = [...modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')];
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first) { event.preventDefault(); modal.focus(); return; }
  if (!modal.contains(document.activeElement) || (event.shiftKey && document.activeElement === first)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

let mantraTimer = null;

function startMantraRotation() {
  stopMantraRotation();
  updateMantra();
  if (!document.body.classList.contains('sanctuary-home') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    mantraTimer = setInterval(updateMantra, 4000);
  }
}

function stopMantraRotation() {
  if (mantraTimer) clearInterval(mantraTimer);
}

function updateMantra() {
  const el = document.getElementById('modalMantra');
  if (!el) return;
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = mantras[mantraIdx % mantras.length];
    el.style.opacity = 1;
    mantraIdx++;
  }, 400);
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('darshanModal');
  if (modal && e.target === modal) closeDarshanModal();
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDarshanModal();
});

/* ============  ARCHANA FORM  ============ */
const archanaForm = document.getElementById('archanaForm');
if (archanaForm) {
  archanaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const fname = document.getElementById('fname')?.value.trim();
    const lname = document.getElementById('lname')?.value.trim();
    const gotra = document.getElementById('gotra')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const checkedArchanas = [...document.querySelectorAll('input[name="archana"]:checked')];

    if (!fname || !lname) {
      showToast('Please enter your full name.', 'error');
      return;
    }
    if (!gotra) {
      showToast('Please enter your Gotra.', 'error');
      return;
    }
    if (!phone) {
      showToast('Please enter your phone number.', 'error');
      return;
    }
    if (checkedArchanas.length === 0) {
      showToast('Please select at least one Archana type.', 'error');
      return;
    }

    // Simulate submission (in production, POST to backend / email service)
    const fullName = `${fname} ${lname}`;
    const selectedArchanas = checkedArchanas.map(c => c.value).join(', ');

    // Hide form, show success
    const card = document.getElementById('archanaCard');
    const success = document.getElementById('archana-success');
    const nameEl = document.getElementById('successName');

    if (card) card.style.display = 'none';
    if (nameEl) nameEl.textContent = `🙏 ${fullName}`;
    if (success) success.style.display = 'block';

    // Scroll to success
    if (success) success.scrollIntoView({ behavior: 'smooth', block: 'center' });

    showToast(`Prayer intention preview for ${fullName}. No booking sent.`, 'success');

    console.log('Archana submission:', {
      name: fullName,
      gotra,
      phone,
      nakshatra: document.getElementById('nakshatra')?.value,
      rashi: document.getElementById('rashi')?.value,
      archanaTypes: selectedArchanas,
      occasion: document.getElementById('occasion')?.value,
      date: document.getElementById('puja-date')?.value,
      prayer: document.getElementById('prayer')?.value,
      email: document.getElementById('email')?.value,
    });
  });
}

function resetArchana() {
  const card = document.getElementById('archanaCard');
  const success = document.getElementById('archana-success');
  const form = document.getElementById('archanaForm');
  if (form) form.reset();
  if (card) card.style.display = 'block';
  if (success) success.style.display = 'none';
  card?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============  CONTACT FORM  ============ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cname')?.value.trim();
    const email = document.getElementById('cemail')?.value.trim();
    const msg = document.getElementById('cmessage')?.value.trim();

    if (!name) { showToast('Please enter your name.', 'error'); return; }
    if (!email || !email.includes('@')) { showToast('Please enter a valid email.', 'error'); return; }
    if (!msg) { showToast('Please type your message.', 'error'); return; }

    contactForm.style.display = 'none';
    const successEl = document.getElementById('contact-success');
    if (successEl) successEl.style.display = 'block';
    showToast('Message sent! 🙏 We\'ll reply soon.', 'success');
  });
}

function resetContact() {
  const form = document.getElementById('contactForm');
  const successEl = document.getElementById('contact-success');
  if (form) { form.reset(); form.style.display = 'block'; }
  if (successEl) successEl.style.display = 'none';
}

/* ============  TOAST NOTIFICATION  ============ */
function showToast(message, type = 'success') {
  // Remove any existing toast
  const old = document.getElementById('dm-toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'dm-toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: type === 'error' ? '#8B0000' : '#1b5e20',
    color: '#fff',
    padding: '1rem 2rem',
    borderRadius: '50px',
    fontFamily: 'Lato, sans-serif',
    fontSize: '0.95rem',
    zIndex: '9999',
    boxShadow: '0 6px 30px rgba(0,0,0,0.35)',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    whiteSpace: 'nowrap',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ============  FAQ ACCORDION (Contact Page)  ============ */
const faqs = [
  {
    q: 'How does Virtual Darshan work?',
    a: 'Our Virtual Darshan feature gives you a sacred visual connection to the presiding deity of Divya Mangalam. Click "Open Virtual Darshan" on the home page and experience an immersive, meditative darshan with rotating mantras.'
  },
  {
    q: 'How is Online Archana performed?',
    a: 'When you submit the Archana form with your name, gotra, nakshatra, and the type of archana, our trained temple priests perform the archana on your behalf during the appropriate puja time. Blessings are offered in your name directly before the deity.'
  },
  {
    q: 'Is there a fee for Online Archana?',
    a: 'Archana at Divya Mangalam is offered free of charge as a service to all devotees worldwide. Any voluntary contributions go entirely towards temple maintenance and charitable activities.'
  },
  {
    q: 'Can I choose a specific date for my archana?',
    a: 'Yes! The archana form allows you to select a preferred date. We will do our best to honour your chosen date. For special occasions like birthdays or anniversaries, we recommend booking at least a day in advance.'
  },
  {
    q: 'What is Gotra and why is it needed?',
    a: 'Gotra refers to your ancestral lineage or clan, often named after a Vedic sage. It is required during archana so the priest can correctly invoke blessings for your specific lineage during the ritual. If you don\'t know your gotra, you may enter "Kashyapa" as a common default.'
  },
  {
    q: 'Will I receive any confirmation after submitting archana?',
    a: 'Yes, you will receive a digital prasad and blessing message on screen immediately. If you provide your email, we will also send you a confirmation with the deity\'s mantra and blessings.'
  },
];

const faqList = document.getElementById('faqList');
if (faqList) {
  faqs.forEach((faq, i) => {
    const item = document.createElement('div');
    item.style.cssText = 'margin-bottom:1rem; border-radius:10px; overflow:hidden; box-shadow: 0 2px 10px rgba(44,26,14,0.1);';

    const question = document.createElement('button');
    question.style.cssText = `
      width:100%; text-align:left; padding:1.2rem 1.5rem;
      background: var(--white); border:none; cursor:pointer;
      font-family: Lato, sans-serif; font-size:0.98rem; font-weight:700;
      color: var(--deep-red); display:flex; justify-content:space-between; align-items:center;
      border-left: 4px solid var(--gold);
    `;
    question.innerHTML = `${faq.q} <span style="font-size:1.2rem; transition:transform 0.3s;">▾</span>`;

    const answer = document.createElement('div');
    answer.style.cssText = `
      background: var(--cream); color: var(--text-mid);
      font-size:0.95rem; line-height:1.7;
      max-height:0; overflow:hidden; transition: max-height 0.4s ease, padding 0.3s;
      padding: 0 1.5rem;
    `;
    answer.textContent = faq.a;

    question.addEventListener('click', () => {
      const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
      // Close all
      faqList.querySelectorAll('div > div').forEach(a => {
        a.style.maxHeight = '0';
        a.style.padding = '0 1.5rem';
      });
      faqList.querySelectorAll('button span').forEach(s => s.style.transform = 'rotate(0deg)');
      if (!isOpen) {
        answer.style.maxHeight = '300px';
        answer.style.padding = '1rem 1.5rem';
        question.querySelector('span').style.transform = 'rotate(180deg)';
      }
    });

    item.appendChild(question);
    item.appendChild(answer);
    faqList.appendChild(item);
  });
}

/* ============  SMOOTH SCROLL FOR ANCHOR LINKS  ============ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.getElementById(href.slice(1));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============  ANIMATE ELEMENTS ON SCROLL  ============ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .timing-item, .value-card, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

/* ============  UNIVERSAL IMAGE FALLBACK  ============ */
function getDeityFallbackSvg(label = '🕉️') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#3b0000"/>
        <stop offset="50%" stop-color="#1a0026"/>
        <stop offset="100%" stop-color="#08000f"/>
      </radialGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF8EF"/>
        <stop offset="50%" stop-color="#D4A017"/>
        <stop offset="100%" stop-color="#FF6F00"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bgGrad)"/>
    <circle cx="200" cy="180" r="140" fill="none" stroke="url(#goldGrad)" stroke-width="2" opacity="0.4"/>
    <circle cx="200" cy="180" r="110" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" opacity="0.3"/>
    <circle cx="200" cy="180" r="80" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.25"/>
    <text x="200" y="220" font-size="96" text-anchor="middle" dominant-baseline="middle">${label}</text>
    <text x="200" y="340" font-family="'Playfair Display', serif" font-size="20" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="3">DIVYA MANGALAM</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

document.addEventListener('error', (e) => {
  if (e.target && e.target.tagName === 'IMG') {
    const img = e.target;
    if (img.dataset.fallbackTried) return;
    img.dataset.fallbackTried = 'true';
    const alt = (img.alt || '').toLowerCase();
    let emoji = '🕉️';
    if (alt.includes('ganesha')) emoji = '🐘';
    else if (alt.includes('shiva')) emoji = '🔱';
    else if (alt.includes('lakshmi')) emoji = '🪷';
    else if (alt.includes('durga')) emoji = '⚔️';
    else if (alt.includes('hanuman')) emoji = '🙏';
    else if (alt.includes('vishnu')) emoji = '🪷';
    else if (alt.includes('saraswati')) emoji = '🎶';
    else if (alt.includes('krishna')) emoji = '🦚';
    else if (alt.includes('murugan')) emoji = '⚡';
    else if (alt.includes('surya')) emoji = '☀️';
    else if (alt.includes('sai')) emoji = '🕊️';
    else if (alt.includes('temple')) emoji = '🛕';
    img.src = getDeityFallbackSvg(emoji);
  }
}, true);
