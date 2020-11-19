<template>
  <div v-if="address">
    <div class="shipping__content">
      <p class="shipping__address">
        <span class="shipping__client-name">
          {{ firstName }} {{ lastName }}
        </span>
        <br />
        {{ street }}
        <br />
        {{ zipcode }} {{ city }}
        <br />
        {{ country }}
      </p>
      <p class="shipping__address" v-if="phone">
        {{ phone }}
      </p>
    </div>
    <div class="shipping__actions">
      <SfIcon
        icon="shipping"
        :color="isDefaultShipping ? 'primary' : 'grey'"
        size="md"
        role="button"
        v-on:click="$emit('selectDefaultAddress', address.id, 'shipping')"
        :title="
          isDefaultShipping
            ? $t('Default shipping address')
            : $t('set as default')
        "
        :class="isDefaultShipping ? 'info' : null"
      />
      <SfIcon
        icon="credits"
        :color="isDefaultBilling ? 'primary' : 'grey'"
        size="md"
        role="button"
        v-on:click="$emit('selectDefaultAddress', address.id, 'billing')"
        :title="
          isDefaultBilling
            ? $t('Default billing address')
            : $t('set as default')
        "
        :class="isDefaultBilling ? 'info' : null"
      />
      <SfIcon
        icon="cross"
        :color="isDefaultBilling || isDefaultShipping ? 'grey' : 'pink-primary'"
        size="xs"
        role="button"
        :title="$t('Delete')"
        v-on:click="
          isDefaultBilling ||
            isDefaultShipping ||
            $emit('deleteAddress', address.id)
        "
        :class="{ info: isDefaultBilling || isDefaultShipping }"
      />
      <SfIcon
        icon="chevron_right"
        color="grey"
        size="xs"
        role="button"
        :title="$t('Edit')"
        v-on:click="$emit('editAddress', address.id)"
      />
    </div>
  </div>
</template>
<script>
import { SfIcon } from "@storefront-ui/vue"

export default {
  name: "Address",
  components: { SfIcon },
  props: {
    address: {
      type: Object,
      default: () => {},
    },
    isDefaultBilling: {
      type: Boolean,
      default: false,
    },
    isDefaultShipping: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    firstName() {
      return this.address.firstName
    },
    lastName() {
      return this.address.lastName
    },
    street() {
      return this.address.street
    },
    city() {
      return this.address.city
    },
    zipcode() {
      return this.address.zipcode
    },
    phone() {
      return this.address.phoneNumber
    },
    country() {
      return this.address.country && this.address.country.name
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.shipping {
  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }
  &__content {
    flex: 1;
    color: var(--c-text);
    font-size: var(--font-size--xs);
    font-weight: 300;
    line-height: 1.6;
    @include for-desktop {
      font-size: var(--font-size--sm);
    }
  }
  &__actions {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }

    .sf-icon {
      margin-left: 10px;
      cursor: pointer;
    }

    .sf-icon:not(.info) {
      margin-left: 10px;
      cursor: pointer;
    }

    .sf-button {
      font-size: 0.7rem;
    }
  }
  &__button-mark {
    background-color: var(--c-light);
    color: var(--c-text-muted);
    @include for-desktop {
      margin-left: var(--spacer-base);
    }
  }
  &__address {
    margin: 0 0 var(--spacer-base) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__client-name {
    font-size: var(--font-size--base);
    font-weight: 500;
  }
}
</style>
