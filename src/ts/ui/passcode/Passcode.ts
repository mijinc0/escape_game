import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import * as Render from '../../core/renders';
import { Button } from '../Button';

type PasscodeConfig = {
  scene: Phaser.Scene;
  digits: number;
};

/**
 * 各サイズは固定
 */
export class Passcode extends Ui.Group {
  passcodeText: Ui.Text;
  numberButtons: Ui.Group;
  enterButton: Ui.Group;

  private digits: number;

  constructor(config: PasscodeConfig, dx = 0, dy = 0, anchor?: Ui.IElement) {
    const width = 528;
    const height = 240;

    super(dx, dy, width, height, anchor);

    const baseRectangle = new Ui.Rectangle(config.scene, 0, 0, width, height, 0x000000, 0.8);
    baseRectangle.setOrigin(0);
    Render.UiRenderOrder.base(baseRectangle);
    config.scene.add.existing(baseRectangle);

    this.passcodeText = this._createPasscodeText(config);
    this.numberButtons = this._createNumberButtons(config);
    this.enterButton = this._createEnterButton(config);
    this.digits = config.digits;

    this.push(baseRectangle, this.passcodeText, this.numberButtons, this.enterButton);
  }

  registToSelector(selector: Ui.ISelector): void {
    // enterButton -> numberButton の順にセレクターにセットすることで、
    // 入力中にキャンセルボタンを押すとenterボタンが押せるようになる
    selector.setGroup(this.enterButton);
    selector.setGroup(this.numberButtons);

    // currentIndexを0にしておかないと、キャンセルボタンでenterButton(group)に
    // セレクタが移動しようとした時に移動先のエレメントを取得できずにエラーが出る
    this.enterButton.currentIndex = 0;

    // enterButton選択中にキャンセルボタンを押すと、数字入力に戻る
    selector.setRootCancelEvent(() => {
      selector.setGroup(this.numberButtons);
    });
  }

  getPasscode(): number {
    const strPasscode = this._getPasscodeAsString();
    const passcode = parseInt(strPasscode, 10);
    return passcode != NaN ? passcode : -1;
  }

  private _getPasscodeAsString(): string {
    return this.passcodeText.text.replace(/\s+/g, "");;
  }

  private _createPasscodeText(config: PasscodeConfig): Ui.Text {
    const scene = config.scene;

    const textConfig = {
      fontSize: '32px',
    };

    const x = this.width / 2;
    const y = 64;

    const text = new Ui.Text(scene, x, y, '', textConfig);
    text.setOrigin(0.5);
    Render.UiRenderOrder.base(text);
    scene.add.existing(text);

    return text;
  }

  private _createNumberButtons(config: PasscodeConfig): Ui.Group {
    // 入力用の文字(0-9, <)は固定サイズ
    // ボタン = {x: 32, y: 32}
    // マージン = 8
    // 合計 x = (32 * 11) + (8 * 10) = 432
    const ah = new Ui.RangeAlignmentHandler(8, Ui.Direction.Right);

    const width = 432;
    const height = 32;
    const x = (this.width - width) / 2;
    const y = 120;

    const group = new Ui.Group(x, y, width, height, null, ah);

    group.name = 'numberButtons';

    const buttonConfig = {
      scene: config.scene,
      text: '',
      fontSize: '24px',
      fontColor: 'white',
      backgroundColor: 0x000000,
      backgroundAlpha: 0.7,
    };

    const numberButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n: number) => {
      buttonConfig.text = n.toString();
      
      const button = new Button(buttonConfig, 0, 0, 32, 32);
      button.name = `button_${n}`;

      this._setNumberButtonEvent(button, n);

      return button;
    });

    // 一文字消すボタン
    buttonConfig.text = '<';
    const backButton = new Button(buttonConfig, 0, 0, 32, 32);
    backButton.name = 'button_<';
    this._setBackButtonEnvet(backButton);

    group.push(...numberButtons);
    group.push(backButton);

    return group;
  }

  private _createEnterButton(config: PasscodeConfig): Ui.Group {
    const width = 96;
    const height = 40;
    const x = (this.width - width) / 2;
    const y = 176;

    const group = new Ui.Group(x, y, width, height);

    group.name = 'enterButton';

    const buttonConfig = {
      scene: config.scene,
      text: 'Enter',
      fontSize: '20px',
      fontColor: 'white',
      backgroundColor: 0x000000,
      backgroundAlpha: 0.7,
    };

    const button = new Button(buttonConfig, 0, 0, width, height);

    group.push(button);

    return group;
  }

  /**
   * ボタンを
   * 
   * @param button 
   * @param n 
   */
  private _setNumberButtonEvent(button: Ui.IElement, n: number): void {
    button.on(Ui.ElementEventNames.Select, ((button: Ui.IElement, selector: Ui.ISelector) => {
      let strPasscode = this._getPasscodeAsString();

      if (strPasscode.length >= this.digits) return;

      strPasscode += n.toString();

      // 指定行数入力すると、enterButtonの操作に移る
      if (strPasscode.length >= this.digits) {
        selector.setGroup(this.enterButton);
      }

      strPasscode = strPasscode.split('').join('  ');
      this.passcodeText.text = strPasscode;
    }).bind(this));
  }

  /**
   * 現在の入力の末尾一文字を消すボタンのイベント
   * 
   * @param button 
   */
  private _setBackButtonEnvet(button: Button): void {
    button.on(Ui.ElementEventNames.Select, ((button: Ui.IElement, selector: Ui.ISelector) => {
      let strPasscode = this._getPasscodeAsString();

      if (strPasscode.length === 0) return;

      strPasscode = strPasscode.slice(0, -1);

      strPasscode = strPasscode.split('').join(' ');
      this.passcodeText.text = strPasscode;
    }).bind(this));
  }
}
