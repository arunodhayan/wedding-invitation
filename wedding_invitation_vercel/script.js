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
