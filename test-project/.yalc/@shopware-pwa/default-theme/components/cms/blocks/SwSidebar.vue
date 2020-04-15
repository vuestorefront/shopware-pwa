<template>
  <div class="sw-sidebar">
    <SwGenericBlock
      v-for="block in content.blocks"
      :key="block.id"
      :content="block"
      :class="{
        'sw-sidebar__main': block.sectionPosition === 'main',
        'sw-sidebar__sidebar': block.sectionPosition === 'sidebar',
      }"
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
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.sw-sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__main {
    width: 75%;
  }
  &__sidebar {
    width: 25%;
  }

  @include for-desktop {
    flex-direction: row;
    // flex-grow: 1;
    // justify-content: space-around;
    // align-items: center;
  }
}
</style>
