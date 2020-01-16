<template>
  <div class="sw-bottom-navigation">
    <SfBottomNavigation>
      <nuxt-link to="/">
        <SfBottomNavigationItem>
          <SfIcon icon="home" @click="goHome" size="20px" />
        </SfBottomNavigationItem>
      </nuxt-link>
      <SfBottomNavigationItem>
        <SfIcon icon="menu" size="20px" style="width: 25px" />
      </SfBottomNavigationItem>
      <SfBottomNavigationItem>
        <SfIcon icon="profile" @click="toggleModal" size="20px" />
      </SfBottomNavigationItem>
      <SfBottomNavigationItem>
        <SfCircleIcon
          class="sf-bottom-navigation__floating-icon"
          @click="toggleSidebar"
        >
          <SfIcon icon="add_to_cart" size="20px" color="white" />
        </SfCircleIcon>
      </SfBottomNavigationItem>
    </SfBottomNavigation>
  </div>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue'
import { useCartSidebar, useUserLoginModal } from '@shopware-pwa/composables'

export default {
  name: 'SwBottomNavigation',
  components: { SfBottomNavigation, SfIcon, SfCircleIcon },
  setup() {
    const { toggleSidebar } = useCartSidebar()
    const { toggleModal } = useUserLoginModal()
    return {
      toggleSidebar,
      toggleModal
    }
  }
}
</script>

<style></style>
