<template>
  <SfTabs :open-tab="1">
    <SfTab :title="$t('My orders')">
      <p class="message">
        {{
          $t(
            "Check the details and status of your orders in the online store. You can " +
              "also cancel your order or request a return."
          )
        }}
      </p>
      <div v-if="orders && orders.length === 0" class="no-orders">
        <p class="no-orders__title">{{ $t("You currently have no orders") }}</p>
        <p class="no-orders__content">{{ $t("Start shopping!") }}</p>
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
import Order from "@/components/account/orders/Order.vue"

export default {
  name: "OrderHistory",
  components: { SfTabs, SfTable, Order },
  props: {},
  data() {
    return {
      listOrders: true,
      tableHeaders: [
        this.$t("Order no."),
        this.$t("Total amount"),
        this.$t("Order date"),
        this.$t("Status"),
        " ",
      ],
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

.orders .orders__header {
  font-weight: bold;
}
</style>
