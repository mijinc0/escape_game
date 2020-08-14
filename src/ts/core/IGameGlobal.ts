import * as Model from './models';
import * as Locales from './locales';
import * as Audio from './audios';

/**
 * グローバルに置いておきたいもの
 */
export interface IGameGlobal {
  flags: Model.GameFlags;

  variables: Model.GameVariables;

  items: Model.GameItems;

  ownItems: Model.ItemBag;

  texts: Locales.ITextStore;

  audioConfig: Audio.IAudioConfig;

  debug: boolean;
}
