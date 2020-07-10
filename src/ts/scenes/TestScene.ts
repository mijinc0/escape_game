import * as Phaser from 'phaser';
import * as Actors from '../actors';
import { GameGlobal } from '../GameGlobal';
import { AssetCacheKey } from '../core/assets/AssetCacheKey';
import { Keys } from '../core/input/Keys';
import { Direction } from '../core/models/Direction';
import { ISceneData } from '../core/models/ISceneData';
import { IActor } from '../core/actors/IActor';
import { ISceneTilemapData } from '../core/maps/ISceneTilemapData';
import { SceneTilemapFactory } from '../core/maps/SceneTilemapFactory';
import { ActorPosition } from '../core/maps/ActorPosition';
import { ActorSpriteFactory } from '../core/actors/ActorSpriteFactory';
import { ActorAnimsFactory } from '../core/actors/ActorAnimsFactory';
import { IArea } from '../core/areas/IArea';
import { ActorColliderRegistrar } from '../core/areas/ActorColliderRegistrar';
import { ActorEventRegistrar } from '../core/areas/ActorEventRegistrar';
import { AreaActorsManager } from '../core/areas/AreaActorsManager';
import { IActorEntry } from '../core/areas/IActorEntry';
import { EventEmitType } from '../core/areas/EventEmitType';
import { ActorSearchEvent } from '../events/ActorSearchEvent';
import { SceneCommandsFactory } from '../events/SceneCommandsFactory';
import { EventRangeFactory } from '../core/events/EventRangeFactory';
import { ScenarioEventManager } from '../core/events/ScenarioEventManager';
import { ActorRenderOrder } from '../core/renders/ActorRenderOrder';
import { SaticLayerRenderOerder } from '../core/renders/SaticLayerRenderOerder';
import { FieldMenuEvent } from '../events/FieldMenuEvent';
import { GameAreas } from '../areas/GameAreas';

export class TestScene extends Phaser.Scene {
  private frame: number;
  private keys: Keys;
  private tilemapFactory: SceneTilemapFactory;
  private primaryActor: IActor;
  private areaData: IArea; 
  private scenarioEvent: ScenarioEventManager;
  private tilemapData: ISceneTilemapData;
  private actorsManager: AreaActorsManager;
  private actorColliderRegistrar: ActorColliderRegistrar;

  private initX: number;
  private initY: number;
  private initDirection: Direction;

  init(data: ISceneData): void {
    console.log('== start scene TestScene ==');
    
    // dataは型としてはoptionalではないが、`scene.start`の引数として
    // dataが渡された時にのコンパイル時の検査を抜けるので、一応確認しておく
    if (!data) {
      throw Error('scene data is not found.');
    }

    this.frame = 0;
    this.keys = this._createKeys();
    this.areaData = this._getAreaData(data.areaId);
    this.actorColliderRegistrar = new ActorColliderRegistrar(this);
    this.tilemapFactory = new SceneTilemapFactory(this);
    this.scenarioEvent = new ScenarioEventManager(this, GameGlobal,this.keys);
    this.actorsManager = this._createActorsManager();
    this.initX = data.heroX;
    this.initY = data.heroY;
    this.initDirection = data.heroDirection;
  }
  
  create(): void {
    this._createTilemap();

    this.primaryActor = this._createPrimaryActor();
    
    this._spawnActors();

    this._cameraSetting();

    this._sceneFadeIn();
  }

  update(): void {
    this.frame++;

    if (this.scenarioEvent.isGoing()) {
      // ポーズしないとPhysicsが動くのでvelocityの設定に従ってスプライトが動いてしまう
      this.physics.world.pause();
      this.scenarioEvent.update(this.frame);
      return;
    }

    // this.physics.world.resume()内部で判定していないので判定する
    // (判定が無いと関数内部で無駄に内部でイベントをemitしてしまう)
    if (this.physics.world.isPaused) this.physics.world.resume();
    
    this.primaryActor.update(this.frame);

    this.actorsManager.update(this.frame);
  }

  private _createKeys(): Keys {
    const cursorKeys = this.input.keyboard.createCursorKeys();
    const actionKey = cursorKeys.space;
    const escapeKey = cursorKeys.shift;
    return new Keys(cursorKeys, actionKey, escapeKey);
  }

  private _getAreaData(areaId: number): IArea {
    const area = GameAreas.get(areaId);

    if (!area) {
      throw Error(`Area data is not found (id: ${areaId})`);
    }

    return area;
  }

  private _createActorsManager(): AreaActorsManager {
    const actorSpriteFactory = new ActorSpriteFactory(this);
    const actorAnimsFactory = new ActorAnimsFactory(this);
    const actorEventRegistrar = new ActorEventRegistrar(this.scenarioEvent, this.areaData.events);
    
    return new AreaActorsManager(
      actorSpriteFactory,
      actorAnimsFactory,
      actorEventRegistrar,
      this._addSpawnActorsCollider.bind(this),
      this.areaData.actors,
    );
  }

  private _spawnActors(): void {
    this._rewriteActorsPositionWithMapdata();

    this.actorsManager.spawnEntries();
  }

  private _rewriteActorsPositionWithMapdata(): void {
    const mapdataActorPositions = this.tilemapData.mapData.actorPositions;

    this.actorsManager.actorEntries.forEach((entry: IActorEntry) => {
      const targetActorId = entry.actorObject.id;


      const targetActorPosition = mapdataActorPositions.find((actorPosition: ActorPosition) => (
        actorPosition.actorId === targetActorId 
      ));

      if (targetActorPosition) {
        entry.position.x = Math.floor(targetActorPosition.positon.x);
        entry.position.y = Math.floor(targetActorPosition.positon.y);
      }
    });
  }

  private _createTilemap(): void {
    this.tilemapData = this.tilemapFactory.create(
      this.areaData.tilemapKey,
      this.areaData.tileInfoKey,
      this.areaData.tileImageKey,
    );

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
    const actorSpriteFactory = new ActorSpriteFactory(this);
    const actorAnimsFactory = new ActorAnimsFactory(this);

    const actor = new Actors.Hero(3030, 'hero');
    const sprite = actorSpriteFactory.create(
      this.initX,
      this.initY,
      AssetCacheKey.spritesheet('hero'),
      0,
      {size: 0.6, origin: {x: 0.5, y: 1}}
    );
    actor.sprite = sprite;
    actor.keys = this.keys;
    actor.direction = this.initDirection;
    actorAnimsFactory.setWalkingAnims(sprite);

    // search event
    const actors = this.areaData.actors.map((entry: IActorEntry) => (entry.actorObject));
    const searchEvent = new ActorSearchEvent(actors);
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
    const spawnActors = this.actorsManager.getSpawnActors();
    spawnActors.forEach((actor: IActor) => {
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
    this.cameras.main.setZoom(1);
  }

  private _sceneFadeIn(): void {
    const event = new EventRangeFactory(SceneCommandsFactory.cameraFadeIn(300)).create();

    this.scenarioEvent.start(event);
  }
}