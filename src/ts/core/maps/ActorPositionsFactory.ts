import * as Util from '../utils';
import { ActorPosition } from './ActorPosition';

/**
 * Tiledのオブジェクトレイヤーは全てActorPositionとして読み込む
 * オブジェクトレイヤーにあるオブジェクトとActorのマッピングは "actorId"により行う
 * オブジェクトにactorIdプロパティが無い場合は、idをそのままactorIdとして読み込む
 */
export class ActorPositionsFactory {
  static createFromJson(mapJson: any): ActorPosition[] {
    if (!(mapJson.layers instanceof Array)) throw Error('illegal layers data');

    const objectLayers = mapJson.layers.filter((layer: any) => this._isObjectLayer(layer));

    const objectDataArray = this._flatMap(objectLayers, (layer: any) =>
      layer.objects instanceof Array ? layer.objects : [],
    );

    return objectDataArray.map((objectData: any) => this._createEntryFromObjectData(objectData));
  }

  private static _isObjectLayer(layer: any): boolean {
    return Object.keys(layer).includes('objects');
  }

  private static _flatMap<T>(array: any[], callback: (data: any) => T[]): T[] {
    const result: T[] = [];

    array.forEach((element: any) => {
      const newElements = callback(element);
      result.push(...newElements);
    });

    return result;
  }

  private static _createEntryFromObjectData(objectData: any): ActorPosition {
    const properties = this._parsePropertiesObject(objectData.properties);

    if (!properties) throw Error('illegal object data');

    const id = Util.ValueTypeUtil.isNumber(objectData.id) ? objectData.id : -1;
    const positionX = Util.ValueTypeUtil.isNumber(objectData.x) ? objectData.x : 0;
    const positionY = Util.ValueTypeUtil.isNumber(objectData.y) ? objectData.y : 0;
    const actorId = Util.ValueTypeUtil.isNumber(properties.get('actorId')) ? properties.get('actorId') : id;

    return new ActorPosition(id, actorId, { x: positionX, y: positionY });
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
