// ══════════════════════════════════════════
// SEEPCO KMS — Knowledge Base logic (folded into AI OS shell)
// ══════════════════════════════════════════

// ── DATA ──
const DOCS = [
  { id:1, path:'SharePoint / HR / Policies / Leave_Policy_v5.pdf', date:'March 2025', tags:['HR','Medium'], title:'Seepco Employee Leave Policy — Rev 5', snippet:'Permanent employees are entitled to 21 working days of annual leave per calendar year. Leave must be approved by the line manager at least 14 days in advance...', category:'Documents',
    content:`<p>Seepco's Employee Leave Policy (Revision 5) outlines the full entitlements and procedures for all categories of leave available to permanent and contract staff.</p><p><strong>Annual Leave:</strong> Permanent employees are entitled to 21 working days of annual leave per calendar year. Contract staff receive 15 days, pro-rated to tenure. Leave must be applied for and approved at least 14 days in advance.</p><ul><li>Annual leave carries over a maximum of 7 days to the following calendar year.</li><li>Emergency leave (up to 3 days) can be requested with immediate supervisor approval.</li><li>Maternity leave: 16 weeks fully paid. Paternity leave: 2 weeks fully paid.</li></ul><p><strong>Sick Leave:</strong> Employees are entitled to 15 days of certified sick leave per year. Medical certificates must be submitted within 48 hours of returning to work.</p><p>All leave requests are managed through the Seepco HR portal and require line manager approval before being considered confirmed.</p>` },
  { id:2, path:'SharePoint / Finance / Reports / Q1_Financial_Summary_2025.xlsx', date:'April 2025', tags:['Finance','High'], title:'Q1 2025 Financial Summary', snippet:"This report provides an overview of the company's financial performance for Q1 2025, highlighting key revenue streams, expenses, and profit margins.", category:'Documents',
    content:`<p>Seepco's Q1 2025 Financial Summary covers January – March 2025. The company recorded strong operational performance across all business units.</p><p><strong>Revenue:</strong> Total revenue for Q1 2025 stood at ₦48.7 billion, representing a 12% year-on-year increase. Upstream operations contributed 68% of total revenue.</p><ul><li>Crude oil production averaged 42,000 barrels per day (bopd), up from 37,500 bopd in Q1 2024.</li><li>Gas revenue increased by 19% driven by new supply agreements with industrial customers.</li><li>Operating costs held at ₦18.2 billion, a 3% reduction from the prior quarter.</li></ul><p><strong>EBITDA:</strong> Earnings before interest, taxes, depreciation and amortisation came in at ₦22.4 billion — a margin of 46%, exceeding the full-year target of 42%.</p><p>Capital expenditure for the quarter was ₦6.8 billion, primarily allocated to the Warri pipeline rehabilitation and the Escravos gas compression upgrade.</p>` },
  { id:3, path:'SharePoint / IT / Guides / Network_Security_Guide_v3.docx', date:'February 2025', tags:['IT','Critical'], title:'Network Security Guide — Version 3', snippet:'Outlines the updated protocols and best practices for securing the corporate network against emerging threats and vulnerabilities.', category:'Documents',
    content:`<p>This guide establishes the minimum security standards for all Seepco network infrastructure, covering both on-premise data centres and cloud environments.</p><p><strong>Access Control:</strong> All systems must enforce multi-factor authentication (MFA) for remote access. Privileged accounts require hardware token authentication. Shared accounts are strictly prohibited.</p><ul><li>Zero-trust network architecture is mandated for all new infrastructure deployments from Q1 2025.</li><li>VPN connections must use IKEv2 with AES-256 encryption as a minimum standard.</li><li>All endpoint devices must run the approved EDR solution and receive weekly signature updates.</li></ul><p><strong>Incident Response:</strong> Any suspected breach must be reported to the IT Security team within 2 hours of detection. The SOC operates 24/7.</p><p>Non-compliance with this guide may result in disciplinary action and could be escalated to the Data Protection Officer for regulatory assessment.</p>` },
  { id:4, path:'SharePoint / Marketing / Campaigns / Summer2025_Strategy.pptx', date:'March 2025', tags:['Marketing','Medium'], title:'Summer 2025 Marketing Strategy Presentation', snippet:'Details the planned marketing campaigns for summer 2025, including target demographics, key messaging, and budget allocation.', category:'Documents',
    content:`<p>The Summer 2025 Marketing Strategy focuses on strengthening Seepco's brand position as a responsible energy company committed to sustainable operations and community development.</p><p><strong>Campaign Objectives:</strong></p><ul><li>Increase brand awareness among B2B decision-makers in the energy sector by 25%.</li><li>Launch the "Energy for Growth" narrative across digital, outdoor, and trade media channels.</li><li>Deepen community relations in the Niger Delta through the Seepco Foundation sponsorship programme.</li></ul><p><strong>Budget Allocation:</strong> Total campaign budget is ₦320 million. Digital channels account for 40% (₦128m), outdoor advertising 25% (₦80m), events and sponsorships 20% (₦64m).</p><p>Campaign launch is scheduled for 1 June 2025, with a mid-campaign review on 15 July 2025.</p>` },
  { id:5, path:'SharePoint / Operations / Procedures / Emergency_Shutdown_Warri.pdf', date:'January 2025', tags:['Operations','Critical'], title:'Emergency Shutdown Procedure — Warri Pipeline', snippet:'Step-by-step emergency shutdown and isolation procedure for the Warri-to-Kaduna pipeline system, including SCADA override protocols and contact escalation matrix.', category:'Documents',
    content:`<p>This document defines the emergency shutdown procedure (ESD) for the Warri-to-Kaduna pipeline system. It is to be followed in the event of a confirmed leak, fire, seismic event, or SCADA-triggered automatic shutdown.</p><p><strong>Step 1 — Confirm Alarm:</strong> Verify the ESD trigger via the SCADA console at Warri Control Room. Do not silence the alarm before verification.</p><ul><li>Step 2: Activate the main isolation valves at Warri pump station (V-01, V-02, V-03) via the SCADA interface or manual override.</li><li>Step 3: Notify the Field Operations Manager and HSE Lead within 5 minutes of ESD activation.</li><li>Step 4: Initiate the emergency blowdown sequence for the affected segment per P&ID-WK-004.</li><li>Step 5: Deploy the Emergency Response Team (ERT) to the site for visual inspection and containment.</li></ul><p><strong>Escalation Contacts:</strong> Field Operations Manager (on-call): +234 801 XXX XXXX. HSE Lead: +234 802 XXX XXXX. Corporate Emergency Desk: +234 1 XXX XXXX (24/7).</p><p>All ESD events must be logged in the Incident Management System (IMS) within 1 hour and a formal incident report submitted within 24 hours.</p>` },
  { id:6, path:'SharePoint / Legal / Contracts / Vendor_Framework_Agreement_2025.pdf', date:'February 2025', tags:['Legal','High'], title:'Vendor Framework Agreement — 2025', snippet:'Master framework agreement governing all third-party vendor relationships, covering payment terms, IP rights, liability caps, and termination provisions.', category:'Documents',
    content:`<p>The 2025 Vendor Framework Agreement (VFA) establishes the standard commercial terms applicable to all Seepco third-party vendor relationships where no bespoke contract is in place.</p><p><strong>Payment Terms:</strong> Standard payment terms are net-60 days from the date of a valid invoice. Early payment discounts of 2% may be negotiated for net-15 settlement. Late payment incurs an interest charge of 1.5% per month.</p><ul><li>All invoices must quote the Purchase Order (PO) number issued by the Procurement team.</li><li>Disputed invoices must be raised within 14 days of receipt.</li></ul><p><strong>Liability Cap:</strong> Each party's total liability is capped at the total fees paid in the 12 months preceding the claim. Liability for death, personal injury, and wilful misconduct is uncapped.</p><p><strong>Termination:</strong> Either party may terminate with 30 days' written notice. Seepco may terminate immediately for cause, including insolvency, fraud, or material breach not remedied within 14 days of notice.</p>` },
  { id:7, path:'SharePoint / Supply Chain / Audits / SC_Audit_Report_2024.pdf', date:'December 2024', tags:['Supply chain','High'], title:'Supply Chain Audit Report 2024', snippet:"Comprehensive audit of Seepco's supply chain operations covering vendor compliance, delivery performance, and cost optimisation opportunities.", category:'Documents',
    content:`<p>The 2024 Supply Chain Audit was conducted by the Internal Audit function between October and December 2024, covering all tier-1 and tier-2 vendor relationships and logistics operations.</p><p><strong>Key Findings:</strong></p><ul><li>On-time delivery performance improved to 87% (from 79% in 2023).</li><li>12% of active vendors were found to have lapsed compliance documentation.</li><li>Average procurement lead time reduced from 34 days to 27 days following e-procurement workflow implementation.</li></ul><p><strong>Cost Optimisation:</strong> Opportunities to consolidate freight forwarding contracts were identified, with an estimated annual saving of ₦180 million.</p><p><strong>Recommendations:</strong> Implement a real-time supplier performance dashboard by Q2 2025. Mandate annual compliance reviews for all tier-1 vendors.</p>` },
  { id:8, path:'SharePoint / HR / Proposals / Graduate_Programme_2025.pdf', date:'April 2025', tags:['HR','Low'], title:'Graduate Trainee Programme — 2025 Proposal', snippet:'Proposal for the Seepco Graduate Trainee Programme 2025, outlining the intake plan, training curriculum, and budget requirements.', category:'Documents',
    content:`<p>This proposal outlines the structure and requirements for Seepco's Graduate Trainee Programme (GTP) 2025 intake, targeting recent graduates across engineering, finance, law, and business administration disciplines.</p><p><strong>Intake Target:</strong> 45 graduates across six departments — Engineering (18), Finance (8), Legal (5), Supply Chain (6), IT (5), and HR (3).</p><ul><li>Programme duration: 18 months, comprising a 3-month orientation, 12-month rotational placement, and 3-month final placement.</li><li>Stipend: ₦350,000 per month during the programme.</li><li>Conversion target: 80% of GTP graduates to be offered permanent positions upon successful completion.</li></ul><p><strong>Budget:</strong> Total programme budget for 2025 intake is ₦285 million, covering stipends, training, accommodation allowances, and administration costs.</p>` }
];

