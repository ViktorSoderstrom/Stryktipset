<template>
  <div class="tippa">
    <div class="header">
      <div class="header-text">
        Retton tätt
      </div>
      <div class="menu">
      </div>
    </div>
    <div v-for="draw in draws" class="bong-wrapper" :key="draw.id">
      <ul class="match-list">
        <li class="match-item" v-for="row in draw.events" :key="row.id">
          <span class="match-number">{{row.id + 1}}</span>
          <div class="match-wrapper" style="width: 100%">
            <div class="game-info">
              <span class="match-teams">{{row.game}}</span>
              <p class="match-time">{{row.start}}</p>
              <p v-if="row.eventTypeDescription.length > 0" class="match-info">{{row.eventTypeDescription}}</p>
            </div>
            <div class="signs-wrapper">
              <div class="sign-wrapper">
                <button class="sign" v-bind:class="{active: row.ett}" @click="row.ett = !row.ett">1</button>
                <p class="odds">{{row.odds.home}}</p>
              </div>
              <div class="sign-wrapper">
                <button class="sign" v-bind:class="{active: row.kryss}" @click="row.kryss = !row.kryss">X</button>
                <p class="odds">{{row.odds.draw}}</p>
              </div>
              <div class="sign-wrapper">
                <button class="sign" v-bind:class="{active: row.tva}" @click="row.tva = !row.tva">2</button>
                <p class="odds">{{row.odds.away}}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="info">
        <div class="price">
          Pris: {{price(draw)}}
        </div>
        <div class="price" @click="clearAll(draw)">Rensa tecken</div>
        <div>
          <button class="tippish" v-if="mayBet(draw)" @click="tippa(draw)">Tippa!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StryktipsetService from '@/services/StryktipsetService'
const Combinatorics = require('js-combinatorics')
const dateFormat = require('dateformat')
export default {
  data () {
    return {
      draws: [],
      tipUri: '',
      toSend: null,
      test: 'hej'
    }
  },
  methods: {
    async getTips () {
      var resp = await StryktipsetService.getTips()
      this.draws = resp.data.draws.map((draw, index) => {
        console.log(draw.drawNumber)
        return {
          drawNumber: draw.drawNumber,
          events: draw.events.map(function (element, index) {
            return {id: index,
              game: element.description,
              odds: element.odds || {home: '-', draw: '-', away: '-'},
              eventTypeDescription: element.eventTypeDescription,
              start: dateFormat(new Date(element.sportEventStart), 'd/m HH:MM'),
              distribution: element.distribution,
              newspaper: element.newspaperAdvice,
              league: element.league.name,
              ett: false,
              kryss: false,
              tva: false
            }
          }),
          id: 'draw-' + index
        }
      })
    },
    async tippa (draw) {
      this.toSendLists(draw)
      try {
        var resp = await StryktipsetService.tippa(this.toSend)
        this.tipUri = resp.data.response.url
        window.open(
          this.tipUri,
          '_blank'
        )
        this.saveBong(draw)
      } catch (error) {

      }
    },
    async saveBong (draw) {
      var obj = {
        user: 'Virre',
        drawNumber: draw.drawNumber,
        bong: this.signsFromRows(draw)
      }
      var resp = await StryktipsetService.saveBong(obj)
      console.log(resp)
    },
    signsFromRows (draw) {
      let list = []
      list = draw.events.map(function (row) {
        let innerList = []
        if (row.ett) innerList.push('1')
        if (row.kryss) innerList.push('X')
        if (row.tva) innerList.push('2')
        return innerList
      })
      return list
    },
    toSendLists (draw) {
      const rowReducer = (acc, current) => {
        acc.push(current.join(','))
        return acc
      }
      this.toSend = Combinatorics.cartesianProduct(...this.signsFromRows(draw)).toArray().reduce(rowReducer, [])
    },
    price: function (draw) {
      let rows = this.signsFromRows(draw)
      let pr = 1
      rows.forEach(function (row) {
        let length = row.length
        pr = length === 0 ? (pr * 1) : pr * length
      })
      return pr
    },
    mayBet: function (draw) {
      let rows = this.signsFromRows(draw)
      let fullRow = true
      rows.forEach(function (row) {
        if (row.length === 0) fullRow = false
      })
      return fullRow
    },
    clearAll (draw) {
      draw.events.forEach(function (event) {
        event.ett = false
        event.kryss = false
        event.tva = false
      })
    }
  },
  created: function () {
    this.getTips()
  },
  computed: {
    signsPerRow: function () {
      return this.signsFromRows()
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
  .tippish{
    padding: 1.2em;
    background-color: $color-light5;
    color: black;
  }
</style>
