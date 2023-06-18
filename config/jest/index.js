module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Global beforeAll tests
  // globalSetup: `${__dirname}/tests/globalSetup.ts`,
  // Global afterAll tests
  // globalTeardown: `${__dirname}/tests/globalTeardown.ts`,
  // Only run TypeScript tests.
  testMatch: ['<rootDir>/**/*.test.ts'],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        diagnostics: false // Disabling diagnostics
      }
    ]
  }
};
