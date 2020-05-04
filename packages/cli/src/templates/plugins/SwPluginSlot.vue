<template>
  <component :is="getComponent" :name="name" />
</template>
<script>
import { usePlugins } from "./usePlugins";

const pluginsMap = {
  <% Object.keys(props.pluginsMap).forEach(function(pluginSlotName) { %>
    "<%= pluginSlotName %>": () => import("<%= props.pluginsMap[pluginSlotName] %>"),
  <% }) %>
}

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
    getComponent() {
      if (this.showPluginSlots) {
        return () => import("./SwPluginSlotPlaceholder.vue");
      }
      if (pluginsMap[this.name]) {
        return pluginsMap[this.name]
      }
      return () => import("./SwPluginEmptySlot.vue");
    },
  }
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
