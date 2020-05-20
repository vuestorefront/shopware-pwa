<template>
  <div class="sw-order-details" v-if="order">
    <div class="sw-order-details__totals">
      <SfTable class="sf-table--bordered table">
        <SfTableHeading class="table__row">
          <SfTableHeader
            v-for="tableHeader in tableHeaders"
            :key="tableHeader"
            class="table__header"
            :class="{ 'table__description': tableHeader === 'Item' }"
          >
            {{ tableHeader }}
          </SfTableHeader>
        </SfTableHeading>
        <SwOrderDetailsItem v-for="item in order.lineItems" :product="item" :key="item.id" />
      </SfTable>
    </div>
    <div class="sw-order-details__addresses">
        <SfHeading
          title="Your address details"
          :level="3"
          class="sf-heading--left sf-heading--no-underline title"
        />
        <SwPersonalDetails :personal-details="personalDetails" class="content"/>
        <SwAddress class="content"/>
        <SwAddress :address="billingAddress" address-title="Billing address" v-if="billingAddress" class="content"/>
        <SwPaymentMethod :payment-method="paymentMethod" v-if="paymentMethod" class="content"/>
        <SwPaymentMethod :payment-method="shippingMethod" v-if="shippingMethod" class="content"/>

    </div>
  </div>
</template>

<script>
import { SfInput, SfButton, SfAlert, SfTable, SfHeading } from '@storefront-ui/vue'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { useUser, useCheckout } from '@shopware-pwa/composables'
import {
  ref,
  onMounted,
  computed,
  watchEffect
} from '@vue/composition-api'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'
import SwOrderDetailsItem from './SwOrderDetailsItem';
import SwPersonalDetails from './SwPersonalDetails'
import SwAddress from './SwAddress'
import SwPaymentMethod from './SwPaymentMethod'
import { getOrderPaymentMethodId, getOrderShippingMethodId } from '@shopware-pwa/helpers'

export default {
  name: 'SwOrderDetails',
  components: { SfHeading, SfButton, SfInput, SfAlert, SfTable, SwPluginSlot, SwOrderDetailsItem,
  SwPersonalDetails,
    SwAddress,
    SwPaymentMethod, },
  props: {
    orderId: {
      type: String
    }
  },
  data() {
    return {
      tableHeaders: ['Item', 'Price', 'Quantity', 'Amount'],
    }
  },
  setup({orderId}) {
    const { getPaymentMethod, getShippingMethod } = useCheckout();
    const { getOrderDetails, loading, error: userError } = useUser()
    const order = ref(null)
    const paymentMethod = ref(null)
    const shippingMethod = ref(null)

    

    const personalDetails = computed(() => order.value && ({
      email: order.value.orderCustomer.email,
      firstName: order.value.orderCustomer.firstName,
      lastName: order.value.orderCustomer.lastName
    }))
    const billingAddress = computed(() => order.value && order.value.addresses && order.value.addresses.find(({id}) => id == order.value.billingAddressId))
    const shippingAddress = computed(() => order.value && order.value.addresses && order.value.addresses.find(({id}) => id == order.value.shippingAddressId))
    const paymentMethodId = computed(() => order.value && getOrderPaymentMethodId(order.value));
    const shippingMethodId = computed(() => order.value && getOrderShippingMethodId(order.value));
    
    onMounted(async () => {
       order.value = await getOrderDetails(orderId);
       paymentMethod.value = await getPaymentMethod(paymentMethodId.value);
       shippingMethod.value = await getShippingMethod(shippingMethodId.value);
    });


    
    return {
      isLoading: loading,
      userError,
      order,
      personalDetails,
      billingAddress,
      paymentMethod,
      shippingMethod
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.sw-order-details {
  padding: 1rem;
  width: 50%;
  display: flex;
  flex-wrap: wrap;
   @include for-mobile {
      width: 80%;
      padding: 20px;
    }

  &__totals {
    flex: 2;
  }

  &__addresses {
    flex: 1;
    
    box-sizing: border-box;
    width: 100%;
    background-color: #f1f2f3;
    padding: var(--spacer-xl);
    margin-bottom: var(--spacer-base);
    &:last-child {
      margin-bottom: 0;
    }
  }
 
  .sf-divider {
    border: --c-primary;
    width: 50%;
    max-width: 50%;
    display: block;
  }
}

.table {
  &__data {
    text-align: center;
    &:last-of-type {
      text-align: right;
    }
  }
  &__quantity {
    & > * {
    --quantity-selector-width: 6rem;
    --quantity-selector-border-width: 0;

    }
  }
}

</style>
