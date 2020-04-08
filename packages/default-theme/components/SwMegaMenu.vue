<template>
    <SfMegaMenu :visible="category.name === hoveredItem" :title="category.name" class="sw-mega-menu">
      <nuxt-link class="sf-header__link" 
        v-for="subcategory in category.children" 
        :key="subcategory.name" 
        :to="`/${subcategory.route.path}`"
      >
        <SfMegaMenuColumn 
          :title="subcategory.name"
        />
      </nuxt-link>
    </SfMegaMenu>
</template>

<script>
import { SfMegaMenu, SfMenuItem } from '@storefront-ui/vue'

export default {
  name: 'SwMegaMenu',
  components: { SfMegaMenu, SfMenuItem },
  props: {
    category: {
      type: Object,
      required: true
    },
    hoveredItem: {
      type: String,
      default: ''
    }
  },
};

</script>

<style lang="scss" scoped>
.sw-mega-menu {
  position: absolute;
  left: 0;
  width: 100%;
  top: 100%;
}
</style>
