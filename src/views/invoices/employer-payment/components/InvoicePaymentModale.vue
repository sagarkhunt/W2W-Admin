<template>
  <div>
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('add_payment')">
      <div id="invoicePayment" class="con-exemple-prompt icon-input">
        <vs-input icon="€" placeholder="Amount" type="number" vs-placeholder="Amount" v-model="form.amount" class="mt-3 w-full font-black amount_field" />
        <div class="mt-3 w-full">
          <label for="">{{ $t('payment_date') }}</label>
          <date-picker v-model="form.payment_date" :max-date="new Date()" mode="date" class="w-full" :masks="{ L: 'DD.MM.YYYY' }">
            <template v-slot="{ inputValue, inputEvents }">
              <vs-input class="w-full" v-validate="'required'" name="Date of Birth" :value="inputValue" v-on="inputEvents" readonly />
            </template>
          </date-picker>
          <span class="text-primary text-sm" v-show="errors.has('Date of Birth')">{{ errors.first('Date of Birth') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="isActive = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="addPayments" :disabled="!validateForm" type="submit">{{ $t('add_payment') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { dateMixins } from '@/mixins/dateMixins.js'
import { mapActions } from 'vuex'

export default {
  name: 'InvoicePaymentPopUpModal',

  props: {
    isModalShow: Boolean,
    invoiceId: Number
  },

  components: {
    Select2,
    DatePicker
  },

  data() {
    return {
      loading: false,
      form: {
        amount: '',
        payment_date: new Date()
      }
    }
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
    async addPayments() {
      this.loading = true
      this.form.payment_date = dateMixins.methods.formatDateSubmit(this.form.payment_date)

      try {
        const { message } = await this.addEmployerPayment({
          id: this.invoiceId,
          data: {
            ...this.form
          }
        })
        this.loading = false
        this.$emit('done')
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.isActive = false
      } catch ({ message }) {
        this.loading = false
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
          container: '#invoicePayment .vs-popup .vs-popup--content',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#invoicePayment .vs-popup .vs-popup--content > .con-vs-loading')
      }
    }
  }
}
</script>

<style lang="scss">
.vs-popup {
  position: relative;
  .con-vs-loading {
    position: absolute;
  }
}
.icon-input {
  .vs-con-input-label {
    .vs-con-input {
      .vs-input--icon {
        left: 15px;
        border-right: none;
        z-index: 1;
      }
    }
  }
}
</style>
