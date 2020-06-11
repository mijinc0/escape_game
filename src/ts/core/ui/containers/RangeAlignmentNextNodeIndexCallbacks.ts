import { Direction } from '../Direction';

export class RangeAlignmentNextNodeIndexCallbacks {
  static down(index: number, direction: Direction): number {
    switch (direction) {
      case Direction.Down :
        return index + 1;
      case Direction.Right :
        return index; 
      case Direction.Left :
        return index;
      case Direction.Up :
        return index - 1;
    }
  }

  static right(index: number, direction: Direction): number {
    switch (direction) {
      case Direction.Down :
        return index;
      case Direction.Right :
        return index + 1; 
      case Direction.Left :
        return index - 1;
      case Direction.Up :
        return index;
    }
  }

  static left(index: number, direction: Direction): number {
    switch (direction) {
      case Direction.Down :
        return index;
      case Direction.Right :
        return index - 1; 
      case Direction.Left :
        return index + 1;
      case Direction.Up :
        return index;
    }
  }

  static up(index: number, direction: Direction): number {
    switch (direction) {
      case Direction.Down :
        return index - 1;
      case Direction.Right :
        return index;
      case Direction.Left :
        return index;
      case Direction.Up :
        return index + 1;
    }
  }
}