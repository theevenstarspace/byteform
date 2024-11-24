/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },

  // Workaround for BigInt issue - https://github.com/jestjs/jest/issues/11617
  maxWorkers: 1,
};
