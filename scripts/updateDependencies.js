/**
 * Updates package.json dependencies in all packages in interactive mode
 */

const execa = require("execa");
const path = require("path");
const fs = require("fs-jetpack");

async function run() {
  const rootDirPath = path.join(__dirname, "..");
  const packagesDirPath = path.join(rootDirPath, "packages");
  const list = fs
    .list(packagesDirPath)
    .map((filename) => path.join(packagesDirPath, filename))
    .filter((file) => fs.exists(file) === "dir");
  list.push(rootDirPath);
  list.unshift(
    path.join(packagesDirPath, "cli", "src", "templates", "project-template")
  );

  try {
    for (let index = 0; index < list.length; index++) {
      await execa("npx", ["npm-check-updates", "-i"], {
        stdio: "inherit",
        cwd: list[index],
      });
    }
    // This case will be used in future with -u flag
    // await Promise.all(
    //   list.map(async directory => {
    //     return await execa("ncu", ["-i"], {
    //       stdio: "inherit",
    //       cwd: directory
    //     });
    //   })
    // );
    await execa("yarn", [], {
      stdio: "inherit",
      cwd: rootDirPath,
    });
  } catch (e) {
    console.error(
      "Problem with updating dependencies, make sure you have npm-check-updates installed globally"
    );
    console.error(e);
  }
}

run();
