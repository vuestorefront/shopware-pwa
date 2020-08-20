const jetpack = require("fs-jetpack");
const path = require("path");
const { build: esBuild } = require("esbuild");

function getAllFiles(dirPath, arrayOfFiles = [], excludeHidden = true) {
  if (!dirPath || !jetpack.exists(dirPath)) return [];
  const files = jetpack.list(dirPath);
  files.forEach((file) => {
    if (jetpack.exists(path.join(dirPath, file)) === "dir") {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      const fileName = path.join(dirPath, file).replace(__dirname + "/", "");
      if (!(excludeHidden && file.startsWith("."))) {
        arrayOfFiles.push(path.normalize(fileName));
      }
    }
  });

  return arrayOfFiles;
}

async function runBuild(packageJson) {
  try {
    const files = getAllFiles(
      path.join(__dirname, "..", "src")
    ).filter((filePath) => filePath.endsWith(".ts"));
    const external = Object.keys(packageJson.dependencies);
    await esBuild({
      entryPoints: files,
      outdir: "build",
      minify: false,
      bundle: true,
      external,
      platform: "node",
      target: "node10",
      format: "cjs",
      tsconfig: path.join(__dirname, "..", "tsconfig.json"),
    });
    return true;
  } catch (e) {
    console.error("Error building CLI", e);
    return false;
  }
}

async function run() {
  jetpack.remove("./build");
  const pkg = require(path.join(__dirname, "..", "package.json"));
  await runBuild(pkg);
}
run();
