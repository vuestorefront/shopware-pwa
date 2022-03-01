const e2e = require("minimist")(process.argv.slice(2))["e2e"];

const isUnitTest = e2e !== "true";

console.log(`Starting ${isUnitTest ? "unit" : "e2e"} tests...`);

const UNIT_TEST_PATTERNS = [
  "<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)",
];
const E2E_TEST_PATTERNS = ["<rootDir>/packages/**/__e2e__/**/*spec.[jt]s?(x)"];
module.exports = {
  preset: "ts-jest",
  globals: {
    __DEV__: true,
    __TEST__: true,
    __VERSION__: require("./package.json").version,
    __BROWSER__: false,
    __BUNDLER__: true,
    __RUNTIME_COMPILE__: true,
    __GLOBAL__: false,
    __NODE_JS__: true,
    __FEATURE_OPTIONS__: true,
    __FEATURE_SUSPENSE__: true,
    navigator: {
      userAgent: "NodeJS",
    },
  },
  collectCoverage: isUnitTest,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "lcov", "text"],
  collectCoverageFrom: [
    "packages/*/src/**/*.ts",
    "!packages/*/src/**/*.d.ts",
    "!packages/default-template/**",
    "!packages/cli/**",
    "!**/interfaces/**",
  ],
  watchPathIgnorePatterns: ["/node_modules/", "/dist/", "/.git/"],
  modulePathIgnorePatterns: [".yalc"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "^@shopware-pwa/commons/(.*?)$": "<rootDir>/packages/commons/$1",
    "^@shopware-pwa/(.*?)/src$": "<rootDir>/packages/$1/src",
    "^@shopware-pwa/(.*?)/src/(.*?)$": "<rootDir>/packages/$1/src/$2",
    "^@shopware-pwa/(.*?)$": "<rootDir>/packages/$1/src",
  },
  rootDir: __dirname,
  testMatch: isUnitTest ? UNIT_TEST_PATTERNS : E2E_TEST_PATTERNS,
};
