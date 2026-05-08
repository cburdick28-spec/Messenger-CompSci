/* ===== BREWSTER APP — APP.JS ===== */

/* ===== SVG ASSETS ===== */
const BOBCAT_SVG_WHITE = `
<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <g>
    <!-- Head -->
    <ellipse cx="40" cy="50" rx="22" ry="21" fill="white"/>
    <!-- Left ear -->
    <polygon points="22,40 14,16 34,32" fill="white"/>
    <!-- Right ear -->
    <polygon points="58,40 66,16 46,32" fill="white"/>
    <!-- Ear inner shading -->
    <polygon points="22.5,38.5 17,20 31,31" fill="rgba(0,34,102,0.22)"/>
    <polygon points="57.5,38.5 63,20 49,31" fill="rgba(0,34,102,0.22)"/>
    <!-- Ear tuft tips -->
    <polygon points="14,16 12,8 18,14" fill="rgba(255,255,255,0.75)"/>
    <polygon points="66,16 68,8 62,14" fill="rgba(255,255,255,0.75)"/>
    <!-- Eyes -->
    <ellipse cx="32" cy="46" rx="5" ry="4.5" fill="rgba(0,28,90,0.88)"/>
    <ellipse cx="48" cy="46" rx="5" ry="4.5" fill="rgba(0,28,90,0.88)"/>
    <circle cx="33.8" cy="44.5" r="1.8" fill="white"/>
    <circle cx="49.8" cy="44.5" r="1.8" fill="white"/>
    <!-- Nose -->
    <path d="M36 57 Q40 60 44 57 L40 62.5 Z" fill="rgba(0,28,90,0.7)"/>
    <!-- Mouth -->
    <path d="M35.5 62 Q38 66 40 63.5 Q42 66 44.5 62" stroke="rgba(0,28,90,0.65)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <!-- Whisker dots -->
    <circle cx="27" cy="56" r="1.3" fill="rgba(0,28,90,0.4)"/>
    <circle cx="27" cy="60" r="1.3" fill="rgba(0,28,90,0.4)"/>
    <circle cx="53" cy="56" r="1.3" fill="rgba(0,28,90,0.4)"/>
    <circle cx="53" cy="60" r="1.3" fill="rgba(0,28,90,0.4)"/>
  </g>
</svg>`;

const BOBCAT_SVG_NAVY = `
<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <g>
    <ellipse cx="40" cy="50" rx="22" ry="21" fill="#002266"/>
    <polygon points="22,40 14,16 34,32" fill="#002266"/>
    <polygon points="58,40 66,16 46,32" fill="#002266"/>
    <polygon points="22.5,38.5 17,20 31,31" fill="rgba(255,255,255,0.12)"/>
    <polygon points="57.5,38.5 63,20 49,31" fill="rgba(255,255,255,0.12)"/>
    <polygon points="14,16 12,8 18,14" fill="#001540"/>
    <polygon points="66,16 68,8 62,14" fill="#001540"/>
    <ellipse cx="32" cy="46" rx="5" ry="4.5" fill="white"/>
    <ellipse cx="48" cy="46" rx="5" ry="4.5" fill="white"/>
    <circle cx="33.8" cy="44.5" r="1.8" fill="#002266"/>
    <circle cx="49.8" cy="44.5" r="1.8" fill="#002266"/>
    <path d="M36 57 Q40 60 44 57 L40 62.5 Z" fill="rgba(255,255,255,0.8)"/>
    <path d="M35.5 62 Q38 66 40 63.5 Q42 66 44.5 62" stroke="rgba(255,255,255,0.6)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <circle cx="27" cy="56" r="1.3" fill="rgba(255,255,255,0.35)"/>
    <circle cx="27" cy="60" r="1.3" fill="rgba(255,255,255,0.35)"/>
    <circle cx="53" cy="56" r="1.3" fill="rgba(255,255,255,0.35)"/>
    <circle cx="53" cy="60" r="1.3" fill="rgba(255,255,255,0.35)"/>
  </g>
</svg>`;

/* ===== CONSTANTS ===== */

const TRIVIA_QUESTIONS = [
  {
    q: "What is Brewster Academy's beloved mascot?",
    opts: ["Golden Eagle", "Bobcat", "Wildcat", "Lynx"],
    a: 1,
    fact: "The Brewster Bobcat! Bold, fierce, and independent — just like Brewster students."
  },
  {
    q: "In which New Hampshire town is Brewster Academy located?",
    opts: ["Concord", "Portsmouth", "Wolfeboro", "Laconia"],
    a: 2,
    fact: "Wolfeboro — known as 'America's Oldest Summer Resort,' nestled on Lake Winnipesaukee!"
  },
  {
    q: "What year was Brewster Academy founded?",
    opts: ["1820", "1875", "1901", "1955"],
    a: 0,
    fact: "1820! Over 200 years of excellence, tradition, and Bobcat pride."
  },
  {
    q: "Which body of water borders Brewster Academy's campus?",
    opts: ["Lake Sunapee", "Squam Lake", "Lake Winnipesaukee", "Ossipee Lake"],
    a: 2,
    fact: "Lake Winnipesaukee — New Hampshire's largest lake. A stunning backdrop for campus life!"
  },
  {
    q: "Brewster Academy is nationally known for which sport?",
    opts: ["Soccer", "Lacrosse", "Basketball", "Swimming"],
    a: 2,
    fact: "Brewster Basketball is one of the most elite prep programs in the country, producing multiple NBA players!"
  },
  {
    q: "What are Brewster Academy's official school colors?",
    opts: ["Green & Gold", "Navy, White & Red", "Blue & Silver", "Crimson & White"],
    a: 1,
    fact: "Navy, White, and Red — the classic Brewster combination representing strength and tradition!"
  },
  {
    q: "Which state is Brewster Academy in?",
    opts: ["Maine", "Vermont", "Massachusetts", "New Hampshire"],
    a: 3,
    fact: "The Granite State! New Hampshire's motto: 'Live Free or Die' — fierce, just like the Bobcats!"
  },
  {
    q: "What type of school is Brewster Academy?",
    opts: ["Day school", "Public magnet", "Boarding prep school", "Military academy"],
    a: 2,
    fact: "Brewster is a coeducational boarding preparatory school serving grades 9–12 and post-graduate."
  },
  {
    q: "How does a bobcat get its name?",
    opts: ["Its roaring call", "Its spotted coat and short, 'bobbed' tail", "Its bobbing run", "Its bobbing head"],
    a: 1,
    fact: "Bobcats have a short, bobbed tail — and they're known for being fierce, fast, and adaptable!"
  },
  {
    q: "What is the approximate enrollment size of Brewster Academy?",
    opts: ["Under 100 students", "Around 300 students", "Over 1,000 students", "Exactly 500 students"],
    a: 1,
    fact: "Brewster's small size (~300 students) means tight-knit community, more personal relationships, and real school spirit!"
  }
];

