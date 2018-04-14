<template>
  <div class="fraction">
    <NumberField :num="n[0]" @change="value => change(0, value)" />
    <div class="divider" />
    <NumberField :num="n[1]" @change="value => change(1, value)" nozero />
  </div>
</template>

<script>
export default {
  name: 'Fraction',
  props: {
    n: {
      type: Array,
      default: () => [1, 1]
    }
  },

  methods: {
    change (index, value) {
      const newVal = [...this.n]
      if (index === 1 && value === 0) {
        value = 1
      }
      newVal[index] = value
      this.$emit('change', newVal)
    }
  }
}
</script>

<style scoped lang="scss">
.fraction {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  width: 6em;
  margin: 12px;
  .divider {
    flex: 1 0 6em;
    border-bottom: 3px solid black;
    margin: 5px 0;
  }
}
</style>
