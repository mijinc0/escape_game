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
          this.sprite.direction,
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
    if (this.keys.cursors.left.isDown) {
      this.sprite.direction = Direction.Left;
      this.sprite.playAnim('default', true);
      this.sprite.setVelocityY(0);
      this.sprite.setVelocityX(speed * -1);

    } else if (this.keys.cursors.right.isDown) {
      this.sprite.direction = Direction.Right;
      this.sprite.playAnim('default', true);
      this.sprite.setVelocityY(0);
      this.sprite.setVelocityX(speed);

    } else if (this.keys.cursors.down.isDown) {
      this.sprite.direction = Direction.Down;
      this.sprite.playAnim('default', true);
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(speed);

    } else if (this.keys.cursors.up.isDown) {
      this.sprite.direction = Direction.Up;
      this.sprite.playAnim('default', true);
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(speed * -1);

    } else {
      // 止まる
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(0);
      
      switch(this.sprite.direction) {
        case Direction.Left :
          this.sprite.stopAnim();
          break;

        case Direction.Right :
          this.sprite.stopAnim();
          break;

        case Direction.Down :
          this.sprite.stopAnim();
          break;

        case Direction.Up :
          this.sprite.stopAnim();
          break;
      }
    }

    super.update(frame);
  }
}