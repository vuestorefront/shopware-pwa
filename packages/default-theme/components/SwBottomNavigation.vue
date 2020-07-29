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
        @click.self="toggleMobileNavigation"
      >
        <template #icon>
          <SfIcon
            icon="menu"
            size="20px"
            style="width: 25px;"
            @click="toggleMobileNavigation"
          />
          <SwBottomMenu
            v-if="mobileNavIsActive"
            @close="mobileNavIsActive = false"
          />
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
          <SfBottomModal
            :is-open="userIconActive"
            @click:close="userIconActive = false"
            class="sw-bottom-menu"
          >
            <SfList class="mobile-nav-list">
              <SfListItem>
                <SfMenuItem
                  label="My Account"
                  :icon="null"
                  @click="goToMyAccount"
                />
              </SfListItem>
              <SfListItem>
                <SfMenuItem label="Logout" :icon="null" @click="logoutUser" />
              </SfListItem>
            </SfList>
          </SfBottomModal>
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
  SfBottomModal,
  SfList,
  SfMenuItem,
} from "@storefront-ui/vue"
import { useUIState, useUser, useCart } from "@shopware-pwa/composables"
import SwCurrencySwitcher from "@shopware-pwa/default-theme/components/SwCurrencySwitcher"
import { onMounted } from "@vue/composition-api"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"
import SwBottomMenu from "@shopware-pwa/default-theme/components/SwBottomMenu"
import { PAGE_ACCOUNT } from "@shopware-pwa/default-theme/helpers/pages"
import { getCategoryUrl } from "@shopware-pwa/helpers"

export default {
  name: "SwBottomNavigation",
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon,
    SfBottomModal,
    SwCurrencySwitcher,
    SwButton,
    SwBottomMenu,
    SfList,
    SfMenuItem,
  },
  data() {
    return {
      mobileNavIsActive: false,
      userIconActive: false,
    }
  },
  setup(props, { root }) {
    const { switchState: toggleSidebar, isOpen: isSidebarOpen } = useUIState(
      root,
      "CART_SIDEBAR_STATE"
    )
    const { switchState: toggleModal } = useUIState(root, "LOGIN_MODAL_STATE")
    const { isLoggedIn, logout } = useUser(root)
    const { count } = useCart(root)

    return {
      isLoggedIn,
      logout,
      getCategoryUrl,
      isSidebarOpen,
      toggleSidebar,
      toggleModal,
      count,
    }
  },
  watch: {
    $route() {
      this.userIconActive = false
    },
  },
  computed: {
    getPageAccount() {
      return PAGE_ACCOUNT
    },
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) {
        this.userIconActive = true
      } else this.toggleModal()
    },
    goToMyAccount() {
      this.$router.push(this.$i18n.path(PAGE_ACCOUNT))
    },
    async logoutUser() {
      await this.logout()
      this.$router.push(this.$i18n.path("/"))
    },
    toggleMobileNavigation() {
      this.mobileNavIsActive = !this.mobileNavIsActive
    },
  },
}
</script>
<style lang="scss" scoped>
.sf-list__item {
  padding: 0 1rem;
}

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

    // TODO[SFUI]: remove current category from bottom nav in mobile - https://github.com/DivanteLtd/storefront-ui/issues/1298
    .sf-select__selected {
      .sf-header__link {
        display: none;
      }
    }
  }

  .sf-select__dropdown {
    .sf-select-option {
      position: relative;

      .sf-header__link {
        display: block;
        margin: 0 auto;
        max-width: 90%;
      }

      .choose-subcategory,
      .back-subcategory {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
      }

      .choose-subcategory {
        right: 8px;
      }

      .back-subcategory {
        left: 8px;
      }
    }
  }
}
</style>
