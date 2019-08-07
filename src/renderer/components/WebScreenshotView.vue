<template>
  <div class="web-screenshot">  
    <h1 class="display-1">Web Screenshot</h1>
    <h4 class="headline">Take a fullpage screenshot of any web page.</h4>
    <p v-if="loading">Loading...</p> 
    
    <label>Website URL</label>
    <input type="text" v-model="url" name="url" />

    <label>Width</label>
    <input type="text" v-model.number="width" name="width" />
    <input type="range" v-model.number="width" step="1" max="3000" />
    
    <label>Height</label>
    <input type="text" v-model.number="height" name="height" />
    <input type="range" v-model.number="height" step="1" max="3000" />
    

    <button@click="takeScreenshot">Take Screenshot</button>
    
    <h3>Preview</h3>
    <webview ref="screenshotPreview"
      @did-start-loading="loading = true"
      @did-stop-loading="loading = false"
      :src="url"
      :style="`display:inline-flex; width: ${width}px; height: ${height}px;`"
      disablewebsecurity
    />
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
