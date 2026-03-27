function getPageParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || "home";
}

const roomFlow = [
  { page: "labo1/offensive-security-intro", lab: "Labo 1", title: "Offensive Security Intro" },
  { page: "labo1/defensive-security-intro", lab: "Labo 1", title: "Defensive Security Intro" },
  { page: "labo1/search-skills", lab: "Labo 1", title: "Search Skills" },
  { page: "labo1/linux-fundamentals-part-1", lab: "Labo 1", title: "Linux Fundamentals Part 1" },
  { page: "labo1/windows-fundamentals-1", lab: "Labo 1", title: "Windows Fundamentals 1" },
  { page: "labo1/windows-fundamentals-2", lab: "Labo 1", title: "Windows Fundamentals 2" },
  { page: "labo1/windows-fundamentals-3", lab: "Labo 1", title: "Windows Fundamentals 3" },
  { page: "labo2/careers-in-cyber", lab: "Labo 2", title: "Careers in Cyber" },
  { page: "labo2/what-is-networking", lab: "Labo 2", title: "What is Networking?" },
  { page: "labo2/dns-in-detail", lab: "Labo 2", title: "DNS in detail" },
  { page: "labo2/http-in-detail", lab: "Labo 2", title: "HTTP in Detail" },
  { page: "labo2/how-websites-work", lab: "Labo 2", title: "How Websites Work" },
  { page: "labo2/putting-it-all-together", lab: "Labo 2", title: "Putting it all together" },
  { page: "labo3/networking-concepts", lab: "Labo 3", title: "Networking Concepts" },
  { page: "labo3/cryptography-basics", lab: "Labo 3", title: "Cryptography Basics" },
  { page: "labo3/moniker-link-cve-2024-21413", lab: "Labo 3", title: "Moniker Link (CVE-2024-21413)" },
  { page: "labo3/metasploit-introduction", lab: "Labo 3", title: "Metasploit: Introduction" },
  { page: "labo3/blue", lab: "Labo 3", title: "Blue" },
  { page: "labo3/web-application-basics", lab: "Labo 3", title: "Web Application Basics" },
  { page: "labo3/owasp-top-10-2025-iaaa-failures", lab: "Labo 3", title: "OWASP Top 10 2025: IAAA Failures" },
  { page: "labo3/owasp-top-10-2025-application-design-flaws", lab: "Labo 3", title: "OWASP Top 10 2025: Application Design Flaws" },
  { page: "labo3/owasp-top-10-2025-insecure-data-handling", lab: "Labo 3", title: "OWASP Top 10 2025: Insecure Data Handling" },
  { page: "labo3/common-attacks", lab: "Labo 3", title: "Common Attacks" }
];

function createNavBtn(label, targetPage, kind = "ghost") {
  if (!targetPage) return `<span class="room-nav-btn is-disabled">${label}</span>`;
  return `<a class="room-nav-btn ${kind}" href="?page=${targetPage}">${label}</a>`;
}

function renderRoomNavigator(page) {
  const idx = roomFlow.findIndex(item => item.page === page);
  if (idx === -1) return;

  const content = document.getElementById("content");
  if (!content || content.querySelector(".room-nav-shell")) return;

  const current = roomFlow[idx];
  const prev = roomFlow[idx - 1];
  const next = roomFlow[idx + 1];
  const progress = `${idx + 1} / ${roomFlow.length}`;

  const nav = document.createElement("section");
  nav.className = "room-nav-shell";
  nav.innerHTML = `
    <div class="room-nav-meta">
      <span class="room-nav-chip">${current.lab}</span>
      <span class="room-nav-title">${current.title}</span>
      <span class="room-nav-progress">${progress}</span>
    </div>
    <div class="room-nav-actions">
      ${createNavBtn("← Room précédente", prev?.page)}
      ${createNavBtn("Toutes les rooms", "rooms", "solid")}
      ${createNavBtn("Room suivante →", next?.page)}
    </div>
  `;

  content.appendChild(nav);
}

function setPageDataset() {
  document.documentElement.dataset.page = getPageParam();
}

