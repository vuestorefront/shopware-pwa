import { getProductMediaGallery } from "@shopware-pwa/helpers";
import * as product from "./__mock__/product.json"

describe("Shopware helpers - getProductMediaGallery", () => {
  
  it("should return array of UiMediaGalleryItem", () => {
    const mediaGallery = getProductMediaGallery({product})
    expect(mediaGallery).toHaveLength(product.media.length)
  });

  it("should return empty array of UiMediaGalleryItem on empty media", () => {
    const emptyProduct:any = {}
    const mediaGallery = getProductMediaGallery({product: emptyProduct})
    expect(mediaGallery).toHaveLength(0)
  });

  it("should return array of UiMediaGalleryItem with empty urls properties", () => {
    const unmappedMediaSizes:any = {
      "media": [
        {
          "media": {
            "thumbnails": [
              {
                "width": 960,
                "url": "https://shopware.test/thumbnail/8a/fd/cb/1572351035/msh06-gray_main_2_1920x1920.jpg",
              },
              {
                "width": 450,
                "url": "https://shopware.test/thumbnail/8a/fd/cb/1572351035/msh06-gray_main_2_400x400.jpg",
              },
              {
                "width": 900,
                "url": "https://shopware.test/thumbnail/8a/fd/cb/1572351035/msh06-gray_main_2_800x800.jpg",
              }
            ]
          }
        }
      ]
    }
    const mediaGallery = getProductMediaGallery({product: unmappedMediaSizes})
    expect(mediaGallery).toHaveLength(1)
  });
});