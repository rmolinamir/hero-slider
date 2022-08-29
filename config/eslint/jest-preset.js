var path = require('path');

module.exports = {
  plugins: ['jest'],
  extends: [path.resolve(__dirname, 'typescript-preset.js')],
  rules: {},
  overrides: [
    {
      files: ['*.test.ts', '*.spec.ts'],
      rules: {
        //
        // Recommendations from eslint-plugin-jest.
        // https://github.com/jest-community/eslint-plugin-jest
        //
        'jest/no-focused-tests': 'off',
        'jest/valid-expect': 'off',
        'jest/valid-expect-in-promise': 'off'
      }
    }
  ]
};
