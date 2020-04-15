<template>
    <SfMegaMenu :visible="category.name === hoveredItem" :title="category.name" class="sw-mega-menu">
      <nuxt-link class="sf-header__link" 
        v-for="subcategory in category.children" 
        :key="subcategory.name" 
        :to="path(subcategory)"
      >
        <SfMegaMenuColumn 
          :title="subcategory.name"
        >
          <SfList>
            <SfListItem 
              v-for="child in subcategory.children" 
              :key="child.label">
              <nuxt-link class="sf-header__link" 
                :to="path(child)"
              >   
                <SfMenuItem
                  :label="child.label" 
                />
              </nuxt-link>  
            </SfListItem>
          </SfList>
        </SfMegaMenuColumn>
      </nuxt-link>
    </SfMegaMenu>
</template>

<script>
import { SfMegaMenu, SfMenuItem } from '@storefront-ui/vue'
import helpers from '@shopware-pwa/default-theme/helpers'

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
  setup() {
    return {path: helpers.getCategoryRoutePath}
  }
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
