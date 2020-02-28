<template>
  <div class="addresses-add">
    <div v-if="address !== ''"> 
      <SwAddress :address="address"/>
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
  computed: {
    

  },
  async mounted() {
    await this.loadAddresses();
    const paramsId = this.$route.params && this.$route.params.id
    if (paramsId) {
      this.address = this.addresses.find(addr => addr.id=== paramsId)
    }
  }
}
</script>

<style lang="scss" scoped></style>
