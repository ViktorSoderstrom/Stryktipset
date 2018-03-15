<template>
  <div>
    <div class="bong-wrapper">
      <div class="teal display-1" >Retton Tätt</div>
      <ul class="match-list">
        <li v-for="row in rows" :key="row.id">
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
    </div>
    <div>{{tipUri}}</div>
    <h1>pris: {{price}}</h1>
    <button v-if="toSend" @click="tippa">Tippa</button>
    <button @click="toSendLists">få rader tack</button>
    <ul>
      <li v-for="(row, iterator) in signsPerRow" v-bind:key="(row + 100) + iterator">{{row}}</li>
    </ul>
    <div>{{toSend}}</div>
  </div>
</template>

<script>
import StryktipsetService from '@/services/StryktipsetService'
const Combinatorics = require('js-combinatorics')
export default {
  data () {
    return {
      rows: [],
      tipUri: '',
      toSend: null
    }
  },
  methods: {
    async getTips () {
      try {
        let resp = await StryktipsetService.getTips()
        resp.data.draws[0].events.forEach(function (element, index) {
          this.rows.push({id: index,
            game: element.description,
            distribution: element.distribution,
            newspaper: element.newspaperAdvice,
            league: element.league.name,
            ett: false,
            kryss: false,
            tva: false
          })
        }, this)
      } catch (error) {

      }
    },
    async tippa () {
      try {
        var resp = await StryktipsetService.tippa(this.toSend)
        this.tipUri = resp.data.response.url
      } catch (error) {

      }
    },
    signsFromRows () {
      let list = []
      list = this.rows.map(function (row) {
        let innerList = []
        if (row.ett) innerList.push('1')
        if (row.kryss) innerList.push('X')
        if (row.tva) innerList.push('2')
        return innerList
      })
      return list
    },
    toSendLists () {
      const rowReducer = (acc, current) => {
        acc.push(current.join(','))
        return acc
      }
      this.toSend = Combinatorics.cartesianProduct(...this.signsFromRows()).toArray().reduce(rowReducer, [])
    }
  },
  created: function () {
    this.getTips()
  },
  computed: {
    signsPerRow: function () {
      return this.signsFromRows()
    },
    price: function () {
      let rows = this.signsFromRows()
      let pr = 1
      rows.forEach(function (row) {
        let length = row.length
        pr = length === 0 ? (pr * 1) : pr * length
      })
      return pr
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
    color: white;
  }
</style>
