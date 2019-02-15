
<template>
    <button @click="$emit('click')" :class="classes">
        {{odds}}
    </button>
</template>

<script>
/* eslint-disable */
import StryktipsetService from '@/services/StryktipsetService'
const Combinatorics = require('js-combinatorics')
const dateFormat = require('dateformat')
export default {
  
  props: {
      odds: String,
      where: String,
  },
  data () {
      return {
          picked: false
      }
  },
  computed: {
      classes() {
          return {
              odds: true,
              odds_picked: this.$store.state
          }
      }

  }
  
}
</script>

<style lang="scss" scoped>
    .odds {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .odds_picked {
        background-color: gray;
    }
</style>
