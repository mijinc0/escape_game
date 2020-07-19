import * as Phaser from 'phaser';
import { IAssetLoadingConfig } from './IAssetLoadingConfig';
import { IAssetEntry } from './IAssetEntry';
import { ISpritesheetAssetEntry } from './ISpritesheetAssetEntry';

export class AssetLoader {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  load(config: IAssetLoadingConfig): void {
    if (config.itemIcon) {
      config.itemIcon.forEach((entry: IAssetEntry) => {
        this._loadItemIcon(entry.key, entry.path);
      });
    }

    if (config.spritesheet) {
      config.spritesheet.forEach((entry: ISpritesheetAssetEntry) => {
        this._loadSpritesheet(entry.key, entry.path, entry.frameWidth, entry.frameHeight);
      });
    }

    if (config.tileImage) {
      config.tileImage.forEach((entry: IAssetEntry) => {
        this._loadTileImage(entry.key, entry.path);
      });
    }

    if (config.tileInfo) {
      config.tileInfo.forEach((entry: IAssetEntry) => {
        this._loadTileInfo(entry.key, entry.path);
      });
    }

    if (config.audio) {
      config.audio.forEach((entry: IAssetEntry) => {
        this._loadAudio(entry.key, entry.path);
      });
    }

    if (config.tileMap) {
      config.tileMap.forEach((entry: IAssetEntry) => {
        this._loadTileTileMap(entry.key, entry.path);
      });
    }
  }

  onProgress(event: (progress: number) => void): void {
    this.scene.load.on('progress', event);
  }

  onSuccessful(event: (file: any) => void): void {
    this.scene.load.on('load', event);
  }

  onComplete(event: () => void): void {
    this.scene.load.on('complete', event);
  }

  private _loadItemIcon(key: string, path: string): void {
    this.scene.load.image(key, path);
  }

  private _loadSpritesheet(key: string, path: string, frameWidth: number, frameHeight: number): void {
    this.scene.load.spritesheet(key, path, {
      frameWidth: frameWidth,
      frameHeight: frameHeight,
    });
  }

  private _loadTileImage(key: string, path: string): void {
    this.scene.load.image(key, path);
  }

  private _loadTileInfo(key: string, path: string): void {
    this.scene.load.json(key, path);
  }

  private _loadTileTileMap(key: string, path: string): void {
    this.scene.load.json(key, path);
  }

  private _loadAudio(key: string, path: string): void {
    this.scene.load.audio(key, path);
  }
}
