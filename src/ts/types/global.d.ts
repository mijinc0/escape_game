import { IGameGlobal } from '../core/IGameGlobal';

declare global {
  namespace NodeJS {
    interface Global {
      gameGlobal: IGameGlobal;
    }
  }
}
