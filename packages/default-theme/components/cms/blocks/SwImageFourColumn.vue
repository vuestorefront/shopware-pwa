<template>
  <div class="sw-image-four-column">
    <SwImage :content="leftSlot" class="sw-image-four-column__image"/>
    <SwImage :content="centerLeftSlot" class="sw-image-four-column__image"/>
    <SwImage :content="centerRightSlot" class="sw-image-four-column__image"/>
    <SwImage :content="rightSlot" class="sw-image-four-column__image"/>
  </div>
</template>

<script>
import SwImage from "../elements/SwImage";
import { useSlotsPositions } from '@shopware-pwa/composables';


export default {
  name: 'SwImageFourColumn',
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
    const {leftSlot, centerLeftSlot, centerRightSlot, rightSlot} = useSlotsPositions(props.content.slots)

    return {leftSlot, centerLeftSlot, centerRightSlot, rightSlot}
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

.sw-image-four-column {
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
