<template>
  <div>
    <div v-for="draw in draws" class="bong-wrapper" :key="draw.id">
      <div class="teal display-3" >Retton Tätt</div>
      <ul class="match-list">
        <li v-for="row in draw.events" :key="row.id">
          <div class="game-row teal lighten-1">
            <div class="match-wrapper" style="width: 100%">
              <div style="display: flex; justify-content:space-between; width:100%;">
                <div>
                  <span class="number-button">{{row.id + 1}}</span>
                  <span>{{row.game}}</span>
                </div>
                <div>
                  <button class="sign teal lighten-2" v-bind:class="{active: row.ett}" @click="row.ett = !row.ett">1</button>
                  <button class="sign teal lighten-2" v-bind:class="{active: row.kryss}" @click="row.kryss = !row.kryss">X</button>
                  <button class="sign teal lighten-2" v-bind:class="{active: row.tva}" @click="row.tva = !row.tva">2</button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <h1>pris: {{price(draw)}}</h1>
      <button v-if="toSend" @click="tippa(draw)">Tippa</button>
      <button @click="toSendLists(draw)">få rader tack</button>
      <ul>
        <li v-for="(row, iterator) in signsFromRows(draw)" v-bind:key="(row + 100) + iterator">{{row}}</li>
      </ul>
      </div>
      <div>{{tipUri}}</div>
      <div>{{toSend}}</div>
  </div>
</template>

<script>
import StryktipsetService from '@/services/StryktipsetService'
const Combinatorics = require('js-combinatorics')
export default {
  data () {
    return {
      draws: [],
      tipUri: '',
      toSend: null
    }
  },
  methods: {
    async getTips () {
      let resp = await StryktipsetService.getTips()
      console.log(resp)
      this.draws = resp.data.draws.map((draw, index) => {
        return {
          events: draw.events.map(function (element, index) {
            return {id: index,
              game: element.description,
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
      } catch (error) {

      }
    },
    signsFromRows (draw) {
      console.log(draw)
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

<style scoped>
  .match-list{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .match-wrapper{
    padding: 1em;
  }
  .game-row{
    display: flex;
    justify-content: space-between;
  }
  .number-button{
  }
  .sign{
    width: 30px;
    height: 30px;
  }
  .active{
    background-color: gray!important;
  }
  *{
    color: black;
  }
</style>
