import { getCmsLinkTarget } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCmsLinkTarget", () => {
  it("should return '_self' when no cotent", () => {
    const linkTarget = getCmsLinkTarget(undefined as any);
    expect(linkTarget).toEqual("_self");
  });

  it("should return '_self' when newTab property and it is false", () => {
    const args: any = {
      data: {
        newTab: false,
      },
    };

    const linkTarget = getCmsLinkTarget(args);
    expect(linkTarget).toEqual("_self");
  });

  it("should return '_blank' when newTab property and it is true", () => {
    const args: any = {
      data: {
        newTab: true,
      },
    };

    const linkTarget = getCmsLinkTarget(args);
    expect(linkTarget).toEqual("_blank");
  });
});
