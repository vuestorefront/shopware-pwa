const Home = () => import("src/themes/capybara/pages/Home.vue");
const Category = () => import("src/themes/capybara/pages/Category.vue");

let routes = [{ name: "home", path: "/", component: Home, alias: "/pwa.html" }];

export default routes;
