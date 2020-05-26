import * as Phaser from 'phaser';
import { GameGlobal } from '../GameGlobal';

import { ISceneTilemapData } from '../maps/ISceneTilemapData';
import { SceneTilemapFactory } from '../maps/SceneTilemapFactory';
import { Keys } from '../models/Keys';
import { Actor } from '../actors/Actor';
import { ActorSprite } from '../actors/ActorSprite';
import { ActorFactory } from '../actors/ActorFactory';
import { ActorSearchEvent } from '../../actors/ActorSearchEvent';
import { Hero } from '../../actors/Hero';
import { IActorSprite } from '../actors/IActorSprite';

import { IArea } from '../areas/IArea';
import { ActorEntry } from '../areas/ActorEntry';

import { ScenarioEventManager } from '../events/ScenarioEventManager';

import * as Areas from '../../areas';

export class TestScene extends Phaser.Scene {
  private frame: number;
  private keys: Keys;
  private tilemapFactory: SceneTilemapFactory;
  private actorFactory: ActorFactory;
  private primaryActor: Actor;
  private areaData: IArea; 
  private actors: Actor[];
  private scenarioEvent: ScenarioEventManager;
  private tilemapData: ISceneTilemapData;

  init(): void {
    console.log('start scene TestScene');

    this.frame = 0;

    const cursorKeys = this.input.keyboard.createCursorKeys();
    const actionKey = cursorKeys.space;
    this.keys = new Keys(cursorKeys, actionKey);

    this.areaData = Areas.TestArea;

    this.tilemapFactory = new SceneTilemapFactory(
      this,
      this.areaData.mapFilePath,
      this.areaData.tilesetFilePath,
      this.areaData.tilesetImagePath,
    );

    this.actorFactory = new ActorFactory(this);

    this.scenarioEvent = new ScenarioEventManager(this, GameGlobal,this.keys);
  }

  preload (): void {
    this.tilemapFactory.loadAssets();

    const actorSptiteConfigs = this.areaData.actors.map((entry: ActorEntry) => (entry.spriteConfig));
    this.actorFactory.loadMultipileAssets(actorSptiteConfigs);
  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    this.tilemapData = this.tilemapFactory.create();

    this.primaryActor = this.actorFactory.create('hero', 0, 100, 90, 0, Hero);
    this.primaryActor.keys = this.keys;

    this.actors = [];

    const searchEvent = new ActorSearchEvent(this);
    searchEvent.setEvent(this.primaryActor);

    const sprite = this.physics.add.sprite(200, 200, 'actorA', 9);
    sprite.body.immovable = true;
    sprite.on('search', () => {
      const event = this.areaData.events[0]

      if (event) {
        const eventRange = event.getEvents();
        if (eventRange) this.scenarioEvent.start(this.frame, eventRange);
      }
    });

    this._addActorsCollider();
  }

  update(): void {
    this.frame++;

    if (this.scenarioEvent.isGoing()) {
      // ポーズしないとPhysicsは非同期で動くのでvelocityの設定に従ってスプライトが動いてしまう
      this.physics.world.pause();
      this.scenarioEvent.update(this.frame);
      return;
    }

    // resume()内部で判定していないので判定する
    // (判定が無いと関数内部で無駄に内部でイベントエミッターをemitしたりしてしまう)
    if (this.physics.world.isPaused) this.physics.world.resume();
    
    this.primaryActor.update(this.frame);

    this.actors.forEach((actor: Actor) => {
      actor.update(this.frame);
    });
  }

  private _addActorsCollider(): void {
    const actorsSprite = <ActorSprite[]> this.actors
      .map((actor: Actor) => (actor.sprite))
      .filter((sprite: IActorSprite) => (sprite instanceof ActorSprite));

    if (this.primaryActor.sprite instanceof ActorSprite) {
      this.physics.add.collider(this.primaryActor.sprite, this.tilemapData.staticLayers);
      this.physics.add.collider(this.primaryActor.sprite, actorsSprite);
    }
  }
}