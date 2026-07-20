/* Sivun toiminnallisuus — sisältö tulee js/config.js-tiedostosta. */
"use strict";

const $ = (id) => document.getElementById(id);

/* ═══════════ TEKSTIEN ASETTELU ═══════════ */
$("hero-name").textContent = CONFIG.heroName;
$("hero-subtitle").textContent = CONFIG.heroSubtitle;
$("scratch-title").textContent = CONFIG.scratchTitle;
$("letter-title").textContent = CONFIG.letterTitle;
$("letter-text").textContent = CONFIG.letterText;
$("together-title").textContent = CONFIG.togetherTitle;
$("together-subtitle").textContent = CONFIG.togetherSubtitle;
$("lovelist-title").textContent = CONFIG.loveListTitle;
$("lovelist-subtitle").textContent = CONFIG.loveListSubtitle;
$("gallery-title").textContent = CONFIG.galleryTitle;
$("gallery-subtitle").textContent = CONFIG.gallerySubtitle;
$("quiz-title").textContent = CONFIG.quizTitle;
$("quiz-subtitle").textContent = CONFIG.quizSubtitle;
$("memory-title").textContent = CONFIG.memoryTitle;
$("memory-subtitle").textContent = CONFIG.memorySubtitle;
$("wheel-title").textContent = CONFIG.wheelTitle;
$("wheel-subtitle").textContent = CONFIG.wheelSubtitle;
$("bday-title").textContent = CONFIG.bdayTitle;
$("bday-front-text").textContent = CONFIG.bdayFrontText;
$("bday-inside-text").textContent = CONFIG.bdayInsideText;
$("footer-text").textContent = CONFIG.footerText;

/* ═══════════ SALASANAPORTTI ═══════════ */
(() => {
  const gate = $("gate");
  const box = gate.querySelector(".gate-box");
  const input = $("gate-input");
  const wrong = $("gate-wrong");

  $("gate-title").textContent = CONFIG.gateTitle;
  $("gate-hint").textContent = CONFIG.gateHint;
  $("gate-button").textContent = CONFIG.gateButton;
  input.placeholder = CONFIG.gatePlaceholder;

  const unlock = () => {
    gate.classList.add("unlocked");
    document.body.classList.remove("locked");
    setTimeout(() => gate.remove(), 800);
  };

  if (sessionStorage.getItem("gate-open") === "1") {
    unlock();
  } else {
    document.body.classList.add("locked");
  }

  let wrongCount = 0;
  $("gate-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const digits = input.value.replace(/\D/g, "");
    if (digits && CONFIG.gatePasswords.includes(digits)) {
      sessionStorage.setItem("gate-open", "1");
      unlock();
      setTimeout(() => confetti(innerWidth / 2, innerHeight / 3, 120), 300);
    } else {
      wrong.textContent = CONFIG.gateWrongTexts[wrongCount % CONFIG.gateWrongTexts.length];
      wrong.classList.remove("hidden");
      wrongCount++;
      box.classList.remove("shake");
      void box.offsetWidth; // käynnistä animaatio uudelleen
      box.classList.add("shake");
      input.select();
    }
  });
})();

/* ═══════════ LEIJUVAT SYDÄMET (tausta) ═══════════ */
(() => {
  const canvas = $("hearts-bg");
  const ctx = canvas.getContext("2d");
  let hearts = [];

  const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };
  addEventListener("resize", resize);
  resize();

  const spawn = () => ({
    x: Math.random() * canvas.width,
    y: canvas.height + 30,
    size: 8 + Math.random() * 16,
    speed: 0.3 + Math.random() * 0.7,
    drift: (Math.random() - 0.5) * 0.4,
    alpha: 0.25 + Math.random() * 0.35,
    rot: Math.random() * Math.PI * 2,
  });

  for (let i = 0; i < 18; i++) {
    const h = spawn();
    h.y = Math.random() * canvas.height;
    hearts.push(h);
  }

  const drawHeart = (x, y, s, rot, alpha) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(s / 30, s / 30);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#ef6a7d";
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.bezierCurveTo(-22, -8, -8, -24, 0, -10);
    ctx.bezierCurveTo(8, -24, 22, -8, 0, 10);
    ctx.fill();
    ctx.restore();
  };

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((h) => {
      h.y -= h.speed;
      h.x += h.drift;
      h.rot += 0.003;
      if (h.y < -40) Object.assign(h, spawn());
      drawHeart(h.x, h.y, h.size, h.rot, h.alpha);
    });
    requestAnimationFrame(tick);
  };
  tick();
})();

