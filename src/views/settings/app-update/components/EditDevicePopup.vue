<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('UpdateDevice')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="deviceType">{{ $t('device_type') }} </label>
          <select-2
            id="deviceType"
            placeholder="Device types"
            icon-pack="feather"
            class="w-full mt-3"
            name="Device Type"
            v-validate="'required'"
            :value="app_form.device_type"
            @input="(item) => (app_form.device_type = item && item.value)"
            :options="DeviceTypes.map(x=>({...x, label: $t(x.label)}))"
          />

          <span class="text-primary text-sm" v-show="errors.has('Device Type')">{{ errors.first('Device Type') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="version">{{ $t('version') }} </label>
          <vs-input id="version" class="w-full" name="version" v-model="app_form.version" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('version')">{{ errors.first('ersion') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="whatsNew">{{ $t('whats_new') }} </label>
          <vs-input id="whatsNew" class="w-full" name="whatsNew" v-model="app_form.whats_new" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('whatsNew')">{{ errors.first('whatsNew') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="updateDevicePopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateDeviceRecord" :disabled="!validateForm" type="submit">
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
  name: 'EditDevicePopup',
  props: {
    isModalShow: Boolean,
    DeviceRecordId: Number
  },
  components: {
    Select2
  },
  data() {
    return {
      app_form: {
        device_type: null,
        version: '',
        whats_new: '',
        force_update: true,
        info_update: true
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getAppInfoById', this.DeviceRecordId).then((res) => {
      const data = res.data.data
      this.app_form.device_type = data.device_type
      this.app_form.version = data.version
      this.app_form.whats_new = data.whats_new
    })
  },
  computed: {
    ...mapState('setting', ['DeviceTypes']),
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
      udateDevice: 'udateDevice'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateDeviceRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/udateDevice', {
          id: this.DeviceRecordId,
          data: {
            ...this.app_form
          }
        })
        .then(({ message }) => {
          this.$emit('indList')
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
