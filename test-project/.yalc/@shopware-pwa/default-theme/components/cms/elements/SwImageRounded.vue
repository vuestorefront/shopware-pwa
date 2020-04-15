<template>
  <div class="sw-image-rounded">
    <SfImage :src="getImgUrl" :title="getTitle" :alt="getAlt" class="sw-image-rounded__image" lazy />
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
.sw-image-rounded {
  position: relative;
  display: flex;
  justify-content: center;
  &__image {
    margin: var(--spacer-big) 0;
    border-radius: 100%;
    img {
      width: 300px;
      height: 300px;
      object-fit: cover;
    }

  }
}
</style>