import { EventTextEntry } from './EventTextEntry';
import { EventTexts } from './EventTexts';
import { IEventTextConfig } from './IEventTextConfig';

export class EventTextFactory {
  static create(configs: IEventTextConfig[]): EventTexts {
    const entries = EventTextFactory.createEntries(configs);

    return new EventTexts(...entries);
  }

  static createFromMultipileConfigsChunks(...configsChunk: IEventTextConfig[][]): EventTexts {
    const entriesChunks = configsChunk.map((configs: IEventTextConfig[]) => (
      EventTextFactory.createEntries(configs)
    ));

    const entries = entriesChunks.reduce((a: EventTextEntry[], b: EventTextEntry[]) => (a.concat(b)));

    return new EventTexts(...entries);
  }

  private static createEntries(configs: IEventTextConfig[]): EventTextEntry[] {
    return configs.map((config: IEventTextConfig) => (
      new EventTextEntry(config.key, config.texts)
    ));
  }
}