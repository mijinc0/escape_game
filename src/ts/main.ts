import { Boot } from './Boot';

// boot
window.addEventListener('load', () => {
  // 多くのブラウザ環境下でオーディオを再生するためには、ユーザーの操作によりスクリプトを発火させる必要があるので
  // window(load)のではなくbutton(click)でゲームがスタートするようになっている(関連:ブラウザの自動再生ポリシー)
  const launcher: any = document.body.querySelector('#launcher');
  const button: any = document.body.querySelector('#start_button');

  button.addEventListener(
    'click',
    () => {
      button.disable = true;
      launcher.remove();

      const game: Boot = new Boot();

      // デバッグ用にwindowにgameを追加しておく
      (<any>window).game = game;

      game.on();
    },
    false,
  );
});
