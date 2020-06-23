<template>
  <div
    :title="getTitle"
    @click="displayTitle"
    class="sw-plugin-slot-placeholder"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-box"
    >
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      ></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
    <button
      @click="showPluginSlots = false"
      class="sw-plugin-slot-placeholder__off"
    >
      Close Dev mode
    </button>
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
  computed: {
    getTitle() {
      return this.name || "Unnamed plugin slot";
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
.sw-plugin-slot-placeholder {
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

  &__off {
    position: fixed;
    bottom: 5rem;
    left: 1rem;
    min-height: 35px;
    border-radius: 5px;
    color: white;
    background: coral;
    border: 0;
    cursor: pointer;
  }
}
</style>
