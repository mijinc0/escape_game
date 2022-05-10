const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => {
  console.log(`build args: ${JSON.stringify(env)}`);
  
  const relativePath = (env && env.electron) ? 'electron/public' : '__build/';

  const distDirPath = path.resolve(__dirname, relativePath);

  return {
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
      new CopyPlugin({
        patterns: [
          {
            from: './src/index.html',
            to: path.resolve(distDirPath, 'index.html'),
            globOptions: {ignore: ['*.ts']}
          },
          {
            from: './src/assets',
            to: path.resolve(distDirPath, 'assets'),
            globOptions: {ignore: ['*.ts']}
          },
        ],
      }),
    ],
  };
};