let HOUSES = [
  { name: "Red",   pts: 342, color: "#CC0000", barColor: "#FF6B6B",  chartColor: "#CC0000", icon: "🔴" },
  { name: "Blue",  pts: 315, color: "#1A4FCC", barColor: "#88AAFF",  chartColor: "#1A4FCC", icon: "🔵" },
  { name: "White", pts: 289, color: "#DDDDDD", barColor: "#FFFFFF",  chartColor: "#9CA3AF", icon: "⚪" },
  { name: "Black", pts: 271, color: "#1A1A1A", barColor: "#AAAAAA",  chartColor: "#374151", icon: "⚫" },
];

const HOUSE_EVENTS = [
  { month: "MAY", day: "09", name: "House Spirit Assembly", time: "Fri · 7:00 PM · Main Hall", pts: "+50 pts", colorClass: "navy-bg" },
  { month: "MAY", day: "10", name: "House Relay Race",       time: "Sat · 10:00 AM · Athletic Field", pts: "+100 pts", colorClass: "red-bg"  },
  { month: "MAY", day: "12", name: "House Trivia Night",     time: "Mon · 6:30 PM · Dining Hall",   pts: "+75 pts",  colorClass: "gold-bg" },
  { month: "MAY", day: "16", name: "Points Tally Update",    time: "Fri · All Day · Official Count", pts: "Update",   colorClass: "navy-bg" },
];

const ADMIN_PIN = "2024";
const TRIVIA_SECONDS = 30;

/* ===== STATE ===== */

const state = {
  screen: "splash",
  history: [],
  isAdmin: false,
  pinEntry: "",
  pinError: false,
  emergencyOpen: false,
  emergencySent: false,

  trivia: {
    current: 0,
    score: 0,
    timeLeft: TRIVIA_SECONDS,
    timer: null,
    answered: false,
    selectedIdx: null,
    gameOver: false,
  },

  nextTriviaTarget: Date.now() + 10 * 60 * 1000,
  countdownTimer: null,

  survey1: { rating: 0, submitted: false },
  survey2: { selected: null, submitted: false },

  messageSent: false,
  reportSent: false,

  adminPriority: "normal",
  broadcasts: [],
  pressingEmergency: false,
  pressTimer: null,
  pressInterval: null,
};

/* ===== ROUTER ===== */

function navigate(screen, back = false) {
  if (state.screen !== "splash") state.history.push(state.screen);
  state.screen = screen;
  stopTriviaTimer();
  renderApp(back ? "slide-back" : "slide-in");
  window.scrollTo(0, 0);
}

function goBack() {
  const prev = state.history.pop() || "home";
  stopTriviaTimer();
  state.screen = prev;
  renderApp("slide-back");
  window.scrollTo(0, 0);
}

/* ===== HELPERS ===== */

