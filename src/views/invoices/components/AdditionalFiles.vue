<template>
  <div class="addtional__file">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.InvoiceFiles')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="city_name">{{ $t('file_name') }} </label>
          <vs-input id="city_name" class="w-full" name="File Name" v-model="uploadFile.file_name" v-validate="'required'" />
          <span class="text-warning text-sm" v-show="errors.has('File Name')">{{ errors.first('File Name') }}</span>
        </div>
        <div class="vx-row mb-2">
          <vs-upload :value="uploadFile.invoice_image" ref="invoiceimage" text="Upload File" :show-upload-button="false" />
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="adFilePopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="addFileInInvoic" :disabled="!validateForm" type="submit">{{ $t('update') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AdditionalFile',
  props: {
    isModalShow: Boolean,
    invoiceId: Number
  },
  data() {
    return {
      uploadFile: {
        file_name: '',
        invoice_image: []
      }
    }
  },
  mounted() {},
  computed: {
    // modal stat
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        this.$emit('update:isModalShow', val)
      }
    },

    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('invoice', {
      addFileInvoice: 'addFileInvoice'
    }),
    async addFileInInvoic() {
      if (!(await this.$validator.validate())) {
        return false
      }
      const data = new FormData()
      data.append('invoice_image', this.uploadFile.invoice_image)
      data.append('file_name', this.uploadFile.file_name)
      this.$refs['invoiceimage'].filesx.forEach((file) => {
        data.append('invoice_image', file)
      })

      this.$store
        .dispatch('invoice/addFileInvoice', {
          id: this.invoiceId,
          data
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
          })
        })
    }
  }
}
</script>

<style></style>
