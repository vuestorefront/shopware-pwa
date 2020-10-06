<template>
  <SfTabs :open-tab="1">
    <SfTab title="My orders">
      <p class="message">
        Check the details and status of your orders in the online store. You can
        also cancel your order or request a return.
      </p>
      <div v-if="orders && orders.length === 0" class="no-orders">
        <p class="no-orders__title">You currently have no orders</p>
        <p class="no-orders__content">Start shopping!</p>
      </div>
      <SfTable v-else class="orders">
        <SfTableHeading>
          <SfTableHeader
            v-for="tableHeader in tableHeaders"
            :key="tableHeader"
            class="orders__header"
            >{{ tableHeader }}</SfTableHeader
          >
        </SfTableHeading>
        <!-- consider making SfTableRow public (not internal component) to split it down to smaller components. -->
        <Order v-for="order in orderList" :key="order.id" :order="order" />
      </SfTable>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs, SfTable } from "@storefront-ui/vue"
import { useUser } from "@shopware-pwa/composables"
import Order from "@/components/account/orders/Order"

export default {
  name: "OrderHistory",
  components: { SfTabs, SfTable, Order },
  props: {},
  data() {
    return {
      listOrders: true,
      tableHeaders: ["Order no.", "Total amount", "Order date", "Status", " "],
    }
  },
  setup(props, { root }) {
    const { orders, loadOrders } = useUser(root)
    loadOrders()
    return {
      orders,
    }
  },
  computed: {
    orderList() {
      return this.orders
    },
  },
}
</script>

<style lang="scss" scoped>
.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
}

.sf-table.orders:hover {
  &__row {
    --table-row-box-shadow: none;
  }
}
</style>
