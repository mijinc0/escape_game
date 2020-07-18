import * as Phaser from 'phaser';
import * as Model from '../models';
import { ISceneTilemapData } from './ISceneTilemapData';
import { ILayerData } from './ILayerData';
import { MapDataFactory } from './MapDataFactory';
import { TileInfo } from './TileInfo';

type StaticLayer = Phaser.Tilemaps.StaticTilemapLayer;

export class SceneTilemapFactory {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  create(
    tilemapKey: string,
    tileInfoKey: string,
    tileImageKey: string,
  ): ISceneTilemapData {
    // get json data
    const jsonMapDataFile = this.scene.cache.json.get(tilemapKey);
    const jsonTilesetInfos = this.scene.cache.json.get(tileInfoKey);

    // check existance
    if (!jsonTilesetInfos || !jsonMapDataFile)
      throw Error('json (mapdata or tilesetInfo) is not found.');

    // create
    return this._createMap(jsonMapDataFile, jsonTilesetInfos, tileImageKey);
  }

  private _createMap(
    mapJson: any,
    tileJson: any,
    tileImageKey: string,
  ): ISceneTilemapData {
    // 1. create map data
    const mapData = MapDataFactory.createFromJson(
      mapJson,
      tileJson,
      tileImageKey,
    );

    // 2. extract table data from mapData in order of id
    const rawData = mapData.layers
      .sort((a: ILayerData, b: ILayerData) => a.id - b.id)
      .map((layer: ILayerData) => layer.data);

    // 3. create static layers into the scene
    const staticLayers: StaticLayer[] = [];
    rawData.forEach((data: number[][]) => {
      const staticLayer = this._createStaticLayer(
        data,
        mapData.tileSize,
        tileImageKey,
      );

      this._addColliders(staticLayer, mapData.tileInfos);

      staticLayers.push(staticLayer);
    });

    return { staticLayers: staticLayers, mapData: mapData };
  }

  /**
   * (e.g.) `root/map/testmap.json` => `testmap`
   * @param filePath
   */
  private _getFileName(filePath: string): string {
    const splitByDir = filePath.split('/');
    const lastPart = splitByDir[splitByDir.length - 1];
    return lastPart.split('.')[0];
  }

  private _createStaticLayer(
    data: number[][],
    tileSize: Model.Size,
    tileImageKey: string,
  ): StaticLayer {
    // 1. create phaser's tilemap
    const tilemap = this.scene.make.tilemap({
      data: data,
      tileWidth: tileSize.width,
      tileHeight: tileSize.height,
    });

    // 2. create phaser's tileset
    // 最後の引数のgidは大事。タイルのidを1からにしないと、マップファイルのデータとindexが1つずれてしまう。
    const tileset = tilemap.addTilesetImage(
      tileImageKey,
      undefined,
      tileSize.width,
      tileSize.height,
      0,
      0,
      1,
    );

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
