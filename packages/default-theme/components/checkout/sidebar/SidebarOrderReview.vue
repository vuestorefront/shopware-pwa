<template>
  <div class="review">
    <SfHeading
      :title="$t('Order review')"
      :level="3"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <PersonalDetailsSummary
      class="content"
      data-cy="name"
      @click:edit="$emit('click:edit', 0)"
    />
    <ShippingAddressSummary
      class="content"
      data-cy="shipping"
      @click:edit="$emit('click:edit', 1)"
    />
    <BillingAddressSummary
      class="content"
      data-cy="billing"
      @click:edit="$emit('click:edit', 2)"
    />
    <PaymentMethodSummary
      class="content"
      @click:edit="$emit('click:edit', 3)"
    />
    <div class="promo-code">
      <SwInput
        v-model="promoCode"
        name="promoCode"
        :label="$t('Enter promo code')"
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
import { SfHeading, SfCircleIcon, SfCharacteristic } from "@storefront-ui/vue"
import PersonalDetailsSummary from "@/components/checkout/summary/PersonalDetailsSummary"
import ShippingAddressSummary from "@/components/checkout/summary/ShippingAddressSummary"
import BillingAddressSummary from "@/components/checkout/summary/BillingAddressSummary"
import PaymentMethodSummary from "@/components/checkout/summary/PaymentMethodSummary"
import SwInput from "@/components/atoms/SwInput"

export default {
  name: "SidebarOrderReview",
  components: {
    SfHeading,
    SwInput,
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
          title: this.$t("Safety"),
          description: this.$t("It carefully packaged with a personal touch"),
          icon: "safety",
        },
        {
          title: this.$t("Easy shipping"),
          description: this.$t(
            "You'll receive dispatch confirmation and an arrival date"
          ),
          icon: "shipping",
        },
        {
          title: this.$t("Changed your mind?"),
          description: this.$t(
            "Rest assured, we offer free returns within 30 days"
          ),
          icon: "return",
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

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
