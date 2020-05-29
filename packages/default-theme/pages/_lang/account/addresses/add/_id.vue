<template>
  <div class="addresses-add">
    <div v-if="address !== ''">
      <SwAddress :address="address" />
    </div>
  </div>
</template>

<script>
import SwAddress from "@shopware-pwa/default-theme/components/forms/SwAddress.vue"
import { useUser } from "@shopware-pwa/composables"

export default {
  components: { SwAddress },
  data() {
    return {
      address: "",
    }
  },
  setup() {
    const {
      addresses,
      loadAddresses,
      country,
      loadCountry,
      salutation,
      loadSalutation,
    } = useUser()
    return {
      loadAddresses,
      addresses,
      loadCountry,
      country,
      loadSalutation,
      salutation,
    }
  },
  async mounted() {
    await this.loadAddresses()
    const paramsId = this.$route.params && this.$route.params.id
    if (paramsId) {
      const address = this.addresses.find((addr) => addr.id === paramsId)
      await this.loadCountry(address.countryId)
      await this.loadSalutation(address.salutationId)

      this.address = {
        ...address,
        country: this.country && this.country.data,
        salutation: this.salutation && this.salutation.data,
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>
