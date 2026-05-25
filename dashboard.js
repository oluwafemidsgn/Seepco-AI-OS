/* ============================================================
   GREETING — time-of-day aware
   ============================================================ */
(function setGreeting() {
  const h = new Date().getHours();
  const period = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
  const el = document.getElementById('greetingText');
  if (el) el.textContent = `Good ${period}, Oluwafemi`;
})();


/* ============================================================
   DECORATION PIXEL GRIDS (top-right corner)
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

const decoContainer = document.getElementById('decoGrids');
if (decoContainer) {
  for (let i = 0; i < 4; i++) decoContainer.appendChild(buildDecoGrid());

  // Subtle idle pulse on deco grids
  const decoDark  = Array.from(decoContainer.querySelectorAll('.deco-cell--dark'));
  const decoLight = Array.from(decoContainer.querySelectorAll('.deco-cell--light'));

  (function decoLoop() {
    const cell = decoDark[Math.floor(Math.random() * decoDark.length)];
    if (cell) {
      cell.style.transition = 'opacity 0.1s, transform 0.1s';
      cell.style.opacity = '0.45'; cell.style.transform = 'scale(1.25)';
      setTimeout(() => {
        cell.style.transition = 'opacity 0.35s, transform 0.35s';
        cell.style.opacity = '1'; cell.style.transform = 'scale(1)';
      }, 120);
    }
    if (Math.random() < 0.3) {
      const lc = decoLight[Math.floor(Math.random() * decoLight.length)];
      if (lc) {
        lc.style.transition = 'opacity 0.2s'; lc.style.opacity = '0.2';
        setTimeout(() => { lc.style.transition = 'opacity 0.4s'; lc.style.opacity = '1'; }, 230);
      }
    }
    setTimeout(decoLoop, 140 + Math.random() * 280);
  })();
}


/* ============================================================
   AGENTS DATA
   ============================================================ */
const AGENTS = [
  {
    name: 'HR Agent',
    // Row by row: grey=neutral, dark=orange-500, light=orange-100
    icon: ['grey','dark','grey', 'grey','light','grey', 'dark','grey','dark'],
  },
  {
    name: 'Operations Agent',
    icon: ['grey','dark','grey', 'dark','light','dark', 'grey','dark','grey'],
  },
  {
    name: 'Legal Agent',
    icon: ['light','grey','grey', 'dark','dark','dark', 'grey','grey','light'],
  },
  {
    name: 'Finance Agent',
    icon: ['light','dark','dark', 'dark','light','grey', 'dark','grey','grey'],
  },
  {
    name: 'Knowledge Agent',
    icon: ['light','grey','dark', 'dark','dark','grey', 'light','grey','dark'],
  },
  {
    name: 'Workflow Agent',
    icon: ['dark','grey','dark', 'light','dark','light', 'dark','grey','dark'],
  },
  {
    name: 'Audit Agent',
    icon: ['grey','dark','grey', 'dark','light','dark', 'light','grey','light'],
  },
  {
    name: 'Concierge Agent',
    icon: ['grey','dark','light', 'dark','light','grey', 'grey','dark','light'],
  },
];

/* ============================================================
   AGENT ICON ANIMATION
   Each agent's dark cells light up sequentially, creating a
   unique rhythm/signature per agent. Runs continuously on hover
   and at a slow idle rate when not hovered.
   ============================================================ */
