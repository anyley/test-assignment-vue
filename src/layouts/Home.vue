<template>
  <div class="root">
    <div class="top">
      <tool-bar title="Test assignment" />
      <main-menu :items="menuItems" />
    </div>

    <task-container>
      <router-view slot="main" />
    </task-container>

    <div class="footer">
      © 2018 | Valery Kobzar
    </div>
  </div>
</template>

<script>
import TaskContainer from '../components/TaskContainer'

export default {
  name: 'Home',
  components: { TaskContainer },
  data () {
    return {
      menuItems: [
        { to: '/fractions', label: 'Fractions' },
        { to: '/websockets', label: 'WebSockets' }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.root {
  display: flex;
  flex-flow: column wrap;
  height: 100%;
}

.top {
  position: fixed;
  width: 100vw;
  z-index: 1;
}

.footer {
  position: fixed;
  bottom: 0;
  background-color: rgba(255, 255, 255, .95);
  text-align: right;
  font-size: 0.8em;
  width: 100vw;
  padding: 3px 20px;
  box-sizing: border-box;
  user-select: none;
  color: grey;
  border-top: 1px solid #ebebeb;
  box-shadow: 0 -2px 20px lightgray;
}
</style>
