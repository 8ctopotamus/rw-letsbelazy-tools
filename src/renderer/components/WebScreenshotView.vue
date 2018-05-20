<template>
  <div class="web-screenshot">
    <h1 class="display-1">Web Screenshot</h1>
    <h4 class="headline">Take a fullpage screenshot of any web page.</h4>
    <v-divider class="mt-4 mb-4" />
    <v-layout row wrap justify-space-between>
      <v-flex sm4>
        <h3>Settings</h3>
        <v-text-field v-model="url" label="Website URL" name="url" />
        <v-text-field v-model.number="width" label="Width" suffix="px" />
        <v-slider v-model.number="width" step="10" max="3000" />
        <v-text-field v-model.number="height" label="Height" suffix="px" />
        <v-slider v-model="height" step="10" max="3000" />
        <v-btn raised color="primary" @click="takeScreenshot">Take Screenshot</v-btn>
      </v-flex>
      <v-flex sm8>
        <h3>Preview</h3>
        <webview :src="url" :style="`display:inline-flex; width: ${width}px; height: ${height}px;`" disablewebsecurity></webview>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  /* eslint-disable */
  const puppeteer = require('puppeteer')
  export default {
    name: 'webScreenshot',
    data () {
      return {
        loading: false,
        url: 'https://google.com',
        width: 700,
        height: 500
      }
    },
    methods: {
      takeScreenshot () {
        console.log('taking screenshot...')
        // (async () => {
        //   const browser = await puppeteer.launch()
        //   const page = await browser.newPage()
        //   page.setViewport({width: this.width, height: this.height})
        //   await page.goto(this.url, {"waitUntil" : "networkidle0"})
        //   await page.screenshot({path: '/jadeweekly.jpg'})
        //   await browser.close()
        //   console.log('Your screenshot has been generated. 👍')
        //   console.log('You can find it in /screenshots.')
        // })()
      }
    }
  }
</script>
