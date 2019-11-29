import { getProductMainImageUrl } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductMainImageUrl", () => {

  it("should contain url in nested media object", () => {
    const product:any = {
      cover: {
        media: {
          url: "https://shopware.test/media/8a/fd/cb/1572351035/msh06-gray_main_2.jpg"
        }
      }
    }
    const coverUrl = getProductMainImageUrl({product})
    expect(coverUrl).toEqual("https://shopware.test/media/8a/fd/cb/1572351035/msh06-gray_main_2.jpg");
  });

  it("should return null for product without cover media", () => {
    const emptyProduct:any = {}
    const coverUrl = getProductMainImageUrl({product: emptyProduct})
    expect(coverUrl).toBeUndefined();
  });

  it("should return default negative value if argument wasn't provided", () => {
    const coverUrl = getProductMainImageUrl()
    expect(coverUrl).toBeUndefined()
  });

  it("should return default value if product was null", () => {
    const argument: any = { product: null }
    const coverUrl = getProductMainImageUrl(argument)
    expect(coverUrl).toBeNull()
  });

});