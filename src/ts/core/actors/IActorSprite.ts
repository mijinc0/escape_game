import * as Phaser from 'phaser';
import * as Model from '../models';

export interface IActorSprite extends Phaser.Physics.Arcade.Sprite {
  spriteKey: string;

  direction: Model.Direction;

  setAnim(animName: string, animationObject: any): void;

  playAnim(animName: string, ignoreIfPlaying?: boolean, repeat?: number, onCompleteEventCallback?: () => void): this;

  stopAnim(): this;

  pause(): void;

  resume(): void;
}
