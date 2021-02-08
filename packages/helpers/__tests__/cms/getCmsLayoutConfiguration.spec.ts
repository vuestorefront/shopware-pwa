import { getCmsLayoutConfiguration } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCmsLayoutConfiguration", () => {
  it("should return an default object if no argument was provided", () => {
    const result = getCmsLayoutConfiguration(undefined as any);
    expect(result).toEqual({
      cssClasses: null,
      layoutStyles: {},
    });
  });

  it("should return hydrated object if right cms entity was provided", () => {
    const result = getCmsLayoutConfiguration({
      backgroundColor: "",
      backgroundMedia: {
        url: "link/to/image.png",
      },
      marginBottom: "20px",
      marginLeft: "20px",
      marginRight: "20px",
      marginTop: null,
      cssClass: "custom-class",
    } as any);
    expect(result).toEqual({
      cssClasses: "custom-class",
      layoutStyles: {
        backgroundColor: "",
        backgroundImage: "url(link/to/image.png)",
        marginBottom: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: null,
      },
    });
  });

  it("should return semi-hydrated object if only part of the params were provided", () => {
    const result = getCmsLayoutConfiguration({
      cssClass: "custom-class",
    } as any);
    expect(result).toEqual({
      cssClasses: "custom-class",
      layoutStyles: {
        backgroundColor: undefined,
        backgroundImage: null,
        marginBottom: undefined,
        marginLeft: undefined,
        marginRight: undefined,
        marginTop: undefined,
      },
    });
  });
});
