import * as Phaser from 'phaser';

export interface IPlayingAudioConfig extends Phaser.Types.Sound.SoundConfig {
  onComplete?: () => void;
}
