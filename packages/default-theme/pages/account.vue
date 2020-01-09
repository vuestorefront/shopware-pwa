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
                <SfList>
                  {{activeShippingAddress.id}}
                  <hr/>
                  <SfListItem>name: {{ activeShippingAddress.firstName }} {{ activeShippingAddress.lastName }} </SfListItem>
                  <SfListItem>street: {{ activeShippingAddress.street }}</SfListItem>
                  <SfListItem>city: {{ activeShippingAddress.city }}</SfListItem>
                  <SfListItem>zipcode: {{ activeShippingAddress.zipcode }} </SfListItem>
                  <SfListItem>country: {{ activeShippingAddress.country.name }} </SfListItem>
                </SfList>
              </SfTab>
              <SfTab title="Billing address">
                <SfList>
                  {{activeBillingAddress.id}}
                  <hr/>
                  <SfListItem>name: {{ activeBillingAddress.firstName }} {{ activeShippingAddress.lastName }} </SfListItem>
                  <SfListItem>street: {{ activeBillingAddress.street }}</SfListItem>
                  <SfListItem>city: {{ activeBillingAddress.city }}</SfListItem>
                  <SfListItem>zipcode: {{ activeBillingAddress.zipcode }} </SfListItem>
                  <SfListItem>country: {{ activeBillingAddress.country ? activeBillingAddress.country.name : "" }} </SfListItem>
                </SfList>
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
          <SfContentPage :title="`Order history (${user.orderCount})`">
            <SfList v-for="order in orders" :key="order.id">
              <SfListItem><strong>{{order.orderNumber}}</strong></SfListItem>
              <SfListItem>total: {{ order.amountTotal }}</SfListItem>
              <SfListItem>status: {{ order.stateMachineState.name }}</SfListItem>
              <SfListItem>orderDateTime: {{ order.orderDateTime }}</SfListItem>
              <SfListItem>shippingCosts: {{ order.shippingCosts.totalPrice }}</SfListItem>
              <hr/>
            </SfList>
          </SfContentPage>
        </SfContentCategory>
        <SfContentPage title="Logout"></SfContentPage>
      </SfContentPages>
</template>
<script>
import { SfContentPages, SfTabs, SfList } from "@storefront-ui/vue"
import { useUser } from "@shopware-pwa/composables"
import MyProfile  from "../components/account/MyProfile"
export default {
  name: 'Account',
  components: { SfContentPages, SfTabs, MyProfile, SfList },
  middleware: "auth",
  setup() {
    const { logout, user, orders, loadOrders } = useUser()
    loadOrders();
    return { logout, user, orders }
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
