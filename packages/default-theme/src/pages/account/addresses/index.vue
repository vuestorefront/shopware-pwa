<template>
  <div class="shipping-list">
    <SfTabs v-if="listAddresses" key="address-list">
      <SfTab :title="$t('Shipping address')">
        <p class="message">
          {{
            $t(
              "Manage all the shipping addresses you want (work place, home address " +
                "...) This way you won't have to enter the shipping address manually " +
                "with each order."
            )
          }}
        </p>
        <SwAddressList @editAddress="editAddress" />
        <SwButton class="action-button" @click="changeAddress">
          {{ $t("Add new address") }}
        </SwButton>
      </SfTab>
    </SfTabs>

    <SfTabs v-else>
      <SfTab :title="$t('Add address')">
        <nuxt-child />
      </SfTab>
    </SfTabs>
  </div>
</template>

<script>
import SwAddressList from "@/components/SwAddressList.vue"
import SwButton from "@/components/atoms/SwButton.vue"
import { SfTabs } from "@storefront-ui/vue"
export default {
  name: "MyAddresses",
  components: {
    SfTabs,
    SwButton,
    SwAddressList,
  },
  data() {
    return {
      listAddresses: true,
    }
  },
  watch: {
    $route: {
      deep: true,
      handler(from, to) {
        this.listAddresses = !this.listAddresses
      },
    },
  },
  methods: {
    changeAddress() {
      this.$router.push(this.$routing.getUrl("/account/addresses/add"))
    },
    editAddress(addressId) {
      this.$router.push(
        this.$routing.getUrl(`/account/addresses/add/${addressId}`)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.shipping-list {
  margin-bottom: var(--spacer-xl);
  width: 100%;
}
</style>
