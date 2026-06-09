/* ══════════════════════════════════════════════════════════════
   FRAGMENTS OF A DIGITAL SOUL
   Gokul Priyan — Cinematic Vintage Portfolio
   Interactive Engine
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  /* ── LOADER ── */
  const loader = $('#loader');
  const loaderFill = $('#loaderFill');
  const loaderStatus = $('#loaderStatus');
  const phrases = ['Developing film...', 'Adjusting exposure...', 'Loading memories...', 'Setting the stage...', 'Rolling camera...', 'Cue the lights...'];
  let prog = 0;
  const loadTick = setInterval(() => {
    prog += Math.random() * 14 + 3;
    if (prog > 100) prog = 100;
    loaderFill.style.width = prog + '%';
    loaderStatus.textContent = phrases[Math.min(Math.floor(prog / 100 * phrases.length), phrases.length - 1)];
    if (prog >= 100) {
      clearInterval(loadTick);
      setTimeout(() => { loader.classList.add('hide'); setTimeout(() => loader.remove(), 1200); }, 500);
    }
  }, 130);

  /* ── WHOAMI TYPEWRITER (Hero Terminal) ── */
  const whoamiLines = ['Gokul Priyan', 'Cloud Explorer', 'Linux Enthusiast', 'Python Developer', 'AI Builder', 'Open Source Learner', 'Frontend Developer', 'Technology Explorer', 'Dreamer'];
  const whoamiOut = $('#whoamiOutput');
  let wIdx = 0;
  function typeWhoami() {
    if (wIdx >= whoamiLines.length) { setTimeout(() => { whoamiOut.innerHTML = ''; wIdx = 0; typeWhoami(); }, 3000); return; }
    const line = whoamiLines[wIdx];
    const el = document.createElement('p');
    el.className = 'term-line';
    whoamiOut.appendChild(el);
    let ci = 0;
    const t = setInterval(() => {
      el.textContent = line.substring(0, ci + 1);
      ci++;
      if (ci >= line.length) { clearInterval(t); wIdx++; setTimeout(typeWhoami, 800); }
    }, 50 + Math.random() * 30);
  }
  setTimeout(typeWhoami, 3200);

  /* ── POLAROID TILT ── */
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    $$('[data-tilt]').forEach(c => {
      c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--tx', (-(((e.clientY - r.top) / r.height) - 0.5) * 10).toFixed(1) + 'deg');
        c.style.setProperty('--ty', ((((e.clientX - r.left) / r.width) - 0.5) * 10).toFixed(1) + 'deg');
      });
      c.addEventListener('mouseleave', () => { c.style.setProperty('--tx', '0deg'); c.style.setProperty('--ty', '0deg'); });
    });

    /* Camera flash Easter egg */
    $$('.polaroid').forEach(p => p.addEventListener('click', () => {
      const f = document.createElement('div');
      f.style.cssText = 'position:fixed;inset:0;background:#fff;z-index:9999;pointer-events:none;animation:cFlash .5s ease-out forwards';
      document.body.appendChild(f);
      setTimeout(() => f.remove(), 600);
    }));
  }

  /* ── SCROLL REVEAL ── */
  const revObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
  $$('.reveal,.reveal-left,.reveal-right').forEach(el => revObs.observe(el));

  /* ── NAV ── */
  const nav = $('#nav');
  const burger = $('#burger');
  const menu = $('#menu');
  window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', scrollY > 50); }, { passive: true });
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    burger.setAttribute('aria-expanded', menu.classList.contains('active'));
  });
  $$('a', menu).forEach(a => a.addEventListener('click', () => { burger.classList.remove('active'); menu.classList.remove('active'); burger.setAttribute('aria-expanded', 'false'); }));

  /* ── SMOOTH SCROLL ── */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', function (e) {
    const t = $(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));

  /* ── MARQUEE ── */
  const mqItems = ['React.js ✦', 'JavaScript ES6+ ✦', 'HTML5 · CSS3 ✦', 'Node.js ✦', 'REST APIs ✦', 'Figma ✦', 'Git & GitHub ✦', 'MySQL ✦', 'Python ✦', 'Cloud Engineering ✦', 'AI Builder ✦', 'Linux ✦', 'Open Source ✦', 'Responsive Design ✦', 'Madurai ✦', 'TNGPTC 2026 ✦'];
  const mq = $('#mq');
  if (mq) [...mqItems, ...mqItems].forEach(t => {
    const s = document.createElement('span');
    s.textContent = t;
    mq.appendChild(s);
  });

  /* ── FILMSTRIP ── */
  const fs = $('#fs1');
  if (fs) for (let s = 0; s < 2; s++) for (let i = 0; i < 35; i++) {
    const f = document.createElement('div');
    f.className = 'fs-frame';
    fs.appendChild(f);
  }

  /* ── DUST PARTICLES ── */
  const dust = $('#dust');
  if (dust && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      p.className = 'dust-p';
      p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${1+Math.random()*2.5}px;height:${1+Math.random()*2.5}px;animation-duration:${12+Math.random()*18}s;animation-delay:${Math.random()*10}s;opacity:${.05+Math.random()*.2}`;
      dust.appendChild(p);
    }
  }

  /* ── INTERACTIVE TERMINAL ── */
  const termInput = $('#termInput');
  const termHistory = $('#termHistory');
  const termScreen = $('#termScreen');

  const ASCII_GOKUL = `
   ██████╗  ██████╗ ██╗  ██╗██╗   ██╗██╗
  ██╔════╝ ██╔═══██╗██║ ██╔╝██║   ██║██║
  ██║  ███╗██║   ██║█████╔╝ ██║   ██║██║
  ██║   ██║██║   ██║██╔═██╗ ██║   ██║██║
  ╚██████╔╝╚██████╔╝██║  ██╗╚██████╔╝███████╗
   ╚═════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝`;

  const NEOFETCH = `<span class="t-cyan">gokul</span>@<span class="t-cyan">arch</span>
  ──────────────
  <span class="t-label">OS:</span> Arch Linux x86_64
  <span class="t-label">Host:</span> Madurai, Tamil Nadu
  <span class="t-label">Shell:</span> zsh 5.9
  <span class="t-label">Editor:</span> VS Code / Vim
  <span class="t-label">Theme:</span> Catppuccin Mocha
  <span class="t-label">Terminal:</span> kitty
  <span class="t-label">WM:</span> Hyprland
  <span class="t-label">Languages:</span> JS, Python, HTML/CSS
  <span class="t-label">Status:</span> Building the future ✦`;

  const cmds = {
    help: () => `Available commands:
  <span class="t-cmd">whoami</span>      — who is Gokul?
  <span class="t-cmd">skills</span>      — my tech stack
  <span class="t-cmd">projects</span>    — things I've built
  <span class="t-cmd">neofetch</span>    — system info
  <span class="t-cmd">fortune</span>     — a random thought
  <span class="t-cmd">motivation</span>  — need a push?
  <span class="t-cmd">contact</span>     — reach me
  <span class="t-cmd">resume</span>      — download resume
  <span class="t-cmd">matrix</span>      — follow the rabbit
  <span class="t-cmd">anime</span>       — my favorites
  <span class="t-cmd">rice</span>        — desktop setup
  <span class="t-cmd">hyprland</span>    — window manager
  <span class="t-cmd">clear</span>       — clear terminal
  <span class="t-cmd">sudo hire gokul</span> — try it ;)`,

    whoami: () => `<pre class="t-ascii">${ASCII_GOKUL}</pre>
  Gokul Priyan P
  Cloud Engineer · Python Developer · AI Builder
  Linux Enthusiast · Open Source Learner
  Frontend Developer @ BuildHomeMart
  Madurai, Tamil Nadu · Class of 2026`,

    skills: () => `<span class="t-label">Frontend:</span>  HTML5, CSS3, React.js, JavaScript ES6+
  <span class="t-label">Backend:</span>   Node.js, REST APIs, Python, MySQL
  <span class="t-label">Tools:</span>     Git, GitHub, Figma, VS Code, Vim
  <span class="t-label">Deploy:</span>    Render, Vercel, GitHub Pages
  <span class="t-label">Design:</span>    Responsive, Mobile-first, Animations
  <span class="t-label">Other:</span>     Linux, Shell, IoT, Cloud, AI/ML basics`,

    projects: () => `<span class="t-label">01.</span> Fish Corporation Website  <span class="t-muted">[Live Client · React]</span>
  <span class="t-label">02.</span> Uzhavar Bridge            <span class="t-muted">[AI Platform · Python]</span>
  <span class="t-label">03.</span> LumiNet Smart Lighting     <span class="t-muted">[IoT · Startup]</span>
  <span class="t-label">04.</span> Student Attendance System   <span class="t-muted">[Python · MySQL]</span>
  <span class="t-label">05.</span> This Portfolio             <span class="t-muted">[Vanilla · Cinematic]</span>`,

    neofetch: () => NEOFETCH,

    fortune: () => {
      const fortunes = [
        '"The best error message is the one that never shows up." — Thomas Fuchs',
        '"First, solve the problem. Then, write the code." — John Johnson',
        '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
        '"Simplicity is the soul of efficiency." — Austin Freeman',
        '"Make it work, make it right, make it fast." — Kent Beck',
        '"Talk is cheap. Show me the code." — Linus Torvalds',
        '"Every great developer you know got there by solving problems they were unqualified to solve." — Patrick McKenzie',
        '"The only way to learn a new programming language is by writing programs in it." — Dennis Ritchie',
      ];
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    },

    motivation: () => {
      const quotes = [
        'You didn\'t come this far to only come this far. Keep shipping. 🚀',
        'Every expert was once a beginner. Every master was once a disaster.',
        'The code you write today is the foundation of tomorrow. Build it well.',
        'Your future self will thank you for the commits you push today.',
        'Dream big. Code bigger. Ship biggest.',
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },

    contact: () => `<span class="t-label">Email:</span>    gokultgb475@gmail.com
  <span class="t-label">Phone:</span>    +91 94893 92449
  <span class="t-label">GitHub:</span>   github.com/gokultgb475-lgtm
  <span class="t-label">LinkedIn:</span> linkedin.com/in/gokulpriyan-p-a5b535394`,

    resume: () => { window.open('assets/gokulpriyanP-resume.pdf', '_blank'); return 'Opening resume... 📄'; },

    matrix: () => `<span class="t-green">Wake up, Neo...</span>
  <span class="t-green">The Matrix has you...</span>
  <span class="t-green">Follow the white rabbit. 🐰</span>
  <span class="t-muted">(Just kidding. But keep exploring.)</span>`,

    anime: () => `<span class="t-label">Favorites:</span>
  ✦ Your Lie in April
  ✦ A Silent Voice
  ✦ Spirited Away
  ✦ Weathering with You
  ✦ Violet Evergarden
  ✦ March Comes in Like a Lion
  <span class="t-muted">"People who can't throw something important away, can never hope to change anything." — Armin Arlert</span>`,

    rice: () => `<span class="t-label">Desktop:</span>   Arch Linux + Hyprland
  <span class="t-label">Bar:</span>       Waybar (custom rice)
  <span class="t-label">Terminal:</span>  Kitty
  <span class="t-label">Shell:</span>     Zsh + Starship prompt
  <span class="t-label">Theme:</span>     Catppuccin Mocha
  <span class="t-label">Font:</span>      JetBrains Mono Nerd
  <span class="t-label">Dotfiles:</span>  github.com/gokultgb475-lgtm
  <span class="t-muted">btw, I use arch. 🐧</span>`,

    hyprland: () => `<span class="t-label">WM:</span>        Hyprland (Wayland)
  <span class="t-label">Gaps:</span>      8px inner, 12px outer
  <span class="t-label">Borders:</span>   2px, Catppuccin lavender
  <span class="t-label">Blur:</span>      enabled, size 8, passes 3
  <span class="t-label">Shadows:</span>   enabled, range 20
  <span class="t-label">Rounding:</span>  12px
  <span class="t-muted">The tiling life chose me. ⌨️</span>`,

    clear: () => '__CLEAR__',

    'sudo hire gokul': () => `<span class="t-green">✓ Permission granted.</span>
  <span class="t-green">✓ Welcome aboard.</span>
  <span class="t-green">✓ Initializing collaboration...</span>

  <span class="t-label">Contact:</span> gokultgb475@gmail.com
  <span class="t-label">Ready:</span>   Anytime. Anywhere. Let's build.

  <pre class="t-ascii t-green">
  ╔══════════════════════════════════╗
  ║   YOU JUST HIRED A DREAMER.     ║
  ║   LET'S CREATE SOMETHING        ║
  ║   THE WORLD REMEMBERS.          ║
  ╚══════════════════════════════════╝</pre>`,
  };

  if (termInput) {
    termInput.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      const val = termInput.value.trim().toLowerCase();
      if (!val) return;
      termInput.value = '';

      // Echo command
      const cmdEl = document.createElement('div');
      cmdEl.className = 'tw-line';
      cmdEl.innerHTML = `<span class="tw-prompt">gokul@arch:~$</span> ${val}`;
      termHistory.appendChild(cmdEl);

      // Process
      const handler = cmds[val];
      const outEl = document.createElement('div');
      outEl.className = 'tw-output';

      if (handler) {
        const result = handler();
        if (result === '__CLEAR__') {
          termHistory.innerHTML = '<p class="tw-welcome">Terminal cleared. Type <span class="tw-cmd">help</span> for commands.</p>';
          return;
        }
        outEl.innerHTML = result;
      } else {
        outEl.innerHTML = `<span class="t-red">Command not found: ${val}</span>\nType <span class="tw-cmd">help</span> for available commands.`;
      }

      termHistory.appendChild(outEl);
      termScreen.scrollTop = termScreen.scrollHeight;
    });

    // Focus terminal on click
    termScreen.addEventListener('click', () => termInput.focus());
  }

  /* ── KONAMI CODE EASTER EGG ── */
  const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIdx = 0;
  document.addEventListener('keydown', e => {
    if (e.keyCode === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) {
        konamiIdx = 0;
        // Floating cat Easter egg
        const cat = document.createElement('div');
        cat.style.cssText = 'position:fixed;z-index:99999;font-size:4rem;pointer-events:none;animation:floatCat 4s ease-in-out forwards';
        cat.textContent = '🐱';
        cat.style.left = Math.random() * 60 + 20 + '%';
        cat.style.bottom = '0';
        document.body.appendChild(cat);
        setTimeout(() => cat.remove(), 5000);

        // Notification
        const note = document.createElement('div');
        note.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;background:rgba(13,10,6,0.95);border:1px solid rgba(201,169,106,0.3);padding:2rem 3rem;border-radius:8px;font-family:Caveat,cursive;font-size:1.5rem;color:#e8d5a3;text-align:center;animation:fadeIn .5s ease';
        note.innerHTML = '🎮 Konami Code Activated!<br><span style="font-size:1rem;opacity:0.6">You found a secret. You\'re one of us now.</span>';
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 3500);
      }
    } else konamiIdx = 0;
  });

  /* ── INJECT KEYFRAMES ── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cFlash{0%{opacity:.85}100%{opacity:0}}
    @keyframes floatCat{0%{transform:translateY(0);opacity:1}50%{transform:translateY(-50vh) rotate(20deg);opacity:1}100%{transform:translateY(-100vh) rotate(40deg);opacity:0}}
    @keyframes dustDrift{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(15px,-25px) scale(1.2)}50%{transform:translate(-10px,-50px) scale(.8)}75%{transform:translate(20px,-15px) scale(1.1)}}
    .dust-p{position:absolute;border-radius:50%;background:rgba(232,213,163,.15);animation:dustDrift linear infinite;pointer-events:none}
  `;
  document.head.appendChild(style);

})();
