import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "../views/Home.vue";

import Grid from "../views/Grid.vue";
import Draw from "../views/Draw.vue";
import OneMat from "../views/OneMat.vue";
import Kpi from "../views/Kpi.vue";
import Tel from "../views/Tel.vue";
import Hh from "../views/Hh.vue";
import Ppf from "../views/Ppf.vue";
import Gapi from "../views/Gapi.vue";
import Sd from "../views/Sd.vue";

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
  },
  {
    path: "/tel",
    name: "Tel",
    component: Tel
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
