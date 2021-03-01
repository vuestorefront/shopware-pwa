<template>
  <SwAddress :address="billingAddress" :address-title="$t('Billing address')">
    <template #after-content>
      <SwButton
        class="sf-button--text review__edit"
        @click="$emit('click:edit', 2)"
      >
        {{ $t("Edit") }}
      </SwButton>
    </template>
  </SwAddress>
</template>
<script>
import { useCheckout } from "@shopware-pwa/composables"
import SwAddress from "@/components/SwAddress.vue"
import SwButton from "@/components/atoms/SwButton.vue"

export default {
  name: "BillingAddressSummary",
  components: {
    SwAddress,
    SwButton,
  },
  setup(props, { root }) {
    const { billingAddress } = useCheckout(root)
    return {
      billingAddress,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";
.review {
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: var(--spacer-base);
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__title {
    font-size: var(--font-sm);
    margin-bottom: var(--spacer-sm);
    color: var(--c-text);
  }
  &__content {
    font-size: var(--font-xs);
  }
}
.content {
  margin: 0;
  color: var(--c-text-muted);
}
</style>
