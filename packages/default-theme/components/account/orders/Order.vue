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
      <template
        ><!-- order status -->
        <span
          :class="{
            'text-success': order.stateMachineState.technicalName === 'closed',
            'text-info': order.stateMachineState.technicalName === 'open',
          }"
          >{{ order.stateMachineState.name }}</span
        >
      </template>
    </SfTableData>

    <SfTableData>
      <SwButton class="sf-button--text" @click="viewOrder(order.id)"
        >View details</SwButton
      >
    </SfTableData>
  </SfTableRow>
</template>
<script>
import { SfTable } from "@storefront-ui/vue"
import { useUser } from "@shopware-pwa/composables"
import SwOrderDetails from "@shopware-pwa/default-theme/components/SwOrderDetails"
import { formatDate, formatPrice } from "@shopware-pwa/default-theme/helpers"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"

export default {
  name: "Order",
  components: { SfTable, SwButton, SwOrderDetails },
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showDetails: false,
    }
  },
  methods: {
    viewOrder(orderId) {
      this.$router.push(this.$i18n.path(`/account/orders/${orderId}`))
    },
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
.order-view {
  &__details {
    flex: 0 0 100%;
  }
}
</style>
