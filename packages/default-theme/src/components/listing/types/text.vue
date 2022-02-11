<template>
  <entity v-bind="{ ...$props, ...$attrs }" v-on="$listeners" />
</template>
<script>
import Entity from "@/components/listing/types/entity.vue"

export default {
  components: {
    Entity,
  },
}
</script>
