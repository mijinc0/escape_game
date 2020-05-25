import * as Phaser from 'phaser';
import { MapData } from './MapData';

type StaticLayer = Phaser.Tilemaps.StaticTilemapLayer;

export interface ISceneTilemapData {
  staticLayers: StaticLayer[],
  mapData: MapData,
}