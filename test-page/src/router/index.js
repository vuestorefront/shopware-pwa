import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import(/* webpackChunkName: "home" */ "../views/Home.vue");
const Category = () =>
  import(/* webpackChunkName: "category" */ "../views/Category.vue");
const Product = () =>
  import(/* webpackChunkName: "product" */ "../views/Product.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/category",
    name: "category",
    component: Category
  },
  {
    path: "/product/:id",
    name: "product",
    component: Product
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
