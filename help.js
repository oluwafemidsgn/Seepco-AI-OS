/* ── Deco grid scan beam ── */
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

/* ── Sidebar collapse ── */
const sidebar = document.getElementById('sidebar'), collapseBtn = document.getElementById('collapseBtn');
if (sidebar && collapseBtn) { collapseBtn.addEventListener('click', () => { const c = sidebar.classList.toggle('sidebar--collapsed'); collapseBtn.setAttribute('aria-label', c ? 'Expand sidebar' : 'Collapse sidebar'); }); }

/* ── FAQ accordion ── */
document.getElementById('faqList')?.addEventListener('click', e => {
  const btn = e.target.closest('.faq-item__q');
  if (!btn) return;
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('faq-item--open');
  document.querySelectorAll('.faq-item--open').forEach(el => el.classList.remove('faq-item--open'));
  if (!isOpen) item.classList.add('faq-item--open');
});
