<template>
  <div>
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.AddDefaultDocument')">
      <div class="con-exemple-prompt">
        <p class="mt-3">{{ $t('title') }}</p>
        <vs-input class="mt-3 w-full" placeholder="Document title" name="document title" vs-placeholder="Deduction Title" v-validate="'required'" v-model="document_form.title" />
        <span class="text-primary text-sm" v-show="errors.has('document title')">{{ errors.first('document title') }}</span>

        <p class="mt-3">{{ $t('description') }}</p>
        <vs-input
          class="mt-3 w-full"
          placeholder="Document description"
          name="document description"
          vs-placeholder="Deduction description"
          v-validate="'required'"
          v-model="document_form.description"
        />
        <span class="text-primary text-sm" v-show="errors.has('document description')">{{ errors.first('document description') }}</span>

        <p class="mt-3">{{ $t('document') }}</p>
        <div class="vx-row mb-2"></div>
        <input
          type="file"
          ref="banner"
          v-validate="'required'"
          accept="application/pdf, application/msword"
          @change="deductionReceiptFile"
          icon-pack="feather"
          name="document file"
          class="vs-inputx vs-input--input normal w-full"
        />
        <span class="text-primary text-sm" v-show="errors.has('document file')">{{ errors.first('document file') }}</span>
      </div>
      <div class="footer text-right">
        <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="isActive = false"> {{ $t('close') }} </vs-button>
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" @click="addDefaultDocument" type="relief">{{ $t('add') }}</button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'AddDefaultDocumentModel',
  components: {},
  props: {
    isModalShow: Boolean,
    jobseeker: Object
  },
  data() {
    return {
      // Payslip Form
      document_form: {
        title: '',
        description: '',
        document: ''
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
    ...mapActions('defaultDocument', {
      addRecordDefaultDocument: 'addRecordDefaultDocument'
    }),

    payslipReceiptFile(e) {
      this.document_form.payslip_receipt = e.target.files[0]
    },
    deductionReceiptFile(e) {
      this.document_form.document = e.target.files[0]
    },
    async addDefaultDocument() {
      if (!(await this.$validator.validate())) {
        return false
      }

      const data = new FormData()
      data.append('title', this.document_form.title)
      data.append('description', this.document_form.description)
      data.append('document', this.document_form.document)

      try {
        const { message } = await this.addRecordDefaultDocument(data)
        this.$emit('done')
        this.isActive = false
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
  }
}
</script>
<style lang="scss" scoped>
.date-range {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.6rem 0.6rem 0.6rem 2rem !important;
}
</style>
