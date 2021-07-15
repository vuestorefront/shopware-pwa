describe("CLI extensions - plugins - buildPluginsTrace", () => {
  const pluginsModule = require("../src/extensions/plugins-extensions");
  const toolbox: any = {
    filesystem: {
      exists: jest.fn(),
      read: jest.fn(),
      removeAsync: jest.fn(),
      copyAsync: jest.fn(),
    },
    print: {
      error: jest.fn(),
    },
    runtime: {
      run: jest.fn(),
    },
    template: {
      generate: jest.fn(),
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
        "~~/.shopware-pwa/pwa-bundles-assets/first-plugin/someComponent.vue",
      ],
      "second-slot": [
        "~~/.shopware-pwa/pwa-bundles-assets/second-plugin/someOtherComponent.vue",
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
        "~~/.shopware-pwa/pwa-bundles-assets/first-plugin/someComponent.vue",
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
      "first-slot": ["~~/some/root-path/first-plugin/someComponent.vue"],
    });
  });

  it("should not add plugin trace if config has false flag", async () => {
    toolbox.filesystem.exists.mockReturnValue("dir");
    const pluginsConfig = {
      "first-plugin": false,
    };
    const res = await toolbox.buildPluginsTrace({
      pluginsConfig,
    });
    expect(toolbox.print.error).not.toHaveBeenCalled();
    expect(res).toEqual({});
    expect(toolbox.filesystem.read).not.toBeCalled();
  });

  describe("custom pages and layouts", () => {
    it("should add plugin layouts to cache and runtime directory", async () => {
      toolbox.filesystem.exists.mockReturnValueOnce("dir");
      toolbox.filesystem.exists.mockReturnValueOnce(false);
      toolbox.filesystem.read.mockReturnValueOnce({
        layouts: [{ name: "myCoolLayout", file: "myCustomLayout.vue" }],
      });
      toolbox.template.generate.mockImplementation(async () => {});
      const pluginsConfig = {
        "first-plugin": {},
      };
      const result = await toolbox.buildPluginsTrace({
        pluginsConfig,
      });
      expect(result).toEqual({
        "sw-layouts-myCoolLayout": [
          "~~/.shopware-pwa/pwa-bundles-assets/first-plugin/myCustomLayout.vue",
        ],
      });
      expect(toolbox.template.generate).toBeCalledWith({
        props: { slotName: "sw-layouts-myCoolLayout" },
        target: ".shopware-pwa/source/layouts/myCoolLayout.vue",
        template: "/plugins/PluginSlotTemplate.vue",
      });
      expect(toolbox.template.generate).toBeCalledWith({
        props: { slotName: "sw-layouts-myCoolLayout" },
        target: ".shopware-pwa/sw-plugins/layouts/myCoolLayout.vue",
        template: "/plugins/PluginSlotTemplate.vue",
      });
    });

    it("should add plugin pages to cache and runtime directory", async () => {
      toolbox.filesystem.exists.mockReturnValueOnce("dir");
      toolbox.filesystem.exists.mockReturnValueOnce(false);
      toolbox.filesystem.read.mockReturnValueOnce({
        pages: [{ path: "our-custom-route/_id", file: "myCustomPage.vue" }],
      });
      toolbox.template.generate.mockImplementation(async () => {});
      const pluginsConfig = {
        "first-plugin": {},
      };
      const result = await toolbox.buildPluginsTrace({
        pluginsConfig,
      });
      expect(result).toEqual({
        "sw-pages-our-custom-route/_id": [
          "~~/.shopware-pwa/pwa-bundles-assets/first-plugin/myCustomPage.vue",
        ],
      });
      expect(toolbox.template.generate).toBeCalledWith({
        props: { params: {}, slotName: "sw-pages-our-custom-route/_id" },
        target: ".shopware-pwa/source/pages/our-custom-route/_id.vue",
        template: "/plugins/PluginSlotTemplate.vue",
      });
      expect(toolbox.template.generate).toBeCalledWith({
        props: { params: {}, slotName: "sw-pages-our-custom-route/_id" },
        target: ".shopware-pwa/sw-plugins/pages/our-custom-route/_id.vue",
        template: "/plugins/PluginSlotTemplate.vue",
      });
    });
  });
});
