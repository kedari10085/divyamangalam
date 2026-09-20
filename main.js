/* =============================================
   DIVYA MANGALAM – main.js
   Handles: Loader, Nav, Darshan Modal,
            Archana Form, Contact Form, FAQs
   ============================================= */

/* ============  PAGE LOADER  ============ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 900);
});

/* ============  NAVBAR TOGGLE  ============ */
function toggleNav() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
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

function openDarshanModal() {
  const modal = document.getElementById('darshanModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    startMantraRotation();
  }
}

function closeDarshanModal() {
  const modal = document.getElementById('darshanModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    stopMantraRotation();
  }
}

let mantraTimer = null;

function startMantraRotation() {
  updateMantra();
  mantraTimer = setInterval(updateMantra, 4000);
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

    showToast(`Archana offered for ${fullName}! 🪔`, 'success');

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
    const target = document.querySelector(link.getAttribute('href'));
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
