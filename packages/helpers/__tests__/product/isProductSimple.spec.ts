import { isProductSimple } from "@shopware-pwa/helpers";

describe("Shopware helpers - isProductSimple", () => {

  it("should return true if product has a parent", () => {
    const productWithParent: any = {
      parentId: "3f06d7747f904336a78bf75e86a6450f"
    }

    const isSimple = isProductSimple({product: productWithParent})
    expect(isSimple).toBe(true);
   
  });
  it("should return true if product has no parent", () => {
    const productWithoutParent: any = {
      parentId: null
    }

    const isSimple = isProductSimple({product: productWithoutParent})
    expect(isSimple).toBe(false);
  });

  it("should return default negative value if argument wasn't provided", () => {
    const isSimple = isProductSimple()
    expect(isSimple).toBe(false);
  });

  it("should return default value if product was null", () => {
    const argument: any = { product: null }
    const isSimple = isProductSimple(argument)
    expect(isSimple).toBe(false);
  });

});