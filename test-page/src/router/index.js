import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import(/* webpackChunkName: "home" */ "../views/Home.vue");
const Category = () =>
  import(/* webpackChunkName: "category" */ "../views/Category.vue");

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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
