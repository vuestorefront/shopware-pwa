/* 
Generates Typedocs documentation and links all README.md files from 
other packages, also prepare documentation structure that fits 
the project structure.
*/
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const execa = require("execa");

run();

async function buildDocs() {
  try {
    execa("yarn", ["docs:build"]).stdout.pipe(process.stdout);
  } catch (e) {
    console.error(e);
  }
}

function createDocsStructure(filepath) {
  relDirPath = filepath.substring(0, filepath.lastIndexOf("/") + 1);
  absDirPath = `${__dirname}/../docs/${relDirPath}`;
  fs.mkdirSync(absDirPath, { recursive: true });
}

async function run() {
  await buildDocs();
  getFilesPath(`${__dirname}/../packages`, /\.md$/, filepath => {
    let relFilePath = getRelativePath(filepath, "packages/");
    let copyDest = `${__dirname}/../docs/${relFilePath}`;
    createDocsStructure(relFilePath);
    fs.copyFile(filepath, copyDest, err => {
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
  files.forEach(file => {
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
