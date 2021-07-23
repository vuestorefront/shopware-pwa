import { getAllFiles } from "../src/getAllFiles";
import { join } from "path";

import jetpack from "fs-jetpack";
jest.mock("fs-jetpack");
const mockedJetpack = jetpack as jest.Mocked<typeof jetpack>;

describe("commons - getAllFiles", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return an empty array if directory not exist", () => {
    const dirPath = join(__dirname, "files_testsss");
    const files = getAllFiles(dirPath);
    expect(files).toEqual([]);
    expect(mockedJetpack.exists).toBeCalledWith(dirPath);
  });
  it("should return an empty array for null argument", () => {
    const files = getAllFiles(null as any);
    expect(files).toEqual([]);
  });
  it("should find files with no nested route", () => {
    mockedJetpack.exists.mockReturnValueOnce("dir");
    mockedJetpack.list.mockReturnValueOnce(["file1.txt"]);
    const files = getAllFiles(join(__dirname, "files_tests", "nested"));
    expect(files).toEqual([join(__dirname, `/files_tests/nested/file1.txt`)]);
  });

  it("should find files with nested routes", () => {
    mockedJetpack.exists.mockReturnValueOnce("dir");
    mockedJetpack.list.mockReturnValueOnce(["file1.txt", "nested"]);
    mockedJetpack.list.mockReturnValueOnce(["file-nested.txt"]);
    mockedJetpack.exists.mockReturnValueOnce("file");
    mockedJetpack.exists.mockReturnValueOnce("dir");
    mockedJetpack.exists.mockReturnValueOnce("file");
    const files = getAllFiles(join(__dirname, "files_tests"));
    expect(files).toEqual([
      join(__dirname, `/files_tests/file1.txt`),
      join(__dirname, `/files_tests/nested/file-nested.txt`),
    ]);
  });

  it("should not list hidden files by default", () => {
    mockedJetpack.exists.mockReturnValueOnce("dir");
    mockedJetpack.list.mockReturnValueOnce([
      ".test-hidden-file.txt",
      "file1.txt",
    ]);
    const files = getAllFiles(join(__dirname, "files_tests"), []);
    expect(files).toEqual([join(__dirname, `/files_tests/file1.txt`)]);
  });

  it("should list also hidden files", () => {
    mockedJetpack.exists.mockReturnValueOnce("dir");
    mockedJetpack.list.mockReturnValueOnce([
      ".test-hidden-file.txt",
      "file1.txt",
    ]);
    const files = getAllFiles(join(__dirname, "files_tests"), [], false);
    expect(files).toEqual([
      join(__dirname, `/files_tests/.test-hidden-file.txt`),
      join(__dirname, `/files_tests/file1.txt`),
    ]);
  });
});
