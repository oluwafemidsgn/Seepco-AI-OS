/* ============================================================
   DECO GRIDS
   ============================================================ */
const DECO_PATTERN = [
  ['light','light','dark','bg',   'dark','bg'   ],
  ['dark', 'light','bg',  'dark', 'light','dark' ],
  ['bg',   'dark', 'dark','bg',   'dark', 'light'],
  ['dark', 'light','dark','bg',   'bg',   'dark' ],
  ['light','bg',   'light','dark','dark', 'bg'   ],
  ['dark', 'light','bg',  'bg',   'dark', 'light'],
];

function buildDecoGrid() {
  const grid = document.createElement('div');
  grid.className = 'deco-grid';
  DECO_PATTERN.forEach(row => row.forEach(type => {
    const cell = document.createElement('div');
    cell.className = `deco-cell deco-cell--${type}`;
    grid.appendChild(cell);
  }));
  return grid;
}

const decoEl = document.getElementById('decoGrids');
if (decoEl) {
  for (let i = 0; i < 4; i++) decoEl.appendChild(buildDecoGrid());
  startDecoScan(decoEl);
}

function startDecoScan(container) {
  const COLS = 6, GRIDS = 4, TOTAL = COLS * GRIDS, SPEED = 7, GLOW = 1.6;
  const cells = [];
  Array.from(container.querySelectorAll('.deco-grid')).forEach((grid, gi) => {
    Array.from(grid.querySelectorAll('.deco-cell')).forEach((cell, ci) => {
      cells.push({ cell, col: gi * COLS + (ci % COLS),
        isDark: cell.classList.contains('deco-cell--dark'),
        isBg:   cell.classList.contains('deco-cell--bg') });
    });
  });
  let pos = 0, last = null;
  (function frame(t) {
    if (!last) last = t;
    pos = (pos + SPEED * Math.min((t - last) / 1000, 0.05)) % TOTAL;
    last = t;
    cells.forEach(({ cell, col, isDark, isBg }) => {
      if (isBg) return;
      let d = Math.abs(col - pos);
      if (d > TOTAL / 2) d = TOTAL - d;
      const g = Math.max(0, 1 - d / GLOW);
      if (g > 0.005) {
        cell.style.filter    = `brightness(${(1 + g * (isDark ? 0.7 : 0.35)).toFixed(3)})`;
        cell.style.transform = `scale(${(1 + g * 0.18).toFixed(4)})`;
      } else { cell.style.filter = cell.style.transform = ''; }
    });
    requestAnimationFrame(frame);
  })(performance.now());
}


/* ============================================================
   HEADER ICON — Knowledge Agent
   ============================================================ */
const KNOWLEDGE_ICON = ['light','grey','dark', 'dark','dark','grey', 'light','grey','dark'];

