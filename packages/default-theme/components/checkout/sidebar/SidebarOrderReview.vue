<template>
  <div class="review">
    <SfHeading
      title="Order review"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <PersonalDetailsSummary class="content" @click:edit="$emit('click:edit', 0)" />
    <ShippingAddressSummary class="content" @click:edit="$emit('click:edit', 1)" />
    <BillingAddressSummary class="content" @click:edit="$emit('click:edit', 2)" />
    <PaymentMethodSummary class="content" @click:edit="$emit('click:edit', 3)" />
    <div class="promo-code">
      <SfInput
        v-model="promoCode"
        name="promoCode"
        label="Enter promo code"
        class="sf-input--filled promo-code__input"
      />
      <SfCircleIcon class="promo-code__circle-icon" icon="check" />
    </div>
    <div class="characteristics">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristics__item"
      />
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfInput,
  SfCircleIcon,
  SfCharacteristic,
} from '@storefront-ui/vue'
import PersonalDetailsSummary from '@shopware-pwa/default-theme/components/checkout/summary/PersonalDetailsSummary'
import ShippingAddressSummary from '@shopware-pwa/default-theme/components/checkout/summary/ShippingAddressSummary'
import BillingAddressSummary from '@shopware-pwa/default-theme/components/checkout/summary/BillingAddressSummary'
import PaymentMethodSummary from '@shopware-pwa/default-theme/components/checkout/summary/PaymentMethodSummary'

export default {
  name: 'SidebarOrderReview',
  components: {
    SfHeading,
    SfInput,
    SfCircleIcon,
    SfCharacteristic,
    PersonalDetailsSummary,
    ShippingAddressSummary,
    BillingAddressSummary,
    PaymentMethodSummary,
  },
  data() {
    return {
      promoCode: "",
      characteristics: [
        {
          title: 'Safety',
          description: 'It carefully packaged with a personal touch',
          icon: 'safety',
        },
        {
          title: 'Easy shipping',
          description:
            'You’ll receive dispatch confirmation and an arrival date',
          icon: 'shipping',
        },
        {
          title: 'Changed your mind?',
          description: 'Rest assured, we offer free returns within 30 days',
          icon: 'return',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables';

.review {
  box-sizing: border-box;
  width: 100%;
  background-color: #f1f2f3;
  padding: var(--spacer-xl);
  margin-bottom: var(--spacer-base);
  &:last-child {
    margin-bottom: 0;
  }
}
.title {
  margin-bottom: var(--spacer-xl);
}
.content {
  margin: 0 0 var(--spacer-base) 0;
}
.characteristics {
  margin: 0 0 0 var(--spacer-xs);
  &__item {
    margin: var(--spacer-base) 0;
  }
}
.promo-code {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--spacer-lg) 0 var(--spacer-base) 0;
  &__circle-icon {
    --button-size: 2rem;
    --icon-size: 0.6875rem;
  }
  &__input {
    --input-background: var(--c-white);
    flex: 1;
    margin: 0 var(--spacer-lg) 0 0;
  }
}
</style>
