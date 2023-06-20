<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto" />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">{{ $t('login') }}</h4>
                  <p>{{ $t('welcome_back_way_2_work_,_please_login_to_your_account.') }}</p>
                </div>
                <form action="" v-on:keyup.enter="save_changes">
                  <div class="vx-row pt-5 px-5">
                    <div class="vx-col w-full">
                      <div class="vx-row mb-2">
                        <label for="email">{{ $t('email') }}</label>
                        <vs-input
                          id="email"
                          class="w-full"
                          type="email"
                          v-validate="'required'"
                          name="Email"
                          icon-no-border
                          icon="icon icon-user"
                          icon-pack="feather"
                          v-model="email"
                          placeholder="Enter Email"
                        />
                        <span class="text-primary text-sm" v-show="errors.has('Email')">{{ errors.first('Email') }}</span>
                      </div>

                      <div class="vx-row mb-2">
                        <label for="password">{{ $t('password') }}</label>
                        <vs-input
                          id="password"
                          class="w-full"
                          type="password"
                          v-validate="'required'"
                          name="Password"
                          icon-no-border
                          icon="icon icon-lock"
                          icon-pack="feather"
                          v-model="password"
                          placeholder="Enter Password"
                        />
                        <span class="text-primary text-sm" v-show="errors.has('Password')">{{ errors.first('Password') }}</span>
                      </div>
                    </div>
                    <vs-button class="mt-3 items-center vs-con-loading__container" :disabled="!validateForm" id="login-user" @click="save_changes" v-on:keyup.enter="save_changes">{{
                      $t('login')
                    }}</vs-button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      email: null,
      password: null,
      checkbox_remember_me: false
    }
  },
  computed: {
    ...mapState('auth', ['loading']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('auth', { login: 'login' }),

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.login({
          email: this.email,
          password: this.password
        })
        this.$router.push({
          name: 'home'
        })
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#login-user',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#login-user > .con-vs-loading')
      }
    }
  }
}
</script>

<style lang="scss"></style>