const DUMMY_IMAGES = [
  { title:'Warri Pipeline Network Map', desc:'Geo-spatial layout of the Warri-Kaduna pipeline system including valve positions.' },
  { title:'Field Operations Photo — Escravos Terminal', desc:'Site photography from the Q4 2024 field inspection at Escravos Terminal.' },
  { title:'SEEPCO Brand Identity Guidelines', desc:'Official brand colours, logo variations, and typography standards.' },
  { title:'HSE Incident Map — 2024', desc:'Geographic distribution of HSE incidents across all operational sites for 2024.' },
  { title:'Corporate Organogram — 2025', desc:'Full organisational chart as of January 2025.' },
  { title:'Seepco Office — Port Harcourt HQ', desc:'Photography of the Port Harcourt headquarters, taken March 2025.' },
  { title:'Supply Chain Flow Diagram', desc:'Visual map of the end-to-end supply chain from procurement to delivery.' },
  { title:'Q1 Financial Infographic', desc:'Visual summary of Q1 2025 financial performance metrics.' },
  { title:'Refinery Process Schematic', desc:'Technical process flow diagram for the Warri refinery operations.' },
];

const DUMMY_VIDEOS = [
  { title:'CEO Town Hall — Q1 2025', desc:'Full recording of the Q1 2025 all-staff town hall address by the CEO.', duration:'42 min' },
  { title:'HSE Training — Safe Work Procedures', desc:'Mandatory safety training video covering permit-to-work and LOTO procedures.', duration:'28 min' },
  { title:'Seepco Corporate Overview 2025', desc:'Updated corporate profile video for external stakeholder presentations.', duration:'8 min' },
  { title:'Field Operations — Warri Site Tour', desc:'Recorded walkthrough of the Warri pipeline control room and field assets.', duration:'15 min' },
  { title:'Finance Team Briefing — Q4 2024 Results', desc:'Internal finance team session reviewing Q4 2024 financial performance.', duration:'55 min' },
];

