/* ==========================================================================
   DIVYA MANGALAM — 24-HOUR VEDIC CLOCK UI CONTROLLER
   Interactive Controls, Real-time Clock Needle, Tooltips, Action Guidance
   ========================================================================== */

(function () {
  'use strict';

  let currentSelectedDate = new Date();
  let currentCityKey = 'nellore';
  let activeFilter = 'all'; // 'all' | 'shubh' | 'ashubh'
  let activeSegmentId = 'abhijit';
  let liveTimerInterval = null;

  function getLocalISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  function getCurrentCityTime() {
    const city = VEDIC_CLOCK.CITIES[currentCityKey] || VEDIC_CLOCK.CITIES.nellore;
    const now = new Date();
    // UTC time in ms
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    // City local time
    return new Date(utcMs + city.tz * 3600000);
  }

  function initVedicClockUI() {
    const section = document.getElementById('vedicClockSection');
    if (!section || typeof VEDIC_CLOCK === 'undefined') return;

    const datePicker = document.getElementById('vcDatePicker');
    const citySelect = document.getElementById('vcCitySelect');
    const btnToday = document.getElementById('vcBtnToday');
    const btnYesterday = document.getElementById('vcBtnYesterday');
    const btnTomorrow = document.getElementById('vcBtnTomorrow');
    const filterPills = document.querySelectorAll('.vc-filter-pill');

    // Populate City Selector
    if (citySelect) {
      citySelect.innerHTML = Object.entries(VEDIC_CLOCK.CITIES).map(([k, c]) => `
        <option value="${k}" ${k === currentCityKey ? 'selected' : ''}>${c.name}</option>
      `).join('');

      citySelect.addEventListener('change', function () {
        currentCityKey = this.value;
        updateClock();
      });
    }

    // Set Date Picker defaults (covering 16 years: 2020 to 2036)
    if (datePicker) {
      datePicker.min = '2020-01-01';
      datePicker.max = '2036-12-31';
      datePicker.value = getLocalISO(currentSelectedDate);

      datePicker.addEventListener('change', function () {
        if (!this.value) return;
        const [y, m, d] = this.value.split('-').map(Number);
        currentSelectedDate = new Date(y, m - 1, d);
        updateNavButtons();
        updateClock();
      });
    }

    // Quick Date Buttons
    if (btnToday) {
      btnToday.addEventListener('click', function () {
        currentSelectedDate = getCurrentCityTime();
        if (datePicker) datePicker.value = getLocalISO(currentSelectedDate);
        updateNavButtons();
        updateClock();
      });
    }

    if (btnYesterday) {
      btnYesterday.addEventListener('click', function () {
        currentSelectedDate = new Date(currentSelectedDate.getTime() - 86400000);
        if (datePicker) datePicker.value = getLocalISO(currentSelectedDate);
        updateNavButtons();
        updateClock();
      });
    }

    if (btnTomorrow) {
      btnTomorrow.addEventListener('click', function () {
        currentSelectedDate = new Date(currentSelectedDate.getTime() + 86400000);
        if (datePicker) datePicker.value = getLocalISO(currentSelectedDate);
        updateNavButtons();
        updateClock();
      });
    }

    // Filter Pills
    filterPills.forEach(pill => {
      pill.addEventListener('click', function () {
        filterPills.forEach(p => p.classList.remove('active', 'active-shubh', 'active-ashubh'));
        activeFilter = this.dataset.filter;
        if (activeFilter === 'shubh') this.classList.add('active-shubh');
        else if (activeFilter === 'ashubh') this.classList.add('active-ashubh');
        else this.classList.add('active');
        applyFilter();
      });
    });

    updateNavButtons();
    updateClock();

    // Start Live Clock Ticker
    if (liveTimerInterval) clearInterval(liveTimerInterval);
    liveTimerInterval = setInterval(updateLiveTimeTicker, 1000);
  }

  function updateNavButtons() {
    const btnToday = document.getElementById('vcBtnToday');
    if (!btnToday) return;
    const nowCity = getCurrentCityTime();
    if (isSameDay(currentSelectedDate, nowCity)) {
      btnToday.classList.add('active');
    } else {
      btnToday.classList.remove('active');
    }
  }

  function updateClock() {
    const clockWrap = document.getElementById('vcClockSvgWrap');
    if (!clockWrap) return;

    const isoStr = getLocalISO(currentSelectedDate);
    const data = VEDIC_CLOCK.calculateDayMuhuratWindows(isoStr, currentCityKey);

    const nowCity = getCurrentCityTime();
    const isToday = isSameDay(currentSelectedDate, nowCity);
    const currentDecH = isToday ? (nowCity.getHours() + nowCity.getMinutes() / 60 + nowCity.getSeconds() / 3600) : null;

    // Render SVG
    clockWrap.innerHTML = VEDIC_CLOCK.renderSvgClock(data, currentDecH);

    // Render Center Hub Status
    renderCenterHub(data, nowCity, isToday);

    // Attach Click and Hover listeners to SVG segments
    const segments = clockWrap.querySelectorAll('.vc-arc-segment');
    segments.forEach(segEl => {
      const segId = segEl.dataset.id;

      segEl.addEventListener('mouseenter', () => {
        highlightSegment(segId, data);
      });

      segEl.addEventListener('click', () => {
        highlightSegment(segId, data);
        const card = document.getElementById('vcSpotlightCard');
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });

    // Populate Spotlight Card with default active segment (or current active period)
    const initialSegId = isToday ? findActiveSegmentId(data, currentDecH) : 'abhijit';
    activeSegmentId = initialSegId;
    highlightSegment(initialSegId, data);

    // Render Action Matrix ("Can I Do It Today?")
    renderActionMatrix(data);

    // Render Chronological Timeline
    renderTimeline(data);

    // Apply Active Filter (All / Shubh / Ashubh)
    applyFilter();
  }

  function findActiveSegmentId(data, currentDecH) {
    if (currentDecH === null) return 'abhijit';
    for (const seg of data.segments) {
      if (seg.startH <= seg.endH) {
        if (currentDecH >= seg.startH && currentDecH < seg.endH) return seg.id;
      } else {
        // Crosses midnight
        if (currentDecH >= seg.startH || currentDecH < seg.endH) return seg.id;
      }
    }
    return 'abhijit';
  }

  function renderCenterHub(data, nowCity, isToday) {
    const hub = document.getElementById('vcCenterHub');
    if (!hub) return;

    let timeDisplay = '';
    let badgeClass = 'vc-badge-shubh';
    let badgeText = 'Auspicious';

    if (isToday) {
      let h = nowCity.getHours();
      const m = String(nowCity.getMinutes()).padStart(2, '0');
      const s = String(nowCity.getSeconds()).padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      timeDisplay = `${h}:${m}:${s} <span style="font-size:0.65em;font-weight:600;">${ampm}</span>`;

      const currentDecH = nowCity.getHours() + nowCity.getMinutes() / 60;
      const activeSeg = data.segments.find(s => {
        return s.startH <= s.endH
          ? (currentDecH >= s.startH && currentDecH < s.endH)
          : (currentDecH >= s.startH || currentDecH < s.endH);
      });

      if (activeSeg) {
        badgeClass = activeSeg.type === 'ashubh' ? 'vc-badge-ashubh' : (activeSeg.type === 'shubh' ? 'vc-badge-shubh' : 'vc-badge-neutral');
        badgeText = activeSeg.shortName;
      } else {
        const isDay = currentDecH >= data.sunriseH && currentDecH < data.sunsetH;
        badgeClass = isDay ? 'vc-badge-shubh' : 'vc-badge-neutral';
        badgeText = isDay ? 'Day Shubha' : 'Night Shanti';
      }
    } else {
      timeDisplay = `<span style="font-size:0.85em;color:#B45309;">${data.weekday}</span>`;
      badgeClass = 'vc-badge-neutral';
      badgeText = `${data.tithiName}`;
    }

    hub.innerHTML = `
      <div class="vc-hub-time">${timeDisplay}</div>
      <div class="vc-hub-status-badge ${badgeClass}">${badgeText}</div>
      <div class="vc-hub-sun">
        🌅 ${data.sunriseStr} • 🌇 ${data.sunsetStr}
      </div>
    `;
  }

  function updateLiveTimeTicker() {
    const nowCity = getCurrentCityTime();
    if (!isSameDay(currentSelectedDate, nowCity)) return;

    const data = VEDIC_CLOCK.calculateDayMuhuratWindows(getLocalISO(currentSelectedDate), currentCityKey);
    renderCenterHub(data, nowCity, true);

    // Update needle rotation smoothly
    const needle = document.querySelector('.vc-clock-needle');
    if (needle) {
      const currentDecH = nowCity.getHours() + nowCity.getMinutes() / 60 + nowCity.getSeconds() / 3600;
      const angle = (currentDecH % 24) * 15;
      needle.setAttribute('transform', `rotate(${angle.toFixed(2)} 250 250)`);
    }
  }

  function highlightSegment(segId, data) {
    activeSegmentId = segId;
    const seg = data.segments.find(s => s.id === segId) || data.segments[0];

    // Highlight SVG arcs
    const clockWrap = document.getElementById('vcClockSvgWrap');
    if (clockWrap) {
      clockWrap.querySelectorAll('.vc-arc-segment').forEach(el => {
        if (el.dataset.id === segId) el.classList.add('active-highlight');
        else el.classList.remove('active-highlight');
      });
    }

    // Highlight timeline rows
    const listEl = document.getElementById('vcTimelineList');
    if (listEl) {
      listEl.querySelectorAll('.vc-timeline-row').forEach(row => {
        if (row.dataset.id === segId) row.classList.add('active');
        else row.classList.remove('active');
      });
    }

    // Populate Spotlight Card
    const card = document.getElementById('vcSpotlightCard');
    if (card) {
      card.className = `vc-spotlight-card spotlight-${seg.type}`;
      card.innerHTML = `
        <div class="vc-spotlight-header">
          <div>
            <div style="font-size:0.8rem; font-weight:700; color:${seg.color}; text-transform:uppercase; letter-spacing:0.04em;">
              ${seg.nature}
            </div>
            <h4 class="vc-spotlight-title">${seg.name}</h4>
            <div style="font-size:0.82rem; color:#736E82;">Ruler: <strong>${seg.deity}</strong></div>
          </div>
          <div class="vc-spotlight-time" style="color:${seg.color};">
            ⏰ ${seg.timeRangeStr}
          </div>
        </div>

        <p class="vc-spotlight-desc">${seg.desc}</p>

        <div class="vc-spotlight-dos-donts">
          <div class="vc-guidance-col allowed">
            <h5>✅ Auspicious / Encouraged Deeds</h5>
            <ul>
              ${seg.allowed.map(a => `<li>${a}</li>`).join('')}
            </ul>
          </div>
          <div class="vc-guidance-col prohibited">
            <h5>⛔ Strictly Inauspicious / Avoid</h5>
            <ul>
              ${seg.prohibited.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }
  }

  function renderActionMatrix(data) {
    const container = document.getElementById('vcActionMatrixGrid');
    if (!container) return;

    container.innerHTML = data.actionMatrix.map(action => `
      <div class="vc-action-item">
        <div class="vc-action-top">
          <div class="vc-action-name">${action.name}</div>
          <span class="vc-action-badge ${action.status}">${action.status === 'shubh' ? 'Auspicious' : (action.status === 'avoid' ? 'Avoid' : 'Caution')}</span>
        </div>
        <div class="vc-action-best-time"><strong>Best Time:</strong> ${action.bestTime}</div>
        <div class="vc-action-note">${action.note}</div>
      </div>
    `).join('');
  }

  function renderTimeline(data) {
    const listEl = document.getElementById('vcTimelineList');
    if (!listEl) return;

    // Sort segments chronologically
    const sorted = [...data.segments].sort((a, b) => a.startH - b.startH);

    listEl.innerHTML = sorted.map(seg => {
      const icon = seg.type === 'ashubh' ? '⚠️' : (seg.type === 'shubh' ? '✨' : '🟡');
      return `
        <div class="vc-timeline-row ${seg.id === activeSegmentId ? 'active' : ''}" data-id="${seg.id}" data-type="${seg.type}">
          <div class="vc-tr-left">
            <span class="vc-tr-icon">${icon}</span>
            <div>
              <div class="vc-tr-name">${seg.name}</div>
              <div class="vc-tr-nature">${seg.nature}</div>
            </div>
          </div>
          <div class="vc-tr-right" style="color:${seg.color};">${seg.timeRangeStr}</div>
        </div>
      `;
    }).join('');

    // Attach click events to rows
    listEl.querySelectorAll('.vc-timeline-row').forEach(row => {
      row.addEventListener('click', function () {
        highlightSegment(this.dataset.id, data);
      });
    });
  }

  function applyFilter() {
    const clockWrap = document.getElementById('vcClockSvgWrap');
    const listEl = document.getElementById('vcTimelineList');

    if (clockWrap) {
      clockWrap.querySelectorAll('.vc-arc-segment').forEach(segEl => {
        const segId = segEl.dataset.id;
        const isShubh = ['brahma', 'abhijit', 'vijaya', 'godhuli', 'nishita'].includes(segId);
        const isAshubh = ['rahu', 'yama'].includes(segId);

        if (activeFilter === 'all') {
          segEl.style.opacity = '0.9';
        } else if (activeFilter === 'shubh') {
          segEl.style.opacity = isShubh ? '1' : '0.12';
        } else if (activeFilter === 'ashubh') {
          segEl.style.opacity = isAshubh ? '1' : '0.12';
        }
      });
    }

    if (listEl) {
      listEl.querySelectorAll('.vc-timeline-row').forEach(row => {
        const rowType = row.dataset.type;
        if (activeFilter === 'all') {
          row.style.display = 'flex';
        } else if (activeFilter === 'shubh') {
          row.style.display = rowType === 'shubh' ? 'flex' : 'none';
        } else if (activeFilter === 'ashubh') {
          row.style.display = (rowType === 'ashubh' || rowType === 'neutral') ? 'flex' : 'none';
        }
      });
    }
  }

  // Self-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVedicClockUI);
  } else {
    initVedicClockUI();
  }

  window.initVedicClockUI = initVedicClockUI;
})();
