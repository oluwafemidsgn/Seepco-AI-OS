/* ============================================================
   PIXEL GRID GENERATOR
   ============================================================ */
const GRID_PATTERN = [
  ['light','light','dark','bg',   'dark','bg'   ],
  ['dark', 'light','bg',  'dark', 'light','dark' ],
  ['bg',   'dark', 'dark','bg',   'dark', 'light'],
  ['dark', 'light','dark','bg',   'bg',   'dark' ],
  ['light','bg',   'light','dark','dark', 'bg'   ],
  ['dark', 'light','bg',  'bg',   'dark', 'light'],
];

function createGrid() {
  const grid = document.createElement('div');
  grid.className = 'pixel-grid';
  GRID_PATTERN.forEach(row => {
    row.forEach(type => {
      const cell = document.createElement('div');
      cell.className = `pixel-cell pixel-cell--${type}`;
      grid.appendChild(cell);
    });
  });
  return grid;
}

function renderGrids(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) container.appendChild(createGrid());
}

renderGrids('gridsLeft',  4);
renderGrids('gridsRight', 4);


/* ============================================================
   PASSWORD TOGGLE
   ============================================================ */
const toggleBtn  = document.getElementById('togglePassword');
const passwordEl = document.getElementById('password');
const eyeIcon    = document.getElementById('eyeIcon');

const EYE_OPEN = `
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>
`;
const EYE_CLOSED = `
  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
  <line x1="1" y1="1" x2="23" y2="23"/>
`;

if (toggleBtn && passwordEl) {
  toggleBtn.addEventListener('click', () => {
    const isPassword = passwordEl.type === 'password';
    passwordEl.type = isPassword ? 'text' : 'password';
    eyeIcon.innerHTML = isPassword ? EYE_CLOSED : EYE_OPEN;
    toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });
}


/* ============================================================
   FORM VALIDATION & SUBMISSION
   ============================================================ */
const loginForm   = document.getElementById('loginForm');
const emailEl     = document.getElementById('email');
const continueBtn = document.getElementById('continueBtn');
const formError   = document.getElementById('formError');

function setError(msg)  { formError.textContent = msg; }
function clearError()   { formError.textContent = ''; }

function setLoading(loading) {
  continueBtn.disabled = loading;
  continueBtn.classList.toggle('loading', loading);
}

function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const email    = emailEl.value.trim();
    const password = passwordEl.value;

    if (!email)               { setError('Please enter your email address.'); emailEl.focus(); return; }
    if (!validateEmail(email)){ setError('Please enter a valid email address.'); emailEl.focus(); return; }
    if (!password)            { setError('Please enter your password.'); passwordEl.focus(); return; }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      window.location.href = './dashboard.html';
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  });

  [emailEl, passwordEl].forEach(input => {
    input?.addEventListener('input', () => {
      input.classList.remove('form-input--error');
      clearError();
    });
  });
}


/* ============================================================
   PIXEL GRID ANIMATION
   Phase 1 — diagonal wave reveal
   Phase 2 — continuous left-to-right scan beam (rAF loop)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const allCells = document.querySelectorAll('.pixel-cell');

  // ── Phase 1: diagonal stagger-in ──────────────────────────
  allCells.forEach(cell => {
    const grid  = cell.closest('.pixel-grid');
    const cells = Array.from(grid.querySelectorAll('.pixel-cell'));
    const idx   = cells.indexOf(cell);
    const row   = Math.floor(idx / 6);
    const col   = idx % 6;
    const delay = (row + col) * 55;

    cell.style.opacity   = '0';
    cell.style.transform = 'scale(0.3)';
    cell.style.transition = `opacity 0.45s ease ${delay}ms, transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`;

    requestAnimationFrame(() => requestAnimationFrame(() => {
      cell.style.opacity   = '1';
      cell.style.transform = 'scale(1)';
    }));
  });

  // ── Phase 2: scan beam starts after reveal completes ──────
  const REVEAL_DONE = (5 + 5) * 55 + 480; // max diagonal delay + transition duration

  setTimeout(() => {
    // Clear reveal transitions so rAF can take over instantly
    allCells.forEach(cell => {
      cell.style.transition = 'none';
    });

    startScanBeam('gridsLeft');
    startScanBeam('gridsRight');
  }, REVEAL_DONE);
});


/* ============================================================
   SCAN BEAM — smooth rAF-driven left-to-right sweep
   ============================================================ */
function startScanBeam(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const COLS_PER_GRID = 6;
  const SPEED         = 7;    // columns per second — one full sweep ≈ 3.4 s
  const GLOW_HALF     = 1.6;  // columns of brightness falloff on each side

  // Build a flat list of { cell, globalCol, type } entries
  const grids = Array.from(container.querySelectorAll('.pixel-grid'));
  const TOTAL_COLS = grids.length * COLS_PER_GRID;

  const cellData = [];
  grids.forEach((grid, gi) => {
    Array.from(grid.querySelectorAll('.pixel-cell')).forEach((cell, ci) => {
      cellData.push({
        cell,
        globalCol: gi * COLS_PER_GRID + (ci % COLS_PER_GRID),
        isDark:  cell.classList.contains('pixel-cell--dark'),
        isBg:    cell.classList.contains('pixel-cell--bg'),
      });
    });
  });

  let pos      = 0;
  let lastTime = null;

  function frame(time) {
    if (!lastTime) lastTime = time;
    const dt = Math.min((time - lastTime) / 1000, 0.05); // cap dt to avoid jump after tab switch
    lastTime = time;

    pos = (pos + SPEED * dt) % TOTAL_COLS;

    cellData.forEach(({ cell, globalCol, isDark, isBg }) => {
      if (isBg) return;

      // Shortest circular distance
      let dist = Math.abs(globalCol - pos);
      if (dist > TOTAL_COLS / 2) dist = TOTAL_COLS - dist;

      const glow = Math.max(0, 1 - dist / GLOW_HALF);

      if (glow > 0.005) {
        // Dark cells boost more than light cells
        const boost = glow * (isDark ? 0.75 : 0.35);
        cell.style.filter    = `brightness(${(1 + boost).toFixed(3)})`;
        cell.style.transform = `scale(${(1 + glow * 0.18).toFixed(4)})`;
      } else {
        cell.style.filter    = '';
        cell.style.transform = '';
      }
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
