/* ============================================================
   DECO GRIDS — top-right corner pulse
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
  DECO_PATTERN.forEach(row =>
    row.forEach(type => {
      const cell = document.createElement('div');
      cell.className = `deco-cell deco-cell--${type}`;
      grid.appendChild(cell);
    })
  );
  return grid;
}

const decoEl = document.getElementById('decoGrids');
if (decoEl) {
  for (let i = 0; i < 4; i++) decoEl.appendChild(buildDecoGrid());
  startDecoScan(decoEl);
}

function startDecoScan(container) {
  const COLS = 6, GRIDS = 4, TOTAL = COLS * GRIDS;
  const SPEED = 7, GLOW = 1.6;

  const cells = [];
  Array.from(container.querySelectorAll('.deco-grid')).forEach((grid, gi) => {
    Array.from(grid.querySelectorAll('.deco-cell')).forEach((cell, ci) => {
      cells.push({
        cell,
        col: gi * COLS + (ci % COLS),
        isDark: cell.classList.contains('deco-cell--dark'),
        isBg:   cell.classList.contains('deco-cell--bg'),
      });
    });
  });

  let pos = 0, last = null;

  (function frame(t) {
    if (!last) last = t;
    const dt = Math.min((t - last) / 1000, 0.05);
    last = t;
    pos = (pos + SPEED * dt) % TOTAL;

    cells.forEach(({ cell, col, isDark, isBg }) => {
      if (isBg) return;
      let d = Math.abs(col - pos);
      if (d > TOTAL / 2) d = TOTAL - d;
      const g = Math.max(0, 1 - d / GLOW);
      if (g > 0.005) {
        cell.style.filter    = `brightness(${(1 + g * (isDark ? 0.7 : 0.35)).toFixed(3)})`;
        cell.style.transform = `scale(${(1 + g * 0.18).toFixed(4)})`;
      } else {
        cell.style.filter = cell.style.transform = '';
      }
    });

    requestAnimationFrame(frame);
  })(performance.now());
}


/* ============================================================
   AGENTS DATA
   Ordered: left column top→bottom, then right column top→bottom
   Grid renders row-by-row so we interleave: L1, R1, L2, R2, ...
   ============================================================ */
const AGENTS = [
  // Row 1
  {
    name: 'HR Agents',
    desc: 'Leave, payroll, benefits, and HR policy for all staff.',
    icon: ['grey','dark','grey', 'grey','light','grey', 'dark','grey','dark'],
  },
  {
    name: 'Legal Agent',
    desc: 'Contract review, regulatory lookups, and risk flagging.',
    icon: ['light','grey','grey', 'dark','dark','dark', 'grey','grey','light'],
  },
  // Row 2
  {
    name: 'Knowledge Agent',
    desc: 'Answers questions from SOPs, manuals, field reports, and policy archives.',
    icon: ['light','grey','dark', 'dark','dark','grey', 'light','grey','dark'],
  },
  {
    name: 'Audit Agent',
    desc: 'Compliance monitoring, anomaly detection, and audit reporting.',
    icon: ['grey','dark','grey', 'dark','light','dark', 'light','grey','light'],
  },
  // Row 3
  {
    name: 'Operations Agent',
    desc: 'Real-time field data, equipment status, and production records.',
    icon: ['grey','dark','grey', 'dark','light','dark', 'grey','dark','grey'],
  },
  {
    name: 'Finance Agent',
    desc: 'Budget queries, invoice tracking, and financial reporting.',
    icon: ['light','dark','dark', 'dark','light','grey', 'dark','grey','grey'],
  },
  // Row 4
  {
    name: 'Workflow Agent',
    desc: 'Route tasks, trigger approvals, and coordinate across departments.',
    icon: ['dark','grey','dark', 'light','dark','light', 'dark','grey','dark'],
  },
  {
    name: 'Concierge Agent',
    desc: 'IT support, access requests, travel, and admin tasks.',
    icon: ['grey','dark','light', 'dark','light','grey', 'grey','dark','light'],
  },
];


