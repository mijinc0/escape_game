import * as Phaser from 'phaser';
import * as Asset from '../core/assets';

export class Loading extends Phaser.Scene {
  private config: Asset.IAssetLoadingConfig;
  private loadingText: Phaser.GameObjects.Text;
  private progressBar: Phaser.GameObjects.Rectangle;

  init(config: Asset.IAssetLoadingConfig): void {
    console.log('== start scene Loading ==');

    if (!config) {
      throw Error('AssetLoadingConfig is not found');
    }

    this.config = config;
  }

  preload(): void {
    console.log('preload');

    this.loadingText = this.add.text(50, 50, 'Loading...', {
      fontSize: '24px',
      fontFamily: 'sans-serif',
    });
    this.progressBar = this.add.rectangle(40, 400, 0, 4, 0xffffff, 1);

    this.loadingText.setOrigin(0);
    this.progressBar.setOrigin(0);

    const loader = new Asset.AssetLoader(this);

    loader.onProgress(this._updateBar.bind(this));

    loader.onSuccessful(this._loadingSuccessful.bind(this));

    loader.load(this.config);

    loader.onComplete(this._complete.bind(this));
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
    console.log('loading complete');

    this.cameras.main.fadeOut(500, 0, 0, 0, (camera: any, progress: number) => {
      if (progress === 1) {
        this._goNextScene();
      }
    });
  }

  private _goNextScene(): void {
    this.loadingText.destroy();
    this.progressBar.destroy();

    const nextScene = this.config.nextScene ? this.config.nextScene : 'opening';
    this.scene.start(nextScene);
  }
}
