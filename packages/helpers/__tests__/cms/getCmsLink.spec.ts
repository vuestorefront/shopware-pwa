import { getCmsLink } from "@shopware-pwa/helpers";

describe("Shopware helpers - getCmsLink", () => {
  it("should return epmty strig when no content", () => {
    const link = getCmsLink(undefined as any);
    expect(link).toEqual("");
  });
});
