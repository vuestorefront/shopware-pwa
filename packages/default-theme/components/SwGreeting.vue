<template>
  <transition name="fade">
    <span v-if="isLoggedIn">{{ greeting }}</span>
  </transition>
</template>

<script>
import { computed } from "@vue/composition-api"
import { useUser } from "@shopware-pwa/composables"

export default {
  components: {},
  setup({}, { root }) {
    const { isLoggedIn, isGuestLoggedIn, user } = useUser(root)

    return {
      isLoggedIn: computed(
        () =>
          (isGuestLoggedIn && isGuestLoggedIn.value) ||
          (isLoggedIn && isLoggedIn.value)
      ),
      greeting: computed(() => {
        if (isGuestLoggedIn && isGuestLoggedIn.value) {
          return root.$t("Hi, guest")
        }
        if (isLoggedIn && isLoggedIn.value && user && user.value) {
          return `${root.$t("Hi")}, ${user.value.firstName}`
        }
      }),
    }
  },
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