/* ═══════════ KONFETIT ═══════════ */
const confetti = (() => {
  const canvas = $("confetti-canvas");
  const ctx = canvas.getContext("2d");
  const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#c77dff", "#ff8fa3"];
  let parts = [];
  let running = false;

  const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };
  addEventListener("resize", resize);
  resize();

  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts = parts.filter((p) => p.life > 0);
    parts.forEach((p) => {
      p.vy += 0.12;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.min(1, p.life / 40);
      if (p.emoji) {
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
      }
      ctx.restore();
    });
    if (parts.length) requestAnimationFrame(tick);
    else running = false;
  };

  const spawn = (x, y, count, emojis) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const power = 3 + Math.random() * 9;
      parts.push({
        x, y,
        vx: Math.cos(angle) * power,
        vy: Math.sin(angle) * power - 4,
        vr: (Math.random() - 0.5) * (emojis ? 0.12 : 0.3),
        rot: emojis ? (Math.random() - 0.5) * 0.6 : Math.random() * Math.PI,
        size: emojis ? 20 + Math.random() * 18 : 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: emojis ? emojis[Math.floor(Math.random() * emojis.length)] : null,
        life: 90 + Math.random() * 60,
      });
    }
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  };

  const fire = (x = innerWidth / 2, y = innerHeight / 2, count = 140) =>
    spawn(x, y, count, null);
  fire.emoji = (x, y, count, emojis) => spawn(x, y, count, emojis);
  return fire;
})();

/* ═══════════ KAKKU JA KYNTTILÄT ═══════════ */
(() => {
  $("cake-title").textContent = CONFIG.cakeTitle;
  $("cake-subtitle").textContent = CONFIG.cakeSubtitle;
  $("cake-text").textContent = CONFIG.cakeText;
  const holder = $("candles");
  const doneEl = $("cake-done");
  let out = 0;

  for (let i = 0; i < CONFIG.cakeCandles; i++) {
    const candle = document.createElement("button");
    candle.className = "candle";
    candle.setAttribute("aria-label", "Sammuta kynttilä");
    candle.innerHTML = '<span class="flame"></span>';
    candle.addEventListener("click", () => {
      if (candle.classList.contains("out")) return;
      candle.classList.add("out");
      out++;
      if (out === CONFIG.cakeCandles) {
        doneEl.textContent = CONFIG.cakeDoneText;
        doneEl.classList.remove("hidden");
        const r = holder.getBoundingClientRect();
        confetti(r.left + r.width / 2, r.top, 160);
      }
    });
    holder.appendChild(candle);
  }
})();

/* ═══════════ RAAPUTUSKUVA ═══════════ */
(() => {
  const wrap = document.querySelector(".scratch-wrap");
  const photo = $("scratch-photo");
  const canvas = $("scratch-canvas");
  const hint = $("scratch-hint");
  const ctx = canvas.getContext("2d");
  let revealed = false;
  let scratching = false;

  photo.src = CONFIG.scratchPhoto;
  photo.onerror = () => {
    // Paikkamerkki kunnes oikea kuva lisätään
    photo.removeAttribute("src");
    photo.style.background = "linear-gradient(140deg,#f7b2c1,#d6748c)";
    photo.alt = "Lisää kuva: " + CONFIG.scratchPhoto;
  };

  const paintCover = () => {
    if (revealed) return;
    if (!wrap.clientWidth || !wrap.clientHeight) return;
    canvas.width = wrap.clientWidth;
    canvas.height = wrap.clientHeight;
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    g.addColorStop(0, "#b91d4b");
    g.addColorStop(1, "#8f1e3c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // pieni pistekuviointi
    ctx.fillStyle = "rgba(255,255,255,0.07)";
    for (let x = 10; x < canvas.width; x += 14) {
      for (let y = 10; y < canvas.height; y += 14) {
        if (Math.random() > 0.5) ctx.fillRect(x, y, 3, 3);
      }
    }
    ctx.globalCompositeOperation = "destination-out";
  };
  paintCover();
  addEventListener("load", paintCover);
  // Uudelleenmitoitus tyhjentäisi raaputuksen, joten piirretään
  // peitto uusiksi vain jos raaputusta ei ole vielä aloitettu.
  let started = false;
  addEventListener("resize", () => { if (!started) paintCover(); });

  const pos = (e) => {
    const r = canvas.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  };

  let last = null;
  const scratch = (e) => {
    if (revealed || !scratching) return;
    started = true;
    if (!canvas.width) return;
    const { x, y } = pos(e);
    ctx.lineWidth = 110;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last ? last.x : x, last ? last.y : y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last = { x, y };
    hint.classList.add("faded");
    e.preventDefault();
  };

  const checkReveal = () => {
    if (revealed || !canvas.width || !canvas.height) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      if (data[i] === 0) cleared++;
    }
    if (cleared / (data.length / (4 * 24)) > 0.3) {
      revealed = true;
      canvas.style.transition = "opacity 0.8s ease";
      canvas.style.opacity = "0";
      confetti(innerWidth / 2, innerHeight / 3, 80);
      setTimeout(() => canvas.remove(), 900);
    }
  };

  const start = (e) => { scratching = true; last = null; scratch(e); };
  const end = () => { scratching = false; last = null; checkReveal(); };

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", scratch);
  addEventListener("mouseup", end);
  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", scratch, { passive: false });
  canvas.addEventListener("touchend", end);
})();

