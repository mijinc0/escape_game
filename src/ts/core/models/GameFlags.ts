export class GameFlags {
  private flags: Map<string, boolean>;

  constructor() {
    this.flags = new Map<string, boolean>();
  }

  on(key: string): void {
    this.flags.set(key, true);
  }

  off(key: string): void {
    this.flags.set(key, false);
  }

  toggle(key: string): void {
    const toggled = this.flags.get(key) ? false : true;
    this.flags.set(key, toggled);
  }

  get(key: string): boolean {
    return !!this.flags.get(key);
  }

  reset(): void {
    this.flags.clear();
  }

  forEach(
    callbackfn: (
      value: boolean,
      key: string,
      map: Map<string, boolean>,
    ) => void,
    thisArg?: any,
  ): void {
    this.flags.forEach(callbackfn, thisArg);
  }

  serialize(): string {
    return '';
  }
}
