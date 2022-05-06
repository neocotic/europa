const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BannerPlugin } = require('webpack');

const { author, license, version } = require('./package.json');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    europa: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.umd.json',
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
      name: {
        amd: 'europa',
        commonjs: 'europa',
        root: 'Europa',
      },
      type: 'umd',
      umdNamedDefine: true,
      export: 'default',
    },
    path: path.resolve(__dirname, 'lib/umd'),
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
