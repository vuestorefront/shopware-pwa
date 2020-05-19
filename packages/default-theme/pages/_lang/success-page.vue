<template>
  <div class="success-page" :key="$route.fullPath">
    <SfHeading
      title="Thank you"
      subtitle="for shopping with us!"
      class="success-page__heading"
    />
    <SfDivider />
    <SwOrderDetails :order-id="orderId" />
    <a :href="paymentUrl" v-if="paymentUrl">
      <SfButton class="pay-button color-danger">
        Pay for your order
      </SfButton>
    </a>
    <SfButton @click="$router.push('/')">
      <SfIcon icon="chevron_left" color="white" size="20px" />Return to homepage
    </SfButton>
  </div>
</template>
<script>
import { SfButton, SfHeading, SfIcon, SfDivider } from '@storefront-ui/vue'
import { getOrderPaymentUrl } from '@shopware-pwa/shopware-6-client'
import {
  ref,
  getCurrentInstance,
  onMounted,
  computed,
} from '@vue/composition-api'

import SwOrderDetails from "@shopware-pwa/default-theme/components/SwOrderDetails";

export default {
  name: 'SuccessPage',
  components: {
    SfHeading,
    SfButton,
    SfIcon,
    SfDivider,
    SwOrderDetails,
  },
  data() {
    return {}
  },
  setup(params) {
    const vm = getCurrentInstance()
    const paymentUrl = ref(null)
    const orderId = computed(() => vm.$route.query.orderId)
    const fullPath = computed(() => vm.$route.fullPath)

    onMounted(async () => {
      try {
        const resp = await getOrderPaymentUrl({
          orderId: orderId.value,
          finishUrl: window.location.origin + fullPath.value,
        })
        paymentUrl.value = resp.paymentUrl
      } catch (e) {
        console.error('Success page, payment link error', e)
      }
    })
    return {
      paymentUrl,
      orderId
    }
  },
}
</script>
<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.success-page {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__heading {
    margin-bottom: 30px;
    text-align: center;
    h2 {
      font-size: 5rem;
      color: var(--c-primary);
    }
  }

  .sf-divider {
    border-color: var(--c-primary);
    max-width: var(--header-width, 77.5rem);
  }

  .pay-button {
    margin-bottom: 2rem;
  }

  .sf-icon {
    float: left;
    margin-right: 20px;
  }
}
</style>