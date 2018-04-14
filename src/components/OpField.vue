<template>
  <select class="op-field" @change="change" :value="operator">
    <option class="op-item" v-for="(item, key) in opList" :key="key">
      {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'OpField',

  props: {
    operator: {
      default: '+'
    },
    opList: {
      type: Array,
      default: () => ['+', '-', 'x', '/']
    }
  },

  methods: {
    change (e) {
      this.$emit('change', e.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
.op-field {
  appearance: none;
  font-size: 2rem;
  border: 3px solid black;
  border-radius: 10px;
  width: 2.8rem;
  height: 2.5rem;
  text-align: center;
  background-color: transparent;
  padding: 0 0.7rem;
}
.op-item {
  width: 1.2rem;
  font-size: 1.5rem;
  text-align: center;
  padding: 0;
  padding-left: 1rem;
}
</style>