const SUGGESTIONS = [
  'Proposal document template',
  'Financial audit from 2002',
  'Data report from field work',
  'Supply chain audit',
  'Warri Field Operations Questions',
  'Emergency shutdown procedure for the Warri pipeline?',
  'Review this contract for risks'
];

const AI_SUMMARIES = {
  Finance:'AI Summary: Q1 2025 revenue stood at ₦48.7 billion — up 12% year-on-year. Upstream operations contributed 68%. EBITDA margin reached 46%, exceeding the full-year target of 42%.',
  Legal:"AI Summary: Seepco's standard vendor agreement caps liability at 12 months of fees paid. Payment terms are net-60 days. IP in bespoke deliverables vests in Seepco upon full payment.",
  'Supply chain':'AI Summary: 2024 supply chain on-time delivery improved to 87%. 12% of vendors had lapsed compliance docs. Consolidating freight contracts could save ₦180 million annually.',
  Meetings:'AI Summary: Recent meeting records cover Q1 board sessions, HSE committee reviews, and supply chain steering committee updates for Q4 2024 through Q1 2025.',
  Proposals:"AI Summary: Seepco's Graduate Trainee Programme 2025 targets 45 graduates across six departments with an ₦285 million budget and an 80% conversion rate target.",
  default:'AI Summary: Permanent staff at Seepco are entitled to 21 working days of annual leave per year. Applications must be submitted 14 days in advance and approved by the direct line manager. See the full policy for details on carry-over and emergency leave.'
};

