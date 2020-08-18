<template>
  <div>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text" >{{mr}}</h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item" @click="secChange(mr,item)">
          {{ "ช่อง "+item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item" >
          <v-card color="basil" flat>
            <v-card-text>{{ dev }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>

const axios = require("axios");
const urlapi = "https://hook.zubbsteel.com/line-ci/api/";


export default {
  data: function() {
    return {
      dev : [],
      tab: null,
      mr: "",
      items: [],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  mounted() {
    axios
      .get(urlapi + "sec/MR8")
      .then((response) => (this.items = response.data.section,this.mr = response.data.storage));
     // console.log(this.items);
  },
  methods:{
    secChange: function(paramMR,paramSec) {
     axios
      .get(urlapi + "dl/"+paramMR+"/"+paramSec)
      .then((response) => (this.dev = response.data));
    }
  }
};
</script>

<style scoped>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
