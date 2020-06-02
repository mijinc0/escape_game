import { ActorPosition } from './ActorPosition';
import { TileInfo } from './TileInfo';
import { ILayerData } from './ILayerData';
import { Size } from '../models/Size';

export class MapData {
  layers: ILayerData[];

  tileSize: Size;

  tileInfos: TileInfo[];

  tileImage: string;

  worldBounce: Size;

  actorPositions: ActorPosition[];

  constructor (
    layers: ILayerData[],
    tileSize: Size,
    tileInfos: TileInfo[],
    tileImage: string,
    worldBounce: Size,
    actorPositions: ActorPosition[],
  ) {
    this.layers = layers;
    this.tileSize = tileSize;
    this.tileInfos = tileInfos;
    this.tileImage = tileImage;
    this.worldBounce = worldBounce;
    this.actorPositions = actorPositions;
  }
}