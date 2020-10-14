<template>
  <li class="promo-code-item">
    <span>{{ code.label }}</span>
    <SfCircleIcon
      class="promo-code-item__remove"
      icon="cross"
      @click="$emit('remove', code)"
    />
  </li>
</template>

<script>
import { SfCircleIcon } from "@storefront-ui/vue"

export default {
  name: "SwPromoCodeItem",
  components: {
    SfCircleIcon,
  },
  props: {
    code: {
      type: Object,
    },
  },
}
</script>

<style lang="scss" scoped>
.promo-code-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__remove {
    --button-size: 2rem;
    --icon-size: 0.6875rem;
  }
}
</style>
