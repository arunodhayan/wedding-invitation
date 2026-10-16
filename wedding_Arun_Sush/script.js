/* Wedding invitation v54: simple, deterministic mobile-friendly opening. */
(() => {
  'use strict';
  const story = document.getElementById('story');
  const door = document.getElementById('doorOverlay');
  const openButton = document.getElementById('openInviteBtn');
  const hint = document.getElementById('scrollTip');
  const music = document.getElementById('weddingMusic');
  const musicToggle = document.getElementById('musicToggle');

  function refreshMusicButton() {
    if (!music || !musicToggle) return;
    const playing = !music.paused;
    musicToggle.textContent = playing ? '🔊' : '🔇';
    musicToggle.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    musicToggle.setAttribute('title', playing ? 'Pause music' : 'Play music');
    musicToggle.setAttribute('aria-pressed', String(playing));
  }
  if (music) {
    music.addEventListener('play', refreshMusicButton);
    music.addEventListener('pause', refreshMusicButton);
    music.addEventListener('ended', refreshMusicButton);
  }
  if (musicToggle && music) {
    musicToggle.addEventListener('click', () => {
      if (music.paused) {
        const attempt = music.play();
        if (attempt && typeof attempt.catch === 'function') {
          attempt.catch(() => refreshMusicButton());
        }
      } else {
        music.pause();
      }
      refreshMusicButton();
    });
  }
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
    // Call play inside tap handler, not in the door-animation timer.
    // Safari and other mobile browsers often require direct user activation.
    if (music) {
      const attempt = music.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => refreshMusicButton());
      }
    }
    if (musicToggle) {
      musicToggle.hidden = false;
      refreshMusicButton();
    }
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
