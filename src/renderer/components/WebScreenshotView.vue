<template>
  <div class="web-screenshot">
    <v-layout row wrap>
      <v-flex md10>
        <h1 class="display-1">Web Screenshot</h1>
        <h4 class="headline">Take a fullpage screenshot of any web page.</h4>
      </v-flex>
      <v-flex md2 class="text-lg-right">
        <v-progress-circular v-if="loading" :size="70" :width="7" indeterminate color="purple"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-divider class="mt-4 mb-4" />
    <v-layout row wrap>
      <v-flex md2>
        <v-text-field v-model="url" label="Website URL" name="url" />
        <v-text-field v-model.number="width" label="Width" suffix="px" />
        <v-slider v-model.number="width" step="1" max="3000" />
        <v-text-field v-model.number="height" label="Height" suffix="px" />
        <v-slider v-model.number="height" step="1" max="3000" />
        <v-btn raised color="primary" @click="takeScreenshot">Take Screenshot</v-btn>
      </v-flex>
      <v-spacer />
      <v-flex md9>
        <h3>Preview</h3>
        <webview ref="screenshotPreview"
          @did-start-loading="loading = true"
          @did-stop-loading="loading = false"
          :src="url"
          :style="`display:inline-flex; width: ${width}px; height: ${height}px;`"
          disablewebsecurity
        />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  /* eslint-disable */
  const fs = require('fs')
  const electron = require('electron')
  const { dialog } = require('electron').remote
  export default {
    name: 'webScreenshot',
    data () {
      return {
        loading: false,
        url: 'https://realwealthmedia.com',
        width: 850,
        height: 700
      }
    },
    methods: {
      takeScreenshot () {
        this.loading = true
        const webview = this.$refs.screenshotPreview
        // Injects javascript into the webview page in order to determine the viewable window height
        function getWebviewMeta(cb) {
            var code = "var r = {}; \
                r.pageHeight = window.innerHeight; \
                r.pageWidth = window.innerWidth; \
                r;";
            webview.executeJavaScript(code, false, function (r) {
                let webviewMeta = {};
                webviewMeta.captureHeight = r.pageHeight;
                webviewMeta.captureWidth = r.pageWidth;
                cb(webviewMeta);
            });
        }

        // Creates an image of the visible area of the WebView
        function captureWeb() {
            getWebviewMeta(function (webviewMeta) {
                // builds a rectangle whose dimensions are scaled based on the display scale factor
                // this rectangle represents the scaled viewable window in the Electron application for the WebView
                let captureRect = {
                    x: 0,
                    y: 0,
                    width: +webviewMeta.captureWidth * electron.screen.getPrimaryDisplay().scaleFactor,
                    height: +webviewMeta.captureHeight * electron.screen.getPrimaryDisplay().scaleFactor
                };

                webview.capturePage(captureRect, (img) => {
                    if (img.isEmpty()) {
                        // DIDN’T CAPTURE
                        // NOTE - in my application we are manually scrolling the view and timing of the record
                        // is an issue - sometimes the captured image is empty, we delay a few hundred ms
                        // and capture again
                    } else {
                        // SAVE YOUR JPEG FILE
                        let jpgFile = img.toJPEG(90);

                        // If you want the image size to be the expected pixel resolution, resize it by scaleFactor:
                        let resizedImg = img.resize({width : img.getSize().width / electron.screen.getPrimaryDisplay().scaleFactor});
                        let resizedJpgFile = resizedImg.toJPEG(90);
                        dialog.showSaveDialog((fileName) => {
                          if (fileName === undefined) {
                            console.log("You didn't save the file")
                            return
                          }
                          fs.writeFile(fileName + '.jpg', resizedJpgFile, (err) => {
                            if (err){
                              alert("An error ocurred creating the file "+ err.message)
                            }
                            alert("Your screenshot has been succesfully saved. 👍")
                          })
                        })
                    }
                });
            });
        }

        captureWeb()
        this.loading = false
      },
      saveImage(img) {

      }
    }
  }
</script>
