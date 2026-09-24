// Minimal atmospheric ambient drone generator using Web Audio API
class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.oscillators = [];
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);

    // Lowpass filter for warm, dark cinematic drone
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(140, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3, this.ctx.currentTime);

    this.filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    // Warm deep chord notes (D minor / root sub-bass: 55Hz, 110Hz, 164.8Hz)
    const freqs = [55.0, 82.4, 110.0, 164.8];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle LFO drift
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(this.filter);
      osc.start();
      this.oscillators.push(osc, lfo);
    });
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Fade out
      this.gainNode.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.4);
      this.isPlaying = false;
    } else {
      // Fade in to gentle background volume
      this.gainNode.gain.setTargetAtTime(0.06, this.ctx.currentTime, 0.8);
      this.isPlaying = true;
    }
    return this.isPlaying;
  }
}

export const soundscape = new SoundscapeEngine();
