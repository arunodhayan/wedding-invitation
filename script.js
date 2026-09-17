const intro = document.getElementById("intro");
const envelope = document.getElementById("envelope");
const envelopeWrap = document.getElementById("envelopeWrap");
const invitation = document.getElementById("invitation");
const openBtn = document.getElementById("openBtn");

let opened = false;

function openInvitation() {
  if (opened) return;
  opened = true;

  envelope.classList.add("open");
  openBtn.textContent = "Opening...";

  setTimeout(() => {
    intro.style.display = "none";
    invitation.classList.remove("hidden");
    invitation.classList.add("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setupScratchCard();
  }, 1150);
}

openBtn.addEventListener("click", openInvitation);
envelopeWrap.addEventListener("click", openInvitation);
envelopeWrap.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openInvitation();
  }
});

function setupScratchCard() {
  const canvas = document.getElementById("scratchCanvas");
  const card = document.getElementById("scratchCard");
  const hint = document.getElementById("scratchHint");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  function fitCanvas() {
    const rect = card.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintCover(rect.width, rect.height);
  }

  function paintCover(w, h) {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#d8b96a");
    gradient.addColorStop(.35, "#b89343");
    gradient.addColorStop(.7, "#ead494");
    gradient.addColorStop(1, "#b68f3f");

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(255,255,255,.18)";
    for (let x = -50; x < w + 70; x += 32) {
      ctx.fillRect(x, 0, 10, h);
    }

    ctx.fillStyle = "rgba(91,53,20,.78)";
    ctx.font = '600 12px Montserrat, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH TO REVEAL", w / 2, h / 2 - 8);
    ctx.font = '500 11px Montserrat, sans-serif';
    ctx.fillText("Reception & Wedding", w / 2, h / 2 + 14);
  }

  let scratching = false;
  let lastPoint = null;

  function pointFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const source = event.touches ? event.touches[0] : event;
    return {
      x: source.clientX - rect.left,
      y: source.clientY - rect.top
    };
  }

  function scratchAt(point) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();

    if (lastPoint) {
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.lineWidth = 34;
      ctx.lineCap = "round";
      ctx.stroke();
    } else {
      ctx.arc(point.x, point.y, 18, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPoint = point;
  }

  function startScratch(e) {
    e.preventDefault();
    scratching = true;
    lastPoint = null;
    scratchAt(pointFromEvent(e));
  }

  function moveScratch(e) {
    if (!scratching) return;
    e.preventDefault();
    scratchAt(pointFromEvent(e));
  }

  function endScratch() {
    if (!scratching) return;
    scratching = false;
    lastPoint = null;
    checkScratchProgress();
  }

  function checkScratchProgress() {
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    const pixels = img.data;

    for (let i = 3; i < pixels.length; i += 4 * 18) {
      if (pixels[i] < 60) cleared++;
    }

    const sampled = Math.ceil(pixels.length / 4 / 18);
    const ratio = cleared / sampled;

    if (ratio > 0.52) {
      canvas.style.transition = "opacity .7s ease";
      canvas.style.opacity = "0";
      hint.textContent = "Save the date ♥";
      setTimeout(() => {
        canvas.style.pointerEvents = "none";
      }, 700);
    }
  }

  canvas.addEventListener("pointerdown", startScratch);
  canvas.addEventListener("pointermove", moveScratch);
  window.addEventListener("pointerup", endScratch);
  window.addEventListener("pointercancel", endScratch);

  fitCanvas();
  window.addEventListener("resize", fitCanvas, { passive: true });
}

function updateCountdown() {
  const target = new Date("2026-10-25T09:00:00+05:30").getTime();
  const now = Date.now();
  let diff = target - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (diff <= 0) {
    [daysEl, hoursEl, minutesEl, secondsEl].forEach(el => el.textContent = "00");
    return;
  }

  const days = Math.floor(diff / 86400000);
  diff %= 86400000;
  const hours = Math.floor(diff / 3600000);
  diff %= 3600000;
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const petalsRoot = document.getElementById("petals");

for (let i = 0; i < 18; i++) {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.animationDuration = `${9 + Math.random() * 9}s`;
  petal.style.animationDelay = `${Math.random() * -12}s`;
  petal.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
  petal.style.transform = `scale(${0.65 + Math.random() * 0.9})`;
  petalsRoot.appendChild(petal);
}
