/**
 * Get list of all files in a directory
 */
export function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = [],
  excludeHidden: boolean = true
): string[] {
  const jetpack = require("fs-jetpack");
  const path = require("path");
  if (!dirPath || !jetpack.exists(dirPath)) return [];
  const files: string[] = jetpack.list(dirPath) as string[];
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
