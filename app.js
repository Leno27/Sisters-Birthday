/* Logik der Seite. Inhalte (Bilder, Videos, Texte) stehen in script.js */

/* ---------- Kategorien & Farben ---------- */
const CATEGORIES = [
  { key: "smarties", name: "Smarties",        hue: "#3b6cf6", hue2: "#6a8dff", soft: "#e8eeff" },
  { key: "gamecube", name: "GameCube",        hue: "#8a4dff", hue2: "#b183ff", soft: "#f0e8ff" },
  { key: "reisen",   name: "Reisen", hue: "#0fb59a", hue2: "#4fd8bf", soft: "#e0f8f3" },
  { key: "familie",  name: "Familie",         hue: "#ff7a45", hue2: "#ffa36f", soft: "#ffeee6" },
];

const board = document.getElementById("board");
const viewer = document.getElementById("viewer");
const mediaEl = document.getElementById("media");
const captionEl = document.getElementById("caption");
const tagEl = document.getElementById("tag");
const countEl = document.getElementById("count");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

/* Kleine Vorschaubilder (media/thumbs/) schonen den Speicher des Handys */
const thumbOf = item => item.src.replace(/^media\/([^/]+)\/(.+)\.\w+$/, "media/thumbs/$1-$2.jpg");

/* ---------- Geöffnete Felder (nur lokal im Browser gemerkt) ---------- */
const STORE = "sister-birthday-opened-v1";
let opened = new Set();
try { opened = new Set(JSON.parse(localStorage.getItem(STORE) || "[]")); } catch (e) {}
const remember = () => { try { localStorage.setItem(STORE, JSON.stringify([...opened])); } catch (e) {} };

/* ---------- Felder aufbauen ---------- */
let counter = 0;
let total = 0;
CATEGORIES.forEach(cat => { total += (CONTENT[cat.key]?.items || []).length; });

CATEGORIES.forEach(cat => {
  const items = CONTENT[cat.key]?.items || [];
  if (!items.length) return;

  const sec = document.createElement("section");
  sec.className = `cat cat-${cat.key}`;
  sec.style.setProperty("--hue", cat.hue);
  sec.style.setProperty("--hue2", cat.hue2);
  sec.style.setProperty("--soft", cat.soft);

  const head = document.createElement("header");
  head.className = "cat-head";
  const icon = document.querySelector(`#icons [data-icon="${cat.key}"]`);
  head.innerHTML = `<span class="ico">${icon ? icon.innerHTML : ""}</span>
    <h2>${cat.name}</h2><span class="n">${items.length}</span>`;
  sec.appendChild(head);

  const grid = document.createElement("div");
  grid.className = "tiles";
  items.forEach((item, i) => {
    counter += 1;
    item._id = `${cat.key}-${i}`;
    const b = document.createElement("button");
    b.className = "tile";
    b.dataset.cat = cat.key;
    b.dataset.i = i;
    b.setAttribute("aria-label", `Feld ${counter} öffnen`);
    b.innerHTML = `<span class="num">${counter}</span><span class="check">✓</span>`;
    b.addEventListener("click", () => openViewer(cat.key, i, b));
    grid.appendChild(b);
    paintTile(b, item);
  });
  sec.appendChild(grid);
  board.appendChild(sec);
});

