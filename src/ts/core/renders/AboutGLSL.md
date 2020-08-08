# GLSL

クロスプラットフォームな標準的グラフィック用APIである`OpenGL`において、シェーダーを記述する言語が`GLSL`である。

今回は、画面の効果(グレースケール等)に使いたいだけなので頂点シェーダーは無視してフラグメントシェーダーについてがメイン。

## 頂点シェーダーとフラグメントシェーダー

シェーダーにはいくつか種類が存在し、html5のcanvas領域に描写をする時に使われるレンダラーである`WebGL`の場合(これを今はよく使うことに成ると思う)、**頂点シェーダー**と**フラグメントシェーダー**が扱える。

### 頂点シェーダー

3DCG内に描写されるオブジェクトは頂点となる点を持ち、それらを結ぶことでポリゴンが出来上がる。頂点シェーダーはこういった頂点の操作、描写を指示するためのシェーダー

### フラグメントシェーダー

全ての画像はドットの集まりである。例えば`100px * 100px`の画像であればその画像は10000個のドットによって表現されている。これら一つ一つのドットに対して描写を指示するのがフラグメントシェーダーである。

頂点シェーダーが必要な点のみを操作するのに対し、フラグメントシェーダーはイメージを構成する全ての要素に対して指示を行うので、一般的に頂点シェーダーよりもフラグメントシェーダーの方が処理が重くなりやすい。

## 練習環境

とりあえず練習用の環境がないと始まらない。幸い、簡単に記述できてその場で実行して結果を見ることが出来るWebアプリがある。

http://jp.wgld.org/js4kintro/editor/

## フラグメントシェーダーHelloWorld

javaで言うところの、以下のような"最初は脳死で覚えようね"的な呪文がGLSLにもある。

```java
class HelloWorld {
  public static void main(String[] args]) {
    System.out.println("Hello World"); 
  }
}
```

それが下記。

```glsl
precision mediump float;
uniform float t; // time
uniform vec2  r; // resolution

void main(void){
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}
```

実際は参考サイトによって最低限書かれている内容が違うことがあるが、とりあえずこの時点で認識しておくべきことは以下の4つ。

1. `main`は必須。これが呼ばれることによってシェーダーが動き出す。
2. 2,3行目にあるのは変数の宣言。C言語のように上から下に、宣言すべきものは最初に宣言する。
3. コメント`//`に`time`,`resolution`とあるのから察するに、実行時に外から変数が与えられるようになっている。
4. `gl_FragColor`とある通り、ビルトインの変数があるようだ。

上記のHelloWorld的な内容を練習環境にコピペして`Ctr-s`すると、描写範囲が一色で塗られる。

それがシェーダーが実行されて描写範囲を操作した結果だ。

## 基本的な構文

### 1.変数の宣言

変数の宣言は`修飾子(必要に応じて) + 変数型 + 変数名`によって行う。

以下の例だと、修飾子の無し、型が`float`の`x`という変数をmain関数の外に、修飾子の無し、型が`float`の`y`という変数をmain関数の中に宣言している。変数は一時的なものであればその場で宣言してしまって良い。

```glsl
precision mediump float;
uniform float t; // time
uniform vec2  r; // resolution

float x;

void main(void){
  x = 1.0;

  float y = 0.2;

  gl_FragColor = vec4(x, y, 0.0, 1.0);
}
```

変数に修飾子を付けることで単にその場で値を格納することで、glslの外、WebGlの場合だとシェーダーを実行するjavascriptからglsl内へ変数を渡すことなどが出来るようになる。

以下の3つが代表的な修飾子

- uniform: アプリケーションから汎用的なデータを受け取るのに使える
- attribute: 頂点シェーダーにおいて、アプリケーションから頂点の情報を受け取るのに使える
- varying: シェーダー間で値を渡す時に使える

上記の例だと、`t`と`r`には`uniform`修飾子がついており、コメントにあるように時間と描写する領域の情報を受け取れるようにしてある。

変数名は常に時間が`t`で描写領域の情報が`r`**ではなく**、どの変数にどういった値を送るのかはアプリケーション側の実装によって決まる。(WebGLであればjavascript側が決める)

