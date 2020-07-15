import { IActorBody } from './IActorBody';
import { Direction } from '../models/Direction';

export interface IActorSprite {
  spriteKey: string;

  x: number;

  y: number;
  
  width: number;

  height: number;

  depth: number;

  direction: Direction;

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