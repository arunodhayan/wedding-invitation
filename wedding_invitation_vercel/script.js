/* v53: an independent invitation scroll container fixes mobile scroll restoration. */
const doorOverlay = document.getElementById('doorOverlay');
const openInviteBtn = document.getElementById('openInviteBtn');
const scrollTip = document.getElementById('scrollTip');
const story = document.getElementById('story');
let opened = false;

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

function resetStoryStart() {
  if (!opened) {
    story.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

// Reset the invitation's own scroll offset, rather than moving the browser page.
resetStoryStart();
window.addEventListener('pageshow', resetStoryStart);
window.addEventListener('load', resetStoryStart);

function openInvitation() {
  if (opened) return;
  opened = true;
  story.scrollTop = 0;
  doorOverlay.classList.add('open');
  if (scrollTip) scrollTip.style.opacity = '0';

  window.setTimeout(() => {
    story.scrollTop = 0;
    story.classList.add('invitation-open');
    doorOverlay.classList.add('hide');
    if (scrollTip) scrollTip.style.opacity = '.75';
    story.scrollTop = 0;
  }, 1350);
}

if (doorOverlay) doorOverlay.addEventListener('click', openInvitation);
if (openInviteBtn) {
  openInviteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openInvitation();
  });
}

if (story) {
  story.addEventListener('scroll', () => {
    if (scrollTip && opened) {
      scrollTip.style.opacity = story.scrollTop > 50 ? '.08' : '.75';
    }
  }, {passive: true});
}
