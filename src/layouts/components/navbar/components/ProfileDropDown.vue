<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.displayName">
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ user && user.full_name }}</p>
      <small>{{ user && user.email }}</small>
    </div>
    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div v-if="!user.profile_image" class="ml-3 profile__logo flex items-center justify-center text-xl">
        {{ user && user.full_name[0].toUpperCase() }}
      </div>
      <div v-else class="ml-3 profile__logo overflow-hidden flex items-center justify-center text-xl">
        <img :src="user.file_path" alt="item" class="h-full w-full" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="logoutUser">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">{{ $t('logout') }}</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      logoutPopup: false
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    logoutUser() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Logout',
        text: 'Are you sure you want to logout?',
        accept: () => this.logout(),
        acceptText: 'Logout'
      })
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login').catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.the-navbar__user-meta {
  .profile__logo {
    width: 50px;
    height: 50px;
    background: #fff;
    color: #000;
    border-radius: 50%;
    img {
      object-fit: cover;
    }
  }
}
</style>
