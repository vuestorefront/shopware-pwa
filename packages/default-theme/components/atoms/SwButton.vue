<template>
  <SfButton v-bind="{ ...$props, ...$attrs }" v-on="$listeners">
    <slot />
  </SfButton>
</template>

<script>
import { SfButton } from "@storefront-ui/vue"

export default {
  name: "SwButton",
  components: {
    SfButton,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    link: {
      type: [String, Object],
      default: "",
    },
  },
  setup(props, { root }) {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
