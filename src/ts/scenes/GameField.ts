import * as Phaser from 'phaser';
import * as Actor from '../core/actors';
import * as Asset from '../core/assets';
import * as Audio from '../core/audios';
import * as Field from '../core/fields';
import * as Scene from '../core/scenes';
import * as Map from '../core/maps';
import * as Event from '../core/events';
import * as Render from '../core/renders';
import * as Input from '../core/input';
import { IGameGlobal } from '../core/IGameGlobal';
import { GameGlobal } from '../GameGlobal';
import { Hero } from '../actors/Hero';
import { ActorSearchEvent } from '../events/ActorSearchEvent';
import { FieldMenuEvent } from '../events/FieldMenuEvent';
import { ScenarioEventCommandsFactory } from '../events/ScenarioEventCommandsFactory';
import { CameraEffectManagerFactory } from '../renders/CameraEffectManagerFactory';
import { GameFields } from '../fields/GameFields';

export class GameField extends Phaser.Scene implements Scene.IFieldScene {
  readonly type = Scene.SceneType.Field;

  phaserScene: Phaser.Scene;
  customScene: Scene.ICustomSceneManager;
  frame: number;
  gameGlobal: IGameGlobal;
  sceneConfig: Scene.IFieldSceneConfig;
  primaryActor: Actor.IFieldActor;
  actorsManager: Field.FieldActorsManager;
  scenarioEventManager: Event.ScenarioEventManager;
  cameraEffectManager: Render.CameraEffectManager;
  audioManager: Audio.IAudioManager;
  keys: Input.Keys;

  private tilemapData: Map.ISceneTilemapData;
  private fieldData: Field.IField;
  private actorColliderRegistrar: Field.ActorColliderRegistrar;

  init(config: Scene.IFieldSceneConfig): void {
    console.log('== start scene TestScene ==');

    // configは型としてはoptionalではないが、`scene.start`の引数として
    // configが渡された時にのコンパイル時の検査を抜けるので、一応確認しておく
    if (!config) {
      throw Error('field config is not found.');
    }

    console.log(
      `scene data: { fieldId: ${config.fieldId}, initX: ${config.heroX}, initX: ${config.heroY}, initDirection: ${config.heroDirection}}`,
    );

    this.phaserScene = this;
    this.customScene = new Scene.CustomSceneManager(this);
    this.sceneConfig = config;
    this.frame = -1;
    this.gameGlobal = GameGlobal;
    this.keys = this._createKeys();
    this.fieldData = this._getFieldData(config.fieldId);
    this.actorColliderRegistrar = new Field.ActorColliderRegistrar(this);
    this.scenarioEventManager = this._createScenarioEventManager();
    this.cameraEffectManager = CameraEffectManagerFactory.create(this);
    this.actorsManager = this._createActorsManager();
    this.audioManager = new Audio.AudioManager(this, GameGlobal.audioConfig);
  }

  create(): void {
    this._createTilemap();

    this.primaryActor = this._createPrimaryActor();

    this._spawnActors();

    this._cameraSetting();

    this._sceneFadeInIfNeed();
  }

  update(time: number, delta: number): void {
    this.frame++;

    if (this.scenarioEventManager.isGoing) {
      this.scenarioEventManager.update(time, delta);
    } else {
      this.primaryActor.update(this);
      this.actorsManager.update(this);
    }

    this.cameraEffectManager.update(time, delta);
  }

  private _createKeys(): Input.Keys {
    const cursorKeys = this.input.keyboard.createCursorKeys();
    const actionKey = cursorKeys.space;
    const escapeKey = cursorKeys.shift;
    return new Input.Keys(cursorKeys, actionKey, escapeKey);
  }

  private _getFieldData(fieldId: number): Field.IField {
    const field = GameFields.get(fieldId);

    if (!field) {
      throw Error(`Field data is not found (id: ${fieldId})`);
    }

    return field;
  }

  private _createScenarioEventManager(): Event.ScenarioEventManager {
    const scenarioEventManager = new Event.ScenarioEventManager(this);

    scenarioEventManager.on('start', this._startEvent.bind(this));
    scenarioEventManager.on('complete', this._completeEvent.bind(this));

    return scenarioEventManager;
  }

