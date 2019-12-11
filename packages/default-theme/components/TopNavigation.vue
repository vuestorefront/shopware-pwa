<template>
  <div>
    <SfHeader
      title="Storefront UI"
      logo="/img/logo.svg"
      active-sidebar="activeSidebar"
    >
      <template #navigation>
        <nuxt-link to="/"
          ><SfHeaderNavigationItem>Home</SfHeaderNavigationItem></nuxt-link
        >
        <nuxt-link
          v-for="element in navigationElements"
          :key="element.id"
          :to="convertToSlug(element.name)"
        >
          <SfHeaderNavigationItem>{{ element.name }}</SfHeaderNavigationItem>
        </nuxt-link>
      </template>

      <template #header-icons="{accountIcon, wishlistIcon, cartIcon}">
        <SfCircleIcon
          v-if="accountIcon"
          :icon="accountIcon"
          class="sf-header__icon"
          :class="{ 'sf-header__icon--is-active': isLoggedIn }"
          role="button"
          aria-label="account"
          @click="userIconClick"
        />
        <SfCircleIcon
          v-if="wishlistIcon"
          :icon="wishlistIcon"
          class="sf-header__icon"
          :class="{ 'sf-header__icon--is-active': activeIcon === 'wishlist' }"
          role="button"
          aria-label="wishlist"
          :aria-pressed="activeIcon === 'wishlist' ? 'true' : 'false'"
          @click="$emit('click:wishlist')"
        />
      </template>
    </SfHeader>
    <SwLoginModal :is-open="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>
<script>
import slugify from 'slugify' // TODO: remove after the navigation is fully implemented
import { getNavigation, getPage } from '@shopware-pwa/shopware-6-client'
import { SfHeader, SfCircleIcon } from '@storefront-ui/vue'
import SwLoginModal from './modals/SwLoginModal'
import { useUser } from '@shopware-pwa/composables'

export default {
  components: { SfHeader, SfCircleIcon, SwLoginModal },
  setup() {
    const { isLoggedIn, logout } = useUser()
    return {
      isLoggedIn,
      logout
    }
  },
  data() {
    return {
      navigationElements: [],
      activeSidebar: 'account',
      activeIcon: '',
      isModalOpen: false
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

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.nuxt-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
