<template>
  <div v-if="this.$route.query.uid"><OneMatU :uid="this.$route.query.uid"/></div>
  <div v-else><OneMat/></div>
</template>

<script>
// @ is an alias to /src
import OneMat from "@/components/OneMat.vue";
import OneMatU from "@/components/OneMatU.vue";

export default {
  name: "HomeOneMatU",
  components: {
    OneMat,
    OneMatU,
  },
  data() {
    return {};
  },
  mounted() {
    //console.log(this.$route.query.uid);
  },
};
</script>