function animateAgentIcon(card, agentIndex) {
  const cells     = Array.from(card.querySelectorAll('.agent-cell'));
  const darkCells = cells.filter(c => c.classList.contains('agent-cell--dark'));
  if (darkCells.length === 0) return;

  let seqIdx    = 0;
  let isHovered = false;
  let timerId   = null;

  function flash(cell, fast) {
    const dur = fast ? 80 : 120;
    cell.style.transition = `background ${dur}ms ease, transform ${dur}ms ease`;
    cell.style.background = '#ff9165'; // orange-400 — brighter flash
    cell.style.transform  = 'scale(1.5)';
    setTimeout(() => {
      cell.style.transition = 'background 300ms ease, transform 300ms ease';
      cell.style.background = '#ff5c00'; // back to orange-500
      cell.style.transform  = 'scale(1)';
    }, dur + 40);
  }

  function next() {
    flash(darkCells[seqIdx % darkCells.length], isHovered);
    seqIdx++;

    // Idle: slow, organic interval. Hover: rapid sequential burst
    const interval = isHovered
      ? 160 + agentIndex * 10          // snappy cascade on hover
      : 700 + agentIndex * 120 + Math.random() * 200; // slow idle

    timerId = setTimeout(next, interval);
  }

  // Start staggered so agents don't all fire together
  timerId = setTimeout(next, 300 + agentIndex * 180);

  card.addEventListener('mouseenter', () => {
    isHovered = true;
    seqIdx = 0; // restart sequence from beginning on hover
  });
  card.addEventListener('mouseleave', () => {
    isHovered = false;
  });
}


/* ============================================================
   BUILD AGENT CARDS
   ============================================================ */
function buildAgentCard(agent, index) {
  const card = document.createElement('div');
  card.className = 'agent-card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Open ${agent.name}`);

  // 3×3 pixel icon grid
  const iconEl = document.createElement('div');
  iconEl.className = 'agent-card__icon';
  agent.icon.forEach(type => {
    const cell = document.createElement('div');
    cell.className = `agent-cell agent-cell--${type}`;
    iconEl.appendChild(cell);
  });

  const nameEl = document.createElement('div');
  nameEl.className = 'agent-card__name';
  nameEl.textContent = agent.name;

  card.appendChild(iconEl);
  card.appendChild(nameEl);

  // Staggered entrance
  const delay = 120 + index * 55;
  setTimeout(() => {
    card.style.animation = `cardReveal 0.45s cubic-bezier(0.22,1,0.36,1) both`;
  }, delay);

  // Click / keyboard
  card.addEventListener('click', () => openAgent(agent.name));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAgent(agent.name); }
  });

  return card;
}

function openAgent(name) {
  if (name === 'Knowledge Agent') { window.location.href = 'agent-chat.html'; return; }
  if (name === 'Legal Agent')     { window.location.href = 'legal-chat.html'; return; }
  window.location.href = 'chat.html';
}

const agentsGrid = document.getElementById('agentsGrid');
if (agentsGrid) {
  AGENTS.forEach((agent, i) => {
    const card = buildAgentCard(agent, i);
    agentsGrid.appendChild(card);
    // Start icon animation after card appears
    setTimeout(() => animateAgentIcon(card, i), 120 + i * 55 + 450);
  });
}


/* ============================================================
   CHAT INPUT — auto-grow + submit
   ============================================================ */
const chatInput = document.getElementById('chatInput');

if (chatInput) {
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 160) + 'px';
  });

  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitQuery(); }
  });
}

document.getElementById('askBtn')?.addEventListener('click', submitQuery);

function submitQuery() {
  const val = chatInput?.value.trim();
  if (!val) return;
  console.log('Query:', val);
  chatInput.value = '';
  chatInput.style.height = 'auto';
}


/* ============================================================
   SUGGESTION PILLS
   ============================================================ */
document.getElementById('suggestionPills')?.addEventListener('click', e => {
  const pill = e.target.closest('.pill');
  if (!pill || !chatInput) return;
  chatInput.value = pill.textContent.trim();
  chatInput.dispatchEvent(new Event('input'));
  chatInput.focus();
});


/* ============================================================
   SIDEBAR COLLAPSE TOGGLE
   ============================================================ */
const sidebar     = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');

if (sidebar && collapseBtn) {
  collapseBtn.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('sidebar--collapsed');
    collapseBtn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  });
}
