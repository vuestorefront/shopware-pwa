<template>
  <CmsGenericComponent
    v-if="getContent"
    :content="getContent"
    class="cms-block-category-navigation"
  />
</template>

<script>
import CmsGenericComponent from 'sw-cms/CmsGenericComponent'

export default {
  components: {
    CmsGenericComponent,
  },
  name: 'CmsBlockCategoryNavigation',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    getSlots() {
      return this.content.slots || []
    },
    getContent() {
      return this.getSlots.length && this.getSlots[0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../settings.scss';

.cms-block-category-navigation {
  @include desktop-size;

  @include for-desktop {
    margin-top: 20px;
  }
}
</style>
