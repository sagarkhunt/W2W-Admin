<template>
  <div class="edit__payment">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdateTravellingSettings')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="traveling_type">{{ $t('traveling_type') }}</label>
          <vs-input id="traveling_type" class="w-full" name="Traveling Type" v-model="edit_travelling_form.travelling_type" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Traveling Type')">{{ errors.first('Traveling Type') }}</span>
        </div>
        <div class="vx-row mb-2 mt-3">
          <label for="traveling_value">{{ $t('traveling_value') }}</label>
          <vs-input id="traveling_value" class="w-full" name="Traveling Value" v-model="edit_travelling_form.travelling_value" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Traveling Value')">{{ errors.first('Traveling Value') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="border" @click="iaActive = false"> {{ $t('close') }} </vs-button>

          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateTravellingRecord" :disabled="!validateForm" type="submit">
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
export default {
  name: 'EditTraveling',
  props: {
    isModalShow: Boolean,
    travellingRecordId: Number
  },
  data() {
    return {
      edit_travelling_form: {
        travelling_type: '',
        travelling_value: ''
      }
    }
  },
  mounted() {
    this.$store.dispatch('setting/getTravellingSettingById', this.travellingRecordId).then((res) => {
      const data = res.data.data
      this.edit_travelling_form.travelling_type = data.travelling_type
      this.edit_travelling_form.travelling_value = data.travelling_value
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
        this.$emit('update:isModalShow', val)
      }
    },

    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      updateTravelling: 'updateTravelling'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateTravellingRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/updateTravelling', {
          id: this.travellingRecordId,
          data: {
            ...this.edit_travelling_form
          }
        })
        .then(({ message }) => {
          this.$emit('indEditTravellingList')
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
