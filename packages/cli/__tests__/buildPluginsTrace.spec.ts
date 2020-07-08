describe("CLI extensions - plugins - buildPluginsTrace", () => {
  const pluginsModule = require("../src/extensions/plugins-extensions");
  const toolbox: any = {
    filesystem: {
      exists: jest.fn(),
      read: jest.fn(),
    },
    print: {
      error: jest.fn(),
    },
    runtime: {
      run: jest.fn(),
    },
  };
  beforeAll(() => {
    pluginsModule(toolbox);
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return empty trace without config", async () => {
    const res = await toolbox.buildPluginsTrace();
    expect(res).toEqual({});
  });

  it("should return plugins trace for shopware plugins", async () => {
    toolbox.filesystem.exists.mockReturnValue("dir");
    toolbox.filesystem.read.mockReturnValueOnce({
      slots: [
        {
          name: "first-slot",
          file: "someComponent.vue",
        },
      ],
    });
    toolbox.filesystem.read.mockReturnValueOnce({
      slots: [
        {
          name: "second-slot",
          file: "someOtherComponent.vue",
        },
      ],
    });
    const pluginsConfig = {
      "first-plugin": {},
      "second-plugin": {},
    };
    const res = await toolbox.buildPluginsTrace({ pluginsConfig });
    expect(toolbox.print.error).not.toHaveBeenCalled();
    expect(res).toEqual({
      "first-slot": [
        "~/.shopware-pwa/pwa-bundles-assets/first-plugin/someComponent.vue",
      ],
      "second-slot": [
        "~/.shopware-pwa/pwa-bundles-assets/second-plugin/someOtherComponent.vue",
      ],
    });
  });

  it("should show error when plugin has no config file", async () => {
    toolbox.filesystem.exists.mockReturnValue("dir");
    toolbox.filesystem.read.mockReturnValueOnce(null);
    const pluginsConfig = {
      "first-plugin": {},
    };
    const res = await toolbox.buildPluginsTrace({ pluginsConfig });
    expect(toolbox.print.error).toHaveBeenCalledWith(
      "Plugin first-plugin has no config file!"
    );
    expect(res).toEqual({});
  });

  it("should extend provided trace", async () => {
    toolbox.filesystem.exists.mockReturnValue("dir");
    toolbox.filesystem.read.mockReturnValueOnce({
      slots: [
        {
          name: "first-slot",
          file: "someComponent.vue",
        },
      ],
    });
    const pluginsConfig = {
      "first-plugin": {},
    };
    const pluginsTrace = {
      "some-slot": ["some/component.vue"],
      "first-slot": ["some/provided/path/someComponent.vue"],
    };
    const res = await toolbox.buildPluginsTrace({
      pluginsConfig,
      pluginsTrace,
    });
    expect(toolbox.print.error).not.toHaveBeenCalled();
    expect(res).toEqual({
      "first-slot": [
        "some/provided/path/someComponent.vue",
        "~/.shopware-pwa/pwa-bundles-assets/first-plugin/someComponent.vue",
      ],
      "some-slot": ["some/component.vue"],
    });
  });

  it("should return plugins trace with changed root path", async () => {
    toolbox.filesystem.exists.mockReturnValue("dir");
    toolbox.filesystem.read.mockReturnValueOnce({
      slots: [
        {
          name: "first-slot",
          file: "someComponent.vue",
        },
      ],
    });
    const pluginsConfig = {
      "first-plugin": {},
    };
    const rootDirectory = "some/root-path";
    const res = await toolbox.buildPluginsTrace({
      pluginsConfig,
      rootDirectory,
    });
    expect(toolbox.print.error).not.toHaveBeenCalled();
    expect(res).toEqual({
      "first-slot": ["~/some/root-path/first-plugin/someComponent.vue"],
    });
  });

  it("should not add plugin trace if config has false flag", async () => {
    toolbox.filesystem.exists.mockReturnValue("dir");
    toolbox.filesystem.read.mockReturnValueOnce({
      slots: [
        {
          name: "first-slot",
          file: "someComponent.vue",
        },
      ],
    });
    const pluginsConfig = {
      "first-plugin": false,
    };
    const res = await toolbox.buildPluginsTrace({
      pluginsConfig,
    });
    expect(toolbox.print.error).not.toHaveBeenCalled();
    expect(res).toEqual({});
  });
});
