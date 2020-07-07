import { Position } from '../models/Position';
import { Size } from '../models/Size';

export interface IBodyConfig {
  size?: Size|number,
  
  offset?: Position,

  origin?: Position,
}
