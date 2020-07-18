/**
 * elementの座標はPhaserに併せてx,yを直接プロパティとして持たせているが、
 * 関数の戻り値の形などでまとめたほうが都合が良いときのために使うインターフェース
 */
export interface IPosition {
  x: number;
  y: number;
}
