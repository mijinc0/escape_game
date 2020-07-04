import { IAssetEntry } from './IAssetEntry';
import { ISpritesheetAssetEntry } from './ISpritesheetAssetEntry';

export interface IAssetLoadingConfig { 
  tileMap?: IAssetEntry[],
  
  tileImage?: IAssetEntry[],

  tileInfo?: IAssetEntry[],

  itemIcon?: IAssetEntry[],
  
  spritesheet?: ISpritesheetAssetEntry[],

  onComplete?: () => void;
}