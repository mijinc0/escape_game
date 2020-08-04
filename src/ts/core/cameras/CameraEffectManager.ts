import * as Phaser from 'phaser';
import { ICameraEffect } from './ICameraEffect';

/**
 * POEM:
 * CameraEffectManagerはSceneの参照を持たない。Sceneの参照は各エフェクト(ICameraEffectを実装したクラス)が持つ。
 * これによって(今回は無いが)複数のシーンで使えるエフェクト、特定のシーンでのみ使えるエフェクトなどを分けても
 * 同じイベントマネージャでエフェクトを扱える。
 * (可能であればイベント廻りもマネージャにシーンを持たせずに各イベントにシーンを持たせてしまったほうが良かったかもしれない)
 * 
 * cameraはシーンのメインカメラを使うものとする。
 * (複数カメラは想定しない)
 */
export class CameraEffectManager {
  effects: Map<string, ICameraEffect>;

  constructor(effects?: ICameraEffect[]) {
    this.effects = new Map<string, ICameraEffect>();

    effects = effects ? effects : [];
    
    this.addEffect(...effects);
  }

  startEffect(key: string, ...effectArgs: any[]): boolean {
    const effect = this.effects.get(key);

    if (!effect) {
      console.warn(`camera effect is not found {key: ${key}}`);
    }

    return effect ? effect.start(...effectArgs) : false;
  }

  resetEffect(key: string): boolean {
    const effect = this.effects.get(key);

    if (!effect) {
      console.warn(`camera effect is not found {key: ${key}}`);
    }

    return effect ? effect.reset() : false;
  }

  addEffect(...effects: ICameraEffect[]): void {
    effects.forEach((effect: ICameraEffect) => {
      this.effects.set(effect.name, effect);
    });
  }

  update(time: number, delta: number): void {
    this.effects.forEach((effect: ICameraEffect) => {
      effect.update(time, delta);
    });
  }
}