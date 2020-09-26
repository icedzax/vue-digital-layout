import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";

import Grid from "../views/Grid.vue";
import Draw from "../views/Draw.vue";
import OneMat from "../views/OneMat.vue";
import Kpi from "../views/Kpi.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Grid
  },
 
  {
    path: "/grid",
    name: "Grid",
    component: Grid
  },
  {
    path: "/draw",
    name: "Draw",
    component: Draw
  },
  {
    path: "/onemat",
    name: "OneMat",
    component: OneMat
  },
  {
    path: "/kpi",
    name: "Kpi",
    component: Kpi
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
