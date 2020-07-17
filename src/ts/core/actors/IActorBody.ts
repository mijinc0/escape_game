import * as Model from '../models';

export interface IActorBody {
  width: number;

  height: number;

  offset: Model.Position;

  enable: boolean;

  velocity: Model.Velocity;
}