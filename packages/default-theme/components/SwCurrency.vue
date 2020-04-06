<template>
  <SfSelect
        v-model="selected"
        :class="customClass"
        :label="label"
        :size="size"
        :required="required"
        :valid="valid"
        :error-message="errorMessage"
        style="max-width: 13.75rem"
      >
        <SfSelectOption v-for="(option, key) in options" :key="key" :value="option.value">
          <SfProductOption :color="option.color" :label="option.label"></SfProductOption>
        </SfSelectOption>
      </SfSelect>
</template>
<script>
const options = [{ value: "amaranth", color: "#E52B50", label: "Amaranth" },
  { value: "amber", color: "#FFBF00", label: "Amber" },
  { value: "arctic-lime", color: "#D0FF14", label: "Arctic lime" },
  { value: "bluetiful", color: "#3C69E7", label: "Bluetiful" },
  { value: "buff", color: "#F0DC82", label: "Buff" }];
export default {
  name: 'SwCurrency',
  components: {
    SfSelect
  },
  data() {
    return {
      navigationElements: [],
      currentRoute: { routeLabel: '', routePath: '/' }
    }
  },
  setup() {
    const { toggleSidebar, isSidebarOpen } = useCartSidebar()
    const { routes } = useNavigation()
    const { toggleModal } = useUserLoginModal()
    const { isLoggedIn } = useUser()
    return {
      isLoggedIn,
      routes,
      isSidebarOpen,
      toggleSidebar,
      toggleModal
    }
  },
  watch: {
    currentRoute(nextRoute) {
      this.$router.push(nextRoute.routeLabel)
    }
  },
  methods: {
    userIconClick() {
      if (this.isLoggedIn) {
        this.$router.push(PAGE_ACCOUNT)
        return
      }
      this.toggleModal()
    }
  }
}
</script>
