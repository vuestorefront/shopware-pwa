<template>
  <SwPluginSlot name="<%- props.slotName %>" />
</template>
<script>
import SwPluginSlot from "sw-plugins/SwPluginSlot.vue";

export default {
  name: "ShopwarePluginSlot",
  components: {
    SwPluginSlot,
  },
  setup() {},
  // <% Object.keys(props.params || {}).forEach(function(paramName) { %>
  "<%= paramName %>": "<%= props.params[paramName] %>",
  // <% }) %>
};
</script>