// ── State ──
let currentQuery = 'Proposal document template';
let activeDocId = null;
let savedDocs = new Set();
let savedAnswers = [];
let searchHistory = [
  { q:'Proposal document template', date:'Today' },
  { q:'Financial audit from 2002', date:'Today' },
  { q:'Emergency shutdown procedure for the Warri pipeline?', date:'Yesterday' },
  { q:'Data report from field work', date:'Yesterday' },
  { q:'Supply chain audit', date:'2 days ago' },
  { q:'Warri Field Operations Questions', date:'3 days ago' },
];
let currentFilter = 'All';
let currentSavesTab = 'answers';
let currentSearchTab = 'all';
let aiExpanded = false;

// ══════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════
const SCREEN_MAP = {
  dashboard:'screen-dashboard', suggestion:'screen-suggestion',
  results:'screen-results', docview:'screen-docview',
  mysaves:'screen-mysaves', mysearch:'screen-mysearch'
};

function goTo(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  setGreeting();

  const el = document.getElementById(SCREEN_MAP[screen]);
  if (el) { el.classList.add('active'); el.scrollTop = 0; }
  setActiveNav(screen);

  if (screen === 'suggestion') {
    renderSuggestions(SUGGESTIONS);
    setTimeout(() => { const i = document.getElementById('search-input'); if (i) i.focus(); }, 60);
  }
  if (screen === 'results') {
    document.getElementById('results-title').textContent = currentQuery;
    document.getElementById('dv-results-title').textContent = currentQuery;
    updateAISummary();
    renderResultsContent();
    aiExpanded = false;
    document.getElementById('ai-card-collapsed').style.display = '';
    document.getElementById('ai-card-expanded').style.display = 'none';
    resetResultFilters();
  }
  if (screen === 'docview') {
    document.getElementById('dv-results-title').textContent = currentQuery;
    renderDVList();
    if (activeDocId) renderDocReader(activeDocId);
  }
  if (screen === 'mysaves') renderSavesContent();
  if (screen === 'mysearch') renderMySearchContent();
}

// Highlight the matching sidebar item
function setActiveNav(screen) {
  const homeScreens = ['dashboard','suggestion','results','docview'];
  const map = { mysearch:'nav-mysearch', mysaves:'nav-mysaves' };
  document.querySelectorAll('.sidebar__nav .nav-item').forEach(n => n.classList.remove('nav-item--active'));
  const id = map[screen] || (homeScreens.includes(screen) ? 'nav-home' : null);
  if (id) { const n = document.getElementById(id); if (n) n.classList.add('nav-item--active'); }
}

function setGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning,' : h < 17 ? 'Good afternoon,' : 'Good evening,';
  ['dash-greeting','sug-greeting'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = g; });
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') goTo('dashboard'); });

// ══════════════════════════════════════════
// SIDEBAR COLLAPSE
// ══════════════════════════════════════════
function initSidebar() {
  const btn = document.getElementById('collapseBtn');
  const sidebar = document.getElementById('sidebar');
  if (btn && sidebar) btn.addEventListener('click', () => sidebar.classList.toggle('sidebar--collapsed'));
}

