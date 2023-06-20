import { mapGetters } from 'vuex'

/* eslint-disable no-lonely-if */
export default {
  methods: {
    ...mapGetters({ getState: 'GET_STATE' }),
    mapFields(...data) {
      if (data.length > 1) {
        if (Array.isArray(data[1])) {
          return data[1].reduce((col, prop) => {
            col[prop] = {
              get() {
                return this.getState(`${data[0]}.${prop}`)
              },
              set(value) {

                this.$store.commit('SET_STATE', {
                  module: data[0],
                  action: prop,
                  data: value
                })
              }
            }
            return col
          }, {})
        } else {
          return Object.keys(data[1]).reduce((col, prop) => {
            col[prop] = {
              get() {
                return this.getState(`${data[0]}.${data[1][prop]}`)
              },
              set(value) {
                this.$store.commit('SET_STATE', {
                  module: data[0],
                  action: data[1][prop],
                  data: value
                })
              }
            }
            return col
          }, {})
        }
      } else {
        if (Array.isArray(data[0])) {
          return data[0].reduce((col, prop) => {
            col[prop] = {
              get() {
                return this.getState(`${prop}`)
              },
              set(value) {
                this.$store.commit('SET_STATE', {
                  action: prop,
                  data: value
                })
              }
            }
            return col
          }, {})
        } else {
          return Object.keys(data[0]).reduce((col, prop) => {
            col[prop] = {
              get() {
                return this.getState(`${data[0][prop]}`)
              },
              set(value) {
                this.$store.commit('SET_STATE', {
                  action: data[0][prop],
                  data: value
                })
              }
            }
            return col
          }, {})
        }
      }
    }
  }
}
