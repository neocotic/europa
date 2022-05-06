const webpackConfig = require('./webpack.umd.config');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [
      {
        pattern: 'node_modules/europa-test/fixtures/*',
        included: false,
        served: true,
        watched: false,
      },
      'spec/test.ts',
    ],
    exclude: [],
    preprocessors: {
      'spec/test.ts': ['webpack'],
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      stats: 'errors-only',
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: 1,
  });
};
