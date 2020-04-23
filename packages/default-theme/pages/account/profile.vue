<template>
  <SfTabs :open-tab="1">
    <SfTab title="Personal data">
      <SwPersonalInfo />
      <p class="notice">
        At Brand name, we attach great importance to privacy issues and are
        committed to protecting the personal data of our users. Learn more about
        how we care and use your personal data in the
        <a href="">Privacy Policy.</a>
      </p>
    </SfTab>
    <SfTab title="Email change">
      <SwEmail />
    </SfTab>
    <SfTab title="Password change">
      <SwPassword>
        <template #message="{user}">
          <p class="message">
            If you want to change the password to access your account, enter the
            following information:<br />Your current email address is
            <span class="message__label">{{ user && user.email }}</span>
          </p>
        </template>
      </SwPassword>
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue'
import { useUser } from '@shopware-pwa/composables'
import SwPassword from '@shopware-pwa/default-theme/components/forms/SwPassword'
import SwEmail from '@shopware-pwa/default-theme/components/forms/SwEmail'
import SwPersonalInfo from '@shopware-pwa/default-theme/components/forms/SwPersonalInfo'

export default {
  name: 'MyProfile',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SwEmail,
    SwPassword,
    SwPersonalInfo
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';


.notice {
  font-family: var(--font-family-primary);
  font-weight: var(--font-light);
  line-height: 1.6;
  margin: var(--spacer-base) 0 0 0;
  font-size: var(--font-2xs);

  @include for-desktop {
    max-width: 70%;
    margin: var(--spacer-xs) 0 0 0;
    font-size: var(--font-xs);
  }
}
</style>
