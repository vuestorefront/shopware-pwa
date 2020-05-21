<template>
  <div class="sw-generic-method">
    <h4 class="sw-generic-method__title">{{ label }}</h4>
    <p class="sw-generic-method__content">
      {{ method.name }}
    </p>
  </div>
</template>

<script>
import { SfInput, SfButton, SfAlert, SfTable } from '@storefront-ui/vue'

import SwPluginSlot from 'sw-plugins/SwPluginSlot'

export default {
  name: 'SwGenericMethod',
  components: { SfButton, SfInput, SfAlert, SfTable, SwPluginSlot },
  props: {
    label: {
      type: String,
      default: '',
    },
    method: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-generic-method {
  margin-bottom: var(--spacer-sm);

  &__title {
    font-size: var(--font-sm);
    margin-bottom: var(--spacer-xs);
    color: var(--c-text);
  }
  &__content {
    font-size: var(--font-xs);
    color: var(--c-text-muted);
  }
}
</style>
