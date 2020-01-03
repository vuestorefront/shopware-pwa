const lernaJson = require("./lerna.json");
const e2e = require("minimist")(process.argv.slice(2))["e2e"];

const isUnitTest = e2e !== "true";

console.log(`Starting ${isUnitTest ? "unit" : "e2e"} tests...`);

const UNIT_TEST_PATTERNS = [
  "<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)"
];
const E2E_TEST_PATTERNS = ["<rootDir>/packages/**/__e2e__/**/*spec.[jt]s?(x)"];

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
  collectCoverage: isUnitTest,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "lcov", "text"],
  collectCoverageFrom: [
    "packages/*/src/**/*.ts",
    "!packages/default-template/**",
    "!**/interfaces/**"
  ],
  watchPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "^@shopware-pwa/(.*?)/src$": "<rootDir>/packages/$1/src",
    "^@shopware-pwa/(.*?)/src/(.*?)$": "<rootDir>/packages/$1/src/$2",
    "^@shopware-pwa/(.*?)$": "<rootDir>/packages/$1/src"
  },
  rootDir: __dirname,
  testMatch: isUnitTest ? UNIT_TEST_PATTERNS : E2E_TEST_PATTERNS
};
