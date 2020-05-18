import { GameGlobal } from '../core/models/GameGlobal';

declare global {
  namespace NodeJS {
    interface Global {
      gameGlobal: GameGlobal;
    }
  }
}