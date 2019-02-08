
<template>
  <div>
    <ul>
      <li v-for="event in draw.events" class="event__list" :key="event.id">
        <Event :event="event" :drawId="event.drawId"/>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import StryktipsetService from "@/services/StryktipsetService";
import Event from "@/components/Event"
const Combinatorics = require("js-combinatorics");
const dateFormat = require("dateformat");
export default {
  components: {
      Event: Event
  },
  props: {
    draw: Object
  }
};
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
  &__list {
      &:nth-child(odd) {
            background-color: $color-light5;
        }
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
