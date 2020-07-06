import { getCmsLink } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCmsLink", () => {
  it("should return epmty strig when no content", () => {
    const link = getCmsLink(undefined as any);
    expect(link).toEqual("");
  });

  it("should return strig when content has url property", () => {
    const args: any = {
      data: {
        url: "https://www.google.pl/",
      },
    };

    const link = getCmsLink(args);
    expect(link).toEqual("https://www.google.pl/");
  });
});
