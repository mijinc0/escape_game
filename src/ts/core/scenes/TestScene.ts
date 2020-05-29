import * as Phaser from 'phaser';
import { GameGlobal } from '../GameGlobal';

import { ISceneTilemapData } from '../maps/ISceneTilemapData';
import { SceneTilemapFactory } from '../maps/SceneTilemapFactory';
import { Keys } from '../models/Keys';
import { IActor } from '../actors/IActor';
import { ActorSpriteFactory } from '../actors/ActorSpriteFactory';
import { ActorAnimsFactory } from '../actors/ActorAnimsFactory';

import { IArea } from '../areas/IArea';
import { ActorColliderRegistrar } from '../areas/ActorColliderRegistrar';
import { ActorEventRegistrar } from '../areas/ActorEventRegistrar';

import { ActorSearchEvent } from '../events/ActorSearchEvent';
import { ScenarioEventManager } from '../events/ScenarioEventManager';
import { ActorSpawner } from '../areas/ActorSpawner';

import * as Areas from '../../areas';
import * as Actors from '../../actors';

export class TestScene extends Phaser.Scene {
  private frame: number;
  private keys: Keys;
  private tilemapFactory: SceneTilemapFactory;
  private primaryActor: IActor;
  private areaData: IArea; 
  private actors: IActor[];
  private scenarioEvent: ScenarioEventManager;
  private tilemapData: ISceneTilemapData;
  private actorSpawner: ActorSpawner;
  private actorSpriteFactory: ActorSpriteFactory;
  private actorAnimsFactory: ActorAnimsFactory;
  private actorColliderRegistrar: ActorColliderRegistrar;

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

    this.scenarioEvent = new ScenarioEventManager(this, GameGlobal,this.keys);

    this.actorSpriteFactory = new ActorSpriteFactory(this);

    this.actorAnimsFactory = new ActorAnimsFactory(this);
    
    const actorEventRegistrar = new ActorEventRegistrar(this.scenarioEvent, this.areaData.events);
    this.actorSpawner = new ActorSpawner(
      this.areaData.actors,
      this.actorSpriteFactory,
      this.actorAnimsFactory,
      actorEventRegistrar.regist.bind(actorEventRegistrar),
      this._addSpawnActorsCollider.bind(this),
      ((actor: IActor) => {this.actors.push(actor)}).bind(this),
    );

    this.actorColliderRegistrar = new ActorColliderRegistrar(this);

    this.actors = [];
  }

  preload (): void {
    this.tilemapFactory.loadAssets();

    this.actorSpawner.preload();
  }
  
  create(): void {
    this.cameras.main.setBackgroundColor(0x9955FF);

    this.tilemapData = this.tilemapFactory.create();

    this.primaryActor = this._createPrimaryActor();

    this.actorSpawner.spawn();
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

    this.actors.forEach((actor: IActor) => {
      actor.update(this.frame);
    });
  }

  private _createPrimaryActor(): IActor {
    const actor = new Actors.Hero(3030, 'hero');
    const sprite = this.actorSpriteFactory.create(150,100, 'hero', 0);
    actor.sprite = sprite;
    actor.keys = this.keys;
    this.actorAnimsFactory.setAnims(sprite);

    const searchEvent = new ActorSearchEvent(this.actors);
    searchEvent.setEvent(actor);

    this.actorColliderRegistrar.registActorAndGameObject(actor, this.tilemapData.staticLayers);

    return actor;
  }

  private _addSpawnActorsCollider(spawnActor: IActor): void {
    // set immovable
    if (spawnActor.sprite instanceof Phaser.Physics.Arcade.Sprite) {
      spawnActor.sprite.setImmovable(true);
    }

    // with primary actor
    this.actorColliderRegistrar.registActorPair(spawnActor, this.primaryActor);

    // with other actors that has already spawned
    this.actors.forEach((actor: IActor) => {
      this.actorColliderRegistrar.registActorPair(spawnActor, actor);
    });

    // with tilemap
    this.actorColliderRegistrar.registActorAndGameObject(spawnActor, this.tilemapData.staticLayers);
  }
}