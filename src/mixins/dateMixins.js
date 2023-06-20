import moment from 'moment'

export const dateMixins = {
  methods: {
    formatDate(date) {
      return moment(date).format('DD.MM.YYYY')
    },
    formatDateSubmit(date) {      
      return moment(date).format('YYYY/MM/DD')
    },
    formatOldDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    formatDateTime(date) {
      return moment(date).format('MM-DD-YYYY hh:mm:ss A')
    }
  }
}
