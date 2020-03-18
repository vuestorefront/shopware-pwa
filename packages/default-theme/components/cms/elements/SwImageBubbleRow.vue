<template>
  <div class="sw-image-bubble-row">
    <SwImage v-for="image in slots.slots" :key="image.id" :content="image"/>
  </div>
</template>

<script>
import SwImage from "./SwImage";
import { setContentOrder } from "../cmsNameMapper";
import { reactive } from "@vue/composition-api";

export default {
  name: 'SwImageBubbleRow',
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

.sw-image-bubble-row {
  display: flex;
  flex-direction: column;
  margin: var(--spacer-extra-big) 0;

  @include for-desktop {
    flex-direction: row;
    justify-content: space-around;
  }
}
::v-deep .sf-image {
  border-radius: 50%;
  margin: var(--spacer-small);
  & img {
    height: 300px;
    width: 300px;
    object-fit: cover;
  }

}
</style>
