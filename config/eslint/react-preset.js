var path = require('path');

module.exports = {
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    path.resolve(__dirname, 'typescript-preset.js')
  ]
};
