<template>
  <div class="sw-sidebar">
    <SwGenericBlock
      v-for="block in content.blocks"
      :key="block.id"
      :content="block"
      :class="getClasses(block)"
    />
  </div>
</template>

<script>
import SwGenericBlock from '../elements/SwGenericBlock'

export default {
  name: 'SwSidebar',
  components: {
    SwGenericBlock,
  },
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    getClasses(block) {
      return {
        'sw-sidebar__main': block.sectionPosition === 'main',
        'sw-sidebar__sidebar': block.sectionPosition === 'sidebar',
      }
    },
  },
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.sw-sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;

  @include for-desktop {
    flex-direction: row;
    &__main {
      width: 67%;
      margin: 0 1rem;
    }
    &__sidebar {
      width: 33%;
    }
  }
}
</style>
