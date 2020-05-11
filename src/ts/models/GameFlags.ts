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

  get(key: string): boolean {
    return !!this.flags.get(key);
  }
}