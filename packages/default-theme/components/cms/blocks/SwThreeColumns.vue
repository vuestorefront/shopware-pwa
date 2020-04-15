<template>
  <div class="sw-text-three-columns">
    <SwTextSlot v-for="slotContent in content.slots" :key="slotContent.id" :content="slotContent"/>
  </div>
</template>

<script>
import SwTextSlot from "../elements/SwTextSlot";
import { useSlotsPositions } from '@shopware-pwa/composables';

export default {
  name: 'SwThreeColumns',
  components: {
    SwTextSlot,
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
@import '~@storefront-ui/vue/styles.scss';

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
