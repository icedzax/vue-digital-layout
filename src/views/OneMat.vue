<template>
  <div>
    <div v-if="this.$route.query.uid">
      <OneMatU :uid="this.$route.query.uid" />
    </div>
    <div v-else><OneMat /></div>
    <!-- <VueFaqAccordion :items="myItems" /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import OneMat from "@/components/OneMat.vue";
import OneMatU from "@/components/OneMatU.vue";
// import VueFaqAccordion from "vue-faq-accordion";

export default {
  name: "HomeOneMatU",
  components: {
    OneMat,
    OneMatU,
    // VueFaqAccordion,
  },
  data() {
    return {
      myItems: [
        {
          title: "ทำไมต้องทำ One Mat Code ?",
          value: "ตรงนี้ใส่คำตอบ",
          category: "Tab-1",
        },
        {
          title: "ทำไมถึงไม่ confirm ให้ ?",
          value: "ตรงนี้ใส่คำตอบ",
          category: "Tab-2",
        },
        {
          title: "ทำไม ?",
          value: "ตรงนี้ใส่คำตอบ",
          category: "Tab-2",
        },
      ],
    };
  },
  mounted() {
    //console.log(this.$route.query.uid);
  },
};
</script>
