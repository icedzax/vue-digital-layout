<template>
  <v-main>
    <v-app id="inspire">
      <v-card>
        <v-card-title>
        <a href="https://www.npmjs.com/package/vue-gsheets" target="_blank">
          <h1>Test vue-gsheets npm package</h1> </a><br/>
        </v-card-title>
        <table style="width:100%">
          <caption>
            Data from public google sheets
          </caption>
          <tr>
            <th v-for="header in headers" :key="header">
              {{ header }}
            </th>
          </tr>
          <tr v-for="item in items" :key="item.dateStarted">
            <td>{{ item.User }}</td>
            <td>{{ item.dateStarted }}</td>
            <td>{{ item.Role }}</td>
          </tr>
        </table>

        <br />
        <p>RECORDS : {{ records }}</p>
        <p>COLUMNS : {{ COLUMNS }}</p>
        <br />
        <h2>RAW JSON</h2>
        <br />
        <div v-for="item in items" :key="item.dateStarted">
          <p>
            {{ item }}
          </p>
        </div>
      </v-card>
    </v-app>
  </v-main>
</template>

<script>
import { vueGsheets } from "vue-gsheets";
export default {
  mixins: [vueGsheets],
  name: "Sd",
};
</script>

<style scoped>
.container {
  padding: 10px;
}
table,
th,
td {
  border: 1px solid black;
  padding: 15px;
}
</style>