  private _startEvent(): void {
    if (this.primaryActor.sprite) {
      this.primaryActor.sprite.pause();
    }

    this.actorsManager.getSpawnActors().forEach((actor: Actor.IFieldActor) => {
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

    this.actorsManager.getSpawnActors().forEach((actor: Actor.IFieldActor) => {
      if (actor.sprite) {
        actor.sprite.resume();
      }
    });

    this.physics.resume();
  }

  private _createActorsManager(): Field.FieldActorsManager {
    if (!this.scenarioEventManager || !this.fieldData) {
      throw Error('can not create FieldActorsManager before create ScenarioEventmanager & FieldData');
    }

    const actorSpriteFactory = new Actor.ActorSpriteFactory(this);
    const actorEventManager = new Field.ActorEventManager(this.scenarioEventManager, this.fieldData.events);

    return new Field.FieldActorsManager(
      actorSpriteFactory,
      actorEventManager,
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

    this.actorsManager.actorData.forEach((data: Field.FieldActorData) => {
      const targetActorId = data.actorObject.id;

      const targetActorPosition = mapdataActorPositions.find(
        (actorPosition: Map.ActorPosition) => actorPosition.actorId === targetActorId,
      );

      if (targetActorPosition) {
        data.position.x = Math.floor(targetActorPosition.positon.x);
        data.position.y = Math.floor(targetActorPosition.positon.y);
      }
    });
  }

  private _createTilemap(): void {
    const tilemapFactory = new Map.SceneTilemapFactory(this);

    this.tilemapData = tilemapFactory.create(
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

    if (base) Render.SaticLayerRenderOerder.baseLayer(base);
    if (underActor) Render.SaticLayerRenderOerder.underActorLayer(underActor);
    if (overActor) Render.SaticLayerRenderOerder.overActorLayer(overActor);
  }

  private _createPrimaryActor(): Actor.IFieldActor {
    const actor = new Hero(3030, 'hero');
    const sprite = new Actor.FourWayAnimsActorSprite(
      this,
      this.sceneConfig.heroX,
      this.sceneConfig.heroY,
      Asset.AssetCacheKey.spritesheet('hero'),
      0,
      this.sceneConfig.heroDirection,
    );

    this.add.existing(sprite);
    this.physics.add.existing(sprite);

    sprite.body.setSize(12, 12, false);
    sprite.body.setOffset(10, 20);

    actor.sprite = sprite;

    // search event
    const actors = this.actorsManager.actorData.map((data: Field.FieldActorData) => data.actorObject);
    const searchEvent = new ActorSearchEvent(actors);
    searchEvent.setEvent(actor);

    // field menu event
    actor.on('fieldMenu', () => {
      const fieldMenuEvent = new FieldMenuEvent();
      const fieldMenuEventRange = new Event.EventRangeFactory(fieldMenuEvent).create();
      this.scenarioEventManager.start(fieldMenuEventRange);
    });

    // collision
    this._tilemapCollisionSetting(actor);

    Render.ActorRenderOrder.prioritizeBottom(actor.sprite);

    return actor;
  }

  private _addSpawnActorsCollider(spawnActor: Actor.IFieldActor, onlyOverlap: boolean): void {
    // set immovable (GameObject同士が接触した時の反動で動かないようにする設定)
    if (spawnActor.sprite instanceof Phaser.Physics.Arcade.Sprite) {
      spawnActor.sprite.setImmovable(true);
    }

    // with primary actor
    this.actorColliderRegistrar.registActorPair(
      spawnActor,
      this.primaryActor,
      () => {
        spawnActor.emit(Field.EventEmitType.Collide);
      },
      onlyOverlap,
    );

    // with other actors that has already spawned
    const spawnActors = this.actorsManager.getSpawnActors();
    spawnActors.forEach((actor: Actor.IFieldActor) => {
      this.actorColliderRegistrar.registActorPair(spawnActor, actor, undefined, onlyOverlap);
    });

    // with tilemap
    this._tilemapCollisionSetting(spawnActor);
  }

  private _tilemapCollisionSetting(spawnActor: Actor.IFieldActor): void {
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

  private _sceneFadeInIfNeed(): void {
    // もしcreateフェーズでセットされたイベントがあればそれを優先するのでここでは何もしない
    if (this.scenarioEventManager.events.length > 0) return;

    const event = new Event.EventRangeFactory(ScenarioEventCommandsFactory.cameraFadeInAll(300)).create();

    this.scenarioEventManager.start(event);
  }
}
