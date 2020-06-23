<template>
  <div class="personal-details-user-form">
    <SwPersonalInfo>
      <template #message>
        <SfHeading
          title="1. Personal details"
          :level="2"
          class="sf-heading--left sf-heading--no-underline title"
        />
      </template>
    </SwPersonalInfo>
    <SwButton
      class="personal-details-user-form__proceed"
      @click="$emit('proceed')"
    >
      Continue to shipping
    </SwButton>
  </div>
</template>
<script>
import { SfHeading } from "@storefront-ui/vue"
import SwPersonalInfo from "@shopware-pwa/default-theme/components/forms/SwPersonalInfo"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"

export default {
  name: "ShippingAddressUserForm",
  components: {
    SwButton,
    SfHeading,
    SwPersonalInfo,
  },
  setup(props, {root}) {
    return {}
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.personal-details-user-form {
  &__proceed {
    margin-top: 1rem;
  }
}

.title {
  --heading-padding: var(--spacer-base) 0;
  @include for-desktop {
    --heading-title-font-size: var(--h3-font-size);
    --heading-padding: var(--spacer-2xl) 0 var(--spacer-base) 0;
  }
}
</style>
