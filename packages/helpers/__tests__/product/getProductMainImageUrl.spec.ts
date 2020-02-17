import { getProductMainImageUrl } from "@shopware-pwa/helpers";

describe("Helpers - getProductMainImageUrl", () => {
  const mediaUrl =
    "https://shopware.test/media/8a/fd/cb/1572351035/msh06-gray_main_2.jpg";

  it("should contain url in nested media object", () => {
    const product: any = {
      cover: {
        media: {
          url: mediaUrl
        }
      }
    };
    const coverUrl = getProductMainImageUrl(product);
    expect(coverUrl).toEqual(mediaUrl);
  });

  it("should contain url in cover object when media url is blank", () => {
    const product: any = {
      cover: {
        url: mediaUrl
      }
    };
    const coverUrl = getProductMainImageUrl(product);
    expect(coverUrl).toEqual(mediaUrl);
  });

  it("Should take the url from the media object first", () => {
    const product: any = {
      cover: {
        url:
          "https://shopware.test/media/8a/fd/cb/1572351035/msh06-gray_main_1.jpg",
        media: {
          url: mediaUrl
        }
      }
    };
    const coverUrl = getProductMainImageUrl(product);
    expect(coverUrl).toEqual(mediaUrl);
  });

  it("should return null for product without cover media and cover url", () => {
    const emptyProduct: any = {};
    const coverUrl = getProductMainImageUrl(emptyProduct);
    expect(coverUrl).toEqual("");
  });

  it("should return default negative value if argument wasn't provided", () => {
    const coverUrl = getProductMainImageUrl(undefined as any);
    expect(coverUrl).toEqual("");
  });

  it("should return default value if product was null", () => {
    const argument: any = null;
    const coverUrl = getProductMainImageUrl(argument);
    expect(coverUrl).toEqual("");
  });
});
