<template>
  <div class="sw-payment-method">
    {{ paymentMethod.name }}
  </div>
</template>

<script>
import { SfInput, SfButton, SfAlert, SfTable } from '@storefront-ui/vue'

import SwPluginSlot from 'sw-plugins/SwPluginSlot'


export default {
  name: 'SwPaymentMethod',
  components: { SfButton, SfInput, SfAlert, SfTable, SwPluginSlot},
  props: {
    paymentMethod: {
      type: Object,
      default: (()=> {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-payment-method {
  
}

</style>
