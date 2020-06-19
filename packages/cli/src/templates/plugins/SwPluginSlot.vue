<template>
  <component :is="getComponent" :name="name" :slotContext="slotContext">
    <slot />
  </component>
</template>
<script>
import Vue from "vue"
import { usePlugins } from "./usePlugins";

const pluginsMap = {
  <% Object.keys(props.pluginsMap).forEach(function(pluginSlotName) { %>
    "<%= pluginSlotName %>": () => import("<%= props.pluginsMap[pluginSlotName] %>"),
  <% }) %>
}

Vue.component("sw-plugin-empty-slot", {
  render: function (createElement) {
    return createElement(
      'div',
      this.$slots.default
    )
  },
})

export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    slotContext: {
      type: Object | Array | String,
      default: null
    }
  },
  setup(props, {root}) {
    const { showPluginSlots } = usePlugins(root);
    return {
      showPluginSlots,
    };
  },
  computed: {
    getComponent() {
      if (this.showPluginSlots) {
        return () => import("./SwPluginSlotPlaceholder.vue");
      }
      if (pluginsMap[this.name]) {
        return pluginsMap[this.name]
      }
      return "sw-plugin-empty-slot"
    },
  }
};
</script>
