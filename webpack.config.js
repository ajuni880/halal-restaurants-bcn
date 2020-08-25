const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './public/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'main.[hash].js',
  },
  module: {
    rules: [
      // {
      //   test: /.js/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //       options: { presets: ['env'] },
      //     },
      //   ],
      // },
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],
};
