import { EventTexts } from './EventTexts';
import { ItemTexts } from './ItemTexts';

export interface ITextStore {
  event: EventTexts;

  item: ItemTexts;
}