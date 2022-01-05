import { Product } from "@shopware-pwa/commons";
import { UiMediaGalleryItem } from "../ui-interfaces";

/**
 * Get the media gallery of a product as ui-interfaces
 *
 * @public
 */
export function getProductMediaGallery({
  product,
}: { product?: Product } = {}): UiMediaGalleryItem[] {
  return product && product.media
    ? product.media.map((media) => {
        const smallThumb =
          media.media &&
          media.media.thumbnails &&
          media.media.thumbnails.find((thumb) => thumb.width == "400");
        const normalThumb =
          media.media &&
          media.media.thumbnails &&
          media.media.thumbnails.find((thumb) => thumb.width == "800");
        const bigThumb =
          media.media &&
          media.media.thumbnails &&
          media.media.thumbnails.find((thumb) => thumb.width == "1920");
        return {
          icon: { url: smallThumb ? smallThumb.url : media.media.url },
          mobile: { url: normalThumb ? normalThumb.url : media.media.url },
          desktop: { url: bigThumb ? bigThumb.url : media.media.url },
          alt: product.name || " ",
        };
      })
    : [];
}
