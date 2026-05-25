
/* ============================================================
   HEADER ICON — Legal Agent
   icon: light, grey, grey | dark, dark, dark | grey, grey, light
   ============================================================ */
const LEGAL_ICON = ['light','grey','grey', 'dark','dark','dark', 'grey','grey','light'];

const headerIconEl = document.getElementById('headerIcon');
if (headerIconEl) {
  LEGAL_ICON.forEach(type => {
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
   CONVERSATION TITLE — updates on first send
   ============================================================ */
const convoTitle = document.getElementById('convoTitle');
let titleSet = true; // already set from pre-populated state


/* ============================================================
   FILE ATTACHMENT
   ============================================================ */
const attachedFile = document.getElementById('attachedFile');
const removeFile   = document.getElementById('removeFile');
let hasAttachment  = true;

if (removeFile) {
  removeFile.addEventListener('click', () => {
    attachedFile.style.display = 'none';
    hasAttachment = false;
  });
}

document.getElementById('addFileBtn')?.addEventListener('click', () => {
  if (attachedFile) {
    attachedFile.style.display = 'flex';
    hasAttachment = true;
  }
});


/* ============================================================
   MOCK RESPONSES — Legal context
   ============================================================ */
const MOCK_RESPONSES = [
  {
    source: 'Based on Vendor_Agreement_Draft.pdf, Seepco Contract Policy 2024',
    type: 'risk',
    risks: [
      { level: 'high',   clause: 'Clause 8.3', text: 'Unlimited IP rights granted to vendor over all work products. Conflicts with Seepco\'s IP retention standard. Recommend redlining to "work for hire" language.' },
      { level: 'medium', clause: 'Clause 4.1', text: 'Net-90 payment terms exceed Seepco\'s standard Net-30. Legal recommends capping at Net-45 for vendors above ₦50M contract value.' },
      { level: 'low',    clause: 'Clause 15', text: 'Confidentiality period of 2 years post-termination is standard and acceptable.' },
    ]
  },
  {
    source: 'Based on Nigerian Oil & Gas Industry Content Development Act, DPR Regulations',
    type: 'text',
    text: `<p>Under the <strong>Nigerian Oil and Gas Industry Content Development Act (NOIDCDA)</strong>, contracts above $1M USD must include a minimum of 30% local content by value. The current draft does not specify local content provisions.</p>
<p>Key requirements for compliance:</p>
<ul>
<li>Local content plan must be submitted to NCDMB before contract execution</li>
<li>Vendor must provide evidence of Nigerian workforce participation at a minimum of 70% for non-specialist roles</li>
<li>Technology transfer provisions must be included for contracts involving proprietary systems</li>
</ul>
<p>Recommend escalating to the Legal & Compliance team for review before signing.</p>`,
    citations: ['NOIDCDA §10', 'NCDMB Guidelines 2023', 'DPR Contract Compliance Manual']
  },
  {
    source: 'Based on Nigerian Arbitration and Conciliation Act, Seepco Dispute Policy',
    type: 'text',
    text: `<p>The contract currently has no dispute resolution clause, which creates significant legal exposure. Seepco's standard position on dispute resolution:</p>
<ul>
<li><strong>Tier 1:</strong> Good faith negotiation — 30 days to resolve commercially</li>
<li><strong>Tier 2:</strong> Mediation — Lagos Court of Arbitration, neutral mediator appointed within 14 days</li>
<li><strong>Tier 3:</strong> Binding arbitration — ICC Rules, seat in Lagos, English language</li>
</ul>
<p>This three-tier clause should be inserted as Clause 11A. I can generate the standard Seepco arbitration clause language for your review.</p>`,
    citations: ['Arbitration and Conciliation Act CAP A18', 'Seepco Standard Contract Terms §9']
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
function buildThinkingBubble() {
  const el = document.createElement('div');
  el.className = 'msg msg--ai msg--processing msg--new';
  el.innerHTML = `<div class="msg__card"><div class="agent-thinking"><div class="thinking-icon" id="thinkIconEl"></div><span class="agent-thinking__label thinking-dots">Reviewing document</span></div></div>`;
  return el;
}

function fillThinkingIcon(el) {
  LEGAL_ICON.forEach(type => {
    const cell = document.createElement('div');
    cell.className = `thinking-cell thinking-cell--${type}`;
    el.appendChild(cell);
  });
  const darkCells = Array.from(el.querySelectorAll('.thinking-cell--dark'));
  let idx = 0, running = true;
  function tick() {
    if (!running) return;
    const cell = darkCells[idx % darkCells.length];
    cell.style.transition = 'background 50ms, transform 50ms';
    cell.style.background = '#ff9165';
    cell.style.transform  = 'scale(1.55)';
    setTimeout(() => { cell.style.transition = 'background 200ms, transform 200ms'; cell.style.background = '#ff5c00'; cell.style.transform = 'scale(1)'; }, 80);
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
const ICON_UP    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>`;
const ICON_DOWN  = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/><path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/></svg>`;
const ICON_BKM   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const ICON_SHARE = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
const ICON_EXP   = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
const ICON_DOC   = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`;

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const RISK_LEVEL_MAP = { high: '🔴 High Risk', medium: '🟡 Medium Risk', low: '🟢 Low Risk' };

function buildLegalBar(t) {
  return `<div class="msg__legal-bar">
    <div class="legal-action-group">
      <button class="legal-action-btn" aria-label="Bookmark">${ICON_BKM}</button>
      <button class="legal-action-btn" aria-label="Share">${ICON_SHARE}</button>
      <button class="legal-action-btn" aria-label="Export">${ICON_EXP}</button>
    </div>
    <span class="msg__time">${t}</span>
    <button class="msg__action-btn" aria-label="Reply">${ICON_REPLY}</button>
    <button class="msg__action-btn" aria-label="Helpful">${ICON_UP}</button>
    <button class="msg__action-btn" aria-label="Not helpful">${ICON_DOWN}</button>
    <button class="msg__action-btn" aria-label="Copy">${ICON_COPY}</button>
  </div>`;
}

function buildUserMsg(text) {
  const t = now();
  const el = document.createElement('div');
  el.className = 'msg msg--user msg--new';
  if (hasAttachment) {
    el.innerHTML = `
      <div class="msg__bubble msg__bubble--with-file">
        <div class="msg__file-chip">${ICON_DOC} Vendor_Agreement_Draft.pdf</div>
        <span class="msg__bubble-text">${escHtml(text)}</span>
      </div>
      <div class="msg__meta"><span class="msg__time">${t}</span>
        <button class="msg__action-btn">${ICON_REPLY}</button>
        <button class="msg__action-btn">${ICON_COPY}</button>
      </div>`;
  } else {
    el.innerHTML = `
      <div class="msg__bubble">${escHtml(text)}</div>
      <div class="msg__meta"><span class="msg__time">${t}</span>
        <button class="msg__action-btn">${ICON_REPLY}</button>
        <button class="msg__action-btn">${ICON_COPY}</button>
      </div>`;
  }
  return el;
}

function buildAiMsg(response) {
  const t = now();
  const el = document.createElement('div');
  el.className = 'msg msg--ai msg--new';

  if (response.type === 'risk') {
    const riskItems = response.risks.map(r => `
      <div class="risk-item">
        <span class="risk-item__badge risk-item__badge--${r.level}">${RISK_LEVEL_MAP[r.level]}</span>
        <span class="risk-item__clause">${escHtml(r.clause)}</span> — ${escHtml(r.text)}
      </div>`).join('');

    el.innerHTML = `
      <p class="msg__source-label">${escHtml(response.source)}</p>
      <div class="msg__card">
        <div class="msg__text">
          <p class="risk-summary">I found <strong>${response.risks.length} areas of concern</strong>.</p>
          <div class="risk-list">${riskItems}</div>
        </div>
        <button class="msg__file-ref">${ICON_DOC} Vendor_Agreement_Draft.pdf</button>
      </div>
      ${buildLegalBar(t)}`;
  } else {
    const citations = (response.citations || []).map(c =>
      `<a href="document.html" class="citation-chip">${ICON_DOC} ${escHtml(c)}</a>`
    ).join('');
    el.innerHTML = `
      <p class="msg__source-label">${escHtml(response.source)}</p>
      <div class="msg__card">
        <div class="msg__text">${response.text}</div>
        ${citations ? `<div class="msg__citations">${citations}</div>` : ''}
      </div>
      ${buildLegalBar(t)}`;
  }
  return el;
}


/* ============================================================
   SEND MESSAGE
   ============================================================ */
const chatInput = document.getElementById('chatInput');
const sendBtn   = document.getElementById('sendBtn');
const msgsInner = document.getElementById('msgsInner');

function scrollBottom() {
  const el = document.getElementById('chatMessages');
  if (el) el.scrollTop = el.scrollHeight;
}

function sendMessage() {
  const text = chatInput?.value.trim();
  if (!text || !msgsInner) return;

  chatInput.value = '';
  chatInput.style.height = 'auto';

  msgsInner.appendChild(buildUserMsg(text));
  scrollBottom();

  const thinkEl = buildThinkingBubble();
  msgsInner.appendChild(thinkEl);
  scrollBottom();

  const thinkIcon = thinkEl.querySelector('#thinkIconEl');
  const stopAnim = thinkIcon ? fillThinkingIcon(thinkIcon) : () => {};

  setTimeout(() => {
    stopAnim();
    msgsInner.removeChild(thinkEl);
    msgsInner.appendChild(buildAiMsg(getNextMockResponse()));
    scrollBottom();
  }, 1600 + Math.random() * 800);
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
