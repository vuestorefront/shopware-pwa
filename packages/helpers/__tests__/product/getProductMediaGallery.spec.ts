import { getProductMediaGallery } from "@shopware-pwa/helpers";

describe("Shopware helpers - getProductMediaGallery", () => {
  it("should return array of UiMediaGalleryItem", () => {
    const product: any = {
      media: [
        {
          media: {
            thumbnails: [
              {
                width: 800,
                url:
                  "https://shopware.test/thumbnail/8a/fd/cb/1572351035/msh06-gray_main_2_1920x1920.jpg"
              },
              {
                width: 400,
                url:
                  "https://shopware.test/thumbnail/8a/fd/cb/1572351035/msh06-gray_main_2_400x400.jpg"
              },
              {
                width: 1920,
                url:
                  "https://shopware.test/thumbnail/8a/fd/cb/1572351035/msh06-gray_main_2_800x800.jpg"
              }
            ]
          }
        }
      ]
    };

    const mediaGallery = getProductMediaGallery({ product });
    expect(mediaGallery).toHaveLength(product.media.length);
  });

  it("should return empty array of UiMediaGalleryItem on empty media", () => {
    const emptyProduct: any = {};
    const mediaGallery = getProductMediaGallery({ product: emptyProduct });
    expect(mediaGallery).toHaveLength(0);
  });

  it("should return array of UiMediaGalleryItem with empty urls properties", () => {
    const unmappedMediaSizes: any = {
      media: [
        {
          media: {
            thumbnails: [
              {
                width: 960,
                url:
                  "https://shopware.test/thumbnail/8a/fd/cb/1572351035/msh06-gray_main_2_1920x1920.jpg"
              },
              {
                width: 450,
                url:
                  "https://shopware.test/thumbnail/8a/fd/cb/1572351035/msh06-gray_main_2_400x400.jpg"
              },
              {
                width: 900,
                url:
                  "https://shopware.test/thumbnail/8a/fd/cb/1572351035/msh06-gray_main_2_800x800.jpg"
              }
            ]
          }
        }
      ]
    };
    const mediaGallery = getProductMediaGallery({
      product: unmappedMediaSizes
    });
    expect(mediaGallery).toHaveLength(1);
  });

  it("should return default empty array if argument wasn't provided", () => {
    const mediaGallery = getProductMediaGallery();
    expect(mediaGallery).toHaveLength(0);
  });

  it("should return default value if product was null", () => {
    const argument: any = { product: null };
    const mediaGallery = getProductMediaGallery(argument);
    expect(mediaGallery).toHaveLength(0);
  });
});
