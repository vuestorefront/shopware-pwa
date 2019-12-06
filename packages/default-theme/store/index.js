export const state = () => ({
  cart: null,
  page: null
})

export const mutations = {
  SET_CART(state, cart) {
    state.cart = cart
  },
  SET_PAGE(state, page) {
    state.page = page
  }
}


export const getters = {
  getCart: (state) => state.cart,
  getPage: (state) => state.page
}
