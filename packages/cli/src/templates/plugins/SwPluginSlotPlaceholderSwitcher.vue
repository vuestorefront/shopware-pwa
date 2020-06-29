<template>
  <div>
    <slot />
    <div class="sw-slot-placeholder-switcher">
      <button
        class="sw-slot-placeholder-switcher__button"
        @click="showPluginSlots = true"
      >
        Dev mode: Show plugin slots
      </button>
    </div>
  </div>
</template>
<script>
import { usePlugins } from "./usePlugins";

export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  setup(props, { root }) {
    const { showPluginSlots } = usePlugins(root);
    return {
      showPluginSlots,
    };
  },
};
</script>
<style lang="scss" scoped>
.sw-slot-placeholder-switcher {
  display: flex;
  flex-shrink: 1;
  justify-content: center;
  padding: 1rem;

  &__button {
    min-height: 35px;
    border-radius: 5px;
    color: white;
    background: coral;
    border: 0;
    cursor: pointer;
  }
}
</style>
