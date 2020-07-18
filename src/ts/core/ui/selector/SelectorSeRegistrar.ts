import * as Audio from '../../audios';
import * as Asset from '../../assets';
import * as Ui from '../../ui';
import { ISelector } from './ISelector';

/**
 * 全てキャッシュに登録されているオーディオのキーを指定する
 */
type SelectorSeConfig = {
  rootGroupCanceled?: string,
  groupCanceled?: string,
  goNext?: string,
  select?: string,
}

export class SelectorSeRegistrar {
  private static readonly defaultRootGroupCanceled = Asset.AssetCacheKey.audio('se_ui_cancel'); 
  private static readonly defaultGroupCanceled = Asset.AssetCacheKey.audio('se_ui_cancel'); 
  private static readonly defaultGoNext = Asset.AssetCacheKey.audio('se_ui_curor_move'); 
  private static readonly defaultSelect = Asset.AssetCacheKey.audio('se_ui_select'); 

  static regist(selector: ISelector, audioManager: Audio.IAudioManager, config?: SelectorSeConfig): void {
    config = config ? config : {};

    config = {
      rootGroupCanceled: config.rootGroupCanceled ? config.rootGroupCanceled : SelectorSeRegistrar.defaultRootGroupCanceled,
      groupCanceled: config.groupCanceled ? config.groupCanceled : SelectorSeRegistrar.defaultGroupCanceled,
      goNext: config.goNext ? config.goNext : SelectorSeRegistrar.defaultGoNext,
      select: config.select ? config.select : SelectorSeRegistrar.defaultSelect,
    };

    selector.on(Ui.SelectorEventNames.RootGroupCanceled, () => {
      audioManager.playSe(config.rootGroupCanceled, {});
    });

    selector.on(Ui.SelectorEventNames.GroupCanceled, () => {
      audioManager.playSe(config.groupCanceled, {});
    });

    selector.on(Ui.SelectorEventNames.GoNext, () => {
      audioManager.playSe(config.goNext, {});
    });

    selector.on(Ui.SelectorEventNames.Select, () => {
      audioManager.playSe(config.select, {});
    });
  }
}