<template>
  <div class="formula">
    <div class="part actions">
      <div class="button" @click="addFraction">Add</div>
      <div class="button" style="color: red" @click="deleteFraction">Delete</div>
    </div>

    <div class="part" v-for="(op, key) in ops" :key="key">
      <fraction :n="fractions[key]" @change="value => changeFraction(key, value)" />
      <op-field :operator="op" @change="value => changeOprator(key, value)" />
    </div>

    <div class="part">
      <fraction :n="lastFraction" @change="value => changeFraction(lastFractIndex, value)" />
      <div class="eq">=</div>
      <fraction :n="result" />
    </div>
    <div class="empty"></div>
  </div>
</template>

<script>
import Fract from 'fraction.js'

window.Fract = Fract

export default {
  name: 'Fractions',

  data () {
    return {
      ops: [
        '+',
        'x'
      ],
      fractions: [
        [5, 6],
        [2, 3],
        [1, 2]
      ]
    }
  },

  computed: {
    fr () {
      return this.fractions.map(f => Fract(f))
    },

    lastFractIndex () {
      return this.fractions.length - 1
    },

    lastFraction () {
      return this.fractions[this.lastFractIndex]
    },

    result () {
      const ops = [...this.ops]
      const pass2 = []
      let res = this.fr[0]

      this.ops.forEach((op, i) => {
        if (op === 'x') {
          res = res.mul(this.fr[i + 1])
          ops.splice(i, 1)
        } else if (op === '/') {
          res = res.div(this.fr[i + 1])
          ops.splice(i, 1)
        } else {
          pass2.push(res)
          res = this.fr[i + 1]
        }
      })
      pass2.push(res)

      res = pass2[0]
      ops.forEach((op, i) => {
        if (op === '+') {
          res = res.add(pass2[i + 1])
        } else if (op === '-') {
          res = res.sub(pass2[i + 1])
        }
      })

      return [res.s * res.n, res.d]
    }
  },

  methods: {
    addFraction () {
      this.ops.unshift('+')
      this.fractions.unshift([1, 1])
    },

    deleteFraction () {
      if (this.ops.length <= 1) return

      this.fractions.shift()
      this.ops.shift()
    },

    changeOprator (index, value) {
      this.$set(this.ops, index, value)
    },

    changeFraction (index, value) {
      this.$set(this.fractions, index, value)
    }
  }
}
</script>

<style scoped lang="scss">
.formula {
  display: flex;
  position: absolute;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  left: 0;
  right: 0;
  top: 74px;
  overflow-y: auto;
  padding: 20px;
  .eq {
    font-size: 3em;
  }
  .part {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    height: 140px;
    margin: 0;
  }
  .part.actions {
    flex-flow: column wrap;
  }
  .button {
    text-align: center;
    border: 1px solid #ebebeb;
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    user-select: none;
    width: 60px;
    &:hover {
      background-color: #ebebeb;
    }
  }
  .empty2 {
    width: 100%;
    height: 100%;
    border: 1px solid blue;
    /*flex: 1 0 100%;*/
  }
}
</style>
