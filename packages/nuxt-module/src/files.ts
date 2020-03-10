import jetpack from "fs-jetpack";
import path from "path";

export function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = [],
  excludeHidden: boolean = true
): string[] {
  if (!dirPath || !jetpack.exists(dirPath)) return [];
  const files: string[] = jetpack.list(dirPath) as string[];
  files.forEach(file => {
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
