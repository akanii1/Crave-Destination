/* Builds the page from content.js. You normally don't need to edit this file. */
const $ = id => document.getElementById(id);
const S = SITE;

/* Picture path helper (adds imageFolder unless it's a full web link) */
const path = f => /^(https?:|data:)/.test(f) ? f : (S.imageFolder || "") + f;

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

document.title = S.pageTitle;

/* NAV */
$("nav").innerHTML = S.nav.map(n => `<a href="${n.href}">${n.label}</a>`).join("");

/* HERO */
const h = S.hero;
$("hero").innerHTML = `
  <div class="reveal">
    <img class="logo float" src="${path(h.logo)}" data-emoji="${h.logoEmoji}" alt="${h.name} Logo" onerror="fix(this)">
    <h1 class="grad">${h.name}</h1>
    <p class="serif" style="font-size:clamp(1.7rem,4vw,2.4rem);font-weight:600;margin-bottom:.6rem">${h.subtitle}</p>
    <p style="font-size:1.3rem;font-style:italic;color:var(--brown);margin-bottom:2.2rem">${h.tagline}</p>
    <div style="display:flex;gap:1rem;flex-wrap:wrap">
      ${h.buttons.map(b => `<a href="${b.href}" class="btn ${b.style === "ghost" ? "btn-ghost" : ""}">${b.label}</a>`).join("")}
    </div>
  </div>
  <div class="reveal"><div class="blobimg">${im(h.image, h.imageAlt)}</div></div>`;

/* SPECIAL */
$("special").innerHTML = `
  <h2 class="title reveal">${title(S.special.title, S.special.accent)}</h2>
  <div class="g3 center">
    ${S.special.cards.map((c, i) => `
      <div class="card reveal" style="transition-delay:${i * .15}s">
        ${im(c.icon, c.title + " icon", ICON, c.emoji)}
        <h3>${c.title}</h3><p>${c.text}</p>
      </div>`).join("")}
  </div>`;

/* MARQUEE */
$("marq").innerHTML = ("<span>✦</span>" + S.marquee.join("<span>✦</span>")).repeat(8);

/* BANNER */
$("banner").innerHTML = `
  <h3 class="serif reveal" style="font-size:clamp(2rem,5vw,3.2rem);font-weight:800;margin-bottom:.8rem">${title(S.banner.title, S.banner.accent)}</h3>
  <p class="reveal" style="font-size:1.25rem;color:var(--caramel)">${S.banner.text}</p>`;

/* CUSTOMERS */
$("customers").innerHTML = `
  <h2 class="title reveal" style="font-size:clamp(1.7rem,4vw,2.6rem)">${S.customers.title}</h2>
  <div class="g3">
    ${S.customers.photos.map((p, i) => `<div class="photo reveal" style="transition-delay:${(i + 1) * .12}s">${im(p.img, p.alt)}</div>`).join("")}
  </div>
  <p class="center" style="font-size:.9rem;font-style:italic;color:var(--brown);margin-top:2rem">${S.customers.note}</p>`;

/* PRODUCT */
const P = S.product;
$("product").innerHTML = `
  <h2 class="title reveal" style="margin-bottom:.4rem">${P.title}</h2>
  <h3 class="serif reveal" style="font-size:1.8rem;color:var(--caramel);margin-bottom:2.5rem">${P.ingredientsTitle}</h3>
  <div class="ingr">
    ${P.ingredients.map((g, i) => `<div class="card reveal" style="transition-delay:${i * .05}s">${im(g.img, g.name + " Ingredient")}<p>${g.name}</p></div>`).join("")}
  </div>`;

/* ABOUT US */
const A = S.about;
$("aboutus").innerHTML = `
  <h2 class="title reveal">${title(A.title, A.accent)}</h2>
  <div class="mvo-grid">
    ${A.cards.map((c, i) => `
      <div class="mvo reveal" style="transition-delay:${i * .15}s">
        <div class="ico">${c.icon}</div><div class="bar"></div>
        <h3>${c.title}</h3>
        ${c.list ? `<ul>${c.list.map(l => `<li>${l}</li>`).join("")}</ul>` : `<p>${c.text}</p>`}
      </div>`).join("")}
  </div>
  <div class="photo reveal" style="max-width:1000px;margin:0 auto">${im(A.orgChart.img, A.orgChart.alt, "height:auto")}</div>
  <div class="reveal" style="margin-top:3rem">
    <p style="font-size:1.3rem;font-weight:700;margin-bottom:1rem">${A.facebook.heading}</p>
    <a href="${A.facebook.url}" target="_blank" class="btn btn-ghost">${A.facebook.label}</a>
  </div>`;

/* PERMITS */
$("permits").innerHTML = `
  <h2 class="title reveal">${title(S.permits.title, S.permits.accent)}</h2>
  <div class="permits">
    ${S.permits.photos.map((p, i) => `<div class="photo reveal ar34" style="transition-delay:${i * .1}s">${im(p.img, p.alt)}</div>`).join("")}
  </div>`;

/* FOOTER */
$("footer").innerHTML = `<p>${S.footer}</p>`;

/* Floating crumbs (background) */
for (let i = 0; i < 26; i++) {
  const c = document.createElement("i");
  c.className = "crumb";
  const s = 4 + Math.random() * 9;
  c.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s}px;opacity:${.25 + Math.random() * .5};animation-duration:${10 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s`;
  $("crumbs").appendChild(c);
}

/* Scroll reveal (also triggers Mission / Vision / Objective animations) */
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
