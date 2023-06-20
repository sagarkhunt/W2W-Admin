<template>
  <div>
    <!-- Add Invoice Number -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.EditTeamInvoiceData')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('health_insurance') }}</label>
          <vs-input id="health_insurance" class="w-full" name="Health insurance" v-model="invoiceForm.health_insurance" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Health insurance')">{{ errors.first('Health insurance') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('accident_insurance') }}</label>
          <vs-input id="accident_insurance" class="w-full" name="Accident insurance" v-model="invoiceForm.accident_insurance" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Accident insurance')">{{ errors.first('Accident insurance') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('vat') }} </label>
          <div class="w-full">
            <Select-2
              id="vat_type"
              placeholder="Vat%"
              :value="invoiceForm.vat"
              @input="(item) => (invoiceForm.vat = item && item.value)"
              icon-pack="feather"
              class="w-full mt-3"
              name="vat_type"
              v-validate="'required'"
              :options="TeamInvoice"
            />
          </div>
          <span class="text-primary text-sm" v-show="errors.has('VAT')">{{ errors.first('VAT') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="admin_revision_note">{{ $t('w2w_commission') }} </label>
          <vs-input id="admin_revision_note" class="w-full" name="W2W Commission" v-model="invoiceForm.w2w_commission" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('W2W Commission')">{{ errors.first('W2W Commission') }}</span>
        </div>
        <div class="vx-row mb-2 mt-3">
          <vs-checkbox v-model="invoiceForm.verified">{{ $t('is_verified') }}</vs-checkbox>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="invoiceDataPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateTeamInvoiceData" :disabled="!validateForm" type="submit">
            {{ $t('update') }}
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Add Invoice Number -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'EditTeamInvoice',
  components: {
    Select2
  },
  props: {
    isModalShow: Boolean,
    invoiceId: Number
  },

  data() {
    return {
      invoiceForm: {
        vat: '',
        w2w_commission: '',
        health_insurance: '',
        accident_insurance: '',
        verified: false
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('teaminvoice/getTeamInvoiceDataById', this.invoiceId).then((res) => {
      const data = res.data.data
      this.invoiceForm.vat = data.vat
      ;(this.invoiceForm.w2w_commission = data.w2w_commission), (this.invoiceForm.health_insurance = data.health_insurance)
      this.invoiceForm.accident_insurance = data.accident_insurance
    })
  },
  computed: {
    ...mapState('teaminvoice', ['loading', 'TeamInvoice']),
    validateForm() {
      return !this.errors.any()
    },
    // modal state
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        // handle background scroll
        backgrondScrollHandler(false)
        this.$emit('update:isModalShow', val)
      }
    }
  },

  methods: {
    ...mapActions('teaminvoice', {
      updateTeamInvoices: 'updateTeamInvoices'
    }),
    viewIndustry() {
      this.isActive = false
    },

    //update invoice detail
    async updateTeamInvoiceData() {
      try {
        const { message } = await this.updateTeamInvoices({
          id: this.invoiceId,
          data: {
            ...this.invoiceForm
          }
        })
        this.$emit('newInvList')
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
