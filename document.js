
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
  const darkCells = Array.from(headerIconEl.querySelectorAll('.agent-pill__cell--dark'));
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
    setTimeout(tick, 1000 + Math.random() * 500);
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
   CITATION HIGHLIGHT
   Scroll the document panel to a cited section and pulse it.
   ============================================================ */
function highlightSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Brief pulse
  el.style.transition = 'outline 0.15s';
  el.style.outline = '2px solid #ff9165';
  setTimeout(() => {
    el.style.transition = 'outline 0.4s';
    el.style.outline = '2px solid transparent';
    setTimeout(() => { el.style.outline = ''; }, 400);
  }, 300);
}


/* ============================================================
   MOCK RESPONSES (for continued chat in doc view)
   ============================================================ */
const MOCK_RESPONSES = [
  {
    source: 'Based on SOP-OPS-007 Rev.4 §4.1',
    text: `<p>Following a Level 2 or Level 3 shutdown, the OIM initiates a <strong>post-shutdown review within 24 hours</strong>. Key requirements include NAPIMS Incident Report submission, personnel muster verification, and Root Cause Analysis if downtime exceeds 4 hours. RCA findings go to the HSSE Director within <strong>72 hours</strong> of restart.</p>`,
    citations: ['SOP-OPS-007 Rev.4 §4.1', 'Post-Shutdown Checklist']
  },
  {
    source: 'Based on Authority Matrix 2024, SOP-OPS-007 §3.3',
    text: `<p>Per the updated procedure (Rev.4, March 2024), dual-authorization for Level 3 shutdowns requires both the <strong>Offshore Installation Manager (OIM)</strong> and the <strong>Area Authority</strong> (VP Operations or delegate). If the Area Authority is unreachable, the OIM may invoke the <strong>Emergency Authority Protocol</strong> for unilateral initiation — with immediate notification once communications are restored.</p>`,
    citations: ['Authority Matrix 2024', 'SOP-OPS-007 §3.3']
  },
];

let mockIdx = 0;

function getNextMockResponse() {
  const r = MOCK_RESPONSES[mockIdx % MOCK_RESPONSES.length];
  mockIdx++;
  return r;
}


/* ============================================================
   SEND MESSAGE
   ============================================================ */
function now() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

const ICON_COPY = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const ICON_DOC  = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function buildThinkingBubble() {
  const el = document.createElement('div');
  el.className = 'msg msg--ai msg--processing msg--new';
  el.innerHTML = `<div class="msg__card"><div class="agent-thinking"><div class="thinking-icon" id="thinkIcon"></div><span class="agent-thinking__label thinking-dots">Searching</span></div></div>`;
  return el;
}

const chatInput = document.getElementById('chatInput');
const sendBtn   = document.getElementById('sendBtn');
const msgsInner = document.getElementById('msgsInner');
const chatMessages = document.getElementById('chatMessages');

function scrollBottom() { if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight; }

function sendMessage() {
  const text = chatInput?.value.trim();
  if (!text || !msgsInner) return;
  chatInput.value = '';
  chatInput.style.height = 'auto';

  // User bubble
  const userEl = document.createElement('div');
  userEl.className = 'msg msg--user msg--new';
  userEl.innerHTML = `<div class="msg__bubble">${escHtml(text)}</div><div class="msg__meta"><span class="msg__time">${now()}</span><button class="msg__action-btn">${ICON_COPY}</button></div>`;
  msgsInner.appendChild(userEl);
  scrollBottom();

  // Thinking bubble
  const thinkEl = buildThinkingBubble();
  msgsInner.appendChild(thinkEl);
  scrollBottom();

  // Build thinking icon
  const thinkIcon = thinkEl.querySelector('#thinkIcon');
  const iconPattern = ['light','grey','dark', 'dark','dark','grey', 'light','grey','dark'];
  iconPattern.forEach(type => {
    const cell = document.createElement('div');
    cell.className = `thinking-cell thinking-cell--${type}`;
    if (thinkIcon) thinkIcon.appendChild(cell);
  });

  // Animate thinking icon
  const darkCells = thinkIcon ? Array.from(thinkIcon.querySelectorAll('.thinking-cell--dark')) : [];
  let tIdx = 0, running = true;
  function tick() {
    if (!running || !darkCells.length) return;
    const cell = darkCells[tIdx % darkCells.length];
    cell.style.transition = 'background 50ms, transform 50ms';
    cell.style.background = '#ff9165';
    cell.style.transform  = 'scale(1.55)';
    setTimeout(() => { cell.style.transition = 'background 200ms, transform 200ms'; cell.style.background = '#ff5c00'; cell.style.transform = 'scale(1)'; }, 80);
    tIdx++;
    if (running) setTimeout(tick, 140);
  }
  tick();

  setTimeout(() => {
    running = false;
    msgsInner.removeChild(thinkEl);
    const r = getNextMockResponse();
    const citations = r.citations.map(c => `<a href="#" class="citation-chip">${ICON_DOC} ${escHtml(c)}</a>`).join('');
    const aiEl = document.createElement('div');
    aiEl.className = 'msg msg--ai msg--new';
    aiEl.innerHTML = `<p class="msg__source-label">${escHtml(r.source)}</p><div class="msg__card"><div class="msg__text">${r.text}</div><div class="msg__citations">${citations}</div></div><div class="msg__meta"><span class="msg__time">${now()}</span><button class="msg__action-btn">${ICON_COPY}</button></div>`;
    msgsInner.appendChild(aiEl);
    scrollBottom();
  }, 1500 + Math.random() * 600);
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
