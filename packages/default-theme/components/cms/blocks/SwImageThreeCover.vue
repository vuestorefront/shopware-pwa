<template>
  <div class="sw-image-three-cover">
    <SwImage :content="leftSlot" class="sw-image-three-cover__image"/>
    <SwImage :content="centerSlot" class="sw-image-three-cover__image"/>
    <SwImage :content="rightSlot" class="sw-image-three-cover__image"/>
  </div>
</template>

<script>
import SwImage from "../elements/SwImage";
import { useSlotsPositions } from '@shopware-pwa/composables';

export default {
  name: 'SwImageThreeCover',
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

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.sw-image-three-cover {
  display: flex;
  flex-direction: column;

  &__image {
    flex: 1;
    & img {
      height: 340px;
      object-fit: cover;
    }
  }

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}

</style>
