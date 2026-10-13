const doorOverlay = document.getElementById('doorOverlay');
const openInviteBtn = document.getElementById('openInviteBtn');
const scrollTip = document.getElementById('scrollTip');
let opened = false;


function openInvitation() {
  if (opened) return;
  opened = true;
  doorOverlay.classList.add('open');
  document.getElementById('main-scene').scrollIntoView({ behavior: 'auto', block: 'start' });
  setTimeout(() => {
    doorOverlay.classList.add('hide');
    document.body.style.overflowY = 'auto';
  }, 1250);
}

doorOverlay.addEventListener('click', openInvitation);
document.body.style.overflowY = 'hidden';

setTimeout(() => { if (scrollTip) scrollTip.style.opacity = '.1'; }, 6000);
window.addEventListener('scroll', () => {
  if (scrollTip) scrollTip.style.opacity = window.scrollY > 50 ? '.08' : '.75';
}, { passive: true });
