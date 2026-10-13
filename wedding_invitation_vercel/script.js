/* Wedding invitation v54: simple, deterministic mobile-friendly opening. */
(() => {
  'use strict';
  const story = document.getElementById('story');
  const door = document.getElementById('doorOverlay');
  const openButton = document.getElementById('openInviteBtn');
  const hint = document.getElementById('scrollTip');
  if (!story || !door || !openButton) return;
  let opened = false;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  // A contained, six-card scroller, always positioned at the first card initially.
  const startAtFirstPage = () => {
    if (opened) return;
    story.scrollTop = 0;
    window.scrollTo(0, 0);
  };
  startAtFirstPage();
  window.addEventListener('pageshow', startAtFirstPage);
  window.addEventListener('load', startAtFirstPage);

  function openInvitation() {
    if (opened) return;
    opened = true;
    story.scrollTop = 0;
    door.classList.add('open');

    // After the door halves part, enable scroll but keep the first card in view.
    window.setTimeout(() => {
      story.scrollTop = 0;
      story.classList.add('is-open');
      door.classList.add('hide');
      story.scrollTop = 0;
      if (hint) hint.style.opacity = '.75';
      window.requestAnimationFrame(() => { story.scrollTop = 0; });
    }, 1370);
  }

  door.addEventListener('click', openInvitation);
  openButton.addEventListener('click', e => { e.stopPropagation(); openInvitation(); });
  story.addEventListener('scroll', () => {
    if (hint && opened) hint.style.opacity = story.scrollTop > 64 ? '0.18' : '.75';
  }, { passive:true });
})();
