<template>
  <SfTableRow class="order-view" :key="order.id">
     <SfTableData>
      <template>
        {{ order.orderNumber }}
      </template>
     </SfTableData>
    <SfTableData>
      <template
        ><!-- total amount -->
        {{ formatPrice(order.amountTotal) }}
      </template>
    </SfTableData>
    <SfTableData>
      <template
        ><!-- order date -->
        {{ formatDate(order.orderDateTime) }}
      </template>
    </SfTableData>
    <SfTableData>
      <template><!-- order status -->
        <span
          :class="{
            'text-success': order.stateMachineState.technicalName === 'closed',
            'text-info': order.stateMachineState.technicalName === 'open',
          }"
          >{{  order.stateMachineState.name }}</span
        >
      </template>
    </SfTableData>
    
    <SfTableData>
      <SfButton class="sf-button--text desktop-only" @click="showDetails = !showDetails">{{!showDetails ? 'View details' : 'hide details'}}</SfButton>
    </SfTableData>
    <SwOrderDetails class="order-view__details" v-if="showDetails" :order-id="order.id" :key="order.id"/>
  </SfTableRow>
</template>
<script>
import {
  SfTabs,
  SfList,
  SfDivider,
  SfTable,
  SfButton
} from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import SwOrderDetails from '@shopware-pwa/default-theme/components/SwOrderDetails'
import { formatDate, formatPrice } from '@shopware-pwa/default-theme/helpers'

export default {
  name: 'Order',
  components: { SfTabs, SfList, SfDivider, SfTable, SfButton, SwOrderDetails },
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showDetails: false
    }
  },
  methods: {
    formatDate(date) {
      return formatDate(date)
    },
    formatPrice(price) {
      return formatPrice(price)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
  .order-view {
    &__details {
      flex: 0 0 100%;
    }
  }
</style>
