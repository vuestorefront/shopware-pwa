<template>
  <div class="sw-image-text-cover">
    <SwImage :content="leftSlot" class="sw-image-text-cover__image"/>
    <SwTextSlot :content="rightSlot" class="sw-image-text-cover__text"/>
  </div>
</template>

<script>
import SwImage from "../elements/SwImage";
import SwTextSlot from '../elements/SwTextSlot'
import { useSlotsPositions } from '@shopware-pwa/composables';

export default {
  name: 'SwImageTextCover',
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
    const {leftSlot, rightSlot} = useSlotsPositions(props.content.slots)

    return {leftSlot, rightSlot}
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

.sw-image-text-cover {
  display: flex;
  flex-direction: column;

  &__image, &__text {
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