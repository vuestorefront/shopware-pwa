import defaultsConfigBuilder from "../src/defaultsConfigBuilder";

describe("nuxt-module - defaultsConfigBuilder", () => {
  beforeEach(() => {
    defaultsConfigBuilder()._resetToDefault();
  });

  describe("get", () => {
    it("should return default config keys", () => {
      const result = defaultsConfigBuilder().get();
      expect(Object.keys(result)).toMatchSnapshot();
    });

    it("should return cofig for specific key", () => {
      const result = defaultsConfigBuilder().get("useCms.limit");
      expect(result).toEqual(10);
    });
  });

  describe("add", () => {
    it("should replace value existing key", () => {
      const result = defaultsConfigBuilder().add("useCms", { limit: 3 }).get();
      expect(result.useCms.limit).toEqual(3);
    });

    it("should add new key to array without duplication", () => {
      const result = defaultsConfigBuilder()
        .add("useCms", {
          includes: { cms_page_slot: ["something", "type"] },
        })
        .get();
      expect(result.useCms?.includes?.cms_page_slot).toEqual([
        "id",
        "type",
        "slot",
        "blockId",
        "config",
        "data",
        "backgroundMediaMode",
        "backgroundMedia",
        "something",
      ]);
    });

    it("should add association", () => {
      const result = defaultsConfigBuilder()
        .add("useCms", {
          associations: { manufacturer: { associations: { something: {} } } },
        })
        .get();
      expect(result.useCms?.associations?.manufacturer).toEqual({
        associations: { media: {}, something: {} },
      });
    });

    it("should add new key to config", () => {
      const result = defaultsConfigBuilder()
        .add("myNewKey", {
          someConfig: 123,
        })
        .get();
      expect(result.myNewKey).toEqual({
        someConfig: 123,
      });
    });
  });

  describe("replace", () => {
    it("should replace value", () => {
      const result = defaultsConfigBuilder()
        .replace("useCms", { limit: 3 })
        .get();
      expect(result.useCms).toEqual({ limit: 3 });
    });

    it("should replace value by key", () => {
      const result = defaultsConfigBuilder().replace("useCms.limit", 5).get();
      expect(result.useCms?.limit).toEqual(5);
    });

    it("should replace value in array", () => {
      const result = defaultsConfigBuilder()
        .replace("useCms.includes.cms_page_slot", ["id", "type"])
        .get();
      expect(result.useCms?.includes?.cms_page_slot).toEqual(["id", "type"]);
    });
  });

  describe("remove", () => {
    it("should remove value", () => {
      const result = defaultsConfigBuilder().remove("useCms.limit").get();
      expect(result.useCms?.limit).toBeUndefined();
    });

    it("should remove array key", () => {
      const result = defaultsConfigBuilder()
        .remove("useCms.includes.cms_page_slot")
        .get();
      expect(result.useCms?.includes?.cms_page_slot).toBeUndefined();
    });

    it("should remove value from array by key", () => {
      const result = defaultsConfigBuilder()
        .remove("useCms.includes.cms_page_slot", "blockId")
        .get();
      expect(result.useCms?.includes?.cms_page_slot).not.toBeUndefined();
      expect(result.useCms?.includes?.cms_page_slot).not.toContain("blockId");
    });

    it("should ignore additional property when removing key property is not an array", () => {
      const result = defaultsConfigBuilder()
        .remove("useCms.limit", "notFromArray")
        .get();
      expect(result.useCms?.limit).toBeUndefined();
    });
  });

  it("should test the case from useDefaults documentation", () => {
    const result = defaultsConfigBuilder()
      .replace("useCms.limit", 8) // change default listing limit to 8
      .add("useCms.includes.product", "new_option") // add product new_option to returned fields
      .get();

    expect(result.useCms?.limit).toEqual(8);
    expect(result.useCms?.includes?.product).toContain("new_option");
  });
});
