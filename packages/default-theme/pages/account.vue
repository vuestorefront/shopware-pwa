<template>
  <SfContentPages 
        title="My account"
        :active="activePage"
        @click:change="updateActivePage"
      >
        <SfContentCategory title="Personal Details">
          <SfContentPage title="My profile">
            <SfTabs :open-tab="1">
              <SfTab title="Personal data">
                This website ("website") is operated by Luma Inc., which includes
                Luma stores, and Luma Private Sales. This privacy policy only covers
                information collected at this website, and does not cover any
                information collected offline by Luma. All Luma websites are covered
                by this privacy policy.
              </SfTab>
              <SfTab title="Password change">
                This website ("website") is operated by Luma Inc., which includes
                Luma stores, and Luma Private Sales. This privacy policy only covers
                information collected at this website, and does not cover any
                information collected offline by Luma. All Luma websites are covered
                by this privacy policy.
              </SfTab>
            </SfTabs>
          </SfContentPage>
          <SfContentPage title="Shipping details">
            <SfTabs :open-tab="1">
              <SfTab title="Shipping details">
                This website ("website") is operated by Luma Inc., which includes
                Luma stores, and Luma Private Sales. This privacy policy only covers
                information collected at this website, and does not cover any
                information collected offline by Luma. All Luma websites are covered
                by this privacy policy.
              </SfTab>
            </SfTabs>
          </SfContentPage>
          <SfContentPage title="My newsletter">
            <SfTabs :open-tab="1">
              <SfTab title="My newsletter">
                This website ("website") is operated by Luma Inc., which includes
                Luma stores, and Luma Private Sales. This privacy policy only covers
                information collected at this website, and does not cover any
                information collected offline by Luma. All Luma websites are covered
                by this privacy policy.
              </SfTab>
            </SfTabs>
          </SfContentPage>
        </SfContentCategory>
        <SfContentCategory title="Order details">
          <SfContentPage title="Order history">
            This website ("website") is operated by Luma Inc., which includes
            Luma stores, and Luma Private Sales. This privacy policy only covers
            information collected at this website, and does not cover any
            information collected offline by Luma. All Luma websites are covered
            by this privacy policy.
          </SfContentPage>
        </SfContentCategory>
        <SfContentPage title="Logout"></SfContentPage>
      </SfContentPages>
</template>
<script>
import { SfContentPages, SfTabs } from "@storefront-ui/vue"
import { useUser } from "@shopware-pwa/composables"

export default {
  name: 'Account',
  components: { SfContentPages, SfTabs },
  middleware: "auth",
  setup() {
    const { logout } = useUser()

    return { logout }
  },
  data() {
    return {
      activePage: "My profile"
    }
  },
  computed: {
  },
  methods: {
    async updateActivePage(title) {
        if (title === "Logout") {
          await this.logout();
          this.$router.push("/login")
        }
        this.activePage = title;
      }
  }
}
</script>
<style lang="scss" scoped>
@import '~@storefront-ui/vue/styles.scss';
@import '~@storefront-ui/shared/styles/helpers/visibility';

</style>