/* ═══════════ KIRJEKUORI ═══════════ */
(() => {
  const envelope = $("envelope");
  const cta = $("envelope-cta");
  const open = () => {
    const wasOpen = envelope.classList.toggle("open");
    cta.classList.toggle("faded", wasOpen);
    if (wasOpen) {
      const r = envelope.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top, 60);
    }
  };
  envelope.addEventListener("click", open);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });
})();

/* ═══════════ AIKAA YHDESSÄ ═══════════ */
(() => {
  const start = new Date(CONFIG.relationshipStart);
  const pad = (n) => String(n).padStart(2, "0");

  const update = () => {
    const now = new Date();
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) { years--; months += 12; }

    $("t-years").textContent = pad(Math.max(0, years));
    $("t-months").textContent = pad(Math.max(0, months));
    $("t-days").textContent = pad(Math.max(0, days));
    $("t-hours").textContent = pad(now.getHours() >= start.getHours()
      ? now.getHours() - start.getHours()
      : 24 + now.getHours() - start.getHours());
    $("t-minutes").textContent = pad((60 + now.getMinutes() - start.getMinutes()) % 60);
    $("t-seconds").textContent = pad((60 + now.getSeconds() - start.getSeconds()) % 60);
  };
  update();
  setInterval(update, 1000);
})();

/* ═══════════ KUKKANAPPI ═══════════ */
(() => {
  const btn = $("flower-btn");
  btn.textContent = CONFIG.flowerButtonText;
  btn.addEventListener("click", () => {
    const r = btn.getBoundingClientRect();
    confetti.emoji(r.left + r.width / 2, r.top + r.height / 2, 60, CONFIG.flowerEmojis);
    // sade ylhäältä pienellä viiveellä
    setTimeout(() => {
      confetti.emoji(innerWidth * 0.3, -20, 25, CONFIG.flowerEmojis);
      confetti.emoji(innerWidth * 0.7, -20, 25, CONFIG.flowerEmojis);
    }, 350);
  });
})();

/* ═══════════ RAKKAUSSIVUT ═══════════ */
(() => {
  const textEl = $("love-page-text");
  const dotsEl = $("love-dots");
  const prevBtn = $("love-prev");
  const nextBtn = $("love-next");
  const pages = CONFIG.lovePages;
  let index = 0;

  pages.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "love-dot";
    dot.setAttribute("aria-label", `Sivu ${i + 1}`);
    dot.addEventListener("click", () => show(i));
    dotsEl.appendChild(dot);
  });

  const show = (i) => {
    index = Math.max(0, Math.min(pages.length - 1, i));
    textEl.classList.add("fading");
    setTimeout(() => {
      textEl.textContent = pages[index];
      textEl.classList.remove("fading");
    }, 250);
    dotsEl.querySelectorAll(".love-dot").forEach((d, di) =>
      d.classList.toggle("active", di === index));
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === pages.length - 1;
  };

  prevBtn.addEventListener("click", () => show(index - 1));
  nextBtn.addEventListener("click", () => show(index + 1));

  textEl.textContent = pages[0];
  dotsEl.querySelector(".love-dot").classList.add("active");
  prevBtn.disabled = true;
  nextBtn.disabled = pages.length < 2;
})();

