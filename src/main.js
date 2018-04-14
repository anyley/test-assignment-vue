import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import './styles.scss'
import { store } from './models'

Vue.config.productionTip = false

const components = [
  'MainMenu',
  'ToolBar',
  'TaskContainer',
  'NumberField',
  'OpField',
  'Fraction'
]

components.forEach(component => Vue.component(component, () => import(`@/components/${component}`)))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render () {
    return <App />
  }
})