/* ============================================================
   AGENT ICON ANIMATION
   Sequential pulse through dark cells — each agent runs at its
   own cadence so they all feel independent and alive.
   ============================================================ */
function animateAgentIcon(row, agentIndex) {
  const cells     = Array.from(row.querySelectorAll('.agent-cell'));
  const darkCells = cells.filter(c => c.classList.contains('agent-cell--dark'));
  if (!darkCells.length) return;

  let seqIdx    = 0;
  let isHovered = false;

  function flash() {
    const cell = darkCells[seqIdx % darkCells.length];
    const dur  = isHovered ? 70 : 110;

    cell.style.transition = `background ${dur}ms ease, transform ${dur}ms ease`;
    cell.style.background = '#ff9165';
    cell.style.transform  = 'scale(1.45)';

    setTimeout(() => {
      cell.style.transition = 'background 320ms ease, transform 320ms ease';
      cell.style.background = '#ff5c00';
      cell.style.transform  = 'scale(1)';
    }, dur + 30);

    seqIdx++;
    const next = isHovered
      ? 140 + agentIndex * 8
      : 750 + agentIndex * 110 + Math.random() * 180;
    setTimeout(flash, next);
  }

  setTimeout(flash, 350 + agentIndex * 160);

  row.addEventListener('mouseenter', () => { isHovered = true;  seqIdx = 0; });
  row.addEventListener('mouseleave', () => { isHovered = false; });
}


/* ============================================================
   BUILD AGENT ROWS
   ============================================================ */
function buildAgentRow(agent, index) {
  const row = document.createElement('div');
  row.className = 'agent-row';
  row.setAttribute('role', 'button');
  row.setAttribute('tabindex', '0');
  row.setAttribute('aria-label', `Open ${agent.name}`);

  // Icon box
  const iconBox = document.createElement('div');
  iconBox.className = 'agent-icon-box';

  const iconGrid = document.createElement('div');
  iconGrid.className = 'agent-icon-grid';
  agent.icon.forEach(type => {
    const cell = document.createElement('div');
    cell.className = `agent-cell agent-cell--${type}`;
    iconGrid.appendChild(cell);
  });
  iconBox.appendChild(iconGrid);

  // Text
  const text = document.createElement('div');
  text.className = 'agent-text';
  text.innerHTML = `
    <div class="agent-text__name">${agent.name}</div>
    <div class="agent-text__desc">${agent.desc}</div>
  `;

  row.appendChild(iconBox);
  row.appendChild(text);

  // Staggered entrance
  setTimeout(() => {
    row.style.animation = `rowReveal 0.4s cubic-bezier(0.22,1,0.36,1) both`;
  }, 80 + index * 60);

  function openAgent() {
    if (agent.name === 'Knowledge Agent') { window.location.href = 'agent-chat.html'; return; }
    if (agent.name === 'Legal Agent')     { window.location.href = 'legal-chat.html'; return; }
    window.location.href = 'chat.html';
  }
  row.addEventListener('click', openAgent);
  row.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAgent(); }
  });

  return row;
}

const agentsGrid = document.getElementById('agentsGrid');
if (agentsGrid) {
  AGENTS.forEach((agent, i) => {
    const row = buildAgentRow(agent, i);
    agentsGrid.appendChild(row);
    setTimeout(() => animateAgentIcon(row, i), 80 + i * 60 + 400);
  });
}


/* ============================================================
   SEARCH
   ============================================================ */
const searchInput = document.getElementById('searchInput');
const searchBtn   = document.getElementById('searchBtn');

function doSearch() {
  const q = searchInput?.value.trim();
  if (!q) return;
  console.log('Search:', q);
}

searchBtn?.addEventListener('click', doSearch);
searchInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});
