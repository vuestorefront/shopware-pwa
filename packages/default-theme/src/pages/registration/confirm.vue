<template>
  <div class="sw-registration-confirm">
    <SfHeading :level="2" :title="$t('Account confirmation')" />
    <SfLoader class="sw-loader" :loading="loading">
      <div class="sw-registration-confirm__form">
        <SfHeading
          v-if="errors.length && !success"
          :level="3"
          :title="$t('Something went wrong...')"
        />
        <SfHeading
          v-if="success"
          :level="3"
          :title="
            $t('Great! You account has been confirmed and it\'s active now.')
          "
          :description="
            redirectTo &&
            $t('You will be redirected in 5 seconds to finish the checkout...')
          "
        />
        <SwErrorsList :list="errors" />
      </div>
    </SfLoader>
    <SwButton
      @click="$router.push($routing.getUrl('/'))"
      class="sw-registration-confirm__home-btn"
    >
      <SfIcon icon="chevron_left" color="white" size="20px" />
      {{ $t("Return to homepage") }}
    </SwButton>
  </div>
</template>
<script>
import { ref, onMounted, watch, onDeactivated } from "@vue/composition-api"
import { confirmAccountRegistration } from "@shopware-pwa/shopware-6-client"
import {
  getApplicationContext,
  useBreadcrumbs,
  useSessionContext,
  useUser,
} from "@shopware-pwa/composables"
import { SfLoader, SfHeading, SfNotification, SfIcon } from "@storefront-ui/vue"

export default {
  name: "ResetPassword",
  components: {
    SfLoader,
    SfHeading,
    SfNotification,
    SfIcon,
    SwButton: () => import("@/components/atoms/SwButton.vue"),
    SwErrorsList: () => import("@/components/SwErrorsList.vue"),
  },
  setup(props, { root }) {
    const { setBreadcrumbs } = useBreadcrumbs()
    const { refreshUser } = useUser()

    const { apiInstance, i18n, router, routing } = getApplicationContext({
      contextName: "AccountRegistrationConfirm",
    })
    setBreadcrumbs([
      {
        name: i18n.t("Email confirmation"),
        path: "/registration/confirm",
      },
    ])
    const {
      context: {
        query: { hash, em, redirectTo },
      },
    } = root

    const success = ref(false)
    const errors = ref([])
    const loading = ref(true)
    const redirectTimer = ref()
    const redirectUser = (redirectTo) =>
      setTimeout(() => {
        router.push(redirectTo)
      }, 5000)

    onMounted(async () => {
      try {
        const response = await confirmAccountRegistration(
          {
            hash,
            em,
          },
          apiInstance
        )
        success.value = response?.active
      } catch (error) {
        errors.value = error.messages
      } finally {
        loading.value = false
      }
    })

    watch(
      () => success.value,
      () => {
        if (success.value) {
          refreshUser()
          if (redirectTo) {
            redirectTimer.value = redirectUser(redirectTo)
          }
        }
      }
    )

    onDeactivated(() => clearTimeout(redirectTimer.value))

    return {
      success,
      errors,
      loading,
      redirectTo,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables";

.sw-registration-confirm {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 var(--spacer-sm);

  &__form {
    margin-bottom: var(--spacer-2xl);

    .errors-list-component {
      margin: 0 auto;
      max-width: 30vw;
      padding: var(--spacer-sm);
    }
  }

  &__home-btn {
    margin: 0 auto;
  }
  .sw-loader {
    min-height: 10vh;
  }
  .sf-notification {
    max-width: inherit;
    margin: var(--spacer-xl) 0;
  }
}
</style>
