export class GameVariables {
  private variables: Map<string, number>;

  constructor() {
    this.variables = new Map<string, number>();
  }

  set(key: string, num: number): void {
    this.variables.set(key, num);
  }

  add(key: string, delta: number): void {
    const newNum = this.get(key) + delta;
    this.variables.set(key, newNum);
  }

  subtract(key: string, delta: number): void {
    const newNum = this.get(key) - delta;
    this.variables.set(key, newNum);
  }

  get(key: string): number {
    return this.variables.get(key) ? this.variables.get(key) : 0;
  }

  reset(): void {
    this.variables.clear();
  }

  forEach(callbackfn: (value: number, key: string, map: Map<string, number>) => void, thisArg?: any): void {
    this.variables.forEach(callbackfn, thisArg);
  }
}
