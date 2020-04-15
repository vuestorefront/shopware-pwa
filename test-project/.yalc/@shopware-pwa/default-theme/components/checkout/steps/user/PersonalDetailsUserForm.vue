<template>
  <div class="form">
    <SfAlert
      type="info"
      message="TODO: implement here update form for personal details like in MyAccount"
    />
    <SfButton
      class="sf-button--full-width form__action-button"
      @click="$emit('proceed')"
      >Continue to shipping</SfButton
    >
  </div>
</template>
<script>
import { SfAlert, SfButton } from '@storefront-ui/vue'

export default {
  name: 'ShippingAddressUserForm',
  components: {
    SfAlert,
    SfButton,
  },
  setup() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
