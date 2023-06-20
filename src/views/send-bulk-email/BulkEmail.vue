<template>
  <div id="page-add-emaployer">
    <div class="mb-6 desc">{{ $t('here_you_can_send_bulk_emails_by_uploading_csv_files') }}</div>
    <vs-card class="p-2">
      <div class="grid lg:grid-cols-2 lg:gap-3 gap-6">
        <div class="send-bulk-wrapper">
          <div>
            <div class="xl:grid xl:grid-cols-12 xl:gap-5 md:w-full items-end mb-3">
              <div class="xxl:col-span-9 col-span-8">
                <div class="mb-2">
                  <label for="">{{ $t('email_subject') }}</label>
                  <vs-input class="w-full" v-validate="'required|min:3|max:60'" name="Subject" v-model="form.subject" />
                  <span class="text-primary text-sm" v-show="errors.has('Subject')">{{ errors.first('Subject') }}</span>
                </div>
                <div class="mb-2">
                  <label for="">{{ $t('email_sender') }}</label>
                  <vs-input class="w-full" v-validate="'required|min:3|max:60'" name="email" v-model="form.email_sender" disabled />
                  <span class="text-primary text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                </div>
                <div class="mt-2">
                  <label for="language">{{ $t('select_language') }}</label>
                  <select-2
                    class="w-full"
                    :value="languageId"
                    @input="(item) => (languageId = item && item.value)"
                    name="Language"
                    v-validate="'required'"
                    placeholder="Select Language"
                    autocomplete
                    action="getLanguage"
                  />
                  <span class="text-primary text-sm" v-show="errors.has('Language')">{{ errors.first('Language') }}</span>
                </div>
                <div class="mt-2">
                  <label for="gender">{{ $t('choose_template') }}</label>
                  <select-2
                    id="choose_mail_type"
                    placeholder="Choose sent mail"
                    icon-pack="feather"
                    class="w-full"
                    name="choose mail type"
                    v-validate="'required'"
                    :value="form.template_type"
                    @input="(item) => (form.template_type = item && item.value)"
                    :options="emailTemplateTypes"
                    :disabled="emailTemplateTypes.length == 0 ? true : false"
                  />
                  <span class="text-primary text-sm" v-show="errors.has('choose mail type')">{{ errors.first('choose mail type') }}</span>
                </div>
              </div>
              <div class="xxl:col-span-3 col-span-4">
                <vs-button type="relief" class="xl:w-full xl:mt-0 mt-2" @click="saveTemplate()" :disabled="!form.template_type ? true : false">{{ $t('save_template') }} </vs-button>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-full">
                <div class="mb-5 pl-2">
                  <label for="">{{ $t('content') }}</label>

                  <ckeditor v-model="form.content" :config="editorConfig" style="height: auto; min-height: 150px" v-validate="'required'" name="content"></ckeditor>
                </div>
                <span class="text-primary text-sm" v-show="errors.has('content')">{{ errors.first('content') }}</span>
              </div>
            </div>
          </div>
          <!-- Save & Reset Button -->
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="flex flex-wrap items-center md:justify-start justify-center">
                <vs-button class="sm:mr-2 vs-con-loading__container mt-5" id="add-employer" @click="save_changes" type="relief" :disabled="!validateForm">{{ $t('send_mail') }}</vs-button>
              </div>
            </div>
          </div>
          <!-- Save & Reset Button -->
        </div>

        <div class="">
          <div class="email_list p-2 sm:flex items-start justify-between mb-5">
            <vs-upload :limit="1" :value="form.emailList" ref="emailList" text="Import emails" :show-upload-button="false" @on-delete="removeEmailListHandler" accept=".csv" />
            <vs-button type="relief" class="xxl:w-1/4 ml-2 export-btn" @click="emailTemplateExport">
              {{ $t('export_emails') }}
            </vs-button>
          </div>
          <div v-if="form.template_type !== 4" class="attachment_file p-2">
            <vs-upload :value="form.document" ref="profileimage" text="Add Attachments" :show-upload-button="false" @on-delete="removeProfileImageHandler" accept="image/jpeg,image/png" />
          </div>
          <div class="mt-5">
            <label for="" class="font-semibold">{{ $t('email_preview') }}</label>
            <div class="vx-col w-full sm:px-8 px-5 sm:py-6 py-4 email-preview mt-1 sm:mb-0 mb-5 pb-5">
              {{ $t('email_preview') }}
            </div>
          </div>
        </div>
      </div>
    </vs-card>
    <!-- Add Email Template start -->
    <ExportTemplatePopup v-if="isExportTemplateModal" :isModalShow.sync="isExportTemplateModalShow" />
    <!-- Add Email Template End -->
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { mapActions } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import ExportTemplatePopup from '@/views/send-bulk-email/components/ExportTemplateModel.vue'

