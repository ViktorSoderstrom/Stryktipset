<template>
  <div>
    LIVE
    <ul>
      <li class="match-item" v-for="(event, index) in eventResult" v-bind:key="event + event.id">
        <span class="match-number">{{event.id + 1}}</span>
          <div class="match-wrapper" style="width: 100%">
            <div class="game-info">
              <span class="match-teams">{{event.description}}</span>
              <!--<p class="match-time">{{row.start}}</p>-->
              <!--<p v-if="row.eventTypeDescription.length > 0" class="match-info">{{row.eventTypeDescription}}</p>-->
            </div>
            <div class="signs-wrapper">
              <div class="sign-wrapper">
                <button class="sign" v-bind:class="{active: event.outcome === '1', correct : (userBong[index].includes(event.outcome) && event.outcome === '1')}">1</button>
              </div>
              <div class="sign-wrapper">
                <button class="sign" v-bind:class="{active: event.outcome === 'X', correct : (userBong[index].includes(event.outcome) && event.outcome === 'X')}">X</button>
              </div>
              <div class="sign-wrapper">
                <button class="sign" v-bind:class="{active: event.outcome === '2', correct : (userBong[index].includes(event.outcome) && event.outcome === '2')}">2</button>
              </div>
            </div>
            <div>
              {{event.outcomeScore}}
            </div>
          </div>
      </li>
    </ul>
    <br>
    <br>
    {{userBong}}
  </div>
</template>

<script>
import StryktipsetService from '@/services/StryktipsetService'
export default {
  data () {
    return {
      userBong: null,
      eventResult: null,
      drawNumber: null
    }
  },
  methods: {
    async getResults () {
      var resp = await StryktipsetService.getResults()
      console.log(resp)
      this.drawNumber = resp.data.result.drawNumber
      var events = resp.data.result.events
      this.eventResult = events.map(function (event, index) {
        return {
          id: index,
          description: event.description,
          cancelled: event.cancelled,
          outcome: event.outcome,
          outcomeScore: event.outcomeScore
        }
      })
      this.getBongFromDrawId(resp.data.result.drawNumber)
    },
    async getBongFromDrawId (drawId) {
      var resp = await StryktipsetService.getBongFromDrawId({
        nr: drawId
      })
      console.log(resp)
      this.userBong = resp.data.bong
    }
  },
  created: function () {
    this.getResults()
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
  .back-color{
    background-color: $color;
  }
  .back-color-light1{
    background-color: $color-light1;
  }
  .back-color-light2{
    background-color: $color-light2;
  }
  .back-color-light3{
    background-color: $color-light3;
  }
  .back-color-light4{
    background-color: $color-light4;
  }
  .back-color-light5{
    background-color: $color-light5;
  }
  .back-color-dark1{
    background-color: $color-dark1;
  }
  .back-color-dark2{
    background-color: $color-dark2;
  }
  .back-color-dark3{
    background-color: $color-dark3;
  }
  .back-color-dark4{
    background-color: $color-dark4;
  }

  .text-color{
    color: $color;
  }
  .text-color-light1{
    color: $color-light1;
  }
  .text-color-light2{
    color: $color-light2;
  }
  .text-color-light3{
    color: $color-light3;
  }
  .text-color-light4{
    color: $color-light4;
  }
  .text-color-light5{
    color: $color-light5;
  }
  .text-color-dark1{
    color: $color-dark1;
  }
  .text-color-dark2{
    color: $color-dark2;
  }
  .text-color-dark3{
    color: $color-dark3;
  }
  .text-color-dark4{
    color: $color-dark4;
  }

  .tippa{
    width: 100%;
    max-width: 400px;
  }
  .header{
    color: white;
    height: 45px;
    position: fixed;
    display: flex;
    font-size: 1.8em;
    font-weight: 700;
    justify-content: space-between;
    align-items: center;
    padding: 0.2em;
    top: 0;
    width: 100%;
    max-width: 400px;
    background-color: $color-dark3;
    z-index: 9999;
  }
  .match-list{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .match-item{
    position: relative;
    &:nth-child(odd){
      @extend .back-color-light5;
      > .match-number{
          color: white;
        }
    }
    &:nth-child(even){
      > .match-number{
        @extend .text-color-light5;
      }
    }
  }
  .match-number{
    position: absolute;
    top: 0;
    left: 5px;
    font-weight:700;
    font-size: 5.2em;
    line-height: 1;

  }
  .match-wrapper{
    padding: 0.3em;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .game-row{
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .match-teams{
    font-size: 1em;
    font-weight: 600;
    width: 100%;
  }
  .sign{
    width: 40px;
    height: 40px;
    border: 1px solid $color-dark3;
    font-weight: 700;
    font-size: 1.2em;
    transition: all 0.4s ease;
  }
  .game-info{
    width: 55%;
    display: flex;
    align-items: center;
    z-index: 99;
    flex-wrap: wrap;
  }
  .match-info{
    color: red;
    font-weight: 600;
  }
  .signs-wrapper{
    width: 40%;
    display: flex;
    justify-content: space-between;
  }
  .sign-wrapper{
    color: black;
  }
  .odds{
    text-align: center;
    font-size: 0.8em;
  }
  .tippa{

  }
  .active{
    @extend .back-color-dark3;
    color: white;
  }
  .bong-wrapper{
  }
  .info{
    color: black;
    background-color: $color-dark3;
    z-index: 99;
    position: relative;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3em;
  }
  .price{
    color: white;
    font-weight: 600;
    font-size: 1.2em;
  }
  .correct{
    background-color: green !important;
  }
  .tippish{
    padding: 1.2em;
    background-color: $color-light5;
    color: black;
  }
</style>
