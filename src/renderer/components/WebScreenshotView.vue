<template>
  <v-layout row wrap justify-center id="wrapper">
    <h1>Web Screenshot</h1>
    <p>Take a fullpage screenshot of any web page!</p>
  </v-layout>
</template>

<script>
  export default {
    name: 'webScreenshot'
  }
</script>

<style scoped>
  .centered {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo
  {
    max-width: 100%;
  }

  .link-btn
  {
    width: 150px;
  }
</style>
