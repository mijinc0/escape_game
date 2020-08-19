import * as Phaser from 'phaser';

type fadeConfig = {duration: number, from: number, to: number};

export interface IPlayingAudioConfig extends Phaser.Types.Sound.SoundConfig {
  fade?: fadeConfig;

  onComplete?: () => void;
}
