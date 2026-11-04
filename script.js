/* Builds every page from content.js. You normally don't need to edit this file.
   Each .html page has <body data-page="..."> which tells this file which section to draw. */
const $ = id => document.getElementById(id);
const S = SITE;
const PAGE = document.body.dataset.page;
const pages = S.pages;
const idx = pages.findIndex(p => p.key === PAGE);
const here = pages[idx];

/* Picture path helper (adds imageFolder unless it's a full web link) */
const path = f => /^(https?:|data:)/.test(f) ? f : (S.imageFolder || "") + f;
const isWeb = u => /^https?:/.test(u);
const ext = u => isWeb(u) ? ' target="_blank" rel="noopener"' : "";

/* Fallback when a picture is missing: emoji for icons, labelled block for photos */
function fix(img) {
  img.onerror = null;
  if (img.dataset.emoji) {
    const s = document.createElement("span");
    s.textContent = img.dataset.emoji;
    s.style.cssText = "display:block;font-size:3.6rem;margin-bottom:1rem";
    img.replaceWith(s);
    return;
  }
  const t = (img.alt || "Photo").replace(/&/g, "and");
  img.src = "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500"><rect width="400" height="500" fill="#C08552"/><text x="200" y="260" font-size="24" fill="#4B2E2B" text-anchor="middle" font-family="sans-serif">${t}</text></svg>`);
}
const im = (src, alt = "", st = "", emoji = "") =>
  `<img src="${path(src)}" alt="${alt}" style="${st}" ${emoji ? `data-emoji="${emoji}"` : ""} onerror="fix(this)">`;
const title = (t, a) => `${t} <span class="grad">${a}</span>`;
const ICON = "height:64px;width:64px;margin:0 auto 1rem;object-fit:contain";

document.title = PAGE === "home" ? S.pageTitle : `${here.title} | ${S.hero.name}`;

/* =====================================================================
   NAVIGATION (same on every page)
   ===================================================================== */

/* HEADER: logo link + menu. On small screens the menu opens from a button. */
$("site-head").innerHTML = `
  <a class="brand" href="${pages[0].file}">
    <img src="${path(S.hero.logo)}" alt="" onerror="this.remove()">
    <span>${S.hero.name}</span>
  </a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
  <nav class="site-nav" id="site-nav" aria-label="Main">
    ${pages.map(p => `<a href="${p.file}"${p.key === PAGE ? ' aria-current="page"' : ""}>${p.label}</a>`).join("")}
  </nav>`;

const head = $("site-head"), btn = head.querySelector(".menu-btn");
const setMenu = open => {
  head.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", open);
  btn.textContent = open ? "Close" : "Menu";
};
btn.addEventListener("click", () => setMenu(!head.classList.contains("open")));
document.addEventListener("click", e => { if (!head.contains(e.target)) setMenu(false); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && head.classList.contains("open")) { setMenu(false); btn.focus(); }
});

/* PREVIOUS / NEXT (every page except Home) */
if ($("pager") && idx > 0) {
  const prev = pages[idx - 1];
  const next = pages[idx + 1] || pages[0];
  const last = !pages[idx + 1];
  $("pager").innerHTML = `
    <a class="pg-link prev" rel="prev" href="${prev.file}"><span class="pg-dir">Previous</span><span class="pg-name">${prev.title}</span></a>
    <a class="pg-link next" rel="next" href="${next.file}"><span class="pg-dir">${last ? "Back to start" : "Next"}</span><span class="pg-name">${next.title}</span></a>`;
}

/* FOOTER: every page + Facebook */
$("footer").innerHTML = `
  <div class="wrap">
    <p class="foot-name serif">${S.hero.name}</p>
    <nav class="foot-nav" aria-label="Footer">
      ${pages.map(p => `<a href="${p.file}"${p.key === PAGE ? ' aria-current="page"' : ""}>${p.label}</a>`).join("")}
      <a href="${S.about.facebook.url}"${ext(S.about.facebook.url)}>Facebook</a>
    </nav>
    <p>${S.footer}</p>
  </div>`;

/* =====================================================================
   PAGE CONTENT
   ===================================================================== */
const R = {

  /* HOME: hero, scrolling strip, dark banner, list of pages */
  home() {
    const h = S.hero;
    $("hero").innerHTML = `
      <div class="reveal">
        <img class="logo float" src="${path(h.logo)}" data-emoji="${h.logoEmoji}" alt="${h.name} Logo" onerror="fix(this)">
        <h1 class="grad">${h.name}</h1>
        <p class="serif" style="font-size:clamp(1.7rem,4vw,2.4rem);font-weight:600;margin-bottom:.6rem">${h.subtitle}</p>
        <p style="font-size:1.3rem;font-style:italic;color:var(--brown);margin-bottom:2.2rem">${h.tagline}</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap">
          ${h.buttons.map(b => `<a href="${b.href}"${ext(b.href)} class="btn ${b.style === "ghost" ? "btn-ghost" : ""}">${b.label}</a>`).join("")}
        </div>
      </div>
      <div class="reveal"><div class="blobimg">${im(h.image, h.imageAlt)}</div></div>`;

    $("marq").innerHTML = ("<span>✦</span>" + S.marquee.join("<span>✦</span>")).repeat(8);

    $("banner").innerHTML = `
      <h2 class="serif reveal" style="font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin-bottom:.8rem">${title(S.banner.title, S.banner.accent)}</h2>
      <p class="reveal" style="font-size:1.25rem;color:var(--caramel)">${S.banner.text}</p>`;

    $("explore-list").innerHTML = `
      <h2 class="title reveal">${title(S.explore.title, S.explore.accent)}</h2>
      <div class="explore">
        ${pages.filter(p => p.key !== "home").map((p, i) => `
          <a class="card explore-row reveal" href="${p.file}" style="transition-delay:${i * .08}s">
            <span class="row-ico" aria-hidden="true">${p.emoji}</span>
            <span><h3>${p.title}</h3><p>${p.blurb}</p></span>
          </a>`).join("")}
      </div>`;
  },

  /* WHAT MAKES IT SPECIAL */
  special() {
    $("content").innerHTML = `
      <h1 class="title reveal">${title(S.special.title, S.special.accent)}</h1>
      <div class="g3 center">
        ${S.special.cards.map((c, i) => `
          <div class="card reveal" style="transition-delay:${i * .15}s">
            ${im(c.icon, c.title + " icon", ICON, c.emoji)}
            <h2>${c.title}</h2><p>${c.text}</p>
          </div>`).join("")}
      </div>`;
  },

  /* CUSTOMERS */
  customers() {
    $("content").innerHTML = `
      <h1 class="title reveal" style="font-size:clamp(1.7rem,4vw,2.6rem)">${S.customers.title}</h1>
      <div class="g3">
        ${S.customers.photos.map((p, i) => `<div class="photo reveal" style="transition-delay:${(i + 1) * .12}s">${im(p.img, p.alt)}</div>`).join("")}
      </div>
      <p class="center" style="font-size:.9rem;font-style:italic;color:var(--brown);margin-top:2rem">${S.customers.note}</p>`;
  },

  /* PRODUCT */
  product() {
    const P = S.product;
    $("content").innerHTML = `
      <div class="center">
        <h1 class="title reveal" style="margin-bottom:.4rem">${P.title}</h1>
        <h2 class="serif reveal" style="font-size:1.8rem;color:var(--caramel);margin-bottom:2.5rem">${P.ingredientsTitle}</h2>
      </div>
      <div class="ingr">
        ${P.ingredients.map((g, i) => `<div class="card reveal" style="transition-delay:${i * .05}s">${im(g.img, g.name + " Ingredient")}<p>${g.name}</p></div>`).join("")}
      </div>`;
  },

  /* ABOUT US: Mission / Vision / Objective, org chart, Facebook, with jump links */
  about() {
    const A = S.about;
    $("content").innerHTML = `
      <h1 class="title reveal" style="margin-bottom:1.6rem">${title(A.title, A.accent)}</h1>
      <nav class="jump" aria-label="On this page">
        <a href="#mission-vision">${A.cards.map(c => c.title).join(", ")}</a>
        <a href="#org-chart">${A.orgChart.title}</a>
        <a href="#facebook">Facebook</a>
      </nav>
      <div class="mvo-grid" id="mission-vision">
        ${A.cards.map((c, i) => `
          <div class="mvo reveal" style="transition-delay:${i * .15}s">
            <div class="ico">${c.icon}</div><div class="bar"></div>
            <h2>${c.title}</h2>
            ${c.list ? `<ul>${c.list.map(l => `<li>${l}</li>`).join("")}</ul>` : `<p>${c.text}</p>`}
          </div>`).join("")}
      </div>
      <section class="anchor center" id="org-chart" style="padding:0">
        <h2 class="title reveal" style="font-size:clamp(1.7rem,4vw,2.6rem);margin-bottom:1.6rem">${A.orgChart.title}</h2>
        <a class="photo reveal" href="${path(A.orgChart.img)}" target="_blank" rel="noopener" style="max-width:1000px;margin:0 auto" title="Open full size">${im(A.orgChart.img, A.orgChart.alt, "height:auto")}</a>
        <p class="note">${A.orgChart.note}</p>
      </section>
      <section class="anchor center reveal" id="facebook" style="padding:0;margin-top:4rem">
        <p style="font-size:1.3rem;font-weight:700;margin-bottom:1rem">${A.facebook.heading}</p>
        <a href="${A.facebook.url}" target="_blank" rel="noopener" class="btn btn-ghost">${A.facebook.label}</a>
      </section>`;
  },

  /* BUSINESS PERMITS */
  permits() {
    const Pm = S.permits;
    $("content").innerHTML = `
      <div class="center">
        <h1 class="title reveal" style="margin-bottom:.8rem">${title(Pm.title, Pm.accent)}</h1>
        <p class="note reveal" style="margin:0 0 2.6rem">${Pm.note}</p>
      </div>
      <div class="permits">
        ${Pm.photos.map((p, i) => `
          <figure class="reveal" style="transition-delay:${i * .1}s">
            <a class="photo" href="${path(p.img)}" target="_blank" rel="noopener" title="Open full size">${im(p.img, p.alt)}</a>
            <figcaption>${p.alt}</figcaption>
          </figure>`).join("")}
      </div>`;
  }
};
R[PAGE]();

/* Floating crumbs (background) */
for (let i = 0; i < 26; i++) {
  const c = document.createElement("i");
  c.className = "crumb";
  const s = 4 + Math.random() * 9;
  c.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s}px;opacity:${.25 + Math.random() * .5};animation-duration:${10 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s`;
  $("crumbs").appendChild(c);
}

/* Reveal as items scroll into view (also starts the Mission / Vision / Objective animations) */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* 3D tilt on Mission / Vision / Objective cards */
document.querySelectorAll(".mvo").forEach(c => {
  c.addEventListener("mousemove", e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `translateY(-10px) scale(1.03) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  });
  c.addEventListener("mouseleave", () => c.style.transform = "");
});
