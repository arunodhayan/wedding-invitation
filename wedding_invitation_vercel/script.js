const scenes = Array.from(document.querySelectorAll('.scene'));
const progressWrap = document.getElementById('progress');
const startOverlay = document.getElementById('startOverlay');
const startBtn = document.getElementById('startBtn');
const nameRevealCard = document.getElementById('nameRevealCard');
const audio = document.getElementById('bgAudio');

let current = 0;
let timer = null;
let started = false;

function buildProgress() {
  scenes.forEach(() => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    const fill = document.createElement('div');
    fill.className = 'fill';
    bar.appendChild(fill);
    progressWrap.appendChild(bar);
  });
}

function resetBars() {
  const fills = progressWrap.querySelectorAll('.fill');
  fills.forEach((fill, index) => {
    fill.style.transition = 'none';
    fill.style.width = index < current ? '100%' : '0%';
  });
}

function animateCurrentBar(duration) {
  const fills = progressWrap.querySelectorAll('.fill');
  const currentFill = fills[current];
  if (!currentFill) return;
  currentFill.style.transition = 'none';
  currentFill.style.width = '0%';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      currentFill.style.transition = `width ${duration}s linear`;
      currentFill.style.width = '100%';
    });
  });
}

function showScene(index) {
  scenes[current].classList.remove('active');
  current = index;
  scenes[current].classList.add('active');
  clearTimeout(timer);
  resetBars();
  const duration = Number(scenes[current].dataset.duration || 7);
  animateCurrentBar(duration);
  timer = setTimeout(() => {
    if (current < scenes.length - 1) showScene(current + 1);
  }, duration * 1000);
}

function startInvite() {
  if (started) return;
  started = true;
  startBtn.classList.add('opening');
  audio.currentTime = 0;
  audio.play().catch(() => {});
  setTimeout(() => {
    startOverlay.classList.add('show-card');
    nameRevealCard.setAttribute('aria-hidden', 'false');
  }, 700);
  setTimeout(() => {
    startOverlay.classList.add('closing');
  }, 2900);
  setTimeout(() => {
    startOverlay.style.display = 'none';
    showScene(0);
  }, 3500);
}

startBtn.addEventListener('click', (e) => { e.stopPropagation(); startInvite(); });
startBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    startInvite();
  }
});

document.addEventListener('keydown', (e) => {
  if (!started && (e.key === 'Enter' || e.key === ' ')) startInvite();
});

const shell = document.querySelector('.reel-shell');
let touchStartX = 0;
shell.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });
shell.addEventListener('touchend', (e) => {
  if (!started) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) < 45) return;
  if (dx < 0 && current < scenes.length - 1) showScene(current + 1);
  if (dx > 0 && current > 0) showScene(current - 1);
}, { passive: true });

shell.addEventListener('click', (e) => {
  if (!started) return;
  if (startOverlay && startOverlay.style.display !== 'none') return;
  if (e.target.closest('#startOverlay') || e.target.closest('a') || e.target.closest('button')) return;
  if (current < scenes.length - 1) showScene(current + 1);
});

buildProgress();
resetBars();
scenes.forEach((scene, idx) => scene.classList.toggle('active', idx === 0));
