const path = require("path");
const fs = require("fs");
const jetpack = require("fs-jetpack");

const getAllFiles = function(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(file => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push((dirPath + "/" + file).split(__dirname + "/").pop());
    }
  });

  return arrayOfFiles;
};

// TODO: find a nuxt trigger which do the same
const invokeRebuild = function(moduleObject) {
  console.error("==== REBUILD INVOKED!");
  jetpack.copy(
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    `${moduleObject.options.rootDir}/nuxt.config.js`,
    { overwrite: true }
  );
};

let lastThemeFiles = [];
const extendddd = function(moduleObject) {
  const componentsPath = path.join(moduleObject.options.rootDir, "components");
  const themeFiles = getAllFiles(componentsPath);

  if (
    themeFiles.length !== lastThemeFiles.length ||
    themeFiles.filter(filename => !lastThemeFiles.includes(filename)).length
  ) {
    invokeRebuild(moduleObject);
  } else {
    console.warn("no rebuild");
  }

  moduleObject.extendBuild((config, { isClient }) => {
    themeFiles.forEach(themeFile => {
      config.resolve.alias[
        themeFile
          .replace(moduleObject.options.rootDir, "@shopware-pwa/default-theme")
          .replace(".vue", "")
      ] = themeFile;
    });
    lastThemeFiles = themeFiles;
  });
};

const addThemeLayouts = function(moduleObject) {
  const layouts = getAllFiles(
    path.join(
      moduleObject.options.rootDir,
      "node_modules/@shopware-pwa/default-theme/layouts"
    )
  );
  layouts.forEach(layout => {
    const layoutMatch = layout.match(
      /@shopware-pwa\/default-theme\/layouts\/(.+)?.vue$/
    );
    const templateName = layoutMatch[1];
    const overrideExists = !!jetpack.exists(
      path.join(moduleObject.options.rootDir, "layouts", templateName + ".vue")
    );
    if (!overrideExists) moduleObject.addLayout({ src: layout }, templateName);
  });
  // console.error("LAYOUTS", layouts);
};

module.exports = async function ShopwarePWAModule(moduleOptions) {
  // log.info(chalk.green("Starting Theme Module"));
  console.error(this.options.rootDir);
  const componentsPath = path.join(this.options.rootDir, "components");

  extendddd(this);
  addThemeLayouts(this);

  fs.watch(componentsPath, { recursive: true }, async () => {
    console.error("!!! RELOADING");

    extendddd(this, true);
  });
};
