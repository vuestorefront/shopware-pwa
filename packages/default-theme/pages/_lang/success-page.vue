<template>
  <div class="success-page" :key="$route.fullPath">
    <SfHeading
      title="Thank you"
      subtitle="for shopping with us!"
      class="success-page__heading"
    />
    <SfDivider />
    <SwOrderDetails :order-id="orderId" />
    <SwButton @click="$router.push($i18n.path('/'))">
      <SfIcon icon="chevron_left" color="white" size="20px" />Return to homepage
    </SwButton>
  </div>
</template>
<script>
import { SfHeading, SfIcon, SfDivider } from '@storefront-ui/vue'
import { getOrderPaymentUrl } from '@shopware-pwa/shopware-6-client'
import {
  ref,
  getCurrentInstance,
  onMounted,
  computed,
} from '@vue/composition-api'
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'

import SwOrderDetails from '@shopware-pwa/default-theme/components/SwOrderDetails'

export default {
  name: 'SuccessPage',
  components: {
    SfHeading,
    SwButton,
    SfIcon,
    SfDivider,
    SwOrderDetails,
  },
  data() {
    return {}
  },
  setup(params) {
    const vm = getCurrentInstance()
    const orderId = computed(() => vm.$route.query.orderId)

    return {
      orderId,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

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

  .sf-icon {
    float: left;
    margin-right: 20px;
  }
}
</style>
