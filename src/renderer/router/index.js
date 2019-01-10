import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/WelcomeView').default
    },
    {
      path: '/web-screenshot',
      name: 'web-screenshot',
      component: require('@/components/webScreenshotView').default
    },
    {
      path: '/testimonials-generator',
      name: 'inspire',
      component: require('@/components/TestimonialsGeneratorView').default
    },
    {
      path: '/social-posts-generator',
      name: 'social-posts-generator',
      component: require('@/components/SocialPostsGeneratorView').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
