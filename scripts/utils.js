const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const ownBuildProcessPackages = [];

const packagesDir = path.join(__dirname, "..", "packages");

const allTargets = (exports.allTargets = fs
  .readdirSync(packagesDir)
  .filter((f) => !!fs.statSync(path.join(packagesDir, f)).isDirectory()));

const targets = (exports.targets = allTargets.filter((f) => {
  if (
    !fs.statSync(path.join(packagesDir, f)).isDirectory() ||
    ownBuildProcessPackages.includes(f)
  ) {
    return false;
  }
  return true;
}));

exports.fuzzyMatchTarget = (partialTargets, includeAllMatching) => {
  const matched = [];
  partialTargets.forEach((partialTarget) => {
    for (const target of targets) {
      if (target.match(partialTarget)) {
        matched.push(target);
        if (!includeAllMatching) {
          break;
        }
      }
    }
  });
  if (matched.length) {
    return matched;
  } else {
    console.log();
    console.error(
      `  ${chalk.bgRed.white(" ERROR ")} ${chalk.red(
        `Target ${chalk.underline(partialTargets)} not found!`
      )}`
    );
    console.log();

    process.exit(1);
  }
};
