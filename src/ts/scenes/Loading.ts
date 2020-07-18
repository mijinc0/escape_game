import * as Phaser from 'phaser';
import * as Asset from '../core/assets';

export class Loading extends Phaser.Scene {
  private frame: number;
  private config: Asset.IAssetLoadingConfig;
  private loadingText: Phaser.GameObjects.Text;
  private progressBar: Phaser.GameObjects.Rectangle;
  private bar: Phaser.GameObjects.Rectangle;

  init(config: Asset.IAssetLoadingConfig): void {
    console.log('== start scene Loading ==');

    if (!config) {
      throw Error('AssetLoadingConfig is not found');
    }

    this.config = config;
    this.frame = -1;
  }

  preload(): void {
    console.log('preload');

    this.loadingText = this.add.text(50, 50, 'Loading...', {
      fontSize: '24px',
      fontFamily: 'sans-serif',
    });
    this.progressBar = this.add.rectangle(40, 400, 0, 4, 0xffffff, 1);
    this.bar = this.add.rectangle(56, 416, 584, 1, 0xffffff, 1);

    this.loadingText.setOrigin(0);
    this.progressBar.setOrigin(0);
    this.bar.setOrigin(0);

    const loader = new Asset.AssetLoader(this);

    loader.onProgress(this._updateBar.bind(this));

    loader.onSuccessful(this._loadingSuccessful.bind(this));

    loader.load(this.config);
  }

  /**
   * create, updateはpreloadが完全に済んだら開始するので、loader.on('progress')ではなくて
   * updateに完了後のイベントを仕込む
   */
  update(): void {
    this.frame++;

    // preloadが一瞬で済んだ場合、画面がちらついたように見えるだけになってしまうので
    // Loading画面であることが確認できるように少しだけスリープを入れる
    // (画面が一瞬ちらついたように見えても構わなければこの処理は不要)
    if (this.frame === 30) {
      this._complete();
    }
  }

  private _updateBar(percentage: number): void {
    const maxWidth = 560;
    this.progressBar.width = maxWidth * percentage;
  }

  private _loadingSuccessful(file: any): void {
    const src = file.src ? file.src : 'unknown/path';
    const key = file.src ? file.key : 'unknown_key';
    console.log(`load asset : ${key} : ${src}`);
  }

  private _complete(): void {
    this.cameras.main.fadeOut(500, 0, 0, 0, (camera: any, progress: number) => {
      if (progress === 1) {
        this._goNextScene();
      }
    });
  }

  private _goNextScene(): void {
    this.loadingText.destroy();
    this.progressBar.destroy();
    this.bar.destroy();

    const nextScene = this.config.nextScene ? this.config.nextScene : 'opening';
    this.scene.start(nextScene);
  }
}
