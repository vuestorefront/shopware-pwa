import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _459a352d = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/account.vue' /* webpackChunkName: "pages/account" */
    )
  )
const _986cc480 = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/account/addresses.vue' /* webpackChunkName: "pages/account/addresses" */
    )
  )
const _4a4946d2 = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/account/addresses/add.vue' /* webpackChunkName: "pages/account/addresses/add" */
    )
  )
const _7685db7d = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/account/addresses/add/_id.vue' /* webpackChunkName: "pages/account/addresses/add/_id" */
    )
  )
const _64024837 = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/account/orders.vue' /* webpackChunkName: "pages/account/orders" */
    )
  )
const _da4c8c72 = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/account/profile.vue' /* webpackChunkName: "pages/account/profile" */
    )
  )
const _f3241a14 = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/checkout.vue' /* webpackChunkName: "pages/checkout" */
    )
  )
const _66983669 = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/login.vue' /* webpackChunkName: "pages/login" */
    )
  )
const _446f0649 = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/success-page.vue' /* webpackChunkName: "pages/success-page" */
    )
  )
const _5b3cdf42 = () =>
  interopDefault(
    import(
      '../node_modules/@shopware-pwa/default-theme/pages/_.vue' /* webpackChunkName: "pages/_" */
    )
  )

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [
    {
      path: '/account',
      component: _459a352d,
      name: 'account',
      children: [
        {
          path: 'addresses',
          component: _986cc480,
          name: 'account-addresses',
          children: [
            {
              path: 'add',
              component: _4a4946d2,
              name: 'account-addresses-add',
              children: [
                {
                  path: ':id?',
                  component: _7685db7d,
                  name: 'account-addresses-add-id',
                },
              ],
            },
          ],
        },
        {
          path: 'orders',
          component: _64024837,
          name: 'account-orders',
        },
        {
          path: 'profile',
          component: _da4c8c72,
          name: 'account-profile',
        },
      ],
    },
    {
      path: '/checkout',
      component: _f3241a14,
      name: 'checkout',
    },
    {
      path: '/login',
      component: _66983669,
      name: 'login',
    },
    {
      path: '/success-page',
      component: _446f0649,
      name: 'success-page',
    },
    {
      path: '/*',
      component: _5b3cdf42,
      name: 'all',
    },
  ],

  fallback: false,
}

export function createRouter() {
  return new Router(routerOptions)
}