// ══════════════════════════════════════════
// SEARCH
// ══════════════════════════════════════════
function filterSuggestions() {
  const val = document.getElementById('search-input').value.trim().toLowerCase();
  const filtered = val ? SUGGESTIONS.filter(s => s.toLowerCase().includes(val)) : SUGGESTIONS;
  renderSuggestions(filtered);
}

function renderSuggestions(list) {
  const container = document.getElementById('suggestions-list');
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `<div class="suggestion-text" style="padding:8px 0;opacity:.5;">No recent searches</div>`;
    return;
  }
  container.innerHTML = list.map(s => `
    <div class="suggestion-item" onclick="doSearch('${s.replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;">
        <circle cx="7" cy="7" r="3.5" stroke="#aab2bd" stroke-width="1.2"/>
        <path d="M7 5.5v2l1 1" stroke="#aab2bd" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
      <span class="suggestion-text">${s}</span>
    </div>
  `).join('');
}

function handleSearchKey(e) {
  if (e.key === 'Enter') doSearch();
  if (e.key === 'Escape') goTo('dashboard');
}

function doSearch(query) {
  const input = document.getElementById('search-input');
  const q = (query || (input ? input.value.trim() : '')).trim();
  if (!q) return;
  currentQuery = q;
  if (input) input.value = '';
  const exists = searchHistory.find(h => h.q === q);
  if (!exists) searchHistory.unshift({ q, date:'Just now' });
  currentFilter = 'All';
  goTo('results');
}

function searchByCategory(cat) {
  currentQuery = cat;
  currentFilter = 'All';
  goTo('results');
}

// ══════════════════════════════════════════
// RESULT FILTERS
// ══════════════════════════════════════════
function setResultFilter(el, label) {
  el.closest('.filter-pills').querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  currentFilter = label;
  renderResultsContent();
}

function resetResultFilters() {
  document.querySelectorAll('#results-filters .filter-pill').forEach((p,i) => p.classList.toggle('active', i === 0));
  currentFilter = 'All';
}

function getAISummary() {
  const key = Object.keys(AI_SUMMARIES).find(k => currentQuery.toLowerCase().includes(k.toLowerCase())) || 'default';
  return AI_SUMMARIES[key];
}

function updateAISummary() {
  const txt = getAISummary();
  const el = document.getElementById('ai-summary-text'); if (el) el.textContent = txt;
  const el2 = document.getElementById('dv-ai-text'); if (el2) el2.textContent = txt;
}

// ══════════════════════════════════════════
// RENDER RESULTS CONTENT
// ══════════════════════════════════════════
function renderResultsContent() {
  const container = document.getElementById('results-content');
  if (!container) return;
  if (currentFilter === 'Images') container.innerHTML = renderImageGrid();
  else if (currentFilter === 'Videos') container.innerHTML = renderVideoList();
  else container.innerHTML = `<div class="doc-list">${DOCS.map(doc => docItemHTML(doc, false)).join('')}</div>`;
  updateResultsCount();
}

function updateResultsCount() {
  let count;
  if (currentFilter === 'Images') count = DUMMY_IMAGES.length + ' images';
  else if (currentFilter === 'Videos') count = DUMMY_VIDEOS.length + ' videos';
  else count = '8 relevant documents';
  const el = document.getElementById('results-count');
  if (el) el.textContent = `Found ${count} for this query`;
}

function renderImageGrid() {
  const items = DUMMY_IMAGES.map(img => `
    <div class="image-card" onclick="showToast('${img.title.replace(/'/g,"\\'")} — image preview not available in demo')">
      <div class="image-card-inner">
        <div class="image-placeholder">
          <svg viewBox="0 0 32 32" fill="none"><rect x="2" y="6" width="28" height="20" rx="3" stroke="#aab2bd" stroke-width="1.5"/><circle cx="11" cy="14" r="3" stroke="#aab2bd" stroke-width="1.5"/><path d="M2 22l8-6 6 5 4-3 10 7" stroke="#aab2bd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>${img.title}</span>
        </div>
      </div>
      <div class="image-card-overlay"><span>View image</span></div>
    </div>
  `).join('');
  return `<div class="image-grid">${items}</div>`;
}

