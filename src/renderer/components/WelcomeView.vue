<template>
  <v-layout column id="wrapper">
    <v-flex xs12 class="text-xs-center">
      <img id="logo" class="logo" src="/static/rw-logo.svg" alt="Real wealth" />
      <h4>Welcome to the <em>Real</em> Wealth <sup>&reg;</sup>'s <em>Let's be lazy</em> convenience tools GUI!</h4>
    </v-flex>
    <v-flex xs12 class="mt-4">
      <system-information></system-information>
    </v-flex>
    <v-flex xs12 class="mt-4">
      <v-card>
        <v-card-title class="headline">Docs for Devs</v-card-title>
        <v-divider></v-divider>
        <v-card-actions class="pt-3 pb-3">
          <v-spacer></v-spacer>
          <v-btn class="link-btn" @click="open('https://vuejs.org/v2/guide/')">Vue</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="link-btn" @click="open('https://electron.atom.io/docs/')">Electron</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="link-btn" @click="open('https://vuetifyjs.com')">Vuetify</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import SystemInformation from './WelcomeView/SystemInformation'

  export default {
    name: 'welcome',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
  .logo
  {
    max-width: 75%;
  }
  .link-btn
  {
    width: 150px;
  }
</style>
