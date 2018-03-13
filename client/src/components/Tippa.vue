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
            </div>
          </div>
        </li>
      </ul>
    </div>
    <ul>
      <li v-for="n in tips" :key="n.id">
        <div class="ett-kryss-tva"><input type="checkbox" v-model="n.ett"><input type="checkbox" v-model="n.kryss"><input type="checkbox" v-model="n.tva"></div>
      </li>
    </ul>
    <div>{{tipUri}}</div>
    <h1>pris: {{list.price}}</h1>
    <div v-if="list.rows">
      <button @click="tippa">Tippa</button>
    </div>
  </div>
</template>

<script>
import StryktipsetService from '@/services/StryktipsetService'
const Combinatorics = require('js-combinatorics')
export default {
  data () {
    return {
      rows: [],
      tips: [{ett: false, kryss: false, tva: false, id: 0},
        {ett: false, kryss: false, tva: false, id: 1},
        {ett: false, kryss: false, tva: false, id: 2},
        {ett: false, kryss: false, tva: false, id: 3},
        {ett: false, kryss: false, tva: false, id: 4},
        {ett: false, kryss: false, tva: false, id: 5},
        {ett: false, kryss: false, tva: false, id: 6},
        {ett: false, kryss: false, tva: false, id: 7},
        {ett: false, kryss: false, tva: false, id: 8},
        {ett: false, kryss: false, tva: false, id: 9},
        {ett: false, kryss: false, tva: false, id: 10},
        {ett: false, kryss: false, tva: false, id: 11},
        {ett: false, kryss: false, tva: false, id: 12}
      ],
      tipUri: ''
    }
  },
  methods: {
    async getTips () {
      try {
        let resp = await StryktipsetService.getTips()
        resp.data.draws[0].events.forEach(function (element, index) {
          this.rows.push({'id': index, 'game': element.description, 'distribution': element.distribution, 'newspaper': element.newspaperAdvice, 'league': element.league.name})
        }, this)
      } catch (error) {

      }
    },
    async tippa () {
      try {
        var resp = await StryktipsetService.tippa(this.getRows().rows)
        this.tipUri = resp.data.response.url
      } catch (error) {

      }
    },
    getRows () {
      const rowReducer = (acc, current) => {
        acc.push(current.join(','))
        return acc
      }
      let multiplier = 1
      let list = []
      let missing = false
      list = this.tips.map(function (obj) {
        let innerList = []
        if (obj.ett) innerList.push('1')
        if (obj.kryss) innerList.push('X')
        if (obj.tva) innerList.push('2')
        let length = innerList.length
        if (length === 0) missing = true
        else multiplier = multiplier * length
        return innerList
      })
      if (missing) return {rows: null, price: 0}
      else {
        return {
          rows: Combinatorics.cartesianProduct(...list).toArray().reduce(rowReducer, []),
          price: multiplier
        }
      }
    }
  },
  created: function () {
    this.getTips()
  },
  computed: {
    list: function () {
      return this.getRows()
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
</style>
