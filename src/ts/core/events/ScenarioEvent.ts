export class ScenarioEvent {
  isGoing: boolean;
  isAsync: boolean;

  constructor() {
    this.isGoing = false;
    this.isAsync = false;
  }

  update(frame?: number): void {
    
  }
}