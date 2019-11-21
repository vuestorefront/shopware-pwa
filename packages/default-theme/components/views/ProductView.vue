<template>
  <div id="product" v-if="product">
    <div class="product">
      <div class="product__gallery">
        <SfImage v-if="mainImage"
          :src="mainImage"
          class="desktop-only"
        />
       
        <SfGallery v-if="mediaGallery"
          class="gallery-mobile mobile-only"
          :images="mediaGallery"
        />
      </div>

    <div class="product__description">
        <SfSticky class="product-details">
          <div class="product-details__mobile-top">
            <div>
              <SfHeading
                :title="name"
                :level="1"
                class="sf-heading--no-underline sf-heading--left product-details__heading"
              />
              <div class="product-details__sub">
                <SfPrice
                  :regular="`$${price}`"
                  class="sf-price--big product-details__sub-price"
                />
                <div class="product-details__sub-rating" v-if="reviews.length">
                  <SfRating :score="ratingAverage" :max="5" />
                  <div class="product-details__sub-reviews desktop-only">
                    Read all {{ reviews.length }} review
                  </div>
                  <div class="product-details__sub-reviews mobile-only">
                    ({{ reviews.length }})
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="product-details__description desktop-only">
            {{ description }}
          </p>
          <div class="product-details__action">
            <button class="sf-action" v-if="sizes.length > 0">Size guide</button>
          </div>
          <div class="product-details__section" v-if="isSimple">
            <SfProperty v-if="color"
            name="Color"
            :value="color.name"/>
            <SfProperty v-if="size"
            name="Size"
            :value="size.name"/>  
          </div>
          <div class="product-details__section" v-if="hasChildren">
            <SfSelect
              v-if="sizes.length"
              v-model="selectedSize"
              label="Size"
              class="sf-select--bordered product-details__attribute"
            >
              <SfSelectOption
                v-for="size in sizes"
                :key="size.value"
                :value="size.value"
              >
                <SfProductOption :label="size.label" />
              </SfSelectOption>
            </SfSelect>
            <SfSelect
              v-if="colors.length"
              v-model="selectedColor"
              label="Color"
              class="sf-select--bordered product-details__attribute"
            >
              <SfSelectOption
                v-for="color in colors"
                :key="color.value"
                :value="color.value"
              >
                <SfProductOption :label="color.label" :color="color.color" />
              </SfSelectOption>
            </SfSelect>
          </div>
          <div class="product-details__section">
            <SfAlert
              message="Low in stock"
              type="warning"
              class="product-details__alert mobile-only"
            />
            <SfAddToCart
              :stock="stock"
              v-model="qty"
              :canAddToCart="stock > 0"
              class="product-details__add-to-cart"
              @click="addToCart"
            />
            <div class="product-details__action">
              <button class="sf-action">Save for later</button>
            </div>
            <div class="product-details__action">
              <button class="sf-action">Add to compare</button>
            </div>
          </div>
          <SfTabs class="product-details__tabs" :openTab="1">
            <SfTab title="Description">
              <div>
                <p>
                 {{ product.description }}
                </p>
              </div>
            </SfTab>
            <SfTab title="Properties">
              <div class="product-details__properties">
                <SfProperty
                  v-for="(property, i) in properties"
                  :key="i"
                  :name="property.name"
                  :value="property.value"
                  class="product-property"
                />
              </div>
            </SfTab>
            <SfTab title="Read reviews" v-if="reviews.length">
              <SfReview
                class="product-details__review"
                v-for="review in reviews"
                :key="review.id"
                :author="review.externalUser ? review.externalUser : review.customerId"
                :date="review.createdAt"
                :message="review.content"
                :rating="review.points"
                :max-rating="5"
              />
            </SfTab>
            <SfTab title="Manufacturer" v-if="product.manufacturer">
              <SfHeading
                :title="product.manufacturer.name"
                :level="3"
                class="sf-heading--no-underline sf-heading--left"
              />
              <p v-if="product.manufacturer.description">
                {{ product.manufacturer.description }}
              </p>
            </SfTab>
          </SfTabs>
        </SfSticky>
      </div>


    </div>
  </div>
