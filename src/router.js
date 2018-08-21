import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import Content from './components/Content'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: '/:id',
        name: 'content',
        component: () => import(/* webpackChunkName: "about" */ './components/Content.vue'),
        props: true
      }]
    },
    {
      path: '/login',
      name: 'login'
    },
    {
      path: '/register',
      name: 'register'
    },
    {
      path: '/add',
      name: 'add'
    },
    {
      path: '/edit',
      name: 'edit'
    }
  ]
})
