<template>
  <div v-if="product" id="product">
    <SwPluginSlot name="product-page-details-before" :slot-context="product" />
    <SwGoBackArrow class="product-page-back" />
    <div class="product">
      <SwProductGallery :product="product" class="product__gallery" />
      <div class="product__description">
        <SwProductDetails :product="product" :page="page" />
      </div>
    </div>

    <SwPluginSlot name="product-page-details-after" :slot-context="product" />

    <div class="product-reviews">
      <SfTabs :open-tab="1">
        <SfTab :title="'Reviews'">
          <div v-if="reviewsList.length" class="avaliable">
            <SfHeading
              :title="$t('Opinions (' + numberOfReviews + ')')"
              :level="3"
              class="headline"
            />
            <div class="reviews-list">
              <ul class="list">
                <li v-for="review in latestReviews" :key="review" class="item">
                  <div class="info">
                    <span class="author">
                      {{ review.name }}, {{ review.date }}
                    </span>
                    <span class="rating">
                      {{ review.rating }}
                    </span>
                  </div>
                  <p class="description">
                    {{ review.description }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="not-avaliable">
            <SfHeading
              :title="$t('0 of 0 reviews')"
              :level="3"
              class="headline"
            />

            <SwRating
              :score="Number.parseInt(max)"
              :max="5"
              :hover-effect="false"
            />

            <SfHeading
              :title="$t('Leave a review!')"
              :level="3"
              class="headline"
            />
            <SfHeading
              :title="$t('Share your experiences with other customers.')"
              :level="4"
              class="headline"
            />
          </div>
          <div class="add-review">
            <SfHeading
              :title="$t('Dodaj swoją opinię o produkcie')"
              :level="3"
              class="headline"
            />

            <form
              v-if="!formSent && isLoggedIn"
              action=""
              class="add-review-form"
              @submit.prevent="submit"
            >
              <div class="input-group">
                <SwRating
                  :score="Number.parseInt(max)"
                  :max="5"
                  :hover-effect="true"
                />
                <SfInput
                  v-model="title"
                  type="text"
                  label="Title"
                  name="title"
                  error-message="Title is required"
                  :valid="!$v.title.$error"
                  class="small input"
                  @blur="$v.title.$touch()"
                />

                <textarea
                  name="desc"
                  class="description-field"
                  placeholder="Write review"
                >
                </textarea>
              </div>

              <SwErrorsList :list="errorMessages" />

              <SwButton class="send button">
                {{ $t("Add review") }}
              </SwButton>
            </form>

            <SwButton
              v-if="!isLoggedIn"
              class="login button"
              @click="logInButtonClicked"
            >
              {{ $t("Log in") }}
            </SwButton>
          </div>
        </SfTab>
      </SfTabs>
    </div>

    <div v-if="crossSellCollection.length" class="products__recomendations">
      <div class="products-recomendations__section">
        <SfTabs :open-tab="1">
          <SfTab
            v-for="crossSell in crossSellCollection"
            :key="crossSell.id"
            :title="crossSell.translated.name"
          >
            <SwProductCarousel :products="crossSell.assignedProducts" />
          </SfTab>
        </SfTabs>
      </div>
    </div>

    <SfSection
      title-heading="Share Your Look"
      subtitle-heading="#YOURLOOK"
      class="section"
    >
      <div class="images-grid">
        <div class="images-grid__row">
          <div class="images-grid__col">
            <SfImage src="/img/imageA.png">katherina_trn</SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage src="/img/imageB.png">katherina_trn</SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage src="/img/imageC.png">katherina_trn</SfImage>
          </div>
        </div>
        <div class="images-grid__row">
          <div class="images-grid__col">
            <SfImage src="/img/imageC.png">katherina_trn</SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage src="/img/imageD.png">katherina_trn</SfImage>
          </div>
          <div class="images-grid__col">
            <SfImage src="/img/imageA.png">katherina_trn</SfImage>
          </div>
        </div>
      </div>
    </SfSection>
    <div class="product__advertisement">
      <SwProductAdvertisement />
    </div>
  </div>
</template>
<script>
import {
  SfImage,
  SfSection,
  SfTabs,
  SfHeading,
  SfInput,
} from "@storefront-ui/vue"
import {
  useProduct,
  useUser,
  useUIState,
  getApplicationContext,
} from "@shopware-pwa/composables"
import SwGoBackArrow from "@/components/atoms/SwGoBackArrow"
import SwRating from "@/components/atoms/SwRating"
import SwProductGallery from "@/components/SwProductGallery"
import SwProductDetails from "@/components/SwProductDetails"
import SwProductCarousel from "@/components/SwProductCarousel"
import SwProductAdvertisement from "@/components/SwProductAdvertisement"
import SwPluginSlot from "sw-plugins/SwPluginSlot"
import { validationMixin } from "vuelidate"
import { required, minLength } from "vuelidate/lib/validators"
import { getMessagesFromErrorsArray } from "@shopware-pwa/helpers"
import { ref } from "@vue/composition-api"

export default {
  name: "Product",
  components: {
    SwGoBackArrow,
    SfImage,
    SfSection,
    SfTabs,
    SwProductGallery,
    SwProductDetails,
    SwProductCarousel,
    SwProductAdvertisement,
    SwPluginSlot,
    SfHeading,
    SfInput,
    SwRating,
  },

  setup(props, { root }) {
    const { isLoggedIn } = useUser(root)
    const { switchState: switchLoginModalState } = useUIState(
      root,
      "LOGIN_MODAL_STATE"
    )
    const { apiInstance } = getApplicationContext(root, "SwFooter")
    const errorMessages = ref([])
    const title = ref(null)
    const description = ref(null)
    const stars = ref(null)
    const formSent = ref(false)
    const sendForm = async () => {
      try {
        await sendReview(
          {
            title: title.value,
            description: description.value,
            stars: stars.value,
          },
          apiInstance
        )
        formSent.value = true
      } catch (e) {
        errorMessages.value = getMessagesFromErrorsArray(e.message)
      }
    }

    return {
      isLoggedIn,
      switchLoginModalState,
      sendForm,
      errorMessages,
      formSent,
    }
  },

  mixins: [validationMixin],
  props: {
    page: {
      type: Object,
      default: () => ({}),
    },
    max: {
      type: Number || Boolean,
      default: () => ({}),
    },
  },

  data() {
    return {
      productWithAssociations: null,
      selectedSize: null,
      selectedColor: null,
      reviewsList: [
        {
          name: "Krecik",
          date: "01.02.2003",
          rating: 1,
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe consectetur sed repellendus amet, eaque dolores ducimus ea neque ex vel consequatur, nostrum voluptatem dignissimos mollitia, quisquam delectus nihil excepturi est?",
        },
        {
          name: "MacieYu",
          date: "02.04.2003",
          rating: 4,
          description:
            "Provident illum iusto nulla dolore eum, beatae earum necessitatibus accusamus repellendus labore, quasi officia accusantium odit eligendi? Voluptatum qui reiciendis eligendi molestias unde ducimus dicta veritatis suscipit doloremque, optio nihil!",
        },
        {
          name: "Oleczka",
          date: "01.22.0203",
          rating: 2,
          description:
            "Laboriosam consectetur beatae ratione, dolore sed atque, quos eveniet voluptatibus recusandae officiis praesentium debitis impedit vero incidunt nostrum iure voluptatum esse sunt aut deleniti nemo dolorum. Recusandae inventore atque nisi.",
        },
        {
          name: "Aleksa",
          date: "01.02.1943",
          rating: 3,
          description:
            "Voluptatem ut itaque quia perspiciatis qui odio deleniti, eligendi tempore mollitia dolor laudantium ex? Nostrum, beatae facilis consequuntur temporibus, iure quia atque eligendi rerum aperiam, esse omnis in facere distinctio!",
        },
        {
          name: "AleAleOla",
          date: "12.42.1199",
          rating: 5,
          description:
            "Enim inventore ad dolorem hic error, quo eos, omnis ipsum modi dolorum adipisci voluptate molestias, labore aliquid optio exercitationem id vel odit animi nisi sapiente? Quod nihil voluptates harum officia?",
        },
      ],
    }
  },
  computed: {
    product() {
      return this.productWithAssociations
        ? this.productWithAssociations.value
        : this.page.product
    },
    crossSellCollection() {
      return this.product.crossSellings || []
    },
    latestReviews() {
      return this.reviewsList.slice(0, 3)
    },
    numberOfReviews() {
      return this.reviewsList.length
    },
  },
  // load children association from the parent - variants and cross sells loading
  async mounted() {
    try {
      const { loadAssociations, product } = useProduct(this, this.page.product)
      await loadAssociations()
      this.productWithAssociations = product
    } catch (e) {
      console.error("ProductView:mounted:loadAssociations", e)
    }
  },
  methods: {
    async submit() {
      this.errorMessages = []
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      await this.sendForm()
    },
    logInButtonClicked() {
      this.switchLoginModalState(true)
    },
  },

  validations: {
    title: {
      required,
      minLength: minLength(3),
    },
    desc: {
      required,
      minLength: minLength(50),
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

@mixin for-iOS {
  @supports (-webkit-overflow-scrolling: touch) {
    @content;
  }
}

.products__recomendations {
  @include for-desktop {
    margin-top: var(--spacer-xl);
  }

  ::v-deep .sf-tabs__content {
    max-width: 100%;
  }
}

.product-reviews {
  ::v-deep .sf-tabs__content__tab {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  ::v-deep .sf-tabs {
    width: 100%;
  }

  .reviews-list {
    .list {
      list-style: none;
      padding-left: 0;

      .item {
        .info {
          align-items: center;
          display: flex;
          justify-content: space-between;
        }

        .description {
          font-weight: bolder;
          font-size: var(--font-sm);
          line-height: var(--font-lg);
          margin-top: var(--spacer-xs);
          margin-bottom: var(--spacer-lg);
        }
      }
    }
  }

  .avaliable {
    max-width: 520px;
    width: 100%;

    .headline {
      text-align: left;
    }
  }

  .not-avaliable {
    ::v-deep .sf-heading.headline {
      text-align: left;
    }
  }

  .add-review {
    width: 100%;
    max-width: 520px;

    .headline {
      margin-bottom: var(--spacer-xl);
    }
  }

  .add-review-form {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .button {
      &.send {
        width: 100%;
        margin-top: var(--spacer-xl);
      }
    }

    .input-group {
      width: 100%;
    }

    .description-field {
      border: 1px solid var(--c-light);
      box-sizing: border-box;
      font-size: var(--font-lg);
      margin-top: var(--spacer-base);
      min-height: 200px;
      padding: var(--spacer-base);
      width: 100%;

      &:focus {
        outline-color: var(--_c-green-primary);
      }
    }
  }

  .login.button {
    width: 100%;
    margin-top: var(--spacer-base);
  }

  .sw-rating {
    margin-bottom: var(--spacer-base);
    margin-top: var(--spacer-base);
  }
}

#product {
  position: relative;

  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}

.section {
  padding: 0 var(--spacer-base);
  @include for-desktop {
    padding: 0;
  }
}

.images-grid {
  &__row {
    display: flex;
    & + & {
      margin-top: calc(var(--spacer-base) / 2);
      @include for-desktop {
        margin-top: var(--spacer-base);
      }
    }
  }
  &__col {
    margin: 0;
    & + & {
      margin-left: calc(var(--spacer-base) / 2);
      @include for-desktop {
        margin-left: var(--spacer-base);
      }
    }
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
    padding: 0 var(--spacer-sm);
    @include for-desktop {
      margin-left: calc(var(--spacer-base) * 3);
    }
  }
}

.product-page-back {
  left: 0.5rem;
  position: absolute;
  top: 1.5rem;
  z-index: 4;
}
</style>
