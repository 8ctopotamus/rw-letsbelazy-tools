<template>
  <div class="web-screenshot">
    <h1 class="display-1">Web Screenshot</h1>
    <h4 class="headline">Take a fullpage screenshot of any web page.</h4>
    <v-divider class="mt-4 mb-4" />
    <v-layout row wrap justify-center id="wrapper">
      <v-flex>
        input url
        height
        width of screenshot
      </v-flex>
      <v-flex>Screenshot Preview</v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: 'webScreenshot'
  }
</script>

<style scoped>

</style>
