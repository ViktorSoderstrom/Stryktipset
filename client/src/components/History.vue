
<template>
    <div>hehe</div>
</template>

<script>
/* eslint-disable */
import StryktipsetService from "@/services/StryktipsetService";
import Draw from "@/components/Draw";
const Combinatorics = require("js-combinatorics");
const dateFormat = require("dateformat");
export default {
  data() {
      return {
          draws: [],
          results: []
      }
      
  },
  methods: {
    async getPassedDraws(numberOfDraws) {
      var resp = await StryktipsetService.getTips();
      var currentDrawNumber = resp.data.draws[0].drawNumber;  
      for(let i = currentDrawNumber; i > currentDrawNumber - numberOfDraws; i--) {
          this.getDraw(i);
          this.getResult(i);
      }
    },
    async getDraw(drawNumber) {
        console.log(drawNumber);
        var resp = await StryktipsetService.getDraw({drawNumber: drawNumber});
        this.draws.push(resp.data.draw)
    },
    async getResult(drawNumber) {
        var resp = await StryktipsetService.getResult({drawNumber: drawNumber})
        this.results.push(resp.data)
    }
  },
  created: function () {
    this.getPassedDraws(10);
  },
};
</script>

<style lang="scss" scoped>
</style>
