<template>
  <SwCheckoutMethod :method="paymentMethod" :label="$t('Payment method')">
    <!-- <template #after-content>
      <SwButton
        class="sf-button--text review__edit"
        @click="$emit('click:edit', 2)"
      >
        {{ $t("Edit") }}
      </SwButton>
    </template> -->
  </SwCheckoutMethod>
</template>
<script lang="ts">
// import SwButton from "@/components/atoms/SwButton.vue"
import { useSessionContext } from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"
import SwCheckoutMethod from "@/components/SwCheckoutMethod.vue"
export default {
  name: "PaymentMethodSummary",
  components: {
    SwCheckoutMethod,
    // SwButton,
  },
  setup(props, { root }) {
    const { sessionContext } = useSessionContext(root)
    const paymentMethod = computed(() => sessionContext.value.paymentMethod)
    return {
      paymentMethod,
      sessionContext,
    }
  },
}
</script>
<style lang="scss" scoped></style>
