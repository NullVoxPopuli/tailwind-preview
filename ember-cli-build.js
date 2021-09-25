'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { LEGACY_BUILD } = process.env;

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // Add options here

    postcssOptions: {
      compile: {
        plugins: [
          // require('@tailwindcss/jit')('./tailwind.config.js'),
          require('tailwindcss')('./tailwind.config.js'),
          require('autoprefixer')(),
        ],
        cacheInclude: [/.*\.(css|hbs)$/, /.tailwind\.config\.js$/],
      },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  if (LEGACY_BUILD) {
    return app.toTree();
  }

  const { Webpack } = require('@embroider/webpack');

  return require('@embroider/compat').compatBuild(app, Webpack, {
    extraPublicTrees: [],
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticComponents: true,
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: [
                'style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: require('./postcss.config.js'),
                  },
                },
              ],
            },
          ],
        },
      },
    },
  });
};
