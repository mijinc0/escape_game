import * as Phaser from 'phaser';
import { AssetTypes } from '../core/assets/AssetTypes';
import { IAssetLoadingConfig } from '../core/assets/IAssetLoadingConfig';
import { IAssetLoadingEntry } from '../core/assets/IAssetLoadingEntry';

export class Loading extends Phaser.Scene {
  private frame: number;

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

    this.add.text(50, 50, 'Loading');

    this.load.on('progress', this._updateBar.bind(this));
    this.load.on('complete', this._complete.bind(this));
    
    this.config.entries.forEach((entry: IAssetLoadingEntry) => {
      this._loadAsset(entry);
    });
  }
  
  create(): void {
    console.log('create');
  }
  
  update(): void {
    console.log('update');
  }

  private _loadAsset(entry: IAssetLoadingEntry): void {
    switch (entry.type) {
      case AssetTypes.Image :
        this.load.image(entry.key, entry.path);
        break;
      
      case AssetTypes.Json :
        this.load.json(entry.key, entry.path);
        break;
      
      case AssetTypes.Spritesheet :
        this.load.spritesheet(entry.key, entry.path);
        break;
    }
  }

  private _updateBar(percentage: number): void {
		console.log("P:" + percentage);
	}

	private _complete(): void {
		this.config.onComplete();
	}
}