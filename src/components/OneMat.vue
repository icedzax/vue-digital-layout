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
            :value="totalAmount['perc']"
            :color="perc2color(totalAmount['perc'])"
          >
            <div>
              {{ totalAmount["perc"] }}% ({{ totalAmount["sum_done"] }}/{{
                totalAmount["sum"]
              }})
            </div>
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

          <template v-slot:item.Wait="{ item }">
            <v-layout justify-end>
              <td class="text-xs-right">{{ numFormat(item.Wait) }}</td>
            </v-layout>
          </template>

          <template v-slot:item.Done="{ item }">
            <v-layout justify-end>
              <td class="text-xs-right">{{ numFormat(item.Done) }}</td>
            </v-layout>
          </template>
        </v-data-table>
      </v-card>
    </v-app>
  </v-main>
</template>

<script>
const axios = require("axios");
const urlapi = "https://hook.zubbsteel.com/line-ci/api/";
const numeral = require("numeral");

export default {
  title() {
    return `OneMatCode Statistic`;
  },
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
        { text: "สถานะ", align: "center",value: "status" },
        { text: "Up to SAP", align: "center",value: "upc",width: "12%" },
        { text: "Confirm", align: "center",value: "progress" ,width: "12%"},
        { text: "เสร็จ", align: "end",value: "Done" },
        { text: "คงเหลือ", align: "end",value: "Wait" },
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
      var sumw = 0;
      var sumd = 0;
      var rs = new Object();
      this.onemat.forEach((e) => {
        sumw += e.Wait;
        sumd += e.Done;
      });
      rs["sum_wait"] = numeral(sumw).format("0,0");
      rs["sum_done"] = numeral(sumd).format("0,0");
      rs["sum"] = numeral(sumd+sumw).format("0,0");
      rs["perc"] = ((100 / (sumw+sumd)) * sumd).toFixed(1);
      return rs;
    },
    resp: function() {
      return "";
    },
  },
  methods: {
    getColor(status) {
      if (status == "In Progress") return "orange";
      else return "green";
    },
    numFormat(n) {
      return numeral(n).format("0,0");
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
