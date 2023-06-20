<template>
  <div class="add__EmpCommsion">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.AppSetting')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="compensation_name">{{ $t('item_name') }}</label>
          <vs-input id="compensation_name" class="w-full" name="Item name" v-model="setting_form.compensation_name" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Item name')">{{ errors.first('Item name') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="compensation_value">{{ $t('item_value') }}</label>
          <vs-input id="compensation_value" class="w-full" name="Item Value" v-model="setting_form.compensation_value" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Item Value')">{{ errors.first('Item Value') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="border" @click="isActive = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" :disabled="!validateForm" @click="updateAppSettingRecord" type="submit">
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
  name: 'EditAppSetting',
  props: {
    isModalShow: Boolean,
    AppSettingRecordId: Number
  },
  data() {
    return {
      setting_form: {
        compensation_name: '',
        compensation_value: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getAppSettingById', this.AppSettingRecordId).then((res) => {
      const data = res.data.data
      this.setting_form.compensation_name = data.compensation_name
      this.setting_form.compensation_value = data.compensation_value
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
      udateAppSetting: 'udateAppSetting'
    }),
    //edit app setting
    async updateAppSettingRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/udateAppSetting', {
          id: this.AppSettingRecordId,
          data: {
            ...this.setting_form
          }
        })
        .then(({ message }) => {
          this.$emit('indEditAppList')
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