今回は画面の描写効果に使いたいというだけなので、使う修飾子は`uniform`がメインになる。

時間などの他にも、マウスポインタの位置を送ることもよくある。マウスポインタに追随するキラキラもシェーダーで作れるということ。

### 2.ビルトインの変数

```glsl
precision mediump float;
uniform float t; // time
uniform vec2  r; // resolution

void main(void){
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}
```

上記サンプルで、`gl_FragColor`という変数に値`vec4`を代入しているのが分かる。`vec4`は`rgba`のような4つの要素からなるベクターだが(vec2, vec3も要素数が違うだけで同じ意味)、代入先の`gl_FragColor`は何か。

GLSLにはビルトインの変数が用意されており、代表的なものは以下の通り

- gl_Position: 頂点の座標を代入するための変数。頂点シェーダーで使われる。
- gl_PointSize: 頂点の大きさを代入するための変数。頂点シェーダーで使われる。
- gl_FragColor: 処理中の要素の色を代入できる。フラグメントシェーダーで使われる。
- gl_FragCoord: 処理中の要素の座標を取得できる。フラグメントシェーダーで使われる。

prefixに`gl_`が付く特徴が一致している。

フラグメントシェーダーは領域を構成する一つ一つの要素(ピクセル)について処理を行っているが、`gl_FragColor`にはその時処理しているピクセルの色を代入できる。100px*100pxであれば1000個のピクセルがあり、それぞれのピクセルについて`main`が呼ばれ(つまり10000回繰り返し呼ばれているイメージ)、その時その時のピクセルの色への参照を`gl_FragColor`が持つと思えば良い。
(100px*100pxで愚直に10000回mainが呼ばれているかどうかは詳しく知らない)

ここまでの説明で`gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);`が全ての要素に対して`{R: 0.0, G: 1.0, B: 0.0, A: 1.0}`の色を指定していたということが分かる(だから領域が一色に染まる)。

### 3.暗黙の型変化がない厳密な型

例えばjsであれば`1 + 1.0`のような計算をしても普通に計算できるだろう。他の言語でも同様に計算できることが多い。

しかしGLSLには暗黙の型変換が無く、`int`であれば`1, 2, 3`のような書き方をしなくてはならないし、`float`であれば`1.0, 2.0, 3.0`のように`float`であることが分かるように書かなくてはならない。

また、違う型同士を計算することは出来ないので、`1 + 1.0`のような計算は出来ずにコンパイル時にエラーとなる。

```glsl
// OK
float f = 1.0 + 2.0;
int i = 1 + 2;

// NG
float f = 1 + 1; // float変数にintは入らない

float f = 1 + 1.0; // 違う型同士の値の計算は出来ない(floatとint)
```

扱われる値の多くが`float`なので、特に必要が無ければ`float`で書いていくと思って良い。

### 4.プロパティへのアクセス

先程`vec4`は`RGBA`のような4つの要素を持った値のベクターであることに触れたが、ではそれぞれの要素へのアクセスはどうするのか。

GLSLには**スウィズル演算子**と呼ばれる演算子が用意されており、これを使う。スウィズル演算子というと特別なものに聞こえるが見た目はjsや他の言語でもおなじみのドット演算子によるアクセスと同じ。

```
vec4 v = vec4(1.0, 1.0, 1.0, 1.0);

// xyzw
float x = v.x;

// rgba (表現が違うだけで値はxyzwと同じ)
float x = v.r;
```

スウィズル演算子には`xyzw`や`rgba`が用意されており、`vec4`であれば`x`が最初、2番目が`y`...となっていく。

表現が違うだけで`rgba`も同じ。`xyzw`や`rgba`はよく使われるので標準的な機能としてアクセスできるように機能が提供されているだけ。

### 5.ビルトインの関数

四則演算に加えて、`mod`(`%`はない)などの標準的な関数も用意されている。必要な時に調べる。

## 参考サイト

勉強に使えるサイト

https://thebookofshaders.com/
https://wgld.org/d/webgl/