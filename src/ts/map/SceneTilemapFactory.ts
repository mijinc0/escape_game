import * as Phaser from 'phaser';

import { MapData } from './MapData';
import { MapDataFactory } from './MapDataFactory';
import { TileInfo } from './TileInfo';
import { Size } from '../models/Size';
 
export class SceneTilemapFactory {
  private scene: Phaser.Scene;
  private mapFilePath: string;
  private tilesetFilePath: string;
  private tilesetImagePath: string;

  constructor(
    scene: Phaser.Scene,
    mapFilePath: string,
    tilesetFilePath: string,
    tilesetImagePath: string,
  ) {
    this.scene = scene;
    this.mapFilePath = mapFilePath;
    this.tilesetFilePath = tilesetFilePath;
    this.tilesetImagePath = tilesetImagePath;
  }

  loadAssets(): void {
    const mapFileName = this._getFileName(this.mapFilePath);
    const tilesetFileName = this._getFileName(this.tilesetFilePath);
    const tilesetImageName = this._getFileName(this.tilesetImagePath);

    this.scene.load.json(mapFileName, this.mapFilePath);
    this.scene.load.json(tilesetFileName, this.tilesetFilePath);
    this.scene.load.image(tilesetImageName, this.tilesetImagePath);
  }

  create(): MapData {
    const mapFileName = this._getFileName(this.mapFilePath);
    const tilesetFileName = this._getFileName(this.tilesetFilePath);
    const tilesetImageName = this._getFileName(this.tilesetImagePath);

    // get json data
    const jsonMapDataFile = this.scene.cache.json.get(mapFileName);
    const jsonTilesetInfos = this.scene.cache.json.get(tilesetFileName);

    // check existance
    if (!jsonTilesetInfos || !jsonMapDataFile) throw Error('json (mapdata or tilesetInfo) is not found.');

    // create
    return this._createMap(jsonMapDataFile, jsonTilesetInfos, tilesetImageName);
  }

  private _createMap(mapJson: any, tileJson: any, tilesetImageName: string): MapData {
    // 1. create map data
    const mapData = MapDataFactory.createFromJson(mapJson, tileJson, tilesetImageName);

    // 2. create static layers into the scene
    mapData.data.forEach((data: number[][], layerId: number) => {
      const staticLayer = this._createStaticLayer(
        data,
        mapData.tileSize,
        tilesetImageName,
        layerId,
      );

      this._addColliders(staticLayer, mapData.tileInfos);
    });

    return mapData;
  }

  private _getFileName(filePath: string): string {
    const splitByDir = filePath.split('/');
    const lastPart = splitByDir[splitByDir.length - 1];
    return lastPart.split('.')[0];
  }

  private _createStaticLayer(
    data: number[][],
    tileSize: Size,
    tilesetName: string,
    layerId: number,
  ): Phaser.Tilemaps.StaticTilemapLayer {
    // 1. create phaser's tilemap
    const tilemap = this.scene.make.tilemap({
      data: data,
      tileWidth: tileSize.width,
      tileHeight: tileSize.height,
    });

    // 2. create phaser's tileset
    // 最後の引数のgidは大事。タイルのidを1からにしないと、マップファイルのデータとindexが1つずれてしまう。
    const tileset = tilemap.addTilesetImage(
      tilesetName,
      undefined,
      tileSize.width,
      tileSize.height,
      0,
      0,
      1,
    );

    // 3. create static layer
    const id = layerId - 1; // TiledのIdは1から始まるが、0から始めたいので
    return tilemap.createStaticLayer(id, tileset, 0, 0);
  }

  private _addColliders(staticLayer: Phaser.Tilemaps.StaticTilemapLayer, tileInfos: TileInfo[]): void {
    const collisionTileIndexes = tileInfos.filter((tileInfo: TileInfo) => (tileInfo.collide));
    staticLayer.setCollision(collisionTileIndexes, true);
  }
}