import { Actor } from '../core/actors/Actor';
import { Direction } from '../core/models/Direction';

export class Hero extends Actor {
  update(frame: number): void {
    if (!this.keys) {
      super.update(frame);
      return;
    };

    // search
    if (this.keys.action.isDown) {
      // 連射防止
      if (!this.flags.get('search')) {
        this.flags.on('search');
        this.emit(
          'search',
          this.sprite.x,
          this.sprite.y,
          this.sprite.width,
          this.sprite.height,
          this.direction,
        );
      }
    } else {
      this.flags.off('search');
    }

    // open field menu
    if (this.keys.cancel.isDown) {
      // 連射防止
      if (!this.flags.get('fieldMenu')) {
        this.flags.on('fieldMenu');
        this.emit('fieldMenu');
      }
    } else {
      this.flags.off('fieldMenu');
    }

    const speed = 184;
    if (this.keys.cursors.up.isDown) {
      this.direction = Direction.Up;
      this.sprite.playAnim('walkUp', true);
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(speed * -1);

    } else if (this.keys.cursors.left.isDown) {
      this.direction = Direction.Left;
      this.sprite.playAnim('walkLeft', true);
      this.sprite.setVelocityY(0);
      this.sprite.setVelocityX(speed * -1);

    } else if (this.keys.cursors.right.isDown) {
      this.direction = Direction.Right;
      this.sprite.playAnim('walkRight', true);
      this.sprite.setVelocityY(0);
      this.sprite.setVelocityX(speed);

    } else if (this.keys.cursors.down.isDown) {
      this.direction = Direction.Down;
      this.sprite.playAnim('walkDown', true);
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(speed);

    } else {
      // 止まる
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(0);

      switch(this.direction) {
        case Direction.Left :
          this.sprite.stop(0);
          break;

        case Direction.Right :
          this.sprite.stop(4);
          break;

        case Direction.Down :
          this.sprite.stop(8);
          break;

        case Direction.Up :
          this.sprite.stop(12);
          break;
      }
    }
    
    super.update(frame);
  }
}