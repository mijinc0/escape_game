import { FieldActorData } from './FieldActorData';
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

export class FieldActorsManager {
  actorData: FieldActorData[];
  
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
    this.actorData = actorEntries ? this._createFieldActorDataFromActorEntries(actorEntries) : [];
    this.actorSpriteFactory = actorSpriteFactory;
    this.actorEventRegistrar = actorEventRegistrar;
    this.collisionSettingCallback = collisionSettingCallback;
  }

  addEntries(actorEntries: IActorEntry[]): void {
    this.actorData = this._createFieldActorDataFromActorEntries(actorEntries);
  }

  getSpawnActors(): IActor[] {
    return this.actorData
      .filter((entry: FieldActorData) => (entry.isSpawn))
      .map((entry: FieldActorData) => (entry.actorObject));
  }

  spawnEntries(): void {
    this.actorData.forEach((data: FieldActorData) => {
      this._updateActorStatus(data);
    });
  }

  findActorById(id: number): IActor|null {
    const actor = this.actorData.find((data: FieldActorData) => (
      data.actorObject.id === id
    ));

    return actor ? actor.actorObject : null;
  }

  update(frame: number): void {
    this.actorData.forEach((entry: FieldActorData) => {
      this._updateActorStatus(entry);
      
      entry.actorObject.update(frame);
    });
  }

  private _createFieldActorDataFromActorEntries(entries: IActorEntry[]): FieldActorData[] {
    return entries.map((entry: IActorEntry) => {
      const actorObject = new Actor(entry.id, entry.name);
      const position = entry.position ? entry.position : {x: 0, y: 0};
      const pages = entry.statusPages;
      const isSpawn = false;
      const initPageIndex = -1;
      
      return new FieldActorData(actorObject, position, pages, isSpawn, initPageIndex);
    });
  }
  
  private _updateActorStatus(fieldActorData: FieldActorData): void {    
    // 1. get status page that matches current criteria
    const pageIndex = this._getCurrentPageIndex(fieldActorData);

    // 2. if same as currentPageIndex, return immediately
    if (pageIndex === fieldActorData.currentPageIndex) return;

    // 3. if page is not found, actor will despawn
    if (pageIndex === -1) {
      this._despawnActor(fieldActorData);
      return;
    }

    // 4. if actor already spawn & change page index, change status
    this._spawnOrRespawnActor(fieldActorData, pageIndex);
  }

  private _despawnActor(fieldActorData: FieldActorData): void {
    if (!fieldActorData.isSpawn) return;

    this._resetActorStatus(fieldActorData.actorObject);
    fieldActorData.isSpawn = false;
  }

  /**
   * 最初のスポーンも既にスポーンしているActorの状態を変えるリスポーンも処理は同じ
   * @param entry 
   * @param pageIndex 
   */
  private _spawnOrRespawnActor(fieldActorData: FieldActorData, pageIndex: number): void {
    const page = this._getPage(fieldActorData, pageIndex);
    const actor = fieldActorData.actorObject;

    // 1. create new sprite
    const newSprite = this._createActorSprite(fieldActorData, pageIndex);

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
    fieldActorData.currentPageIndex = pageIndex;
    fieldActorData.isSpawn = true;

    // 7. emit "Immediately" event
    actor.emit(EventEmitType.Immediately);
  }

  private _getCurrentPageIndex(fieldActorData: FieldActorData): number {
    return fieldActorData.statusPages.findIndex((page: IActorStatusPage) => (
      this._checkSpawnCriteria(page.criteria)
    ));
  }

  private _getPage(fieldActorData: FieldActorData, pageIndex: number): IActorStatusPage {
    const page = fieldActorData.statusPages[pageIndex];

    if (!page) {
      throw Error(`actor status page is not found (actor: ${fieldActorData.actorObject.id}, page: ${pageIndex})`);
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

  private _createActorSprite(fieldActorData: FieldActorData, pageIndex: number): IActorSprite {
    const page = fieldActorData.statusPages[pageIndex];
    const actor = fieldActorData.actorObject;

    const x = actor.sprite ? actor.sprite.x : fieldActorData.position.x;
    const y = actor.sprite ? actor.sprite.y : fieldActorData.position.y;
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