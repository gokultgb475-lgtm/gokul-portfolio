/* ═══════════════════════════════════════════
   GOKUL PRIYAN — PORTFOLIO v2.0 SCRIPTS
   ═══════════════════════════════════════════ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const isLite = prefersReducedMotion || isCoarse || window.innerWidth <= 900;

/* ── Preloader ── */
(function () {
  const fill = document.getElementById('loader-fill');
  const pct = document.getElementById('loader-pct');
  const loader = document.getElementById('loader');
  let p = 0;
  const ms = isLite ? 40 : 60;
  const step = isLite ? 15 : 5;
  const range = isLite ? 18 : 10;
  const delay = isLite ? 150 : 600;

  const iv = setInterval(() => {
    p += Math.random() * range + step;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      setTimeout(() => loader.classList.add('done'), delay);
    }
    fill.style.width = p + '%';
    pct.textContent = String(Math.round(p)).padStart(3, '0') + '%';
  }, ms);
})();

/* ── Typed Effect ── */
const roles = ['Internships', 'Freelance Work', 'Collaborations', 'Full-Time Roles'];
const typedEl = document.getElementById('typed');
if (isLite) {
  typedEl.textContent = 'Internships / Freelance Work';
} else {
  let ri = 0, ci = 0, del = false;
  function typeLoop() {
    const word = roles[ri];
    if (!del) {
      typedEl.textContent = word.slice(0, ci + 1) + '▍';
      ci++;
      if (ci === word.length) { del = true; setTimeout(typeLoop, 2200); return; }
    } else {
      typedEl.textContent = word.slice(0, ci - 1) + '▍';
      ci--;
      if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(typeLoop, del ? 35 : 90);
  }
  typeLoop();
}

/* ── Nav scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('main-nav').classList.toggle('scrolled', scrollY > 60);
  document.getElementById('btt').classList.toggle('on', scrollY > 500);
}, { passive: true });

/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('.reveal');
if (isLite) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const ro = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
      }
    });
  }, { threshold: 0.06 });
  revealEls.forEach(el => ro.observe(el));
}

/* ── 3D Tilt on Skill Cards ── */
if (!isLite) {
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
      card.style.setProperty('--mx', `${(e.clientX - r.left) / r.width * 100}%`);
      card.style.setProperty('--my', `${(e.clientY - r.top) / r.height * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all .6s var(--ease)';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'background .4s, border-color .4s, box-shadow .4s';
    });
  });
}

/* ── Text Scramble on Project Names ── */
class Scramble {
  constructor(el) {
    this.el = el;
    this.original = el.textContent;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!';
  }
  run() {
    let i = 0;
    const iv = setInterval(() => {
      this.el.textContent = this.original.split('').map((ch, idx) =>
        idx < i ? ch : this.chars[Math.floor(Math.random() * this.chars.length)]
      ).join('');
      i += 0.7;
      if (i >= this.original.length) {
        this.el.textContent = this.original;
        clearInterval(iv);
      }
    }, 22);
  }
}
if (!isLite) {
  document.querySelectorAll('.project-name').forEach(el => {
    const s = new Scramble(el);
    el.closest('.project-card').addEventListener('mouseenter', () => s.run());
  });
}

/* ── Particle Canvas ── */
(function () {
  if (isLite) return;
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, pts = [], mouse = { x: -999, y: -999 };
  const COUNT = Math.min(80, Math.floor(window.innerWidth / 18));

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  for (let i = 0; i < COUNT; i++) {
    pts.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5
    });
  }

  function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, w, h);

    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124,58,237,0.4)';
      ctx.fill();
    });

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      const mdx = pts[i].x - mouse.x;
      const mdy = pts[i].y - mouse.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 180) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(6,182,212,${0.15 * (1 - mdist / 180)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  draw();
})();

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
