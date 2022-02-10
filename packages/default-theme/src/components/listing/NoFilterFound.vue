<template>
  <SfAlert type="danger">
    <template #message>
      <span class="sf-alert__message">
        {{ $t("Filter") }} {{ $t("for property") }}
        <b>
          {{ filterLabel }}
        </b>
        {{ $t("is not implemented! Please add new filter to") }}
        `src/components/listing/types/<b>{{ filterCode }}</b
        >.vue` or `src/components/listing/types/<b>{{ displayTypeCode }}</b
        >.vue` as generic one for type <b>{{ displayTypeCode }}</b>
      </span>
    </template>
  </SfAlert>
</template>

<script>
import { SfAlert } from "@storefront-ui/vue"
import { simplifyString } from "@/helpers"

export default {
  components: {
    SfAlert,
  },
  name: "NoFilterFound",
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    filterLabel() {
      return this.filter.label
    },
    filterCode() {
      return simplifyString(this.filter.label)
    },
    displayTypeCode() {
      return this.filter?.displayType
    },
  },
}
</script>
