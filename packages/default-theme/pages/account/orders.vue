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
          class="orders__header"
            v-for="tableHeader in tableHeaders"
            :key="tableHeader"
            >{{ tableHeader }}</SfTableHeader
          >
        </SfTableHeading>
        <!-- consider making SfTableRow public (not internal component) to split it down to smaller components. -->
        <SfTableRow v-for="order in orderList" :key="order[0]">
          <SfTableData class="orders__data" v-for="(data, key) in order" :key="key">
            <template v-if="key === 3"
              ><!-- order status -->
              <span
                :class="{
                  'text-success': data === 'Closed',
                  'text-info': data === 'Open',
                }"
                >{{ data }}</span
              >
            </template>
            <template v-else-if="key === 2"
              ><!-- order date -->
              {{ formatDate(data) }}
            </template>
            <template v-else-if="key === 1"
              ><!-- total amount -->
              {{ formatPrice(data) }}
            </template>
            <template v-else>{{ data }}</template>
          </SfTableData>
          <!-- <SfTableData class="orders__view">
            <SfButton class="sf-button--text mobile-only">Download</SfButton>
            <SfButton class="sf-button--text desktop-only">VIEW</SfButton>
          </SfTableData> -->
        </SfTableRow>
      </SfTable>
    </SfTab>
  </SfTabs>
</template>
<script>
import {
  SfTabs,
  SfList,
  SfDivider,
  SfTable,
  SfButton,
} from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import helpers from '../../helpers'

export default {
  name: 'OrderHistory',
  components: { SfTabs, SfList, SfDivider, SfTable, SfButton },
  props: {},
  data() {
    return {
      tableHeaders: ['Order no.', 'Total amount', 'Order date', 'Status'],
    }
  },
  setup() {
    const { orders, loadOrders } = useUser()
    loadOrders()
    return {
      orders,
    }
  },
  computed: {
    orderList() {
      return (
        this.orders &&
        this.orders.map(
          ({ orderNumber, amountTotal, orderDateTime, stateMachineState }) => [
            orderNumber,
            amountTotal,
            orderDateTime,
            stateMachineState.name,
          ]
        )
      )
    },
  },
  methods: {
    formatDate(date) {
      return helpers.formatDate(date)
    },
    formatPrice(price) {
      return helpers.formatPrice(price)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
.message {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-dark-variant);
}

</style>
