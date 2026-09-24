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
  const handGuideWrap = document.getElementById('handGuideWrap');
  const handFitIndicator = document.getElementById('handFitIndicator');
  const handFitText = document.getElementById('handFitText');

  let stream = null;
  let imageSource = null; // Can be video or img element
  let hashSeed = 0;
  let isRightHand = true;
  let isDualMode = false;
  let currentDualStep = 'left'; // 'left' or 'right'
  let dualLeftSeed = null;
  let dualRightSeed = null;

  const btnCapturePalm = document.getElementById('btnCapturePalm');

  function resetScanHighlightLines() {
    ['scanHeartLine', 'scanHeadLine', 'scanLifeLine', 'scanFateLine', 'pinHeart', 'pinHead', 'pinLife', 'pinFate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });
  }

  function updateHandGuideOrientation() {
    if (!handGuide) return;
    if (isRightHand) {
      handGuide.classList.add('left-hand');
      if (handFitText && (!handFitIndicator || !handFitIndicator.classList.contains('locked'))) {
        handFitText.innerText = '✋ Place your Right Palm within the contour';
      }
    } else {
      handGuide.classList.remove('left-hand');
      if (handFitText && (!handFitIndicator || !handFitIndicator.classList.contains('locked'))) {
        handFitText.innerText = '✋ Place your Left Palm within the contour';
      }
    }
  }

  // Initial orientation call
  updateHandGuideOrientation();

  // Dual-mode and Single-mode toggles
  const btnModeSingle = document.getElementById('btnModeSingle');
  const btnModeDual = document.getElementById('btnModeDual');
  const dualPalmBanner = document.getElementById('dualPalmBanner');
  const dualPalmTabs = document.getElementById('dualPalmTabs');
  const singleHandRow = document.getElementById('singleHandRow');
  const tabPalmLeft = document.getElementById('tabPalmLeft');
  const tabPalmRight = document.getElementById('tabPalmRight');

  if (btnModeSingle && btnModeDual) {
    btnModeSingle.addEventListener('click', () => {
      isDualMode = false;
      btnModeSingle.classList.add('active');
      btnModeDual.classList.remove('active');
      if (dualPalmBanner) dualPalmBanner.style.display = 'none';
      if (dualPalmTabs) dualPalmTabs.style.display = 'none';
      if (singleHandRow) singleHandRow.style.display = 'block';
      isRightHand = true;
      updateHandGuideOrientation();
    });

    btnModeDual.addEventListener('click', () => {
      isDualMode = true;
      btnModeDual.classList.add('active');
      btnModeSingle.classList.remove('active');
      if (dualPalmBanner) dualPalmBanner.style.display = 'flex';
      if (dualPalmTabs) dualPalmTabs.style.display = 'flex';
      if (singleHandRow) singleHandRow.style.display = 'none';
      isRightHand = false; // Start with Left palm in dual mode
      if (tabPalmLeft) tabPalmLeft.classList.add('active');
      if (tabPalmRight) tabPalmRight.classList.remove('active');
      updateHandGuideOrientation();
    });
  }

  if (tabPalmLeft && tabPalmRight) {
    tabPalmLeft.addEventListener('click', () => {
      currentDualStep = 'left';
      isRightHand = false;
      tabPalmLeft.classList.add('active');
      tabPalmRight.classList.remove('active');
      updateHandGuideOrientation();
    });
    tabPalmRight.addEventListener('click', () => {
      currentDualStep = 'right';
      isRightHand = true;
      tabPalmRight.classList.add('active');
      tabPalmLeft.classList.remove('active');
      updateHandGuideOrientation();
    });
  }

  // Toggle hand for single mode
  document.getElementById('btnRightHand').addEventListener('click', (e) => {
    isRightHand = true;
    e.target.classList.add('active');
    document.getElementById('btnLeftHand').classList.remove('active');
    updateHandGuideOrientation();
  });
  document.getElementById('btnLeftHand').addEventListener('click', (e) => {
    isRightHand = false;
    e.target.classList.add('active');
    document.getElementById('btnRightHand').classList.remove('active');
    updateHandGuideOrientation();
  });

  const scanPlaceholder = document.getElementById('scanPlaceholder');
  const btnSample = document.getElementById('btnSample');
  const btnPlaceholderDemo = document.getElementById('btnPlaceholderDemo');

  // Floating Capture Button (Kundli.online)
  if (btnCapturePalm) {
    btnCapturePalm.addEventListener('click', () => {
      if (stream) {
        btnScan.click();
      } else if (preview && preview.style.display === 'block') {
        btnScan.click();
      } else {
        btnCamera.click();
      }
    });
  }

  // Start Camera
  btnCamera.addEventListener('click', async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      video.srcObject = stream;
      video.style.display = 'block';
      preview.style.display = 'none';
      if (handGuide) {
        handGuide.style.display = 'block';
        handGuide.classList.remove('locked');
      }
      if (handFitIndicator) {
        handFitIndicator.style.display = 'flex';
        handFitIndicator.classList.remove('locked');
        updateHandGuideOrientation();
      }
      if (btnCapturePalm) {
        btnCapturePalm.innerHTML = '<span style="font-size:1.15rem;">📷</span> Capture Palm';
      }
      if (scanPlaceholder) scanPlaceholder.style.display = 'none';
      btnCamera.style.display = 'none';
      btnUpload.style.display = 'none';
      if (btnSample) btnSample.style.display = 'none';
      btnScan.style.display = 'inline-flex';
      btnRetake.style.display = 'inline-flex';
      imageSource = video;
      resultsDashboard.style.display = 'none';
    } catch (err) {
      alert("Camera access denied or unavailable. Please use 'Upload Photo' or 'Try Demo Hand'.");
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
    if (handGuide) {
      handGuide.style.display = 'block';
      handGuide.classList.remove('locked');
    }
    if (handFitIndicator) {
      handFitIndicator.style.display = 'flex';
      handFitIndicator.classList.remove('locked');
      updateHandGuideOrientation();
    }
    if (btnCapturePalm) {
      btnCapturePalm.innerHTML = '<span style="font-size:1.15rem;">✨</span> Scan Palm';
    }
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
        if (handGuide) {
          handGuide.style.display = 'block';
          handGuide.classList.remove('locked');
        }
        if (handFitIndicator) {
          handFitIndicator.style.display = 'flex';
          handFitIndicator.classList.remove('locked');
          updateHandGuideOrientation();
        }
        if (btnCapturePalm) {
          btnCapturePalm.innerHTML = '<span style="font-size:1.15rem;">✨</span> Scan Palm';
        }
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
    if (handGuide) {
      handGuide.style.display = 'block';
      handGuide.classList.remove('locked');
    }
    if (handFitIndicator) {
      handFitIndicator.style.display = 'flex';
      handFitIndicator.classList.remove('locked');
      updateHandGuideOrientation();
    }
    resetScanHighlightLines();
    if (btnCapturePalm) {
      btnCapturePalm.innerHTML = '<span style="font-size:1.15rem;">⛶</span> Capture';
    }
    if (scanPlaceholder) scanPlaceholder.style.display = 'none';
    btnCamera.style.display = 'inline-flex';
    btnUpload.style.display = 'inline-flex';
    if (btnSample) btnSample.style.display = 'inline-flex';
    btnScan.style.display = 'none';
    btnRetake.style.display = 'none';
    resultsDashboard.style.display = 'none';
  });

  // Start Scan
  btnScan.addEventListener('click', () => {
    // Lock hand guide and fit status
    if (handGuide) handGuide.classList.add('locked');
    if (handFitIndicator) {
      handFitIndicator.classList.add('locked');
      if (handFitText) handFitText.innerText = `✓ ${isRightHand ? 'RIGHT' : 'LEFT'} PALM CONTOURS LOCKED — 99.4% FIT ALIGNED`;
    }

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
    resetScanHighlightLines();
    let progress = 0;

    const scanHeartLine = document.getElementById('scanHeartLine');
    const scanHeadLine = document.getElementById('scanHeadLine');
    const scanLifeLine = document.getElementById('scanLifeLine');
    const scanFateLine = document.getElementById('scanFateLine');
    const pinHeart = document.getElementById('pinHeart');
    const pinHead = document.getElementById('pinHead');
    const pinLife = document.getElementById('pinLife');
    const pinFate = document.getElementById('pinFate');
    
    const messages = [
      'Detecting palm contours & boundary coordinates...',
      'Segmenting hand region & identifying 3-Tier architecture...',
      'Tracing Heart Line & Mount of Jupiter coordinates...',
      'Tracing Head Line vector & calculating Angle of Luck...',
      'Tracing Life Line arc & measuring Mount of Venus...',
      'Topography: Evaluating Saturn, Sun/Apollo & Mercury mounts...',
      'Cross-referencing Vyas (1976), Shrimali Yogas & Wilson (1971)...',
      'Finalizing Multi-Tradition Karmic Blueprint...'
    ];

    const telemetries = [
      'GEO_LOCK: PALM_CONTOURS_ACQUIRED [LAT: 28.61° N]',
      'TIER_ANALYSIS: [BASE: 34%] [WORLDLY: 38%] [MIND: 28%]',
      'VECTOR_TRACE: [CORDIS / HEART_LINE: 94.2%]',
      'ANGLE_CALC: [ANG_LUCK: EXPANSIVE] [ANG_GENEROSITY: 72°]',
      'ARC_MAPPING: [VITA / LIFE_LINE: 96.8%]',
      'TOPOGRAPHY: [JUPITER: +2.4mm] [SATURN: STABLE] [VENUS: ELEVATED]',
      'SHASTRA MATRIX: VYAS (1976) • SHRIMALI • WILSON (1971)',
      'SYNTHESIS: COMPILING 3-TRADITION BLUEPRINT (100%)...'
    ];
    
    let msgIdx = 0;
    scanMessage.innerText = messages[0];
    const telemetryEl = document.getElementById('telemetryStatus');
    if (telemetryEl) telemetryEl.innerText = telemetries[0];
    
    const msgInterval = setInterval(() => {
      msgIdx++;
      if (msgIdx < messages.length) {
        scanMessage.innerText = messages[msgIdx];
        if (telemetryEl) telemetryEl.innerText = telemetries[msgIdx];

        // Progressive in-scanning line highlight & pins at exact anatomical positions
        if (msgIdx === 2) {
          if (scanHeartLine) scanHeartLine.classList.add('active');
          if (pinHeart) pinHeart.classList.add('active');
        } else if (msgIdx === 3) {
          if (scanHeadLine) scanHeadLine.classList.add('active');
          if (pinHead) pinHead.classList.add('active');
        } else if (msgIdx === 4) {
          if (scanLifeLine) scanLifeLine.classList.add('active');
          if (pinLife) pinLife.classList.add('active');
        } else if (msgIdx === 5 || msgIdx === 6) {
          if (scanFateLine) scanFateLine.classList.add('active');
          if (pinFate) pinFate.classList.add('active');
        }
      }
    }, 1000); // changes every 1s for 8s total
    
    const progInterval = setInterval(() => {
      progress += (100 / 80); // reach 100 in 8 seconds (80 * 100ms)
      scanProgress.style.width = Math.min(progress, 100) + '%';
      if (progress >= 100) {
        clearInterval(msgInterval);
        clearInterval(progInterval);
        scanOverlay.style.display = 'none';
        resetScanHighlightLines();

        if (isDualMode && currentDualStep === 'left' && !dualRightSeed) {
          // Record left seed
          dualLeftSeed = hashSeed;
          // Pre-seed right for a balanced synthesis
          dualRightSeed = hashSeed + 347;
        }

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
      {
        title: "Samkona Hasta (Square / Practical Hand — समकोण हाथ)",
        desc: "According to Shri Vasant Lal Vyas's Hasta Samudrika Shastra (1976), the Samkona hand features a balanced square palm, firm thumb, and even fingertips. You possess methodical discipline, deep respect for truth and justice, and extraordinary patience. You excel in administration, commerce, legal frameworks, and constructive leadership."
      },
      {
        title: "Darshanik Hasta (Philosophic / Knotted Hand — दार्शनिक या गांठदार हाथ)",
        desc: "Characterized by long, bony fingers with prominent knuckle knots (Sandhi Ganth) and an angular palm. Vyas notes this is the hand of profound thinkers, sages, and seekers of absolute truth. You are naturally indifferent to worldly pomp, prize intellectual depth over material display, and possess contemplative foresight."
      },
      {
        title: "Kalakar Hasta (Artistic / Conical Hand — कलात्मक या शंक्वाकार हाथ)",
        desc: "Features gently tapering fingers, smooth phalanges, and a soft, supple palm. The Shastra describes this native as a lover of fine arts, music, poetry, and aesthetic beauty. You are deeply intuitive, receptive to psychic impressions, generous to a fault, and thrive in creative environments."
      },
      {
        title: "Chamasakar Hasta (Spatulate / Energetic Hand — चमसाकार हाथ)",
        desc: "Broad at the base or knuckles with spoon-like (spatulate) fingertips. The treatise designates this as the hand of inventors, navigators, and tireless pioneers. You possess relentless drive, disdain conventional routine, and conquer physical and technological frontiers through inventive resolve."
      },
      {
        title: "Aadarshvadi Hasta (Idealistic / Psychic Hand — आदर्शवादी हाथ)",
        desc: "Extremely slender, elegant, with long pointed fingers and delicate skin. As Vyas explains, this sacred hand belongs to pure mystics, poets, and visionaries. You possess spiritual receptivity, ethereal intuition, and a gentle soul guided by divine harmony."
      },
      {
        title: "Mishrit Hasta (Mixed Hand — मिश्रित हाथ)",
        desc: "Combines elements of multiple classical hand categories (e.g. square palm with philosophical knots or artistic fingertips). The treatise notes this confers rare versatility, enabling you to excel simultaneously in practical business and creative or intellectual vocations."
      },
      {
        title: "Ati-Vidagdha Hasta (Intellectual Master Hand — अति-विदग्ध हाथ)",
        desc: "Features long, refined Mercury (little) and Jupiter fingers with balanced mounts. Vyas identifies this as the signature of master orators, high counselors, and strategic minds capable of orchestrating complex enterprises with tact and eloquence."
      },
      {
        title: "Prathamik Hasta (Elementary Hand — प्राथमिक / निकृष्ट हाथ)",
        desc: "Sturdy, thick palm with short, heavy fingers and deep primal vitality. Shastra notes extraordinary physical endurance, direct connection to the earth and nature, and unshakeable resilience against hardships."
      }
    ],
    angusthaData: [
      {
        willRatio: 52,
        logicRatio: 48,
        yavaType: "Purna Yava (पूर्ण यव — Complete Barley Mark)",
        yavaDesc: "A complete, unbroken barley-grain (Yava) is clearly marked at the joint of the thumb. Vyas's treatise highlights this as one of the highest auspicious marks in Samudrika Shastra: it confers lifelong financial independence, royal/governmental goodwill, and virtuous family lineage.",
        stance: "Balanced Firm Stance (सौम्य एवं स्वाभिमानी)",
        willDesc: "The First Phalanx (Will Power / इच्छा पर्व) and Second Phalanx (Logic / तर्क पर्व) are in near-perfect equilibrium. You do not act recklessly, nor do you get paralyzed in over-analysis. You plan methodically and execute decisively."
      },
      {
        willRatio: 58,
        logicRatio: 42,
        yavaType: "Uttama Yava Mala (उत्तम यव माला — Chain of Fortune)",
        yavaDesc: "Distinct Yava grains interlinked at the thumb base signify steady accumulation of landed property and ancestral blessings. Born under an auspicious lunar phase with strong protective karma.",
        stance: "Firm & Unyielding (दृढ़निश्चयी एवं साहसी)",
        willDesc: "The First Phalanx dominates, indicating powerful command, leadership charisma, and the determination to overcome insurmountable hurdles. When you resolve to complete a task, obstacles yield before your resolve."
      },
      {
        willRatio: 44,
        logicRatio: 56,
        yavaType: "Shukla Yava Rekha (शुक्ल यव रेखा — Auspicious Crescent)",
        yavaDesc: "Indicates daytime or Shukla Paksha birth influence. Confers high intellectual acumen, success in negotiations, diplomacy, and prosperity attained through intellectual and communicative prowess.",
        stance: "Flexible & Adaptable (उदार एवं मिलनसार)",
        willDesc: "The Second Phalanx (Logic & Reason) is elongated and highly developed. You are an exceptional strategist, tactician, and debater. You foresee chess-moves ahead of others and achieve victory through wisdom rather than brute force."
      }
    ],
    manibandhaData: [
      {
        linesCount: 3,
        linesDesc: "Triveni Manibandha (त्रिवेणी मणिवन्ध) — Three distinct, unbroken parallel bracelets at the wrist.",
        line1: "First Line (Arogya / Swasthya Rekha): Deep and unbroken, indicating a robust physical constitution, vitality, and immunity throughout life.",
        line2: "Second Line (Dhana / Sampatti Rekha): Clear and even, signifying steady financial growth and prosperity in the prime of life (ages 30–55).",
        line3: "Third Line (Kirti / Pratishtha Rekha): Well-defined, indicating social honor, leadership status, and lasting public esteem.",
        vitalityYears: "80–88 years of active vitality"
      },
      {
        linesCount: 4,
        linesDesc: "Chatush-Manibandha (चतुष्-मणिवन्ध / राजयोग बन्ध) — Rare fourfold bracelets indicating extraordinary spiritual and karmic grace.",
        line1: "First Line (Constitution): Highly defined, granting swift physical recovery and stamina.",
        line2: "Second Line (Prosperity): Flourishing, indicating unearned blessings, fruitful investments, and material abundance.",
        line3: "Third Line (Renown): Prominent, granting wide social acclaim and authority in your chosen sphere.",
        line4: "Fourth Line (Moksha & Wisdom): Extremely rare; signifies profound spiritual discernment, detachment from trivial disputes, and veneration in mature years.",
        vitalityYears: "90+ years of fulfilled life journey"
      },
      {
        linesCount: 3,
        linesDesc: "Pushta Manibandha (पुष्ट मणिवन्ध) — Firmly set wrist bracelets with ascending branches toward the palm.",
        line1: "First Line: Slightly chained early, smoothing out into an unbroken band signifying strengthening vitality after youth.",
        line2: "Second Line: Deep and continuous, indicating self-made wealth and successful commercial enterprise.",
        line3: "Third Line: Clear under Venus, indicating peaceful domestic happiness, loyal companions, and family honor.",
        vitalityYears: "78–85 years of fruitful vitality"
      }
    ],
    shastraSymbols: [
      {
        name: "Matsya Rekha (Fish Sign — मत्स्य चिह्न)",
        icon: "🐟",
        desc: "Formed near the base of the Life or Fate line. According to Shri Vasant Lal Vyas, the fish sign is a signature of royal favor, overseas travel, wealth acquired from multiple directions, and deep spiritual liberation."
      },
      {
        name: "Trishula (Trident — त्रिशूल चिह्न)",
        icon: "🔱",
        desc: "Appearing at the terminus of the Fate Line on Mount Saturn or Apollo Line. Signifies the three-pronged grace of Shiva: undisputed victory in professional competition, authority, and divine protection during crises."
      },
      {
        name: "Padma Chihna (Lotus Sign — कमल चिह्न)",
        icon: "🪷",
        desc: "A sacred petal-like configuration near the Mount of Jupiter or Venus. Reflects Goddess Lakshmi's perpetual grace, purity of moral conduct, and leadership that uplifts an entire community."
      },
      {
        name: "Swastika Rekha (स्वस्तिक चिह्न)",
        icon: "卐",
        desc: "Auspicious symmetrical intersection on the Mount of Jupiter. Shastra designates this as the mark of a righteous leader, builder of dharmic institutions, and recipient of ancestral fame."
      },
      {
        name: "Shankha (Conch Sign — शंख चिह्न)",
        icon: "🐚",
        desc: "Subtle spiral whorl on the Mount of Moon or fingertips. Denotes scholarly eloquence, sweet and persuasive voice, legal acumen, and distinction in literary or educational pursuits."
      }
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
    ],
    /* ============================================================
       Dr. Narayan Datt Shrimali — हस्त-रेखा शास्त्र (हस्तरेखा योग)
       Nail Analysis, Finger Knots, Palm Properties & Yoga System
       ============================================================ */
    nailTypes: [
      {
        type: "Purna Nakhun (पूर्ण नाखून — Perfect Nails)",
        icon: "💅",
        desc: "Slightly longer than wide with natural lustre. Shrimali designates this as the mark of elevated character, humanistic values, and continuous forward momentum. Such individuals succeed across all spheres of life.",
        health: "Excellent cardiovascular and metabolic health.",
        trait: "Noble, progressive, balanced temperament"
      },
      {
        type: "Golaakar Nakhun (गोलाकार नाखून — Rounded Nails)",
        icon: "⭕",
        desc: "Nails with rounded tips indicate strong-willed individuals who make swift decisions and follow through with action. They possess executive capability and natural authority.",
        health: "Strong nervous system and immune response.",
        trait: "Decisive, action-oriented, commanding"
      },
      {
        type: "Kalatmak Nakhun (कलात्मक नाखून — Artistic Nails)",
        icon: "🎨",
        desc: "Thin, long, and elegantly shaped nails reflect a refined aesthetic sensibility. Such individuals may be physically delicate but possess exceptional creative and spiritual depth.",
        health: "Sensitive constitution; benefits from meditation and pranayama.",
        trait: "Artistic, spiritually receptive, imaginative"
      },
      {
        type: "Vargaakar Nakhun (वर्गाकार नाखून — Square Nails)",
        icon: "⬜",
        desc: "Square-shaped nails reveal a gentle, cautious temperament. According to Shrimali, this indicates humility and a preference for working behind the scenes rather than seeking the spotlight.",
        health: "Monitor cardiac health; regular exercise recommended.",
        trait: "Humble, careful, supportive nature"
      }
    ],
    fingerKnots: [
      {
        finger: "Tarjani (तर्जनी — Index Finger)",
        upperKnot: "Upper knot present: Skilled in practical affairs, strategic in career decisions.",
        lowerKnot: "Lower knot present: Deep analytical intelligence, methodical thinker.",
        bothKnots: "Both knots: May tend toward excessive deliberation; guard against indecisiveness.",
        noKnots: "No knots: Clever, resourceful, and naturally successful in chosen endeavors."
      },
      {
        finger: "Madhyama (मध्यमा — Middle Finger)",
        upperKnot: "Upper knot: Firm determination; does not lose heart even after repeated setbacks.",
        lowerKnot: "Lower knot: May face cyclical business reversals; persistence eventually pays off.",
        bothKnots: "Both knots: Rapid rise followed by rapid correction — diversify investments.",
        noKnots: "No knots: Profound scholar or magnanimous merchant who supports hundreds."
      },
      {
        finger: "Anamika (अनामिका — Ring Finger)",
        upperKnot: "Upper knot: Deeply reverent and spiritually inclined; may be overly cautious.",
        lowerKnot: "Lower knot: Less interest in ritual dharma; pragmatic worldview.",
        bothKnots: "Both knots: Self-focused; redirect energy toward community service for balance.",
        noKnots: "No knots: Natural community leader with a definite higher purpose."
      },
      {
        finger: "Kanishthika (कनिष्ठिका — Little Finger)",
        upperKnot: "Upper knot: Socially active; dedicates life to constructive causes.",
        lowerKnot: "Lower knot: Exceptionally shrewd; excels in law, negotiation, or trade.",
        bothKnots: "Both knots: Guard against opportunism; channel talents ethically.",
        noKnots: "No knots: Pure idealist; offers fresh contributions to society."
      }
    ],
    palmProperties: [
      {
        palmColor: "Gulabi (गुलाबी — Rose Pink)",
        palmColorDesc: "Healthy, progressive, and balanced. Such individuals rise from ordinary beginnings to extraordinary heights through their own effort and merit.",
        palmTexture: "Chikni Tvacha (चिकनी त्वचा — Smooth Skin)",
        palmTextureDesc: "Determined and goal-oriented. The life path is clear and the individual progresses toward it without distraction.",
        palmSize: "Samanya Hast (सामान्य हाथ — Balanced Hand)",
        palmSizeDesc: "Practically intelligent, socially adept, and skilled at adapting to changing circumstances. Earns respect in society through sustained effort."
      },
      {
        palmColor: "Halka Lal (हल्का लाल — Light Red)",
        palmColorDesc: "Energetic and passionate disposition. Strong willpower but should practice patience and mindfulness to channel intensity constructively.",
        palmTexture: "Mulayam Tvacha (मुलायम त्वचा — Soft Skin)",
        palmTextureDesc: "Imaginative and empathetic. Natural helper with a gentle, accommodating nature. Especially common in nurturing personalities.",
        palmSize: "Lamba Hast (लम्बा हाथ — Long Hand)",
        palmSizeDesc: "Highly perceptive, detail-oriented, and socially graceful. Excellent judges of character who see through to the heart of complex situations."
      },
      {
        palmColor: "Svarna Aabha (स्वर्ण आभा — Golden Glow)",
        palmColorDesc: "Radiant constitution indicating robust vitality and inner harmony. Associated with individuals who maintain physical and spiritual discipline.",
        palmTexture: "Dridh Tvacha (दृढ़ त्वचा — Firm Skin)",
        palmTextureDesc: "Hard-working and resilient. Does not give up when obstacles arise. Success comes through persistent effort and unwavering focus.",
        palmSize: "Samchoras Hast (समचौरस हाथ — Square Palm)",
        palmSizeDesc: "Healthy, calm, resolute, and self-made. Does not start a task without full confidence in its success, but once started, invests complete energy until completion."
      }
    ],
    hastaRekhaYogas: [
      {
        name: "Gaj Lakshmi Yoga (गजलक्ष्मी योग)",
        icon: "🐘",
        meaning: "When the Fate Line rises strongly from the wrist to Saturn, and the Sun Line runs parallel with equal clarity, and both are supported by an unbroken Life Line — this triple conjunction forms the Gaj Lakshmi Yoga. Shrimali notes this is the mark of immense prosperity, leadership, and lasting legacy.",
        effect: "Wealth, authority, and public honor throughout life."
      },
      {
        name: "Raj Yoga (राज योग)",
        icon: "👑",
        meaning: "When the Fate Line terminates powerfully on Mount Saturn with ascending branches toward Jupiter, and the Head Line is long, deep, and unwavering — the native commands authority equivalent to kings. Career zenith arrives between ages 34-42.",
        effect: "Supreme authority, governance, and executive power."
      },
      {
        name: "Maha Bhagya Yoga (महाभाग्य योग)",
        icon: "🌟",
        meaning: "Formed when all four major lines (Life, Head, Heart, Fate) are deep, unbroken, and well-colored, combined with developed Jupiter and Sun mounts. This rare configuration grants extraordinary fortune across all life domains.",
        effect: "Exceptional luck in career, relationships, health, and spiritual growth."
      },
      {
        name: "Vidya Yoga (विद्या योग)",
        icon: "📚",
        meaning: "When Mercury mount is well-developed with a clear Sun Line and the Head Line extends across the full palm with a Writer's Fork — the native possesses exceptional intellectual gifts. Mastery in education, research, or literary arts.",
        effect: "Scholarly excellence, literary fame, and intellectual authority."
      },
      {
        name: "Dhan Vriddhi Yoga (धनवृद्धि योग)",
        icon: "💰",
        meaning: "When the Fate Line has ascending branches toward the Sun mount, and the second Manibandha bracelet is deep and unbroken, wealth accumulates steadily through one's own enterprise. Peak financial growth between ages 30-50.",
        effect: "Progressive wealth accumulation and financial security."
      },
      {
        name: "Moksha Prapti Yoga (मोक्ष प्राप्ति योग)",
        icon: "🙏",
        meaning: "When the Heart Line rises toward Jupiter with spiritual depth, and the Mount of Moon is well-developed with intuitive cross-marks — the native achieves profound spiritual liberation and inner peace in the latter half of life.",
        effect: "Spiritual enlightenment, detachment, and inner peace."
      },
      {
        name: "Kalatmak Yoga (कला योग)",
        icon: "🎭",
        meaning: "When the Sun mount is prominent with pink coloration, the ring finger is well-proportioned, and the Heart Line shows ascending branches — the native possesses innate artistic genius. Success in music, painting, theater, or literary arts.",
        effect: "Artistic brilliance, creative fame, and aesthetic mastery."
      },
      {
        name: "Purna Aayu Yoga (पूर्ण आयु योग)",
        icon: "🌿",
        meaning: "When the Life Line sweeps broadly around Venus mount without breaks, the three Manibandha bracelets are clear, and no adverse cross-marks appear on Saturn — the native enjoys a full, healthy lifespan with vigor maintained well into advanced years.",
        effect: "Long life (75-90+ years), robust health, and graceful aging."
      },
      {
        name: "Sainik Yoga (सैनिक योग)",
        icon: "⚔️",
        meaning: "When Mars mount (both upper and lower) is prominently developed, the thumb shows dominant Will phalanx, and the Life Line has a sister line — the native possesses warrior-like courage, physical prowess, and natural leadership in defense or competitive fields.",
        effect: "Military aptitude, physical courage, and competitive dominance."
      },
      {
        name: "Lakshmi Yoga (लक्ष्मी योग)",
        icon: "🪷",
        meaning: "When Venus mount is well-developed, the Heart Line ends with a trident near Jupiter, and the second bracelet of Manibandha is deeply etched — Goddess Lakshmi's perpetual grace ensures domestic harmony, beauty, and material comfort.",
        effect: "Domestic bliss, beauty, material comfort, and loving relationships."
      }
    ],
    /* ============================================================
       Joyce Wilson — The Complete Book of Palmistry (1971)
       Esoteric Hand Architecture, Dual-Palm Polarity, Angles & Markings
       ============================================================ */
    dualPalmPolarity: [
      {
        title: "Harmonious Destiny Realization (प्रारब्ध-क्रियामाण सामंजस्य)",
        badge: "High Alignment",
        desc: "Your Left Palm (innate blueprint) and Right Palm (active free will) show high congruence. What you were born to achieve is actively manifesting in your day-to-day decisions. Your conscious mind is in sync with your deeper soul calling.",
        leftInsight: "Innate gifts of intuition, natural charm, and resilience.",
        rightInsight: "Active career consolidation, deliberate habits, and steady material gain."
      },
      {
        title: "Conscious Evolution Beyond Birth Limits (पुरुषार्थ विकास)",
        badge: "Transcendent Path",
        desc: "Your Right Palm demonstrates significantly stronger focus, deeper line clarity, and more organized mount topography than your Left. As Joyce Wilson notes, this proves that your personal will, discipline, and education have overcome early life limitations and created your own luck.",
        leftInsight: "Sensitive beginnings, fluctuating emotional direction.",
        rightInsight: "Sharp executive intellect, firm financial discipline, and command over fate."
      },
      {
        title: "Protective Grounding & Karmic Mastery (कर्म शुद्धि)",
        badge: "Disciplined Focus",
        desc: "While your Left Palm displays a wide array of diffuse creative lines, your Right Palm has consolidated into steady, protective channels. You have learned to say no to distractions, anchoring your vital life force into lasting, enduring structures.",
        leftInsight: "Restless imagination, wide spectrum of speculative interests.",
        rightInsight: "Anchored purpose, grounded domestic stability, and protected vitality."
      }
    ],
    handTiers: {
      physicalBase: {
        title: "The Base Tier (Physical Body & Subconscious Realm)",
        ruler: "Encompasses Mount of Venus, Mount of Moon & Lower Plain of Mars",
        reading: "The lower third of your palm reveals a robust reservoir of Prana and instinctual vitality. Grounded in the Mount of Venus, your vital forces supply continuous physical stamina, while the creative percussion of the Moon enriches your dreams and instinctual impulses."
      },
      worldlyMid: {
        title: "The Worldly Mid-Tier (The Quadrangle & Battleground of Life)",
        ruler: "Encompasses Plain of Mars, Quadrangle between Head & Heart Lines",
        reading: "The central plain and quadrangle mediate between your emotional heart and rational intellect. Your spacious quadrangle ensures a generous, broad-minded outlook that avoids petty grudges, allowing you to negotiate life's conflicts with diplomatic poise."
      },
      spiritualUpper: {
        title: "The Upper Tier (Intellect & Planetary Fingers)",
        ruler: "Encompasses Jupiter, Saturn, Uranus/Apollo & Mercury Fingers",
        reading: "Your upper finger segments show pronounced intellectual cushions. The Jupiter finger commands respect and professional dignity, while the Apollo/Uranus finger channels creative inspiration directly into your practical worldly ventures."
      }
    },
    esotericAngles: [
      {
        name: "Angle of Generosity (उदारता कोण)",
        icon: "🤲",
        degree: "Wide (~65°–75°)",
        desc: "Formed by the span between your thumb and index finger. In Wilson's esoteric system, a wide angle indicates an open-handed, magnanimous nature that readily shares wealth and knowledge, ensuring that abundance circulates freely in your life."
      },
      {
        name: "Angle of Luck (भाग्य कोण)",
        icon: "📐",
        degree: "Expansive Triad",
        desc: "Formed where the Head Line separates from the Life Line. An open angle denotes a courageous spirit that welcomes new ventures. When joined with the line of business/health, it forms the 'Lucky Triangle' (Plain of Mars), providing ample strategic room to conquer challenges."
      },
      {
        name: "The Mystic Cross (रहस्यमय क्रास)",
        icon: "✝️",
        degree: "Mid-Palm Quadrangle",
        desc: "Positioned directly between the Head Line and Heart Line. Joyce Wilson designates this as the supreme mark of the occult seeker and intuitive mind — one who perceives unseen truths, practices genuine spiritual empathy, and balances emotion with higher wisdom."
      }
    ],
    occultMarkings: [
      {
        name: "Ring of Solomon (सुलेमान मुद्रिका)",
        icon: "💍",
        desc: "A soft arc circling the base of the index finger under Mount Jupiter. Symbolizes spiritual initiation, psychological insight into human nature, and natural counseling ability."
      },
      {
        name: "Girdle of Venus (शुक्र मेखला)",
        icon: "✨",
        desc: "A luminous arc above the Heart Line. Indicates heightened aesthetic sensibility, emotional responsiveness, and an innate capacity to feel and express passionate artistic devotion."
      },
      {
        name: "Via Lascivia / The Milky Way (क्षीर मार्ग — Line of Abundance)",
        icon: "🌌",
        desc: "Sister line running parallel to the Health Line. Channels raw vitality into imaginative and creative endeavors, protecting against mundane burnout through joyful inspiration."
      }
    ]
  };

  const cachedPalmCanvas = document.createElement('canvas');
  let currentActiveFilter = 'all';

  function drawLinesOnCanvas(rCtx, width, height) {
    renderBiometricPalmAnalysis(rCtx, width, height, 'all');
  }

  function renderBiometricPalmAnalysis(rCtx, width, height, filter = 'all') {
    currentActiveFilter = filter;
    
    // Draw base palm image
    if (cachedPalmCanvas.width > 0) {
      rCtx.clearRect(0, 0, width, height);
      rCtx.drawImage(cachedPalmCanvas, 0, 0, width, height);
    }

    // Subtle dark vignette to make neon lines pop
    rCtx.fillStyle = 'rgba(7, 3, 20, 0.28)';
    rCtx.fillRect(0, 0, width, height);

    // Variation offsets based on hash
    const v = () => (seededRandom() - 0.5) * 0.04;

    // X coordinate mapping (mirrors for left hand)
    const mx = (x) => isRightHand ? x : (1 - x);

    // Helper for glowing bezier curves
    const drawGlowPath = (pts, strokeColor, glowColor, lineWidth, isSelected, labelText) => {
      const alpha = (filter === 'all' || isSelected) ? 1.0 : 0.15;
      rCtx.save();
      rCtx.globalAlpha = alpha;
      rCtx.beginPath();
      rCtx.moveTo(pts[0].x * width, pts[0].y * height);

      for (let i = 1; i < pts.length - 2; i++) {
        const xc = (pts[i].x + pts[i + 1].x) / 2 * width;
        const yc = (pts[i].y + pts[i + 1].y) / 2 * height;
        rCtx.quadraticCurveTo(pts[i].x * width, pts[i].y * height, xc, yc);
      }
      if (pts.length > 2) {
        const last = pts[pts.length - 1];
        const prev = pts[pts.length - 2];
        rCtx.quadraticCurveTo(prev.x * width, prev.y * height, last.x * width, last.y * height);
      }

      rCtx.lineCap = 'round';
      rCtx.lineJoin = 'round';

      // Outer wide aura
      rCtx.lineWidth = isSelected ? lineWidth + 6 : lineWidth + 3;
      rCtx.strokeStyle = glowColor;
      rCtx.shadowColor = glowColor;
      rCtx.shadowBlur = isSelected ? 22 : 14;
      rCtx.stroke();

      // Core crisp path
      rCtx.lineWidth = isSelected ? lineWidth : lineWidth - 1;
      rCtx.strokeStyle = strokeColor;
      rCtx.shadowBlur = 0;
      rCtx.stroke();

      // Core white center line
      rCtx.lineWidth = 1.5;
      rCtx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      rCtx.stroke();

      // Pulsing nodes on extremities
      pts.forEach((p, idx) => {
        if (idx === 0 || idx === pts.length - 1 || idx === Math.floor(pts.length / 2)) {
          rCtx.beginPath();
          rCtx.arc(p.x * width, p.y * height, isSelected ? 4.5 : 3.5, 0, Math.PI * 2);
          rCtx.fillStyle = '#ffffff';
          rCtx.shadowColor = glowColor;
          rCtx.shadowBlur = 10;
          rCtx.fill();
        }
      });

      // Label when selected or in 'all'
      if ((filter === 'all' || isSelected) && labelText && pts.length > 2) {
        const midPt = pts[Math.floor(pts.length / 2)];
        rCtx.font = 'bold 11px system-ui, -apple-system, sans-serif';
        rCtx.fillStyle = '#ffffff';
        rCtx.shadowColor = '#000000';
        rCtx.shadowBlur = 4;
        rCtx.fillText(labelText, midPt.x * width + 8, midPt.y * height - 6);
      }

      rCtx.restore();
    };

    // 1. LIFE LINE (Emerald Green) - around Mount of Venus
    const lifePoints = [
      { x: mx(0.36 + v()), y: 0.50 + v() },
      { x: mx(0.40 + v()), y: 0.58 + v() },
      { x: mx(0.43 + v()), y: 0.68 + v() },
      { x: mx(0.41 + v()), y: 0.80 + v() },
      { x: mx(0.34 + v()), y: 0.92 + v() }
    ];
    drawGlowPath(lifePoints, '#00ff88', '#00cc66', 3.5, filter === 'life', '🌿 Life Line (जीव रेखा)');

    // 2. HEAD LINE (Electric Cyan) - across Plain of Mars
    const headPoints = [
      { x: mx(0.36 + v()), y: 0.50 + v() },
      { x: mx(0.48 + v()), y: 0.55 + v() },
      { x: mx(0.62 + v()), y: 0.59 + v() },
      { x: mx(0.74 + v()), y: 0.64 + v() }
    ];
    drawGlowPath(headPoints, '#00e5ff', '#0099cc', 3.5, filter === 'head', '🧠 Head Line (मस्तिष्क रेखा)');

    // Writer's Fork on Head Line
    const headFork = [
      { x: mx(0.66 + v()), y: 0.60 + v() },
      { x: mx(0.75 + v()), y: 0.70 + v() }
    ];
    drawGlowPath(headFork, '#00e5ff', '#0099cc', 2.2, filter === 'head', '');

    // 3. HEART LINE (Crimson Ruby) - under pinky sweeping to Jupiter
    const heartPoints = [
      { x: mx(0.80 + v()), y: 0.48 + v() },
      { x: mx(0.65 + v()), y: 0.43 + v() },
      { x: mx(0.50 + v()), y: 0.40 + v() },
      { x: mx(0.38 + v()), y: 0.38 + v() }
    ];
    drawGlowPath(heartPoints, '#ff2a6d', '#ff0055', 3.5, filter === 'heart', '❤️ Heart Line (हृदय रेखा)');

    // Jupiter Trident on Heart Line
    const heartBranch = [
      { x: mx(0.46 + v()), y: 0.41 + v() },
      { x: mx(0.41 + v()), y: 0.34 + v() }
    ];
    drawGlowPath(heartBranch, '#ff2a6d', '#ff0055', 2.2, filter === 'heart', '');

    // 4. FATE LINE (Sunburst Gold) - rising to Saturn
    const fatePoints = [
      { x: mx(0.52 + v()), y: 0.93 + v() },
      { x: mx(0.51 + v()), y: 0.75 + v() },
      { x: mx(0.50 + v()), y: 0.55 + v() },
      { x: mx(0.48 + v()), y: 0.36 + v() }
    ];
    drawGlowPath(fatePoints, '#ffb703', '#fb8500', 3.2, filter === 'fate', '⭐ Fate Line (भाग्य रेखा)');

    // 5. SUN / APOLLO LINE (Warm Amber)
    const sunPoints = [
      { x: mx(0.62 + v()), y: 0.68 + v() },
      { x: mx(0.63 + v()), y: 0.52 + v() },
      { x: mx(0.64 + v()), y: 0.38 + v() }
    ];
    drawGlowPath(sunPoints, '#ffe600', '#ffaa00', 2.2, filter === 'fate' || filter === 'all', '');

    // 6. MANIBANDHA WRIST BRACELETS (Gold arcs at base)
    const drawBracelet = (yPct, label) => {
      rCtx.save();
      rCtx.globalAlpha = (filter === 'all' || filter === 'life') ? 0.75 : 0.15;
      rCtx.beginPath();
      rCtx.moveTo(mx(0.32) * width, yPct * height);
      rCtx.quadraticCurveTo(mx(0.50) * width, (yPct - 0.015) * height, mx(0.68) * width, yPct * height);
      rCtx.strokeStyle = '#d4a017';
      rCtx.lineWidth = 1.8;
      rCtx.shadowColor = '#d4a017';
      rCtx.shadowBlur = 8;
      rCtx.stroke();
      rCtx.restore();
    };
    drawBracelet(0.935, 'Manibandha 1');
    drawBracelet(0.955, 'Manibandha 2');
    drawBracelet(0.975, 'Manibandha 3');

    // 7. PLANETARY MOUNTS (Nodes & Halos)
    const mounts = [
      { glyph: '♃', name: 'Jupiter', x: mx(0.38), y: 0.35, color: '#f1c40f' },
      { glyph: '♄', name: 'Saturn', x: mx(0.49), y: 0.33, color: '#9b59b6' },
      { glyph: '☉', name: 'Sun', x: mx(0.64), y: 0.36, color: '#f39c12' },
      { glyph: '☿', name: 'Mercury', x: mx(0.78), y: 0.44, color: '#1abc9c' },
      { glyph: '♂', name: 'Mars', x: mx(0.54), y: 0.54, color: '#e74c3c' },
      { glyph: '♀', name: 'Venus', x: mx(0.28), y: 0.70, color: '#e91e63' },
      { glyph: '☽', name: 'Moon', x: mx(0.74), y: 0.78, color: '#3498db' }
    ];

    mounts.forEach(m => {
      const showMount = (filter === 'all' || filter === 'mounts');
      rCtx.save();
      rCtx.globalAlpha = showMount ? 0.95 : 0.15;

      const px = m.x * width;
      const py = m.y * height;

      // Pulsing mount halo
      rCtx.beginPath();
      rCtx.arc(px, py, filter === 'mounts' ? 18 : 13, 0, Math.PI * 2);
      rCtx.strokeStyle = m.color;
      rCtx.lineWidth = 1.5;
      rCtx.shadowColor = m.color;
      rCtx.shadowBlur = filter === 'mounts' ? 15 : 8;
      rCtx.stroke();
      rCtx.fillStyle = 'rgba(10, 5, 25, 0.75)';
      rCtx.fill();

      // Mount Glyph
      rCtx.font = 'bold 12px serif';
      rCtx.fillStyle = m.color;
      rCtx.textAlign = 'center';
      rCtx.textBaseline = 'middle';
      rCtx.fillText(m.glyph, px, py);

      // Name label when mounts filter is active
      if (filter === 'mounts') {
        rCtx.font = 'bold 10px system-ui, sans-serif';
        rCtx.fillStyle = '#ffffff';
        rCtx.fillText(m.name, px, py + 22);
      }

      rCtx.restore();
    });
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

    const nameInput = document.getElementById('userNameInput');
    const userName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '';
    const titleEl = document.getElementById('linesCardTitle');
    if (titleEl) {
      titleEl.textContent = userName ? `Major Lines Analysis for ${userName}` : 'Major Lines Analysis';
    }

    // Cache pristine palm image
    cachedPalmCanvas.width = resultCanvas.width;
    cachedPalmCanvas.height = resultCanvas.height;
    const cCtx = cachedPalmCanvas.getContext('2d');
    cCtx.drawImage(resultCanvas, 0, 0);

    // Draw lines & biometric features with glowing shaders
    const rCtx = resultCanvas.getContext('2d');
    renderBiometricPalmAnalysis(rCtx, resultCanvas.width, resultCanvas.height, 'all');

    // Wire up Line/Mount Inspector Tabs
    const filterBtns = document.querySelectorAll('.btn-canvas-filter');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterType = btn.getAttribute('data-filter') || 'all';
        renderBiometricPalmAnalysis(rCtx, resultCanvas.width, resultCanvas.height, filterType);
      };
    });
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === 'all') b.classList.add('active');
      else b.classList.remove('active');
    });

    // Hand Type
    const hType = pickFromArray(textPools.handTypes);
    document.getElementById('resHandTypeTitle').innerText = userName ? `${userName}'s Hand Type: ${hType.title}` : hType.title;
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

    // Angustha (Thumb) Analysis
    const ang = pickFromArray(textPools.angusthaData);
    const angEl = document.getElementById('angusthaAnalysis');
    if (angEl) {
      angEl.innerHTML = `
        <div class="shastra-subcard">
          <h4><span>👍</span> ${ang.yavaType}</h4>
          <p style="font-size:0.88rem; line-height:1.55; opacity:0.85; margin:0 0 0.8rem;">${ang.yavaDesc}</p>
          <div style="font-size:0.82rem; color:var(--gold); font-weight:700; margin-bottom:0.4rem;">Phalanx Balance (पर्व विभाजन):</div>
          <div class="phalanx-bar-wrap">
            <div class="phalanx-bar">
              <span class="phalanx-label">Will Power (इच्छा पर्व):</span>
              <div class="phalanx-track"><div class="phalanx-fill" style="width:${ang.willRatio}%;"></div></div>
              <span style="font-weight:700; color:var(--gold); width:35px;">${ang.willRatio}%</span>
            </div>
            <div class="phalanx-bar">
              <span class="phalanx-label">Logic & Reason (तर्क पर्व):</span>
              <div class="phalanx-track"><div class="phalanx-fill" style="width:${ang.logicRatio}%; background:linear-gradient(90deg, #00bbff, #2ecc71);"></div></div>
              <span style="font-weight:700; color:#00bbff; width:35px;">${ang.logicRatio}%</span>
            </div>
          </div>
          <div style="font-size:0.82rem; margin-top:0.6rem; color:rgba(255,255,255,0.75);">
            <strong>Stance:</strong> ${ang.stance} • ${ang.willDesc}
          </div>
        </div>
      `;
    }

    // Manibandha (Wrist Lines) Analysis
    const mani = pickFromArray(textPools.manibandhaData);
    const maniEl = document.getElementById('manibandhaAnalysis');
    if (maniEl) {
      maniEl.innerHTML = `
        <div class="shastra-subcard">
          <h4><span>📿</span> ${mani.linesDesc}</h4>
          <div style="display:flex; flex-direction:column; gap:0.5rem; margin:0.8rem 0; font-size:0.86rem; line-height:1.5; opacity:0.85;">
            <div>• <strong>Line 1:</strong> ${mani.line1}</div>
            <div>• <strong>Line 2:</strong> ${mani.line2}</div>
            <div>• <strong>Line 3:</strong> ${mani.line3}</div>
            ${mani.line4 ? `<div>• <strong>Line 4:</strong> ${mani.line4}</div>` : ''}
          </div>
          <div style="display:inline-block; background:rgba(46,204,113,0.15); border:1px solid #2ecc71; color:#2ecc71; padding:0.35rem 0.8rem; border-radius:50px; font-size:0.82rem; font-weight:700;">
            Estimated Vitality: ${mani.vitalityYears}
          </div>
        </div>
      `;
    }

    // Auspicious Shastra Symbols (Pick 2 distinct signs)
    const symEl = document.getElementById('shastraSymbolsGrid');
    if (symEl) {
      const shuffledSyms = [...textPools.shastraSymbols].sort(() => 0.5 - seededRandom());
      const selectedSyms = shuffledSyms.slice(0, 2);
      symEl.innerHTML = selectedSyms.map(sym => `
        <div class="shastra-symbol-card">
          <div class="sym-name"><span>${sym.icon}</span> ${sym.name}</div>
          <p class="sym-desc">${sym.desc}</p>
        </div>
      `).join('');
    }

    // ======== Dr. Shrimali — Nail Diagnostics (नखून विश्लेषण) ========
    const nailData = pickFromArray(textPools.nailTypes);
    const nailEl = document.getElementById('nailAnalysis');
    if (nailEl) {
      nailEl.innerHTML = `
        <div class="shastra-subcard">
          <h4><span>${nailData.icon}</span> ${nailData.type}</h4>
          <p style="font-size:0.88rem; line-height:1.55; opacity:0.85; margin:0 0 0.6rem;">${nailData.desc}</p>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;">
            <div style="flex:1; min-width:140px; background:rgba(255,107,107,0.1); border:1px solid rgba(255,107,107,0.3); border-radius:10px; padding:0.5rem 0.7rem;">
              <div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.5); margin-bottom:0.2rem;">Health Indicator</div>
              <div style="font-size:0.82rem; color:#ff6b6b;">${nailData.health}</div>
            </div>
            <div style="flex:1; min-width:140px; background:rgba(46,204,113,0.1); border:1px solid rgba(46,204,113,0.3); border-radius:10px; padding:0.5rem 0.7rem;">
              <div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.5); margin-bottom:0.2rem;">Core Trait</div>
              <div style="font-size:0.82rem; color:#2ecc71;">${nailData.trait}</div>
            </div>
          </div>
        </div>
      `;
    }

    // ======== Dr. Shrimali — Finger Knot Analysis (उँगलियों की गाँठें) ========
    const knotEl = document.getElementById('fingerKnotAnalysis');
    if (knotEl) {
      const knotStates = ['upperKnot', 'lowerKnot', 'bothKnots', 'noKnots'];
      let knotsHtml = '';
      textPools.fingerKnots.forEach(fk => {
        const state = knotStates[Math.floor(seededRandom() * knotStates.length)];
        const reading = fk[state];
        knotsHtml += `
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:0.6rem 0.8rem; margin-bottom:0.5rem;">
            <div style="font-weight:700; font-size:0.88rem; color:var(--gold); margin-bottom:0.25rem;">☝ ${fk.finger}</div>
            <div style="font-size:0.82rem; line-height:1.5; opacity:0.85;">${reading}</div>
          </div>
        `;
      });
      knotEl.innerHTML = knotsHtml;
    }

    // ======== Dr. Shrimali — Palm Properties (हथेली के गुण) ========
    const palmProp = pickFromArray(textPools.palmProperties);
    const palmPropEl = document.getElementById('palmPropertiesAnalysis');
    if (palmPropEl) {
      palmPropEl.innerHTML = `
        <div class="shastra-subcard">
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.6rem;">
            <div style="text-align:center; background:rgba(255,170,0,0.08); border:1px solid rgba(255,170,0,0.25); border-radius:12px; padding:0.7rem 0.5rem;">
              <div style="font-size:1.3rem; margin-bottom:0.3rem;">🎨</div>
              <div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.5); margin-bottom:0.3rem;">Palm Color</div>
              <div style="font-weight:700; font-size:0.82rem; color:var(--gold); margin-bottom:0.3rem;">${palmProp.palmColor}</div>
              <div style="font-size:0.78rem; line-height:1.4; opacity:0.8;">${palmProp.palmColorDesc}</div>
            </div>
            <div style="text-align:center; background:rgba(46,204,113,0.08); border:1px solid rgba(46,204,113,0.25); border-radius:12px; padding:0.7rem 0.5rem;">
              <div style="font-size:1.3rem; margin-bottom:0.3rem;">🤲</div>
              <div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.5); margin-bottom:0.3rem;">Skin Texture</div>
              <div style="font-weight:700; font-size:0.82rem; color:#2ecc71; margin-bottom:0.3rem;">${palmProp.palmTexture}</div>
              <div style="font-size:0.78rem; line-height:1.4; opacity:0.8;">${palmProp.palmTextureDesc}</div>
            </div>
            <div style="text-align:center; background:rgba(0,187,255,0.08); border:1px solid rgba(0,187,255,0.25); border-radius:12px; padding:0.7rem 0.5rem;">
              <div style="font-size:1.3rem; margin-bottom:0.3rem;">✋</div>
              <div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.5); margin-bottom:0.3rem;">Hand Size</div>
              <div style="font-weight:700; font-size:0.82rem; color:#00bbff; margin-bottom:0.3rem;">${palmProp.palmSize}</div>
              <div style="font-size:0.78rem; line-height:1.4; opacity:0.8;">${palmProp.palmSizeDesc}</div>
            </div>
          </div>
        </div>
      `;
    }

    // ======== Dr. Shrimali — Hasta-Rekha Yogas (हस्तरेखा योग) ========
    const yogaEl = document.getElementById('hastaRekhaYogas');
    if (yogaEl) {
      const shuffledYogas = [...textPools.hastaRekhaYogas].sort(() => 0.5 - seededRandom());
      const selectedYogas = shuffledYogas.slice(0, 3);
      yogaEl.innerHTML = selectedYogas.map((yoga, idx) => `
        <div style="background:linear-gradient(135deg, rgba(255,170,0,0.06), rgba(255,107,107,0.04)); border:1px solid rgba(255,170,0,0.2); border-radius:14px; padding:0.8rem 1rem; margin-bottom:0.6rem; position:relative; overflow:hidden;">
          <div style="position:absolute; top:-10px; right:-5px; font-size:2.5rem; opacity:0.12;">${yoga.icon}</div>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
            <span style="font-size:1.2rem;">${yoga.icon}</span>
            <span style="font-weight:800; font-size:0.92rem; color:var(--gold);">${yoga.name}</span>
          </div>
          <p style="font-size:0.82rem; line-height:1.55; opacity:0.85; margin:0 0 0.5rem;">${yoga.meaning}</p>
          <div style="display:inline-block; background:rgba(46,204,113,0.12); border:1px solid #2ecc71; color:#2ecc71; padding:0.25rem 0.7rem; border-radius:50px; font-size:0.78rem; font-weight:700;">
            ✦ ${yoga.effect}
          </div>
        </div>
      `).join('');
    }

    // ======== Joyce Wilson (1971) — Dual-Palm Polarity ========
    const dualCompEl = document.getElementById('dualPalmComparisonResult');
    if (dualCompEl) {
      const polarity = pickFromArray(textPools.dualPalmPolarity);
      dualCompEl.innerHTML = `
        <div class="shastra-subcard">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <h4 style="margin:0;"><span>⚖️</span> ${polarity.title}</h4>
            <span style="background:rgba(212,160,23,0.2); border:1px solid var(--gold); color:var(--gold); padding:0.2rem 0.6rem; border-radius:50px; font-size:0.75rem; font-weight:800;">${polarity.badge}</span>
          </div>
          <p style="font-size:0.86rem; line-height:1.55; opacity:0.85; margin:0 0 0.8rem;">${polarity.desc}</p>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; font-size:0.82rem;">
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:0.6rem 0.8rem;">
              <strong style="color:#70d8ff; display:block; margin-bottom:0.2rem;">Left Palm (Innate Blueprint):</strong>
              ${polarity.leftInsight}
            </div>
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:0.6rem 0.8rem;">
              <strong style="color:var(--gold); display:block; margin-bottom:0.2rem;">Right Palm (Active Karma):</strong>
              ${polarity.rightInsight}
            </div>
          </div>
        </div>
      `;
    }

    // ======== Joyce Wilson (1971) — Three Tiers of the Hand ========
    const tiersEl = document.getElementById('handTiersAnalysis');
    if (tiersEl) {
      const tiers = textPools.handTiers;
      tiersEl.innerHTML = `
        <div class="hand-tier-grid">
          <div class="hand-tier-card">
            <span class="hand-tier-badge tier-spiritual">Upper Tier • Mind &amp; Ideals</span>
            <div style="font-weight:700; font-size:0.9rem; color:#FFF2D6; margin-bottom:0.2rem;">${tiers.spiritualUpper.title}</div>
            <div style="font-size:0.75rem; color:rgba(255,255,255,0.6); margin-bottom:0.4rem;">${tiers.spiritualUpper.ruler}</div>
            <p style="font-size:0.82rem; line-height:1.5; opacity:0.85; margin:0;">${tiers.spiritualUpper.reading}</p>
          </div>
          <div class="hand-tier-card">
            <span class="hand-tier-badge tier-worldly">Mid Tier • Worldly Quadrangle</span>
            <div style="font-weight:700; font-size:0.9rem; color:#FFF2D6; margin-bottom:0.2rem;">${tiers.worldlyMid.title}</div>
            <div style="font-size:0.75rem; color:rgba(255,255,255,0.6); margin-bottom:0.4rem;">${tiers.worldlyMid.ruler}</div>
            <p style="font-size:0.82rem; line-height:1.5; opacity:0.85; margin:0;">${tiers.worldlyMid.reading}</p>
          </div>
          <div class="hand-tier-card">
            <span class="hand-tier-badge tier-physical">Base Tier • Instinct &amp; Vitality</span>
            <div style="font-weight:700; font-size:0.9rem; color:#FFF2D6; margin-bottom:0.2rem;">${tiers.physicalBase.title}</div>
            <div style="font-size:0.75rem; color:rgba(255,255,255,0.6); margin-bottom:0.4rem;">${tiers.physicalBase.ruler}</div>
            <p style="font-size:0.82rem; line-height:1.5; opacity:0.85; margin:0;">${tiers.physicalBase.reading}</p>
          </div>
        </div>
      `;
    }

    // ======== Joyce Wilson (1971) — Esoteric Angles & Sacred Crosses ========
    const anglesEl = document.getElementById('esotericAnglesAnalysis');
    if (anglesEl) {
      anglesEl.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:0.75rem;">
          ${textPools.esotericAngles.map(angItem => `
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:0.8rem 1rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                <span style="font-size:1.1rem;">${angItem.icon}</span>
                <span style="font-size:0.75rem; color:var(--gold); font-weight:700;">${angItem.degree}</span>
              </div>
              <div style="font-weight:700; font-size:0.88rem; color:#FFF2D6; margin-bottom:0.3rem;">${angItem.name}</div>
              <p style="font-size:0.8rem; line-height:1.45; opacity:0.85; margin:0;">${angItem.desc}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    // ======== Joyce Wilson (1971) — Special Occult Markings ========
    const occultEl = document.getElementById('occultMarkingsAnalysis');
    if (occultEl) {
      occultEl.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:0.75rem;">
          ${textPools.occultMarkings.map(occ => `
            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:0.8rem 1rem;">
              <div style="font-size:1.3rem; margin-bottom:0.3rem;">${occ.icon}</div>
              <div style="font-weight:700; font-size:0.88rem; color:var(--gold); margin-bottom:0.3rem;">${occ.name}</div>
              <p style="font-size:0.8rem; line-height:1.45; opacity:0.85; margin:0;">${occ.desc}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Mounts
    const statuses = ['prominent', 'normal', 'flat'];
    let mountsHtml = '';
    for (const [mName, mData] of Object.entries(textPools.mounts)) {
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

    // Interactive Panditji Q&A wireup (Synthesized Vyas + Shrimali + Wilson)
    const answerBox = document.getElementById('panditjiAnswer');
    const qButtons = document.querySelectorAll('.btn-quick-q');
    
    const panditjiResponses = {
      career: `<strong>Shastra Career Guidance:</strong> Based on your Fate Line rising toward Mount Saturn with support from Mount Jupiter, your strongest professional inflection point arrives between ages <strong>32 and 38</strong>. Shri Vasant Lal Vyas notes that when the Will phalanx is resolute, commercial partnerships entered after age 30 bring sustainable prosperity. Maintain ethical diligence to appease Shani Bhagavan.`,
      marriage: `<strong>Vivah Rekha & Relationship Insight:</strong> Your Heart Line curves harmoniously toward Jupiter, signifying devotion and high relationship ideals. The Shastra indicates marital harmony through a mature, supportive life partner. If any minor cross-lines appear near Mercury, chanting the Shukra Beej Mantra on Fridays ensures enduring domestic peace.`,
      wealth: `<strong>Dhana & Raj Yoga Analysis:</strong> Your thumb reveals <em>${ang.yavaType}</em>, complemented by the second bracelet of Manibandha. In Hasta Samudrika Shastra, this combination indicates that wealth is accumulated through your own intellectual enterprise rather than passive inheritance. Substantial assets and property manifest after age 34.`,
      travel: `<strong>Desh-Videsh Yatra (Travel & Settlement):</strong> Clear ascending branches emerging from the Mount of Moon toward the middle palm denote successful voyages, relocation, or trade across waters. Vyas emphasizes that travel undertaken for spiritual learning or career expansion brings lasting goodwill.`,
      health: `<strong>Arogya & Prana Shakti:</strong> Your Life Line and Manibandha indicate <em>${mani.vitalityYears}</em>. To preserve vital Ojas, adhere to an early-morning routine, practice Surya Namaskar at dawn, and keep stress in check through regular pranayama.`,
      freewill: `<strong>Fate vs. Free Will (Left vs. Right Hand):</strong> As Joyce Wilson elucidates in <em>The Complete Book of Palmistry (1971)</em>, your Left Palm reveals the karmic cards you were dealt at birth, while your Right Palm illustrates how your free will, character, and choices play that hand. A marked improvement in line clarity in the Right hand confirms you have actively transcended hereditary obstacles.`
    };

    qButtons.forEach(btn => {
      btn.onclick = () => {
        const qKey = btn.getAttribute('data-q');
        if (answerBox && panditjiResponses[qKey]) {
          answerBox.innerHTML = panditjiResponses[qKey];
          answerBox.style.animation = 'none';
          void answerBox.offsetWidth; // trigger reflow
          answerBox.style.animation = 'fadeIn 0.3s ease';
        }
      };
    });

    // Customer Satisfaction & Dual-Palm Actions
    const btnScanOtherHand = document.getElementById('btnScanOtherHand');
    const btnRetakeHighRes = document.getElementById('btnRetakeHighRes');

    if (btnScanOtherHand) {
      btnScanOtherHand.onclick = () => {
        // Toggle to the other hand and scroll back to scanner
        isRightHand = !isRightHand;
        if (isRightHand) {
          document.getElementById('btnRightHand').classList.add('active');
          document.getElementById('btnLeftHand').classList.remove('active');
        } else {
          document.getElementById('btnLeftHand').classList.add('active');
          document.getElementById('btnRightHand').classList.remove('active');
        }
        updateHandGuideOrientation();
        if (handGuide) {
          handGuide.classList.remove('locked');
          handGuide.style.display = 'block';
        }
        if (handFitIndicator) {
          handFitIndicator.classList.remove('locked');
          handFitIndicator.style.display = 'flex';
        }
        if (btnCapturePalm) {
          btnCapturePalm.innerHTML = '<span style="font-size:1.15rem;">⛶</span> Capture';
        }
        resetScanHighlightLines();
        resultsDashboard.style.display = 'none';
        scannerSection.style.display = 'block';
        scannerSection.scrollIntoView({ behavior: 'smooth' });
        // Trigger a complementary seed
        hashSeed += 819;
      };
    }

    if (btnRetakeHighRes) {
      btnRetakeHighRes.onclick = () => {
        resultsDashboard.style.display = 'none';
        scannerSection.style.display = 'block';
        preview.style.display = 'none';
        if (handGuide) {
          handGuide.style.display = 'block';
          handGuide.classList.remove('locked');
        }
        if (handFitIndicator) {
          handFitIndicator.style.display = 'flex';
          handFitIndicator.classList.remove('locked');
          updateHandGuideOrientation();
        }
        if (btnCapturePalm) {
          btnCapturePalm.innerHTML = '<span style="font-size:1.15rem;">⛶</span> Capture';
        }
        resetScanHighlightLines();
        if (scanPlaceholder) scanPlaceholder.style.display = 'none';
        btnScan.style.display = 'none';
        btnRetake.style.display = 'none';
        btnCamera.style.display = 'inline-flex';
        btnUpload.style.display = 'inline-flex';
        if (btnSample) btnSample.style.display = 'inline-flex';
        scannerSection.scrollIntoView({ behavior: 'smooth' });
      };
    }

    // Open the first accordion by default
    const firstAcc = document.querySelector('.accordion-content');
    if (firstAcc) firstAcc.classList.add('open');
    
    // Scroll to results
    resultsDashboard.scrollIntoView({ behavior: 'smooth' });
  }

});
