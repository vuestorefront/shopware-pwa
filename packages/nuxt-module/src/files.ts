import jetpack from "fs-jetpack";

export function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = [],
  excludeHidden: boolean = true
): string[] {
  if (!dirPath || !jetpack.exists(dirPath)) return [];
  const files: string[] = jetpack.list(dirPath) as string[];
  files.forEach(file => {
    if (jetpack.exists(dirPath + "/" + file) === "dir") {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      const fileName = (dirPath + "/" + file).replace(__dirname + "/", "");
      if (!(excludeHidden && file.startsWith("."))) {
        arrayOfFiles.push(fileName);
      }
    }
  });

  return arrayOfFiles;
}
