<template>
  <SfTable class="sw-tier-prices" v-if="showTable">
    <SfTableHeading class="sw-tier-prices sw-tier-prices__heading">
      <SfTableHeader
        v-for="tableHeader in tableHeaders"
        :key="tableHeader"
        class="table__header"
      >
        {{ tableHeader }}
      </SfTableHeader>
    </SfTableHeading>
    <SfTableRow
      v-for="(price, key) in tierPrices"
      class="table__row"
      :key="key"
    >
      <SfTableData>
        {{ price.label }}
      </SfTableData>
      <SfTableData>
        {{ price.unitPrice | price }}
      </SfTableData>
    </SfTableRow>
  </SfTable>
</template>

<script>
import { SfTable } from "@storefront-ui/vue"

export default {
  components: {
    SfTable,
  },
  props: {
    tierPrices: {
      type: Array,
    },
  },
  data() {
    return {
      showTable: false,
      tableHeaders: [this.$t("Quantity"), this.$t("Unit price")],
    }
  },
  mounted() {
    this.showTable = true
  },
}
</script>

<style lang="scss" scoped>
.sw-tier-prices {
  margin-top: 20px;
  &__heading {
    .table__header {
      font-weight: bold;
    }
  }
}
</style>
