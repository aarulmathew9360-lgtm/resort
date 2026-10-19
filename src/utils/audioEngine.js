// Web Audio API Mountain Forest & Pine Breeze Synthesizer
let audioCtx = null;
let noiseNode = null;
let filterNode = null;
let gainNode = null;

export const startMountainAmbience = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Generate Pink/Brown Noise buffer for soothing wind
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
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
      output[i] *= 0.08; // scale down
      b6 = white * 0.115926;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Gentle low-pass filter to simulate distance through pine trees
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(380, audioCtx.currentTime);

    // Subtle LFO modulation for wind waves
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // 0.12 Hz swell
    lfoGain.gain.setValueAtTime(140, audioCtx.currentTime);
    lfo.connect(filterNode.frequency);
    lfo.start();

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 3);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
    return true;
  } catch (err) {
    console.warn('Web Audio error:', err);
    return false;
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
