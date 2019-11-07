const lernaJson = require("./lerna.json");

module.exports = {
  preset: "ts-jest",
  globals: {
    __DEV__: true,
    __VERSION__: lernaJson.version,
    __BROWSER__: false,
    __JSDOM__: true,
    __FEATURE_OPTIONS__: true,
    __FEATURE_SUSPENSE__: true
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "lcov", "text"],
  collectCoverageFrom: ["packages/*/src/**/*.ts", "!packages/default-template/**"],
  watchPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "^@shopware-pwa/(.*?)$": "<rootDir>/packages/$1/src"
  },
  rootDir: __dirname,
  testMatch: ["<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)"]
};
