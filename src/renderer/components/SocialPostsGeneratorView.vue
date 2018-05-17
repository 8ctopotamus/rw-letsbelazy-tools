<template>
  <div class="social-posts-generator">
    <h1 class="display-1">Social Posts Generator</h1>
    <h4 class="headline">Generate shorcodes for podcasts in WordPress.</h4>
    <v-divider class="mt-4 mb-4" />
    <v-layout row wrap>
      <v-flex sm12 md6>
        <h3>Source</h3>
        <p>Paste social posts from word doc.</p>
        <v-text-field
          v-model="inputText"
          auto-grow
          name="input-text"
          label="Source Text"
          multi-line
          solo-inverted
          @change="handleInputTextChange"
        ></v-text-field>
      </v-flex>
      <v-flex sm12 md6>
        <h3>Output</h3>
        <p>Copy/paste these shortcodes into Podcast social media areas in WordPress.</p>
        <v-text-field
          v-model="outputText"
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
