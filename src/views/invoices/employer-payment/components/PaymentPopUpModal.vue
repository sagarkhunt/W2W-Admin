<template>
  <div>
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('add_payment')">
      <div class="con-exemple-prompt">
        <vs-input placeholder="Amount" vs-placeholder="Amount" :value="`€ ${form.amount}`" class="mt-3 w-full font-black" disabled />
        <div class="mt-3 w-full">
          <label for="">{{ $t('payment_date') }} </label>
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
  name: 'PaymentPopUpModal',

  props: {
    isModalShow: Boolean,
    invoiceId: Number,
    invoiceAmount: Number
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
      }
    }
  },

  mounted() {
    this.form.amount = `${this.invoiceAmount.toFixed(2)}` || 0
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
      this.form.payment_date = dateMixins.methods.formatDateSubmit(this.form.payment_date)

      try {
        const { message } = await this.addEmployerPayment({
          id: this.invoiceId,
          data: {
            ...this.form
          }
        })
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

<style lang="scss" scoped></style>
