<template>
  <div class="sw-bottom-navigation">
    <SfBottomNavigation>
      <nuxt-link aria-label="Go to Home Page" to="/">
        <SfBottomNavigationItem label="Home" icon="home" icon-size="20px" />
      </nuxt-link>
      <SfBottomNavigationItem
        icon="menu"
        icon-size="20px"
        label="Menu"
        class="menu-button"
      >
        <template #icon>
          <SfIcon icon="menu" size="20px" style="width: 25px;" />
          <SfSelect v-model="currentRoute" class="menu-button__select">
            <SfSelectOption
              v-for="route in routes"
              :key="route.routeLabel"
              :value="route"
            >
              <nuxt-link class="sf-header__link" :to="route.routePath">
                <SfProductOption :value="route" :label="route.routeLabel" />
              </nuxt-link>
            </SfSelectOption>
          </SfSelect>
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        icon="profile"
        label="My Account"
        class="menu-button"
      >
        <template #icon>
          <SfIcon icon="profile" size="20px" @click="userIconClick"/>
          <SfSelect
            class="menu-button__select"
            v-if="isLoggedIn"
          >
            <SfSelectOption :value="getPageAccount">
              <nuxt-link  class="sf-header__link" :to="getPageAccount">
                My account
              </nuxt-link>
            </SfSelectOption>
            <!-- TODO: change .native to @click after https://github.com/DivanteLtd/storefront-ui/issues/1097 -->
            <SfSelectOption @click.native="logoutUser" :value="'logout'">
                Logout
            </SfSelectOption>
          </SfSelect>
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem label="Currency" class="menu-button">
        <template #icon>
          <SwCurrency class="menu-button__currency" />
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        icon="empty_cart"
        label="Cart"
        :is-floating="true"
      >
        <template #icon>
          <SfCircleIcon aria-label="Go to Cart" @click="toggleSidebar">
            <SfIcon icon="empty_cart" size="20px" color="white" />
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
  SfProductOption,
} from '@storefront-ui/vue'
import {
  useCartSidebar,
  useNavigation,
  useUser,
  useUserLoginModal,
} from '@shopware-pwa/composables'
import { PAGE_ACCOUNT, PAGE_LOGIN } from '../helpers/pages'
import SwCurrency from '@shopware-pwa/default-theme/components/SwCurrency'

export default {
  name: 'SwBottomNavigation',
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfSelect,
    SfProductOption,
    SwCurrency,
  },
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
    const { isLoggedIn, logout } = useUser()
    return {
      isLoggedIn,
      logout,
      routes,
      isSidebarOpen,
      toggleSidebar,
      toggleModal,
    }
  },
  watch: {
    currentRoute(nextRoute) {
      this.$router.push(nextRoute.routeLabel)
    },
  },
  computed: {
    getPageAccount() {
      return PAGE_ACCOUNT
    }
  },
  methods: {
    userIconClick() {
      if (!this.isLoggedIn) {
        this.toggleModal()
      }
    },
    async logoutUser() {
      await this.logout()
      this.$router.push('/')
    }
  },
}
</script>
<style lang="scss" scoped>
.sw-bottom-navigation {
  align-items: center;
}
.menu-button {
  position: relative;
  &__currency {
    --select-padding: 0;
    --select-height: 2rem;
    --select-color: #afb0b6;
  }
  &__select {
    --chevron-size: 0;
    --select-margin: 0;
    text-align: center;
    position: absolute;
    text-transform: uppercase;
  }
}
</style>
