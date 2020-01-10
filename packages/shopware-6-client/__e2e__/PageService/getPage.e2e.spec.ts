import { getPage } from "@shopware-pwa/shopware-6-client";

function deepChangeProperty(obj: any, property: string, value: any) {
  for (var prop in obj) {
    if (obj[prop] === Object(obj[prop]))
      deepChangeProperty(obj[prop], property, value);
    else if (prop === property) obj[prop] = value;
  }
}

describe("shopware-6-client - E2E - PageService - getPage", () => {
  it("should test / page response", async () => {
    const result = await getPage("");
    deepChangeProperty(result, "availableStock", "mockedValue");
    expect(result).toMatchSnapshot();
  });

  it("should test product page response", async () => {
    const result = await getPage("/detail/9cce06f9dc424844989a06cfe3dc98da");
    deepChangeProperty(result, "availableStock", "mockedValue");
    expect(result).toMatchSnapshot();
  });

  it("should test category page response", async () => {
    const result = await getPage("Clothing");
    deepChangeProperty(result, "availableStock", "mockedValue");
    expect(result).toMatchSnapshot();
  });
});
