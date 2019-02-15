/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    draws: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setDraws (state, payload) {
      state.draws = payload
    },
    pickSign (state, obj) {
      state = state
    }
  },
  actions: {
    setDraws ({commit}, payload) {
      var lol = payload.map((draw) => ({
        ...draw,
        events: draw.events.map(event => ({
          ...event,
          odds: {
            away: event.odds ? {value:event.odds.away, picked: false }: '',
            draw: event.odds ? {value:event.odds.draw, picked: false } : '',
            home: event.odds ? {value:event.odds.home, picked: false } : '',
            picked: false
          }
        }))
      }))
      commit('setDraws', lol)
    },
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    pickSign ({commit}, obj) {
      var eventId = obj.eventId;
      var where = obj.where;
      var event = this.state.draws.find(function(d){
        return d.events.find(function(e){
          console.log({id:e.sportEventId});
          return e.sportEventId === eventId;
        })
      })
      console.log(eventId);
      console.log(event);
      commit('pickSign', obj)
    }
  }
})
