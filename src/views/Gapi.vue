<template>
  <div id="quotes">
    
  </div>
</template>

<script>
const axios = require("axios");
export default {
  
  name:"Gapi",
  data() {
    return {
      quotes: this.quoteList,
      info: null,
      gsheet_url : "https://spreadsheets.google.com/feeds/list/1eNmGC4mZpIGx9vyL_Y0m0wEvsnlREGYoj04LH9atoTg/1/public/values?alt=json",
      quoteList : [],
      authorList : [],
      tagList : [],
    };
  },
  mounted() {
    axios
      .get(this.gsheet_url)
      .then((response) => this.parseData(response.data.feed.entry));
      
  },
  methods: {
    parseData(entries) {
      var authorSet = new Set();
      var tagSet = new Set();

      entries.forEach(function(value) {
       // console.log(value);
        var entry = {
          quote: value.gsx$quote.$t,
          author: value.gsx$author.$t,
          source: value.gsx$source.$t,
          tags: value.gsx$tags.$t.split(","),
        };

        // Add to the set of authors
        authorSet.add(entry.author);

        // Add to the set of tags
        entry.tags.forEach(function(t) {
          tagSet.add(t);
        });

        // Push entry into the list of quotes
        this.quoteList.push(entry);

      });
      this.authorList = Array.from(authorSet);
      this.authorList.sort();

      this.tagList = Array.from(tagSet);
      this.tagList.sort();
      
    },
  },
};
</script>
