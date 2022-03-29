<template>
  <SfInput
    :name="`sw-input-${inputName}`"
    v-bind="{ ...$props, ...$attrs }"
    v-on="$listeners"
  />
</template>

<script>
import { SfInput } from "@storefront-ui/vue"

export default {
  name: "SwInput",
  components: {
    SfInput,
  },
  setup(props, { root }) {
    return {
      inputName: Math.random().toString(36).slice(2),
    }
  },
}
</script>

<style lang="scss" scoped></style>
