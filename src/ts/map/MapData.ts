import { ActorEntry } from './ActorEntry';
import { TileInfo } from './TileInfo';
import { Size } from '../models/Size';

export class MapData {
  constructor (
    // Map<layerId: number, rawMapData: number[][]>
    data: Map<number, number[][]>,
    
    tileSize: Size,
    
    tileInfos: TileInfo[],
    
    worldBounce: Size,

    actorEntries: ActorEntry[],
  ) { }
}