import { EventEmitType } from './EventEmitType';
import { IActorEntry } from './IActorEntry';
import { IActorStatusPage } from './IActorStatusPage';
import { IActorEventRegistrar } from './IActorEventRegistrar';
import { IActor } from '../actors/IActor';
import { IActorSprite } from '../actors/IActorSprite';
import { ActorSpriteTypes } from '../actors/ActorSpriteTypes';
import { IActorSpriteFactory } from '../actors/IActorSpriteFactory';

type SpawnCriteriaCallback = () => boolean;
type CollisionSettingCallback = (spawnActor: IActor, onlyOverlap: boolean) => void;

export class AreaActorsManager {
  actorEntries: IActorEntry[];
  
  private actorSpriteFactory: IActorSpriteFactory;
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
    actorEventRegistrar: IActorEventRegistrar,
    collisionSettingCallback: CollisionSettingCallback,
    actorEntries?: IActorEntry[],
  ) {
    this.actorEntries = actorEntries ? actorEntries : [];
    this.actorSpriteFactory = actorSpriteFactory;
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

    // 4. if actor already spawn & change page index, change status
    this._spawnOrRespawnActor(entry, pageIndex);
  }

  private _despawnActor(entry: IActorEntry): void {
    if (!entry.isSpawn) return;

    this._resetActorStatus(entry.actorObject);
    entry.isSpawn = false;
  }

  /**
   * 最初のスポーンも既にスポーンしているActorの状態を変えるリスポーンも処理は同じ
   * @param entry 
   * @param pageIndex 
   */
  private _spawnOrRespawnActor(entry: IActorEntry, pageIndex: number): void {
    const page = this._getPage(entry, pageIndex);
    const actor = entry.actorObject;

    // 1. create new sprite
    const newSprite = this._createActorSprite(entry, pageIndex);

    // 2. reset actor status & set new sprite
    // (create -> reset -> set new sprite の順でないとリスポーンした時に座標が戻ってしまうので注意)
    this._resetActorStatus(actor);
    actor.sprite = newSprite;
    
    // 3. change actor object settings
    actor.sprite.direction = page.direction;
    actor.eventId = page.eventId;
    
    // 4. event setting
    this._setEvents(actor, page);
    
    // 5. collision setting
    this._setCollisionSettings(actor, page.overlapOnly);
    
    // 6. change entry properties
    entry.currentPageIndex = pageIndex;
    entry.isSpawn = true;

    // 7. emit "Immediately" event
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
      actor.sprite.destroy(true);
      actor.sprite = null;
    }
  }

  private _createActorSprite(entry: IActorEntry, pageIndex: number): IActorSprite {
    const page = entry.statusPages[pageIndex];
    const actor = entry.actorObject;

    const x = actor.sprite ? actor.sprite.x : entry.position.x;
    const y = actor.sprite ? actor.sprite.y : entry.position.y;
    const spritesheetKey = page.spriteKey;
    const initFrame = page.initFrame;
    const bodyConfig = page.bodyConfig;

    const spriteType = page.spriteType;

    switch (spriteType) {
      case ActorSpriteTypes.OneWayAnim :
        return this.actorSpriteFactory.createOneWayAnimActorSprite(x, y, spritesheetKey, initFrame, bodyConfig); 

      case ActorSpriteTypes.FourWayAnims :
        return this.actorSpriteFactory.createFourWayAnimsActorSprite(x, y, spritesheetKey, initFrame, bodyConfig); 
      
      case ActorSpriteTypes.Invisible :
        return this.actorSpriteFactory.createInvisibleActorSprite(x, y, bodyConfig); 
    }

    // enum使っているので実際はここまで到達しないが、どこかでnumber使ってすり抜けてきた時用
    throw Error(`sprite type of ${spriteType} is unknown`);
  }

  private _setEvents(actor: IActor, page: IActorStatusPage): void {
    this.actorEventRegistrar.regist(actor, page);
  }

  private _setCollisionSettings(actor: IActor, overlapOnly?: boolean): void {
    overlapOnly = overlapOnly ? overlapOnly : false;
    this.collisionSettingCallback(actor, overlapOnly);
  }
}