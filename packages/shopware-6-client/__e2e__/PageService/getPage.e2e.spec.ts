import { getPage } from "@shopware-pwa/shopware-6-client";
import { deepChangeProperties } from "../helpers";
describe("shopware-6-client - E2E - PageService - getPage", () => {
  it("should test / page response", async () => {
    const result = await getPage("");
    deepChangeProperties(result, ["availableStock", "categoryTree"]);
    expect(result).toMatchSnapshot();
  });

  it("should test product page response", async () => {
    const result = await getPage("/detail/9cce06f9dc424844989a06cfe3dc98da");
    deepChangeProperties(result, ["availableStock", "categoryTree"]);
    expect(result).toMatchSnapshot();
  });

  it("should test category page response", async () => {
    const result = await getPage("Clothing");
    deepChangeProperties(result, [
      "availableStock",
      "thumbnailsRo",
      "updatedAt",
      "categoryTree"
    ]);
    expect(result).toMatchSnapshot();
  });
});