</template>
<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfProductOption,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfProductCard,
  SfCarousel,
  SfSection,
  SfImage,
  SfBanner,
  SfBottomNavigation,
  SfCircleIcon,
  SfIcon,
  SfAlert,
  SfSticky,
  SfReview
} from "@storefront-ui/vue";
 import { getProduct, getPage } from "@shopware-pwa/shopware-6-client";
const extractProductId = (path) => { // TODO remove when page resolver is fully done
      const productId = path.substring(path.search(/[0-9a-fA-F]{32}/))
      return productId
    }
export default {
  name: "Product",
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    SfAlert,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfProductOption,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfProductCard,
    SfCarousel,
    SfSection,
    SfImage,
    SfBanner,
    SfBottomNavigation,
    SfCircleIcon,
    SfIcon,
    SfSticky,
    SfReview
  },
  data() {
    return {
      qty: "1",
      productWithAssociations: null,
      relatedProducts: [],
      selectedSize: null,
      selectedColor: null
    };
  },
  async mounted() {
    // TODO remove when page resolver is fully done
    const associations = {
      "associations[media][]": true,
      "associations[options][associations][group][]": true,
      "associations[properties][associations][group][]": true,
      "associations[productReviews][]": true,
      "associations[manufacturer][]": true,
      "associations[children][associations][options][associations][group][]": true,
    }
    this.productWithAssociations = await getProduct(extractProductId(this.$route.params.pathMatch), associations);
  },
  computed: {
    price() {
      return this.product && this.product.price ? this.product.price[0].gross : 0
    },
    name(){
      return this.product && this.product.name || this.productWithAssociations && this.productWithAssociations.name
    },
    description() {
      return this.product && this.product.description
    },
    ratingAverage(){
      return this.product && this.product.ratingAverage
    },
    hasChildren() {
      return this.productWithAssociations && this.productWithAssociations.childCount > 0
    },
    isSimple() {
      return this.productWithAssociations && !!this.productWithAssociations.parentId
    },
    mainImage() {
      return this.product && this.product.cover ? this.product.cover.media.url : '/img/product_thumb.png'
    },
    mediaGallery() {
      return this.productWithAssociations && this.productWithAssociations.media ? this.productWithAssociations.media.map(media => 
        {
            const smallThumb = media.media.thumbnails.find(thumb => thumb.width == "400")
            const normalThumb = media.media.thumbnails.find(thumb => thumb.width == "800")
            const bigThumb = media.media.thumbnails.find(thumb => thumb.width == "1920")
            return {
              small: { url: smallThumb ? smallThumb.url : "" },
              normal: { url: normalThumb ? normalThumb.url: "" },
              big: { url: bigThumb ? bigThumb.url: "" }
            }
        }
      ) : []
    },
    properties() {
      if (!this.productWithAssociations || !this.productWithAssociations.properties) {
        return []
      }

      const propertyList = this.productWithAssociations.properties.map(property => ({
        name: property.group.name,
        value: property.name
      }))
 
      return propertyList
    },
    color() {
      if (!this.isSimple) {
        return ""
      }

      return this.productWithAssociations.options.find(option => option.group.name === "color")
    },
    size() {
      if (!this.isSimple) {
        return ""
      }

      return this.productWithAssociations.options.find(option => option.group.name === "size")
    },
    colors() {
      if (!this.productWithAssociations || !this.productWithAssociations.children) {
        return []
      }
      
      return this.extractOptions("color")
    },
    sizes() {
      if (!this.productWithAssociations || !this.productWithAssociations.children) {
        return []
      }

      return this.extractOptions("size")
    },
    reviews() {
      return this.productWithAssociations && this.productWithAssociations.productReviews || []
    },
    stock() {
      return this.product && this.product.stock
    }
  },

  methods: {

    addToCart() {
      console.info("add to cart: ",this.product.id)
    },
    toggleWishlist(index) {
      this.products[index].isOnWishlist = !this.products[index].isOnWishlist;
    },
    extractOptions(type) {
      if (!this.productWithAssociations || !this.productWithAssociations.children) {
        return []
      }

      const typeOptions = new Map();
      this.productWithAssociations.children.forEach(variant => {
        
          for(let option of variant.options) {
            if (option.group.name === type) {
              if (!typeOptions.has(option.id)) {
                typeOptions.set(option.id, {
                  label: option.name,
                  value: variant.id,
                  color: option.name
                })
              }
            }
          }
      })
      return Array.from(typeOptions.values())
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/variables";
@import "~@storefront-ui/shared/styles/helpers/visibility";
@import "~@storefront-ui/vue/src/utilities/transitions/transitions.scss";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
@mixin for-iOS {
  @supports (-webkit-overflow-scrolling: touch) {
    @content;
  }
}

#product {
  box-sizing: border-box;
  margin: 0 0 60px 0;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
.product-details {
  &__action {
    display: flex;
    margin: $spacer-big 0 ($spacer-big / 2);
    @include for-desktop {
      justify-content: flex-end;
    }
  }
  &__add-to-cart {
    margin-top: 1.5rem;
    @include for-desktop {
      margin-top: $spacer-extra-big;
    }
  }
  &__alert {
    margin-top: 1.5rem;
  }
  &__attribute {
    margin-bottom: $spacer-big;
  }
  &__description {
    margin: $spacer-extra-big 0 ($spacer-big * 3) 0;
    font-family: $body-font-family-secondary;
    font-size: $font-size-regular-mobile;
    line-height: 1.6;
    @include for-desktop {
      font-size: $font-size-regular-desktop;
    }
  }
  &__divider {
    margin-top: 30px;
  }
  &__heading {
    margin-top: $spacer-big;
    ::v-deep .sf-heading__title {
      font-size: $font-size-big-mobile;
      font-weight: $body-font-weight-primary;
      @include for-desktop {
        font-size: $h1-font-size-desktop;
        font-weight: $body-font-weight-secondary;
      }
    }
    @include for-desktop {
      margin-top: 0;
    }
  }
  &__mobile-bar {
    display: none;
    padding: $spacer-medium 0;
    box-sizing: border-box;
    .product--is-active & {
      display: block;
      @include for-desktop {
        display: none;
      }
    }
    @include for-desktop {
      display: none;
    }
  }
  &__mobile-top {
    display: flex;
    align-items: center;
    @include for-desktop {
      display: block;
    }
  }
  &__properties {
    margin-top: $spacer-big;
  }
  &__sub {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__sub-price {
    flex-basis: 100%;
    margin-top: $spacer-big / 4;
    @include for-desktop {
      flex-basis: auto;
      margin-top: $spacer-big / 2;
    }
  }
  &__sub-rating {
    display: flex;
    margin-top: $spacer-big / 2;
    @include for-desktop {
      margin-left: auto;
    }
  }
  &__sub-reviews {
    margin-left: 10px;
    font-size: 0.75rem;
  }
  &__section {
    border-bottom: 1px solid #f1f2f3;
    padding-bottom: 10px;
    @include for-desktop {
      border: 0;
      padding-bottom: 0;
    }
  }
  &__tabs {
    margin-top: $spacer-big;
    @include for-desktop {
      margin-top: 5 * $spacer-big;
    }
    p {
      margin: 0;
    }
  }
  &__review {
    padding-bottom: $spacer-big;
    @include for-desktop {
      padding-bottom: $spacer-extra-big;
      border-bottom: 1px solid $c-light-primary;
    }
    & + & {
      padding-top: $spacer-extra-big;
      border-top: 1px solid $c-light-primary;
      @include for-desktop {
        border-top: 0;
        padding-top: $spacer-extra-big;
      }
    }
  }
}
.product-property {
  padding: $spacer-small 0;
}
.gallery-mobile {
  $height-other: 240px;
  $height-iOS: 265px;

  height: calc(100vh - #{$height-other});
  @supports (-webkit-overflow-scrolling: touch) {
    height: calc(100vh - #{$height-iOS});
  }
  ::v-deep .glide {
    &,
    * {
      height: 100%;
    }
    &__slide {
      position: relative;
      overflow: hidden;
    }
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      min-width: calc((375 / 490) * (100vh - #{$height-other}));
      @supports (-webkit-overflow-scrolling: touch) {
        min-width: calc((375 / 490) * (100vh - #{$height-iOS}));
      }
    }
  }
  ::v-deep .sf-gallery__stage {
    width: 100%;
  }
}
.section {
  @media (max-width: $desktop-min) {
    padding-left: $spacer-big;
    padding-right: $spacer-big;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__gallery,
  &__description {
    flex: 1;
  }
  &__description {
    padding: 0 $spacer-big;
    @include for-desktop {
      margin-left: $spacer-big * 5;
    }
  }
}
/* we have PR to fix bullets position */
.sf-gallery {
  $this: &;
  ::v-deep {
    ul {
      margin: 0;
    }
    #{$this}__thumbs {
      left: 50%;
      transform: translateX(-50%);
      top: auto;
      bottom: 10px;
      display: flex;
    }
    #{$this}__item {
      &:not(:first-child) {
        margin: 0 0 0 $spacer;
      }
    }
  }
}
/* same on the home, category */
.bottom-navigation-circle {
  opacity: 1;
}
/* same on the home */
.banner-application {
  min-height: 420px;
  max-width: 1040px;
  margin: auto;
  padding-right: calc(25% + 5rem);
  padding-left: 2.5rem;
  line-height: 1.6;
  &__title {
    margin: $spacer-big 0 0 0;
    font-size: $h1-font-size-desktop;
    font-weight: $h1-font-weight-desktop;
  }
  &__subtitle {
    color: #a3a5ad;
    font-family: $body-font-family-primary;
    font-size: $font-size-extra-big-desktop;
    font-weight: $body-font-weight-primary;
  }
  &__download {
    max-height: 47px;
    margin-top: $spacer-extra-big;
    & + & {
      margin-left: $spacer-big;
    }
  }
}
.product-card {
  max-width: unset; // ?
  &:hover {
    @include for-desktop {
      box-shadow: 0px 4px 20px rgba(168, 172, 176, 0.19);
    }
  }
}
.product-carousel {
  margin: -20px -#{$spacer-big} -20px 0;
  @include for-desktop {
    margin: -20px 0;
  }
  ::v-deep .sf-carousel__wrapper {
    padding: 20px 0;
    @include for-desktop {
      padding: 20px;
      max-width: calc(100% - 216px);
    }
  }
}
.grid {
  &__row {
    display: flex;
    & + & {
      margin-top: $spacer-big / 2;
      @include for-desktop {
        margin-top: $spacer-big;
      }
    }
  }
  &__col {
    margin: 0;
    & + & {
      margin-left: $spacer-big / 2;
      @include for-desktop {
        margin-left: $spacer-big;
      }
    }
  }
}
/* TODO: Add SfAction component or add SfButton modifier */
.sf-action {
  padding: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  color: $c-text-primary;
  font-family: $body-font-family-secondary;
  font-size: $font-size-regular-mobile;
  font-weight: $body-font-weight-secondary;
  line-height: 1.6;
  text-decoration: underline;
  cursor: pointer;
  @include for-desktop {
    font-size: $font-size-regular-desktop;
  }
}
</style>
