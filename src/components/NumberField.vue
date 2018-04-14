<template>
  <div>
    <input
      :class="['number-field', { negative: number < 0 }]"
      type="number"
      :value="num"
      @keydown="validate"
      @input="changeNumber"
      @change="changeNumber"
    />
  </div>
</template>

<script>
export default {
  name: 'NumberField',

  props: {
    num: {
      default: 1
    },
    nozero: Boolean
  },

  computed: {
    number () {
      return this.normalizeNumber(this.num)
    }
  },

  methods: {
    normalizeNumber (value) {
      if (this.nozero) {
        return parseInt(String(value).replace(/[^-0-9]/g, '1'), 10) || 1
      } else {
        return parseInt(String(value).replace(/[^-0-9]/g, '0'), 10) || 0
      }
    },

    validate (e) {
      if (e.key.length > 1) return

      if (e.key === '-') {
        this.$emit('change', -this.number)
        e.preventDefault()
        return
      }

      if (!e.key.match(/[0-9]/)) {
        e.preventDefault()
      }
    },

    changeNumber (e) {
      if (parseInt(e.target.value, 10) === 0 && this.nozero) {
        this.$emit('change', 1)
      } else {
        this.$emit('change', this.normalizeNumber(e.target.value))
      }
    }
  }
}
</script>

<style>
.number-field {
  font-size: 2em;
  border: 3px solid black;
  border-radius: 10px;
  padding: 5px;
  width: 2em;
}

.number-field.negative {
  color: red;
}
</style>
