<template>
  <div>
    <h1>Logga in</h1>
    <input v-model="email" type="email" name="email" placeholder="email" />
    <br>
    <input v-model="password" type="password" name="password" placeholder="password" />
    <br>
    <button @click="login">Vi köör!</button>
    <div v-html="error" />
    <h1 v-if="$store.state.isUserLoggedIn">Inloggad som {{$store.state.user.email}}</h1>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.error = null
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
