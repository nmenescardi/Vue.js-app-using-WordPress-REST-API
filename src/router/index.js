import Vue from 'vue'
import Router from 'vue-router'
import MainPosts from '@/components/MainPosts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPosts',
      component: MainPosts
    }
  ]
})
