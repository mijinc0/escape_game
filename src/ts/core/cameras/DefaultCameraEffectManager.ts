import * as Phaser from 'phaser';
import * as Effect from './effects';
import { CameraEffectManager } from './CameraEffectManager';
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
export class DefaultCameraEffectManager extends CameraEffectManager {
  constructor(scene: Phaser.Scene, effects?: ICameraEffect[]) {
    effects = effects ? effects : [];

    effects.push(
      new Effect.Filter(scene),
    );

    super(effects);
  }

  fadeIn(duration: number, onComplete?: () => void): boolean {
    return this.startEffect(
      'filter',
      {
        duration: duration,
        startAlpha: 1,
        endAlpha: 0,
        startColor: 0x000000,
        endColor: 0x000000,
        onComplete: onComplete,
      },
    );
  }

  fadeOut(duration: number, onComplete?: () => void): boolean {
    return this.startEffect(
      'filter',
      {
        duration: duration,
        startAlpha: 0,
        endAlpha: 1,
        startColor: 0x000000,
        endColor: 0x000000,
        onComplete: onComplete,
      },
    );
  }
}