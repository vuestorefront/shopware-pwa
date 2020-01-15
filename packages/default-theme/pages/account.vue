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
              <SfTab title="Active shipping address">
                <Address :key="activeShippingAddress.id" :address="activeShippingAddress"/>
              </SfTab>
              <SfTab title="Active billing address">
                <Address :key="activeBillingAddress.id" :address="activeBillingAddress"/>
              </SfTab>
              <SfTab title="All addresses">
                <Address v-for="address in allAddresses" :key="address.id" :address="address"/>
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
    const { logout, user, getAddresses, loadOrders, orders } = useUser()
    return { logout, user, getAddresses, loadOrders, orders }
  },
  data() {
    return {
      activePage: "My profile",
      allAddresses: []
    }
  },
  computed: {
    activeBillingAddress() {
      return this.user && this.user && this.user.activeBillingAddress || {}
    },
    activeShippingAddress() {
      return this.user && this.user && this.user.activeShippingAddress || {}
    },
  },
  async mounted() {
    this.allAddresses = await this.getAddresses()
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
