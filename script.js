/* ═══════════════════════════════════════
   ✦ ULTRA AESTHETIC CUTE PORTFOLIO
   Interactive Engine
   ═══════════════════════════════════════ */
(function () {
  'use strict';
  const $ = (s, p) => (p || document).querySelector(s);
  const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

  /* ── LOADER ── */
  const loader = $('#loader');
  setTimeout(() => { loader.classList.add('hide'); setTimeout(() => loader.remove(), 900); }, 1800);

  /* ── SPARKLE CANVAS ── */
  const canvas = $('#sparkles');
  if (canvas && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let W, H;
    const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
    resize();
    addEventListener('resize', resize, { passive: true });

    const sparkles = [];
    const colors = ['rgba(139,92,246,.3)', 'rgba(240,171,252,.25)', 'rgba(251,113,133,.2)', 'rgba(110,231,183,.2)', 'rgba(251,191,36,.2)'];
    for (let i = 0; i < 40; i++) {
      sparkles.push({
        x: Math.random() * W, y: Math.random() * H,
        size: Math.random() * 2.5 + .5,
        speedX: (Math.random() - .5) * .3,
        speedY: (Math.random() - .5) * .3,
        opacity: Math.random() * .5 + .1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * .02 + .01,
      });
    }

    function drawSparkles() {
      ctx.clearRect(0, 0, W, H);
      sparkles.forEach(s => {
        s.x += s.speedX; s.y += s.speedY;
        s.pulse += s.pulseSpeed;
        const o = s.opacity * (.5 + Math.sin(s.pulse) * .5);
        if (s.x < -10) s.x = W + 10;
        if (s.x > W + 10) s.x = -10;
        if (s.y < -10) s.y = H + 10;
        if (s.y > H + 10) s.y = -10;

        ctx.save();
        ctx.globalAlpha = o;
        ctx.fillStyle = s.color;
        // Draw star shape
        const r = s.size;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2;
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + Math.cos(angle) * r * 2, s.y + Math.sin(angle) * r * 2);
        }
        ctx.fill();
        // Center glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * .8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(drawSparkles);
    }
    drawSparkles();
  }

  /* ── HERO TYPEWRITER ── */
  const roles = [
    '✦ Cloud Engineer',
    '✦ Python Developer',
    '✦ AI Builder',
    '✦ Linux Enthusiast',
    '✦ Open Source Learner',
    '✦ Frontend Developer',
    '✦ Technology Explorer',
  ];
  const heroSub = $('#heroSub');
  let rIdx = 0, cIdx = 0, deleting = false, speed = 60;
  function typeRole() {
    const cur = roles[rIdx];
    if (!deleting) {
      heroSub.textContent = cur.substring(0, cIdx + 1);
      cIdx++;
      speed = cIdx === cur.length ? 2000 : 50 + Math.random() * 35;
      if (cIdx === cur.length) deleting = true;
    } else {
      heroSub.textContent = cur.substring(0, cIdx - 1);
      cIdx--;
      speed = cIdx === 0 ? 400 : 25;
      if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
    }
    setTimeout(typeRole, speed);
  }
  setTimeout(typeRole, 2000);

  /* ── NAV ── */
  const nav = $('#nav');
  const burger = $('#burger');
  const menu = $('#menu');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    burger.setAttribute('aria-expanded', menu.classList.contains('active'));
  });
  $$('a', menu).forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('active'); menu.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
  }));

  /* ── SMOOTH SCROLL ── */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', function (e) {
    const t = $(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }));

  /* ── SCROLL REVEALS ── */
  const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.08 });
  $$('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

  /* ── MOUSE GLOW ON GLASS CARDS ── */
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    $$('.glass').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
        card.style.background = `radial-gradient(300px circle at var(--mx) var(--my), rgba(139,92,246,.06), transparent 60%), var(--bg-glass)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    });
  }
})();
