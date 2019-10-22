/*
Run Rollup in watch mode for development.
To specific the package to watch, simply pass its name and the desired build
formats to watch (defaults to "global"):
```
# name supports fuzzy match. will watch all packages with name containing "dom"
yarn dev dom
# specify the format to output
yarn dev core --formats cjs
# Can also drop all __DEV__ blocks with:
__DEV__=false yarn dev
```
*/
const fs = require("fs-extra");
const path = require("path");
const execa = require("execa");
const { targets, fuzzyMatchTarget } = require("./utils");

const args = require("minimist")(process.argv.slice(2));
const target = args._.length
  ? fuzzyMatchTarget(args._)[0]
  : "shopware-6-client";
const formats = args.formats || args.f;
const commit = execa.sync("git", ["rev-parse", "HEAD"]).stdout.slice(0, 7);

async function dev() {
  const pkgDir = path.resolve(`packages/${target}`);
  await fs.remove(`${pkgDir}/dist`);
  execa(
    "rollup",
    [
      "-wc",
      "--environment",
      [
        `COMMIT:${commit}`,
        `TARGET:${target}`,
        `FORMATS:${formats || "global"}`
      ].join(",")
    ],
    {
      stdio: "inherit"
    }
  );
}
dev();
