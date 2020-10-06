import {
  useThemeAndProjectFiles,
  filterNodeModules,
  getTargetSourcePath,
  getThemeSourcePath,
  getProjectSourcePath,
  onThemeFilesChanged,
  onProjectFilesChanged,
} from "../src/theme";
import path from "path";
import fse from "fs-extra";
import { ShopwarePwaConfigFile } from "../src/interfaces";

jest.mock("fs-extra");
const mockedFse = fse as jest.Mocked<typeof fse>;

describe("nuxt-module - theme", () => {
  let TARGET_SOURCE: string, THEME_SOURCE: string, PROJECT_SOURCE: string;

  const moduleObject: any = {
    options: {
      rootDir: __dirname,
      router: {
        middleware: [],
      },
    },
    addLayout: jest.fn(),
    addPlugin: jest.fn(),
    extendBuild: jest.fn(),
    extendRoutes: jest.fn(),
    nuxt: jest.fn(),
  };

  const mockedConfig: ShopwarePwaConfigFile = {
    shopwareAccessToken: "qwe",
    shopwareEndpoint: "http://localhost:3000/",
    theme: "mocked-theme",
  };

  beforeEach(() => {
    jest.resetAllMocks();
    moduleObject.options.rootDir = __dirname;
    TARGET_SOURCE = path.join(
      moduleObject.options.rootDir,
      ".shopware-pwa",
      "source"
    );
    THEME_SOURCE = path.join(moduleObject.options.rootDir, "mocked-theme");
    PROJECT_SOURCE = path.join(moduleObject.options.rootDir, "src");
    mockedFse.copy.mockResolvedValue(null as never);
    mockedFse.emptyDir.mockResolvedValue(null as never);
    mockedFse.existsSync.mockReturnValue(true as never);
  });

  describe("useThemeAndProjectFiles", () => {
    it("should clean target dir before copying files", async () => {
      await useThemeAndProjectFiles({
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.emptyDir).toBeCalledWith(TARGET_SOURCE);
    });

    it("should copy base theme files to target directory", async () => {
      await useThemeAndProjectFiles({
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).toHaveBeenCalledWith(THEME_SOURCE, TARGET_SOURCE, {
        dereference: true,
        filter: filterNodeModules,
      });
    });

    it("should copy project files to target directory", async () => {
      await useThemeAndProjectFiles({
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).toHaveBeenLastCalledWith(
        PROJECT_SOURCE,
        TARGET_SOURCE
      );
    });
  });

  describe("filterNodeModules", () => {
    it("should filter paths which are not containing node_modules", () => {
      const result = filterNodeModules("dir", "some/node_modules/path");
      expect(result).toBeFalsy();
    });

    it("should allow paths without node_modules", () => {
      const result = filterNodeModules("dir", "some/other/path");
      expect(result).toBeTruthy();
    });
  });

  describe("source paths", () => {
    it("should get correct getTargetSourcePath", () => {
      const path = getTargetSourcePath(moduleObject);
      expect(path).toEqual(TARGET_SOURCE);
    });
    it("getThemeSourcePath should return theme path with direct import", () => {
      const path = getThemeSourcePath(moduleObject, mockedConfig);
      expect(path).toEqual(THEME_SOURCE);
    });
    it("getThemeSourcePath whould return theme path with import from node_modules", () => {
      mockedFse.existsSync.mockReturnValueOnce(false);
      const sourcePath = getThemeSourcePath(moduleObject, mockedConfig);
      expect(sourcePath).toEqual(
        path.join(moduleObject.options.rootDir, "node_modules", "mocked-theme")
      );
    });
    it("getThemeSourcePath should throw an error if theme not found", () => {
      mockedFse.existsSync.mockReturnValue(false);
      expect(() => getThemeSourcePath(moduleObject, mockedConfig)).toThrow(
        `No theme found for "${THEME_SOURCE}". Please make sure that path is correct or theme is installed from NPM.`
      );
    });
    it("should get correct getProjectSourcePath", () => {
      const path = getProjectSourcePath(moduleObject);
      expect(path).toEqual(PROJECT_SOURCE);
    });
  });

  describe("onThemeFilesChanged", () => {
    it("should not copy or remove if file added to theme exists in project", async () => {
      mockedFse.pathExists.mockResolvedValueOnce(true as never);
      await onThemeFilesChanged({
        event: "add",
        filePath: path.join(THEME_SOURCE, "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).not.toBeCalled();
      expect(mockedFse.remove).not.toBeCalled();
    });

    it("should not copy or remove if file changed in theme exists in project", async () => {
      mockedFse.pathExists.mockResolvedValueOnce(true as never);
      await onThemeFilesChanged({
        event: "change",
        filePath: path.join(THEME_SOURCE, "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).not.toBeCalled();
      expect(mockedFse.remove).not.toBeCalled();
    });

    it("should not copy or remove if file deleted in theme exists in project", async () => {
      mockedFse.pathExists.mockResolvedValueOnce(true as never);
      await onThemeFilesChanged({
        event: "unlink",
        filePath: path.join(THEME_SOURCE, "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).not.toBeCalled();
      expect(mockedFse.remove).not.toBeCalled();
    });

    it("should copy added theme file to target if it not exist in project", async () => {
      mockedFse.pathExists.mockResolvedValueOnce(false as never);
      await onThemeFilesChanged({
        event: "add",
        filePath: path.join(THEME_SOURCE, "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).toBeCalledWith(
        path.join(THEME_SOURCE, "testfile.vue"),
        path.join(TARGET_SOURCE, "testfile.vue")
      );
      expect(mockedFse.remove).not.toBeCalled();
    });

    it("should copy changed theme file to target if it not exist in project", async () => {
      mockedFse.pathExists.mockResolvedValueOnce(false as never);
      await onThemeFilesChanged({
        event: "change",
        filePath: path.join(THEME_SOURCE, "components", "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).toBeCalledWith(
        path.join(THEME_SOURCE, "components", "testfile.vue"),
        path.join(TARGET_SOURCE, "components", "testfile.vue")
      );
      expect(mockedFse.remove).not.toBeCalled();
    });

    it("should delete removed theme file in target if it not exist in project", async () => {
      mockedFse.pathExists.mockResolvedValueOnce(false as never);
      await onThemeFilesChanged({
        event: "unlink",
        filePath: path.join(THEME_SOURCE, "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).not.toBeCalled();
      expect(mockedFse.remove).toBeCalledWith(
        path.join(TARGET_SOURCE, "testfile.vue")
      );
    });
  });

  describe("onProjectFilesChanged", () => {
    it("should copy added file in project to target", async () => {
      await onProjectFilesChanged({
        event: "add",
        filePath: path.join(PROJECT_SOURCE, "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).toBeCalledWith(
        path.join(PROJECT_SOURCE, "testfile.vue"),
        path.join(TARGET_SOURCE, "testfile.vue")
      );
      expect(mockedFse.remove).not.toBeCalled();
    });
    it("should copy changed file in project to target", async () => {
      await onProjectFilesChanged({
        event: "change",
        filePath: path.join(PROJECT_SOURCE, "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).toBeCalledWith(
        path.join(PROJECT_SOURCE, "testfile.vue"),
        path.join(TARGET_SOURCE, "testfile.vue")
      );
      expect(mockedFse.remove).not.toBeCalled();
    });
    it("should copy file from theme (if exist there) to target when removed in project", async () => {
      mockedFse.pathExists.mockResolvedValueOnce(true as never);
      await onProjectFilesChanged({
        event: "unlink",
        filePath: path.join(PROJECT_SOURCE, "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).toBeCalledWith(
        path.join(THEME_SOURCE, "testfile.vue"),
        path.join(TARGET_SOURCE, "testfile.vue")
      );
      expect(mockedFse.remove).not.toBeCalled();
    });
    it("should remove file from target when removed in project and not exist in theme", async () => {
      mockedFse.pathExists.mockResolvedValueOnce(false as never);
      await onProjectFilesChanged({
        event: "unlink",
        filePath: path.join(PROJECT_SOURCE, "testfile.vue"),
        TARGET_SOURCE,
        THEME_SOURCE,
        PROJECT_SOURCE,
      });
      expect(mockedFse.copy).not.toBeCalled();
      expect(mockedFse.remove).toBeCalledWith(
        path.join(TARGET_SOURCE, "testfile.vue")
      );
    });
  });
});
