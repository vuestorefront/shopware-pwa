<template>

  <SfHeader
    title="Storefront UI"
    logo="/img/logo.svg"
    active-sidebar="activeSidebar"
  >
    <template #navigation>
      <nuxt-link to="/"><SfHeaderNavigationItem>Home</SfHeaderNavigationItem></nuxt-link>
      <nuxt-link v-for="element in navigationElements" :key="element.id" :to="convertToSlug(element.name)">
        <SfHeaderNavigationItem>{{ element.name }}</SfHeaderNavigationItem>
      </nuxt-link>
    </template>

    <template #header-icons="{accountIcon, wishlistIcon, cartIcon}">
      <SfCircleIcon
        v-if="accountIcon"
        :icon="accountIcon"
        class="sf-header__icon"
        :class="{'sf-header__icon--is-active' : activeIcon === 'account'}"
        role="button"
        aria-label="account"
        :aria-pressed="activeIcon === 'account' ? 'true' :'false'"
        @click="$emit('click:account')"
      />
      <SfCircleIcon
        v-if="wishlistIcon"
        :icon="wishlistIcon"
        class="sf-header__icon"
        :class="{'sf-header__icon--is-active' : activeIcon === 'wishlist'}"
        role="button"
        aria-label="wishlist"
        :aria-pressed="activeIcon === 'wishlist' ? 'true' :'false'"
        @click="$emit('click:wishlist')"
      />
      <div class='top-navigation__header-icon header-icons__cart cart-icon'>
        <SfCircleIcon
            v-if="cartIcon"
            :icon="cartIcon"
            class="sf-header__icon"
            :class="{'sf-header__icon--is-active' : activeIcon === 'cart'}"
            role="button"
            aria-label="cart"
            :aria-pressed="activeIcon === 'cart' ? 'true' :'false'"
            @click="toggle"
        />
        <SfBadge class="cart-icon__badge" v-show="count > 0">{{ count }}</SfBadge>
      </div>
    </template>
  </SfHeader>
==== BASE ====
</template>

<script>
import slugify from 'slugify' // TODO: remove after the navigation is fully implemented
import { getNavigation, getPage  } from '@shopware-pwa/shopware-6-client'
import { SfHeader, SfCircleIcon, SfBadge } from '@storefront-ui/vue'
import { useUser, useCart, useCartSidebar } from '@shopware-pwa/composables'
import SwLoginModal from './modals/SwLoginModal'

export default {
  components: { SfHeader, SfCircleIcon, SfBadge,SwLoginModal },
  data () {
    return {
      navigationElements: [],
      activeSidebar: 'account',
      activeIcon: '',
      isModalOpen: false
    }
  },
  setup() {
    const { count }  = useCart()
    const { toggle, isOpen } = useCartSidebar()
    return {
      isOpen,
      count,
      toggle
    }
  },
  methods: {
    convertToSlug(name) {
      return (
        '/' +
        slugify(name, {
          remove: /and|[*+~.,()'"!:@]/g
        })
      )
    },
    async userIconClick () {
      if (this.isLoggedIn) this.logout()
      else this.isModalOpen = true
    }
  },
  async mounted() {
    const { children } = await getNavigation({ depth: 1 })
    this.navigationElements = children
  }
}
</script>

<style lang="scss" >
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

.sw-top-navigation {
  .cart-icon {
    position: relative;
    display: flex;

    &__badge {
      position: absolute;
      bottom: 2.2em;
      left: 4.5em;
      font-size: 0.6em;
      padding: 0.3em 0;
      border-radius: 100%;
      width: 2.2em;
    }
  }
}

</style>
