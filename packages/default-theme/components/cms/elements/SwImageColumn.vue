<template>
  <div class="sw-image-column">
    <SwImage v-for="image in slots.slots" :key="image.id" :content="image"/>
  </div>
</template>

<script>
import SwImage from "./SwImage";
import { setContentOrder } from "../cmsNameMapper";
import { reactive } from "@vue/composition-api";

export default {
  name: 'SwImageColumn',
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
    const slots = reactive(setContentOrder(props.content))
    return {slots}
  }
};
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';

.sw-image-column {
  display: flex;
  flex-direction: column;
  margin: var(--spacer-extra-big) 0;

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
  }
}
::v-deep .sf-image {
  margin: var(--spacer-medium);
  flex: 1;
  & img {
    object-fit: cover;
  }

}
</style>
