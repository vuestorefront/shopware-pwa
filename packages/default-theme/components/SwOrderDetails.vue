<template>
  <div class="sw-order-details" v-if="order">
    <h2>order details</h2>
    <ul v-for="item in order.lineItems" :key="item.id">
      <li>
        {{ item.label }} ({{item.productId}}) | {{ item.unitPrice | price }} x{{ item.price.quantity }} | {{ item.totalPrice | price }}
      </li>
    </ul>
  </div>
</template>

<script>
import { SfInput, SfButton, SfAlert } from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { useUser } from '@shopware-pwa/composables'
import {
  ref,
  onMounted,
  computed,
} from '@vue/composition-api'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'

export default {
  name: 'SwLogin',
  components: { SfButton, SfInput, SfAlert, SwPluginSlot },
  props: {
    orderId: {
      type: String
    }
  },
  setup({orderId}) {
    const { getOrderDetails, loading, error: userError } = useUser()
    const order = ref(null)

     onMounted(async () => {
       order.value = await getOrderDetails(orderId)
     });
    return {
      isLoading: loading,
      userError,
      order
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-order-details {
  
}

</style>
