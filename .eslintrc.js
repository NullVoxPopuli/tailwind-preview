'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');
const { baseConfig: node } = require('@nullvoxpopuli/eslint-configs/configs/node');

const config = configs.ember();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['postcss.config.js'],
      ...node,
    },
  ],
};
