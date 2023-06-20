<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdateInstitute')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="institute_name">{{ $t('institute_name') }} </label>
          <vs-input id="institute_name" class="w-full" name="Country Name" v-model="institute_form.institute_name" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('Country Name')">{{ errors.first('Country Name') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="updateCityPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateInstituteRecord" :disabled="!validateForm" type="submit">
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
  name: 'EditInstitute',
  props: {
    isModalShow: Boolean,
    cityRecordId: Number
  },
  components: {
    Select2
  },
  data() {
    return {
      institute_form: {
        institute_name: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getInstituteById', this.cityRecordId).then((res) => {
      const data = res.data.data
      this.institute_form.institute_name = data.institute_name
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
      udateInstitute: 'udateInstitute'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateInstituteRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/udateInstitute', {
          id: this.cityRecordId,
          data: {
            ...this.institute_form
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

<style lang="scss" scoped></style>
