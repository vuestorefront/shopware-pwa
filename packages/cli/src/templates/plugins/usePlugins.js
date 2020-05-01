import Vue from "vue";
import { computed, reactive } from "@vue/composition-api";

const allowShowingSlots = "true" === "<%= props.allowShowingSlots %>";

const sharedState = Vue.observable({
  slotsAreVisible: false,
});

export const usePlugins = () => {
  const localState = reactive(sharedState);
  const showPluginSlots = computed({
    get: () => localState.slotsAreVisible,
    set: (value) => {
      if (allowShowingSlots) localState.slotsAreVisible = value;
    },
  });

  return {
    showPluginSlots,
  };
};
