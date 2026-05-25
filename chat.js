
/* ============================================================
   HEADER ICON — build HR Agent pixel icon in the pill
   ============================================================ */
const HR_ICON = ['grey','dark','grey', 'grey','light','grey', 'dark','grey','dark'];

const headerIconEl = document.getElementById('headerIcon');
if (headerIconEl) {
  HR_ICON.forEach(type => {
    const cell = document.createElement('div');
    cell.className = `agent-pill__cell agent-pill__cell--${type}`;
    headerIconEl.appendChild(cell);
  });
  // Animate the pill icon dark cells slowly
  animatePillIcon(headerIconEl);
}

function animatePillIcon(iconEl) {
  const darkCells = Array.from(iconEl.querySelectorAll('.agent-pill__cell--dark'));
  if (!darkCells.length) return;
  let idx = 0;
  (function tick() {
    const cell = darkCells[idx % darkCells.length];
    cell.style.transition = 'background 80ms ease, transform 80ms ease';
    cell.style.background = '#ff9165';
    cell.style.transform  = 'scale(1.5)';
    setTimeout(() => {
      cell.style.transition = 'background 300ms ease, transform 300ms ease';
      cell.style.background = '#ff5c00';
      cell.style.transform  = 'scale(1)';
    }, 110);
    idx++;
    setTimeout(tick, 900 + Math.random() * 400);
  })();
}


/* ============================================================
   SIDEBAR TOGGLE
   ============================================================ */
const sidebar     = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');

if (sidebar && collapseBtn) {
  collapseBtn.addEventListener('click', () => {
    const expanded = sidebar.classList.toggle('sidebar--expanded');
    collapseBtn.setAttribute('aria-label', expanded ? 'Collapse sidebar' : 'Expand sidebar');
  });
}


/* ============================================================
   MOCK RESPONSES
   ============================================================ */
const MOCK_RESPONSES = [
  {
    source: 'Based on Q3 Budget Report, Forcados Maintenance Log',
    text: `<p>Here's a summary of Q3 expenses vs. budget for field operations:</p>
<ul>
<li><strong>Operations:</strong> ₦2.1B actual vs ₦2.4B budget — 12.5% under spend ✓</li>
<li><strong>Maintenance:</strong> ₦1.05B actual vs ₦890M budget — 17.9% over spend ⚠</li>
<li><strong>Logistics:</strong> ₦398M actual vs ₦420M budget — 5.2% under spend ✓</li>
</ul>
<p>The maintenance overspend is linked to the emergency pump replacement at Forcados Terminal in August. The Finance team has flagged this in the variance report.</p>`,
    citations: ['Q3 Budget Report', 'Forcados Maintenance Log', 'Finance Variance Report Q3']
  },
  {
    source: 'Based on Warri Field Daily Report, OML 34 Production Log',
    text: `<p>The Warri Field (OML 34) recorded the following production figures for this week:</p>
<ul>
<li><strong>Crude oil:</strong> 12,450 bbl/day vs 12,200 target — above target ✓</li>
<li><strong>Gas:</strong> 48.2 MMscf/day</li>
<li><strong>Water cut:</strong> 38% — within acceptable range</li>
</ul>
<p>Well-2A is currently under planned maintenance and is expected back online in <strong>3 days</strong>. No production-critical alerts at this time.</p>`,
    citations: ['Warri Field Daily Report', 'OML 34 Production Log']
  },
  {
    source: 'Based on Escravos Audit Schedule, HSSE Compliance Tracker Q4',
    text: `<p>The HSSE audit for Escravos facility is scheduled for <strong>November 18, 2024</strong>. Current compliance status:</p>
<ul>
<li>✓ Fire suppression systems — Last tested October 2024</li>
<li>✓ Emergency evacuation drill — Completed September 2024</li>
<li>⚠ PPE compliance rate — 89% (target: 95%)</li>
<li>✓ Spill response equipment — Certified and in place</li>
</ul>
<p>The PPE compliance gap needs attention before the audit date. I recommend scheduling a spot-check this week. Should I draft a memo to the HSE coordinator?</p>`,
    citations: ['Escravos Audit Schedule', 'HSSE Compliance Tracker Q4']
  },
  {
    source: 'Based on HR Policy Manual §6.1, Disciplinary Procedure 2023',
    text: `<p>According to Seepco's HR Policy Manual (Section 6.1), the performance improvement process follows three stages:</p>
<ul>
<li><strong>Stage 1 — Verbal Warning:</strong> Documented by line manager, valid for 6 months</li>
<li><strong>Stage 2 — Written Warning:</strong> Issued by HR after Stage 1, valid for 12 months</li>
<li><strong>Stage 3 — Final Written Warning:</strong> Requires HR Director sign-off; may lead to disciplinary hearing</li>
</ul>
<p>Throughout the process, the employee has the right to be accompanied by a colleague or union representative at any formal meeting.</p>`,
    citations: ['HR Policy Manual §6.1', 'Disciplinary Procedure 2023']
  },
  {
    source: 'Based on Contract Draft v2.1, Legal Risk Framework',
    text: `<p>I've reviewed the contract. Here are the key risk areas flagged:</p>
<ul>
<li><strong>Indemnification (Clause 7.3):</strong> Asymmetric — contractor bears unlimited liability while Seepco's is capped at contract value. Recommend renegotiation.</li>
<li><strong>Force majeure (Clause 12):</strong> Does not explicitly include political unrest or government-mandated shutdowns, which are common risks in the Niger Delta.</li>
<li><strong>Payment terms (Clause 5):</strong> Net-60 terms may create cash flow issues for the vendor.</li>
</ul>
<p>Should I escalate this to Legal for final review and redline?</p>`,
    citations: ['Contract Draft v2.1', 'Legal Risk Framework', 'Vendor Risk Assessment']
  },
];

