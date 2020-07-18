import { Boot } from './Boot';

// boot
window.addEventListener('load', () => {
  // 多くのブラウザ環境下でオーディオを再生するためには、ユーザーの操作によりスクリプトを発火させる必要があるので
  // window(load)のではなくbutton(click)でゲームがスタートするようになっている(関連:ブラウザの自動再生ポリシー)
  const button: any = document.body.querySelector('#start_button');

  button.addEventListener(
    'click',
    () => {
      button.disable = true;
      button.remove();

      const game: Boot = new Boot();
      game.on();
    },
    false,
  );
});
