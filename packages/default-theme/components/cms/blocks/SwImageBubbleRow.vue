<template>
  <div class="sw-image-bubble-row">
    <SwImageRounded :content="leftSlot"/>
    <SwImageRounded :content="centerSlot"/>
    <SwImageRounded :content="rightSlot"/>
  </div>
</template>

<script>
import SwImageRounded from "../elements/SwImageRounded";
import { useSlotsPositions } from '@shopware-pwa/composables';

export default {
  name: 'SwImageBubbleRow',
  components: {
    SwImageRounded,
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const {leftSlot, centerSlot, rightSlot} = useSlotsPositions(props.content.slots)

    return {leftSlot, centerSlot, rightSlot}
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

.sw-image-bubble-row {
  display: flex;
  flex-direction: column;
  margin: var(--spacer-extra-big) 0;

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
