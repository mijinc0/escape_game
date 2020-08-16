# SimpleEscapeGame

html5ゲームフレームワークのPhaser3を使ったシンプルな脱出ゲーム

# Build

### 1. オーディオ素材の用意

[オーディオファイルのライセンス](./src/assets/audio/license.md)

オーディオ素材は外部のフリー素材を利用しており、パッケージ化されていない状態でのオーディオ素材の公開に
抵抗がある為、このリポジトリにはオーディオ素材が含まれていません。

オーディオ素材の用意は`src/assets/audio/license.md`の内容を確認し、各自ダウンロードした後、
`src/assets/audio/`ディレクトリに指定の名前でオーディオ素材を配置する必要があります。

### 2. ソースコード、ライブラリの用意

```
// このリポジトリのダウンロード(zipでダウンロードでも可)
$ git clone https://github.com/mijinc0/escape_game.git

// 依存ライブラリのインストール
$ npm install
```

### 3. オーディオ素材の配置

`src/assets/audio/`(オーディオライセンスに関するドキュメント`license.md`がある場所)に用意したオーディオ素材を配置。

以下のような状態になる

```
escape_game
├ src
│ └ assets
│ 　 └ audio
│ 　 　 ├ license.md
│ 　 　 ├ bgm_maoudamashii_8bit26.ogg
│ 　 　 ├ se_maoudamashii_onepoint07.ogg
│ 　 　 ├ se_maoudamashii_se_door03.ogg

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

│ 　 　 ├ se_maoudamashii_system47.ogg
│ 　 　 ├ se_soundeffect-lab_glass-break3.mp3
│ 　 　 └ se_soundeffect-lab_knife-stab-1.mp3
├ test
├ ts
└ index.html
```

### 4. ビルド

```
// webpackでバンドルするだけでパッケージ化しない
$ npm run buildWeb

// electronでパッケージ化する
$ npm run buildElectron
```

`buildWeb`の場合、ルートディレクトリに`__build`ディレクトリが出来る。実行は`index.html`から。`http-server`などを利用して実行。

`buildElectron`の場合、`electron/public/__build`ディレクトリが出来る。

# License

see the [LICENSE.md](./LICENSE.md) file