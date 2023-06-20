<template>
  <div class="add__EMPLATE">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('add_email_tempalte')">
      <div class="con-exemple-prompt p-3">
        <div class="vx-row mb-2">
          <label for="tname">{{ $t('template_name') }}</label>
          <vs-input id="tname" class="w-full" name="tname" v-model="add_form.template_name" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('tname')">{{ errors.first('tname') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="fname">{{ $t('first_name') }}</label>
          <vs-input id="fname" class="w-full" name="fname" v-model="add_form.from_name" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('fname')">{{ errors.first('fname') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="ename"> {{ $t('email_name') }}</label>
          <vs-input id="ename" class="w-full" name="ename" v-model="add_form.from_email" v-validate="'required|email'" />
          <span class="text-primary text-sm" v-show="errors.has('ename')">{{ errors.first('ename') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="subject"> {{ $t('email_subject') }}</label>
          <vs-input id="subject" class="w-full" name="subject" v-model="add_form.subject" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('subject')">{{ errors.first('subject') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="tname">{{ $t('template_type') }}</label>
          <vs-input id="tname" class="w-full" name="Template Type" v-model="add_form.template_type" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('Template Type')">{{ errors.first('Template Type') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="content"> {{ $t('content') }}</label>
          <ckeditor v-model="add_form.content" :config="editorConfig" style="height: auto; min-height: 150px" v-validate="'required'" name="content"></ckeditor>
          <span class="text-primary text-sm" v-show="errors.has('content')">{{ errors.first('content') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="addEmailModal = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="addTemplateRecord" :disabled="!validateForm" type="submit">{{ $t('add') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { mapActions, mapState } from 'vuex'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'AddTemplatePopup',
  props: {
    isModalShow: Boolean
  },
  components: {
    // quillEditor
  },
  data() {
    return {
      add_form: {
        template_name: '',
        from_name: '',
        from_email: '',
        subject: '',
        content: '',
        template_type: ''
      },
      editorConfig: {
        // The configuration of the editor.
        fullPage: true,
        dangerousHtml: true,
        allowedContent: true
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
  },
  computed: {
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
    ...mapActions('setting', {
      addEmailRecords: 'addEmailRecords'
    }),
    //add records template
    async addTemplateRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/addEmailRecords', {
          ...this.add_form
        })
        .then(({ message }) => {
          this.$emit('newInvList')
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
          })``
        })
    }
  }
}
</script>

<style lang="scss">
.cke_dialog_container {
  z-index: 99999 !important;
  .cke_dialog {
    border: 1px solid #000;
    box-shadow: 1px 1px 16px 3px #ccc;
  }
}
</style>
