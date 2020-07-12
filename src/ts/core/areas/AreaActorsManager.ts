import { AreaActorData } from './AreaActorData';
import { EventEmitType } from './EventEmitType';
import { IActorEntry } from './IActorEntry';
import { IActorStatusPage } from './IActorStatusPage';
import { IActorEventRegistrar } from './IActorEventRegistrar';
import { ActorSpriteTypes } from '../actors/ActorSpriteTypes';
import { Actor } from '../actors/Actor';
import { IActor } from '../actors/IActor';
import { IActorSprite } from '../actors/IActorSprite';
import { IActorSpriteFactory } from '../actors/IActorSpriteFactory';

type SpawnCriteriaCallback = () => boolean;
type CollisionSettingCallback = (spawnActor: IActor, onlyOverlap: boolean) => void;

export class AreaActorsManager {
  actorData: AreaActorData[];
  
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
    this.actorData = actorEntries ? this._createAreaActorDataFromActorEntries(actorEntries) : [];
    this.actorSpriteFactory = actorSpriteFactory;
    this.actorEventRegistrar = actorEventRegistrar;
    this.collisionSettingCallback = collisionSettingCallback;
  }

  addEntries(actorEntries: IActorEntry[]): void {
    this.actorData = this._createAreaActorDataFromActorEntries(actorEntries);
  }

  getSpawnActors(): IActor[] {
    return this.actorData
      .filter((entry: AreaActorData) => (entry.isSpawn))
      .map((entry: AreaActorData) => (entry.actorObject));
  }

  spawnEntries(): void {
    this.actorData.forEach((data: AreaActorData) => {
      this._updateActorStatus(data);
    });
  }

  update(frame: number): void {
    this.actorData.forEach((entry: AreaActorData) => {
      this._updateActorStatus(entry);
      
      entry.actorObject.update(frame);
    });
  }

  private _createAreaActorDataFromActorEntries(entries: IActorEntry[]): AreaActorData[] {
    return entries.map((entry: IActorEntry) => {
      const actorObject = new Actor(entry.id, entry.name);
      const position = entry.position ? entry.position : {x: 0, y: 0};
      const pages = entry.statusPages;
      const isSpawn = false;
      const initPageIndex = -1;
      
      return new AreaActorData(actorObject, position, pages, isSpawn, initPageIndex);
    });
  }
  
  private _updateActorStatus(areaActorData: AreaActorData): void {    
    // 1. get status page that matches current criteria
    const pageIndex = this._getCurrentPageIndex(areaActorData);

    // 2. if same as currentPageIndex, return immediately
    if (pageIndex === areaActorData.currentPageIndex) return;

    // 3. if page is not found, actor will despawn
    if (pageIndex === -1) {
      this._despawnActor(areaActorData);
      return;
    }

    // 4. if actor already spawn & change page index, change status
    this._spawnOrRespawnActor(areaActorData, pageIndex);
  }

  private _despawnActor(areaActorData: AreaActorData): void {
    if (!areaActorData.isSpawn) return;

    this._resetActorStatus(areaActorData.actorObject);
    areaActorData.isSpawn = false;
  }

  /**
   * 最初のスポーンも既にスポーンしているActorの状態を変えるリスポーンも処理は同じ
   * @param entry 
   * @param pageIndex 
   */
  private _spawnOrRespawnActor(areaActorData: AreaActorData, pageIndex: number): void {
    const page = this._getPage(areaActorData, pageIndex);
    const actor = areaActorData.actorObject;

    // 1. create new sprite
    const newSprite = this._createActorSprite(areaActorData, pageIndex);

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
    areaActorData.currentPageIndex = pageIndex;
    areaActorData.isSpawn = true;

    // 7. emit "Immediately" event
    actor.emit(EventEmitType.Immediately);
  }

  private _getCurrentPageIndex(areaActorData: AreaActorData): number {
    return areaActorData.statusPages.findIndex((page: IActorStatusPage) => (
      this._checkSpawnCriteria(page.criteria)
    ));
  }

  private _getPage(areaActorData: AreaActorData, pageIndex: number): IActorStatusPage {
    const page = areaActorData.statusPages[pageIndex];

    if (!page) {
      throw Error(`actor status page is not found (actor: ${areaActorData.actorObject.id}, page: ${pageIndex})`);
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

  private _createActorSprite(areaActorData: AreaActorData, pageIndex: number): IActorSprite {
    const page = areaActorData.statusPages[pageIndex];
    const actor = areaActorData.actorObject;

    const x = actor.sprite ? actor.sprite.x : areaActorData.position.x;
    const y = actor.sprite ? actor.sprite.y : areaActorData.position.y;
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