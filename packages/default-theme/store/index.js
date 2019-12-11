export const state = () => ({
  cart: null,
  page: null,
  user: null
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
  }
}

export const getters = {
  getCart: (state) => state.cart,
  getPage: (state) => state.page,
  getUser: (state) => state.user
}