function renderVideoList() {
  return `<div class="video-list">${DUMMY_VIDEOS.map((v,i) => `
    <div class="video-item">
      <div class="video-thumb" onclick="showToast('Playing: ${v.title.replace(/'/g,"\\'")}')">
        <div class="play-btn"><svg width="46" height="46" viewBox="0 0 46 46" fill="none"><polygon points="17,12 38,23 17,34" fill="#111419"/></svg></div>
      </div>
      <div class="video-info">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:10px;color:var(--al-500);letter-spacing:-0.4px;">Duration: ${v.duration}</span>
          <div style="display:flex;gap:8px;"><span class="tag">Video</span></div>
        </div>
        <span class="doc-title" onclick="showToast('Video: ${v.title.replace(/'/g,"\\'")} — playback not available in demo')">${v.title}</span>
        <p class="doc-snippet">${v.desc}</p>
        <div class="doc-actions">${actionBtnsHTML(100 + i, false)}</div>
      </div>
    </div>
  `).join('')}</div>`;
}

function docItemHTML(doc, isDocView) {
  const isActive = isDocView && activeDocId === doc.id;
  const isSaved = savedDocs.has(doc.id);
  return `
    <div class="doc-item${isActive ? ' dv-active' : ''}" id="${isDocView ? 'dv' : 'res'}-doc-${doc.id}">
      <div class="doc-meta-row">
        <span class="doc-path" title="${doc.path}">${doc.path}</span>
        <div class="doc-meta-right">
          <span class="doc-date">${doc.date}</span>
          ${doc.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
      <span class="doc-title${isActive ? ' active-doc' : ''}" onclick="openDoc(${doc.id})">${doc.title}</span>
      <p class="doc-snippet">${doc.snippet}</p>
      <div class="doc-actions">${actionBtnsHTML(doc.id, isSaved)}</div>
    </div>
  `;
}

function actionBtnsHTML(docId, isSaved) {
  return `
    <button class="action-btn${isSaved ? ' saved' : ''}" id="save-btn-${docId}" title="Save" onclick="toggleSave(${docId})">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 2h10v13l-5-3-5 3V2z" stroke="${isSaved ? '#ff5c00' : '#49525f'}" stroke-width="1.2" stroke-linejoin="round" fill="${isSaved ? '#ff5c00' : 'none'}"/></svg>
    </button>
    <button class="action-btn" title="Share link" onclick="copyLink(${docId})">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="12" cy="3" r="1.5" stroke="#49525f" stroke-width="1.2"/><circle cx="4" cy="8" r="1.5" stroke="#49525f" stroke-width="1.2"/><circle cx="12" cy="13" r="1.5" stroke="#49525f" stroke-width="1.2"/><path d="M5.5 7.2l5-3M5.5 8.8l5 3" stroke="#49525f" stroke-width="1.2"/></svg>
    </button>
    <button class="action-btn" title="Open document" onclick="openDoc(${docId})">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3h7l3 3v7H3V3z" stroke="#49525f" stroke-width="1.2" stroke-linejoin="round"/><path d="M10 3v3h3M6 8h4M6 10.5h3" stroke="#49525f" stroke-width="1.2" stroke-linecap="round"/></svg>
    </button>
  `;
}

// ══════════════════════════════════════════
// DOCUMENT VIEW
// ══════════════════════════════════════════
function openDoc(docId) {
  const doc = DOCS.find(d => d.id === docId);
  if (!doc) return;
  activeDocId = docId;
  goTo('docview');
}

function renderDVList() {
  const container = document.getElementById('dv-doc-list');
  if (!container) return;
  container.innerHTML = DOCS.map(doc => docItemHTML(doc, true)).join('');
}

function renderDocReader(docId) {
  const doc = DOCS.find(d => d.id === docId);
  if (!doc) return;
  document.getElementById('dr-query').textContent = currentQuery;
  document.getElementById('dr-title').textContent = doc.title;
  document.getElementById('dr-content').innerHTML = doc.content;
  document.querySelectorAll('.doc-title').forEach(t => t.classList.remove('active-doc'));
  const activeTitle = document.querySelector(`#dv-doc-${docId} .doc-title`);
  if (activeTitle) activeTitle.classList.add('active-doc');
}

