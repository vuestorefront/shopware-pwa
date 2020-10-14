<template>
  <Range v-bind="{ ...$props, ...$attrs }" v-on="$listeners" />
</template>
<script>
import Range from "@/components/listing/types/range"

export default {
  components: {
    Range,
  },
}
</script>
