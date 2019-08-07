<template>
  <div class="social-posts-generator">
    <h1 class="display-1">Social Posts Generator</h1>
    <h4 class="headline">Generate shorcodes for podcasts in WordPress.</h4>
    
    <h3>Source</h3>
    <p>Paste social posts from word doc.</p>
    <label for="input-text">Source Text</label>
    <textarea v-model="inputText" name="input-text" @change="handleInputTextChange"></textarea>

    <h3>Output</h3>
    <p>Copy/paste these shortcodes into Podcast social media areas in WordPress.</p>
    <label for="output-text">Output Text</label>
    <textarea v-model="outputText" name="output-text"></textarea>
  </div>
</template>

<script>
  import generateSocialPostShortcodes from './SocialPostsGenerator'
  export default {
    data () {
      return {
        loading: false,
        error: false,
        inputText: '',
        outputText: ''
      }
    },
    methods: {
      handleInputTextChange (val) {
        this.outputText = generateSocialPostShortcodes(this.inputText)
      }
    }
  }
</script>

<style scoped>
  .social-posts-generator {width: 100%;}
  v-text-field {display: none;}
</style>
