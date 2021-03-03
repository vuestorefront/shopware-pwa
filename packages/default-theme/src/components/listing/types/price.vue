<template>
  <Range v-bind="{ ...$props, ...$attrs }" v-on="$listeners" />
</template>
<script>
import Range from "@/components/listing/types/range.vue"

export default {
  components: {
    Range,
  },
}
</script>
