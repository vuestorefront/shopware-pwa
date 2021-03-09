<template>
  <SfTableRow :key="order.id" class="order-view">
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
      <SwButton class="sf-button--text" @click="viewOrder(order.id)">
        {{ $t("View details") }}
      </SwButton>
    </SfTableData>
  </SfTableRow>
</template>
<script>
import { formatDate, formatPrice } from "@/helpers"
import SwButton from "@/components/atoms/SwButton.vue"

export default {
  name: "Order",
  components: { SwButton },
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
      this.$router.push(this.$routing.getUrl(`/account/orders/${orderId}`))
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
