import * as Phaser from 'phaser';

import { SceneTilemapFactory } from '../map/SceneTilemapFactory';

export class TestScene extends Phaser.Scene {
  private tilemapFactory: SceneTilemapFactory;

  init(): void {
    console.log('start scene TestScene');

    this.tilemapFactory = new SceneTilemapFactory(
      this,
      'assets/map/sample_map.json',
      'assets/tileset/sample_tile.json',
      'assets/tileset/sample_tile.png'
    );
  }

  preload (): void {
    this.tilemapFactory.loadAssets();
  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    this.tilemapFactory.create();
  }
  
  update(): void {}
}