import * as Model from '../models';
import * as Util from '../utils';
import { MapData } from './MapData';
import { ActorPositionsFactory } from './ActorPositionsFactory';
import { LayeredMapDataFactory } from './LayeredMapDataFactory';
import { TileInfosFactory } from './TileInfosFactory';
import { ILayerData } from './ILayerData';

export class MapDataFactory {
  static createFromJson(
    mapJson: any,
    tileJson: any,
    tileImage: string,
  ): MapData {
    const layerData = LayeredMapDataFactory.createFromJson(mapJson);
    const tileSize = this._getTileSizeFromJson(mapJson);
    const tileInfos = TileInfosFactory.createFromJson(tileJson);
    const worldBounce = this._calcWorldBounce(layerData, tileSize);
    const actorPositions = ActorPositionsFactory.createFromJson(mapJson);

    return new MapData(
      layerData,
      tileSize,
      tileInfos,
      tileImage,
      worldBounce,
      actorPositions,
    );
  }

  private static _getTileSizeFromJson(mapJson: any): Model.Size {
    const tileWidth = Util.ValueTypeUtil.isNumber(mapJson.tilewidth)
      ? mapJson.tilewidth
      : 1;
    const tileHeight = Util.ValueTypeUtil.isNumber(mapJson.tileheight)
      ? mapJson.tileheight
      : 1;
    return { width: tileWidth, height: tileHeight };
  }

  private static _calcWorldBounce(
    layerData: ILayerData[],
    tileSize: Model.Size,
  ): Model.Size {
    const maxRowSize = this._getMaxRowSize(layerData);
    const maxColumnSize = this._getMaxColumnSize(layerData);
    return {
      width: maxRowSize * tileSize.width,
      height: maxColumnSize * tileSize.height,
    };
  }

  private static _getMaxRowSize(layerData: ILayerData[]): number {
    const rowsSize: number[] = [];

    layerData.forEach((layer: ILayerData) => {
      rowsSize.push(layer.data[0] ? layer.data[0].length : 0);
    });

    return Math.max(...rowsSize);
  }

  private static _getMaxColumnSize(layerData: ILayerData[]): number {
    const columnSize: number[] = [];

    layerData.forEach((layer: ILayerData) => {
      columnSize.push(layer.data.length);
    });

    return Math.max(...columnSize);
  }
}
