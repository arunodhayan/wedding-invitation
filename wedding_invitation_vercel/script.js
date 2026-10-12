const doorOverlay = document.getElementById('doorOverlay');
const scrollTip = document.getElementById('scrollTip');
let opened = false;

function playBellSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    const createTempleBellStrike = (time, fundamental = 392, masterGain = 0.12, duration = 5.0) => {
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, time);
      master.gain.exponentialRampToValueAtTime(masterGain, time + 0.01);
      master.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      master.connect(ctx.destination);

      const partials = [
        { ratio: 0.50, gain: 0.65, type: 'sine',   decay: 4.8 },
        { ratio: 1.00, gain: 1.00, type: 'triangle', decay: 4.2 },
        { ratio: 1.52, gain: 0.55, type: 'sine',   decay: 3.8 },
        { ratio: 2.11, gain: 0.38, type: 'triangle', decay: 3.4 },
        { ratio: 2.97, gain: 0.25, type: 'sine',   decay: 2.7 },
        { ratio: 4.18, gain: 0.16, type: 'triangle', decay: 2.1 }
      ];

      partials.forEach((p, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = p.type;
        osc.frequency.setValueAtTime(fundamental * p.ratio, time);
        // subtle pitch drift for a more realistic struck-bell feel
        osc.frequency.exponentialRampToValueAtTime(Math.max(40, fundamental * p.ratio * 0.992), time + p.decay);
        gain.gain.setValueAtTime(0.0001, time);
        gain.gain.exponentialRampToValueAtTime(masterGain * p.gain / (1 + idx * 0.08), time + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + p.decay);
        osc.connect(gain).connect(master);
        osc.start(time);
        osc.stop(time + p.decay + 0.05);
      });

      // short bright striker attack
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.012));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 2800;
      noiseFilter.Q.value = 1.1;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.09, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.075);
      noise.connect(noiseFilter).connect(noiseGain).connect(master);
      noise.start(time);
      noise.stop(time + 0.08);
    };

    // Temple-bell style: one main ring with a softer follow-up resonance
    createTempleBellStrike(now, 392, 0.12, 5.0);
    createTempleBellStrike(now + 0.55, 440, 0.055, 3.8);

    setTimeout(() => { if (ctx.state !== 'closed') ctx.close(); }, 5600);
  } catch (e) {
    console.log('Bell sound could not play:', e);
  }
}

function openInvitation() {
  if (opened) return;
  opened = true;
  playBellSound();
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
