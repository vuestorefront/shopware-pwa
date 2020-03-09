import { getAllFiles } from "@shopware-pwa/nuxt-module/src/files";
import { join } from "path";

describe("nuxt-module - getAllFiles", () => {
  it("should return an empty array if directory not exist", () => {
    const files = getAllFiles(join(__dirname, "files_testsss"));
    expect(files).toEqual([]);
  });
  it("should return an empty array for null argument", () => {
    const files = getAllFiles(null as any);
    expect(files).toEqual([]);
  });
  it("should find files with no nested route", () => {
    const files = getAllFiles(join(__dirname, "files_tests", "nested"));
    expect(files).toEqual([join(__dirname, `/files_tests/nested/file1.txt`)]);
  });

  it("should find files with nested routes", () => {
    const files = getAllFiles(join(__dirname, "files_tests"));
    expect(files).toEqual([
      join(__dirname, `/files_tests/file1.txt`),
      join(__dirname, `/files_tests/file2.txt`),
      join(__dirname, `/files_tests/nested/file1.txt`),
      join(__dirname, `/files_tests/shopware-pwa.config.js`)
    ]);
  });

  it("should list also hidden files", () => {
    const files = getAllFiles(join(__dirname, "files_tests"), [], false);
    expect(files).toEqual([
      join(__dirname, `/files_tests/.test-hidden-file.txt`),
      join(__dirname, `/files_tests/file1.txt`),
      join(__dirname, `/files_tests/file2.txt`),
      join(__dirname, `/files_tests/nested/file1.txt`),
      join(__dirname, `/files_tests/shopware-pwa.config.js`)
    ]);
  });
});
