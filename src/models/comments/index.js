import { connect } from '../../api/echoService'

let timer = null

const state = {
  api: null,

  data: {
    1: { id: 1, message: 'Тестовый коммент 1', deleted: false, isPending: false, timeout: 0 },
    2: { id: 2, message: 'Это шедевр', deleted: false, isPending: false, timeout: 0 },
    3: { id: 3, message: 'Это прекрасно', deleted: false, isPending: false, timeout: 0 },
    4: { id: 4, message: 'Лучшее, что я видел', deleted: true, isPending: false, timeout: 0 },
    5: { id: 5, message: 'Два чая этому автору', deleted: true, isPending: false, timeout: 0 }
  },

  connectionError: null
}

const getters = {
  activeComments: state => Object.values(state.data).filter(comment => !comment.deleted && !comment.isPending),
  deletedComments: state => Object.values(state.data).filter(comment => comment.deleted),
  pendingDeleteComments: state => Object.values(state.data).filter(comment => comment.isPending)
}

const mutations = {
  saveWs (state, api) {
    state.api = api
  },

  deleteRequest (state, { id, timeout }) {
    state.data[id].isPending = true
    state.data[id].timeout = timeout
  },
  deleteSuccess (state, id) {
    state.data[id].isPending = false
    state.data[id].deleted = true
  },

  undeleteRequest (state, { id, timeout }) {
    state.data[id].isPending = true
    state.data[id].timeout = timeout
  },
  undeleteSuccess (state, id) {
    state.data[id].isPending = false
    state.data[id].deleted = false
  },

  error (state, error) {
    state.connectionError = error
  },

  recalcTimeouts (state) {
    Object.values(state.data).forEach(comment => {
      if (comment.timeout > 0) {
        comment.timeout = comment.timeout - 1
      } else {
        comment.isPending = false
        comment.timeout = -1
      }
    })
  }
}

const actions = {
  onResponse ({ commit, state }, data) {
    if (!state.data[data.id].isPending) return

    switch (data.type) {
      case 'delete':
        commit('deleteSuccess', data.id)
        break
      case 'undelete':
        commit('undeleteSuccess', data.id)
        break
    }
  },

  connect ({ commit, dispatch, state }) {
    if (!state.api) {
      commit('saveWs', connect({ onmessage: data => dispatch('onResponse', data) }))
      timer = setInterval(() => commit('recalcTimeouts'), 1000)
    }
  },

  disconnect ({ state }) {
    state.api.disconnect()
    clearInterval(timer)
  },

  tryDeleteComment ({ commit, state }, { id, timeout }) {
    commit('deleteRequest', { id, timeout })
    state.api.deleteComment(id)
  },

  tryUndeleteComment ({ commit, state }, { id, timeout }) {
    commit('undeleteRequest', { id, timeout })
    state.api.undeleteComment(id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
