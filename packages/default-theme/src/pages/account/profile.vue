<template>
  <SfTabs :open-tab="1">
    <SfTab :title="$t('Personal data')">
      <SwPersonalInfo />
      <p class="notice">
        <i18n path="privacy-info" tag="p">
          {{ $t("brand-name") }}
          <a :href="url" target="_blank">
            {{ $t("privacy-link") }}
          </a>
        </i18n>
      </p>
    </SfTab>
    <SfTab :title="$t('Password change')">
      <SwPassword>
        <template #message="{ user }">
          <p class="message">
            {{
              $t(
                "If you want to change the password to access your account, enter the " +
                  "following information:"
              )
            }}
            <br />
            {{ $t("Your current email address is") }}
            <span class="message__label">{{ user && user.email }}</span>
          </p>
        </template>
      </SwPassword>
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfTabs } from "@storefront-ui/vue"
import SwPassword from "@/components/forms/SwPassword"
import SwPersonalInfo from "@/components/forms/SwPersonalInfo"

export default {
  name: "MyProfile",
  components: {
    SfTabs,
    SwPassword,
    SwPersonalInfo,
  },
  data() {
    return {
      url: "",
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.notice {
  max-width: 31rem;
  margin: var(--spacer-base) 0 0 0;
  font-size: var(--font-2xs);
  &__link {
    color: var(--c-primary);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
</style>
