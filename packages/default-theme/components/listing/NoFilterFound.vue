<template>
  <SfAlert type="danger">
    <template #message>
      <span class="sf-alert__message">
        Filter
        <b>
          {{ filter.label }}
        </b>
        is not implemented! Please add new filter to
        `src/components/listing/types/{{ filter.label }}.vue`
      </span>
    </template>
  </SfAlert>
</template>

<script>
import { SfAlert } from "@storefront-ui/vue"

export default {
  components: {
    SfAlert,
  },
  name: "NoFilterFound",
  data() {
    return {}
  },
  props: {
    filter: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
