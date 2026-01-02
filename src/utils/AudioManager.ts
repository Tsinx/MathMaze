import { soundManager } from './SoundManager';

type AudioEvent =
  | 'correct'
  | 'wrong'
  | 'enemy_attack_warning'
  | 'player_attack_turn'
  | 'player_defend_turn'
  | 'hit_enemy'
  | 'blocked_by_enemy'
  | 'block_success'
  | 'take_damage'
  | 'defeat_enemy'
  | 'combat_victory'
  | 'combat_defeat'
  | 'collect_ally'
  | 'find_exit'
  | 'game_start'
  | 'level_start'
  | 'game_victory'
  | 'game_defeat'
  | 'boss_encounter'
  | 'boss_defeated'
  | 'ally_intro';

class AudioManager {
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private currentAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;

  constructor() {
    this.isMuted = soundManager.getMuted();
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.currentAudio) {
      this.currentAudio.muted = this.isMuted;
    }
  }

  private async playAudio(path: string): Promise<void> {
    if (this.isMuted) return;

    return new Promise((resolve, reject) => {
      const audio = this.audioCache.get(path) || new Audio(path);
      if (!this.audioCache.has(path)) {
        this.audioCache.set(path, audio);
      }

      audio.muted = this.isMuted;

      const onEnded = () => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        resolve();
      };

      const onError = (e: Event) => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        console.error(`Audio load error: ${path}`, e, audio.error);
        resolve();
      };

      audio.addEventListener('ended', onEnded);
      audio.addEventListener('error', onError);

      this.currentAudio = audio;

      audio.play().catch(err => {
        console.error(`Audio playback failed: ${path}`, err);
        resolve();
      });
    });
  }

  private playAudioSync(path: string): void {
    if (this.isMuted) return;

    const audio = this.audioCache.get(path) || new Audio(path);
    if (!this.audioCache.has(path)) {
      this.audioCache.set(path, audio);
    }

    audio.muted = this.isMuted;
    audio.currentTime = 0;
    audio.play().catch(err => {
      console.error(`Audio playback failed: ${path}`, err);
    });
  }

  private async playSequence(paths: string[]): Promise<void> {
    for (const path of paths) {
      await this.playAudio(path);
    }
  }

  async playQuestion(a: number, b: number): Promise<void> {
    const path = `/audio/math/question/question_${a}_${b}.wav`;
    return this.playAudio(path);
  }

  async playAnswer(a: number, b: number, c: number, isCorrect: boolean): Promise<void> {
    const correctOrWrong = isCorrect ? 'correct' : 'wrong';
    const prefixPath = `/audio/combat/${correctOrWrong}.wav`;
    const answerPath = `/audio/math/answer/answer_${a}_${b}_${c}.wav`;

    await this.playSequence([prefixPath, answerPath]);
  }

  async playAnswerWithSound(a: number, b: number, c: number, isCorrect: boolean): Promise<void> {
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playWrong();
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    const correctOrWrong = isCorrect ? 'correct' : 'wrong';
    const answerPath = `/audio/math/answer/answer_${a}_${b}_${c}.wav`;
    await this.playAudio(answerPath);
  }

  async playEvent(event: AudioEvent, level?: number): Promise<void> {
    const path = this.getEventPath(event, level);
    return this.playAudio(path);
  }

  async playAllyIntro(allyType: string, probioticType?: string): Promise<void> {
    const allyId = probioticType ? `${probioticType}` : allyType;
    const path = `/audio/intro/${allyId}.wav`;
    return this.playAudio(path);
  }

  private getEventPath(event: AudioEvent, level?: number): string {
    switch (event) {
      case 'correct':
        return '/audio/combat/correct.wav';
      case 'wrong':
        return '/audio/combat/wrong.wav';
      case 'enemy_attack_warning':
        return '/audio/combat/enemy_attack_warning.wav';
      case 'player_attack_turn':
        return '/audio/combat/player_attack_turn.wav';
      case 'player_defend_turn':
        return '/audio/combat/player_defend_turn.wav';
      case 'hit_enemy':
        return '/audio/combat/hit_enemy.wav';
      case 'blocked_by_enemy':
        return '/audio/combat/blocked_by_enemy.wav';
      case 'block_success':
        return '/audio/combat/block_success.wav';
      case 'take_damage':
        return '/audio/combat/take_damage.wav';
      case 'defeat_enemy':
        return '/audio/combat/defeat_enemy.wav';
      case 'combat_victory':
        return '/audio/combat/combat_victory.wav';
      case 'combat_defeat':
        return '/audio/combat/combat_defeat.wav';
      case 'collect_ally':
        return '/audio/exploration/collect_ally.wav';
      case 'find_exit':
        return '/audio/exploration/find_exit.wav';
      case 'game_start':
        return '/audio/game/game_start.wav';
      case 'level_start':
        return level ? `/audio/game/level_start_${level}.wav` : '/audio/game/level_start_1.wav';
      case 'game_victory':
        return '/audio/game/game_victory.wav';
      case 'game_defeat':
        return '/audio/game/game_defeat.wav';
      case 'boss_encounter':
        return '/audio/game/boss_encounter.wav';
      case 'boss_defeated':
        return '/audio/game/boss_defeated.wav';
      default:
        return '';
    }
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  clearCache(): void {
    this.audioCache.clear();
  }
}

export const audioManager = new AudioManager();
