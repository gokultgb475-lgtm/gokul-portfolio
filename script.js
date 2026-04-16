/* IMPROVED: Portfolio interactions */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
const isLiteMode = prefersReducedMotion || isCoarsePointer || window.innerWidth <= 900;

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const nav = $("#main-nav");
const navToggle = $(".nav-toggle");
const navMenu = $("#site-menu");
const navLinks = $$(".nav-links a");
const sections = $$("header[id], main section[id]");
const backToTop = $("#btt");

const getNavOffset = () => (nav ? nav.offsetHeight + 18 : 96);

function setMenuState(isOpen) {
  if (!nav || !navToggle || !navMenu) return;

  nav.classList.toggle("menu-open", isOpen);
  navMenu.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
}

function scrollToSection(hash) {
  const target = $(hash);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - getNavOffset();
  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

function setActiveLink(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

/* IMPROVED: Preloader */
(function runLoader() {
  const fill = $("#loader-fill");
  const pct = $("#loader-pct");
  const loader = $("#loader");

  if (!fill || !pct || !loader) return;

  let progress = 0;
  let completed = false;
  const minStep = isLiteMode ? 14 : 4;
  const maxStep = isLiteMode ? 20 : 10;
  const intervalMs = isLiteMode ? 42 : 65;

  const finishLoader = () => {
    if (completed) return;
    completed = true;
    progress = 100;
    fill.style.width = "100%";
    pct.textContent = "100%";
    window.setTimeout(() => loader.classList.add("done"), isLiteMode ? 160 : 460);
  };

  const timer = window.setInterval(() => {
    progress += Math.random() * maxStep + minStep;

    if (progress >= 100) {
      window.clearInterval(timer);
      finishLoader();
      return;
    }

    fill.style.width = `${progress}%`;
    pct.textContent = `${String(Math.round(progress)).padStart(3, "0")}%`;
  }, intervalMs);

  window.addEventListener("load", finishLoader, { once: true });
  window.setTimeout(finishLoader, 2200);
})();

/* IMPROVED: Typed text */
(function runTypedText() {
  const typedEl = $("#typed");
  if (!typedEl) return;

  const roles = [
    "Frontend roles",
    "Freelance projects",
    "React.js learning",
    "UI-focused collaboration",
  ];

  if (isLiteMode) {
    typedEl.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const word = roles[roleIndex];

    if (!deleting) {
      charIndex += 1;
      typedEl.textContent = `${word.slice(0, charIndex)}|`;

      if (charIndex === word.length) {
        deleting = true;
        window.setTimeout(type, 1500);
        return;
      }
    } else {
      charIndex -= 1;
      typedEl.textContent = `${word.slice(0, charIndex)}|`;

      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    window.setTimeout(type, deleting ? 36 : 85);
  };

  type();
})();

/* IMPROVED: Navigation behavior */
navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

document.addEventListener("click", (event) => {
  if (!nav || !navMenu || !navToggle) return;
  if (!nav.classList.contains("menu-open")) return;
  if (nav.contains(event.target)) return;
  setMenuState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    setMenuState(false);
  }
});

$$('a[href^="#"]').forEach((link) => {
  const hash = link.getAttribute("href");
  if (!hash || hash === "#") return;

  link.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToSection(hash);
    setMenuState(false);
  });
});

/* IMPROVED: Active nav highlight and sticky state */
function updateScrollUi() {
  const scrolled = window.scrollY > 24;
  nav?.classList.toggle("scrolled", scrolled);
  backToTop?.classList.toggle("on", window.scrollY > 540);
}

window.addEventListener("scroll", updateScrollUi, { passive: true });
updateScrollUi();

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.01,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* IMPROVED: Reveal on scroll */
const revealEls = $$(".reveal");

if (isLiteMode || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

/* IMPROVED: Particle background */
(function initParticles() {
  if (isLiteMode) return;

  const canvas = $("#particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let particles = [];
  const mouse = { x: -9999, y: -9999 };

  function buildParticles() {
    const count = Math.min(70, Math.max(26, Math.floor(window.innerWidth / 22)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      radius: Math.random() * 1.3 + 0.8,
    }));
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildParticles();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < -8) particle.x = width + 8;
      if (particle.x > width + 8) particle.x = -8;
      if (particle.y < -8) particle.y = height + 8;
      if (particle.y > height + 8) particle.y = -8;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(96, 165, 250, 0.42)";
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(94, 234, 212, ${0.085 * (1 - distance / 130)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      const mouseDistance = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y);

      if (mouseDistance < 160) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(251, 113, 133, ${0.11 * (1 - mouseDistance / 160)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    window.requestAnimationFrame(draw);
  }

  resizeCanvas();
  draw();

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener(
    "mousemove",
    (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    },
    { passive: true }
  );
})();

/* IMPROVED: Contact form mail action */
(function initContactForm() {
  const form = $("#contact-form");
  const response = $("#form-response");

  if (!form || !response) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      response.textContent = "Please complete all fields before sending your message.";
      response.classList.add("error");
      return;
    }

    const emailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    response.classList.remove("error");
    response.textContent = "Opening your email app with your message...";

    const mailtoUrl =
      `mailto:gokultgb475@gmail.com?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;
    form.reset();
  });
})();

/* IMPROVED: Back to top */
backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
});

/* IMPROVED: Footer year */
const yearEl = $("#year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
