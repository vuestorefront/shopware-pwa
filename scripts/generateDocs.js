/* 
Generates Typedocs documentation and links all README.md files from 
other packages, also prepare documentation structure that fits 
the project structure.
*/
const fs = require("fs-extra");
const jetpack = require("fs-jetpack");
const path = require("path");
const execa = require("execa");

run();

async function copyRootDirectoryFile(filename) {
  await jetpack.copyAsync(
    path.join(__dirname, "..", filename),
    path.join(__dirname, "..", "docs", filename),
    { overwrite: true }
  );
}

async function run() {
  await buildDocs();
  copyStaticFiles();
  await Promise.all([
    copyRootDirectoryFile("README.md"),
    copyRootDirectoryFile("CONTRIBUTING.md"),
    copyRootDirectoryFile("TROUBLESHOOTING.md"),
    copyRootDirectoryFile("CHEATSHEET.md"),
  ]);
}

async function buildDocs() {
  try {
    execa("yarn", ["typedoc", "--options", "typedoc.js"]).stdout.pipe(
      process.stdout
    );
  } catch (e) {
    console.error(e);
  }
}

function createDocsStructure(filepath) {
  relDirPath = filepath.substring(0, filepath.lastIndexOf("/") + 1);
  absDirPath = `${__dirname}/../docs/${relDirPath}`;
  fs.mkdirSync(absDirPath, { recursive: true });
}

function copyStaticFiles() {
  getFilesPath(`${__dirname}/../packages`, /\.md$/, (filepath) => {
    let relFilePath = getRelativePath(filepath, "packages/");
    let copyDest = `${__dirname}/../docs/${relFilePath}`;
    createDocsStructure(relFilePath);
    fs.copyFile(filepath, copyDest, (err) => {
      if (err) throw err;
    });
  });
}

function getRelativePath(filepath, separator) {
  let [_, rel] = filepath.split(separator);
  return `${rel}`;
}

function getFilesPath(
  startPath,
  filter,
  cb,
  excludePattern = /(?:node_modules)/
) {
  if (!fs.existsSync(startPath)) {
    throw new Error("Cannot look for files - not existing path!");
  }
  let files = fs.readdirSync(startPath);
  files.forEach((file) => {
    let filepath = path.join(startPath, file);
    if (excludePattern.test(filepath)) {
    } else {
      try {
        fs.lstatSync(filepath);
        getFilesPath(filepath, filter, cb);
      } catch (e) {
        if (filter.test(filepath)) {
          cb(filepath);
        }
      }
    }
  });
}
