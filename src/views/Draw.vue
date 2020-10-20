<template>
  <v-main>
    <v-container class="spacing-playground pa-12" fluid>
      <v-btn @click="addRow">add</v-btn>
    
    </v-container>
    <grid-layout
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[5, 5]"
      :use-css-transforms="true"
      @layout-created="layoutCreatedEvent"
      @layout-before-mount="layoutBeforeMountEvent"
      @layout-mounted="layoutMountedEvent"
      @layout-ready="layoutReadyEvent"
      @layout-updated="layoutUpdatedEvent"
      @breakpoint-changed="breakpointChangedEvent"
    >
      <grid-item
       @click="changeI(item.id,item.i)"
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.id"
        :minW="0.5"
        @resize="resizeEvent"
        @move="moveEvent"
        @resized="resizedEvent"
        @container-resized="containerResizedEvent"
        @moved="movedEvent"
      >
        {{ item.i }}


        

      </grid-item>
    </grid-layout>
    <v-data-table
      :headers="headers"
      :items="layout"
      :items-per-page="200"
      class="elevation-1"
    ></v-data-table>
  </v-main>
</template>

<script>
// @ is an alias to /src

var testLayout = [
  { x: 0, y: 0, w: 1, h: 1, i: "0", id: 0 },
  { x: 1, y: 0, w: 1, h: 1, i: "1", id: 1 },
];

export default {
  name: "Home",
  components: {},
  data() {
    return {
      dialog: false,
      layout: testLayout,
      headers: [
        {
          text: "name",
          align: "start",
          sortable: false,
          value: "i",
        },
        { text: "x", value: "x" },
        { text: "y", value: "y" },
        { text: "w", value: "w" },
        { text: "h", value: "h" },
        { text: "id", value: "id" },
      ],
    };
  },
  computed: {},
  methods: {
    /* eslint-disable */
    changeI(p_i,p_n){
        console.log(p_i,p_n);
    },
    maxId() {
      if (this.layout.length == 0) return;
      return this.layout.reduce((a, b) =>
        Number(a.id) > Number(b.id) ? a.id : b.id
      );
    },
    maxX() {
      if (this.layout.length == 0) return;
      return this.layout.reduce((a, b) =>
        Number(a.x) > Number(b.x) ? a.x : b.x
      );
    },
    maxY() {
      if (this.layout.length == 0) return;
      return this.layout.reduce((a, b) =>
        Number(a.y) > Number(b.y) ? a.y : b.y
      );
    },
    addRow() {
      this.layout.push({
        x: this.maxX() + 1,
        y: this.maxY() + 1,
        w: 1,
        h: 1,
        i: "new" + this.maxId() + 1,
        id: this.maxId() + 1,
      });
    },
    removeRow(index) {
      this.layout.splice(index, 1);
    },
    layoutCreatedEvent: function(newLayout) {
      // console.log("Created layout: ", newLayout)
    },
    layoutBeforeMountEvent: function(newLayout) {
      // console.log("beforeMount layout: ", newLayout)
    },
    layoutMountedEvent: function(newLayout) {
      // console.log("Mounted layout: ", newLayout)
    },
    layoutReadyEvent: function(newLayout) {
      // console.log("Ready layout: ", newLayout)
    },
    layoutUpdatedEvent: function(newLayout) {
      //console.log("Updated layout: ", newLayout);
    },
    moveEvent: function(i, newX, newY) {
      //  console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    movedEvent: function(i, newX, newY) {
      // console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizeEvent: function(i, newH, newW, newHPx, newWPx) {
      //console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx) {
      // console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },
    containerResizedEvent: function(i, newH, newW, newHPx, newWPx) {
      // console.log("CONTAINER RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },
    breakpointChangedEvent: function(newBreakpoint, newLayout) {
      //  console.log("BREAKPOINT CHANGED breakpoint=", newBreakpoint, ", layout: ", newLayout );
    },
  },
};
</script>

<style scoped>
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
  pointer-events: 
  none;
}
</style>
