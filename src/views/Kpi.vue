<template>
  <v-main>
    <v-app id="kpi">
      <v-card>
        <v-card-title>
          Kpi Test Formula
        </v-card-title>

        <v-data-table
          fixed-header
          :headers="headers"
          :items="kpi"
          :items-per-page="15"
          :search="search"
          :hide-default-footer="true"
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

          <template v-slot:item.name="props">
            <v-edit-dialog
              :return-value.sync="props.item.name"
              @save="save(props.item.id)"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              {{ props.item.name }}
              <template v-slot:input>
                <v-text-field
                  v-model="props.item.name"
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>
          <template v-slot:item.y="props">
      
            <v-edit-dialog 
              
              :return-value.sync="props.item.y"
              large
              persistent
              @save="save(props.item.id)"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
              <div class="yellow lighten-4" >{{ props.item.y }}</div>

              <template v-slot:input>
                <div class="mt-4 title">Update YTD</div>
                <v-text-field
                  v-model="props.item.y"
                  
                  :rules="[max25chars]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                ></v-text-field>
              </template>
            </v-edit-dialog>
          </template>


          <template v-slot:item.after="props">
      
        
              <div>{{ numFormat3(props.item.after) }}</div>

          
          </template>

        </v-data-table>

        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
          {{ snackText }}

          <template v-slot:action="{ attrs }">
            <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </v-app>
  </v-main>
</template>

<script>
/* const axios = require("axios");
const urlapi = "https://hook.zubbsteel.com/line-ci/api/"; */
const numeral = require("numeral");
export default {
  title() {
    return `Kpi`;
  },

  name: "Kpi",
  components: {},
  props: {},
  data() {
    return {
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: (v) => v.length <= 25 || "Input too long!",
      pagination: {},
      search: "",
      progressBar: true,
      kpi: [
        {
          id: 0,
          name: "KPI-1",
          desc: "ผลผลิตตามแผน CPP",
          base: 216,
          low: 194,
          high: 238,
          weight: 5,
          y: 0,
          after: 0,
          p: 0,
          cal: "",
        },
        {
          id: 1,
          name: "KPI-2",
          desc: "ต้นทุนการแปรสภาพเป็นสินค้าเฉลี่ยของ OCP ไม่รวมยีลด์ (Yield) และค่าใช้จ่ายบริหารและขาย",
          base: 0.43,
          low: 0.47,
          high: 0.41,
          weight: 7.5,
          y: 0,
          after: 0,
          p: 0,
          cal: "",
        },
        
      ],

      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
         {
          text: "Desc",
          align: "start",
          sortable: true,
          value: "desc",
        },
        { text: "Low", align: "center", value: "low" },
        { text: "Base", align: "center", value: "base" },
        { text: "High", align: "center", value: "high" },
        { text: "Weight %", align: "center", value: "weight" },
        { text: "แต้ม", align: "center", value: "p" },
        { text: "YTD", align: "center", value: "y", class: "yellow lighten-4" },
        { text: "หลัง Weight", align: "center", value: "after" },
       // { text: "cal", align: "center", value: "cal" },
      ],
    };
  },
  watch: {
    kpi() {
      this.progressBar = false;
      console.log(this.kpi);
    },
  },
  computed: {},

  methods: {
    numFormat(n) {
      return numeral(n).format("0,0");
    },
    numFormat2(n) {
      return numeral(n).format("0,0.00");
    },
    numFormat3(n) {
      return numeral(n).format("0,0.000");
    },
    numFormatx(n) {
      return numeral(n).format(".00");
    },

    save(e) {
      
      //this.kpi[myindex].p = this.kpi[myindex].y*2
      //console.log( this.kpi[myindex].p )
      e == 0  ? this.calPoint(e) : this.icalPoint(e)
      

      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    calPoint(id) {
      var index = this.kpi.findIndex((x) => x.id == id)
      //var p = this.kpi[index].p
      var y = this.kpi[index].y
      var w = this.kpi[index].weight
      var l = this.kpi[index].low
      var b = this.kpi[index].base
      var h = this.kpi[index].high
      //var a = this.kpi[index].after

      var cal1 = 0;
      if (h > y && y > b) {
        cal1 = y - b;
      } else if (b > y && y > l) {
        cal1 = y - l;
      }
      
      var cal2 = cal1/(h-b)
      var cal3 = cal2*2;

      var target = 0;
      if (y >= h) {
        target = 5;
      } else if (y < h && y >= b) {
        target = 3+cal3;
      } else {
        target = 1+cal3;
      }
      
      this.kpi[index].p = this.numFormat2(target)
      this.kpi[index].after = this.numFormat2((target*w)/100)
      this.kpi[index].cal = this.numFormat2(cal1)+"/"+this.numFormat2(cal2)+"/"+this.numFormat2(cal3)

    },
    icalPoint(id) {
      var index = this.kpi.findIndex((x) => x.id == id)
      //var p = this.kpi[index].p
      var y = this.kpi[index].y
      var w = this.kpi[index].weight
      var l = this.kpi[index].low
      var b = this.kpi[index].base
      var h = this.kpi[index].high
      //var a = this.kpi[index].after

      var cal1 = 0;
      if (h < y && y < b) {
        cal1 = y - b;
      } else if (b < y && y < l) {
        cal1 = y - l;
      }
      
      var cal2 = cal1/(h-b)
      var cal3 = cal2*2;

      var target = 0;
      if (y <= h) {
        target = 5;
      } else if (y > h && y <= b) {
        target = 3+cal3;
      } else {
        target = 1+cal3;
      }
      
      this.kpi[index].p = this.numFormat2(target)
      this.kpi[index].after = this.numFormat2((target*w)/100)
      this.kpi[index].cal = this.numFormatx(cal1)+"/"+this.numFormatx(cal2)+"/"+this.numFormatx(cal3)

    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      //console.log("Dialog closed");
    },

    /* getData(b = 0, l = 0, h = 0, y = 0, p = 0, a = 0) {
      axios
        .get(
          urlapi + "kpi/" + b + "/" + l + "/" + h + "/" + y + "/" + p + "/" + a
        )
        .then(
          (response) => ((this.kpi = response.data), (this.progressBar = false))
        );
    }, */
  },
  mounted() {
    //console.log("mount");
    this.progressBar = false;
  },

  created() {
    // console.log("create");
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
