<template>
  <div class="form">
    <SwPersonalInfo>
      <template #message>
        <SfHeading
          title="1. Personal details"
          :level="2"
          class="sf-heading--left sf-heading--no-underline title"
        />
      </template>
    </SwPersonalInfo>
  </div>
</template>
<script>
import { SfAlert, SfButton, SfHeading } from '@storefront-ui/vue'
import SwPersonalInfo from '@shopware-pwa/default-theme/components/forms/SwPersonalInfo'

export default {
  name: 'ShippingAddressUserForm',
  components: {
    SfAlert,
    SfButton,
    SfHeading,
    SwPersonalInfo
  },
  setup() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';

.title {
  --heading-padding: var(--spacer-base) 0;
  @include for-desktop {
    --heading-title-font-size: var(--h3-font-size);
    --heading-padding: var(--spacer-2xl) 0 var(--spacer-base) 0;
  }
}
</style>
