import { EventEmitType } from './EventEmitType';
import { IActorEntry } from './IActorEntry';
import { IActorStatusPage } from './IActorStatusPage';
import { IActorEventRegistrar } from './IActorEventRegistrar';
import { IActor } from '../actors/IActor';
import { IActorSprite } from '../actors/IActorSprite';
import { IActorSpriteFactory } from '../actors/IActorSpriteFactory';
import { IActorAnimsFactory } from '../actors/IActorAnimsFactory';

type SpawnCriteriaCallback = () => boolean;
type CollisionSettingCallback = (spawnActor: IActor, onlyOverlap: boolean) => void;

export class AreaActorsManager {
  private actorEntries: IActorEntry[];
  private actorSpriteFactory: IActorSpriteFactory;
  private actorAnimsFactory: IActorAnimsFactory;
  private actorEventRegistrar: IActorEventRegistrar;

  private collisionSettingCallback: CollisionSettingCallback;

  /**
   * 
   * @param actorEntries 
   * @param actorSpriteFactory 
   * @param actorAnimsFactory 
   * @param actorEventRegistrar
   * @param collisionSettingCallback スポーンまたはページが切り替わったActorに衝突判定を設定するためのコールバック
   */
  constructor(
    actorSpriteFactory: IActorSpriteFactory,
    actorAnimsFactory: IActorAnimsFactory,
    actorEventRegistrar: IActorEventRegistrar,
    collisionSettingCallback: CollisionSettingCallback,
    actorEntries?: IActorEntry[],
  ) {
    this.actorEntries = actorEntries ? actorEntries : [];
    this.actorSpriteFactory = actorSpriteFactory;
    this.actorAnimsFactory = actorAnimsFactory;
    this.actorEventRegistrar = actorEventRegistrar;
    this.collisionSettingCallback = collisionSettingCallback;
  }

  setEntries(actorEntries: IActorEntry[]): void {
    this.actorEntries = actorEntries;
  }

  getSpawnActors(): IActor[] {
    return this.actorEntries
      .filter((entry: IActorEntry) => (entry.isSpawn))
      .map((entry: IActorEntry) => (entry.actorObject));
  }

  spawnEntries(): void {
    this.actorEntries.forEach((entry: IActorEntry) => {
      this._updateActorStatus(entry);
    });
  }

  update(frame: number): void {
    this.actorEntries.forEach((entry: IActorEntry) => {
      this._updateActorStatus(entry);
      
      entry.actorObject.update(frame);
    });
  }
  
  private _updateActorStatus(entry: IActorEntry): void {    
    // 1. get status page that matches current criteria
    const pageIndex = this._getCurrentPageIndex(entry);

    // 2. if same as currentPageIndex, return immediately
    if (pageIndex === entry.currentPageIndex) return;

    // 3. if page is not found, actor will despawn
    if (pageIndex === -1) {
      this._despawnActor(entry);
      return;
    }

    // 4. if actor is not spawn, actor will spawn
    if (!entry.isSpawn) {
      this._spawnActor(entry, pageIndex);
      return;
    }

    // 5. if actor already spawn & change page index, change status
    this._changeActorStatus(entry, pageIndex);
  }

  private _spawnActor(entry: IActorEntry, pageIndex: number): void {
    const actor = entry.actorObject;

    // 1. at first, reset actor status (sprite, events)
    this._resetActorStatus(actor);
    
    // 2. create sprite    
    actor.sprite = this._createActorSprite(entry, pageIndex);

    // 3. set actor properties, events
    this._changeActorStatus(entry, pageIndex);

    // 4. set spawn flag
    entry.isSpawn = true;
  }

  private _despawnActor(entry: IActorEntry): void {
    if (!entry.isSpawn) return;

    this._resetActorStatus(entry.actorObject);
    entry.isSpawn = false;
  }

  private _changeActorStatus(entry: IActorEntry, pageIndex: number): void {
    const page = this._getPage(entry, pageIndex);
    const actor = entry.actorObject;

    // 1. change sprite txture and anims
    const currentSpriteTextureKey = actor.sprite.spriteKey;
    if (currentSpriteTextureKey != page.spriteKey) {
      this.actorAnimsFactory.setAnims(actor.sprite, page.spriteKey);
    }

    // 2. change actor object settings
    actor.direction = entry.direction;
    actor.eventId = page.eventId;

    // 3. event setting
    this._setEvents(actor, page);

    // 4. collision setting
    this._setCollisionSettings(actor, page.overlapOnly);

    // 5. change currentPageIndex
    entry.currentPageIndex = pageIndex;

    // 6. emit "Immediately" event
    actor.emit(EventEmitType.Immediately);
  }

  private _getCurrentPageIndex(entry: IActorEntry): number {
    return entry.statusPages.findIndex((page: IActorStatusPage) => (
      this._checkSpawnCriteria(page.criteria)
    ));
  }

  private _getPage(entry: IActorEntry, pageIndex: number): IActorStatusPage {
    const page = entry.statusPages[pageIndex];

    if (!page) {
      throw Error(`actor status page is not found (actor: ${entry.actorObject.id}, page: ${pageIndex})`);
    }

    return page;
  }

  private _checkSpawnCriteria(criteria?: SpawnCriteriaCallback): boolean {
    // 条件はoptional。これがundefinedの場合は無条件にスポーンするものとしてtrueを返す
    if (!criteria) return true;

    return criteria();
  }

  private _resetActorStatus(actor: IActor): void {
    actor.removeAllListeners();
    
    if (actor.sprite) {
      actor.sprite.destroy();
    }
  }

  private _createActorSprite(entry: IActorEntry, pageIndex: number): IActorSprite {
    const page = entry.statusPages[pageIndex];

    const x = entry.position.x;
    const y = entry.position.y;
    const spriteKey = page.spriteKey;
    const initFrame = page.initFrame;
    
    return this.actorSpriteFactory.create(x, y, spriteKey, initFrame, page.bodyConfig);
  }

  private _setEvents(actor: IActor, page: IActorStatusPage): void {
    this.actorEventRegistrar.regist(actor, page);
  }

  private _setCollisionSettings(actor: IActor, overlapOnly?: boolean): void {
    overlapOnly = overlapOnly ? overlapOnly : false;
    this.collisionSettingCallback(actor, overlapOnly);
  }
}