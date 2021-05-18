<template>
  <SfCheckbox v-bind="{ ...$props, ...$attrs }" v-on="$listeners" />
</template>

<script>
import { SfCheckbox } from "@storefront-ui/vue"

export default {
  name: "SwCheckbox",
  components: {
    SfCheckbox,
  },
  model: {
    prop: "selected",
    event: "change",
  },
  setup(props, { root }) {
    return {}
  },
}
</script>
