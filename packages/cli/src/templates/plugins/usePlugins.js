import Vue from "vue";
import { computed, reactive } from "@vue/composition-api";

const allowDevMode = "true" === "<%= props.allowDevMode %>";

const sharedState = Vue.observable({
  slotsAreVisible: false,
});

export const usePlugins = (rootContext) => {
  const localState = reactive(sharedState);
  const showPluginSlots = computed({
    get: () => localState.slotsAreVisible,
    set: (value) => {
      if (allowDevMode) localState.slotsAreVisible = value;
    },
  });

  return {
    showPluginSlots,
  };
};
