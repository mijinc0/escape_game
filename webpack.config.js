const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const distDirPath = path.resolve(__dirname, 'dist/');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/ts/main.ts',
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'chunk_[name].js',
    path: path.resolve(distDirPath, 'js/'),
    // publicPathの設定が無いとルートディレクトリからチャンクを読み込もうとする
    publicPath: 'js/',
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  },
  plugins: [
    new CopyPlugin(
      [
        { from: './src/index.html', to: path.resolve(distDirPath, 'index.html') },
        { from: './src/assets', to: path.resolve(distDirPath, 'assets') },
      ],
      {
        ignore: ['*.ts'],
      }
    ),
  ],
};