import * as Phaser from 'phaser';
import { ISpriteContainer } from './ISpriteContainer';

type Sprite = Phaser.Physics.Arcade.Sprite;

export class SpriteContainer implements ISpriteContainer {
  private sprites: Map<string, Sprite>;

  constructor(primary: Sprite) {
    this.sprites = new Map<string, Sprite>();
    this.sprites.set('primary', primary);
  }

  add(key: string, sprite: Sprite): void {
    this.sprites.set(key, sprite);
  }

  remove(key: string, destroy = true): boolean {
    if (destroy && this.sprites.get(key)) this.sprites.get(key).destroy();
    return this.sprites.delete(key);
  }

  setX(x: number): void {
    this.sprites.forEach((sprite: Sprite) => {
      sprite.x = x;
    });
  }

  setY(y: number): void {
    this.sprites.forEach((sprite: Sprite) => {
      sprite.y = y;
    });
  }

  setVelocityX(velocityX: number): void {
    this.sprites.forEach((sprite: Sprite) => {
      sprite.setVelocityX(velocityX);
    });
  }

  setVelocityY(velocityY: number): void {
    this.sprites.forEach((sprite: Sprite) => {
      sprite.setVelocityY(velocityY);
    });
  }
}