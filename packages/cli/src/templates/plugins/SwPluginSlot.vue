<template>
  <component :is="getComponent" :name="name" />
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
  setup() {
    const { showPluginSlots } = usePlugins();
    return {
      showPluginSlots,
    };
  },
  data() {
    return {};
  },
  computed: {
    getTitle() {
      return this.name || "Unnamed plugin slot";
    },
    getComponent() {
      if (this.showPluginSlots) {
        return () => import("./SwPluginSlotPlaceholder.vue");
      }
      if (this.name === "footer-content-after") {
        return () => import("./SwPluginSlotPlaceholderSwitcher.vue");
      }
      // return getCmsElementComponent(this.content)
      return () => import("./SwPluginEmptySlot.vue");
    },
  },
  methods: {
    displayTitle() {
      console.log(this.getTitle);
    },
  },
};
</script>
<style lang="scss" scoped>
.sw-plugin-slot {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid coral;
  cursor: pointer;

  svg {
    padding: 0.4rem;
    border: 3px solid coral;
  }
}
</style>
