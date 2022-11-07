import { getProductQtySteps } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductQtySteps", () => {
  it("should return null", () => {
    const producMock: any = {
      purchaseSteps: 1,
      availableStock: 100,
    };

    const properties = getProductQtySteps(producMock);
    expect(properties).toBe(null);
  });

  it("should return steps", () => {
    const producMock: any = {
      purchaseSteps: 2,
      availableStock: 21,
    };

    const properties = getProductQtySteps(producMock);
    expect(properties).toStrictEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
  });

  it("should return steps - custom", () => {
    const producMock: any = {
      purchaseSteps: 4,
    };

    const properties = getProductQtySteps(producMock, 21, 1);
    expect(properties).toStrictEqual([4]);
  });

  it("should return steps - function params", () => {
    const producMock: any = {
      purchaseSteps: 50,
    };

    const properties = getProductQtySteps(producMock);
    expect(properties).toStrictEqual([50, 100]);
  });
});
