import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layouts/Home'
import Page404 from '@/pages/404'
import Loader from '@/helpers/Loader'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/fractions',
      children: [
        {
          path: 'fractions',
          name: 'Fractions',
          component: Loader({ name: 'fractions' })
        },
        {
          path: 'websockets',
          name: 'WebSockets',
          component: Loader({ name: 'websockets' })
        }
      ]
    },
    {
      path: '*',
      component: Page404
    }
  ]
})
