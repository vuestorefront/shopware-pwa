<template>
  <div class="sf-header__icons desktop-only">
    <div class="sw-header__icons">
      <SwPluginSlot name="top-header-icons-before" />
      <div class="account-icon" @mouseleave="closeDropdown">
        <SwButton
          class="sf-button--pure sw-nav-button"
          data-cy="login-icon"
          @click="userIconClick"
        >
          <SfIcon
            class="sf-header__icon sw-header__icon"
            :class="{
              'sf-header__icon is-active': isMyAccountActive,
            }"
            icon="profile"
            size="1.625rem"
          />
        </SwButton>
        <SfList v-if="isDropdownOpen" class="sw-dropdown">
          <SfListItem>
            <nuxt-link
              class="sf-button sf-button--full-width sf-button--underlined sw-dropdown__item"
              :to="getPageAccount"
              data-cy="my-account-link"
              @click.native="isDropdownOpen = false"
            >
              {{ $t("My account") }}
            </nuxt-link>
          </SfListItem>
          <SfListItem>
            <SwButton
              class="sf-button sf-button--full-width sf-button--underlined sw-dropdown__item"
              data-cy="logout-button"
              @click="logoutUser()"
            >
              {{ $t("Logout") }}
            </SwButton>
          </SfListItem>
        </SfList>
      </div>
      <SwButton
        class="sf-button--pure sw-nav-button"
        data-cy="wishlist-icon"
        @click="goToWishlist"
      >
        <SfIcon class="sw-header__icon" icon="heart" size="1.625rem" />
        <SfBadge v-if="wishlistCount > 0" class="sf-badge--number cart-badge">{{
          wishlistCount
        }}</SfBadge>
      </SwButton>
      <SwButton
        class="sf-button--pure sw-nav-button"
        data-cy="cart-icon"
        @click.capture="toggleSidebar"
      >
        <SfIcon class="sw-header__icon" icon="empty_cart" size="1.625rem" />
        <SfBadge v-if="count > 0" class="sf-badge--number cart-badge">{{
          count
        }}</SfBadge>
      </SwButton>
      <SwPluginSlot name="top-header-icons-after" />
    </div>
  </div>
</template>

<script>
import { SfList, SfDropdown, SfIcon, SfBadge } from "@storefront-ui/vue"
import {
  useUser,
  useCart,
  useUIState,
  useWishlist,
} from "@shopware-pwa/composables"
import { computed } from "@vue/composition-api"
import { PAGE_ACCOUNT, PAGE_WISHLIST } from "@/helpers/pages"
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue"
import SwButton from "@/components/atoms/SwButton.vue"

export default {
  components: {
    SfDropdown,
    SfList,
    SfIcon,
    SwButton,
    SwPluginSlot,
    SfBadge,
  },
  setup(props, { root }) {
    const { isLoggedIn, isGuestSession, logout } = useUser(root)
    const { count } = useCart(root)
    const { count: wishlistCount } = useWishlist(root)
    const { switchState: toggleSidebar } = useUIState(
      root,
      "CART_SIDEBAR_STATE"
    )
    const { switchState: switchLoginModalState } = useUIState(
      root,
      "LOGIN_MODAL_STATE"
    )
    const isMyAccountActive = computed(
      () => isLoggedIn.value && !isGuestSession.value
    )

    return {
      count,
      switchLoginModalState,
      toggleSidebar,
      logout,
      wishlistCount,
      isMyAccountActive,
    }
  },
  data() {
    return {
      isDropdownOpen: false,
    }
  },
  computed: {
    getPageAccount() {
      return this.$routing.getUrl(PAGE_ACCOUNT)
    },
  },
  methods: {
    closeDropdown() {
      if (!this.isDropdownOpen) return
      this.isDropdownOpen = false
    },
    userIconClick() {
      if (this.isMyAccountActive) this.isDropdownOpen = !this.isDropdownOpen
      else this.switchLoginModalState(true)
    },
    async logoutUser() {
      await this.logout()
      this.isDropdownOpen = false
      this.$router.push(this.$routing.getUrl("/"))
    },
    goToWishlist() {
      this.$router.push(this.$routing.getUrl(PAGE_WISHLIST))
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

  .account-icon {
    position: relative;
  }
  .sw-dropdown {
    --button-font-size: var(--font-size--xs);
    position: absolute;
    top: 100%;
    left: -70%;
    border: 2px var(--c-light) solid;
    .sf-button {
      --button-padding: var(--spacer-sm);
    }
    &__item {
      background: var(--c-white);
      &:hover {
        color: var(--c-link-hover);
      }
    }
  }
  .sw-nav-button {
    padding: 10px;
  }
}
.cart-badge {
  position: absolute;
  bottom: 55%;
  left: 50%;
}
</style>
