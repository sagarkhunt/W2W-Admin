<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('add_language')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="languageName">{{ $t('language_name') }}</label>
          <vs-input id="languageName" class="w-full" name="languageName" v-model="add_form.language_name" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('languageName')">{{ errors.first('languageName') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="languageCode">{{ $t('language_code') }}</label>
          <vs-input id="languageCode" class="w-full" name="languageCode" v-model="add_form.language_code" v-validate="'required|max:3'" />
          <span class="text-primary text-sm" v-show="errors.has('languageCode')">{{ errors.first('languageCode') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="isActive = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="addLanguageRecord" :disabled="!validateForm" type="submit">{{ $t('add') }}</button>
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
  name: 'AddLanguagePopup',
  components: {
    Select2
  },
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      add_form: {
        language_name: '',
        language_code: '',
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
      addLanguage: 'addLanguage'
    }),
    //add records language
    async addLanguageRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/addLanguage', {
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

<style lang="scss" scoped></style>
