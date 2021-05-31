<template>
  <div class="summary">
    <SwTotals :total="total" :subtotal="subtotal" :shipping="shippingTotal" />
    <div class="notification" v-if="!cartItems.length && !!cart">
      <SfNotification
        :visible="true"
        type="info"
        :title="$t('You can not place the order')"
        :message="$t('Your cart is empty')"
      />
    </div>
  </div>
</template>
<script>
import { useCart } from "@shopware-pwa/composables"
import SwTotals from "@/components/SwTotals.vue"

import { SfNotification } from "@storefront-ui/vue"

export default {
  name: "TotalsSummary",
  components: {
    SfNotification,
    SwTotals,
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
