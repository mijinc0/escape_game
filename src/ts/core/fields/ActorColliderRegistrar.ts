import * as Phaser from 'phaser';
import * as Actor from '../actors';

type ActorCollideCallback = (
  spriteA: Phaser.GameObjects.GameObject,
  spriteB: Phaser.GameObjects.GameObject,
) => void;

export class ActorColliderRegistrar {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registActorAndGameObject(
    actor: Actor.IActor,
    phaserGameObject:
      | Phaser.GameObjects.GameObject
      | Phaser.GameObjects.GameObject[],
    collideCallback?: ActorCollideCallback,
    onlyOverlap?: boolean,
  ): boolean {
    const sprite =
      actor.sprite instanceof Phaser.Physics.Arcade.Sprite
        ? actor.sprite
        : null;

    // PhaserのSpriteを継承していないとダメ
    if (!sprite) {
      console.warn(
        `sprite belongs ${actor.name} is not instance of Phaser.Physics.Arcade.Sprite`,
      );
      return false;
    }

    if (onlyOverlap) {
      this.scene.physics.world.addOverlap(
        sprite,
        phaserGameObject,
        collideCallback,
      );
    } else {
      this.scene.physics.world.addCollider(
        sprite,
        phaserGameObject,
        collideCallback,
      );
    }

    return true;
  }

  registActorPair(
    actorA: Actor.IActor,
    actorB: Actor.IActor,
    collideCallback?: ActorCollideCallback,
    onlyOverlap?: boolean,
  ): boolean {
    const spriteA =
      actorA.sprite instanceof Phaser.Physics.Arcade.Sprite
        ? actorA.sprite
        : null;
    const spriteB =
      actorB.sprite instanceof Phaser.Physics.Arcade.Sprite
        ? actorB.sprite
        : null;

    // 両方共PhaserのSpriteを継承していないとダメ
    if (!(spriteA && spriteB)) {
      console.warn(
        `sprite belongs actor is not instance of Phaser.Physics.Arcade.Sprite`,
      );
      return false;
    }

    if (onlyOverlap) {
      this.scene.physics.world.addOverlap(spriteA, spriteB, collideCallback);
    } else {
      this.scene.physics.world.addCollider(spriteA, spriteB, collideCallback);
    }

    return true;
  }
}
