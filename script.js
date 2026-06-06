/* ══════════════════════════════════════════════════════════════
   GOKUL PRIYAN — CINEMATIC HOLLYWOOD VINTAGE PORTFOLIO
   Interactive Effects & Animations
   ══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── CINEMATIC LOADER ──
  const loader = document.getElementById('cinematic-loader');
  const loaderBar = document.getElementById('loaderBar');
  const loaderCounter = document.getElementById('loaderCounter');

  const phrases = [
    'Loading reel...',
    'Developing film...',
    'Adjusting exposure...',
    'Setting the stage...',
    'Rolling camera...',
    'Cue the lights...',
  ];

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 12 + 3;
    if (progress > 100) progress = 100;
    loaderBar.style.width = progress + '%';

    const phraseIdx = Math.min(
      Math.floor((progress / 100) * phrases.length),
      phrases.length - 1
    );
    loaderCounter.textContent = phrases[phraseIdx];

    if (progress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('hide');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 1200);
      }, 400);
    }
  }, 140);

  // ── TYPEWRITER EFFECT ──
  const roles = [
    '✦ Cloud Engineer',
    '✦ Python Developer',
    '✦ AI Builder',
    '✦ Linux Enthusiast',
    '✦ Open Source Learner',
    '✦ Technology Explorer',
    '✦ Frontend Developer · React.js · UI Craftsman',
  ];

  const typewriterEl = document.getElementById('typewriterText');
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 65;

  function typeWriter() {
    const currentRole = roles[roleIdx];
    if (!isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2200; // Pause at end
      } else {
        typeSpeed = 55 + Math.random() * 40;
      }
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400;
      } else {
        typeSpeed = 25;
      }
    }
    setTimeout(typeWriter, typeSpeed);
  }
  setTimeout(typeWriter, 2500);

  // ── POLAROID TILT EFFECT ──
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-x', (-y * 8).toFixed(2) + 'deg');
        card.style.setProperty('--tilt-y', (x * 8).toFixed(2) + 'deg');
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right'
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  // ── NAV SCROLL EFFECT ──
  const nav = document.getElementById('mainNav');
  let lastScroll = 0;
  window.addEventListener(
    'scroll',
    () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    },
    { passive: true }
  );

  // ── MOBILE NAV TOGGLE ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ── MARQUEE ──
  const marqueeItems = [
    'React.js ✦',
    'JavaScript ES6+ ✦',
    'HTML5 · CSS3 ✦',
    'Node.js ✦',
    'REST APIs ✦',
    'Figma ✦',
    'Git & GitHub ✦',
    'MySQL ✦',
    'Python ✦',
    'Cloud Engineering ✦',
    'AI Builder ✦',
    'Linux ✦',
    'Open Source ✦',
    'Responsive Design ✦',
    'Madurai ✦',
    'TNGPTC 2026 ✦',
  ];
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const doubled = [...marqueeItems, ...marqueeItems];
    doubled.forEach((txt) => {
      const span = document.createElement('span');
      span.style.cssText =
        "font-family: 'Special Elite', monospace; font-size: 0.75rem; letter-spacing: 0.18em; color: rgba(201,169,106,0.35); padding: 0 1.8rem; white-space: nowrap; text-transform: uppercase;";
      span.textContent = txt;
      marqueeTrack.appendChild(span);
    });
  }

  // ── FILM STRIP DIVIDER ──
  const filmStrip = document.getElementById('filmStrip1');
  if (filmStrip) {
    const content = filmStrip.querySelector('.film-strip-content');
    const frameCount = 40;
    for (let set = 0; set < 2; set++) {
      for (let i = 0; i < frameCount; i++) {
        const frame = document.createElement('div');
        frame.style.cssText = `
          width: 60px;
          height: 42px;
          border: 1px solid rgba(201,169,106,0.06);
          border-radius: 1px;
          margin: 0 3px;
          flex-shrink: 0;
          background: rgba(201,169,106,${0.01 + Math.random() * 0.03});
        `;
        content.appendChild(frame);
      }
    }
    filmStrip.appendChild(content.cloneNode(true));
  }

  // ── DUST PARTICLES ──
  const dustCanvas = document.getElementById('dustCanvas');
  if (
    dustCanvas &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 10;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const opacity = Math.random() * 0.25 + 0.05;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(232,213,163,${opacity});
        left: ${startX}%;
        top: ${startY}%;
        animation: dustFloat ${duration}s ${delay}s ease-in-out infinite;
        pointer-events: none;
      `;
      dustCanvas.appendChild(particle);
    }

    // Add dust float animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes dustFloat {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0.15;
        }
        25% {
          transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * -40 - 10}px) scale(1.2);
          opacity: 0.3;
        }
        50% {
          transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -80 - 20}px) scale(0.8);
          opacity: 0.1;
        }
        75% {
          transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * -30 - 5}px) scale(1.1);
          opacity: 0.25;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  // ── SMOOTH SECTION LINK SCROLLING ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── CAMERA FLASH ON POLAROID CLICK ──
  document.querySelectorAll('.polaroid-hero').forEach((polaroid) => {
    polaroid.addEventListener('click', () => {
      const flash = document.createElement('div');
      flash.style.cssText = `
        position: fixed;
        inset: 0;
        background: white;
        z-index: 9999;
        pointer-events: none;
        animation: cameraFlash 0.6s ease-out forwards;
      `;
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 700);
    });
  });

  // Add camera flash animation
  const flashStyle = document.createElement('style');
  flashStyle.textContent = `
    @keyframes cameraFlash {
      0% { opacity: 0.8; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(flashStyle);
})();
