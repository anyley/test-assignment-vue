<template>
  <nav class="menu">
    <ul>
      <router-link :class="getClass(item.to)" :to="item.to" v-for="(item, key) in items" :key="key">
        <li>{{ item.label }}</li>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'MainMenu',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  methods: {
    getClass (to) {
      return ['item', { selected: to === this.$route.path }]
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  background-color: rgba(255, 255, 255, .95);
  box-shadow: 0 2px 20px lightgray;
  flex: 0 0;
  margin: 0;
  padding: 0;
  user-select: none;
  border-bottom: 1px solid lightgray;
  ul {
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    padding: 0;
    margin: 0;
    .item {
      padding: 5px 15px;
      color: cornflowerblue;
      border-bottom: 2px solid transparent;
      text-decoration: none;
      &:hover {
        background-color: #ebebeb;
        color: black;
      }
    }
    .selected {
      border-bottom: 2px solid red;
    }
  }
}
</style>
