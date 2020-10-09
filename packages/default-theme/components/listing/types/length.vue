<template>
  <entity v-bind="{ ...$props, ...$attrs }" v-on="$listeners" />
</template>
<script>
import Entity from "@/components/listing/types/entity"

export default {
  components: {
    Entity,
  },
}
</script>
