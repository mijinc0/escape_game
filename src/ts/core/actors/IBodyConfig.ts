import * as Model from '../models';

export interface IBodyConfig {
  size?: Model.Size | number;

  offset?: Model.Position;

  origin?: Model.Position;
}
