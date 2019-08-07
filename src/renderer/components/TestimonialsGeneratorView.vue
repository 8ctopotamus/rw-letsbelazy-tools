<template>
  <div>
    <h1 class="display-1">Testimonials Generator</h1>
    <h4 class="headline">Generate HTML formatted testimonials for Real Wealth Marketing.</h4>
    <h3>Upload Excel Spreadsheet <button @click="chooseFile">Choose file</button></h3>
    <h3>Output</h3>
    <p>Copy/paste this HTML into webinar testimonials area in WordPress.</p>
    <textarea v-model="output" name="output-text" id="output-text" ></textarea>
  </div>
</template>

<script>
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
