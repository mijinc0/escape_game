import * as Phaser from 'phaser';
import * as Scene from '../core/scenes';
import * as Render from '../core/renders';
import { NightEffect } from './cameraEffects/NightEffect';

export class CameraEffectManagerFactory {
  static create(scene: Phaser.Scene): Render.CameraEffectManager {
    const manager = new Render.CameraEffectManager(scene.cameras.main);

    const effects = [
      new NightEffect(),
    ];
    
    effects.forEach((effect: Render.ICameraEffect) => {
      manager.addEffect(effect);
    });

    return manager;
  }
}