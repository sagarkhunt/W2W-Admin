<template>
  <div>
    <!-- seeker team payment Info -->
   <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('add_payment')">
      <div class="con-exemple-prompt">
        <vs-input placeholder="Amount" vs-placeholder="Amount" v-model="form.amount" class="mt-3 w-full font-black" />
        <div class="mt-3 w-full">
          <label for="">{{$t('payment_date')}}</label>
          <date-picker v-model="form.payment_date" mode="date" class="w-full" :masks="{ L: 'DD.MM.YYYY' }">
            <template v-slot="{ inputValue, inputEvents }">
              <vs-input class="w-full" v-validate="'required'" name="Date of Birth" :value="inputValue" v-on="inputEvents" readonly/>
            </template>
          </date-picker>
          <span class="text-primary text-sm" v-show="errors.has('Date of Birth')">{{ errors.first('Date of Birth') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="cityPopup = false"> {{$t('close')}} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="addPaymentsTeam" :disabled="!validateForm" type="submit">{{$t('add_payment')}}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapState, mapActions } from 'vuex'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { dateMixins } from '@/mixins/dateMixins.js'
export default {
  name: 'TeamSeekerPaymentModal',

  props: {
    isModalShow: Boolean,
    seekerTeamPayment: Object
  },

  components: {
    Select2,
    DatePicker
  },

  data() {
    return {
      form: {
        amount: '',
        payment_date: new Date(),
        seekerId: '',
        teamId: ''
      }
    }
  },

  mounted() {  
    this.form = {
      ...this.form,
      seekerId: this.seekerTeamPayment.seekerTeamId,
      teamId: this.seekerTeamPayment.teamId
    }    
  },

  computed: {
    ...mapState('jobseeker', ['VatTypes']),

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
    },

    totalDeducationInParts() {
      let deductionAmount = Number(this.invoice_deducations_form.deduction_amount)
      let vatP = Number(this.invoice_deducations_form.vat)

      if (vatP > 0) {
        deductionAmount += (deductionAmount * vatP) / 100
      }
      return deductionAmount / Number(this.invoice_deducations_form.total_parts)
    }
  },

  methods: {
    ...mapActions('teaminvoice', {
      addEmployerPaymentTeam: 'addEmployerPaymentTeam'
    }),
    async addPaymentsTeam() {        
        this.form.payment_date = dateMixins.methods.formatDateSubmit(this.form.payment_date)         
      try {
        const { message } = await this.addEmployerPaymentTeam({
          id: this.$route.params.id,
          data: {
            ...this.form
          }
        })
        this.isActive = false
        this.$emit('done')
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

<style lang="scss" scoped></style>
