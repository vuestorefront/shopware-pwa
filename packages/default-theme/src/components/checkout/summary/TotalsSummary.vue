<template>
  <div class="summary">
    <div class="summary-notification" v-if="!cartItems.length && !!cart">
      <SwAlert :message="$t('Your cart is empty')" type="danger" />
    </div>
    <SwTotals :total="total" :subtotal="subtotal" :shipping="shippingTotal" />
  </div>
</template>
<script>
import { useCart } from "@shopware-pwa/composables"
import SwTotals from "@/components/SwTotals.vue"
import SwAlert from "@/components/atoms/SwAlert.vue"

export default {
  name: "TotalsSummary",
  components: {
    SwTotals,
    SwAlert,
  },
  data() {
    return {
      terms: false,
    }
  },
  setup(props, { root }) {
    const { cartItems, subtotal, totalPrice, shippingTotal, cart } =
      useCart(root)
    return {
      cartItems,
      subtotal,
      total: totalPrice,
      shippingTotal,
      cart,
    }
  },
}
</script>
<style lang="scss" scoped>
.summary-notification {
  margin: 1rem 0;
}
</style>