let mockIdx = 0;

function getNextMockResponse() {
  const r = MOCK_RESPONSES[mockIdx % MOCK_RESPONSES.length];
  mockIdx++;
  return r;
}


/* ============================================================
   THINKING ICON — animate during processing
   ============================================================ */
const THINKING_ICON_PATTERN = ['grey','dark','grey', 'grey','light','grey', 'dark','grey','dark'];

function buildThinkingIcon() {
  const grid = document.createElement('div');
  grid.className = 'thinking-icon';
  THINKING_ICON_PATTERN.forEach(type => {
    const cell = document.createElement('div');
    cell.className = `thinking-cell thinking-cell--${type}`;
    grid.appendChild(cell);
  });
  return grid;
}

function animateThinkingIcon(iconEl) {
  const darkCells = Array.from(iconEl.querySelectorAll('.thinking-cell--dark'));
  if (!darkCells.length) return;
  let idx = 0;
  let running = true;
  function tick() {
    if (!running) return;
    const cell = darkCells[idx % darkCells.length];
    cell.style.transition = 'background 50ms ease, transform 50ms ease';
    cell.style.background = '#ff9165';
    cell.style.transform  = 'scale(1.55)';
    setTimeout(() => {
      cell.style.transition = 'background 200ms ease, transform 200ms ease';
      cell.style.background = '#ff5c00';
      cell.style.transform  = 'scale(1)';
    }, 80);
    idx++;
    if (running) setTimeout(tick, 140);
  }
  tick();
  return () => { running = false; };
}


/* ============================================================
   MESSAGE BUILDER
   ============================================================ */
function now() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

const ICON_SVG_REPLY = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>`;
const ICON_SVG_COPY  = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const ICON_SVG_DOC   = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;

function buildUserMsg(text) {
  const el = document.createElement('div');
  el.className = 'msg msg--user msg--new';
  el.innerHTML = `
    <div class="msg__bubble">${escHtml(text)}</div>
    <div class="msg__meta">
      <span class="msg__time">${now()}</span>
      <button class="msg__action-btn" aria-label="Reply">${ICON_SVG_REPLY}</button>
      <button class="msg__action-btn" aria-label="Copy">${ICON_SVG_COPY}</button>
    </div>`;
  return el;
}

function buildProcessingMsg() {
  const el = document.createElement('div');
  el.className = 'msg msg--ai msg--processing msg--new';
  const iconEl = buildThinkingIcon();
  const card = document.createElement('div');
  card.className = 'msg__card';
  const thinking = document.createElement('div');
  thinking.className = 'agent-thinking';
  const label = document.createElement('span');
  label.className = 'agent-thinking__label thinking-dots';
  label.textContent = 'Analyzing';
  thinking.appendChild(iconEl);
  thinking.appendChild(label);
  card.appendChild(thinking);
  el.appendChild(card);
  return { el, iconEl };
}

function buildAiMsg(response) {
  const el = document.createElement('div');
  el.className = 'msg msg--ai msg--new';
  const citations = response.citations.map(c =>
    `<a href="document.html" class="citation-chip">${ICON_SVG_DOC} ${escHtml(c)}</a>`
  ).join('');
  el.innerHTML = `
    <p class="msg__source-label">${escHtml(response.source)}</p>
    <div class="msg__card">
      <div class="msg__text">${response.text}</div>
      <div class="msg__citations">${citations}</div>
    </div>
    <div class="msg__meta">
      <span class="msg__time">${now()}</span>
      <button class="msg__action-btn" aria-label="Reply">${ICON_SVG_REPLY}</button>
      <button class="msg__action-btn" aria-label="Copy">${ICON_SVG_COPY}</button>
    </div>`;
  return el;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function scrollBottom() {
  const el = document.getElementById('chatMessages');
  if (el) el.scrollTop = el.scrollHeight;
}


/* ============================================================
   SEND MESSAGE
   ============================================================ */
const chatInput = document.getElementById('chatInput');
const sendBtn   = document.getElementById('sendBtn');
const msgsInner = document.getElementById('msgsInner');

function sendMessage() {
  const text = chatInput?.value.trim();
  if (!text || !msgsInner) return;

  chatInput.value = '';
  chatInput.style.height = 'auto';

  // Append user bubble
  msgsInner.appendChild(buildUserMsg(text));
  scrollBottom();

  // Append processing bubble
  const { el: processingEl, iconEl } = buildProcessingMsg();
  msgsInner.appendChild(processingEl);
  scrollBottom();

  const stopAnimation = animateThinkingIcon(iconEl);

  // After delay, swap in real response
  setTimeout(() => {
    stopAnimation();
    msgsInner.removeChild(processingEl);
    const response = getNextMockResponse();
    msgsInner.appendChild(buildAiMsg(response));
    scrollBottom();
  }, 1400 + Math.random() * 600);
}

sendBtn?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

chatInput?.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 160) + 'px';
});

// Scroll to bottom on load
scrollBottom();
