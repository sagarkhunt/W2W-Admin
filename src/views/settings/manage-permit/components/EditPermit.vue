<template>
  <div class="add__permit">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdatePermit')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="permit">{{ $t('translated_permit_name') }}</label>
          <vs-input id="permit" class="w-full" name="Permit" v-model="permit_form.permit_name" v-validate="'required|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('Permit')">{{ errors.first('Permit') }}</span>
        </div>

        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="updateQualificationPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateQualificationRecord" :disabled="!validateForm" type="submit">
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
  name: 'EditPermit',
  components: {
    Select2
  },
  props: {
    isModalShow: Boolean,
    permitId: Number
  },
  data() {
    return {
      permit_form: {
        permit_name: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getPermitById', this.permitId).then((res) => {
      const data = res.data.data
      this.permit_form.permit_name = data.description
      this.permit_form.languageId = data.languageId
      this.permit_form.description = data.description
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
      udatePermit: 'udatePermit'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateQualificationRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/udatePermit', {
          id: this.permitId,
          data: {
            ...this.permit_form
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
