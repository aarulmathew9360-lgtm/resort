// Web Audio API Mountain Forest, Pine Breeze & Soundbox Synthesizer
let audioCtx = null;
let noiseNode = null;
let filterNode = null;
let gainNode = null;

const getAudioContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const startMountainAmbience = (mode = 'day') => {
  try {
    const ctx = getAudioContext();

    // Generate Pink/Brown Noise buffer for soothing wind
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.08;
      b6 = white * 0.115926;
    }

    noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Filter adapts based on time of day
    filterNode = ctx.createBiquadFilter();
    filterNode.type = 'lowpass';
    const baseFreq = mode === 'night' ? 260 : mode === 'dawn' ? 440 : mode === 'sunset' ? 320 : 380;
    filterNode.frequency.setValueAtTime(baseFreq, ctx.currentTime);

    // Subtle LFO modulation for wind waves
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
    lfoGain.gain.setValueAtTime(140, ctx.currentTime);
    lfo.connect(filterNode.frequency);
    lfo.start();

    gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.24, ctx.currentTime + 3);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseNode.start();
    return true;
  } catch (err) {
    console.warn('Web Audio error:', err);
    return false;
  }
};

export const setAmbienceMode = (mode) => {
  try {
    if (filterNode && audioCtx) {
      const targetFreq = mode === 'night' ? 260 : mode === 'dawn' ? 460 : mode === 'sunset' ? 320 : 380;
      filterNode.frequency.exponentialRampToValueAtTime(targetFreq, audioCtx.currentTime + 1.5);
    }
  } catch (e) {
    console.warn('Failed to update ambience filter:', e);
  }
};

export const stopMountainAmbience = () => {
  try {
    if (gainNode && audioCtx) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);
      setTimeout(() => {
        if (noiseNode) {
          try { noiseNode.stop(); } catch (e) {}
          noiseNode.disconnect();
        }
      }, 1600);
    }
  } catch (err) {
    console.warn('Web Audio stop error:', err);
  }
};

// Luxury Brass Concierge Bell Chime
export const playConciergeBell = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1760, ctx.currentTime); // A6 bell
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    // Ignore audio permission edge-cases
  }
};

// Next-Gen Luxury Payment Soundbox Chime (Tri-Tone C5 -> E5 -> G5)
export const playPaymentSuccessChime = () => {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.12);

      gain.gain.setValueAtTime(0.001, now + index * 0.12);
      gain.gain.linearRampToValueAtTime(0.22, now + index * 0.12 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 0.7);
    });
  } catch (e) {
    // Ignore audio permission edge-cases
  }
};
