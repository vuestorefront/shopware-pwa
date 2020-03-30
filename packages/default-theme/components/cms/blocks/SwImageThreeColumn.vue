<template>
  <div class="sw-image-three-column">
    <SwImage :content="leftSlot" class="sw-image-three-column__image"/>
    <SwImage :content="centerSlot" class="sw-image-three-column__image"/>
    <SwImage :content="rightSlot" class="sw-image-three-column__image"/>
  </div>
</template>

<script>
import SwImage from "../elements/SwImage";
import { useSlotsPositions } from '@shopware-pwa/composables';

export default {
  name: 'SwImageThreeColumn',
  components: {
    SwImage,
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

.sw-image-three-column {
  display: flex;
  flex-direction: column;

  &__image {
    margin: var(--spacer-medium);
    flex: 1;
  }

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}

</style>
