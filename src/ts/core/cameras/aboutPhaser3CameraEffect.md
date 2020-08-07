# Phaser3のデフォルトのカメラエフェクトについて

Phaser3では以下のカメラエフェクトがデフォルトでついている(tintのようなものを除く)

- panEffect
- zoomEffect
- shakeEffect
- flashEffect
- fadeEffect

これらは`camera.update()`時にupdateされるようになっている。(以下参照)

https://github.com/photonstorm/phaser/blob/v3.22.0/src/cameras/2d/Camera.js#L950

各エフェクトは`isRunning`フラグが立っていればエフェクトをupdateしてエフェクトの効果(フェードインなどの進行)を進行させ、
そうでなければ即時リターンで何もしないようになっている。

Cameraのupdate関数を見る限りだと、外からエフェクトを差し込むフックのようなものはないので、
もしカスタムのエフェクトを入れたければ各`Scene`に`cameraEffectManager`のようなものを持たせて、
各シーンの中で`cameraEffectManager.update('frame or time')`のようにするしかなさげ。

## 画面エフェクトとUI

デフォルトのエフェクトで十分な時は良いが、例えば画面はフェードアウトさせたいがUI(セリフを表示するメッセージボックスなど)は
表示させたいなどの要求が出た時に一つのシーンでデフォルトのカメラエフェクトを使うと実現が難しくなる。

これは、`Fade`などの中を見れば分かるが、

https://github.com/photonstorm/phaser/blob/b46776a2c0a623bf2078b533cf29d02d24663fc0/src/cameras/2d/effects/Fade.js#L283

canvasのコンテキストの`fillRect`を使う仕様になっているので、`depth`による調整は無理。

やり方として一番すっきりすると思われるのが、`UiScene`をメインのシーンと別に作り、メインのシーンのサブシーンとして
立ち上げておいて、UIの描写はそこで行うという方法。

この方法であれば`UiScene`内の描写は常に画面の左上の座標が`{x: 0, y: 0}`になるので`worldView`などを取らなくて良い。
また、画面のスクロールに合わせてUiを移動させる設定(`scrollFactor`)をしなくて良い。

## updateについて

Phaser3のデフォルトのカメラ及びエフェクトの`update`関数の引数は`(time: number, delta: number)`である。
`time`には現在のタイムスタンプ、`delta`には前のフレームからの経過ミリ秒が入る。

細かいことを気にしないのであればフレーム数を用意してそれでエフェクトの進行を管理すればよいが、
それだと処理が重くなった時にエフェクトの進行も遅くなる。

これを嫌うならやはり`delta`を使って進行を管理したい。ではどうやって`delta`を取得するか。

結論から言うと`Scene`の`update`関数の引数が`(time: number, delta: number)`なのでここから取る。

https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html

### ちなみに...

シーンのupdateは`SceneManager`によって行われるが、`sceneManager.update`の引数も`(time: number, delta: number)`である。

この大元はどこかというと、`timeStep.step`(`Game`内では`this.loop`に入れられる)の中で計算された値である。