function copyDocContent() {
  const content = document.getElementById('dr-content').innerText;
  if (navigator.clipboard) navigator.clipboard.writeText(content).then(() => showToast('Content copied to clipboard'));
  else showToast('Content copied');
}

// ══════════════════════════════════════════
// AI EXPAND / COLLAPSE
// ══════════════════════════════════════════
function expandAI() {
  aiExpanded = true;
  document.getElementById('ai-card-collapsed').style.display = 'none';
  document.getElementById('ai-card-expanded').style.display = '';
}
function collapseAI() {
  aiExpanded = false;
  document.getElementById('ai-card-collapsed').style.display = '';
  document.getElementById('ai-card-expanded').style.display = 'none';
}
function saveAISummary() {
  const summary = { query:currentQuery, text:getAISummary(), date:'Just now' };
  const exists = savedAnswers.find(a => a.query === currentQuery);
  if (!exists) { savedAnswers.unshift(summary); showToast('Answer saved to My Saves'); }
  else showToast('Already saved');
}
function copyAISummary() { if (navigator.clipboard) navigator.clipboard.writeText(getAISummary()); showToast('AI summary copied'); }
function shareAISummary() { showToast('Share link copied to clipboard'); }

// ══════════════════════════════════════════
// SAVE / SHARE
// ══════════════════════════════════════════
function toggleSave(docId) {
  if (savedDocs.has(docId)) { savedDocs.delete(docId); showToast('Removed from My Saves'); }
  else { savedDocs.add(docId); showToast('Saved to My Saves'); }
  document.querySelectorAll(`#save-btn-${docId}`).forEach(btn => {
    const isSaved = savedDocs.has(docId);
    btn.classList.toggle('saved', isSaved);
    const path = btn.querySelector('path');
    if (path) { path.setAttribute('fill', isSaved ? '#ff5c00' : 'none'); path.setAttribute('stroke', isSaved ? '#ff5c00' : '#49525f'); }
  });
}

function copyLink(docId) {
  const doc = DOCS.find(d => d.id === docId);
  showToast(`Link copied: ${doc ? doc.title : 'Item'}`);
}

// ══════════════════════════════════════════
// MY SAVES
// ══════════════════════════════════════════
function setSavesTab(el, tab) {
  el.closest('.saves-tabs').querySelectorAll('.saves-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentSavesTab = tab;
  renderSavesContent();
}

function renderSavesContent() {
  const container = document.getElementById('saves-content');
  if (!container) return;

  if (currentSavesTab === 'answers') {
    if (!savedAnswers.length) {
      container.innerHTML = emptyStateHTML('No saved answers yet', 'After you expand an AI summary, save it here for quick access.', 'Go to search', "goTo('suggestion')");
    } else {
      container.innerHTML = `<div class="doc-list">${savedAnswers.map(a => `
        <div class="doc-item">
          <div class="doc-meta-row"><span class="doc-path">AI Answer · ${a.date}</span></div>
          <span class="doc-title" onclick="doSearch('${a.query.replace(/'/g,"\\'")}')">${a.query}</span>
          <p class="doc-snippet">${a.text}</p>
          <div class="doc-actions">
            <button class="action-btn" title="Copy" onclick="if(navigator.clipboard)navigator.clipboard.writeText('${a.text.replace(/'/g,"\\'")}');showToast('Copied')">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="2" width="9" height="11" rx="2" stroke="#49525f" stroke-width="1.2"/><path d="M2 5h3v9h7" stroke="#49525f" stroke-width="1.2" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>
      `).join('')}</div>`;
    }
  } else if (currentSavesTab === 'docs') {
    const saved = DOCS.filter(d => savedDocs.has(d.id));
    if (!saved.length) {
      container.innerHTML = emptyStateHTML('No bookmarked documents yet', 'Bookmark documents from search results to find them quickly here.', 'Search documents', "goTo('suggestion')");
    } else {
      container.innerHTML = `<div class="doc-list">${saved.map(doc => docItemHTML(doc, false)).join('')}</div>`;
    }
  } else {
    if (!searchHistory.length) {
      container.innerHTML = emptyStateHTML('No search history', 'Your recent searches will appear here.', 'Start searching', "goTo('suggestion')");
    } else {
      container.innerHTML = `<div style="width:100%;">${searchHistory.map((h,i) => historyItemHTML(h,i)).join('')}</div>`;
    }
  }
}

