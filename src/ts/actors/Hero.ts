import * as Phaser from 'phaser';
import * as Actor from '../core/actors';
import * as Asset from '../core/assets';
import * as Model from '../core/models';
import * as Scene from '../core/scenes';

export class Hero extends Actor.FieldActor {
  private seFootstep: Phaser.Sound.BaseSound;

  constructor(
    id: number,
    name: string,
    sprite?: Actor.IActorSprite,
    eventId?: number,
  ) {
    super(id, name, sprite, eventId);

    this.seFootstep = null;
  }

  update(scene: Scene.IFieldScene): void {
    if (!scene.keys) {
      super.update(scene);
      return;
    }

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

      switch (this.sprite.direction) {
        case Model.Direction.Left:
          this.sprite.stopAnim();
          break;

        case Model.Direction.Right:
          this.sprite.stopAnim();
          break;

        case Model.Direction.Down:
          this.sprite.stopAnim();
          break;

        case Model.Direction.Up:
          this.sprite.stopAnim();
          break;
      }
    }

    // play of stop footstep SE
    const isMoving =
      this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0;
    if (isMoving) {
      this._playSeFootstep(scene);
    } else if (this.seFootstep) {
      this.seFootstep.pause();
    }

    super.update(scene);
  }

  private _playSeFootstep(scene: Scene.IFieldScene): void {
    // 初回はインスタンスを生成
    if (!this.seFootstep) {
      const seFootsetpKey = Asset.AssetCacheKey.audio('se_footstep');
      const seFootsetpConfig = {
        volume: 0.8,
        rate: 1.4,
        roop: false,
      };
      // TODO: これだとkeyが見つからなかった場合エラーを吐いて止まってしまうが、音が流れない理由でゲームを止めたくはないので
      // AudioManagerのようなクラスを作ってワンクッション置いてエラーではなくて警告だけが出るようにする
      this.seFootstep = this.seFootstep
        ? this.seFootstep
        : scene.audioManager.playSe(seFootsetpKey, seFootsetpConfig);
    }

    // オーディオインスタンスが停止中なら再生
    if (this.seFootstep && !this.seFootstep.isPlaying) {
      this.seFootstep.play();
    }
  }
}
