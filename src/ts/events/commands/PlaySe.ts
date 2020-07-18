import * as Audio from '../../core/audios';
import * as Event from '../../core/events';
import * as Scene from '../../core/scenes';

export class PlaySe implements Event.IScenarioEvent {
  isAsync: boolean;
  isComplete: boolean;

  private audioKey: string;
  private audioConfig: Audio.IAudioConfig;
  private startAudio: boolean;

  constructor(
    audioKey: string,
    volume?: number,
    delay?: number,
    rate?: number,
    async?: boolean,
  ) {
    this.audioKey = audioKey;
    this.isAsync = async ? async : false;
    this.isComplete = false;
    this.startAudio = false;

    this.audioConfig = {
      volume: volume ? volume : 1,
      delay: delay ? delay : 0,
      rate: rate ? rate : 1,
      onComplete: this._onComplete.bind(this),
    };
  }

  init(scene: Scene.IFieldScene): void {
    this.startAudio = false;
    this.isComplete = false;
  }

  update(scene: Scene.IFieldScene): void {
    if (this.startAudio) return;

    scene.audioManager.playSe(this.audioKey, this.audioConfig);

    this.startAudio = true;
  }

  complete(): void {
    this.isComplete = true;
  }

  private _onComplete(): void {
    this.isComplete = true;
  }
}
