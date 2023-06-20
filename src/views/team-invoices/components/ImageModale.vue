<template>
  <div>
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.DownloadImage')">
      <div class="con-exemple-prompt">
        <div class="vx-col bg-white flex justify-center items-center">
          <img :src="imagePreview" alt="item" class="document-img cart-dropdown-item-img p-4" />
        </div>
        <div class="footer">
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="downLoadFile">{{ $t('download') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { mapActions } from 'vuex'

export default {
  name: 'ImagePopUpModal',

  props: {
    isModalShow: Boolean,
    imageLink: String
  },

  components: {
    Select2,
    DatePicker
  },

  data() {
    return {
      form: {
        amount: '',
        payment_date: new Date()
      },

      imagePreview: null
    }
  },

  mounted() {
    this.imagePreview = this.imageLink
  },

  computed: {
    // For Validation
    validateForm() {
      return !this.errors.any()
    },

    isActive: {
      get() {
        return this.isModalShow
      },
      set(val) {
        this.$emit('update:isModalShow', val)
      }
    }
  },

  methods: {
    ...mapActions('invoice', {
      addEmployerPayment: 'addEmployerPayment'
    }),

    // download
    async downLoadFile() {
      try {
        const response = await fetch(this.imagePreview)
        const blob = await response.blob()
        const url = await URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = this.imagePreview.split('/').pop()
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } catch (err) {
        console.log({ err })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.document-img {
  height: 50%;
  width: 50%;
}
</style>
