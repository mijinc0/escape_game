import { AssetTypes } from './AssetTypes';

export interface IAssetLoadingEntry { 
  readonly type: AssetTypes;

  readonly key: string;
 
  readonly path: string;
}