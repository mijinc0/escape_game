import * as Phaser from 'phaser';
import { EventEmitter } from 'events';
import { ICameraEffect } from '../ICameraEffect';

export class SceneCameraEffect extends EventEmitter implements ICameraEffect {
  name = 'sceneCameraEffect';
  
  scene: Phaser.Scene;
  
  isRunning: boolean;

  constructor(scene: Phaser.Scene) {
    super();

    this.scene = scene;
    this.isRunning = false;
  }

  start(...args: any[]): boolean {
    return false;
  };
  
  reset(): boolean {
    return false;
  };

  update(time: number, delta: number): void {
  }; 
}