<template>
  <SfContentPages 
        title="My account"
        :active="activePage"
        @click:change="updateActivePage"
      >
        <SfContentCategory title="Personal Details">
          <SfContentPage title="My profile">
            <MyProfile />
          </SfContentPage>
          <SfContentPage title="Shipping details">
            <SfTabs :open-tab="1">
              <SfTab title="Shipping address">
                <Address :address="activeShippingAddress"/>
              </SfTab>
              <SfTab title="Billing address">
                <Address :address="activeBillingAddress"/>
              </SfTab>
            </SfTabs>
          </SfContentPage>
          <SfContentPage title="My newsletter">
            <SfTabs :open-tab="1">
              <SfTab title="My newsletter">
              </SfTab>
            </SfTabs>
          </SfContentPage>
        </SfContentCategory>
        <SfContentCategory title="Order details">
          <SfContentPage :title="`Order history (${user && user.orderCount})`">
            <OrderHistory />
          </SfContentPage>
        </SfContentCategory>
        <SfContentPage title="Logout"></SfContentPage>
      </SfContentPages>
</template>
<script>
import { SfContentPages, SfTabs, SfList } from "@storefront-ui/vue"
import { useUser } from "@shopware-pwa/composables"
import MyProfile  from "../components/account/MyProfile"
import Address from "../components/account/Address"
import OrderHistory from "../components/account/OrderHistory"
export default {
  name: 'Account',
  components: { OrderHistory, SfContentPages, SfTabs, MyProfile, SfList, Address },
  middleware: "auth",
  setup() {
    const { logout, user } = useUser()
    return { logout, user }
  },
  data() {
    return {
      activePage: "My profile"
    }
  },
  computed: {
    activeBillingAddress() {
      return this.user && this.user && this.user.activeBillingAddress || {}
    },
    activeShippingAddress() {
      return this.user && this.user && this.user.activeShippingAddress || {}
    }
  },
  methods: {
    async updateActivePage(title) {
        if (title === "Logout") {
          await this.logout();
          this.$router.push("/login")
        }
        this.activePage = title;
      }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

</style>
