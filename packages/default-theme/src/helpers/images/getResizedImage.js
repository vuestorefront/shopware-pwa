/**
 * Method to change URL of the image before fetching it from the server.
 * Allow to use different CDN or put additional properties (like size) to URL.
 *
 * With optional EXPERIMENTAL_IMAGE_PROCESSING_SERVER flag as the env property. As an example for our demo instance .env looks like
 * EXPERIMENTAL_IMAGE_PROCESSING_SERVER=https://test-shopware-pwa-images.vercel.app/api/image
 * we aim to provide guidance for images optimizations in shopware PWA.
 * Without this flag this code will not be bundled and only originalImageSrc is returned.
 *
 * This method can be overwritten by creating `src/helpers/images/getResizedImage.js` file.
 * Remember not to change input or output parameters without knowing what you're doing.
 */
export default function getResizedImage(
  originalImageSrc,
  { width, height, quality } = {}
) {
  if (!process.env.EXPERIMENTAL_IMAGE_PROCESSING_SERVER) return originalImageSrc

  const mediaMatchRegex = /\/media\/.*/g
  const mediaUrl = originalImageSrc?.match(mediaMatchRegex)?.[0].split("?")?.[0]
  if (!mediaUrl) return originalImageSrc

  let url = `${process.env.EXPERIMENTAL_IMAGE_PROCESSING_SERVER}?url=${mediaUrl}`
  if (width) {
    url += `&w=${width}`
  }
  if (height) {
    url += `&h=${height}`
  }
  if (quality) {
    url += `&q=${quality}`
  }

  return url || ""
}
