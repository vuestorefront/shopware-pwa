export default function getMediaGallery(product){
  return product && product.media ? product.media.map(media => 
    {
        const smallThumb = media.media.thumbnails.find(thumb => thumb.width == "400")
        const normalThumb = media.media.thumbnails.find(thumb => thumb.width == "800")
        const bigThumb = media.media.thumbnails.find(thumb => thumb.width == "1920")
        return {
          small: { url: smallThumb ? smallThumb.url : "" },
          normal: { url: normalThumb ? normalThumb.url: "" },
          big: { url: bigThumb ? bigThumb.url: "" }
        }
    }
  ) : []
}