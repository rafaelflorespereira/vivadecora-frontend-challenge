import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LikedMovies from "../views/LikedMovies.vue";
import NotLikedMovies from "../views/NotLikedMovies.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/not-liked-movies",
    name: "NotLikedMovies",
    component: NotLikedMovies,
  },
  {
    path: "/liked-movies",
    name: "LikedMovies",
    component: LikedMovies,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
