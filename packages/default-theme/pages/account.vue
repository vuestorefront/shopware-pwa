<template>
  <div class="my-account">
    <SfContentPages 
        title="My account"
        :active="activePage"
        @click:change="updateActivePage"
      >
        <SfContentCategory title="Personal Details">
          <SfContentPage title="My profile">
            <MyProfile />
          </SfContentPage>
          <SfContentPage title="My addresses">
            <SfTabs :open-tab="1">
              <MyAddresses />
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
  </div>
</template>
<script>
import { SfContentPages, SfTabs, SfList } from "@storefront-ui/vue"
import { useUser } from "@shopware-pwa/composables"
import { PAGE_LOGIN } from '../helpers/pages'

import MyProfile  from "../components/account/MyProfile"
import MyAddresses from "../components/account/MyAddresses"
import OrderHistory from "../components/account/OrderHistory"

export default {
  name: 'Account',
  components: { OrderHistory, SfContentPages, SfTabs, MyProfile, SfList, MyAddresses },
  middleware: "auth",
  setup() {
    const { logout, user, loadOrders, orders } = useUser()
    return { logout, user, loadOrders, orders }
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
  // async mounted() {
  //   this.allAddresses = await this.getAddresses()
  // },
  methods: {
    async updateActivePage(title) {
        if (title === "Logout") {
          await this.logout();
          this.$router.push(PAGE_LOGIN)
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
