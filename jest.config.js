/*
Jest configuration definition expects test files to be written in either JavaScript
or TypeScript in `/test`. Compiles source files written in TypeScript and ignores sources in `node_modules`.
*/

module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  globalTeardown: './test/teardown.ts',
};
