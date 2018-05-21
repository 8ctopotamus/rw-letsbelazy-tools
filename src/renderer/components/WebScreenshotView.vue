<template>
  <div class="web-screenshot">
    <h1 class="display-1">Web Screenshot</h1>
    <h4 class="headline">Take a fullpage screenshot of any web page.</h4>
    <v-divider class="mt-4 mb-4" />
    <v-layout>
      <v-flex>
        <v-text-field v-model="url" label="Website URL" name="url" />
        <v-text-field v-model.number="width" label="Width" suffix="px" />
        <v-slider v-model.number="width" step="1" max="3000" />
        <v-text-field v-model.number="height" label="Height" suffix="px" />
        <v-slider v-model="height" step="1" max="3000" />
        <v-btn raised color="primary" @click="takeScreenshot">Take Screenshot</v-btn>
      </v-flex>
      <v-flex>
        <h3>Preview</h3>
        <p v-if="loading"><em>Loading...</em></p>
        <webview
          @did-start-loading="loading = true"
          @did-stop-loading="loading = false"
          :src="url"
          :style="`display:inline-flex; width: ${width}px; height: ${height}px;`" disablewebsecurity
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  /* eslint-disable */
  const fs = require('fs')
  const { dialog } = require('electron').remote
  const puppeteer = require('puppeteer')
  export default {
    name: 'webScreenshot',
    data () {
      return {
        loading: false,
        url: 'https://zylocod.es',
        width: 850,
        height: 700
      }
    },
    methods: {
      takeScreenshot () {
        (async () => {
          this.loading = true
          const browser = await puppeteer.launch()
          const page = await browser.newPage()
          page.setViewport({width: this.width, height: this.height})
          await page.goto(this.url, {"waitUntil" : "networkidle0"})
          const screenshot = await page.screenshot()
          await browser.close()
          this.loading = false
          dialog.showSaveDialog((fileName) => {
            if (fileName === undefined){
              console.log("You didn't save the file")
              return
            }
            fs.writeFile(fileName, screenshot, (err) => {
              if (err){
                alert("An error ocurred creating the file "+ err.message)
              }
              alert("Your screenshot has been succesfully saved. 👍")
            })
          })
        })()
      }
    }
  }
</script>
