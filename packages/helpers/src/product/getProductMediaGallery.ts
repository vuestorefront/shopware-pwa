import { Product } from "@shopware-pwa/shopware-6-client/src/interfaces/models/content/product/Product";
import { UiMediaGalleryItem } from "@shopware-pwa/helpers";

export function getProductMediaGallery({
  product
}: { product?: Product } = {}): UiMediaGalleryItem[] {
  return product && product.media
    ? product.media.map(media => {
        const smallThumb =
          media.media &&
          media.media.thumbnails &&
          media.media.thumbnails.find(thumb => thumb.width == "400");
        const normalThumb =
          media.media &&
          media.media.thumbnails &&
          media.media.thumbnails.find(thumb => thumb.width == "800");
        const bigThumb =
          media.media &&
          media.media.thumbnails &&
          media.media.thumbnails.find(thumb => thumb.width == "1920");
        return {
          small: { url: smallThumb ? smallThumb.url : media.media.url },
          normal: { url: normalThumb ? normalThumb.url : media.media.url },
          big: { url: bigThumb ? bigThumb.url : media.media.url }
        };
      })
    : [];
}
