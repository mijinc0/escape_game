export class GameVariables {
  private variables: Map<number, number>;

  constructor() {
    this.variables = new Map<number, number>();
  }

  set(key: number, num: number): void {
    this.variables.set(key, num);
  }

  add(key: number, delta: number): void {
    const newNum = this.get(key) + delta;
    this.variables.set(key, newNum);
  }

  subtract(key: number, delta: number): void {
    const newNum = this.get(key) - delta;
    this.variables.set(key, newNum);
  }

  get(key: number): number {
    return this.variables.get(key) ? this.variables.get(key) : 0;
  }

  reset(): void {
    this.variables.clear();
  }

  forEach(callbackfn: (value: number, key: number, map: Map<number, number>) => void, thisArg?: any): void {
    this.variables.forEach(callbackfn, thisArg);
  }
}
