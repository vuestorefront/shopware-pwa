<template>
  <div class="sw-bottom-navigation">
    <SfBottomNavigation>
      <nuxt-link to="/">
        <SfBottomNavigationItem>
          <SfIcon icon="home" size="20px" />
        </SfBottomNavigationItem>
      </nuxt-link>
      <SfBottomNavigationItem class="menu-button">
        <SfIcon icon="menu" size="20px" style="width: 25px" />
        <SfSelect class="menu-button__select">
          <SfSelectOption v-for="element in navigationElements" :key="element.id">
              <SfProductOption @click="changeRoute(convertToSlug(element.name))">{{element.name}}</SfProductOption>
          </SfSelectOption>
        </SfSelect>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem>
        <SfIcon icon="profile" @click="toggleModal" size="20px" />
      </SfBottomNavigationItem>
      <SfBottomNavigationItem>
        <SfCircleIcon
          class="sf-bottom-navigation__floating-icon"
          @click="toggleSidebar"
        >
          <SfIcon icon="add_to_cart" size="20px" color="white" />
        </SfCircleIcon>
      </SfBottomNavigationItem>
    </SfBottomNavigation>
    
  </div>
</template>

<script>
import slugify from 'slugify' // TODO: remove after the navigation is fully implemented
import { SfBottomNavigation, SfCircleIcon, SfIcon, SfSelect } from '@storefront-ui/vue'
import { useCartSidebar, useUserLoginModal } from '@shopware-pwa/composables'
// TODO: Move the navigation logic to composable
import { getNavigation } from '@shopware-pwa/shopware-6-client'

export default {
  name: 'SwBottomNavigation',
  components: { SfBottomNavigation, SfIcon, SfCircleIcon, SfSelect },
  data() {
    return {
      navigationElements: []
    }
  },
  setup() {
    const { toggleSidebar } = useCartSidebar()
    const { toggleModal } = useUserLoginModal()
    return {
      toggleSidebar,
      toggleModal
    }
  },
  async mounted() {
    const { children } = await getNavigation({ depth: 1 })
    this.navigationElements = children
  },
  methods: {
    changeRoute(name) {
      this.$router.push(name)
    },
    convertToSlug(name) {
      return (
        '/' +
        slugify(name, {
          remove: /and|[*+~.,()'"!:@]/g
        }).toLowerCase() +
        '/'
      )
    },
  }
}
</script>
<style lang="scss" scoped>
.menu-button {
  position: relative;
  &__select {
    position: absolute !important;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

<style>
.sf-bottom-navigation {
  z-index: 0;
}
</style>
