import * as Model from '../models';
import { ActorPosition } from './ActorPosition';
import { TileInfo } from './TileInfo';
import { ILayerData } from './ILayerData';

export class MapData {
  layers: ILayerData[];

  tileSize: Model.Size;

  tileInfos: TileInfo[];

  tileImage: string;

  worldBounce: Model.Size;

  actorPositions: ActorPosition[];

  constructor(
    layers: ILayerData[],
    tileSize: Model.Size,
    tileInfos: TileInfo[],
    tileImage: string,
    worldBounce: Model.Size,
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
