<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/testimonials-generator">Testimonials Generator</router-link>
    <router-link to="/web-screenshot">Web screenshot</router-link>
    <router-link to="/social-posts-generator">Social Posts Generator</router-link>
    
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'rw-lazytools'
  }
</script>

<style>
  /* CSS */
  #app {
    background: white;
  }
</style>
