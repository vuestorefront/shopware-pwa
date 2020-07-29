const jetpack = require("fs-jetpack");
const path = require("path");

function run() {
  const sourceDir = path.join("src", "templates");
  const destinationDir = path.join("build", "templates");
  jetpack.copy(sourceDir, destinationDir);
}
run();
