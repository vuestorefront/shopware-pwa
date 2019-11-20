const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

const packagesDir = path.resolve(__dirname, "../packages");

const targets = (exports.targets = fs.readdirSync(packagesDir).filter(f => {
  if (!fs.statSync(`${packagesDir}/${f}`).isDirectory()) {
    return false;
  }
  const pkg = require(`${packagesDir}/${f}/package.json`);
  if (pkg.private && !pkg.buildOptions) {
    return false;
  }
  return true;
}));

exports.fuzzyMatchTarget = (partialTargets, includeAllMatching) => {
  const matched = [];
  partialTargets.some(partialTarget => {
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
