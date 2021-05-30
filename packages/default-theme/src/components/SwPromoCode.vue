<template>
  <div class="promo-code">
    <div class="promo-code__input-wrapper">
      <SwInput
        v-model="promoCode"
        name="promoCode"
        :label="$t('Enter promo code')"
        class="sf-input--filled promo-code__input"
        @keyup.enter="addPromotionCode(promoCode)"
      />
      <SfCircleIcon
        class="promo-code__circle-icon"
        icon="check"
        @click="addPromotionCode(promoCode)"
      />
    </div>
    <div v-if="showPromotionCodes" class="applied-codes">
      <SfHeading
        :title="$t('Applied promo codes:')"
        :level="4"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <ul class="applied-codes__list">
        <SwPromoCodeItem
          v-for="appliedPromotionCode in appliedPromotionCodes"
          :key="appliedPromotionCode.id"
          :code="appliedPromotionCode"
          @remove="removeItem(appliedPromotionCode)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import SwInput from "@/components/atoms/SwInput.vue"
import { SfCircleIcon, SfHeading } from "@storefront-ui/vue"
import SwPromoCodeItem from "@/components/SwPromoCodeItem.vue"
import { useCart } from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"

export default {
  name: "SwPromoCode",
  setup(props, { root }) {
    const { appliedPromotionCodes, addPromotionCode, removeItem } =
      useCart(root)

    const showPromotionCodes = computed(
      () => appliedPromotionCodes.value.length > 0
    )

    return {
      appliedPromotionCodes,
      addPromotionCode,
      removeItem,
      showPromotionCodes,
    }
  },
  components: {
    SwPromoCodeItem,
    SfHeading,
    SwInput,
    SfCircleIcon,
  },
  data: () => {
    return {
      promoCode: "",
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.promo-code {
  padding: var(--spacer-lg) 0 var(--spacer-base) 0;
  &__input-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .promo-code__circle-icon {
      --button-size: 2rem;
    }

    .promo-code__input {
      --input-background: var(--c-white);
      flex: 1;
      margin: 0 var(--spacer-lg) 0 0;
    }
  }
  .applied-codes {
    &__list {
      list-style: none;
      padding: 0;
    }
  }
}
</style>
