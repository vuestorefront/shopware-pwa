<template>
  <div class="top-navigation">
    <slot v-bind="{ navigationElements, activeSidebar, activeIcon }">
      <SfHeader
        title="Shopware PWA"
        active-sidebar="activeSidebar"
      >
        <template #logo>
          <nuxt-link to="/" class="sf-header__logo">
            <SfImage
              src="/img/logo.svg"
              alt="Shopware PWA"
              class="sf-header__logo-image"
            />
          </nuxt-link>
        </template>
        <template #navigation>
          <nuxt-link to="/">
            <SfHeaderNavigationItem>Home</SfHeaderNavigationItem>
          </nuxt-link>
          <nuxt-link
            v-for="routeName in routeNames"
            :key="routeName"
            :to="convertToSlug(routeName)"
          >
            <SfHeaderNavigationItem>{{ routeName }}</SfHeaderNavigationItem>
          </nuxt-link>
        </template>

        <template #header-icons="{accountIcon, wishlistIcon, cartIcon}">
          <div class="sf-header__icons">
            <SfCircleIcon
              v-if="accountIcon"
              :icon="accountIcon"
              icon-size="20px"
              icon-color="black"
              class="sf-header__icon"
              role="button"
              aria-label="account"
              :aria-pressed="activeIcon === 'account' ? 'true' : 'false'"
              :has-badge="isLoggedIn"
              @click="userIconClick"
            />
            <div
              class="top-navigation__header-icon header-icons__cart cart-icon"
            >
              <SfCircleIcon
                v-if="cartIcon"
                :icon="cartIcon"
                icon-size="20px"
                icon-color="black"
                class="sf-header__icon"
                :class="{ 'sf-header__icon--is-active': activeIcon === 'cart' }"
                role="button"
                aria-label="cart"
                :aria-pressed="activeIcon === 'cart' ? 'true' : 'false'"
                :has-badge="count > 0"
                @click="toggleSidebar"
              >
                <template #badge>
                  <SfBadge class="cart-icon__badge">{{ count }}</SfBadge>
                </template>
              </SfCircleIcon>
            </div>
          </div>
        </template>
      </SfHeader>
      <SwLoginModal :is-open="isModalOpen" @close="isModalOpen = false" />
    </slot>
  </div>
</template>

<script>
import slugify from 'slugify' // TODO: remove after the navigation is fully implemented
import { SfHeader, SfCircleIcon, SfBadge, SfImage } from '@storefront-ui/vue'
import {
  useUser,
  useCart,
  useCartSidebar,
  useUserLoginModal,
  useNavigation
} from '@shopware-pwa/composables'
import SwLoginModal from './modals/SwLoginModal'

export default {
  components: { SfHeader, SfCircleIcon, SfBadge, SwLoginModal, SfImage },
  setup() {
    const { convertToSlug, routeNames, fetchRouteNames } = useNavigation()
    const { isLoggedIn, logout } = useUser()
    const { count } = useCart()
    const { toggleSidebar } = useCartSidebar()
    const { toggleModal } = useUserLoginModal()

    return {
      routeNames,
      fetchRouteNames,
      convertToSlug,
      count,
      toggleModal,
      toggleSidebar,
      isLoggedIn,
      logout
    }
  },
  data() {
    return {
      navigationElements: [{name: ''}],
      activeSidebar: 'account',
      activeIcon: '',
      isModalOpen: false
    }
  },
  async mounted() {
    await this.fetchRouteNames({depth: 1})
  },
  methods: {
    async userIconClick() {
      if (this.isLoggedIn) this.$router.push('account')
      else this.toggleModal()
    }
  }
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.top-navigation {
  @include for-desktop {
    .sf-header {
      display: flex;
      justify-content: space-between;
    }
  }

  .sf-search-bar {
    display: none;
  }

  .cart-icon {
    position: relative;
    display: flex;

    &__badge {
      position: absolute;
      bottom: 2.2em;
      left: 2.8em;
      font-size: 0.6em;
      padding: 0.3em 0;
      border-radius: 100%;
      width: 2.2em;
      min-height: 2.2em;
    }
  }

  .sf-header__navigation {
    flex: 1;
  }

  .sf-header__logo-image {
    height: 100%;
    width: 100%;
  }

  .sf-image img {
    height: 2rem;
    width: 2.1rem;
  }

  .sf-search-bar {
    visibility: hidden;
  }
}
</style>