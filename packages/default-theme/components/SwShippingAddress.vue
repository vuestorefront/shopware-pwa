<template>
  <div class="sw-personal-details">
    personal details
  </div>
</template>

<script>
import { SfInput, SfButton, SfAlert, SfTable } from '@storefront-ui/vue'

import SwPluginSlot from 'sw-plugins/SwPluginSlot'


export default {
  name: 'SwPersonalDetails',
  components: { SfButton, SfInput, SfAlert, SfTable, SwPluginSlot},
  props: {
    personalDetails: {
      type: Object,
      default: (()=> {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-personal-details {
  
}

</style>
