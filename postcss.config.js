'use strict';

const config = require.resolve('./tailwind.config.js');

module.exports = {
  plugins: ['postcss-preset-env', require('tailwindcss')(config), require('autoprefixer')],
};
