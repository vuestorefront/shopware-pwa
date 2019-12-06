export const state = () => ({
  cart: null,
  page: null,
  user: null,
  cartSidebar: false
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
  SET_CARTSIDEBAR(state, cartSidebar) {
    state.cartSidebar = cartSidebar
  }
}

export const getters = {
  getCart: (state) => state.cart,
  getPage: (state) => state.page,
  getUser: (state) => state.user,
  getCartSidebar: (state) => state.cartSidebar
}
