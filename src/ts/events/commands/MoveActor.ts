import * as Actor from '../../core/actors';
import * as Event from '../../core/events';
import * as Model from '../../core/models';
import * as Scene from '../../core/scenes';
import { IGameGlobal } from '../../core/IGameGlobal';

export class MoveActor implements Event.IScenarioEvent {
  readonly isAsync: boolean;

  isComplete: boolean;

  private actorId: number;
  private targetPosition: Model.Position;
  private velocity: number;
  private lockDirection: boolean;
  
  /**
   * true  : y軸の移動をしたあとにx軸の移動を行う(グリッド状に移動する)
   * false : 直線距離で移動する。x,y座標の移動がある時はななめ移動をする
   */
  private gridMoving: boolean;
  private playAnim: boolean;
  private startMove: boolean;

  /**
   * 
   * @param actorId primaryActor : actorId < 0, fieldActor : actorId > 0
   * @param x 
   * @param y 
   * @param velocity 
   * @param playAnim 
   * @param gridMoving 
   * @param lockDirection 
   */
  constructor(actorId: number, x: number, y: number, velocity?: number, playAnim?: boolean, gridMoving?: boolean, lockDirection?: boolean, isAsync?: boolean) {
    this.actorId = actorId;
    this.targetPosition = {x: x, y: y};
    this.velocity = typeof(velocity) === 'number' ? velocity : 184;
    this.playAnim = typeof(playAnim) === 'boolean' ? playAnim : true;
    this.gridMoving = typeof(gridMoving) === 'boolean' ? gridMoving : true;
    this.lockDirection = typeof(lockDirection) === 'boolean' ? lockDirection : false;
    this.isAsync = isAsync ? isAsync : false;
    this.isComplete = false;
    this.startMove = false;
  }

  init(scene: Scene.IFieldScene): void {
    this.isComplete = false;
    this.startMove = false;
  }

  update(scene: Scene.IFieldScene): void {
    if (this.startMove || this.isComplete) return;

    const actor = this.actorId >= 0 ?
      scene.actorsManager.findActorById(this.actorId) :
      scene.primaryActor;

    if (!actor || !actor.sprite) {
      console.warn(`actor sprite is not found. actor moving event will be completed {id: ${this.actorId}}`);
      this.complete();
      return;
    }

    if(this.gridMoving) {
      this._startGridMoving(actor.sprite, scene);
    } else {
      this._startShortestDistanceMoving(actor.sprite, scene);
    }

    this.startMove = true;
  }

  complete(): void {
    this.isComplete = true;
  }

  private _startGridMoving(sprite: Actor.IActorSprite, scene: Scene.IFieldScene): void {
    const timeline = scene.phaserScene.tweens.createTimeline();
    
    // y軸の移動
    const positionFromA = {x: sprite.x, y: sprite.y};
    const positionToA = {x: sprite.x, y: this.targetPosition.y};
    this._addMovingTweenIntoTimeline(timeline, sprite, positionFromA, positionToA);

    // x軸の移動
    const positionFromB = positionToA;
    const positionToB = {x: this.targetPosition.x, y: this.targetPosition.y};
    this._addMovingTweenIntoTimeline(
      timeline,
      sprite,
      positionFromB,
      positionToB,
      this.complete.bind(this),
    );

    timeline.play();
  }

  private _startShortestDistanceMoving(sprite: Actor.IActorSprite, scene: Scene.IFieldScene): void {
    const timeline = scene.phaserScene.tweens.createTimeline();
    
    const positionFrom = {x: sprite.x, y: sprite.y};

    this._addMovingTweenIntoTimeline(
      timeline,
      sprite,
      positionFrom,
      this.targetPosition,
      this.complete.bind(this),
    );

    timeline.play();
  }

  /**
   * Phaser3のvelocityは pixel/sec である。
   * 
   * @param velocity 
   * @param positionFrom 
   * @param positionTo 
   * @return number millisec
   */
  private _calcDuration(velocity: number, positionFrom: Model.Position, positionTo: Model.Position): number {
    const dx = positionTo.x - positionFrom.x;
    const dy = positionTo.y - positionFrom.y;
    const distance = Math.floor(Math.sqrt(dx**2 + dy**2));
    // (distance / velocity)は秒、返り値はミリ秒にして返したいので1000倍
    return Math.round((distance / velocity) * 1000);
  }

  private _addMovingTweenIntoTimeline(
    timeline: Phaser.Tweens.Timeline,
    sprite: Actor.IActorSprite,
    positionFrom: Model.Position,
    positionTo: Model.Position,
    onComplete?: () => void,
  ): void {
    const duration = this._calcDuration(this.velocity, positionFrom, positionTo);

    timeline.add({
      targets: sprite,
      x: positionTo.x,
      y: positionTo.y,
      duration: duration,
      onStart: () => {
        // 方向の転換
        if (!this.lockDirection) {
          this._setDirectionByTargetPosition(sprite, positionFrom, positionTo);
        }
      },
      onUpdate: () => {
        // アニメーション
        if (this.playAnim) {
          sprite.playAnim('default', true);
        }
      },
      onComplete: () => {
        sprite.stopAnim();

        if (onComplete) onComplete();
      },
    })
  }

  private _setDirectionByTargetPosition(sprite: Actor.IActorSprite, positionFrom: Model.Position, positionTo: Model.Position): void {
    const distanceX = positionTo.x - positionFrom.x;
    const distanceY = positionTo.y - positionFrom.y;

    const absDistanceX = Math.abs(distanceX);
    const absDistanceY = Math.abs(distanceY);

    if (absDistanceY > absDistanceX) {
      // 上を向くか下を向くか
      if (distanceY > 0) {
        sprite.direction = Model.Direction.Down;
      } else {
        sprite.direction = Model.Direction.Up;
      }
    } else {
      // 右を向くか左を向くか
      if (distanceX > 0) {
        sprite.direction = Model.Direction.Right;
      } else {
        sprite.direction = Model.Direction.Left;
      }
    }
  }
}
