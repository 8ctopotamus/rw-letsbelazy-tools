<template>
  <div class="webinar-registration">
    <v-alert :value="true" type="warning">
      This feature is currently under development. Coming soon!
    </v-alert>
    <h1 class="display-1">Webinar Registration</h1>
    <h4 class="headline">Register people for GoToWebinar.</h4>
    <v-divider class="mt-4 mb-4" />
    <h3>Upload Excel Spreadsheet.</h3>
    <v-btn @click="chooseFile">Choose file</v-btn>
  </div>
</template>

<script>
  /* eslint-disable */
  const { dialog } = require('electron').remote
  export default {
    name: 'webinarRegistration',
    data () {
      return {
        loading: false,
      }
    },
    methods: {
      chooseFile () {
        dialog.showOpenDialog((fileNames) => {
          if (fileNames === undefined) {
            console.log("No file selected")
            return
          }
          console.log(filenames[0])
        })
      }
    }
  }
</script>
