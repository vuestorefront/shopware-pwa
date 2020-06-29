<template>
  <div class="sf-header__icons desktop-only">
    <div class="sw-header__icons">
      <SwPluginSlot name="top-header-icons-before" />
      <SfIcon
        icon="profile"
        class="sf-header__icon sw-header__icon"
        :class="{
          'sf-header__icon--is-active': isLoggedIn,
        }"
        role="button"
        :aria-label="$t('Go to My Account')"
        @click="userIconClick"
        data-cy="login-icon"
      />
      <SfDropdown
        class="dropdown"
        :is-open="isDropdownOpen"
        @click:close="isDropdownOpen = false"
        data-cy="account-dropdown"
      >
        <SfList>
          <SfListItem>
            <nuxt-link
              class="sf-button sf-button--full-width sf-button--underlined color-primary"
              :to="getPageAccount"
              @click.native="isDropdownOpen = false"
              data-cy="my-account-link"
            >
              My account
            </nuxt-link>
          </SfListItem>
          <SfListItem>
            <SwButton
              class="sf-button sf-button--full-width sf-button--underlined color-primary dropdown__item"
              @click="logoutUser()"
              data-cy="logout-button"
            >
              Logout
            </SwButton>
          </SfListItem>
        </SfList>
      </SfDropdown>
      <SfIcon
        icon="empty_cart"
        :has-badge="count > 0"
        :badge-label="count.toString()"
        class="sf-header__icon sw-header__icon"
        role="button"
        :aria-label="$t('Go to cart')"
        @click="toggleSidebar"
        data-cy="cart-icon"
      />
      <SwPluginSlot name="top-header-icons-after" />
    </div>
  </div>
</template>

<script>
import { SfList, SfDropdown, SfIcon } from "@storefront-ui/vue"
import { useUser, useCart, useUIState } from "@shopware-pwa/composables"

import { PAGE_ACCOUNT } from "@shopware-pwa/default-theme/helpers/pages"
import SwPluginSlot from "sw-plugins/SwPluginSlot"
import SwButton from "@shopware-pwa/default-theme/components/atoms/SwButton"

export default {
  components: {
    SfDropdown,
    SfList,
    SfIcon,
    SwButton,
    SwPluginSlot,
  },
  setup(props, { root }) {
    const { isLoggedIn, logout } = useUser(root)
    const { count } = useCart(root)
    const { switchState: toggleSidebar } = useUIState(
      root,
      "CART_SIDEBAR_STATE"
    )
    const { switchState: switchLoginModalState } = useUIState(
      root,
      "LOGIN_MODAL_STATE"
    )

    return {
      count,
      switchLoginModalState,
      toggleSidebar,
      isLoggedIn,
      logout,
    }
  },
  data() {
    return {
      isDropdownOpen: false,
    }
  },
  computed: {
    getPageAccount() {
      return this.$i18n.path(PAGE_ACCOUNT)
    },
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) this.isDropdownOpen = !this.isDropdownOpen
      else this.switchLoginModalState(true)
    },
    async logoutUser() {
      await this.logout()
      this.isDropdownOpen = false
      this.$router.push(this.$i18n.path("/"))
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-header__icons {
  display: flex;
  justify-content: space-around;
  margin-left: 1rem;

  .dropdown {
    --dropdown-width: auto;
    --dropdown-transform: translate(-10%, 100%);
    &__item {
      &:hover {
        color: var(--c-link-hover);
      }
    }
  }

  .sw-header__icon {
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>
