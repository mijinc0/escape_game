import * as Util from '../utils';
import { TileInfo } from './TileInfo';

export class TileInfosFactory {
  static createFromJson(jsonFile: any): TileInfo[] {
    const tiles: any[] = Util.ValueTypeUtil.isObjectArray(jsonFile.tiles)
      ? jsonFile.tiles
      : [];
    return this._createTileInfos(tiles);
  }

  private static _createTileInfos(tileDataArray: any[]): TileInfo[] {
    return tileDataArray.map((tileData: any) => this._createTileInfo(tileData));
  }

  private static _createTileInfo(tileData: any): TileInfo {
    // idを (tileData.id + 1) とするのは、Tiledのマップデータでは何もない場所のタイルIDを0とし、
    // タイルデータに含まれる最初のタイルのIDを1とするのに対して、タイルデータは最初のタイルIDを0とするため、
    // マップデータとタイルデータを合わせた時にIDがひとつずれてしまうため、タイルIDを+1して修正している
    const id = Util.ValueTypeUtil.isNumber(tileData.id) ? tileData.id + 1 : -1;
    const properties = this._parsePropertiesObject(tileData.properties);
    const collide = Util.ValueTypeUtil.isBoolean(properties.get('collide'))
      ? properties.get('collide')
      : false;
    return {
      id: id,
      collide: collide,
    };
  }

  /**
   * Tiledのオブジェクトレイヤーのpropertiesフィールド
   * {"name":"actorId", "type":"number", "value": 10}
   * これをMap<string, any>に変換する
   *
   * @param properties
   */
  private static _parsePropertiesObject(properties: any): Map<string, any> {
    const result = new Map<string, any>();

    if (!(properties instanceof Array)) return result;

    properties.forEach((property: any) => {
      // keyのみ有効であればセットする
      if (!property.name) return;
      result.set(property.name, property.value);
    });

    return result;
  }
}
