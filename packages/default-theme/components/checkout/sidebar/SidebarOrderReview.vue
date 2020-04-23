<template>
  <div>
    <div class="highlighted">
      <SfHeading
        title="Order review"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <div class="highlighted__header">
        <h3 class="highlighted__title">Personal details</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 0)"
          >Edit</SfButton
        >
      </div>
      <PersonalDetailsSummary @click:edit="$emit('click:edit', 0)" />
    </div>
    <div class="highlighted">
      <div class="highlighted__header">
        <h3 class="highlighted__title">Shipping details</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 1)"
          >Edit</SfButton
        >
      </div>
      <ShippingAddressSummary @click:edit="$emit('click:edit', 1)" />
    </div>
    <div class="highlighted">
      <div class="highlighted__header">
        <h3 class="highlighted__title">Billing address</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 2)"
          >Edit</SfButton
        >
      </div>
      <BillingAddressSummary @click:edit="$emit('click:edit', 2)" />
    </div>
    <div class="highlighted">
      <div class="highlighted__header">
        <h3 class="highlighted__title">Payment method</h3>
        <SfButton class="sf-button--text" @click="$emit('click:edit', 2)"
          >Edit</SfButton
        >
      </div>
      <PaymentMethodSummary @click:edit="$emit('click:edit', 3)" />
    </div>
  </div>
</template>
<script>
import { SfHeading, SfButton } from '@storefront-ui/vue'
import PersonalDetailsSummary from '@shopware-pwa/default-theme/components/checkout/summary/PersonalDetailsSummary'
import ShippingAddressSummary from '@shopware-pwa/default-theme/components/checkout/summary/ShippingAddressSummary'
import BillingAddressSummary from '@shopware-pwa/default-theme/components/checkout/summary/BillingAddressSummary'
import PaymentMethodSummary from '@shopware-pwa/default-theme/components/checkout/summary/PaymentMethodSummary'

export default {
  name: 'SidebarOrderReview',
  components: {
    SfHeading,
    SfButton,
    PersonalDetailsSummary,
    ShippingAddressSummary,
    BillingAddressSummary,
    PaymentMethodSummary,
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

#checkout {
  margin: none;
  @include for-desktop {
    margin: none;
  }
}

.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: #f1f2f3;
  padding: var(--spacer-xl);
  margin-bottom: var(--spacer-base);
  &:last-child {
    margin-bottom: 0;
  }
  &--total {
    margin-bottom: 1px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacer-base);
  }
  &__title {
    font-family: var(--font-family-primary);
    font-size: var(--font-lg);
    line-height: 1.6;
  }
}
.title {
  margin-bottom: var(--spacer-xl);
}
.content {
  margin: 0 0 var(--spacer-base) 0;
  color: var(--c-text);
  font-size: var(--font-xs);
  font-weight: 300;
  line-height: 1.6;
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: 400;
  }
}
</style>
