import * as Scene from '../scenes';
import { IActor } from './IActor';

export interface IFieldActor extends IActor {
  eventId: number;

  update(scene: Scene.IFieldScene): void;
}
