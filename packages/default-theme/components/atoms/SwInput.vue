<template>
  <SfInput v-bind="{...$props, ...$attrs}" v-on="$listeners">
    <slot />
  </SfInput>
</template>

<script>
import { SfInput } from '@storefront-ui/vue'

export default {
  name: 'SwInput',
  components: {
    SfInput,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
