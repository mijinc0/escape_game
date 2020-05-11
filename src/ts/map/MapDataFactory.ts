import { MapData } from './MapData';
import { ActorEntriesFactory } from './ActorEntriesFactory';
import { LayeredMapDataFactory } from './LayeredMapDataFactory';
import { TileInfosFactory } from './TileInfosFactory';
import { Size } from '../models/Size';
import { ValueTypeUtil } from '../utils/ValueTypeUtil';

type LayeredMapData = Map<number, number[][]>;

export class MapDataFactory {
  static createFromJson(mapJson: any, tileJson: any,): MapData {
    const layeredMapData = LayeredMapDataFactory.createFromJson(mapJson);
    const tileSize = this._getTileSizeFromJson(mapJson);
    const tileInfos = TileInfosFactory.createFromJson(tileJson);
    const worldBounce = this._calcWorldBounce(layeredMapData, tileSize);
    const actorEntries = ActorEntriesFactory.createFromJson(mapJson);

    return new MapData(
      layeredMapData,
      tileSize,
      tileInfos,
      worldBounce,
      actorEntries,
    );
  }

  private static _getTileSizeFromJson(mapJson: any): Size {
    const tileWidth = ValueTypeUtil.isNumber(mapJson.tilewidth) ? mapJson.tilewidth : 1;
    const tileHeight = ValueTypeUtil.isNumber(mapJson.tileheight) ? mapJson.tileheight : 1;
    return {width: tileWidth, height: tileHeight};
  }

  private static _calcWorldBounce(layeredMapData: LayeredMapData, tileSize: Size): Size {
    const maxRowSize = this._getMaxRowSize(layeredMapData);
    const maxColumnSize = this._getMaxColumnSize(layeredMapData);
    return {
      width: maxRowSize * tileSize.width,
      height: maxColumnSize * tileSize.height,
    };
  }

  private static _getMaxRowSize(layeredMapData: LayeredMapData): number {
    const rowsSize: number[] = [];

    layeredMapData.forEach((layer: number[][]) => {
      rowsSize.push(layer[0] ? layer[0].length : 0);
    });

    return Math.max(...rowsSize);
  }

  private static _getMaxColumnSize(layeredMapData: LayeredMapData): number {
    const columnSize: number[] = [];

    layeredMapData.forEach((layer: number[][]) => {
      columnSize.push(layer.length);
    });

    return Math.max(...columnSize);
  }
}