export default {
  name: 'SendBulkEmail',
  components: {
    quillEditor,
    Select2,
    ExportTemplatePopup
  },
  data() {
    return {
      countries: [],
      emailTemplateTypes: [],
      emailTemplateContent: null,
      form: {
        subject: '',
        email_sender: 'no-replay@way2work.fi',
        content: '',
        document: '',
        user_type: '',
        template_type: '',
        emailList: null
      },
      languageId: null,
      //add template modal
      isExportTemplateModal: false,
      isExportTemplateModalShow: false,
      editorConfig: {
        // The configuration of the editor.
        fullPage: true,
        dangerousHtml: true,
        allowedContent: true
      }
    }
  },

  mounted() {},

  computed: {
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('leDocument', {
      sendBulkEmails: 'sendBulkEmails',
      updateEmailTemplate: 'updateEmailTemplate'
    }),
    // export template model
    emailTemplateExport() {
      this.isExportTemplateModal = true
      this.isExportTemplateModalShow = true
    },

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      const data = new FormData()
      data.append('subject', this.form.subject)
      data.append('content', this.form.content)
      data.append('user_type', this.form.user_type)
      data.append('template_type', this.emailTemplateTypes.find((x) => x.value === this.form.template_type).label)
      data.append('languageId', this.languageId)
      this.$refs['profileimage'] &&
        this.$refs['profileimage'].filesx.forEach((file) => {
          data.append('document', file)
        })
      this.$refs['emailList'] &&
        this.$refs['emailList'].filesx.forEach((file) => {
          data.append('email_file', file)
        })
     
      try {
        const { message } = await this.sendBulkEmails(data)
        this.form.subject = ''
        this.form.email = ''
        this.form.content = ''
        this.form.user_type = ''

        if (this.$refs.profileimage) {
          this.$refs.profileimage.value = null
        }

        if (this.$refs.emailList) {
          this.$refs.emailList.value = null
        }

        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        window.location.href = `/send/bulk-email/`
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },

    // save template
    async saveTemplate() {
      if (this.form.template_type || this.form.content) {
        try {
          const { message } = await this.updateEmailTemplate({
            id: this.form.template_type,
            data: {
              content: this.form.content
            }
          })
          this.viewEmail = false
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
      } else {
        this.$vs.notify({
          title: 'Error',
          text: 'Please select template type and language',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },

    // get email template type
    async getEmailTemplateTypes(languageId) {
      this.$store
        .dispatch('setting/getAllEmailTypes', {
          languageId: languageId
        })
        .then((res) => {
          this.emailTemplateTypes = res.data.map((x) => ({ label: x.template_type, value: x.id }))
        })
    },

    // get email template by template id
    async getEmailTemplateById(id) {
      this.$store.dispatch('setting/getEmailTemplateById', id).then(({ data }) => {
        this.emailTemplateContent = data.data.content
        this.form.content = data.data.content
        this.handleEmailPreview()
      })
    },

    // handle email preview
    async handleEmailPreview() {
      if (document.querySelector('.email-preview')) {
        document.querySelector('.email-preview').innerHTML = this.form.content
      }
    },

    // remove email list
    removeEmailListHandler() {
      this.$refs.emailList.value = null
    },

    // remove profile image
    removeProfileImageHandler() {
      this.$refs.profileimage.filesx = []
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
    },
    languageId: {
      handler(newval) {
        if (newval) {
          this.getEmailTemplateTypes(newval)
        }
      }
    },
    isExportTemplateModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isExportTemplateModal = false
          }, 0)
        }
      }
    },

    'form.template_type': {
      immediate: true,
      handler() {
        if (this.form.template_type) {
          this.getEmailTemplateById(this.form.template_type)
        }
      }
    },

    'form.content': {
      immediate: true,
      handler() {
        this.handleEmailPreview()
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

#page-add-emaployer {
  .con-img-upload {
    margin-top: 2px;
    .con-input-upload {
      margin: 5px 15px 15px 0;
    }
  }

  .vs-card--content {
    margin-bottom: 0;
  }

  .send-bulk-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .vs-button {
    @media (max-width: 575px) {
      width: 100% !important;
    }
  }
}

.email-preview {
  height: 100%;
  background-color: rgba(221, 221, 221, 0.52);
  border-radius: 1rem;
}

.email_list {
  background-color: #f5f5f5;
  border-radius: 0.8rem;

  .con-upload {
    width: 210px;
    @media (max-width: 575px) {
      width: 100%;
    }

    .con-img-upload {
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;

      .con-input-upload {
        border: 1px dashed rgba(var(--vs-primary), 0.5);
        height: 45px;
        margin-bottom: 0 !important;
        margin-top: 0 !important;
        order: 1;
        @media (max-width: 575px) {
          width: 100%;
        }
      }

      .img-upload {
        margin: 15px 15px 0 0px;
        order: 2;
      }
    }
  }

  .export-btn {
    margin-top: 0.6rem;
  }

  .con-input-upload.disabled-upload {
    display: flex !important;
    opacity: 1 !important;
  }
}

.attachment_file {
  background-color: #f5f5f5;
  border-radius: 0.8rem;

  .con-img-upload {
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;

    .con-input-upload {
      border: 1px dashed rgba(var(--vs-primary), 0.5);
      height: 45px;
      margin-bottom: 0 !important;
      margin-top: 0 !important;
      order: 1;
      @media (max-width: 575px) {
        width: 100%;
      }
    }

    .img-upload {
      width: 400px;
      margin: 15px 15px 0 0px;
      order: 2;
      @media (max-width: 575px) {
        width: 100%;
      }
      img {
        object-fit: cover;
        width: 100%;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.desc {
  margin-top: -1.25rem !important;

  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>
