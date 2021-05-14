<template>
  <div class="addresses-add">
    <SwAddressForm
      v-if="address"
      :key="address.id"
      :address="address"
      @success="returnToAddresses"
      @cancel="returnToAddresses"
    />
  </div>
</template>

<script>
import SwAddressForm from "@/components/forms/SwAddressForm.vue"
import { useUser } from "@shopware-pwa/composables"

export default {
  components: { SwAddressForm },
  data() {
    return {
      address: "",
    }
  },
  setup(props, { root }) {
    const {
      addresses,
      loadAddresses,
      country,
      loadCountry,
      salutation,
      loadSalutation,
    } = useUser(root)
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
  methods: {
    returnToAddresses() {
      this.$router.push(this.$routing.getUrl("/account/addresses"))
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.addresses-add {
  box-sizing: border-box;
  width: 100%;

  @include for-mobile {
    padding: var(--spacer-sm);
  }
}
</style>