const headerIconEl = document.getElementById('headerIcon');
if (headerIconEl) {
  KNOWLEDGE_ICON.forEach(type => {
    const cell = document.createElement('div');
    cell.className = `agent-pill__cell agent-pill__cell--${type}`;
    headerIconEl.appendChild(cell);
  });
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
    setTimeout(tick, 950 + Math.random() * 450);
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
   MOCK RESPONSES — Knowledge Agent context
   ============================================================ */
const MOCK_RESPONSES = [
  {
    source: 'Based on SOP-OPS-007 Rev.4 §4.1, Post-Shutdown Checklist',
    text: `<p>Following a Level 2 or Level 3 shutdown, the OIM must initiate a <strong>post-shutdown review</strong> within 24 hours. The checklist includes:</p>
<ul>
<li>Verify all hydrocarbon inventory is isolated and depressurized</li>
<li>Confirm all personnel are mustered and accounted for</li>
<li>Submit NAPIMS Incident Report (Form NAPIMS-IR-01) within 2 hours</li>
<li>Initiate Root Cause Analysis (RCA) if downtime exceeds 4 hours</li>
<li>Restore communications with Onshore Operations Centre</li>
</ul>
<p>The RCA findings must be submitted to the HSSE Director within <strong>72 hours</strong> of the restart.</p>`,
    citations: ['SOP-OPS-007 Rev.4 §4.1', 'Post-Shutdown Checklist', 'NAPIMS Reporting Guidelines']
  },
  {
    source: 'Based on Bonga FPSO Operations Manual §8, Well Control Procedures',
    text: `<p>Well control on Bonga FPSO follows the <strong>IADC Well Control Manual</strong> adapted for the Bonga block. Key intervention thresholds:</p>
<ul>
<li><strong>Kick detection:</strong> Pit gain &gt;1 bbl or flow rate increase &gt;5% triggers immediate well kill sequence</li>
<li><strong>Shut-in procedure:</strong> Hard shut-in method — close BOP within 30 seconds of kick confirmation</li>
<li><strong>Kill method:</strong> Driller's method preferred; engineer's method requires Subsea Well Control Engineer approval</li>
</ul>
<p>All well control incidents must be logged in the Well Control Register and escalated to the Wells Manager within 1 hour.</p>`,
    citations: ['Bonga FPSO Operations Manual §8', 'Well Control Procedures 2023', 'IADC Well Control Manual']
  },
  {
    source: 'Based on SOP-MAINT-012, Rotating Equipment Manual',
    text: `<p>Planned maintenance intervals for the main gas compressors on Bonga FPSO are defined in SOP-MAINT-012:</p>
<ul>
<li><strong>Daily:</strong> Vibration and temperature readings logged by field operators</li>
<li><strong>Weekly:</strong> Lube oil analysis and seal gas pressure checks</li>
<li><strong>Monthly:</strong> Filter replacement and performance curve comparison</li>
<li><strong>Annual:</strong> Full overhaul including impeller inspection — scheduled during planned SIMOPS shutdown</li>
</ul>
<p>Any deviation from baseline vibration exceeding <strong>±15%</strong> must trigger an immediate maintenance work order and production reporting entry.</p>`,
    citations: ['SOP-MAINT-012 Rev.2', 'Rotating Equipment Manual', 'Bonga Maintenance Schedule 2024']
  },
  {
    source: 'Based on Environmental Management Plan, SPDC HSSE Standards',
    text: `<p>The environmental incident classification on Bonga FPSO follows a 4-tier system:</p>
<ul>
<li><strong>Tier 1:</strong> Minor spill (&lt;1 bbl) — managed onsite, reported to OIM within 1 hour</li>
<li><strong>Tier 2:</strong> Significant spill (1–50 bbl) — NAPIMS notification within 2 hours, Pollution Response Plan activated</li>
<li><strong>Tier 3:</strong> Major spill (&gt;50 bbl) — DPR/NOSDRA immediate notification, Tier 3 response contractor mobilized</li>
<li><strong>Tier 4:</strong> Catastrophic — National response activated, Executive leadership notification required</li>
</ul>
<p>All spills must be photographed, GPS-tagged, and entered into the Environmental Incident Register within 30 minutes of discovery.</p>`,
    citations: ['Environmental Management Plan §6', 'SPDC HSSE Standards', 'NOSDRA Reporting Protocol']
  },
];

let mockIdx = 0;

function getNextMockResponse() {
  const r = MOCK_RESPONSES[mockIdx % MOCK_RESPONSES.length];
  mockIdx++;
  return r;
}


/* ============================================================
   THINKING ICON ANIMATION
   ============================================================ */
const THINKING_ICON_PATTERN = ['light','grey','dark', 'dark','dark','grey', 'light','grey','dark'];

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
  if (!darkCells.length) return () => {};
  let idx = 0, running = true;
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
   MESSAGE BUILDERS
   ============================================================ */
function now() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

const ICON_REPLY = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>`;
const ICON_COPY  = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const ICON_DOC   = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;
const ICON_BKM   = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const ICON_SHARE = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
const ICON_UP    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`;
const ICON_DOWN  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>`;

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function buildUserMsg(text) {
  const el = document.createElement('div');
  el.className = 'msg msg--user msg--new';
  el.innerHTML = `
    <div class="msg__bubble">${escHtml(text)}</div>
    <div class="msg__meta">
      <span class="msg__time">${now()}</span>
      <button class="msg__action-btn" aria-label="Reply">${ICON_REPLY}</button>
      <button class="msg__action-btn" aria-label="Copy">${ICON_COPY}</button>
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
  label.textContent = 'Searching knowledge base';
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
    `<a href="document.html" class="citation-chip">${ICON_DOC} ${escHtml(c)}</a>`
  ).join('');
  el.innerHTML = `
    <p class="msg__source-label">${escHtml(response.source)}</p>
    <div class="msg__card">
      <div class="msg__text">${response.text}</div>
      <div class="msg__citations">${citations}</div>
    </div>
    <div class="msg__agent-bar">
      <span class="msg__time">${now()}</span>
      <div class="agent-bar-sep"></div>
      <button class="agent-bar-pill">${ICON_BKM} Bookmark</button>
      <button class="agent-bar-pill">${ICON_SHARE} Share</button>
      <div class="agent-bar-sep"></div>
      <button class="thumb-btn" aria-label="Helpful">${ICON_UP}</button>
      <button class="thumb-btn" aria-label="Not helpful">${ICON_DOWN}</button>
    </div>`;
  return el;
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

  msgsInner.appendChild(buildUserMsg(text));
  scrollBottom();

  const { el: processingEl, iconEl } = buildProcessingMsg();
  msgsInner.appendChild(processingEl);
  scrollBottom();

  const stopAnimation = animateThinkingIcon(iconEl);

  setTimeout(() => {
    stopAnimation();
    msgsInner.removeChild(processingEl);
    msgsInner.appendChild(buildAiMsg(getNextMockResponse()));
    scrollBottom();
  }, 1600 + Math.random() * 700);
}

sendBtn?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

chatInput?.addEventListener('input', () => {
  chatInput.style.height = 'auto';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 160) + 'px';
});

scrollBottom();
