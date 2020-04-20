<template>
  <CmsGenericComponent
    v-if="getContent"
    :content="getContent"
    class="cms-block-default"
  />
</template>

<script>
import CmsGenericComponent from 'sw-cms/CmsGenericComponent'

export default {
  components: {
    CmsGenericComponent,
  },
  name: 'CmsBlockDefault',
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

.cms-block-default {
  @include desktop-size;
}
</style>
