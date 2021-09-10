describe("CLI extensions - plugins - buildPluginsMap", () => {
  const pluginsModule = require("../src/extensions/plugins-extensions");
  const toolbox: any = {
    template: {
      generate: jest.fn(),
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

  it("should return pluginsMap from trace", async () => {
    const pluginsTrace = {
      "first-slot": ["path/to/someComponent.vue"],
      "second-slot": ["path/to/someOtherComponent.vue"],
    };
    const res = await toolbox.buildPluginsMap(pluginsTrace);
    expect(res).toEqual({
      "first-slot": "path/to/someComponent.vue",
      "second-slot": "path/to/someOtherComponent.vue",
    });
  });

  it("should return custom component for slot if there ar nested plugins", async () => {
    const pluginsTrace = {
      "first-slot": [
        "path/to/someComponent.vue",
        "path/to/someOtherComponent.vue",
        "path/to/otherComponent.vue",
      ],
      "second-slot": ["path/to/someOtherComponent.vue"],
    };
    const res = await toolbox.buildPluginsMap(pluginsTrace);
    expect(res).toEqual({
      "first-slot": "sw-plugins/slots/first-slot.vue",
      "second-slot": "path/to/someOtherComponent.vue",
    });
  });

  it("should generate custom file for nested plugins", async () => {
    const pluginsTrace = {
      "first-slot": [
        "path/to/someComponent.vue",
        "path/to/someOtherComponent.vue",
        "path/to/otherComponent.vue",
      ],
    };
    await toolbox.buildPluginsMap(pluginsTrace);
    expect(toolbox.template.generate).toHaveBeenCalledWith({
      template: "/plugins/GenericPlugin.vue",
      target: ".shopware-pwa/sw-plugins/slots/first-slot.vue",
      props: {
        body: "--> <firstSlot3><firstSlot2><firstSlot1></firstSlot1></firstSlot2></firstSlot3> <!--",
        componentImports:
          "\nimport firstSlot1 from 'path/to/someComponent.vue'\nimport firstSlot2 from 'path/to/someOtherComponent.vue'\nimport firstSlot3 from 'path/to/otherComponent.vue'",
        components: "\n    firstSlot1,\n    firstSlot2,\n    firstSlot3,",
      },
    });
  });
});
