<template>
  <div :key="$route.fullPath" class="order-page">
    <SfHeading
      :title="$t('Thank you')"
      :subtitle="$t('for shopping with us!')"
      class="order-page__heading"
    />
    <SfDivider />
    <SwOrderDetails :order-id="orderId" />
    <SwButton @click="$router.push($routing.getUrl('/'))">
      <SfIcon icon="chevron_left" color="white" size="20px" />
      {{ $t("Return to homepage") }}
    </SwButton>
  </div>
</template>
<script>
import { SfHeading, SfIcon, SfDivider } from "@storefront-ui/vue"
import { computed } from "@vue/composition-api"
import SwButton from "@/components/atoms/SwButton"

import SwOrderDetails from "@/components/SwOrderDetails"

export default {
  name: "OrderPage",
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
  setup(params, { root }) {
    const orderId = computed(() => root.$route.query.orderId)

    return {
      orderId,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.order-page {
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
