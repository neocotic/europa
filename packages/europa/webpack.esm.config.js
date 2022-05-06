const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BannerPlugin } = require('webpack');
const { version, author, license } = require('./package.json');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    europa: './src/index.ts',
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.esm.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  output: {
    library: {
      type: 'module',
    },
    path: path.resolve(__dirname, 'lib/esm'),
  },
  plugins: [
    new BannerPlugin({
      banner: `Europa v${version} | (C) ${new Date().getFullYear()} ${author.name} | ${license} License`,
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    plugins: [new TsconfigPathsPlugin()],
  },
};
