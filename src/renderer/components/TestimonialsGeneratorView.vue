<template>
  <div class="web-screenshot">
    <h1 class="display-1">Testimonials Generator</h1>
    <h4 class="headline">Generate HTML formatted testimonials for Real Wealth Marketing.</h4>
    <v-divider class="mt-4 mb-4" />
    <v-layout row wrap justify-center id="wrapper">
      <v-flex>
        <h3>Upload Excel Spreadsheet.</h3>
        <v-btn @click="chooseFile">Choose file</v-btn>
      </v-flex>
      <v-flex>
        <h3>Output</h3>
        <p>Copy/paste this HTML into webinar testimonials area in WordPress.</p>
        <v-text-field
          v-model="output"
          auto-grow
          name="output-text"
          label="Output Text"
          multi-line
          solo
        ></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  /* eslint-disable */
  const fs = require('fs')
  const { dialog } = require('electron').remote
  import generateTestimonialsShortcodes from './TestimonialsGenerator'
  export default {
    name: 'webScreenshot',
    data () {
      return {
        loading: false,
        output: ''
      }
    },
    methods: {
      chooseFile () {
        dialog.showOpenDialog((fileNames) => {
          if (fileNames === undefined) {
            console.log("No file selected")
            return
          }
          this.output = generateTestimonialsShortcodes(fileNames[0])
        })
      }
    }
  }
</script>