function paintTile(btn, item) {
  const done = opened.has(item._id);
  btn.classList.toggle("done", done);
  if (!done) return;
  if (item.type === "video") btn.classList.add("is-video");
  else btn.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,.3), rgba(0,0,0,0) 60%), url("${thumbOf(item)}")`;
}

function updateProgress() {
  const ids = new Set();
  CATEGORIES.forEach(c => (CONTENT[c.key]?.items || []).forEach(it => ids.add(it._id)));
  const n = [...opened].filter(id => ids.has(id)).length;
  progressBar.style.width = (total ? (n / total) * 100 : 0) + "%";
  progressText.textContent = n === 0
    ? `${total} Überraschungen warten – tippe ein Feld an`
    : n === total ? "Alles entdeckt – hoffentlich hat's dir gefallen 🎉"
    : `${n} von ${total} entdeckt`;
}
updateProgress();

/* ---------- Betrachter ---------- */
let cur = { cat: null, i: 0, tile: null };

function show() {
  const cat = CATEGORIES.find(c => c.key === cur.cat);
  const items = CONTENT[cur.cat].items;
  const item = items[cur.i];
  const sheet = document.getElementById("sheet");
  sheet.style.setProperty("--hue", cat.hue);
  sheet.style.setProperty("--hue2", cat.hue2);
  sheet.style.setProperty("--soft", cat.soft);

  mediaEl.querySelectorAll("video").forEach(v => v.pause());
  mediaEl.innerHTML = "";
  if (item.type === "video") {
    const v = document.createElement("video");
    v.src = item.src; v.controls = true; v.playsInline = true; v.preload = "metadata";
    mediaEl.appendChild(v);
  } else {
    const bg = document.createElement("div");
    bg.className = "bg";
    bg.style.backgroundImage = `url("${thumbOf(item)}")`;
    const img = document.createElement("img");
    img.src = item.src; img.alt = item.caption || cat.name;
    mediaEl.append(bg, img);
  }
  tagEl.textContent = cat.name;
  captionEl.textContent = item.caption || "";
  captionEl.hidden = !item.caption;
  countEl.textContent = `${cur.i + 1} / ${items.length}`;
  prevBtn.hidden = nextBtn.hidden = items.length < 2;

  opened.add(item._id);
  remember();
  const tile = board.querySelector(`.tile[data-cat="${cur.cat}"][data-i="${cur.i}"]`);
  if (tile) paintTile(tile, item);
  updateProgress();
}

function openViewer(cat, i, tile) {
  cur = { cat, i, tile };
  tile.classList.add("pop");
  setTimeout(() => tile.classList.remove("pop"), 500);
  show();
  viewer.hidden = false;
  requestAnimationFrame(() => viewer.classList.add("on"));
  document.body.classList.add("lock");
  burst();
  document.getElementById("close").focus({ preventScroll: true });
}

function closeViewer() {
  mediaEl.querySelectorAll("video").forEach(v => v.pause());
  viewer.classList.remove("on");
  document.body.classList.remove("lock");
  setTimeout(() => { viewer.hidden = true; mediaEl.innerHTML = ""; }, 250);
  const t = board.querySelector(`.tile[data-cat="${cur.cat}"][data-i="${cur.i}"]`);
  if (t) t.focus({ preventScroll: true });
}

function step(d) {
  const n = CONTENT[cur.cat].items.length;
  if (n < 2) return;
  cur.i = (cur.i + d + n) % n;
  show();
}

document.getElementById("close").addEventListener("click", closeViewer);
document.getElementById("veil").addEventListener("click", closeViewer);
prevBtn.addEventListener("click", () => step(-1));
nextBtn.addEventListener("click", () => step(1));
document.addEventListener("keydown", e => {
  if (viewer.hidden) return;
  if (e.key === "Escape") closeViewer();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

let x0 = null;
mediaEl.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
mediaEl.addEventListener("touchend", e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  x0 = null;
});

/* ---------- Konfetti-Burst beim Öffnen ---------- */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let parts = [], raf = 0;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function fit() { canvas.width = innerWidth; canvas.height = innerHeight; }
addEventListener("resize", fit);
fit();

function burst() {
  if (reduce) return;
  const cat = CATEGORIES.find(c => c.key === cur.cat);
  const colors = [cat.hue, cat.hue2, "#ffcc33", "#ff5fa2", "#ffffff"];
  const r = cur.tile.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  for (let k = 0; k < 26; k++) {
    const a = Math.random() * Math.PI * 2, s = 3 + Math.random() * 6;
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3, w: 5 + Math.random() * 5, h: 3 + Math.random() * 4,
      rot: Math.random() * 6, vr: (Math.random() - .5) * .4, life: 1, c: colors[k % colors.length] });
  }
  if (!raf) raf = requestAnimationFrame(tick);
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  parts = parts.filter(p => p.life > 0);
  parts.forEach(p => {
    p.vy += .22; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.rot += p.vr; p.life -= .016;
    ctx.save();
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.c;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });
  raf = parts.length ? requestAnimationFrame(tick) : 0;
}
