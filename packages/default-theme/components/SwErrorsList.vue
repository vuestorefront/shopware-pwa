<template>
  <div v-if="Array.isArray(list) && list.length" class="errors-list-component">
    <SwAlert :message="$t('Encountered problems:')" type="danger" />

    <ul class="list">
      <li v-for="message in list" :key="message" class="item">{{ message }}</li>
    </ul>
  </div>
</template>

<script>
import SwAlert from "@shopware-pwa/default-theme/components/atoms/SwAlert"

export default {
  name: "SwErrorsList",
  components: { SwAlert },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  setup(props, { root }) {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.errors-list-component {
  color: var(--_c-red-primary);
  font-size: var(--font-sm);

  .list {
    margin-top: var(--spacer-xs);
    padding-left: var(--spacer-xs);

    .item {
      list-style: inside;
    }
  }
}
</style>
