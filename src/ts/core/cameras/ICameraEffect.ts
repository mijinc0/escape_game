export interface ICameraEffect {
  name: string;

  isRunning: boolean;

  start(...args: any[]): boolean;
  
  reset(): boolean;

  update(time: number, delta: number): void;
}