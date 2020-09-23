<template>
  <v-main>
    <v-app id="inspire">
      <v-card>
        <v-card-title>
          One Mat Code Statistic
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-progress-linear
            :background-opacity="0.3"
            :buffer-value="100"
            :height="20"
            :width="100"
            :rounded="true"
            :value="totalAmount"
            :color="perc2color(totalAmount)"
          >
            <div>{{ totalAmount }}%</div>
          </v-progress-linear>
        </v-card-title>

        <v-data-table
          fixed-header
          :headers="headers"
          :items="onemat"
          :items-per-page="15"
          :search="search"
          :sort-by="['progress']"
          :sort-desc="[true]"
          must-sort
          class="elevation-1"
          loading
          loading-text="โหลดอยู่..."
        >
          <v-progress-linear
            v-show="progressBar"
            slot="progress"
            color="blue"
            indeterminate
          ></v-progress-linear>

          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>{{
              item.status
            }}</v-chip>
          </template>

          <template v-slot:item.progress="{ item }">
            <v-progress-linear
              :background-opacity="0.3"
              :buffer-value="100"
              :height="25"
              :width="100"
              :rounded="true"
              :value="item.progress"
            >
              <div>{{ item.progress }}%</div>
            </v-progress-linear>
          </template>

        </v-data-table>
      </v-card>
    </v-app>
  </v-main>
</template>

<script>
const axios = require("axios");
const urlapi = "https://hook.zubbsteel.com/line-ci/api/";

export default {
  name: "OneMat",
  components: {},
  data() {
    return {
      search: "",
      progressBar: true,
      onemat: [],
      dialog: false,
      headers: [
        {
          text: "MatGroup",
          align: "start",
          sortable: true,
          value: "matgroup",
        },
        { text: "ผู้รับผิดชอบ", value: "CATRESP" },
        { text: "สถานะ", value: "status" },
        { text: "ความคืบหน้า", value: "progress" },
        { text: "เสร็จ", value: "Done" },
        { text: "คงเหลือ", value: "Wait" },
      ],
    };
  },
  watch: {
    onemat() {
      this.progressBar = false;
    },
  },
  computed: {
    totalAmount: function() {
      var sum = 0;
      this.onemat.forEach((e) => {
        sum += e.progress;
      });
      return ((100 / (this.onemat.length * 100)) * sum).toFixed(1);
    },
    resp: function() {
      return ''
    },
  },
  methods: {
    getColor(status) {
      if (status == "In Progress") return "orange";
      else return "green";
    },

    getData() {
      axios
        .get(urlapi + "onemat")
        .then((response) => (this.onemat = response.data));
    },
    perc2color(perc) {
      var r,
        g,
        b = 0;
      if (perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
      } else {
        g = 255;
        r = Math.round(510 - 5.1 * perc);
      }
      var h = r * 0x10000 + g * 0x100 + b * 0x1;
      return "#" + ("000000" + h.toString(16)).slice(-6);
    },
  },
  mounted() {
    axios
      .get(urlapi + "onemat")
      .then((response) => (this.onemat = response.data));

    this.interval = setInterval(() => {
      axios.get(urlapi + "onemat").then((response) => {
        this.onemat = response.data;
        /*console.log("Did"+ new Date())*/
      });
    }, 60000);
  },
  created() {
    //this.getData();
  },
};
</script>

<style scoped>
.v-data-table--fixed-header {
  position: sticky;
  z-index: 2;
}

.v-progress-linear__content {
  positon: absolute;
  z-index: 2;
}
</style>
