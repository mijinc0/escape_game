export class GameFlags {
  private flags: Map<number, boolean>;

  constructor() {
    this.flags = new Map<number, boolean>();
  }

  on(key: number): void {
    this.flags.set(key, true);
  }

  off(key: number): void {
    this.flags.set(key, false);
  }

  toggle(key: number): void {
    const toggled = this.flags.get(key) ? false : true;
    this.flags.set(key, toggled);
  }

  get(key: number): boolean {
    return !!this.flags.get(key);
  }

  reset(): void {
    this.flags.clear();
  }

  forEach(callbackfn: (value: boolean, key: number, map: Map<number, boolean>) => void, thisArg?: any): void {
    this.flags.forEach(callbackfn, thisArg);
  }

  serialize(): string {
    return '';
  }
}
