<template>
  <v-main>
    <v-app id="inspire">
      <v-card>
        <v-card-title>
          เบอร์โทรภายใน
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table 
          fixed-header
          :headers="header"
          :items="onemat"
          :items-per-page="15"
          :search="search"
          :sort-by="onemat.tel"
          must-sort
          class="elevation-1"
        >
       
        </v-data-table>
      </v-card>
    </v-app>
  </v-main>
</template>

<script>
const axios = require("axios");
const urlapi = "https://hook.zubbsteel.com/line-ci/api/";

export default {
  title() {
    return `เบอร์โทรภายใน`
  },

  name: "Telephone",
  components: {},
  props: {
   
  },
  data() {
    return {
     
      search: this.$route.query.dep,
      onemat: [],
      dialog: false,
      header: [
        {
          text: "สาขา",
          align: "center",
          sortable: true,
          value: "plant",
         
        },
        { text: "แผนก", value: "dep", align: "center"},
        { text: "ชื่อ", align: "center",value: "name" },
        { text: "ชื่อจริง", align: "center",value: "firstname" },
        { text: "เบอร์", align: "center", value: "tel" },
      ]
      
    };
  },

  methods: {
    
    getData() {
 
      axios
        .get(urlapi + "tel")
        .then(
          (response) => (
            (this.onemat = response.data), (this.progressBar = false)
          )
        );
    },

  },
  mounted() {

  },

  created() {
    this.getData();
  },
};
</script>
<style scoped>


</style>
