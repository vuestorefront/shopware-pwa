<template>
  <SwPluginSlot :slot-context="product">
    <p v-if="isMounted" class="product-description" v-html="description" />
  </SwPluginSlot>
</template>

<script>
import { computed, onMounted, ref } from "@vue/composition-api"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"

export default {
  name: "SwProductDescription",
  components: {
    SwPluginSlot,
  },
  props: {
    product: {
      type: Object,
    },
  },
  setup(props, { root }) {
    const isMounted = ref(false)

    const description = computed(
      () => props.product?.translated?.description || props.product?.description
    )

    onMounted(() => {
      isMounted.value = true
    })

    return {
      description,
      isMounted,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.product-description {
  margin: var(--spacer-xl) 0;
  font-family: var(--font-family--secondary);
  font-size: var(--font-size--sm);
}
</style>
