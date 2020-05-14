import { Direction } from '../Direction';

export class RangeAlignmentNextNodeIndexCallbacks {
  static down(index: number, direction: Direction): number {
    switch (direction) {
      case Direction.Down :
        return index + 1;
      case Direction.Right :
        return -1; 
      case Direction.Left :
        return -1;
      case Direction.Up :
        return index - 1;
    }
  }

  static right(index: number, direction: Direction): number {
    switch (direction) {
      case Direction.Down :
        return -1;
      case Direction.Right :
        return index + 1; 
      case Direction.Left :
        return index - 1;
      case Direction.Up :
        return -1
    }
  }

  static left(index: number, direction: Direction): number {
    switch (direction) {
      case Direction.Down :
        return -1;
      case Direction.Right :
        return index - 1; 
      case Direction.Left :
        return index + 1;
      case Direction.Up :
        return -1
    }
  }

  static up(index: number, direction: Direction): number {
    switch (direction) {
      case Direction.Down :
        return index - 1;
      case Direction.Right :
        return -1; 
      case Direction.Left :
        return -1;
      case Direction.Up :
        return index + 1;
    }
  }
}