const doorOverlay = document.getElementById('doorOverlay');
const openInviteBtn = document.getElementById('openInviteBtn');
const scrollTip = document.getElementById('scrollTip');
let opened = false;

// Prevent mobile browsers from restoring an old scroll position (which could
// make the invite appear to start at Haldi after the door opens).
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function forceTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}

// Always begin behind the door at the first invitation page.
forceTop();
window.addEventListener('DOMContentLoaded', forceTop, { once: true });
window.addEventListener('load', () => {
  forceTop();
  requestAnimationFrame(forceTop);
}, { once: true });
window.addEventListener('pageshow', () => {
  if (!opened) {
    forceTop();
    requestAnimationFrame(forceTop);
  }
});

function openInvitation() {
  if (opened) return;
  opened = true;

  // Lock the underlying story at page 1 before opening the door.
  forceTop();
  document.body.style.overflowY = 'hidden';
  doorOverlay.classList.add('open');

  setTimeout(() => {
    // Unlock and explicitly place the first invitation at the top.
    document.body.style.overflowY = 'auto';
    forceTop();

    const mainScene = document.getElementById('main-scene');
    if (mainScene) {
      mainScene.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    // iOS/Safari can restore scroll one frame later, so pin to top again.
    requestAnimationFrame(() => {
      forceTop();
      requestAnimationFrame(forceTop);
    });

    doorOverlay.classList.add('hide');
  }, 1250);
}

doorOverlay.addEventListener('click', openInvitation);
document.body.style.overflowY = 'hidden';

setTimeout(() => {
  if (scrollTip) scrollTip.style.opacity = '.1';
}, 6000);

window.addEventListener('scroll', () => {
  if (scrollTip) scrollTip.style.opacity = window.scrollY > 50 ? '.08' : '.75';
}, { passive: true });

if (openInviteBtn) {
  openInviteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openInvitation();
  });
}
