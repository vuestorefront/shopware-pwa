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
        <SfSelect v-model="currentRoute" class="menu-button__select">
          <SfSelectOption v-for="route in routes" :key="route.routeLabel" :value="route">
              <SfProductOption :value="route" :label="route.routeLabel"></SfProductOption>
          </SfSelectOption>
        </SfSelect>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem>
        <SfIcon icon="profile" @click="userIconClick" size="20px" />
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
import { SfButton, SfBottomNavigation, SfCircleIcon, SfIcon, SfSelect, SfProductOption } from '@storefront-ui/vue'
import { useCartSidebar, useNavigation, useUser, useUserLoginModal } from '@shopware-pwa/composables'
import { PAGE_ACCOUNT } from '../helpers/pages'


export default {
  name: 'SwBottomNavigation',
  components: { SfButton, SfBottomNavigation, SfIcon, SfCircleIcon, SfSelect, SfProductOption },
  data() {
    return {
      navigationElements: [],
      currentRoute: { routeLabel: '', routePath: '/' },
    }
  },
  setup() {
    const { toggleSidebar, isSidebarOpen } = useCartSidebar()
    const { routes } = useNavigation()
    const { toggleModal } = useUserLoginModal()
    const { isLoggedIn } = useUser()
    return {
      isLoggedIn,
      routes,
      isSidebarOpen,
      toggleSidebar,
      toggleModal
    }
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) {
        this.$router.push(PAGE_ACCOUNT)
        return;
      }
      this.toggleModal()
    }
  },
  watch: {
    currentRoute(nextRoute) {
      this.$router.push(nextRoute.routeLabel)
    }
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
 .sf-bottom-navigation {
   z-index: 3;
 }

::v-deep .sf-select__selected > div:nth-child(1) > div:nth-child(1) {
  display: none;
}
</style>