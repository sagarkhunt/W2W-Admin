<template>
  <div class="relative">
    <div class="vx-navbar-wrapper" :class="classObj">
      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer py-2 pr-2" icon="MenuIcon" @click.stop="showSidebar" />
        <clock />
        <p class="font-semibold">{{ currentTimeZone }}</p>
        <vs-spacer />
        <notification-drop-down />
        <profile-drop-down />
        <div class="dropdown">
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="ml-3 text_uppercase flex items-center justify-center text-xl">
              {{ i18n && i18n.locale }}
            </div>

            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem">
                <li
                  v-for="language in languageList"
                  :key="language.value"
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="handleChangeLanguage(language.language_code)"
                >
                  <span class="ml-2">{{ language.label }}</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import Bookmarks from './components/Bookmarks.vue'
import SearchBar from './components/SearchBar.vue'
import Clock from './components/Clock.vue'
import NotificationDropDown from './components/NotificationDropDown.vue'
import ProfileDropDown from './components/ProfileDropDown.vue'
import moment from 'moment'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { i18n } from '../../../utils/i18n'

export default {
  data() {
    return {
      i18n,
      languageList: [],
      currentTimeZone: null
    }
  },
  name: 'the-navbar-vertical',
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  components: {
    Bookmarks,
    SearchBar,
    NotificationDropDown,
    ProfileDropDown,
    Clock,
    Select2
  },
  mounted() {
    this.getLanguages()
    this.$root.$on('langUpdate', () => {
      this.getLanguages()
    })
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor() {
      return { 'text-white': (this.navbarColor !== '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor !== '#fff' && this.$store.state.theme !== 'dark') }
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },

    getTimeInfo() {
      return this.currentTimeZone
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth === 'default') return 'navbar-default'
      else if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth) return 'navbar-full'
    }
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true)
    },
    getInfoTimeDate() {
      this.currentTimeZone = moment().format('DD.MM.YYYY HH:mm:s')
    },
    handleChangeLanguage(locale) {
      const loadMessagesJson = require(`../../../../i18n/${locale}/${locale}.json`)
      i18n.setLocaleMessage(locale, loadMessagesJson)
      i18n.locale = locale
      this.$store.commit('auth/SET_LOCAL_BEARER', locale)
      this.$router.go()
    },
    getLanguages() {
      this.$store.dispatch('getLanguage').then((res) => {
        this.languageList = res.data
      })
    }
  },
  created() {
    setInterval(this.getInfoTimeDate, 1000)
  }
}
</script>

<style lang="scss">
.text_uppercase {
  text-transform: uppercase;
}
</style>
