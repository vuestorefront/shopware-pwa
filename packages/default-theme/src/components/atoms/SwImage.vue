<template>
  <SfImage v-bind="{ ...$props, ...$attrs }" :placeholder="placeholder" />
</template>

<script>
import { SfImage } from "@storefront-ui/vue"
import getPlaceholderImage from "@/helpers/images/getPlaceholderImage.js"

export default {
  name: "SwImage",
  components: {
    SfImage,
  },
  setup(props, { root }) {
    const width = (props.imageWidth && props.imageWidth + "px") || "100%"
    const height = (props.imageHeight && props.imageHeight + "px") || "100%"
    return {
      placeholder: getPlaceholderImage(width, height),
    }
  },
}
</script>

<style lang="scss">
.sf-image--placeholder {
  min-width: 100%;
}
</style>
