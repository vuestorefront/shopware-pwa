<template>
 <div>
    <SfList v-for="order in orders" :key="order.id">
      <OrderDetails @click="$emit('click')" :order="order" />
      <SfDivider/>
    </SfList>
 </div>
  
</template>
<script>

import {  SfList, SfDivider } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import OrderDetails from "./OrderHistory/OrderDetails"

export default {
  name: "MyProfile",
  components: {SfList, OrderDetails, SfDivider},
  props: {
  },
  setup() {
    const { orders, loadOrders } = useUser()
    loadOrders()
    return {
      orders
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
</style>
