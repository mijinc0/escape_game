import { IActorSprite } from './IActorSprite';
import { ILayeredSprite } from './ILayeredSprite';
import { IActorBody } from './IActorBody';
import { Direction } from '../models/Direction';

export class LayeredSprite implements ILayeredSprite, IActorSprite {
  private primary: IActorSprite;
  private sprites: Map<string, IActorSprite>;

  constructor(primary: IActorSprite) {
    this.primary = primary;
    this.sprites = new Map<string, IActorSprite>();
  }

  get body(): IActorBody {
    return this.primary.body;
  }

  get spriteKey(): string {
    return this.primary.spriteKey;
  }

  get x(): number {
    return this.primary.x;
  };

  set x(x: number) {
    this.primary.x = x;
    this.sprites.forEach((sprite: IActorSprite) => {
      this._alignCenter(sprite);
    });
  };

  get y(): number {
    return this.primary.y;
  };

  set y(y: number) {
    this.primary.y = y;
    this.sprites.forEach((sprite: IActorSprite) => {
      this._alignCenter(sprite);
    });
  };
  

  get depth(): number {
    return this.primary.depth;
  }
  
  get width(): number {
    return this.primary.width;
  }

  set width(width: number) {
    this.primary.width = width;
  }

  get height(): number {
    return this.primary.height;
  }

  set height(height: number) {
    this.primary.height = height;
  }

  get direction(): Direction {
    return this.primary.direction;
  }

  set direction(direction: Direction) {
    this.primary.direction = direction;

    this.sprites.forEach((sprite: IActorSprite) => {
      sprite.direction = direction;
    });
  }

  get visible(): boolean {
    return this.primary.visible;
  }

  set visible(visible: boolean) {
    this.primary.visible = visible;

    this.sprites.forEach((sprite: IActorSprite) => {
      sprite.visible = visible;
    });
  }

  setAnim(animKey: string, animObject: any, target?: string): void {
    if (!target) {
      const sprite = this.sprites.get(target);
      if (sprite) sprite.setAnim(animKey, animObject);
    } else {
      this.primary.setAnim(animKey, animObject);
    }
  }
  
  playAnim(animKey: string): this {
    this.primary.playAnim(animKey);
    this.sprites.forEach((sprite: IActorSprite) => {
      sprite.playAnim(animKey);
    });
    return this;
  };

  stop(frame: number): void {
    this.primary.stop(frame);
    this.sprites.forEach((sprite: IActorSprite) => {
      sprite.stop(frame);
    });
  };

  destroy(fromScene?: boolean): void {
    this.primary.destroy(fromScene);
    this.sprites.forEach((sprite: IActorSprite) => {
      sprite.destroy(fromScene);
    });
  };

  setVelocityX(velocityX: number): void {
    this.primary.setVelocityX(velocityX);
    this.sprites.forEach((sprite: IActorSprite) => {
      sprite.setVelocityX(velocityX);
    });
  }

  setVelocityY(velocityY: number): void {
    this.primary.setVelocityY(velocityY);
    this.sprites.forEach((sprite: IActorSprite) => {
      sprite.setVelocityY(velocityY);
    });
  }

  add(key: string, sprite: IActorSprite): void {
    this.sprites.set(key, sprite);
  }

  remove(key: string, destroy = true): boolean {
    return this.sprites.delete(key);
  }

  private _alignCenter(sprite: IActorSprite): void {
    const deltaX = (sprite.width - this.primary.width) / 2;
    const deltaY = (sprite.height - this.primary.height) / 2;
    sprite.x = this.primary.x - deltaX;
    sprite.y = this.primary.y - deltaY;
  }
}