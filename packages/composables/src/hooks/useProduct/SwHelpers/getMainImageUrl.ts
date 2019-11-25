export default function getMainImageUrl(product, defaultUrl= "/img/product_thumb.png"){
  return (product.cover && product.cover.media) ? product.cover.media.url : defaultUrl
}