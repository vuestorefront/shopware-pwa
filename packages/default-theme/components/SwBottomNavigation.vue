<template>
  <div class="sw-bottom-navigation">
    <SfBottomNavigation>
      <nuxt-link to="/">
        <SfBottomNavigationItem icon="home" icon-size="20px" />
      </nuxt-link>
      <SfBottomNavigationItem class="menu-button">
        <template #icon>
          <SfIcon icon="menu" size="20px" style="width: 25px" />
          <SfSelect v-model="currentRoute" class="menu-button__select">
            <SfSelectOption
              v-for="route in routes"
              :key="route.routeLabel"
              :value="route"
            >
              <nuxt-link class="sf-header__link" :to="route.routePath">
                <SfProductOption
                  :value="route"
                  :label="route.routeLabel"
                />
              </nuxt-link>
            </SfSelectOption>
          </SfSelect>
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        icon="profile"
        size="20px"
        @click="userIconClick"
      />
      <SfBottomNavigationItem class="menu-button">
        <template #icon>
          <SwCurrency />
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem :is-floating="true">
        <template #icon>
          <SfCircleIcon @click="toggleSidebar">
            <SfIcon icon="add_to_cart" size="20px" color="white" />
          </SfCircleIcon>
        </template>
      </SfBottomNavigationItem>
    </SfBottomNavigation>
  </div>
</template>

<script>
import {
  SfBottomNavigation,
  SfCircleIcon,
  SfIcon,
  SfSelect,
  SfProductOption
} from '@storefront-ui/vue'
import {
  useCartSidebar,
  useNavigation,
  useUser,
  useUserLoginModal
} from '@shopware-pwa/composables'
import { PAGE_ACCOUNT } from '../helpers/pages'
import SwCurrency from '@shopware-pwa/default-theme/components/SwCurrency'

export default {
  name: 'SwBottomNavigation',
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfSelect,
    SfProductOption,
    SwCurrency
  },
  data() {
    return {
      navigationElements: [],
      currentRoute: { routeLabel: '', routePath: '/' }
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
  watch: {
    currentRoute(nextRoute) {
      this.$router.push(nextRoute.routeLabel)
    }
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) {
        this.$router.push(PAGE_ACCOUNT)
        return
      }
      this.toggleModal()
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

::v-deep .sf-select__selected > div:nth-child(1) > div:nth-child(1) {
  display: none;
}
</style>
