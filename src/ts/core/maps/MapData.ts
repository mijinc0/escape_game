import { ActorEntry } from './ActorEntry';
import { TileInfo } from './TileInfo';
import { Size } from '../models/Size';

export class MapData {
  data: Map<number, number[][]>;

  tileSize: Size;

  tileInfos: TileInfo[];

  tileImage: string;

  worldBounce: Size;

  actorEntries: ActorEntry[];


  constructor (
    // Map<layerId: number, rawMapData: number[][]>
    data: Map<number, number[][]>,
    tileSize: Size,
    tileInfos: TileInfo[],
    tileImage: string,
    worldBounce: Size,
    actorEntries: ActorEntry[],
  ) {
    this.data = data;
    this.tileSize = tileSize;
    this.tileInfos = tileInfos;
    this.tileImage = tileImage;
    this.worldBounce = worldBounce;
    this.actorEntries = actorEntries;
  }
}