/* ═══════════ GALLERIA ═══════════ */
(() => {
  const gallery = $("gallery");
  CONFIG.gallery.forEach(({ src, caption }) => {
    const fig = document.createElement("figure");
    const img = document.createElement("img");
    img.src = src;
    img.alt = caption;
    img.loading = "lazy";
    img.onerror = () => {
      img.removeAttribute("src");
      img.style.background = "linear-gradient(140deg,#f7b2c1,#d6748c)";
    };
    const cap = document.createElement("figcaption");
    cap.textContent = caption;
    fig.append(img, cap);
    fig.addEventListener("click", () => {
      if (!img.getAttribute("src")) return;
      const box = document.createElement("div");
      box.className = "lightbox";
      const big = document.createElement("img");
      big.src = src;
      big.alt = caption;
      const p = document.createElement("p");
      p.textContent = caption;
      box.append(big, p);
      box.addEventListener("click", () => box.remove());
      document.body.appendChild(box);
    });
    gallery.appendChild(fig);
  });
})();

/* ═══════════ KARTTA ═══════════ */
(() => {
  $("map-title").textContent = CONFIG.mapTitle;
  $("map-subtitle").textContent = CONFIG.mapSubtitle;
  if (typeof L === "undefined") return; // Leaflet ei latautunut (ei verkkoa)

  const map = L.map("map", { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const makeIcon = (emoji) => L.divIcon({
    className: "map-pin",
    html: emoji || "❤️",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -16],
  });

  const bounds = [];
  CONFIG.mapPlaces.forEach(({ name, text, lat, lng, emoji, img }) => {
    const marker = L.marker([lat, lng], { icon: makeIcon(emoji) }).addTo(map);
    const content = document.createElement("div");
    if (img) {
      const image = document.createElement("img");
      image.src = img;
      image.alt = name;
      image.className = "map-popup-img";
      content.append(image);
    }
    const b = document.createElement("b");
    b.textContent = name;
    content.append(b);
    if (text) {
      const p = document.createElement("div");
      p.textContent = text;
      content.append(p);
    }
    marker.bindPopup(content);
    bounds.push([lat, lng]);
  });

  if (bounds.length > 1) map.fitBounds(bounds, { padding: [50, 50] });
  else map.setView(bounds[0] || [60.17, 24.94], 12);
})();

/* ═══════════ QUIZ ═══════════ */
(() => {
  const qEl = $("quiz-question");
  const optsEl = $("quiz-options");
  const progEl = $("quiz-progress");
  const boxEl = $("quiz-box");
  const resultEl = $("quiz-result");
  let index = 0;
  let score = 0;

  const show = () => {
    const item = CONFIG.quiz[index];
    progEl.textContent = `Kysymys ${index + 1} / ${CONFIG.quiz.length}`;
    qEl.textContent = item.question;
    optsEl.innerHTML = "";
    item.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => pick(btn, i, item.correct));
      optsEl.appendChild(btn);
    });
  };

  const pick = (btn, i, correct) => {
    optsEl.querySelectorAll("button").forEach((b) => (b.disabled = true));
    if (i === correct) {
      btn.classList.add("correct");
      score++;
      const r = btn.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top, 30);
    } else {
      btn.classList.add("wrong");
      optsEl.children[correct].classList.add("correct");
    }
    setTimeout(() => {
      index++;
      if (index < CONFIG.quiz.length) show();
      else finish();
    }, 1300);
  };

  const finish = () => {
    boxEl.classList.add("hidden");
    resultEl.classList.remove("hidden");
    $("quiz-score").textContent = `${score} / ${CONFIG.quiz.length} oikein!`;
    const ratio = score / CONFIG.quiz.length;
    $("quiz-verdict").textContent =
      ratio === 1 ? CONFIG.quizVerdicts.perfect
      : ratio >= 0.6 ? CONFIG.quizVerdicts.good
      : CONFIG.quizVerdicts.ok;
    if (ratio === 1) confetti(innerWidth / 2, innerHeight / 2, 180);
  };

  $("quiz-restart").addEventListener("click", () => {
    index = 0;
    score = 0;
    resultEl.classList.add("hidden");
    boxEl.classList.remove("hidden");
    show();
  });

  show();
})();

