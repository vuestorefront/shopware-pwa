import { Product } from "@shopware-pwa/shopware-6-client";
import { UiMediaGalleryItem } from "packages/global";

interface Parameters {
  product: Product
}

export default function getProductMediaGallery(params: Parameters): UiMediaGalleryItem[] {
  const { product } = params

  return product && product.media ? product.media.map(media => 
    {
        const smallThumb = media.media && media.media.thumbnails && media.media.thumbnails.find(thumb => thumb.width == "400")
        const normalThumb = media.media && media.media.thumbnails && media.media.thumbnails.find(thumb => thumb.width == "800")
        const bigThumb = media.media && media.media.thumbnails && media.media.thumbnails.find(thumb => thumb.width == "1920")
        return {
          small: { url: smallThumb ? smallThumb.url : "" },
          normal: { url: normalThumb ? normalThumb.url: "" },
          big: { url: bigThumb ? bigThumb.url: "" }
        }
    }
  ) : []
}