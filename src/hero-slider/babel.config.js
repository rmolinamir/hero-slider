// Needed for the Jest unit tests.
module.exports = {
  presets: [
    '@babel/env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ]
};
