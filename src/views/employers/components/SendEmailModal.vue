<template>
  <div class="send__email">
    <vs-popup id="employer__list" class="vs-con-loading__container" button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.SendMail')">
      <div class="con-exemple-prompt">
        <!-- full name -->
        <div>
          <vs-input placeholder="Name" vs-placeholder="Name" v-model="userMailInfo.full_name" class="mt-3 w-full" />
        </div>

        <!-- email -->
        <div>
          <vs-input placeholder="Name" vs-placeholder="Name" v-model="userMailInfo.email" class="mt-3 w-full" />
        </div>

        <!-- subject -->
        <div>
          <vs-input placeholder="Subject" vs-placeholder="Subject" v-model="userMailInfo.subject" class="mt-3 w-full" />
        </div>

        <!-- content -->
        <div>
          <vs-textarea label="Message Body" width="300px" v-model="userMailInfo.content" class="mt-3 w-full" />
        </div>
      </div>
      <div class="footer text-right">
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" type="relief" @click="sendMail" :disabled="!validateForm">{{ $t('send_mail') }}</button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'SendEmailModal',
  props: {
    isModalShow: Boolean,
    employer: Object
  },
  data() {
    return {
      userMailInfo: {
        full_name: null,
        email: null,
        subject: null,
        content: null
      }
    }
  },
  mounted() {
    this.userMailInfo.full_name = this.employer.full_name
    this.userMailInfo.email = this.employer.email
    // handle background scroll
    backgrondScrollHandler(true)
  },
  computed: {
    ...mapState('employer', ['loading']),
    // modal stat
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        // handle background scroll
        backgrondScrollHandler(false)
        this.$emit('update:isModalShow', val)
      }
    },

    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    async sendMail() {
      if (!(await this.$validator.validate())) {
        return false
      }

      this.$store
        .dispatch('employer/sendMailForEmployerLE', { ...this.userMailInfo })
        .then(({ message }) => {
          this.isActive = false
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
        })
        .catch(({ message }) => {
          this.$vs.notify({
            title: 'Error',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'primary'
          })
        })
    }
  },
}
</script>

<style></style>
