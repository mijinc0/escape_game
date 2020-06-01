import { IActorSprite } from './IActorSprite';
import { ILayeredSprite } from './ILayeredSprite';
import { IActorBody } from './IActorBody';

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

  get y(): number {
    return this.primary.y;
  };

  get depth(): number {
    return this.primary.depth;
  }
  
  get width(): number {
    return this.primary.width;
  }

  get height(): number {
    return this.primary.height;
  }

  set x(x: number) {
    this.primary.x = x;
    this.sprites.forEach((sprite: IActorSprite) => {
      this._alignCenter(sprite);
    });
  };

  set y(y: number) {
    this.primary.y = y;
    this.sprites.forEach((sprite: IActorSprite) => {
      this._alignCenter(sprite);
    });
  };
  
  set width(width: number) {
    this.primary.width = width;
  }

  set height(height: number) {
    this.primary.height = height;
  }

  setAnim(animKey: string, animObject: any, target?: string): void {
    if (!target) {
      const sprite = this.sprites.get(target);
      if (sprite) sprite.setAnim(animKey, animObject);
    } else {
      this.primary.setAnim(animKey, animObject);
    }
  }
  
  play(animKey: string): this {
    this.primary.play(animKey);
    this.sprites.forEach((sprite: IActorSprite) => {
      sprite.play(animKey);
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