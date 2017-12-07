export default {
  state: {
    items: []
  },
  mutations: {
    setItems (state, payload) {
      state.items = payload
    }
  },
  actions: {

    // load existing items from the DB
    loadItems ({ commit }, payload) {
      let items = []
      // payload is a firebase data snapshot
      payload.forEach(item => {
        let itm = item.val()
        itm.id = item.key
        items.push(itm)
      })
      commit('setLoading', false)
      commit('setItems', items)
    }

  },
  getters: {
    items (state) {
      return state.items
    }
  }
}
