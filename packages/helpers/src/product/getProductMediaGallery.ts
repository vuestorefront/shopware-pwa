import { Product } from "packages/shopware-6-client/src/interfaces/models/content/product/Product";

// TODO move to UI/next interfaces
interface UiMediaGalleryItemUrl {
  url: string
}
interface UiMediaGalleryItem {
  small: UiMediaGalleryItemUrl
  normal: UiMediaGalleryItemUrl
  big: UiMediaGalleryItemUrl
}

export default function getProductMediaGallery(product: Product): UiMediaGalleryItem[] {
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