// Web Audio API Sound Manager
class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Initialize context on first interaction if possible, but here we prepare
    // We can't auto-play without user interaction usually.
  }

  private getContext() {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  // Play a simple tone
  private playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0, vol: number = 0.1) {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    
    gain.gain.setValueAtTime(vol, ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  }

  // Sound Effects

  playMove() {
    // Short "pop" or "tick"
    this.playTone(600, 'sine', 0.05, 0, 0.05);
  }

  playAttack() {
    // "Whoosh" / "Zap" - Enhanced for impact
    const ctx = this.getContext();
    if (!ctx) return;

    // Oscillator 1: The "Whoosh"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);

    // Oscillator 2: The "Thud" impact (subtle)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(150, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);
    
    gain2.gain.setValueAtTime(0.2, ctx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start();
    osc2.stop(ctx.currentTime + 0.1);
  }

  playBlock() {
    // "Clang" - Metallic Shield Sound
    const ctx = this.getContext();
    if (!ctx) return;

    // Metallic sound relies on inharmonic frequencies
    const freqs = [800, 1200, 2300]; 
    freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        
        // Fast attack, medium decay
        gain.gain.setValueAtTime(0.15 / (i + 1), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    });
  }

  playCatch() {
    // "Pokemon Catch/Success" - Happy Jingle
    // Rapid ascending arpeggio with a "ping"
    const now = 0;
    this.playTone(1318.51, 'sine', 0.1, now, 0.1); // E6
    this.playTone(1567.98, 'sine', 0.1, now + 0.08, 0.1); // G6
    this.playTone(2093.00, 'sine', 0.3, now + 0.16, 0.2); // C7 - Ping!
  }

  playDamage() {
    // Low "Thud"
    this.playTone(150, 'square', 0.2, 0, 0.2);
    this.playTone(100, 'sawtooth', 0.2, 0.05, 0.2);
  }

  playEnemyAttack() {
     // Warning buzz
     this.playTone(100, 'sawtooth', 0.3, 0, 0.1);
  }

  playCorrect() {
    // "Ding!" - Major Arpeggio
    this.playTone(523.25, 'sine', 0.2, 0, 0.1); // C5
    this.playTone(659.25, 'sine', 0.2, 0.1, 0.1); // E5
    this.playTone(783.99, 'sine', 0.4, 0.2, 0.1); // G5
  }

  playWrong() {
    // "Buzz" - Diminished
    this.playTone(300, 'sawtooth', 0.3, 0, 0.1);
    this.playTone(200, 'sawtooth', 0.3, 0.1, 0.1);
  }

  playWin() {
    // Fanfare
    const now = 0;
    this.playTone(523.25, 'square', 0.2, now, 0.1);
    this.playTone(523.25, 'square', 0.2, now + 0.2, 0.1);
    this.playTone(523.25, 'square', 0.2, now + 0.4, 0.1);
    this.playTone(783.99, 'square', 0.6, now + 0.6, 0.1);
  }

  playLevelComplete() {
    this.playWin();
  }

  playCollect() {
    // High pitch "Coin" sound
    this.playTone(1200, 'sine', 0.1, 0, 0.05);
    this.playTone(1800, 'sine', 0.2, 0.05, 0.05);
  }
}

export const soundManager = new SoundManager();
