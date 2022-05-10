import * as Phaser from 'phaser';
import { MapData } from './MapData';

type StaticLayer = Phaser.Tilemaps.TilemapLayer;

export interface ISceneTilemapData {
  staticLayers: StaticLayer[];
  mapData: MapData;
}
