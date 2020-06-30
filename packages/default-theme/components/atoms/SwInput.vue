<template>
  <SfInput v-bind="{ ...$props, ...$attrs }" v-on="$listeners" />
</template>

<script>
import { SfInput } from "@storefront-ui/vue"

export default {
  name: "SwInput",
  components: {
    SfInput,
  },
  setup(props, { root }) {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
