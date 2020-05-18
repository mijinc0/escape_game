import { GameGlobal } from '../core/models/GameGlobal';

declare global {
  interface Window {
    gameGlobal: GameGlobal;
  }
}