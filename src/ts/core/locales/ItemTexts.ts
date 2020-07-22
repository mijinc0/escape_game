import { IItemTextsEntry } from './IItemTextsEntry';

export class ItemTexts {
  private entries: Map<number, IItemTextsEntry>;

  constructor(...texts: IItemTextsEntry[]) {
    this.entries = new Map<number, IItemTextsEntry>();

    texts.forEach((entry: IItemTextsEntry, index: number) => {
      this.entries.set(index, entry);
    });
  }

  get(id: number): IItemTextsEntry {
    const entry = this.entries.get(id);

    return entry ? entry : {name: `FAIL_TO_GET_NAME_${id}`, description: `FAIL_TO_GET_DESCRIPTION_${id}`};
  }
}