/**
 * イベント用のテキスト群は単に`string[]`で管理しても良いが、
 * 取得しようとしたindexが不正であるときにundefinedが返らない
 * 形にしたかったのでこっちにした
 */
export class EventTextEntry {
  readonly key: string;

  private texts: Map<number, string>;

  constructor(key: string, texts: string[]) {
    this.key = key;
    this.texts = new Map<number, string>();

    texts.forEach((text: string, index: number) => {
      this.texts.set(index, text);
    });
  }

  get(index: number): string {
    const text = this.texts.get(index);

    return text ? text : `FAIL_TO_GET_TEXT_${this.key}_${index}`;
  }
}
