<template>
  <div class="title">{{ title }}</div>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    title: {
      default: 'noname'
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  flex: 0 0;
  margin: 0;
  padding: 10px;
  font-size: 1.2em;
  font-weight: bold;
  background-color: cornflowerblue;
  color: white;
  text-align: center;
  border-bottom: 1px solid lightgray;
}
</style>
