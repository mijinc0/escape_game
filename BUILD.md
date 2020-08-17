# ビルド

## 1. オーディオ素材の用意

[オーディオファイルのライセンス](./src/assets/audio/license.md)

オーディオ素材は外部のフリー素材を利用しており、パッケージ化されていない状態でのオーディオ素材の公開に
抵抗がある為、このリポジトリにはオーディオ素材が含まれていません。

オーディオ素材の用意は`src/assets/audio/license.md`の内容を確認し、各自ダウンロードした後、
`src/assets/audio/`ディレクトリに指定の名前でオーディオ素材を配置する必要があります。

## 2. ソースコード、ライブラリの用意

```
// このリポジトリのダウンロード(zipでダウンロードでも可)
$ git clone https://github.com/mijinc0/escape_game.git

// 依存ライブラリのインストール
$ npm install
```

## 3. オーディオ素材の配置

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

## 4. ビルド

### 概要

パッケージ化は`electron-builder`を利用しています。

https://www.electron.build/

electron-builderによるビルドの場合、ビルドは2段階で行われます。

1. webpackによるソースコードのバンドル、アセットの配置
2. electron-builderによるパッケージ化

electron-builderによりビルドされたものは、スタンドアロンでゲームを実行することが出来ます。

一方、`1`の状態でも簡易サーバー(`http-server`など)を用意することで普段使っているブラウザを利用してゲームを実行することが可能です。

### 手順

```
// webpackでバンドルするだけでパッケージ化しない
$ npm run buildWeb

// electronでパッケージ化する
$ npm run buildElectron -- --linux // for linux 
$ npm run buildElectron -- --win   // for windows
$ npm run buildElectron -- --mac   // for mac
```

> [ クロスプラットホームでビルドする場合 ]  
> クロスプラットホームでビルドする場合(linux機でwin機用のビルドをする場合など)は上記コマンドではビルド出来ない場合があります。  
> linux機でwindows用のパッケージをビルドする場合は、wineの用意またはビルド用のDockerイメージの利用が必要になります。

`buildWeb`の場合、ルートディレクトリに`__build`ディレクトリが出来ます。

`buildElectron`の場合、`electron/public/__build`ディレクトリが出来ます。

## 実行

### buildWeb

`http-server`を利用する場合。

```
$ npx http-server ./__build -p 8080 -o -c-1
```

### buildElectron

zipファイルを展開後、実行ファイルを実行します。

沢山のファイル、ディレクトリが展開されますが、実行ファイルはその中で`simple_escape_game`と名前の付いたファイルです。