function historyItemHTML(h, i) {
  return `
    <div class="history-item">
      <div class="history-left" onclick="doSearch('${h.q.replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;opacity:.4;"><circle cx="7" cy="7" r="3.5" stroke="#111419" stroke-width="1.2"/><path d="M7 5.5v2l1 1" stroke="#111419" stroke-width="1.2" stroke-linecap="round"/></svg>
        <div><p class="history-query">${h.q}</p><p class="history-meta">${h.date}</p></div>
      </div>
      <button class="history-delete" onclick="deleteHistory(${i})" title="Remove">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="#7d899b" stroke-width="1.4" stroke-linecap="round"/></svg>
      </button>
    </div>`;
}

function emptyStateHTML(title, sub, btnLabel, btnAction) {
  return `<div class="empty-state">
    <svg class="empty-icon" viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="8" stroke="#aab2bd" stroke-width="2"/><path d="M16 24h16M24 16v16" stroke="#aab2bd" stroke-width="2" stroke-linecap="round"/></svg>
    <p class="empty-title">${title}</p>
    <p class="empty-sub">${sub}</p>
    <button class="empty-action" onclick="${btnAction}">${btnLabel}</button>
  </div>`;
}

function deleteHistory(index) {
  searchHistory.splice(index, 1);
  renderSavesContent();
  renderMySearchContent();
  showToast('Removed from history');
}

// ══════════════════════════════════════════
// MY SEARCH
// ══════════════════════════════════════════
function setSearchTab(el, tab) {
  el.closest('.saves-tabs').querySelectorAll('.saves-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentSearchTab = tab;
  renderMySearchContent();
}

function renderMySearchContent() {
  const container = document.getElementById('mysearch-content');
  if (!container) return;

  if (currentSearchTab === 'all') {
    if (!searchHistory.length) {
      container.innerHTML = emptyStateHTML('No searches yet', 'Start searching to build your history.', 'Go to search', "goTo('suggestion')");
    } else {
      container.innerHTML = `<div style="width:100%;">
        <p style="font-size:12px;color:var(--al-500);letter-spacing:-0.36px;margin-bottom:16px;">${searchHistory.length} searches</p>
        ${searchHistory.map((h,i) => historyItemHTML(h,i)).join('')}
      </div>`;
    }
  } else {
    const topics = [
      { name:'Operations', count:'3 searches', q:'Emergency shutdown procedure for the Warri pipeline?' },
      { name:'Finance', count:'2 searches', q:'Financial audit from 2002' },
      { name:'HR & People', count:'2 searches', q:'Proposal document template' },
      { name:'Supply Chain', count:'1 search', q:'Supply chain audit' },
      { name:'Legal', count:'1 search', q:'Review this contract for risks' },
      { name:'Field Work', count:'1 search', q:'Data report from field work' },
    ];
    container.innerHTML = `<div class="topics-grid">${topics.map(t => `
      <div class="topic-chip" onclick="doSearch('${t.q.replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">
        <span class="topic-name">${t.name}</span>
        <span class="topic-count">${t.count}</span>
      </div>
    `).join('')}</div>`;
  }
}

// ══════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ══════════════════════════════════════════
// PIXEL GRID
// ══════════════════════════════════════════
function buildPixelGrid() {
  const g = document.getElementById('pixel-grid');
  if (!g) return;
  const cls = ['px-o','px-o','px-l','px-w','px-o','px-l'];
  g.innerHTML = Array.from({length:72}, () => `<div class="px ${cls[Math.floor(Math.random()*cls.length)]}"></div>`).join('');
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
initSidebar();
setGreeting();
buildPixelGrid();
renderSuggestions(SUGGESTIONS);
setActiveNav('dashboard');

// Deep-link support: knowledge-base.html?q=...  or  ?screen=mysaves
(function initFromURL() {
  const params = new URLSearchParams(location.search);
  const q = params.get('q');
  const screen = params.get('screen');
  if (q) { doSearch(q); }
  else if (screen && SCREEN_MAP[screen]) { goTo(screen); }
})();
