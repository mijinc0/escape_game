import { IGameGlobal } from '../core/IGameGlobal';

declare global {
  interface Window {
    gameGlobal: IGameGlobal;
  }
}