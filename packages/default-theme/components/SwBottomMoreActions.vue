<template>
  <SfBottomModal
    :is-open="true"
    class="sw-bottom-more-actions"
    @click:close="$emit('close')"
  >
    <SwCurrencySwitcher />
  </SfBottomModal>
</template>

<script>
import { SfBottomModal } from "@storefront-ui/vue"
import { useUIState } from "@shopware-pwa/composables"
import SwCurrencySwitcher from "@/components/SwCurrencySwitcher"

export default {
  name: "SwBottomMenu",
  components: {
    SfBottomModal,
    SwCurrencySwitcher,
  },
  data() {
    return {
      categoryBreadcrumbs: [],
      menuTransitionName: "menu-slide-left",
    }
  },
  setup(props, { root }) {
    const { switchState: toggleModal } = useUIState(root, "LOGIN_MODAL_STATE")

    return {
      toggleModal,
    }
  },
  computed: {},
  watch: {
    $route() {
      this.$emit("close")
    },
  },
  methods: {
    toggleMobileNavigation() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
<style lang="scss" scoped>
.sw-bottom-more-actions {
  &__title {
    display: flex;
    align-items: center;
    padding: 10px 5px;
    font-size: 1.5rem;
    line-height: 1.7rem;
    font-weight: 700;
  }

  &__subcategory {
    display: flex;
  }

  .menu-button {
    position: relative;

    &__more {
      --select-padding: 0;
      --select-height: 2rem;
      --select-color: #afb0b6;
    }
  }
}
</style>
