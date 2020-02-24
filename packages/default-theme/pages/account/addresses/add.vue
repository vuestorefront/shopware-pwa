<template>
  <div class="addresses-add">
    <div v-if="address.length > 0">
      <SwAddress 
        :address="address[0]"
      />
    </div>
    <div v-else>
      <SwAddress/>
    </div>
  </div>
</template>

<script>
import SwAddress from '@/components/forms/SwAddress'
import { useUser } from '@shopware-pwa/composables'

export default {
  components: { SwAddress },
  data() {
    return {
      address: ''
    }
  },
  setup() {
    const { addresses, loadAddresses } = useUser()
    return {
      loadAddresses,
      addresses
    }
  },
  async mounted() {
    await this.loadAddresses();
    const paramsId = this.$route.params && this.$route.params.id
    if (paramsId) {
      this.address = this.addresses.filter(addr => addr.id=== paramsId)
    }
  }
}
</script>

<style lang="scss" scoped></style>
