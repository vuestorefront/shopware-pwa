<template>
  <div class="shipping-list">
    <SfTabs :open-tab="1">
    <SfTab title="Shipping list">
    </SfTab>
    <SfTab title="Add address">
      <nuxt-child/>
    </SfTab>
    </SfTabs>
  </div>
</template>
<script>
import {
  SfProperty,
  SfTabs,
  SfList,
  SfButton,
  SfIcon,
  SfBadge,
  SfCheckbox
} from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import Address from '@/components/account/MyAddresses/Address'

export default {
  name: 'MyAddresses',
  components: {
    SfProperty,
    SfTabs,
  },
  data() {
    return {
      listAddresses: true,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.shipping-list {
  margin-bottom: $spacer-extra-big;
  width: 100%;
}
</style>