function formatCountdown(ms) {
  if (ms <= 0) return "00:00";
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getDayGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getTodayLabel() {
  return new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function getTriviaGrade(score, total) {
  const pct = score / total;
  if (pct === 1)    return { emoji: "🏆", msg: "Perfect Score!", sub: "You're a true Brewster legend!" };
  if (pct >= 0.8)  return { emoji: "⭐", msg: "Excellent!",     sub: "Outstanding school spirit!" };
  if (pct >= 0.6)  return { emoji: "👍", msg: "Well Done!",     sub: "Great Bobcat knowledge!" };
  if (pct >= 0.4)  return { emoji: "📚", msg: "Keep Learning!", sub: "There's more to discover about Brewster!" };
  return { emoji: "🐾", msg: "Nice Try!",      sub: "Study up and show those Bobcat colors!" };
}

function stopTriviaTimer() {
  if (state.trivia.timer) clearInterval(state.trivia.timer);
  state.trivia.timer = null;
  if (state.countdownTimer) clearInterval(state.countdownTimer);
  state.countdownTimer = null;
}

/* ===== ICONS (inline SVG) ===== */

const ICON = {
  home:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  events:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  messages:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  bell:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  back:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  arrow:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  send:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  check:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
};

/* ===== COMMON COMPONENTS ===== */

function renderHeader(title, backBtn = true, rightSlot = "") {
  if (!backBtn) {
    return `
    <header class="app-header">
      <div class="header-brand">
        <div class="header-bobcat">${BOBCAT_SVG_WHITE}</div>
        <div class="header-title">
          <div class="header-title-main">Brewster App</div>
          <div class="header-title-sub">Brewster Academy</div>
        </div>
      </div>
      <div class="header-actions">
        <button class="header-icon-btn" onclick="navigate('home')" aria-label="Notifications">${ICON.bell}</button>
        <button class="header-icon-btn" style="background:rgba(255,255,255,0.18)" aria-label="Profile">
          <svg viewBox="0 0 24 24" fill="white" width="18" height="18"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"/></svg>
        </button>
      </div>
    </header>`;
  }
  return `
  <header class="app-header has-back">
    <button class="back-btn" onclick="goBack()">${ICON.back}</button>
    <div class="header-screen-title">${title}</div>
    ${rightSlot}
  </header>`;
}

function renderBottomNav(active) {
  const items = [
    { id: "home",    label: "Home",    icon: ICON.home,     badge: 0 },
    { id: "house",   label: "Houses",  icon: ICON.events,   badge: 0 },
    { id: "message", label: "Message", icon: ICON.messages, badge: 1 },
    { id: "profile", label: "Profile", icon: ICON.profile,  badge: 0 },
  ];
  return `
  <nav class="bottom-nav">
    ${items.map(item => `
      <button class="nav-item ${active === item.id ? "active" : ""}" onclick="navigate('${item.id}')">
        ${item.badge ? `<div class="nav-badge">${item.badge}</div>` : ""}
        ${item.icon}
        <span>${item.label}</span>
      </button>
    `).join("")}
  </nav>`;
}

/* ===== SCREENS ===== */

/* --- SPLASH --- */
function screenSplash() {
  setTimeout(() => {
    state.screen = "home";
    renderApp("fade-in");
  }, 2600);

  return `
  <div class="app-screen fade-in splash">
    <div class="splash-bobcat">${BOBCAT_SVG_WHITE}</div>
    <div class="splash-school-name">Brewster Academy · Est. 1820</div>
    <div class="splash-app-name">Brewster App</div>
    <div class="splash-tagline">Go Bobcats! 🐾</div>
    <div class="splash-dots">
      <span></span><span></span><span></span>
    </div>
    <div class="splash-stripe"></div>
  </div>`;
}

/* --- HOME DASHBOARD --- */
function screenHome() {
  const maxPts = Math.max(...HOUSES.map(h => h.pts));
  const houseRows = HOUSES.slice(0, 3).map(h => `
    <div class="house-mini-row">
      <div class="house-mini-name">${h.icon} ${h.name}</div>
      <div class="house-mini-track">
        <div class="house-mini-fill" style="width:${(h.pts/maxPts*100).toFixed(1)}%;background:${h.barColor}"></div>
      </div>
      <div class="house-mini-pts">${h.pts}</div>
    </div>`).join("");

  const adminCard = state.isAdmin ? `
    <div class="admin-card" onclick="navigate('emergency-panel')">
      <div class="admin-icon">🔐</div>
      <div class="admin-text">
        <div class="admin-title">Emergency Panel</div>
        <div class="admin-sub">Broadcast alerts to all students</div>
      </div>
      <div class="admin-badge">STAFF</div>
    </div>` : `
    <div class="admin-card" onclick="navigate('emergency-panel')">
      <div class="admin-icon">🛡️</div>
      <div class="admin-text">
        <div class="admin-title">Staff Emergency Panel</div>
        <div class="admin-sub">Authorized personnel only</div>
      </div>
      <div class="admin-badge">SECURE</div>
    </div>`;

  return `
  <div class="app-screen slide-in">
    ${renderHeader("", false)}
    <div class="dashboard-scroll">
      <div class="dashboard-greeting">
        <div class="greeting-label">${getDayGreeting()}, Bobcat!</div>
        <div class="greeting-text">Welcome Back 🐾</div>
        <div class="greeting-date">${getTodayLabel()}</div>
      </div>

      <!-- Trivia Countdown Card -->
      <div class="trivia-card" onclick="navigate('trivia')">
        <div class="trivia-badge">
          <span class="live-dot"></span> School Spirit
        </div>
        <div class="trivia-card-title">Trivia Game</div>
        <div class="trivia-card-sub">Test your Brewster knowledge!</div>
        <div class="trivia-countdown-row">
          <div>
            <div style="font-size:11px;opacity:0.65;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:4px;">Next Game In</div>
            <div class="trivia-countdown" id="hero-countdown">${formatCountdown(state.nextTriviaTarget - Date.now())}</div>
          </div>
          <button class="trivia-play-btn" onclick="event.stopPropagation();navigate('trivia')">PLAY NOW</button>
        </div>
      </div>

      <!-- House Points Card -->
      <div class="house-card" onclick="navigate('house')">
        <div class="house-card-header">
          <div class="house-card-title">🏆 House Standings</div>
          <div class="house-card-link">View All →</div>
        </div>
        <div class="house-mini-bar">${houseRows}</div>
      </div>

      <!-- Surveys + Anonymous Message (2-col) -->
      <div class="card-grid-2">
        <div class="small-card" onclick="navigate('surveys')">
          <div class="small-card-icon navy-bg">📋</div>
          <div class="small-card-title">Active Surveys</div>
          <div class="small-card-sub">Share your voice</div>
          <div class="small-card-badge">2 Open</div>
        </div>
        <div class="small-card" onclick="navigate('message')">
          <div class="small-card-icon red-bg">💬</div>
          <div class="small-card-title">Message Ms. Ellie</div>
          <div class="small-card-sub">Send anonymously</div>
          <div class="small-card-badge red">Private</div>
        </div>
      </div>

      <!-- Have a Problem -->
      <div class="problem-card" onclick="navigate('report')">
        <div class="problem-icon-wrap">🤔</div>
        <div class="problem-text">
          <div class="problem-title">Have a Problem?</div>
          <div class="problem-sub">Report an issue confidentially. We're here to help.</div>
        </div>
        <div class="problem-arrow">${ICON.arrow}</div>
      </div>

      <!-- Admin/Staff Emergency Panel -->
      ${adminCard}

      <!-- Emergency Button -->
      <div class="emergency-btn-wrap">
        <button class="emergency-btn" onclick="openEmergency()">
          <span class="btn-icon">🚨</span>
          <span>EMERGENCY</span>
        </button>
        <div class="emergency-btn-hint">For urgent situations only · Press and hold to activate</div>
      </div>
    </div>
    ${renderBottomNav("home")}
  </div>`;
}

/* --- TRIVIA GAME --- */
function screenTrivia() {
  if (state.trivia.gameOver) return screenTriviaEnd();

  const q = TRIVIA_QUESTIONS[state.trivia.current];
  const total = TRIVIA_QUESTIONS.length;
  const progress = ((state.trivia.current) / total * 100).toFixed(1);
  const circumference = 251;
  const dashOffset = circumference - (state.trivia.timeLeft / TRIVIA_SECONDS) * circumference;
  const timerColor = state.trivia.timeLeft <= 10 ? "danger" : state.trivia.timeLeft <= 20 ? "warning" : "";
  const letters = ["A", "B", "C", "D"];

  const optionHTML = q.opts.map((opt, i) => {
    let cls = "trivia-option";
    if (state.trivia.answered) {
      cls += " disabled";
      if (i === q.a) cls += " correct";
      else if (i === state.trivia.selectedIdx) cls += " wrong";
    }
    return `
    <button class="${cls}" onclick="answerTrivia(${i})">
      <div class="option-letter">${letters[i]}</div>
      ${opt}
    </button>`;
  }).join("");

  const factHTML = state.trivia.answered ? `
    <div class="trivia-fact">
      <strong>📖 Did you know?</strong> ${q.fact}
    </div>` : "";

  const nextHTML = state.trivia.answered ? `
    <button class="trivia-next-btn" onclick="nextTriviaQ()">
      ${state.trivia.current + 1 >= total ? "See Results" : "Next Question"} →
    </button>` : "";

  return `
  <div class="app-screen slide-in">
    ${renderHeader("School Spirit Trivia")}
    <div class="trivia-screen">
      <div class="trivia-progress-wrap">
        <div class="trivia-progress-top">
          <div class="trivia-q-num">Question ${state.trivia.current + 1} of ${total}</div>
          <div class="trivia-score-label">Score: ${state.trivia.score}/${state.trivia.current}</div>
        </div>
        <div class="trivia-progress-bar">
          <div class="trivia-progress-fill" style="width:${progress}%"></div>
        </div>
      </div>

      <div class="trivia-timer-wrap">
        <div class="trivia-timer-ring">
          <svg class="trivia-timer-svg" width="88" height="88">
            <circle class="timer-track" cx="44" cy="44" r="40"/>
            <circle class="timer-fill ${timerColor}" cx="44" cy="44" r="40"
              style="stroke-dashoffset:${dashOffset}"/>
          </svg>
          <div class="timer-number">${state.trivia.timeLeft}</div>
        </div>
      </div>

      <div class="trivia-question">${q.q}</div>
      <div class="trivia-options">${optionHTML}</div>
      ${factHTML}
      ${nextHTML}
    </div>
  </div>`;
}

function screenTriviaEnd() {
  const total = TRIVIA_QUESTIONS.length;
  const { score } = state.trivia;
  const grade = getTriviaGrade(score, total);
  return `
  <div class="app-screen slide-in">
    ${renderHeader("Trivia Results")}
    <div class="trivia-end">
      <div class="trivia-end-mascot">${grade.emoji}</div>
      <div class="trivia-end-title">${grade.msg}</div>
      <div class="trivia-end-sub">${grade.sub}</div>
      <div class="trivia-end-score-ring">
        <div class="score-big">${score}<span style="font-size:20px;opacity:0.5">/${total}</span></div>
        <div class="score-label">Correct</div>
      </div>
      <button class="trivia-end-btn" onclick="resetTrivia()">🔄 Play Again</button>
      <button class="trivia-end-btn outline" onclick="goBack()">Back to Home</button>
    </div>
  </div>`;
}

/* --- HOUSE POINTS --- */
function screenHouse() {
  const maxPts = Math.max(...HOUSES.map(h => h.pts));
  const sorted = [...HOUSES].sort((a, b) => b.pts - a.pts);

  const chartRows = sorted.map((h, i) => {
    const pct = (h.pts / maxPts * 100).toFixed(1);
    return `
    <div class="house-row">
      <div class="house-row-top">
        <div class="house-name-row">
          ${i === 0 ? '<span class="house-crown">👑</span>' : `<span style="font-size:13px;color:var(--text-muted);font-weight:700;">${i + 1}.</span>`}
          ${h.icon} ${h.name} House
        </div>
        <div class="house-pts-label">${h.pts} pts</div>
      </div>
      <div class="house-track">
        <div class="house-fill" style="width:${pct}%;background:${h.chartColor}"></div>
      </div>
    </div>`;
  }).join("");

  const eventsHTML = HOUSE_EVENTS.map(e => `
    <div class="event-item">
      <div class="event-date-box ${e.colorClass}">
        <div class="event-month">${e.month}</div>
        <div class="event-day">${e.day}</div>
      </div>
      <div class="event-info">
        <div class="event-name">${e.name}</div>
        <div class="event-time">${e.time}</div>
      </div>
      <div class="event-pts">${e.pts}</div>
    </div>`).join("");

  return `
  <div class="app-screen slide-in">
    ${renderHeader("House Standings")}
    <div class="house-screen">
      <div class="house-chart-card">
        <div class="house-chart-title">Current Standings</div>
        <div class="house-chart-sub">Updated weekly every Monday · Season Points</div>
        <div class="house-chart">${chartRows}</div>
      </div>
      <div class="section-title">Upcoming House Events</div>
      <div class="event-list">${eventsHTML}</div>
    </div>
    ${renderBottomNav("house")}
  </div>`;
}

/* --- SURVEYS --- */
function screenSurveys() {
  const survey1Body = state.survey1.submitted
    ? `<div class="survey-submitted">
        <div class="survey-submitted-icon">✅</div>
        <div class="survey-submitted-text">Response submitted! Thank you.</div>
       </div>`
    : `<div class="survey-body">
        <div class="survey-question">How would you rate the school lunch this week?</div>
        <div class="star-rating">
          ${[1,2,3,4,5].map(n => `
            <span class="star-btn ${state.survey1.rating >= n ? 'active' : ''}" onclick="setStar1(${n})">⭐</span>
          `).join("")}
        </div>
        <div class="survey-question" style="margin-top:10px;">Any comments?</div>
        <textarea class="message-textarea" id="survey1-comment" placeholder="Optional feedback..." style="min-height:80px;margin-bottom:14px;"></textarea>
        <button class="survey-submit" onclick="submitSurvey1()">Submit Response</button>
       </div>`;

  const survey2Opts = ["Excellent — love it here!", "Good — minor improvements needed", "Fair — several issues", "Poor — needs major changes"];
  const survey2Body = state.survey2.submitted
    ? `<div class="survey-submitted">
        <div class="survey-submitted-icon">✅</div>
        <div class="survey-submitted-text">Response submitted! Thank you.</div>
       </div>`
    : `<div class="survey-body">
        <div class="survey-question">How would you rate your overall dorm experience this term?</div>
        <div class="survey-options">
          ${survey2Opts.map((opt, i) => `
            <div class="survey-option ${state.survey2.selected === i ? 'selected' : ''}" onclick="setSurvey2(${i})">
              <div class="survey-option-dot"></div>
              ${opt}
            </div>`).join("")}
        </div>
        <button class="survey-submit" onclick="submitSurvey2()">Submit Response</button>
       </div>`;

  return `
  <div class="app-screen slide-in">
    ${renderHeader("Active Surveys")}
    <div class="surveys-screen">
      <div class="survey-card">
        <div class="survey-card-header">
          <div class="survey-icon">🍽️</div>
          <div class="survey-card-header-text">
            <div class="survey-card-title">Dining Feedback</div>
            <div class="survey-card-sub">Dining Services · Weekly Survey</div>
          </div>
          <div class="survey-status">${state.survey1.submitted ? "Done" : "Open"}</div>
        </div>
        ${survey1Body}
      </div>
      <div class="survey-card">
        <div class="survey-card-header">
          <div class="survey-icon">🏠</div>
          <div class="survey-card-header-text">
            <div class="survey-card-title">Dorm Life Survey</div>
            <div class="survey-card-sub">Residential Life · Term Survey</div>
          </div>
          <div class="survey-status">${state.survey2.submitted ? "Done" : "Open"}</div>
        </div>
        ${survey2Body}
      </div>
    </div>
    ${renderBottomNav("home")}
  </div>`;
}

/* --- ANONYMOUS MESSAGE --- */
function screenMessage() {
  if (state.messageSent) {
    return `
    <div class="app-screen slide-in">
      ${renderHeader("Message Ms. Ellie")}
      <div class="message-screen">
        <div class="message-success">
          <div class="message-success-icon">🔒</div>
          <div class="message-success-title">Message Sent!</div>
          <div class="message-success-sub">Your anonymous message has been delivered to Ms. Ellie. She reads all messages and will follow up as appropriate.</div>
          <button class="message-success-back" onclick="state.messageSent=false;navigate('home')">Back to Home</button>
        </div>
      </div>
      ${renderBottomNav("message")}
    </div>`;
  }

  const cats = ["General", "Academic", "Social", "Wellbeing", "Facilities", "Other"];
  return `
  <div class="app-screen slide-in">
    ${renderHeader("Message Ms. Ellie")}
    <div class="message-screen">
      <div class="message-privacy-banner">
        <div class="message-privacy-icon">🔒</div>
        <div class="message-privacy-text">Your message is 100% anonymous. No identifying information is shared with Ms. Ellie.</div>
      </div>
      <div class="message-recipient">
        <div class="recipient-avatar">👩‍🏫</div>
        <div class="recipient-info">
          <div class="recipient-name">Ms. Ellie</div>
          <div class="recipient-role">Student Support & Counseling</div>
        </div>
        <span class="tag tag-navy">Anonymous</span>
      </div>
      <div class="form-group">
        <div class="message-label">Category (optional)</div>
        <div class="message-category">
          ${cats.map((c, i) => `<div class="cat-chip ${state.messageCategory === i ? 'active' : ''}" onclick="setMsgCat(${i})">${c}</div>`).join("")}
        </div>
      </div>
      <div class="form-group">
        <div class="message-label">Your Message</div>
        <textarea class="message-textarea" id="anon-msg" placeholder="Write your message here... You're safe to share anything."></textarea>
      </div>
      <button class="message-send-btn" onclick="sendAnonMessage()">
        ${ICON.send}
        Send Anonymously
      </button>
    </div>
    ${renderBottomNav("message")}
  </div>`;
}

/* --- REPORT PROBLEM --- */
function screenReport() {
  if (state.reportSent) {
    return `
    <div class="app-screen slide-in">
      ${renderHeader("Report a Problem")}
      <div class="report-screen">
        <div class="message-success">
          <div class="message-success-icon">📬</div>
          <div class="message-success-title">Report Submitted!</div>
          <div class="message-success-sub">Your report has been received by school staff. All reports are handled confidentially.</div>
          <button class="message-success-back" onclick="state.reportSent=false;navigate('home')">Back to Home</button>
        </div>
      </div>
      ${renderBottomNav("home")}
    </div>`;
  }

  const categories = [
    { icon: "🛡️", label: "Safety" },
    { icon: "😤", label: "Bullying" },
    { icon: "🏗️", label: "Facilities" },
    { icon: "📚", label: "Academic" },
    { icon: "💙", label: "Personal" },
    { icon: "📝", label: "Other" },
  ];

  return `
  <div class="app-screen slide-in">
    ${renderHeader("Report a Problem")}
    <div class="report-screen">
      <div class="report-info-banner">
        <div class="report-info-icon">🔐</div>
        <div class="report-info-text">All reports are confidential and reviewed by Brewster staff. You are not required to leave your name.</div>
      </div>
      <div class="form-group">
        <div class="form-label">What type of issue is this?</div>
        <div class="category-grid">
          ${categories.map((c, i) => `
            <div class="cat-tile ${state.reportCategory === i ? 'selected' : ''}" onclick="setReportCat(${i})">
              <div class="cat-tile-icon">${c.icon}</div>
              <div class="cat-tile-label">${c.label}</div>
            </div>`).join("")}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Describe the issue</label>
        <textarea class="form-textarea" id="report-desc" placeholder="Please describe what happened, when, and any other details that might help..."></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Location (optional)</label>
        <input class="form-input" id="report-loc" type="text" placeholder="e.g., Main Hall, Dining Room, Dorm 3..."/>
      </div>
      <button class="submit-btn" onclick="submitReport()">Submit Report</button>
    </div>
    ${renderBottomNav("home")}
  </div>`;
}

/* --- EMERGENCY PANEL (PIN GATE + ADMIN VIEW) --- */
function screenEmergencyPanel() {
  if (!state.isAdmin) return screenPinEntry();
  return screenAdminPanel();
}

function screenPinEntry() {
  const pinDisplay = [0,1,2,3].map(i => `
    <div class="pin-dot ${i < state.pinEntry.length ? 'filled' : ''}"></div>
  `).join("");

  const keys = [1,2,3,4,5,6,7,8,9,"","0","⌫"];

  return `
  <div class="app-screen slide-in">
    ${renderHeader("Staff Access")}
    <div class="pin-screen">
      <div class="pin-icon">🔐</div>
      <div class="pin-title">Staff Authorization Required</div>
      <div class="pin-sub">Enter your staff PIN to access the Emergency Panel. Authorized personnel only.</div>
      <div class="pin-display">${pinDisplay}</div>
      <div class="pin-pad">
        ${keys.map(k => {
          if (k === "") return `<div class="pin-key empty"></div>`;
          if (k === "⌫") return `<button class="pin-key delete" onclick="pinDelete()">⌫</button>`;
          return `<button class="pin-key" onclick="pinPress('${k}')">${k}</button>`;
        }).join("")}
      </div>
      ${state.pinError ? '<div class="pin-error">Incorrect PIN. Please try again.</div>' : ""}
    </div>
  </div>`;
}

function screenAdminPanel() {
  const priorityChips = ["normal","urgent","emergency"].map(p => `
    <div class="priority-chip ${state.adminPriority === p ? 'selected-' + p : ''}" onclick="setPriority('${p}')">
      ${p === "normal" ? "✅ Normal" : p === "urgent" ? "⚠️ Urgent" : "🚨 Emergency"}
    </div>`).join("");

  const broadcastsHTML = state.broadcasts.length === 0
    ? `<p style="color:rgba(255,255,255,0.4);font-size:13px;text-align:center;padding:16px 0;">No broadcasts yet</p>`
    : state.broadcasts.slice(-5).reverse().map(b => `
        <div class="broadcast-item">
          <div class="broadcast-item-header">
            <div class="broadcast-item-title">${b.title}</div>
            <div class="broadcast-item-time">${b.time}</div>
          </div>
          <div class="broadcast-item-msg">${b.msg}</div>
          <div class="mt-8">
            <span class="broadcast-priority-tag ${b.priority}">${b.priority.toUpperCase()}</span>
          </div>
        </div>`).join("");

  return `
  <div class="app-screen slide-in">
    ${renderHeader("Emergency Panel", true, `<button class="header-icon-btn" onclick="state.isAdmin=false;goBack()" style="margin-left:auto">🔓</button>`)}
    <div class="admin-panel">
      <div class="broadcast-card">
        <div class="broadcast-title">📡 Broadcast Message</div>
        <div class="broadcast-sub">Push a message to all Brewster App users instantly</div>
        <div class="priority-row">${priorityChips}</div>
        <input class="broadcast-input" id="bc-title" type="text" placeholder="Alert title (e.g. 'Schedule Change')"/>
        <textarea class="broadcast-textarea" id="bc-msg" placeholder="Write your message to all students..."></textarea>
        <button class="broadcast-btn" onclick="sendBroadcast()">📡 Broadcast to All Students</button>
      </div>
      <div class="section-title" style="color:var(--text)">Recent Broadcasts</div>
      <div class="recent-broadcasts">${broadcastsHTML}</div>
    </div>
  </div>`;
}

/* --- EMERGENCY MODAL --- */
function renderEmergencyOverlay() {
  if (!state.emergencyOpen) return "";
  if (state.emergencySent) {
    return `
    <div class="emergency-overlay" id="emergency-overlay">
      <div class="emergency-sent">
        <div class="emergency-sent-icon">✅</div>
        <div class="emergency-sent-title">Emergency Alert Sent!</div>
        <div class="emergency-sent-sub">School security, staff, and administrators have been notified. Help is on the way. Stay calm and stay safe.</div>
        <button class="emergency-done-btn" onclick="closeEmergency()">Close</button>
      </div>
    </div>`;
  }

  return `
  <div class="emergency-overlay" id="emergency-overlay">
    <div class="emergency-overlay-icon">🚨</div>
    <div class="emergency-overlay-title">Emergency Alert</div>
    <div class="emergency-overlay-sub">Press and hold the button below for 3 seconds to send an emergency alert to all school staff and security.</div>
    <button class="emergency-press-btn"
      id="press-hold-btn"
      onmousedown="startPress()" ontouchstart="startPress(event)"
      onmouseup="cancelPress()" ontouchend="cancelPress()"
      onmouseleave="cancelPress()">
      <div class="press-hold-fill" id="press-fill"></div>
      <div class="press-btn-text">🚨 HOLD TO SEND ALERT</div>
    </button>
    <button class="emergency-cancel" onclick="closeEmergency()">Cancel — Not an Emergency</button>
  </div>`;
}

/* ===== RENDER ENGINE ===== */

function getScreenHTML(anim = "slide-in") {
  switch (state.screen) {
    case "splash":          return screenSplash();
    case "home":            return screenHome();
    case "trivia":          return screenTrivia();
    case "house":           return screenHouse();
    case "surveys":         return screenSurveys();
    case "message":         return screenMessage();
    case "report":          return screenReport();
    case "emergency-panel": return screenEmergencyPanel();
    case "profile":         return screenProfilePlaceholder();
    default:                return screenHome();
  }
}

function screenProfilePlaceholder() {
  return `
  <div class="app-screen slide-in">
    ${renderHeader("", false)}
    <div class="page" style="display:flex;flex-direction:column;align-items:center;padding-top:60px;gap:16px;text-align:center;">
      <div style="font-size:72px">🐾</div>
      <div style="font-size:22px;font-weight:900;color:var(--text)">My Brewster Profile</div>
      <div style="font-size:14px;color:var(--text-muted);max-width:260px;line-height:1.5">Profile features coming soon! Stay tuned for personalized Bobcat stats.</div>
      <div style="margin-top:8px;padding:12px 24px;background:var(--navy);color:white;border-radius:var(--r-md);font-size:15px;font-weight:700;cursor:pointer" onclick="navigate('home')">Back to Home</div>
    </div>
    ${renderBottomNav("profile")}
  </div>`;
}

function renderApp(anim = "slide-in") {
  const root = document.getElementById("root");
  root.innerHTML = getScreenHTML(anim) + renderEmergencyOverlay();
  bindEvents();
}

/* ===== EVENT BINDING ===== */

function bindEvents() {
  /* Trivia timer — start when game screen renders */
  if (state.screen === "trivia" && !state.trivia.answered && !state.trivia.gameOver) {
    startTriviaTimer();
  }

  /* Dashboard countdown timer */
  if (state.screen === "home") {
    startCountdownTimer();
  }
}

/* ===== TRIVIA GAME LOGIC ===== */

function startTriviaTimer() {
  stopTriviaTimer();
  state.trivia.timer = setInterval(() => {
    state.trivia.timeLeft--;
    updateTimerDisplay();
    if (state.trivia.timeLeft <= 0) {
      clearInterval(state.trivia.timer);
      state.trivia.timer = null;
      state.trivia.answered = true;
      state.trivia.selectedIdx = -1;
      renderApp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const numEl = document.querySelector(".timer-number");
  const fillEl = document.querySelector(".timer-fill");
  if (!numEl || !fillEl) return;
  const t = state.trivia.timeLeft;
  const circumference = 251;
  const offset = circumference - (t / TRIVIA_SECONDS) * circumference;
  numEl.textContent = t;
  fillEl.style.strokeDashoffset = offset;
  fillEl.className = `timer-fill${t <= 10 ? " danger" : t <= 20 ? " warning" : ""}`;
}

function answerTrivia(idx) {
  if (state.trivia.answered) return;
  stopTriviaTimer();
  state.trivia.answered = true;
  state.trivia.selectedIdx = idx;
  const correct = TRIVIA_QUESTIONS[state.trivia.current].a;
  if (idx === correct) state.trivia.score++;
  renderApp();
}

function nextTriviaQ() {
  const next = state.trivia.current + 1;
  if (next >= TRIVIA_QUESTIONS.length) {
    state.trivia.gameOver = true;
    renderApp();
    return;
  }
  state.trivia.current = next;
  state.trivia.answered = false;
  state.trivia.selectedIdx = null;
  state.trivia.timeLeft = TRIVIA_SECONDS;
  renderApp();
}

function resetTrivia() {
  state.trivia = {
    current: 0, score: 0, timeLeft: TRIVIA_SECONDS,
    timer: null, answered: false, selectedIdx: null, gameOver: false
  };
  navigate("trivia");
}

/* ===== COUNTDOWN TIMER ===== */

function startCountdownTimer() {
  if (state.countdownTimer) clearInterval(state.countdownTimer);
  state.countdownTimer = setInterval(() => {
    const el = document.getElementById("hero-countdown");
    if (!el) { clearInterval(state.countdownTimer); return; }
    const remaining = state.nextTriviaTarget - Date.now();
    if (remaining <= 0) {
      el.textContent = "NOW!";
      state.nextTriviaTarget = Date.now() + 15 * 60 * 1000;
    } else {
      el.textContent = formatCountdown(remaining);
    }
  }, 1000);
}

/* ===== SURVEYS ===== */

function setStar1(n) {
  state.survey1.rating = n;
  renderApp();
}

async function submitSurvey1() {
  if (sb) {
    const comment = document.getElementById("survey1-comment");
    await sb.from("survey_responses").insert({
      survey_id: "dining",
      response: { rating: state.survey1.rating, comment: comment ? comment.value : "" },
    });
  }
  state.survey1.submitted = true;
  renderApp();
}

function setSurvey2(i) {
  state.survey2.selected = i;
  renderApp();
}

async function submitSurvey2() {
  if (state.survey2.selected === null) return;
  if (sb) {
    const opts = ["Excellent — love it here!","Good — minor improvements needed","Fair — several issues","Poor — needs major changes"];
    await sb.from("survey_responses").insert({
      survey_id: "dorm",
      response: { selected: state.survey2.selected, answer: opts[state.survey2.selected] },
    });
  }
  state.survey2.submitted = true;
  renderApp();
}

/* ===== ANONYMOUS MESSAGE ===== */

function setMsgCat(i) {
  state.messageCategory = i;
  renderApp();
}

async function sendAnonMessage() {
  const el = document.getElementById("anon-msg");
  const msg = el ? el.value.trim() : "";
  if (!msg) {
    el && (el.style.borderColor = "var(--red)");
    el && (el.placeholder = "Please write a message before sending...");
    return;
  }
  const cats = ["General","Academic","Social","Wellbeing","Facilities","Other"];
  if (sb) {
    await sb.from("messages").insert({
      category: state.messageCategory != null ? cats[state.messageCategory] : null,
      content:  msg,
    });
  }
  state.messageSent = true;
  renderApp();
}

/* ===== REPORT PROBLEM ===== */

function setReportCat(i) {
  state.reportCategory = i;
  renderApp();
}

async function submitReport() {
  const desc = document.getElementById("report-desc");
  if (!desc || !desc.value.trim()) {
    desc && (desc.style.borderColor = "var(--red)");
    desc && (desc.placeholder = "Please describe the issue before submitting...");
    return;
  }
  const cats = ["Safety","Bullying","Facilities","Academic","Personal","Other"];
  const loc  = document.getElementById("report-loc");
  if (sb) {
    await sb.from("problem_reports").insert({
      category:    state.reportCategory != null ? cats[state.reportCategory] : null,
      description: desc.value.trim(),
      location:    loc ? loc.value.trim() : null,
    });
  }
  state.reportSent = true;
  renderApp();
}

/* ===== ADMIN PIN ===== */

function pinPress(k) {
  if (state.pinEntry.length >= 4) return;
  state.pinEntry += k;
  if (state.pinEntry.length === 4) {
    if (state.pinEntry === ADMIN_PIN) {
      state.isAdmin = true;
      state.pinEntry = "";
      state.pinError = false;
      renderApp();
    } else {
      state.pinError = true;
      setTimeout(() => {
        state.pinEntry = "";
        state.pinError = false;
        renderApp();
      }, 900);
      renderApp();
    }
  } else {
    renderApp();
  }
}

function pinDelete() {
  state.pinEntry = state.pinEntry.slice(0, -1);
  renderApp();
}

/* ===== ADMIN PANEL ===== */

function setPriority(p) {
  state.adminPriority = p;
  renderApp();
}

async function sendBroadcast() {
  const title = document.getElementById("bc-title");
  const msg   = document.getElementById("bc-msg");
  if (!title || !title.value.trim() || !msg || !msg.value.trim()) {
    if (title && !title.value.trim()) title.style.borderColor = "rgba(220,50,50,0.7)";
    if (msg   && !msg.value.trim())   msg.style.borderColor   = "rgba(220,50,50,0.7)";
    return;
  }
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const entry = {
    title: title.value.trim(),
    msg:   msg.value.trim(),
    priority: state.adminPriority,
    time: timeStr,
  };
  if (sb) {
    await sb.from("broadcasts").insert({
      title:    entry.title,
      message:  entry.msg,
      priority: entry.priority,
    });
    await loadBroadcasts();
  } else {
    state.broadcasts.unshift(entry);
  }
  renderApp();
}

/* ===== EMERGENCY BUTTON ===== */

function openEmergency() {
  state.emergencyOpen = true;
  state.emergencySent = false;
  renderApp();
}

function closeEmergency() {
  state.emergencyOpen = false;
  state.emergencySent = false;
  cancelPress();
  renderApp();
}

function startPress(e) {
  if (e) e.preventDefault();
  const fill = document.getElementById("press-fill");
  if (!fill) return;

  let progress = 0;
  fill.style.transition = "width 3s linear";
  fill.style.width = "100%";

  state.pressTimer = setTimeout(() => {
    state.emergencySent = true;
    renderApp();
  }, 3000);
}

function cancelPress() {
  if (state.pressTimer) {
    clearTimeout(state.pressTimer);
    state.pressTimer = null;
  }
  const fill = document.getElementById("press-fill");
  if (fill) {
    fill.style.transition = "width 0.2s ease";
    fill.style.width = "0";
  }
}

/* ===== SUPABASE ===== */

const SUPABASE_URL = "https://hnjziardboghvhyhyhcx.supabase.co";
const SUPABASE_KEY = "sb_publishable_l13qSZTD_O11G6cSkfLS_w_1ej0ckZy";
let sb = null;

async function initApp() {
  try {
    const { createClient } = window.supabase;
    sb = createClient(SUPABASE_URL, SUPABASE_KEY);
    await Promise.all([loadHousePoints(), loadBroadcasts()]);
  } catch (e) {
    console.warn("Supabase init failed, running in offline mode:", e);
  }
  renderApp("fade-in");
}

async function loadHousePoints() {
  if (!sb) return;
  const { data, error } = await sb.from("house_points").select("*").order("points", { ascending: false });
  if (error || !data || data.length === 0) return;
  HOUSES = data.map(row => ({
    name:       row.house_name,
    pts:        row.points,
    color:      row.chart_color,
    barColor:   row.bar_color,
    chartColor: row.chart_color,
    icon:       row.icon,
  }));
}

async function loadBroadcasts() {
  if (!sb) return;
  const { data, error } = await sb.from("broadcasts").select("*").order("created_at", { ascending: false }).limit(10);
  if (error || !data) return;
  state.broadcasts = data.map(b => ({
    title:    b.title,
    msg:      b.message,
    priority: b.priority,
    time:     new Date(b.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  }));
}

/* ===== INIT ===== */
initApp();
