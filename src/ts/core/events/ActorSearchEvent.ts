import { IActor } from '../actors/IActor';
import { Direction } from '../models/Direction';
import { Position } from '../models/Position';
import { Zone } from '../models/Zone';

export class ActorSearchEvent {
  private actors: IActor[];
  private zoneRange: Position; 

  constructor(candidateActors: IActor[]) {
    this.actors = candidateActors;
    this.zoneRange = {x: 4, y: 4};
  }

  setEvent(actor: IActor): void {
    actor.on('search', this.search.bind(this));
  }

  search(
    actorX: number,
    actorY: number,
    actorWidth: number,
    actorHeight: number,
    direction: Direction,
  ): void {
    const zone = this._calcSearchZone(actorX, actorY, actorWidth, actorHeight, direction);

    this._search(zone);
  }

  private _calcSearchZone(
    actorX: number,
    actorY: number,
    actorWidth: number,
    actorHeight: number,
    direction: Direction,
  ): Zone {
    switch(direction) {
      case Direction.Down :
        return {
          x : actorX,
          y : actorY + actorHeight,
          width: actorWidth,
          height: this.zoneRange.y,
        };
        
      case Direction.Up :
        return {
          x : actorX,
          y : actorY - this.zoneRange.y,
          width: actorWidth,
          height: this.zoneRange.y,
        };
      
      case Direction.Right :
        return {
          x : actorX + actorWidth,
          y : actorY,
          width: this.zoneRange.x,
          height: actorHeight,
        };
      
      case Direction.Left :
        return {
          x : actorX - this.zoneRange.x,
          y : actorY,
          width: this.zoneRange.x,
          height: actorHeight,
        };
    }
  }

  private _search(zone: Zone): void {
    this.actors.forEach((actor: IActor) => {
      if (this._onlyOverlappingSearchZone(zone, actor)) {
        actor.emit('search');
      }
    });
  }

  private _onlyOverlappingSearchZone(zone: Zone, target: IActor): boolean {
    const searchLeft = zone.x;
    const searchRight = zone.x + zone.width;
    const searchTop = zone.y;
    const searchBottom = zone.y + zone.height;

    const targetBody = target.sprite.body;
    const targetLeft = target.sprite.x + targetBody.offset.x;
    const targetRight = targetLeft + targetBody.width;
    const targetTop = target.sprite.y + targetBody.offset.y;
    const targetBottom = targetTop + targetBody.height;

    const overlapX = (targetLeft < searchRight) && (targetRight > searchLeft);
    const overlapY = (targetTop < searchBottom) && (targetBottom > searchTop);

    return overlapX && overlapY;
  }
}