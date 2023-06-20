<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.AddCity')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="city_name">{{ $t('city_name') }} </label>
          <vs-input id="city_name" class="w-full" name="Country Name" v-model="add_city_form.city_name" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Country Name')">{{ errors.first('Country Name') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="zip_code">{{ $t('zip_code') }} </label>
          <vs-input id="zip_code" class="w-full" name="Text" v-model="add_city_form.zip_code" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Text')">{{ errors.first('Text') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="cityPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="addCityRecord" :disabled="!validateForm" type="submit">{{ $t('add') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState } from 'vuex'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'AddCity',
  props: {
    isModalShow: Boolean
  },
  components: {
    Select2
  },
  data() {
    return {
      add_city_form: {
        city_name: '',
        zip_code: '',
        countryId: ''
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
      addCity: 'addCity'
    }),
    //add records city
    async addCityRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.add_city_form.countryId = this.$route.params.id;
      this.$store
        .dispatch('setting/addCity', {
          ...this.add_city_form
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
