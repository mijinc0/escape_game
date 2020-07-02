import { IAssetLoadingEntry } from './IAssetLoadingEntry';

export interface IAssetLoadingConfig {
  entries: IAssetLoadingEntry[];
  
  onComplete: () => void;
}