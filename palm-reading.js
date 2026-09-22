/* ============================================================
   VEDIC PALM READER LOGIC
   100% Client-side image processing and deterministic reading
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('videoElement');
  const preview = document.getElementById('previewImage');
  const handGuide = document.getElementById('handGuide');
  const btnCamera = document.getElementById('btnCamera');
  const btnUpload = document.getElementById('btnUpload');
  const fileInput = document.getElementById('fileInput');
  const btnScan = document.getElementById('btnScan');
  const btnRetake = document.getElementById('btnRetake');
  const scanOverlay = document.getElementById('scanOverlay');
  const scanMessage = document.getElementById('scanMessage');
  const scanProgress = document.getElementById('scanProgress');
  const resultsDashboard = document.getElementById('resultsDashboard');
  const scannerSection = document.getElementById('scannerSection');
  const resultCanvas = document.getElementById('resultCanvas');

  let stream = null;
  let imageSource = null; // Can be video or img element
  let hashSeed = 0;
  let isRightHand = true;

  // Toggle hand
  document.getElementById('btnRightHand').addEventListener('click', (e) => {
    isRightHand = true;
    e.target.classList.add('active');
    document.getElementById('btnLeftHand').classList.remove('active');
  });
  document.getElementById('btnLeftHand').addEventListener('click', (e) => {
    isRightHand = false;
    e.target.classList.add('active');
    document.getElementById('btnRightHand').classList.remove('active');
  });

  const scanPlaceholder = document.getElementById('scanPlaceholder');
  const btnSample = document.getElementById('btnSample');
  const btnPlaceholderDemo = document.getElementById('btnPlaceholderDemo');

  // Start Camera
  btnCamera.addEventListener('click', async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      video.srcObject = stream;
      video.style.display = 'block';
      preview.style.display = 'none';
      handGuide.style.display = 'block';
      if (scanPlaceholder) scanPlaceholder.style.display = 'none';
      btnCamera.style.display = 'none';
      btnUpload.style.display = 'none';
      if (btnSample) btnSample.style.display = 'none';
      btnScan.style.display = 'inline-flex';
      btnRetake.style.display = 'inline-flex';
      imageSource = video;
      resultsDashboard.style.display = 'none';
    } catch (err) {
      alert("Camera access denied or unavailable. Please use 'Upload Image' or 'Try Demo Hand'.");
    }
  });

  // Demo Hand Generator
  function loadDemoPalm() {
    const demoCanvas = document.createElement('canvas');
    demoCanvas.width = 600;
    demoCanvas.height = 800;
    const dCtx = demoCanvas.getContext('2d');

    // Sacred dark background
    dCtx.fillStyle = '#181226';
    dCtx.fillRect(0, 0, 600, 800);

    // Subtle cosmic glow
    const grad = dCtx.createRadialGradient(300, 450, 50, 300, 450, 350);
    grad.addColorStop(0, 'rgba(212,160,23,0.18)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    dCtx.fillStyle = grad;
    dCtx.fillRect(0, 0, 600, 800);

    // Draw stylized warm palm
    dCtx.save();
    dCtx.shadowColor = '#D4A017';
    dCtx.shadowBlur = 18;
    dCtx.fillStyle = '#e5b993';
    dCtx.beginPath();
    dCtx.moveTo(220, 780);
    dCtx.lineTo(380, 780);
    dCtx.quadraticCurveTo(425, 650, 445, 520);
    // Little finger
    dCtx.quadraticCurveTo(505, 480, 500, 355);
    dCtx.quadraticCurveTo(495, 305, 465, 310);
    dCtx.quadraticCurveTo(440, 315, 440, 420);
    // Ring finger
    dCtx.quadraticCurveTo(440, 240, 410, 175);
    dCtx.quadraticCurveTo(385, 145, 360, 175);
    dCtx.quadraticCurveTo(350, 240, 350, 410);
    // Middle finger
    dCtx.quadraticCurveTo(345, 180, 320, 110);
    dCtx.quadraticCurveTo(295, 80, 270, 110);
    dCtx.quadraticCurveTo(265, 195, 265, 410);
    // Index finger
    dCtx.quadraticCurveTo(255, 220, 230, 195);
    dCtx.quadraticCurveTo(205, 175, 185, 205);
    dCtx.quadraticCurveTo(180, 265, 200, 450);
    // Thumb
    dCtx.quadraticCurveTo(120, 500, 65, 475);
    dCtx.quadraticCurveTo(35, 475, 45, 525);
    dCtx.quadraticCurveTo(70, 600, 170, 640);
    dCtx.quadraticCurveTo(180, 720, 220, 780);
    dCtx.closePath();
    dCtx.fill();
    dCtx.restore();

    // Natural skin lines & crease hints
    dCtx.strokeStyle = 'rgba(145, 85, 55, 0.45)';
    dCtx.lineWidth = 4;
    dCtx.lineCap = 'round';
    // Heart line hint
    dCtx.beginPath();
    dCtx.moveTo(460, 430);
    dCtx.bezierCurveTo(360, 420, 280, 360, 235, 320);
    dCtx.stroke();
    // Head line hint
    dCtx.beginPath();
    dCtx.moveTo(195, 450);
    dCtx.bezierCurveTo(260, 460, 340, 490, 430, 520);
    dCtx.stroke();
    // Life line hint
    dCtx.beginPath();
    dCtx.moveTo(195, 440);
    dCtx.bezierCurveTo(170, 520, 210, 640, 280, 730);
    dCtx.stroke();
    // Fate line hint
    dCtx.beginPath();
    dCtx.moveTo(300, 740);
    dCtx.bezierCurveTo(310, 600, 315, 450, 310, 300);
    dCtx.stroke();

    preview.src = demoCanvas.toDataURL('image/png');
    preview.style.display = 'block';
    video.style.display = 'none';
    handGuide.style.display = 'none';
    if (scanPlaceholder) scanPlaceholder.style.display = 'none';
    if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
    btnCamera.style.display = 'none';
    btnUpload.style.display = 'none';
    if (btnSample) btnSample.style.display = 'none';
    btnScan.style.display = 'inline-flex';
    btnRetake.style.display = 'inline-flex';
    imageSource = preview;
    resultsDashboard.style.display = 'none';
  }

  if (btnSample) btnSample.addEventListener('click', loadDemoPalm);
  if (btnPlaceholderDemo) btnPlaceholderDemo.addEventListener('click', loadDemoPalm);

  // Upload Image
  btnUpload.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        preview.src = event.target.result;
        preview.style.display = 'block';
        video.style.display = 'none';
        handGuide.style.display = 'none';
        if (scanPlaceholder) scanPlaceholder.style.display = 'none';
        if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
        btnCamera.style.display = 'none';
        btnUpload.style.display = 'none';
        if (btnSample) btnSample.style.display = 'none';
        btnScan.style.display = 'inline-flex';
        btnRetake.style.display = 'inline-flex';
        imageSource = preview;
        resultsDashboard.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  });

  // Retake
  btnRetake.addEventListener('click', () => {
    if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
    video.style.display = 'none';
    preview.style.display = 'none';
    handGuide.style.display = 'none';
    if (scanPlaceholder) scanPlaceholder.style.display = 'block';
    btnCamera.style.display = 'inline-flex';
    btnUpload.style.display = 'inline-flex';
    if (btnSample) btnSample.style.display = 'inline-flex';
    btnScan.style.display = 'none';
    btnRetake.style.display = 'none';
    resultsDashboard.style.display = 'none';
  });

  // Start Scan
  btnScan.addEventListener('click', () => {
    // Capture to a temporary canvas to get ImageData for hash
    const tempCanvas = document.createElement('canvas');
    let sW, sH;
    if (imageSource === video) {
      sW = video.videoWidth; sH = video.videoHeight;
    } else {
      sW = preview.naturalWidth; sH = preview.naturalHeight;
    }
    
    if(!sW || !sH) {
      alert("Image not fully loaded yet.");
      return;
    }

    tempCanvas.width = sW;
    tempCanvas.height = sH;
    const ctx = tempCanvas.getContext('2d');
    
    // Fill black in case of issues
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, sW, sH);
    ctx.drawImage(imageSource, 0, 0, sW, sH);

    const imgData = ctx.getImageData(0, 0, sW, sH);
    // Simple hash: sum of pixel values
    let sum = 0;
    // sample pixels to save time (every 40th value)
    for (let i = 0; i < imgData.data.length; i += 40) {
      sum += imgData.data[i] + imgData.data[i+1] + imgData.data[i+2];
    }
    hashSeed = sum + (isRightHand ? 1000 : 2000);

    // Save image to result canvas
    resultCanvas.width = sW;
    resultCanvas.height = sH;
    const rCtx = resultCanvas.getContext('2d');
    rCtx.drawImage(imageSource, 0, 0, sW, sH);

    runScanAnimation();
  });

  function runScanAnimation() {
    scanOverlay.style.display = 'flex';
    let progress = 0;
    
    const messages = [
      'Detecting palm boundary...',
      'Segmenting hand region...',
      'Tracing Heart Line...',
      'Tracing Head Line...',
      'Tracing Life Line...',
      'Analyzing Mount of Venus...',
      'Analyzing Mount of Jupiter...',
      'Generating Vedic insights...'
    ];
    
    let msgIdx = 0;
    scanMessage.innerText = messages[0];
    
    const msgInterval = setInterval(() => {
      msgIdx++;
      if(msgIdx < messages.length) scanMessage.innerText = messages[msgIdx];
    }, 1000); // changes every 1s for 8s total
    
    const progInterval = setInterval(() => {
      progress += (100 / 80); // reach 100 in 8 seconds (80 * 100ms)
      scanProgress.style.width = Math.min(progress, 100) + '%';
      if (progress >= 100) {
        clearInterval(msgInterval);
        clearInterval(progInterval);
        scanOverlay.style.display = 'none';
        showResults();
      }
    }, 100);
  }

  // PRNG
  function seededRandom() {
    let x = Math.sin(hashSeed++) * 10000;
    return x - Math.floor(x);
  }
  function pickFromArray(arr) {
    return arr[Math.floor(seededRandom() * arr.length)];
  }

  // Text Pools
  const textPools = {
    lifeLine: [
      { strength: 4, text: "A robust and deep Life Line indicates immense physical vitality and a strong constitution. You possess a natural resilience to stress and illness. Your journey involves deep-rooted stability, and major life changes tend to be deliberate and well-planned. You draw energy from nature and solid routines." },
      { strength: 3, text: "Your Life Line is clear with gentle curves, suggesting a balanced approach to vitality. You have good stamina but need occasional rest periods to recharge. You are adaptable to environmental changes, and your life path shows steady growth rather than sudden, dramatic shifts." },
      { strength: 5, text: "An exceptionally sweeping Life Line surrounding the Mount of Venus shows boundless energy, passion, and a profound love for life itself. You are highly expressive and thrive on rich experiences. You bounce back from setbacks quickly and inspire others with your vibrant presence." },
      { strength: 2, text: "A delicate or chained Life Line indicates a sensitive constitution. You absorb the energies around you deeply. Your life force is more intellectual or spiritual than purely physical. You benefit greatly from mindful practices like yoga or meditation to maintain equilibrium through life's fluctuations." },
      { strength: 4, text: "Your Life Line shows a distinct branch, often indicating a significant move, travel, or a dual lifestyle. You have a restless spirit that seeks expansion. You possess strong foundational health, but your energy shines brightest when you are exploring new territories or ideas." },
      { strength: 3, text: "A steady Life Line that stays close to the thumb reveals a focused, perhaps cautious approach to vitality. You conserve your energy wisely. You prefer familiar environments and deep, lasting connections over constant novelty. Your strength lies in endurance rather than explosive bursts." },
      { strength: 5, text: "Your Life Line is fortified by a strong sister line (Mars line), providing a double layer of vitality and protection. You possess an inner warrior spirit. Even in the face of immense challenges, you have a hidden reservoir of strength that carries you through safely." },
      { strength: 4, text: "A long, deep Life Line tapering gently at the end indicates a long, fruitful journey with a graceful transition into the wisdom years. You maintain your core energy well into late life. You are grounded and offer a sense of security to those around you." }
    ],
    headLine: [
      { strength: 5, text: "A deep, straight Head Line reveals a highly logical, analytical, and practical mind. You excel in structured environments and make decisions based on facts rather than emotions. Your focus is sharp, and you have excellent organizational skills." },
      { strength: 4, text: "Your Head Line curves gently down toward the Mount of Moon, indicating a beautiful blend of logic and imagination. You are creative but grounded. You can envision innovative solutions and possess a natural talent for arts or expressive communication." },
      { strength: 3, text: "A relatively short but strong Head Line suggests you process information rapidly and prefer getting straight to the point. You are a quick thinker who doesn't like to overcomplicate things. You excel in situations requiring immediate, instinctive action." },
      { strength: 4, text: "Your Head Line is separated from your Life Line at the start, showing an independent, free-thinking spirit from a young age. You are courageous in your thoughts, often rejecting conventional wisdom in favor of your own experiential truth." },
      { strength: 5, text: "A long Head Line reaching across the palm indicates deep intellectual curiosity and a broad philosophical perspective. You love to learn and analyze complex systems. You have the capacity to see multiple sides of an argument and possess a profound understanding of human nature." },
      { strength: 3, text: "A chained or wavy Head Line points to a highly adaptable but sometimes restless mind. Your interests are varied, and you may find it challenging to stick to just one path. Your flexibility allows you to relate to many different types of people and situations." },
      { strength: 4, text: "Your Head Line forks at the end (the 'Writer's Fork'), signifying a mind that can see both the practical and the imaginative aspects of any situation. This is an excellent mark for writers, diplomats, and entrepreneurs who need versatility in thought." },
      { strength: 4, text: "A Head Line tied closely to the Life Line at the beginning indicates a strong connection to family roots and a cautious early life. As you mature, your thinking becomes highly considered and responsible. You value tradition and stability in your intellectual pursuits." }
    ],
    heartLine: [
      { strength: 5, text: "A deep, clear Heart Line curving up to Jupiter (index finger) indicates a highly idealistic and devoted nature in love. You seek a deep, soulful connection and give your heart completely. You are reliable, warm, and expect the same loyalty in return." },
      { strength: 4, text: "Your Heart Line ends between the index and middle fingers, showing a balanced approach to emotions. You are loving but practical, capable of deep affection without losing yourself. You handle relationships with emotional intelligence and maturity." },
      { strength: 3, text: "A straighter Heart Line ending under Saturn (middle finger) suggests a more reserved and private emotional life. You may not express feelings overtly, preferring to show love through practical actions and loyalty. You value security and respect in relationships." },
      { strength: 5, text: "A long, sweeping Heart Line indicates profound emotional depth and empathy. You feel things intensely and are highly attuned to the moods of others. You are deeply romantic and compassionate, often putting the needs of loved ones before your own." },
      { strength: 4, text: "Your Heart Line features multiple ascending branches, showing a joyful, flirtatious, and socially expansive nature. You make friends easily and bring warmth to any gathering. You have a generous spirit and a positive outlook on love." },
      { strength: 3, text: "A chained Heart Line reveals a complex and sometimes turbulent emotional landscape. You experience high highs and low lows in love. This sensitivity makes you a deeply passionate partner, though you may need to work on emotional boundaries." },
      { strength: 4, text: "Your Heart Line runs parallel to your Head Line (Simian influence), showing an intense personality where thoughts and emotions are deeply intertwined. When you focus on a person or a passion, you do so with unparalleled single-minded devotion." },
      { strength: 5, text: "A Heart Line with a trident at the end is a highly auspicious mark, indicating emotional wealth, good fortune in partnerships, and a deeply generous nature. You attract positive relationships and handle emotional matters with grace and wisdom." }
    ],
    fateLine: [
      { strength: 4, text: "A strong Fate Line rising from the base indicates a clear sense of purpose and a self-made destiny. You have a strong internal compass guiding your career and life path. Your success comes through steady determination and personal effort." },
      { strength: 5, text: "Your Fate Line originates from the Mount of Moon, suggesting your career involves public interaction, creativity, or travel. Your success is often supported by the goodwill of others or public recognition. You have a unique, non-traditional path." },
      { strength: 3, text: "A Fate Line that starts later in the palm (from the Head or Heart line) indicates that your true calling or major success comes later in life. You may experience a significant shift in your career path, leading to ultimate fulfillment." },
      { strength: 4, text: "A Fate Line tied to the Life Line at the start shows strong early family influence on your career. As you grow, you branch out into your own distinct path. You have a strong sense of duty and responsibility in your professional life." },
      { strength: 3, text: "A faint or absent Fate Line is not negative; it means you are a free spirit who doesn't like being tied down to a rigid plan. You prefer to take life as it comes and find joy in versatility rather than climbing a traditional ladder." },
      { strength: 5, text: "A Fate Line ending strongly on the Mount of Saturn with branches toward Jupiter shows immense potential for leadership and authority. You are destined to take on significant responsibilities and achieve high status through discipline." },
      { strength: 4, text: "Your Fate Line has a distinct break or shift, indicating a major pivot in your life path. This transition, while perhaps challenging, ultimately aligns you closer to your true soul purpose. You have the resilience to reinvent yourself." },
      { strength: 5, text: "A double Fate Line reveals a multifaceted career or dual passions pursued simultaneously. You have the energy and capability to manage multiple significant life paths, perhaps balancing a demanding profession with a deep personal calling." }
    ],
    handTypes: [
      { title: "Earth Hand", desc: "Characterized by a square palm and short fingers. You are grounded, practical, and reliable. You connect deeply with nature and prefer tangible results over abstract concepts. Tradition, stability, and hard work are your guiding principles." },
      { title: "Air Hand", desc: "Characterized by a square palm and long fingers. You are an intellectual, a communicator, and a thinker. You process the world through ideas and analysis. You thrive in environments that stimulate your mind and allow you to share concepts." },
      { title: "Fire Hand", desc: "Characterized by a rectangular palm and short fingers. You are dynamic, passionate, and action-oriented. You have a natural charisma and leadership ability. You act on intuition and are always ready for the next adventure or challenge." },
      { title: "Water Hand", desc: "Characterized by a rectangular palm and long fingers. You are deeply sensitive, intuitive, and empathetic. Emotions and aesthetic appreciation guide your life. You have a rich inner world and excel in creative or healing professions." }
    ],
    mounts: {
      Jupiter: {
        prominent: "Strong leadership qualities, ambition, and a natural desire for wisdom and authority.",
        normal: "A healthy balance of confidence, social responsibility, and spiritual inclination.",
        flat: "A tendency toward self-doubt or a preference to follow rather than lead."
      },
      Saturn: {
        prominent: "Deeply analytical, serious, and responsible, with a strong sense of duty.",
        normal: "Practical, patient, and capable of sustained effort toward long-term goals.",
        flat: "May lack discipline or prefer a more carefree, less structured approach to life."
      },
      Apollo: {
        prominent: "Highly creative, charismatic, with a strong desire for self-expression and recognition.",
        normal: "A balanced appreciation for arts, beauty, and finding joy in daily life.",
        flat: "May struggle to express creativity or feel a lack of vitality and inspiration."
      },
      Mercury: {
        prominent: "Excellent communication skills, business acumen, and quick-wittedness.",
        normal: "Good interpersonal skills and adaptability in social and professional settings.",
        flat: "May find public speaking or self-promotion challenging; prefers quiet observation."
      },
      Venus: {
        prominent: "Immense vitality, passion, and a deep capacity for love and sensual enjoyment.",
        normal: "Warm, affectionate nature with a healthy approach to relationships and aesthetics.",
        flat: "More detached or intellectual approach to love; may need to consciously cultivate passion."
      },
      Moon: {
        prominent: "Powerful intuition, vivid imagination, and a strong connection to the subconscious.",
        normal: "Good intuitive instincts balanced with practical reality; appreciates travel and nature.",
        flat: "Relies heavily on logic over intuition; imagination is grounded in the tangible world."
      },
      Mars: {
        prominent: "Great courage, physical vitality, and perseverance in the face of obstacles.",
        normal: "Healthy boundaries, assertiveness, and the ability to handle stress effectively.",
        flat: "May avoid conflict at all costs or struggle to assert personal boundaries."
      }
    },
    remedies: [
      { gem: "Ruby (Manikya)", color: "Saffron / Red", day: "Sunday", mantra: "Om Suryaya Namah", number: 1 },
      { gem: "Pearl (Moti)", color: "White / Silver", day: "Monday", mantra: "Om Somaya Namah", number: 2 },
      { gem: "Red Coral (Moonga)", color: "Deep Red", day: "Tuesday", mantra: "Om Bhaumaya Namah", number: 9 },
      { gem: "Emerald (Panna)", color: "Green", day: "Wednesday", mantra: "Om Budhaya Namah", number: 5 },
      { gem: "Yellow Sapphire (Pukhraj)", color: "Yellow / Gold", day: "Thursday", mantra: "Om Brihaspataye Namah", number: 3 },
      { gem: "Diamond (Heera)", color: "White / Pink", day: "Friday", mantra: "Om Shukraya Namah", number: 6 },
      { gem: "Blue Sapphire (Neelam)", color: "Navy / Black", day: "Saturday", mantra: "Om Shanaishcharaya Namah", number: 8 }
    ]
  };

  function drawLinesOnCanvas(rCtx, width, height) {
    // We draw glowing bezier curves overlaying the palm.
    // Coordinates are percentages to roughly fit a generic palm.
    // The exact positions are slightly randomized based on the seed to make them unique.
    
    const drawLine = (startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY, color) => {
      rCtx.beginPath();
      rCtx.moveTo(startX * width, startY * height);
      rCtx.bezierCurveTo(
        cp1X * width, cp1Y * height,
        cp2X * width, cp2Y * height,
        endX * width, endY * height
      );
      
      rCtx.lineCap = 'round';
      rCtx.lineWidth = 4;
      rCtx.strokeStyle = color;
      rCtx.shadowBlur = 15;
      rCtx.shadowColor = color;
      rCtx.stroke();
      
      // core white line
      rCtx.lineWidth = 2;
      rCtx.strokeStyle = 'rgba(255,255,255,0.8)';
      rCtx.shadowBlur = 0;
      rCtx.stroke();
    };

    // Variation offsets (-0.05 to 0.05)
    const v = () => (seededRandom() - 0.5) * 0.1;

    let flip = isRightHand ? 1 : -1; 
    // If left hand, we mirror the X coordinates around 0.5
    const mx = (x) => isRightHand ? x : 1 - x;

    // Heart Line (Red) - from under pinky across to index
    drawLine(
      mx(0.8 + v()), 0.4 + v(),
      mx(0.6 + v()), 0.35 + v(),
      mx(0.4 + v()), 0.3 + v(),
      mx(0.2 + v()), 0.25 + v(),
      '#ff0055'
    );

    // Head Line (Blue) - from thumb side across middle
    drawLine(
      mx(0.2 + v()), 0.45 + v(),
      mx(0.4 + v()), 0.45 + v(),
      mx(0.6 + v()), 0.5 + v(),
      mx(0.75 + v()), 0.6 + v(),
      '#00bbff'
    );

    // Life Line (Green) - around thumb
    drawLine(
      mx(0.2 + v()), 0.45 + v(),
      mx(0.3 + v()), 0.6 + v(),
      mx(0.4 + v()), 0.8 + v(),
      mx(0.3 + v()), 0.95 + v(),
      '#00ff66'
    );

    // Fate Line (Gold) - vertical up center
    if(seededRandom() > 0.2) { // 80% chance to have a strong fate line
      drawLine(
        mx(0.5 + v()), 0.9 + v(),
        mx(0.5 + v()), 0.7 + v(),
        mx(0.45 + v()), 0.5 + v(),
        mx(0.45 + v()), 0.3 + v(),
        '#ffaa00'
      );
    }
  }

  function generateDots(strength) {
    let html = '';
    for(let i=1; i<=5; i++) {
      html += `<div class="dot ${i <= strength ? 'filled' : ''}"></div>`;
    }
    return html;
  }

  function showResults() {
    scannerSection.style.display = 'none';
    resultsDashboard.style.display = 'block';

    // Draw lines
    const rCtx = resultCanvas.getContext('2d');
    drawLinesOnCanvas(rCtx, resultCanvas.width, resultCanvas.height);

    // Hand Type
    const hType = pickFromArray(textPools.handTypes);
    document.getElementById('resHandTypeTitle').innerText = hType.title;
    document.getElementById('resHandTypeDesc').innerText = hType.desc;

    // Lines Accordion
    const life = pickFromArray(textPools.lifeLine);
    const head = pickFromArray(textPools.headLine);
    const heart = pickFromArray(textPools.heartLine);
    const fate = pickFromArray(textPools.fateLine);

    document.getElementById('linesAccordion').innerHTML = `
      <div class="accordion-item">
        <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('open')">
          <span>🌿 Life Line (Vitality & Journey)</span>
          <span>▼</span>
        </div>
        <div class="accordion-content">
          <p>${life.text}</p>
          <div class="strength-meter">Strength: ${generateDots(life.strength)}</div>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('open')">
          <span>🧠 Head Line (Intellect & Focus)</span>
          <span>▼</span>
        </div>
        <div class="accordion-content">
          <p>${head.text}</p>
          <div class="strength-meter">Strength: ${generateDots(head.strength)}</div>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('open')">
          <span>❤️ Heart Line (Emotions & Love)</span>
          <span>▼</span>
        </div>
        <div class="accordion-content">
          <p>${heart.text}</p>
          <div class="strength-meter">Strength: ${generateDots(heart.strength)}</div>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header" onclick="this.nextElementSibling.classList.toggle('open')">
          <span>⭐ Fate Line (Career & Destiny)</span>
          <span>▼</span>
        </div>
        <div class="accordion-content">
          <p>${fate.text}</p>
          <div class="strength-meter">Strength: ${generateDots(fate.strength)}</div>
        </div>
      </div>
    `;

    // Mounts
    const statuses = ['prominent', 'normal', 'flat'];
    let mountsHtml = '';
    for(const [mName, mData] of Object.entries(textPools.mounts)) {
      const status = statuses[Math.floor(seededRandom() * 3)];
      mountsHtml += `
        <div class="mount-card">
          <div class="mount-name">${mName}</div>
          <div class="mount-status">${status}</div>
          <div class="mount-desc">${mData[status]}</div>
        </div>
      `;
    }
    document.getElementById('mountsGrid').innerHTML = mountsHtml;

    // Remedies
    const rem = pickFromArray(textPools.remedies);
    document.getElementById('remediesGrid').innerHTML = `
      <div class="remedy-item">
        <div class="remedy-icon">💎</div>
        <div class="remedy-label">Gemstone</div>
        <div class="remedy-value">${rem.gem}</div>
      </div>
      <div class="remedy-item">
        <div class="remedy-icon">🎨</div>
        <div class="remedy-label">Color</div>
        <div class="remedy-value">${rem.color}</div>
      </div>
      <div class="remedy-item">
        <div class="remedy-icon">📅</div>
        <div class="remedy-label">Auspicious Day</div>
        <div class="remedy-value">${rem.day}</div>
      </div>
      <div class="remedy-item">
        <div class="remedy-icon">🕉️</div>
        <div class="remedy-label">Mantra</div>
        <div class="remedy-value">${rem.mantra}</div>
      </div>
      <div class="remedy-item">
        <div class="remedy-icon">🔢</div>
        <div class="remedy-label">Lucky Number</div>
        <div class="remedy-value">${rem.number}</div>
      </div>
    `;
    
    // Open the first accordion by default
    document.querySelector('.accordion-content').classList.add('open');
    
    // Scroll to results
    resultsDashboard.scrollIntoView({ behavior: 'smooth' });
  }

});