/* ═══════════ MUISTIPELI ═══════════ */
(() => {
  const grid = $("memory-grid");
  const movesEl = $("memory-moves");
  const winEl = $("memory-win");
  let first = null;
  let lock = false;
  let moves = 0;
  let matched = 0;

  const isImage = (v) => /\.(jpe?g|png|gif|webp|avif)$/i.test(v);

  const build = () => {
    grid.innerHTML = "";
    winEl.classList.add("hidden");
    first = null;
    lock = false;
    moves = 0;
    matched = 0;
    movesEl.textContent = "0";

    const deck = [...CONFIG.memoryItems, ...CONFIG.memoryItems]
      .map((v) => ({ v, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(({ v }) => v);

    deck.forEach((value) => {
      const card = document.createElement("button");
      card.className = "memory-card";
      card.setAttribute("aria-label", "Muistipelikortti");
      const back = isImage(value)
        ? `<img src="${value}" alt="">`
        : `<span>${value}</span>`;
      card.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-face memory-front">❦</div>
          <div class="memory-face memory-back">${back}</div>
        </div>`;
      card.dataset.value = value;
      card.addEventListener("click", () => flip(card));
      grid.appendChild(card);
    });
  };

  const flip = (card) => {
    if (lock || card === first || card.classList.contains("matched")) return;
    card.classList.add("flipped");
    if (!first) {
      first = card;
      return;
    }
    moves++;
    movesEl.textContent = moves;
    if (first.dataset.value === card.dataset.value) {
      first.classList.add("matched");
      card.classList.add("matched");
      first = null;
      matched++;
      if (matched === CONFIG.memoryItems.length) {
        winEl.textContent = CONFIG.memoryWinText;
        winEl.classList.remove("hidden");
        confetti(innerWidth / 2, innerHeight / 2, 160);
      }
    } else {
      lock = true;
      const a = first;
      first = null;
      setTimeout(() => {
        a.classList.remove("flipped");
        card.classList.remove("flipped");
        lock = false;
      }, 800);
    }
  };

  $("memory-restart").addEventListener("click", build);
  build();
})();

/* ═══════════ PALKINTOPYÖRÄ ═══════════ */
(() => {
  const canvas = $("wheel-canvas");
  const ctx = canvas.getContext("2d");
  const prizes = CONFIG.wheelPrizes;
  const n = prizes.length;
  const arc = (Math.PI * 2) / n;
  const size = canvas.width;
  const c = size / 2;
  const resultEl = $("wheel-result");
  const spinBtn = $("wheel-spin");
  let angle = 0;
  let spinning = false;

  const draw = () => {
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(angle);
    prizes.forEach((p, i) => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, c - 10, i * arc - Math.PI / 2, (i + 1) * arc - Math.PI / 2);
      ctx.closePath();
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.save();
      ctx.rotate(i * arc + arc / 2 - Math.PI / 2);
      ctx.translate(c * 0.58, 0);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "700 22px Nunito, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 4;
      ctx.fillText(p.label, 0, 0);
      ctx.restore();
    });
    ctx.restore();

    // keskinuppi
    ctx.beginPath();
    ctx.arc(c, c, 26, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;

    // ulkoreunus
    ctx.beginPath();
    ctx.arc(c, c, c - 8, 0, Math.PI * 2);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 8;
    ctx.stroke();
  };
  draw();

  spinBtn.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;
    resultEl.classList.add("hidden");
    const target = angle + Math.PI * 2 * (4 + Math.random() * 3) + Math.random() * Math.PI * 2;
    const duration = 4200;
    const startAngle = angle;
    const startTime = performance.now();

    const ease = (t) => 1 - Math.pow(1 - t, 4);

    const frame = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      angle = startAngle + (target - startAngle) * ease(t);
      draw();
      if (t < 1) requestAnimationFrame(frame);
      else {
        spinning = false;
        // osoitin on ylhäällä (-90°); laske mikä sektori osuu siihen
        const norm = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const idx = (n - Math.floor(norm / arc) - 1 + n) % n;
        resultEl.textContent = `🎉 Voitit: ${prizes[idx].label}!`;
        resultEl.classList.remove("hidden");
        const r = canvas.getBoundingClientRect();
        confetti(r.left + r.width / 2, r.top + r.height / 2, 150);
      }
    };
    requestAnimationFrame(frame);
  });
})();

/* ═══════════ SYNTTÄRIKORTTI ═══════════ */
(() => {
  const card = $("bday-card");
  const cta = $("bday-cta");
  const open = () => {
    const isOpen = card.classList.toggle("open");
    cta.classList.toggle("faded", isOpen);
    if (isOpen) {
      const r = card.getBoundingClientRect();
      confetti(r.left + r.width / 2, r.top + r.height / 3, 200);
      setTimeout(() => confetti(innerWidth * 0.25, innerHeight * 0.4, 80), 400);
      setTimeout(() => confetti(innerWidth * 0.75, innerHeight * 0.4, 80), 700);
    }
  };
  card.addEventListener("click", open);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
  });
})();
