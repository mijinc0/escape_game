import { IAssetEntry } from './IAssetEntry';
import { ISpritesheetAssetEntry } from './ISpritesheetAssetEntry';

export interface IAssetLoadingConfig { 
  nextScene?: string,

  tileMap?: IAssetEntry[],
  
  tileImage?: IAssetEntry[],

  tileInfo?: IAssetEntry[],

  itemIcon?: IAssetEntry[],

  audio?: IAssetEntry[],
  
  spritesheet?: ISpritesheetAssetEntry[],
}