<template>
  <div class="sw-image-simple-grid">
    <SwImage :content="leftTopSlot" class="sw-image-simple-grid__image"/>
    <SwImage :content="leftBottomSlot" class="sw-image-simple-grid__image"/>
    <SfImage :src="getImgUrl" :title="getTitle" :alt="getAlt" lazy class="sw-image-simple-grid__image sw-image-simple-grid__image--right"/>
  </div>
</template>

<script>
import {
  SfImage
} from "@storefront-ui/vue";
import SwImage from "../elements/SwImage";
import { useSlotsPositions, useImageProps } from '@shopware-pwa/composables';

export default {
  name: 'SwImageSimpleGrid',
  components: {
    SwImage,
    SfImage
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const {leftBottomSlot, leftTopSlot, rightSlot } = useSlotsPositions(props.content.slots)
    const { getImgUrl, getAlt, getTitle} = useImageProps(rightSlot.value)

    return {leftBottomSlot, leftTopSlot, rightSlot, getImgUrl, getAlt, getTitle}
  }
};
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles.scss';

.sw-image-simple-grid {
  display: grid;
  grid-gap: 1rem;
  align-items: stretch;

  @include for-desktop {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    &__image {
      // margin: var(--spacer-medium);
      &--right {
        grid-column: 2;
        grid-row: 1 / 3;
      }  
      img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
      }
    }
  }
}

</style>
