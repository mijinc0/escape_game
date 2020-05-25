import { ActorPosition } from './ActorPosition';
import { TileInfo } from './TileInfo';
import { Size } from '../models/Size';

export class MapData {
  data: Map<number, number[][]>;

  tileSize: Size;

  tileInfos: TileInfo[];

  tileImage: string;

  worldBounce: Size;

  actorPositions: ActorPosition[];

  constructor (
    // Map<layerId: number, rawMapData: number[][]>
    data: Map<number, number[][]>,
    tileSize: Size,
    tileInfos: TileInfo[],
    tileImage: string,
    worldBounce: Size,
    actorPositions: ActorPosition[],
  ) {
    this.data = data;
    this.tileSize = tileSize;
    this.tileInfos = tileInfos;
    this.tileImage = tileImage;
    this.worldBounce = worldBounce;
    this.actorPositions = actorPositions;
  }
}