<template>
  <div class="task">
    <slot name="main" />
  </div>
</template>

<script>
export default {
  name: 'TaskContainer'
}
</script>

<style scoped>
.task {
  padding: 100px 20px 20px 20px;
  flex: 1 0;
  margin: 0;
}
</style>
