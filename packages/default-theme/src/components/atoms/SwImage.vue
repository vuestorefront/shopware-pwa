<template>
  <SfImage v-bind="{ ...$props, ...$attrs }" :placeholder="placeholder" />
</template>

<script>
import { SfImage } from "@storefront-ui/vue"

export default {
  name: "SwImage",
  components: {
    SfImage,
  },
  setup(props, { root }) {
    const placeholderSvgSource = `
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="${props.imageWidth && props.imageWidth+'px' || '100%'}" height="${props.imageHeight && props.imageHeight+'px' || '100%'}" viewBox="0 0 ${props.imageWidth && props.imageWidth+'px' || '100%'} ${props.imageHeight && props.imageHeight+'px' || 100}" enable-background="new 0 0 ${props.imageWidth && props.imageWidth+'px' || '100%'} ${props.imageHeight && props.imageHeight+'px' || 100}" xml:space="preserve">
  <rect width="${props.imageWidth && props.imageWidth+'px' || '100%'}" height="${props.imageHeight && props.imageHeight+'px' || '100%'}" fill="url(#myGradient)"/>
  <linearGradient id="myGradient" gradientTransform="rotate(20)">
    <stop offset="0%"  stop-color="#eee">
      <animate attributeName="stop-color" values="#EEEEEE; #CCCCCC; #EEEEEE" dur="2s" repeatCount="indefinite"></animate>
    </stop>
    <stop offset="100%" stop-color="#aaa">
      <animate attributeName="stop-color" values="#EEEEEE; #DDDDDD; #EEEEEE" dur="3s" repeatCount="indefinite"></animate>
    </stop>
  </linearGradient>
</svg>
`
    return {
      placeholder: `data:image/svg+xml;base64,${btoa(placeholderSvgSource)}`,
    }
  },
}
</script>

<style lang="scss" scoped></style>
