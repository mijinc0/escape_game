import * as Phaser from 'phaser';

import { SceneTilemapFactory } from '../maps/SceneTilemapFactory';
import { Keys } from '../models/Keys';
import { Actor } from '../actors/Actor';
import { ActorSprite } from '../actors/ActorSprite';
import { ActorFactory } from '../actors/ActorFactory';
import { ActorSearchEvent } from '../../actors/ActorSearchEvent';
import { Hero } from '../../actors/Hero';

import { TextBox } from '../ui/objects/TextBox';
import { Message } from '../events/commands/Message';

export class TestScene extends Phaser.Scene {
  private keys: Keys;
  private tilemapFactory: SceneTilemapFactory;
  private actorFactory: ActorFactory;
  private primaryActor: Actor;

  init(): void {
    console.log('start scene TestScene');

    const cursorKeys = this.input.keyboard.createCursorKeys();
    const actionKey = cursorKeys.space;
    this.keys = new Keys(cursorKeys, actionKey);

    this.tilemapFactory = new SceneTilemapFactory(
      this,
      'assets/map/sample_map.json',
      'assets/tileset/sample_tile.json',
      'assets/tileset/sample_tile.png'
    );

    this.actorFactory = new ActorFactory(this);
  }

  preload (): void {
    this.tilemapFactory.loadAssets();

    this.actorFactory.loadMultipileAssets([
      {  name: 'hero', spritesheetPath: 'assets/sprites/actor.png', frameWidth: 32, frameHeight: 32},
    ]);
  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);
    const tilemapData = this.tilemapFactory.create();

    this.primaryActor = this.actorFactory.create('hero', 100, 90, 0, Hero);
    this.primaryActor.keys = this.keys;

    const searchEvent = new ActorSearchEvent(this);
    searchEvent.setEvent(this.primaryActor);

    const sprite = this.physics.add.sprite(200, 200, 'actorA', 9);
    sprite.body.immovable = true;
    sprite.on('search', () => {
      console.log('is searched!!!!!');
    });

    if (this.primaryActor.sprite instanceof ActorSprite) {
      this.physics.add.collider(this.primaryActor.sprite, tilemapData.staticLayers);
      this.physics.world.addCollider(sprite, this.primaryActor.sprite);
    }

    this.text = new Message(
      this,
      `[john]\n this is test this is test this is test\\!this is test this is test this is test this is test this is test this is test`,
    );
    this.text.keys = this.keys;
  }
  
  private frame = 0;
  private text: Message;

  update(): void {
    this.primaryActor.update(this.frame);

    this.text.update(this.frame);

    this.frame++;
  }
}