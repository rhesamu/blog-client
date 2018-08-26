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
        component: () => import(/* webpackChunkName: "content" */ './components/Content.vue'),
        props: true
      }]
    },
    {
      path: '/user/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/user/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/article/add',
      name: 'addArticle',
      component: () => import(/* webpackChunkName: "addPost" */ './views/AddArticle.vue'),
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem('blog-token')
        if (token) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/article/edit',
      name: 'editArticle'
    }
  ]
})
