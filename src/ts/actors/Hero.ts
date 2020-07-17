import * as Actor from '../core/actors';
import * as Model from '../core/models';
import * as Scene from '../core/scenes';

export class Hero extends Actor.FieldActor {
  update(scene: Scene.IFieldScene): void {
    if (!scene.keys) {
      super.update(scene);
      return;
    };

    // search
    if (scene.keys.action.isDown) {
      // 連射防止
      if (!this.flags.get('search')) {
        // ここで関係のない`fieldMenu`もonにするのは、調べるコマンド復帰直後に
        // cancelボタンが押されているとすぐにフィールドメニューを誤操作的に開いてしまうから
        this.flags.on('search');
        this.flags.on('fieldMenu');

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
    if (scene.keys.cancel.isDown) {
      // 連射防止
      if (!this.flags.get('fieldMenu')) {
        this.flags.on('search');
        this.flags.on('fieldMenu');

        this.emit('fieldMenu');
      }
    } else {
      this.flags.off('fieldMenu');
    }

    const speed = 184;
    if (scene.keys.cursors.left.isDown) {
      this.sprite.direction = Model.Direction.Left;
      this.sprite.playAnim('default', true);
      this.sprite.setVelocityY(0);
      this.sprite.setVelocityX(speed * -1);

    } else if (scene.keys.cursors.right.isDown) {
      this.sprite.direction = Model.Direction.Right;
      this.sprite.playAnim('default', true);
      this.sprite.setVelocityY(0);
      this.sprite.setVelocityX(speed);

    } else if (scene.keys.cursors.down.isDown) {
      this.sprite.direction = Model.Direction.Down;
      this.sprite.playAnim('default', true);
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(speed);

    } else if (scene.keys.cursors.up.isDown) {
      this.sprite.direction = Model.Direction.Up;
      this.sprite.playAnim('default', true);
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(speed * -1);

    } else {
      // 止まる
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(0);
      
      switch(this.sprite.direction) {
        case Model.Direction.Left :
          this.sprite.stopAnim();
          break;

        case Model.Direction.Right :
          this.sprite.stopAnim();
          break;

        case Model.Direction.Down :
          this.sprite.stopAnim();
          break;

        case Model.Direction.Up :
          this.sprite.stopAnim();
          break;
      }
    }

    super.update(scene);
  }
}