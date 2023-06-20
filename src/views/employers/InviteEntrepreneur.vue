<template>
  <div id="page-add-emaployer">
    <vs-card>
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full lg:w-1/2 px-8">
          <div class="vx-row mb-2">
            <label for="">{{ $t('light_entrepreneur_full_name') }}</label>
            <vs-input class="w-full" name="Light Entrepreneur Full Name" v-model="form.full_name" v-validate="'required|min:3|max60'" />
            <span class="text-primary text-sm" v-show="errors.has('Light Entrepreneur Full Name')">{{ errors.first('Light Entrepreneur Full Name') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="">{{ $t('light_entrepreneur_email') }}</label>
            <vs-input class="w-full" name="Light Entrepreneur Email" v-model="form.email" v-validate="'required|email'" />
            <span class="text-primary text-sm" v-show="errors.has('Light Entrepreneur Email')">{{ errors.first('Light Entrepreneur Email') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="">{{ $t('message') }}</label>
            <vs-input icon="icon icon-edit" icon-pack="feather" class="w-full" name="Message" v-validate="'required|min:3|max:255'" v-model="form.content" />
            <span class="text-primary text-sm" v-show="errors.has('Message')">{{ errors.first('Message') }}</span>
          </div>
        </div>
      </div>
      <!-- Save & Reset Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-2 ml-4 flex flex-wrap items-center lg:justify-start justify-center">
            <vs-button class="mr-2 vs-con-loading__container" id="add-employer" @click="save_changes" type="relief" :disabled="!validateForm">{{ $t('invite_light_entrepreneur') }}</vs-button>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'InviteLightEnterprenur',
  data() {
    return {
      form: {
        email: null,
        content: null,
        full_name: null
      }
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('employer', { inviteEntrepreneur: 'inviteEntrepreneur' }),

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.inviteEntrepreneur({
          ...this.form
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
          container: '#add-employer',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#add-employer > .con-vs-loading')
      }
    }
  }
}
</script>
<style lang="scss">
.file-browse {
  input::-webkit-file-upload-button {
    visibility: hidden;
  }
}
</style>
