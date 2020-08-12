import * as Phaser from 'phaser';

export interface ICameraEffect {
  readonly name: string;

  isRunning: boolean;

  start(camera: Phaser.Cameras.Scene2D.Camera, ...args: any[]): void;

  reset(): void;

  update(time: number, delta: number): void;
}
