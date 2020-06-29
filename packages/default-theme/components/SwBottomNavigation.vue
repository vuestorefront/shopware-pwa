<template>
  <div class="sw-bottom-navigation">
    <SfBottomNavigation data-cy="bottom-navigation">
      <nuxt-link aria-label="Go to Home Page" :to="$i18n.path('/')">
        <SfBottomNavigationItem
          label="Home"
          icon="home"
          icon-size="20px"
          data-cy="bottom-navigation-home"
        />
      </nuxt-link>
      <SfBottomNavigationItem
        icon="menu"
        icon-size="20px"
        label="Menu"
        class="menu-button"
        data-cy="bottom-navigation-menu"
      >
        <template #icon>
          <SfIcon icon="menu" size="20px" style="width: 25px;" />
          <SfSelect
            v-model="currentRoute"
            class="menu-button__select"
            data-cy="bottom-navigation-menu-select"
          >
            <SfSelectOption
              v-for="route in routes"
              :key="route.routeLabel"
              :value="route"
            >
              <nuxt-link
                class="sf-header__link"
                :to="$i18n.path(route.routePath)"
              >
                <SfProductOption
                  :value="route"
                  :label="route.routeLabel"
                  data-cy="bottom-navigation-menu-option"
                />
              </nuxt-link>
            </SfSelectOption>
          </SfSelect>
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        icon="profile"
        label="My Account"
        class="menu-button"
        data-cy="bottom-navigation-account"
      >
        <template #icon>
          <SfIcon icon="profile" size="20px" @click="userIconClick" />
          <SfSelect
            v-if="isLoggedIn"
            class="menu-button__select"
            data-cy="bottom-navigation-account-select"
          >
            <!-- TODO: change .native to @click after https://github.com/DivanteLtd/storefront-ui/issues/1097 -->
            <SfSelectOption
              :value="getPageAccount"
              @click.native="goToMyAccount"
              data-cy="bottom-navigation-account-option"
            >
              My account
            </SfSelectOption>
            <!-- TODO: change .native to @click after https://github.com/DivanteLtd/storefront-ui/issues/1097 -->
            <SfSelectOption :value="'logout'">
              <SwButton class="sf-button--full-width" @click="logoutUser">
                Logout
              </SwButton>
            </SfSelectOption>
          </SfSelect>
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        label="Currency"
        class="menu-button"
        data-cy="bottom-navigation-currency"
      >
        <template #icon>
          <SwCurrencySwitcher class="menu-button__currency" />
        </template>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem
        icon="empty_cart"
        label="Cart"
        :is-floating="true"
        data-cy="bottom-navigation-cart"
      >
        <template #icon>
          <SfCircleIcon
            aria-label="Go to Cart"
            icon="empty_cart"
            :has-badge="count > 0"
            :badge-label="count.toString()"
            @click="toggleSidebar"
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
} from "@storefront-ui/vue"
import {
  useUIState,
  useNavigation,
  useUser,
  useCart,
} from "@shopware-pwa/composables"
import SwCurrencySwitcher from "@shopware-pwa/default-theme/components/SwCurrencySwitcher"
import { onMounted } from "@vue/composition-api"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import { PAGE_ACCOUNT } from "../helpers/pages"

export default {
  name: "SwBottomNavigation",
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfSelect,
    SfProductOption,
    SwCurrencySwitcher,
    SwButton,
  },
  data() {
    return {
      navigationElements: [],
      currentRoute: { routeLabel: "", routePath: "/" },
    }
  },
  setup(props, { root }) {
    const { switchState: toggleSidebar, isOpen: isSidebarOpen } = useUIState(
      root,
      "CART_SIDEBAR_STATE"
    )
    const { routes, fetchRoutes } = useNavigation(root)
    const { switchState: toggleModal } = useUIState(root, "LOGIN_MODAL_STATE")
    const { isLoggedIn, logout } = useUser(root)
    const { count } = useCart(root)

    onMounted(async () => {
      try {
        await fetchRoutes()
      } catch (e) {
        console.error("[SwBottomNavigation]", e)
      }
    })
    return {
      isLoggedIn,
      logout,
      routes,
      isSidebarOpen,
      toggleSidebar,
      toggleModal,
      count,
    }
  },
  computed: {
    getPageAccount() {
      return PAGE_ACCOUNT
    },
  },
  watch: {
    currentRoute(nextRoute) {
      this.$router.push(this.$i18n.path(nextRoute.routeLabel))
    },
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) {
        this.$router.push(this.$i18n.path(PAGE_ACCOUNT))
      } else this.toggleModal()
    },
    goToMyAccount() {
      this.$router.push(this.$i18n.path(PAGE_ACCOUNT))
    },
    async logoutUser() {
      await this.logout()
      this.$router.push(this.$i18n.path("/"))
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
    text-transform: uppercase;
  }
}
</style>
