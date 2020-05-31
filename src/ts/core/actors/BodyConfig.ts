import { Position } from '../models/Position';
import { Size } from '../models/Size';

export type BodyConfig = {
  size?: Size|number,
  
  offset?: Position,

  origin?: Position,

  overlapOnly?: boolean,
};
