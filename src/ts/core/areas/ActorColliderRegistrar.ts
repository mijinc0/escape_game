import * as Phaser from 'phaser';
import { IActor } from '../actors/IActor';

type ActorCollideCallback = (spriteA: Phaser.GameObjects.GameObject, spriteB: Phaser.GameObjects.GameObject) => void;

export class ActorColliderRegistrar {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  registActorAndGameObject(
    actor: IActor,
    phaserGameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[],
    collideCallback?: ActorCollideCallback,
  ): boolean {
    const sprite = (actor.sprite instanceof Phaser.Physics.Arcade.Sprite) ? actor.sprite : null; 

    // PhaserのSpriteを継承していないとダメ
    if (!sprite) {
      console.warn(`sprite belongs ${actor.name} is not instance of Phaser.Physics.Arcade.Sprite`);
      return false;
    }

    this.scene.physics.world.addCollider(sprite, phaserGameObject, collideCallback);

    return true;
  }

  registActorPair(
    actorA: IActor,
    actorB: IActor,
    collideCallback?: ActorCollideCallback,
  ): boolean {
    const spriteA = (actorA.sprite instanceof Phaser.Physics.Arcade.Sprite) ? actorA.sprite : null; 
    const spriteB = (actorB.sprite instanceof Phaser.Physics.Arcade.Sprite) ? actorB.sprite : null;

    // 両方共PhaserのSpriteを継承していないとダメ
    if (!(spriteA && spriteB)) {
      console.warn(`sprite belongs actor is not instance of Phaser.Physics.Arcade.Sprite`);
      return false;
    }

    this.scene.physics.world.addCollider(spriteA, spriteB, collideCallback);
    
    return true;
  }
}