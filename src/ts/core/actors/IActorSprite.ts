import { IActorBody } from './IActorBody';

export interface IActorSprite {
  spriteKey: string;

  x: number;

  y: number;
  
  width: number;

  height: number;

  depth: number;

  body: IActorBody;

  visible: boolean;

  setAnim(animKey: string, animationObject: any): void;
  
  playAnim(animKey: string, ignoreIfPlaying?: boolean): this;

  stop(frame: number): void;

  destroy(fromScene?: boolean): void;

  setVelocityX(x: number): any;

  setVelocityY(x: number): any;
}