<template>
  <div class="edit__payment">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdatePaymentSettings')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="item_name">{{ $t('item_name') }}</label>
          <vs-input id="item_name" class="w-full" name="Item Name" v-model="edit_payment_form.payment_name" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Item Name')">{{ errors.first('Item Name') }}</span>
        </div>
        <div class="vx-row mb-2 mt-3">
          <label for="pecentage">{{ $t('percentage') }}</label>
          <vs-input id="pecentage" class="w-full" name="Pecentage" v-model="edit_payment_form.percentage" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Pecentage')">{{ errors.first('Pecentage') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="border" @click="iaActive = false"> {{ $t('close') }} </vs-button>

          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updatePaymentRecord" :disabled="!validateForm" type="submit">
            {{ $t('update') }}
          </button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'EditPayment',
  props: {
    isModalShow: Boolean,
    paymentRecordId: Number
  },
  data() {
    return {
      edit_payment_form: {
        payment_name: '',
        percentage: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getPaymentSettingById', this.paymentRecordId).then((res) => {
      const data = res.data.data
      this.edit_payment_form.payment_name = data.payment_name
      this.edit_payment_form.percentage = data.percentage
    })
  },
  computed: {
    ...mapState('setting', ['loading']),
    validateForm() {
      return !this.errors.any()
    },
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
      udatePaymentSetting: 'udatePaymentSetting'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updatePaymentRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/udatePaymentSetting', {
          id: this.paymentRecordId,
          data: {
            ...this.edit_payment_form
          }
        })
        .then(({ message }) => {
          this.$emit('indEditPayList')
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
  },
  watch: {
    loading() {
      // Main Loading For All Table
      if (this.loading) {
        this.$vs.loading({
          container: '#table-loading',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#table-loading > .con-vs-loading')
      }
    }
  },
  components: {
    Select2
  }
}
</script>

<style lang="scss" scoped></style>
