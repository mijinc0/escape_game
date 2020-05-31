import { IActorEntry } from './IActorEntry';
import { IActorStatusPage } from './IActorStatusPage';
import { IActor } from '../actors/IActor';
import { IActorSpriteFactory } from '../actors/IActorSpriteFactory';
import { IActorAnimsFactory } from '../actors/IActorAnimsFactory';
import { Predicate } from '../models/Predicate';
import { IGameGlobal } from '../IGameGlobal';

type MappedEntry = {
  entry: IActorEntry,
  actor: IActor,
};

type EventSettingCallback = (spawnActor: IActor, page: IActorStatusPage) => void;
type CollisionSettingCallback = (spawnActor: IActor, onlyOverlap: boolean) => void;
type AfterSpawnCallback = (spawnActor: IActor) => void;

export class ActorSpawner {
  private gameGlobal: IGameGlobal;
  private actorEntries: MappedEntry[];
  private actorSpriteFactory: IActorSpriteFactory;
  private actorAnimsFactory: IActorAnimsFactory;
  // callbacks
  private eventSettingCallback: EventSettingCallback;
  private collisionSettingCallback: CollisionSettingCallback;
  private afterSpawnCallback: AfterSpawnCallback; 

  constructor(
    gameGlobal: IGameGlobal,
    actorEntries: IActorEntry[],
    actorSpriteFactory: IActorSpriteFactory,
    actorAnimsFactory: IActorAnimsFactory,
    eventSettingCallback: EventSettingCallback,
    collisionSettingCallback: CollisionSettingCallback,
    afterSpawnCallback?: AfterSpawnCallback,
  ) {
    this.gameGlobal = gameGlobal;
    this.actorEntries = actorEntries.map((entry: IActorEntry) => ({entry: entry, actor: null}));
    this.actorSpriteFactory = actorSpriteFactory;
    this.actorAnimsFactory = actorAnimsFactory;
    this.eventSettingCallback = eventSettingCallback;
    this.collisionSettingCallback = collisionSettingCallback;
    this.afterSpawnCallback = afterSpawnCallback ? afterSpawnCallback : null;
  }

  preload(): void {
    this.actorEntries.forEach((entry: MappedEntry) => {
      const actorSptiteConfigs = entry.entry.statusPages.map((page: IActorStatusPage) => (page.spriteConfig));
      this.actorSpriteFactory.loadMultipileAssets(actorSptiteConfigs);
    });
  }

  spawnEntries(): void {
    this.actorEntries.forEach((entry: MappedEntry) => {      
      this._spawnActor(entry.entry);
    });
  }

  update(): void {
    this.actorEntries.forEach((entry: MappedEntry) => {
      if (entry.actor) {
        this._updateActor(entry.actor, entry.entry);
      } else {
        this._spawnActor(entry.entry);
      }
    });
  }

  private _updateActor(actor: IActor, entry: IActorEntry): void {
    // 1. get status page that matches current criteria
    const page = entry.statusPages.find((page: IActorStatusPage) => (
      this._checkSpawnCriteria(page.criteria)
    ));

    // 2. if not found, continue current status
    if (!page) return;

    // 3. change animation settings
    this.actorAnimsFactory.setAnims(actor.sprite, page.spriteConfig.key);

    // 4. events setting
    actor.removeAllListeners('search');
    actor.removeAllListeners('collide');
    this.eventSettingCallback(actor, page);
  }

  private _spawnActor(entry: IActorEntry): void {
    const page = this._getSpawnPage(entry);
      
    if (!page) return;
    
    // 1. create sprite
    const x = entry.position.x;
    const y = entry.position.y;
    const spriteKey = page.spriteConfig.key;
    const initFrame = page.initFrame;
    
    const sprite = this.actorSpriteFactory.create(x, y, spriteKey, initFrame, page.bodyConfig);
    
    // 2. create & set walking anims
    this.actorAnimsFactory.setAnims(sprite);

    // 3. actor object setting
    const actor = entry.actorObject;
    const direction = entry.direction;
    const eventId = page.eventId;
    
    actor.sprite = sprite;
    actor.eventId = eventId;
    actor.direction = direction;

    // 4. event setting
    this.eventSettingCallback(actor, page);

    // 5. collision setting
    const overlapOnly = page.bodyConfig ? page.bodyConfig.overlapOnly : false;
    this.collisionSettingCallback(actor, overlapOnly);

    // 6. call after spawn callback
    if (this.afterSpawnCallback) this.afterSpawnCallback(actor);
  }

  private _getSpawnPage(entry: IActorEntry): IActorStatusPage|null {
    const page = entry.statusPages.find((page: IActorStatusPage) => (
      this._checkSpawnCriteria(page.criteria)
    ));

    return page ? page : null;
  }

  private _checkSpawnCriteria(criteria: Predicate<IGameGlobal>|undefined): boolean {
    // 条件はoptional。これがundefinedの場合は無条件にスポーンするものとしてtrueを返す
    if (!criteria) return true;

    return criteria(this.gameGlobal);
  }
}