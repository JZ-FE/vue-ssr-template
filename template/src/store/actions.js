{{#if_not hackernews}}// {{/if_not}}import createAPI from './create-api'

/* eslint-disable arrow-body-style, no-empty-pattern */
export default {
  {{#hackernews}}
  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({ commit, dispatch }, { type }) => {
    commit('SET_ACTIVE_TYPE', { type })
    return createAPI({
      url: `${type}stories.json`,
      retData: true,
    }).then(ids => commit('SET_LIST', { type, ids }))
      .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
  },

  // ensure all active items are fetched
  ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }) => {
    return dispatch('FETCH_ITEMS', {
      ids: getters.activeIds,
    })
  },

  FETCH_ITEM: ({}, { id }) => {
    return createAPI({
      url: `item/${id}.json`,
      retData: true,
    })
  },

  FETCH_ITEMS: ({ commit, dispatch, state }, { ids }) => {
    // on the client, the store itself serves as a cache.
    // only fetch items that we do not already have, or has expired (3 minutes)
    const now = Date.now()
    let list = ids
    list = list.filter((id) => {
      const item = state.items[id]
      if (!item) {
        return true
      }
      if (now - item.__lastUpdated > 1000 * 60 * 3) {
        return true
      }
      return false
    })
    if (list.length) {
      return Promise.all(list.map((id) => {
        return new Promise((resolve) => {
          return dispatch('FETCH_ITEM', {
            id,
          }).then(item => resolve(item))
        })
      })).then(items => commit('SET_ITEMS', { items }))
    }
    return Promise.resolve()
  },

  FETCH_USER: ({ commit, state }, { id }) => {
    return state.users[id] ? Promise.resolve(state.users[id]) : createAPI({
      url: `user/${id}.json`,
      retData: true,
    }).then(user => commit('SET_USER', { id, user }))
  },
  {{/hackernews}}
}
