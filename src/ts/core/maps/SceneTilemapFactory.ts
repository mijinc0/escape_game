import * as Phaser from 'phaser';
import { ISceneTilemapData } from './ISceneTilemapData';
import { ILayerData } from './ILayerData';
import { MapDataFactory } from './MapDataFactory';
import { TileInfo } from './TileInfo';
import { Size } from '../models/Size';

type StaticLayer = Phaser.Tilemaps.StaticTilemapLayer;
 
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

  create(): ISceneTilemapData {
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

  private _createMap(mapJson: any, tileJson: any, tilesetImageName: string): ISceneTilemapData {
    // 1. create map data
    const mapData = MapDataFactory.createFromJson(mapJson, tileJson, tilesetImageName);

    // 2. extract table data from mapData in order of id
    const rawData = mapData.layers
      .sort((a: ILayerData, b: ILayerData) => (a.id - b.id))
      .map((layer: ILayerData) => (layer.data));
    
    // 3. create static layers into the scene
    const staticLayers: StaticLayer[] = [];
    rawData.forEach((data: number[][]) => {
      const staticLayer = this._createStaticLayer(data, mapData.tileSize, tilesetImageName);

      this._addColliders(staticLayer, mapData.tileInfos);

      staticLayers.push(staticLayer);
    });

    return {staticLayers: staticLayers, mapData: mapData};
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
  ): StaticLayer {
    // 1. create phaser's tilemap
    const tilemap = this.scene.make.tilemap({
      data: data,
      tileWidth: tileSize.width,
      tileHeight: tileSize.height,
    });

    // 2. create phaser's tileset
    // 最後の引数のgidは大事。タイルのidを1からにしないと、マップファイルのデータとindexが1つずれてしまう。
    const tileset = tilemap.addTilesetImage(tilesetName, undefined, tileSize.width, tileSize.height, 0, 0, 1);

    // 3. create static layer
    // idは、tilemapオブジェクトの中に含まれているレイヤーデータのインデックスを指定する
    // 今回は、各レイヤーの生データを取り出して一つずつstaticLayerを生成しているので、
    // 全てtilemap中のindexは0になる
    return tilemap.createStaticLayer(0, tileset, 0, 0);
  }

  private _addColliders(staticLayer: StaticLayer, tileInfos: TileInfo[]): void {
    tileInfos.forEach((tileInfo: TileInfo) => {
      if (tileInfo.collide) staticLayer.setCollision(tileInfo.id);
    });
  }
}