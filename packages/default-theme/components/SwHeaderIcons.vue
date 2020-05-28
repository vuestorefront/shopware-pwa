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
      />
      <SfDropdown
        class="dropdown"
        :is-open="isDropdownOpen"
        @click:close="isDropdownOpen = false"
      >
        <SfList>
          <SfListItem>
            <nuxt-link
              class="sf-button sf-button--full-width sf-button--underlined color-primary"
              :to="getPageAccount"
              @click.native="isDropdownOpen = false"
            >
              My account
            </nuxt-link>
          </SfListItem>
          <SfListItem>
            <SwButton
              class="sf-button sf-button--full-width sf-button--underlined color-primary dropdown__item"
              @click="logoutUser()"
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
      />
      <SwPluginSlot name="top-header-icons-after" />
    </div>
  </div>
</template>

<script>
import { SfList, SfDropdown, SfIcon } from '@storefront-ui/vue'
import { useUser, useCart, useUIState } from '@shopware-pwa/composables'

import { PAGE_ACCOUNT } from '@shopware-pwa/default-theme/helpers/pages'
import SwPluginSlot from 'sw-plugins/SwPluginSlot'
import SwButton from '@shopware-pwa/default-theme/components/atoms/SwButton'

export default {
  components: {
    SfDropdown,
    SfList,
    SfIcon,
    SwButton,
    SwPluginSlot,
  },
  setup() {
    const { isLoggedIn, logout } = useUser()
    const { count } = useCart()
    const { switchState: toggleSidebar } = useUIState('CART_SIDEBAR_STATE')
    const { switchState: switchLoginModalState } = useUIState(
      'LOGIN_MODAL_STATE'
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
      this.$router.push(this.$i18n.path('/'))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

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
