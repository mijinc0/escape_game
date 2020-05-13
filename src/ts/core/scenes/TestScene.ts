import * as Phaser from 'phaser';

import { SceneTilemapFactory } from '../maps/SceneTilemapFactory';
import { Actor } from '../actors/Actor';
import { ActorSprite } from '../actors/ActorSprite';
import { LayeredSprite } from '../actors/LayeredSprite';

export class TestScene extends Phaser.Scene {
  private tilemapFactory: SceneTilemapFactory;
  private primaryActor: Actor;

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

    this.load.spritesheet('actorA', 'assets/sprites/actor.png', {frameWidth: 32, frameHeight: 32});
    this.load.spritesheet('actor_attr', 'assets/sprites/actor_attr.png', {frameWidth: 32, frameHeight: 32});
  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);
    this.tilemapFactory.create();

    this.anims.create({
      key: 'actorLeft',
      frames: this.anims.generateFrameNumbers('actorA', {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      frames: this.anims.generateFrameNumbers('actor_attr', {start: 0, end: 3}),
      frameRate: 5,
      repeat: -1,
    });

    const actor = new ActorSprite(this, 100, 100, 'actorA', 1);
    this.add.existing(actor);

    const actorAnim = this.anims.get('actorLeft');
    actor.anims.play(actorAnim);
  }
  
  private frame = 0;

  update(): void {
    if (this.frame === 300) {
      //this.primaryActor.stop(9);
    }

    this.frame++;
  }
}