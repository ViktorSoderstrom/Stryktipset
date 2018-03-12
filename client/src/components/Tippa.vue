<template>
  <div>
    <div class="bong-wrapper">
      <div class="teal" >Retton Tätt</div>
      <ul class="match-list">
        <li v-for="row in rows" :key="row.id">
          <div class="game-row teal lighten-1">
            <div class="match-wrapper">
              <span class="number-button">{{row.id + 1}}</span>
              {{row.game}} - {{row.league}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import StryktipsetService from '@/services/StryktipsetService'
export default {
  data () {
    return {
      rows: [],
      myRows: []
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
    }
  },
  created: function () {
    this.getTips()
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
