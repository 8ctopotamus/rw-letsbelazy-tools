<template>
  <div class="social-posts-generator">
    <h1>Social Posts Generator</h1>
    <v-layout row wrap>
      <v-flex sm12 md6>
        <h3>Source</h3>
        <p>Paste social posts from word doc.</p>
        <v-text-field
          v-model="inputText"
          name="input-text"
          label="Source Text"
          multi-line
          @change="handleInputTextChange"
        ></v-text-field>
      </v-flex>
      <v-flex sm12 md6>
        <h3>Output</h3>
        <p>Copy/paste these shortcodes into Podcast social media areas.</p>
        <v-text-field
          v-model="outputText"
          name="output-text"
          label="Output Text"
          multi-line
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
        console.log('input text changed')
        generateSocialPostShortcodes(this.inputText)
      }
    }
  }
</script>

<style scoped>
  .social-posts-generator {width: 100%;}
</style>
