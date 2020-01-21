<template>
 <div class="order-details__item">
    <SfBadge class="sf-badge--full-width"><strong>#{{orderNumber}}</strong></SfBadge>
    <SfProperty name="amountTotal" :value="totalAmount"/>
    <SfProperty name="status" :value="status"/>
    <SfProperty name="orderDateTime" :value="orderDateTime"/>
    <SfProperty name="shippingCost" :value="shippingCost"/>

    <SfButton v-if="!isLoaded" class="order-details__item__btn sf-button--outline" v-on:click="loadOrderDetails(order.id)">
      See more
    </SfButton>
   {{ orderDetails }}
 </div>
  
</template>
<script>

import { SfProperty, SfButton, SfBadge } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'

export default {
  name: "OrderDetail",
  components: {SfButton, SfProperty, SfBadge},
  props: {
    order: {
      type: Object,
      default: null
    }
  },
  setup() {
    const { getOrderDetails } = useUser()

    return {
       getOrderDetails
    }
  },
  data() {
    return {
      orderDetails: null
    }
  },

  computed: {
    isLoaded() {
      return !!this.orderDetails
    },
    orderNumber() {
      return this.order && this.order.orderNumber
    },
    totalAmount() {
      return this.order && this.order.amountTotal
    },
    shippingCost() {
      return this.order && this.order.shippingCosts && this.order.shippingCosts.totalPrice
    },
    orderDateTime() {
      return this.order && this.order.orderDateTime
    },
    status() {
      return this.order.stateMachineState && this.order.stateMachineState && this.order.stateMachineState.name
    }
  },
  
  methods: {
    // detailed info are available through the separated endpoint
    async loadOrderDetails(orderId) {
       this.orderDetails = "details"
       // uncomment this line once the way of fetching the details is cleared
       //orderDetails = await this.getOrderDetails(orderId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

.order-details {
  &__item {
    padding-top:10px;
    padding-bottom:10px;
    overflow: auto;
    &__btn {
      position: relative;

      float:right;
    }
  }
}
</style>
