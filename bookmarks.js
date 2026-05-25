/* ── Deco grid (reused across all inner pages) ── */
const DECO_PATTERN = [
  ['light','light','dark','bg',   'dark','bg'   ],
  ['dark', 'light','bg',  'dark', 'light','dark' ],
  ['bg',   'dark', 'dark','bg',   'dark', 'light'],
  ['dark', 'light','dark','bg',   'bg',   'dark' ],
  ['light','bg',   'light','dark','dark', 'bg'   ],
  ['dark', 'light','bg',  'bg',   'dark', 'light'],
];
function buildDecoGrid() {
  const g = document.createElement('div');
  g.className = 'deco-grid';
  DECO_PATTERN.forEach(row => row.forEach(type => {
    const c = document.createElement('div');
    c.className = `deco-cell deco-cell--${type}`;
    g.appendChild(c);
  }));
  return g;
}
const decoEl = document.getElementById('decoGrids');
if (decoEl) { for (let i = 0; i < 4; i++) decoEl.appendChild(buildDecoGrid()); startDecoScan(decoEl); }
function startDecoScan(container) {
  const COLS = 6, GRIDS = 4, TOTAL = COLS * GRIDS, SPEED = 7, GLOW = 1.6;
  const cells = [];
  Array.from(container.querySelectorAll('.deco-grid')).forEach((grid, gi) => {
    Array.from(grid.querySelectorAll('.deco-cell')).forEach((cell, ci) => {
      cells.push({ cell, col: gi * COLS + (ci % COLS), isDark: cell.classList.contains('deco-cell--dark'), isBg: cell.classList.contains('deco-cell--bg') });
    });
  });
  let pos = 0, last = null;
  (function frame(t) {
    if (!last) last = t;
    pos = (pos + SPEED * Math.min((t - last) / 1000, 0.05)) % TOTAL;
    last = t;
    cells.forEach(({ cell, col, isDark, isBg }) => {
      if (isBg) return;
      let d = Math.abs(col - pos); if (d > TOTAL / 2) d = TOTAL - d;
      const g = Math.max(0, 1 - d / GLOW);
      if (g > 0.005) { cell.style.filter = `brightness(${(1 + g * (isDark ? 0.7 : 0.35)).toFixed(3)})`; cell.style.transform = `scale(${(1 + g * 0.18).toFixed(4)})`; }
      else { cell.style.filter = cell.style.transform = ''; }
    });
    requestAnimationFrame(frame);
  })(performance.now());
}
const sidebar = document.getElementById('sidebar'), collapseBtn = document.getElementById('collapseBtn');
if (sidebar && collapseBtn) { collapseBtn.addEventListener('click', () => { const c = sidebar.classList.toggle('sidebar--collapsed'); collapseBtn.setAttribute('aria-label', c ? 'Expand sidebar' : 'Collapse sidebar'); }); }

/* ============================================================
   BOOKMARKS DATA
   ============================================================ */
const BOOKMARKS = [
  {
    agent: 'Legal Agent',
    icon: ['light','grey','grey', 'dark','dark','dark', 'grey','grey','light'],
    convo: 'Review this contract for risks',
    text: 'I found 4 areas of concern: 🔴 High Risk — Clause 8.3 grants the vendor unlimited IP rights over deliverables. 🟡 Medium Risk — Clause 4.1: Payment terms of 90 days exceeds Seepco\'s standard Net-30 policy.',
    date: 'Today, 2:46 PM',
    href: 'legal-chat.html',
  },
  {
    agent: 'Knowledge Agent',
    icon: ['light','grey','dark', 'dark','dark','grey', 'light','grey','dark'],
    convo: 'Bonga FPSO Operations Reference',
    text: 'The Emergency Shutdown Procedure (SOP-OPS-007, Rev.4) defines a three-tier shutdown sequence. Level 3 ESS requires dual-authorization from the OIM and Area Authority — a new requirement introduced in the March 2024 revision.',
    date: 'Today, 10:15 AM',
    href: 'agent-chat.html',
  },
  {
    agent: 'HR Agent',
    icon: ['grey','dark','grey', 'grey','light','grey', 'dark','grey','dark'],
    convo: 'Warri Field Operations Questions',
    text: 'Field operations staff are entitled to 21 working days of annual leave per year. Rotational staff follow the 28-day field / 28-day leave cycle. Carry-over is capped at 10 working days and must be used by June 30th.',
    date: 'Yesterday, 3:12 PM',
    href: 'chat.html',
  },
  {
    agent: 'Finance Agent',
    icon: ['light','dark','dark', 'dark','light','grey', 'dark','grey','grey'],
    convo: 'Q3 Budget Variance Review',
    text: 'Maintenance overspend of 17.9% (₦1.05B vs ₦890M budget) is linked to the emergency pump replacement at Forcados Terminal in August. Operations and Logistics remain under-budget.',
    date: 'Yesterday, 9:40 AM',
    href: 'chat.html',
  },
];

/* ============================================================
   BUILD BOOKMARK CARDS
   ============================================================ */
const ICON_OPEN  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const ICON_UNBKM = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const ICON_COPY  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

function buildBookmarkCard(bm, index) {
  const card = document.createElement('div');
  card.className = 'bookmark-card';
  card.style.opacity = '0';
  card.style.transform = 'translateY(10px)';

  const iconCells = bm.icon.map(t =>
    `<div class="convo-icon-cell convo-icon-cell--${t}"></div>`
  ).join('');

  card.innerHTML = `
    <div class="bookmark-card__header">
      <div class="bookmark-card__agent">
        <div class="bookmark-card__agent-icon">${iconCells}</div>
        <span class="bookmark-card__agent-name">${bm.agent}</span>
        <span class="convo-item__agent-tag" style="margin-left:4px">${bm.convo}</span>
      </div>
      <div class="bookmark-card__actions">
        <button class="bookmark-card__btn" title="Copy">${ICON_COPY}</button>
        <button class="bookmark-card__btn" title="Remove bookmark">${ICON_UNBKM}</button>
      </div>
    </div>
    <p class="bookmark-card__text">${bm.text}</p>
    <div class="bookmark-card__footer">
      <span class="bookmark-card__meta">${bm.date}</span>
      <button class="bookmark-card__open" onclick="window.location.href='${bm.href}'">${ICON_OPEN} Open conversation</button>
    </div>`;

  card.addEventListener('click', e => {
    if (!e.target.closest('button')) window.location.href = bm.href;
  });

  setTimeout(() => {
    card.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 80 + index * 70);

  return card;
}

const bookmarkList = document.getElementById('bookmarkList');
if (bookmarkList) {
  BOOKMARKS.forEach((bm, i) => bookmarkList.appendChild(buildBookmarkCard(bm, i)));
}