function setActiveNavLink() {
  const page = getPageParam();
  const links = document.querySelectorAll('.navbar a.nav-link[href^="?page="]');
  links.forEach(a => {
    const href = a.getAttribute("href") || "";
    const m = href.match(/^\?page=([^#]+)/);
    const target = m?.[1];
    if (!target) return;
    a.classList.toggle("active", target === page);
    a.setAttribute("aria-current", target === page ? "page" : "false");
  });
}

function isReducedMotion() {
  return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initScrollProgress() {
  if (isReducedMotion()) return;
  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  let ticking = false;
  const update = () => {
    ticking = false;
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - doc.clientHeight);
    const p = Math.min(1, Math.max(0, doc.scrollTop / max));
    bar.style.setProperty("--p", String(p));
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  update();
}

function initCardTilt() {
  if (isReducedMotion()) return;

  const apply = (card, e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--mx", String(x));
    card.style.setProperty("--my", String(y));
    card.classList.add("tilting");
  };

  const clear = (card) => {
    card.classList.remove("tilting");
    card.style.removeProperty("--mx");
    card.style.removeProperty("--my");
  };

  const bind = (root) => {
    root.querySelectorAll(".room-card, .feature, .card").forEach(card => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "1";
      card.addEventListener("mousemove", (e) => apply(card, e));
      card.addEventListener("mouseleave", () => clear(card));
    });
  };

  const content = document.getElementById("content");
  if (content) bind(content);

  const obs = new MutationObserver(() => {
    const c = document.getElementById("content");
    if (c) bind(c);
  });
  obs.observe(document.body, { childList: true, subtree: true });
}

function initHomeParallax() {
  if (isReducedMotion()) return;
  if (getPageParam() !== "home") return;

  const hero = document.querySelector(".hero[data-parallax]");
  if (!hero) return;

  const onMove = (e) => {
    const r = hero.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    hero.style.setProperty("--px", String(Math.max(-1, Math.min(1, dx))));
    hero.style.setProperty("--py", String(Math.max(-1, Math.min(1, dy))));
  };

  window.addEventListener("mousemove", onMove, { passive: true });
}

function initHomeNetworkCanvas() {
  if (isReducedMotion()) return;
  if (getPageParam() !== "home") return;

  const canvas = document.querySelector(".hero .hero-canvas");
  const hero = document.querySelector(".hero");
  if (!canvas || !hero) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let raf = 0;

  const rand = (a, b) => a + Math.random() * (b - a);

  const nodes = Array.from({ length: 38 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: rand(-0.08, 0.08),
    vy: rand(-0.07, 0.07),
    r: rand(1.2, 2.2)
  }));

  function resize() {
    const r = hero.getBoundingClientRect();
    w = Math.max(1, Math.floor(r.width));
    h = Math.max(1, Math.floor(r.height));
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function step(t) {
    ctx.clearRect(0, 0, w, h);

    // subtle gradient wash
    const g = ctx.createRadialGradient(w * 0.25, h * 0.1, 0, w * 0.25, h * 0.1, Math.max(w, h) * 0.9);
    g.addColorStop(0, "rgba(46,229,157,0.10)");
    g.addColorStop(0.55, "rgba(0,194,255,0.08)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // move nodes
    nodes.forEach(n => {
      n.x += n.vx / 60;
      n.y += n.vy / 60;
      if (n.x < -0.05) n.x = 1.05;
      if (n.x > 1.05) n.x = -0.05;
      if (n.y < -0.05) n.y = 1.05;
      if (n.y > 1.05) n.y = -0.05;
    });

    // links
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const ax = a.x * w;
      const ay = a.y * h;
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const bx = b.x * w;
        const by = b.y * h;
        const dx = ax - bx;
        const dy = ay - by;
        const dist = Math.hypot(dx, dy);
        const max = 160;
        if (dist > max) continue;
        const alpha = (1 - dist / max) * 0.22;
        ctx.strokeStyle = `rgba(46,229,157,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }

    // nodes
    nodes.forEach(n => {
      const x = n.x * w;
      const y = n.y * h;
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.beginPath();
      ctx.arc(x, y, n.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(0,194,255,0.12)";
      ctx.beginPath();
      ctx.arc(x, y, n.r * 2.2, 0, Math.PI * 2);
      ctx.fill();
    });

    raf = requestAnimationFrame(step);
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(hero);
  window.addEventListener("resize", resize, { passive: true });

  resize();
  raf = requestAnimationFrame(step);
}

function applyEntranceAnimations(root) {
  // Add reveal animation to common blocks
  root.querySelectorAll("h1, section, .room-card, .card, .alert, .hero, .feature").forEach((el, idx) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${Math.min(idx, 10) * 55}ms`);
  });
}

function observeReveal(root) {
  const els = root.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("in"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

function animateRouteSwap() {
  const content = document.getElementById("content");
  if (!content) return;

  // When router injects new HTML, fade/slide it in
  const obs = new MutationObserver(() => {
    setPageDataset();
    setActiveNavLink();

    content.classList.remove("route-in");
    // force reflow
    void content.offsetWidth;
    content.classList.add("route-in");

    applyEntranceAnimations(content);
    observeReveal(content);
    renderRoomNavigator(getPageParam());
  });
  obs.observe(content, { childList: true, subtree: true });
}

function initAnimations() {
  const content = document.getElementById("content");
  if (content) {
    applyEntranceAnimations(content);
    observeReveal(content);
  }
  setPageDataset();
  setActiveNavLink();
  animateRouteSwap();
  renderRoomNavigator(getPageParam());
  initScrollProgress();
  initCardTilt();
  initHomeParallax();
  initHomeNetworkCanvas();
}

document.addEventListener("DOMContentLoaded", initAnimations);

