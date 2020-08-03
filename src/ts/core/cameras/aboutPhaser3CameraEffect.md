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
