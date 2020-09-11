export const state = () => ({
  cart: null,
  page: null,
  user: null,
  sessionContext: null,
  locales: ["en-GB", "de-DE"],
  locale: "en-GB",
  initialListings: {},
  currentListings: {},
  appliedListings: {},
})

export const mutations = {
  SET_CART(state, cart) {
    state.cart = cart
  },
  SET_PAGE(state, page) {
    state.page = page
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_SESSION_CONTEXT(state, sessionContext) {
    state.sessionContext = sessionContext
  },
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  SET_INITIAL_LISTING(state, { listingKey, initialListing }) {
    state.initialListings = Object.assign({}, state.initialListings, {
      [listingKey]: initialListing,
    })
  },
  SET_CURRENT_LISTING(state, { listingKey, currentListing }) {
    state.currentListings = Object.assign({}, state.currentListings, {
      [listingKey]: currentListing,
    })
  },
  SET_APPLIED_LISTING(state, { listingKey, appliedListing }) {
    state.appliedListings = Object.assign({}, state.appliedListings, {
      [listingKey]: appliedListing,
    })
  },
}

export const getters = {
  getCart: (state) => state.cart,
  getPage: (state) => state.page,
  getUser: (state) => state.user,
  getSessionContext: (state) => state.sessionContext,
  getInitialListings: (state) => state.initialListings,
  getCurrentListings: (state) => state.currentListings,
  getAppliedListings: (state) => state.appliedListings,
}
