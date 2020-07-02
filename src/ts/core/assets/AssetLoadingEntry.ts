import { AssetTypes } from './AssetTypes';
import { IAssetLoadingEntry } from './IAssetLoadingEntry';

export class AssetLoadingEntry implements IAssetLoadingEntry {
  constructor (  
    public readonly type: AssetTypes,
    public readonly key: string,
    public readonly path: string,
  ){ }
}