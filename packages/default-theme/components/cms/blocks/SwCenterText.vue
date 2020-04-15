<template>
  <div class="sw-center-text">
    <SwImage :content="leftSlot" class="sw-center-text__image"/>
    <SwTextSlot :content="centerSlot" class="sw-center-text__text"/>
    <SwImage :content="rightSlot" class="sw-center-text__image"/>
  </div>
</template>

<script>
import SwImage from "../elements/SwImage";
import SwTextSlot from '../elements/SwTextSlot'
import { useSlotsPositions } from '@shopware-pwa/composables';

export default {
  name: 'SwImageThreeColumn',
  components: {
    SwImage,
    SwTextSlot
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

.sw-center-text {
  display: flex;
  flex-direction: column;

  &__image, &__text {
    margin: var(--spacer-medium);
    flex: 1;
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
