export interface IActorSprite {
  spriteKey: string;

  x: number;

  y: number;
  
  width: number;

  height: number;

  setAnim(animKey: string, animationObject: any): void;
  
  play(animKey: string, ignoreIfPlaying?: boolean): this;

  stop(frame: number): void;

  destroy(fromScene?: boolean): void;

  setVelocityX(x: number): any;

  setVelocityY(x: number): any;
}