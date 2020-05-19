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
        size="20px"
        @click="userIconClick"
      />
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
} from '@storefront-ui/vue'
import {
  useCartSidebar,
  useNavigation,
  useUser,
  useCart,
  useUserLoginModal,
} from '@shopware-pwa/composables'
import { PAGE_ACCOUNT } from '../helpers/pages'
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
    const { isLoggedIn } = useUser()
    const { count } = useCart()

    onMounted(async () => {
      await fetchRoutes()
    })
    return {
      isLoggedIn,
      routes,
      isSidebarOpen,
      toggleSidebar,
      toggleModal,
      count
    }
  },
  watch: {
    currentRoute(nextRoute) {
      this.$router.push(nextRoute.routeLabel)
    },
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) {
        this.$router.push(PAGE_ACCOUNT)
        return
      }
      this.toggleModal()
    },
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
  }
}
</style>
