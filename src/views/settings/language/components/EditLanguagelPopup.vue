<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdateSkill')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="editLanguageName">{{ $t('language_name') }}</label>
          <vs-input id="editLanguageName" class="w-full" name="editLanguageName" v-model="language_form.language_name" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('editLanguageName')">{{ errors.first('editLanguageName') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="EditLanguageCode">{{ $t('language_code') }}</label>
          <vs-input id="EditLanguageCode" class="w-full" name="EditLanguageCode" v-model="language_form.language_code" v-validate="'required|max:3'" />
          <span class="text-primary text-sm" v-show="errors.has('EditLanguageCode')">{{ errors.first('EditLanguageCode') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="isActive = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateLanguageRecord" :disabled="!validateForm" type="submit">
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

export default {
  name: 'EditLanguagePopup',
  props: {
    isModalShow: Boolean,
    languageId: Number
  },
  components: {
    Select2
  },
  data() {
    return {
      language_form: {
        language_name: '',
        language_code: '',
        languageId: null
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getLanguageById', this.languageId).then((res) => {
      const data = res.data.data
      this.language_form.language_name = data.language_name
      this.language_form.language_code = data.language_code
      this.language_form.languageId = data.id
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
      updateLanguage: 'updateLanguage'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateLanguageRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/updateLanguage', {
          id: this.languageId,
          data: {
            ...this.language_form
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
