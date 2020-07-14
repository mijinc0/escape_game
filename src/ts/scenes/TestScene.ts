import * as Phaser from 'phaser';
import * as Actors from '../actors';
import { GameGlobal } from '../GameGlobal';
import { IGameGlobal } from '../core/IGameGlobal';
import { IFieldScene } from '../core/scenes/IFieldScene';
import { AssetCacheKey } from '../core/assets/AssetCacheKey';
import { Keys } from '../core/input/Keys';
import { Direction } from '../core/models/Direction';
import { IActor } from '../core/actors/IActor';
import { ISceneTilemapData } from '../core/maps/ISceneTilemapData';
import { SceneTilemapFactory } from '../core/maps/SceneTilemapFactory';
import { ActorPosition } from '../core/maps/ActorPosition';
import { ActorSpriteFactory } from '../core/actors/ActorSpriteFactory';
import { FourWayAnimsActorSprite } from '../core/actors/FourWayAnimsActorSprite';
import { IField } from '../core/fields/IField';
import { IFieldSceneConfig } from '../core/scenes/IFieldSceneConfig';
import { ActorColliderRegistrar } from '../core/fields/ActorColliderRegistrar';
import { ActorEventRegistrar } from '../core/fields/ActorEventRegistrar';
import { FieldActorsManager } from '../core/fields/FieldActorsManager';
import { FieldActorData } from '../core/fields/FieldActorData';
import { EventEmitType } from '../core/fields/EventEmitType';
import { ActorSearchEvent } from '../events/ActorSearchEvent';
import { EventRangeFactory } from '../core/events/EventRangeFactory';
import { ScenarioEventManager } from '../core/events/ScenarioEventManager';
import { ActorRenderOrder } from '../core/renders/ActorRenderOrder';
import { SaticLayerRenderOerder } from '../core/renders/SaticLayerRenderOerder';
import { FieldMenuEvent } from '../events/FieldMenuEvent';
import { ScenarioEventCommandsFactory } from '../events/ScenarioEventCommandsFactory';
import { GameFields } from '../fields/GameFields';

export class TestScene extends Phaser.Scene implements IFieldScene {
  phaserScene: Phaser.Scene;
  frame: number;
  gameGlobal: IGameGlobal;
  primaryActor: IActor;
  actorsManager: FieldActorsManager;
  scenarioEventManager: ScenarioEventManager;
  keys: Keys;
  
  private tilemapFactory: SceneTilemapFactory;
  private fieldData: IField; 
  private tilemapData: ISceneTilemapData;
  private actorColliderRegistrar: ActorColliderRegistrar;

  private initX: number;
  private initY: number;
  private initDirection: Direction;

  init(config: IFieldSceneConfig): void {
    console.log('== start scene TestScene ==');
    
    // configは型としてはoptionalではないが、`scene.start`の引数として
    // configが渡された時にのコンパイル時の検査を抜けるので、一応確認しておく
    if (!config) {
      throw Error('field config is not found.');
    }

    console.log(`scene data: { fieldId: ${config.fieldId}, initX: ${config.heroX}, initX: ${config.heroY}, initDirection: ${config.heroDirection}}`);

    this.phaserScene = this;
    this.frame = -1;
    this.gameGlobal = GameGlobal;
    this.keys = this._createKeys();
    this.fieldData = this._getFieldData(config.fieldId);
    this.actorColliderRegistrar = new ActorColliderRegistrar(this);
    this.tilemapFactory = new SceneTilemapFactory(this);
    this.scenarioEventManager = this._createScenarioEventManager();
    this.actorsManager = this._createActorsManager();
    this.initX = config.heroX;
    this.initY = config.heroY;
    this.initDirection = config.heroDirection;
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

    if (this.scenarioEventManager.isGoing) {
      this.scenarioEventManager.update();
      return;
    }

    this.anims.resumeAll();
    
    this.primaryActor.update(this.frame);

    this.actorsManager.update(this.frame);
  }

