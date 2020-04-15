<template>
  <div class="sw-image">
    <SfImage :src="getImgUrl" :title="getTitle" :alt="getAlt" lazy />
  </div>
</template>

<script>
import {
  SfImage
} from "@storefront-ui/vue";

import {useImageProps} from '@shopware-pwa/composables'

export default {
  components: {
    SfImage
  },
  props: {
    content: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props) {
    const { getImgUrl, getAlt, getTitle} = useImageProps(props.content)

    return {getImgUrl, getAlt, getTitle}
  },
};
</script>

<style lang="scss">
.sw-image {
  position: relative;
  display: flex;
  justify-content: center;
  // width: 100%;
  // height: 100%;
}
</style>