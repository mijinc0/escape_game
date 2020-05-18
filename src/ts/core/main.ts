import { Boot } from './Boot';

// boot
window.addEventListener('load', () => {
  const game: Boot = new Boot();
  game.on();
});