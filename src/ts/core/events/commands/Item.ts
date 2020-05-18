import * as Phaser from 'phaser';
import { IScenarioEvent } from '../IScenarioEvent';

export class Item implements IScenarioEvent{
  isComplete: boolean;
  isAsync: boolean;

  constructor(async = false) {    
    this.isAsync = async;
    this.isComplete = false; 
  }

  update(frame: number): void {

  }

  complete(frame: number): void {

    this.isComplete = true;
  }
}