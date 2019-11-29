import { Product } from "@shopware-pwa/shopware-6-client";
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
          small: { url: smallThumb ? smallThumb.url : "" },
          normal: { url: normalThumb ? normalThumb.url : "" },
          big: { url: bigThumb ? bigThumb.url : "" }
        };
      })
    : [];
}
