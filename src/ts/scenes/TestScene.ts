import * as Phaser from 'phaser';

import { GameGlobal } from '../GameGlobal';

import { Keys } from '../core/input/Keys';
import { Item } from '../core/models/Item';
import { IActor } from '../core/actors/IActor';
import { ISceneTilemapData } from '../core/maps/ISceneTilemapData';
import { SceneTilemapFactory } from '../core/maps/SceneTilemapFactory';
import { ActorPosition } from '../core/maps/ActorPosition';
import { ActorSpriteFactory } from '../core/actors/ActorSpriteFactory';
import { ActorAnimsFactory } from '../core/actors/ActorAnimsFactory';
import { IArea } from '../core/areas/IArea';
import { ActorColliderRegistrar } from '../core/areas/ActorColliderRegistrar';
import { ActorEventRegistrar } from '../core/areas/ActorEventRegistrar';
import { ActorSpawner } from '../core/areas/ActorSpawner';
import { EventEmitType } from '../core/areas/EventEmitType';
import { ActorSearchEvent } from '../events/ActorSearchEvent';
import { ScenarioEventManager } from '../core/events/ScenarioEventManager';
import { ActorRenderOrder } from '../core/renders/ActorRenderOrder';
import { SaticLayerRenderOerder } from '../core/renders/SaticLayerRenderOerder';
import { CacheKey } from '../core/utils/CacheKey';

import { FieldMenuEvent } from '../events/FieldMenuEvent';
import { EventRangeFactory } from '../core/events/EventRangeFactory';

import * as Areas from '../areas';
import * as Actors from '../actors';

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
    const escapeKey = cursorKeys.shift;
    this.keys = new Keys(cursorKeys, actionKey, escapeKey);

    this.areaData = Areas.TestArea;

    this.tilemapFactory = new SceneTilemapFactory(this, this.areaData.mapFilePath, this.areaData.tilesetFilePath, this.areaData.tilesetImagePath);

    this.scenarioEvent = new ScenarioEventManager(this, GameGlobal,this.keys);

    this.actorSpriteFactory = new ActorSpriteFactory(this);

    this.actorAnimsFactory = new ActorAnimsFactory(this);
    
    const actorEventRegistrar = new ActorEventRegistrar(this.scenarioEvent, this.areaData.events);
    this.actorSpawner = new ActorSpawner(
      GameGlobal,
      this.areaData.actors,
      this.actorSpriteFactory,
      this.actorAnimsFactory,
      actorEventRegistrar.regist.bind(actorEventRegistrar),
      this._addSpawnActorsCollider.bind(this),
      this._afterActorSpawn.bind(this),
    );

    this.actorColliderRegistrar = new ActorColliderRegistrar(this);

    this.actors = [];
  }

  preload (): void {
    this._loadItemIcons();

    this.tilemapFactory.loadAssets();

    this.actorSpawner.preload();
  }
  
  create(): void {
    this._createTilemap();

    this.primaryActor = this._createPrimaryActor();
    
    this._createActors();

    this._cameraSetting();
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

  /**
   * TODO: ここでloadしているのは暫定。Phaser3では全てのシーンで共有のキャッシュを使うので
   *       どこのシーンでも使うアイテムの画像などはOpeningシーンで全てロードする
   */
  private _loadItemIcons(): void {
    // TODO: 同じアイコンを使っていると重複するものがある場合があるので削除する処理を先にやる
    GameGlobal.items.entries.forEach((item: Item) => {
      const iconKey = CacheKey.itemIcon(item.name);
      this.load.image(iconKey, item.iconFilePath);
    });
  }

  private _createActors(): void {
    this.actorSpawner.spawnEntries();

    this.tilemapData.mapData.actorPositions.forEach((actorPosition: ActorPosition) => {
      const actor = this.actors.find((actor: IActor) => (
        actor.id === actorPosition.actorId
      ));

      if (actor) {
        actor.sprite.x = actorPosition.positon.x;
        actor.sprite.y = actorPosition.positon.y;
      }
    });
  }

  private _createTilemap(): void {
    this.tilemapData = this.tilemapFactory.create();

    // set depth
    // マップのレイヤーは
    //  0 : base       : 地面になるレイヤー
    //  1 : underActor : Actorより下に描写されるレイヤー(衝突あり)
    //  2 : overActor  : Actorより上に描写されるレイヤー(衝突なし)
    // で決め打ち(楽なので)
    const base = this.tilemapData.staticLayers[0];
    const underActor = this.tilemapData.staticLayers[1];
    const overActor = this.tilemapData.staticLayers[2];

    if (base) SaticLayerRenderOerder.baseLayer(base);
    if (underActor) SaticLayerRenderOerder.underActorLayer(underActor);
    if (overActor) SaticLayerRenderOerder.overActorLayer(overActor);
  }

  private _createPrimaryActor(): IActor {
    const actor = new Actors.Hero(3030, 'hero');
    const sprite = this.actorSpriteFactory.create(600, 100, 'hero', 0, {size: 0.6, origin: {x: 0.5, y: 1}});
    actor.sprite = sprite;
    actor.keys = this.keys;
    this.actorAnimsFactory.setAnims(sprite);

    // search event
    const searchEvent = new ActorSearchEvent(this.actors);
    searchEvent.setEvent(actor);

    // field menu event
    actor.on('fieldMenu', (() => {
      const fieldMenuEvent = new FieldMenuEvent();
      const fieldMenuEventRange = new EventRangeFactory(fieldMenuEvent).create();
      this.scenarioEvent.start(fieldMenuEventRange);
    }).bind(this));

    // collision
    this._tilemapCollisionSetting(actor);

    ActorRenderOrder.prioritizeY(actor.sprite);

    return actor;
  }

  private _afterActorSpawn(spawnActor: IActor): void {
    this.actors.push(spawnActor);

    ActorRenderOrder.prioritizeY(spawnActor.sprite);
  }

  private _addSpawnActorsCollider(spawnActor: IActor, onlyOverlap: boolean): void {
    // set immovable
    if (spawnActor.sprite instanceof Phaser.Physics.Arcade.Sprite) {
      spawnActor.sprite.setImmovable(true);
    }

    // with primary actor
    this.actorColliderRegistrar.registActorPair(
      spawnActor,
      this.primaryActor,
      () => {spawnActor.emit(EventEmitType.Collide);},
      onlyOverlap,
    );

    // with other actors that has already spawned
    this.actors.forEach((actor: IActor) => {
      this.actorColliderRegistrar.registActorPair(
        spawnActor,
        actor,
        undefined,
        onlyOverlap,
      );
    });

    // with tilemap
    this._tilemapCollisionSetting(spawnActor);
  }

  private _tilemapCollisionSetting(spawnActor: IActor): void {
    // overActorのレイヤーは衝突しない
    const overActorLayerIndex = 2;
    this.tilemapData.staticLayers.forEach((layer: Phaser.Tilemaps.StaticTilemapLayer, index: number) => {
      if (index < overActorLayerIndex) {
        this.actorColliderRegistrar.registActorAndGameObject(spawnActor, layer);
      }
    });
  }

  private _cameraSetting(): void {
    const worldBounds = this.tilemapData.mapData.worldBounce;
    this.cameras.main.setBounds(0, 0, worldBounds.width, worldBounds.height);
    this.cameras.main.startFollow(this.primaryActor.sprite);
  }
}