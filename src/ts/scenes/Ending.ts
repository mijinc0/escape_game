import * as Phaser from 'phaser';
import * as Input from '../core/input';
import * as Locale from '../core/locales';
import { GameGlobal } from '../GameGlobal';

export class Ending extends Phaser.Scene {
  private keys: Input.Keys;
  private canSkip: boolean;
  private credits: Locale.ICreditTextEntry[];
  private creditIndex: number;
  private creaditTimeline: Phaser.Tweens.Timeline;

  init(): void {
    console.log('== start scene Ending ==');
  }

  create(): void {
    this.credits = GameGlobal.texts.credits;
    this.creditIndex = 0;
    this.canSkip = false;
    this.keys = this._createKeys();
    this.creaditTimeline = null;

    this.time.addEvent({
      delay: 1000,
      repeat: 0,
      callback: () => {
        this.canSkip = true;
      },
    });

    this._showNextCredit();
  }

  update(): void {
    if (this.canSkip && this.keys.action.isDown) {
      this._completeEnding();
      this.canSkip = false;
    }
  }

  private _createKeys(): Input.Keys {
    const cursorKeys = this.input.keyboard.createCursorKeys();
    const actionKey = cursorKeys.space;
    const escapeKey = cursorKeys.shift;
    return new Input.Keys(cursorKeys, actionKey, escapeKey);
  }

  private _completeEnding(): void {
    this.cameras.main.fadeOut(2000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
      if (progress === 1) {
        this.creaditTimeline.destroy();
        this.time.addEvent({
          delay: 1500,
          callback: () => {
            this.scene.start('opening');
          },
        });
      }
    });
  }

  private _showNextCredit(): void {
    const credit = this.credits[this.creditIndex];

    const heading = this._createCreditHeading(credit.heading);
    const body = this._createCreditBody(credit.body);

    const timeline = this.tweens.createTimeline();

    timeline.add({
      targets: [heading, body],
      delay: 1000,
      duration: 2000,
      alpha: { from: 0, to: 1 },
    });

    timeline.add({
      targets: [heading, body],
      delay: 3000,
      duration: 2000,
      alpha: { from: 1, to: 0 },
    });

    this.creditIndex++;

    if (this.creditIndex === this.credits.length) {
      timeline.on('complete', this._completeEnding.bind(this));
    } else {
      timeline.on('complete', this._showNextCredit.bind(this));
    }

    this.creaditTimeline = timeline;

    timeline.play();
  }

  private _createCreditHeading(headigText: string): Phaser.GameObjects.Text {
    const centerX = 320;

    const textConfig = {
      fontFamily: 'san-serif',
      fontSize: '40px',
      align: 'center',
    };

    const text = this.add.text(centerX, 136, headigText, textConfig);
    text.setOrigin(0.5);
    text.alpha = 0;

    return text;
  }

  private _createCreditBody(bodyTexts: string[]): Phaser.GameObjects.Text {
    const centerX = 320;

    const textConfig = {
      fontFamily: 'san-serif',
      fontSize: '32px',
      align: 'center',
    };

    const text = this.add.text(centerX, 208, bodyTexts, textConfig);
    text.setOrigin(0.5);
    text.alpha = 0;

    return text;
  }
}
