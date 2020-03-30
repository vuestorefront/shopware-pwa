<template>
  <div class="sw-image-two-column">
    <SwImage :content="leftSlot" class="sw-image-two-column__image"/>
    <SwImage :content="rightSlot" class="sw-image-two-column__image"/>
  </div>
</template>

<script>
import SwImage from "../elements/SwImage";
import { useSlotsPositions } from '@shopware-pwa/composables';

export default {
  name: 'SwImageTwoColumn',
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
    const {leftSlot, rightSlot} = useSlotsPositions(props.content.slots)

    return {leftSlot, rightSlot}
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

.sw-image-two-column {
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
