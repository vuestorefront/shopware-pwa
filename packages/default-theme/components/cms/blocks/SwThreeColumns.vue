<template>
  <div class="sw-text-three-columns">
    <CmsSlotText v-for="slotContent in content.slots" :key="slotContent.id" :content="slotContent"/>
  </div>
</template>

<script>
import CmsSlotText from "@shopware-pwa/default-theme/components/cms/slots/CmsSlotText";
import { useSlotsPositions } from '@shopware-pwa/composables';

export default {
  name: 'SwThreeColumns',
  components: {
    CmsSlotText,
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const {leftSlot, rightSlot} = useSlotsPositions(props.content.slots)

    return {leftSlot, rightSlot}
  }
};
</script>

<style lang="scss">
@import '@shopware-pwa/default-theme/components/cms/settings.scss';

.sw-text-three-columns {
  display: flex;
  flex-direction: column;

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
  }
}

</style>
