import jetpack from "fs-jetpack";

export function getAllFiles(
  dirPath: string,
  arrayOfFiles: string[] = []
): string[] {
  if (!dirPath || !jetpack.exists(dirPath)) return [];
  const files: string[] = jetpack.list(dirPath) as string[];
  files.forEach(file => {
    if (jetpack.exists(dirPath + "/" + file) === "dir") {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      const fileName = (dirPath + "/" + file).replace(__dirname + "/", "");
      arrayOfFiles.push(fileName);
    }
  });

  return arrayOfFiles;
}
