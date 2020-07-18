import { IAssetEntry } from './IAssetEntry';

export interface ISpritesheetAssetEntry extends IAssetEntry {
  frameWidth: number;

  frameHeight: number;
}
