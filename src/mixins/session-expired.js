import { mapActions } from 'vuex'

const logOutSession = 1440

export const inActiveSession = {
  methods: {
    ...mapActions('auth', { triggerLogout: 'logout' }),
    resetTimer() {                     
      if (this.$route.meta.requiresAuth !== undefined &&
        !this.$route.meta.requiresAuth) {
        const _expiredTime = localStorage.getItem('_expiredTime')            
        if (_expiredTime && _expiredTime <= Date.now()) {            
          this.triggerLogout()
          this.$nextTick(() => {
            this.$router.push('/login')
          })
        }  
        localStorage.setItem('_expiredTime', Date.now() + logOutSession * 60 * 1000)
      }
    },
    logout() {
      const _expiredTime = localStorage.getItem('_expiredTime')      
      if (_expiredTime <= Date.now()) {
        if (!this.$route.meta.requiresAuth) {
          this.triggerLogout()
          this.$nextTick(() => {
            this.$router.push('/login').catch(() => {})
          })
        }
        clearInterval(this.logoutTimer)
      }
    }
  },
  mounted() {
    const events = ['load', 'mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {        
      document.addEventListener(event, this.resetTimer, true)
    })
    this.logoutTimer = setInterval(this.logout, 1000)
  },
  beforeDestroy() {
    // TODO: remove all event listeners from document
    const events = ['load', 'mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {
      document.removeEventListener(event, this.resetTimer, true)
    })
    clearInterval(this.logoutTimer)
  }
}
