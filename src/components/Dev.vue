<template>
  <v-container fluid>
    <v-data-iterator
      :items="section"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
      no-data-text="ไม่มีรถในช่อง"
    >
      <template>
        <v-row>
          <v-col
            v-for="list in section"
            :key="list.carsec"
            
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold"
                >ช่อง {{ list.carsec +" "}}
              </v-card-title>
              <v-divider></v-divider>

              <v-simple-table dense fixed-header height="300px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">ตำแหน่ง</th>
                      <th class="text-left">ทะเบียน</th>
                      <th class="text-left">สินค้า</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="item in list.data"
                      :key="item.carsec + item.carlicense"
                      
                    >
                      <td>{{ item.location }}</td>
                      <td>{{ item.carlicense }}</td>
                      <td>{{ item.size }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
const axios = require("axios");
const urlapi = "https://hook.zubbsteel.com/line-ci/api/";

export default {
  props: {
    secpick: String,
  },
  watch: {
    // eslint-disable-next-line
    secpick: function(newVal, oldVal) {
      this.secpick = newVal
      axios
        .get(urlapi + "carwhd/MR8/" + newVal)
        .then((response) => (this.section = response.data));
    },
  },

  data: () => ({
    interval: 0,
    itemsPerPage: 30,
    section: [],
  
  }),
  mounted() {
    axios
      .get(urlapi + "carwhd/MR8/" + this.secpick)
      .then((response) => (this.section = response.data));

      this.interval = setInterval(() => {
        axios.get(urlapi + "carwhd/MR8/" + this.secpick).then(response => { this.section = response.data
        /*console.log("Did"+ new Date())*/ });
    }, 60000 );

  },
  methods: {

  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
};
</script>

<style scoped>

</style>