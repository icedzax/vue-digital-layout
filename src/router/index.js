import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";

import Grid from "../views/Grid.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Grid
  },
  {
    path: "/dev",
    name: "dev",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Dev.vue")
  },

  {
    path: "/grid",
    name: "Grid",
    component: Grid
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
