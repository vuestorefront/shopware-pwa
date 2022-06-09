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
      <div v-if="getCurrentPage === 1 && orders && orders.length === 0" class="no-orders">
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
        <Order v-for="order in orders" :key="order.id" :order="order" />
      </SfTable>
      <SfPagination
        v-if="getTotalPagesCount > 1"
        class="orders__pagination"
        :current="getCurrentPage"
        :total="getTotalPagesCount"
        :visible="5"
        pageParamName="p"
        @click="
          (current) => {
            changePage(current)
          }
        "
      >
        <template #prev="{ go, prev }">
          <span
            v-show="getCurrentPage > 1"
            class="orders__pagination__prev"
            @click="go(prev)"
          >
            &lt;
          </span>
        </template>
        <template #number="{ page }">
          <button
            class="sf-button--pure sf-pagination__item sf-button"
            @click="changePage(page)"
            :class="{ current: getCurrentPage === page, first: page == 1 }"
          >
            {{ page }}
          </button>
        </template>
        <template #next="{ go, next }">
          <span
            v-show="getCurrentPage < getTotalPagesCount"
            class="orders__pagination__next"
            @click="go(next)"
          >
            &gt;
          </span>
        </template>
      </SfPagination>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs, SfTable, SfPagination } from "@storefront-ui/vue"
import { useCustomerOrders } from "@shopware-pwa/composables"
import Order from "@/components/account/orders/Order.vue"
import { ref, computed } from "@vue/composition-api"

export default {
  name: "OrderHistory",
  components: { SfTabs, SfTable, Order, SfPagination },
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
  setup() {
    const { 
      orders,
      loadOrders,
      getTotalPagesCount,
      getTotal,
      getLimit,
      getCurrentPage,
      changeCurrentPage
    } = useCustomerOrders()

    loadOrders({ page: 1 })

    const changePage = async (pageNumber) => {
      if (pageNumber > getTotalPagesCount.value) {
        return
      }
      window.scrollTo(0, 0)
      changeCurrentPage(pageNumber)
    }

    return {
      changePage,
      orders,
      getCurrentPage,
      getTotalPagesCount,
      getTotal
    }
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

.orders {
  &__header {
    font-weight: bold;
  }
  &__pagination {
    margin-top: 10px;
    justify-content: center;
    // temporary fix for pagination bug
    button.first:nth-of-type(2) {
      display: none;
    }
    &__prev, &__next {
      cursor: pointer;
    }
  }
}
</style>
