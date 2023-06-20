<template>
  <div class="add__industry">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.AddNewIndustry')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="language">{{ $t('language') }}</label>
          <select-2
            class="w-full"
            :value="add_form.languageId"
            @input="(item) => (add_form.languageId = item && item.value)"
            name="Language"
            placeholder="Select Language"
            autocomplete
            action="getLanguage"
            v-validate="'required'"
          />
          <span class="text-primary text-sm" v-show="errors.has('Language')">{{ errors.first('Language') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="full_name">{{ $t('industry_name') }}</label>
          <vs-input id="full_name" class="w-full" name="Industry" v-model="add_form.industry_name" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('Industry')">{{ errors.first('Industry') }}</span>
        </div>

        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="addIndustryModal = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="saveChanges" :disabled="!validateForm" type="submit">{{ $t('add') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'AddIndustry',
  components: {
    Select2
  },
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      add_form: {
        industry_name: '',
        languageId: null
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
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
      addIndustryData: 'addIndustry'
    }),
    async saveChanges() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/addIndustry', {
          id: this.invoiceId,
          ...this.add_form
        })
        .then(({ message }) => {
          this.$emit('newInvList')
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

<style></style>
