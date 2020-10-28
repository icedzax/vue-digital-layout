<template>
  <div class="Grid">
    <!--     {{ device + windowWidth }} -->

    <!-- <v-tabs v-model="tab" background-color="sec" color="sec" grow>
      <v-tab @click="secChange(mr, '0')">
        <b>P8</b>
      </v-tab>
      <v-tab v-for="item in items" :key="item" @click="secChange(mr, item)">
        {{ "ช่อง " + item }}
      </v-tab>
    </v-tabs> -->

    <grid-layout
      :layout.sync="layout"
      :col-num="setup.colnum"
      :row-height="10"
      :is-draggable="false"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="false"
      :margin="[5, 5]"
      :use-css-transforms="true"
      v-bind:style="styleLayout"
    >
      <div class="Grid-Bin" v-on:click="greet">
        <grid-item
          v-for="item in layout"
          v-bind:class="gridColor(item.month)"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.location"
        >
          {{ item.i }}
        </grid-item>
      </div>
    </grid-layout>
    {{ layout.x }}

    <!--   <v-main>
      <Dev :secpick="pick" />
    </v-main> -->

    <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="isOpen = false">
          <div class="modal">
            <iframe
              :src="modalUrl"
              frameborder="0"
              width="100%"
              height="100%"
              class="detail"
            ></iframe>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import VueGridLayout from "vue-grid-layout";
//import Dev from "@/components/Dev.vue";

const axios = require("axios");
const urlapi = "https://hook.zubbsteel.com/line-ci/api/";

/* let sections = [
   {"x":0,"y":0,"w":4,"h":0,"i":"MR8-1"}
]; */

export default {
  title() {
    return `Digital Warehouse`;
  },
  name: "Grid",
  components: {
    // Dev,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },

  data() {
    return {
      setup: {
        colnum: 30,
      },
      styleLayout: {
        "background-color": "rgb(221, 221, 221)",
      },
      tab: null,
      mr: "",
      items: [],
      isOpen: false,
      modalUrl: "",
      device: "",
      windowWidth: 0,
      windowHeight: 0,
      layout: [],
      pick: "0",
    };
  },
  computed: {
    singleSec: function() {
      console.log(this.pick);
      return this.pick;
    },
  },
  mounted() {
    /*     axios
      .get(urlapi + "sec/WHQ")
      .then(
        (response) => (
          (this.items = response.data.section),
          (this.mr = response.data.storage)
        )
      ); */

    axios
      .get(urlapi + "dl/WHQTEST")
      .then((response) => (this.layout = response.data));

    this.interval = setInterval(() => {
      axios
        .get(urlapi + "dl/WHQTEST")
        .then((response) => {
        this.onemat = response.data;
        //console.log("update"+ new Date())
      });
    }, 300000);

    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      window.addEventListener("resize", this.getWindowHeight);

      //Init
      this.getWindowWidth();
      this.getWindowHeight();
    });
    
  },

  create() {},

  methods: {
    secChange: function(paramMR, paramSec) {
      this.pick = paramSec;
      axios
        .get(urlapi + "dl/" + paramMR + "/" + paramSec)
        .then((response) => (this.layout = response.data));
    },
    open: function() {
      this.show = true;
    },
    close: function() {
      this.show = false;
    },
    greet: function(event) {
      if (event) {
        //alert(event.target.innerText);
        // this.isOpen = true;
        this.modalUrl =
          "https://webinfo.zubbsteel.com/wm_dtl" +
          this.device +
          ".aspx?bin=WHQ-" +
          event.target.innerText;

        this.isOpen = true;
        /*
        this.windowWidth <= 800
          ? window.open(this.modalUrl, "_blank")
          : (this.isOpen = true); */
      }
    },
    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
      this.windowWidth <= 800 ? (this.device = "_mobile") : (this.device = "");

      this.windowWidth <= 1278 ? this.styleLayout.width = "1278px" : this.styleLayout.width = "100%"
      
      
    },

    gridColor(month) {
      if (month == -1) {
        return "grid-road";
      } else if (month == -2) {
        return "text";
      } else if (month == -3) {
        return "grid-orange";
      } else if (month == -5) {
        return "grid-white";
      } else if (month == -4) {
        return "grid-pink";
      } else if (month < 6) {
        return "grid-green";
      } else if (month >= 6 && month <= 12) {
        return "grid-yellow";
      } else {
        return "grid-red";
      }
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}
.scrolling-wrapper {
  -webkit-overflow-scrolling: touch;
}
.vue-grid-item.grid-orange {
  background-color: rgb(236, 158, 41);
  pointer-events: none;
}
.vue-grid-item {
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center;
  background-color: rgb(180, 180, 180);
}
.vue-grid-item.text {
  background-color: rgb(180, 180, 180);
  cursor: default;
  pointer-events: none;
}
.vue-grid-item.grid-green {
  background-color: rgb(49, 201, 94);
}
.vue-grid-item.grid-white {
  background-color: rgb(248, 248, 248);
  pointer-events: none;
  cursor: default;
}
.vue-grid-item.grid-yellow {
  background-color: rgb(241, 221, 105);
}
.vue-grid-item.grid-red {
  background-color: rgb(204, 75, 75);
}
.vue-grid-item.grid-pink {
  background-color: rgb(255, 129, 234);
}
.vue-grid-item.grid-road {

  cursor: default;
  pointer-events: none;
  background-color: rgb(90, 126, 192);
}

.modal {
  width: 1000px;
  height: 70%;
  margin: 0px auto;
  /* padding: 20px; */
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}

.detail {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.fadeIn-enter {
  opacity: 0;
}

.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}

.sec {
  background-color: #42b983 !important;
}
</style>
