<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdateRedeem')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="redeem_code">{{ $t('redeem_code') }}</label>
          <vs-input id="redeem_code" class="w-full" name="Redeem code" v-model="edit_form.redeem_code" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('Redeem code')">{{ errors.first('Redeem code') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="redeem_limit">{{ $t('redeem_limit') }}</label>
          <vs-input class="w-full" name="Redeem limit" v-model="edit_form.redeem_limit" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Redeem limit')">{{ errors.first('Redeem limit') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="redeem_points">{{ $t('redeem_points') }}</label>
          <vs-input id="redeem_points" class="w-full" name="Redeem points" v-validate="'required|max:255'" v-model="edit_form.redeem_points" />
          <span class="text-primary text-sm" v-show="errors.has('Redeem points')">{{ errors.first('Redeem points') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="redeem_points">{{ $t('expiry_date') }}</label>
          <date-picker v-model="edit_form.expiry_date" mode="date" v-validate="'required'" name="Expiry Date" class="w-full" :masks="{ input: 'DD.MM.YYYY' }">
            <template v-slot="{ inputValue, inputEvents }">
              <vs-input placeholder="Expiry Date" class="w-full mt-3" :value="inputValue" v-on="inputEvents" />
            </template>
          </date-picker>
          <span class="text-primary text-sm" v-show="errors.has('Expiry Date')">{{ errors.first('Expiry Date') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="service_fee">{{ $t('service_fee') }} (%)</label>
          <vs-input id="service_fee" class="w-full" name="Service fee" v-validate="'required|max:255'" v-model="edit_form.service_fee" />
          <span class="text-primary text-sm" v-show="errors.has('Service fee')">{{ errors.first('Service fee') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="isActive = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateRedeemRecord" :disabled="!validateForm" type="submit">
            {{ $t('update') }}
          </button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { backgrondScrollHandler } from '@/utils/functions'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
  name: 'EditRedeemPopup',
  props: {
    isModalShow: Boolean,
    redeemId: Number
  },
  components: {
    Select2,
    DatePicker
  },
  data() {
    return {
      profile_preview: null,
      edit_form: {
        redeem_code: '',
        redeem_limit: '',
        redeem_points: '',
        expiry_date: '',
        service_fee: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getRedeemById', this.redeemId).then((res) => {
      const data = res.data.data
      this.edit_form.redeem_code = data.redeem_code
      this.edit_form.redeem_limit = data.redeem_limit
      this.edit_form.redeem_points = data.redeem_points
      this.edit_form.expiry_date = data.expiry_date
      this.edit_form.service_fee = data.service_fee
    })
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
    ...mapActions('setting', {
      updateRedeem: 'updateRedeem'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateRedeemRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.edit_form.expiry_date = dateMixins.methods.formatOldDate(this.edit_form.expiry_date)
      const data = new FormData()
      data.append('redeem_code', this.edit_form.redeem_code)
      data.append('redeem_limit', this.edit_form.redeem_limit)
      data.append('redeem_points', this.edit_form.redeem_points)
      data.append('expiry_date', this.edit_form.expiry_date)
      data.append('service_fee', this.edit_form.service_fee)

      try {
        const { message } = await this.updateRedeem({
          id: this.redeemId,
          data
        })
        this.$emit('indList')
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
    },

    //profile image set
    handleProfileUpload(e) {
      this.edit_form.profile_image = e.target.files[0]
      this.profile_preview = URL.createObjectURL(e.target.files[0])
    }
  }
}
</script>

<style lang="scss" scoped></style>
