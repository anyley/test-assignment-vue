<template>
  <div class="">
    <div>
      <div class="status-bar">
        <div class="status">Total: <b>{{ activeComments.length + deletedComments.length }}</b></div>
        <div>
          Timeout:
          <input class="input-timeout" type="number" v-model.number="timeout" />
          sec
        </div>
      </div>

      <div class="comments">
        <div class="status">Active: <b>{{ activeComments.length }}</b></div>
        <div class="comment" v-for="comment in activeComments" :key="comment.id">
          {{ comment.message }}
          <div class="delete-button" @click="() => tryDeleteComment({ id: comment.id, timeout })">Delete</div>
        </div>
      </div>

      <div class="comments pending">
        <div class="status">Pending: <b>{{ pendingDeleteComments.length }}</b></div>
        <div class="comment" v-for="comment in pendingDeleteComments" :key="comment.id">
          {{ comment.message }}
          <div class="timeout">Timeout: {{ comment.timeout }}</div>
        </div>
      </div>

      <div class="comments deleted">
        <div class="status">Deleted: <b>{{ deletedComments.length }}</b></div>
        <div class="comment" v-for="comment in deletedComments" :key="comment.id">
          {{ comment.message }}
          <div class="undelete-button" @click="() => tryUndeleteComment({ id: comment.id, timeout })">Undelete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'WebSockets',
  mounted () {
    this.connect()
  },
  data () {
    return {
      timeout: 15
    }
  },
  computed: {
    ...mapState(['comments']),
    ...mapGetters('comments', ['activeComments', 'pendingDeleteComments', 'deletedComments'])
  },
  methods: {
    ...mapActions('comments', ['tryDeleteComment', 'tryUndeleteComment', 'connect', 'disconnect'])
  }
}
</script>

<style scoped lang="scss">
.comments {
  margin-top: 10px;
}

.pending {
  margin: 20px 0;
}

.deleted {
  margin: 10px 0;
}

.status-bar {
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  .input-timeout {
    text-align: right;
    width: 80px;
    border: none;
    border-bottom: 1px solid gray;
  }
}

.status {
  padding-left: 10px;
}

.comment {
  padding: 10px;
  margin: 5px;
  background-color: lightgoldenrodyellow;
  position: relative;
  .delete-button, .undelete-button, .timeout {
    position: absolute;
    background-color: red;
    color: white;
    border: none;
    padding: 3px 10px;
    border-radius: 7px;
    top: 7px;
    right: 10px;
    cursor: pointer;
    opacity: .75;
    &:hover {
      opacity: 1;
      box-shadow: 0 0 6px red;
    }
  }
  .undelete-button {
    background-color: green;
    &:hover {
      opacity: 1;
      box-shadow: 0 0 6px green;
    }
  }
  .timeout {
    background-color: lightblue;
    color: black;
  }
}
</style>
