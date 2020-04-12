<template>
  <div class="form">
    <SfAlert
      type="info"
      message="TODO: implement logged user addresses management"
    />
  </div>
</template>
<script>
import { SfAlert } from '@storefront-ui/vue'

export default {
  name: 'BillingAddressUserForm',
  components: {
    SfAlert,
  },
  setup() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles';
</style>
