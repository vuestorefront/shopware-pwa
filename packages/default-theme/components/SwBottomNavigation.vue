<template>
  <div class="sw-bottom-navigation">
    <SfBottomNavigation>
      <nuxt-link aria-label="Go to Home Page" :to="$i18n.path('/')">
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
              <nuxt-link
                class="sf-header__link"
                :to="$i18n.path(route.routePath)"
              >
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
            <!-- TODO: change .native to @click after https://github.com/DivanteLtd/storefront-ui/issues/1097 -->
            <SfSelectOption :value="getPageAccount" @click.native="goToMyAccount">
                My account
            </SfSelectOption>
            <!-- TODO: change .native to @click after https://github.com/DivanteLtd/storefront-ui/issues/1097 -->
            <SfSelectOption :value="'logout'">
                <SfButton @click="logoutUser">
                  Logout
                </SfButton>
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
          <SfCircleIcon 
            aria-label="Go to Cart" 
            @click="toggleSidebar" 
            icon="empty_cart" 
            :has-badge="count > 0"
            :badge-label="count.toString()"
          />
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
  SfButton
} from '@storefront-ui/vue'
import {
  useCartSidebar,
  useNavigation,
  useUser,
  useCart,
  useUserLoginModal,
} from '@shopware-pwa/composables'
import { PAGE_ACCOUNT, PAGE_LOGIN } from '../helpers/pages'
import SwCurrency from '@shopware-pwa/default-theme/components/SwCurrency'
import { onMounted } from '@vue/composition-api'

export default {
  name: 'SwBottomNavigation',
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfSelect,
    SfProductOption,
    SwCurrency,
    SfButton
  },
  data() {
    return {
      navigationElements: [],
      currentRoute: { routeLabel: '', routePath: '/' },
    }
  },
  setup() {
    const { toggleSidebar, isSidebarOpen } = useCartSidebar()
    const { routes, fetchRoutes } = useNavigation()
    const { toggleModal } = useUserLoginModal()
    const { isLoggedIn, logout } = useUser()
    const { count } = useCart()

    onMounted(async () => {
      try {
        await fetchRoutes()
      } catch (e) {
        console.error('[SwBottomNavigation]', e)
      }
    })
    return {
      isLoggedIn,
      logout,
      routes,
      isSidebarOpen,
      toggleSidebar,
      toggleModal,
      count
    }
  },
  watch: {
    currentRoute(nextRoute) {
      this.$router.push(this.$i18n.path(nextRoute.routeLabel))
    },
  },
  computed: {
    getPageAccount() {
      return PAGE_ACCOUNT
    }
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) {
        this.$router.push(this.$i18n.path(PAGE_ACCOUNT))
        return
      }
    },
    goToMyAccount() {
      this.$router.push(this.$i18n.path(PAGE_ACCOUNT))
    },
    async logoutUser() {
      await this.logout()
      this.$router.push(this.$i18n.path('/'))
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
