export const state = () => ({
  cart: null
})

export const mutations = {
  SET_CART(state, cart) {
    state.cart = cart
  }
}

export const getters = {
  getCart: (state) => state.cart
}
