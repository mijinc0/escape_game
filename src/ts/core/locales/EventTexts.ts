import { EventTextEntry } from './EventTextEntry';

export class EventTexts {
  /**
   * `get(key)`のkeyが不正だった時に返す空のEventTextEntry
   * (どのindexでgetしてもエラー文が返ってくるやつ)
   */
  static emptyEventTexts = new EventTextEntry('EMPTY', []);

  private entries: Map<string, EventTextEntry>;

  constructor(...entries: EventTextEntry[]) {
    this.entries = new Map<string, EventTextEntry>();

    entries.forEach((entry: EventTextEntry) => {
      this.entries.set(entry.key, entry);
    });
  }

  get(key: string): EventTextEntry {
    const entry = this.entries.get(key);

    return entry ? entry : EventTexts.emptyEventTexts;
  }
}
