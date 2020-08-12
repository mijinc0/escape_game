import { EventTexts } from './EventTexts';
import { ItemTexts } from './ItemTexts';
import { ICreditTextEntry } from './ICreditTextEntry';

export interface ITextStore {
  event: EventTexts;

  item: ItemTexts;

  credits: ICreditTextEntry[];
}