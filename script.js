/*
 * Medien eintragen:
 * Lege deine Dateien in den Ordner "media/" und trage sie hier ein.
 * type: "image" oder "video", src: Pfad, caption: optionaler Text.
 * Sind keine Einträge vorhanden, wird ein Platzhalter angezeigt.
 */
const CONTENT = {
  start: {
    title: "Alles Gute!",
    items: [
    ],
  },
  smarties: {
    title: "Smarties",
    items: [
      { type: "image", src: "media/smarties/smartie.jfif", caption: "Ein letztes Mal muss ich das Thema mit den Smarties noch ansprechen. Ist schließlich ein erinnerungswürdiges Ereignis gewesen, das wir teilen." }
    ],
  },
  gamecube: {
    title: "GameCube",
    items: [
      { type: "video", src: "media/gamecube/mario.mp4", caption: "Ich erinnere mich immer gerne an unsere gemeinsamen Runden in Mario Kart. Egal ob auf dem alten Game Cube oder der Wii." },
      { type: "image", src: "media/gamecube/party.jfif", caption: "Apropo Wii... Unsere unzählbar vielen Runden Wii Party werde ich bestimmt auch nie vergessen" }
    ],
  },
  reisen: {
    title: "Flugzeug / Auto",
    items: [
      { type: "image", src: "media/reisen/siam.jfif", caption: "Bei unseren Familienurlauben haben wir manchmal schon echt verrückte Sachen gemacht." },
      { type: "image", src: "media/reisen/babel.jfif", caption: "Woanders haben wir zum Glück nur Schaustellern bei Stunts zugesehen." },
      { type: "image", src: "media/reisen/spree.jfif", caption: "Es musste auch nicht immer weit weg sein, ging ja schließlich hauptsächlich um eine schöne Zeit miteinander :)" },
      { type: "image", src: "media/reisen/udo.jfif", caption: "Dann ging es sogar mal exklusiv in den VIP Bereich bei Udo." },
      { type: "image", src: "media/reisen/dresden.jfif", caption: "Und wer hätte gedacht das ich heute mal in der Stadt wohnen darf. Jetzt kenn ich auch ein paar mehr Restaurants, kommt gerne mal rum :)" }
    ],
  },
  familie: {
    title: "Familie",
    items: [
      { type: "image", src: "media/familie/weihe.jfif", caption: "Schon lange bist du bei den großen Tagen mit dabei..." },
      { type: "image", src: "media/familie/schwan.jfif", caption: "Und ich hoffe das behalten wir immer so bei :)" },
      { type: "image", src: "media/familie/geschenk.jfif", caption: "Auch bei den kleineren Momenten waren wir oft zusammen." },
      { type: "image", src: "media/familie/pavarotti.jfif", caption: "7 Jahre auf den Tag genau. Ganz schön lange her und ganz schön viel passiert seit dem." },
      { type: "image", src: "media/familie/bounty.jfif", caption: "Sogar bei euch gab es in der Zwischenzeit Zuwachs." },
      { type: "image", src: "media/familie/grieche.jfif", caption: "In ein paar Tagen ist die Familie wieder zusammen, nur das wir jetzt sogar noch eine mehr sind..." },
      { type: "image", src: "media/familie/kloster.jfif", caption: "Dann können dieses Bild nochmal mit allen gemeinsam erneuern :)" }
    ],
  },
};

const mediaEl = document.getElementById("media");
const captionEl = document.getElementById("caption");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const tabs = document.querySelectorAll(".tab");

let current = "start";
let index = 0;

function render() {
  const group = CONTENT[current];
  const item = group.items[index];
  mediaEl.innerHTML = "";
  captionEl.textContent = "";

  if (!item) {
    const p = document.createElement("div");
    p.className = "placeholder";
    p.innerHTML = current === "start"
      ? '<span class="big">🎂 Happy Birthday! 🎈</span>Tippe unten auf ein Symbol'
      : `<span class="big">${group.title}</span>Hier kommen bald Fotos &amp; Videos 📸`;
    mediaEl.appendChild(p);
  } else if (item.type === "video") {
    const v = document.createElement("video");
    v.src = item.src; v.controls = true; v.playsInline = true; v.preload = "metadata";
    mediaEl.appendChild(v);
  } else {
    const bg = document.createElement("div");
    bg.className = "bg";
    bg.style.backgroundImage = `url("${item.src}")`;
    mediaEl.appendChild(bg);
    const img = document.createElement("img");
    img.src = item.src; img.alt = item.caption || group.title;
    mediaEl.appendChild(img);
  }
  if (item && item.caption) captionEl.textContent = item.caption;

  const n = group.items.length;
  prevBtn.hidden = nextBtn.hidden = n < 2;
  dotsEl.innerHTML = n > 1
    ? group.items.map((_, i) => `<span class="${i === index ? "on" : ""}"></span>`).join("")
    : "";
}

function select(name) {
  current = current === name ? "start" : name; // erneuter Klick -> zurück zum Start
  index = 0;
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === current));
  render();
}

function step(d) {
  const n = CONTENT[current].items.length;
  if (n < 2) return;
  index = (index + d + n) % n;
  render();
}

tabs.forEach(t => t.addEventListener("click", () => select(t.dataset.tab)));
prevBtn.addEventListener("click", () => step(-1));
nextBtn.addEventListener("click", () => step(1));

// Wischen
let x0 = null;
mediaEl.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
mediaEl.addEventListener("touchend", e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  x0 = null;
});

// Konfetti
const confetti = document.getElementById("confetti");
const colors = ["#ff5fa2", "#ffca28", "#29b6f6", "#7c4dff", "#3ddc97"];
for (let i = 0; i < 30; i++) {
  const c = document.createElement("i");
  c.style.left = Math.random() * 100 + "vw";
  c.style.background = colors[i % colors.length];
  c.style.animationDuration = 6 + Math.random() * 8 + "s";
  c.style.animationDelay = -Math.random() * 14 + "s";
  confetti.appendChild(c);
}

render();
