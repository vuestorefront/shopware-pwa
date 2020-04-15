<template>
  <div class="sw-image-highlight-row">
    <SwImage :content="leftSlot" class="sw-image-highlight-row__image"/>
    <SwImage :content="centerSlot" class="sw-image-highlight-row__image"/>
    <SwImage :content="rightSlot" class="sw-image-highlight-row__image"/>
  </div>
</template>

<script>
import SwImage from "../elements/SwImage";
import { useSlotsPositions } from '@shopware-pwa/composables';


export default {
  name: 'SwImageHighlightRow',
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

.sw-image-highlight-row {
  display: flex;
  flex-direction: column;

  &__image {
    margin: var(--spacer-medium);
    flex: 1;
    border: 12px solid #fff;
    & img {
      height: 340px;
      object-fit: cover;
      width: 100%;
    }
  }

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
}

</style>
