import { computed } from "vue-demi";
import { useSharedState } from "@shopware-pwa/composables";

const allowDevMode = "true" === "<%= props.allowDevMode %>";

export function usePlugins(rootContext) {
  const { sharedRef } = useSharedState(rootContext);
  const visibleDevSlots = sharedRef("sw-usePlugins-visibleDevSlots");

  const showPluginSlots = computed({
    get: () => !!visibleDevSlots.value,
    set: (value) => {
      if (allowDevMode) visibleDevSlots.value = value;
    },
  });

  return {
    showPluginSlots,
  };
}