  private _createKeys(): Keys {
    const cursorKeys = this.input.keyboard.createCursorKeys();
    const actionKey = cursorKeys.space;
    const escapeKey = cursorKeys.shift;
    return new Keys(cursorKeys, actionKey, escapeKey);
  }

  private _getFieldData(fieldId: number): IField {
    const field = GameFields.get(fieldId);

    if (!field) {
      throw Error(`Field data is not found (id: ${fieldId})`);
    }

    return field;
  }

  private _createScenarioEventManager(): ScenarioEventManager {
    const scenarioEventManager = new ScenarioEventManager(this);

    scenarioEventManager.on('start', this._startEvent.bind(this));
    scenarioEventManager.on('complete', this._completeEvent.bind(this));

    return scenarioEventManager;
  }

  private _startEvent(): void {
    if (this.primaryActor.sprite) {
      this.primaryActor.sprite.pause();
    }

    this.actorsManager.getSpawnActors().forEach((actor: IActor) => {
      if (actor.sprite) {
        actor.sprite.pause();
      }
    });

    this.physics.pause();
  }

  private _completeEvent(): void {
    if (this.primaryActor.sprite) {
      this.primaryActor.sprite.resume();
    }

    this.actorsManager.getSpawnActors().forEach((actor: IActor) => {
      if (actor.sprite) {
        actor.sprite.resume();
      }
    });

    this.physics.resume();
  }

  private _createActorsManager(): FieldActorsManager {
    if (!this.scenarioEventManager || !this.fieldData) {
      throw Error('can not create FieldActorsManager before create ScenarioEventmanager & FieldData');
    }

    const actorSpriteFactory = new ActorSpriteFactory(this);
    const actorEventRegistrar = new ActorEventRegistrar(this.scenarioEventManager, this.fieldData.events);
    
    return new FieldActorsManager(
      actorSpriteFactory,
      actorEventRegistrar,
      this._addSpawnActorsCollider.bind(this),
      this.fieldData.actors,
    );
  }

  private _spawnActors(): void {
    this._rewriteActorsPositionWithMapdata();

    this.actorsManager.spawnEntries();
  }

  private _rewriteActorsPositionWithMapdata(): void {
    const mapdataActorPositions = this.tilemapData.mapData.actorPositions;

    this.actorsManager.actorData.forEach((data: FieldActorData) => {
      const targetActorId = data.actorObject.id;

      const targetActorPosition = mapdataActorPositions.find((actorPosition: ActorPosition) => (
        actorPosition.actorId === targetActorId 
      ));

      if (targetActorPosition) {
        data.position.x = Math.floor(targetActorPosition.positon.x);
        data.position.y = Math.floor(targetActorPosition.positon.y);
      }
    });
  }

  private _createTilemap(): void {
    this.tilemapData = this.tilemapFactory.create(
      this.fieldData.tilemapKey,
      this.fieldData.tileInfoKey,
      this.fieldData.tileImageKey,
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
    const actor = new Actors.Hero(3030, 'hero');
    const sprite = new FourWayAnimsActorSprite(
      this,
      this.initX,
      this.initY,
      AssetCacheKey.spritesheet('hero'),
      0,
      this.initDirection,
    );

    this.add.existing(sprite);
    this.physics.add.existing(sprite);

    actor.sprite = sprite;
    actor.keys = this.keys;

    // search event
    const actors = this.actorsManager.actorData.map((data: FieldActorData) => (data.actorObject));
    const searchEvent = new ActorSearchEvent(actors);
    searchEvent.setEvent(actor);

    // field menu event
    actor.on('fieldMenu', (() => {
      const fieldMenuEvent = new FieldMenuEvent();
      const fieldMenuEventRange = new EventRangeFactory(fieldMenuEvent).create();
      this.scenarioEventManager.start(fieldMenuEventRange);
    }).bind(this));

    // collision
    this._tilemapCollisionSetting(actor);

    ActorRenderOrder.prioritizeBottom(actor.sprite);

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
    const event = new EventRangeFactory(ScenarioEventCommandsFactory.cameraFadeIn(300)).create();

    this.scenarioEventManager.start(event);
  }
}