import { Actor } from '../core/actors/Actor';
import { Direction } from '../core/models/Direction';

export class Hero extends Actor {
  update(frame?: number): void {
    if (!this.keys) {
      super.update(frame);
      return;
    };

    if (this.keys.cursors.space.isDown) {
      // 連射防止
      if (!this.flags.get('search')) {
        this.flags.on('search');
        this.emit(
          'search',
          this.sprite.x,
          this.sprite.y,
          this.direction,
        );
      }
    } else {
      this.flags.off('search');
    }

    const speed = 50;
    if (this.keys.cursors.up.isDown) {
      this.direction = Direction.Up;
      this.sprite.play('walkUp');
      this.sprite.setVelocityY(speed * -1);

    } else if (this.keys.cursors.left.isDown) {
      this.direction = Direction.Left;
      this.sprite.play('walkLeft');
      this.sprite.setVelocityX(speed * -1);

    } else if (this.keys.cursors.right.isDown) {
      this.direction = Direction.Right;
      this.sprite.play('walkRight');
      this.sprite.setVelocityX(speed);

    } else if (this.keys.cursors.down.isDown) {
      this.direction = Direction.Down;
      this.sprite.play('walkDown');
      this.sprite.setVelocityY(speed);

    } else {
      // 止まる
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(0);

      switch(this.direction) {
        case Direction.Left :
          this.sprite.stop(0);

          case Direction.Right :
          this.sprite.stop(4);

        case Direction.Down :
          this.sprite.stop(8);

        case Direction.Up :
          this.sprite.stop(12);
      }
    }
    
    super.update(frame);
  }
}