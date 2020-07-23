import * as Model from '../core/models';
import * as Locales from '../core/locales';
import { AllItems } from './AllItems';

export function GameItems(itemTexts: Locales.ItemTexts): Model.GameItems {
  console.log('init text of GameItems...');

  AllItems.forEach((item: Model.Item) => {
    const texts = itemTexts.get(item.id);

    item.name = texts.name;
    item.description = texts.description;
  });

  return new Model.GameItems(...AllItems);
}