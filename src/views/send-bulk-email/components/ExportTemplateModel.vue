<template>
  <div class="add__EMPLATE">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.ExportEmailTemplate')">
      <div class="con-exemple-prompt">
        <div class="p-1 mb-5">
          <div>
            <label for="" class="font-semibold">{{ $t('select_language') }}</label>
            <div>
              <select-2
                class="w-full mt-2 select-dropdown"
                :value="languageId"
                @input="(item) => (languageId = item && item.value)"
                name="Language"
                placeholder="Select Language"
                autocomplete
                action="getLanguage"
              />
            </div>
          </div>
          <div class="mt-5">
            <label for="" class="font-semibold">{{ $t('statement') }}</label>
            <select-2
              id="statement_name"
              placeholder="Select Statement"
              class="w-full mt-2 select-dropdown"
              name="Statement"
              :value="statementName"
              @input="(item) => (statementName = item && item.value)"
              :options="StatementName.map(x=>({...x, label: $t(x.label)}))"
              :ssr="true"
            />
          </div>
        </div>
        <div class="footer text-center">
          <button class="mt-2 w-1/4 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" id="export_csv" @click="downloadTemplate" :disabled="!validateForm" type="submit">
            {{ $t('export') }}
          </button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { mapActions, mapState } from 'vuex'
import { backgrondScrollHandler } from '@/utils/functions'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import XLSX from 'xlsx'

export default {
  name: 'ExportTemplatePopup',
  props: {
    isModalShow: Boolean
  },
  components: {
    quillEditor,
    Select2
  },
  data() {
    return {
      languageId: null,
      statementName: null,
      generating: false
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
  },
  computed: {
    ...mapState('leDocument', ['StatementName']),
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
      emailTemplateDoenloads: 'emailTemplateDoenloads'
    }),
    async downloadTemplate() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.generating = true
      this.$store
        .dispatch('setting/emailTemplateDoenload', {
          languageId: this.languageId,
          statement_name: this.statementName
        })
        .then((res) => {
          const wb = XLSX.utils.book_new()
          const ws = XLSX.utils.json_to_sheet(
            res.data.map((item, index) => ({
              Email: item.email
            }))
          )
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
          XLSX.writeFile(wb, 'User-emails.csv')
          this.generating = false
          this.isActive = false
          this.$vs.notify({
            title: 'Success',
            text: res.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
        })
        .catch(({ message }) => {
          this.isActive = false
          this.generating = false
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
    generating() {
      if (this.generating) {
        this.$vs.loading({
          container: '#export_csv',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#export_csv  > .con-vs-loading')
      }
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

.email_list {
  background-color: #f5f5f5;
  border-radius: 0.8rem;

  .con-upload {
    @media (max-width: 1024px) {
      width: 210px;
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
