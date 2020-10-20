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
import P8 from "../views/P8.vue";
import WPN from "../views/Wpn.vue";
import Checklist from "../views/Checklist.vue";


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
  {
    path: "/hh",
    name: "Handheld",
    component: Hh
  }
  ,
  {
    path: "/ppf",
    name: "ppf",
    component: Ppf
  },
  {
    path: "/gapi",
    name: "Gapi",
    component: Gapi
  },
  {
    path: "/sd",
    name: "Sd",
    component: Sd
  }
  ,
  {
    path: "/p8",
    name: "P8",
    component: P8
  }
  ,
  {
    path: "/wpn",
    name: "WPN",
    component: WPN
  }
  ,{
    path: "/checklist",
    name: "checklist",
    component: Checklist
  }
  
   
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
