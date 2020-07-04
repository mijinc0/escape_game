import * as Phaser from 'phaser';
import { AssetLoader } from '../core/assets/AssetLoader';
import { IAssetLoadingConfig } from '../core/assets/IAssetLoadingConfig';

export class Loading extends Phaser.Scene {

  private config: IAssetLoadingConfig;

  init(config: IAssetLoadingConfig): void {
    console.log('start scene Loading');

    if (!config) {
      throw Error('AssetLoadingConfig is not found');
    }
    
    this.config = config;
  }
  
  preload (): void {
    console.log('preload');

    const loader = new AssetLoader(this);

    this.add.text(
      50,
      50,
      'Loading',
      {
        fontSize: '32px',
      }
    );

    loader.onProgress(this._updateBar.bind(this));
    loader.onComplete(this._complete.bind(this));
    
    loader.load(this.config);
  }

  private _updateBar(percentage: number): void {
		console.log("P:" + percentage);
	}

	private _complete(): void {
    if (this.config.onComplete) {
      this.config.onComplete();
    }
	}
}