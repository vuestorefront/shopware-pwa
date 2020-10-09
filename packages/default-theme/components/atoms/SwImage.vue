<template>
  <SfImage v-bind="{ ...$props, ...$attrs }" />
</template>

<script>
import { SfImage } from "@storefront-ui/vue"

export default {
  name: "SwImage",
  components: {
    SfImage,
  },
  setup(props, { root }) {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
