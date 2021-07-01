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

const execa = require("execa");
const path = require("path");
const { fuzzyMatchTarget } = require("./utils");
const args = require("minimist")(process.argv.slice(2));
const target = args._.length
  ? fuzzyMatchTarget(args._)[0]
  : "shopware-6-client";
const chokidar = require("chokidar");

const packagePath = path.join(__dirname, "..", "packages", target);
const pkg = require(path.join(packagePath, "package.json"));

if (pkg.scripts && pkg.scripts.dev) {
  execa("yarn", ["dev"], {
    stdio: "inherit",
    cwd: packagePath,
  });
} else {
  chokidar
    .watch([path.join(packagePath, "src")], {
      ignoreInitial: true,
    })
    .on("all", async (event) => {
      execa("yarn", ["build", target], {
        stdio: "inherit",
        env: {
          NODE_ENV: "development",
        },
      });
    });

  execa("yarn", ["build", target], {
    stdio: "inherit",
    env: {
      NODE_ENV: "development",
    },
  });
}
