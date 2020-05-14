import * as Phaser from 'phaser';
import { Actor } from '../core/actors/Actor';
import { Direction } from '../core/models/Direction';
import { Position } from '../core/models/Position';
import { Zone } from '../core/models/Zone';

export class ActorSearchEvent {
  private scene: Phaser.Scene;
  private zoneRange: Position; 

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.zoneRange = {x: 4, y: 4};
  }

  setEvent(actor: Actor): void {
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
    this.scene.physics.world.bodies.entries.forEach((body: Phaser.Physics.Arcade.Body) => {
      if (this._isOverlappingSearchZone(zone, body)) {
        body.gameObject.emit('search');
      }
    });
  }

  private _isOverlappingSearchZone(zone: Zone, targetBody: Phaser.Physics.Arcade.Body): boolean {
    const searchLeft = zone.x;
    const searchRight = zone.x + zone.width;
    const searchTop = zone.y;
    const searchBottom = zone.y + zone.height;

    const targetLeft = targetBody.x;
    const targetRight = targetBody.x + targetBody.width;
    const targetTop = targetBody.y;
    const targetBottom = targetBody.y + targetBody.height;

    const overlapX = (targetLeft < searchRight) && (targetRight > searchLeft);
    const overlapY = (targetTop < searchBottom) && (targetBottom > searchTop);

    return overlapX && overlapY;
  }
}