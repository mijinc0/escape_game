import Boot from './Boot';

window.addEventListener('load', () => {
  const game: Boot = new Boot();
  game.on();
});