import * as Phaser from 'phaser';
import * as Ui from '../../core/ui';
import * as Render from '../../core/renders';

type MessageBoxConfig = {
  scene: Phaser.Scene;
  text: string;
  fontSize?: string;
  fontColor?: string;
  fontFamilly?: string;
  backgroundColor?: number;
  backgroundAlpha?: number;
};

export class MessageBox extends Ui.Group {
  private textObject: Ui.Text;
  private waitingCursor: Ui.Text;

  constructor(
    config: MessageBoxConfig,
    dx = 0,
    dy = 0,
    width = 0,
    height = 0,
    anchor?: Ui.IElement,
  ) {
    super(dx, dy, width, height, anchor, null);

    this.init(config);
  }

  get text(): string {
    return this.textObject.text;
  }

  set text(text: string) {
    this.textObject.text = text;
  }

  toggleWaitingCursorVisible(): void {
    this.waitingCursor.renderFlags ^= 1;
  }

  hideWaitingCursor(): void {
    this.waitingCursor.renderFlags &= ~1;
  }

  protected init(config: MessageBoxConfig): void {
    const scene = config.scene;

    const bgColor = config.backgroundColor ? config.backgroundColor : 0x000000;
    const bgAlpha = config.backgroundAlpha ? config.backgroundAlpha : 0.8;
    const baseRectangle = new Ui.Rectangle(
      scene,
      0,
      0,
      this.width,
      this.height,
      bgColor,
      bgAlpha,
    );

    const textMargin = 16;
    const text = new Ui.Text(scene, textMargin, textMargin, config.text, {
      fontSize: config.fontSize ? config.fontSize : '20px',
      fontFamily: config.fontFamilly ? config.fontFamilly : 'monospace',
      color: config.fontColor ? config.fontColor : 'white',
    });
    text.setOrigin(0);
    text.setWordWrapWidth(this.width - textMargin * 2, true);

    const waitingCursor = new Ui.Text(
      scene,
      this.width - 30,
      this.height - 30,
      '*',
      {
        fontSize: '24px',
        fontStyle: 'bold',
      },
    );
    baseRectangle.setOrigin(0);
    // hide waiting cursor by default
    waitingCursor.renderFlags &= ~1;

    Render.UiRenderOrder.base(baseRectangle, text, waitingCursor);

    scene.add.existing(baseRectangle);
    scene.add.existing(text);
    scene.add.existing(waitingCursor);

    this.textObject = text;
    this.waitingCursor = waitingCursor;
    this.push(baseRectangle, text, waitingCursor);
  }
}
