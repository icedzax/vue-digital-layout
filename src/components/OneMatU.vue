<template>
  <v-main>
    <v-app id="inspire">
      <v-card>
        <v-card-title>
          One Mat Code Statistic ({{ this.did }})
          <v-btn v-if="this.did != 'all'" @click="allClick" color="info"
            >ALL</v-btn
          >
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
          :headers="header_l"
          :items="onemat"
          :items-per-page="15"
          :search="search"
          :sort-by="[getSort]"
          :sort-desc="[getDesc]"
          :hide-default-footer="!getDesc"
          must-sort
          class="elevation-1"
          loading
          loading-text="โหลดอยู่..."
          @click:row="handleClick"
        >
          <v-progress-linear
            v-show="progressBar"
            slot="progress"
            color="blue"
            indeterminate
          ></v-progress-linear>

          <template v-slot:[`item.status`]="{ item }">
            <v-chip
              :color="getColor(item.status)"
              dark
            >
              <v-avatar  v-if="item.status == 'Completed'" left>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-avatar>
              <v-avatar  v-else left>
               <v-icon>mdi-fire</v-icon>
              </v-avatar>

              {{ item.status }}</v-chip
            >
          </template>

          <template v-slot:[`item.upc`]="{ item }">
            <v-progress-linear
              color="green"
              :background-opacity="0.3"
              :buffer-value="100"
              :height="25"
              :width="100"
              :rounded="true"
              :value="item.upc"
            >
              <div>{{ item.upc }}%</div>
            </v-progress-linear>
          </template>

          <template v-slot:[`item.progress`]="{ item }">
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

          <template v-slot:[`item.Wait`]="{ item }">
            <v-layout justify-end>
              <td>{{ numFormat(item.Wait) }}</td>
            </v-layout>
          </template>

          <template v-slot:[`item.Done`]="{ item }">
            <v-layout justify-end>
              <td>{{ numFormat(item.Done) }}</td>
            </v-layout>
          </template>
          <!-- 
          <template slot="footer">
            <div class="v-data-table__wrapper">
            <table>
              <tbody>
            <tr class>
            <td><strong>รวม</strong></td>
            <td class="text-start">{{ numFormat(totalAmount["sum_done"]) }}</td>
            <td class="text-end">{{ numFormat(totalAmount["sum_wait"]) }}</td>
            </tr>
              </tbody>
            </table>
            </div>
          </template> -->
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
    return `OneMatCode — ${this.did}`;
  },

  name: "OneMat",
  components: {},
  props: {
    uid: String,
  },
  data() {
    return {
      did: this.uid,
      search: "",
      progressBar: true,
      onemat: [],
      dialog: false,
      headers: [
        {
          text: "MatCat",
          align: "start",
          sortable: true,
          value: "CATCODE",
        },
        { text: "MatCatName", value: "CATNAME" },
        { text: "ผู้รับผิดชอบ", value: "CATRESP" },
        { text: "สถานะ", align: "center", value: "status" },
        { text: "Up to SAP", align: "center", value: "upc", width: "12%" },
        { text: "Confirm", align: "center", value: "progress", width: "12%" },
        { text: "เสร็จ", align: "end", value: "Done" },
        { text: "คงเหลือ", align: "end", value: "Wait" },
      ],
      headers_d: [
        {
          text: "MatGroup",
          align: "start",
          sortable: true,
          value: "matgroup",
        },
        { text: "GroupName", value: "matgroupname" },
        { text: "ผู้รับผิดชอบ", value: "CATRESP" },
        { text: "สถานะ", align: "center", value: "status" },
        { text: "Up to SAP", align: "center", value: "upc", width: "12%" },
        { text: "Confirm", align: "center", value: "progress", width: "12%" },
        { text: "เสร็จ", align: "end", value: "Done" },
        { text: "คงเหลือ", align: "end", value: "Wait" },
      ],
    };
  },
  watch: {
    onemat() {
      this.progressBar = false;
      //console.log(this.onemat);
    },
  },
  computed: {
    totalAmount: function() {
      this.loadStart();

      var sumw = 0;
      var sumd = 0;
      var rs = new Object();

      this.onemat.forEach((e) => {
        sumw += e.Wait;
        sumd += e.Done;
      });
      rs["sum_wait"] = numeral(sumw).format("0,0");
      rs["sum_done"] = numeral(sumd).format("0,0");
      rs["sum"] = numeral(sumd + sumw).format("0,0");
      rs["perc"] = ((100 / (sumw + sumd)) * sumd).toFixed(1);
      this.loadEnd();
      return rs;
    },
    resp: function() {
      return "";
    },
    header_l: function() {
      if (this.did == "all") {
        return this.headers;
      } else {
        return this.headers_d;
      }
    },

    getSort: function() {
      if (this.did == "all") {
        return "CATRESP";
      } else {
        return "progress";
      }
    },
    getDesc: function() {
      if (this.did == "all") {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    allClick() {
      this.did = "all";
      this.getData("all");
      //this.$router.push({ path: "onemat?uid=all" }).catch(()=>{});
    },
    loadStart() {
      this.loading = true;
    },
    loadEnd() {
      this.loading = false;
    },

    handleClick(value) {
      if (this.did != value.user) {
        this.did = value.user;
        this.getData(value.user);
      }

      //this.$router.push({ path: "onemat?uid=" + value.user }).catch(()=>{});
    },

    numFormat(n) {
      return numeral(n).format("0,0");
    },

    getColor(status) {
      if (status == "In Progress") return "orange";
      else return "green";
    },
    getData(u) {
      this.progressBar = true;
      var link = this.did;
      if (u) {
        //link = u;
        (link == 'ยังไม่ระบุ' ? link = 'x' : link = u)
      }

      axios
        .get(urlapi + "onemat/" + link)
        .then(
          (response) => (
            (this.onemat = response.data), (this.progressBar = false)
          )
        );
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
    //console.log("mounted");
    /* axios
      .get(urlapi + "onemat/" + this.uid)
      .then((response) => (this.onemat = response.data)); */

    this.interval = setInterval(() => {
      axios.get(urlapi + "onemat/" + this.did).then((response) => {
        this.onemat = response.data;
        /*console.log("Did"+ new Date())*/
      });
    }, 60000);
  },

  created() {
    //console.log("create");

    this.getData(this.did);
  },
};
</script>

<style scoped>
.v-data-table--fixed-header {
  position: sticky;
  z-index: 2;
}

.v-progress-linear__content {
  /* position: absolute; */
  z-index: 2;
}
</style>
