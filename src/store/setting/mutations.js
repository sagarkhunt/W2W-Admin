import _ from 'lodash'

export default {
  SET_STATE: (state, payload) => {
    _.set(state, payload.action, payload.data)
  },
  CLEAR_FORM: state => {
    _.set(state, 'countryForm', { country_name: null, country_code: null, country_citizen: null })
  }
}
