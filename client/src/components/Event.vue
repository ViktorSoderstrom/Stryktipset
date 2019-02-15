
<template>
    <li class="event">
        <p class="event-name">{{event.description}}</p>
        <ul class="event__odds-list">
            <li><Odds :where="'home'" :odds="event.odds ? event.odds.home : null" @click="() => toggleOdds('home')"/></li>
            <li><Odds :where="'draw'" :odds="event.odds ? event.odds.draw : null" @click="() => toggleOdds('draw')"/></li>
            <li><Odds :where="'away'" :odds="event.odds ? event.odds.away : null" @click="() => toggleOdds('away')"/></li>
        </ul>
    </li>
</template>

<script>
/* eslint-disable */
import StryktipsetService from '@/services/StryktipsetService'
import Odds from '@/components/Odds'
const Combinatorics = require('js-combinatorics')
const dateFormat = require('dateformat')
export default {
  components: {
      Odds: Odds
  },
  props: {
      event: Object
  },
  methods: {
      toggleOdds(where) {
          this.$store.dispatch('pickSign', {eventId: this.event.sportEventId, where: where})
      }
  }
}
</script>

<style lang="scss" scoped>
    $color: #2196F3;
    $color-light1: #42A5F5;
    $color-light2: #64B5F6;
    $color-light3: #90CAF9;
    $color-light4: #BBDEFB;
    $color-light5: #E3F2FD;
    $color-dark1: #1E88E5;
    $color-dark2: #1976D2;
    $color-dark3: #1565C0;
    $color-dark4: #0D47A1;
    .event {
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1em;

        &-name {

        }
        &__odds-list {
            display: flex;
            list-style: none;

        }
    }
</style>
