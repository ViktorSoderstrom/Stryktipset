<template>
  <div>
    <div class="bong-wrapper">
      <div class="teal" >Retton Tätt</div>
      <ul class="match-list">
        <li v-for="row in rows" :key="row.id">
          <div class="game-row teal lighten-1">
            <div class="match-wrapper">
              <span class="number-button">{{row.id + 1}}</span>
              {{row.game}}
              <button class="sign" v-bind:class="{active: row.ett}" @click="row.ett = !row.ett">1</button>
              <button class="sign" v-bind:class="{active: row.kryss}" @click="row.kryss = !row.kryss">X</button>
              <button class="sign" v-bind:class="{active: row.tva}" @click="row.tva = !row.tva">2</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div>{{tipUri}}</div>
    <h1>pris: {{price}}</h1>
    <button v-if="toSend" @click="tippa">Tippa</button>
    <button @click="getRows">få rader tack</button>
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
    getRows () {
      const rowReducer = (acc, current) => {
        acc.push(current.join(','))
        return acc
      }
      let list = []
      let missing = false
      list = this.rows.map(function (row) {
        let innerList = []
        if (row.ett) innerList.push('1')
        if (row.kryss) innerList.push('X')
        if (row.tva) innerList.push('2')
        let length = innerList.length
        if (length === 0) missing = true
        return innerList
      })
      this.toSend = missing ? null : Combinatorics.cartesianProduct(...list).toArray().reduce(rowReducer, [])
    },
    create1X2 () {
      return {
        ett: true,
        kryss: false,
        tva: false
      }
    }
  },
  created: function () {
    this.getTips()
  },
  computed: {
    price: function () {
      return 1
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
  .game-row{
    display: flex;
    justify-content: space-between;
  }
  .active{
    background-color: gray;
  }
</style>
