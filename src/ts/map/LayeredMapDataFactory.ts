import { ValueTypeUtil } from '../utils/ValueTypeUtil';

export class LayeredMapDataFactory {
  static createFromJson(mapJson: any): Map<number, number[][]> {
    const result = new Map<number, number[][]>();

    if (!(mapJson.layers instanceof Array)) throw Error('illegal layers data.');

    const mapLayers = mapJson.layers.filter((layer: any) => (
      this._isMapLayer(layer)
    ));

    mapLayers.forEach((layer: any) => {
      const id = ValueTypeUtil.isNumber(layer.id) ? layer.id : -99;
      const data = this._extractMapData(layer, id);
      result.set(id, data);
    });

    return result;
  }

  private static _extractMapData(layerData: any, layerId: number): number[][] {
    const ragneMapData = layerData.data;
    const columnSize = layerData.height;
    const rowSize = layerData.width;
    
    if (this._isLeagalMapdataFromat(ragneMapData, columnSize, rowSize)) {
      throw Error(`illegal map data format (layerID : ${layerId})`);
    }

    return this._createMapDataFromRangeData(ragneMapData, columnSize, rowSize);
  }


  private static _isLeagalMapdataFromat (
    rawMapData: any,
    columnSize: any,
    rawSize: any,
  ): boolean {
    return (
      !ValueTypeUtil.isNumberArray(rawMapData) ||
      !ValueTypeUtil.isNumber(rawSize) ||
      !ValueTypeUtil.isNumber(columnSize)
    );
  }

  private static _createMapDataFromRangeData(
    rangeMapData: number[],
    columnSize: number,
    rowSize: number,  
  ): number[][] {
    const mapData: number[][] = [];

    // マップデータが一列になってしまっているので、行列にする
    for (let r = 0; r < columnSize; r++) {
      const startIndex = r * rowSize;
      const endIndex = startIndex + rowSize;
      const row = rangeMapData.slice(startIndex, endIndex);

      // 最後の行の要素数が足りないようなことがあれば0でパディングする
      if (row.length < rowSize) this._padZero(row, rowSize);

      mapData[r] = row;
    }

    return mapData;
  }

  private static _padZero(numArray: number[], length: number):void {
    const originalLength = numArray.length;
    if (originalLength >= length) return;
    numArray.length = length;
    numArray.fill(0, originalLength, length);
  }

  private static _isMapLayer(layer: any): boolean {
    return Object.keys(layer).includes('data');
  }
}