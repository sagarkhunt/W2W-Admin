import Vue from 'vue'
//VueI18n
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import en from '../../i18n/en/en.json'; // default locale
export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en
  }
})