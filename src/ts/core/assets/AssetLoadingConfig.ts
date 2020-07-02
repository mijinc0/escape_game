import { IAssetLoadingConfig } from './IAssetLoadingConfig';
import { IAssetLoadingEntry } from './IAssetLoadingEntry';

export class AssetLoadingConfig implements IAssetLoadingConfig {
  constructor(
    public entries: IAssetLoadingEntry[],
    public onComplete: () => void,
  ){}
}