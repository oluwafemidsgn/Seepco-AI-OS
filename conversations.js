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

/* ── Sidebar collapse ── */
const sidebar     = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
if (sidebar && collapseBtn) {
  collapseBtn.addEventListener('click', () => {
    const c = sidebar.classList.toggle('sidebar--collapsed');
    collapseBtn.setAttribute('aria-label', c ? 'Expand sidebar' : 'Collapse sidebar');
  });
}

/* ============================================================
   CONVERSATIONS DATA
   ============================================================ */
const CONVERSATIONS = {
  today: [
    {
      title: 'Review this contract for risks',
      preview: 'I found 4 areas of concern in this 12-page vendor agreement...',
      agent: 'Legal Agent',
      icon: ['light','grey','grey', 'dark','dark','dark', 'grey','grey','light'],
      time: '2:46 PM',
      href: 'legal-chat.html',
    },
    {
      title: 'Bonga FPSO Operations Reference',
      preview: 'The emergency shutdown procedure defines a three-tier sequence...',
      agent: 'Knowledge Agent',
      icon: ['light','grey','dark', 'dark','dark','grey', 'light','grey','dark'],
      time: '10:18 AM',
      href: 'agent-chat.html',
    },
  ],
  yesterday: [
    {
      title: 'Warri Field Operations Questions',
      preview: 'Field operations staff are entitled to 21 working days of annual leave...',
      agent: 'HR Agent',
      icon: ['grey','dark','grey', 'grey','light','grey', 'dark','grey','dark'],
      time: 'Yesterday',
      href: 'chat.html',
    },
    {
      title: 'Q3 Budget Variance Review',
      preview: 'Maintenance overspend is linked to the emergency pump replacement...',
      agent: 'Finance Agent',
      icon: ['light','dark','dark', 'dark','light','grey', 'dark','grey','grey'],
      time: 'Yesterday',
      href: 'chat.html',
    },
  ],
  week: [
    {
      title: 'Escravos HSSE Audit Preparation',
      preview: 'PPE compliance rate is at 89% against a target of 95%...',
      agent: 'Audit Agent',
      icon: ['grey','dark','grey', 'dark','light','dark', 'light','grey','light'],
      time: 'Mon',
      href: 'chat.html',
    },
    {
      title: 'Warri Field Production This Week',
      preview: 'Crude oil production at 12,450 bbl/day — above target...',
      agent: 'Operations Agent',
      icon: ['grey','dark','grey', 'dark','light','dark', 'grey','dark','grey'],
      time: 'Mon',
      href: 'chat.html',
    },
  ],
};

/* ============================================================
   BUILD CONVERSATION ITEMS
   ============================================================ */
const MORE_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/></svg>`;

function buildConvoItem(convo) {
  const a = document.createElement('a');
  a.className = 'convo-item';
  a.href = convo.href;

  const iconCells = convo.icon.map(t =>
    `<div class="convo-icon-cell convo-icon-cell--${t}"></div>`
  ).join('');

  a.innerHTML = `
    <div class="convo-item__icon-box">
      <div class="convo-item__icon">${iconCells}</div>
    </div>
    <div class="convo-item__body">
      <span class="convo-item__title">${convo.title}</span>
      <span class="convo-item__preview">${convo.preview}</span>
    </div>
    <div class="convo-item__meta">
      <span class="convo-item__time">${convo.time}</span>
      <span class="convo-item__agent-tag">${convo.agent}</span>
    </div>
    <button class="convo-item__more-btn" onclick="event.preventDefault()" aria-label="More options">${MORE_ICON}</button>`;

  return a;
}

function renderGroup(listId, items) {
  const el = document.getElementById(listId);
  if (!el) return;
  items.forEach((convo, i) => {
    const item = buildConvoItem(convo);
    item.style.opacity = '0';
    item.style.transform = 'translateY(8px)';
    el.appendChild(item);
    setTimeout(() => {
      item.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 80 + i * 50);
  });
}

renderGroup('convosToday',     CONVERSATIONS.today);
renderGroup('convosYesterday', CONVERSATIONS.yesterday);
renderGroup('convosWeek',      CONVERSATIONS.week);
