import * as Model from '../core/models';
import * as Actor from '../core/actors';

export class ActorSearchEvent {
  private actors: Actor.IActor[];
  private zoneRange: Model.Position;

  constructor(candidateActors: Actor.IActor[]) {
    this.actors = candidateActors;
    this.zoneRange = { x: 4, y: 4 };
  }

  setEvent(actor: Actor.IActor): void {
    actor.on('search', this.search.bind(this));
  }

  search(actorX: number, actorY: number, actorWidth: number, actorHeight: number, direction: Model.Direction): void {
    console.log('start actor search event');

    const zone = this._calcSearchZone(actorX, actorY, actorWidth, actorHeight, direction);

    console.log(`target actors : ${this.actors.length}`);
    console.log(
      `actor: {x: ${actorX}, y: ${actorY}, width: ${actorWidth}, height: ${actorHeight}, direction: ${direction}`,
    );
    console.log(`search zone: {x: ${zone.x}, y: ${zone.y}, width: ${zone.width}, height: ${zone.height}`);

    this._search(zone);
  }

  private _calcSearchZone(
    actorX: number,
    actorY: number,
    actorWidth: number,
    actorHeight: number,
    direction: Model.Direction,
  ): Model.Zone {
    switch (direction) {
      case Model.Direction.Down:
        return {
          x: actorX,
          y: actorY,
          width: actorWidth,
          height: this.zoneRange.y + actorHeight,
        };

      case Model.Direction.Up:
        return {
          x: actorX,
          y: actorY - this.zoneRange.y,
          width: actorWidth,
          height: this.zoneRange.y + actorHeight,
        };

      case Model.Direction.Right:
        return {
          x: actorX,
          y: actorY,
          width: this.zoneRange.x + actorWidth,
          height: actorHeight,
        };

      case Model.Direction.Left:
        return {
          x: actorX - this.zoneRange.x,
          y: actorY,
          width: this.zoneRange.x + actorWidth,
          height: actorHeight,
        };
    }
  }

  private _search(zone: Model.Zone): void {
    this.actors.forEach((actor: Actor.IActor) => {
      if (this._isOverlappingSearchZone(zone, actor)) {
        console.log(`emit search event {id: ${actor.id}, name: ${actor.name}}`);
        actor.emit('search');
      }
    });
  }

  private _isOverlappingSearchZone(zone: Model.Zone, target: Actor.IActor): boolean {
    if (!target.sprite || !target.sprite.body) return false;

    const searchLeft = zone.x;
    const searchRight = zone.x + zone.width;
    const searchTop = zone.y;
    const searchBottom = zone.y + zone.height;

    const targetBody = target.sprite.body;
    const targetLeft = target.sprite.x + targetBody.offset.x;
    const targetRight = targetLeft + targetBody.width;
    const targetTop = target.sprite.y + targetBody.offset.y;
    const targetBottom = targetTop + targetBody.height;

    const overlapX = searchLeft < targetRight && searchRight > targetLeft;
    const overlapY = searchTop < targetBottom && searchBottom > targetTop;

    return overlapX && overlapY;
  }
}
