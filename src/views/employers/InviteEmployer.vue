<template>
  <div id="page-add-emaployer">
    <vs-card>
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full lg:w-1/2 px-8">
          <div class="vx-row mb-2">
            <label for="">{{ $t('employer_name') }}</label>
            <vs-input class="w-full" v-validate="'required|min:3|max:60'" name=" Employer Name" v-model="form.full_name" />
            <span class="text-primary text-sm" v-show="errors.has(' Employer Name')">{{ errors.first(' Employer Name') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="">{{ $t('employer_email') }}</label>
            <vs-input class="w-full" name=" Employer Email" v-model="form.email" v-validate="'required|email'" />
            <span class="text-primary text-sm" v-show="errors.has(' Employer Email')">{{ errors.first(' Employer Email') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="">{{ $t('message') }}</label>
            <vs-input icon="icon icon-edit" icon-pack="feather" class="w-full" name="Message" v-validate="'required|max:255'" v-model="form.content" />
            <span class="text-primary text-sm" v-show="errors.has('Message')">{{ errors.first('Message') }}</span>
          </div>
        </div>
      </div>
      <!-- Save & Reset Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-2 ml-4 flex flex-wrap items-center lg:justify-start justify-center">
            <vs-button class="mr-2 vs-con-loading__container" id="add-employer" @click="save_changes" type="relief" :disabled="!validateForm || saveButton">{{ $t('invite_employer') }}</vs-button>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'InviteEmployer',
  data() {
    return {
      saveButton: false,
      form: {
        email: null,
        full_name: null,
        content: null
      }
    }
  },
  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('employer', { inviteEmployer: 'inviteEmployer' }),

    async save_changes() {
      this.saveButton = true
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.inviteEmployer({
          ...this.form
        })
        this.saveButton = false
        this.form = {
          email: null,
          full_name: null,
          content: null
        }
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } catch ({ message }) {
        this.saveButton = false
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
