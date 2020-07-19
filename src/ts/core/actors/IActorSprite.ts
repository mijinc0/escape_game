import * as Model from '../models';
import { IActorBody } from './IActorBody';

export interface IActorSprite {
  spriteKey: string;

  x: number;

  y: number;

  width: number;

  height: number;

  depth: number;

  direction: Model.Direction;

  body: IActorBody;

  visible: boolean;

  setAnim(animName: string, animationObject: any): void;

  playAnim(animName: string, ignoreIfPlaying?: boolean, onCompleteEventCallback?: () => void): this;

  stopAnim(): this;

  pause(): void;

  resume(): void;

  destroy(fromScene?: boolean): void;

  setVelocityX(x: number): any;

  setVelocityY(x: number): any;
}
