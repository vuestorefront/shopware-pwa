<template>
  <div class="sw-bottom-navigation">
    <SfBottomNavigation :style="{'z-index': isSidebarOpen ? 0: 1}">
      <nuxt-link to="/">
        <SfBottomNavigationItem>
          <SfIcon icon="home" size="20px" />
        </SfBottomNavigationItem>
      </nuxt-link>
      <SfBottomNavigationItem class="menu-button">
        <SfIcon icon="menu" size="20px" style="width: 25px" />
        <SfSelect class="menu-button__select">
          <SfSelectOption v-for="routeName in routeNames" :key="routeName">
              <SfProductOption @click="changeRoute(convertToSlug(routeName))">{{routeName}}</SfProductOption>
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
import { SfBottomNavigation, SfCircleIcon, SfIcon, SfSelect, SfProductOption } from '@storefront-ui/vue'
import { useCartSidebar, useUserLoginModal } from '@shopware-pwa/composables'
import { useNavigation } from '@shopware-pwa/composables'


export default {
  name: 'SwBottomNavigation',
  components: { SfBottomNavigation, SfIcon, SfCircleIcon, SfSelect, SfProductOption },
  data() {
    return {
      navigationElements: []
    }
  },
  setup() {
    const { toggleSidebar, isSidebarOpen } = useCartSidebar()
    const { routeNames, convertToSlug } = useNavigation()
    const { toggleModal } = useUserLoginModal()
    return {
      routeNames,
      isSidebarOpen,
      convertToSlug,
      toggleSidebar,
      toggleModal
    }
  },
  methods: {
    changeRoute(name) {
      this.$router.push(name)
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