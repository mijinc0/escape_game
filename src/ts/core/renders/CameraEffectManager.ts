import * as Phaser from 'phaser';
import { ICameraEffect } from './ICameraEffect';

export class CameraEffectManager {
  camera: Phaser.Cameras.Scene2D.Camera;
  effects: ICameraEffect[];

  constructor(camera: Phaser.Cameras.Scene2D.Camera) {
    this.camera = camera;
    this.effects = [];
  }

  addEffect(effect: ICameraEffect): void {
    this.effects.push(effect);
  }

  startEffect(key: string, ...args: any[]): boolean {
    const effect = this.effects.find((effect: ICameraEffect) => effect.name === key);

    if (!effect) {
      console.warn(`camera effect named ${key} is not found.`);
      return false;
    }

    effect.start(this.camera, ...args);

    return true;
  }

  resetEffect(key: string): boolean {
    const effect = this.effects.find((effect: ICameraEffect) => effect.name === key);

    if (!effect) {
      console.warn(`camera effect tagged ${key} is not found.`);
      return false;
    }

    effect.reset();

    return true;
  }

  update(time: number, delta: number): void {
    this.effects.forEach((effect: ICameraEffect) => {
      if (effect.isRunning) {
        effect.update(time, delta);
      }
    });
  }
}
